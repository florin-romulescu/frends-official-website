const MAX_REVEAL_DELAY = 40;

export const revealDelay = (index: number, step = 10) =>
  `--reveal-delay:${Math.min(index * step, MAX_REVEAL_DELAY)}%`;
