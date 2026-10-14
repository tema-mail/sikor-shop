import raw from './products.json';

// Факты о магазине – из сообщества vk.ru/sikor_men (снято 14.10.2026)
export const site = {
  name: 'SIKOR',
  tagline: 'Бренд мужской одежды',
  motto: 'Без логотипов. Без лишнего. С вниманием к деталям.',
  about: 'SIKOR – пространство мужского стиля. Работаем индивидуально под запрос: подбираем готовые решения для жизни, работы и выходных.',
  city: 'Челябинск',
  mall: 'ТРК «Куба», 2 этаж',
  address: 'ул. Цвилинга, 25',
  hours: '10:00–22:00 ежедневно',
  phone: '+7 (982) 316-54-46',
  phoneHref: 'tel:+79823165446',
  vk: 'https://vk.ru/sikor_men',
  write: 'https://vk.me/sikor_men',
  map: 'https://yandex.ru/maps/?text=%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%A6%D0%B2%D0%B8%D0%BB%D0%B8%D0%BD%D0%B3%D0%B0%2C%2025',
  rating: '5,0',
  reviews: 19,
  followers: '21 тыс.',
};

// Меню – разделы сообщества VK, которые станут страницами сайта
export const menu = ['Новинки', 'Каталог', 'Готовые образы', 'Акции', 'Отзывы', 'Как нас найти'];

export const cats = [
  { id: 'outer', title: 'Верхняя одежда' },
  { id: 'knit', title: 'Свитеры и полузамки' },
  { id: 'shirts', title: 'Рубашки и поло' },
  { id: 'pants', title: 'Брюки и джинсы' },
  { id: 'shoes', title: 'Обувь' },
] as const;
export type CatId = (typeof cats)[number]['id'];

export type Product = { n: number; id: string; title: string; price: number; old: number | null; cat: CatId; descr: string };
export const products = raw as Product[];
const byN = new Map(products.map((p) => [p.n, p]));
/** Товары по номерам из выгрузки – в каждом варианте своя подборка. */
export const pick = (ns: number[]) => ns.map((n) => byN.get(n)!).filter(Boolean);
export const catTitle = (id: string) => cats.find((c) => c.id === id)?.title ?? '';
export const catCount = (id: string) => products.filter((p) => p.cat === id).length;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p = '') => `${BASE}/${p}`;
/** Фото товара: 600 или 1200 px по ширине, 3:4. */
export const photo = (id: string | Product, w: 600 | 1200 = 600) => url(`img/p/${typeof id === 'string' ? id : id.id}-${w}.webp`);
export const srcset = (p: Product) => `${photo(p, 600)} 600w, ${photo(p, 1200)} 1200w`;
export const cover = (w: 960 | 1920 = 1920) => url(`img/cover-${w}.webp`);
export const rub = (n: number) => `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ₽`;
export const off = (p: Product) => (p.old ? `−${Math.round((1 - p.price / p.old) * 100)}%` : '');

export const variants = [
  { slug: 'v1-bork', title: 'Bork', note: 'Тёмная витрина, слайдер первого экрана, плитки разделов – раскладка bork.ru в цветах SIKOR' },
  { slug: 'v2-tsum', title: 'ЦУМ Collect', note: 'Белый универмаг: карусели «новые поступления», баннеры парой, сервис значками' },
  { slug: 'v3-kavara', title: 'Kavara', note: 'Чёрно-белый моно-шрифт, бегущая строка, плитки с плюсами, ч/б фото' },
  { slug: 'v4-marc-o-polo', title: 'Marc O’Polo', note: 'Кампания на весь экран, узкий жирный заголовок, спокойная бежевая гамма' },
  { slug: 'v5-idol', title: 'IDOL', note: 'Журнальная сетка: большие кадры вперемешку с товарами на сером фоне' },
  { slug: 'v6-henderson', title: 'Henderson', note: 'Классический мужской магазин: баннер, круглые разделы, ряд новинок' },
  { slug: 'v7-brioni', title: 'Brioni', note: 'Люкс: слоновая кость, антиква, много воздуха и тихая сетка' },
  { slug: 'v8-obrazy', title: 'Свой: образы целиком', note: 'Под SIKOR: продаём подбор – готовый образ и вещи из него, тёплый шоурум' },
];
