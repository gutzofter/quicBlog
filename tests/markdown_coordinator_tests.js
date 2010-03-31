module('markDownCoordinator');
//TODO: remove this remark

should('should have fired when markdown ready', function() {
    var someMarkdown = '';

    var markdown = {
        loadMarkdown: function(markdown) {
            someMarkdown = markdown;
        }
    };

    var model = {
        whenMarkdownReady: lambda.empty()
    };

    new markDownCoordinator(markdown, model);
    model.whenMarkdownReady({});
    same(someMarkdown, {});
});

should('should have fired when html converted', function() {
    var someHTML = '';

    var markdown = {
        whenHTMLConverted: lambda.empty()
    };

    var model = {
        htmlConverted: function(html){
            someHTML = html;
        }
    };

    new markDownCoordinator(markdown, model);
    markdown.whenHTMLConverted('<p>nothing</p>');
    same(someHTML, '<p>nothing</p>');
});

