var lambda = {
    empty: function() {}
}

function userInput() {
    this.whenInput = lambda.empty;
    
    this.text = '';

    this.setInput = function(text) {
        this.text = text;
        this.whenInput();
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
        this.whenNewInput();
    }

    this.placeHolders = function(holders) {
        this.metaInformation = holders;
    }

}

function placeHolder() {
    this.whenParsed = lambda.empty;
    this.holders = '';
    this.parseInput = function(inputBuffer) {
        this.holders = '[hello]: #';
        this.whenParsed();
    }
}

function textController(input, model) {
    input.whenInput = function() {
        model.newInput(input.text);
    }
}

function placeHolderCoordinator(placeHolder, model) {
    model.whenNewInput = function() {
        placeHolder.parseInput(model.inputBuffer);
    }

    placeHolder.whenParsed = function() {
        model.placeHolders(placeHolder.holders);
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

        model.newInput('[hello]');
        
        equal(model.metaInformation, '[hello]: #')

    });

   function validInputBufferOn(model, text) {
         equals(model.inputBuffer, text);
         return true;
    }

});