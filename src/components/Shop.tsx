import { useEffect, useState } from 'preact/hooks';

// Корзина-демо: карточки не ведут внутрь товара, кнопка [data-add] кладёт товар в корзину этой вкладки.
export function CartCount({ label = '' }: { label?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let toast: HTMLDivElement | null = null;
    let timer = 0;
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-add]');
      if (!btn) return;
      e.preventDefault();
      setN((x) => x + 1);
      btn.classList.add('is-added');
      setTimeout(() => btn.classList.remove('is-added'), 900);
      if (!toast) { toast = document.createElement('div'); toast.className = 'cart-toast'; toast.setAttribute('role', 'status'); document.body.append(toast); }
      toast.textContent = `«${btn.dataset.add}» в корзине`;
      toast.classList.add('is-on');
      clearTimeout(timer);
      timer = window.setTimeout(() => toast?.classList.remove('is-on'), 1800);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return <span class="cart-count" data-n={n}>{label}{n > 0 ? ` ${n}` : label ? '' : '0'}</span>;
}

type Chip = { id: string; title: string };
// Чипы раздела: «Все» первым, показываем только выбранное (стандарт каталогов владельца)
export function Chips({ chips, target, cls = 'chips' }: { chips: Chip[]; target: string; cls?: string }) {
  const [cur, setCur] = useState('all');
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(`${target} [data-cat]`).forEach((el) => {
      el.hidden = cur !== 'all' && el.dataset.cat !== cur;
    });
  }, [cur]);
  return (
    <div class={cls} role="tablist">
      {[{ id: 'all', title: 'Все' }, ...chips].map((c) => (
        <button type="button" role="tab" aria-selected={cur === c.id} class={cur === c.id ? 'is-on' : ''} onClick={() => setCur(c.id)}>
          {c.title}
        </button>
      ))}
    </div>
  );
}

// Стрелки для горизонтальной ленты (scroll-snap): листают ленту на ширину видимой части.
export function Arrows({ target, cls = 'arrows' }: { target: string; cls?: string }) {
  const go = (dir: number) => {
    const el = document.querySelector<HTMLElement>(target);
    el?.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };
  return (
    <div class={cls}>
      <button type="button" aria-label="Назад" onClick={() => go(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
      </button>
      <button type="button" aria-label="Вперёд" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}
