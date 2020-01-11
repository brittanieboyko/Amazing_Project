$(document).ready(function(){

    var galleryImageContainer = $("#image-container");

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
        galleryImageContainer.empty();

        var nasaURL = "https://images-api.nasa.gov/search?q=";
        var searchTerm = $("#image-search-term").val().trim();

        if (searchTerm) {
            $.ajax({
                url: nasaURL + searchTerm,
                method: "GET"
            })
            .then(function(data) {
                let results = data.collection.items
                if (Array.isArray(results) && results.length) {
                    results.forEach(function(result) {
                        var galleryImage = $("<img>");
                        galleryImage.attr({
                            src: result.links[0].href,
                            alt: result.data.title,
                            class: "gallery-img"
                            });
                        galleryImageContainer.append(galleryImage);
                    })
                } else {
                    galleryImageContainer.text("No Results Found for " + searchTerm);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }

    $("#image-search-button").click(getNasaImageLibrary);
})