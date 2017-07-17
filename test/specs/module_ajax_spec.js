import { ajax } from '../../src/includes/ajax';

describe('Ajax', function () {
    'use strict';

    beforeEach(function() {
        this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
        this.server.restore();
    });

    it('should send ajax request', function () {

        expect(this.server.requests.length).toEqual(0);

        ajax.send({
            type: 'GET',
            url: 'test/url'
        });

        expect(this.server.requests.length).toEqual(1);
        expect(this.server.requests[0].url).toEqual('test/url');
    });

});