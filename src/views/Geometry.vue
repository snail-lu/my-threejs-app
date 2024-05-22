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
  camera.position.x = 0;
  camera.position.y = 0;
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

// 利用BufferGeometry创建一个三角形平面
let trianglePlane;
function initTrianglePlane() {
  const geometry = new THREE.BufferGeometry();
  // 创建顶点数据
  // 此顺序顶点构建成的面，朝向相机的为反面，所以无法看到，调转轨道可以看到
  // const vertices = new Float32Array([
  //   -1.0, 1.0, 2.0, -1.0, 2.0, 2.0, 2.0, 1.0, 2.0
  // ])
  // 此顺序顶点构建成的面，朝向相机的为正面
  const vertices = new Float32Array([
    -2.0, 0, 0, 0, 0, 0, -2.0, 2.0, 0
  ])
  // 创建顶点属性, 3个数据为一个顶点
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // 创建材质
  // 面有正反之分，由顶点逆时针组成的面为正面，顺时针组成的面为反面，默认材质只作用到正面，设置side: THREE.DoubleSide可以将材质应用到两面
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    // wireframe: true
    // side: THREE.DoubleSide
  });
  trianglePlane = new THREE.Mesh(geometry, material);
  scene.add(trianglePlane);
}

// 利用BufferGeometry创建一个正方形平面
let squarePlane1;
function initSquarePlane1() {
  const geometry = new THREE.BufferGeometry();
  // 创建顶点数据，共6个顶点，每三个顶点组成一个三角形，两个三角形拼凑成一个正方形
  const vertices = new Float32Array([
    0, 0, 0, 2.0, 0, 0,  2.0, 2.0, 0, 

    2.0, 2.0, 0, 0, 2.0, 0, 0, 0, 0
  ])
  // 创建顶点属性, 3个数据为一个顶点
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // 创建材质
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x0000ff,
    // wireframe: true
    // side: THREE.DoubleSide
  });
  squarePlane1 = new THREE.Mesh(geometry, material);
  scene.add(squarePlane1);
}

// 利用BufferGeometry及索引创建一个正方形平面
let squarePlane2;
function initSquarePlane2() {
  const geometry = new THREE.BufferGeometry();
  // 创建顶点数据，共4个顶点
  const vertices = new Float32Array([
    3.0, 0, 0, 5.0, 0, 0,  5.0, 2.0, 0,  3.0, 2.0, 0
  ])
  // 创建顶点属性, 3个数据为一个顶点
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  // 创建索引，从而达到公用顶点的作用，索引0、1、2对应的顶点构成一个面，索引2、3、0构成一个面
  // 0对应点(0, 0, 0), 1对应点(2.0, 0, 0), 2对应点(2.0, 2.0, 0), 3对应点(0, 2.0, 0)
  const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

  // 设置索引
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  // 创建材质
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    // wireframe: true
    // side: THREE.DoubleSide
  });
  squarePlane2 = new THREE.Mesh(geometry, material);
  scene.add(squarePlane2);
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
  controls.autoRotate = false; // 自动旋转
  controls.autoRotateSpeed = 10; // 旋转速度
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.1; // 阻尼值
  controls.enableZoom = true; // 是否启用缩放效果
}

// 坐标轴
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
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
  initTrianglePlane();
  initSquarePlane1();
  initSquarePlane2();
  renderer.clear();
  renderer.render(scene, camera);
  initOrbitControls();
  initAxesHelper();
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
