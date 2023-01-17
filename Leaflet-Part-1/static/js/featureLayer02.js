/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// ------------------  Function to create the overlay ----------------------------------
// Argument 1 is the data.
// Argument 2 is the layer where the data should be added.
// The function returns the layer

function createFeatures2(featuresdata, theOverlay) {
  let maxdepth = 0;
  let maxmag =0;

  for (let j=0; j< featuresdata.length; j++) {
    // const j = 200;
    const location = [featuresdata[j].geometry.coordinates[1], featuresdata[j].geometry.coordinates[0]];
    const radius = featuresdata[j].properties.mag;
    const radiusScale=20000;


    // for (let j = 0; j < featuredata.length; j++) {
    // Conditionals for country gdp_pc
    // Leaflet supports the following colors: ‘beige’, ‘black’, ‘blue’, ‘cadetblue’, ‘darkblue’, ‘darkgreen’, ‘gray’, ‘darkpurple’,
    // ‘darkred’, ‘green’, ‘lightblue’, ‘lightgray’, ‘lightgreen’, ‘lightred’, ‘orange’, ‘pink’, ‘purple’, and ‘red’.
    // depth = featuresdata[j].geometry.coordinates[2]
    let color = '';
    if (featuresdata[j].geometry.coordinates[2] > 90) {
      color = '#FF5F65';
    } else if (featuresdata[j].geometry.coordinates[2] > 70) {
      color = '#FCA35D';
    } else if (featuresdata[j].geometry.coordinates[2] > 50) {
      color = '#FDB72A';
    } else if (featuresdata[j].geometry.coordinates[2] > 30) {
      color = '#F7DB11';
    } else if (featuresdata[j].geometry.coordinates[2] > 10) {
      color = '#DCF400';
    } else {
      color = '#A3F600';
    }

    // find max mag and depth feature.properties.mag
    if (featuresdata[j].geometry.coordinates[2]>maxdepth) {
      maxdepth = featuresdata[j].geometry.coordinates[2];
    }
    if (featuresdata[j].properties.mag>maxmag) {
      maxmag = featuresdata[j].properties.mag;
    }

    // console.log('maxdepth: ', maxdepth);
    // console.log('maxmag: ', maxmag);
    // console.log('color: ', color);

    // Create a circle, and pass in some initial options.
    const newCircle = L.circle(location, {
      color: 'lightgrey',
      fillColor: color,
      fillOpacity: .3,
      weight: 1,
      radius: radius*radiusScale, // meters
    }).bindPopup(`<h3>${featuresdata[j].properties.place}</h3> <hr>
    <p> When: ${new Date(featuresdata[j].properties.time)}</p>
    <p> Magnitude: ${featuresdata[j].properties.mag}</p>
    <p> Depth: ${featuresdata[j].geometry.coordinates[2]}`);

    newCircle.addTo(theOverlay);
  }
  return theOverlay;
}
