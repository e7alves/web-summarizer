chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'popup-opened') {
    chrome.tabs.executeScript({ file: 'content.js' })
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'page-loaded') {
    chrome.runtime.sendMessage({
      eventName: 'summary-generated',
      title: request.title,
      description: request.description,
      content: request.content,
    })
  }
})
