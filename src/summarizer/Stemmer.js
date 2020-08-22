import Snowball from 'snowball'

export default class Stemmer {
  constructor (langName) {
    this._snowball = new Snowball(langName)
  }

  getCanonical (word) {
    this._snowball.setCurrent(word)
    this._snowball.stem()
    return this._snowball.getCurrent()
  }
}
