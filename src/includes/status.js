import $ from 'jquery';

import { notificator } from './notificator';
import { Suggestions } from './suggestions';
import { utils } from './utils';
import { ajax } from './ajax';

/**
 * Methods related to plugin's authorization on server
 */

// keys are "[type][token]"
let statusRequests = {};

function resetTokens () {
    utils.each(statusRequests, function(request) {
        request.xhr.abort();
    });
    statusRequests = {};
}

resetTokens();

let methods = {

    checkStatus: function () {
        let that = this,
            token = that.options.token && that.options.token.trim(),
            requestKey = that.options.type + token,
            request = statusRequests[requestKey];

        if (!request) {
            request = statusRequests[requestKey] = ajax.send(that.getAjaxParams('status'));
        }

        request
            .then(function(status) {
                if (status.search) {
                    Object.assign(that.status, status);
                } else {
                    triggerError('Service Unavailable');
                }
            })
            .catch(function(xhr){
                triggerError(xhr.statusText);
            });

        function triggerError(errorThrown){
            // If unauthorized
            if (utils.isFunction(that.options.onSearchError)) {
                that.options.onSearchError.call(that.element, null, request, 'error', errorThrown);
            }
        }
    }

};

Suggestions.resetTokens = resetTokens;

Object.assign(Suggestions.prototype, methods);

notificator
    .on('setOptions', methods.checkStatus);
