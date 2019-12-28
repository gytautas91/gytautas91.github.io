const { parse } = require('himalaya');
const axios = require('axios');

function walkThru(treeNode, cb, path = []) {

  const walk = ({ children, ...node }) =>
    walkThru(children, cb, [...path, node]);

  if (Array.isArray(treeNode)) {
    treeNode.forEach(walk);
  }

  if (treeNode && treeNode.children) {
    walk(treeNode);
  }

  if (typeof cb === 'function' && path.length > 0) {
    cb(path, treeNode);
  }
}

function getLongestPath(treeNode, commonTag) {
  let longestPath = [];

  const tagCount = (path) =>
    path.filter(({ tagName }) => tagName === commonTag).length;

  walkThru(treeNode, ((path) => {
    const isPathLonger = longestPath.length < path.length;
    const isPathLongest = isPathLonger && !commonTag;

    const isPathLongestWithCommonTag =
      isPathLonger && commonTag && tagCount(longestPath) <= tagCount(path)

    if (isPathLongest || isPathLongestWithCommonTag) {
      longestPath = path;
    }
  }));

  return longestPath
    .map(({ tagName }) => tagName)
    .filter((tagless) => tagless);
}

function getTags(treeNode) {
  const tags = [];
  walkThru(treeNode, (_, node) => {
    node && tags.push(...node);
  });

  return [
    treeNode.tagName,
    ...tags.map(({ tagName }) => tagName),
  ].filter((value) => value);
}

function getUniqueTags(treeNode) {
  const tags = getTags(treeNode);

  return [...new Set(tags)];
}

function getMostFrequentTag(treeNode) {
  const tagNames = getTags(treeNode).filter((element) => element);

  let mostFrequent = 1;
  let freq = 0;
  let topTag;

  for (let i = 0; i < tagNames.length; i++) {
    for (let j = i; j < tagNames.length; j++) {
      if (tagNames[i] === tagNames[j]) {
        freq++;
      }

      if (mostFrequent <= freq) {
        mostFrequent = freq;
        topTag = tagNames[i];
      }
    }
    freq = 0;
  }

  return topTag;
}

function analyze(html) {
  if (!html) throw Error('Please provide HTML to be analyzed');

  const rootTreeNode = parse(html)
    .find(({ tagName }) => tagName === 'html')

  const mostCommonlyUsedTag = getMostFrequentTag(rootTreeNode);

  return {
    uniqueTags: getUniqueTags(rootTreeNode),
    mostCommonlyUsedTag,
    lognestPathFromRoot: getLongestPath(rootTreeNode),
    lognestPathFromRootWithCommonlyUsedTag: getLongestPath(rootTreeNode, mostCommonlyUsedTag),
  }
}

async function analyzeURL(url) {
  if (!url) {
    throw Error('Please provide URL to be analyzed');
  }
  console.log('Making request');
  const page = await axios(url);
  console.log('Analyzing ...');
  const results = analyze(page.data);
  console.log('Returning results');
  return results;
}

module.exports = {
  walkThru,
  getLongestPath,
  getUniqueTags,
  getMostFrequentTag,
  analyze,
  analyzeURL,
}