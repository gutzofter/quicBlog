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
});

should('take two objects and combine them to return new object', function () {
    var newObj = {};
    var obj1 = {item1: 1};
    var obj2 = {item2: 2};

    newObj = combineObjects(obj1, obj2);
    same(newObj, {item1: 1, item2: 2});

});

should('take two null objects and combine them to return new null object', function () {
    var newObj = {};
    var obj1 = {};
    var obj2 = {};

    newObj = combineObjects(obj1, obj2);
    same(newObj, {});

});

should('reverse from above: take one null objects and one not combine them to return new  object', function () {
    var newObj = {};
    var obj1 = {};
    var obj2 = {item2: 2};

    newObj = combineObjects(obj1, obj2);
    same(newObj, {item2: 2});

});

should('take one null objects and one not combine them to return new  object', function () {
    var newObj = {};
    var obj1 = {item1: 1};
    var obj2 = {};

    newObj = combineObjects(obj1, obj2);
    same(newObj, {item1: 1});

});
