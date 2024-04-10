<template>
  <div id="basic"></div>
</template>

<script setup>
import * as THREE from 'three';
// three中已经包含Stats.js---帧数检测工具
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { onMounted } from 'vue';

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


// 创建立方体并添加到场景中
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// 相机位置和添加的几何体位置，默认都是（0, 0, 0)，这里调整一下相机位置，从而可以看到几何体
camera.position.z = 5;

/**
 * Stats使用步骤
 * 1. 实例化 Stats
 * 2. 设置初始面板 stats.setMode(0) 。传入面板id（0: fps, 1: ms, 2: mb）
 * 3. 设置监视器的位置
 * 4. 将监视器添加到页面中
 * 5. 更新帧数
 */
// 1. 实例化 Stats
let stats = new Stats()

// 2. 设置初始面板 stats.setMode(0) 。传入面板id（0: fps, 1: ms, 2: mb）
stats.setMode(0)

// 3. 设置监视器的位置
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'


// 动画渲染
function animate() {
  // 5. 更新帧数
  stats.update()
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

// 在mounted生命周期中挂载渲染器元素，确保此时容器元素已经存在
onMounted(() => {
  const basicBox = document.getElementById('basic');
  basicBox.appendChild( renderer.domElement );

  // 4. 将监视器添加到页面中
  basicBox.appendChild(stats.domElement)
  animate()
})
</script>

<style lang='scss' scoped>
#basic {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
