## Линтер (ESLint)

Установите ESLint и Biome:
```bash
bun install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier --save-dev
```
Запустите проверку:
```bash
bun run lint
```
Исправьте ошибки:
```bash
bun run lint:fix
```
Интегрируйте ESLint в вашу среду разработки:
- Установите расширение ESLint для VSCode.
- Настройте автоматическую проверку и исправление кода.
