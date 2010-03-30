
module('placeHolder filling functions');

should("create new place holders", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('[hello]', {})

    same(meta, {
        '[hello]': '#'
    });

});

should("not create new place holders", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('[hello]', {
        '[hello]': '#'
    })

    same(meta, {
        '[hello]': '#'
    });

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

should("one links one place holder surrounded by text no old placeholders", function(){
    var holder = new placeHolder();
    var meta = {};

    holder.whenFilled = function(holders) {
        meta = holders;
    }

    holder.fillPlaceHolders('whatever [hello] whatever', {})

    same(meta, {
        '[hello]': '#'
    });
});

//TODO: this is the shit. need to remove placeholders if links don't exist, but need to keep old place holders if link does
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

should("add to matches if already does not have a place holder", function(){
    var holder = new placeHolder();

    var match = ['[hello]'];
    var holders = {
        '[hello]': '#'
    };

    same(holder.removeIfhasPlaceHolder(match, {}), holders);
});

should("have a match in holders", function(){
    var holder = new placeHolder();

    var match = '[hello]';
    var holders = {
        '[hello]': '#'
    };

    ok(!holder.hasNoPlaceHolder(match, holders), 'already has a place holder');

});

should("not have a match in holders", function(){
    var holder = new placeHolder();

    var match = '[hello]';
    var holders = {};

    ok(holder.hasNoPlaceHolder(match, holders), 'already has a place holder');

});

