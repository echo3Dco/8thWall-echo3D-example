export class echoAR {
  
    constructor(apiKey) {
      this.models = new Map()
      this.serverURL = "https://api.echo3d.com/query?key=" + apiKey
      this.loader = new THREE.GLTFLoader()
    }
    
    transformations(id, data) {
      // initializes model's transformations based on metadata in console
      
      var keys = Object.keys(data.db)
      var i
      for (i=0; i<keys.length; i++) {
          if (id.includes(data.db[keys[i]].id)) {
              break
          }
      }
      if(data.db[keys[i]].additionalData.direction=="right") {
          this.models.get(id).direction = "right"
      }
      else if(data.db[keys[i]].additionalData.direction=="left") {
          this.models.get(id).direction = "left"
      }
      
      
      if(data.db[keys[i]].additionalData.x!=null) {
          this.models.get(id).hologram.position.x += Number(data.db[keys[i]].additionalData.x)
      }
      if(data.db[keys[i]].additionalData.y!=null) {
          this.models.get(id).hologram.position.y += Number(data.db[keys[i]].additionalData.y)
      }
      if(data.db[keys[i]].additionalData.z!=null) {
          this.models.get(id).hologram.position.z += Number(data.db[keys[i]].additionalData.z)
      }
      
      
      if(data.db[keys[i]].additionalData.xAngle!=null) {
          this.models.get(id).hologram.rotation.x = Number(data.db[keys[i]].additionalData.xAngle)
      }
      if(data.db[keys[i]].additionalData.yAngle!=null) {
          this.models.get(id).hologram.rotation.y = Number(data.db[keys[i]].additionalData.yAngle)
      }
      if(data.db[keys[i]].additionalData.zAngle!=null) {
          this.models.get(id).hologram.rotation.z = Number(data.db[keys[i]].additionalData.zAngle)
      }
      
      if(data.db[keys[i]].additionalData.scale!=null) {
          this.models.get(id).hologram.scale.x = Number(data.db[keys[i]].additionalData.scale)
          this.models.get(id).hologram.scale.y = Number(data.db[keys[i]].additionalData.scale)
          this.models.get(id).hologram.scale.z = Number(data.db[keys[i]].additionalData.scale)
      }
      
      // deal with image targets
                
      if (data.db[keys[i]].target.type=="IMAGE_TARGET") {
        this.models.get(id).imageTarget = data.db[keys[i]].target.filename
      }
      
    }
    
    // Load the glb model at the requested point on the surface.
    findObject(isAFrame, callback) {
      var self = this
      var data
      $.getJSON(self.serverURL, function(data) {
            var keys = Object.keys(data.db)
            var i
            var modelsLoaded = 0
            for(i=0; i< keys.length; i++) {
                var fileURL = self.serverURL + "&file=" + data.db[keys[i]].additionalData.glbHologramStorageID
                if (data.db[keys[i]].additionalData.glbHologramStorageID==null) {
                    fileURL = self.serverURL + "&file=" + data.db[keys[i]].hologram.storageID
                }
                
                if (isAFrame) {
                  var newElement = document.createElement("a-entity")
                  newElement.setAttribute("gltf-model", fileURL)
                  console.log("URL " + fileURL)
                  self.models.set(data.db[keys[i]].id, {hologram: newElement, direction: null, url: fileURL, imageTarget: null})
                  self.transformationsAFrame(data.db[keys[i]].id, data)
                  modelsLoaded++
                  if (modelsLoaded == keys.length) {
                    callback(data)
                  }
                }
                else {
                  self.loadModels(fileURL, data.db[keys[i]].id, data, function(data) {
                    modelsLoaded++
                    if (modelsLoaded == keys.length) {
                      callback(data)
                    }
                    
                  })
                }
            }
          })
          
    }
    
    loadModels(fileURL, id, data, callback) {
      console.log(fileURL)
        this.loader.load(
        fileURL,                                                              // resource URL.
        (gltf) => {this.models.set(id, {hologram: gltf.scene, direction: null, url: fileURL, imageTarget: null}); this.transformations(id, data); callback(data) },     // loaded handler.
        (xhr) => {console.log(`${(xhr.loaded / xhr.total * 100 )}% loaded`)},   // progress handler.
        (error) => {console.log('An error happened: ' + error)}
      )
      
    }
    
    transformationsAFrame(id, data) {
      // initializes model's transformations based on metadata in console
      
      var keys = Object.keys(data.db)
      var i
      for (i=0; i<keys.length; i++) {
          if (id.includes(data.db[keys[i]].id)) {
              break
          }
      }
      if(data.db[keys[i]].additionalData.direction=="right") {
          this.models.get(id).direction = "right"
      }
      else if(data.db[keys[i]].additionalData.direction=="left") {
          this.models.get(id).direction = "left"
      }
      
      
      if(data.db[keys[i]].additionalData.x!=null) {
        this.models.get(id).hologram.object3D.position.x += Number(data.db[keys[i]].additionalData.x)
      }
      if(data.db[keys[i]].additionalData.y!=null) {
          this.models.get(id).hologram.object3D.position.y += Number(data.db[keys[i]].additionalData.y)
      }
      if(data.db[keys[i]].additionalData.z!=null) {
          this.models.get(id).hologram.object3D.position.z += Number(data.db[keys[i]].additionalData.z)
      }
      
      
      if(data.db[keys[i]].additionalData.xAngle!=null) {
          this.models.get(id).hologram.object3D.rotation.x = Number(data.db[keys[i]].additionalData.xAngle)
      }
      if(data.db[keys[i]].additionalData.yAngle!=null) {
          this.models.get(id).hologram.object3D.rotation.y = Number(data.db[keys[i]].additionalData.yAngle)
      }
      if(data.db[keys[i]].additionalData.zAngle!=null) {
          this.models.get(id).hologram.object3D.rotation.z = Number(data.db[keys[i]].additionalData.zAngle)
      }
      
      if(data.db[keys[i]].additionalData.scale!=null) {
          this.models.get(id).hologram.object3D.scale.x = Number(data.db[keys[i]].additionalData.scale)
          this.models.get(id).hologram.object3D.scale.y = Number(data.db[keys[i]].additionalData.scale)
          this.models.get(id).hologram.object3D.scale.z = Number(data.db[keys[i]].additionalData.scale)
      }
      
      // deal with image targets
                
      if (data.db[keys[i]].target.type=="IMAGE_TARGET") {
        this.models.get(id).imageTarget = data.db[keys[i]].target.filename
      }
      
    }
  
  }
  
  
