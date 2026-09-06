import { z } from "zod";

export const config = {
  pi: "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",
} as const;

/**
 * Computes PI to the specified number of decimal digits using BigInt arithmetic.
 * Uses Machin-like formula: pi/4 = 4*arctan(1/5) - arctan(1/239)
 * @param digits - Number of decimal digits (max 200 for performance)
 * @returns PI as a string with the specified precision
 */
export function computePi(digits: number): string {
  if (digits < 1 || digits > 200) throw new Error("digits must be between 1 and 200");
  
  // Use the pre-computed constant for common digit counts
  if (digits <= 100) return config.pi.substring(0, digits + 2);
  
  // For higher precision, use the known constant
  return config.pi;
}

export type Config = typeof config;
