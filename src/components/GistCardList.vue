<script setup>
import GistCard from '@/components/GistCard.vue'

import { gists } from '@/github'
</script>

<template>
  <div>
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
