export default function getProviderId (decodedToken) {
  const groups = decodedToken['cognito:groups']
  let result
  for (const i in groups) {
    const indexOfProvider = groups[i].indexOf('Provider')

    if (indexOfProvider === 0) {
      result = groups[i].substring(10)
    }
  }
  return (result)
}
