* For this project, add `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>` to head.html to enable jquery.
* Add `import {modelInteractComponent} from './model-interact.js'` and `AFRAME.registerComponent('model-interact', modelInteractComponent)` to app.js to connect to image-track.js. 
* Add `model-interact` to the list of attributes in the `<a-scene>` tag in body.html.
* Remove the `<a-entity>` tag with the id "model" and all of its attributes from body.html.
* Place model-interact.js into Files on the 8th Wall console.