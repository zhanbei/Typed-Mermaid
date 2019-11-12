'use strict';

import {IChain, IChainsGroup, IGraph, ILink, ILinkStyle, INode} from '../types/flowchart';

// A[Hard] -->|Text| B(Round)
const mdNode = (node: INode): string => {
	if (node.noText || !node.text) {return node.id;}
	// Only render the text once.
	node.noText = true;
	return `${node.id}[${node.text}]`;
};

const DefaultLinkStyle: ILinkStyle = '-->';

const mdLink = (link: ILink): string => {
	const style = link.style || DefaultLinkStyle;
	if (!link.text) {return style;}
	return `${style}|${link.text}|`;
};

const mdChain = (chain: IChain): string => {
	let parts: string[] = [];
	let needLink = false;
	for (let i = 0; i < chain.length; i++) {
		const node = chain[i];
		if ('id' in node) {
			// Add a default link.
			if (needLink) {parts.push('-->');}
			parts.push(mdNode(node));
			needLink = true;
			continue;
		}
		if (needLink) {
			parts.push(mdLink(node));
			needLink = false;
		} else {
			// Warning about the behavior.
			console.error('Invalid chain detected.');
		}
	}
	return parts.join(' ');
};

// %% A test case for demonstration.
// A[Hard] -->|Text| B(Round)
// B --> C{Decision}
// C -->|One| D[Result 1]
// C -->|Two| E[Result 2]
const mdGroup = (group: IChainsGroup): string => {
	let md = '%% ' + group.name + '\n';
	md += group.chains.map(mdChain).join('\n');
	return md;
};

const mdGraph = (graph: IGraph): string => {
	if (!graph.groups) {return 'Unsupported yet!';}
	let md = `graph ${graph.direction};\n\n`;
	return md + graph.groups.map(mdGroup).join('\n');
};

// FIX-ME Support configures to use semicolon.
export const toMdGraph = mdGraph;
