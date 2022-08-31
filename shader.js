const vsSource = `
precision mediump float;
attribute vec3 vertPos;
attribute vec3 vertCol;

varying vec3 fragCol;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProject;
void main() {
  gl_Position = mProject * mView * mWorld * vec4(vertPos, 1.0);;
  
  fragCol = vertCol;
}
`;
const fsSource = `
precision mediump float;
varying vec3 fragCol;
void main() {
  gl_FragColor = vec4(fragCol, 1.0);
}
`;

//-------------------------------Shader----------------------------------------------------------------------------------
function initShaderProgram(gl) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();
  
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  console.log('shader program init');
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling ' + (gl.VERTEX_SHADER ? 'vertex ' : 'fragment ') + 'shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  console.log('shader loaded');
  return shader;
}
