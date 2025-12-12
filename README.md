### Для работы проекта должны быть установлены:
- Node.js (версия 16 или выше)
- npm (менеджер пакетов, идет в комплекте с Node.js)
- установленная утилита tcpdump

### Шаг 1
Склонируйте репозиторий
```bash
git clone https://github.com/siparat/unix-lab.git
```

### Шаг 2
Установите зависимости
```bash
cd unix-lab
npm i
```

### Шаг 3
Скопируйте файл .env.example в .env и настройте конфиг
``` bash
cp .env.example .env
```

### Шаг 4
Соберите проект
``` bash
npm run build
```

### Шаг 5
Запуск
``` bash
npm run start
```
<img width="1009" height="831" alt="image" src="https://github.com/user-attachments/assets/6dbf7db6-5fa2-45f6-92b0-9f84f78dd203" />


### Шаг 6
Тестирование. Отправьте запросы на указанные порты в течение 10 секунд
<img width="1549" height="126" alt="image" src="https://github.com/user-attachments/assets/7f9ce46e-070a-4c5f-9441-f1fc9d5a4d3e" />

