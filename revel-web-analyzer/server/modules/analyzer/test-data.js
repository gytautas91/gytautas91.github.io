exports.commonTestTree = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element1',
      tagName: 'div',
    },
    {
      type: 'element2',
      tagName: 'span',
      children: [
        {
          type: 'element3',
          tagName: 'div',
        }
      ]
    }
  ]
}
exports.testTreeJustWithRoot = {
  type: 'element',
  tagName: 'div',
};

exports.testTreeWithTwoDivs = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'div',
    },
  ],
};

exports.testTreeWithSpan = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'span',
    },
    {
      type: 'element',
      tagName: 'span',
    },
  ]
};

exports.testTreeWithInputs = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'span',
      children: [
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'input',
        },
      ]
    },
    {
      type: 'element',
      tagName: 'span',
    },
  ],
};

exports.testTreeWithButtons = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'button',
      children: [
        {
          type: 'element',
          tagName: 'button',
        },
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'input',
        },
      ]
    },
    {
      type: 'element',
      tagName: 'button',
    },
    {
      type: 'element',
      tagName: 'div',
      children: [
        {
          type: 'element',
          tagName: 'button',
        },
        {
          type: 'element',
          tagName: 'button',
        },
        {
          type: 'element',
          tagName: 'input',
        },
        {
          type: 'element',
          tagName: 'button',
        },
      ],
    },
    {
      type: 'element',
      tagName: 'footer',
    },
  ],
};

exports.testTreeIncludingRoot = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'span',
    },
    {
      type: 'element',
      tagName: 'span',
      children: [
        {
          type: 'element',
          tagName: 'div',
        },
      ],
    },
    {
      type: 'element',
      tagName: 'div',
    },
  ],
}

exports.testTreeWithDeepNesting = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'element',
      tagName: 'span',
    },
    {
      type: 'element',
      tagName: 'span',
      children: [
        {
          type: 'element',
          tagName: 'div',
        },
        {
          type: 'element',
          tagName: 'div',
          children: [
            {
              type: 'element',
              tagName: 'div',
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                },
              ]
            },
          ]
        },
        {
          type: 'element',
          tagName: 'div',
        },
      ],
    },
    {
      type: 'element',
      tagName: 'div',
      children: [
        {
          type: 'element',
          tagName: 'div',
          children: [
            {
              type: 'element',
              tagName: 'div',
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ],
}
