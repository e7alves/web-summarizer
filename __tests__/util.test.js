import { binarySearch, sort, cossineSimilarity } from '../src/summarizer/util'

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

