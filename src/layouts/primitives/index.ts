/**
 * Layout primitives.
 *
 * These control *arrangement* — width, rhythm, wrapping, column behaviour — and
 * own every breakpoint decision on the site. Visual styling (colour, type,
 * radius) belongs to the components in src/components and the tokens in
 * global.css; a primitive should never set a colour.
 *
 * Import from the .astro files directly — this file exists to document the set:
 *
 *   Container  width + gutter        prose | content | wide | full
 *   Section    rhythm + coloured band
 *   Stack      vertical flow, one gap
 *   Cluster    horizontal flow that wraps
 *   Grid       auto-fit columns driven by a min item width
 *   Split      two columns that stack below a stated breakpoint
 */
export {};
