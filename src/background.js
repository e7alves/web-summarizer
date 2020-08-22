chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'popup-opened') {
    chrome.tabs.executeScript({ file: 'content.js' })
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
    setTimeout(
      () => chrome.tabs.executeScript({ file: 'content.js' }), 500
    )
  }
})
