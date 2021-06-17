class AppError {
  public readonly message: string

  public readonly httpCode: number

  constructor(message: string, httpCode = 400) {
    this.message = message
    this.httpCode = httpCode
  }
}

export { AppError }
