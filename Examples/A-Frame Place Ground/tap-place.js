// Component that places trees where the ground is clicked

import {echoAR} from './echoAR.js'

export const tapPlaceComponent = {
  init: function() {
    const ground = document.getElementById('ground')
    var echo = new echoAR("APIKey") // insert your echoAR API Key here
    
    ground.addEventListener('click', event => {
      var self = this
      echo.findObject(true, function(data) {
        // The raycaster gives a location of the touch in the scene
        const touchPoint = event.detail.intersection.point
        echo.models.forEach(function(value, key) {
          value.hologram.object3D.position.x += touchPoint.x
          value.hologram.object3D.position.y += touchPoint.y
          value.hologram.object3D.position.z += touchPoint.z
          
          value.hologram.setAttribute('visible', 'false')
          
          var originalScale = value.hologram.object3D.scale.x
          var scaleStr = originalScale + ' ' + originalScale + ' ' + originalScale
          value.hologram.setAttribute('scale', '0.0001 0.0001 0.0001')
          
          value.hologram.setAttribute('shadow', {
            receive: false,
          })
          
          self.el.sceneEl.appendChild(value.hologram)
          
          value.hologram.addEventListener('model-loaded', () => {
            // Once the model is loaded, we are ready to show it popping in using an animation
            value.hologram.setAttribute('visible', 'true')
            value.hologram.setAttribute('animation', {
              property: 'scale',
              to: scaleStr,
              easing: 'easeOutElastic',
              dur: 800,
            })
          })
        })
      })
      
    })
    
   
    
    function animate() {
      requestAnimationFrame(animate)
      echo.models.forEach(function(value, key) {
					if (value.direction == "right") {
						value.hologram.object3D.rotation.y += 0.1
					}
					else if (value.direction == "left") {
						value.hologram.object3D.rotation.y -= 0.1
					}
				})
    }
    
    animate()
  }
  
  
  
}