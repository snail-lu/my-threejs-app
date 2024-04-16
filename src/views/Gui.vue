<template>
  <div id="canvas-frame"></div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
// three中已经包含Stats.js---帧数检测工具
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { onMounted } from 'vue';

let canvasFrame;
// 场景
let scene; 
function initScene() {
  scene = new THREE.Scene();
}

// 相机
let camera;
function initCamera() {
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
  canvasFrame = document.getElementById('canvas-frame')
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
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
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
  canvasFrame.appendChild(stats.domElement)
}

// 坐标轴
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );
}

// 轨道控制器
let controls;
function initOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update()
}


// 动画渲染
function animate() {
  // 5. 更新帧数
  stats.update();
  controls.update();
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

// lil-gui使用
let eventObj = {
  FullScreen: function () {
    document.body.requestFullscreen()
  },
  ExitFullScreen: function () {
    document.exitFullscreen()
  }
}

function initGUI() {
  const gui = new GUI()
  // 全屏控制
  let fullScreenFolder = gui.addFolder('显示控制')
  fullScreenFolder.add(eventObj, 'FullScreen').name('全屏')
  fullScreenFolder.add(eventObj, 'ExitFullScreen').name('退出全屏')

  // 立方体位置控制
  const folder = gui.addFolder('位置控制')
  folder.add(cube.position, 'x').min(-5).max(5).step(1).name('x轴')
  folder.add(cube.position, 'y').min(-5).max(5).step(1).name('y轴')
  folder.add(cube.position, 'z').min(-5).max(5).step(1).name('z轴')

  // 样式控制
  const styleFolder = gui.addFolder('样式控制')
  styleFolder.add(cube.material, 'wireframe').name('线框模式')
  const colorParams = {
    cubeColor: 0xff0000
  }
  styleFolder.addColor(colorParams, 'cubeColor').name('颜色设置').onFinishChange(value => {
    cube.material.color.set(value)
  })
}

// 窗口变化
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixexRatio(window.devicePixelRatio);
}

function threeStart() {
  initScene();
  initThree();
  initCamera();
  initObject();
  initStats();
  initAxesHelper();
  initOrbitControls();
  renderer.clear();
  renderer.render(scene, camera);
  animate()
  initGUI()
}

onMounted(() => {
  threeStart()

  window.onResize = onWindowResize;
})
</script>

<style lang='scss' scoped>
#canvas-frame {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #EEEEEE;
  overflow: hidden;
}
</style>
