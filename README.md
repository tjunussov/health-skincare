# Health Skincare — Skin Routine

Персональный минималистичный weekly skincare tracker, оптимизированный под iPhone и установку на домашний экран как web app.

## Цель

Основная задача текущего ухода — уменьшить визуальную выраженность расширенных пор и улучшить текстуру кожи без перегрузки активами.

## Текущая рутина

### Утро — ежедневно

1. **Medi-Peel Peptide 9 Aqua Essence Facial Cleanser**
2. **Anua Niacinamide 10% + TXA 4%**
3. **SKIN1004 Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++**

Тонер Medi-Peel можно использовать опционально. Отдельный крем утром не обязателен, если коже комфортно после сыворотки и SPF.

### Вечер

| День | Актив |
|---|---|
| Понедельник | The Ordinary Retinol 1% in Squalane |
| Вторник | The Ordinary Salicylic Acid 2% |
| Среда | Recovery |
| Четверг | The Ordinary Retinol 1% in Squalane |
| Пятница | The Ordinary Salicylic Acid 2% |
| Суббота | Recovery |
| Воскресенье | The Ordinary Retinol 1% in Squalane |

В recovery-дни используются только мягкое очищение и, при необходимости, увлажнение. **The Ordinary Hyaluronic Acid 2% + B5** можно использовать при ощущении сухости.

## Правила

- Retinol 1% и Salicylic Acid 2% не используются в один вечер.
- SPF50 используется каждое утро, особенно на фоне ретиноида и BHA.
- При стойком раздражении, выраженном шелушении или жжении частоту активов следует уменьшить.
- Тонер не является ключевым средством для уменьшения видимости пор.
- Не добавлять новые кислоты или агрессивные скрабы без необходимости.

## Приложение

`index.html` — mobile-first weekly todo tracker:

- крупный интерфейс под iPhone;
- автоматическое открытие текущего дня;
- отдельные утренние и вечерние задачи;
- переключение Пн–Вс;
- progress ring;
- сохранение выполненных задач в `localStorage`;
- автоматическая поддержка iOS dark mode.

После публикации GitHub Pages приложение должно быть доступно по адресу:

https://tjunussov.github.io/health-skincare/

На iPhone: открыть адрес в Safari → **Поделиться → На экран «Домой»**.

## Deployment

Workflow `.github/workflows/pages.yml` автоматически пытается публиковать содержимое ветки `main` через GitHub Actions при каждом push.

Если GitHub Pages ещё ни разу не был активирован для репозитория, GitHub может потребовать однократно выбрать **Settings → Pages → Source: GitHub Actions**. После первоначальной активации последующие изменения должны деплоиться автоматически.

## Repository

https://github.com/tjunussov/health-skincare
