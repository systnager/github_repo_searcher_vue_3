export function normalizeDateTime(dateTime) {
  return new Date(dateTime).toLocaleString()
}

export function formatUnixTimestamp(timestamp) {
  const date = new Date((timestamp / 1000000) * 1000)
  return date.toLocaleString()
}
