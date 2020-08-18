import { sort, binarySearch } from './util'

export default class WordsMapping {
  constructor (sentences = []) {
    this._sentences = sentences
  }

  execute () {
    const wordsMap = this.generateMap(this._sentences)
    sort(wordsMap)
    this._mappedSentences = this.generateMappedSentences(this._sentences, wordsMap)
  }

  generateMap (sentences) {
    const wordsSet = new Set()
    sentences.forEach(
      sentence => sentence.forEach(word => wordsSet.add(word))
    )
    return Array.from(wordsSet)
  }

  generateMappedSentences (sentences, wordsMap) {
    return sentences.map(
      sentence => sentence.map(word => binarySearch(word, wordsMap))
    )
  }

  getMappedSentences () {
    return [...this._mappedSentences]
  }
}
