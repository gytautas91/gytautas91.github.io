const {
  walkThru,
  getLongestPath,
  getUniqueTags,
  getMostFrequentTag,
} = require('./analyzer');
const {
  commonTestTree,
  testTreeJustWithRoot,
  testTreeWithTwoDivs,
  testTreeWithSpan,
  testTreeWithInputs,
  testTreeWithButtons,
  testTreeIncludingRoot,
  testTreeWithDeepNesting,
} = require('./test-data');

describe('HTML in JSON analyzer module', () => {
  test('walkThru should accept callback and return path and nodes', () => {
    const returnedPaths = [];
    const retunedNodes = [];

    walkThru(testTreeWithTwoDivs, (path, node) => {
      returnedPaths.push(path);
      retunedNodes.push(node);
    });

    expect(returnedPaths.length > 0).toBeTruthy();
    expect(retunedNodes.length > 0).toBeTruthy();
  });

  test('walkTHru should not return any paths if root element does not have any child elements', () => {
    const returnedPaths = [];

    walkThru(testTreeJustWithRoot, (path) => returnedPaths.push(path));
    expect(returnedPaths).toEqual([]);
  });


  test('walkThru should return two paths from root to last element', () => {
    const expectedResult = [
      [
        { type: 'element', tagName: 'div' },
        { type: 'element', tagName: 'div' }
      ],
      [
        { type: 'element', tagName: 'div' }
      ]
    ]

    const returnedPaths = [];
    walkThru(testTreeWithTwoDivs, (path) => returnedPaths.push(path));
    expect(returnedPaths).toStrictEqual(expectedResult);
  });

  test('getLongestPath should return correct path in tag names', () => {
    expect(getLongestPath(testTreeWithTwoDivs)).toEqual(['div', 'div']);
    expect(getLongestPath(commonTestTree)).toEqual(['div', 'span', 'div']);
  });

  test('getUniqueTags should return correct unique tags from all tree', () => {
    expect(getUniqueTags(testTreeJustWithRoot)).toEqual(['div']);
    expect(getUniqueTags(commonTestTree)).toEqual(['div', 'span']);
  });

  test('getMostFrequentTag should return correct most frequent tag', () => {
    expect(getMostFrequentTag(testTreeJustWithRoot)).toEqual('div');
    expect(getMostFrequentTag(testTreeWithSpan)).toEqual('span');
    expect(getMostFrequentTag(testTreeWithInputs)).toEqual('input');
    expect(getMostFrequentTag(testTreeWithButtons)).toEqual('button');
    expect(getMostFrequentTag(testTreeIncludingRoot)).toEqual('div');
  });

  test('getLongestPath should return correct longest path with common tag within path', () => {
    expect(getLongestPath(testTreeJustWithRoot, getMostFrequentTag(testTreeJustWithRoot)))
      .toEqual([]);
    expect(getLongestPath(testTreeWithSpan, getMostFrequentTag(testTreeWithSpan)))
      .toEqual(['div', 'span']);
    expect(getLongestPath(testTreeWithInputs, getMostFrequentTag(testTreeWithInputs)))
      .toEqual(['div', 'span', 'input']);
    expect(getLongestPath(testTreeWithButtons, getMostFrequentTag(testTreeWithButtons)))
      .toEqual(['div', 'button', 'button']);
    expect(getLongestPath(testTreeWithDeepNesting, getMostFrequentTag(testTreeWithDeepNesting)))
      .toEqual(['div', 'div', 'div', 'div', 'div', 'div']);
  });
});