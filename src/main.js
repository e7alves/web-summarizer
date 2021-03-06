import Summarizer from './summarizer/Summarizer'

let summarizer = null
let options = {
  summaryPercent: 0.2,
}
let lastSummarySenteceIndexes = null

const init = () => {
  initDOM()
  document.getElementById('summary-percent').addEventListener('change', e => {
    const { value } = e.target
    document.getElementById('summary-percent-out').innerText = `${value}%`
    const summaryPercent = parseInt(value) / 100
    chrome.storage.local.set({ summaryPercent })
    options.summaryPercent = summaryPercent
    if (summarizer) {
      summarizer.setSummaryPercent(summaryPercent)
      renderSummary()
    }
  })
  chrome.runtime.sendMessage({ eventName: 'popup-opened' })
}

const initDOM = () => {
  document.getElementById('content').innerHTML = `
    <div id="spinner">
      <img src="spinner.gif" alt="Spinner" />
    </div>
  `
  chrome.storage.local.get(['summaryPercent'], result => {
    const { summaryPercent } = result
    options = {
      summaryPercent: summaryPercent || options.summaryPercent,
    }
    document.getElementById('summary-percent').value = options.summaryPercent * 100
    document.getElementById('summary-percent-out').innerText = `${options.summaryPercent * 100}%`
  })
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'web-content-extracted') {
    const { paragraphs, keyWords, lang } = request
    const { summaryPercent } = options
    summarizer = new Summarizer(
      paragraphs,
      keyWords,
      lang,
      summaryPercent
    )
    summarizer.execute()
    renderSummary()
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'no-content') {
    document.getElementById('content').innerText = ''
  }
})

const renderSummary = () => {
  const summary = summarizer.getSummary()
  const summarySenteceIndexes = summarizer.getSummarySenteceIndexes()
  document.getElementById('content').innerHTML = summary.map((sentence, idx) => {
    return `
      <p 
        class=${lastSummarySenteceIndexes && !lastSummarySenteceIndexes.includes(summarySenteceIndexes[idx])
        ? 'highlight' : ''}
      >
        ${sentence}
      </p>
    `
  }).join('')
  lastSummarySenteceIndexes = summarySenteceIndexes
}

init()
