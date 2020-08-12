(() => {
  const headElem = document.querySelector('head')
  const titleElem = headElem.querySelector('title')
  const descriptionMetaElem = headElem.querySelector('[name=description]')
  const bodyElem = document.querySelector('body')
  chrome.runtime.sendMessage({
    eventName: 'page-loaded',
    title: titleElem && titleElem.innerText,
    description: descriptionMetaElem && descriptionMetaElem.content,
    content: bodyElem && bodyElem.innerText,
  })
})()
