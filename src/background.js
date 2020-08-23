chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'popup-opened') {
    runContentScript()
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'page-loaded') {
    const { paragraphs, title, description, lang } = request
    chrome.runtime.sendMessage({
      eventName: 'web-content-extracted',
      paragraphs,
      keyWords: `${title} ${description}`.trim(),
      lang,
    })
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'page-not-loaded') {
    setTimeout(runContentScript, 500)
  }
})

const runContentScript = () => {
  chrome.tabs.executeScript(
    { file: 'content.js' },
    () => {
      if (chrome.runtime.lastError) {
        chrome.runtime.sendMessage({ eventName: 'no-content' })
      }
    }
  )
}
