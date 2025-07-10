export function normalizeDateTime(dateTime) {
  return new Date(dateTime).toLocaleString()
}

export function formatUnixTimestamp(timestamp) {
  const date = new Date(Number(timestamp))
  return date.toLocaleString()
}

export function safeParseJSONArray(data) {
  try {
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return []
  }
}
