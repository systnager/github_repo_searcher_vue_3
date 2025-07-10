<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">
    <p>{{ message }}</p>
  </div>
</template>
