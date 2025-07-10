<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllDataByUsername } from '@/github'
import {
  LAST_FETCH_DATE_TIME_LOCAL_STORAGE_KEY,
  USERNAME_FOR_FETCH_LOCAL_STORAGE_KEY,
} from '@/keys'
import { formatUnixTimestamp } from '@/functions'
import { REPOSITORIES_TAB_NAME, TAB_LIST } from '@/constants'

import TheLoader from '@/components/TheLoader.vue'
import TheTabNavigation from '@/components/TheTabNavigation.vue'
import AlertMessage from '@/components/AlertMessage.vue'

const minDelay = 250

const lastFetchDateTime = localStorage.getItem(LAST_FETCH_DATE_TIME_LOCAL_STORAGE_KEY)
const username = ref(localStorage.getItem(USERNAME_FOR_FETCH_LOCAL_STORAGE_KEY) || '')
const isLoading = ref(false)
const tabNavigationRef = ref()
const isShowAlert = ref(false)
const isShowError = ref(false)

function searchButtonClicked() {
  if (username.value.length == 0) {
    showHideError()
    return
  }
  showLoader()
  localStorage.setItem(USERNAME_FOR_FETCH_LOCAL_STORAGE_KEY, username.value)
  fetchAllDataByUsername(username.value)
  hideLoader()
  if (!TAB_LIST.includes(tabNavigationRef.value.tab)) {
    tabNavigationRef.value.setTab(REPOSITORIES_TAB_NAME)
  }
}

function showLoader() {
  isLoading.value = true
}

async function hideLoader() {
  await new Promise((resolve) => setTimeout(resolve, minDelay))
  isLoading.value = false
}

function showHideAlert() {
  isShowAlert.value = !isShowAlert.value
}

function showHideError() {
  isShowError.value = !isShowError.value
}

onMounted(() => {
  if (lastFetchDateTime) {
    showHideAlert()
  }
})
</script>

<template>
  <TheLoader v-if="isLoading" />
  <AlertMessage
    v-if="isShowAlert"
    :message="`Data loaded successfully from local storage but the data might be out of date. Time last fetched: ${formatUnixTimestamp(lastFetchDateTime)}. Close this message for ignore or click the button to fetch data again.`"
    title="Load data successfully"
    @close-alert-message="showHideAlert"
    @fetch-data="
      () => {
        showHideAlert()
        searchButtonClicked()
      }
    "
  />
  <div
    class="mx-auto w-4/5 border border-gray-100 mt-15 bg-white rounded rounded-lg p-10 shadow-md"
  >
    <h1 class="text-3xl font-bold text-center text-gray-800">Github repo searcher</h1>
    <div class="flex flex-between mt-5 gap-4">
      <input
        class="w-full border border-gray-300 rounded rounded-md p-1 px-3 bg-gray-100"
        type="text"
        v-model="username"
        placeholder="Username"
        @keyup.enter="searchButtonClicked"
      />
      <button
        class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white transition ease-in duration-100 font-bold py-2 px-4 rounded active:bg-blue-800 rounded"
        @click="searchButtonClicked"
      >
        Search
      </button>
    </div>
    <TheTabNavigation ref="tabNavigationRef" />
    <div>
      <AlertMessage
        v-if="isShowError"
        :message="`Please, enter username`"
        title="Invalid data"
        :isShowActionButton="false"
        @close-alert-message="showHideError"
      />
    </div>
  </div>
</template>
