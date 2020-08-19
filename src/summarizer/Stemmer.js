import Snowball from 'snowball'

const languages = {
  en: 'English',
}

export default class Stemmer {
  constructor (lang = 'en') {
    this._snowball = new Snowball(languages[lang] || languages.en)
  }

  getCanonical (word) {
    this._snowball.setCurrent(word)
    this._snowball.stem()
    return this._snowball.getCurrent()
  }
}
