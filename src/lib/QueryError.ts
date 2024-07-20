export class QueryError extends Error {
  constructor(message: string, public responseText: string) {
    super(message);
    this.name = 'QueryError';
  }
}
