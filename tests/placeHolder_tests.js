
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
            whenInput: lambda.empty
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

    should("no text and no place holders", function(){
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

    module('placeHolderController');

    should('have fired whenNewInput ', function() {
        var someNewText = '';
        var someHolders = {};

        holder = {
            fillPlaceHolder: function(newText, holders) {
                someNewText = newText;
                someHolders = holders;
            }
        }
        
        model = {
            whenNewInput: lambda.empty
        }

        new placeHolderCoordinator(holder, model);
        model.whenNewInput(newText, holders);
        
        same(someNewText, '');
        same(someHolders, {});
        
    })








    test("input text at input should be in model", function(){
        var input = new userInput();
        var model = new textModel();
        new textController(input, model);

        input.setInput('a');

        ok(validInputBufferOn(model, 'a'));

    });

    should("add no link placeholder", function(){
        var holder = new placeHolder();
        var model = new textModel();
        new placeHolderCoordinator(holder, model);

        var input = 'hello';
        var meta = {};

        model.newInput(input);

        equal(model.markDown(), input);

    });

    should("add link placeholder", function(){
        var holder = new placeHolder();
        var model = new textModel();
        new placeHolderCoordinator(holder, model);

        var input = '[hello]';
        var meta = input + ': #'
 
        model.newInput(input);
        equal(model.markDown(), (input + key.ret + key.ret + meta));

    });

    test("add two link placeholders", function(){
        var holder = new placeHolder();
        var model = new textModel();
        new placeHolderCoordinator(holder, model);

        var input = '[hello]';
        var meta = '[hello]: #';

        model.newInput(input + input);

        equal(model.markDown(), (input + input + key.ret + key.ret + meta + key.ret + meta));

    });

    function markDown() {

    }

    function markdownCoordinator(markdown, model) {

    }

//    TODO: Need finish edge cases for placeholders
//    test("markdown is ready for html conversion", function(){
//        var markdown = new markDown();
//        var model = new textModel();
//        new markdownCoordinator(markdown, model);
//
//        var mark = '[hello]';
//        mark += (key.ret + key.ret);
//        mark += '[hello]: #';
//
//        model.newInput(input + input);
//
//        equal(model.markDown(), (input + input + key.ret + key.ret + meta + key.ret + meta));
//
//    });

    module('placeHolder');

    should("create new place holders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('[hello]', {})

        same(meta, {'[hello]': '#'});

    });

    should("not create new place holders", function(){
        var holder = new placeHolder();
        var meta = {};

        holder.whenFilled = function(holders) {
            meta = holders;
        }

        holder.fillPlaceHolders('[hello]', {'[hello]': '#'})

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
        var holders = {'[hello]': '#'};


        same(holder.removeIfhasPlaceHolder(match, holders), {});
    });

    should("add to matches if already does not have a place holder", function(){
        var holder = new placeHolder();

        var match = ['[hello]'];
        var holders = {'[hello]': '#'};

        same(holder.removeIfhasPlaceHolder(match, {}), holders);
    });

    should("have a match in holders", function(){
        var holder = new placeHolder();

        var match = '[hello]';
        var holders = {'[hello]': '#'};

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