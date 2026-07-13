import React from 'react';

const box = 'fill-none stroke-current opacity-40';
const label = 'fill-current font-bold';
const sub = 'fill-current opacity-50';
const wire = 'wire fill-none stroke-current opacity-30';
const mono = { fontFamily: 'var(--font-mono)' } as const;

function Node({ x, y, w = 116, h = 56, title, note }: {
  x: number; y: number; w?: number; h?: number; title: string; note?: string;
}) {
  return (
    <g style={mono}>
      <rect x={x} y={y} width={w} height={h} className={box} strokeWidth="1" />
      <text x={x + 12} y={y + (note ? 25 : 33)} fontSize="11" className={label}>
        {title}
      </text>
      {note && (
        <text x={x + 12} y={y + 41} fontSize="9" className={sub}>
          {note}
        </text>
      )}
    </g>
  );
}

export default function ArchDiagram() {
  return (
    <div data-reveal className="diagram mt-16 md:mt-20">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 820 320"
          className="min-w-[680px] w-full text-ink dark:text-stone-200"
          role="img"
          aria-label="Reference cloud architecture: clients through edge and API gateway to auth, core and AI services, backed by Postgres, Redis and a message queue"
        >
          {/* wires */}
          <path d="M138 158 H 190" className={wire} strokeWidth="1" pathLength={100} />
          <path d="M308 158 H 360" className={wire} strokeWidth="1" pathLength={100} />
          <path d="M478 158 H 505 V 68 H 532" className={wire} strokeWidth="1" pathLength={100} />
          <path d="M478 158 H 532" className={wire} strokeWidth="1" pathLength={100} />
          <path
            d="M478 158 H 505 V 248 H 532"
            className="wire fill-none stroke-copper dark:stroke-copper-bright opacity-70"
            strokeWidth="1"
            pathLength={100}
          />
          <path d="M648 68 H 694" className={wire} strokeWidth="1" pathLength={100} />
          <path d="M648 158 H 694" className={wire} strokeWidth="1" pathLength={100} />
          <path d="M648 248 H 694" className={wire} strokeWidth="1" pathLength={100} />

          {/* junction dots */}
          {[
            [190, 158], [360, 158], [532, 68], [532, 158], [532, 248],
            [694, 68], [694, 158], [694, 248],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" className="fill-copper dark:fill-copper-bright" />
          ))}

          {/* nodes */}
          <Node x={22} y={130} title="CLIENTS" note="web · mobile" />
          <Node x={192} y={130} title="EDGE / CDN" note="cache · waf" />
          <Node x={362} y={130} title="API GATEWAY" note="rest · events" />
          <Node x={532} y={40} title="SVC / AUTH" w={116} />
          <Node x={532} y={130} title="SVC / CORE" w={116} />
          <Node x={532} y={220} title="SVC / AI" w={116} />
          <Node x={694} y={40} title="POSTGRES" w={104} />
          <Node x={694} y={130} title="REDIS" w={104} />
          <Node x={694} y={220} title="QUEUE" w={104} />
        </svg>
      </div>
      <p className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-4">
        fig. 02 — reference cloud architecture
      </p>
    </div>
  );
}
