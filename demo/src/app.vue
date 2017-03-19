<template>
  <div>
  <ul class="navi">
        <li><router-link to="/a">路径一1</router-link></li>
        <li><router-link to="/home">路径一</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
