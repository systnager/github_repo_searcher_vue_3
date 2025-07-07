<script setup>
import { ref } from 'vue'
import { getRepos } from '@/github'

import RepoCardList from '@/components/RepoCardList.vue'

const repos = ref([])
const username = ref('')

async function fetchRepos() {
  repos.value = await getRepos(username.value)
  console.log(repos.value, username.value)
}
</script>

<template>
  <div class="mx-auto w-4/5 border border-gray-100 m-5 bg-white rounded rounded-lg p-10">
    <h1 class="text-3xl font-bold text-center text-gray-800">Github repo searcher</h1>
    <div class="flex flex-between mt-5 gap-4 mx-5">
      <input
        class="w-full border border-gray-300 rounded rounded-md p-1 px-3"
        type="text"
        v-model="username"
        placeholder="Repo name"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white transition ease-in duration-200 font-bold py-2 px-4 rounded"
        @click="fetchRepos"
      >
        Search
      </button>
    </div>
    <!-- Filter block-->
    <div></div>
    <!-- Repo list-->
    <RepoCardList class="mt-5" :repos="repos" />
  </div>
</template>
