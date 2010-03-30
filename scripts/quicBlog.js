var lambda = {
    empty: function() {}
}

var key = {
    ret: '\r\n'
}

function itemCount(obj) {
    var count = 0;
    for (var k in obj) {
        ++count;
    }
    return count;
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
    this.whenHTMLReady = lambda.empty;

    // TODO: add a DataGateway for these memebers
    var inputBuffer = '';
    var metaInformation = {};
    //--------------------------------

    this.newInput = function(text) {
        inputBuffer = text;
        this.whenNewInput(inputBuffer, metaInformation);
    }

    this.placeHolders = function(holders) {
        metaInformation = holders;
        this.whenMarkdownReady(this.markDown(inputBuffer, metaInformation));
    }

    this.markDown = function(buffer, metaInfo) {
        var markdown = '';

        var meta = '';

        if(itemCount(metaInfo) <= 0) {
            markdown = buffer;
        }
        else {
            for(var holder in metaInfo) {
                meta += key.ret + holder + ': ' + metaInfo[holder];
            }
            markdown = buffer + key.ret + meta;

        }
        
        return markdown;
    }

    this.htmlConverted = function(htmlText) {
        this.whenHTMLReady(htmlText);
    }

}

function placeHolder() {
    this.whenFilled = lambda.empty;

    this.fillPlaceHolders = function(buffer, holders) {
        var matches = [];
        
        matches = this.getBracketMatches(buffer);
        matches = this.removeIfhasPlaceHolder(matches, holders);

        this.whenFilled(matches);
    }

    this.removeIfhasPlaceHolder = function(matches, holders) {
        var newHolders = {};
        
        for each(var match in matches){
            if(this.hasNoPlaceHolder(match, holders)){
                newHolders[match] = '#';
            }
        }
        for (var attrname in holders) {
            newHolders[attrname] = holders[attrname];
        }

        return newHolders;
    }

    this.hasNoPlaceHolder = function(match, holders) {
        if(holders[match]) {
            return false;
        }
        return true;
    }

    this.getBracketMatches = function(buffer) {
        var bracketPattern = /\[(.*?)]/g;

        return buffer.match(bracketPattern);
    }
}

function markDown() {
    this.whenHTMLConverted = lambda.empty;

    var htmlGenerator = new Attacklab.showdown.converter();

    this.loadMarkdown = function(markdownText) {
        var html = htmlGenerator.makeHtml(markdownText);
        this.whenHTMLConverted(html);
    }

}

function textController(input, model) {
    input.whenInput = function(text) {
        model.newInput(text);
    }
}

function placeHolderCoordinator(placeHolder, model) {
    model.whenNewInput = function(newText, holders) {
        placeHolder.fillPlaceHolders(newText, holders);
    }

    placeHolder.whenFilled = function(holders) {
        model.placeHolders(holders);
    }
}

function markDownCoordinator(markdown, model) {
    model.whenMarkdownReady = function(markdownText) {
        markdown.loadMarkdown(markdownText);
    }

    markdown.whenHTMLConverted = function(html) {
        model.htmlConverted(html);
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

