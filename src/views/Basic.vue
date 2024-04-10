<template>
  <div id="basic"></div>
</template>

<script setup>
import * as THREE from 'three';
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

// 动画渲染
function animate() {
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

// 在mounted生命周期中挂载渲染器元素，确保此时容器元素已经存在
onMounted(() => {
  const basicBox = document.getElementById('basic');
  basicBox.appendChild( renderer.domElement );
  animate()
})

</script>

<style lang='scss' scoped>
#basic {
  width: 100vw;
  height: 100vh;
}
</style>
