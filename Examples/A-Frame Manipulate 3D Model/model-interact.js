import {echoAR} from './echoAR.js'

export const modelInteractComponent = {
  init: function() {
    var self = this
    var echo = new echoAR("APIKey") // insert your echoAR API Key here
    echo.findObject(true, function(data) {
      echo.models.forEach(function(value, key) {
        value.hologram.setAttribute("id", "model")
        value.hologram.setAttribute("class", "cantap")
        value.hologram.setAttribute("hold-drag", "")
        value.hologram.setAttribute("two-finger-spin", "")
        value.hologram.setAttribute("pinch-scale", "")
        value.hologram.setAttribute("shadow", "receive: false")
        self.el.sceneEl.appendChild(value.hologram)
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