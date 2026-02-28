import { useRef, useState } from 'react';

type Copy = {
  title: string;
  text: string;
};

export function useCopy() {
  const [isCopied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const copy = async ({ title, text }: Copy) => {
    try {
      await navigator.clipboard.writeText(`${title}\n${text}`);
      setCopied(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      console.log('Error!');
      return;
    }
  };

  return { copy, isCopied };
}
