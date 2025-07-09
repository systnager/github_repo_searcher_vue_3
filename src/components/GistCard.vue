<script setup>
import { normalizeDateTime } from '@/functions'
defineProps({
  description: {
    type: [String, null],
    required: true,
  },
  gistUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="bg-gray-300 p-3 px-5 rounded rounded-lg cursor-pointer hover:bg-gray-400 active:bg-gray-500 transition ease-in duration-100"
  >
    <a class="flex flex-col gap-5" :href="gistUrl">
      <div class="flex flex-col">
        <span class="font-bold truncate">Gist id: {{ id }}</span>
        <span class="truncate">Created at: {{ normalizeDateTime(createdAt) }}</span>
        <span class="truncate">Modified at: {{ normalizeDateTime(modifiedAt) }}</span>
      </div>
      <span class="italic text-gray-600">{{ description }}</span>
    </a>
  </div>
</template>
