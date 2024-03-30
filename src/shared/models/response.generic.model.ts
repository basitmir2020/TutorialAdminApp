export class ResponseViewModelGeneric<T> {
  constructor(
    public statusCode: number,
    public success: boolean,
    public message: string | null = null,
    public totalItems?: number,
    public totalPages?: number,
    public data?: T
  ) {}
}
