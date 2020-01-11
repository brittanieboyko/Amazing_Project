$(document).ready(function(){
    var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
    var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";
    var imageContainer = $(".apod-container");
    var apodImage = $("<img>");
    var apodTitle = $("<h4>");
    var apodDate = $("<p>");

    $.ajax({
        url: nasaURL + nasaKey,
        method: "GET"
    })

    .then(function(data) {
        apodImage.attr({
            src: data.url,
            alt: data.title
            });

        apodTitle.text(data.title);
        apodDate.text(data.date);

        imageContainer.append(apodImage);
        imageContainer.append(apodTitle);
        imageContainer.append(apodDate);
    });
});