<script setup>
import { followers } from '@/github'
import FollowerCardList from '@/components/FollowerCardList.vue'
</script>

<template>
  <div>
    <h2 class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">User followers</h2>
    <FollowerCardList :followers="followers" />
  </div>
</template>
