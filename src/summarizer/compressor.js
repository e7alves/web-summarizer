import { wordsCounter } from './util'

export const calculateNumberOfSentencesToSummary = (sentences, summaryRate) => {
  if (!sentences.length) {
    return 0
  }
  let count = 1
  const numberOfWordsInSentences = wordsCounter(sentences)
  const wordsTotal = numberOfWordsInSentences.reduce((sum, current) => sum + current)
  const wordsRequired = Math.round(summaryRate * wordsTotal)
  let wordsSum = numberOfWordsInSentences[0]
  for (let i = 1; i < sentences.length; i++) {
    const diffBefore = wordsRequired - wordsSum
    const diffAfter = wordsSum + numberOfWordsInSentences[i] - wordsRequired
    if (diffBefore > diffAfter) {
      wordsSum += numberOfWordsInSentences[i]
      count++
    } else {
      break
    }
  }
  return count
}
