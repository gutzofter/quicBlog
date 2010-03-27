var runContext = new function() {
    var input = new userInput();
    var model = new textModel();
    var holder = new placeHolder();

    new textController(input, model);
    new placeHolderCoordinator(holder, model);

    return {
        registerMarkdownEvent: function(event) {
            model.whenMarkdownReady = event;
        },

        newInput: function(text) {
            input.setInput(text);
        }
    };
}

$(function(){
    module('Acceptance Tests');

    should('have no markdown', function() {
        //Arrange
        var someText = '';
        runContext.registerMarkdownEvent(function(text) {
            someText = text;
        });

        //Act
        runContext.newInput('');

        //Assert
        same(someText, '');
    })

    should('have no markdown, but some text', function() {
        //Arrange
        var someText = '';
        runContext.registerMarkdownEvent(function(text) {
            someText = text;
        });

        //Act
        runContext.newInput('whatever');

        //Assert
        same(someText, 'whatever');
    })

    should('have markdown and some text', function() {
        //Arrange
        var someText = '';
        runContext.registerMarkdownEvent(function(text) {
            someText = text;
        });

        //Act
        runContext.newInput('whatever [hello]');

        //Assert
        same(someText, ('whatever [hello]' + key.ret + key.ret + '[hello]: #'));
    })
});