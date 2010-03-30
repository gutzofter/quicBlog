module('textController');

should('have fired whenInput', function () {
    var someText = '';

    input = {
        whenInput: lambda.empty()
    }

    model = {
        newInput: function(text) {
            someText = text;
        }
    }

    new textController(input, model);
    input.whenInput('hello');
    same(someText, 'hello');

})

