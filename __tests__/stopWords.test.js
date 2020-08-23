import langConfig from '../src/langConfig'
import { sort } from '../src/summarizer/util'

test('Returns ordered stoplists desc', () => {
  const en = langConfig.en.stopWords
  expect(en).toEqual(sort([...en]))
  const pt = langConfig.pt.stopWords
  expect(pt).toEqual(sort([...pt]))
  const es = langConfig.es.stopWords
  expect(es).toEqual(sort([...es]))
  const fr = langConfig.fr.stopWords
  expect(fr).toEqual(sort([...fr]))
  const de = langConfig.de.stopWords
  expect(de).toEqual(sort([...de]))
  const it = langConfig.it.stopWords
  expect(it).toEqual(sort([...it]))
})
