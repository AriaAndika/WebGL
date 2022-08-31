// Main Document
const canvas = document.querySelector('#glcanvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gl = canvas.getContext('webgl');

// Input Document
const loger = document.querySelector('#log');
const autoRefresh = document.querySelector('#refresh')

// Data
const vert = [
  -1.0, -1.0, -1.0, 1.0, 0.0, 0.0, // bl
  1.0, -1.0, -1.0,  1.0, 0.0, 0.0, // br
  -1.0, 1.0, -1.0,  1.0, 0.0, 0.0, // tl
  1.0, 1.0, -1.0,   1.0, 0.0, 0.0, // tr
  
  1.0, -1.0, -1.0,  0.0, 1.0, 0.0, // br
  1.0, -1.0, 1.0,   0.0, 1.0, 0.0, // br
  1.0, 1.0, -1.0,   0.0, 1.0, 0.0, // tr
  1.0, 1.0, 1.0,    0.0, 1.0, 0.0, // tr
  
  -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, // bl
  -1.0, -1.0, 1.0,  0.0, 0.0, 1.0, // bl
  -1.0, 1.0, -1.0,  0.0, 0.0, 1.0, // tl
  -1.0, 1.0, 1.0,   0.0, 0.0, 1.0, // tl
  
  1.0, -1.0, 1.0,  0.75, 0.25, 0.25, // br
  -1.0, -1.0, 1.0, 0.75, 0.25, 0.25, // bl
  1.0, 1.0, 1.0,   0.75, 0.25, 0.25, // tr
  -1.0, 1.0, 1.0,  0.75, 0.25, 0.25 // tl
]
const tri = [
  0, 1, 3,  0, 3, 2,
  4, 5, 7,  4, 7, 6,
  8, 9, 11, 8, 11, 10,
  12, 13, 15,  12, 15, 14
]

// buffer
const shaderProgram = initShaderProgram(gl);
const vertexID = gl.createBuffer();
const triID = gl.createBuffer();

// attribute
const vertPosAttrib = gl.getAttribLocation(shaderProgram,'vertPos')
const vertColAttrib = gl.getAttribLocation(shaderProgram,'vertCol')
const uniWorld = gl.getUniformLocation(shaderProgram, 'mWorld')
const uniView = gl.getUniformLocation(shaderProgram, 'mView')
const uniProj = gl.getUniformLocation(shaderProgram, 'mProject')

var worldMat = new Float32Array(16)
var viewMat = new Float32Array(16)
var projMat = new Float32Array(16)

var angle = 0
var identityMat = new Float32Array(16)

//-------------------------------Init----------------------------------------------------------------------------------

const mainMesh = new Mesh(vert, tri, [0,0,0])
const meshes = [
  new Mesh(vert, tri, [2.5,0,0]),
  new Mesh(vert, tri, [-2.5,0,0]),
  new Mesh(vert, tri, [0,2.5,0]),
]
mainMesh.combine(meshes)




//-------------------------------EndInit----------------------------------------------------------------------------------

function main() {
	// Init
  
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	} 
  gl.useProgram(shaderProgram);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  initBuffers(gl, canvas, mainMesh);
  
  
  glMatrix.mat4.identity(identityMat)
  
  // Game Loop
  var loop = () => {
    // calculation
  
    angle += 0.01
    glMatrix.mat4.lookAt(viewMat, [0,0,sx.value], [0,0,0], [0,4,0])
    glMatrix.mat4.rotate(worldMat, identityMat, angle, [0,1,0])
    glMatrix.mat4.perspective(projMat, glMatrix.glMatrix.toRadian(fov.value), canvas.width / canvas.height, 0.1, 1000.0)
    gl.uniformMatrix4fv(uniWorld, gl.FALSE, worldMat)
    gl.uniformMatrix4fv(uniProj, gl.FALSE, projMat);
    gl.uniformMatrix4fv(uniView, gl.FALSE, viewMat);
    
    
    drawScene(gl);
    if (autoRefresh.checked){
      requestAnimationFrame(loop)
    }
  }
  autoRefresh.addEventListener('input', loop)
  loop()
}
//-------------------------------Buffers----------------------------------------------------------------------------------

//-------------------------------DrawScene----------------------------------------------------------------------------------
function drawScene() {
  // clear
  gl.clearColor(0.2, 0.2, 0.5, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // draw
  gl.drawElements(gl.TRIANGLES, mainMesh.tri.length, gl.UNSIGNED_SHORT, 0)
  
}


const fov = document.querySelector('#fov');
const sx = document.querySelector('#sx');


main();
