import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

/**
 * A utility function to combine CSS class names,
 * intelligently merging Tailwind CSS classes to resolve conflicts.
 *
 * @param {...(string | string[] | Record<string, boolean> | null | undefined)} inputs
 * A list of class names or conditional class name objects.
 * @returns {string} The combined and merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}