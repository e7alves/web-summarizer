import {
  binarySearch,
  sort,
  cossineSimilarity,
  normalize,
  wordsCounter,
} from '../src/summarizer/util'

test('Binary search returns false to empty array', () => {
  expect(binarySearch('a', [])).toEqual(-1)
})

test('Binary search returns correct to a one element array', () => {
  expect(binarySearch('a', ['a'])).toEqual(0)
  expect(binarySearch('ab', ['a'])).toEqual(-1)
})

test('Binary search returns correct', () => {
  const array = ['b', 'c', 'h', 'l', 'm', 'poo', 'ui']
  expect(binarySearch('b', array)).toEqual(0)
  expect(binarySearch('ab', array)).toEqual(-1)
  expect(binarySearch('ui', array)).toEqual(6)
  expect(binarySearch('l', array)).toEqual(3)
})

test('Returns sorted list asc', () => {
  const array = ['hg', 'ca', 'wh', 'l', 'mj', 'poo', 'at']
  expect(sort(array)).toEqual(['at', 'ca', 'hg', 'l', 'mj', 'poo', 'wh'])
})

test('Returns sorted list desc', () => {
  const array = ['hg', 'ca', 'wh', 'l', 'mj', 'poo', 'at']
  expect(sort(array, (a, b) => a > b ? -1 : 1))
    .toEqual(['wh', 'poo', 'mj', 'l', 'hg', 'ca', 'at'])
})

test('Returns correct similarity rate using strings', () => {
  const s1 = ['Julie', 'loves', 'me', 'more', 'than', 'Linda', 'loves', 'me']
  const s2 = ['Jane', 'likes', 'me', 'more', 'than', 'Julie', 'loves', 'me']
  expect(cossineSimilarity(s1, s2)).toBeCloseTo(0.7715, 3)
})

test('Returns correct similarity rate using numbers', () => {
  const s1 = [0, 1, 2, 3, 4, 5, 1, 2]
  const s2 = [6, 7, 2, 3, 4, 0, 1, 2]
  expect(cossineSimilarity(s1, s2)).toBeCloseTo(0.7715, 3)
})

test('Returns correct similarity rate to vectors totally different', () => {
  const s1 = [0, 1, 2]
  const s2 = [3, 4, 5, 6]
  expect(cossineSimilarity(s1, s2)).toBeCloseTo(0, 3)
})

test('Returns correct similarity rate to vectors equals', () => {
  const s1 = [0, 4, 8, 1]
  const s2 = [0, 4, 8, 1]
  expect(cossineSimilarity(s1, s2)).toBeCloseTo(1, 3)
})

test('Returns correct normalization', () => {
  const array1 = []
  const array2 = [1.6454, 2.788, 1.2544]
  const expected2 = [0.5901, 1, 0.4499]
  const array3 = [0.233, 0, 0.21, 0.188]
  const expected3 = [1, 0, 0.9012, 0.8068]
  const array4 = [2, 3, 5, 19]
  const expected4 = [0.1052, 0.1578, 0.2631, 1]
  const array5 = [0.5]
  const expected5 = [1]
  expect(normalize(array1)).toEqual([])
  normalize(array2).forEach(
    (value, i) => expect(value).toBeCloseTo(expected2[i], 3)
  )
  normalize(array3).forEach(
    (value, i) => expect(value).toBeCloseTo(expected3[i], 3)
  )
  normalize(array4).forEach(
    (value, i) => expect(value).toBeCloseTo(expected4[i], 3)
  )
  normalize(array5).forEach(
    (value, i) => expect(value).toBeCloseTo(expected5[i], 3)
  )
})

test('Returns correct normalization to array of zeros', () => {
  const array = [0, 0, 0]
  const expected = [1, 1, 1]
  normalize(array).forEach(
    (value, i) => expect(value).toBeCloseTo(expected[i], 3)
  )
})

test('Returns error on normalization when array has negative numbers', () => {
  const array = [-1, 0, 1]
  expect(() => normalize(array)).toThrow(Error)
})

test('Returns correct number of words to empty sentences', () => {
  expect(wordsCounter([])).toEqual([])
})

test('Returns correct number of words in the sentences', () => {
  const sentences = [
    'Thanks  so  much for the birthday money.',
    'Thanks so much  for driving me home.',
    'I really appreciate your help.',
  ]
  expect(wordsCounter(sentences)).toEqual([7, 7, 5])
})
