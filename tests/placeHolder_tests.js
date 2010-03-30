
module('placeHolder filling functions');

should("create new place holders no old ones", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('[hello]', {})

    same(meta, { '[hello]': '#' });

});

should("not create new place holders no old ones", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('hello', {})

    same(meta, {});

});

should("two links one place holder no old placeholders", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('whatever [hello] whatever [hello]', {})

    same(meta, {
        '[hello]': '#'
    });
});

should("one links one old place holder", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('[hello]', {'[hello]': '#'})

    same(meta, {
        '[hello]': '#'
    });
});

should("two links one old place holder", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('[hello] whatever [hello]', {'[hello]': '#'})

    same(meta, {
        '[hello]': '#'
    });
});

should("remove place holder if text doesn't exist", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('nothing existing here', {
        '[hello]': '#'
    })

    same(meta, {});

});

module('placeHolder filling sub functions');

should("get matches", function(){
    var holder = new placeHolder();

    same(holder.getBracketMatches('[hello]'), ['[hello]']);

});

should("noisy match", function(){
    var holder = new placeHolder();

    same(holder.getBracketMatches('sdfskklsfjg[hello]^&*()))Jjkdfj'), ['[hello]']);
});

should("match if surrounded by words", function(){
    var holder = new placeHolder();

    same(holder.getBracketMatches('whatever [hello] whatever'), ['[hello]']);
});

should("add to links if already does not have a place holder", function(){
    var holder = new placeHolder();

    var link = ['[hello]'];
    var holders = {
        '[hello]': '#'
    };

    same(holder.makeNewPlaceHolders(link, {}), holders);
});

should("remove from placeholders if already does not have a link", function(){
    var holder = new placeHolder();

    var newHolders = [];
    var holders = {
        '[hello]': '#'
    };

    same(holder.removeIfPlaceHoldersHaveNoLinks(newHolders, holders), {});
});

should("not remove from placeholders if already does have a link", function(){
    var holder = new placeHolder();

    var matches = ['[hello]'];
    var holders = {
        '[hello]': '#'
    };

    same(holder.removeIfPlaceHoldersHaveNoLinks(matches, holders), {'[hello]': '#'});
});

should("have a match in holders", function(){
    var holder = new placeHolder();

    var property = '[hello]';
    var holders = {
        '[hello]': '#'
    };

    ok(!holder.hasNoProperty(property, holders), 'already has a place holder');

});

should("not have a match in holders", function(){
    var holder = new placeHolder();

    var property = '[hello]';
    var holders = {};

    ok(holder.hasNoProperty(property, holders), 'does not already have a place holder');

});

should("have property", function(){
    var holder = new placeHolder();

    var property = '[hello]';
    var holders = { '[hello]': 1};

    ok(holder.hasProperty(property, holders), 'does property');

});

