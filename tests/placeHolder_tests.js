
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
        var meta = '[hello]: #';

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

    module('placeHolder');

    test('parse brackets', function() {
        var holder = new placeHolder();

        same(holder.parseBrackets(''), null, 'should be null');
        same(holder.parseBrackets('[h]'), ['[h]'], 'should be one');
        same(holder.parseBrackets('[h][b]'), ['[h]', '[b]'], 'should be two');
        same(holder.parseBrackets('[h] [b]'), ['[h]', '[b]'], 'should be two with space');
        same(holder.parseBrackets('[h]' + key.ret + '[b]'), ['[h]', '[b]'], 'should be two with multiline');
        same(holder.parseBrackets('12*&^%GH3sx]adx[h]sggy6 yyfgn f[b]f+_-&&~~@dg[vbsdbs'), ['[h]', '[b]'], 'should be two even when surrounded bynoise');

    });

    function validInputBufferOn(model, text) {
        equals(model.markDown(), text);
        return true;
    }

});