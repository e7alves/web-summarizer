import WordsMapping from '../src/summarizer/WordsMapping'

test('Returns correct words map', () => {
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const keyWords = ['about', 'thing', 'time']
  const wordsMapping = new WordsMapping(sentences, keyWords)
  const expected = ['do', 'you', 'know', 'what', 'it', 'is', 'excuse', 'me', 'time', 'about', 'thing']
  expect(wordsMapping.generateMap(sentences, keyWords)).toEqual(expected)
})

test('Given a words map returns correct sentences map', () => {
  const wordsMap = ['about', 'do', 'excuse', 'is', 'it', 'know', 'me', 'thing', 'time', 'what', 'you']
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const keyWords = ['about', 'thing', 'time']
  const wordsMapping = new WordsMapping(sentences, keyWords)
  const expected = {
    sentences: [
      [1, 10, 5, 9, 4, 3],
      [2, 6, 1, 10, 5, 9, 8, 4, 3],
    ],
    keyWords: [0, 7, 8],
  }
  expect(wordsMapping.generateMappedSentences(wordsMap)).toEqual(expected)
})

test('Returns correct sentences map', () => {
  const sentences = [
    ['do', 'you', 'know', 'what', 'it', 'is'],
    ['excuse', 'me', 'do', 'you', 'know', 'what', 'time', 'it', 'is'],
  ]
  const keyWords = ['about', 'thing', 'time']
  const wordsMapping = new WordsMapping(sentences, keyWords)
  wordsMapping.execute()
  const map = wordsMapping.getMappedSentences()
  const expected = {
    sentences: [
      [1, 10, 5, 9, 4, 3],
      [2, 6, 1, 10, 5, 9, 8, 4, 3],
    ],
    keyWords: [0, 7, 8],
  }
  expect(map).toEqual(expected)
  // immutable map test
  map.sentences = null
  expect(wordsMapping.getMappedSentences()).toEqual(expected)
})

test('Returns correct map to empty sentences', () => {
  const wordsMapping = new WordsMapping([], [])
  wordsMapping.execute()
  expect(wordsMapping.getMappedSentences()).toEqual({ sentences: [], keyWords: [] })
})
