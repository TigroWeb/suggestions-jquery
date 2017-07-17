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
        let token = this.options.token && this.options.token.trim(),
            requestKey = this.options.type + token,
            request = statusRequests[requestKey];

        if (!request) {
            request = statusRequests[requestKey] = ajax.send(this.getAjaxParams('status'));
        }

        request
            .then((status) => {
                if (status.search) {
                    Object.assign(this.status, status);
                } else {
                    triggerError('Service Unavailable');
                }
            })
            .catch(function(xhr){
                triggerError(xhr.statusText);
            });

        let triggerError = (errorThrown) => {
            // If unauthorized
            if (utils.isFunction(this.options.onSearchError)) {
                this.options.onSearchError.call(this.element, null, request, 'error', errorThrown);
            }
        }
    }

};

Suggestions.resetTokens = resetTokens;

Object.assign(Suggestions.prototype, methods);

notificator
    .on('setOptions', methods.checkStatus);
