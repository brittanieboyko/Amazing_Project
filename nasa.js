$(document).ready(function(){

    var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
    
    var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";

    $.ajax({
        url: nasaURL + nasaKey,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
    })



})