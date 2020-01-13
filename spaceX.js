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
            img = $("<img>").attr("id", rocketCount);
            img.attr("src", srcGet);
            var captionText = $("<div>").addClass("captionText");

            //append text
            var nameDiv = $("<div>");
            nameDiv.append(nameGet);

            var infoDiv = $("<p>");
            infoDiv.append(costGet, massGet, heightGet, descGet);
            
            captionText.append(nameDiv);

            //anchor tags
            var prev = $("<a id=\"prev\" class=\"prev\" onclick=\"minusSlides(" + rocketCount + ")\">&#10094;</a>");
            var next = $("<a id=\"next\" class=\"next\" onclick=\"nextSlides(" + rocketCount + ")\">&#10095;</a>");
            
            mySlides.append(numbertext).append(numbertext).append(img).append(captionText);

            container.append(mySlides).append(prev).append(next);

            $(".displayDiv").append(container).append(infoDiv);// Append the new elements
            
        }

        //function that changes the src of the image tag to the next url in the array
        

        window.nextSlides = function (param) {
            //for loop over the pictureurls length
            console.log(pictureURL[param-1]);
            console.log(param-1);
            
                for(var j = param-1; j <pictureURL[param-1].length; j++) {
                    console.log(pictureURL[param-1].length);
                    $("#" + param ).attr("src", pictureURL[param-1][j]);
                    
                }
        }
        
        window.minusSlides = function (param) {
            console.log("hey");
            
            for(var j = param; j < pictureURL[param].length; j--) {
                // console.log();
                $("#" + j).attr("src", srcGet[j]);
                return;
            }

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
                rocketMass.push(data.mass.kg);
                rocketHeight.push(data.height.meters);

                srcGet = pictureURL[i];
                console.log(pictureURL, pictureURL[i][1]);
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