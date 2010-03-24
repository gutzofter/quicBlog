$(function(){

    module("content");

    test("validate content border style", function(){

        var content = $("#content");

        equals(content.css("border-style"), "", "The element should have a border of solid, thin, and black");
    });

});