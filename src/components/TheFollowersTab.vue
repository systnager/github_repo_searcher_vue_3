<script setup>
import { followers } from '@/github'
import FollowerCardList from '@/components/FollowerCardList.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
</script>

<template>
  <div>
    <h2 v-if="followers.length != 0" class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">
      User followers
    </h2>
    <FollowerCardList :followers="followers" />
    <ErrorMessage v-if="followers.length === 0" message="No followers found" class="py-10" />
  </div>
</template>
