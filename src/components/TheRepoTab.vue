<script setup>
import { watch, ref, inject } from 'vue'
import { filtered_repos, sortByName, sortByStars, repos } from '@/github'
import RepoCardList from '@/components/RepoCardList.vue'
import {
  ERROR_MESSAGE_KEY,
  REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY,
  FILTERED_REPOS_LOCAL_STORAGE_KEY,
} from '@/keys'

const repo_name = ref(localStorage.getItem(REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY) || '')
const sortBySelect = ref('')
const { showError, hideError } = inject(ERROR_MESSAGE_KEY)

function filterSelected(value) {
  if (value == 'by_name') {
    sortByName()
  } else if (value == 'by_stars') {
    sortByStars()
  }
}

watch(repo_name, () => {
  filtered_repos.value = repos.value.filter((repo) => repo.name.includes(repo_name.value))
  sortBySelect.value = null
  localStorage.setItem(REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY, repo_name.value)
  localStorage.setItem(FILTERED_REPOS_LOCAL_STORAGE_KEY, JSON.stringify(filtered_repos.value))
})

watch(filtered_repos, () => {
  if (filtered_repos.value.length == 0) {
    showError('No repos found')
  } else {
    hideError()
  }
})
</script>

<template>
  <div v-if="repos.length != 0" class="mt-5">
    <div class="flex flex-between gap-4">
      <select
        @change="filterSelected($event.target.value)"
        class="bg-gray-100 p-2 px-3 rounded rounded-md border border-gray-300"
        v-model="sortBySelect"
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
    <RepoCardList class="mt-10" :repos="filtered_repos" />
  </div>
</template>
