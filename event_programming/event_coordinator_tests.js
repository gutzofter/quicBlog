module('generic coordinator');

var lambda = {
    empty: function() {}
}

function nakedCoordinator(handler) {
    handler();
}


should('load broker with handlers', function () {
    var lambda = {
        empty: function() {}
    }

    function eventBroker() {
        var events = [];

        return {
            add: function(handler) {
                events.push(handler());
            }
        }
    }

    var broker = new eventBroker();
    var sometext = '';

    var input = {
        input: function(text) {
            this.whenInput(text);
        },

        whenInput: lambda.empty()
    }

    var uCaseModel = {
        newInput: function(text) {
            this.whenTextFormated(text.toUpperCase());
        },

        whenTextFormated: lambda.empty()
    }

    var output = {
        format: function(formattedText) {
            sometext = formattedText;
        }
    }

    var newInputHandler = function () {
        input.whenInput = function(text) {
            uCaseModel.newInput(text);
        }
    }

    var textFormattedHandler = function() {
        uCaseModel.whenTextFormated = function(formattedText) {
            output.format(formattedText);
        }
    }

    broker.add(newInputHandler);
    broker.add(textFormattedHandler);

    input.input('hello');

    same(sometext, 'HELLO');

});

should('load naked coordinator with handlers', function () {
    var sometext = '';

    var input = {
        newInput: function(text) {
            this.whenInput(text);
        },

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

    input.newInput('hello');
    same(sometext, 'hello');

});
