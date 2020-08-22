(() => {
  if (document.readyState === 'loading') {
    chrome.runtime.sendMessage({
      eventName: 'page-not-loaded',
    })
  } else {
    const headElem = document.querySelector('head')
    const titleElem = headElem.querySelector('title')
    const descriptionMetaElem = headElem.querySelector('[name=description]')
    const bodyElem = document.querySelector('body')
    const paragraphElems = bodyElem ? bodyElem.querySelectorAll('p') : []
    const paragraphs = []
    paragraphElems.forEach(elem => {
      if (elem.innerText) {
        paragraphs.push(elem.innerText)
      }
    })
    const pageLang = document.querySelector('html').lang
    chrome.runtime.sendMessage({
      eventName: 'page-loaded',
      title: titleElem ? titleElem.innerText : '',
      description: descriptionMetaElem ? descriptionMetaElem.content : '',
      paragraphs,
      lang: pageLang ? pageLang.split('-')[0].toLowerCase() : '',
    })
  }
})()
