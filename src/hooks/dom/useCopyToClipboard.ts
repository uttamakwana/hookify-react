export default function useCopyToClipboard() {
  function copy(text: string) {
    if (!navigator.clipboard) return alert("Navigator clipboard not found!");
    navigator.clipboard.writeText(text);
  }

  return { copy };
}
