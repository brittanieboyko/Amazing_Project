$(document).ready(function(){

    var galleryImageContainer = $("#image-container");
    var galleryModal = document.querySelector("#gallery-modal");
    var span = document.getElementsByClassName("close")[0];


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
                            class: "nasa-gallery-img"
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

    span.onclick = function() {
        galleryModal.style.display = "none";
    }

    $("#image-search-button").click(getNasaImageLibrary);

    $(document).on('click','.nasa-gallery-img',function(){
        var modalImg = document.querySelector(".modal-content");
        galleryModal.style.display = "block";
        modalImg.src = this.src;
    });
})