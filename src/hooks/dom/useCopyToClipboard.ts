import { useState } from "react";

type TUseCopyToClipboardReturn = {
  copy: (text: string) => Promise<void>;
  isCopied: boolean;
  error: string | null;
};

/**
 * A custom React hook to copy text to the clipboard.
 *
 * - Uses the modern `navigator.clipboard` API.
 * - Provides feedback on copy success or failure.
 * - Ensures clipboard API availability.
 *
 * @returns {Object} An object containing:
 * - `copy`: A function to copy text to the clipboard.
 * - `isCopied`: Boolean indicating whether copying was successful.
 * - `error`: Any error that occurred while copying.
 *
 * @example
 * import { useCopyToClipboard } from "hookify-react";
 *
 * export default function UseCopyToClipboard() {
 *   const { copy, isCopied, error } = useCopyToClipboard();
 *
 *   return (
 *     <div>
 *       <button onClick={() => copy("Hello, Clipboard!")}>Copy</button>
 *       {isCopied && <span>Copied successfully!</span>}
 *       {error && <span>Error copying: {error}</span>}
 *     </div>
 *   );
 * }
 */
export function useCopyToClipboard(): TUseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copy(text: string) {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);

      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError((err as Error).message);
      setIsCopied(false);
    }
  }

  return { copy, isCopied, error };
}
