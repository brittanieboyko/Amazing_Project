$(document).ready(function(){
    var map, marker

    let isMap = false;
    let isMarkerInit = false;

    function initMarker(location) {
        var shuttleIcon = "assets/images/icon-space-shuttle.png"

        marker = new google.maps.Marker({
            position: location,
            icon: shuttleIcon,
            map: map
        });
    }

    function positionMarker(location) {
        if(!isMarkerInit){
            initMarker(location);
            isMarkerInit = true;
        } else {
            marker.setMap(null)
            initMarker(location);
        }
    }

    function initMap() {
        
        var queryURL = "http://api.open-notify.org/iss-now.json";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then (function (data) {
            var lat = parseInt(data.iss_position.latitude);
            var lng = parseInt(data.iss_position.longitude);
            iss = {lat: lat, lng: lng};

            if (!isMap){
                map = new google.maps.Map(document.getElementById("map"), {
                    center: iss,
                    zoomControl: false,
                    zoom: 3
                });
                isMap = true;
            }   
            
            positionMarker(iss, map);
        });

        setTimeout(initMap, 5000);
    }

    function peopleInSpace(){

        var queryURL = "http://api.open-notify.org/astros.json";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then (function (data){
            
            var numInSpace = data.number

            var answerText = $("#numAnswer")

            answerText.text("At this moment there are " + numInSpace + " people in space!")

            var whoInSpace = $("#pplInSpace")

            data['people'].forEach(function (d) {
                var newPerson = $("<li>");
                newPerson.text(d['name']);
               whoInSpace.append(newPerson);
            })

        });
    
        $('.sim-thumb').on('click', function() {
            $('#main-product-image').attr('src', $(this).data('image'));
           
          })
          
    
    }

    initMap();
    peopleInSpace();
    

});