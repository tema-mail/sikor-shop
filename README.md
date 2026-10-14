# SIKOR – варианты главной интернет-магазина

Заказчик: SIKOR, мужская базовая одежда, Челябинск, ТРК «Куба» ([vk.ru/sikor_men](https://vk.ru/sikor_men)).
Демо: https://tema-mail.github.io/sikor-shop/ (noindex) – 8 вариантов главной, в каждом 4 блока, один – товары.
Карточки не ведут внутрь товара: кнопка кладёт в демо-корзину (счётчик в шапке).

| № | Вариант | Адрес |
|---|---|---|
| 1 | Bork | /v1-bork/ |
| 2 | ЦУМ Collect | /v2-tsum/ |
| 3 | Kavara | /v3-kavara/ |
| 4 | Marc O'Polo | /v4-marc-o-polo/ |
| 5 | IDOL | /v5-idol/ |
| 6 | Henderson | /v6-henderson/ |
| 7 | Brioni | /v7-brioni/ |
| 8 | Свой: образы целиком | /v8-obrazy/ |

## Устройство
- Astro + Preact. Острова: `src/components/Shop.tsx` (корзина, чипы-фильтр, стрелки ленты), `Slider.tsx` (слайдер с полосками).
- Каждый вариант – одна страница со своими стилями: `src/pages/vN-*/index.astro`.
- Факты о магазине и хелперы – `src/data/site.ts`; товары – `src/data/products.json`.
- Данные: 40 из 205 товаров VK сняты 14.10.2026 (`data-src/vk-selected.json`, фото 1080 px в `data-src/photos`). `npm run data` пересобирает json и webp 600/1200. Разделы проставлены вручную в `scripts/build-data.py`.

## Переменные сборки
`PUBLIC_BASE` (подпапка Pages), `PUBLIC_SITE_URL`, `PUBLIC_NOINDEX=1` – задаёт `.github/workflows/pages.yml`.

## Не подтверждено у заказчика
Доставка, оплата, размерные сетки, бесплатность консультации – на сайте не обещаем. Логотип набран Montserrat 900 по обложке VK, исходника нет.
