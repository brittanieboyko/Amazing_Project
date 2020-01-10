$(document).ready(function(){

    var $displayDiv = $(".displayDiv");
    
    $("#upcomingLaunches").click(function() {

        var upcomingLaunchesURL = "https://api.spacexdata.com/v3/launches/upcoming";

        $.ajax({
            url: upcomingLaunchesURL,
            method: "GET",
        })

        .then(function(upcomingLaunches) {

            console.log(upcomingLaunches);

            $.each(upcomingLaunches, function(i, data){
                $displayDiv.append("<li>Mission Name: " + data.mission_name + " Launch Date: " + data.launch_date_utc + " </li>") 
            })
        })
    })

    $("#missions").click(function() {

        var missionsURL = "https://api.spacexdata.com/v3/missions";
        
    
        $.ajax({
            url: missionsURL,
            method: "GET"
        })

        .then(function(missions) {
            console.log(missions);

            $.each(missions, function(i, data){
                $displayDiv.append("<li>Mission Name: " + data.mission_name + " </li>" + "<li>Description: " + data.description + " </li>"); 
            })
        })
    })

    $("#rockets").click(function() {

        var rocketsURL = "https://api.spacexdata.com/v3/rockets";

        $.ajax({
            url: rocketsURL,
            method: "GET"
        })

        .then(function(rockets) {
            console.log(rockets);
            
            $.each(rockets, function(i, data){
                $displayDiv.append("<img src=\"" + data.flickr_images[0] + "\">" + "<li> " + data.rocket_name + "</li>" + 
                "<li>Mass: " + data.mass.kg + " kg </li>" + "<li>Height: " + data.height.meters + "m </li>" + "<li>Cost per launch $" + data.cost_per_launch  + "</li>"
                + "<li>Description: " + data.description + "</li>");
            })
        })
    })
})