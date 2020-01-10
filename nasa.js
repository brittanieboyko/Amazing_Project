$(document).ready(function(){

    var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
    
    var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";

    $.ajax({
        url: nasaURL + nasaKey,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
        
        $("#apod-image").attr({
            src: data.url,
            alt: data.title
          });
        $("#apod-title").text(data.title);
        $("#apod-date").text(data.date);
    })



})