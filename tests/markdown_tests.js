module('markDown');

should("create no reference", function(){
    var someHTML = '';
    var markdown = new markDown();

    markdown.whenHTMLConverted = function(html) {
        someHTML = html;
    }

    markdown.loadMarkdown('nothing here');

    same(someHTML, '<p>nothing here</p>');

});

should("create one new place holders", function(){
    var someHTML = '';
    var markdown = new markDown();

    markdown.whenHTMLConverted = function(html) {
        someHTML = html;
    }

    markdown.loadMarkdown('whatever [hello] whatever' + key.ret + key.ret + '[hello]: #');

    same(someHTML, '<p>whatever <a href=\"#\">hello</a> whatever</p>');

});

should("create one new place holders two links", function(){
    var someHTML = '';
    var markdown = new markDown();

    markdown.whenHTMLConverted = function(html) {
        someHTML = html;
    }

    markdown.loadMarkdown('whatever [hello] whatever [hello]' + key.ret + key.ret + '[hello]: #');

    same(someHTML, '<p>whatever <a href=\"#\">hello</a> whatever <a href=\"#\">hello</a></p>');

});
