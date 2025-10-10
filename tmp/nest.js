// nest.js - build nested sections from flat heading list

/**
 * Converts a flat array of headings (with depth) into a nested structure using `sections` arrays.
 * Keeps original properties and does not mutate input.
 *
 * Example:
 * [ {title: 'A', depth:0}, {title:'B', depth:1} ]
 * -> [ {title:'A', depth:0, sections:[{title:'B', depth:1, sections:[]}]} ]
 */
function nestSections(items) {
  if (!Array.isArray(items)) return [];
  const result = [];
  // virtual root simplifies logic
  const root = { depth: -1, sections: result };
  const stack = [root];

  for (const it of items) {
    const node = Object.assign({}, it, { sections: [] });
    // pop until we find a parent with smaller depth
    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }
    // attach to current parent
    const parent = stack[stack.length - 1] || root;
    if (!parent.sections) parent.sections = [];
    parent.sections.push(node);
    stack.push(node);
  }

  return result;
}

// --- sample input from your prompt ---
const input = [
  { title: "Section 0A", depth: 0, paragraphs: [] },
  { title: "Section 1A", depth: 1, paragraphs: [] },
  { title: "Section 2A", depth: 2, paragraphs: [] },
  { title: "Section 0B", depth: 0, paragraphs: [] },
  { title: "Section 1B", depth: 1, paragraphs: [] },
];

const nested = nestSections(input);
console.log(JSON.stringify(nested, null, 2));

// Export for tests/require
module.exports = { nestSections };
