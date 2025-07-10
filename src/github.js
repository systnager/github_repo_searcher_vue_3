import axios from 'axios'
import { ref } from 'vue'
import {
  REPOS_LOCAL_STORAGE_KEY,
  FOLLOWERS_LOCAL_STORAGE_KEY,
  FOLLOWING_LOCAL_STORAGE_KEY,
  GISTS_LOCAL_STORAGE_KEY,
  FILTERED_REPOS_LOCAL_STORAGE_KEY,
  LAST_FETCH_DATE_TIME_LOCAL_STORAGE_KEY,
} from '@/keys'

const BASE_URL = 'https://api.github.com'

export const repos = ref(
  localStorage.getItem(REPOS_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(REPOS_LOCAL_STORAGE_KEY))
    : [],
)
export const filtered_repos = ref(
  localStorage.getItem(FILTERED_REPOS_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(FILTERED_REPOS_LOCAL_STORAGE_KEY))
    : [],
)
export const followers = ref(
  localStorage.getItem(FOLLOWERS_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(FOLLOWERS_LOCAL_STORAGE_KEY))
    : [],
)
export const following = ref(
  localStorage.getItem(FOLLOWING_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(FOLLOWING_LOCAL_STORAGE_KEY))
    : [],
)
export const gists = ref(
  localStorage.getItem(GISTS_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(GISTS_LOCAL_STORAGE_KEY))
    : [],
)

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

export async function getFollowing(username) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${username}/following`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getGists(username) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${username}/gists`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchAllDataByUsername(username) {
  await fetchRepos(username)
  await fetchFollowers(username)
  await fetchFollowing(username)
  await fetchGists(username)
  localStorage.setItem(LAST_FETCH_DATE_TIME_LOCAL_STORAGE_KEY, Date.now())
}

export async function fetchRepos(username) {
  repos.value = await getRepos(username)
  filtered_repos.value = repos.value
  localStorage.setItem(REPOS_LOCAL_STORAGE_KEY, JSON.stringify(repos.value))
  localStorage.setItem(FILTERED_REPOS_LOCAL_STORAGE_KEY, JSON.stringify(filtered_repos.value))
}

export async function fetchFollowers(username) {
  followers.value = await getFollowers(username)
  localStorage.setItem(FOLLOWERS_LOCAL_STORAGE_KEY, JSON.stringify(followers.value))
}

export async function fetchFollowing(username) {
  following.value = await getFollowing(username)
  localStorage.setItem(FOLLOWING_LOCAL_STORAGE_KEY, JSON.stringify(following.value))
}

export async function fetchGists(username) {
  gists.value = await getGists(username)
  localStorage.setItem(GISTS_LOCAL_STORAGE_KEY, JSON.stringify(gists.value))
}

export function sortByName() {
  filtered_repos.value.sort((a, b) => a.name.localeCompare(b.name))
  localStorage.setItem(FILTERED_REPOS_LOCAL_STORAGE_KEY, JSON.stringify(filtered_repos.value))
}

export function sortByStars() {
  filtered_repos.value.sort((a, b) => b.stargazers_count - a.stargazers_count)
  localStorage.setItem(FILTERED_REPOS_LOCAL_STORAGE_KEY, JSON.stringify(filtered_repos.value))
}
