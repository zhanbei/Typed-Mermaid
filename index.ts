'use strict';

import {mdDocument} from '../Typed-Markdown/exporters/to-md';
import {newMdCodeBlock, newMdDocument, newMdHeading2} from '../Typed-Markdown/types/docs';
import {graph as flowchart} from './demo/flow';
import {toMdGraph} from './exporters/to-mermaid';

const dgFlow = toMdGraph(flowchart);

const h2FlowChart = newMdHeading2('FlowChart', [
	dgFlow,
].map(diagram => newMdCodeBlock('mermaid', diagram)));

const doc = newMdDocument('Mermaid Demo', [
	h2FlowChart,
]);
const md = mdDocument(doc);

export const mdMermaidGraphDemos = md;
