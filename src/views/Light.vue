<template>
  <div class="light-example">
    <div id="canvas-frame"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue';

// 场景
let scene; 
function initScene() {
  scene = new THREE.Scene();
}

// 相机
let camera;
function initCamera() {
  let canvasFrame = document.getElementById('canvas-frame')
  let width = canvasFrame.clientWidth;
  let height = canvasFrame.clientHeight;

  camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );

  // 相机位置
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;

  // camera.up 为相机头顶的朝向，设置y=1，即相机头顶朝向y轴正方向
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;

  // 相机目标观察点，与位置的连线即为观察方向，观察方向不可与相机头顶朝向平行，否则可能拍不到观察点的内容
  // ps: 观察方向与相机头顶方向平行，意味着相机镜头没有朝向目标观察点，而是相机顶部朝向观察点，所以是看不到想要看的场景的
  camera.lookAt(0, 0, 0);
}

// 渲染器
let renderer;
function initThree() {
  let canvasFrame = document.getElementById('canvas-frame')
  let width = canvasFrame.clientWidth;
  let height = canvasFrame.clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  });
  renderer.setSize( width, height );
  canvasFrame.appendChild( renderer.domElement );
}

// 平行光源
let light;
function initDirectionalLight() {
  // 平行光源,光线照射不到的地方会显示黑色
  light = new THREE.DirectionalLight(0xFF0000, 1);
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  light.position.set(0, 0, 1);
  scene.add(light);
}

// 环境光源
let ambientLight;
function initAmbientLight() {
  // 无需设置位置
  ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);
}

// 点光源
let pointLight;
function initPointLight() {
  pointLight = new THREE.PointLight(0xfffff);
  pointLight.position.set(0, 1, 0); //点光源位置
  scene.add(pointLight);
}

// 物体
let cube;
function initObject() {
  // 创建立方体并添加到场景中
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(0, 0, 0);
  scene.add( cube );
}

// 轨道控制器
let controls;
function initOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.1; // 阻尼值
}

// 动画渲染
function animate() {
  controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function threeStart() {
  initScene();
  initThree();
  initCamera();

  // 光源设置，光线效果会互相叠加
  initAmbientLight();
  initDirectionalLight();
  initPointLight();

  initObject();
  renderer.clear();
  renderer.render(scene, camera);
  initOrbitControls();
  animate();
}

onMounted(() => {
  threeStart()
})
</script>

<style lang='scss' scoped>
.light-example {
  display: flex;
}
#canvas-frame {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #EEEEEE;
}
</style>
