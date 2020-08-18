import { calculateNumberOfSentencesToSummary } from '../src/summarizer/compressor'

test('Returns the correct number of sentences to empty sentence list', () => {
  expect(calculateNumberOfSentencesToSummary([], 30)).toEqual(0)
})

test('Returns at least one', () => {
  expect(calculateNumberOfSentencesToSummary([
    'Thanks so much for the birthday money.',
  ], 0.2)).toEqual(1)
})

test('Returns correct number of sentences', () => {
  const sentences = [
    'Thanks so much for the birthday money.',
    'Thanks so much for driving me home.',
    'I really appreciate your help.',
    'Thanks so much for the birthday money.',
    'Thanks so much for driving me home Mike.',
    'I really appreciate your help.',
    'Thanks so much for the birthday money.',
    'Thanks so much for driving me home.',
    'I really appreciate your help.',
  ]
  expect(calculateNumberOfSentencesToSummary(sentences, 0.1)).toEqual(1)
  expect(calculateNumberOfSentencesToSummary(sentences, 0.2)).toEqual(2)
  expect(calculateNumberOfSentencesToSummary(sentences, 0.3)).toEqual(3)
  expect(calculateNumberOfSentencesToSummary(sentences, 0.4)).toEqual(4)
  expect(calculateNumberOfSentencesToSummary(sentences, 0.5)).toEqual(4)
  expect(calculateNumberOfSentencesToSummary(sentences, 0.7)).toEqual(6)
  expect(calculateNumberOfSentencesToSummary(sentences, 1)).toEqual(sentences.length)
})
