export const toWaterfallColumns = <T>(
  items: T[],
  columnCount: number,
  heightOf: (item: T) => number,
) => {
  const columns = Array.from({ length: columnCount }, () => ({ items: [] as T[], height: 0 }));

  items.forEach((item) => {
    const shortest = columns.reduce((best, column) => (column.height < best.height ? column : best));
    shortest.items.push(item);
    shortest.height += heightOf(item);
  });

  return columns.map((column) => column.items);
};
