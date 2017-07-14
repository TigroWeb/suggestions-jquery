this.helpers = (function () {

    var helpers = {

        keyCodes: {
            Enter: 13,
            Escape: 27,
            Tab: 9,
            Space: 32,
            ArrowUp: 38,
            ArrowDown: 40
        },

        keydown: function (el, key) {
            var event;
            try {
                // Chrome, Safari, Firefox
                event = new KeyboardEvent('keydown', { key: key, keyCode: this.keyCodes[key], bubbles: true });
            } catch (e) {
                // PhantomJS
                event = document.createEvent('Event');
                event.key = key;
                event.keyCode = this.keyCodes[key];
                event.initEvent('keydown', true, true);
            }
            el.dispatchEvent(event);
        },
        keyup: function (el, key) {
            var event;
            try {
                // Chrome, Safari, Firefox
                event = new KeyboardEvent('keyup', { key: key, keyCode: this.keyCodes[key], bubbles: true });
            } catch (e) {
                // PhantomJS (wat!)
                event = document.createEvent('Event');
                event.key = this.key;
                event.keyCode = this.keyCodes[key];
                event.initEvent('keyup', true, true);
            }
            el.dispatchEvent(event);
        },
        responseFor: function (suggestions) {
            return [
                200,
                { 'Content-type': 'application/json' },
                JSON.stringify({
                    suggestions: suggestions
                })
            ];
        },
        hitEnter: function (el) {
            helpers.keydown(el, 'Enter'); // code of Enter
        },
        fireBlur: function (el) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('blur', true, true);
            el.dispatchEvent(event);
        },
        appendUnrestrictedValue: function (suggestion) {
            return $.extend({}, suggestion, { 'unrestricted_value': suggestion.value });
        },
        wrapFormattedValue: function (value, status) {
            return '<span class="suggestions-value"' + (status ? ' data-suggestion-status="' + status + '"' : '') + '>' +
                value +
                '</span>';
        },
        returnStatus: function (server, status) {
            var urlPattern = '\\/status\\/(\\w)';

            if (server.responses) {
                server.responses = $.grep(server.responses, function (response) {
                    return !response.url || response.url.source !== urlPattern;
                });
            }
            server.respond('GET', new RegExp(urlPattern), JSON.stringify(status));
        },
        returnGoodStatus: function (server) {
            helpers.returnStatus(server, { search: true, enrich: true });
        },
        returnPoorStatus: function (server) {
            helpers.returnStatus(server, { search: true, enrich: false });
        },
        delay: function(func) {
            return setTimeout(func, 0);
        }
    };
    return helpers;
}.call(typeof window != 'undefined' && window || {}));