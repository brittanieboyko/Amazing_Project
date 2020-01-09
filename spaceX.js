$(document).ready(function(){

    var upcomingLaunchesURL = "https://api.spacexdata.com/v3/launches/upcoming";

    $.ajax({
        url: upcomingLaunchesURL,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
    })

    var missionsURL = "https://api.spacexdata.com/v3/missions";
   
    $.ajax({
        url: missionsURL,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
    })

    var rocketsURL = "https://api.spacexdata.com/v3/rockets";

    $.ajax({
        url: rocketsURL,
        method: "GET"
    })

    .then(function(data) {
        console.log(data);
    })
})