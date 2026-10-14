import { useEffect, useState } from 'preact/hooks';

// Переключает слайды `${target} .slide` (класс is-active) и рисует полоски-прогресс как на bork.ru.
export default function Slider({ target, labels, ms = 6000, cls = 'bars' }: { target: string; labels: string[]; ms?: number; cls?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.querySelectorAll(`${target} .slide`).forEach((el, k) => el.classList.toggle('is-active', k === i));
    if (paused) return;
    const t = setTimeout(() => setI((i + 1) % labels.length), ms);
    return () => clearTimeout(t);
  }, [i, paused]);
  return (
    <div class={cls} style={`--dur:${ms}ms`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {labels.map((l, k) => (
        <button type="button" class={`bar${k === i ? ' is-active' : ''}${k < i ? ' is-done' : ''}${paused ? ' is-paused' : ''}`} onClick={() => setI(k)} aria-label={`Слайд ${k + 1}: ${l}`}>
          <span class="bar__num">{String(k + 1).padStart(2, '0')}</span>
          <span class="bar__label">{l}</span>
          <span class="bar__track"><i key={`${i}-${k}`} /></span>
        </button>
      ))}
    </div>
  );
}
