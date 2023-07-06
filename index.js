var Arrays = (function () {
  /**
   * Adds the specified item to the beginning of the given array.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains some array item.
   * @return {Array} an array.
   */
  function addFirst(array, item) {
    return isEmpty(array) ? [item] : [item, ...array];
  }
  /**
   * Clones an array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the cloned array.
   */
  function clone(array) {
    return [...array];
  }
  /**
   * Checks whether the given array contains the given item.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.contains([], "a"); // false
   * Arrays.contains(["a", "b", "c"], "c"); // true
   * Arrays.contains(["a", "b", "c"], "d"); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains the item to be checked whether it exists in the
   * given array.
   * @return {Boolean} whether the given array contains the given item.
   */
  function contains(array, item) {
    let i = 0, j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        if (array[i] === item || array[j] === item) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }
  /**
   * Checks whether the specified array contains either of the specified
   * items.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.containsAny([], "a"); // false
   * Arrays.containsAny(["a", "b", "c"], "g", "c", "i"); // true
   * Arrays.containsAny(["a", "b", "c"], "d", "e"); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Array} items Contains the items to be checked whether they exist
   * in the given array.
   * @return {Boolean} whether the specified array contains either of the
   * specified items.
   */
  function containsAny(array, ...items) {
    let i = 0, j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        let m = 0;
        let n = items.length - 1, mi, ni;
        while (m <= n) {
          mi = items[m++];
          ni = items[n--];
          if (array[i] === mi || array[i] === ni ||
            array[j] === mi || array[j] === ni) {
            return true;
          }
        }
        i++;
        j--;
      }
    }
    return false;
  }
  /**
   * Checks whether the specified array contains none of the specified items.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.containsNone([], "a"); // true
   * Arrays.containsNone(["a", "b", "c"], "g", "c", "i"); // true
   * Arrays.containsNone(["a", "b", "c"], "d", "e"); // true
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Array} items Contains the items to be checked whether they exist
   * in the given array.
   * @return {Boolean} whether the specified array contains none of the
   * specified items.
   */
  function containsNone(array, ...items) {
    let i = 0, j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        let m = 0;
        let n = items.length - 1, mi, ni;
        while (m <= n) {
          mi = items[m++];
          ni = items[n--];
          if (array[i] === mi || array[i] === ni ||
            array[j] === mi || array[j] === ni) {
            return false;
          }
        }
        i++;
        j--;
      }
    }
    return true;
  }
  /**
   * Calls the specified predicate function for each of the array elements.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.each(['a', 'b', 'c'], (item, index, self) => {
   *   // Code goes here..
   * })
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Function} predicate Contains some predicate to be executed
   * for each array item.
   */
  function each(array, predicate) {
    let i = 0;
    const length = array.length;
    while (i < length) {
      predicate(array[i], i++, array);
    }
  }
  /**
   * Filters out unwanted values from the given array.
   *
   * @param {Array} array Contains some array to be filtered.
   * @param {*} unwantedValues Contains the values to be filtered out from the
   * array.
   * @return {Array} the filtered array.
   */
  function filterOut(array, unwantedValues) {
    return array.filter((value) => !unwantedValues.includes(value));
  }
  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param {Array} array Contains some array to be filtered.
   * @return {Array} the filtered array.
   */
  function filterTruthy(array) {
    return array.filter(Boolean);
  }
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  function first(array) {
    return isEmpty(array) ? null : array[0];
  }
  /**
   * Inserts the given item or items at the given index in the given array.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr = ["f", "o", "o", "b", "r"];
   * Arrays.insertAt(arr, 4, "a"); // ["f", "o", "o", "b", "a", "r"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index at which to add the given items.
   * @param {*} item Contains the item or items to be inserted at the given
   * index.
   * @return {Array} the extended array.
   */
  function insertAt(array, index, item) {
    item = isArray(item) ? item : [item];
    return [...array.slice(0, index), ...item, ...array.slice(index)];
  }
  /**
   * Generates an array where each of the items of the given array is followed
   * by the given separator item.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr1 = ['a', 'b', 'c'];
   * const arr2 = Arrays.intersperse(arr1, 'x');
   * console.log(arr2); // 'a', 'x', 'b', 'x', 'c'
   * ```
   * This method has been adopted from an article about readonly arrays written
   * by [Marius Schulz](https://mariusschulz.com/blog/read-only-array-and-tuple-types-in-typescript).
   *
   * @param {Array} array Contains some array.
   * @param {*} separator Contains some separator array item which appears after
   * each array item.
   * @return {Array} a new array where each of the items of the given array is
   * followed by the given separator item.
   */
  function intersperse(array, separator) {
    const result = [];
    let i = 0;
    for (; i < array.length;) {
      if (i !== 0) {
        result.push(separator);
      }
      result.push(array[i++]);
    }
    return result;
  }
  /**
   * Checks whether the given value is an array.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an array.
   */
  function isArray(value) {
    return Objects.toString(value) === '[object Array]';
  }
  /**
   * Check whether the specified value is of type `ArrayBuffer`.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isArrayBuffer([]); // false
   * Arrays.isArrayBuffer(new ArrayBuffer(5)); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is of type `ArrayBuffer`.
   */
  function isArrayBuffer(value) {
    return Utils.isNotNil(value) &&
      Objects.toString(value) === '[object ArrayBuffer]';
  }
  /**
   * Checks whether the specified array of numbers is a binary array i. e.
   * whether its values are only `0` and `1`.
   *
   * @param {Array} array Contains an array of numbers.
   * @return {Boolean} whether the specified array of numbers is a binary
   * array i. e. whether its values are only `0` and `1`.
   */
  function isBinary(array) {
    if (isNotEmpty(array)) {
      let i = 0, j = array.length - 1, ai, aj;
      while (i <= j) {
        ai = array[i++];
        aj = array[j--];
        if ((ai !== 0 && ai !== 1) || (aj !== 0 && aj !== 1)) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  function isEmpty(array) {
    return array.length === 0;
  }
  /**
   * Checks whether the specified array is identical i. e. whether
   * all the array items are equal to one another.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isIdentical([]); // true
   * Arrays.isIdentical(["a"]); // true
   * Arrays.isIdentical(["a", "a"]); // true
   * Arrays.isIdentical(["a", "b"]); // false
   * Arrays.isIdentical([1, false]); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the specified array is identical.
   */
  function isIdentical(array) {
    const l = array.length;
    if (l > 1) {
      let i = 0;
      while (i < l - 1) {
        if (array[i] !== array[++i]) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  function isNotEmpty(array) {
    return array.length > 0;
  }
  /**
   * Checks whether the specified array is sorted.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isSorted([]); // true
   * Arrays.isSorted([1, 2, 3, 4]); // true
   * Arrays.isSorted([6, 1, 9, 4, 2]); // false
   * Arrays.isSorted([9, 8, 7, 6, 5, 4]); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the specified array is sorted.
   */
  function isSorted(array) {
    let i = 0;
    const l = array.length;
    for (; i < l - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified value is a typed array.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isTypedArray(new Int8Array()); // true
   * Arrays.isTypedArray(new Int16Array()); // true
   * Arrays.isTypedArray(new Int32Array()); // true
   * Arrays.isTypedArray(new Float32Array()); // true
   * Arrays.isTypedArray(new Float64Array()); // true
   * Arrays.isTypedArray(new Uint8Array()); // true
   * Arrays.isTypedArray(new Uint8ClampedArray()); // true
   * Arrays.isTypedArray(new Uint16Array()); // true
   * Arrays.isTypedArray(new Uint32Array()); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a typed array
   * i. e. of type `Uint8Array`, `Uint8ClampedArray`, `Int8Array`,
   * `Uint16Array`, `Uint16Array`
   */
  function isTypedArray(value) {
    return Utils.isNotNil(value) && Numbers.isNumber(value.length) && [
      '[object Int8Array]',
      '[object Int16Array]',
      '[object Int32Array]',
      '[object Float32Array]',
      '[object Float64Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Uint16Array]',
      '[object Uint32Array]',
    ].includes(Objects.toString(value));
  }
  /**
    * Gets the last array item.
    *
    * @param {Array} array Contains some array.
    * @return {*} the last array item.
    */
  function last(array) {
    if (isEmpty(array)) {
      return null;
    }
    return array[array.length - 1];
  }
  /**
   * Removes the specified items from the given array.
   *
   * ```typescript
   * Arrays.removeAll([], 0); // []
   * Arrays.removeAll([0], 0); // []
   * Arrays.removeAll([1, 2, 3], 2, 3); // [1]
   * Arrays.removeAll([1, 2, 3], 1, 2, 3); // []
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Array} items Contains the array items to be removed.
   * @return {Array} an array.
   */
  function removeAll(array, ...items) {
    if (isEmpty(array) || isEmpty(items)) {
      return array;
    }
    let i = 0, e;
    const r = [];
    for (; i < array.length; i++) {
      e = array[i];
      if (items.indexOf(e) === -1) {
        r.push(e);
      }
    }
    return r;
  }
  /**
   * Removes the array item at the specified index and returns an array copy.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.removeAt([], 0); // []
   * Arrays.removeAt(['a'], 0); // []
   * Arrays.removeAt(['a', 'b'], 1); // ['a']
   * Arrays.removeAt(['a', 'b', 'c'], 0); // ['b', 'c']
   * Arrays.removeAt(['a', 'b', 'c'], -1); // ['a', 'b']
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index of the array item to be removed.
   * @return {Array} an array.
   */
  function removeAt(array, index) {
    if (Number.isSafeInteger(index) && index < array.length &&
      index >= array.length * -1) {
      const copy = clone(array);
      copy.splice(index, 1);
      return copy;
    }
    return array;
  }
  /**
   * Reverses the specified array.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.reverse([]); // []
   * Arrays.reverse(["a"]); // ["a"]
   * Arrays.reverse(["a", "b", "c"]); // ["c", "b", "a"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @return {Array} the reverse array.
   */
  function reverse(array) {
    return array.length < 2 ? array : [...array].reverse();
  }
  /**
   * Shuffles the specified array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} an array.
   */
  function shuffle(array) {
    const copy = clone(array);
    let i = copy.length - 1, r, tmp;
    for (; i > 0; i--) {
      r = Math.floor(Math.random() * (i + 1));
      tmp = copy[i];
      copy[i] = copy[r];
      copy[r] = tmp;
    }
    return copy;
  }
  /**
   * Sorts the specified array.
   *
   * @param {Array} array Contains some array.
   * @param {String} order Contains the sorting order. Possible values are
   * `asc` (ascending order) and `desc` (descending order). Defaults to `desc`.
   * @return {Array} the sorted array.
   */
  function sort(array, order = 'desc') {
    if (order !== 'asc' && order !== 'desc') {
      throw new TypeError(`Unknown sorting order "${order}".`);
    }
    return order === 'asc' ? __sortAsc(array) : __sortDesc(array);
  }
  /**
   * Generates a subarray with items from the given start index to the given
   * end index of the items of the specified array.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.subarray([], 0); // []
   * Arrays.subarray([1, 2, 3], 0); // [1, 2, 3]
   * Arrays.subarray([1, 2, 3], 1); // [2, 3]
   * Arrays.subarray([1, 2, 3, 4], 1, 3); // [2, 3]
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} start Contains the index of the first subarray item.
   * @param {Number} end Contains the index next to the last index of the
   * subarray. If not specified, the length of the given array is considered.
   * Defaults to `array.length`.
   * @return {Array} a subarray.
   */
  function subarray(array, start, end) {
    const l = array.length;
    if (l === 0) {
      return array;
    }
    if (start < 0) {
      start = 0;
    }
    if (Utils.isUndefined(end) || end > l) {
      end = l;
    }
    if (start === 0 && end === l) {
      return array;
    }
    const r = [];
    let i = start;
    for (; i < end; i++) {
      r.push(array[i]);
    }
    return r;
  }
  /**
   * Calculates the sum of the numerical array items.
   *
   * @param {Array} array Contains some array of numbers.
   * @return {Number} the sum of the array items.
   */
  function sum(array) {
    return array.reduce((prev, curr) => prev + curr, 0);
  }
  /**
   * Removes duplicates from the given array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the array without duplicates.
   */
  function unique(array) {
    return [...new Set(array)];
  }
  /* eslint-disable-next-line require-jsdoc */
  function __sortAsc(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let i = 1, e;
    const l = [], p = arr[0], r = [];
    for (; i < arr.length; i++) {
      e = arr[i];
      if (e < p) {
        l.push(e);
      }
      else {
        r.push(e);
      }
    }
    return [...__sortAsc(l), p, ...__sortAsc(r)];
  }
  /* eslint-disable-next-line require-jsdoc */
  function __sortDesc(array) {
    if (array.length < 2) {
      return array;
    }
    let i = 1, e;
    const l = [], p = array[0], r = [];
    for (; i < array.length; i++) {
      e = array[i];
      if (e >= p) {
        l.push(e);
      }
      else {
        r.push(e);
      }
    }
    return [...__sortDesc(l), p, ...__sortDesc(r)];
  }

  return {
    EMPTY: [],
    addFirst,
    clone,
    contains,
    containsAny,
    containsNone,
    each,
    filterOut,
    filterTruthy,
    first,
    insertAt,
    intersperse,
    isArray,
    isArrayBuffer,
    isBinary,
    isEmpty,
    isIdentical,
    isNotEmpty,
    isSorted,
    isTypedArray,
    last,
    removeAll,
    removeAt,
    reverse,
    shuffle,
    sort,
    subarray,
    sum,
    unique,
  }
})();

var Chars = (function () {
  /**
* Contains the backslash escape character '`\`'.
*/
  const BACKSLASH = '\\';
  /**
  * Contains the backspace escape character '`\b`'.
  */
  const BS = '\b';
  /**
  * Contains the carriage return escape character '`\r`'.
  */
  const CR = '\r';
  /**
  * Contains the double quote escape character '`"`'.
  */
  const DOUBLE_QUOTE = '\"';
  /**
  * Contains the form feed escape character '`\f`'.
  */
  const FF = '\f';
  /**
  * Contains the horizontal tabulator escape character '`\t`'.
  */
  const HT = '\t';
  /**
  * Contains the "new line" a. k. a. linefeed escape character '`\n`'.
  */
  const LF = '\n';
  /**
  * Contains the null control character `'\0'`.
  */
  const NUL = '\0';
  /**
  * Contains the single quote escape character '`'`'.
  */
  const SINGLE_QUOTE = '\'';
  /**
  * Contains a white space '` `'.
  */
  const SPACE = ' ';
  /**
  * Contains the vertical tabulator escape character '`\v`'.
  */
  const VT = '\v';

  /**
   * Checks whether the specified character is alpha (a-z or A-Z).
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isAlpha('a'); // true
   * Chars.isAlpha('B'); // true
   * Chars.isAlpha('-'); // false
   * Chars.isAlpha('0'); // false
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is alpha (a-z or A-Z).
   */
  function isAlpha(char) {
    if (char.length !== 1) {
      return false;
    }
    return isAlphaLower(char) || isAlphaUpper(char);
  }
  /**
   * Checks whether the specified character is a lowercase letter (a-z).
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isAlphaLower('a'); // true
   * Chars.isAlphaLower('B'); // false
   * Chars.isAlphaLower('-'); // false
   * Chars.isAlphaLower('0'); // false
   * Chars.isAlphaLower('f'); // true
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is a lowercase letter
   * (a-z).
   */
  function isAlphaLower(char) {
    if (char.length !== 1) {
      return false;
    }
    const charCode = char.charCodeAt(0);
    return charCode > 96 && charCode < 123;
  }
  /**
   * Checks whether the specified character is an uppercase letter (A-Z).
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isAlphaLower('a'); // true
   * Chars.isAlphaLower('B'); // false
   * Chars.isAlphaLower('-'); // false
   * Chars.isAlphaLower('0'); // false
   * Chars.isAlphaLower('f'); // true
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is an uppercase letter
   * (a-z).
   */
  function isAlphaUpper(char) {
    if (char.length !== 1) {
      return false;
    }
    const charCode = char.charCodeAt(0);
    return charCode > 64 && charCode < 91;
  }
  /**
   * Checks whether the specified character is an Arabic digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isArabicDigit('\u0660'); // true
   * Chars.isArabicDigit('\u0661'); // true
   * Chars.isArabicDigit('\u0667'); // true
   * Chars.isArabicDigit('\u0668'); // true
   * Chars.isArabicDigit('\u0669'); // true
   * Chars.isArabicDigit('0'); // false
   * Chars.isArabicDigit('6'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an Arabic digit.
   */
  function isArabicDigit(char) {
    return char.length === 1 && (char === '\u0660' ||
      char === '\u0661' ||
      char === '\u0662' ||
      char === '\u0663' ||
      char === '\u0664' ||
      char === '\u0665' ||
      char === '\u0666' ||
      char === '\u0667' ||
      char === '\u0668' ||
      char === '\u0669');
  }
  /**
   * Checks whether the specified character is [ASCII](https://www.ascii-code.com/).
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isASCII('a'); // true
   * Chars.isASCII('f'); // true
   * Chars.isASCII('B'); // true
   * Chars.isASCII('-'); // true
   * Chars.isASCII('0'); // true
   * Chars.isASCII('{'); // true
   * Chars.isASCII('|'); // true
   * Chars.isASCII('ä'); // false
   * Chars.isASCII('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is
   * [ASCII](https://www.ascii-code.com/).
   */
  function isASCII(char) {
    if (char.length !== 1)
      return false;
    return char.charCodeAt(0) < 128;
  }
  /**
   * Checks whether the specified character is an ASCII control character.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isASCIIControl(Chars.NUL); // true
   * Chars.isASCIIControl(Chars.BS); // true
   * Chars.isASCIIControl(Chars.CR); // true
   * Chars.isASCIIControl(Chars.FF); // true
   * Chars.isASCIIControl(Chars.HT); // true
   * Chars.isASCIIControl(Chars.LF); // true
   * Chars.isASCIIControl(Chars.VT); // true
   * Chars.isASCIIControl('0'); // false
   * Chars.isASCIIControl('a'); // false
   * Chars.isASCIIControl('B'); // false
   * Chars.isASCIIControl('z'); // false
   * Chars.isASCIIControl('ä'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an ASCII control
   * character.
   */
  function isASCIIControl(char) {
    if (char.length !== 1)
      return false;
    const charCode = char.charCodeAt(0);
    return charCode === 127 || charCode < 32;
  }
  /**
   * Checks whether the specified character is a printable character.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isASCIIPrintable('0'); // true
   * Chars.isASCIIPrintable('a'); // true
   * Chars.isASCIIPrintable('B'); // true
   * Chars.isASCIIPrintable('z'); // true
   * Chars.isASCIIPrintable('`'); // true
   * Chars.isASCIIPrintable('ä'); // false
   * Chars.isASCIIPrintable('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a printable character.
   */
  function isASCIIPrintable(char) {
    if (char.length !== 1)
      return false;
    const charCode = char.charCodeAt(0);
    return charCode > 31 && charCode < 127;
  }
  /**
   * Checks whether the specified character is a digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isDigit(''); // false
   * Chars.isDigit('3'); // true
   * Chars.isDigit('\u0660'); // true
   * Chars.isDigit('\u0967'); // true
   * Chars.isDigit('\u06f4'); // true
   * Chars.isDigit('\u2175'); // true
   * Chars.isDigit('\u216F'); // true
   * Chars.isDigit('a'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a digit.
   */
  function isDigit(char) {
    return char.length === 1 && (isModernDigit(char) ||
      isArabicDigit(char) ||
      isHinduDigit(char) ||
      isPersianDigit(char) ||
      isLowerRomanDigit(char) ||
      isUpperRomanDigit(char));
  }
  /**
   * Checks whether the specified character is high surrogate. A high
   * surrogate character is a 16-bit code character between `U+D800`
   * and `U+DBFF`.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isHighSurrogate(''); // false
   * Chars.isHighSurrogate('😀'); // true
   * Chars.isHighSurrogate('😎'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is high surrogate.
   */
  function isHighSurrogate(char) {
    return char.length === 1 && /[\uD800-\uDBFF]/g.test(char);
  }
  /**
   * Checks whether the specified character is a Hindu digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isHinduDigit(''); // true
   * Chars.isHinduDigit('0'); // true
   * Chars.isHinduDigit('१'); // true
   * Chars.isHindiDigit('२'); // true
   * Chars.isHinduDigit('\u0967'); // true
   * Chars.isHinduDigit('\u0968'); // true
   * Chars.isHinduDigit('\u0969'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a Hindu digit.
   */
  function isHinduDigit(char) {
    return char.length === 1 && (char === '\u0966' ||
      char === '\u0967' ||
      char === '\u0968' ||
      char === '\u0969' ||
      char === '\u096A' ||
      char === '\u096B' ||
      char === '\u096C' ||
      char === '\u096D' ||
      char === '\u096E' ||
      char === '\u096F');
  }
  /**
   * Checks whether the specified character is a letter.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isLetter('c'); // true
   * Chars.isLetter('Ā'); // true
   * Chars.isLetter('ה'); // true
   * Chars.isLetter('ت'); // true
   * Chars.isLetter('δ'); // true
   * Chars.isLetter('ю'); // true
   * Chars.isLetter('Ö'); // true
   * Chars.isLetter('ぃ'); // true
   * Chars.isLetter('`'); // false
   * Chars.isLetter('°'); // false
   * Chars.isLetter('©'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a letter.
   */
  function isLetter(char) {
    return char.length === 1 &&
      /^[a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD]+$/.test(char);
  }
  /**
   * Checks whether the specified character is either letter or digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isLetterOrDigit('c'); // true
   * Chars.isLetterOrDigit('Ā'); // true
   * Chars.isLetterOrDigit('ה'); // true
   * Chars.isLetterOrDigit('ت'); // true
   * Chars.isLetterOrDigit('δ'); // true
   * Chars.isLetterOrDigit('ю'); // true
   * Chars.isLetterOrDigit('Ö'); // true
   * Chars.isLetterOrDigit('ぃ'); // true
   * Chars.isLetterOrDigit('3'); // true
   * Chars.isLetterOrDigit('\u0660'); // true
   * Chars.isLetterOrDigit('\u0967'); // true
   * Chars.isLetterOrDigit('\u06f4'); // true
   * Chars.isLetterOrDigit('\u2175'); // true
   * Chars.isLetterOrDigit('\u216F'); // true
   * Chars.isLetterOrDigit('a'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is either letter
   * or digit.
   */
  function isLetterOrDigit(char) {
    return char.length === 1 && (isLetter(char) || isDigit(char));
  }
  /**
   * Checks whether the specified character is lowercase.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isLowerCase(''); // false
   * Chars.isLowerCase('abc'); // false
   * Chars.isLowerCase('a'); // true
   * Chars.isLowerCase('Б'); // false
   * Chars.isLowerCase('ö'); // true
   * Chars.isLowerCase('Ü'); // false
   * Chars.isLowerCase('ы'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is lowercase.
   */
  function isLowerCase(char) {
    if (char.length !== 1)
      return false;
    const char0 = char.charAt(0);
    if (!Number.isNaN(+char0 * 1))
      return false;
    return char0 === char0.toLowerCase();
  }
  /**
   * Checks whether the specified character is an upper Roman numberal.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isLowerRomanDigit(''); false
   * Chars.isLowerRomanDigit('ⅳ'); true
   * Chars.isLowerRomanDigit('\u2171'); true
   * Chars.isLowerRomanDigit('\u2179'); true
   * Chars.isLowerRomanDigit('\u217C'); true
   * Chars.isLowerRomanDigit('\u217F'); true
   * Chars.isLowerRomanDigit('a'); false
   * Chars.isLowerRomanDigit('0'); false
   * Chars.isLowerRomanDigit('9'); false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an upper Roman
   * numberal.
   */
  function isLowerRomanDigit(char) {
    return char.length === 1 && (char === '\u2170' ||
      char === '\u2171' ||
      char === '\u2172' ||
      char === '\u2173' ||
      char === '\u2174' ||
      char === '\u2175' ||
      char === '\u2176' ||
      char === '\u2177' ||
      char === '\u2178' ||
      char === '\u2179' ||
      char === '\u217A' ||
      char === '\u217B' ||
      char === '\u217C' ||
      char === '\u217D' ||
      char === '\u217E' ||
      char === '\u217F');
  }
  /**
   * Checks whether the specified character is low surrogate. A low
   * surrogate character is a 16-bit code character between `U+D800`
   * and `U+DBFF`.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isLowSurrogate(''); // false
   * Chars.isLowSurrogate('\uDC00'); // true
   * Chars.isLowSurrogate('\uDFFF'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is low surrogate.
   */
  function isLowSurrogate(char) {
    return char.length === 1 && /[\uDC00-\uDFFF]/g.test(char);
  }
  /**
   * Checks whether the specified character is a modern digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isModernDigit('0'); // true
   * Chars.isModernDigit('3'); // true
   * Chars.isModernDigit('9'); // true
   * Chars.isModernDigit('B'); // false
   * Chars.isModernDigit('z'); // false
   * Chars.isModernDigit('`'); // false
   * Chars.isModernDigit('ä'); // false
   * Chars.isModernDigit('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a modern digit.
   */
  function isModernDigit(char) {
    return char.length === 1 && char >= '0' && char <= '9';
  }
  /**
   * Checks whether the specified character is a Persian digit.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isPersianDigit('۰'); // true
   * Chars.isPersianDigit('۱'); // true
   * Chars.isPersianDigit('۲'); // true
   * Chars.isPersianDigit('۳'); // true
   * Chars.isPersianDigit('۴'); // true
   * Chars.isPersianDigit('۵'); // true
   * Chars.isPersianDigit('۶'); // true
   * Chars.isPersianDigit('۷'); // true
   * Chars.isPersianDigit('۸'); // true
   * Chars.isPersianDigit('۹'); // true
   * Chars.isPersianDigit('9'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a Persian digit.
   */
  function isPersianDigit(char) {
    return char.length === 1 && (char === '\u06f0' ||
      char === '\u06f1' ||
      char === '\u06f2' ||
      char === '\u06f3' ||
      char === '\u06f4' ||
      char === '\u06f5' ||
      char === '\u06f6' ||
      char === '\u06f7' ||
      char === '\u06f8' ||
      char === '\u06f9');
  }
  /**
   * Checks whether the specified character is a space character.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isSpace(' '); // true
   * Chars.isSpace('_'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a space character.
   */
  function isSpace(char) {
    return char.length === 1 && char === SPACE;
  }
  /**
   * Checks whether the specified character is surrogate (high or low
   * surrogate).
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isSurrogate(' '); // false
   * Chars.isSurrogate('\uD800'); // true
   * Chars.isSurrogate('\uDC00'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is surrogate.
   */
  function isSurrogate(char) {
    return isLowSurrogate(char) || isHighSurrogate(char);
  }
  /**
   * Checks whether the specified characters create a surrogate pair. A
   * surrogate pair according to the [Unicode Standard](https://unicode.org/standard/standard.html)
   * is a combination of a Unicode code point from U+D800 to U+DBFF a. k.
   * a. "high surrogate" with another in range from U+DC00 to U+DFFF a. k.
   * a. "low surrogate".
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isSurrogatePair('', ''); // false
   * Chars.isSurrogatePair('\ud801', '\udc9f'); // true
   * Chars.isSurrogatePair('\ud801\udbff', '\udc9f'); // false
   * ```
   *
   * @param {String} high Contains some character.
   * @param {String} low Contains some other character.
   * @return {Boolean} whether the specified characters create a surrogate
   * pair.
   */
  function isSurrogatePair(high, low) {
    return isHighSurrogate(high) && isLowSurrogate(low);
  }
  /**
   * Checks whether the specified character is an upper Roman numberal.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isUpperRomanDigit(''); false
   * Chars.isUpperRomanDigit('\u2160'); true
   * Chars.isUpperRomanDigit('\u2161'); true
   * Chars.isUpperRomanDigit('\u2169'); true
   * Chars.isUpperRomanDigit('\u216A'); true
   * Chars.isUpperRomanDigit('\u216B'); true
   * Chars.isUpperRomanDigit('\u216C'); true
   * Chars.isUpperRomanDigit('\u216F'); true
   * Chars.isUpperRomanDigit('a'); false
   * Chars.isUpperRomanDigit('0'); false
   * Chars.isUpperRomanDigit('9'); false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an upper Roman
   * numberal.
   */
  function isUpperRomanDigit(char) {
    return char.length === 1 && (char === '\u2160' ||
      char === '\u2161' ||
      char === '\u2162' ||
      char === '\u2163' ||
      char === '\u2164' ||
      char === '\u2165' ||
      char === '\u2166' ||
      char === '\u2167' ||
      char === '\u2168' ||
      char === '\u2169' ||
      char === '\u216A' ||
      char === '\u216B' ||
      char === '\u216C' ||
      char === '\u216D' ||
      char === '\u216E' ||
      char === '\u216F');
  }
  /**
   * Checks whether the specified character is uppercase.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isUpperCase(''); // false
   * Chars.isUpperCase('abc'); // false
   * Chars.isUpperCase('a'); // false
   * Chars.isUpperCase('Б'); // true
   * Chars.isUpperCase('ö'); // false
   * Chars.isUpperCase('Ü'); // true
   * Chars.isUpperCase('ы'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is uppercase.
   */
  function isUpperCase(char) {
    if (char.length !== 1)
      return false;
    const char0 = char.charAt(0);
    if (!Number.isNaN(+char0 * 1))
      return false;
    return char0 === char0.toUpperCase();
  }
  /**
   * Checks whether the specified character is a space i. e. `" "`,
   * `"\t"`, `"\r"`, `"\n"`, `"\f"`.
   *
   * **Usage Examples:**
   * ```typescript
   * Chars.isWhitespace(""); // false
   * Chars.isWhitespace(" "); // true
   * Chars.isWhitespace("\t"); // true
   * Chars.isWhitespace("\r"); // true
   * Chars.isWhitespace("\f"); // true
   * Chars.isWhitespace("\n"); // true
   * Chars.isWhitespace("\n\n"); // false
   * Chars.isWhitespace("a"); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a space.
   */
  function isWhitespace(char) {
    if (char.length !== 1)
      return false;
    return char === SPACE ||
      char === HT ||
      char === CR ||
      char === LF ||
      char === FF;
  }

  return {
    BACKSLASH,
    BS,
    CR,
    DOUBLE_QUOTE,
    FF,
    HT,
    LF,
    NUL,
    SINGLE_QUOTE,
    SPACE,
    VT,
    isASCII,
    isASCIIControl,
    isASCIIPrintable,
    isAlpha,
    isAlphaLower,
    isAlphaUpper,
    isArabicDigit,
    isDigit,
    isHighSurrogate,
    isHinduDigit,
    isLetter,
    isLetterOrDigit,
    isLowSurrogate,
    isLowerCase,
    isLowerRomanDigit,
    isModernDigit,
    isPersianDigit,
    isSpace,
    isSurrogate,
    isSurrogatePair,
    isUpperCase,
    isUpperRomanDigit,
    isWhitespace,
  }
})();

var Dates = (function () {
  /**
 * Contains the number of days in a year.
 */
  const DAYS_IN_YEAR = 365.2425;
  /**
   * Contains the maximal number of milliseconds allowed.
   */
  const MAX_ALLOWED_TIME = 864e13;
  /**
   * Contains the number of minutes in a day.
   */
  const MINS_IN_DAY = 1440;
  /**
   * Contains the number of minutes in an hour.
   */
  const MINS_IN_HOUR = 60;
  /**
   * Contains the number of minutes in a month.
   */
  const MINS_IN_MONTH = 432e2;
  /**
   * Contains the number of minutes in a year.
   */
  const MINS_IN_YEAR = 5256e2;
  /**
   * Contains the number of milliseconds in a day.
   */
  const MS_IN_DAY = 864e5;
  /**
   * Contains the number of milliseconds in an hour.
   */
  const MS_IN_HOUR = 3.6e6;
  /**
   * Contains the number of milliseconds in a minute.
   */
  const MS_IN_MINUTE = 6e4;
  /**
   * Contains the number of milliseconds in a second.
   */
  const MS_IN_SECOND = 1e3;
  /**
   * Contains the number of milliseconds in a week.
   */
  const MS_IN_WEEK = 6048e5;
  /**
   * Contains the number of seconds in a day.
   */
  const SECS_IN_DAY = 864e2;
  /**
   * Contains the number of seconds in a month.
   */
  const SECS_IN_MONTH = 2629746e3;
  /**
   * Contains the number of seconds in a week.
   */
  const SECS_IN_WEEK = 6048e2;
  /**
   * Contains the number of seconds in a year.
   */
  const SECS_IN_YEAR = 31556952e3;
  /**
   * Adds the specified number of days to the specified date object, an ISO 8601
   * date string or the milliseconds from midnight, January 1, 1970 UTC.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  function addDays(date, days) {
    nonNegative(days);
    const dateObj = tryParse(date);
    if (days === 0) {
      return dateObj;
    }
    const result = new Date(dateObj);
    result.setDate(result.getDate() + days);
    return result;
  }
  /**
   * Adds the specified number of milliseconds to the specified date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  function addMilliseconds(date, ms) {
    nonNegative(ms);
    const dateObj = tryParse(date);
    if (ms === 0) {
      return dateObj;
    }
    return new Date(dateObj.getTime() + ms);
  }
  /**
   * Adds the specified number of minutes to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date
   * string or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  function addMinutes(date, minutes) {
    nonNegative(minutes);
    const dateObj = tryParse(date);
    if (minutes === 0) {
      return dateObj;
    }
    dateObj.setMinutes(dateObj.getMinutes() + minutes);
    return dateObj;
  }
  /**
   * Adds the specified number of months to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  function addMonths(date, months) {
    nonNegative(months);
    const dateObj = tryParse(date);
    if (months === 0) {
      return dateObj;
    }
    dateObj.setMonth(dateObj.getMonth() + months);
    return dateObj;
  }
  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  function addSeconds(date, seconds) {
    nonNegative(seconds);
    const dateObj = tryParse(date);
    if (seconds === 0) {
      return dateObj;
    }
    dateObj.setSeconds(dateObj.getSeconds() + seconds);
    return dateObj;
  }
  /**
   * Adds the specified number of weeks to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  function addWeeks(date, weeks) {
    nonNegative(weeks);
    const dateObj = tryParse(date);
    if (weeks === 0) {
      return dateObj;
    }
    dateObj.setDate(dateObj.getDate() + (weeks * 7));
    return dateObj;
  }
  /**
   * Adds the specified number of years to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  function addYears(date, years) {
    nonNegative(years);
    const dateObj = tryParse(date);
    if (years === 0) {
      return dateObj;
    }
    dateObj.setFullYear(dateObj.getFullYear() + years);
    return dateObj;
  }
  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC. If this is not
   * defined the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  function atStartOfDay(date) {
    if (date) {
      const dateObj = tryParse(date);
      return dateOnly(dateObj);
    }
    return dateOnly(now);
  }
  /**
   * Clones a date object.
   *
   * @param {Date} date Contains some date object.
   * @return {Date} a cloned copy of the given date object.
   */
  function clone(date) {
    return new Date(date.getTime());
  }
  /**
   * Compares two date objects. Useful for array sorting.
   *
   * @param {Date} a Contains some date object.
   * @param {Date} b Contains some other date object.
   * @return {Number}
   * * `-1` if `a` is before than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is after than `b`.
   */
  function compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }
  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {Date} date Contains some date object.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  function dateOnly(date) {
    const dateObj = tryParse(date), msFromDayStart = dateObj.getTime() % MS_IN_DAY;
    return new Date(dateObj.getTime() - msFromDayStart);
  }
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  function daysDifference(date, other) {
    const dateObj = tryParse(date), otherObj = tryParse(other), timeDiff = timeDifference(dateObj, otherObj);
    return Math.ceil(timeDiff / MS_IN_DAY);
  }
  /**
   * Gets the number of days in the specified month of the specified year.
   *
   * @param {Number} month Contains the month index. The indexes start from
   * 1 (January).
   * @param {Number} year Contains the year.
   * @return {Number} the number of days in the given month of the given year.
   */
  function daysOfMonth(month, year) {
    if (month < 1 || month > 12 || year < 0 || year > 9999) {
      return -1;
    }
    return new Date(year, month, 0).getDate();
  }
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} b Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  function equals(a, b, ignoreTime = false) {
    const aObj = tryParse(a), bObj = tryParse(b);
    if (ignoreTime) {
      const x = dateOnly(a), y = dateOnly(b);
      return x.getTime() === y.getTime();
    }
    return aObj.getTime() === bObj.getTime();
  }
  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds between midnight, January 1, 1970 UTC and the
   * specified date.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  function getUTC(date) {
    const dateObj = tryParse(date);
    return Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds());
  }
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  function hoursDifference(date, other) {
    const dateObj = tryParse(date), otherObj = tryParse(other), msDifference = Numbers.abs(dateObj.getTime() - otherObj.getTime());
    return msDifference / MS_IN_HOUR;
  }
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  function isAfter(date, other, ignoreTime = false) {
    if (ignoreTime) {
      const x = dateOnly(date), y = dateOnly(other);
      return x.getTime() > y.getTime();
    }
    const dateObj = tryParse(date), otherObj = tryParse(other);
    return dateObj.getTime() > otherObj.getTime();
  }
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  function isBefore(date, other, ignoreTime = false) {
    if (ignoreTime) {
      const x = dateOnly(date), y = dateOnly(other);
      return x.getTime() < y.getTime();
    }
    const dateObj = tryParse(date), otherObj = tryParse(other);
    return dateObj.getTime() < otherObj.getTime();
  }
  /**
   * Checks whether the given date is between the given date range.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} from Contains the lower date.
   * @param {Date} to Contains the upper date.
   * @param {String} incl Contains the inclusivity type of the dates range.
   * - `(]`: Not including the date `from` but including the date `to`.
   * - `()`: Not including the dates `from` and `to`.
   * - `[]`: Including the dates `from` and `to`.
   * - `[)`: Including only the date `from` but not the date `to`.
   * @return {Boolean} whether the given date is between the given date range.
   */
  function isBetween(date, from, to, incl = '()') {
    if (!['()', '[]', '(]', '[)'].includes(incl)) {
      throw new TypeError('Inclusivity type must be one of (), [], (], [)');
    }
    const isBeforeEqual = incl[0] === '[';
    const isAfterEqual = incl[1] === ']';
    return (isBeforeEqual ?
      (equals(from, date) || isBefore(from, date)) :
      isBefore(from, date)) && (isAfterEqual ?
        (equals(to, date) || isAfter(to, date)) :
        isAfter(to, date));
  }
  /**
   * Checks whether the given value is a date object.
   * **Note:** This method simply checks whether the given value
   * is a date object, it doesn't check whether it represents a
   * valid date object. In order to check for date validity use
   * the @see `Dates.isValid(date)` method.
   *
   * **Example**
   * ```typescript
   * Dates.isDate(new Date('I am not valid')); // true
   * Dates.isValid(new Date()); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a date object.
   */
  function isDate(value) {
    const proto = Object.prototype.toString.call(value);
    return value instanceof Date || proto === '[object Date]';
  }
  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  function isFuture(date, ignoreTime = false) {
    const now = now();
    if (ignoreTime) {
      return isAfter(dateOnly(date), now);
    }
    return isAfter(date, now);
  }
  /**
   * Checks whether the specified string is a valid ISO 8601 date string
   * which has the format `YYYY-MM-DDTHH:mm:ss.sssZ`.
   *
   * **Usage Examples:**
   * ```typescript
   * Dates.isISOString('2023-11-11T23:15:22.999Z'); // true
   * Dates.isISOString('2023-13-11T23:15:22.999Z'); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is a valid ISO 8601
   * date string.
   */
  function isISOString(str) {
    if (typeof str !== 'string' || str.length !== 24)
      return false;
    if ((str.charAt(4) === '-') &&
      (str.charAt(7) === '-') &&
      (str.charAt(10) === 'T') &&
      (str.charAt(13) === ':') &&
      (str.charAt(16) === ':') &&
      (str.charAt(19) === '.') &&
      (str.charAt(23) === 'Z')) {
      const year = +str.substring(0, 4), month = +str.substring(5, 7), day = +str.substring(8, 10), hour = +str.substring(11, 13), minutes = +str.substring(14, 16), seconds = +str.substring(17, 19), milliseconds = +str.substring(20, 23);
      if (Numbers.isNatural(year) &&
        Numbers.isNatural(month) &&
        Numbers.isNatural(day) &&
        Numbers.isNatural(hour) &&
        Numbers.isNatural(minutes) &&
        Numbers.isNatural(seconds) &&
        Numbers.isNatural(milliseconds)) {
        return year >= 0 &&
          year <= 9999 &&
          month > 0 &&
          month <= 12 &&
          hour >= 0 &&
          hour <= 23 &&
          minutes >= 0 &&
          minutes <= 59 &&
          seconds >= 0 &&
          seconds < 60 &&
          milliseconds >= 0 &&
          milliseconds <= 999 &&
          day > 0 && day <= daysOfMonth(month, year);
      }
    }
    return false;
  }
  /**
   * Checks whether the given date object is valid.
   *
   * @param {Date} date Contains some date object.
   * @return {Boolean} whether the given value is a valid date object.
   */
  function isValid(date) {
    return isDate(date) && !Number.isNaN(date.valueOf());
  }
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  function millisecondsDifference(date, other) {
    const dateObj = tryParse(date), otherObj = tryParse(other);
    return Numbers.abs(dateObj.getTime() - otherObj.getTime());
  }
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in minutes between the two specified dates.
   */
  function minutesDifference(date, other) {
    const msDifference = millisecondsDifference(date, other);
    return Math.round(((msDifference % MS_IN_DAY) % 36e5) / 6e4);
  }
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  function monthsDifference(date, other) {
    const dateObj = tryParse(date), otherObj = tryParse(other);
    let months;
    months = (otherObj.getFullYear() - dateObj.getFullYear()) * 12;
    months -= dateObj.getMonth();
    months += otherObj.getMonth();
    return Numbers.abs(months);
  }
  /**
   * Gets the local date and time now.
   */
  function now() {
    const dateNow = new Date(), offset = getTimezoneOffset(dateNow);
    return new Date(dateNow.valueOf() - offset);
  }
  /**
   * Parses a value as a date.
   *
   * @param {*} value Contains some value.
   * @return {Date} a date object in case the given value represents
   * a valid date; otherwise null.
   */
  function parse(value) {
    if (isDate(value) && isValid(value)) {
      return value;
    }
    return from(value);
  }
  /**
   * Parses an ISO 8601 date string (`YYYY-MM-DDTHH:mm:ss.sssZ`) as a date
   * object.
   *
   * **Usage Examples:**
   * ```typescript
   * Dates.parseISO('2023'); // Date: "2023-01-01T00:00:00.000Z"
   * Dates.parseISO('2023-05'); // Date: "2023-05-01T00:00:00.000Z"
   * Dates.parseISO('2023-05-09T23'); // Date: "2023-05-09T23:00:00.000Z"
   * Dates.parseISO('2023-05-09T23:15'); // Date: "2023-05-09T23:15:00.000Z"
   * Dates.parseISO('2023-05-09T23:15:22'); // Date: "2023-05-09T23:15:22.000Z"
   * Dates.parseISO('2023-05-09T23:15:22.123Z');
   * // Date: "2023-05-09T23:15:22.123Z"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Date} a date object if the specified string is a valid
   * ISO 8601 date string; otherwise `null`.
   */
  function parseISO(str) {
    if (!Strings.isString(str) || Strings.isEmpty(str)) {
      return null;
    }
    const iso = str.trim(), len = iso.length;
    if (Strings.isEmpty(iso)) {
      return null;
    }
    if (len <= 24) {
      const s1 = iso.charAt(4), s2 = iso.charAt(7), s3 = iso.charAt(10), s4 = iso.charAt(13), s5 = iso.charAt(16), s6 = iso.charAt(19), s7 = iso.charAt(23);
      if ((s1 !== '-' && s1 !== '') ||
        (s2 !== '-' && s2 !== '') ||
        (s3 !== 'T' && s3 !== '') ||
        (s4 !== ':' && s4 !== '') ||
        (s5 !== ':' && s5 !== '') ||
        (s6 !== '.' && s6 !== '') ||
        (s7 !== 'Z' && s7 !== '')) {
        return null;
      }
      const yStr = iso.substring(0, 4);
      if (Strings.isEmpty(yStr)) {
        return null;
      }
      const MStr = iso.substring(5, 7), dStr = iso.substring(8, 10), hStr = iso.substring(11, 13), mStr = iso.substring(14, 16), sStr = iso.substring(17, 19), msStr = iso.substring(20, 23);
      const year = +yStr, month = Strings.isEmpty(MStr) ? 1 : +MStr, day = Strings.isEmpty(dStr) ? 1 : +dStr, hour = Strings.isEmpty(hStr) ? 0 : +hStr, minutes = Strings.isEmpty(mStr) ? 0 : +mStr, seconds = Strings.isEmpty(sStr) ? 0 : +sStr, milliseconds = Strings.isEmpty(msStr) ? 0 : +msStr;
      if (!Numbers.isNatural(year) ||
        !Numbers.isNatural(month) ||
        !Numbers.isNatural(day) ||
        !Numbers.isNatural(hour) ||
        !Numbers.isNatural(minutes) ||
        !Numbers.isNatural(seconds) ||
        !Numbers.isNatural(milliseconds)) {
        return null;
      }
      if (year >= 0 &&
        year <= 9999 &&
        month > 0 &&
        month <= 12 &&
        hour >= 0 &&
        hour <= 24 &&
        minutes >= 0 &&
        minutes <= 59 &&
        seconds >= 0 &&
        seconds < 60 &&
        milliseconds >= 0 &&
        milliseconds <= 999) {
        const monthDays = daysOfMonth(month, year);
        if (day > 0 && day <= monthDays) {
          const date = new Date(year, month - 1, day, hour, minutes, seconds, milliseconds), offset = getTimezoneOffset(date);
          return new Date(date.valueOf() - offset);
        }
      }
    }
    return null;
  }
  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  function removeDays(date, days) {
    nonNegative(days);
    const dateObj = tryParse(date);
    if (days === 0) {
      return dateObj;
    }
    dateObj.setDate(dateObj.getDate() - days);
    return dateObj;
  }
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  function timeDifference(date, other) {
    const dateObj = tryParse(date), otherObj = tryParse(other);
    return Numbers.abs(otherObj.getTime() - dateObj.getTime());
  }
  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Date} a date object representing the local date.
   */
  function toLocalDate(date) {
    const dateObj = tryParse(date), offsetInMs = dateObj.getTimezoneOffset() * MS_IN_MINUTE, localDate = new Date(dateObj.getTime() + offsetInMs), offset = dateObj.getTimezoneOffset() / 60, hours = dateObj.getHours();
    localDate.setHours(hours - offset);
    return localDate;
  }
  /**
   * Gets the Coordinated Universal Time (UTC) right now.
   */
  function utcNow() {
    return new Date();
  }
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  function yearsDifference(date, other) {
    return monthsDifference(date, other) / 12;
  }
  /**
   * Parses the given value as a date object.
   *
   * @param {Date} value Contains some string, number or Date object.
   * If this argument is not defined, the current date is returned.
   * @return {Date} a date object in case the specified value can be
   * parsed as a date object; otherwise `null`.
   *
   * @private
   */
  function from(value) {
    if (isDate(value) && isValid(value)) {
      return value;
    }
    value !== null && value !== void 0 ? value : (value = new Date());
    // if the value is an ISO 8601 date string, parse it
    if (Strings.isString(value)) {
      return parseISO(value);
    }
    else {
      if (isDate(value) === false) {
        value = new Date(value);
        if (isValid(value)) {
          return value;
        }
      }
    }
    return null;
  }
  /**
   * Gets the timezone offset in milliseconds.
   *
   * @param {Date} date Contains some date object.
   * @return {Number} the timezone offset in milliseconds.
   */
  function getTimezoneOffset(date) {
    const utc = new Date(getUTC(date));
    utc.setUTCFullYear(date.getFullYear());
    return date.getTime() - utc.getTime();
  }
  /**
   * Tries to parse the specified value of either of the types `string`,
   * `number` or `Date` as a `Date` object; otherwise throws `TypeError`.
   *
   * @param {Date} value Contains some date.
   * @return {Date} the parsed date.
   *
   * @private
   */
  function tryParse(value) {
    const date = from(value);
    if (date === null) {
      throw new TypeError(`Cannot parse date: "${String(value)}"`);
    }
    return date;
  }
  /**
   * Checks whether the specified number is positive or zero; otheriwse
   * throws `TypeError`.
   *
   * @param {Number} nr Contains some number.
   *
   * @private
   */
  function nonNegative(nr) {
    if (nr < 0) {
      throw new TypeError(`${String(nr)} is not a valid natural number.`);
    }
  }

  return {
    DAYS_IN_YEAR,
    MAX_ALLOWED_TIME,
    MINS_IN_DAY,
    MINS_IN_HOUR,
    MINS_IN_MONTH,
    MINS_IN_YEAR,
    MS_IN_DAY,
    MS_IN_HOUR,
    MS_IN_MINUTE,
    MS_IN_SECOND,
    MS_IN_WEEK,
    SECS_IN_DAY,
    SECS_IN_MONTH,
    SECS_IN_WEEK,
    SECS_IN_YEAR,
    addDays,
    addMilliseconds,
    addMinutes,
    addMonths,
    addSeconds,
    addWeeks,
    addYears,
    atStartOfDay,
    clone,
    compare,
    dateOnly,
    daysDifference,
    daysOfMonth,
    equals,
    getTimezoneOffset,
    getUTC,
    hoursDifference,
    isAfter,
    isBefore,
    isBetween,
    isDate,
    isFuture,
    isISOString,
    isValid,
    millisecondsDifference,
    minutesDifference,
    monthsDifference,
    now,
    parse,
    parseISO,
    removeDays,
    timeDifference,
    toLocalDate,
    utcNow,
    yearsDifference,
  }
})();

var Maps = (function () {
  /**
   * Checks whether the given map is empty.
   *
   * @param {Map} map Contains some map.
   * @return {Boolean} whether the given map is empty.
   */
  function isEmpty(map) {
    return map.size === 0;
  }
  /**
   * Checks whether the given value is a map.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a map.
   */
  function isMap(value) {
    return value instanceof Map;
  }
  /**
   * Checks whether the given map is not empty.
   *
   * @param {Map} map Contains some map.
   * @return {Boolean} whether the given map is not empty.
   */
  function isNotEmpty(map) {
    return map.size !== 0;
  }
  /**
   * Checks whether the specified value is of type `WeakMap`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is of type `WeakMap`.
   */
  function isWeakMap(value) {
    return Object.prototype.toString.call(value) === '[object WeakMap]';
  }
  /**
   * Converts a map to an object.
   *
   * @param {Map} map Contains some map.
   * @return {Object} the object whose property keys and values are the
   * key-value pairs of the map.
   */
  function toObject(map) {
    const o = {};
    map.forEach((value, key) => {
      o[key] = value;
    });
    return o;
  }
  /**
   * Converts a map to a set.
   *
   * @param {Map} map Contains some map.
   * @return {Set} a set.
   */
  function toSet(map) {
    const result = new Set();
    map.forEach((item) => result.add(item));
    return result;
  }

  return {
    isEmpty,
    isMap,
    isNotEmpty,
    isWeakMap,
    toObject,
    toSet,
  }
})();

var Numbers = (function () {
  /**
   * Gets the absolute value of the given number.
   *
   * @param {Number} num Contains some number.
   * @return {Number} the absolute value of the given number.
   */
  function abs(num) {
    let abs = num;
    if (abs < 0) {
      abs *= -1;
    }
    return abs;
  }
  /**
   * Compares two numbers. Useful for array sorting.
   *
   * @param {Number} a Contains some number.
   * @param {Number} b Contains some other number.
   * @return {Number}
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  function compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }
  /**
   * Checks whether the given value is a positive integer.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an integer.
   */
  function isInteger(value) {
    return Numbers.isNumber(value) && Number.isSafeInteger(value);
  }
  /**
   * Checks whether the given value is greater than or equal 0.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a natural number
   * i. e. greater than or equal 0.
   */
  function isNatural(value) {
    return Numbers.isInteger(value) && value >= 0;
  }
  /**
   * Checks whether the specified value equals `NaN`.
   *
   * @param {*} value
   * @return {Boolean} whether the specified value is not a number.
   */
  function isNotNumber(value) {
    return (typeof value === 'number' && Number.isNaN(value)) ||
      (Numbers.isNumberObject(value) && Number.isNaN(value.valueOf()));
  }
  /**
   * Checks whether the given value is a number.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a number.
   */
  function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }
  /**
   * Checks whether the specified value is an instance of the `Number`
   * object.
   *
   * **Usage Examples:**
   * ```typescript
   * Numbers.isNumberObject(); // false
   * Numbers.isNumberObject(5); // false
   * Numbers.isNumberObject("44"); // false
   * Numbers.isNumberObject(new Number(12)); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an instance
   * of the `Number` object.
   */
  function isNumberObject(value) {
    return Objects.isObject(value) &&
      Objects.toString(value) === '[object Number]';
  }
  /**
   * Checks whether the given value is a positive integer.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a positive integer.
   */
  function isPositiveInteger(value) {
    return Numbers.isInteger(value) && value > 0;
  }
  /**
   * Checks whether the specified number is a prime number.
   *
   * @param {Number} num Contains some number.
   * @return {Boolean} whether the specified number is a prime number.
   */
  function isPrime(num) {
    let i = 2;
    const s = Math.sqrt(num);
    for (; i <= s; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  }
  /**
   * Pads the specified number.
   *
   * @param {Number} num Contains some number.
   * @return {String} a string.
   */
  function pad(num) {
    return num < 10 ? '0' + num.toString(10) : num.toString(10);
  }
  /**
   * Get a random integer in the specified range.
   *
   * @param {Number} min Contains the minimum for the random integer.
   * @param {Number} max Contains the maximum for the random integer.
   * @param {Boolean} incl Contains whether to include `min` and `max`.
   * Defaults to `false`;
   * @return {Number} a random integer in the specified range.
   */
  function randomInt(min, max, incl) {
    if (min >= max) {
      throw new Error('Invalid arguments min and max.');
    }
    incl !== null && incl !== void 0 ? incl : (incl = false);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - (incl ? min + 1 : min)) + min);
  }
  /**
   * Converts the specified number to string.
   *
   * **Usage Examples:**
   * ```typescript
   * Numbers.toString(123); // "123"
   * Numbers.toString(12.3); // "12.3"
   * ```
   *
   * @param {Number} num Contains some number.
   * @return {String} a string.
   */
  function toString(num) {
    return '' + num;
  }

  return {
    abs,
    compare,
    isInteger,
    isNatural,
    isNotNumber,
    isNumber,
    isNumberObject,
    isPositiveInteger,
    isPrime,
    pad,
    randomInt,
    toString,
  }
})();

var Objects = (function () {
  /**
   * Contains an empty object.
   */
  const EMPTY = {};

  /**
   * Gets the object entries.
   *
   * @param {Object} obj Contains some object.
   *
   * @private
   */
  function* __entries(obj) {
    let i = 0;
    const es = Object.entries(obj);
    for (; i < es.length; i++) {
      yield [es[i][0], es[i][1]];
    }
  }

  /**
   * Checks whether the specified objects deep equal.
   *
   * **Usage Examples:**
   * ```typescript
   * const o1 = {a: '55', b: 4, c: false};
   * const o2 = {c: false, a: '55', b: 4};
   *
   * console.log(Objects.deepEqual(o1, o2)); // true
   * ```
   *
   * @param {Object} o1 Contains some object.
   * @param {Object} o2 Contains some other object.
   * @return {Boolean} whether the specified objects deep equal.
   *
   * **Note:** According to ES3
   */
  function deepEquals(o1, o2) {
    if (equals(o1, o2)) {
      return true;
    }
    if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
      return false;
    }
    if (o1.constructor !== o2.constructor) {
      return false;
    }
    // intentional dec. with "var" for access out of the "for" block
    // eslint-disable-next-line no-var
    for (var p in o1) {
      if (!hasProperty(o1, p)) {
        continue;
      }
      if (!hasProperty(o2, p)) {
        return false;
      }
      if (o1[p] === o2[p]) {
        continue;
      }
      if (isObject(o1[p]) === false ||
        deepEquals(o1[p], o2[p]) === false) {
        return false;
      }
    }
    for (p in o2) {
      if (hasProperty(o2, p) && !hasProperty(o1, p)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Gets the object entries.
   *
   * @param {Object} obj Contains some object.
   * @return {Iterator} the object entries as an array of key-value pair tuples.
   */
  function entries(obj) {
    return __entries(obj);
  }
  /**
   * Checks whether the two specified objects strictly equal.
   *
   * **Usage Examples:**
   * ```typescript
   * const obj1 = {
   *   a: 'string',
   *   b: false,
   *   c: 44,
   * };
   * const obj2 = obj1;
   * console.log(Objects.equals(obj1, obj2)); // true
   * ```
   *
   * @param {Object} a Contains some object.
   * @param {Object} b Contains some other object.
   * @return {Boolean} whether the two specified objects strictly equal.
   */
  function equals(a, b) {
    return a === b;
  }
  /**
   * Deserializes a JSON string i. e. parses it as an object.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.fromJson("{}"); // {}
   * Objects.fromJson('{"a":true}'); // {a: true}
   * Objects.fromJson('{"a":2,"b":"abc"}'); // {a: 2, b: "abc"}
   * ```
   *
   * @param {String} json Contains some JSON string.
   * @return {T} a JavaScript value equivalent to the JSON string.
   */
  function fromJson(json) {
    return JSON.parse(json);
  }
  /**
   * Gets the property descriptors of the specified object.
   *
   * @param {Object} obj Contains some object.
   * @return {PropertyDescriptors} the property descriptors of the specified
   * object.
   */
  function getPropertyDescriptors(obj) {
    if (hasProperty(Object, 'getOwnPropertyDescriptors') &&
      Utils.isFunction(Object.getOwnPropertyDescriptors)) {
      return Object.getOwnPropertyDescriptors(obj);
    }
    const descriptors = {};
    Object.keys(obj).forEach((key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
    });
    return descriptors;
  }
  /**
   * Checks whether the given object has a property with the given name.
   *
   * @param {Object} obj Contains some object.
   * @param {String} key Contains some key.
   * @return {Boolean} whether the given object has a property with the
   * given key.
   */
  function hasProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  /**
   * Checks whether the given object is empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is empty.
   */
  function isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0;
  }
  /**
   * Checks whether the given object is not empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not empty.
   */
  function isNotEmpty(obj) {
    return isEmpty(obj) === false;
  }
  /**
   * Checks whether the given object is not null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not null.
   */
  function isNotNull(obj) {
    return Utils.isNotNil(obj);
  }
  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  function isNull(obj) {
    return Utils.isNull(obj);
  }
  /**
   * Checks whether the given value is an object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an object.
   */
  function isObject(value) {
    return typeof value === 'object' && value !== null;
  }
  /**
   * Checks whether the specified value is a plain object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a plain object.
   */
  function isPlainObject(value) {
    if (isObject(value) &&
      toString(value) === '[object Object]') {
      const Ctor = value.constructor;
      if (Utils.isFunction(Ctor)) {
        const proto = Ctor.prototype;
        return isObject(proto) &&
          toString(proto) === '[object Object]' &&
          proto.hasOwnProperty('isPrototypeOf');
      }
    }
    return false;
  }
  /**
   * Omits the object properties with the given keys.
   *
   * @param {Object} obj Contains some object.
   * @param {Array} keys Contains the keys of the object properties to
   * be omitted.
   * @return {Object} a truncated object.
   */
  function omit(obj, ...keys) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (!(keys.includes(key))) {
        result[key] = value;
      }
    });
    return result;
  }
  /**
   * Picks the properties of the given object with the given keys.
   *
   * @param {Object} obj Contains some object.
   * @param {Array} keys Contains the keys of the object properties
   * to be picked.
   * @return {Boolean} the truncated object.
   */
  function pick(obj, ...keys) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (keys.includes(key)) {
        result[key] = value;
      }
    });
    return result;
  }
  /**
   * Makes the specified object iterable.
   *
   * @param {Object} obj Contains some object.
   * @return {Object} an iterable object.
   */
  function toIterable(obj) {
    return Object.assign(Object.assign({}, obj), {
      *[Symbol.iterator]() {
        yield* Object.entries(obj);
      }
    });
  }
  /**
   * Serializes the specified object i. e. converts it to a JSON string.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.toJson({}); // "{}"
   * Objects.toJson({a: true}); // "{"a":true}"
   * Objects.toJson({a: 2, b: "abc"}); // "{"a":2,"b":"abc"}"
   * ```
   *
   * @param {Object} obj Contains some object.
   * @return {String} the JSON string.
   */
  function toJson(obj) {
    let cache = new WeakSet();
    const json = JSON.stringify(obj, (_, v) => isObject(v) ?
      cache.has(v) ?
        undefined : // circular object reference detected
        cache.add(v) && v : // Store v in our collection
      v);
    cache = null;
    return json;
  }
  /**
   * Converts an object to a map.
   *
   * @param {Object} obj Contains some object.
   * @return {Map} a map whose keys are the object property keys and
   * values are their values.
   */
  function toMap(obj) {
    const e = entries(obj);
    return new Map(e);
  }
  /**
   * Converts an object to a set.
   *
   * @param {Object} obj Contains some object.
   * @return {Set} a set composed of the object values.
   */
  function toSet(obj) {
    const values = Object.values(obj);
    return new Set(values);
  }
  /**
   * Gets the string representation of the specified object.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.toString(); // "[object Undefined]"
   * Objects.toString({}); // "[object Object]"
   * Objects.toString(["a"]); // "[object Array]"
   * Objects.toString(12345); // "[object Number]"
   * ```
   *
   * @param {*} obj Contains some object.
   * @return {String} the string representation of the specified object.
   */
  function toString(obj) {
    return Object.prototype.toString.call(obj);
  }

  return {
    EMPTY,
    deepEquals,
    entries,
    equals,
    fromJson,
    getPropertyDescriptors,
    hasProperty,
    isEmpty,
    isNotEmpty,
    isNotNull,
    isNull,
    isObject,
    isPlainObject,
    omit,
    pick,
    toIterable,
    toJson,
    toMap,
    toSet,
    toString,
  }
})();

var Sets = (function () {
  /**
   * Checks whether the given set is empty.
   *
   * @param {Set} value Contains some set.
   * @return {Boolean} whether the given set is empty.
   */
  function isEmpty(value) {
    return value.size === 0;
  }
  /**
   * Checks whether the given set is not emtpy.
   *
   * @param {Set} value Contains some set.
   * @return {Boolean} whether the given set is not emtpy.
   */
  function isNotEmpty(value) {
    return value.size !== 0;
  }
  /**
   * Checks whether the given value is a set.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a set.
   */
  function isSet(value) {
    return value instanceof Set;
  }
  /**
   * Checks whether the given value is of type `WeakSet`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of type `WeakSet`.
   */
  function isWeakSet(value) {
    return Objects.toString(value) === '[object WeakSet]';
  }
  /**
   * Converts a set to a map.
   *
   * @param {Set} value Contains some set.
   * @return {Map} a map whose keys are the indexes of each set value
   * and the respective values are the set items.
   */
  function toMap(value) {
    let i = 0;
    const map = new Map();
    value.forEach((item) => {
      map.set(i, item);
      i++;
    });
    return map;
  }

  return {
    isEmpty,
    isNotEmpty,
    isSet,
    isWeakSet,
    toMap,
  }
})();

var Strings = (function () {
  /**
   * Contains an empty string.
   */
  const EMPTY = '';
  /**
   * Gets the index returned when some sequence is not found in some
   * string.
   *
   * @private
   */
  const NOT_FOUND = -1;

  /**
   * Abbreviates the specified string to the given number of characters.
   * The rest of characters are replaced by some user-defined marker string
   * or the default marker i. e. ellipsis "...".
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.abbreviate("", 2); // ""
   * Strings.abbreviate("a", 1); // "a"
   * Strings.abbreviate("abc", 2); // "ab..."
   * Strings.abbreviate("caterpillar", 3); // "cat..."
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} maxLength Contains the maximal number of characters to
   * show from the specified string.
   * @param {String} marker Contains the abbreviation marker. Defaults to
   * ellipsis `"..."`.
   * @return {String} the abbreviated string.
   */
  function abbreviate(str, maxLength, marker = '...') {
    const length = str.length;
    if (length === 0) {
      return str;
    }
    if (length <= maxLength || !Numbers.isNatural(maxLength)) {
      return str;
    }
    return str.slice(0, maxLength) + marker;
  }
  /**
   * Appends the specified suffix to the given string if the given string
   * doesn't end with it.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.appendIfMissing("", ""); // ""
   * Strings.appendIfMissing("abc", "def"); // "abcdef"
   * Strings.appendIfMissing("abcdef", "DeF", true); // "abcdef"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} suffix Contains the string suffix to be appended to the
   * string if it is missing at the end of it.
   * @param {Boolean} ignoreCase Contains whether to ignore string case
   * sensitivity. Defaults to `false`.
   * @return {String} a string.
   */
  function appendIfMissing(str, suffix, ignoreCase = false) {
    if (isNilOrEmpty(suffix) || endsWith(str, suffix, ignoreCase)) {
      return str;
    }
    return str + suffix.toString();
  }
  /**
   * Removes a newline from the end of the specified string if there
   * is such one.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.chomp(''); // ""
   * Strings.chomp('\n'); // ""
   * Strings.chomp('abc \r'); // "abc "
   * Strings.chomp('abc\r\n'); // "abc"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the chomped string.
   */
  function chomp(str) {
    const length = str.length;
    if (length === 0) {
      return str;
    }
    if (length === 1) {
      if ([Chars.CR, Chars.LF].includes(str.charAt(0))) {
        return EMPTY;
      }
      return str;
    }
    let end = length - 1;
    const lastChar = str.charAt(end);
    if (lastChar === Chars.LF) {
      if (str.charAt(end - 1) === Chars.CR) {
        end--;
      }
    }
    else if (lastChar !== Chars.CR) {
      end++;
    }
    return str.substring(0, end);
  }
  /**
   * Removes the last character from the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.chop(''); // ""
   * Strings.chop('\n\r'); // "\n"
   * Strings.chop('abc \r'); // "abc "
   * Strings.chop('Germany'); // "German"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the string without its last character.
   */
  function chop(str) {
    const l = str.length;
    if (l <= 1) {
      return EMPTY;
    }
    const end = l - 1, r = str.substring(0, end);
    if (str.charAt(end) === Chars.LF) {
      if (r.charAt(end - 1) === Chars.CR) {
        return r.substring(0, end - 1);
      }
    }
    return r;
  }
  /**
   * Compares two strings.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Number}
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  function compare(a, b) {
    return a.localeCompare(b);
  }
  /**
   * Compares two strings by ignoring case sensitivity.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Number}
   * * `-1` if `a` is smaller than `b` (case-insensitive).
   * * `0`  if `a` equals `b` (case-insensitive).
   * * `1`  if `a` is greater than `b` (case-insensitive).
   */
  function compareIgnoreCase(a, b) {
    return compare(a.toLowerCase(), b.toLowerCase());
  }
  /**
   * Contains whether the specified string contains the given substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.contains("", ""); // true
   * Strings.contains(" ", ""); // true
   * Strings.contains("abc", "bc"); // true
   * Strings.contains("abc", "BC"); // false
   * Strings.contains("aBc", "bC", true); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some string substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the specified string contains the specified
   * substring.
   */
  function contains(str, substring, ignoreCase = false) {
    if (ignoreCase) {
      const subLow = substring.toLowerCase();
      return str.toLowerCase().indexOf(subLow) !== NOT_FOUND;
    }
    return str.indexOf(substring) !== NOT_FOUND;
  }
  /**
   * Checks whether the specified string contains either of the given
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.containsAny(""); // false
   * Strings.containsAny("", ""); // true
   * Strings.containsAny("ab", "cd", "ab", "ef"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the given string contains either of the
   * given substrings.
   */
  function containsAny(str, ...substrings) {
    let j = substrings.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        if (contains(str, substrings[i]) || contains(str, substrings[j])) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }
  /**
   * Checks whether the specified string contains the specified substring by
   * ignoring case sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.containsIgnoreCase("", ""); // true
   * Strings.containsIgnoreCase("\n\n", ""); // true
   * Strings.containsIgnoreCase("abc def", "EF"); // true
   * Strings.containsIgnoreCase("abc", "de"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Boolean} whether the specified string contains the specified
   * substring by ignoring case sensitivity.
   */
  function containsIgnoreCase(str, substring) {
    return contains(str, substring, true);
  }
  /**
   * Checks whether the specified string contains none of the specified
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.containsNone("abc"); // true
   * Strings.containsNone("", "de", "bc"); // true
   * Strings.containsNone("abc", "de", "bc"); // false
   * Strings.containsNone("abc", "de", "fg"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string contains none of the given
   * substrings.
   */
  function containsNone(str, ...substrings) {
    let j = substrings.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        if (contains(str, substrings[i]) || contains(str, substrings[j])) {
          return false;
        }
        i++;
        j--;
      }
    }
    return true;
  }
  /**
   * Gets the number of times the specified substring appears in the
   * specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.countMatches("", ""); // 0
   * Strings.countMatches("", "ho"); // 0
   * Strings.countMatches("ho", ""); // 0
   * Strings.countMatches("ho ho ho", "ho"); // 3
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the number of times the specified substring appears
   * in the specified string.
   */
  function countMatches(str, substring) {
    let i = 0, r = 0;
    const l = str.length, sl = substring.length;
    if (l === 0 || sl === 0 || sl > l) {
      return r;
    }
    if (l === sl) {
      return str === substring ? 1 : 0;
    }
    while (i < l) {
      if (str.charAt(i) === substring.charAt(0) && sl <= l - i &&
        str.substring(i, i + sl) === substring) {
        r++;
      }
      i++;
    }
    return r;
  }
  /**
   * Decapitalizes the specified string if it begins with a capital letter.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.decapitalize(""); // ""
   * Strings.decapitalize("\n"); // "\n"
   * Strings.decapitalize("Abc"); // "abc"
   * Strings.decapitalize("ABC"); // "aBC"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the decapitalized string.
   */
  function decapitalize(str) {
    return isEmpty(str) ? EMPTY : str.charAt(0).toLowerCase() + str.slice(1);
  }
  /**
   * Decodes a string encoded using Base64.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.decode("27Hbstuz"); // "۱۲۳"
   * Strings.decode("2aMgaXMgMyBpbiBBcmFiaWM="); // "٣ is 3 in Arabic"
   * Strings.decode("VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu");
   * //= "The ⅱ-nd Century B. C."
   * ```
   *
   * @param {String} base64 Contains a Base64-encoded string.
   * @return {String} the decoded string.
   */
  function decode(base64) {
    const esc = base64.replace(/[^A-Za-z0-9+/]/g, ''), // escape non-Base64 char
      l = esc.length, length = (l * 3 + 1) >> 2, bytes = new Uint8Array(length);
    let mod3, mod4, u24 = 0, i = 0, j = 0, c, u6;
    while (i < l) {
      mod4 = i & 3;
      c = esc.charCodeAt(i);
      u6 = c > 64 && c < 91 ? c - 65 : c > 96 && c < 123 ? c - 71 :
        c > 47 && c < 58 ? c + 4 : c === 43 ? 62 : c === 47 ? 63 : 0;
      u24 |= u6 << (6 * (3 - mod4));
      if (mod4 === 3 || l - i === 1) {
        mod3 = 0;
        while (mod3 < 3 && j < length) {
          bytes[j] = (u24 >>> ((16 >>> mod3) & 24)) & 255;
          mod3++;
          j++;
        }
        u24 = 0;
      }
      i++;
    }
    return fromBytesArray(bytes);
  }
  /**
   * Returns the default string if the specified string is empty.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.defaultIfEmpty("", ""); // ""
   * Strings.defaultIfEmpty("", " "); // " "
   * Strings.defaultIfEmpty("", "--"); // "--"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} defaultStr Contains some default string.
   * @return {String} the default string if the specified string is empty.
   */
  function defaultIfEmpty(str, defaultStr) {
    return isEmpty(str) ? defaultStr : str;
  }
  /**
   * Gets the part of the second string which is not contained in the
   * first string or vice-versa.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.difference("abc", "abc"); // ""
   * Strings.difference("abc ", "abc"); // " "
   * Strings.difference("abc", "abc def"); // " def"
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {String} the part of the second string which is not contained
   * in the first string or vice-versa.
   */
  function difference(str1, str2) {
    const diffIndex = indexOfDifference(str1, str2);
    if (diffIndex === NOT_FOUND) {
      return EMPTY;
    }
    if (str1.length > str2.length) {
      return str1.substring(diffIndex);
    }
    else {
      return str2.substring(diffIndex);
    }
  }
  /**
   * Encodes the specified string using Base64 encoding.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.encode("\u06f1\u06f2\u06f3"); // "27Hbstuz"
   * Strings.encode("\u0663 is 3 in Arabic"); // "2aMgaXMgMyBpbiBBcmFiaWM="
   * Strings.encode("The \u2171-nd Century B. C.");
   * //= "VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu"
   * ```
   *
   * @param {String} str Contains the string to be encoded.
   * @param {Boolean} lineBreak Contains whether to break the base64 string
   * into lines of at most 80 characters.
   * @return {String} the encoded string.
   */
  function encode(str, lineBreak = false) {
    let i = 0, mod3 = 2, encoded = '', u24 = 0;
    const bytes = toBytesArray(str), l = bytes.length, $ = (u6) => u6 < 26
      ? u6 + 65
      : u6 < 52
      ? u6 + 71
      : u6 < 62
      ? u6 - 4
      : u6 === 62
      ? 43
      : u6 === 63
      ? 47
      : 65;
    while (i < l) {
      mod3 = i % 3;
      if (lineBreak && i > 0 && ((i * 4) / 3) % 76 === 0) {
        encoded += '\r\n';
      }
      u24 |= bytes[i] << ((16 >>> mod3) & 24);
      if (mod3 === 2 || bytes.length - i === 1) {
        encoded += String.fromCodePoint($((u24 >>> 18) & 63), $((u24 >>> 12) & 63), $((u24 >>> 6) & 63), $(u24 & 63));
        u24 = 0;
      }
      i++;
    }
    const e = mod3 === 2 ? '' : mod3 === 1 ? '=' : '==';
    return encoded.substring(0, encoded.length - 2 + mod3).concat(e);
  }
  /**
   * Checks whether the specified string ends with the given substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.endsWith("", "ab"); // false
   * Strings.endsWith("abc", "c"); // true
   * Strings.endsWith("abc de", "DE", true); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the specified string ends with the given
   * substring.
   */
  function endsWith(str, substring, ignoreCase) {
    ignoreCase ??= false;
    if (ignoreCase) {
      return str.toLowerCase().endsWith(substring.toLowerCase());
    }
    return str.endsWith(substring);
  }
  /**
   * Checks whether the specified string ends with either of the specified
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.endsWithAny(""); // false
   * Strings.endsWithAny("abc"); // false
   * Strings.endsWithAny("abc", ""); // true
   * Strings.endsWithAny("abc def", "f"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} the specified string ends with either of the specified
   * substrings.
   */
  function endsWithAny(str, ...substrings) {
    if (Arrays.isNotEmpty(substrings)) {
      let i = 0, j = substrings.length - 1;
      while (i <= j) {
        if (str.endsWith(substrings[i++]) || str.endsWith(substrings[j--])) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Checks whether the specified string ends with the specified substring
   * by ignoring case-sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.endsWithIgnoreCase("", ""); // true
   * Strings.endsWithIgnoreCase("abc", ""); // true
   * Strings.endsWithIgnoreCase("", "abc"); // false
   * Strings.endsWithIgnoreCase("abc", "bC"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Boolean} whether the specified string ends with the specified
   * substring by ignoring case-sensitivity.
   */
  function endsWithIgnoreCase(str, substring) {
    return endsWith(str, substring, true);
  }
  /**
   * Checks whether the specified string ends with neither of the specified
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.endsWithNone(""); // false
   * Strings.endsWithNone("", "abc"); // true
   * Strings.endsWithNone("abc", ""); // false
   * Strings.endsWithNone("abc", "d", "e", "f"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some string sequences.
   * @return {Boolean} whether the specified string ends with neither of the
   * specified substrings.
   */
  function endsWithNone(str, ...substrings) {
    if (Arrays.isEmpty(substrings)) {
      return false;
    }
    let i = 0, j = substrings.length - 1;
    while (i <= j) {
      if (str.endsWith(substrings[i++]) || str.endsWith(substrings[j--])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the specified strings equal.
   */
  function equals(a, b) {
    const value1 = isStringObject(a) ? a.valueOf() : a, value2 = isStringObject(b) ? b.valueOf() : b;
    return value1 === value2;
  }
  /**
   * Checks whether the two specified strings equal by ignoring case
   * sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.equalsIgnoreCase("", ""); // true
   * Strings.equalsIgnoreCase("abc", "aBC"); // true
   * Strings.equalsIgnoreCase("abc", "Ab"); // false
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Boolean} whether the two specified strings equal by ignoring
   * case-sensitivity.
   */
  function equalsIgnoreCase(str1, str2) {
    if (str1 !== str2) {
      let l = str1.length;
      if (l !== str2.length) {
        return false;
      }
      let i = 0;
      while (i <= l - 1) {
        if (str1.charAt(i).toLowerCase() !== str2.charAt(i).toLowerCase() ||
          str1.charAt(l).toLowerCase() !== str2.charAt(l).toLowerCase()) {
          return false;
        }
        i++;
        l--;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified string equals any of the specified substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.equalsAny(""); // false
   * Strings.equalsAny("", ""); // true
   * Strings.equalsAny("abc", "ghi"); // false
   * Strings.equalsAny("abc", "def", "abc", "mno"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string equals any of the specified
   * substrings.
   */
  function equalsAny(str, ...substrings) {
    if (substrings.length > 0) {
      let i = 0, j = substrings.length - 1;
      while (i <= j) {
        if (str === substrings[i++] || str === substrings[j--]) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Checks whether the specified string equals either of the specified
   * substrings by ignoring case-sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.equalsAnyIgnoreCase(""); // false
   * Strings.equalsAnyIgnoreCase("", ""); // true
   * Strings.equalsAnyIgnoreCase("abc", "ghi"); // false
   * Strings.equalsAnyIgnoreCase("abc", "def", "ABc", "mno"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string equals either of the
   * specified substrings by ignoring case-sensitivity.
   */
  function equalsAnyIgnoreCase(str, ...substrings) {
    const lowerStr = str.toLowerCase();
    if (substrings.length > 0) {
      let i = 0, j = substrings.length - 1;
      while (i <= j) {
        if (lowerStr === substrings[i++].toLowerCase() ||
          lowerStr === substrings[j--].toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Converts a binary string to Unicode in case it has previously
   * contained Unicode.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.fromBinary(Strings.decode('PsOYFMOdIAA9w5hDw54=')); // "🤔 🙃"
   * ```
   *
   * @param {String} binaryStr Contains some binary string.
   * @return {String} a string which might contain Unicode.
   */
  function fromBinary(binaryStr) {
    const length = binaryStr.length;
    if (length === 0) {
      return binaryStr;
    }
    const ccs = new Uint16Array(Uint8Array
      .from({ length }, (_, i) => binaryStr.charCodeAt(i))
      .buffer);
    let r = EMPTY;
    ccs.forEach((char) => {
      r += String.fromCharCode(char);
    });
    return r;
  }
  /**
   * Converts an UTF-8 encoded bytes array to string.
   *
   * @param {Uint8Array} bytes Contains the UTF-8 encoded bytes array.
   * @return {String} a Base64-encoded string.
   */
  function fromBytesArray(bytes) {
    let i = 0, s = EMPTY, b;
    const l = bytes.length;
    for (; i < l; i++) {
      b = bytes[i];
      s += String.fromCodePoint(b > 251 && b < 254 && i + 5 < l ?
        (b - 252) * 1073741824 + ((bytes[++i] - 128) << 24) +
        ((bytes[++i] - 128) << 18) + ((bytes[++i] - 128) << 12) +
        ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
        b > 247 && b < 252 && i + 4 < l ?
          ((b - 248) << 24) +
          ((bytes[++i] - 128) << 18) + ((bytes[++i] - 128) << 12) +
          ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
          b > 239 && b < 248 && i + 3 < l ?
            ((b - 240) << 18) + ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
            b > 223 && b < 240 && i + 2 < l ? ((b - 224) << 12) +
              ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
              b > 191 && b < 224 && i + 1 < l ?
                ((b - 192) << 6) + bytes[++i] - 128 : b);
    }
    return s;
  }
  /**
   * Gets the string bytes.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.getBytes(""); // 0
   * Strings.getBytes("abc"); // 3
   * Strings.getBytes("🤔 🙃"); // 9
   * Strings.getBytes("🤔 abc"); 8
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Number} the string bytes.
   */
  function getBytes(str) {
    const l = str.length;
    let i = 0, c = 0, p, n;
    for (; i < l; i++) {
      p = str.charCodeAt(i);
      if (p >= 0xD800 && p < 0xE000 && p < 0xDC00 && i + 1 < l) {
        n = str.charCodeAt(i + 1);
        if (n >= 0xDC00 && n < 0xE000) {
          c += 4;
          i++;
        }
      }
      else {
        c += (p < 0x80 ? 1 : (p < 0x800 ? 2 : 3));
      }
    }
    return c;
  }
  /**
   * Gets the hash code of the specified string.
   *
   * @param {String} str Contains some string.
   * @return {Number} the hash code.
   */
  function hashCode(str) {
    let i = 0, hash = 0, charCode;
    const length = str.length;
    for (; i < length;) {
      charCode = str.charCodeAt(i++);
      hash = (hash << 5) - hash + charCode;
      // convert the hash to a 32-bit integer
      hash |= 0;
    }
    return hash;
  }
  /**
   * Checks whether the given string has whitespaces.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.hasWhitespace("Lorem"); // false
   * Strings.hasWhitespace("Lor em"); // true
   * Strings.hasWhitespace("Lorem\n"); // true
   * Strings.hasWhitespace("Lorem\r"); // true
   * Strings.hasWhitespace("Lorem\t"); // true
   * Strings.hasWhitespace("Lorem\f"); // true
   * Strings.hasWhitespace(""); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string has whitespaces.
   */
  function hasWhitespace(str) {
    if (isNotEmpty(str)) {
      const l = str.length;
      let c;
      if (l === 1) {
        c = str.charAt(0);
        if (Chars.isWhitespace(c)) {
          return true;
        }
      }
      let i = 0, j = l - 1;
      while (i <= j) {
        if (Chars.isWhitespace(str.charAt(i)) ||
          Chars.isWhitespace(str.charAt(j))) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }
  /**
   * Gets the first index of any of the specified substrings in the
   * specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.indexOfAny(""); // -1
   * Strings.indexOfAny("abc"); // -1
   * Strings.indexOfAny("abc", ""); // 0
   * Strings.indexOfAny("abcde", "de"); // 3
   * Strings.indexOfAny("abcde", "fgh", "cde"); // 2
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Number} the first index of any of the specified substrings
   * in the specified string.
   */
  function indexOfAny(str, ...substrings) {
    const l = substrings.length;
    if (l > 0) {
      let i = 0, idx;
      while (i < l) {
        idx = str.indexOf(substrings[i++]);
        if (idx >= 0) {
          return idx;
        }
      }
    }
    return NOT_FOUND;
  }
  /**
   * Gets the first index at which the characters of both strings begin
   * to differ. If both strings are equal, the method returns -1.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.indexOfDifference("", ""); // -1
   * Strings.indexOfDifference("", "a"); // 0
   * Strings.indexOfDifference("a", ""); // 0
   * Strings.indexOfDifference("abcde", "abc"); // 3
   * Strings.indexOfDifference("abc", "abcde"); // 3
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Number} the index at which the characters of both strings
   * begin to differ.
   */
  function indexOfDifference(str1, str2) {
    if (str1 !== str2) {
      let i = 0;
      const l1 = str1.length, l2 = str2.length;
      for (; i < l1 && i < l2; ++i) {
        if (str1.charAt(i) !== str2.charAt(i)) {
          break;
        }
      }
      if (i < l2 || i < l1) {
        return i;
      }
    }
    return NOT_FOUND;
  }
  /**
   * Gets the first index of the specified substring in the given string.
   * This method is case-insensitive. If the specified substring is not
   * contained in the given string, -1 is returned.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.indexOfIgnoreCase("", ""); // 0
   * Strings.indexOfIgnoreCase("abc", ""); // 0
   * Strings.indexOfIgnoreCase("abcde", "DE"); // 3
   * Strings.indexOfIgnoreCase("abcde", "cde"); // 2
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the index of the specified substring in the given
   * string.
   */
  function indexOfIgnoreCase(str, sequence) {
    return str.toLowerCase().indexOf(sequence.toLowerCase());
  }
  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAllBlank(''); // true
   * Strings.isAllBlank(' '); // true
   * Strings.isAllBlank('\n'); // true
   * Strings.isAllBlank('\t'); // true
   * Strings.isAllBlank('\r'); // true
   * Strings.isAllBlank('\f'); // true
   * Strings.isAllBlank('\f\n'); // true
   * Strings.isAllBlank('\t\r\f'); // true
   * Strings.isAllBlank('\f\t\r\n\na'); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is all blank i. e.
   * white space.
   *
   * @see `Strings.isWhitespace()`
   */
  function isAllBlank(str) {
    return isWhitespace(str);
  }
  /**
   * Checks whether the specified string contains only lowercase and
   * uppercase letters a - z and A - Z.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAlpha(''); // false
   * Strings.isAlpha('a'); // true
   * Strings.isAlpha('abc'); // true
   * Strings.isAlpha('abcDEF'); // true
   * Strings.isAlpha('abc DEF'); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string contains only lowercase
   * and uppercase letters a - z and A - Z.
   */
  function isAlpha(str) {
    let i = 0, j = str.length - 1, ci, cj;
    if (j < 0) {
      return false;
    }
    while (i <= j) {
      ci = str.charCodeAt(i++);
      cj = str.charCodeAt(j--);
      if ((!(ci > 64 && ci < 91) && !(ci > 96 && ci < 123)) ||
        (!(cj > 64 && cj < 91) && !(cj > 96 && cj < 123))) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified string is an alphanumeric string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAlphanumeric(''); // false
   * Strings.isAlphanumeric('a'); // true
   * Strings.isAlphanumeric('abc'); // true
   * Strings.isAlphanumeric('abcDEF'); // true
   * Strings.isAlphanumeric('abc DEF'); // false
   * Strings.isAlphanumeric('0123'); // true
   * Strings.isAlphanumeric('abcDEF123'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is an alphanumeric
   * string.
   */
  function isAlphanumeric(str) {
    let i = 0, j = str.length - 1;
    if (j < 0) {
      return false;
    }
    while (i <= j) {
      const ci = str.charCodeAt(i++);
      const cj = str.charCodeAt(j--);
      if ((!(ci > 47 && ci < 58) &&
        !(ci > 64 && ci < 91) &&
        !(ci > 96 && ci < 123)) ||
        (!(cj > 47 && cj < 58) &&
          !(cj > 64 && cj < 91) &&
          !(cj > 96 && cj < 123))) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether any of the specified strings is blank.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAnyBlank(); // true
   * Strings.isAnyBlank(''); // true
   * Strings.isAnyBlank('a'); // false
   * Strings.isAnyBlank('a', ''); // true
   * ```
   *
   * @param {Array} strings Contains some strings.
   * @return {Boolean} whether any of the specified strings is blank.
   */
  function isAnyBlank(...strings) {
    let i = 0, j = strings.length - 1;
    if (j >= 0) {
      while (i <= j) {
        if (isBlank(strings[i]) || isBlank(strings[j])) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }
  /**
   * Checks whether the given string is binary i. e. each character of the
   * string occupies only one byte.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isBinary('☻'); // false
   * Strings.isBinary(''); // true
   * Strings.isBinary('abc'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether each character of the string occupies only
   * one byte.
   */
  function isBinary(str) {
    return /[^\u0000-\u00ff]/.test(str) === false;
  }
  /**
   * Checks whether the specified string is empty/blank.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isBlank(""); // true
   * Strings.isBlank(" "); // false
   * Strings.isBlank("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is empty/blank.
   *
   * @see `Strings.isEmpty()`
   */
  function isBlank(str) {
    return isEmpty(str);
  }
  /**
   * Checks whether the specified string is empty/blank.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isEmpty(""); // true
   * Strings.isEmpty(" "); // false
   * Strings.isEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is empty/blank.
   *
   * @see `Strings.isBlank()`
   */
  function isEmpty(str) {
    return str === '';
  }
  /**
   * Checks whether all the characters of the specified string are
   * lowercase.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isLowerCase(""); // true
   * Strings.isLowerCase("123"); // true
   * Strings.isLowerCase("abc"); // true
   * Strings.isLowerCase("Abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether all the characters of the specified
   * string are lowercase.
   */
  function isLowerCase(str) {
    let i = 0, j = str.length - 1, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (ci !== ci.toLowerCase() || cj !== cj.toLowerCase()) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified string contains at least one uppercase
   * and one lowercase character.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isMixedCase(''); // false
   * Strings.isMixedCase(' '); // false
   * Strings.isMixedCase('abc'); // false
   * Strings.isMixedCase('Abc'); // true
   * Strings.isMixedCase('ab Cd ef'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string contains at least one
   * uppercase and one lowercase character.
   */
  function isMixedCase(str) {
    if (isWhitespace(str)) {
      return false;
    }
    let i = 0, j = str.length - 1, hasLower = false, hasUpper = false, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (Chars.isLowerCase(ci) || Chars.isLowerCase(cj)) {
        hasLower = true;
      }
      if (Chars.isUpperCase(ci) || Chars.isUpperCase(cj)) {
        hasUpper = true;
      }
      if (hasLower && hasUpper) {
        return true;
      }
    }
    return hasLower && hasUpper;
  }
  /**
   * Checks  whether the given string value is `null`, `undefined` or `""`.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNilOrEmpty(); // true
   * Strings.isNilOrEmpty(""); // true
   * Strings.isNilOrEmpty(" "); // false
   * Strings.isNilOrEmpty(null); // true
   * Strings.isNilOrEmpty(undefined); // true
   * Strings.isNilOrEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string value is `null`, `undefined`
   * or `""`.
   */
  function isNilOrEmpty(str) {
    return Utils.isNullOrUndefined(str) || isEmpty(str);
  }
  /**
   * Checks whether the given string is `null`, `undefined` or white space.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNilOrWhitespace(); // true
   * Strings.isNilOrWhitespace(""); // true
   * Strings.isNilOrWhitespace(" "); // true
   * Strings.isNilOrWhitespace("\t\r\n\f"); // true
   * Strings.isNilOrWhitespace(null); // true
   * Strings.isNilOrWhitespace(undefined); // true
   * Strings.isNilOrWhitespace("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is `null`, `undefined` or
   * white space.
   */
  function isNilOrWhitespace(str) {
    return Utils.isNullOrUndefined(str) || isWhitespace(str);
  }
  /**
   * Checks whether the specified string is not empty.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNotEmpty(""); // false
   * Strings.isNotEmpty(" "); // true
   * Strings.isNotEmpty("abc"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is not empty.
   */
  function isNotEmpty(str) {
    return !isEmpty(str);
  }
  /**
   * Checks whether the specified string is equal to `null` or `""`.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNullOrEmpty(""); // true
   * Strings.isNullOrEmpty(null); // true
   * Strings.isNullOrEmpty(" "); // false
   * Strings.isNullOrEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is equal to `null` or `""`.
   */
  function isNullOrEmpty(str) {
    return Utils.isNull(str) || isEmpty(str);
  }
  /**
   * Checks whether the specified string is equal to `null` or white space.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNullOrWhitespace(""); // true
   * Strings.isNullOrWhitespace(" "); // true
   * Strings.isNullOrWhitespace("\t\r\n\f"); // true
   * Strings.isNullOrWhitespace(null); // true
   * Strings.isNullOrWhitespace("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is equal to `null` or
   * white space.
   */
  function isNullOrWhitespace(str) {
    return Utils.isNull(str) || isWhitespace(str);
  }
  /**
   * Checks whether the specified string represents a stringified number.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isNumeric(""); // false
   * Strings.isNumeric("1e3"); // true
   * Strings.isNumeric("-0"); // true
   * Strings.isNumeric("123"); // true
   * Strings.isNumeric("\u0663\u0664"); // true
   * Strings.isNumeric("\u0663 \u0664"); // false
   * Strings.isNumeric("\u0664"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string represents a stringified
   * number.
   */
  function isNumeric(str) {
    let i = 0, j = str.length - 1;
    if (j < 0) {
      return false;
    }
    if (Number.isNaN(str) || Number.isNaN(parseFloat(str))) {
      while (i <= j) {
        if (!Chars.isDigit(str.charAt(i)) || !Chars.isDigit(str.charAt(j))) {
          return false;
        }
        i++;
        j--;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified value is a string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isString(); // false
   * Strings.isString(""); // true
   * Strings.isString(" "); // true
   * Strings.isString(null); // false
   * Strings.isString(undefined); // false
   * Strings.isString({}); // false
   * Strings.isString("abc"); // true
   * ```
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the specified value is a string.
   */
  function isString(str) {
    return typeof str === 'string';
  }
  /**
   * Checks whether the specified value is a string object i. e. `String`.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isStringObject(); // false
   * Strings.isStringObject(""); // false
   * Strings.isStringObject(" "); // false
   * Strings.isStringObject(null); // false
   * Strings.isStringObject(undefined); // false
   * Strings.isStringObject({}); // false
   * Strings.isStringObject("abc"); // false
   * Strings.isStringObject(new String("abc")); // true
   * ```
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the specified value is a string object.
   */
  function isStringObject(str) {
    return Objects.isObject(str) && Objects.toString(str) === '[object String]';
  }
  /**
   * Checks whether the string character at the specified index together with
   * the next character create a surrogate pair. A surrogate pair according to
   * the [Unicode Standard](https://unicode.org/standard/standard.html) is a
   * combination of a Unicode code point from U+D800 to U+DBFF a. k. a. "high
   * surrogate" with another in range from U+DC00 to U+DFFF a. k. a. "low
   * surrogate".
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isSurrogatePair("🐑🐑🐑😀💖", 0); // true
   * Strings.isSurrogatePair("😀💖", 0); // true
   * Strings.isSurrogatePair("", 0); // false
   * Strings.isSurrogatePair("abc", 1); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character. The index
   * is zero-based i. e. begins with 0.
   * @return {Boolean} whether the string character at the specified index
   * is surrogate.
   */
  function isSurrogatePair(str, index) {
    const l = str.length;
    if (l === 0 || index < 0 || index >= l) {
      return false;
    }
    const c = str.charCodeAt(index), cpp = str.charCodeAt(index + 1);
    if (Number.isNaN(c) || Number.isNaN(cpp)) {
      return false;
    }
    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cpp && cpp <= 0xdfff;
  }
  /**
   * Checks whether all the characters of the specified string are
   * upper case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isUpperCase(""); // true
   * Strings.isUpperCase("123"); // true
   * Strings.isUpperCase("ABC"); // true
   * Strings.isUpperCase("Abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether all the characters of the specified
   * string are upper case.
   */
  function isUpperCase(str) {
    let i = 0, j = str.length - 1, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (ci !== ci.toUpperCase() || cj !== cj.toUpperCase()) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isWhitespace(""); // true
   * Strings.isWhitespace(" "); // true
   * Strings.isWhitespace("\n"); // true
   * Strings.isWhitespace("\t"); // true
   * Strings.isWhitespace("\r"); // true
   * Strings.isWhitespace("\f"); // true
   * Strings.isWhitespace("\f\n"); // true
   * Strings.isWhitespace("\f\r"); // true
   * Strings.isWhitespace("\t\r\f"); // true
   * Strings.isWhitespace("\f\t\r\n\n"); // true
   * Strings.isWhitespace("\f\t\r\n\na"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is all blank i. e.
   * white space.
   *
   * @see `Strings.isAllBlank()`
   */
  function isWhitespace(str) {
    if (isEmpty(str)) {
      return true;
    }
    const l = str.length;
    if (l === 1) {
      const c = str.charAt(0);
      if (Chars.isWhitespace(c)) {
        return true;
      }
    }
    let i = 0, j = l - 1;
    while (i <= j) {
      if (!Chars.isWhitespace(str.charAt(i++)) ||
        !Chars.isWhitespace(str.charAt(j--))) {
        return false;
      }
    }
    return true;
  }
  /**
   * Concatenates the specified string with other strings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.join("abc"); // "abc"
   * Strings.join("abc", ""); // "abc"
   * Strings.join("John", " ", "Doe"); // "John Doe"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} otherStrs Contains some other strings.
   * @return {String} a string composed of a concatenation of all the given
   * strings.
   */
  function join(str, ...otherStrs) {
    const arrLen = otherStrs.length;
    if (arrLen === 0) {
      return str;
    }
    if (arrLen === 1) {
      return str + otherStrs[0];
    }
    let i = 0, res = str;
    while (i < arrLen) {
      res += otherStrs[i++];
    }
    return res;
  }
  /**
   * Gets the last index at which the specified substring is found in the
   * specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.lastIndexOf("", ""); // 0
   * Strings.lastIndexOf("abc", ""); // 0
   * Strings.lastIndexOf("", "abc"); // -1
   * Strings.lastIndexOf("Abcddemmaxdemala", "dem"); // 10
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the last index at which the specified substring is
   * found in the specified string.
   */
  function lastIndexOf(str, substring) {
    const m = str.length, n = substring.length;
    if (n === 0) {
      return 0;
    }
    if (n <= m) {
      let i = m;
      while (i >= 0) {
        if (str.charAt(i) === substring.charAt(0) && n <= m - i &&
          str.substring(i, i + n) === substring) {
          return i;
        }
        i--;
      }
    }
    return NOT_FOUND;
  }
  /**
   * Gets the last index at which the specified substring is found in the
   * given string by ignoring case-sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.lastIndexOfIgnoreCase("", ""); // 0
   * Strings.lastIndexOfIgnoreCase("abc", ""); // 0
   * Strings.lastIndexOfIgnoreCase("", "abc"); // -1
   * Strings.lastIndexOfIgnoreCase("Abcddemmaxdemala", "DEm"); // 10
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the last index at which the specified substring is
   * located in the given string by ignoring case-sensitivity.
   */
  function lastIndexOfIgnoreCase(str, substring) {
    return lastIndexOf(str.toLowerCase(), substring.toLowerCase());
  }
  /**
   * Gets the `length` leftmost characters of the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.left("abc", 2); // "ab"
   * Strings.left("abc", 5); // "abc"
   * Strings.left("Alphabet", 5); // "Alpha"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} length Contains the number of characters to pick from the
   * beginning of the specified string.
   * @return {String} the first `length` characters of the string.
   */
  function left(str, length) {
    if (length < 0) {
      return EMPTY;
    }
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length);
  }
  /**
   * Gets the longest of the specified strings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.longest(); // ""
   * Strings.longest(""); // ""
   * Strings.longest("abc", "ab"); // "abc"
   * ```
   *
   * @param {String} strings Contains some strings.
   * @return {String} the longest of the specified strings.
   */
  function longest(...strings) {
    const l = strings.length;
    if (l === 0) {
      return EMPTY;
    }
    if (l === 1) {
      return strings[0];
    }
    if (l === 2) {
      const str0 = strings[0], str1 = strings[1];
      return str0.length > str1.length ? str0 : str1;
    }
    let i = 0, j = l - 1, r = EMPTY, si, sj;
    while (i <= j) {
      si = strings[i++];
      sj = strings[j--];
      if (si.length > r.length) {
        r = si;
      }
      if (sj.length > r.length) {
        r = sj;
      }
    }
    return r;
  }
  /**
   * Normalizes the string white spaces i. e. if there are more than one
   * consecutive white space, only one of them remains.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.normalize("  "); // ""
   * Strings.normalize("  Bye    -  bye   ! "); // "Bye - bye !"
   * Strings.normalize("  Lorem  ipsum dolor sit "); // "Lorem ipsum dolor sit"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the normalized string.
   */
  function normalize(str) {
    const l = str.length;
    if (l === 0) {
      return EMPTY;
    }
    let i = 0, r = EMPTY, c;
    for (; i < l; i++) {
      c = str.charAt(i);
      if (Chars.isWhitespace(c) && Chars.isWhitespace(str.charAt(i + 1))) {
        continue;
      }
      r += c;
    }
    return r.trim();
  }
  /**
   * Appends the specified prefix to the beginning of the given string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.prepend("a", ""); // "a"
   * Strings.prepend("", "abc"); // "abc"
   * Strings.prepend("a", "bc"); // "bca"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @return {String} a string.
   */
  function prepend(str, prefix) {
    return prefix.concat(str);
  }
  /**
   * Appends the specified prefix to the beginning of the given string in
   * case it does not begin with it.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.prependIfMissing("", "abc"); // "abc"
   * Strings.prependIfMissing("a", "bc"); // "bca"
   * Strings.prependIfMissing("a", ""); // "a"
   * Strings.prependIfMissing("abcde", "ab"); // "abcde"
   * Strings.prependIfMissing("ABcde", "ab", true); // "ABcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {String} a string.
   */
  function prependIfMissing(str, prefix, ignoreCase = false) {
    if (isEmpty(prefix) || startsWith(str, prefix, ignoreCase)) {
      return str;
    }
    return prefix.concat(str);
  }
  /**
   * Appends the specified prefix to the beginning of the string in case
   * the string does not begin with it by ignoring case-sensitivity.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.prependIfMissingIgnoreCase("", "abc"); // "abc"
   * Strings.prependIfMissingIgnoreCase("a", "bc"); // "bca"
   * Strings.prependIfMissingIgnoreCase("a", ""); // "a"
   * Strings.prependIfMissingIgnoreCase("abcde", "ab"); // "abcde"
   * Strings.prependIfMissingIgnoreCase("ABcde", "ab"); // "ABcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @return {String} the extended string.
   */
  function prependIfMissingIgnoreCase(str, prefix) {
    return prependIfMissing(str, prefix, true);
  }
  /**
   * Removes all the string parts in the specified string which match the
   * specified substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.remove("", ""); // "--"
   * Strings.remove("  ", " "); // "--"
   * Strings.remove("black", "l"); // "back"
   * Strings.remove("Ole-Ole-Ole", "Ole"); // "--"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring to be removed from
   * the given string.
   * @return {String} the string without the specified substring occurrences.
   */
  function remove(str, substring) {
    if (isEmpty(substring))
      return str;
    let i = 0, r = '';
    const m = str.length, n = substring.length;
    while (i < m) {
      if (str.substring(i, i + n) === substring) {
        i += n - 1;
      }
      else {
        r += str.charAt(i);
      }
      i++;
    }
    return r;
  }
  /**
   * Removes the specified substring from the given string if the string
   * ends with it; otherwise simply returns the given string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.removeEnd("", "abc"); // ""
   * Strings.removeEnd("abc", ""); // "abc"
   * Strings.removeEnd("abcdefgh", "fgh"); // "abcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {String} a string.
   */
  function removeEnd(str, substring) {
    const l = str.length, sl = substring.length;
    if (l === 0 || sl === 0) {
      return str;
    }
    if (str.endsWith(substring)) {
      return str.substring(0, l - sl);
    }
    return str;
  }
  /**
   * Removes the specified substring from the given string if the string ends
   * with it by ignoring case-sensitivity; otherwise simply returns the given
   * string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.removeEndIgnoreCase("", "abc"); // ""
   * Strings.removeEndIgnoreCase("abc", ""); // "abc"
   * Strings.removeEndIgnoreCase("abcdefgh", "fgh"); // "abcde"
   * Strings.removeEndIgnoreCase("abcdefgh", "FGh"); // "abcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {String} a string.
   */
  function removeEndIgnoreCase(str, substring) {
    const strLen = str.length, sqLen = substring.length;
    if (strLen === 0 || sqLen === 0) {
      return str;
    }
    if (endsWithIgnoreCase(str, substring)) {
      return str.substring(0, strLen - sqLen);
    }
    return str;
  }
  /**
   * Removes all the white spaces from the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.removeWhitespace(""); // ""
   * Strings.removeWhitespace(" "); // ""
   * Strings.removeWhitespace("a b c\n"); // "abc"
   * Strings.removeWhitespace("\n\r\t\f "); // ""
   * Strings.removeWhitespace("abc @def.ghi"); // "abc@def.ghi"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the string without white spaces.
   */
  function removeWhitespace(str) {
    const len = str.length;
    if (len === 0) {
      return str;
    }
    if (len === 1 && Chars.isWhitespace(str.charAt(0))) {
      return EMPTY;
    }
    let i = 0, c, res = EMPTY;
    while (i < len) {
      c = str.charAt(i++);
      if (!Chars.isWhitespace(c)) {
        res += c;
      }
    }
    return res;
  }
  /**
   * Repeats the specified string the given number of times.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.repeat("", 10); // ""
   * Strings.repeat(" ", 1); // " "
   * Strings.repeat("abc", 2); // "abcabc"
   * Strings.repeat("*", 10); // "**********"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} times Contains the number of times to repeat the
   * specified string.
   * @return {String} the string repeated the specified number of times.
   */
  function repeat(str, times) {
    if (Strings.isEmpty(str) || !Numbers.isInteger(times) || times < 0) {
      return EMPTY;
    }
    if (times === 1) {
      return str;
    }
    if (times === 2) {
      return str + str;
    }
    let res = str, i = 0;
    while (++i < times) {
      res += str;
    }
    return res;
  }
  /**
   * Reverses the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.reverse(""); // ""
   * Strings.reverse("cba"); // "abc"
   * Strings.reverse("😃😄😁😆🤣"); // "🤣😆😁😄😃"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the reversed string.
   */
  function reverse(str) {
    return str.length < 2 ? str : [...str].reverse().join('');
  }
  /**
   * Replaces the string characters in the specified range by the given
   * substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.splice("", 0, 0, "abc"); // "abc"
   * Strings.splice("abcde", 1, 0, "hijk"); // "ahijkbcde"
   * Strings.splice("lorem ipsum dolor", 6, 5, "amet"); // "lorem amet dolor"
   * ```
   *
   * @param {String} str Contains a string.
   * @param {Number} fromIndex Contains the start index at which to place the
   * new substring.
   * @param {Number} deleteCount Contains the number of characters to remove
   * from the specified `fromIndex` of the specified string.
   * @param {String} subStr Contains the new substring to be inserted between
   * the specified indexes.
   *
   * @return {string} a new string with the specified sequence replaced by the
   * new substring.
   */
  function splice(str, fromIndex, deleteCount, subStr) {
    return str.slice(0, fromIndex) +
      subStr +
      str.slice(fromIndex + Math.abs(deleteCount));
  }
  /**
   * Checks whether the specified string starts with the specified substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.startsWith("", "") // true
   * Strings.startsWith("abc", "ab") // true
   * Strings.startsWith("abc", "A", true) // true
   * Strings.startsWith("abc", "b") // false
   * Strings.startsWith("abc", "C", true) // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case-sensitivity.
   * Defaults to `false`.
   * @param {Number} position Contains the index at which to begin searching
   * in the specified string. If omitted, it starts with the string end.
   * @return {Boolean} whether the specified string starts with the specified
   * substring.
   */
  function startsWith(str, sequence, ignoreCase = false, position) {
    ignoreCase !== null && ignoreCase !== void 0 ? ignoreCase : (ignoreCase = false);
    if (ignoreCase) {
      return str.toLowerCase().startsWith(sequence.toLowerCase(), position);
    }
    return str.startsWith(sequence, position);
  }
  /**
   * Checks whether the specified string starts with any of the specified
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.startsWithAny(""); // false
   * Strings.startsWithAny("", ""); // true
   * Strings.startsWithAny("", "abc"); // false
   * Strings.startsWithAny("abc", ""); // false
   * Strings.startsWithAny("abc", "a"); // true
   * Strings.startsWithAny("abc", "a", "b"); // true
   * Strings.startsWithAny("abc", ...["a", "b", "c"]); // true
   * Strings.startsWithAny("abc def ghi", "mno", "pqr", "abc"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string starts with any of the
   * specified substrings.
   */
  function startsWithAny(str, ...substrings) {
    let i = 0;
    const l = substrings.length;
    if (l > 0) {
      while (i < l) {
        if (str.indexOf(substrings[i++]) === 0) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Converts the specified string to binary string in case it contains
   * Unicode characters. A binary string is a string in which each 16-bit
   * unit occupies only 1 byte.
   *
   * **Usage Examples:**
   * ```typescript
   * const binary = Strings.toBinary("🤔 🙃");
   * Strings.encode(binary); // "PtgU3SAAPdhD3g=="
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} a binary string.
   */
  function toBinary(str) {
    const length = str.length, charCodeUnits = Uint16Array.from({ length }, (_, index) => str.charCodeAt(index)), ccs = new Uint8Array(charCodeUnits.buffer);
    let bin = '';
    ccs.forEach((c) => {
      bin += String.fromCharCode(c);
    });
    return bin;
  }
  /**
   * Converts the specified string to a UTF8 bytes array.
   *
   * @param {String} str Contains some string.
   * @return {Uint8Array} an UTF8 array.
   */
  function toBytesArray(str) {
    const strLength = str.length;
    let arrayLength = 0, i = 0, p;
    for (; i < strLength; i++) {
      p = str.codePointAt(i);
      if (p >= 0x10000) {
        i++;
      }
      arrayLength += p < 0x80 ? 1 : p < 0x800 ? 2 :
        p < 0x10000 ? 3 : p < 0x200000 ? 4 : p < 0x4000000 ? 5 : 6;
    }
    let pi = 0;
    i = 0;
    const bytes = new Uint8Array(arrayLength);
    while (i < arrayLength) {
      p = str.codePointAt(pi);
      if (p < 128) { // ASCII character (1 byte)
        bytes[i++] = p;
      }
      else if (p < 0x800) { // (2 bytes)
        bytes[i++] = 192 + (p >>> 6);
        bytes[i++] = 128 + (p & 63);
      }
      else if (p < 0x10000) { // (3 bytes)
        bytes[i++] = 224 + (p >>> 12);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
      }
      else if (p < 0x200000) { // (4 bytes)
        bytes[i++] = 240 + (p >>> 18);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      }
      else if (p < 0x4000000) { // (5 bytes)
        bytes[i++] = 248 + (p >>> 24);
        bytes[i++] = 128 + ((p >>> 18) & 63);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      }
      else { // (6 bytes)
        bytes[i++] = 252 + (p >>> 30);
        bytes[i++] = 128 + ((p >>> 24) & 63);
        bytes[i++] = 128 + ((p >>> 18) & 63);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      }
      pi++;
    }
    return bytes;
  }
  /**
   * Converts the specified string to camel-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toCamelCase(""); // ""
   * Strings.toCamelCase("\n\t\n"); // ""
   * Strings.toCamelCase("foo bar baz"); // "fooBarBaz"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to camel-case.
   */
  function toCamelCase(str) {
    return decapitalize(toPascalCase(str));
  }
  /**
   * Converts the specified string to an array of characters.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toCharArray(''); // []
   * Strings.toCharArray('abc'); // ['a', 'b', 'c']
   * Strings.toCharArray('🐑🐑🐑'); // ['🐑', '🐑', '🐑'];
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Array} an array of the characters of the specified string.
   */
  function toCharArray(str) {
    return isEmpty(str) ? [] : [...str];
  }
  /**
   * Converts the specified string to constant-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toConstantCase(""); // ""
   * Strings.toConstantCase("ABC"); // "ABC"
   * Strings.toConstantCase("aBC\nDeF"); // "ABC_DEF"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to constant-case.
   */
  function toConstantCase(str) {
    return __toCase(str, '_', true);
  }
  /**
   * Converts the specified string to kebab-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toKebabCase(""); // ""
   * Strings.toKebabCase("ABC"); // "abc"
   * Strings.toKebabCase("aBC\nDeF"); // "abc-def"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to kebab-case.
   */
  function toKebabCase(str) {
    return __toCase(str, '-');
  }
  /**
   * Converts the specified string to pascal-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toPascalCase(""); // ""
   * Strings.toPascalCase("  "); // ""
   * Strings.toPascalCase("abc def"); // "AbcDef"
   * Strings.toPascalCase("abc_def"); // "AbcDef"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to pascal-case.
   */
  function toPascalCase(str) {
    const length = str.length;
    if (length === 0) {
      return EMPTY;
    }
    let i = 0, c, p, r = '';
    while (i < length) {
      c = str.charAt(i);
      if (!Chars.isWhitespace(c) && c !== '_' && c !== '-') {
        p = str.charAt(i - 1);
        r += i === 0 || Chars.isWhitespace(p) || p === '_' || p === '-' ?
          c.toUpperCase() : c.toLowerCase();
      }
      i++;
    }
    return r;
  }
  /**
   * Converts the specified string to snake-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toSnakeCase(""); // ""
   * Strings.toSnakeCase("ABC"); // "abc"
   * Strings.toSnakeCase("aBC\nDeF"); // "abc_def"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to snake-case.
   */
  function toSnakeCase(str) {
    return __toCase(str, '_');
  }
  /**
   * Converts the specified string to title case id este the first letter
   * of the words between spaces is capitalized and the rest is converted
   * to lowercase.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toTitleCase(""); // ""
   * Strings.toTitleCase("aBc"); // "Abc"
   * Strings.toTitleCase("aBC dEf"); // "Abc Def"
   * Strings.toTitleCase("\nabC"); // "\nAbc"
   * Strings.toTitleCase("ab\t\f\t\nc"); // "Ab\t\f\t\nC"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the title case string.
   */
  function toTitleCase(str) {
    if (isEmpty(str)) {
      return str;
    }
    let i = 0, r = EMPTY, c, s, p;
    while (i < str.length) {
      c = str.charAt(i);
      s = Chars.isWhitespace(c);
      if (i === 0) {
        r += s ? c : c.toUpperCase();
      }
      if (i > 0) {
        if (!s) {
          p = Chars.isWhitespace(str.charAt(i - 1));
          r += p ? c.toUpperCase() : c.toLowerCase();
        }
        else {
          r += c;
        }
      }
      i++;
    }
    return r;
  }
  /**
   * Capitalizes the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.capitalize("john"); // "John"
   * Strings.capitalize("jOHN"); // "JOHN"
   * Strings.capitalize("jOHN", true); // "John"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Boolean} lowerRest Contains whether to convert the characters
   * from the second to the last character to lowercase. Defaults to `false`.
   * @return {String} the capitalized string.
   */
  function upperFirst(str, lowerRest = false) {
    if (Strings.isWhitespace(str)) {
      return str;
    }
    const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);
    return str.charAt(0).toUpperCase() + rest;
  }
  // eslint-disable-next-line valid-jsdoc
  /**
   * @private
   */
  function __toCase(str, conn, upper = false) {
    let i = 0, r = '', c, n;
    for (; i < str.length; i++) {
      c = str.charAt(i);
      if (Chars.isWhitespace(c) || c === '-' || c === '_') {
        n = str.charAt(i + 1);
        if (r.length !== 0 && n !== '' && n !== '-' && n !== '_' &&
          Chars.isWhitespace(n) === false) {
          r += conn;
        }
      }
      else {
        r += upper ? c.toUpperCase() : c.toLowerCase();
      }
    }
    return r;
  }

  return {
    EMPTY,
    NOT_FOUND,
    abbreviate,
    appendIfMissing,
    chomp,
    chop,
    compare,
    compareIgnoreCase,
    contains,
    containsAny,
    containsIgnoreCase,
    containsNone,
    countMatches,
    decapitalize,
    decode,
    defaultIfEmpty,
    difference,
    encode,
    endsWith,
    endsWithAny,
    endsWithIgnoreCase,
    endsWithNone,
    equals,
    equalsAny,
    equalsAnyIgnoreCase,
    equalsIgnoreCase,
    fromBinary,
    fromBytesArray,
    getBytes,
    hasWhitespace,
    hashCode,
    indexOfAny,
    indexOfDifference,
    indexOfIgnoreCase,
    isAllBlank,
    isAlpha,
    isAlphanumeric,
    isAnyBlank,
    isBinary,
    isBlank,
    isEmpty,
    isLowerCase,
    isMixedCase,
    isNilOrEmpty,
    isNilOrWhitespace,
    isNilOrEmpty,
    isNotEmpty,
    isNullOrEmpty,
    isNullOrWhitespace,
    isNumeric,
    isString,
    isStringObject,
    isSurrogatePair,
    isUpperCase,
    isWhitespace,
    join,
    lastIndexOf,
    lastIndexOfIgnoreCase,
    left,
    longest,
    normalize,
    prepend,
    prependIfMissing,
    prependIfMissingIgnoreCase,
    remove,
    removeEnd,
    removeEndIgnoreCase,
    removeWhitespace,
    repeat,
    reverse,
    splice,
    startsWith,
    startsWithAny,
    toBinary,
    toBytesArray,
    toCamelCase,
    toCharArray,
    toConstantCase,
    toKebabCase,
    toPascalCase,
    toSnakeCase,
    toTitleCase,
    upperFirst,
  }
})();

var Utils = (function () {
  /**
   * Checks whether the given value is of boolean type.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of boolean type.
   */
  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  /**
   * Checks whether the given value is defined.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is defined.
   */
  function isDefined(value) {
    return isUndefined(value) === false;
  }
  /**
   * Checks whether the specified value is an `Error` instance.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an error instance.
   */
  function isError(value) {
    return Objects.toString(value) === '[object Error]';
  }
  /**
   * Checks whether the given value is falsy i. e.: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is falsy.
   */
  function isFalsy(value) {
    return [
      // @ts-expect-error
      null, undefined, false, Number.NaN, 0, -0, 0n, '',
    ].includes(value);
  }
  /**
   * Checks whether the specified value is a `File` instance.
   *
   * **Usage Examples:**
   * ```typescript
   * Utils.isFile(null); // false
   * Utils.isFile(new File([], "abc")); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `File` instance.
   */
  function isFile(value) {
    return Objects.toString(value) === '[object File]';
  }
  /**
   * Checks whether the specified value is a `FormData` object.
   *
   * **Usage Examples:**
   * ```typescript
   * const formData = new FormData();
   * formData.append('a', 'abc');
   * Utils.isFormData(formData); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `FormData` object.
   */
  function isFormData(value) {
    return Objects.toString(value) === '[object FormData]';
  }
  /**
   * Checks whether the given value is a function.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a function.
   */
  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Checks whether the specified value is an iterable object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an iterable object.
   */
  function isIterable(value) {
    return isNotNil(value) && isFunction(value[Symbol.iterator]);
  }
  /**
   * Checks whether the given value is neither `null` nor `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is neither `null` nor
   * `undefined`.
   */
  function isNotNil(value) {
    return isNullOrUndefined(value) === false;
  }
  /**
   * Checks whether the given value is not `null`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not `null`.
   */
  function isNotNull(value) {
    return isNull(value) === false;
  }
  /**
   * Checks whether the given value is not `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not `undefined`.
   */
  function isNotUndefined(value) {
    return isUndefined(value) === false;
  }
  /**
   * Checks whether the given value is null.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is `null`.
   */
  function isNull(value) {
    return value === null;
  }
  /**
   * Checks whether the given value is `null` or `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is `null` or `undefined`.
   */
  function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
  }
  /**
   * Checks whether the given value is of primitive type. In JavaScript
   * there are 7 primitive types: `string`, `number`, `bigint`, `boolean`,
   * `undefined`, `symbol` and `null`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of primitive type.
   */
  function isPrimitive(value) {
    const type = typeof value;
    return isNull(value) || [
      'string',
      'number',
      'bigint',
      'boolean',
      'symbol',
      'undefined',
    ].includes(type);
  }
  /**
   * Checks whether the specified value is a `Promise`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a JavaScript `promise`.
   */
  function isPromise(value) {
    return Objects.toString(value) === '[object Promise]';
  }
  /**
   * Checks whether the specified value is a `PromiseLike<T>` object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `PromiseLike<T>` object.
   */
  function isPromiseLike(value) {
    return value && isFunction(value.then);
  }
  /**
   * Checks whether the specified value is a regular expression.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a regular expression.
   */
  function isRegExp(value) {
    return Objects.isObject(value) &&
      Objects.toString(value) === '[object RegExp]';
  }
  /**
   * Checks whether the specified value is a symbol.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a symbol.
   */
  function isSymbol(value) {
    return typeof value === 'symbol';
  }
  /**
   * Checks whether the given value is not falsy i. e. not: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not falsy.
   */
  function isTruthy(value) {
    return isFalsy(value) === false;
  }
  /**
   * Checks whether the given value is not defined.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not defined.
   */
  function isUndefined(value) {
    return value === void 0;
  }

  return {
    isBoolean,
    isDefined,
    isError,
    isFalsy,
    isFile,
    isFormData,
    isFunction,
    isIterable,
    isNotNil,
    isNotNull,
    isNotUndefined,
    isNull,
    isNullOrUndefined,
    isPrimitive,
    isPromise,
    isPromiseLike,
    isRegExp,
    isSymbol,
    isTruthy,
    isUndefined,
  }
})();

module.exports = {
  /** Defines an interface with array utilities. */
  Arrays: Arrays,
  /** Defines an interface with character utilities. */
  Chars: Chars,
  /** Defines an interface with date utilities. */
  Dates: Dates,
  /** Defines an interface with map utilities. */
  Maps: Maps,
  /** Defines an interface with number utilities. */
  Numbers: Numbers,
  /** Defines an interface with object utilities. */
  Objects: Objects,
  /** Defines an interface with set utilities. */
  Sets: Sets,
  /** Defines an interface with string utilities. */
  Strings: Strings,
  /** Defines a base utility class. */
  Utils: Utils,
}
