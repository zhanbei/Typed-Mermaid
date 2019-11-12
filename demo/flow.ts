'use strict';

import {newChainsGroup, newGraph, newNode, nextLink} from '../types/flowchart';

const a = newNode('A', 'Hard');
const b = newNode('B', 'Round', '()');
const c = newNode('C', 'Decision', '{}');
const d = newNode('D', 'Result 1');
const e = newNode('E', 'Result 2');

const group = newChainsGroup('A test case for demonstration.', [
	// [a, nextLink('Text'), b, c],
	[a, nextLink('Text'), b],
	[b, c],
	[c, nextLink('One'), d],
	[c, nextLink('Two'), e],
]);

// @see https://github.com/mermaid-js/mermaid
//
// graph TD
// A[Hard] -->|Text| B(Round)
// B --> C{Decision}
// C -->|One| D[Result 1]
// C -->|Two| E[Result 2]
export const graph = newGraph('TD', [group]);
