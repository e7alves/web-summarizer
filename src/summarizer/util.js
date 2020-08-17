
export const binarySearch = (value, array) => {
  let start = 0
  let end = array.length - 1
  let mid
  while (start <= end) {
    mid = Math.floor((start + end) / 2)
    if (array[mid] === value) {
      return mid
    } else if (array[mid] < value) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return -1
}

export const sort = (array, rule = (a, b) => a < b ? -1 : 1) => array.sort((a, b) => rule(a, b))

export const cossineSimilarity = (a, b) => {
  const setA = new Set(a)
  const setB = new Set(b)
  let intersectionCount = 0
  setA.forEach(value => setB.has(value) && intersectionCount++)
  return intersectionCount / (Math.sqrt(setA.size) * Math.sqrt(setB.size))
}