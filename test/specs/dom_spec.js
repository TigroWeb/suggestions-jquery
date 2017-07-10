import { dom } from '../../src/includes/dom';

describe('Dom utils', function () {
    'use strict';

    beforeEach(function () {

    });

    afterEach(function () {

    });

    it('should add class to element', function () {
        let element = document.createElement('span'),
            className;

        dom.addClass(element, 'first-class-name');
        className = element.className.trim();
        expect(className).toEqual('first-class-name');

        dom.addClass(element, 'second-class-name');
        className = element.className.trim();
        expect(className).toEqual('first-class-name second-class-name');
    });

    it('should set style to element', function () {
        let element = document.createElement('span'),
            style;

        dom.setStyle(element, 'background', '#123456');
        style = element.style.background;
        expect(style).toEqual('rgb(18, 52, 86)');
    });

    it('should listen events', function () {
        let element = document.createElement('span'),
            obj = { callback: function(){} };

        spyOn(obj, 'callback');

        dom.listen(element, 'keydown', null, obj.callback);
        helpers.keydown(element, 'Enter');

        expect(obj.callback).toHaveBeenCalled();
    });

    xit('should stop listening events', function () {
        // coming soon
    });

    it('should stop listening events by namespace', function () {
        let element = document.createElement('span'),
            obj = { callback: function(){} };

        spyOn(obj, 'callback');

        dom.listen(element, 'keydown', 'namespace', obj.callback);
        dom.stopListenByNamespace('namespace');
        helpers.keydown(element, 'Enter');

        expect(obj.callback).not.toHaveBeenCalled();
    });

});