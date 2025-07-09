import axios from 'axios'
import { ref } from 'vue'

const BASE_URL = 'https://api.github.com'

export const repos = ref([])
export const filtered_repos = ref([])
export const followers = ref([])

export async function getRepos(query) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${query}/repos`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getFollowers(username) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${username}/followers`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchAllDataByUsername(username) {
  await fetchRepos(username)
  await fetchFollowers(username)
}

export async function fetchRepos(username) {
  repos.value = await getRepos(username)
  filtered_repos.value = repos.value
}

export async function fetchFollowers(username) {
  followers.value = await getFollowers(username)
}

export function sortByName() {
  filtered_repos.value.sort((a, b) => a.name.localeCompare(b.name))
}

export function sortByStars() {
  filtered_repos.value.sort((a, b) => b.stargazers_count - a.stargazers_count)
}
