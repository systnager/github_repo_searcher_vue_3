<script setup>
import { following } from '@/github'
import FollowerCardList from '@/components/FollowerCardList.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
</script>

<template>
  <div>
    <h2 v-if="following.length != 0" class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">
      User following
    </h2>
    <FollowerCardList :followers="following" />
    <ErrorMessage v-if="following.length === 0" message="No following found" class="py-10" />
  </div>
</template>
