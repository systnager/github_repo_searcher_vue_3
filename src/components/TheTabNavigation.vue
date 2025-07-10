<script setup>
import { ref, readonly } from 'vue'

import {
  REPOSITORIES_TAB_NAME,
  FOLLOWERS_TAB_NAME,
  FOLLOWING_TAB_NAME,
  GISTS_TAB_NAME,
  TAB_LIST,
} from '@/constants'

import { CURRENT_TAB_LOCAL_STORAGE_KEY } from '@/keys'

const currentTab = ref(localStorage.getItem(CURRENT_TAB_LOCAL_STORAGE_KEY) || null)

import TheRepoTab from '@/components/TheRepoTab.vue'
import TheFollowingTab from '@/components/TheFollowingTab.vue'
import TheFollowersTab from '@/components/TheFollowersTab.vue'
import TheGistsTab from '@/components/TheGistsTab.vue'

function setTab(tabName) {
  if (TAB_LIST.includes(tabName)) {
    currentTab.value = tabName
  }
}

defineExpose({
  setTab,
  tab: readonly(currentTab),
})
</script>

<template>
  <div class="mt-5 bg-gray-100 px-5 py-5 rounded rounded-lg flex flex-col gap-2">
    <div class="flex flex-wrap gap-2">
      <button
        class="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white transition ease-in duration-100 font-bold py-2 active:bg-gray-800 flex-1 rounded p-5"
        @click="setTab(REPOSITORIES_TAB_NAME)"
      >
        Repositories
      </button>
      <button
        class="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white transition ease-in duration-100 font-bold py-2 active:bg-gray-800 flex-1 rounded p-5"
        @click="setTab(FOLLOWERS_TAB_NAME)"
      >
        Followers
      </button>
      <button
        class="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white transition ease-in duration-100 font-bold py-2 active:bg-gray-800 flex-1 rounded p-5"
        @click="setTab(FOLLOWING_TAB_NAME)"
      >
        Following
      </button>
      <button
        class="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white transition ease-in duration-100 font-bold py-2 active:bg-gray-800 flex-1 rounded p-5"
        @click="setTab(GISTS_TAB_NAME)"
      >
        Gists
      </button>
    </div>
    <div>
      <TheRepoTab v-if="currentTab == REPOSITORIES_TAB_NAME" />
      <TheFollowingTab v-if="currentTab == FOLLOWING_TAB_NAME" />
      <TheFollowersTab v-if="currentTab == FOLLOWERS_TAB_NAME" />
      <TheGistsTab v-if="currentTab == GISTS_TAB_NAME" />
    </div>
  </div>
</template>
