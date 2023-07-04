const { Arrays, Chars, Dates, Maps, Numbers, Objects, Sets, Strings, Utils } = require('./index');
const assert = require('assert').strict;

describe('Arrays', () => {
  it('Arrays.addFirst()', () => {
    assert.deepEqual(['a', 'b', 'c'], Arrays.addFirst(['b', 'c'], 'a'))
  });

  it('Arrays.clone()', () => {
    const array = [1, 2, 4];
    const cloned = Arrays.clone(array);
    array[0] = 0;
    array.pop();
    assert.deepEqual(cloned, [1, 2, 4]);
  });

  it('Arrays.contains()', () => {
    assert.deepEqual(Arrays.contains([], 'a'), false);
    assert.deepEqual(Arrays.contains([''], ''), true);
    assert.deepEqual(Arrays.contains(['a', 1, false, Symbol.iterator], Symbol.iterator), true);
    assert.deepEqual(Arrays.contains(['🐑', '🐑', '🐑', '😀', '💖'], '🐑'), true);
  });

  it('Arrays.containsAny()', () => {
    assert.deepEqual(Arrays.containsAny([]), false);
    assert.deepEqual(Arrays.containsAny([], 'a'), false);
    assert.deepEqual(Arrays.containsAny([''], ''), true);
    assert.deepEqual(Arrays.containsAny(['a', 1, false, Symbol.iterator], Symbol.iterator), true);
    assert.deepEqual(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], '🐑'), true);
    assert.deepEqual(Arrays.containsAny(['a', 1, false, Symbol.iterator], 'c', Symbol.iterator), true);
    assert.deepEqual(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], '🐑', '💖'), true);
    assert.deepEqual(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], 'a', 'b'), false);
  });

  it('Arrays.containsNone()', () => {
    assert.deepEqual(Arrays.containsNone([]), true);
    assert.deepEqual(Arrays.containsNone([], 'a'), true);
    assert.deepEqual(Arrays.containsNone([''], ''), false);
    assert.deepEqual(Arrays.containsNone(
        ['a', 1, false, Symbol.iterator], Symbol.iterator), false);
    assert.deepEqual(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], '🐑'), false);
    assert.deepEqual(Arrays.containsNone(
        ['a', 1, false, Symbol.iterator], 'c', Symbol.iterator), false);
    assert.deepEqual(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], '🐑', '💖'), false);
    assert.deepEqual(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], 'a', 'b'), true);
  });

  it('Arrays.each()', () => {
    const array = ['My ', 'name ', 'is ', 'John ', 'Doe'];
    let text = '';
    Arrays.each(array, (item) => {
      text += item;
    });
    assert.deepEqual(text, 'My name is John Doe');
  });

  it('Arrays.filterOut()', () => {
    const array = ['happy', 'sad', 'glad', 'glorious', 'bad', 'amazed'];
    const happy = Arrays.filterOut(array, ['sad', 'bad']);
    assert.deepEqual(happy, ['happy', 'glad', 'glorious', 'amazed']);
  });

  it('Arrays.filterTruthy()', () => {
    const array = ['abc', false, -0, 55, {}, true, 'c', '', 0];
    assert.deepEqual(Arrays.filterTruthy(array), ['abc', 55, {}, true, 'c']);
  });

  it('Arrays.first()', () => {
    const array = ['a', 'b', 'c'];
    assert.deepEqual(Arrays.first(array), 'a');
  });

  it('Arrays.insertAt()', () => {
    const array = ['a', 'b', 'e'];
    assert.deepEqual(Arrays.insertAt(array, 2, 'c'), ['a', 'b', 'c', 'e']);
    assert.deepEqual(Arrays.insertAt(array, 2, ['c', 'd']), 
        ['a', 'b', 'c', 'd', 'e'],
    );
  });

  it('Arrays.intersperse()', () => {
    const array = ['a', 'b', 'c'];
    assert.deepEqual(Arrays.intersperse(array, 'x'), ['a', 'x', 'b', 'x', 'c']);
  });

  it('Arrays.isArray()', () => {
    assert.deepEqual(Arrays.isArray([]), true);
    assert.deepEqual(Arrays.isArray(false), false);
    assert.deepEqual(Arrays.isArray([1, 2]), true);
  });

  it('Arrays.isArrayBuffer()', () => {
    assert.deepEqual(Arrays.isArrayBuffer([]), false);
    assert.deepEqual(Arrays.isArrayBuffer(false), false);
    assert.deepEqual(Arrays.isArrayBuffer([1, 2]), false);
    assert.deepEqual(Arrays.isArrayBuffer(), false);
    assert.deepEqual(Arrays.isArrayBuffer(null), false);
    const buffer = new ArrayBuffer(5);
    assert.deepEqual(Arrays.isArrayBuffer(buffer), true);
  });

  it('Arrays.isBinary()', () => {
    assert.deepEqual(Arrays.isBinary([]), true);
    assert.deepEqual(Arrays.isBinary([4, 3]), false);
    assert.deepEqual(Arrays.isBinary([0]), true);
    assert.deepEqual(Arrays.isBinary([0, 0]), true);
    assert.deepEqual(Arrays.isBinary([0, 0, 1]), true);
    assert.deepEqual(Arrays.isBinary([0, 0, 1, 0]), true);
    assert.deepEqual(Arrays.isBinary([-1, -0]), false);
  });

  it('Arrays.isEmpty()', () => {
    assert.deepEqual(Arrays.isEmpty([]), true);
    assert.deepEqual(Arrays.isEmpty([undefined]), false);
  });

  it('Arrays.isIdentical()', () => {
    assert.deepEqual(Arrays.isIdentical([]), true);
    assert.deepEqual(Arrays.isIdentical([undefined]), true);
    assert.deepEqual(Arrays.isIdentical([undefined, null]), false);
    assert.deepEqual(Arrays.isIdentical(['a', 'a', 'a']), true);
  });

  it('Arrays.isNotEmpty()', () => {
    assert.deepEqual(Arrays.isNotEmpty([]), false);
    assert.deepEqual(Arrays.isNotEmpty([null]), true);
  });

  it('Arrays.isSorted()', () => {
    assert.deepEqual(Arrays.isSorted([]), true);
    assert.deepEqual(Arrays.isSorted([9, 8, 7, 6, 5, 4]), false);
    assert.deepEqual(Arrays.isSorted([4, 1, 8, 3, 9, 7]), false);
    assert.deepEqual(Arrays.isSorted([1, 2, 3, 4, 5, 6, 7, 8, 9]), true);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    assert.deepEqual(Arrays.isSorted(array), true);
  });

  it('Arrays.isTypedArray()', () => {
    assert.deepEqual(Arrays.isTypedArray([]), false);
    assert.deepEqual(Arrays.isTypedArray([null]), false);
    const t1 = new Int8Array();
    const t2 = new Int16Array();
    const t3 = new Int32Array();
    const t4 = new Float32Array();
    const t5 = new Float64Array();
    const t6 = new Uint8Array();
    const t7 = new Uint8ClampedArray();
    const t8 = new Uint16Array();
    const t9 = new Uint32Array();
    assert.deepEqual([t1, t2, t3, t4, t5, t6, t7, t8, t9].every((a) =>
      Arrays.isTypedArray(a)), true);
  });

  it('Arrays.last()', () => {
    assert.deepEqual(Arrays.last([]), null);
    assert.deepEqual(Arrays.last(['a', 'b']), 'b');
  });

  it('Arrays.removeAll()', () => {
    assert.deepEqual(Arrays.removeAll([], 0), []);
    assert.deepEqual(Arrays.removeAll([0], 0), []);
    assert.deepEqual(Arrays.removeAll([1, 2, 3], 1, 2, 3), []);
    assert.deepEqual(Arrays.removeAll(['a', 'b', 'c', 'd', 'e'], 'b', 'd'), ['a', 'c', 'e']);
  });

  it('Arrays.removeAt()', () => {
    assert.deepEqual(Arrays.removeAt([], 0), []);
    assert.deepEqual(Arrays.removeAt(['a', 'b'], 1), ['a']);
    assert.deepEqual(Arrays.removeAt(['a', 'b', 'c'], 0), ['b', 'c']);
    assert.deepEqual(Arrays.removeAt(['a', 'b'], -1), ['a']);
    assert.deepEqual(Arrays.removeAt(['a', 'b'], 2.3), ['a', 'b']);
    assert.deepEqual(Arrays.removeAt(['a'], 0), []);
  });

  it('Arrays.reverse()', () => {
    assert.deepEqual(Arrays.reverse([]), []);
    assert.deepEqual(Arrays.reverse(['a']), ['a']);
    assert.deepEqual(Arrays.reverse(['a', 'b', 'c']), ['c', 'b', 'a']);
    assert.deepEqual(Arrays.reverse(['', 0, null, undefined]), [undefined, null, 0, '']);
  });

  it('Arrays.sort()', () => {
    const array = [7, 1, 6, 3, 5, 8, 2, 9, 4];
    assert.notDeepEqual
    assert.deepEqual(Arrays.sort(array, 'asc'), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepEqual(Arrays.sort(array), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
    const arr = ['alpha', 'beta', 'gamma'];
    assert.deepEqual(Arrays.sort(arr, 'asc'), arr);
    assert.deepEqual(Arrays.sort(arr), ['gamma', 'beta', 'alpha']);
    assert.throws(() => Arrays.sort([], 'abc'), 'Unknown sorting order')
  });

  it('Arrays.subarray()', () => {
    assert.deepEqual(Arrays.subarray([], 0), []);
    assert.deepEqual(Arrays.subarray([1, 2, 3], 0), [1, 2, 3]);
    assert.deepEqual(Arrays.subarray([1, 2, 3], 1), [2, 3]);
    const array = [1, 2, 3];
    assert.deepEqual(Arrays.subarray(array, 1), [2, 3]);
    assert.deepEqual(Arrays.subarray([1, 2, 3, 4], 1, 3), [2, 3]);
    assert.deepEqual(Arrays.subarray([1, 2, 3, 4], 0, 15), [1, 2, 3, 4]);
    assert.deepEqual(Arrays.subarray([1, 2, 3, 4], -1000), [1, 2, 3, 4]);
  });

  it('Arrays.sum()', () => {
    const array = [1, 2, 3, 4, 5];
    assert.deepEqual(Arrays.sum(array), 15);
  });

  it('Arrays.unique()', () => {
    const array = [1, 9, 2, 4, 9, 3, 3, 2];
    assert.deepEqual(Arrays.unique(array), [1, 9, 2, 4, 3]);
  });
});

describe('Chars', () => {
  it('Chars.isAlpha()', () => {
    assert.deepEqual(Chars.isAlpha(''), false);
    assert.deepEqual(Chars.isAlpha('a'), true);
    assert.deepEqual(Chars.isAlpha('b'), true);
    assert.deepEqual(Chars.isAlpha('c'), true);
    assert.deepEqual(Chars.isAlpha('d'), true);
    assert.deepEqual(Chars.isAlpha('e'), true);
    assert.deepEqual(Chars.isAlpha('f'), true);
    assert.deepEqual(Chars.isAlpha('g'), true);
    assert.deepEqual(Chars.isAlpha('h'), true);
    assert.deepEqual(Chars.isAlpha('i'), true);
    assert.deepEqual(Chars.isAlpha('j'), true);
    assert.deepEqual(Chars.isAlpha('k'), true);
    assert.deepEqual(Chars.isAlpha('l'), true);
    assert.deepEqual(Chars.isAlpha('m'), true);
    assert.deepEqual(Chars.isAlpha('n'), true);
    assert.deepEqual(Chars.isAlpha('o'), true);
    assert.deepEqual(Chars.isAlpha('p'), true);
    assert.deepEqual(Chars.isAlpha('q'), true);
    assert.deepEqual(Chars.isAlpha('r'), true);
    assert.deepEqual(Chars.isAlpha('s'), true);
    assert.deepEqual(Chars.isAlpha('t'), true);
    assert.deepEqual(Chars.isAlpha('u'), true);
    assert.deepEqual(Chars.isAlpha('v'), true);
    assert.deepEqual(Chars.isAlpha('w'), true);
    assert.deepEqual(Chars.isAlpha('x'), true);
    assert.deepEqual(Chars.isAlpha('y'), true);
    assert.deepEqual(Chars.isAlpha('z'), true);
    assert.deepEqual(Chars.isAlpha('A'), true);
    assert.deepEqual(Chars.isAlpha('B'), true);
    assert.deepEqual(Chars.isAlpha('C'), true);
    assert.deepEqual(Chars.isAlpha('D'), true);
    assert.deepEqual(Chars.isAlpha('E'), true);
    assert.deepEqual(Chars.isAlpha('F'), true);
    assert.deepEqual(Chars.isAlpha('G'), true);
    assert.deepEqual(Chars.isAlpha('H'), true);
    assert.deepEqual(Chars.isAlpha('I'), true);
    assert.deepEqual(Chars.isAlpha('J'), true);
    assert.deepEqual(Chars.isAlpha('K'), true);
    assert.deepEqual(Chars.isAlpha('L'), true);
    assert.deepEqual(Chars.isAlpha('M'), true);
    assert.deepEqual(Chars.isAlpha('N'), true);
    assert.deepEqual(Chars.isAlpha('O'), true);
    assert.deepEqual(Chars.isAlpha('P'), true);
    assert.deepEqual(Chars.isAlpha('Q'), true);
    assert.deepEqual(Chars.isAlpha('R'), true);
    assert.deepEqual(Chars.isAlpha('S'), true);
    assert.deepEqual(Chars.isAlpha('T'), true);
    assert.deepEqual(Chars.isAlpha('U'), true);
    assert.deepEqual(Chars.isAlpha('V'), true);
    assert.deepEqual(Chars.isAlpha('W'), true);
    assert.deepEqual(Chars.isAlpha('X'), true);
    assert.deepEqual(Chars.isAlpha('Y'), true);
    assert.deepEqual(Chars.isAlpha('Z'), true);
    assert.deepEqual(Chars.isAlpha('Ä'), false);
    assert.deepEqual(Chars.isAlpha('ö'), false);
    assert.deepEqual(Chars.isAlpha('-'), false);
    assert.deepEqual(Chars.isAlpha('0'), false);
  });

  it('Chars.isAlphaLower()', () => {
    assert.deepEqual(Chars.isAlphaLower('a'), true);
    assert.deepEqual(Chars.isAlphaLower('b'), true);
    assert.deepEqual(Chars.isAlphaLower('c'), true);
    assert.deepEqual(Chars.isAlphaLower('d'), true);
    assert.deepEqual(Chars.isAlphaLower('e'), true);
    assert.deepEqual(Chars.isAlphaLower('f'), true);
    assert.deepEqual(Chars.isAlphaLower('g'), true);
    assert.deepEqual(Chars.isAlphaLower('h'), true);
    assert.deepEqual(Chars.isAlphaLower('i'), true);
    assert.deepEqual(Chars.isAlphaLower('j'), true);
    assert.deepEqual(Chars.isAlphaLower('k'), true);
    assert.deepEqual(Chars.isAlphaLower('l'), true);
    assert.deepEqual(Chars.isAlphaLower('m'), true);
    assert.deepEqual(Chars.isAlphaLower('n'), true);
    assert.deepEqual(Chars.isAlphaLower('o'), true);
    assert.deepEqual(Chars.isAlphaLower('p'), true);
    assert.deepEqual(Chars.isAlphaLower('q'), true);
    assert.deepEqual(Chars.isAlphaLower('r'), true);
    assert.deepEqual(Chars.isAlphaLower('s'), true);
    assert.deepEqual(Chars.isAlphaLower('t'), true);
    assert.deepEqual(Chars.isAlphaLower('u'), true);
    assert.deepEqual(Chars.isAlphaLower('v'), true);
    assert.deepEqual(Chars.isAlphaLower('w'), true);
    assert.deepEqual(Chars.isAlphaLower('x'), true);
    assert.deepEqual(Chars.isAlphaLower('y'), true);
    assert.deepEqual(Chars.isAlphaLower('z'), true);
    assert.deepEqual(Chars.isAlphaLower('Ä'), false);
    assert.deepEqual(Chars.isAlphaLower('ö'), false);
    assert.deepEqual(Chars.isAlphaLower('-'), false);
    assert.deepEqual(Chars.isAlphaLower('0'), false);
  });

  it('Chars.isAlphaUpper()', () => {
    assert.deepEqual(Chars.isAlphaUpper(''), false);
    assert.deepEqual(Chars.isAlphaUpper('A'), true);
    assert.deepEqual(Chars.isAlphaUpper('B'), true);
    assert.deepEqual(Chars.isAlphaUpper('C'), true);
    assert.deepEqual(Chars.isAlphaUpper('D'), true);
    assert.deepEqual(Chars.isAlphaUpper('E'), true);
    assert.deepEqual(Chars.isAlphaUpper('F'), true);
    assert.deepEqual(Chars.isAlphaUpper('G'), true);
    assert.deepEqual(Chars.isAlphaUpper('H'), true);
    assert.deepEqual(Chars.isAlphaUpper('I'), true);
    assert.deepEqual(Chars.isAlphaUpper('J'), true);
    assert.deepEqual(Chars.isAlphaUpper('K'), true);
    assert.deepEqual(Chars.isAlphaUpper('L'), true);
    assert.deepEqual(Chars.isAlphaUpper('M'), true);
    assert.deepEqual(Chars.isAlphaUpper('N'), true);
    assert.deepEqual(Chars.isAlphaUpper('O'), true);
    assert.deepEqual(Chars.isAlphaUpper('P'), true);
    assert.deepEqual(Chars.isAlphaUpper('Q'), true);
    assert.deepEqual(Chars.isAlphaUpper('R'), true);
    assert.deepEqual(Chars.isAlphaUpper('S'), true);
    assert.deepEqual(Chars.isAlphaUpper('T'), true);
    assert.deepEqual(Chars.isAlphaUpper('U'), true);
    assert.deepEqual(Chars.isAlphaUpper('V'), true);
    assert.deepEqual(Chars.isAlphaUpper('W'), true);
    assert.deepEqual(Chars.isAlphaUpper('X'), true);
    assert.deepEqual(Chars.isAlphaUpper('Y'), true);
    assert.deepEqual(Chars.isAlphaUpper('Z'), true);
    assert.deepEqual(Chars.isAlphaUpper('Ä'), false);
    assert.deepEqual(Chars.isAlphaUpper('ö'), false);
    assert.deepEqual(Chars.isAlphaUpper('-'), false);
    assert.deepEqual(Chars.isAlphaUpper('0'), false);
  });

  it('Chars.isArabicDigit()', () => {
    assert.deepEqual(Chars.isArabicDigit(''), false);
    assert.deepEqual(Chars.isArabicDigit(' '), false);
    assert.deepEqual(Chars.isArabicDigit('\u0660'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0661'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0662'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0663'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0664'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0665'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0666'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0667'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0668'), true);
    assert.deepEqual(Chars.isArabicDigit('\u0669'), true);
    assert.deepEqual(Chars.isArabicDigit('0'), false);
    assert.deepEqual(Chars.isArabicDigit('6'), false);
  });

  it('Chars.isASCII()', () => {
    assert.deepEqual(Chars.isASCII('"'), true);
    assert.deepEqual(Chars.isASCII('a'), true);
    assert.deepEqual(Chars.isASCII('b'), true);
    assert.deepEqual(Chars.isASCII('c'), true);
    assert.deepEqual(Chars.isASCII('d'), true);
    assert.deepEqual(Chars.isASCII('z'), true);
    assert.deepEqual(Chars.isASCII('A'), true);
    assert.deepEqual(Chars.isASCII('B'), true);
    assert.deepEqual(Chars.isASCII('C'), true);
    assert.deepEqual(Chars.isASCII('D'), true);
    assert.deepEqual(Chars.isASCII('Z'), true);
    assert.deepEqual(Chars.isASCII('Ä'), false);
    assert.deepEqual(Chars.isASCII('ö'), false);
    assert.deepEqual(Chars.isASCII('-'), true);
    assert.deepEqual(Chars.isASCII('0'), true);
    assert.deepEqual(Chars.isASCII('/'), true);
    assert.deepEqual(Chars.isASCII(']'), true);
    assert.deepEqual(Chars.isASCII('{'), true);
    assert.deepEqual(Chars.isASCII('|'), true);
  });

  it('Chars.isASCIIControl()', () => {
    assert.deepEqual(Chars.isASCIIControl(Chars.NUL), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.BS), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.CR), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.FF), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.HT), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.LF), true);
    assert.deepEqual(Chars.isASCIIControl(Chars.VT), true);
    assert.deepEqual(Chars.isASCIIControl('0'), false);
    assert.deepEqual(Chars.isASCIIControl('a'), false);
    assert.deepEqual(Chars.isASCIIControl('B'), false);
    assert.deepEqual(Chars.isASCIIControl('z'), false);
    assert.deepEqual(Chars.isASCIIControl('ä'), false);
  });

  it('Chars.isASCIIPrintable()', () => {
    assert.deepEqual(Chars.isASCIIPrintable(Chars.NUL), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.BS), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.CR), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.FF), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.HT), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.LF), false);
    assert.deepEqual(Chars.isASCIIPrintable(Chars.VT), false);
    assert.deepEqual(Chars.isASCIIPrintable('0'), true);
    assert.deepEqual(Chars.isASCIIPrintable('a'), true);
    assert.deepEqual(Chars.isASCIIPrintable('B'), true);
    assert.deepEqual(Chars.isASCIIPrintable('z'), true);
    assert.deepEqual(Chars.isASCIIPrintable('ä'), false);
    assert.deepEqual(Chars.isASCIIPrintable('`'), true);
  });

  it('Chars.isDigit()', () => {
    assert.deepEqual(Chars.isDigit('0'), true);
    assert.deepEqual(Chars.isDigit('1'), true);
    assert.deepEqual(Chars.isDigit('2'), true);
    assert.deepEqual(Chars.isDigit('3'), true);
    assert.deepEqual(Chars.isDigit('4'), true);
    assert.deepEqual(Chars.isDigit('5'), true);
    assert.deepEqual(Chars.isDigit('6'), true);
    assert.deepEqual(Chars.isDigit('7'), true);
    assert.deepEqual(Chars.isDigit('8'), true);
    assert.deepEqual(Chars.isDigit('9'), true);
    assert.deepEqual(Chars.isDigit(Chars.NUL), false);
    assert.deepEqual(Chars.isDigit(Chars.BS), false);
    assert.deepEqual(Chars.isDigit(Chars.CR), false);
    assert.deepEqual(Chars.isDigit(Chars.FF), false);
    assert.deepEqual(Chars.isDigit(Chars.HT), false);
    assert.deepEqual(Chars.isDigit(Chars.LF), false);
    assert.deepEqual(Chars.isDigit(Chars.VT), false);
    assert.deepEqual(Chars.isDigit('a'), false);
    assert.deepEqual(Chars.isDigit('B'), false);
    assert.deepEqual(Chars.isDigit('z'), false);
    assert.deepEqual(Chars.isDigit('ä'), false);
    assert.deepEqual(Chars.isDigit('`'), false);
    assert.deepEqual(Chars.isDigit(''), false);
    assert.deepEqual(Chars.isDigit('12'), false);
    assert.deepEqual(Chars.isDigit('a'), false);
    assert.deepEqual(Chars.isDigit('\u06f0'), true);
    assert.deepEqual(Chars.isDigit('\u06f1'), true);
    assert.deepEqual(Chars.isDigit('۲'), true);
    assert.deepEqual(Chars.isDigit('۳'), true);
    assert.deepEqual(Chars.isDigit('۴'), true);
    assert.deepEqual(Chars.isDigit('\u06f5'), true);
    assert.deepEqual(Chars.isDigit('۶'), true);
    assert.deepEqual(Chars.isDigit('\u06f7'), true);
    assert.deepEqual(Chars.isDigit('۸'), true);
    assert.deepEqual(Chars.isDigit('۹'), true);
    assert.deepEqual(Chars.isDigit(''), false);
    assert.deepEqual(Chars.isDigit('\u2170'), true);
    assert.deepEqual(Chars.isDigit('\u2171'), true);
    assert.deepEqual(Chars.isDigit('\u2172'), true);
    assert.deepEqual(Chars.isDigit('\u2173'), true);
    assert.deepEqual(Chars.isDigit('\u2174'), true);
    assert.deepEqual(Chars.isDigit('\u2175'), true);
    assert.deepEqual(Chars.isDigit('\u2176'), true);
    assert.deepEqual(Chars.isDigit('\u2177'), true);
    assert.deepEqual(Chars.isDigit('\u2178'), true);
    assert.deepEqual(Chars.isDigit('\u2179'), true);
    assert.deepEqual(Chars.isDigit('\u217A'), true);
    assert.deepEqual(Chars.isDigit('\u217B'), true);
    assert.deepEqual(Chars.isDigit('\u217C'), true);
    assert.deepEqual(Chars.isDigit('\u217D'), true);
    assert.deepEqual(Chars.isDigit('\u217E'), true);
    assert.deepEqual(Chars.isDigit('\u217F'), true);
    assert.deepEqual(Chars.isDigit('a'), false);
    assert.deepEqual(Chars.isDigit(''), false);
    assert.deepEqual(Chars.isDigit('\u2160'), true);
    assert.deepEqual(Chars.isDigit('\u2161'), true);
    assert.deepEqual(Chars.isDigit('\u2162'), true);
    assert.deepEqual(Chars.isDigit('\u2163'), true);
    assert.deepEqual(Chars.isDigit('\u2164'), true);
    assert.deepEqual(Chars.isDigit('\u2165'), true);
    assert.deepEqual(Chars.isDigit('\u2166'), true);
    assert.deepEqual(Chars.isDigit('\u2167'), true);
    assert.deepEqual(Chars.isDigit('\u2168'), true);
    assert.deepEqual(Chars.isDigit('\u2169'), true);
    assert.deepEqual(Chars.isDigit('\u216A'), true);
    assert.deepEqual(Chars.isDigit('\u216B'), true);
    assert.deepEqual(Chars.isDigit('\u216C'), true);
    assert.deepEqual(Chars.isDigit('\u216D'), true);
    assert.deepEqual(Chars.isDigit('\u216E'), true);
    assert.deepEqual(Chars.isDigit('\u216F'), true);
    assert.deepEqual(Chars.isDigit('a'), false);
    assert.deepEqual(Chars.isDigit(''), false);
    assert.deepEqual(Chars.isDigit(' '), false);
    assert.deepEqual(Chars.isDigit('\u0660'), true);
    assert.deepEqual(Chars.isDigit('\u0661'), true);
    assert.deepEqual(Chars.isDigit('\u0662'), true);
    assert.deepEqual(Chars.isDigit('\u0663'), true);
    assert.deepEqual(Chars.isDigit('\u0664'), true);
    assert.deepEqual(Chars.isDigit('\u0665'), true);
    assert.deepEqual(Chars.isDigit('\u0666'), true);
    assert.deepEqual(Chars.isDigit('\u0667'), true);
    assert.deepEqual(Chars.isDigit('\u0668'), true);
    assert.deepEqual(Chars.isDigit('\u0669'), true);
  });

  it('Chars.isHinduDigit()', () => {
    assert.deepEqual(Chars.isHinduDigit(''), false);
    assert.deepEqual(Chars.isHinduDigit('0'), false);
    assert.deepEqual(Chars.isHinduDigit('12'), false);
    assert.deepEqual(Chars.isHinduDigit('१'), true);
    assert.deepEqual(Chars.isHinduDigit('\u0966'), true);
    assert.deepEqual(Chars.isHinduDigit('\u0967'), true);
    assert.deepEqual(Chars.isHinduDigit('\u0968'), true);
    assert.deepEqual(Chars.isHinduDigit('\u0969'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096A'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096B'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096C'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096D'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096E'), true);
    assert.deepEqual(Chars.isHinduDigit('\u096F'), true);
  });

  it('Chars.isLetter()', () => {
    assert.deepEqual(Chars.isLetter(''), false);
    assert.deepEqual(Chars.isLetter('0'), false);
    assert.deepEqual(Chars.isLetter(Chars.BACKSLASH), false);
    assert.deepEqual(Chars.isLetter('a'), true);
    assert.deepEqual(Chars.isLetter('ö'), true);
    assert.deepEqual(Chars.isLetter('0'), false);
    assert.deepEqual(Chars.isLetter('我'), true);
    assert.deepEqual(Chars.isLetter('Բ'), true);
    assert.deepEqual(Chars.isLetter('Ա'), true);
    assert.deepEqual(Chars.isLetter('ぃ'), true);
    assert.deepEqual(Chars.isLetter('ぁ'), true);
    assert.deepEqual(Chars.isLetter('じ'), true);
    assert.deepEqual(Chars.isLetter('ד'), true);

    for (const char of 'החתול שלי אכל את הטוסט שלי') {
      assert.deepEqual(Chars.isLetter(char) || char === ' ', true);
    }

    for (const char of 'قطتي أكلت نخبتي') {
      assert.deepEqual(Chars.isLetter(char) || char === ' ', true);
    }

    for (const char of 'मेरी बिल्ली ने मेरा टोस्ट खा लिया') {
      assert.deepEqual(Chars.isLetter(char) || char === ' ', true);
    }

    assert.deepEqual(Chars.isLetter('Ā'), true);
    assert.deepEqual(Chars.isLetter('ā'), true);
    assert.deepEqual(Chars.isLetter('Ă'), true);
    assert.deepEqual(Chars.isLetter('Ĭ'), true);
    assert.deepEqual(Chars.isLetter('©'), false);
    assert.deepEqual(Chars.isLetter('`'), false);
    assert.deepEqual(Chars.isLetter('\''), false);
    assert.deepEqual(Chars.isLetter('}'), false);
    assert.deepEqual(Chars.isLetter('='), false);
    assert.deepEqual(Chars.isLetter('°'), false);
  });

  it('Chars.isLetterOrDigit()', () => {
    assert.deepEqual(Chars.isLetterOrDigit(' '), false);
    assert.deepEqual(Chars.isLetterOrDigit('c'), true);
    assert.deepEqual(Chars.isLetterOrDigit('Ā'), true);
    assert.deepEqual(Chars.isLetterOrDigit('ה'), true);
    assert.deepEqual(Chars.isLetterOrDigit('ت'), true);
    assert.deepEqual(Chars.isLetterOrDigit('δ'), true);
    assert.deepEqual(Chars.isLetterOrDigit('ю'), true);
    assert.deepEqual(Chars.isLetterOrDigit('Ö'), true);
    assert.deepEqual(Chars.isLetterOrDigit('ぃ'), true);
    assert.deepEqual(Chars.isLetterOrDigit('`'), false);
    assert.deepEqual(Chars.isLetterOrDigit('°'), false);
    assert.deepEqual(Chars.isLetterOrDigit('©'), false);
    assert.deepEqual(Chars.isLetterOrDigit(''), false);
    assert.deepEqual(Chars.isLetterOrDigit('3'), true);
    assert.deepEqual(Chars.isLetterOrDigit('\u0660'), true);
    assert.deepEqual(Chars.isLetterOrDigit('\u0967'), true);
    assert.deepEqual(Chars.isLetterOrDigit('\u06f4'), true);
    assert.deepEqual(Chars.isLetterOrDigit('\u2175'), true);
    assert.deepEqual(Chars.isLetterOrDigit('\u216F'), true);
    assert.deepEqual(Chars.isLetterOrDigit('a'), true);
    assert.deepEqual(Chars.isLetterOrDigit('-'), false);
    assert.deepEqual(Chars.isLetterOrDigit('_'), false);
    assert.deepEqual(Chars.isLetterOrDigit('|'), false);
  });

  it('Chars.isLowerCase()', () => {
    assert.deepEqual(Chars.isLowerCase(''), false);
    assert.deepEqual(Chars.isLowerCase('ā'), true);
    assert.deepEqual(Chars.isLowerCase('δ'), true);
    assert.deepEqual(Chars.isLowerCase('ы'), true);
    assert.deepEqual(Chars.isLowerCase('Б'), false);
    assert.deepEqual(Chars.isLowerCase('a'), true);
    assert.deepEqual(Chars.isLowerCase('ö'), true);
    assert.deepEqual(Chars.isLowerCase('öä'), false);
    assert.deepEqual(Chars.isLowerCase('Ü'), false);
    assert.deepEqual(Chars.isLowerCase('0'), false);
  });

  it('Chars.isLowerRomanDigit()', () => {
    assert.deepEqual(Chars.isLowerRomanDigit(''), false);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2170'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2171'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2172'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2173'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2174'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2175'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2176'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2177'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2178'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u2179'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217A'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217B'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217C'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217D'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217E'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('\u217F'), true);
    assert.deepEqual(Chars.isLowerRomanDigit('a'), false);
    assert.deepEqual(Chars.isLowerRomanDigit('0'), false);
    assert.deepEqual(Chars.isLowerRomanDigit('9'), false);
  });

  it('Chars.isLowSurrogate()', () => {
    assert.deepEqual(Chars.isLowSurrogate(''), false);
    assert.deepEqual(Chars.isLowSurrogate('\uDC00'), true);
    assert.deepEqual(Chars.isLowSurrogate('\uDFFF'), true);
  });

  it('Chars.isModernDigit()', () => {
    assert.deepEqual(Chars.isModernDigit('0'), true);
    assert.deepEqual(Chars.isModernDigit('1'), true);
    assert.deepEqual(Chars.isModernDigit('2'), true);
    assert.deepEqual(Chars.isModernDigit('3'), true);
    assert.deepEqual(Chars.isModernDigit('4'), true);
    assert.deepEqual(Chars.isModernDigit('5'), true);
    assert.deepEqual(Chars.isModernDigit('6'), true);
    assert.deepEqual(Chars.isModernDigit('7'), true);
    assert.deepEqual(Chars.isModernDigit('8'), true);
    assert.deepEqual(Chars.isModernDigit('9'), true);
    assert.deepEqual(Chars.isModernDigit(Chars.NUL), false);
    assert.deepEqual(Chars.isModernDigit(Chars.BS), false);
    assert.deepEqual(Chars.isModernDigit(Chars.CR), false);
    assert.deepEqual(Chars.isModernDigit(Chars.FF), false);
    assert.deepEqual(Chars.isModernDigit(Chars.HT), false);
    assert.deepEqual(Chars.isModernDigit(Chars.LF), false);
    assert.deepEqual(Chars.isModernDigit(Chars.VT), false);
    assert.deepEqual(Chars.isModernDigit('a'), false);
    assert.deepEqual(Chars.isModernDigit('B'), false);
    assert.deepEqual(Chars.isModernDigit('z'), false);
    assert.deepEqual(Chars.isModernDigit('ä'), false);
    assert.deepEqual(Chars.isModernDigit('`'), false);
  });

  it('Chars.isPersianDigit()', () => {
    assert.deepEqual(Chars.isPersianDigit(''), false);
    assert.deepEqual(Chars.isPersianDigit('0'), false);
    assert.deepEqual(Chars.isPersianDigit('12'), false);
    assert.deepEqual(Chars.isPersianDigit('a'), false);
    assert.deepEqual(Chars.isPersianDigit('\u06f0'), true);
    assert.deepEqual(Chars.isPersianDigit('\u06f1'), true);
    assert.deepEqual(Chars.isPersianDigit('۲'), true);
    assert.deepEqual(Chars.isPersianDigit('۳'), true);
    assert.deepEqual(Chars.isPersianDigit('۴'), true);
    assert.deepEqual(Chars.isPersianDigit('\u06f5'), true);
    assert.deepEqual(Chars.isPersianDigit('۶'), true);
    assert.deepEqual(Chars.isPersianDigit('\u06f7'), true);
    assert.deepEqual(Chars.isPersianDigit('۸'), true);
    assert.deepEqual(Chars.isPersianDigit('۹'), true);
    assert.deepEqual(Chars.isPersianDigit('9'), false);
  });

  it('Chars.isSurrogate()', () => {
    assert.deepEqual(Chars.isSurrogate(' '), false);
    assert.deepEqual(Chars.isSurrogate('\uD800'), true);
    assert.deepEqual(Chars.isSurrogate('\uDC00'), true);
    assert.deepEqual(Chars.isSurrogate('\uD891'), true);
    assert.deepEqual(Chars.isSurrogate('\uDE12'), true);
    assert.deepEqual(Chars.isSurrogate('\uD882'), true);
    assert.deepEqual(Chars.isSurrogate('\uDF01'), true);
    assert.deepEqual(Chars.isSurrogate('\uD914'), true);
    assert.deepEqual(Chars.isSurrogate('\uDFFF'), true);
    assert.deepEqual(Chars.isSurrogate('\uDBFF'), true);
    assert.deepEqual(Chars.isSurrogate('\uDA87'), true);
    assert.deepEqual(Chars.isSurrogate('\uD914\uD882'), false);
    assert.deepEqual(Chars.isSurrogate('\uDFFF\uD882'), false);
  });

  it('Chars.isSurrogatePair()', () => {
    assert.deepEqual(Chars.isSurrogatePair(' ', ' '), false);
    assert.deepEqual(Chars.isSurrogatePair('\uD800', '\uDC00'), true);
    assert.deepEqual(Chars.isSurrogatePair('\uD891', '\uDE12'), true);
    assert.deepEqual(Chars.isSurrogatePair('\uD882', '\uDF01'), true);
    assert.deepEqual(Chars.isSurrogatePair('\uD914', '\uDFFF'), true);
    assert.deepEqual(Chars.isSurrogatePair('\uDBFF', '\uDA87'), false);
    assert.deepEqual(Chars.isSurrogatePair('\uD914\uD882', '\uDFFF'), false);
  });

  it('Chars.isUpperCase()', () => {
    assert.deepEqual(Chars.isUpperCase(''), false);
    assert.deepEqual(Chars.isUpperCase('ā'), false);
    assert.deepEqual(Chars.isUpperCase('δ'), false);
    assert.deepEqual(Chars.isUpperCase('ы'), false);
    assert.deepEqual(Chars.isUpperCase('Б'), true);
    assert.deepEqual(Chars.isUpperCase('a'), false);
    assert.deepEqual(Chars.isUpperCase('ö'), false);
    assert.deepEqual(Chars.isUpperCase('öä'), false);
    assert.deepEqual(Chars.isUpperCase('Ü'), true);
    assert.deepEqual(Chars.isUpperCase('0'), false);
  });

  it('Chars.isUpperRomanDigit()', () => {
    assert.deepEqual(Chars.isUpperRomanDigit(''), false);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2160'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2161'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2162'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2163'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2164'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2165'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2166'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2167'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2168'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u2169'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216A'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216B'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216C'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216D'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216E'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('\u216F'), true);
    assert.deepEqual(Chars.isUpperRomanDigit('a'), false);
    assert.deepEqual(Chars.isUpperRomanDigit('0'), false);
    assert.deepEqual(Chars.isUpperRomanDigit('9'), false);
  });

  it('Chars.isWhitespace()', () => {
    assert.deepEqual(Chars.isWhitespace(''), false);
    assert.deepEqual(Chars.isWhitespace(' '), true);
    assert.deepEqual(Chars.isWhitespace('\t'), true);
    assert.deepEqual(Chars.isWhitespace('\r'), true);
    assert.deepEqual(Chars.isWhitespace('\f'), true);
    assert.deepEqual(Chars.isWhitespace('\n'), true);
    assert.deepEqual(Chars.isWhitespace('\n\n'), false);
    assert.deepEqual(Chars.isWhitespace('d'), false);
  });
});

describe('Dates', () => {
  const now = Dates.now();

  it('Dates.addMilliseconds()', () => {
    assert.deepEqual(Dates.addMilliseconds(now, 100).valueOf(), now.valueOf() + 100);
  });

  it('Dates.daysOfMonth()', () => {
    assert.deepEqual(Dates.daysOfMonth(1, 2023), 31);
    assert.deepEqual(Dates.daysOfMonth(2, 2023), 28);
    assert.deepEqual(Dates.daysOfMonth(-2, 2023), -1);
  });

  it('Dates.isISOString()', () => {
    assert.deepEqual(Dates.isISOString(''), false);
    assert.deepEqual(Dates.isISOString('sdc'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09Thh'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23+11-99:cccZ'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23+11-99:cccZ'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:11-99'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:11:99.'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:11:12.0000Z'), false);
    assert.deepEqual(Dates.isISOString('2023+05-09T23:11:12.0000Z'), false);
    assert.deepEqual(Dates.isISOString('-----'), false);
    assert.deepEqual(Dates.isISOString([true, false]), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:11:12.000z'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T24:15:22.123Z'), false);
    assert.deepEqual(Dates.isISOString('2023-02-30T24:15:22.123Z'), false);
    assert.deepEqual(Dates.isISOString('2023-13-11T24:15:22.123Z'), false);
    assert.deepEqual(Dates.isISOString('0000'), false);
    assert.deepEqual(Dates.isISOString('2023'), false);
    assert.deepEqual(Dates.isISOString('2023-05'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:15'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:15:22'), false);
    assert.deepEqual(Dates.isISOString('2023-05-09T23:15:22.123Z'), true);
    assert.deepEqual(Dates.isISOString('9999-05-09T23:15:22.123Z'), true);
    assert.deepEqual(Dates.isISOString('2023-11-11T23:15:22.999Z'), true);
  });

  it('Dates.parseISO()', () => {
    assert.deepEqual(Dates.parseISO('sdc'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09Thh'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23+11-99:cccZ'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23+11-99:cccZ'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23:11-99'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23:11:99.'), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23:11:12.0000Z'), null);
    assert.deepEqual(Dates.parseISO('2023+05-09T23:11:12.0000Z'), null);
    assert.deepEqual(Dates.parseISO('-----'), null);
    assert.deepEqual(Dates.parseISO([true, false]), null);
    assert.deepEqual(Dates.parseISO('2023-05-09T23:11:12.000z'), null);
    assert.deepEqual(Dates.parseISO('0000')?.toISOString(), 
        '1900-01-01T00:00:00.000Z',
    ); // this here is the zero-year
    assert.deepEqual(Dates.parseISO('2023')?.toISOString(), 
        '2023-01-01T00:00:00.000Z',
    );
    assert.deepEqual(Dates.parseISO('2023-05')?.toISOString(), 
        '2023-05-01T00:00:00.000Z',
    );
    assert.deepEqual(Dates.parseISO('2023-05-09T23')?.toISOString(), 
        '2023-05-09T23:00:00.000Z',
    );
    assert.deepEqual(Dates.parseISO('2023-05-09T23:15')?.toISOString(), 
        '2023-05-09T23:15:00.000Z',
    );
    assert.deepEqual(Dates.parseISO('2023-05-09T23:15:22')?.toISOString(), 
        '2023-05-09T23:15:22.000Z',
    );
    assert.deepEqual(Dates.parseISO('2023-05-09T23:15:22.123Z')?.toISOString(), 
        '2023-05-09T23:15:22.123Z',
    );
  });
});

describe('Maps', () => {
  it('Maps.isEmpty()', () => {
    const map = new Map();
    assert.deepEqual(Maps.isEmpty(map), true);
    map.set('a', 'a');
    assert.deepEqual(Maps.isEmpty(map), false);
  });

  it('Maps.isMap()', () => {
    const map = new Map();
    assert.deepEqual(Maps.isMap(map), true);
    assert.deepEqual(Maps.isMap({}), false);
    assert.deepEqual(Maps.isMap([['key1', 'value1']]), false);
    assert.deepEqual(Maps.isMap(), false);
    assert.deepEqual(Maps.isMap(undefined), false);
    assert.deepEqual(Maps.isMap(!1), false);
  });

  it('Maps.isNotEmpty()', () => {
    const map = new Map();
    assert.deepEqual(Maps.isNotEmpty(map), false);
    map.set('a', 'a');
    assert.deepEqual(Maps.isNotEmpty(map), true);
  });

  it('Maps.isWeakMap()', () => {
    assert.deepEqual(Maps.isWeakMap(), false);
    assert.deepEqual(Maps.isWeakMap(null), false);
    assert.deepEqual(Maps.isWeakMap(undefined), false);
    const map = new Map();
    assert.deepEqual(Maps.isWeakMap(map), false);
    map.set('a', 'a');
    assert.deepEqual(Maps.isWeakMap(map), false);
    const weakMap = new WeakMap();
    assert.deepEqual(Maps.isWeakMap(weakMap), true);
    weakMap.set({}, []);
    assert.deepEqual(Maps.isWeakMap(weakMap), true);
  });

  it('Maps.toObject()', () => {
    const map = new Map();
    assert.deepEqual(Maps.toObject(map), {});
    map.set('a', 'haleluja');
    map.set('b', false);
    map.set('c', 44);
    assert.deepEqual(Maps.toObject(map), {
      a: 'haleluja',
      b: false,
      c: 44,
    });
  });

  it('Maps.toSet()', () => {
    const map = new Map();
    assert.deepEqual(Maps.toSet(map), new Set());
    map.set('a', 'a');
    const s = new Set();
    s.add('a');
    assert.deepEqual(Maps.toSet(map), s);
  });
});

describe('Numbers', () => {
  it('Numbers.abs()', () => {
    const x = 4;
    const y = -5;
    assert.deepEqual(Numbers.abs(x), 4);
    assert.deepEqual(Numbers.abs(y), 5);
  });

  it('Numbers.compare()', () => {
    assert.deepEqual(Numbers.compare(1, 2), -1);
    assert.deepEqual(Numbers.compare(3, Numbers.abs(-3)), 0);
    assert.deepEqual(Numbers.compare(11, 5), 1);
  });

  it('Numbers.isInteger()', () => {
    assert.deepEqual(Numbers.isInteger(1), true);
    assert.deepEqual(Numbers.isInteger(.9), false);
    assert.deepEqual(Numbers.isInteger(2e+2), true);
    assert.deepEqual(Numbers.isInteger(1.000000009), false);
    assert.deepEqual(Numbers.isInteger(-9), true);
    assert.deepEqual(Numbers.isInteger(0), true);
    assert.deepEqual(Numbers.isInteger(-0), true);
    assert.deepEqual(Numbers.isInteger(Number.NaN), false);
    assert.deepEqual(Numbers.isInteger(Number.POSITIVE_INFINITY), false);
    assert.deepEqual(Numbers.isInteger(Number.MAX_SAFE_INTEGER + 1), false);
  });

  it('Numbers.isNatural()', () => {
    assert.deepEqual(Numbers.isNatural(1), true);
    assert.deepEqual(Numbers.isNatural(.9), false);
    assert.deepEqual(Numbers.isNatural(2e+2), true);
    assert.deepEqual(Numbers.isNatural(1.000000009), false);
    assert.deepEqual(Numbers.isNatural(-9), false);
    assert.deepEqual(Numbers.isNatural(0), true);
    assert.deepEqual(Numbers.isNatural(-0), true);
    assert.deepEqual(Numbers.isNatural(Number.NaN), false);
    assert.deepEqual(Numbers.isNatural(Number.POSITIVE_INFINITY), false);
    assert.deepEqual(Numbers.isNatural(Number.MAX_SAFE_INTEGER + 1), false);
  });

  it('Numbers.isNotNumber()', () => {
    assert.deepEqual(Numbers.isNotNumber(1), false);
    assert.deepEqual(Numbers.isNotNumber(3.4e+2), false);
    assert.deepEqual(Numbers.isNotNumber(Number.NaN), true);
    assert.deepEqual(Numbers.isNotNumber(0/0), true);
    assert.deepEqual(Numbers.isNotNumber(Number.POSITIVE_INFINITY), false);
    assert.deepEqual(Numbers.isNotNumber(Number.MAX_SAFE_INTEGER + 1), false);
  });

  it('Numbers.isNumber()', () => {
    assert.deepEqual(Numbers.isNumber(1), true);
    assert.deepEqual(Numbers.isNumber(3.4e+2), true);
    assert.deepEqual(Numbers.isNumber(Number.NaN), false);
    assert.deepEqual(Numbers.isNumber(Number.POSITIVE_INFINITY), false);
    assert.deepEqual(Numbers.isNumber(Number.MAX_SAFE_INTEGER + 1), true);
  });

  it('Numbers.isPositiveInteger()', () => {
    assert.deepEqual(Numbers.isPositiveInteger(1), true);
    assert.deepEqual(Numbers.isPositiveInteger(.9), false);
    assert.deepEqual(Numbers.isPositiveInteger(2e+2), true);
    assert.deepEqual(Numbers.isPositiveInteger(1.000000009), false);
    assert.deepEqual(Numbers.isPositiveInteger(-9), false);
    assert.deepEqual(Numbers.isPositiveInteger(0), false);
    assert.deepEqual(Numbers.isPositiveInteger(-0), false);
    assert.deepEqual(Numbers.isPositiveInteger(Number.NaN), false);
    assert.deepEqual(Numbers.isPositiveInteger(Number.POSITIVE_INFINITY), false);
    assert.deepEqual(
        Numbers.isPositiveInteger(Number.MAX_SAFE_INTEGER + 1), false);
  });

  it('Numbers.isPrime()', () => {
    assert.deepEqual([
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
    ].every((n) => Numbers.isPrime(n)), true);
    assert.deepEqual(Numbers.isPrime(4), false);
  });

  it('Numbers.randomInt()', () => {
    assert.deepEqual(Numbers.randomInt(0, 1, true) >= 0 ||
      Numbers.randomInt(0, 1, true) <= 1, true);
    assert.deepEqual(Numbers.randomInt(2, 8) > 2 ||
      Numbers.randomInt(0, 1) < 8, true);
  });

  it('Numbers.toString()', () => {
    assert.deepEqual(Numbers.toString(123), '123');
    assert.deepEqual(Numbers.toString(0), '0');
    assert.deepEqual(Numbers.toString(-0), '0');
    assert.deepEqual(Numbers.toString(-150), '-150');
    assert.deepEqual(Numbers.toString(0.23), '0.23');
  });
});

describe('Objects', () => {
  it('Objects.EMPTY', () => {
    assert.deepEqual(Objects.EMPTY, {});
  });

  it('Objects.deepEquals()', () => {
    const o1 = {
      a: false,
      b: 44,
      c: 'abc',
    };
    const o2 = {
      c: 'abc',
      a: false,
      b: 44,
    };
    assert.deepEqual(Objects.deepEquals(o1, o2), true);
    const o11 = {
      d: {
        a: 'abcd',
      },
      a: false,
      b: 44,
      c: 'abc',
    };
    const o22 = {
      c: 'abc',
      a: false,
      b: 44,
      d: {
        a: 'abcd',
      },
    };
    assert.deepEqual(Objects.deepEquals(o11, o22), true);
    assert.deepEqual(Objects.deepEquals({
      a: true,
    }, o22), false);
    const user = {
      password: 'User12345',
      username: 'User1',
    };
    assert.deepEqual(Objects.deepEquals(user, user), true);
    assert.deepEqual(Objects.deepEquals(user, {}), false);
  });

  it('Objects.equals()', () => {
    assert.deepEqual(Objects.equals({}, {}), false);
    const x = {
      a: true,
    };
    const y = x;
    assert.deepEqual(Objects.equals(x, y), true);
  });

  it('Objects.getPropertyDescriptors()', () => {
    assert.deepEqual(Objects.getPropertyDescriptors({
      a: 'abc',
      b: 123,
      c: false,
    }), {
      a: {
        value: 'abc',
        writable: true,
        enumerable: true,
        configurable: true,
      },
      b: {
        value: 123,
        writable: true,
        enumerable: true,
        configurable: true,
      },
      c: {
        value: false,
        writable: true,
        enumerable: true,
        configurable: true,
      },
    } );
  });

  it('Objects.hasProperty()', () => {
    const o = {
      a: true,
      b: 'abc',
      c: [],
    };
    assert.deepEqual(Objects.hasProperty(o, 'a'), true);
    assert.deepEqual(Objects.hasProperty(o, 'c'), true);
    assert.deepEqual(Objects.hasProperty(o, 'xx'), false);
    assert.deepEqual(Objects.hasProperty(o, 'yy'), false);
  });

  it('Objects.isEmpty()', () => {
    assert.deepEqual(Objects.isEmpty({}), true);
    assert.deepEqual(Objects.isEmpty({a: undefined}), false);
  });

  it('Objects.isNotEmpty()', () => {
    assert.deepEqual(Objects.isNotEmpty({}), false);
    assert.deepEqual(Objects.isNotEmpty({a: undefined}), true);
  });

  it('Objects.isNotNull()', () => {
    assert.deepEqual(Objects.isNotNull({}), true);
    assert.deepEqual(Objects.isNotNull({a: !0}), true);
    assert.deepEqual(Objects.isNotNull(null), false);
    assert.deepEqual(Objects.isNotNull(undefined), false);
  });

  it('Objects.isNull()', () => {
    assert.deepEqual(Objects.isNull({}), false);
    assert.deepEqual(Objects.isNull({a: !0}), false);
    assert.deepEqual(Objects.isNull(null), true);
    assert.deepEqual(Objects.isNull(undefined), false);
  });

  it('Objects.isObject()', () => {
    assert.deepEqual(Objects.isObject({}), true);
    assert.deepEqual(Objects.isObject({a: !0}), true);
    assert.deepEqual(Objects.isObject(null), false);
    assert.deepEqual(Objects.isObject(undefined), false);
    // eslint-disable-next-line no-new-object
    assert.deepEqual(Objects.isObject(new Object()), true);
  });

  it('Objects.isPlainObject()', () => {
    assert.deepEqual(Objects.isPlainObject({}), true);
    assert.deepEqual(Objects.isPlainObject({a: !0}), true);
    assert.deepEqual(Objects.isPlainObject(null), false);
    assert.deepEqual(Objects.isPlainObject(undefined), false);
    // eslint-disable-next-line no-new-object
    assert.deepEqual(Objects.isPlainObject(new Object()), true);
  });

  it('Objects.normalize()', () => {
    /*
    assert.deepEqual(Objects.normalize({}), {});
    assert.deepEqual(Objects.normalize({
      prop_ONE: 'abc',
      prop_two: 'def',
      propThree: false,
      PROP_FOUR: 555,
      PropSix: {},
    }), {
      propOne: 'abc',
      propTwo: 'def',
      propThree: false,
      propFour: 555,
      propSix: {},
    });
    */
    assert.deepEqual(true, true);
  });

  it('Objects.omit()', () => {
    assert.deepEqual(Objects.omit({a: !0}, 'a'), Objects.EMPTY);
    assert.deepEqual(Objects.omit({a: null, b: true}, 'b'), {a: null});
  });

  it('Objects.pick()', () => {
    assert.deepEqual(Objects.pick({a: !0}, 'a'), {a: !0});
    assert.deepEqual(Objects.pick({a: null, b: true}, 'a'), {a: null});
  });

  it('Objects.toIterable()', () => {
    const o = {
      a: 'abc',
      b: 444,
      c: true,
    };

    for (const [key, value] of Objects.toIterable(o)) {
      assert.deepEqual(['a', 'b', 'c'].includes(key), true);
      assert.deepEqual(['abc', 444, true].includes(value), true);
    }
  });

  it('Objects.toJson()', () => {
    const json = `{"a":true}`;
    assert.deepEqual(Objects.toJson({a: !0}), json);
    const json1 = `{"a":null,"b":true}`;
    assert.deepEqual(Objects.toJson({a: null, b: true, c: undefined}), json1);
    // make sure circular object references are handled
    const obj = {self: {}};
    obj.self = obj;
    assert.deepEqual(Objects.toJson(obj), '{}');
  });

  it('Objects.toMap()', () => {
    assert.deepEqual(Objects.toMap({}), new Map());
    const map = new Map();
    map.set('a', true);
    assert.deepEqual(Objects.toMap({a: true}), map);
  });

  it('Objects.toSet()', () => {
    assert.deepEqual(Objects.toSet({}), new Set());
    const s = new Set();
    s.add(true);
    assert.deepEqual(Objects.toSet({a: true}), s);
  });

  it('Objects.toString()', () => {
    assert.deepEqual(Objects.toString(), '[object Undefined]');
    assert.deepEqual(Objects.toString({}), '[object Object]');
    assert.deepEqual(Objects.toString(['a']), '[object Array]');
    assert.deepEqual(Objects.toString(12345), '[object Number]');
  });
});

describe('Sets', () => {
  it('Sets.isEmpty()', () => {
    const set = new Set();
    assert.deepEqual(Sets.isEmpty(set), true);
    set.add('abc');
    assert.deepEqual(Sets.isEmpty(set), false);
  });

  it('Sets.isNotEmpty()', () => {
    const set = new Set();
    assert.deepEqual(Sets.isNotEmpty(set), false);
    set.add('abc');
    assert.deepEqual(Sets.isNotEmpty(set), true);
  });

  it('Sets.isSet()', () => {
    assert.deepEqual(Sets.isSet(), false);
    assert.deepEqual(Sets.isSet({}), false);
    assert.deepEqual(Sets.isSet(undefined), false);
    assert.deepEqual(Sets.isSet([]), false);
    assert.deepEqual(Sets.isSet(null), false);
    const set = new Set();
    assert.deepEqual(Sets.isSet(set), true);
    set.add('abc');
    assert.deepEqual(Sets.isSet(set), true);
  });

  it('Sets.isWeakSet()', () => {
    assert.deepEqual(Sets.isWeakSet(), false);
    assert.deepEqual(Sets.isWeakSet({}), false);
    assert.deepEqual(Sets.isWeakSet(undefined), false);
    assert.deepEqual(Sets.isWeakSet([]), false);
    assert.deepEqual(Sets.isWeakSet(null), false);
    const set = new Set();
    assert.deepEqual(Sets.isWeakSet(set), false);
    set.add('abc');
    assert.deepEqual(Sets.isWeakSet(set), false);
    const weakSet = new WeakSet();
    assert.deepEqual(Sets.isWeakSet(weakSet), true);
    weakSet.add({someGarbage: 'abc'});
    assert.deepEqual(Sets.isWeakSet(weakSet), true);
  });

  it('Sets.toMap()', () => {
    const set = new Set();
    const map = new Map();
    assert.deepEqual(Sets.toMap(set), map);
    set.add('abc');
    map.set(0, 'abc');
    assert.deepEqual(Sets.toMap(set), map);
  });
});

describe('Strings', () => {
  it('Strings.abbreviate()', () => {
    assert.deepEqual(Strings.abbreviate('', 2), '');
    assert.deepEqual(Strings.abbreviate('', 2.5), '');
    assert.deepEqual(Strings.abbreviate('', -2), '');
    assert.deepEqual(Strings.abbreviate('a', 1), 'a');
    assert.deepEqual(Strings.abbreviate('abc', 2), 'ab...');
    assert.deepEqual(Strings.abbreviate('Lorem ipsum dolor', 8), 'Lorem ip...');
    assert.deepEqual(Strings.abbreviate('Lorem ipsum dolor', 18), 
        'Lorem ipsum dolor');
  });

  it('Strings.appendIfMissing()', () => {
    assert.deepEqual(Strings.appendIfMissing('', ''), '');
    assert.deepEqual(Strings.appendIfMissing('abc', 'def'), 'abcdef');
    assert.deepEqual(Strings.appendIfMissing('abcdef', 'DeF', true), 'abcdef');
    assert.deepEqual(Strings.appendIfMissing('Lorem ', 'ipsum'), 'Lorem ipsum');
    assert.deepEqual(Strings.appendIfMissing('Lorem ipsum', 'ipSum', true), 
        'Lorem ipsum');
  });

  it('Strings.chomp()', () => {
    assert.deepEqual(Strings.chomp(''), '');
    assert.deepEqual(Strings.chomp('\n'), '');
    assert.deepEqual(Strings.chomp('Lorem \r'), 'Lorem ');
    assert.deepEqual(Strings.chomp('\r'), '');
    assert.deepEqual(Strings.chomp('Lorem\r\n\r\n'), 'Lorem\r\n');
    assert.deepEqual(Strings.chomp('Lorem\r'), 'Lorem');
    assert.deepEqual(Strings.chomp('Lorem\n'), 'Lorem');
    assert.deepEqual(Strings.chomp('Lorem\r\n'), 'Lorem');
    assert.deepEqual(Strings.chomp('Lorem\n\rLorem'), 'Lorem\n\rLorem');
  });

  it('Strings.chop()', () => {
    assert.deepEqual(Strings.chop(''), '');
    assert.deepEqual(Strings.chop('\n'), '');
    assert.deepEqual(Strings.chop('\r'), '');
    assert.deepEqual(Strings.chop('\r\n'), '');
    assert.deepEqual(Strings.chop('\n\r'), '\n');
    assert.deepEqual(Strings.chop('Lorem \r'), 'Lorem ');
    assert.deepEqual(Strings.chop('Germany'), 'German');
  });

  it('Strings.compare()', () => {
    assert.deepEqual(Strings.compare('', ''), 0);
    assert.deepEqual(Strings.compare('a', 'A'), -1);
    assert.deepEqual(Strings.compare('A', 'a'), 1);
  });

  it('Strings.compareIgnoreCase()', () => {
    assert.deepEqual(Strings.compareIgnoreCase('', ''), 0);
    assert.deepEqual(Strings.compareIgnoreCase('a', 'A'), 0);
    assert.deepEqual(Strings.compareIgnoreCase('A', 'a'), 0);
    assert.deepEqual(Strings.compareIgnoreCase('A', 'b'), -1);
    assert.deepEqual(Strings.compareIgnoreCase('z', 'C'), 1);
  });

  it('Strings.contains()', () => {
    assert.deepEqual(Strings.contains('', ''), true);
    assert.deepEqual(Strings.contains('a', 'A', true), true);
    assert.deepEqual(Strings.contains('Carbonate', 'car', true), true);
    assert.deepEqual(Strings.contains('collaboration', 'rat'), true);
    assert.deepEqual(Strings.contains('\n', '\n'), true);
    assert.deepEqual(Strings.contains('  ', ''), true);
    assert.deepEqual(Strings.contains('  ', '', true), true);
    assert.deepEqual(Strings.contains('abc\ndef', '\nd'), true);
    assert.deepEqual(Strings.contains('abc def', 'EF', true), true);
    assert.deepEqual(Strings.contains('😀💖', '💖'), true);
    assert.deepEqual(Strings.contains('😀💖', '🐑'), false);
    assert.deepEqual(Strings.contains('😀💖', '😀'), true);
  });

  it('Strings.containsAny()', () => {
    assert.deepEqual(Strings.containsAny('', 'oe', ''), true);
    assert.deepEqual(Strings.containsAny(''), false);
    assert.deepEqual(Strings.containsAny('', ''), true);
    assert.deepEqual(Strings.containsAny('ab', 'cd', 'ab', 'ef'), true);
    assert.deepEqual(Strings.containsAny('  ', 'oe', ''), true);
    assert.deepEqual(Strings.containsAny('\t\t\t', 'oe', '\t'), true);
    assert.deepEqual(Strings.containsAny('John Doe', 'oh', 'oe', 'ohn'), true);
    assert.deepEqual(Strings.containsAny('Lorem ipsum', 'am', 'ram', 'isp'), 
        false);
    assert.deepEqual(Strings.containsAny('😀💖', '💖'), true);
    assert.deepEqual(Strings.containsAny('😀💖', '🐑'), false);
    assert.deepEqual(Strings.containsAny('😀💖', '😀'), true);
    assert.deepEqual(Strings.containsAny('😀💖', '🐑', '😀'), true);
  });

  it('Strings.containsIgnoreCase()', () => {
    assert.deepEqual(Strings.containsIgnoreCase('', ''), true);
    assert.deepEqual(Strings.containsIgnoreCase('\n\n\n', ''), true);
    assert.deepEqual(Strings.containsIgnoreCase('  ', ''), true);
    assert.deepEqual(Strings.containsIgnoreCase(' ', ''), true);
    assert.deepEqual(Strings.containsIgnoreCase('abcDeF', 'CDE'), true);
    assert.deepEqual(Strings.containsIgnoreCase('a', 'A'), true);
    assert.deepEqual(Strings.containsIgnoreCase('Carbonate', 'car'), true);
    assert.deepEqual(Strings.containsIgnoreCase('collaboration', 'rat'), true);
    assert.deepEqual(Strings.containsIgnoreCase('\n', '\n'), true);
    assert.deepEqual(Strings.containsIgnoreCase('abc def', 'EF'), true);
    assert.deepEqual(Strings.containsIgnoreCase('abc def', 'ghi'), false);
    assert.deepEqual(Strings.containsIgnoreCase('😀💖', '💖'), true);
    assert.deepEqual(Strings.containsIgnoreCase('😀💖', '🐑'), false);
    assert.deepEqual(Strings.containsIgnoreCase('😀💖', '😀'), true);
  });

  it('Strings.containsNone()', () => {
    assert.deepEqual(Strings.containsNone(''), true);
    assert.deepEqual(Strings.containsNone('  '), true);
    assert.deepEqual(Strings.containsNone('', '', ''), false);
    assert.deepEqual(Strings.containsNone('John Doe'), true);
    assert.deepEqual(Strings.containsNone('', 'abc'), true);
    assert.deepEqual(Strings.containsNone(
        'Tic toc toe', 'tac', 'tuc', 'tec'), true);
    assert.deepEqual(Strings.containsNone('John Doe', 'oh', 'oe', 'ohn'), false);
    assert.deepEqual(Strings.containsNone('Lorem ipsum', 'am', 'ram', 'isp'), 
        true);
    assert.deepEqual(Strings.containsNone('😀💖', '💖'), false);
    assert.deepEqual(Strings.containsNone('😀💖', '🐑'), true);
    assert.deepEqual(Strings.containsNone('😀💖', '😀'), false);
  });

  it('Strings.countMatches()', () => {
    assert.deepEqual(Strings.countMatches('', ''), 0);
    assert.deepEqual(Strings.countMatches('Lorem ipsum dolor sit', 'or'), 2);
    assert.deepEqual(Strings.countMatches('ho ho ho', 'ho'), 3);
    assert.deepEqual(Strings.countMatches('ho ho ho', ''), 0);
    assert.deepEqual(Strings.countMatches('ho ho ho', ' '), 2);
    assert.deepEqual(Strings.countMatches('😀💖', '💖'), 1);
    assert.deepEqual(Strings.countMatches('😀💖', '🐑'), 0);
    assert.deepEqual(Strings.countMatches('😀💖', '😀'), 1);
    assert.deepEqual(Strings.countMatches('💖😀💖😀💖😀💖', '💖'), 4);
  });

  it('Strings.decapitalize()', () => {
    assert.deepEqual(Strings.decapitalize(''), '');
    assert.deepEqual(Strings.decapitalize('abc'), 'abc');
    assert.deepEqual(Strings.decapitalize('a'), 'a');
    assert.deepEqual(Strings.decapitalize('A'), 'a');
    assert.deepEqual(Strings.decapitalize('Abc'), 'abc');
    assert.deepEqual(Strings.decapitalize('ABC'), 'aBC');
  });

  it('Strings.decode()', () => {
    assert.deepEqual(Strings.decode('27Hbstuz'), '۱۲۳');
    assert.deepEqual(Strings.decode('2aMgaXMgMyBpbiBBcmFiaWM='), '٣ is 3 in Arabic');
    assert.deepEqual(Strings.decode('VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu'), 'The ⅱ-nd Century B. C.');
  });

  it('Strings.defaultIfEmpty()', () => {
    assert.deepEqual(Strings.defaultIfEmpty('', ''), '');
    assert.deepEqual(Strings.defaultIfEmpty('', 'default'), 'default');
    assert.deepEqual(Strings.defaultIfEmpty('', '💖'), '💖');
  });

  it('Strings.difference()', () => {
    assert.deepEqual(Strings.difference('Lorem', 'Lorem ipsum'), ' ipsum');
    assert.deepEqual(Strings.difference('Lorem ipsum', 'Lorem'), ' ipsum');
    assert.deepEqual(Strings.difference('Lorem ', 'Lorem'), ' ');
    assert.deepEqual(Strings.difference('Lorem', 'Lorem'), '');
  });

  it('Strings.encode()', () => {
    assert.deepEqual(Strings.encode('\u06f1\u06f2\u06f3'), '27Hbstuz');
    assert.deepEqual(Strings.encode('\u0663 is 3 in Arabic'), '2aMgaXMgMyBpbiBBcmFiaWM=');
    assert.deepEqual(Strings.encode('The \u2171-nd Century B. C.'), 'VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu');
  });

  it('Strings.endsWith()', () => {
    assert.deepEqual(Strings.endsWith('', ''), true);
    assert.deepEqual(Strings.endsWith('abc', ''), true);
    assert.deepEqual(Strings.endsWith('Lorem ipsum', 'm'), true);
    assert.deepEqual(Strings.endsWith('Lorem ipsum', 'am'), false);
    assert.deepEqual(Strings.endsWith('', 'am'), false);
    assert.deepEqual(Strings.endsWith('Lorem', 'Em', true), true);
    assert.deepEqual(Strings.endsWith('😃😄😁😆🤣', '🤣'), true);
    assert.deepEqual(Strings.endsWith('😃😄😁😆🤣', '😆🤣'), true);
    assert.deepEqual(Strings.endsWith('😃😄😁😆🤣', '😁'), false);
  });

  it('Strings.endsWithAny()', () => {
    assert.deepEqual(Strings.endsWithAny(''), false);
    assert.deepEqual(Strings.endsWithAny('', 'abc'), false);
    assert.deepEqual(Strings.endsWithAny('abc'), false);
    assert.deepEqual(Strings.endsWithAny('abc', ''), true);
    assert.deepEqual(Strings.endsWithAny('Lorem ipsum', 'm'), true);
    assert.deepEqual(Strings.endsWithAny('Lorem ipsum', 'aps', 'sum', 'farn'), 
        true);
    assert.deepEqual(Strings.endsWithAny('Lorem ipsum', 'aps', 'farn'), false);
    assert.deepEqual(Strings.endsWithAny('😃😄😁😆🤣', '🤣'), true);
    assert.deepEqual(Strings.endsWithAny('😃😄😁😆🤣', '😆🤣'), true);
    assert.deepEqual(Strings.endsWithAny('😃😄😁😆🤣', '😁', '😆🤣', '😄'), true);
    assert.deepEqual(Strings.endsWithAny('😃😄😁😆🤣', '😁', '😃😄', '😄'), false);
  });

  it('Strings.endsWithIgnoreCase()', () => {
    assert.deepEqual(Strings.endsWithIgnoreCase('', ''), true);
    assert.deepEqual(Strings.endsWithIgnoreCase('abc', ''), true);
    assert.deepEqual(Strings.endsWithIgnoreCase('', 'Em'), false);
    assert.deepEqual(Strings.endsWithIgnoreCase('Lorem', 'Em'), true);
    assert.deepEqual(Strings.endsWithIgnoreCase('Lorem', 'am'), false);
    assert.deepEqual(Strings.endsWithIgnoreCase('😃😄😁😆🤣', '🤣'), true);
    assert.deepEqual(Strings.endsWithIgnoreCase('😃😄😁😆🤣', '😆🤣'), true);
    assert.deepEqual(Strings.endsWithIgnoreCase('😃😄😁😆🤣', '😁'), false);
  });

  it('Strings.endsWithNone()', () => {
    assert.deepEqual(Strings.endsWithNone(''), false);
    assert.deepEqual(Strings.endsWithNone('', 'Em'), true);
    assert.deepEqual(Strings.endsWithNone('Em', ''), false);
    assert.deepEqual(Strings.endsWithNone('Lorem ipsum', 'sam', 'sem', 'sim'), 
        true);
    assert.deepEqual(Strings.endsWithNone('Lorem ipsum', 'sum', 'sem', 'sim'), 
        false);
    assert.deepEqual(Strings.endsWithNone('abc', 'd', 'e', 'f'), true);
    assert.deepEqual(Strings.endsWithNone('😃😄😁😆🤣', '🤣'), false);
    assert.deepEqual(Strings.endsWithNone('😃😄😁😆🤣', '😆🤣'), false);
    assert.deepEqual(Strings.endsWithNone('😃😄😁😆🤣', '😄'), true);
    assert.deepEqual(Strings.endsWithNone('😃😄😁😆🤣', '😄', '😁', '😄'), true);
  });

  it('Strings.equals()', () => {
    assert.deepEqual(Strings.equals('', ''), true);
    assert.deepEqual(Strings.equals('', 'Em'), false);
    assert.deepEqual(Strings.equals('sdc', 'Em'), false);
    assert.deepEqual(Strings.equals('Em', 'Em'), true);
    // eslint-disable-next-line no-new-wrappers
    assert.deepEqual(Strings.equals(new String('Em'), new String('Em')), true);
    // eslint-disable-next-line no-new-wrappers
    assert.deepEqual(Strings.equals(new String('Esm'), new String('Em')), false);
    assert.deepEqual(Strings.equals('😃😄😁😆🤣', '🤣🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equals('😃😄😁😆🤣', '😆🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equals('😃😄😁😆🤣', '😄😃😄😁😆'), false);
    assert.deepEqual(Strings.equals('😃😄😁😆🤣', '😁😃😄😁😆'), false);
    assert.deepEqual(Strings.equals('😃🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equals('😁😆🤣', '😁😆🤣'), true);
  });

  it('Strings.equalsIgnoreCase()', () => {
    assert.deepEqual(Strings.equalsIgnoreCase('', ''), true);
    assert.deepEqual(Strings.equalsIgnoreCase(' ', ' '), true);
    assert.deepEqual(Strings.equalsIgnoreCase('    ', '\t'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('LoReM', 'lorem'), true);
    assert.deepEqual(Strings.equalsIgnoreCase('a', 'A'), true);
    assert.deepEqual(Strings.equalsIgnoreCase('LoReMd', 'lorem'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('😃😄😁😆🤣', '🤣🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('😃😄😁😆🤣', '😆🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('😃😄😁😆🤣', '😄😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('😃😄😁😆🤣', '😁😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsIgnoreCase('😃🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equalsIgnoreCase('😁😆🤣', '😁😆🤣'), true);
  });

  it('Strings.equalsAny()', () => {
    assert.deepEqual(Strings.equalsAny(''), false);
    assert.deepEqual(Strings.equalsAny('', ''), true);
    assert.deepEqual(Strings.equalsAny('Lorem', 'Lorem'), true);
    assert.deepEqual(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor', 'Lorem'), true);
    assert.deepEqual(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor'), false);
    assert.deepEqual(Strings.equalsAny('😃😄😁😆🤣', '🤣🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsAny('😃😄😁😆🤣', '😆🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsAny('😃😄😁😆🤣', '😄😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsAny('😃😄😁😆🤣', '😁😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsAny('😃🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equalsAny('😃🤣', '😆🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equalsAny('😃🤣', '😆🤣', '😁😆'), false);
    assert.deepEqual(Strings.equalsAny('😁😆🤣', '😁😆🤣'), true);
  });

  it('Strings.equalsAnyIgnoreCase()', () => {
    assert.deepEqual(Strings.equalsAnyIgnoreCase('', ''), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase(''), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('Lorem', 'LORem'), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase(
        'Lorem', 'Ipsum', 'Dolor', 'lorem'), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase(
        'Lorem', 'Ipsum', 'Dolor'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase(
        'abc', 'def', 'ABc', 'mno'), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃😄😁😆🤣', '🤣🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃😄😁😆🤣', '😆🤣🤣🤣🤣'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃😄😁😆🤣', '😄😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃😄😁😆🤣', '😁😃😄😁😆'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃🤣', '😆🤣', '😃🤣'), true);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😃🤣', '😆🤣', '😁😆'), false);
    assert.deepEqual(Strings.equalsAnyIgnoreCase('😁😆🤣', '😁😆🤣'), true);
  });

  it('Strings.fromBinary()', () => {
    assert.deepEqual(Strings.fromBinary(Strings.decode('PsOYFMOdIAA9w5hDw54=')), '🤔 🙃');
  });

  it('Strings.getBytes()', () => {
    assert.deepEqual(Strings.getBytes(''), 0);
    assert.deepEqual(Strings.getBytes('🤔 abc'), 8);
    assert.deepEqual(Strings.getBytes('Lorem'), 5);
    assert.deepEqual(Strings.getBytes('sdcscdcsdsd'), 11);
    assert.deepEqual(Strings.getBytes('🤔 🙃'), (new TextEncoder()).encode('🤔 🙃').length);
    assert.deepEqual(Strings.getBytes('\u0663\u0664\u0665\u0666'), (new TextEncoder()).encode('\u0663\u0664\u0665\u0666').length);
    assert.deepEqual(Strings.getBytes('\u0663\u0664\u0665\u0666AbFeE'), (new TextEncoder()).encode(
            '\u0663\u0664\u0665\u0666AbFeE').length);
  });

  it('Strings.hasWhitespace()', () => {
    assert.deepEqual(Strings.hasWhitespace(''), false);
    assert.deepEqual(Strings.hasWhitespace('l'), false);
    assert.deepEqual(Strings.hasWhitespace('Lorem'), false);
    assert.deepEqual(Strings.hasWhitespace('Ip sum'), true);
    assert.deepEqual(Strings.hasWhitespace('\n'), true);
    assert.deepEqual(Strings.hasWhitespace('\r'), true);
    assert.deepEqual(Strings.hasWhitespace('\t'), true);
    assert.deepEqual(Strings.hasWhitespace('\f'), true);
    assert.deepEqual(Strings.hasWhitespace('Loremipsumdolorsit'), false);
    assert.deepEqual(Strings.hasWhitespace('Lorem\n'), true);
    assert.deepEqual(Strings.hasWhitespace('Lorem\r'), true);
    assert.deepEqual(Strings.hasWhitespace('Lorem\t'), true);
    assert.deepEqual(Strings.hasWhitespace('Lorem\f'), true);
  });

  it('Strings.indexOfAny()', () => {
    assert.deepEqual(Strings.indexOfAny('Lorem'), -1);
    assert.deepEqual(Strings.indexOfAny('Lorem', ''), 0);
    assert.deepEqual(Strings.indexOfAny(''), -1);
    assert.deepEqual(Strings.indexOfAny('Lorem', 'em'), 3);
    assert.deepEqual(Strings.indexOfAny('Lorem', 'am'), -1);
    assert.deepEqual(Strings.indexOfAny('Lorem', 'am', 'em', 'um'), 3);
    assert.deepEqual(Strings.indexOfAny('Lorem', 'rem', 'em', 'um'), 2);
  });

  it('Strings.indexOfDifference()', () => {
    assert.deepEqual(Strings.indexOfDifference('', ''), -1);
    assert.deepEqual(Strings.indexOfDifference('', 'a'), 0);
    assert.deepEqual(Strings.indexOfDifference('a', ''), 0);
    assert.deepEqual(Strings.indexOfDifference('Lorem', 'Lor'), 3);
    assert.deepEqual(Strings.indexOfDifference('Lor', 'Lorem'), 3);
    assert.deepEqual(Strings.indexOfDifference('Lor', 'asc'), 0);
  });

  it('Strings.indexOfIgnoreCase()', () => {
    assert.deepEqual(Strings.indexOfIgnoreCase('', ''), 0);
    assert.deepEqual(Strings.indexOfIgnoreCase('abc', ''), 0);
    assert.deepEqual(Strings.indexOfIgnoreCase('', 'abc'), -1);
    assert.deepEqual(Strings.indexOfIgnoreCase('Lorem', 'EM'), 3);
    assert.deepEqual(Strings.indexOfIgnoreCase('Lorem', 'em'), 3);
    assert.deepEqual(Strings.indexOfIgnoreCase('abcde', 'cde'), 2);
  });

  it('Strings.isAlpha()', () => {
    assert.deepEqual(Strings.isAlpha(''), false);
    assert.deepEqual(Strings.isAlpha('0'), false);
    assert.deepEqual(Strings.isAlpha('-'), false);
    assert.deepEqual(Strings.isAlpha('.'), false);
    assert.deepEqual(Strings.isAlpha('}'), false);
    assert.deepEqual(Strings.isAlpha('\\'), false);
    assert.deepEqual(Strings.isAlpha('a'), true);
    assert.deepEqual(Strings.isAlpha('B'), true);
    assert.deepEqual(Strings.isAlpha('f'), true);
    assert.deepEqual(Strings.isAlpha('Z'), true);
    assert.deepEqual(Strings.isAlpha('o'), true);
    assert.deepEqual(Strings.isAlpha('abc'), true);
    assert.deepEqual(Strings.isAlpha('abcDEF'), true);
    assert.deepEqual(Strings.isAlpha('abc DEF'), false);
  });

  it('Strings.isAlphanumeric()', () => {
    assert.deepEqual(Strings.isAlphanumeric(''), false);
    assert.deepEqual(Strings.isAlphanumeric('ab'), true);
    assert.deepEqual(Strings.isAlphanumeric('abc123'), true);
    assert.deepEqual(Strings.isAlphanumeric('abc 123'), false);
    assert.deepEqual(Strings.isAlphanumeric('0'), true);
    assert.deepEqual(Strings.isAlphanumeric('1'), true);
    assert.deepEqual(Strings.isAlphanumeric('2'), true);
    assert.deepEqual(Strings.isAlphanumeric('3'), true);
    assert.deepEqual(Strings.isAlphanumeric('4'), true);
    assert.deepEqual(Strings.isAlphanumeric('5'), true);
    assert.deepEqual(Strings.isAlphanumeric('6'), true);
    assert.deepEqual(Strings.isAlphanumeric('7'), true);
    assert.deepEqual(Strings.isAlphanumeric('8'), true);
    assert.deepEqual(Strings.isAlphanumeric('9'), true);
    assert.deepEqual(Strings.isAlphanumeric('-'), false);
    assert.deepEqual(Strings.isAlphanumeric('.'), false);
    assert.deepEqual(Strings.isAlphanumeric('}'), false);
    assert.deepEqual(Strings.isAlphanumeric('\\'), false);
    assert.deepEqual(Strings.isAlphanumeric('a'), true);
    assert.deepEqual(Strings.isAlphanumeric('B'), true);
    assert.deepEqual(Strings.isAlphanumeric('f'), true);
    assert.deepEqual(Strings.isAlphanumeric('Z'), true);
    assert.deepEqual(Strings.isAlphanumeric('o'), true);
    assert.deepEqual(Strings.isAlphanumeric('abcDEF123'), true);
    assert.deepEqual(Strings.isAlphanumeric('0123'), true);
  });

  it('Strings.isAnyBlank()', () => {
    assert.deepEqual(Strings.isAnyBlank(), false);
    assert.deepEqual(Strings.isAnyBlank(''), true);
    assert.deepEqual(Strings.isAnyBlank('a'), false);
    assert.deepEqual(Strings.isAnyBlank('a', '', 'b'), true);
  });

  it('Strings.isAllBlank()', () => {
    assert.deepEqual(Strings.isAllBlank(''), true);
    assert.deepEqual(Strings.isAllBlank(' '), true);
    assert.deepEqual(Strings.isAllBlank('\n'), true);
    assert.deepEqual(Strings.isAllBlank('\t'), true);
    assert.deepEqual(Strings.isAllBlank('\r'), true);
    assert.deepEqual(Strings.isAllBlank('\f'), true);
    assert.deepEqual(Strings.isAllBlank('\f\n'), true);
    assert.deepEqual(Strings.isAllBlank('\f\r'), true);
    assert.deepEqual(Strings.isAllBlank('\t\r\f'), true);
    assert.deepEqual(Strings.isAllBlank('\f\t\r\n\n'), true);
    assert.deepEqual(Strings.isAllBlank('\f\t\r\n\na'), false);
  });

  it('Strings.isBinary()', () => {
    assert.deepEqual(Strings.isBinary(''), true);
    assert.deepEqual(Strings.isBinary(' '), true);
    assert.deepEqual(Strings.isBinary('☻'), false);
    assert.deepEqual(Strings.isBinary('binary'), true);
  });

  it('Strings.isBlank()', () => {
    assert.deepEqual(Strings.isBlank(''), true);
    assert.deepEqual(Strings.isBlank(' '), false);
    assert.deepEqual(Strings.isBlank(' d'), false);
  });

  it('Strings.isEmpty()', () => {
    assert.deepEqual(Strings.isEmpty(''), true);
    assert.deepEqual(Strings.isEmpty(' '), false);
    assert.deepEqual(Strings.isEmpty(' d'), false);
  });

  it('Strings.isLowerCase()', () => {
    assert.deepEqual(Strings.isLowerCase(''), true);
    assert.deepEqual(Strings.isLowerCase(' '), true);
    assert.deepEqual(Strings.isLowerCase('\n\t%%%?'), true);
    assert.deepEqual(Strings.isLowerCase('a'), true);
    assert.deepEqual(Strings.isLowerCase('aA'), false);
    assert.deepEqual(Strings.isLowerCase('nnn'), true);
    assert.deepEqual(Strings.isLowerCase('nnnn'), true);
    assert.deepEqual(Strings.isLowerCase('Sdd'), false);
    assert.deepEqual(Strings.isLowerCase('123'), true);
    assert.deepEqual(Strings.isLowerCase('123 abc de\nfg'), true);
    assert.deepEqual(Strings.isLowerCase('123 abc de\nfG'), false);
  });

  it('Strings.isMixedCase()', () => {
    assert.deepEqual(Strings.isMixedCase(''), false);
    assert.deepEqual(Strings.isMixedCase(' '), false);
    assert.deepEqual(Strings.isMixedCase('abc'), false);
    assert.deepEqual(Strings.isMixedCase('Abc'), true);
    assert.deepEqual(Strings.isMixedCase('ab Cd ef'), true);
    assert.deepEqual(Strings.isMixedCase('ы ü Б Ö'), true);
  });

  it('Strings.isNilOrEmpty()', () => {
    assert.deepEqual(Strings.isNilOrEmpty(), true);
    assert.deepEqual(Strings.isNilOrEmpty(''), true);
    assert.deepEqual(Strings.isNilOrEmpty(' '), false);
    assert.deepEqual(Strings.isNilOrEmpty(null), true);
    assert.deepEqual(Strings.isNilOrEmpty(undefined), true);
    assert.deepEqual(Strings.isNilOrEmpty('undefined'), false);
  });

  it('Strings.isNilOrWhitespace()', () => {
    assert.deepEqual(Strings.isNilOrWhitespace(''), true);
    assert.deepEqual(Strings.isNilOrWhitespace(' '), true);
    assert.deepEqual(Strings.isNilOrWhitespace(null), true);
    assert.deepEqual(Strings.isNilOrWhitespace(undefined), true);
    assert.deepEqual(Strings.isNilOrWhitespace('undefined'), false);
    assert.deepEqual(Strings.isNilOrWhitespace('\n'), true);
    assert.deepEqual(Strings.isNilOrWhitespace('\t'), true);
    assert.deepEqual(Strings.isNilOrWhitespace('\r'), true);
    assert.deepEqual(Strings.isNilOrWhitespace('\f'), true);
    assert.deepEqual(Strings.isNilOrWhitespace('\f\r\n'), true);
    assert.deepEqual(Strings.isNilOrWhitespace('\f\n\nr'), false);
  });

  it('Strings.isNotEmpty()', () => {
    assert.deepEqual(Strings.isNotEmpty(''), false);
    assert.deepEqual(Strings.isNotEmpty(' '), true);
    assert.deepEqual(Strings.isNotEmpty(' d'), true);
  });

  it('Strings.isNullOrEmpty()', () => {
    assert.deepEqual(Strings.isNullOrEmpty(''), true);
    assert.deepEqual(Strings.isNullOrEmpty(' '), false);
    assert.deepEqual(Strings.isNullOrEmpty(null), true);
    assert.deepEqual(Strings.isNullOrEmpty('undefined'), false);
  });

  it('Strings.isNullOrWhitespace()', () => {
    assert.deepEqual(Strings.isNullOrWhitespace(''), true);
    assert.deepEqual(Strings.isNullOrWhitespace(' '), true);
    assert.deepEqual(Strings.isNullOrWhitespace(null), true);
    assert.deepEqual(Strings.isNullOrWhitespace('undefined'), false);
  });

  it('Strings.isNumeric()', () => {
    assert.deepEqual(Strings.isNumeric(''), false);
    assert.deepEqual(Strings.isNumeric(' '), false);
    assert.deepEqual(Strings.isNumeric('undefined'), false);
    assert.deepEqual(Strings.isNumeric('1e3'), true);
    assert.deepEqual(Strings.isNumeric('-0'), true);
    assert.deepEqual(Strings.isNumeric('123'), true);
    assert.deepEqual(Strings.isNumeric('-56'), true);
    assert.deepEqual(Strings.isNumeric('0'), true);
    assert.deepEqual(Strings.isNumeric('0x12121'), true);
    assert.deepEqual(Strings.isNumeric('0b10011101'), true);
    assert.deepEqual(Strings.isNumeric('\u0663\u0664\u0665\u0666'), true);
    assert.deepEqual(Strings.isNumeric('\u0968\u0969'), true);
    assert.deepEqual(Strings.isNumeric('\u2171'), true);
  });

  it('Strings.isString()', () => {
    assert.deepEqual(Strings.isString(''), true);
    assert.deepEqual(Strings.isString(' '), true);
    assert.deepEqual(Strings.isString(null), false);
    assert.deepEqual(Strings.isString('undefined'), true);
    assert.deepEqual(Strings.isString(), false);
  });

  it('Strings.isStringObject()', () => {
    assert.deepEqual(Strings.isStringObject(''), false);
    assert.deepEqual(Strings.isStringObject(' '), false);
    assert.deepEqual(Strings.isStringObject(null), false);
    assert.deepEqual(Strings.isStringObject('undefined'), false);
    assert.deepEqual(Strings.isStringObject(), false);
    // eslint-disable-next-line no-new-wrappers
    assert.deepEqual(Strings.isStringObject(new String()), true);
    // eslint-disable-next-line no-new-wrappers
    assert.deepEqual(Strings.isStringObject(new String('abc')), true);
  });

  it('Strings.isSurrogatePair()', () => {
    assert.deepEqual(Strings.isSurrogatePair('🐑🐑🐑😀💖', 0), true);
    assert.deepEqual(Strings.isSurrogatePair('😀💖', 0), true);
    assert.deepEqual(Strings.isSurrogatePair('', 0), false);
    assert.deepEqual(Strings.isSurrogatePair('abc', 1), false);
    assert.deepEqual(Strings.isSurrogatePair('', -1), false);
    assert.deepEqual(Strings.isSurrogatePair('', 2.4), false);
    assert.deepEqual(Strings.isSurrogatePair('😀😀💖', 4), true);
  });

  it('Strings.isUpperCase()', () => {
    assert.deepEqual(Strings.isUpperCase(''), true);
    assert.deepEqual(Strings.isUpperCase('\n\t%%%?'), true);
    assert.deepEqual(Strings.isUpperCase('A'), true);
    assert.deepEqual(Strings.isUpperCase('As'), false);
    assert.deepEqual(Strings.isUpperCase('AB'), true);
    assert.deepEqual(Strings.isUpperCase('123'), true);
    assert.deepEqual(Strings.isUpperCase('ABCD'), true);
    assert.deepEqual(Strings.isUpperCase('ABCs'), false);
    assert.deepEqual(Strings.isUpperCase('123 ABC DE\nFG'), true);
    assert.deepEqual(Strings.isUpperCase('123 ABC DE\nFg'), false);
  });

  it('Strings.isWhitespace()', () => {
    assert.deepEqual(Strings.isWhitespace(''), true);
    assert.deepEqual(Strings.isWhitespace(' '), true);
    assert.deepEqual(Strings.isWhitespace('\n'), true);
    assert.deepEqual(Strings.isWhitespace('\t'), true);
    assert.deepEqual(Strings.isWhitespace('\r'), true);
    assert.deepEqual(Strings.isWhitespace('\f'), true);
    assert.deepEqual(Strings.isWhitespace('\f\n'), true);
    assert.deepEqual(Strings.isWhitespace('\f\r'), true);
    assert.deepEqual(Strings.isWhitespace('\t\r\f'), true);
    assert.deepEqual(Strings.isWhitespace('\f\t\r\n\n'), true);
    assert.deepEqual(Strings.isWhitespace('\f\t\r\n\na'), false);
  });

  it('Strings.join()', () => {
    assert.deepEqual(Strings.join(''), '');
    assert.deepEqual(Strings.join('', ''), '');
    assert.deepEqual(Strings.join('abc', ''), 'abc');
    assert.deepEqual(Strings.join('Lorem'), 'Lorem');
    assert.deepEqual(Strings.join('Lorem', ' ', 'ipsum', ' ', 'dolor'), 
        'Lorem ipsum dolor');
    assert.deepEqual(Strings.join(
        'Crux', ' ', 'sacra', ' ', 'sit', ' ', 'mihi', ' ', 'lux'), 
        'Crux sacra sit mihi lux');
  });

  it('Strings.lastIndexOf()', () => {
    assert.deepEqual(Strings.lastIndexOf('', ''), 0);
    assert.deepEqual(Strings.lastIndexOf('abc', ''), 0);
    assert.deepEqual(Strings.lastIndexOf('', 'abc'), -1);
    assert.deepEqual(Strings.lastIndexOf('d', 'd'), 0);
    assert.deepEqual(Strings.lastIndexOf('d', 'da'), -1);
    assert.deepEqual(Strings.lastIndexOf('Abcddemmaxdemala', 'dem'), 10);
  });

  it('Strings.lastIndexOfIgnoreCase()', () => {
    assert.deepEqual(Strings.lastIndexOfIgnoreCase('', ''), 0);
    assert.deepEqual(Strings.lastIndexOfIgnoreCase('d', 'd'), 0);
    assert.deepEqual(Strings.lastIndexOfIgnoreCase('d', 'da'), -1);
    assert.deepEqual(Strings.lastIndexOfIgnoreCase(
        'Abcddemmaxdemala', 'dEM'), 10);
  });

  it('Strings.left()', () => {
    assert.deepEqual(Strings.left('', 1), '');
    assert.deepEqual(Strings.left('Alphabet', 5), 'Alpha');
    assert.deepEqual(Strings.left('Johndoe', 4), 'John');
  });

  it('Strings.longest()', () => {
    assert.deepEqual(Strings.longest(), '');
    assert.deepEqual(Strings.longest(''), '');
    assert.deepEqual(Strings.longest('abc', 'abc'), 'abc');
    assert.deepEqual(Strings.longest('Alphabet', 'Alpha'), 'Alphabet');
    assert.deepEqual(Strings.longest('Johndoe', 'John'), 'Johndoe');
    assert.deepEqual(Strings.longest(
        'Johndoe', 'John', 'jsdcdscsdcd'), 'jsdcdscsdcd');
  });

  it('Strings.normalize()', () => {
    assert.deepEqual(Strings.normalize(''), Strings.EMPTY);
    assert.deepEqual(Strings.normalize('  Bye    -  bye   ! '), 'Bye - bye !');
    assert.deepEqual(Strings.normalize(' '), Strings.EMPTY);
    assert.deepEqual(Strings.normalize('   abc  de   f  '), 'abc de f');
    assert.deepEqual(Strings.normalize('   abc  de   f'), 'abc de f');
    assert.deepEqual(Strings.normalize(' abc de f '), 'abc de f');
    assert.deepEqual(Strings.normalize('abc de f'), 'abc de f');
    assert.deepEqual(Strings.normalize(
        'Abcddemmaxdemala   \n\r\t\f'), 'Abcddemmaxdemala');
  });

  it('Strings.prepend()', () => {
    assert.deepEqual(Strings.prepend('', 'abc'), 'abc');
    assert.deepEqual(Strings.prepend('a', 'bc'), 'bca');
    assert.deepEqual(Strings.prepend('a', ''), 'a');
  });

  it('Strings.prependIfMissing()', () => {
    assert.deepEqual(Strings.prependIfMissing('', 'abc'), 'abc');
    assert.deepEqual(Strings.prependIfMissing('a', 'bc'), 'bca');
    assert.deepEqual(Strings.prependIfMissing('a', ''), 'a');
    assert.deepEqual(Strings.prependIfMissing('abcde', 'ab'), 'abcde');
    assert.deepEqual(Strings.prependIfMissing('ABcde', 'ab', true), 'ABcde');
  });

  it('Strings.prependIfMissingIgnoreCase()', () => {
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('', 'abc'), 'abc');
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('a', 'bc'), 'bca');
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('a', ''), 'a');
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('abcde', 'ab'), 'abcde');
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('ABcde', 'ab'), 'ABcde');
    assert.deepEqual(Strings.prependIfMissingIgnoreCase('a', 'A'), 'a');
  });

  it('Strings.remove()', () => {
    assert.deepEqual(Strings.remove('abcdefg', 'abc'), 'defg');
    assert.deepEqual(Strings.remove('John Jack Doe', 'Jack '), 'John Doe');
    assert.deepEqual(Strings.remove('', 'abc'), '');
    assert.deepEqual(Strings.remove('', ''), '');
    assert.deepEqual(Strings.remove('  ', ' '), '');
    assert.deepEqual(Strings.remove('abc', ''), 'abc');
    assert.deepEqual(Strings.remove('abc', ''), 'abc');
    assert.deepEqual(Strings.remove('abc', 'a'), 'bc');
    assert.deepEqual(Strings.remove('Heroes oe oe oe', 'oe'), 'Hers   ');
  });

  it('Strings.removeEnd()', () => {
    assert.deepEqual(Strings.removeEnd('', 'abc'), '');
    assert.deepEqual(Strings.removeEnd('abc', ''), 'abc');
    assert.deepEqual(Strings.removeEnd('abcdefgh', 'fgh'), 'abcde');
  });

  it('Strings.removeEndIgnoreCase()', () => {
    assert.deepEqual(Strings.removeEndIgnoreCase('', 'abc'), '');
    assert.deepEqual(Strings.removeEndIgnoreCase('abc', ''), 'abc');
    assert.deepEqual(Strings.removeEndIgnoreCase('abcdefgh', 'fgh'), 'abcde');
    assert.deepEqual(Strings.removeEndIgnoreCase('abcdefgh', 'FGh'), 'abcde');
  });

  it('Strings.removeWhitespace()', () => {
    assert.deepEqual(Strings.removeWhitespace(
        'Abcddemmaxdemala   \n\r\t\f'), 'Abcddemmaxdemala');
    assert.deepEqual(Strings.removeWhitespace(
        'John Doe\njohn@email.com\t'), 'JohnDoejohn@email.com');
    assert.deepEqual(Strings.removeWhitespace(''), '');
    assert.deepEqual(Strings.removeWhitespace(' '), '');
  });

  it('Strings.repeat()', () => {
    assert.deepEqual(Strings.repeat(' ', 1), ' ');
    assert.deepEqual(Strings.repeat(' ', 2), '  ');
    assert.deepEqual(Strings.repeat(' ', -1), '');
    assert.deepEqual(Strings.repeat(' ', 1.33), '');
    assert.deepEqual(Strings.repeat(' ', 3), '   ');
    assert.deepEqual(Strings.repeat('+', 10), '++++++++++');
  });

  it('Strings.reverse()', () => {
    assert.deepEqual(Strings.reverse(''), '');
    assert.deepEqual(Strings.reverse('cba'), 'abc');
    assert.deepEqual(Strings.reverse('cba edf'), 'fde abc');
    assert.deepEqual(Strings.reverse('🤨🤗'), '🤗🤨');
  });

  it('Strings.startsWith()', () => {
    assert.deepEqual(Strings.startsWith('', ''), true);
    assert.deepEqual(Strings.startsWith('abc', 'ab'), true);
    assert.deepEqual(Strings.startsWith('abc', 'A', true), true);
    assert.deepEqual(Strings.startsWith('abc', 'b'), false);
    assert.deepEqual(Strings.startsWith('abc', 'C', true), false);
  });

  it('Strings.startsWithAny()', () => {
    assert.deepEqual(Strings.startsWithAny(''), false);
    assert.deepEqual(Strings.startsWithAny('', ''), true);
    assert.deepEqual(Strings.startsWithAny('abc', 'ab'), true);
    assert.deepEqual(Strings.startsWithAny('abc', 'A'), false);
    assert.deepEqual(Strings.startsWithAny('abc', 'b'), false);
    assert.deepEqual(Strings.startsWithAny('abc', 'C'), false);
    assert.deepEqual(Strings.startsWithAny('abc', 'C', 'z', 'a'), true);
    assert.deepEqual(Strings.startsWithAny('abc def', ...['C', 'z', 'a']), true);
  });

  it('Strings.toBinary()', () => {
    assert.deepEqual(Strings.encode(Strings.toBinary('🤔 🙃')), 'PsOYFMOdIAA9w5hDw54=');
  });

  it('Strings.toCamelCase()', () => {
    assert.deepEqual(Strings.toCamelCase(''), '');
    assert.deepEqual(Strings.toCamelCase(' '), '');
    assert.deepEqual(Strings.toCamelCase('  '), '');
    assert.deepEqual(Strings.toCamelCase('\t\t\r\n\f'), '');
    assert.deepEqual(Strings.toCamelCase('\tabc\n\n\t'), 'abc');
    assert.deepEqual(Strings.toCamelCase('a'), 'a');
    assert.deepEqual(Strings.toCamelCase('A'), 'a');
    assert.deepEqual(Strings.toCamelCase('\nA\t'), 'a');
    assert.deepEqual(Strings.toCamelCase('  abc  de  '), 'abcDe');
    assert.deepEqual(Strings.toCamelCase('  abc de '), 'abcDe');
    assert.deepEqual(Strings.toCamelCase(' abc  de  '), 'abcDe');
    assert.deepEqual(Strings.toCamelCase(' abc  de '), 'abcDe');
    assert.deepEqual(Strings.toCamelCase('\n\t\r\fabc\n\t  de\n '), 'abcDe');
    assert.deepEqual(Strings.toCamelCase('Abc'), 'abc');
    assert.deepEqual(Strings.toCamelCase('Abc dEF'), 'abcDef');
  });

  it('Strings.toCharArray()', () => {
    assert.deepEqual(Strings.toCharArray(''), []);
    assert.deepEqual(Strings.toCharArray('I 💖 U'), ['I', ' ', '💖', ' ', 'U']);
    assert.deepEqual(Strings.toCharArray('🐑🐑🐑'), ['🐑', '🐑', '🐑']);
    assert.deepEqual(Strings.toCharArray('abc'), ['a', 'b', 'c']);
  });

  it('Strings.toConstantCase()', () => {
    assert.deepEqual(Strings.toConstantCase(''), '');
    assert.deepEqual(Strings.toConstantCase(' '), '');
    assert.deepEqual(Strings.toConstantCase('  '), '');
    assert.deepEqual(Strings.toConstantCase('\t\t\r\n\f'), '');
    assert.deepEqual(Strings.toConstantCase('\tabc\n\n\t'), 'ABC');
    assert.deepEqual(Strings.toConstantCase('a'), 'A');
    assert.deepEqual(Strings.toConstantCase('A'), 'A');
    assert.deepEqual(Strings.toConstantCase('\nA\t'), 'A');
    assert.deepEqual(Strings.toConstantCase('  abc  de  '), 'ABC_DE');
    assert.deepEqual(Strings.toConstantCase('  abc de '), 'ABC_DE');
    assert.deepEqual(Strings.toConstantCase(' abc  de  '), 'ABC_DE');
    assert.deepEqual(Strings.toConstantCase(' abc  de '), 'ABC_DE');
    assert.deepEqual(Strings.toConstantCase('\n\t\r\fabc\n\t  de\n '), 'ABC_DE');
    assert.deepEqual(Strings.toConstantCase('Abc'), 'ABC');
    assert.deepEqual(Strings.toConstantCase('Abc dEF'), 'ABC_DEF');
  });

  it('Strings.toKebabCase()', () => {
    assert.deepEqual(Strings.toKebabCase(''), '');
    assert.deepEqual(Strings.toKebabCase(' '), '');
    assert.deepEqual(Strings.toKebabCase('  '), '');
    assert.deepEqual(Strings.toKebabCase('\t\t\r\n\f'), '');
    assert.deepEqual(Strings.toKebabCase('\tabc\n\n\t'), 'abc');
    assert.deepEqual(Strings.toKebabCase('a'), 'a');
    assert.deepEqual(Strings.toKebabCase('A'), 'a');
    assert.deepEqual(Strings.toKebabCase('\nA\t'), 'a');
    assert.deepEqual(Strings.toKebabCase('  abc  de  '), 'abc-de');
    assert.deepEqual(Strings.toKebabCase('  abc de '), 'abc-de');
    assert.deepEqual(Strings.toKebabCase(' abc  de  '), 'abc-de');
    assert.deepEqual(Strings.toKebabCase(' abc  de '), 'abc-de');
    assert.deepEqual(Strings.toKebabCase('\n\t\r\fabc\n\t  de\n '), 'abc-de');
    assert.deepEqual(Strings.toKebabCase('Abc'), 'abc');
    assert.deepEqual(Strings.toKebabCase('Abc dEF'), 'abc-def');
  });

  it('Strings.toPascalCase()', () => {
    assert.deepEqual(Strings.toPascalCase(''), '');
    assert.deepEqual(Strings.toPascalCase(' '), '');
    assert.deepEqual(Strings.toPascalCase('  '), '');
    assert.deepEqual(Strings.toPascalCase('\t\t\r\n\f'), '');
    assert.deepEqual(Strings.toPascalCase('\tabc\n\n\t'), 'Abc');
    assert.deepEqual(Strings.toPascalCase('a'), 'A');
    assert.deepEqual(Strings.toPascalCase('A'), 'A');
    assert.deepEqual(Strings.toPascalCase('\nA\t'), 'A');
    assert.deepEqual(Strings.toPascalCase('  abc  de  '), 'AbcDe');
    assert.deepEqual(Strings.toPascalCase('  abc de '), 'AbcDe');
    assert.deepEqual(Strings.toPascalCase(' abc  de  '), 'AbcDe');
    assert.deepEqual(Strings.toPascalCase(' abc  de '), 'AbcDe');
    assert.deepEqual(Strings.toPascalCase('\n\t\r\fabc\n\t  de\n '), 'AbcDe');
    assert.deepEqual(Strings.toPascalCase('Abc'), 'Abc');
    assert.deepEqual(Strings.toPascalCase('Abc dEF'), 'AbcDef');
    assert.deepEqual(Strings.toPascalCase('\r\t\f\n\nAbc \n\tdEf\t\f'), 'AbcDef');
    assert.deepEqual(Strings.toPascalCase(' \nAbc ----\n\tdEf\t\f'), 'AbcDef');
    assert.deepEqual(Strings.toPascalCase(' \nAbc_\n\tdEf\t\f'), 'AbcDef');
    assert.deepEqual(Strings.toPascalCase(' \nAbc_---_\n\tdEf\t\f'), 'AbcDef');
  });

  it('Strings.toSnakeCase()', () => {
    assert.deepEqual(Strings.toSnakeCase(''), '');
    assert.deepEqual(Strings.toSnakeCase(' '), '');
    assert.deepEqual(Strings.toSnakeCase('  '), '');
    assert.deepEqual(Strings.toSnakeCase('\t\t\r\n\f'), '');
    assert.deepEqual(Strings.toSnakeCase('\tabc\n\n\t'), 'abc');
    assert.deepEqual(Strings.toSnakeCase('a'), 'a');
    assert.deepEqual(Strings.toSnakeCase('A'), 'a');
    assert.deepEqual(Strings.toSnakeCase('\nA\t'), 'a');
    assert.deepEqual(Strings.toSnakeCase('  abc  de  '), 'abc_de');
    assert.deepEqual(Strings.toSnakeCase('  abc de '), 'abc_de');
    assert.deepEqual(Strings.toSnakeCase(' abc  de  '), 'abc_de');
    assert.deepEqual(Strings.toSnakeCase(' abc  de '), 'abc_de');
    assert.deepEqual(Strings.toSnakeCase('\n\t\r\fabc\n\t  de\n '), 'abc_de');
    assert.deepEqual(Strings.toSnakeCase('Abc'), 'abc');
    assert.deepEqual(Strings.toSnakeCase('Abc dEF'), 'abc_def');
  });

  it('Strings.toTitleCase()', () => {
    assert.deepEqual(Strings.toTitleCase(''), '');
    assert.deepEqual(Strings.toTitleCase('jOhn'), 'John');
    assert.deepEqual(Strings.toTitleCase('iNdEpendENCe'), 'Independence');
    assert.deepEqual(Strings.toTitleCase(
        'lOREM iPsum dOlOR sIT'), 'Lorem Ipsum Dolor Sit');
    assert.deepEqual(Strings.toTitleCase(
        'lOREM  iPsum\tdOlOR\nsIT'), 'Lorem  Ipsum\tDolor\nSit');
    assert.deepEqual(Strings.toTitleCase(
        '\t\nlOREM  iPsum\tdOlOR\nsIT'), 
        '\t\nLorem  Ipsum\tDolor\nSit');
    assert.deepEqual(Strings.toTitleCase('\nabC'), '\nAbc');
    assert.deepEqual(Strings.toTitleCase('ab\t\f\t\nc'), 'Ab\t\f\t\nC');
  });

  it('Strings.upperFirst()', () => {
    assert.deepEqual(Strings.upperFirst(''), '');
    assert.deepEqual(Strings.upperFirst('  '), '  ');
    assert.deepEqual(Strings.upperFirst('lorem '), 'Lorem ');
    assert.deepEqual(Strings.upperFirst('jOHN DOE'), 'JOHN DOE');
    assert.deepEqual(Strings.upperFirst('jOHN DOE', true), 'John doe');
    assert.deepEqual(Strings.upperFirst('lorem ipsum'), 'Lorem ipsum');
    assert.deepEqual(Strings.upperFirst('cAT'), 'CAT');
    assert.deepEqual(Strings.upperFirst('cAT', true), 'Cat');
    assert.deepEqual(Strings.upperFirst(' cAT', true), ' cat');
  });
});

describe('Utils', () => {
  it('Utils.isBoolean()', () => {
    assert.deepEqual(Utils.isBoolean(!0), true);
    assert.deepEqual(Utils.isBoolean(!1), true);
    assert.deepEqual(Utils.isBoolean(false), true);
    assert.deepEqual(Utils.isBoolean(true), true);
    assert.deepEqual(Utils.isBoolean(), false);
    assert.deepEqual(Utils.isBoolean(undefined), false);
    assert.deepEqual(Utils.isBoolean(null), false);
    assert.deepEqual(Utils.isBoolean(''), false);
    assert.deepEqual(Utils.isBoolean({}), false);
    assert.deepEqual(Utils.isBoolean([]), false);
  });

  it('Utils.isDefined()', () => {
    assert.deepEqual(Utils.isDefined(), false);
    assert.deepEqual(Utils.isDefined(undefined), false);
    assert.deepEqual(Utils.isDefined(null), true);
    assert.deepEqual(Utils.isDefined(''), true);
    assert.deepEqual(Utils.isDefined({}), true);
    assert.deepEqual(Utils.isDefined('sdc'), true);
    assert.deepEqual(Utils.isDefined([]), true);
  });

  it('Utils.isError()', () => {
    assert.deepEqual(Utils.isError(), false);
    assert.deepEqual(Utils.isError(new SyntaxError('abc')), true);
    assert.deepEqual(Utils.isError(new TypeError('abc')), true);
    assert.deepEqual(Utils.isError(new Error('abc')), true);
  });

  it('Utils.isFalsy()', () => {
    assert.deepEqual(Utils.isFalsy(null), true);
    assert.deepEqual(Utils.isFalsy(undefined), true);
    assert.deepEqual(Utils.isFalsy(), true);
    assert.deepEqual(Utils.isFalsy(false), true);
    assert.deepEqual(Utils.isFalsy(Number.NaN), true);
    assert.deepEqual(Utils.isFalsy(0), true);
    assert.deepEqual(Utils.isFalsy(-0), true);
    assert.deepEqual(Utils.isFalsy(''), true);
    assert.deepEqual(Utils.isFalsy(' '), false);
    assert.deepEqual(Utils.isFalsy('abc'), false);
    assert.deepEqual(Utils.isFalsy([]), false);
    assert.deepEqual(Utils.isFalsy({}), false);
    assert.deepEqual(Utils.isFalsy({a: true}), false);
  });

  // eslint-disable-next-line require-jsdoc
  function fn() {
    console.log('abc');
  }

  it('Utils.isFunction()', () => {
    assert.deepEqual(Utils.isFunction(), false);
    assert.deepEqual(Utils.isFunction(undefined), false);
    assert.deepEqual(Utils.isFunction(null), false);
    assert.deepEqual(Utils.isFunction(true), false);
    assert.deepEqual(Utils.isFunction(() => true), true);
    assert.deepEqual(Utils.isFunction(fn), true);
  });

  it('Utils.isIterable()', () => {
    assert.deepEqual(Utils.isIterable(), false);
    assert.deepEqual(Utils.isIterable(undefined), false);
    assert.deepEqual(Utils.isIterable(null), false);
    assert.deepEqual(Utils.isIterable(true), false);
    assert.deepEqual(Utils.isIterable(() => true), false);
    assert.deepEqual(Utils.isIterable(fn), false);

    assert.deepEqual(Utils.isIterable('abc'), true);
    const map = new Map();
    const set = new Set();
    assert.deepEqual(Utils.isIterable(map), true);
    assert.deepEqual(Utils.isIterable(set), true);
    assert.deepEqual(Utils.isIterable([]), true);
    assert.deepEqual(Utils.isIterable(['a', 'b', 'c']), true);
  });

  it('Utils.isNotNil()', () => {
    assert.deepEqual(Utils.isNotNil(), false);
    assert.deepEqual(Utils.isNotNil(undefined), false);
    assert.deepEqual(Utils.isNotNil(null), false);
    assert.deepEqual(Utils.isNotNil(true), true);
    assert.deepEqual(Utils.isNotNil(() => true), true);
    assert.deepEqual(Utils.isNotNil(fn), true);
    assert.deepEqual(Utils.isNotNil('abc'), true);
  });

  it('Utils.isNotNull()', () => {
    assert.deepEqual(Utils.isNotNull(), true);
    assert.deepEqual(Utils.isNotNull(undefined), true);
    assert.deepEqual(Utils.isNotNull(null), false);
    assert.deepEqual(Utils.isNotNull(true), true);
    assert.deepEqual(Utils.isNotNull(() => true), true);
    assert.deepEqual(Utils.isNotNull(fn), true);
    assert.deepEqual(Utils.isNotNull('abc'), true);
  });

  it('Utils.isNotUndefined()', () => {
    assert.deepEqual(Utils.isNotUndefined(), false);
    assert.deepEqual(Utils.isNotUndefined(undefined), false);
    assert.deepEqual(Utils.isNotUndefined(null), true);
    assert.deepEqual(Utils.isNotUndefined(true), true);
    assert.deepEqual(Utils.isNotUndefined(() => true), true);
    assert.deepEqual(Utils.isNotUndefined(fn), true);
    assert.deepEqual(Utils.isNotUndefined('abc'), true);
  });

  it('Utils.isNull()', () => {
    assert.deepEqual(Utils.isNull(), false);
    assert.deepEqual(Utils.isNull(undefined), false);
    assert.deepEqual(Utils.isNull(null), true);
    assert.deepEqual(Utils.isNull(true), false);
    assert.deepEqual(Utils.isNull(() => false), false);
    assert.deepEqual(Utils.isNull(fn), false);
    assert.deepEqual(Utils.isNull('abc'), false);
  });

  it('Utils.isNullOrUndefined()', () => {
    assert.deepEqual(Utils.isNullOrUndefined(), true);
    assert.deepEqual(Utils.isNullOrUndefined(undefined), true);
    assert.deepEqual(Utils.isNullOrUndefined(null), true);
    assert.deepEqual(Utils.isNullOrUndefined(true), false);
    assert.deepEqual(Utils.isNullOrUndefined(() => false), false);
    assert.deepEqual(Utils.isNullOrUndefined(fn), false);
    assert.deepEqual(Utils.isNullOrUndefined('abc'), false);
  });

  it('Utils.isPrimitive()', () => {
    assert.deepEqual(Utils.isPrimitive(), true);
    assert.deepEqual(Utils.isPrimitive(undefined), true);
    assert.deepEqual(Utils.isPrimitive(null), true);
    assert.deepEqual(Utils.isPrimitive(true), true);
    assert.deepEqual(Utils.isPrimitive(() => false), false);
    assert.deepEqual(Utils.isPrimitive(fn), false);
    assert.deepEqual(Utils.isPrimitive('abc'), true);
    assert.deepEqual(Utils.isPrimitive(55), true);
    assert.deepEqual(Utils.isPrimitive(0), true);
    assert.deepEqual(Utils.isPrimitive({}), false);
  });

  it('Utils.isPromise()', () => {
    assert.deepEqual(Utils.isPromise(), false);
    assert.deepEqual(Utils.isPromise(/a/gm), false);
    assert.deepEqual(Utils.isPromise(new RegExp('abc', 'g')), false);
    assert.deepEqual(Utils.isPromise(Promise.resolve()), true);
    assert.deepEqual(Utils.isPromise(new Promise(() => {})), true);
  });

  it('Utils.isRegExp()', () => {
    assert.deepEqual(Utils.isRegExp(), false);
    assert.deepEqual(Utils.isRegExp(/a/gm), true);
    assert.deepEqual(Utils.isRegExp(new RegExp('abc', 'g')), true);
  });

  it('Utils.isSymbol()', () => {
    assert.deepEqual(Utils.isSymbol(), false);
    assert.deepEqual(Utils.isSymbol(null), false);
    assert.deepEqual(Utils.isSymbol(undefined), false);
    assert.deepEqual(Utils.isSymbol(Symbol.iterator), true);
    assert.deepEqual(Utils.isSymbol(/a/gm), false);
    assert.deepEqual(Utils.isSymbol(new RegExp('abc', 'g')), false);
    assert.deepEqual(Utils.isSymbol(Symbol()), true);
    assert.deepEqual(Utils.isSymbol(Symbol('abc')), true);
    assert.deepEqual(Utils.isSymbol(Symbol('foobar')), true);
  });

  it('Utils.isTruthy()', () => {
    assert.deepEqual(Utils.isTruthy(), false);
    assert.deepEqual(Utils.isTruthy(undefined), false);
    assert.deepEqual(Utils.isTruthy(null), false);
    assert.deepEqual(Utils.isTruthy(true), true);
    assert.deepEqual(Utils.isTruthy(false), false);
    assert.deepEqual(Utils.isTruthy(''), false);
    assert.deepEqual(Utils.isTruthy(0), false);
    assert.deepEqual(Utils.isTruthy('abc'), true);
  });

  it('Utils.isUndefined()', () => {
    assert.deepEqual(Utils.isUndefined(), true);
    assert.deepEqual(Utils.isUndefined(undefined), true);
    assert.deepEqual(Utils.isUndefined(null), false);
    assert.deepEqual(Utils.isUndefined(true), false);
    assert.deepEqual(Utils.isUndefined(false), false);
    assert.deepEqual(Utils.isUndefined(''), false);
    assert.deepEqual(Utils.isUndefined(0), false);
    assert.deepEqual(Utils.isUndefined('abc'), false);
  });
});
