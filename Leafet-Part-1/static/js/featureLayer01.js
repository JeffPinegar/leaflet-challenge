/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */


// -----------------------  Start function to create Marker and popup for each feature ------------------------------------
function createFeatures1(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function myOnEachFeatFunction(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
    <p>${new Date(feature.properties.time)}</p>
    <p>Magnitude: ${feature.properties.mag}</p>
    <p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }
  // Date is convert time value to a date.
  // new does ???

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  const featurelayer = L.geoJSON(earthquakeData, {
    onEachFeature: myOnEachFeatFunction, // steps to perform for each feature
  });

  // Send our earthquakes layer to the createMap function/
  // createMap(earthquakes); // createMap

  return featurelayer;
}
// --------------------------  End Creating Marker and popup for each feature -------------------------------------------

