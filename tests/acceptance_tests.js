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

    should('have no markdown or text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerMarkdownEvent(function(text) {
            someHTML = text;
        });

        //Act
        runContext.newInput('');

        //Assert
        same(someHTML, '');
    })

    should('have no markdown, but some text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerMarkdownEvent(function(text) {
            someHTML = text;
        });

        //Act
        runContext.newInput('whatever');

        //Assert
        same(someHTML, '<p>whatever</p>');
    })

    should('have markdown and some text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerMarkdownEvent(function(text) {
            someHTML = text;
        });

        //Act
        runContext.newInput('whatever [hello]');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a></p>');
    })

    should('have markdown and some text as surrounding noise', function() {
        //Arrange
        var someHTML = '';
        runContext.registerMarkdownEvent(function(text) {
            someHTML = text;
        });

        //Act
        runContext.newInput('whatever [hello] whatever');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a> whatever</p>');
    })
});