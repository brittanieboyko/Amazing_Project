
$(document).ready(function(){
    function positionMarker(location, map) {
        var shuttleIcon = "assets/images/icon-space-shuttle.png"

        var marker = new google.maps.Marker({
            position: location,
            icon: shuttleIcon,
            map: map
        });
    }

    function initMap() {
        
        var queryURL = "http://api.open-notify.org/iss-now.json";
        var map;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then (function (data) {
            var lat = parseInt(data.iss_position.latitude);
            var lng = parseInt(data.iss_position.longitude);
            var iss = {lat: lat, lng: lng};
        
            map = new google.maps.Map(document.getElementById("map"), {
                center: iss,
                gestureHandling: 'none',
                zoomControl: false,
                zoom: 3
            });

            positionMarker(iss, map)
        });

        setTimeout(initMap, 5000);
    }

    initMap();
});