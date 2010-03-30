module("textModule");

should("fire whenNewInput when newInput", function(){
    var model = new textModel();
    var someNewText = '';
    var someHolders = {};

    model.whenNewInput = function(newText, holders) {
        someNewText = newText;
        someHolders = holders;
    }

    model.newInput('');
    same(someNewText, '');
    same(someHolders, {});
});

should("fire whenMarkdownReady with no text inputted", function(){
    var model = new textModel();
    var someMarkDown = '';

    model.whenMarkdownReady = function(markdown) {
        someMarkDown = markdown;
    }

    model.newInput('');
    model.placeHolders({});

    same(someMarkDown, (''));
});

should("fire whenMarkdownReady with text no placeholder inputted", function(){
    var model = new textModel();
    var someMarkDown = '';

    model.whenMarkdownReady = function(markdown) {
        someMarkDown = markdown;
    }

    model.newInput('whatever');
    model.placeHolders({});

    same(someMarkDown, ('whatever'));
});

should("fire whenMarkdownReady when one placeHolders", function(){
    var model = new textModel();
    var someMarkDown = '';

    model.whenMarkdownReady = function(markdown) {
        someMarkDown = markdown;
    }

    model.newInput('[hello]');
    model.placeHolders({
        '[hello]': '#'
    })

    same(someMarkDown, ('[hello]' + key.ret + key.ret + '[hello]: #'));
});

should("fire whenMarkdownReady when two placeHolders", function(){
    var model = new textModel();
    var someMarkDown = '';

    model.whenMarkdownReady = function(markdown) {
        someMarkDown = markdown;
    }

    model.newInput('[hello] [dada]');
    model.placeHolders({
        '[hello]': '#',
        '[dada]': '#'
    })

    same(someMarkDown, ('[hello] [dada]'+ key.ret + key.ret + '[hello]: #' + key.ret + '[dada]: #'));
});

should("fire whenHTMLReady when no text", function(){
    var model = new textModel();
    var someHTML = '';

    model.whenHTMLReady = function(htmlText) {
        someHTML = htmlText;
    }

    model.htmlConverted('');
    same(someHTML, '');
});

