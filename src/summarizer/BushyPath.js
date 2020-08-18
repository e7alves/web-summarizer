import { cossineSimilarity, normalize } from './util'

export default class BushyPath {
  constructor (sentences, keyWords) {
    this._sentences = sentences
    this._keyWords = keyWords
    this._rank = []
  }

  execute () {
    const similarityMatrix = this.generateSimilarityMatrix()
    const weightsBySimilarityMatrixEval = this.evaluateBySimilarityMatrix(similarityMatrix)
    const weightsByKeyWordsEval = this.evaluateByKeyWords()
    for (let i = 0; i < this._sentences.length; i++) {
      const weight = weightsBySimilarityMatrixEval[i] + weightsByKeyWordsEval[i]
      this._rank.push({ index: i, weight })
    }
    this._rank.sort((a, b) => a.weight < b.weight ? 1 : -1)
  }

  generateSimilarityMatrix () {
    const similarityMatrix = []
    for (let i = 0; i < this._sentences.length; i++) {
      similarityMatrix.push([])
      for (let j = 0; j < this._sentences.length; j++) {
        if (i === j) {
          similarityMatrix[i][j] = 1
        } else if (i > j) {
          similarityMatrix[i][j] = similarityMatrix[j][i]
        } else {
          similarityMatrix[i][j] = cossineSimilarity(this._sentences[i], this._sentences[j])
        }
      }
    }
    return similarityMatrix
  }

  evaluateBySimilarityMatrix (matrix) {
    const weights = []
    matrix.forEach((row, idx) => {
      weights[idx] = 0
      row.forEach(value => {
        weights[idx] += value
      })
    })
    return normalize(weights)
  }

  evaluateByKeyWords () {
    const weights = []
    this._sentences.forEach((sentence, idx) => {
      weights[idx] = 0
      new Set(sentence).forEach(value => {
        if (this._keyWords.includes(value)) {
          weights[idx] += 1
        }
      })
    })
    return normalize(weights)
  }

  getRank () {
    return [...this._rank]
  }
}
