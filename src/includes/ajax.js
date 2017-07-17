import { utils } from './utils';

let setHeaders = function(xhr, headers) {
    utils.each(headers, function (value, name) {
        xhr.setRequestHeader(name, value);
    });
};

let ajax = {

    send: function (params) {
        let xhr,
            resolve,
            reject,
            promise,
            timeoutTimer;

        promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });

        if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        if (xhr) {
            xhr.onreadystatechange = function() {
                let result;

                if (xhr.readyState === 4) {
                    window.clearTimeout(timeoutTimer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        let json = xhr.responseText;
                        try {
                            result = JSON.parse(json);
                        } catch(e){}
                        resolve(result, xhr);
                    } else {
                        reject(xhr)
                    }
                }
            };

            if(params.type === 'GET') {
                xhr.open('GET', params.url, true);
            } else {
                xhr.open(params.type, params.url, true);
            }

            setHeaders(xhr, Object.assign({
                'Content-type': 'application/json'
            }, params.headers));

            try {
                xhr.send();
            } catch(e) {
                reject();
            }

            if (params.timeout) {
                timeoutTimer = window.setTimeout( function() {
                    reject('timeout');
                }, params.timeout );
            }
        }

        promise.xhr = xhr;

        return promise;
    },

};

export { ajax };
