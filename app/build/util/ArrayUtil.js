/**
 * 배열에 대한 유틸리티 기능
 */
export class ArrayUtil {
    /**
     * 다차원 배열에 있는 요소를 꺼낼 수 있도록 전개함
     * @param {any} dimensionalArray
     * @return {RecursiveType<T>}
     */
    static unfoldMultidimensionalArray(dimensionalArray) {
        if (!dimensionalArray ||
            !dimensionalArray[Symbol.iterator]) {
            return dimensionalArray;
        }
        const list = [];
        for (const element of dimensionalArray) {
            try {
                list.push(...this.unfoldMultidimensionalArray(element));
            }
            catch (error) {
                list.push(this.unfoldMultidimensionalArray(element));
            }
        }
        return list;
    }
}
