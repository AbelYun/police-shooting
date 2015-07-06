// Function to draw your map
function drawMap() {

  // Create map and set view

 //map.setView([47.6097,-122.3331],10)

  // Create an tile layer variable using the appropriate url
  var green = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {maxZoom:18, id:'examples.map-i875mjb7'});
  var grayscale = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {id:'examples.map-20v6611k'});
  var openstreets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
  var map = L.map('container', {
      //center: [47.6097,-122.3331],
      //zoom: 11,
      layers: [openstreets, grayscale, green]
   });

  var baseMaps = {
    "Streets":openstreets,
    "Grayscale":grayscale,
    "Green":green
  };

  //map.locate({setView: true, maxZoom: 16});

  // Add the layer to your map
 var landMarkIcon = L.Icon.extend({
         options: {
               iconSize: [70, 70],
               iconAnchor:[35, 70],
               popupAnchor: [0, 0]

         }

 });

 var policeDepartmentIcon = L.Icon.extend({
          options: {
                iconSize: [30, 30],
                popupAnchor: [0, 0]

          }

  });

 var needleIcon = new landMarkIcon({iconUrl: "img/spaceneedle.png"});
 var policeDepartment = new policeDepartmentIcon({iconUrl: 'img/Police-Station.png'});

L.marker([47.6204, -122.3493], {icon:needleIcon}).addTo(map).bindPopup("Seattle Space Needle");

L.marker([47.61628, -122.33661], {icon:policeDepartment}).addTo(map).bindPopup("Seattle Police Department");
L.marker([47.60431, -122.32933], {icon:policeDepartment}).addTo(map).bindPopup("Seattle Police Department HQ");
L.marker([47.614922, -122.317258], {icon:policeDepartment}).addTo(map).bindPopup("Police Department East Precinct");
L.marker([47.6523756, -122.3166015], {icon:policeDepartment}).addTo(map).bindPopup("University of Washington Police Department");
L.marker([47.65349037, -122.3618534], {icon:policeDepartment}).addTo(map).bindPopup("Seattle Police Department");
L.marker([47.5385155, -122.2932848], {icon:policeDepartment}).addTo(map).bindPopup("Police Department South Precinct");
L.marker([47.753825, -122.277535], {icon:policeDepartment}).addTo(map).bindPopup("Lake Forest Park Police Department");
L.marker([47.702806, -122.3348054], {icon:policeDepartment}).addTo(map).bindPopup("Seattle Police Department");
L.marker([47.5349037, -122.3618534], {icon:policeDepartment}).addTo(map).bindPopup("Seattle Police Department");

 openstreets.addTo(map)
 grayscale.addTo(map)
 green.addTo(map)
 L.control.layers(baseMaps).addTo(map);

map.on('locationfound', onLocationFound, map);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});


  // Execute your function to get data
  getData(map);
}

// Function for getting data
function getData(map) {

  // Execute an AJAX request to get the data in data/response.js
    $.ajax({
        url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
        type: "get",
        success:function(dat) {
           data = dat
           // Loop through your data array
          data.map(function(d){
             var circle = new L.circle([d.latitude, d.longitude], 50, {color:'red', opacity:0.8}).addTo(map)
             var offense =  d.offense_type
             var date = d.date_reported
             circle.bindPopup("OFFENSE: " + offense + "  \n DATE: " + date)

          })
        },
       dataType:"json"
    })

  // When your request is successful, call your customBuild function


}

// Do something creative with the data here!  
function customBuild(map) {

}


function onLocationFound(e, map) {
    var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
	alert(e.message);
}



