<script setup>
import RepoCard from '@/components/RepoCard.vue'

defineProps({
  repos: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <RepoCard
      class="mt-3"
      v-for="repo in repos"
      :key="repo.id"
      :name="repo.name"
      :rate="repo.stargazers_count"
      :description="repo.description"
      :url="repo.html_url"
    />
  </div>
</template>
