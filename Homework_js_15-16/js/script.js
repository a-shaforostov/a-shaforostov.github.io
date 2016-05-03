function GoogleCallback(){
    console.log("arguments", arguments);
}

//(function($) {
    //"use strict";

// callback function
//function GoogleCallback (func, data) {
//    window[func](data);
//}
//
//$.getJSON("http://ajax.googleapis.com/ajax/services/search/web?v=1.0?key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q=javascript&callback=GoogleCallback&context=?",
//    function(data){
//        var ul = document.createElement("ul");
//        $.each(data.results, function(i, val){
//            var li = document.createElement("li");
//            li.innerHTML = '<a href="'+val.url+'" title="'+val.url+'" target="_blank">'+val.title+"</a> - "+val.content;
//            ul.appendChild(li);
//        });
//        $('body').html(ul);
//    });

    $(function(){
        $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q=javascript&callback=GoogleCallback&context=?",
            dataType: "jsonp"
        });

    });

//})(jQuery);


//success: function () {
//    alert("Success");
//},
//error: function () {
//    alert("Error");
//}
