$(document).ready(function(){

    function getAPOD() {
        var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
        
        var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";

        $.ajax({
            url: nasaURL + nasaKey,
            method: "GET"
        })

        .then(function(data) {
            
            $("#apod-image").attr({
                src: data.url,
                alt: data.title
                });
            $("#apod-title").text(data.title);
            $("#apod-date").text(data.date);
        });
    }

    getAPOD();

    function getNasaImageLibrary() {
        event.preventDefault();
        var nasaURL = "https://images-api.nasa.gov/search?q=";
        var searchTerm = $("#image-search-term").val().trim();

        if (searchTerm) {
            $.ajax({
                url: nasaURL + searchTerm,
                method: "GET"
            })

            .then(function(data) {
                console.log(data);
            });
        }

    }

    $("#image-search-button").click(getNasaImageLibrary);


})