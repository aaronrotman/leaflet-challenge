// Url for the data
var dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// A list of colors to use as fill-color for the markers
var colors = ["skyblue", "darkseagreen","yellow","orange","red","darkred"];

// Create the map
var myMap = L.map('map-zone').setView([37.75,-122.47], 7);

// Create the base layer for the map
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Add the base layer to the map
lightMap.addTo(myMap);

// Create the legend
var legend = L.control({ position: "topright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = [
        "<h1>Magnitude</h1>",
        `<h3 style="background:${colors[5]}">5+</h3>`,
        `<h3 style="background:${colors[4]}">4-5</h3>`,
        `<h3 style="background:${colors[3]}">3-4</h3>`,
        `<h3 style="background:${colors[2]}">2-3</h3>`,
        `<h3 style="background:${colors[1]}">1-2</h3>`,
        `<h3 style="background:${colors[0]}">0-1</h3>`,
    ]   
    return div;
  };
// Add the legend to the map
legend.addTo(myMap);

// Retrieve the earthquake data
d3.json(dataUrl).then(data => {
    console.log(data);
    // Assign the list of earthquakes to a variable
    earthquakes = data.features;
    // Add a circle to the map for each earthquake
    // Set circle fill-color and size according to the magnitude of the earthquake
    for (var i = 0; i < earthquakes.length; i++) {
        
        // Assign the coordinates to variables
        var latitude = earthquakes[i].geometry.coordinates[1];
        var longitude = earthquakes[i].geometry.coordinates[0];
        // Assign the magnitude of the earthquake to a variable
        var magnitude = earthquakes[i].properties.mag;
        console.log(`Coordinates: ${latitude}, ${longitude}`)
        // Conditionals for marker color
        colorIndex = Math.floor(magnitude);
        var color = colors[colorIndex];
        var circle = L.circle([latitude, longitude], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: magnitude * 3000,
        }).bindPopup(`<h1>Magnitude: ${magnitude}</h1><hr><h3>${earthquakes[i].properties.place}</h3><hr><a href="${earthquakes[i].properties.url}">Read More</a>`).addTo(myMap);
    };
});
