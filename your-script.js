// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});

renderer.setSize(window.innerWidth, window.innerHeight);

// Create a 3D object (a cube in this case)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// Add a wheel event listener for resizing
window.addEventListener('wheel', (event) => {
  // Calculate the scale factor based on the wheel movement
  const scaleFactor = 0.01;
  const scaleAmount = 1 - (event.deltaY * scaleFactor);

  // Scale the cube
  cube.scale.x *= scaleAmount;
  cube.scale.y *= scaleAmount;
  cube.scale.z *= scaleAmount;
});
