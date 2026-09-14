export function handleTelemetry(event: string, data: Record<string, any>) {
  if (!event) throw new Error('Event required');
  return { status: 'processed', event, timestamp: Date.now(), data };
}
