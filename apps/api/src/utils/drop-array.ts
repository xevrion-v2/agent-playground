const dropArray = <T>(arr: T[], count: number): T[] => count <= 0 ? [...arr] : arr.slice(count);

export { dropArray };
