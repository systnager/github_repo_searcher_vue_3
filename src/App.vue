<script setup>
import { ref, watch } from 'vue'
import { getRepos } from '@/github'

import RepoCardList from '@/components/RepoCardList.vue'

const repos = ref([])
const filtered_repos = ref([])
const username = ref('')
const repo_name = ref('')
const error_message = ref('No any repositories found')

async function fetchRepos() {
  repos.value = await getRepos(username.value)
  filtered_repos.value = repos.value
}

function searchButtonClicked() {
  if (username.value.length == 0) {
    error_message.value = 'Please enter username'
  }
  fetchRepos()
}

function filterSelected(value) {
  if (value == 'by_name') {
    sortByName()
  } else if (value == 'by_stars') {
    sortByStars()
  }
}

function sortByName() {
  filtered_repos.value.sort((a, b) => a.name.localeCompare(b.name))
}

function sortByStars() {
  filtered_repos.value.sort((a, b) => b.stargazers_count - a.stargazers_count)
}

watch(repo_name, () => {
  filtered_repos.value = repos.value.filter((repo) => repo.name.includes(repo_name.value))
})

watch(filtered_repos, () => {
  if (filtered_repos.value.length == 0) {
    error_message.value = 'No any repositories found'
  } else {
    error_message.value = ''
  }
})
</script>

<template>
  <div class="mx-auto w-4/5 border border-gray-100 mt-15 bg-white rounded rounded-lg p-10">
    <h1 class="text-3xl font-bold text-center text-gray-800">Github repo searcher</h1>
    <div class="flex flex-between mt-5 gap-4 mx-5">
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
    <div class="flex flex-between mt-5 gap-4 mx-5">
      <select
        @click="filterSelected($event.target.value)"
        class="bg-gray-100 p-2 px-3 rounded rounded-md border border-gray-300"
      >
        <option value="" disabled selected>Sort by</option>
        <option value="by_name">By name</option>
        <option value="by_stars">By stars</option>
      </select>
      <input
        class="w-full border border-gray-300 rounded rounded-md p-1 px-3 bg-gray-100"
        type="text"
        v-model="repo_name"
        placeholder="Filter query"
      />
    </div>
    <RepoCardList class="mt-5" :repos="filtered_repos" />
    <div>
      <h2 class="text-center text-gray-800">
        {{ error_message }}
      </h2>
    </div>
  </div>
</template>
