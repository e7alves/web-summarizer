import { binarySearch } from '../src/summarizer/util'

test('Binary search returns false to empty array', () => {
  expect(false).toEqual(binarySearch('a', []))
})

test('Binary search returns correct to a one element array', () => {
  expect(true).toEqual(binarySearch('a', ['a']))
  expect(false).toEqual(binarySearch('ab', ['a']))
})

test('Binary search returns correct', () => {
  const array = ['b', 'c', 'h', 'l', 'm', 'poo', 'ui']
  expect(true).toEqual(binarySearch('b', array))
  expect(false).toEqual(binarySearch('ab', array))
  expect(true).toEqual(binarySearch('ui', array))
  expect(true).toEqual(binarySearch('l', array))
})
