import type { LessonBlock, LessonTopic } from "./lessons";

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text = ""): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderBlock(block: LessonBlock): HTMLElement {
  switch (block.kind) {
    case "heading":
      return element("h3", "lesson-heading", block.text);
    case "text":
      return element("p", "", block.text);
    case "list": {
      const list = element(block.ordered ? "ol" : "ul", "lesson-list");
      for (const item of block.items) list.appendChild(element("li", "", item));
      return list;
    }
    case "formula":
      return element("div", "lesson-formula", block.text);
    case "example":
      return element("pre", "lesson-example", block.lines.join("\n"));
    case "note":
      return element("p", "lesson-note", block.text);
    case "figure": {
      const figure = element("figure", "lesson-figure");
      const holder = element("div", "lesson-figure-art");
      holder.innerHTML = block.svg; // static author-written SVG (see figures.ts)
      figure.append(holder, element("figcaption", "", block.caption));
      return figure;
    }
  }
}

/** Replaces the content of a lesson container with the topic's structured sections. */
export function renderLesson(container: HTMLElement, topic: LessonTopic): void {
  container.replaceChildren(...topic.blocks.map(renderBlock));
}
