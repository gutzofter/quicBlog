function fakeInput() {
    var text = '';
    var whenInput;

    this.set = function(text) {
        this.text = text;
        this.whenInput();
    }

    this.get = function() {
        return this.text;
    }
}

function textModel() {
    this.text = '';
    this.add = function(character) {
        this.text = character;
    }
    
}

function textController(input, model) {

    input.whenInput = function() {
        model.add(input.get());
    }
}

$(function(){

    module("textController");

    test("initial text should be empty", function(){
        var input = new fakeInput();
        var txtModel = new textModel();
        new textController(input, txtModel);
        
        equals(txtModel.text, '');
    });

    test("input text at input should be in model", function(){
        var input = new fakeInput();
        var txtModel = new textModel();
        new textController(input, txtModel);

        input.set('a');

        equals(txtModel.text, 'a');
    });

    module('textModule');

    test('', function () {

    });

});