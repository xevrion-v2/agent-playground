const toTitleCase = (str: string): string => str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

export { toTitleCase };
