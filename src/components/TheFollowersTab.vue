<script setup>
import { followers } from '@/github'
import FollowersList from '@/components/FollowersList.vue'
</script>

<template>
  <div>
    <h2 class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">User followers</h2>
    <FollowersList :followers="followers" />
  </div>
</template>
