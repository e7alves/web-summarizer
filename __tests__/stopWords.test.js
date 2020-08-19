import stopWords from '../src/summarizer/stopWords'
import { sort } from '../src/summarizer/util'

test('Returns ordered stoplists desc', () => {
  const en = stopWords('en')
  expect(en).toEqual(sort([...en]))
})

test('Returns english stopwords as fallback', () => {
  const en = stopWords('en')
  expect(en).toEqual(stopWords('foo'))
})
