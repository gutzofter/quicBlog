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

function combineObjects(o1, o2) {
    var newObj = {};
    var attrname = null;

    for (attrname in o1) {
        newObj[attrname] = o1[attrname];
    }

    for (attrname in o2) {
        newObj[attrname] = o2[attrname];
    }

    return newObj;
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
        var newPlaceHolders = {};
        var oldPlaceHolders = {};

        
        matches = this.getBracketMatches(buffer);
        newPlaceHolders = this.makeNewPlaceHolders(matches, holders);
        oldPlaceHolders = this.removeIfPlaceHoldersHaveNoLinks(matches, holders);

        this.whenFilled(combineObjects(newPlaceHolders, oldPlaceHolders));
    }

    this.makeNewPlaceHolders = function(matches, holders) {
        var newLinks = {};
        
        for each(var match in matches){
            if(this.hasNoProperty(match, holders)){
                newLinks[match] = '#';
            }
        }
        return newLinks;
    }

    this.removeIfPlaceHoldersHaveNoLinks = function(matches, holders) {
        var newPlaceholders = {};
        var placeHolder = {};

        //TODO: need to extract all theses object types into their own object with their own methods

        for(var holder in holders) {
            for each(var match in matches)
            {
                if(match == holder) {
                placeHolder[holder] = holders[holder];
                newPlaceholders = combineObjects(newPlaceholders, placeHolder);
            }
        }

        }
        
        return newPlaceholders;
    }

    this.hasProperty = function(property, object) {
        return !this.hasNoProperty(property, object);
    }

    this.hasNoProperty = function(property, object) {
        if(object[property]) {
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

