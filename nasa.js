$(document).ready(function(){

    var galleryImageContainer = $("#image-container");

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