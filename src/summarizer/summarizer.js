import { transform } from './preProcessor'
import WordsMapping from './WordsMapping'
import BushyPath from './BushyPath'
import { calculateNumberOfSentencesToSummary } from './compressor'

export default class Sumarizer {
  constructor (paragraphs, keyWords, lang, summaryPercent = 0.2) {
    this._paragraphs = paragraphs
    this._keyWords = keyWords
    this._lang = lang
    this._summaryPercent = summaryPercent
    this._rank = []
    this._rankedSentences = []
    this._summarySenteceIndexes = []
  }

  execute () {
    console.log(this._lang)
    console.log(this._paragraphs)
    console.log(this._keyWords)
    const transformedSentences = transform(this._paragraphs, this._lang)
    console.log('tansformed sentences', transformedSentences)
    const transformedKeyWords = this._keyWords ? transform([this._keyWords], this._lang)[0] : []
    console.log('transformed kw', transformedKeyWords)
    const wordsMapping = new WordsMapping(transformedSentences, transformedKeyWords)
    wordsMapping.execute()
    const map = wordsMapping.getMappedSentences()
    console.log('map', map)
    const busyPath = new BushyPath(map.sentences, map.keyWords)
    busyPath.execute()
    this._rank = busyPath.getRank()
    console.log('rank', this._rank)
    this._rank.forEach((item, idx) => {
      this._rankedSentences[idx] = this._paragraphs[item.index]
    })
    this.generateSummary()
  }

  generateSummary () {
    const numberOfSentencesToSummary = calculateNumberOfSentencesToSummary(this._rankedSentences, this._summaryPercent)
    this._summarySenteceIndexes = this._rank.slice(0, numberOfSentencesToSummary)
      .sort((a, b) => a.index < b.index ? -1 : 1)
      .map(item => item.index)
    this._summary = this._summarySenteceIndexes
      .map(idx => this._paragraphs[idx])
    console.log(this._summary)
  }

  getSummary () {
    return this._summary
  }

  getSummarySenteceIndexes () {
    return [...this._summarySenteceIndexes]
  }

  setLang (lang) {
    this._lang = lang
  }

  setSummaryPercent (percent) {
    this._summaryPercent = percent
    this.generateSummary()
  }
}
