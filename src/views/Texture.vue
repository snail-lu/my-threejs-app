<template>
  <div class="texture-example">
    <div id="canvas-frame"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
// three中已经包含Stats.js---帧数检测工具
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue';
import computerTexture from '../assets/computer.jpg';

// 场景
let scene; 
function initScene() {
  scene = new THREE.Scene();
  // 添加背景颜色
  scene.background = new THREE.Color(0x666666);
}

// 相机
let camera;
function initCamera() {
  let canvasFrame = document.getElementById('canvas-frame')
  let width = canvasFrame.clientWidth;
  let height = canvasFrame.clientHeight;

  camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );

  // 相机位置
  // camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 3;

  // camera.up 为相机头顶的朝向，设置y=1，即相机头顶朝向y轴正方向
  // camera.up.x = 0;
  // camera.up.y = 1;
  // camera.up.z = 0;

  // 相机目标观察点，与位置的连线即为观察方向，观察方向不可与相机头顶朝向平行，否则可能拍不到观察点的内容
  // ps: 观察方向与相机头顶方向平行，意味着相机镜头没有朝向目标观察点，而是相机顶部朝向观察点，所以是看不到想要看的场景的
  // camera.lookAt(0, 0, 0);
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
  const geometry = new THREE.PlaneGeometry(1, 1);

  // const uv = new Float32Array([
  //   0, 0,
  //   1, 0,
  //   1, 1,
  //   0, 1
  // ])
  // console.log(geometry.attributes, 'attributes')
  // geometry.attributes.uv = new THREE.BufferAttribute(uv, 2); //2个为一组,表示一个顶点的纹理坐标
  const loader = new THREE.TextureLoader();
  const texture = loader.load(computerTexture);
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });
  cube = new THREE.Mesh( geometry, material );
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
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
}

// 轨道控制器
let controls;
function initOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
}

// 动画渲染
function animate() {
  controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function threeStart() {
  initScene();
  initRender();
  initCamera();
  initObject();
  initStats();
  initAxesHelper();
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
