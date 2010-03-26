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
        return (this.inputBuffer + key.ret + key.ret + this.metaInformation);
    }

}

function placeHolder() {
    this.whenParsed = lambda.empty;
    this.parseInput = function(inputBuffer) {
        this.whenParsed('[hello]: #');
//        '/\[[1-9]\]/'
   }
}

function textController(input, model) {
    input.whenInput = function(text) {
        model.newInput(text);
    }
}

function placeHolderCoordinator(placeHolder, model) {
    model.whenNewInput = function(inputBuffer) {
        placeHolder.parseInput(inputBuffer);
    }

    placeHolder.whenParsed = function(holders) {
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

     test("add two link placeholder", function(){
        var holder = new placeHolder();
        var model = new textModel();
        new placeHolderCoordinator(holder, model);

        var input = '[hello]';
        var meta = '[hello]: #';

        model.newInput(input);

        equal(model.markDown(), (input + input + key.ret + key.ret + meta + key.ret + meta));

    });

   function validInputBufferOn(model, text) {
         equals(model.markDown(), text);
         return true;
    }

});