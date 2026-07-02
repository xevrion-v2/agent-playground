export interface PiCertificate {
  readonly algorithm: string;
  readonly arithmetic: string;
  readonly digits: number;
  readonly prefix: string;
  readonly knownPrefix100Matches: boolean;
  readonly sha256: string;
}

export function calculatePiPrefix(digits: number): string;
export function chunkPiPrefix(prefix: string, chunkSize?: number): string[];
export function createPiCertificate(digits: number): PiCertificate;
export function explainExactPiLimit(): string;

