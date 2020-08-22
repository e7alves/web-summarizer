import langConfig from '../src/langConfig'
import { sort } from '../src/summarizer/util'

test('Returns ordered stoplists desc', () => {
  const en = langConfig.en.stopWords
  expect(en).toEqual(sort([...en]))
  const pt = langConfig.pt.stopWords
  expect(pt).toEqual(sort([...pt]))
})
