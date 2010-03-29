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

    var whenInputHandler = function () {
        input.whenInput = function(text) {
            model.newInput(text);
        }
    }

    var coord = new coordinator();
    coord.handler(whenInputHandler);
    input.whenInput('hello');

    same(sometext, 'hello');

});

