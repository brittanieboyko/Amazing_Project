var queryURL = "https://api.spacexdata.com/v3/missions";

$(document).ready(function(){

$.ajax({
    url: queryURL,
    method: "GET"
})
  
  .then (function (data) {

  console.log(data)
  })

});

var queryURL = "http://api.open-notify.org/astros.json";
    $.ajax({
        url: queryURL,
        method: "GET"

    })

    .then(function (data){

console.log(data.number)

$("#header1").text(data.people[0].name)
    })
