
$(function(){
    module('utilities');
    
    should('items count of object', function() {
        //Arrange
        var obj = {
            one: 1,
            two: 2
        };
        var arr = [1,2];

        same(arr.length, 2);
        same(itemCount(obj), 2);
    })

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

    module('placeHolderController');

    should('have fired whenNewInput', function() {
        var someNewText = '';
        var someHolders = {};

        holder = {
            fillPlaceHolders: function(newText, holders) {
                someNewText = newText;
                someHolders = holders;
            }
        }

        model = {
            whenNewInput: lambda.empty()
        }

        new placeHolderCoordinator(holder, model);
        model.whenNewInput(someNewText, someHolders);

        same(someNewText, '');
        same(someHolders, {});

    });

    should('have fired whenFilled ', function() {
        var someHolders = {};

        holder = {
            whenFilled: lambda.empty()
        }


        model = {
            placeHolders: function(holders) {
                someHolders = holders;
            }
        }

        new placeHolderCoordinator(holder, model);
        holder.whenFilled(someHolders);

        same(someHolders, {});
    });

    module('placeHolder');

    should("create new place holders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('[hello]', {})

        same(meta, {
            '[hello]': '#'
        });

    });

    should("not create new place holders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('[hello]', {
            '[hello]': '#'
        })

        same(meta, {'[hello]': '#'});

    });

    should("two links one place holder no old placeholders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('whatever [hello] whatever [hello]', {})

        same(meta, {
            '[hello]': '#'
        });
    });

    should("one links one place holder surrounded by text no old placeholders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('whatever [hello] whatever', {})

        same(meta, {
            '[hello]': '#'
        });
    });

    //TODO: this is the shit. need to remove placeholders if links don't exist, but need to keep old place holders if link does
    should("remove place holder if text doesn't exist", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('nothing existing here', {
            '[hello]': '#'
        })

        same(meta, {});

    });

    should("get matches", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('[hello]'), ['[hello]']);

    });

    should("noisy match", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('sdfskklsfjg[hello]^&*()))Jjkdfj'), ['[hello]']);
    });

    should("match if surrounded by words", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('whatever [hello] whatever'), ['[hello]']);
    });

    should("add to matches if already does not have a place holder", function(){
        var holder = new placeHolder();

        var match = ['[hello]'];
        var holders = {
            '[hello]': '#'
        };

        same(holder.removeIfhasPlaceHolder(match, {}), holders);
    });

    should("have a match in holders", function(){
        var holder = new placeHolder();

        var match = '[hello]';
        var holders = {
            '[hello]': '#'
        };

        ok(!holder.hasNoPlaceHolder(match, holders), 'already has a place holder');

    });

    should("not have a match in holders", function(){
        var holder = new placeHolder();

        var match = '[hello]';
        var holders = {};

        ok(holder.hasNoPlaceHolder(match, holders), 'already has a place holder');

    });

    module('markDownCoordinator');

    should('should have fired when markdown ready', function() {
        var someMarkdown = '';

        var markdown = {
            loadMarkdown: function(markdown) {
                someMarkdown = markdown;
            }
        };

        var model = {
            whenMarkdownReady: lambda.empty()
        };

        new markDownCoordinator(markdown, model);
        model.whenMarkdownReady({});
        same(someMarkdown, {});
    });

    should('should have fired when html converted', function() {
        var someHTML = '';

        var markdown = {
            whenHTMLConverted: lambda.empty()
        };

        var model = {
            htmlConverted: function(html){
                someHTML = html;
            }
        };

        new markDownCoordinator(markdown, model);
        markdown.whenHTMLConverted('<p>nothing</p>');
        same(someHTML, '<p>nothing</p>');
    });

    module('markDown');

    should("create no reference", function(){
        var someHTML = '';
        var markdown = new markDown();

        markdown.whenHTMLConverted = function(html) {
            someHTML = html;
        }

        markdown.loadMarkdown('nothing here');

        same(someHTML, '<p>nothing here</p>');

    });

    should("create one new place holders", function(){
        var someHTML = '';
        var markdown = new markDown();

        markdown.whenHTMLConverted = function(html) {
            someHTML = html;
        }

        markdown.loadMarkdown('whatever [hello] whatever' + key.ret + key.ret + '[hello]: #');

        same(someHTML, '<p>whatever <a href=\"#\">hello</a> whatever</p>');

    });

    should("create one new place holders two links", function(){
        var someHTML = '';
        var markdown = new markDown();

        markdown.whenHTMLConverted = function(html) {
            someHTML = html;
        }

        markdown.loadMarkdown('whatever [hello] whatever [hello]' + key.ret + key.ret + '[hello]: #');

        same(someHTML, '<p>whatever <a href=\"#\">hello</a> whatever <a href=\"#\">hello</a></p>');

    });

function validInputBufferOn(model, text) {
        equals(model.markDown(), text);
        return true;
    }

});