

function initBuffers(gl, canvas, mesh) {
  glMatrix.mat4.identity(worldMat)
  glMatrix.mat4.lookAt(viewMat, [0,0,-5], [0,0,0], [0,4,0])
  glMatrix.mat4.perspective(projMat, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)

  // bind 
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexID)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vert), gl.STATIC_DRAW)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triID)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.tri), gl.STATIC_DRAW)

  // vertex position attribute
  gl.vertexAttribPointer(vertPosAttrib,
    3, // num of element per attribute
    gl.FLOAT,
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // total vertex size in bytes
    0 // offset in bytes
    )
  gl.enableVertexAttribArray(vertPosAttrib)

  // vertex color attribute
  gl.vertexAttribPointer(vertColAttrib,
    3,
    gl.FLOAT,
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT
    )
  gl.enableVertexAttribArray(vertColAttrib)

  //
  gl.uniformMatrix4fv(uniWorld, gl.FALSE, worldMat);
  gl.uniformMatrix4fv(uniView, gl.FALSE, viewMat);
  gl.uniformMatrix4fv(uniProj, gl.FALSE, projMat);
}



// Mesh class
class Mesh{
  
  constructor(vert, tri, offset = [0,0,0]){
    this.vert = vert?.concat()
    this.tri = tri?.concat()
    
    for (let i = 0; i < this.vert.length; i++) {
      if (i % 6 == 4 | i % 6 == 5 | i % 6 == 6)
        continue
      this.vert[i] += offset[i%6]
      
    }
  }
  
  combine(meshes){
    for (let i = 0; i < meshes.length; i++) {
      
      this.vert = this.vert.concat(meshes[i].vert)
      const otherTri = meshes[i].tri
      const triOffset = max( (i == 0 ? this.tri : meshes[i-1].tri) ) + 1
      for (let i = 0; i < otherTri.length; i++) {
        otherTri[i] += triOffset
      }
      this.tri = this.tri.concat(otherTri)
    }
  }
}