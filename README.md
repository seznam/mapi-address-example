# MAPI Examples

Projekt pro testování práce s Mapy API NG v rámci různých knihoven na vykreslování mapy.

## Instalace projektu

```sh
git clone git@gitlab.seznam.net:mapycz/mapi-address-example.git projekt
cd projekt
npm install
```

## Spuštění pro vývoj

```sh
npm start
```
Následně vývojový web běží na http://localhost:8080/.

## Vytvoření produkční verze

```sh
npm run build-prod
```
V podadresáři `dist` je k nalezení sbírka assetů a index.html soubor. Je třeba to pak někam nahrát či zabalit do balíku po svém.

## Vytvoření vývojové verze (bez spuštění)

```sh
npm run build-dev
```

## Analýza

```sh
npm run analyze
```
Graf velikosti je pak vidět na http://127.0.0.1:8888/. Ukazuje to produkční bundle, protože sledovat velikost toho vývojového nedává smysl. Ten je prostě obrovský.
