
// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.dark",
accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
"Street Map": streetmap,
"Dark Map": darkmap
};

var earthquake=new L.LayerGroup();
var overlays={
    Earthquakes: earthquake
};



// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
center: [
37.09, -95.71
],
zoom: 5,
layers: [streetmap]
});
L.control.layers(baseMaps,overlays).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  L.geoJson(data,{
      pointToLayer: function(features,latlng) {
          return L.circleMarker(latlng)
      },
      
  }).addTo(earthquake);
  earthquake.addTo(myMap)
});

