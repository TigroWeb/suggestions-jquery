import { utils } from './utils';
import { dom } from './dom';
import { notificator } from './notificator';
import { Suggestions } from './suggestions';

import { KEYS, EVENT_NS } from './constants';

/**
 * Methods related to INPUT's behavior
 */

let methods = {

    setupElement: function () {
        // Remove autocomplete attribute to prevent native suggestions:
        this.element.setAttribute('autocomplete', 'off');
        dom.addClass(this.element, 'suggestions-input');
        dom.setStyle(this.element, 'boxSizing', 'border-box');
    },

    bindElementEvents: function () {
        dom.listen(this.element, 'keydown', EVENT_NS, this.onElementKeyDown.bind(this));
        // IE is buggy, it doesn't trigger `input` on text deletion, so use following events
        dom.listen(this.element, 'keyup', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'cut', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'paste', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'input', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'blur', EVENT_NS, this.onElementBlur.bind(this));
        dom.listen(this.element, 'focus', EVENT_NS, this.onElementFocus.bind(this));
    },

    unbindElementEvents: function () {
        dom.stopListenByNamespace(EVENT_NS);
    },

    onElementBlur: function () {
        // suggestion was clicked, blur should be ignored
        // see container mousedown handler
        if (this.cancelBlur) {
            this.cancelBlur = false;
            return;
        }

        if (this.options.triggerSelectOnBlur) {
            if (!this.isUnavailable()) {
                this.selectCurrentValue({ noSpace: true })
                    .always(() => {
                        // For NAMEs selecting keeps suggestions list visible, so hide it
                        this.hide();
                    });
            }
        } else {
            this.hide();
        }

        if (this.fetchPhase.abort) {
            this.fetchPhase.abort();
        }
    },

    onElementFocus: function () {
        if (!this.cancelFocus) {
            // defer methods to allow browser update input's style before
            utils.delay(this.completeOnFocus.bind(this));
        }
        this.cancelFocus = false;
    },

    onElementKeyDown: function (e) {
        if (this.isUnavailable()) {
            return;
        }

        if (!this.visible) {
            switch (e.key) {
                // If suggestions are hidden and user presses arrow down, display suggestions
                case KEYS.DOWN:
                    this.suggest();
                    break;
                // if no suggestions available and user pressed Enter
                case KEYS.ENTER:
                    if (this.options.triggerSelectOnEnter) {
                        this.triggerOnSelectNothing();
                    }
                    break;
            }
            return;
        }

        switch (e.key) {
            case KEYS.ESC:
                this.el.val(this.currentValue);
                this.hide();
                this.abortRequest();
                break;

            case KEYS.TAB:
                if (this.options.tabDisabled === false) {
                    return;
                }
                break;

            case KEYS.ENTER:
                if (this.options.triggerSelectOnEnter) {
                    this.selectCurrentValue();
                }
                break;

            case KEYS.SPACE:
                if (this.options.triggerSelectOnSpace && this.isCursorAtEnd()) {
                    e.preventDefault();
                    this.selectCurrentValue({ continueSelecting: true, dontEnrich: true })
                        .fail(() => {
                            // If all data fetched but nothing selected
                            this.currentValue += ' ';
                            this.el.val(this.currentValue);
                            this.proceedChangedValue();
                        });
                }
                return;
            case KEYS.UP:
                this.moveUp();
                break;
            case KEYS.DOWN:
                this.moveDown();
                break;
            default:
                return;
        }

        // Cancel event if function did not return:
        e.stopImmediatePropagation();
        e.preventDefault();
    },

    onElementKeyUp: function (e) {
        if (this.isUnavailable()) {
            return;
        }

        switch (e.key) {
            case KEYS.UP:
            case KEYS.DOWN:
            case KEYS.ENTER:
                return;
        }

        // Cancel pending change
        clearTimeout(this.onChangeTimeout);
        this.inputPhaseReject();

        if (this.currentValue !== this.el.val()) {
            this.proceedChangedValue();
        }
    },

    proceedChangedValue: function () {
        // Cancel fetching, because it became obsolete
        this.abortRequest();

        this.inputPhase = new Promise((resolve, reject) => {
            this.inputPhaseResolve = resolve;
            this.inputPhaseReject = reject;
        })
            .then(this.onValueChange.bind(this), () => {});

        if (this.options.deferRequestBy > 0) {
            // Defer lookup in case when value changes very quickly:
            this.onChangeTimeout = utils.delay(() => {
                this.inputPhaseResolve();
            }, this.options.deferRequestBy);
        } else {
            this.inputPhaseResolve();
        }
    },

    onValueChange: function () {
        let currentSelection;

        if (this.selection) {
            currentSelection = this.selection;
            this.selection = null;
            this.trigger('InvalidateSelection', currentSelection);
        }

        this.selectedIndex = -1;

        this.update();
        this.notify('valueChange');
    },

    completeOnFocus: function () {
        if (this.isUnavailable()) {
            return;
        }

        if (this.isElementFocused()) {
            this.fixPosition();
            this.update();
            if (this.isMobile) {
                this.setCursorAtEnd();
                this.scrollToTop();
            }
        }
    },

    isElementFocused: function () {
        return document.activeElement === this.element;
    },

    isCursorAtEnd: function () {
        let valLength = this.el.val().length,
            selectionStart,
            range;

        // `selectionStart` and `selectionEnd` are not supported by some input types
        try {
            selectionStart = this.element.selectionStart;
            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
        } catch (ex) {
        }

        if (document.selection) {
            range = document.selection.createRange();
            range.moveStart('character', -valLength);
            return valLength === range.text.length;
        }
        return true;
    },

    setCursorAtEnd: function () {
        let element = this.element;

        // `selectionStart` and `selectionEnd` are not supported by some input types
        try {
            element.selectionEnd = element.selectionStart = element.value.length;
            element.scrollLeft = element.scrollWidth;
        } catch (ex) {
            element.value = element.value;
        }
    }

};

Object.assign(Suggestions.prototype, methods);

notificator
    .on('initialize', methods.bindElementEvents)
    .on('dispose', methods.unbindElementEvents);