/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */


// --------------------------------------- Start creatMap function ------------------------------------------------------
function createMap(bikeStations) {
  // Create the tile layer that will be the background of our map.
  const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google',
  });

  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

  const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google',
  });

  const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google',
  });

  const googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google',
  });


  // Only one base layer can be shown at a time.
  // javascript object so it contains key value parirs
  const baseMaps = {
    StreetMap: streetmap,
    googlestreetmap: googleStreets,
    Topography: topo,
    Statellite: googleSat,
    Hybrid: googleHybrid,
    Terrain: googleTerrain,
  };


  // Create an overlayMaps object to hold the bikeStations layer.
  const overlayMaps = {
    'Bike Stations': bikeStations,
  };

  // Create the map object with options.
  const map = L.map('map', {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, bikeStations],
  });

  // eslint-disable-next-line max-len
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
  }).addTo(map);
}
// --------------------------------------- End creatMap function ---------------------------------------------------


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').then(createMarkers);


// ----------------------------------- Start creatMarkers fucntion ---------------------------------------------------
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  const stations = response.data.stations;

  // Initialize an array to hold bike markers.
  const bikeMarkers = [];

  // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    const station = stations[index];

    // For each station, create a marker, and bind a popup with the station's name.
    const bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup('<h3>' + station.name + '<h3><h3>Capacity: ' + station.capacity + '</h3>');

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}
// ----------------------------------- End creatMarkers fucntion ---------------------------------------------------


