
$(function(){

    module("textModule");

    test("initial text should be empty", function(){
        var input = new userInput();
        var model = new textModel();
        new textController(input, model);

        ok(validInputBufferOn(model, ''));
    });

    test("input text at input should be in model", function(){
        var input = new userInput();
        var model = new textModel();
        new textController(input, model);

        input.setInput('a');

        ok(validInputBufferOn(model, 'a'));

    });

    test("add link placeholder", function(){
        var holder = new placeHolder();
        var model = new textModel();
        new placeHolderCoordinator(holder, model);

        var input = '[hello]';
        var meta = ['[hello]: #'];

        model.newInput(input, meta);

        equal(model.markDown(), (input + key.ret + key.ret + meta[0]));

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

    test("get matches", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('[hello]'), ['[hello]']);

    });

    test("noisy match", function(){
        var holder = new placeHolder();

        same(holder.getBracketMatches('sdfskklsfjg[hello]^&*()))Jjkdfj'), ['[hello]']);

    });

    function validInputBufferOn(model, text) {
        equals(model.markDown(), text);
        return true;
    }

});