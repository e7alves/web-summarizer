import { getSentences, transformSentences } from '../src/summarizer/preProcessor'
import { binarySearch } from '../src/summarizer/util'

test('Returns empty senteces array if paragrafs is empty too', () => {
  expect([]).toEqual(getSentences([]))
})

test('Returns correct sentences to paragraphs with \'.\'', () => {
  const paragraphs = [
    'Thanks so much for the birthday money. Thanks so much for driving me home.',
    'I really appreciate your help.',
  ]
  expect([
    'Thanks so much for the birthday money.',
    'Thanks so much for driving me home.',
    'I really appreciate your help.',
  ]).toEqual(getSentences(paragraphs))
})

test('Returns correct sentence to single paragraph', () => {
  const paragraphs = [
    'Thanks so much for the birthday money. ',
  ]
  expect([
    'Thanks so much for the birthday money.',
  ]).toEqual(getSentences(paragraphs))
})

test('Returns correct sentences to paragraphs with \'?\'', () => {
  const paragraphs = [
    'How does that sound ?',
    'Excuse me, do you know what time it is?What do you think? ',
  ]
  expect([
    'How does that sound ?',
    'Excuse me, do you know what time it is?',
    'What do you think?',
  ]).toEqual(getSentences(paragraphs))
})

test('Returns correct sentences to paragraphs with \'!\'', () => {
  const paragraphs = [
    'Amen, hallelujah, amen!',
    'Awesome !Bingo! Right on target! ',
  ]
  expect([
    'Amen, hallelujah, amen!',
    'Awesome !',
    'Bingo!',
    'Right on target!',
  ]).toEqual(getSentences(paragraphs))
})

test('Returns correct sentences to paragraphs with \'…\'', () => {
  const paragraphs = [
    ' I really appreciate… Please call me (back) at…',
    'Actually, I thought… ',
  ]
  expect([
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ]).toEqual(getSentences(paragraphs))
})

test('Returns correct sentences to paragraphs with \'...\'', () => {
  const paragraphs = [
    ' I really appreciate... Please call me (back) at...',
    'Actually, I thought... ',
  ]
  expect([
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ]).toEqual(getSentences(paragraphs))
})

jest.mock('../src/summarizer/stemmer', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCanonical: word => ({
        really: 'realli', appreciate: 'appreci', please: 'pleas', call: 'call', back: 'back', actually: 'actual', thought: 'thought',
      }[word]),
    }
  })
})

jest.mock('../src/summarizer/util')
binarySearch.mockImplementation((word) => ['i', 'me', 'at'].includes(word))

test('Returns sentences preprocessed', () => {
  const sentences = [
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ]
  expect([
    ['realli', 'appreci'],
    ['pleas', 'call', 'back'],
    ['actual', 'thought'],
  ]).toEqual(transformSentences(sentences))
})
