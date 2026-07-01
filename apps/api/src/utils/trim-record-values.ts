type RecordValue = string | number | boolean | null | undefined;
type InputRecord = Record<string, RecordValue>;

const trimRecordValues = (record: InputRecord): InputRecord => {
  const result: InputRecord = {};
  for (const [key, value] of Object.entries(record)) {
    result[key] = typeof value === 'string' ? value.trim() : value;
  }
  return result;
};

export { trimRecordValues, InputRecord };
