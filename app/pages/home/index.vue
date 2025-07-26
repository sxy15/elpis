<template>
    <div class="home">home</div>
    <input type="text" v-model="name">
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
</script>

<style lang="scss" scoped>
.home {
    color: green;
}
</style>