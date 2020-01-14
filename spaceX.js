$(document).ready(function(){
    $(document).foundation();
    var displayDiv = $(".displayDiv");
    var carousel = $(".carousel");
    var imageEl = $("#image");
    var forwardBtn = $("#forward");
    var backwardBtn = $("#backward");
    var imageCount = 0;
    var rocketCount = 0;
    
    
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
    var ulLaunches;

    
    $("#upcomingLaunches").click(function() {
        $(displayDiv).empty();
        var upcomingLaunchesURL = "https://api.spacexdata.com/v3/launches/upcoming";

        $.ajax({
            url: upcomingLaunchesURL,
            method: "GET",
        })

        .then(function(upcomingLaunches) {
            var launches = $("<div>");
            var info =$("<div>");
            $.each(upcomingLaunches, function(i, data){
                
                info.append("<li>Mission Name: " + data.mission_name +"</li>" +  "<li>Launch Date: " + moment(data.launch_date_utc).format("dddd, MMMM Do YYYY") + " </li>");
                launches.append(info);
                displayDiv.append(launches);
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
            var numbertext = $("<div>").addClass("numbertext").text(rocketCount);
            img = $("<img>").attr("id", rocketCount).addClass("rocket-images");
            img.attr("src", srcGet);
            var captionText = $("<div>").addClass("captionText");

            //append text
            var nameDiv = $("<div>");
            nameDiv.append(nameGet);

            var costLI = $("<li>").text("Cost Per Launch: $" + costGet);
            var massLI = $("<li>").text("Mass: " + massGet + " kg");
            var heightLI = $("<li>").text("Height: "+ heightGet + " meters");
            var descLI = $("<li>").text(descGet)
            var infoDiv = $("<ul>");
            infoDiv.append(costLI).append(massLI).append(heightLI).append(descLI);
            
            captionText.append(nameDiv);

            //anchor tags
            var prev = $("<a id=\"prev\" class=\"prev\" onclick=\"minusSlides(" + rocketCount + ")\">&#10094;</a>");
            var next = $("<a id=\"next\" class=\"next\" onclick=\"nextSlides(" + rocketCount + ")\">&#10095;</a>");
            
            mySlides.append(numbertext).append(numbertext).append(img).append(captionText);

            container.append(mySlides).append(prev).append(next);

            $(".displayDiv").append(container).append(infoDiv);// Append the new elements
            
        }
        var currentIndex = 0;

        //function that changes the src of the image tag to the next url in the array
        

        window.nextSlides = function (param) {
        
            if (currentIndex + 1 < pictureURL[param-1].length){   
                currentIndex++;         
                $("#" + param ).attr("src", pictureURL[param-1][currentIndex]);
                
            } else {
                currentIndex = 0;
                $("#" + param ).attr("src", pictureURL[param-1][currentIndex]);
            }
                
        } 
        
        window.minusSlides = function (param) {
            
            if (currentIndex > 0){ 
                currentIndex--;           
                $("#" + param ).attr("src", pictureURL[param-1][currentIndex]);
            } else if (currentIndex === 0) {
                currentIndex = pictureURL[param-1].length - 1;       
                $("#" + param ).attr("src", pictureURL[param-1][currentIndex]);
            } 
        }

        $.ajax({
            url: rocketsURL,
            method: "GET"
        })

        .then(function(rockets) {
            
            $.each(rockets, function(i, data){

                pictureURL.push(data.flickr_images);
                rocketName.push(data.rocket_name);
                rocketDescription.push(data.description);
                rocketCost.push(data.cost_per_launch);
                rocketMass.push(data.mass.kg);
                rocketHeight.push(data.height.meters);

                srcGet = pictureURL[i];
                nameGet = rocketName[i];
                descGet = rocketDescription[i];
                costGet = rocketCost[i];
                massGet = rocketMass[i];
                heightGet = rocketHeight[i];
                
                appendText();

            })

            

        })
    })

    

    
})