export default function getStorageSizeInBytesByUnit (unit) {
  let storageSize = 0
  if (unit === 'Bytes') {
    storageSize = 1
  } else if (unit === 'KB') {
    storageSize = 1024
  } else if (unit === 'MB') {
    storageSize = 1024 * 1024
  } else if (unit === 'GB') {
    storageSize = 1024 * 1024 * 1024
  }
  return storageSize
}
