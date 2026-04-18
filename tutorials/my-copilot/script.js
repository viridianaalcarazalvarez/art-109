// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
pointLight.castShadow = true;
scene.add(pointLight);

// Array to store objects
const objects = [];
const colors = [
    0xff006e, // Hot pink
    0x00f5ff, // Cyan
    0xffbe0b, // Yellow
    0xfb5607, // Orange
    0x8338ec, // Purple
    0x3a86ff, // Blue
    0x06ffa5, // Green
    0xff006e, // Hot pink
    0xff4365, // Red
    0x00d4ff, // Light blue
];

let colorIndex = 0;

// Function to get random color
function getRandomColor() {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return color;
}

// Function to create geometry
function createGeometry() {
    const geometries = [
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.SphereGeometry(1.5, 32, 32),
        new THREE.ConeGeometry(1.5, 3, 32),
        new THREE.OctahedronGeometry(1.5),
        new THREE.TetrahedronGeometry(2),
        new THREE.IcosahedronGeometry(1.5),
    ];
    
    return geometries[Math.floor(Math.random() * geometries.length)];
}

// Click event listener
document.addEventListener('click', (event) => {
    // Get mouse position in normalized coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create new object at click position
    const geometry = createGeometry();
    const material = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.4,
        roughness: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Position based on click
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Place object in the direction of the click
    const direction = new THREE.Vector3(mouse.x * 30, mouse.y * 30, -50);
    mesh.position.copy(direction);

    // Add random rotation
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    // Store object data with velocity
    objects.push({
        mesh: mesh,
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3,
        velocityZ: (Math.random() - 0.5) * 0.3,
        rotationSpeedX: (Math.random() - 0.5) * 0.05,
        rotationSpeedY: (Math.random() - 0.5) * 0.05,
        rotationSpeedZ: (Math.random() - 0.5) * 0.05,
        age: 0,
        maxAge: 200,
    });

    scene.add(mesh);

    // Limit number of objects
    if (objects.length > 100) {
        const oldObject = objects.shift();
        scene.remove(oldObject.mesh);
        oldObject.mesh.geometry.dispose();
        oldObject.mesh.material.dispose();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update objects
    for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];

        // Move object
        obj.mesh.position.x += obj.velocityX;
        obj.mesh.position.y += obj.velocityY;
        obj.mesh.position.z += obj.velocityZ;

        // Rotate object
        obj.mesh.rotation.x += obj.rotationSpeedX;
        obj.mesh.rotation.y += obj.rotationSpeedY;
        obj.mesh.rotation.z += obj.rotationSpeedZ;

        // Age the object and fade it out
        obj.age++;
        const fadeStart = obj.maxAge * 0.7;
        if (obj.age > fadeStart) {
            const fadeProgress = (obj.age - fadeStart) / (obj.maxAge - fadeStart);
            obj.mesh.material.opacity = 1 - fadeProgress;
            obj.mesh.material.transparent = true;
        }

        // Remove old objects
        if (obj.age >= obj.maxAge) {
            scene.remove(obj.mesh);
            obj.mesh.geometry.dispose();
            obj.mesh.material.dispose();
            objects.splice(i, 1);
        }
    }

    renderer.render(scene, camera);
}

animate();
