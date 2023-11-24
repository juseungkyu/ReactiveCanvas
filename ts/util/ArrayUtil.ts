// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecursiveType<T> = RecursiveType<T>[] | Generator<T> | T;

/**
 * 배열에 대한 유틸리티 기능
 */
export class ArrayUtil {
  /**
   * 다차원 배열에 있는 요소를 꺼낼 수 있도록 전개함
   * @param {any} dimensionalArray
   * @return {RecursiveType<T>}
   */
  static unfoldMultidimensionalArray<T>(
      dimensionalArray: RecursiveType<T>,
  ): RecursiveType<T> | T[] {
    if (
      !dimensionalArray ||
      !(dimensionalArray as Generator<RecursiveType<T>>
      )[Symbol.iterator]
    ) {
      return dimensionalArray;
    }

    const list = [];
    for (
      const element
      of dimensionalArray as Generator<RecursiveType<T>>
    ) {
      try {
        list.push(
            ...(this.unfoldMultidimensionalArray<T>(element) as
            Array<RecursiveType<T>>),
        );
      } catch (error) {
        list.push(this.unfoldMultidimensionalArray<T>(element));
      }
    }

    return list;
  }
}
