module('userInput');

should('generate event', function() {
    var input = new userInput();

    var someText = '';

    input.whenInput = function(text) {
        someText = text;
    }

    input.setInput('hello');
    same(someText, 'hello');
})

