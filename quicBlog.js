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

