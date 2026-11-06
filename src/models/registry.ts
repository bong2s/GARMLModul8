// Model registry — paths to the three GLB files of Modul 8 in public/models/.
// Model IDs and learning-topic IDs are intentionally separate.
// The mapping below is an explicit configuration, not derived from geometry.

import { BOARD_CONTEXT, MODULE_TOPICS, type LessonTopic } from "../content/lessons";

export interface ModelEntry {
  id: string;
  label: string;
  url: string;
}

const BASE = import.meta.env.BASE_URL;

// Order = learning flow in the scene: CPU → Circuit Board → RAM.
export const MODELS: ModelEntry[] = [
  { id: "cpu", label: "CPU Processor", url: `${BASE}models/CPU_Processor.glb` },
  { id: "circuit-board", label: "Circuit Board", url: `${BASE}models/Circuit_Board.glb` },
  { id: "ddr5-ram", label: "DDR5 RAM", url: `${BASE}models/DDR5_RAM.glb` },
];

// Primary owner of each of the six topics (model id → topic ids).
// Configured by the course author; not inferred from 3D geometry.
export const MODEL_TOPIC_MAP: Record<string, string[]> = {
  cpu: ["instruction-characteristics", "operation-types", "assembly", "instruction-format"],
  "ddr5-ram": ["operand-types", "addressing"],
  "circuit-board": [],
};

// Extra panels shown as tabs for a model: a supporting context panel and links to related topics.
const MODEL_CONTEXT: Record<string, LessonTopic[]> = { "circuit-board": [BOARD_CONTEXT] };
const MODEL_RELATED: Record<string, string[]> = { "circuit-board": ["operand-types", "addressing"] };

/** Topics owned by the model (used for the pill counter and for alur-chip selection). */
export function getOwnTopicsForModel(modelId: string): LessonTopic[] {
  const ids = MODEL_TOPIC_MAP[modelId] ?? [];
  return MODULE_TOPICS.filter((t) => ids.includes(t.id));
}

/** All tabs shown in the info panel of a model. */
export function getTopicsForModel(modelId: string): LessonTopic[] {
  const related = MODULE_TOPICS.filter((t) => (MODEL_RELATED[modelId] ?? []).includes(t.id));
  return [...(MODEL_CONTEXT[modelId] ?? []), ...getOwnTopicsForModel(modelId), ...related];
}
