# 8th-Wall-echoAR-demo
Demo that integrates echoAR with 8th Wall examples.

## Register
Don't have an API key? Make sure to register for FREE at [echoAR](https://console.echoar.xyz/#/auth/register).

## Setup
* Create a new 8th Wall project.
* Add echoAR.js to the project files.
* On the JavaScript file that runs your scene, type `import {echoAR} from './echoAR.js';` to import the echoAR class.
* Create a new echoAR object using `var echo = new echoAR(YOUR_API_KEY);`.
* To download the 3D models from your echoAR console, use the `findObject()` method. Each model will be placed as entries into a JavaScript map.
* Use `echo.models.get(ENTRY_ID)` to access these entries in your main JavaScript file, where `ENTRY_ID` is the Entry ID listed in the console.
* Look through the examples folder to see how echoAR can be implemented on existing 8th Wall demos. Replace any files in the 8th Wall console with their counterparts in the examples folder.
### Map Attributes
* `echo.models.get(ENTRY_ID).hologram` is the .glb model whose physical properties can be changed programmatically.
* `echo.models.get(ENTRY_ID).direction` is the direction information that is pulled down from the console in `transformations()`. Look at the examples below to see how to rotate models in an animate() function.
* `echo.models.get(ENTRY_ID).url` is the URL of the .glb model.
* `echo.models.get(ENTRY_ID).imageTarget` is the file name of the image target if one exists. Otherwise it is null.

## ThreeJS
* To initially load the models into the JavaScript map, type `echo.findObject(false, function(data) { // CODE })`, where any code put inside the callback function will run after the models are fully loaded into the map.
### Accessing and changing physical characteristics
* Position: `echo.models.get(ENTRY_ID).hologram.position`
* Rotation: `echo.models.get(ENTRY_ID).hologram.rotation`
* Scale: `echo.models.get(ENTRY_ID).hologram.scale`
## A-Frame
* To initially load the models into the JavaScript map, type `echo.findObject(true, function(data) { // CODE })`, where any code put inside the callback function will run after the models are fully loaded into the map.
### Accessing and changing physical characteristics
* Position: `echo.models.get(ENTRY_ID).hologram.object3D.position`
* Rotation: `echo.models.get(ENTRY_ID).hologram.object3D.rotation`
* Scale: `echo.models.get(ENTRY_ID).hologram.object3D.scale`

## Run
* Press `Save+Build` to build your 8th Wall project.
* Press `Preview` and scan the QR code to run the project on your phone.

## Learn more
Refer to our [documentation](https://docs.echoar.xyz/) to learn more about how to use echoAR.

## Support
Feel free to reach out at [support@echoAR.xyz](mailto:support@echoAR.xyz) or join our [support channel on Slack](https://join.slack.com/t/echoar/shared_invite/enQtNTg4NjI5NjM3OTc1LWU1M2M2MTNlNTM3NGY1YTUxYmY3ZDNjNTc3YjA5M2QyNGZiOTgzMjVmZWZmZmFjNGJjYTcxZjhhNzk3YjNhNjE). 

## Screenshots
[AFrame Image Target Exmaple](https://github.com/echoARxyz/echoAR-8th_Wall/tree/main/Examples/A-Frame%20Image%20Targets%20Flyer)

![A-Frame Image Targets](/Examples/A-Frame%20Image%20Targets%20Flyer/Screenshot.gif)

[AFrame Manipulate 3D Model Exmaple](https://github.com/echoARxyz/echoAR-8th_Wall/tree/main/Examples/A-Frame%20Manipulate%203D%20Model)

![A-Frame Manipulate 3D Model](/Examples/A-Frame%20Manipulate%203D%20Model/Screenshot.gif)

[A-Frame Place Ground Exmaple](https://github.com/echoARxyz/echoAR-8th_Wall/tree/main/Examples/A-Frame%20Place%20Ground)

![A-Frame Place Ground](/Examples/A-Frame%20Place%20Ground/Screenshot.gif)

