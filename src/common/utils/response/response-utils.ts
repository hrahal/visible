export type Res<T> = Promise<DataResponseOne<T>>
export type ResMany<T> = Promise<DataResponseMany<T>>

export interface Paginated<T> {
  total: number;
  data: Array<T>
}

export interface DataResponseOne<T> {
  result: boolean
  data: {
    item: T
  }
}

export interface DataResponseMany<T> {
  result: boolean
  data: {
    items: Array<T>,
    total: number
  }
}

export class ResponseUtils {
  static wrapOne<T>(res: T): DataResponseOne<T> {
    return {
      result: !!res,
      data: {
        item: res,
      },
    };
  }

  static wrapMany<T>(res: Paginated<T>): DataResponseMany<T> {
    return {
      result: res.total > 0,
      data: {
        total: res.total,
        items: res.data,
      },
    };
  }
}
