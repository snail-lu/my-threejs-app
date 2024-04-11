<template>
  <div class="light-example">
    光源类型
    <div id="canvas-frame"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
// three中已经包含Stats.js---帧数检测工具
import Stats from 'three/examples/jsm/libs/stats.module.js';
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

// 光线
let light;
function initLight() {
  // 第二个参数是光源强度
  light = new THREE.DirectionalLight(0xFF0000, 1);
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  light.position.set(0, 0, 1);
  scene.add(light);
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


/**
 * Stats使用步骤
 * 1. 实例化 Stats
 * 2. 设置初始面板 stats.setMode(0) 。传入面板id（0: fps, 1: ms, 2: mb）
 * 3. 设置监视器的位置
 * 4. 将监视器添加到页面中
 * 5. 更新帧数
 */
let stats;
function initStats() {
  // 1. 实例化 Stats
  stats = new Stats()

  // 2. 设置初始面板 stats.setMode(0) 。传入面板id（0: fps, 1: ms, 2: mb）
  stats.setMode(0)

  // 3. 设置监视器的位置
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'

  // 4. 将监视器添加到页面中
  let canvasFrame = document.getElementById('canvas-frame')
  canvasFrame.appendChild(stats.domElement)
}

// 坐标轴
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );
}


// 动画渲染
function animate() {
  // 5. 更新帧数
  stats.update()
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

function threeStart() {
  initScene();
  initThree();
  initCamera();
  initLight();
  initObject();
  initStats();
  initAxesHelper();
  renderer.clear();
  renderer.render(scene, camera);
  animate()
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
  width: 80vw;
  height: 100vh;
  position: relative;
  background-color: #EEEEEE;
}
</style>
