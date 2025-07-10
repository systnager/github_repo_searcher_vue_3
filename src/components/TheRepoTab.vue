<script setup>
import { watch, ref, onMounted } from 'vue'
import { filtered_repos, sortByName, sortByStars, repos } from '@/github'
import RepoCardList from '@/components/RepoCardList.vue'
import {
  REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY,
  FILTERED_REPOS_LOCAL_STORAGE_KEY,
} from '@/keys'

import ErrorMessage from '@/components/ErrorMessage.vue'

const repoName = ref('')
const sortBySelect = ref('')

function filterSelected(value) {
  if (value == 'by_name') {
    sortByName()
  } else if (value == 'by_stars') {
    sortByStars()
  }
}

watch(repoName, () => {
  filtered_repos.value = repos.value.filter((repo) => repo.name.includes(repoName.value))
  sortBySelect.value = ''
  localStorage.setItem(REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY, repoName.value)
  localStorage.setItem(FILTERED_REPOS_LOCAL_STORAGE_KEY, JSON.stringify(filtered_repos.value))
})

onMounted(() => {
  repoName.value = localStorage.getItem(REPO_NAME_REPO_TAB_SEARCH_LOCAL_STORAGE_KEY) || ''
})
</script>

<template>
  <div class="mt-5">
    <div v-if="repos.length != 0" class="flex flex-between gap-4">
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
        v-model="repoName"
        placeholder="Filter query"
      />
    </div>
    <ErrorMessage v-if="filtered_repos.length === 0" message="No repos found" class="py-10" />
    <RepoCardList class="mt-10" :repos="filtered_repos" />
  </div>
</template>
