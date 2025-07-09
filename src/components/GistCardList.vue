<script setup>
import GistCard from '@/components/GistCard.vue'

import { gists } from '@/github'
</script>

<template>
  <div>
    <h2 class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">User gists</h2>
    <GistCard
      class="mt-3"
      v-for="gist in gists"
      :key="gist.id"
      :description="gist.description"
      :gist-url="gist.html_url"
      :created-at="gist.created_at"
      :modified-at="gist.updated_at"
      :id="gist.id"
    />
  </div>
</template>
