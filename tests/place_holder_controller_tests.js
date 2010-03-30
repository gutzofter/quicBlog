module('placeHolderController');

should('have fired whenNewInput', function() {
    var someNewText = '';
    var someHolders = {};

    holder = {
        fillPlaceHolders: function(newText, holders) {
            someNewText = newText;
            someHolders = holders;
        }
    }

    model = {
        whenNewInput: lambda.empty()
    }

    new placeHolderCoordinator(holder, model);
    model.whenNewInput(someNewText, someHolders);

    same(someNewText, '');
    same(someHolders, {});

});

should('have fired whenFilled ', function() {
    var someHolders = {};

    holder = {
        whenFilled: lambda.empty()
    }


    model = {
        placeHolders: function(holders) {
            someHolders = holders;
        }
    }

    new placeHolderCoordinator(holder, model);
    holder.whenFilled(someHolders);

    same(someHolders, {});
});

