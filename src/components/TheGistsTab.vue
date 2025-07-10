<script setup>
import GistCardList from '@/components/GistCardList.vue'
import { gists } from '@/github'

import ErrorMessage from '@/components/ErrorMessage.vue'
</script>

<template>
  <h2 v-if="gists.length != 0" class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">
    User gists
  </h2>
  <GistCardList :gists="gists" />
  <ErrorMessage v-if="gists.length === 0" message="No gists found" class="py-10" />
</template>
