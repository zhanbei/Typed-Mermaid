'use strict';

// [ TD(Top-Down) | LR(Left-Right) ]
export type IGraphDirection = 'TB' | 'BT' | 'LR' | 'RL' | 'TD'

export interface IGraph {
	direction: IGraphDirection;
	chains?: IChain[];
	groups?: IChainsGroup[];
}

export const newGraph = (direction: IGraphDirection, groups: IChainsGroup[]): IGraph => ({direction, groups});

/* SubGraphs */
export interface IMultipleGraph {
	graphs: ISubGraph[];
}

export interface ISubGraph {
	graphs: IGraph[];
}

/* Chains */
export interface IChainsGroup {
	name: string;
	description?: string;
	chains: IChain[];
}

export const newChainsGroup = (name: string, chains: IChain[], description?: string): IChainsGroup => ({name, chains, description});

export type IChain = (INode | ILink)[];

/* Links */
export type ILinkStyle = '-->' | '---' | '-.->' | '==>'

export interface ILink {
	style?: ILinkStyle;
	text?: string;
}

export const newLink = (style: ILinkStyle, text?: string): ILink => ({style, text});
export const nextLink = (text?: string, style?: ILinkStyle): ILink => ({style, text});

/* Nodes */
// @see https://mermaidjs.github.io/#/flowchart
export type IBoxStyle = '[]' | 'square' |
	'()' | 'round' | '(())' | 'circle' |
	'{}' | 'rhombus' | '{{}}' | 'hexagon' |
	'>]' | 'asymetric' |
	'[/\\]' | 'trapezoid' | '[\\/]' | '_trapezoid'

// A
// A -> B
// A -> B -> C
// [ A, link, B] Node Reuse
// A[nextNode?: ILink]
export interface INode {
	id: string;
	text?: string;
	style?: IBoxStyle;
	// Cached Value
	noText?: boolean;
}

export const newNode = (id: string, text?: string, style?: IBoxStyle): INode => ({id, text, style});
export const nextNode = (text: string, style?: IBoxStyle): INode => ({id: text.replace(/ /g, '-'), text, style});
export const preNode = (prefix: string, text: string, style?: IBoxStyle): INode => ({id: prefix + '-' + text.replace(/ /g, '-'), text, style});
