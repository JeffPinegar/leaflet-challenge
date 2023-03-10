/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// --------------------------  define initial conditions -------------------------------------------------
// URL for the data
const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Set initial center location for the map.
const initCenter = [40, -94];

// et initial zoom for the map
const initZome = 5;

// ------------------------- End initial conditions -------------------------------------------------------

// Perform a GET request to the query URL and get the data
d3.json(queryUrl).then(function(data) {
  featureData = data.features;
  //
  // ----------------------- Call function to collect the base layers -------------------------------------
  // The creation of the base layers is in another file: baselayers.js
  // baseLayerMaps is a list where [0] is the intial view and [1] is a javascript object (dictionary) key-value pairs for all the base layer options
  const baseLayerMaps = createBaseLayers();


  // ------------------- construct framework for base layers, overlays and the layer control ---------------

  // Here are the overlays
  const layers = {
    Bubbles: new L.LayerGroup(),
    Markers: new L.LayerGroup(),
  };


  // the tag in the html is "map"
  const myMap = L.map('map', {
    center: initCenter,
    zoom: initZome,
    layers: [
      layers.Bubbles,
      layers.Markers,
    ],
  });

  const overlays ={
    Bubbles: layers.Bubbles,
    Markers: layers.Markers,
  };
  // -------------------------  End construction of framework for base layers and overlays -------------------


  // Add the initial base layer to myMap
  baseLayerMaps[0].addTo(myMap);


  // ---------------------------  Start information for Legend ----------------------------------------------
  // Create a legend to display information about our map.
  const info = L.control({
    position: 'bottomright',
  });

  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function() {
    const div = L.DomUtil.create('div', 'legend');
    return div;
  };


  // Add the info legend to the map.
  info.addTo(myMap);

  // ------------------------ End information for Legend -----------------------------------------------------


  // Build feature layer #1
  // Argument = data set
  // Returns layer data (not the layer, the data still need to added to the layer)
  const featurelayer1 = createFeatures1(featureData);
  // add the layer data to the feature layer #1
  featurelayer1.addTo(layers.Markers);

  // Bild feature lay #2
  // Argument 1 = featureData - the data source for the feature
  featureOverlay2 = layers.Bubbles;
  // Argument 2 = layer name - the name of the layer that will be build inside the function.  It is needed in this beasue
  // Returns layer data
  const featurelayer2 = createFeatures2(featureData, featureOverlay2);

  updateLegend();

  // L.control.layers(baseLayerMaps[1], overlays)._update();
  // Create a control for our layers, and add our overlays to it.

  myMap.removeLayer(featurelayer1); // I don't want the markers on to start.

  L.control.layers(baseLayerMaps[1], overlays, {collapsed: true},
  ).addTo(myMap); // null is there because there are no other base layers
  console.log(data);


  function updateLegend() {
    document.querySelector('.legend').innerHTML = [
      '<p class=\'LegendTitle\'> Depth [km]</p>',
      '<p class=\'layer1\'>Less than 10</p>',
      '<p class=\'layer2\'>10 to 30</p>',
      '<p class=\'layer3\'>30 to 50</p>',
      '<p class=\'layer4\'>50 to 70</p>',
      '<p class=\'layer5\'>70 to 90</p>',
      '<p class=\'layer6\'>More than 90</p>',
    ].join('');
  }
});
