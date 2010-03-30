var lambda = {
    empty: function() {}
}

var key = {
    ret: '\r\n'
}

function itemCount(obj) {
    var count = 0;
    for (var k in obj) {
        ++count;
    }
    return count;
}
