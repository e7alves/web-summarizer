import { sort, binarySearch } from './util'

export default class WordsMapping {
  constructor (sentences = []) {
    const wordsMap = this.generateMap(sentences)
    sort(wordsMap)
    this._mappedSentences = this.generateMappedSentences(sentences, wordsMap)
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
    return this._mappedSentences
  }
}
