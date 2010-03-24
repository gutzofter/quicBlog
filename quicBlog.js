//$(function() {
//    $("#orderedlist").addClass("red");
//    $("#orderedlist > li").addClass("blue");
//    $("#orderedlist li:last").hover(function() {
//        $(this).addClass("green");
//    }, function(){
//        $(this).removeClass("green");
//    });
//});

$(function() {
    $("#content").addClass("outline");
    var classArray = ['outline', 'reset_left', 'left_position'];
    addClasses('#left_container', classArray);


});

function addClasses(elementId, items) {
    for(var item in items)
        $(elementId).addClass(items[item]);
}

