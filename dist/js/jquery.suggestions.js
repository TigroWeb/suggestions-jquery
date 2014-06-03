/**
 * DaData.ru Suggestions jQuery plugin, version 4.4.6
 *
 * DaData.ru Suggestions jQuery plugin is freely distributable under the terms of MIT-style license
 * Built on DevBridge Autocomplete for jQuery (https://github.com/devbridge/jQuery-Autocomplete)
 * For details, see https://github.com/hflabs/suggestions-jquery
 */
// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var
        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            SPACE: 32,
            UP: 38,
            DOWN: 40
        },
        types = {},
        initializeHooks = [],
        disposeHooks = [],
        setOptionsHooks = [],
        fixPositionHooks = [],
        requestParamsHooks = [],
        assignSuggestionsHooks = [],
        eventNS = '.suggestions',
        dataAttrKey = 'suggestions',
        QC_COMPLETE = {
            OK: 0,
            NO_REGION: 1,
            NO_CITY: 2,
            NO_STREET: 3,
            NO_HOUSE: 4,
            NO_FLAT: 5,
            BAD: 6,
            FOREIGN: 7
        };

    var utils = (function () {
        var uniqueId = 0;
        return {
            escapeRegExChars: function (value) {
                return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            getDefaultType: function () {
                return ($.support.cors ? 'POST' : 'GET');
            },
            getDefaultContentType: function () {
                return ($.support.cors ? 'application/json' : 'application/x-www-form-urlencoded');
            },
            fixURLProtocol: function(url){
                return $.support.cors ? url : url.replace(/^https?:/, location.protocol);
            },
            addUrlParams: function (url, params) {
                return url + (/\?/.test(url) ? '&' : '?') + $.param(params);
            },
            serialize: function (data) {
                if ($.support.cors) {
                    return JSON.stringify(data);
                } else {
                    return $.param(data, true);
                }
            },
            compact: function (array) {
                return $.grep(array, function (el) {
                    return !!el;
                });
            },
            delay: function (handler, delay) {
                return setTimeout(handler, delay || 0);
            },
            uniqueId: function (prefix) {
                return (prefix || '') + ++uniqueId;
            },
            slice: function(obj, start) {
                return Array.prototype.slice.call(obj, start);
            },
            abortRequests: function(){
                $.each(arguments, function(i, request){
                    if (request) {
                        request.abort();
                    }
                })
            },
            /**
             * Returns array1 minus array2
             */
            arrayMinus: function(array1, array2) {
                return $.grep(array1, function(el, i){
                    return $.inArray(el, array2) === -1;
                });
            },
            getWords: function(str, stopwords) {
                var words = this.compact(str.split(/[.,\s]+/g)),
                    lastWord = words.pop(),
                    goodWords = this.arrayMinus(words, stopwords);

                goodWords.push(lastWord);
                return goodWords;
            },
            /**
             * Returns normalized string without stopwords
             */
            normalize: function(str, stopwords) {
                var that = this;
                return that.getWords(str, stopwords).join(' ');
            },
            /**
             * Returns true if str1 includes str2 plus something else, false otherwise.
             */
            stringEncloses: function(str1, str2) {
                return str1.indexOf(str2) !== -1 && str1.length > str2.length;
            },
            haveSameParent: function(suggestions) {
                if (suggestions.length === 0) {
                    return false;
                } else if (suggestions.length === 1) {
                    return true;
                } else {
                    var parentValue = suggestions[0].value;
                    var aliens = $.grep(suggestions, function(suggestion) {
                        return suggestion.value.indexOf(parentValue) === 0;
                    }, true);
                    return aliens.length === 0;
                }
            },
            /**
             * Matches query against suggestions, removing all the stopwords.
             */
            matchByNormalizedQuery: function(query, suggestions, stopwords) {
                var index = -1,
                    queryLowerCase = query.toLowerCase();

                // match query with suggestions
                var normalizedQuery = utils.normalize(queryLowerCase, stopwords);
                var matches = [];
                $.each(suggestions, function(i, suggestion) {
                    var suggestedValue = suggestion.value.toLowerCase();
                    // if query encloses suggestion, than it has already been selected
                    // so we should not select it anymore
                    if (utils.stringEncloses(queryLowerCase, suggestedValue)) {
                        return false;
                    }
                    if (normalizedQuery === utils.normalize(suggestedValue, stopwords)) {
                        matches.push(i);
                    }
                });

                if (matches.length === 1) {
                    index = matches[0];
                }

                return index;
            },
            /**
             * Matches query against suggestions word-by-word (with respect to stopwords).
             * Matches if query words are a subset of suggested words.
             */
            matchByWords: function(query, suggestions, stopwords) {
                var index = -1,
                    queryLowerCase = query.toLowerCase();

                var sameParent = utils.haveSameParent(suggestions);
                if (sameParent) {
                    $.each(suggestions, function(i, suggestion) {
                        var suggestedValue = suggestion.value.toLowerCase();
                        if (utils.stringEncloses(queryLowerCase, suggestedValue)) {
                            return false;
                        }
                        // check if query words are a subset of suggested words
                        var queryWords = utils.getWords(queryLowerCase, stopwords);
                        var suggestionWords = utils.getWords(suggestedValue, stopwords);
                        if (utils.arrayMinus(queryWords, suggestionWords).length === 0) {
                            index = i;
                            return false;
                        }
                    });
                }
                return index;
            },
            fieldsNotEmpty: function(obj, fields){
                if (!$.isPlainObject(obj)) {
                    return false;
                }
                var result = true;
                $.each(fields, function (i, field) {
                    return result = !!(obj[field]);
                });
                return result;
            }
        };
    }());


    (function () {

        types['NAME'] = {
            STOPWORDS: [],
            isDataComplete: function (data) {
                var that = this,
                    params = that.options.params,
                    fields = $.map(params && params.parts || ['surname', 'name', 'patronymic'], function (part) {
                        return part.toLowerCase();
                    });
                return utils.fieldsNotEmpty(data, fields);
            },
            composeValue: function (data) {
                return utils.compact([data.surname, data.name, data.patronymic]).join(' ');
            },
            urlSuffix: 'fio'
        };

        types['ADDRESS'] = {
            STOPWORDS: ['ао', 'аобл', 'дом', 'респ', 'а/я', 'аал', 'автодорога', 'аллея', 'арбан', 'аул', 'б-р', 'берег', 'бугор', 'вал', 'вл', 'волость', 'въезд', 'высел', 'г', 'городок', 'гск', 'д', 'двлд', 'днп', 'дор', 'дп', 'ж/д_будка', 'ж/д_казарм', 'ж/д_оп', 'ж/д_платф', 'ж/д_пост', 'ж/д_рзд', 'ж/д_ст', 'жилзона', 'жилрайон', 'жт', 'заезд', 'заимка', 'зона', 'к', 'казарма', 'канал', 'кв', 'кв-л', 'км', 'кольцо', 'комн', 'кордон', 'коса', 'кп', 'край', 'линия', 'лпх', 'м', 'массив', 'местность', 'мкр', 'мост', 'н/п', 'наб', 'нп', 'обл', 'округ', 'остров', 'оф', 'п', 'п/о', 'п/р', 'п/ст', 'парк', 'пгт', 'пер', 'переезд', 'пл', 'пл-ка', 'платф', 'погост', 'полустанок', 'починок', 'пр-кт', 'проезд', 'промзона', 'просек', 'просека', 'проселок', 'проток', 'протока', 'проулок', 'р-н', 'рзд', 'россия', 'рп', 'ряды', 'с', 'с/а', 'с/мо', 'с/о', 'с/п', 'с/с', 'сад', 'сквер', 'сл', 'снт', 'спуск', 'ст', 'ст-ца', 'стр', 'тер', 'тракт', 'туп', 'у', 'ул', 'уч-к', 'ф/х', 'ферма', 'х', 'ш', 'бульвар', 'владение', 'выселки', 'гаражно-строительный', 'город', 'деревня', 'домовладение', 'дорога', 'квартал', 'километр', 'комната', 'корпус', 'литер', 'леспромхоз', 'местечко', 'микрорайон', 'набережная', 'область', 'переулок', 'платформа', 'площадка', 'площадь', 'поселение', 'поселок', 'проспект', 'разъезд', 'район', 'республика', 'село', 'сельсовет', 'слобода', 'сооружение', 'станица', 'станция', 'строение', 'территория', 'тупик', 'улица', 'улус', 'участок', 'хутор', 'шоссе'],
            geoEnabled: true,
            isDataComplete: function (data) {
                var fields = ['house'];
                return utils.fieldsNotEmpty(data, fields) &&
                    (!('qc_complete' in data) || data.qc_complete !== QC_COMPLETE.NO_FLAT);
            },
            composeValue: function (data) {
                return utils.compact([
                    utils.compact([data.region_type, data.region]).join(' '),
                    utils.compact([data.area_type, data.area]).join(' '),
                    utils.compact([data.city_type, data.city]).join(' '),
                    utils.compact([data.settlement_type, data.settlement]).join(' '),
                    utils.compact([data.street_type, data.street]).join(' '),
                    utils.compact([data.house_type, data.house]).join(' '),
                    utils.compact([data.block_type, data.block]).join(' '),
                    utils.compact([data.flat_type, data.flat]).join(' '),
                    data.postal_box ? 'а/я ' + data.postal_box : null
                ]).join(', ');
            },
            urlSuffix: 'address'
        };
    }());

    var serviceMethods = {
        'suggest': {
            defaultParams: {
                type: utils.getDefaultType(),
                dataType: 'json',
                contentType: utils.getDefaultContentType()
            },
            addTypeInUrl: true
        },
        'detectAddressByIp': {
            defaultParams: {
                type: 'GET',
                dataType: 'json'
            },
            addTypeInUrl: false
        }
    };

    function Suggestions(el, options) {
        var that = this,
            defaults = {
                autoSelectFirst: false,
                serviceUrl: null,
                onInvalidateSelection: $.noop,
                onSearchStart: $.noop,
                onSearchComplete: $.noop,
                onSearchError: $.noop,
                onSelect: null,
                onSelectNothing: null,
                minChars: 1,
                width: 'auto',
                zIndex: 9999,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                paramName: 'query',
                formatResult: Suggestions.formatResult,
                delimiter: null,
                noCache: false,
                containerClass: 'suggestions-suggestions',
                tabDisabled: false,
                triggerSelectOnSpace: true,
                preventBadQueries: false,
                usePreloader: true,
                hint: Suggestions.defaultHint,
                useDadata: true,
                type: null,
                count: Suggestions.defaultCount,
                constraints: null,
                restrict_value: false,
                $helpers: null
            };

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.currentRequest = null;
        that.currentEnrichRequest = null;
        that.onChangeTimeout = null;
        that.$wrapper = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            hint: 'suggestions-hint',
            selected: 'suggestions-selected',
            suggestion: 'suggestions-suggestion',
            removeConstraint: 'suggestions-remove'
        };
        that.selection = null;
        that.$viewport = $(window);
        that.matchers = [utils.matchByNormalizedQuery, utils.matchByWords];
        that.type = null;

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);
    }

    Suggestions.utils = utils;

    Suggestions.formatResult = function (suggestion, currentValue) {
        var pattern = '(^|\\s+)(' + utils.escapeRegExChars(currentValue) + ')';
        return suggestion.value.replace(new RegExp(pattern, 'gi'), '$1<strong>$2<\/strong>');
    };

    Suggestions.defaultHint = 'Выберите вариант ниже или продолжите ввод';

    Suggestions.defaultCount = 10;

    $.Suggestions = Suggestions;

    Suggestions.prototype = {

        // Creation and destruction

        initialize: function () {
            var that = this;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off');
            this.el.addClass('suggestions-input')
                .css('box-sizing', 'border-box');

            that.uniqueId = utils.uniqueId('i');

            that.createWrapper();
            that.applyHooks(initializeHooks);

            that.bindWindowEvents();

            that.fixPosition();
        },

        dispose: function () {
            var that = this;
            that.applyHooks(disposeHooks);
            that.el.removeData(dataAttrKey)
                .removeClass('suggestions-input');
            that.unbindWindowEvents();
            that.removeWrapper();
        },

        applyHooks: function(hooks) {
            var that = this,
                args = utils.slice(arguments, 1);

            return $.map(hooks, function(hook){
                return hook.apply(that, args);
            });
        },

        createWrapper: function () {
            var that = this;

            that.$wrapper = $('<div class="suggestions-wrapper"/>');
            that.el.after(that.$wrapper);

            that.$wrapper.add(that.options.$helpers).on('mousedown' + eventNS, $.proxy(that.onMousedown, that));
        },

        removeWrapper: function () {
            this.$wrapper.remove();
        },

        /** This whole handler is needed to prevent blur event on textbox
         * when suggestion is clicked (blur leads to suggestions hide, so we need to prevent it).
         * See https://github.com/jquery/jquery-ui/blob/master/ui/autocomplete.js for details
         */
        onMousedown: function (event) {
            var that = this;

            // prevent moving focus out of the text field
            event.preventDefault();

            // IE doesn't prevent moving focus even with event.preventDefault()
            // so we set a flag to know when we should ignore the blur event
            that.cancelBlur = true;
            utils.delay(function () {
                delete that.cancelBlur;
            });

            // clicking on the scrollbar causes focus to shift to the body
            // but we can't detect a mouseup or a click immediately afterward
            // so we have to track the next mousedown and close the menu if
            // the user clicks somewhere outside of the autocomplete
            if (!$(event.target).closest(".ui-menu-item").length) {
                utils.delay(function () {
                    $(document).one("mousedown", function (event) {
                        var $elements = that.el
                            .add(that.$wrapper)
                            .add(that.options.$helpers);

                        $elements = $elements.filter(function(){
                            return this === event.target || $.contains(this, event.target);
                        });

                        if (!$elements.length) {
                            that.hide();
                        }
                    });
                });
            }
        },

        bindWindowEvents: function () {
            var that = this;
            that.$viewport.on('resize' + eventNS + that.uniqueId, $.proxy(that.fixPosition, that));
        },

        unbindWindowEvents: function () {
            this.$viewport.off('resize' + eventNS + this.uniqueId);
        },

        // Configuration methods

        setOptions: function (suppliedOptions) {
            var that = this;

            $.extend(that.options, suppliedOptions);

            that.type = types[that.options.type];
            if (!that.type) {
                throw '`type` option is incorrect! Must be one of: ' + $.map(types, function(i, type){ return '"' + type + '"'; }).join(', ');
            }

            that.applyHooks(setOptionsHooks);
        },

        // Common public methods

        fixPosition: function () {
            var that = this,
                elLayout = {},
                elOffset,
                wrapperOffset,
                origin;

            // reset input's padding to default, determined by css
            that.el.css('paddingLeft', '');
            elLayout.paddingLeft = parseFloat(that.el.css('paddingLeft'));
            elLayout.paddingRight = parseFloat(that.el.css('paddingRight'));

            elOffset = that.el.offset();
            elLayout.borderTop = that.el.css('border-top-style') == 'none' ? 0 : parseFloat(that.el.css('border-top-width'));
            elLayout.borderLeft = that.el.css('border-left-style') == 'none' ? 0 : parseFloat(that.el.css('border-left-width'));
            elLayout.innerHeight = that.el.innerHeight();
            elLayout.innerWidth = that.el.innerWidth();
            wrapperOffset = that.$wrapper.offset();

            origin = {
                top: elOffset.top - wrapperOffset.top,
                left: elOffset.left - wrapperOffset.left
            };

            that.applyHooks(fixPositionHooks, origin, elLayout);

            that.el.css('paddingLeft', elLayout.paddingLeft + 'px');
        },

        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.selection = null;
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            utils.abortRequests(that.currentRequest, that.currentEnrichRequest);
            that.hide();
        },

        enable: function () {
            this.disabled = false;
        },

        setSuggestion: function(suggestion){
            var that = this;

            if ($.isPlainObject(suggestion) && suggestion.value) {
                that.currentValue = suggestion.value;
                that.el.val(suggestion.value);
                that.selection = suggestion;
                utils.abortRequests(that.currentRequest, that.currentEnrichRequest);
            }
        },

        // Querying related methods

        getAjaxParams: function (method) {
            var that = this,
                token = $.trim(that.options.token),
                serviceUrl = that.options.serviceUrl,
                serviceMethod = serviceMethods[method],
                params = $.extend({}, serviceMethod.defaultParams);

            if (!/\/$/.test(serviceUrl)) {
                serviceUrl += '/';
            }
            serviceUrl += method;
            if (serviceMethod.addTypeInUrl) {
                serviceUrl += '/' + that.type.urlSuffix;
            }

            serviceUrl = utils.fixURLProtocol(serviceUrl);

            if (token) {
                if ($.support.cors) {
                    // for XMLHttpRequest put token in header
                    params.headers = params.headers || {};
                    params.headers['Authorization'] = 'Token ' + token;
                } else {
                    // for XDomainRequest put token into URL
                    serviceUrl = utils.addUrlParams(serviceUrl, {
                        'token': token
                    });
                }
            }

            params.url = serviceUrl;

            return params;
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        constructRequestParams: function(q){
            var that = this,
                options = that.options,
                params = $.extend({}, options.params);

            $.each(that.applyHooks(requestParamsHooks), function(i, hookParams){
                $.extend(params, hookParams);
            });
            params[options.paramName] = q;
            if ($.isNumeric(options.count) && options.count > 0) {
                params.count = options.count;
            }

            return params;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params = that.constructRequestParams(q),
                cacheKey;

            cacheKey = serviceUrl + '?' + $.param(params || {});
            response = that.cachedResponse[cacheKey];
            if (response && $.isArray(response.suggestions)) {
                that.assignSuggestions(response.suggestions, q);
            } else if (!that.isBadQuery(q)) {
                if (options.onSearchStart.call(that.element, params) === false) {
                    return;
                }
                utils.abortRequests(that.currentRequest, that.currentEnrichRequest);
                that.showPreloader();
                that.currentRequest = $.ajax(
                    $.extend(that.getAjaxParams('suggest'), {
                        data: utils.serialize(params)
                    }));
                that.currentRequest.always(function () {
                    that.currentRequest = null;
                }).done(function (response) {
                    that.enrichService.enrichResponse.call(that, response, that.getUnrestrictedValue(q), that.restrictValues)
                        .done(function (enrichedResponse) {
                            that.processResponse(enrichedResponse, q, cacheKey);
                            options.onSearchComplete.call(that.element, q, enrichedResponse.suggestions);
                            that.hidePreloader();
                        })
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                    that.hidePreloader();
                });
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries) {
                return false;
            }

            var result = false;
            $.each(this.badQueries, function (i, query) {
                return !(result = q.indexOf(query) === 0);
            });
            return result;
        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return { value: value, data: null };
                });
            }

            return suggestions;
        },

        processResponse: function (response, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            if (!response || !$.isArray(response.suggestions)) {
                return;
            }

            response.suggestions = that.verifySuggestionsFormat(response.suggestions);
            that.setUnrestrictedValues(response.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = response;
                if (options.preventBadQueries && response.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.assignSuggestions(response.suggestions, originalQuery);
        },

        assignSuggestions: function(suggestions, query) {
            var that = this;
            that.suggestions = suggestions;
            that.applyHooks(assignSuggestionsHooks, query);
        },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        shouldRestrictValues: function() {
            var that = this;
            // treat suggestions value as restricted only if there is one constraint
            // and restrict_value is true
            return that.options.restrict_value
                && that.constraints
                && Object.keys(that.constraints).length == 1;
        },

        /**
         * Strips restricted part from suggestion value.
         * Used for Dadata suggestions.
         */
        restrictValues: function(suggestions) {
            var that = this;
            if (!that.shouldRestrictValues()) {
                return;
            }
            var label = that.getConstraintLabel();
            $.each(suggestions, function(i, suggestion) {
                var restriction = label + ', ';
                var restrictionIdx = suggestion.value.indexOf(restriction);
                // remove everything from the beginning to the first restriction label match
                // including the label itself
                if (restrictionIdx !== -1) {
                    suggestion.value = suggestion.value.substring(restrictionIdx + restriction.length);
                }
            });
        },

        /**
         * Fills suggestion.unrestricted_value property
         */
        setUnrestrictedValues: function(suggestions) {
            var that = this,
                shouldRestrict = that.shouldRestrictValues(),
                label = that.getConstraintLabel();
            $.each(suggestions, function(i, suggestion) {
                suggestion.unrestricted_value = shouldRestrict ? label + ', ' + suggestion.value : suggestion.value;
            });
        },

        /**
         * Returns suggestion value concatenated with restricted part.
         * Used for Dadata suggestions
         * @returns {string}
         */
        getUnrestrictedValue: function(value) {
            var that = this;
            return that.shouldRestrictValues()
                ? that.getConstraintLabel() + ', ' + value
                : value;
        },

        findSuggestionIndex: function (query) {
            var that = this,
                index = -1,
                stopwords = that.type.STOPWORDS || [];

            if ($.trim(query) !== '') {
                $.each(that.matchers, function(i, matcher) {
                    index = matcher(query, that.suggestions, stopwords);
                    return index === -1;
                });
            }
            return index;
        }

    };

    (function(){
        /**
         * Methods related to INPUT's behavior
         */

        var methods = {

            bindElementEvents: function () {
                var that = this;

                that.el.on('keydown' + eventNS, $.proxy(that.onElementKeyDown, that));
                that.el.on('keyup' + eventNS, $.proxy(that.onElementKeyUp, that));
                that.el.on('blur' + eventNS, $.proxy(that.onElementBlur, that));
                that.el.on('focus' + eventNS, $.proxy(that.onElementFocus, that));
                that.el.on('change' + eventNS, $.proxy(that.onElementKeyUp, that));
            },

            unbindElementEvents: function () {
                this.el.off(eventNS);
            },

            onElementBlur: function () {
                var that = this;
                // suggestion was clicked, blur should be ignored
                // see container mousedown handler
                if (that.cancelBlur) {
                    delete that.cancelBlur;
                    return;
                }
                that.selectCurrentValue({ trim: true, noSpace: true });
                utils.abortRequests(that.currentRequest);
            },

            onElementFocus: function () {
                var that = this;

                if (!that.cancelFocus) {
                    that.fixPosition();
                    that.proceedQuery(that.getQuery(that.el.val()));
                }
                that.cancelFocus = false;
            },

            onElementKeyDown: function (e) {
                var that = this;

                if (that.disabled) {
                    return;
                }

                that._waitingForTriggerSelectOnSpace = false;

                if (!that.visible) {
                    switch (e.which) {
                        // If suggestions are hidden and user presses arrow down, display suggestions
                        case keys.DOWN:
                            that.suggest();
                            break;
                        // if no suggestions available and user pressed Enter
                        case keys.RETURN:
                            that.triggerOnSelectNothing();
                            break;
                        case keys.SPACE:
                            that._waitingForTriggerSelectOnSpace = true;
                    }
                    return;
                }

                switch (e.which) {
                    case keys.ESC:
                        that.el.val(that.currentValue);
                        that.hide();
                        utils.abortRequests(that.currentRequest);
                        break;

                    case keys.TAB:
                        if (that.options.tabDisabled === false) {
                            return;
                        }
                        break;

                    case keys.RETURN:
                        that.selectCurrentValue({ trim: true });
                        break;

                    case keys.SPACE:
                        if (that.options.triggerSelectOnSpace && that.isCursorAtEnd()) {
                            var selected = that.selectCurrentValue({continueSelecting: true, noSpace: true}) !== -1;

                            // set this flag to seek and select matched suggestion when server responds
                            that._waitingForTriggerSelectOnSpace = !selected;

                            // set this flag to prevent enrich request interruption during onKeyUp and onValueChange
                            that.cancelKeyUp = selected;
                        }
                        return;
                    case keys.UP:
                        that.moveUp();
                        break;
                    case keys.DOWN:
                        that.moveDown();
                        break;
                    default:
                        return;
                }

                // Cancel event if function did not return:
                e.stopImmediatePropagation();
                e.preventDefault();
            },

            onElementKeyUp: function (e) {
                var that = this;

                if (that.disabled || that.cancelKeyUp) {
                    that.cancelKeyUp = false;
                    return;
                }

                switch (e.which) {
                    case keys.UP:
                    case keys.DOWN:
                        return;
                }

                clearTimeout(that.onChangeTimeout);

                if (that.currentValue !== that.el.val()) {
                    if (that.options.deferRequestBy > 0) {
                        // Defer lookup in case when value changes very quickly:
                        that.onChangeTimeout = utils.delay(function () {
                            that.onValueChange();
                        }, that.options.deferRequestBy);
                    } else {
                        that.onValueChange();
                    }
                }
            },

            onValueChange: function () {
                var that = this,
                    options = that.options,
                    value = that.el.val(),
                    query = that.getQuery(value);

                if (that.selection) {
                    (options.onInvalidateSelection || $.noop).call(that.element, that.selection);
                    that.selection = null;
                }

                clearTimeout(that.onChangeTimeout);
                that.currentValue = value;
                that.selectedIndex = -1;

                that.proceedQuery(query);
            },

            isCursorAtEnd: function () {
                var that = this,
                    valLength = that.el.val().length,
                    selectionStart = that.element.selectionStart,
                    range;

                if (typeof selectionStart === 'number') {
                    return selectionStart === valLength;
                }
                if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart('character', -valLength);
                    return valLength === range.text.length;
                }
                return true;
            }

        };

        $.extend(Suggestions.prototype, methods);

        initializeHooks.push(methods.bindElementEvents);

        disposeHooks.push(methods.unbindElementEvents);

    }());

    (function(){
        /**
         * Methods related to plugin's authorization on server
         */

        var tokenRequests = {};

        var methods = {

            checkToken: function () {
                var that = this,
                    token = $.trim(that.options.token),
                    tokenRequest = tokenRequests[token];

                function onTokenReady() {
                    that.checkToken();
                }

                if (token) {
                    if (tokenRequest && $.isFunction(tokenRequest.promise)) {
                        switch (tokenRequest.state()) {
                            case 'resolved':
                                that.enable();
                                break;
                            case 'rejected':
                                that.disable();
                                break;
                            default:
                                tokenRequest.always(onTokenReady);
                        }
                    } else {
                        (tokenRequests[token] = $.ajax(that.getAjaxParams('suggest')))
                            .always(onTokenReady);
                    }
                }
            }

        };

        Suggestions.resetTokens = function () {
            tokenRequests = {};
        };

        $.extend(Suggestions.prototype, methods);

        setOptionsHooks.push(methods.checkToken);

    }());

    (function() {

        var locationRequest;

        var methods = {

            checkLocation: function () {
                var that = this;

                if (!that.type.geoEnabled || that.options.constraints != null) {
                    return;
                }

                if (!locationRequest) {
                    locationRequest = $.ajax(that.getAjaxParams('detectAddressByIp'));
                }

                locationRequest.done(function (resp) {
                    var addr = resp && resp.location && resp.location.data;
                    if (addr && addr.kladr_id) {
                        that.enableGeolocation(addr);
                    }
                });
            },

            enableGeolocation: function(address) {
                var that = this,
                    constraint = that.formatConstraint({
                        deletable: true,
                        restrictions: address
                    });
                constraint.restrictions = [ { kladr_id: address.kladr_id } ];
                that.setupConstraints(constraint);
                // strip restricted value from suggestion value when geolocation is on
                that.options.restrict_value = true;
            }

        };

        $.extend(Suggestions.prototype, methods);

        setOptionsHooks.push(methods.checkLocation);

    }());

    (function(){
        /**
         * Methods related to enrichment functionality
         */

        var dadataConfig = {
            url: 'https://dadata.ru/api/v2/clean',
            timeout: 1000
        };

        var enrichServices = {
            'default': {
                enrichSuggestion: function (suggestion) {
                    return $.Deferred().resolve(suggestion);
                },
                enrichResponse: function (response, query, fnProcess) {
                    return $.Deferred().resolve(response);
                }
            },
            'dadata': (function () {
                var fieldParsers = {};

                /**
                 * Values of `gender` from dadata.ru differ from ones in original suggestions
                 * @param value
                 * @returns {{gender: string}}
                 */
                fieldParsers.gender = function (value) {
                    return {
                        gender: value == 'М' ? 'MALE' :
                            value == 'Ж' ? 'FEMALE' : 'UNKNOWN'
                    }
                };

                function startRequest(query) {
                    var that = this,
                        token = $.trim(that.options.token),
                        data = {
                            structure: [that.options.type],
                            data: [
                                [ query ]
                            ]
                        },
                        url = dadataConfig.url,
                        params = {
                            type: 'POST',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(data),
                            timeout: dadataConfig.timeout
                        };

                    url = utils.fixURLProtocol(url);

                    if ($.support.cors) {
                        // for XMLHttpRequest put token in header
                        params.headers = {
                            'Authorization': 'Token ' + token
                        }
                    } else {
                        // for XDomainRequest put token into URL
                        url = utils.addUrlParams(url, {
                            'token': token
                        });
                    }

                    that.currentEnrichRequest = $.ajax(url, params);
                    return that.currentEnrichRequest.always(function(){
                        that.currentEnrichRequest = null;
                    });
                }

                function shouldOverrideField(field, data) {
                    return !(field in data) || field === 'house' || (field === 'okato' && !data[field]);
                }

                return {
                    enrichSuggestion: function (suggestion) {
                        var that = this,
                            resolver = $.Deferred();

                        // if current suggestion is from dadata, use it
                        if (suggestion.data && 'qc' in suggestion.data) {
                            return resolver.resolve(suggestion);
                        }

                        that.showPreloader();
                        that.disableDropdown();
                        startRequest.call(that, suggestion.unrestricted_value)
                            .always(function () {
                                that.hidePreloader();
                                that.enableDropdown();
                            })
                            .done(function (resp) {
                                var data = resp.data,
                                    s = data && data[0] && data[0][0];

                                if (s) {
                                    if (!suggestion.data) {
                                        suggestion.data = {};
                                    }
                                    if (s.qc === 0) {
                                        // should enrich suggestion only if Dadata returned good qc
                                        delete s.source;
                                        $.each(s, function (field, value) {
                                            if (shouldOverrideField(field, suggestion.data)) {
                                                var parser = fieldParsers[field];
                                                if (parser) {
                                                    $.extend(suggestion.data, parser(value))
                                                } else {
                                                    suggestion.data[field] = value;
                                                }
                                            }
                                        });
                                    } else {
                                        // but even if qc is bad, should add it to suggestion object
                                        suggestion.data.qc = s.qc;
                                        if ('qc_complete' in s) {
                                            suggestion.data.qc_complete = s.qc_complete;
                                        }
                                    }
                                }

                                resolver.resolve(suggestion);
                            })
                            .fail(function () {
                                resolver.resolve(suggestion);
                            });
                        return resolver;
                    },
                    enrichResponse: function (response, query, fnProcess) {
                        var that = this,
                            suggestions = response.suggestions || [],
                            resolver = $.Deferred();

                        if (suggestions.length) {
                            return resolver.resolve(response);
                        }

                        startRequest.call(that, query)
                            .done(function (resp) {
                                var data = resp.data,
                                    value;
                                data = data && data[0] && data[0][0];
                                if (data) {
                                    delete data.source;
                                    value = that.type.composeValue(data);
                                    if (value) {
                                        $.each(fieldParsers, function (field, parser) {
                                            if (field in data) {
                                                $.extend(data, parser(data[field]));
                                            }
                                        });
                                        response.suggestions = [
                                            {
                                                value: value,
                                                data: data
                                            }
                                        ];
                                        if (fnProcess) {
                                            fnProcess.call(that, response.suggestions);
                                        }
                                    }
                                }
                                resolver.resolve(response);
                            })
                            .fail(function () {
                                resolver.resolve(response);
                            });
                        return resolver;
                    }
                }
            }())
        };

        var methods = {
            selectEnrichService: function () {
                var that = this,
                    type = that.options.type,
                    token = $.trim(that.options.token);

                if (that.options.useDadata && type && types[type] && token) {
                    that.enrichService = enrichServices['dadata'];
                } else {
                    that.enrichService = enrichServices['default'];
                }
            }
        };

        Suggestions.dadataConfig = dadataConfig;

        setOptionsHooks.push(methods.selectEnrichService);

    }());

    (function(){
        /**
         * Methods related to suggestions dropdown list
         */

        var methods = {

            createContainer: function () {
                var that = this,
                    suggestionSelector = '.' + that.classes.suggestion,
                    options = that.options,
                    $container = $('<div/>')
                        .addClass(options.containerClass)
                        .css({
                            position: 'absolute',
                            display: 'none'
                        });

                that.$container = $container;
                that.$wrapper.append($container);

                // Only set width if it was provided:
                if (options.width !== 'auto') {
                    $container.width(options.width);
                }

                $container.on('mouseover' + eventNS, suggestionSelector, $.proxy(that.onSuggestionMouseover, that));
                $container.on('click' + eventNS, suggestionSelector, $.proxy(that.onSuggestionClick, that));
                $container.on('mouseout' + eventNS, $.proxy(that.onSuggestionsMouseout, that));
            },

            applyContainerOptions: function () {
                var that = this,
                    options = that.options;

                // Adjust height, width and z-index:
                that.$container.css({
                    'max-height': options.maxHeight + 'px',
                    'z-index': options.zIndex,
                    'width': options.width
                });
            },

            // Dropdown event handlers

            /**
             * Listen for mouse over event on suggestions list:
             */
            onSuggestionMouseover: function (e) {
                this.activate(this.getClosestSuggestionIndex(e.target));
            },

            /**
             * Listen for click event on suggestions list:
             */
            onSuggestionClick: function (e) {
                var that = this;
                if (!that.dropdownDisabled) {
                    that.select(that.getClosestSuggestionIndex(e.target));
                }
                that.cancelFocus = true;
                that.el.focus();
            },

            /**
             * Deselect active element when mouse leaves suggestions container:
             */
            onSuggestionsMouseout: function () {
                this.deactivate(false);
            },

            // Dropdown UI methods

            setDropdownPosition: function (origin, elLayout) {
                var that = this;

                that.$container.css({
                    left: origin.left + 'px',
                    top: origin.top + elLayout.borderTop + elLayout.innerHeight + 'px',
                    width: (that.options.width === 'auto' ? that.el.outerWidth() : that.options.width) + 'px'
                });
            },

            getClosestSuggestionIndex: function (el) {
                var that = this,
                    $item = $(el),
                    selector = '.' + that.classes.suggestion + '[data-index]';
                if (!$item.is(selector)) {
                    $item = $item.closest(selector);
                }
                return $item.data('index');
            },

            getSuggestionsItems: function () {
                return this.$container.children('.' + this.classes.suggestion);
            },

            toggleDropdownEnabling: function (enable) {
                this.dropdownDisabled = !enable;
                this.$container.attr('disabled', !enable);
            },

            disableDropdown: function () {
                this.toggleDropdownEnabling(false);
            },

            enableDropdown: function () {
                this.toggleDropdownEnabling(true);
            },

            /**
             * Shows if there are any suggestions besides currently selected
             * @returns {boolean}
             */
            hasSuggestionsToChoose: function () {
                var that = this;
                return that.suggestions.length > 1 ||
                    (that.suggestions.length === 1 &&
                        (!that.selection || $.trim(that.suggestions[0].value) != $.trim(that.selection.value))
                    );
            },

            suggest: function () {
                if (!this.hasSuggestionsToChoose()) {
                    this.hide();
                    return;
                }

                var that = this,
                    options = that.options,
                    formatResult = options.formatResult,
                    trimmedValue = $.trim(that.getQuery(that.currentValue)),
                    beforeRender = options.beforeRender,
                    html = [],
                    index;

                // Build hint html
                if (options.hint && that.suggestions.length) {
                    html.push('<div class="' + that.classes.hint + '">' + options.hint + '</div>');
                }
                // Build suggestions inner HTML:
                $.each(that.suggestions, function (i, suggestion) {
                    html.push('<div class="' + that.classes.suggestion + '" data-index="' + i + '">' + formatResult(suggestion, trimmedValue) + '</div>');
                });

                that.$container.html(html.join(''));

                // Select first value by default:
                if (options.autoSelectFirst) {
                    that.selectedIndex = 0;
                    that.getSuggestionsItems().first().addClass(that.classes.selected);
                }

                if ($.isFunction(beforeRender)) {
                    beforeRender.call(that.element, that.$container);
                }

                that.$container.show();
                that.visible = true;
            },

            hide: function () {
                var that = this;
                that.visible = false;
                that.selectedIndex = -1;
                that.$container.hide()
                    .empty();
            },

            activate: function (index) {
                var that = this,
                    activeItem,
                    selected = that.classes.selected,
                    $children;

                if (!that.dropdownDisabled) {
                    $children = that.getSuggestionsItems();

                    $children.removeClass(selected);

                    that.selectedIndex = index;

                    if (that.selectedIndex !== -1 && $children.length > that.selectedIndex) {
                        activeItem = $children.get(that.selectedIndex);
                        $(activeItem).addClass(selected);
                        return activeItem;
                    }
                }

                return null;
            },

            deactivate: function (restoreValue) {
                var that = this;

                if (!that.dropdownDisabled) {
                    that.selectedIndex = -1;
                    that.getSuggestionsItems().removeClass(that.classes.selected);
                    if (restoreValue) {
                        that.el.val(that.currentValue);
                    }
                }
            },

            moveUp: function () {
                var that = this;

                if (that.dropdownDisabled) {
                    return;
                }
                if (that.selectedIndex === -1) {
                    if (that.suggestions.length) {
                        that.adjustScroll(that.suggestions.length - 1);
                    }
                    return;
                }

                if (that.selectedIndex === 0) {
                    that.deactivate(true);
                    return;
                }

                that.adjustScroll(that.selectedIndex - 1);
            },

            moveDown: function () {
                var that = this;

                if (that.dropdownDisabled) {
                    return;
                }
                if (that.selectedIndex === (that.suggestions.length - 1)) {
                    that.deactivate(true);
                    return;
                }

                that.adjustScroll(that.selectedIndex + 1);
            },

            adjustScroll: function (index) {
                var that = this,
                    activeItem = that.activate(index),
                    offsetTop,
                    upperBound,
                    lowerBound,
                    heightDelta = 25;

                if (!activeItem) {
                    return;
                }

                offsetTop = activeItem.offsetTop;
                upperBound = that.$container.scrollTop();
                lowerBound = upperBound + that.options.maxHeight - heightDelta;

                if (offsetTop < upperBound) {
                    that.$container.scrollTop(offsetTop);
                } else if (offsetTop > lowerBound) {
                    that.$container.scrollTop(offsetTop - that.options.maxHeight + heightDelta);
                }

                that.el.val(that.getValue(that.suggestions[index].value));
            }

        };

        $.extend(Suggestions.prototype, methods);

        initializeHooks.push(methods.createContainer);

        setOptionsHooks.push(methods.applyContainerOptions);

        fixPositionHooks.push(methods.setDropdownPosition);

        assignSuggestionsHooks.push(methods.suggest);

    }());

    (function(){
        /**
         * Methods related to PRELOADER component
         */

        var methods = {

            createPreloader: function () {
                var that = this;

                that.$preloader = $('<i class="suggestions-preloader"/>');
                that.$wrapper.append(that.$preloader);
            },

            setPreloaderPosition: function(origin, elLayout){
                var that = this;

                that.$preloader.css({
                    left: origin.left + elLayout.borderLeft + elLayout.innerWidth - that.$preloader.width() - elLayout.paddingRight + 'px',
                    top: origin.top + elLayout.borderTop + Math.round((elLayout.innerHeight - that.$preloader.height()) / 2) + 'px'
                });
            },

            showPreloader: function () {
                if (this.options.usePreloader) {
                    this.$preloader
                        .stop(true)
                        .delay(50)
                        .animate({'opacity': 1}, 'fast');
                }
            },

            hidePreloader: function () {
                if (this.options.usePreloader) {
                    this.$preloader
                        .stop(true)
                        .animate({'opacity': 0}, 'fast');
                }
            }

        };

        $.extend(Suggestions.prototype, methods);

        initializeHooks.push(methods.createPreloader);

        fixPositionHooks.push(methods.setPreloaderPosition);

    }());

    (function(){
        /**
         * Methods related to CONSTRAINTS component
         */

        var methods = {

            createConstraints: function () {
                var that = this;

                that.constraints = {};

                that.$constraints = $('<ul class="suggestions-constraints"/>');
                that.$wrapper.append(that.$constraints);
                that.$constraints.on('click', '.' + that.classes.removeConstraint, $.proxy(that.onConstraintRemoveClick, that));
            },

            setConstraintsPosition: function(origin, elLayout){
                var that = this;

                that.$constraints.css({
                    left: origin.left + elLayout.borderLeft + elLayout.paddingLeft + 'px',
                    top: origin.top + elLayout.borderTop + Math.round((elLayout.innerHeight - that.$constraints.height()) / 2) + 'px'
                });

                elLayout.paddingLeft += that.$constraints.outerWidth(true);
            },

            onConstraintRemoveClick: function (e) {
                var that = this,
                    $item = $(e.target).closest('li'),
                    id = $item.attr('data-constraint-id');

                // Delete constraint data before animation to let correct requests to be sent while fading
                delete that.constraints[id];
                // Request for new suggestions
                that.proceedQuery(that.getQuery(that.el.val()));

                $item.fadeOut('fast', function () {
                    that.removeConstraint(id);
                });
            },

            setupConstraints: function (defaultConstraint) {
                var that = this,
                    constraints = that.options.constraints;

                if (constraints === false) {
                    return;
                }

                if (!constraints && !(constraints = defaultConstraint)) {
                    return;
                }

                that._constraintsUpdating = true;
                $.each(that.constraints, $.proxy(that.removeConstraint, that));
                $.each($.makeArray(constraints), function (i, constraint) {
                    that.addConstraint(constraint);
                });
                that._constraintsUpdating = false;
                that.fixPosition();
            },

            formatConstraint: function (constraint) {
                var that = this;

                if (constraint && constraint.restrictions) {
                    constraint.restrictions = $.makeArray(constraint.restrictions);
                    if (!constraint.label) {
                        constraint.label = $.map(constraint.restrictions, function(restriction){
                            return that.type.composeValue(restriction);
                        }).join(', ');
                    }
                    return constraint;
                }
            },

            addConstraint: function (constraint) {
                var that = this,
                    $item,
                    id;

                constraint = that.formatConstraint(constraint);
                if (!constraint) {
                    return;
                }

                id = utils.uniqueId('c');
                that.constraints[id] = constraint;
                $item = $('<li/>')
                    .append($('<span/>').text(constraint.label))
                    .attr('data-constraint-id', id);
                if (constraint.deletable) {
                    $item.append($('<span class="suggestions-remove"/>'));
                }

                that.$constraints.append($item);
                if (!that._constraintsUpdating) {
                    that.fixPosition();
                }
            },

            removeConstraint: function (id) {
                var that = this;
                delete that.constraints[id];
                that.$constraints.children('[data-constraint-id="' + id + '"]').remove();
                if (!that._constraintsUpdating) {
                    that.fixPosition();
                }
            },

            constructConstraintsParams: function () {
                var that = this,
                    restrictions = [],
                    params = {};

                $.each(that.constraints, function(id, constraint){
                    restrictions = restrictions.concat(constraint.restrictions);
                });
                if (restrictions.length) {
                    params.restrictions = restrictions;
                    params.restrict_value = that.options.restrict_value;
                }
                return params;
            },

            /**
             * Returns label of the first constraint (if any), empty string otherwise
             * @returns {String}
             */
            getConstraintLabel: function() {
                var that = this,
                    constraints_id = that.constraints && Object.keys(that.constraints)[0];

                return constraints_id ? that.constraints[constraints_id].label : '';
            }

        };

        $.extend(Suggestions.prototype, methods);

        initializeHooks.push(methods.createConstraints);

        setOptionsHooks.push(methods.setupConstraints);

        fixPositionHooks.push(methods.setConstraintsPosition);

        requestParamsHooks.push(methods.constructConstraintsParams);

    }());

    (function(){
        /**
         * Methods for selecting a suggestion
         */

        var methods = {

            proceedQuery: function (query) {
                var that = this;

                if (query.length >= that.options.minChars) {
                    that.getSuggestions(query);
                } else {
                    that.hide();
                }
            },

            /**
             * Selects current or first matched suggestion
             * @param selectionOptions
             * @returns {number} index of found suggestion
             */
            selectCurrentValue: function (selectionOptions) {
                var that = this,
                    index = that.selectedIndex,
                    trim = selectionOptions && selectionOptions.trim;

                if (index === -1) {
                    var value = that.getQuery(that.el.val());
                    if (trim) {
                        value = $.trim(value);
                    }
                    index = that.findSuggestionIndex(value);
                }
                that.select(index, selectionOptions);
                return index;
            },

            /**
             * Selects a suggestion at specified index
             * @param index index of suggestion to select. Can be -1
             * @param selectionOptions  Contains flags:
             *          `continueSelecting` prevents hiding after selection,
             *          `noSpace` - prevents adding space at the end of current value
             */
            select: function (index, selectionOptions) {
                var that = this,
                    suggestion = that.suggestions[index],
                    continueSelecting = selectionOptions && selectionOptions.continueSelecting,
                    noSpace = selectionOptions && selectionOptions.noSpace;

                // if no suggestion to select
                if (!suggestion) {
                    if (!continueSelecting && !that.selection) {
                        that.triggerOnSelectNothing();
                    }
                    onSelectionCompleted();
                    return;
                }

                // Set input's value to prevent onValueChange handler
                that.currentValue = that.getValue(suggestion.value);
                that.el.val(that.currentValue);

                that.enrichService.enrichSuggestion.call(that, suggestion)
                    .done(function (enrichedSuggestion) {
                        var assumeDataComplete = that.type.isDataComplete.call(that, enrichedSuggestion.data);

                        if (assumeDataComplete) {
                            continueSelecting = false;
                        }

                        if (!noSpace && !assumeDataComplete) {
                            that.currentValue += ' ';
                            that.el.val(that.currentValue);
                        }
                        that.selection = enrichedSuggestion;

                        that.triggerOnSelect(enrichedSuggestion);
                        onSelectionCompleted();
                    });

                function onSelectionCompleted() {
                    if (continueSelecting) {
                        that.selectedIndex = -1;
                        that.getSuggestions(that.currentValue);
                    } else {
                        that.hide();
                        that.suggestions = [];
                    }
                }

            },

            triggerOnSelect: function(suggestion) {
                var that = this,
                    callback = that.options.onSelect;

                if ($.isFunction(callback)) {
                    callback.call(that.element, suggestion);
                }
            },

            triggerOnSelectNothing: function() {
                var that = this,
                    callback = that.options.onSelectNothing;

                if ($.isFunction(callback)) {
                    callback.call(that.element, that.currentValue);
                }
            },

            trySelectOnSpace: function (value) {
                var that = this,
                    rLastSpace = /\s$/,
                    index;

                if (that.options.triggerSelectOnSpace &&
                    that._waitingForTriggerSelectOnSpace &&
                    rLastSpace.test(value)
                    ) {
                    index = that.findSuggestionIndex($.trim(value));
                    if (index !== -1) {
                        that._waitingForTriggerSelectOnSpace = false;
                        that.select(index, {continueSelecting: true});
                    }
                }
            }

        };

        $.extend(Suggestions.prototype, methods);

        assignSuggestionsHooks.push(methods.trySelectOnSpace)

    }());

    // Create chainable jQuery plugin:
    $.fn.suggestions = function (options, args) {
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0) {
            return this.first().data(dataAttrKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataAttrKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Suggestions(this, options);
                inputElement.data(dataAttrKey, instance);
            }
        });
    };

}));
