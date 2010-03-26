var lambda = {
    empty: function() {}
}

var key = {
    ret: '/r/n/r/n'
}

function userInput() {
    this.whenInput = lambda.empty;

    this.setInput = function(text) {
        this.whenInput(text);
    }
}

function textModel() {
    this.whenNewInput = lambda.empty;

    // TODO: add a DataGateway for these memebers
    this.inputBuffer = '';
    this.metaInformation = '';
    //--------------------------------

    this.newInput = function(text) {
        this.inputBuffer = text;
        this.whenNewInput(text);
    }

    this.placeHolders = function(holders) {
        this.metaInformation = holders;
    }

    this.markDown = function() {
        if(this.metaInformation == '') {
            return this.inputBuffer;
        }
        return (this.inputBuffer + key.ret + this.metaInformation);
    }

}

function placeHolder() {
    this.whenMatchBrackets = lambda.empty;

    this.matchBrackets = function(inputBuffer) {
        var matches = [];
        var matchIds = '';

        matches = this.parseBrackets(inputBuffer);

        for each(var match in matches) {
            matchIds += (key.ret + match + ': #');
        }

        this.whenMatchBrackets(matchIds);

    }

    this.parseBrackets = function(text) {
        var bracketPattern =  /\[(.*?)]/g;

        return text.match(bracketPattern);
    }
}

function textController(input, model) {
    input.whenInput = function(text) {
        model.newInput(text);
    }
}

function placeHolderCoordinator(placeHolder, model) {
    model.whenNewInput = function(inputBuffer) {
        placeHolder.matchBrackets(inputBuffer);
    }

    placeHolder.whenMatchBrackets = function(holders) {
        model.placeHolders(holders);
    }
}


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
        same(holder.parseBrackets('123sx]adx[h]sggy6 yyfgn f[b]fdg[vbsdbs'), ['[h]', '[b]'], 'should be two even when surrounded bynoise');

    });

    function validInputBufferOn(model, text) {
        equals(model.markDown(), text);
        return true;
    }

});