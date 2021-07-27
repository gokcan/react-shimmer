export default class IntendedError extends Error {
  createdAt: Date;
  intention: string;

  constructor(intention = 'forcePromiseReject', ...params: undefined[]) {
    super(...params);
    this.createdAt = new Date();
    this.intention = intention;
  }
}
