<script setup>
import { ref, provide } from 'vue'
import { fetchRepos } from '@/github'
import { ERROR_MESSAGE_KEY } from '@/keys'

import TheLoader from '@/components/TheLoader.vue'
import TheRepoTab from '@/components/TheRepoTab.vue'

const minDelay = 250

const username = ref('')
const error_message = ref('')
const isLoading = ref(false)

function searchButtonClicked() {
  if (username.value.length == 0) {
    showError('Please enter username')
    return
  }
  showLoader()
  fetchRepos(username.value)
  hideLoader()
}

function showError(error) {
  error_message.value = error
}

function hideError() {
  error_message.value = ''
}

function showLoader() {
  isLoading.value = true
}

async function hideLoader() {
  await new Promise((resolve) => setTimeout(resolve, minDelay))
  isLoading.value = false
}

provide(ERROR_MESSAGE_KEY, { showError, hideError })
</script>

<template>
  <TheLoader v-if="isLoading" />
  <div class="mx-auto w-4/5 border border-gray-100 mt-15 bg-white rounded rounded-lg p-10">
    <h1 class="text-3xl font-bold text-center text-gray-800">Github repo searcher</h1>
    <div class="flex flex-between mt-5 gap-4">
      <input
        class="w-full border border-gray-300 rounded rounded-md p-1 px-3 bg-gray-100"
        type="text"
        v-model="username"
        placeholder="Username"
      />
      <button
        class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white transition ease-in duration-200 font-bold py-2 px-4 rounded"
        @click="searchButtonClicked"
      >
        Search
      </button>
    </div>
    <div>
      <TheRepoTab />
    </div>
    <div>
      <h2 class="text-center text-gray-800">
        {{ error_message }}
      </h2>
    </div>
  </div>
</template>
