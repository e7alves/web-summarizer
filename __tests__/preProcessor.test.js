import { getSentences, transform } from '../src/summarizer/preProcessor'
import { binarySearch } from '../src/summarizer/util'

test('Returns empty senteces array if paragrafs is empty too', () => {
  expect(getSentences([])).toEqual([])
})

test('Returns correct sentences to paragraphs with \'.\'', () => {
  const paragraphs = [
    'Thanks so much for the birthday money. Thanks so much for driving me home.',
    'I really appreciate your help.',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'Thanks so much for the birthday money.',
    'Thanks so much for driving me home.',
    'I really appreciate your help.',
  ])
})

test('Returns correct sentence to single paragraph', () => {
  const paragraphs = [
    'Thanks so much for the birthday money. ',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'Thanks so much for the birthday money.',
  ])
})

test('Returns correct sentences to paragraphs with \'?\'', () => {
  const paragraphs = [
    'How does that sound ?',
    'Excuse me, do you know what time it is?What do you think? ',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'How does that sound ?',
    'Excuse me, do you know what time it is?',
    'What do you think?',
  ])
})

test('Returns correct sentences to paragraphs with \'!\'', () => {
  const paragraphs = [
    'Amen, hallelujah, amen!',
    'Awesome !Bingo! Right on target! ',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'Amen, hallelujah, amen!',
    'Awesome !',
    'Bingo!',
    'Right on target!',
  ])
})

test('Returns correct sentences to paragraphs with \'…\'', () => {
  const paragraphs = [
    ' I really appreciate… Please call me (back) at…',
    'Actually, I thought… ',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ])
})

test('Returns correct sentences to paragraphs with \'...\'', () => {
  const paragraphs = [
    ' I really appreciate... Please call me (back) at...',
    'Actually, I thought... ',
  ]
  expect(getSentences(paragraphs)).toEqual([
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ])
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
binarySearch.mockImplementation((word) => ['i', 'me', 'at'].includes(word) ? ['i', 'me', 'at'].indexOf(word) : -1)

test('Returns sentences preprocessed', () => {
  const sentences = [
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ]
  expect(transform(sentences, 'en')).toEqual([
    ['realli', 'appreci'],
    ['pleas', 'call', 'back'],
    ['actual', 'thought'],
  ])
})

test('Returns sentences preprocessed with undefined language', () => {
  const sentences = [
    'I really appreciate…',
    'Please call me (back) at…',
    'Actually, I thought…',
  ]
  expect(transform(sentences)).toEqual([
    ['i', 'really', 'appreciate'],
    ['please', 'call', 'me', 'back', 'at'],
    ['actually', 'i', 'thought'],
  ])
})

test('Returns sentences preprocessed treating spaces on border', () => {
  const sentences = [
    ' I really  appreciate… ',
    ' Please   call me (back) at  ',
    'Actually,    I thought…',
  ]
  expect(transform(sentences, 'en')).toEqual([
    ['realli', 'appreci'],
    ['pleas', 'call', 'back'],
    ['actual', 'thought'],
  ])
})

test('Returns sentences preprocessed to empty sentences', () => {
  const sentences = []
  expect(transform(sentences, 'en')).toEqual([])
})

test('Returns sentences preprocessed to accecented words', () => {
  const sentences = [
    '¿[acórdão] será às avô caça?!.',
    '_ español tranqüilo zurückgegangen Wettbewerbsfähigkeit könnten Großveranstaltun',
    '¡C\'est d\'été',
  ]
  expect(transform(sentences)).toEqual([
    ['acórdão', 'será', 'às', 'avô', 'caça'],
    ['español', 'tranqüilo', 'zurückgegangen', 'wettbewerbsfähigkeit', 'könnten', 'großveranstaltun'],
    ['cest', 'dété'],
  ])
})
