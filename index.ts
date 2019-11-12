'use strict';

import {graph as flowchart} from './demo/flow';
import {toMdGraph} from './exporters/to-mermaid';

const dgFlow = toMdGraph(flowchart);

let md = '# Mermaid Demo\n\n';
md += [
	['FlowChart', dgFlow],
].map(diagram => `## ${diagram[0]}\n\n` + '```mermaid\n' + diagram[1] + '\n```').join('\n');

export const mdMermaidGraphDemos = md;
