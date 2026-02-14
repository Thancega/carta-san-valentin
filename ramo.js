window.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("ramo3d");

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    contenedor.appendChild(renderer.domElement);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    // Controles de mouse
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    let usuarioInteractuando = false;

    controls.addEventListener("start", () => usuarioInteractuando = true);
    controls.addEventListener("end", () => usuarioInteractuando = false);

    const ramo = new THREE.Group();
    scene.add(ramo);

    // Loader con MeshoptDecoder
const loader = new THREE.GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); // 🔹 importante: antes de load()

loader.load("modelo/roma.glb", (gltf) => {

    const modelo = gltf.scene;

    // Centrar
    const box = new THREE.Box3().setFromObject(modelo);
    const center = box.getCenter(new THREE.Vector3());
    modelo.position.sub(center);

    // Más grande
    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 8 / size;  // MÁS GRANDE (antes 6)
    modelo.scale.setScalar(scale);

    // bajar el ramo
    modelo.position.y -= 1;  // mueve hacia abajo

    ramo.add(modelo);

    console.log("Modelo listo ✅");
});


    function animate() {
        requestAnimationFrame(animate);

        // gira solo si el usuario no toca
        if (!usuarioInteractuando) {
            ramo.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();
});

// Botón
function volver() {
    window.location.href = "index.html";
}
function actualizarContador() {

    const inicio = new Date(2023, 4, 19); // mayo = 4 (empieza desde 0)
    const ahora = new Date();

    let diferencia = ahora - inicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    diferencia -= dias * (1000 * 60 * 60 * 24);

    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    diferencia -= horas * (1000 * 60 * 60);

    const minutos = Math.floor(diferencia / (1000 * 60));
    diferencia -= minutos * (1000 * 60);

    const segundos = Math.floor(diferencia / 1000);

    const contador = document.getElementById("contador");
    if (contador) {
        contador.innerHTML =
            `Juntos por ${dias} días, ${horas}h ${minutos}m ${segundos}s ❤️`;
    }
}

setInterval(actualizarContador, 1000);
actualizarContador();
