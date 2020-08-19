import { sort, binarySearch } from './util'

export default class WordsMapping {
  constructor (sentences = [], keyWords = []) {
    this._sentences = sentences
    this._keyWords = keyWords
  }

  execute () {
    const wordsMap = this.generateMap(this._sentences)
    sort(wordsMap)
    this._mappedSentences = this.generateMappedSentences(wordsMap)
  }

  generateMap () {
    const wordsSet = new Set()
    this._sentences.forEach(
      sentence => sentence.forEach(word => wordsSet.add(word))
    )
    this._keyWords.forEach(word => wordsSet.add(word))
    return Array.from(wordsSet)
  }

  generateMappedSentences (wordsMap) {
    return {
      sentences: this._sentences.map(
        sentence => sentence.map(word => binarySearch(word, wordsMap))
      ),
      keyWords: this._keyWords.map(word => binarySearch(word, wordsMap)),
    }
  }

  getMappedSentences () {
    return Object.assign({}, this._mappedSentences)
  }
}
