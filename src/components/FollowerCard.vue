<script setup>
defineProps({
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="bg-gray-300 p-3 px-5 rounded rounded-lg cursor-pointer hover:bg-gray-400 active:bg-gray-500 transition ease-in duration-100"
  >
    <a :href="profileUrl" class="flex justify-between"
      ><img class="w-12 h-12 rounded-2xl" :src="avatarUrl" :alt="username" />
      <span class="font-bold text-center text-gray-800 flex-1 my-auto">{{ username }}</span></a
    >
  </div>
</template>
