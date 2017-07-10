let eventsByNamespace = {};

let dom = {


    addClass: function(element, className) {
        let list = element.className.split(' ');
        if (list.indexOf(className) === -1) {
            list.push(className);
        }
        element.className = list.join(' ');
    },

    setStyle: function(element, name, value) {
        element.style[name] = value;
    },

    listen: function(element, eventName, namespace, callback) {
        element.addEventListener(eventName, callback, false);
        if (namespace) {
            if (!eventsByNamespace[namespace]) {
                eventsByNamespace[namespace] = [];
            }
            eventsByNamespace[namespace].push({
                eventName: eventName,
                element: element,
                callback: callback,
            });
        }
    },

    stopListenByNamespace: function(namespace) {
        let events = eventsByNamespace[namespace];
        if (events) {
            for(let eventIndex in events) {
                //console.log('EVENT ' + eventIndex);
                let event = events[eventIndex];
                event.element.removeEventListener(event.eventName, event.callback, false);
            }
        }
    },

    stopListen: function() {

    },

};

export { dom };
