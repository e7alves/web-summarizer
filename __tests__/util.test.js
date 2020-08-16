import { binarySearch, sort } from '../src/summarizer/util'

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
