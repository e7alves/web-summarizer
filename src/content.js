(() => {
  const headElem = document.querySelector('head')
  const titleElem = headElem.querySelector('title')
  const descriptionMetaElem = headElem.querySelector('[name=description]')
  const bodyElem = document.querySelector('body')
  const paragraphElems = bodyElem ? bodyElem.querySelectorAll('p') : []
  const content = []
  paragraphElems.forEach(elem => {
    content.push(elem.innerText)
  })
  chrome.runtime.sendMessage({
    eventName: 'page-loaded',
    title: titleElem && titleElem.innerText,
    description: descriptionMetaElem && descriptionMetaElem.content,
    content,
  })
})()
