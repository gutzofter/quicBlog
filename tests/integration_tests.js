var runContext = new function() {
    var input = new userInput();
    var model = new textModel();
    var holder = new placeHolder();
    var markdown = new markDown();

    new textController(input, model);
    new placeHolderCoordinator(holder, model);
    new markDownCoordinator(markdown, model);

    return {
        registerMarkdownEvent: function(event) {
            model.whenMarkdownReady = event;
        },

        newInput: function(text) {
            input.setInput(text);
        },

        registerHTMLConvertedEvent: function(event) {
            model.whenHTMLReady = event;
        }
    };
}

$(function(){
    module('Integration Tests');

    should('have no markdown or text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('');

        //Assert
        same(someHTML, '');
    });

    should('have no markdown, but some text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('whatever');

        //Assert
        same(someHTML, '<p>whatever</p>');
    });

    should('have link and some text', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('whatever [hello]');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a></p>');
    });

    should('have link and some text as surrounding noise', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('whatever [hello] whatever');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a> whatever</p>');
    });

    should('have two links and same reference', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('whatever [hello] whatever [hello]');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a> whatever <a href="#">hello</a></p>');
    });

    should('have same links and some text as surrounding noise', function() {
        //Arrange
        var someHTML = '';
        runContext.registerHTMLConvertedEvent(function(html) {
            someHTML = html;
        });

        //Act
        runContext.newInput('whatever [hello] whatever [hello] whatever');

        //Assert
        same(someHTML, '<p>whatever <a href="#">hello</a> whatever <a href="#">hello</a> whatever</p>');
    });
});