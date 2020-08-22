import { transform } from './preProcessor'
import WordsMapping from './WordsMapping'
import BushyPath from './BushyPath'
import { calculateNumberOfSentencesToSummary } from './compressor'

export default class Sumarizer {
  constructor (paragraphs, keyWords, lang = 'en', summaryPercent = 0.2) {
    this._paragraphs = paragraphs
    this._keyWords = keyWords
    this._lang = lang
    this._summaryPercent = summaryPercent
    this._rank = []
    this._rankedSentences = []
  }

  execute () {
    const transformedSentences = transform(this._paragraphs)
    const transformedKeyWords = transform([this._keyWords])[0]
    const wordsMapping = new WordsMapping(transformedSentences, transformedKeyWords)
    wordsMapping.execute()
    const map = wordsMapping.getMappedSentences()
    const busyPath = new BushyPath(map.sentences, map.keyWords)
    busyPath.execute()
    this._rank = busyPath.getRank()
    this._rank.forEach((item, idx) => {
      this._rankedSentences[idx] = this._paragraphs[item.index]
    })
    const numberOfSentencesToSummary = calculateNumberOfSentencesToSummary(this._rankedSentences, this._summaryPercent)
    this._summary = this._rank.slice(0, numberOfSentencesToSummary)
      .sort((a, b) => a.index < b.index ? -1 : 1)
      .map(item => this._paragraphs[item.index])
  }

  getSummary () {
    return this._summary
  }

  setLang (lang) {
    this._lang = lang
  }

  setSummaryPercent (percent) {
    this._summaryPercent = percent
    const numberOfSentencesToSummary = calculateNumberOfSentencesToSummary(this._rankedSentences, this._summaryPercent)
    this._summary = this._rank.slice(0, numberOfSentencesToSummary)
      .sort((a, b) => a.index < b.index ? -1 : 1)
      .map(item => this._paragraphs[item.index])
  }
}
