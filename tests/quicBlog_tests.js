$(function(){

    module("content");

    test("validate content border style", function(){
        borderStyleEquals('#content');
     });

    test("validate left_container border style", function(){
        borderStyleEquals('#left_container');
    });

    module("utilities", {
	setup: function() {
            $('#content').append('<div id="classer">Test</div>')
	},
	teardown: function() {
            $('#classer').remove();
	}
    });

    test('load single class', function() {
        addClasses('#classer', ['outline'])

        ok(!$('#classer').hasClass('nothing'), 'class nothing does not exist');
        ok($('#classer').hasClass('outline'), 'class outline should be assigned to #classer');

    });

    test('load multiple classes', function() {
        addClasses('#classer', ['outline', 'reset_left', 'left_position'])

        ok($('#classer').hasClass('outline'), 'class outline should be assigned to #classer');
        ok($('#classer').hasClass('reset_left'), 'class reset_left should be assigned to #classer');
        ok($('#classer').hasClass('left_position'), 'class left_position should be assigned to #classer');

    });
});

function borderStyleEquals(elementId) {
        var content = $(elementId);

        equals(content.css("border-left-style"), "solid", "The element should have a border of solid");
        equals(content.css("border-left-color"), "rgb(0, 0, 0)", "The element should have a border of black");
        equals(content.css("border-left-width"), "1px", "The element should have a border of thin");
}