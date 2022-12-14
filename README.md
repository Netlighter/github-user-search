# Github User Search

Проект реализован полностью в соответствии с ТЗ

Все зависимости построены на node=16.10.0 и npm=8.19

Для запуска проекта: 
- склонировать репозиторий
- прописать `npm install --dev` (т.к. в проекте есть dev-зависимости)
- запустить через `npm start`

Технологии использованные в проекте:
- React (Требование тз)
- Tailwind CSS (Требование тз)
- React Redux-Toolkit (Данный стейт-менеджер был выбран по причине того, что он является самым распространенным, гибким и, на мой взгляд, удобным вариантом для данного (небольшого) проекта.
- Redux-Thunk Middleware (Необходим для удобной работы с асинхронными запросами, в данном случае для запросов к внешнему API)
- React-Router-DOM (Пригодился для создания роутов приложения, а также для реализации перехода по query-string и возможности передавать их в качестве параметров для экшенов).

Особенности реализации:
- Внутри стора всего 1 слайс с двумя схожими по функционалу асинхронными запросами к API
- Все тейлвинд-стили вынесены в отдельные файлы для удобства редактирования и облегчения компонентов от лишнего кода
- Несмотря на то, что внутри сайта перейти к коммитам можно только по нажатию на репозиторий, была реализована обработка ошибки отсутствия коммитов, так как можно самостоятельно сформировать query-string запрос на отображение коммитов
- Каждый переход сопровождается лоадерами и обработкой ошибок
- В дизайне реализованы небольшие приятные hover-анимации для придания сайту "отзывчивости"
- Вернуться назад можно из любого места приложения
