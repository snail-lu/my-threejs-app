<template>
  <div class="texture-example">
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
  scene.background = new THREE.Color('#fff')
}

// 相机
let camera;
function initCamera() {
  let canvasFrame = document.getElementById('canvas-frame')
  let width = canvasFrame.clientWidth;
  let height = canvasFrame.clientHeight;

  camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );

  // 相机位置
  camera.position.z = 5;
}

// 渲染器
let renderer;
function initRender() {
  let canvasFrame = document.getElementById('canvas-frame')
  let width = canvasFrame.clientWidth;
  let height = canvasFrame.clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  });
  renderer.setSize( width, height );
  canvasFrame.appendChild( renderer.domElement );
}

// 物体
let cube;
function initObject() {
  // 创建立方体并添加到场景中
  const geometry = new THREE.BoxGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
}

// 轨道控制器
let controls;
function initOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
  controls.enableRotate = true; // 启用旋转, 跟自动旋转不冲突，这里是对用户操作旋转的启用和禁用
  controls.autoRotate = true; // 自动旋转
  controls.autoRotateSpeed = 10; // 旋转速度
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.1; // 阻尼值
  controls.enableZoom = false; // 是否启用缩放效果
}

// 动画渲染
function animate() {
  controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function start() {
  initScene();
  initRender();
  initCamera();
  initObject();
  renderer.clear();
  renderer.render(scene, camera);
  initOrbitControls();
  animate();
}

onMounted(() => {
  start()
})
</script>

<style lang='scss' scoped>
.texture-example {
  display: flex;
  justify-content: center;
}
#canvas-frame {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #EEEEEE;
}
</style>
