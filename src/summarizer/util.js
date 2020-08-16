
export const binarySearch = (value, array) => {
  let start = 0
  let end = array.length - 1
  let mid
  while (start <= end) {
    mid = Math.floor((start + end) / 2)
    if (array[mid] === value) {
      return true
    } else if (array[mid] < value) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return false
}
