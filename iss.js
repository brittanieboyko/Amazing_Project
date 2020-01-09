
    function initMap() {
    
    var queryURL = "http://api.open-notify.org/iss-now.json";
    var map;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then (function (data) {
        console.log(data)

        var lat = parseInt(data.iss_position.latitude);
        var lon = parseInt(data.iss_position.longitude);
        var iss = {lat: lat, lng: lon};
    
        map = new google.maps.Map(document.getElementById("map"), {
            center: iss,
            zoom: 2
        });
    
        var marker = new google.maps.Marker({
            position: iss,
            map: map
        });
        setTimeout(initMap, 5000);
    });

  
    }
