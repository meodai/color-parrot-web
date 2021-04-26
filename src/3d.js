import * as THREE from 'three';
import './three/OrbitControls.js';
import chroma from 'chroma-js';

let cam, scene, root, renderer, controls, layers,
  objects = [], cubeSize = 100, dotSize = 1.5,
  width = window.innerWidth + 1,
  height = window.innerHeight + 1,
  $select = document.querySelector('.space-selector'),
  cDark = '#212121', cLight = '#ffffff',
  bg = cDark, colorMode = 'rgb', spaceCube, isDark = true;

const colorModes = {
  hsv: {
    func: 'hsv',
    x: [0, 360],
    y: [1, 1],
    z: [2, 1]
  },
  hsi: {
    func: 'hsi',
    x: [0, 360],
    y: [1, 1],
    z: [2, 1]
  },
  hsl: {
    func: 'hsl',
    x: [0, 360],
    y: [1, 1],
    z: [2, 1]
  },
  rgb: {
    func: 'rgb',
    x: [0, 255],
    y: [1, 255],
    z: [2, 255]
  },
  lab: {
    func: 'lab',
    z: [0, 100],
    y: [1, 127, -128],
    x: [2, 127, -128]
  },
  lch: {
    func: 'lch',
    z: [0, 100],
    y: [1, 100],
    x: [2, 0, 360]
  },
  yuv: {
    func: 'yuv',
    z: [0, 255],
    y: [1, 255],
    x: [2, 255]
  },
  hwb: {
    func: 'hwb',
    x: [0, 360],
    y: [1, 1],
    z: [2, 1]
  }
}

init();

function onWindowResize() {
  width = window.innerWidth + 1;
  height = window.innerHeight + 1;
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
  renderer.setSize(width, height);
}

let colorList = [];

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://unpkg.com/color-name-list/dist/colornames.json');
xhr.onload = e => {
  if (xhr.status === 200) {
    colorList = JSON.parse(xhr.responseText);
    addParticles(colorList, colorMode);
  } else {
    console.log(xhr.status);
  }
};
xhr.send();

let part;

function createCanvasMaterial(color, size = 256) {
  var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // create exture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;

  matContext.beginPath();
  matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  return texture;
}

function addParticles(colorNames, cMode) {


  // create the particle variables
  const particleCount = colorNames.length,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      vertexColors: THREE.VertexColors,
      size: dotSize,
      //fog: false,
      //transparent: true,
    });


  let colors = [];

  const mode = colorModes[cMode];

  colorNames.forEach((col, i) => {
    let colorComp;

    if (mode.func === 'yuv') {
      colorComp = yuv(chroma(col.hex).rgb());
    } else if (mode.func === 'hwb') {
      const [hsvH, hsvS, hsvV] = chroma(col.hex).hsv();
      colorComp = [
        hsvH,
        (1 - hsvS) * hsvV / 1,
        1 - hsvV
      ]
    } else {
      colorComp = chroma(col.hex)[mode.func]();
    }


    let pX = translate(colorComp[mode.x[0]], mode.x[2] || 0, mode.x[1], -cubeSize * .5, cubeSize * .5),
      pZ = translate(colorComp[mode.z[0]], mode.z[2] || 0, mode.z[1], -cubeSize * .5, cubeSize * .5),
      pY = translate(colorComp[mode.y[0]], mode.y[2] || 0, mode.y[1], -cubeSize * .5, cubeSize * .5);

    if (mode.func === 'hsl' || mode.func === 'hsv' || mode.func === 'hsi' || mode.func === 'hwb') {
      let theta = Math.PI * colorComp[mode.x[0]] / 180;
      let r = colorComp[mode.y[0]] * cubeSize;

      if (mode.func === 'hsi') {
        r *= colorComp[mode.z[0]];
      } else if (mode.func === 'hsv') {
        r *= colorComp[mode.z[0]] * 0.5;
      } else if (mode.func === 'hwb') {
        //r *= (1 - colorComp[mode.z[0]]) * .5;
        r = (1 - colorComp[mode.y[0]]) * cubeSize * .5
      } else {
        r *= colorComp[mode.z[0]] < 0.5 ? colorComp[mode.z[0]] : 1 - colorComp[mode.z[0]];
      }

      pY = r * Math.cos(theta);
      pX = r * Math.sin(theta);
    }

    if (mode.func === 'lch') {
      let theta = Math.PI * colorComp[mode.x[0]] / 180;
      let r = translate(colorComp[mode.y[0]], 0, mode.y[1], 0, cubeSize * .5);

      pY = r * Math.cos(theta);
      pX = r * Math.sin(theta);
    }


    let particle = new THREE.Vector3(pX, pY, pZ),
          Tcolor = new THREE.Color(col.hex);

    colors.push(Tcolor)

    // add it to the geometry
    particles.vertices.push(particle);
  });


  // create the particle system
  const particleSystem = new THREE.Points(
    particles,
    pMaterial
  );

  particleSystem.name = 'colors';
  particles.colors = colors;

  // add it to the scene
  objects.push(particleSystem)
  scene.add(particleSystem);
  part = particleSystem;
}

renderer.render(scene, cam);


animate();

function setSceneColor(color) {
  scene.background = new THREE.Color(color);
  scene.fog = new THREE.Fog(color, 150, 300);
}

function init() {
  cam = new THREE.PerspectiveCamera(75, width / height, 1, 300);
  cam.position.z = cubeSize * 1.5;
  scene = new THREE.Scene();
  setSceneColor(bg)
  root = new THREE.Object3D();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  addCube();

  controls = new THREE.OrbitControls(cam, renderer.domElement);
  // controls.addEventListener( 'change', render ); // remove when using animation loop
  // enable animation loop when using damping or autorotation
  controls.enableDamping = true;
  controls.dampingFactor = .75;
  controls.enableZoom = true;
  controls.zoomSpeed = .25;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;
  controls.maxDistance = cubeSize * 1.75;
  controls.maxPolarAngle = Math.PI * 4;
  //controls.minPolarAngle = 0;
  controls.maxAzimuthAngle = Infinity;
  controls.minAzimuthAngle = -Infinity;

  controls.noPan = true;
  controls.noKeys = true;
  //controls.noZoom = true;

  const container = document.querySelector('#container');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function addCube(color) {
  let geometryCube = cube(cubeSize);
  //geometryCube.computeLineDistances();
  const material = new THREE.LineBasicMaterial({
    color: color || 0xffffff,
    linewidth: 5,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
  });

  const colorspace = new THREE.LineSegments(
    geometryCube,
    material
  );

  colorspace.name = 'colorspace';

  objects.push(colorspace);
  scene.add(colorspace);

  spaceCube = colorspace;
}

function cube(size) {
  const h = size * 0.5;
  const geometry = new THREE.Geometry();

  geometry.vertices.push(
    new THREE.Vector3(-h, -h, -h),
    new THREE.Vector3(-h, h, -h),
    new THREE.Vector3(-h, h, -h),
    new THREE.Vector3(h, h, -h),
    new THREE.Vector3(h, h, -h),
    new THREE.Vector3(h, -h, -h),
    new THREE.Vector3(h, -h, -h),
    new THREE.Vector3(-h, -h, -h),
    new THREE.Vector3(-h, -h, h),
    new THREE.Vector3(-h, h, h),
    new THREE.Vector3(-h, h, h),
    new THREE.Vector3(h, h, h),
    new THREE.Vector3(h, h, h),
    new THREE.Vector3(h, -h, h),
    new THREE.Vector3(h, -h, h),
    new THREE.Vector3(-h, -h, h),
    new THREE.Vector3(-h, -h, -h),
    new THREE.Vector3(-h, -h, h),
    new THREE.Vector3(-h, h, -h),
    new THREE.Vector3(-h, h, h),
    new THREE.Vector3(h, h, -h),
    new THREE.Vector3(h, h, h),
    new THREE.Vector3(h, -h, -h),
    new THREE.Vector3(h, -h, h)
  );

  return geometry;
}


function render() {
  const time = Date.now() * 0.0001;
  renderer.render(scene, cam);
  //controls.update();
  objects.forEach(object => {
    //object.rotation.x = 0.25 * time * ( i%2 == 1 ? 1 : -1);
    object.rotation.x = 0.25 * time;
    object.rotation.y = 0.25 * time;
  })
}

function animate() {
  requestAnimationFrame(animate);
  render();
}


$select.addEventListener('change', e => {
  colorMode = $select.value;
  objects = [];
  const colorspace = scene.getObjectByName('colorspace');
  scene.remove(colorspace);
  const colors = scene.getObjectByName('colors');
  scene.remove(colors);
  addParticles(colorList, colorMode);
  addCube(isDark ? cLight : cDark);
}, false);

function translate(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

function yuv(rgb) {
  return [
    /*Y*/ rgb[0] * .299000 + rgb[1] * .587000 + rgb[2] * .114000,
    /*U*/ rgb[0] * -.168736 + rgb[1] * -.331264 + rgb[2] * .500000 + 128,
    /*V*/ rgb[0] * .500000 + rgb[1] * -.418688 + rgb[2] * -.081312 + 128
  ]
}

let rayCaster = new THREE.Raycaster();

document.querySelector('.col-3d').addEventListener('mousemove', onDocumentMouseMove);

const $currentColor = document.querySelector('.currentColor');

let currentColorTimer;

function showColor(name, hex) {
  clearTimeout(currentColorTimer);
  $currentColor.innerHTML = `<div><h2>${name}</h2><span>${hex}</span></div>`
  $currentColor.style = `--color: ${hex}`;
  currentColorTimer = setTimeout(() => {
    $currentColor.innerHTML = '';
  }, 3000);
}

// Highlight a color name using a raycaster at some point
function onDocumentMouseMove(event) {
  let mousePosition = {};
  event.preventDefault();
  mousePosition.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mousePosition.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  rayCaster.setFromCamera(mousePosition, cam);
  var intersects = rayCaster.intersectObjects([scene.getObjectByName('colors')], false);
  if (intersects.length > 0) {
    var descriptions = [];
    for (var i = 0; i < intersects.length; i++) {
      //Only display those points we can SEE due to the near clipping plane.
      //Without this check, the ray caster will list them all, even if they're clipped by the near plane.
      //".distance" is relative to the camera, not absolute world units.
      if (intersects[i].distance > cam.near) {
        var description = "  " + colorList[intersects[i].index].name + ", ";
        description += "  " + colorList[intersects[i].index].hex + ", ";
        description += "  Distance: " + intersects[i].distance.toFixed(2) + ", ";
        description += "  Ray to point dist: " + intersects[i].distanceToRay.toFixed(2) + ", ";
        description += "  Index: " + intersects[i].index + ", ";
        description += "  Coords: [" + intersects[i].point.x.toFixed(2) + ", " + intersects[i].point.y.toFixed(2) + ", " + intersects[i].point.z.toFixed(2) + "]";
        descriptions.push(description);

        showColor(colorList[intersects[i].index].name, colorList[intersects[i].index].hex);
        break;
      }

      if (descriptions.length > 0) {
        console.log("Mouse pointer intersected the following points, closest to furthest: ");
        for (var v = 0; v < descriptions.length; v++)
          console.log(descriptions[v]);
      }
    }
  }
}

