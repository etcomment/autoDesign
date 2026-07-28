const fs = require('fs');
const content = fs.readFileSync('src/templates/types.ts', 'utf8');
const toAdd = `  color?: string\n  icon?: string\n  value?: string\n  percent?: string\n`;
let modified = content;

// add to StrategyBlock
modified = modified.replace(/export interface StrategyBlock \{\n  number: string\n  title: string\n  subtitle\?: string\n\}/, 
`export interface StrategyBlock {\n  number: string\n  title: string\n  subtitle?: string\n${toAdd}}`);

modified = modified.replace(/export interface ProcessStep \{\n  number: number\n  title: string\n  subtitle\?: string\n\}/, 
`export interface ProcessStep {\n  number: number\n  title: string\n  subtitle?: string\n${toAdd}}`);

modified = modified.replace(/export interface PuzzlePiece \{\n  number: number\n  title: string\n  subtitle\?: string\n  color: string\n\}/, 
`export interface PuzzlePiece {\n  number: number\n  title: string\n  subtitle?: string\n  color?: string\n  icon?: string\n  value?: string\n  percent?: string\n}`);

modified = modified.replace(/export interface FunnelLevel \{\n  title: string\n  subtitle\?: string\n  percentage\?: number\n  color\?: string\n\}/, 
`export interface FunnelLevel {\n  title: string\n  subtitle?: string\n  percentage?: number\n${toAdd}}`);

modified = modified.replace(/export interface IcebergSection \{\n  title: string\n  subtitle\?: string\n  isAbove: boolean\n\}/, 
`export interface IcebergSection {\n  title: string\n  subtitle?: string\n  isAbove: boolean\n${toAdd}}`);

modified = modified.replace(/export interface DashboardMetric \{\n  label: string\n  value: string\n  change\?: string\n  color\?: string\n\}/, 
`export interface DashboardMetric {\n  label: string\n  value: string\n  change?: string\n  color?: string\n  icon?: string\n  percent?: string\n}`);

modified = modified.replace(/export interface AgendaItem \{\n  number: string\n  title: string\n  subtitle\?: string\n\}/, 
`export interface AgendaItem {\n  number: string\n  title: string\n  subtitle?: string\n${toAdd}}`);

modified = modified.replace(/export interface ComparisonItem \{\n  label: string\n  left: string\n  right: string\n\}/, 
`export interface ComparisonItem {\n  label: string\n  left: string\n  right: string\n${toAdd}}`);

modified = modified.replace(/export interface BudgetItem \{\n  label: string\n  amount: string\n  percentage: number\n  color\?: string\n\}/, 
`export interface BudgetItem {\n  label: string\n  amount: string\n  percentage: number\n  color?: string\n  icon?: string\n  value?: string\n  percent?: string\n}`);

modified = modified.replace(/export interface GoalsMetric \{\n  label: string\n  value: string\n  target: string\n\}/, 
`export interface GoalsMetric {\n  label: string\n  value: string\n  target: string\n${toAdd}}`);

modified = modified.replace(/export interface ManufacturingStation \{\n  title: string\n  subtitle\?: string\n  isQuality\?: boolean\n\}/, 
`export interface ManufacturingStation {\n  title: string\n  subtitle?: string\n  isQuality?: boolean\n${toAdd}}`);

modified = modified.replace(/export interface ValueChainActivity \{\n  title: string\n  subtitle\?: string\n\}/, 
`export interface ValueChainActivity {\n  title: string\n  subtitle?: string\n${toAdd}}`);

fs.writeFileSync('src/templates/types.ts', modified, 'utf8');
