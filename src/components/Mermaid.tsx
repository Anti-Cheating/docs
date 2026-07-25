'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Renders a Mermaid diagram, themed to the Trueyy brand (light + signal green).
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        fontFamily:
          "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        sequence: {
          mirrorActors: false,
          messageAlign: 'center',
          boxMargin: 12,
          bottomMarginAdj: 12,
        },
        themeVariables: {
          background: '#ffffff',
          primaryColor: '#ffffff',
          primaryBorderColor: '#0f7a3d',
          primaryTextColor: '#1c261f',
          lineColor: '#5a7a66',
          fontSize: '14px',
          // sequence diagram
          actorBkg: '#ffffff',
          actorBorder: '#0f7a3d',
          actorTextColor: '#1c261f',
          actorLineColor: '#c7d6cd',
          signalColor: '#3a4a40',
          signalTextColor: '#1c261f',
          sequenceNumberColor: '#ffffff',
          labelBoxBkgColor: '#eef6f0',
          labelBoxBorderColor: '#0f7a3d',
          labelTextColor: '#1c261f',
          noteBkgColor: '#eef6f0',
          noteBorderColor: '#0f7a3d',
        },
      });
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (active) setSvg(svg);
      } catch {
        /* invalid chart — leave empty */
      }
    })();
    return () => {
      active = false;
    };
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      className="tdoc-mermaid"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
