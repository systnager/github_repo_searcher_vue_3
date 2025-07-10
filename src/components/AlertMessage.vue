<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['fetchData, closeAlertMessage'])
</script>

<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen bg-black z-10 opacity-15 flex justify-center items-center"
  ></div>
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-4/5 bg-white rounded rounded-lg p-10 shadow-2xl opacity-100 flex flex-col items-center"
  >
    <img
      class="absolute top-0 right-0 w-10 h-10 cursor-pointer hover:scale-110 transition ease-in duration-100 active:scale-90"
      src="/close.svg"
      alt="close alert message"
      @click="emit('closeAlertMessage')"
    />
    <h2 class="text-center text-gray-800 mt-5 font-bold text-xl mb-10">
      {{ title }}
    </h2>
    <p class="text-center text-gray-800 italic text-xl mb-10">
      {{ message }}
    </p>
    <button
      class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white transition ease-in duration-100 font-bold py-2 px-4 rounded active:bg-blue-800"
      @click="emit('fetchData')"
    >
      Fetch data
    </button>
  </div>
</template>
