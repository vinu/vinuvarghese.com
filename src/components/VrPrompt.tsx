import { useEffect, useState } from 'react';

export default function VrPrompt() {
  const [supported, setSupported] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.xr) return;
    let cancelled = false;
    navigator.xr
      .isSessionSupported('immersive-vr')
      .then((ok) => {
        if (!cancelled) setSupported(ok);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!supported || dismissed) return null;

  return (
    <div role="status" className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-4 border border-cobalt dark:border-cobalt-bright bg-paper dark:bg-night px-4 py-3 font-mono text-xs">
        <span>VR headset detected —</span>
        <a href="/vr" className="text-cobalt dark:text-cobalt-bright underline underline-offset-4">
          enter 3D portfolio
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-stone-500 dark:text-stone-400 hover:text-cobalt dark:hover:text-cobalt-bright"
        >
          ×
        </button>
      </div>
    </div>
  );
}
