import {echoAR} from './echoAR.js'

const imageTargetPipelineModule = () => {
  var echo = new echoAR("APIKey") // insert your echoAR API Key here
  
  const modelFile = require('./assets/jellyfish-model.glb')
  const videoFile = require('./assets/jellyfish-video.mp4')

  const loader = new THREE.GLTFLoader()  // This comes from GLTFLoader.js.
  const raycaster = new THREE.Raycaster()
  const tapPosition = new THREE.Vector2()

  let model
  let video, videoObj
  

  // Populates some object into an XR scene and sets the initial camera position. The scene and
  // camera come from xr3js, and are only available in the camera loop lifecycle onStart() or later.
  const initXrScene = ({scene, camera}) => {
    console.log('initXrScene')

    
    echo.findObject(false, function(data) {
      echo.models.forEach(function(value,key) {
        // create init pose variables
        
        value.initX = value.hologram.position.x
        value.initY = value.hologram.position.y
        value.initZ = value.hologram.position.z
        value.initXAngle = value.hologram.rotation.x
        value.initYAngle = value.hologram.rotation.y
        value.initZAngle = value.hologram.rotation.z
        value.initScale = value.hologram.scale.x
        scene.add(value.hologram)
        // Hide 3D model until image target is detected.
        value.hologram.visible = false
        
      })
      
      animate()
        
    })
    

    // Add soft white light to the scene.
    // This light cannot be used to cast shadows as it does not have a direction.
    scene.add(new THREE.AmbientLight(0x404040, 5))

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    camera.position.set(0, 3, 0)
  }
  
  function animate() {
    requestAnimationFrame(animate)
    echo.models.forEach(function(value, key) {
				if (value.direction == "right") {
					value.hologram.rotation.y += 0.1
				}
				else if (value.direction == "left") {
					value.hologram.rotation.y -= 0.1
				}
			})
    }
    

  // Places content over image target
  const showTarget = ({detail}) => {
    echo.models.forEach(function(value, key) {
      if (detail.name === value.imageTarget) {
        value.hologram.position.copy(detail.position)
        
        value.hologram.scale.set(detail.scale, detail.scale, detail.scale)
        
        value.hologram.position.x += value.initX
        value.hologram.position.y += value.initY
        value.hologram.position.z += value.initZ
        

        if (value.direction==null) {
          value.hologram.quaternion.copy(detail.rotation)
          value.hologram.rotation.x += value.initXAngle
          value.hologram.rotation.y += value.initYAngle
          value.hologram.rotation.z += value.initZAngle
        }
        else {
          value.hologram.rotation.x = value.initXAngle + detail.rotation.x
          value.hologram.rotation.z = value.initZAngle + detail.rotation.z
        }
        
        
        value.hologram.scale.x *= value.initScale
        value.hologram.scale.y *= value.initScale
        value.hologram.scale.z *= value.initScale
        
        value.hologram.visible = true
        
      }
    })
    
    
  }

  // Hides the image frame when the target is no longer detected.
  const hideTarget = ({detail}) => {
    echo.models.forEach(function(value, key) {
      if (detail.name === value.imageTarget) {
        value.hologram.visible = false
      }
    })
    
    
  }

  // Grab a handle to the threejs scene and set the camera position on pipeline startup.
  const onStart = ({canvas}) => {
    const {scene, camera} = XR8.Threejs.xrScene()  // Get the 3js scene from XR

    initXrScene({scene, camera}) // Add content to the scene and set starting camera position.
    
    // prevent scroll/pinch gestures on canvas
    canvas.addEventListener('touchmove', function (event) { event.preventDefault() }) 

    // Sync the xr controller's 6DoF position and camera paremeters with our scene.
    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    })
  }

  return {
    // Camera pipeline modules need a name. It can be whatever you want but must be
    // unique within your app.
    name: 'threejs-flyer',

    // onStart is called once when the camera feed begins. In this case, we need to wait for the
    // XR8.Threejs scene to be ready before we can access it to add content. It was created in
    // XR8.Threejs.pipelineModule()'s onStart method.
    onStart,

    // Listeners are called right after the processing stage that fired them. This guarantees that
    // updates can be applied at an appropriate synchronized point in the rendering cycle.
    listeners: [
      {event: 'reality.imagefound', process: showTarget},
      {event: 'reality.imageupdated', process: showTarget},
      {event: 'reality.imagelost', process: hideTarget},
    ],
  }
}

export {imageTargetPipelineModule}
