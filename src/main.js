(() => {
  document.getElementById('content').innerText = 'Loading...'
  chrome.runtime.sendMessage({ eventName: 'popup-opened' })
})()

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'summary-generated') {
    document.getElementById('content').innerHTML = request.content
  }
})
