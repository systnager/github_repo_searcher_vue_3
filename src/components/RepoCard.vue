<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  description: {
    type: [String, null],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="border border-gray-200 rounded rounded-lg px-5 py-3 bg-blue-100">
    <div class="flex justify-between">
      <a
        :href="url"
        class="truncate flex-1 text-left overflow-hidden font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition ease-in duration-200"
        >{{ name }}</a
      >
      <span class="ml-5">⭐️ {{ rate }}</span>
    </div>

    <span class="text-sm italic text-gray-600">{{ description }}</span>
  </div>
</template>
