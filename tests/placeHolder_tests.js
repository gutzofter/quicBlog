
$(function(){
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
        var sometext = '';

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

    })

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
    })

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

        same(meta, {});

    });

    test("get matches", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('[hello]'), ['[hello]']);

    });

    test("noisy match", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('sdfskklsfjg[hello]^&*()))Jjkdfj'), ['[hello]']);
    });

    should("not add to matches if already has a place holder", function(){
        var holder = new placeHolder();

        var match = ['[hello]'];
        var holders = {
            '[hello]': '#'
        };


        same(holder.removeIfhasPlaceHolder(match, holders), {});
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

    function validInputBufferOn(model, text) {
        equals(model.markDown(), text);
        return true;
    }

});