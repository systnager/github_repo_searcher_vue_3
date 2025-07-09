<script setup>
import FollowerCard from '@/components/FollowerCard.vue'

defineProps({
  followers: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <FollowerCard
      class="mt-3"
      v-for="follower in followers"
      :key="follower.login"
      :avatar-url="follower.avatar_url"
      :username="follower.login"
      :profile-url="follower.html_url"
    />
  </div>
</template>
