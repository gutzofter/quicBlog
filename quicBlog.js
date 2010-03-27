var lambda = {
    empty: function() {}
}

var key = {
    ret: '/r/n'
}

function userInput() {
    this.whenInput = lambda.empty;

    this.setInput = function(text) {
        this.whenInput(text);
    }
}

function textModel() {
    this.whenNewInput = lambda.empty;
    this.whenMarkdownReady = lambda.empty;

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
        this.whenMarkdownReady(this.markDown());
    }

    this.markDown = function() {
        if(this.metaInformation == '') {
            return this.inputBuffer;
        }
        return (this.inputBuffer + key.ret + this.metaInformation);
    }

}

function placeHolder() {
    this.whenFilled = lambda.empty;

    this.fillPlaceHolders = function(buffer, holders) {
        var matches = [];
        
        matches = this.getBracketMatches(buffer);

        this.whenFilled(matches);
    }

    this.getBracketMatches = function(buffer) {
        var bracketPattern = /\[(.*?)]/g;

        return buffer.match(bracketPattern);
    }
}

function textController(input, model) {
    input.whenInput = function(text) {
        model.newInput(text);
    }
}

function placeHolderCoordinator(placeHolder, model) {
    model.whenNewInput = function(buffer, holders) {
        placeHolder.fillPlaceHolders(buffer, holders);
    }

    placeHolder.whenFillled = function(holders) {
        model.placeHolders(holders);
    }
}


$(function() {
    $("#content").addClass("outline");
    var standardClasses = ['outline', 'reset_left', 'left_position'];
    addClasses('#left_container', standardClasses);
    addClasses('#input_box', standardClasses);
    addClasses('#output_box', standardClasses);


});

function addClasses(elementId, items) {
    for(var item in items)
        $(elementId).addClass(items[item]);
}

