module('utilities');

should('items count of object', function() {
    //Arrange
    var obj = {
        one: 1,
        two: 2
    };
    var arr = [1,2];

    same(arr.length, 2);
    same(itemCount(obj), 2);
})

