export default class IntendedError extends Error {
  constructor(intention = 'forcePromiseReject', ...params) {
    super(...params)
    this.date = new Date()
    this.intention = intention
  }
}
