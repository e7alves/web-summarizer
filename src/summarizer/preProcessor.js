import Stemmer from './Stemmer'
import langConfig from '../langConfig'
import { binarySearch } from './util'

export const getSentences = (paragraphs) => {
  let sentences = splitByCharacters(paragraphs.map(p => p.replace(/\.\.\./g, '…')), '…')
  sentences = splitByCharacters(sentences, '.')
  sentences = splitByCharacters(sentences, '?')
  sentences = splitByCharacters(sentences, '!')
  return sentences
}

export const transform = (sentences, lang) => {
  const transformedSentences = sentences.map(sentence => sentence
    .replace(/[^a-zA-Z\s]/g, '')
    .split(/\s+/g)
    .map(word => word.toLowerCase())
  )
  const langData = langConfig[lang]
  if (langData) {
    const stopList = langData.stopWords
    const stemmer = new Stemmer(langData.name)
    return transformedSentences.map(sentence => sentence
      .filter(word => binarySearch(word, stopList) === -1)
      .map(word => stemmer.getCanonical(word))
    )
  }
  return transformedSentences
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
