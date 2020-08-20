import { transform } from './preProcessor'
import WordsMapping from './WordsMapping'
import BushyPath from './BushyPath'
import { calculateNumberOfSentencesToSummary } from './compressor'

export default class Sumarizer {
  constructor (paragraphs, keyWords, lang = 'en') {
    this._paragraphs = paragraphs
    this._keyWords = keyWords
    this._lang = lang
  }

  execute () {
    const transformedSentences = transform(this._paragraphs)
    const transformedKeyWords = transform([this._keyWords])[0]
    const wordsMapping = new WordsMapping(transformedSentences, transformedKeyWords)
    wordsMapping.execute()
    const map = wordsMapping.getMappedSentences()
    const busyPath = new BushyPath(map.sentences, map.keyWords)
    busyPath.execute()
    const rank = busyPath.getRank()
    const rankedSentences = []
    rank.forEach((item, idx) => {
      rankedSentences[idx] = this._paragraphs[item.index]
    })
    const numberOfSentencesToSummary = calculateNumberOfSentencesToSummary(rankedSentences, 0.3)
    this._summary = rank.slice(0, numberOfSentencesToSummary)
      .sort((a, b) => a.index < b.index ? -1 : 1)
      .map(item => this._paragraphs[item.index])
  }

  getSummary () {
    return this._summary
  }
}
