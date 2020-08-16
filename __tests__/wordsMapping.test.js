import WordsMapping from '../src/summarizer/WordsMapping'

test('Returns correct words map', () => {
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const wordsMapping = new WordsMapping()
  const expected = ['do', 'you', 'know', 'what', 'it', 'is', 'excuse', 'me', 'time']
  expect(wordsMapping.generateMap(sentences)).toEqual(expected)
})

test('Given a words map returns correct sentences map', () => {
  const wordsMap = ['do', 'excuse', 'is', 'it', 'know', 'me', 'time', 'what', 'you']
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const wordsMapping = new WordsMapping()
  const expected = [
    [0, 8, 4, 7, 3, 2],
    [1, 5, 0, 8, 4, 7, 6, 3, 2],
  ]
  expect(wordsMapping.generateMappedSentences(sentences, wordsMap)).toEqual(expected)
})

test('Returns correct sentences map', () => {
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const wordsMapping = new WordsMapping(sentences)
  const expected = [
    [0, 8, 4, 7, 3, 2],
    [1, 5, 0, 8, 4, 7, 6, 3, 2],
  ]
  expect(wordsMapping.getMappedSentences()).toEqual(expected)
})
