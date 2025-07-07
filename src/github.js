import axios from 'axios'

const BASE_URL = 'https://api.github.com'

export async function getRepos(query) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${query}/repos`)
    return data
  } catch (error) {
    console.error(error)
  }
}
