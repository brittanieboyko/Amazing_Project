$(document).ready(function(){
    $(document).foundation();
    var displayDiv = $(".displayDiv");
    var carousel = $(".carousel");
    var imageEl = $("#image");
    var forwardBtn = $("#forward");
    var backwardBtn = $("#backward");
    var imageCount = 0;
    var rocketCount = 0;
    var prev = $("#prev");
    
    //arrays
    var pictureURL = [];
    var rocketDescription = [];
    var rocketCost = [];
    var rocketMass = [];
    var rocketHeight = [];
    var rocketName = [];
    var img;

    //get variables
    var srcGet;
    var nameGet;
    var costGet;
    var descGet;
    var massGet;
    var heightGet;

    
    $("#upcomingLaunches").click(function() {
        $(displayDiv).empty();
        var upcomingLaunchesURL = "https://api.spacexdata.com/v3/launches/upcoming";

        $.ajax({
            url: upcomingLaunchesURL,
            method: "GET",
        })

        .then(function(upcomingLaunches) {

            $.each(upcomingLaunches, function(i, data){
                displayDiv.append("<li>Mission Name: " + data.mission_name + "</li>" +  "<li>Launch Date: " + moment(data.launch_date_utc).format("dddd, MMMM Do YYYY") + " </li>") 
            })
        })
    })

    $("#missions").click(function() {
        $(displayDiv).empty();
        var missionsURL = "https://api.spacexdata.com/v3/missions";
        
    
        $.ajax({
            url: missionsURL,
            method: "GET"
        })

        .then(function(missions) {
            console.log(missions);

            $.each(missions, function(i, data){
                displayDiv.append("<li>Mission Name: " + data.mission_name + " </li>" + "<li>Description: " + data.description + " </li>" + "<li><a href=\"" + data.website + "\">Website</a></li>"); 
            })
        })
    })

    $("#rockets").click(function() {
        $(displayDiv).empty();
        $(carousel).removeClass("hide");
        
        var rocketsURL = "https://api.spacexdata.com/v3/rockets";

        function appendText() {
            rocketCount++;
            
            var container = $("<div>").addClass("slideshow-container");
            var mySlides = $("<div>").addClass("mySlides fade");
            var numbertext = $("<div>").addClass("numbertext").text(imageCount+1);
            img = $("<img>").attr("id", "image");
            img.attr("src", srcGet);
            var captionText = $("<div>").addClass("captionText");

            //append text
            var nameDiv = $("<div>");
            nameDiv.append(nameGet);

            var infoDiv = $("<p>");
            infoDiv.append(costGet, massGet, heightGet, descGet);
            
            captionText.append(nameDiv);

            //anchor tags
            var prev = $("<a id=\"prev\" class=\"prev\">&#10094;</a>");
            var next = $("<a id=\"next\" class=\"next\">&#10095;</a>");
            
            // prev.click(minusSlides());
            // next.click(plusSlides());

            mySlides.append(numbertext).append(numbertext).append(img).append(captionText);

            container.append(mySlides).append(prev).append(next);

            console.log(mySlides);
            $(".displayDiv").append(container).append(infoDiv);// Append the new elements
            
        }

        //function that changes the src of the image tag to the next url in the array
        function minusSlides() {
            console.log("hey");
            if (imageCount > pictureURL[i]) {
                imageCount--;
                img.attr("src", pictureURL[i--]);
            } else {
                imageCount = pictureURL.length;
                img.attr("src", pictureURL[Math.max(pictureURL)]);
            }
        }

        function plusSlides () {
            //for loop over the pictureurls length
            console.log("hey");

            
            // if (imageCount < pictureURL[i]){
            //     imageCount++;
            //     i=imageCount;
            //     img.attr("src", pictureURL[i]);
            //     console.log("Yessir");
            // } else {
            //     imageCount = 0;
            //     pictureURL[0];
            // }
        }

        

        $.ajax({
            url: rocketsURL,
            method: "GET"
        })

        .then(function(rockets) {
            console.log(rockets);
            
            $.each(rockets, function(i, data){

                pictureURL.push(data.flickr_images);
                rocketName.push(data.rocket_name);
                rocketDescription.push(data.description);
                rocketCost.push(data.cost_per_launch);
                console.log(rocketCost);
                rocketMass.push(data.mass.kg);
                rocketHeight.push(data.height.meters);

                // $(".captionText").append(rocketName);
                srcGet = pictureURL[i];
                nameGet = rocketName[i];
                descGet = rocketDescription[i];
                costGet = rocketCost[i];
                massGet = rocketMass[i];
                heightGet = rocketHeight[i];
                
                appendText();

                console.log(pictureURL, data.flickr_images[i]);
            })

            

        })
    })
})