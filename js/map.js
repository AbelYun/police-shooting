// Function to draw your map
function drawMap() {

  var green = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {maxZoom:18, id:'examples.map-i875mjb7'});
  var grayscale = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {id:'examples.map-20v6611k'});
  var openstreets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map

 var policeDepartmentIcon = L.Icon.extend({
          options: {
                iconSize: [30, 30],
                popupAnchor: [0, 0]

          }

  });

 var policeDepartment = new policeDepartmentIcon({iconUrl: 'img/Police-Station.png'});

var policeStations = new L.layerGroup()

var department1 = L.marker([47.61628, -122.33661], {icon:policeDepartment}).addTo(policeStations).bindPopup("Seattle Police Department");
var HQ = L.marker([47.60431, -122.32933], {icon:policeDepartment}).addTo(policeStations).bindPopup("Seattle Police Department HQ");
var eastPrecinct = L.marker([47.614922, -122.317258], {icon:policeDepartment}).addTo(policeStations).bindPopup("Police Department East Precinct");
var uwDepartment = L.marker([47.6523756, -122.3166015], {icon:policeDepartment}).addTo(policeStations).bindPopup("University of Washington Police Department");
var department2 = L.marker([47.65349037, -122.3618534], {icon:policeDepartment}).addTo(policeStations).bindPopup("Seattle Police Department");
var southPrecinct = L.marker([47.5385155, -122.2932848], {icon:policeDepartment}).addTo(policeStations).bindPopup("Police Department South Precinct");
var lakeForest = L.marker([47.753825, -122.277535], {icon:policeDepartment}).addTo(policeStations).bindPopup("Lake Forest Park Police Department");
var department3 = L.marker([47.702806, -122.3348054], {icon:policeDepartment}).addTo(policeStations).bindPopup("Seattle Police Department");
var department4 = L.marker([47.5349037, -122.3618534], {icon:policeDepartment}).addTo(policeStations).bindPopup("Seattle Police Department");

var map = L.map('container', {
      center: [47.6097,-122.3331],
      zoom: 11,
      layers: [openstreets, grayscale, green, policeStations]
   });

var baseMaps = {
    "Streets":openstreets,
    "Grayscale":grayscale,
    "Green":green
  };

  var stations = {
    "Police Stations":policeStations
  }

var landMarkIcon = L.Icon.extend({
         options: {
               iconSize: [70, 70],
               iconAnchor:[35, 70],
               popupAnchor: [0, 0]
         }
 });

var needleIcon = new landMarkIcon({iconUrl: "img/spaceneedle.png"});
L.marker([47.6204, -122.3493], {icon:needleIcon}).addTo(map).bindPopup("Seattle Space Needle");

 openstreets.addTo(map)
 grayscale.addTo(map)
 green.addTo(map)
 L.control.layers(baseMaps, stations).addTo(map);

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

             var date = d.date_reported
             var summary = d.summarized_offense_description
             var year = d.year
              if(summary == 'WARRANT ARREST') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'red', opacity:6.0}).addTo(map)
              } else if(summary == 'ASSAULT') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'red', opacity:1.0}).addTo(map)
              } else if (summary == 'BIKE THEFT') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'blue', opacity:0.3}).addTo(map)
              }else if (summary == 'CAR PROWL') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'blue', opacity:0.6}).addTo(map)
              } else if (summary == 'VEHICLE THEFT') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'blue', opacity:1.0}).addTo(map)
              } else if (summary.includes('ROBBERY')) {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'yellow', opacity:1.0}).addTo(map)
              } else if (summary.includes('BURGLARY')) {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'yellow', opacity:8.0}).addTo(map)
              } else if (summary == 'SHOPLIFTING') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'yellow', opacity:4.0}).addTo(map)
              } else if (summary == 'PICKPOCKET') {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'yellow', opacity:2.0}).addTo(map)
              }else if (summary.includes('PROPERTY')) {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'orange', opacity:5.0}).addTo(map)
              } else if (summary == ('NARCOTICS')) {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'purple', opacity:1.0}).addTo(map)
              }else {
                    var circle = new L.circle([d.latitude, d.longitude], 50, {color:'green', opacity:0.8}).addTo(map)
              }
             circle.bindPopup("<b>OFFENSE: </b>" + summary + "<br /><b>DATE:</b> " + date + "<br /><b>YEAR:</b> " + year)
          })
        },
       dataType:"json"
    })

  // When your request is successful, call your customBuild function


}

// Do something creative with the data here!  
function customBuild(map) {

}



