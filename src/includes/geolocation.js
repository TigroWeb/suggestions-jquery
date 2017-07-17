import $ from 'jquery';

import { utils } from './utils';
import { notificator } from './notificator';
import { Suggestions } from './suggestions';
import { DEFAULT_OPTIONS } from './default-options';

let locationRequest,
    defaultGeoLocation = true;

function resetLocation () {
    locationRequest = null;
    DEFAULT_OPTIONS.geoLocation = defaultGeoLocation;
}

let methods = {

    checkLocation: function () {
        let providedLocation = this.options.geoLocation;

        if (!this.type.geoEnabled || !providedLocation) {
            return;
        }

        this.geoLocation = $.Deferred();
        if ($.isPlainObject(providedLocation) || $.isArray(providedLocation)) {
            this.geoLocation.resolve(providedLocation);
        } else {
            if (!locationRequest) {
                locationRequest = $.ajax(this.getAjaxParams('detectAddressByIp'));
            }

            locationRequest
                .done((resp) => {
                    let locationData = resp && resp.location && resp.location.data;
                    if (locationData && locationData.kladr_id) {
                        this.geoLocation.resolve(locationData);
                    } else {
                        this.geoLocation.reject();
                    }
                })
                .fail(() => {
                    this.geoLocation.reject();
                });
        }
    },

    /**
     * Public method to get `geoLocation` promise
     * @returns {$.Deferred}
     */
    getGeoLocation: function () {
        return this.geoLocation;
    },

    constructParams: function () {
        let params = {};

        if (this.geoLocation && $.isFunction(this.geoLocation.promise) && this.geoLocation.state() == 'resolved') {
            this.geoLocation.done(function (locationData) {
                params['locations_boost'] = $.makeArray(locationData);
            });
        }

        return params;
    }

};


// Disable this feature when GET method used. See SUG-202
if (utils.getDefaultType() != 'GET') {
    $.extend(DEFAULT_OPTIONS, {
        geoLocation: defaultGeoLocation
    });

    $.extend(Suggestions, {
        resetLocation: resetLocation
    });

    $.extend(Suggestions.prototype, {
        getGeoLocation: methods.getGeoLocation
    });

    notificator
        .on('setOptions', methods.checkLocation)
        .on('requestParams', methods.constructParams);
}