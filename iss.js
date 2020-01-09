
    var queryURL = "http://api.open-notify.org/iss-now.json";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then (function (data) {
        console.log(data)
    });

    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 1
      });
    }
