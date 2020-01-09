$(document).ready(function(){
    var queryURL = "http://api.open-notify.org/iss-now.json";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then (function (data) {
        console.log(data)
    });

});