$(document).ready(function(){

    var nasaURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=";
    var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";

    $.ajax({
        url: nasaURL + nasaKey,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
    })



})