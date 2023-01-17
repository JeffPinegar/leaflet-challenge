<h1> Jeff Pinegar </h1>
jeffpinegar1@gmail.com <br>
717-982-0516
<br><br>
Module 15 Leaflet-Challenge
<hr>
<h1> Overview</h1>
Files contain in Leaflet-Part-1 and Leaflet-Part-2 are very similar.  They have the same file names.  Both solutions permit the selection of one of the same 6 base layers.  Both solutions include the overlay with “bubbles” proportional to the magnitude of the earthquake and color indicating the depth. The hover text includes the location, date, magnitude, and depth.
Leaflet-Part-1 has a second overlay which has markers rather than circles.
Leaflet-Part-2 has a second overlay that shows the tectonic plates. 
<h3>Index.html</h3>
This file contains the html for rendering the maps.
<h3>logic01.js</h3>
This is the file that imports the data, creates the maps, map controls, and calls the other JS to create the baselayers and overlay layers
<h3>Baselayers.js</h3>
This file contains the JavaScript function for the creation of all 6 base layers.  There are no arguments for this function.  The function returns a JavaScript object for the base layer maps and the default map (the one that will be displayed on startup.)
<h3>featureLayer02.js</h3>
The file contains the JavaScript function that creates the overlay for the earthquake circles. It takes the data file and overlay name as arguments and returns the overlay.
<h3>featureLayer01.js (Part-1) </h3>
This file contains the function that generates earthquake markers.
<h3>Featurelayer01.js (Part-2) </h3>
This file contains the function that adds the borders of the tectonic plates.
<h3>style.css</h3>
This file is responsible for formatting the text in the legend into a colorful legend.
