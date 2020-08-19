import Stemmer from './Stemmer'
import stopWords from './stopWords'
import { binarySearch } from './util'

export const getSentences = (paragraphs) => {
  let sentences = splitByCharacters(paragraphs.map(p => p.replace(/\.\.\./g, '…')), '…')
  sentences = splitByCharacters(sentences, '.')
  sentences = splitByCharacters(sentences, '?')
  sentences = splitByCharacters(sentences, '!')
  return sentences
}

export const transform = (sentences) => {
  const stopList = stopWords('en')
  const stemmer = new Stemmer('en')
  return sentences.map(sentence =>
    sentence.replace(/[^a-zA-Z\s]/g, '')
      .split(/\s+/g)
      .map(word => word.toLowerCase())
      .filter(word => !binarySearch(word, stopList))
      .map(word => stemmer.getCanonical(word))
  )
}

const splitByCharacters = (strArray, characters) => {
  const result = []
  strArray.forEach(str => {
    const splittedArray = str.split(characters)
    if (splittedArray.length === 1) {
      result.push(str)
    } else {
      splittedArray.forEach((splitted) => {
        splitted.trim() && result.push(splitted.concat(characters).trim())
      })
    }
  })
  return result
}
