import {echoAR} from './echoAR.js'

export const imageTrackComponent = {
  init: function() {
    var self = this
    var echo = new echoAR("APIKey") // insert your echoAR API Key here
    echo.findObject(true, function(data) {
      echo.models.forEach(function(value, key) {
        var marker = document.createElement("a-entity")
        marker.setAttribute("xrextras-named-image-target", "name: " + value.imageTarget)
        marker.appendChild(value.hologram)
        self.el.sceneEl.appendChild(marker)
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