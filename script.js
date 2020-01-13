$(document).ready(function(){
    var apodImage = $("<img>");
    var modal = document.querySelector("#apod-modal");
    var span = document.getElementsByClassName("close")[0];
    var imageDescription = $(".modal-caption-text");

    function getAPODData() {
        var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
        var nasaKey = "wX95wmF1OaylDvqokfgXj5v4WftUvcM915KPIUv1";

        var apodTitle = $("<h4>");
        var apodDate = $("<p>");
        var imageContainer = $(".apod-container");

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
            imageDescription.text(data.explanation);
            console.log(imageDescription.text());
    
            imageContainer.append(apodImage);
            imageContainer.append(apodTitle);
            imageContainer.append(apodDate);
        });
    }

    function displayModal() {
        var modalImg = document.querySelector(".modal-content");
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    function closeModal() {
        modal.style.display = "none";
    }

    getAPODData();

    apodImage.on("click", displayModal);
    span.onclick = closeModal;

});