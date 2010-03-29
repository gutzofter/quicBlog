module('generic coordinator');

function coordinator() {
    var events = [];

    return {
        add: function(handler) {
            events.push(handler());
        },
        
        handler: function(handler) {
            events.push(handler());
        }
    }
}

function nakedCoordinator(handler) {
    var eventhandler = handler();
}

should('load coordinator with handlers', function () {
    var sometext = '';

    var input = {
        whenInput: lambda.empty()
    }

    var model = {
        newInput: function(text) {
            sometext = text;
        }
    }

    var whenNewInputHandler = function () {
        input.whenInput = function(text) {
            model.newInput(text);
        }
    }

    var coord = new coordinator();
    coord.handler(whenNewInputHandler);
    input.whenInput('hello');

    same(sometext, 'hello');

});

should('load naked coordinator with handlers', function () {
    var sometext = '';

    var input = {
        whenInput: lambda.empty()
    }

    var model = {
        newInput: function(text) {
            sometext = text;
        }
    }

    var whenNewInputHandler = function () {
        input.whenInput = function(text) {
            model.newInput(text);
        }
    }

    new nakedCoordinator(whenNewInputHandler);

    input.whenInput('hello');
    same(sometext, 'hello');

});
