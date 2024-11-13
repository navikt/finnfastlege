# Finnfastlege

Frontend i Modia for oppslag av person sin fastlege

## TL;DR

React-app for oversikt med all informasjon om en gitt person sin fastlege i Modia for NAV-identer med tilgang til SYFO.
Node-app som kjører på Naiserator, og bygges med GitHub Actions.

## Kjøre lokalt

Applikasjonen har en mock som kan brukes lokalt. Her mockes endepunktene.

Du må ha Node v18 og npm v9 installert.

- For å kjøre koden lokalt:
  - `$ npm install`
  - `$ npm start`
  - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
- Kjør tester med `npm test` eller `npm test:watch`
- Lint JS-kode med `npm run lint` eller `npm run lint:fix`

Appen nås på [http://localhost:8080/fastlege/](http://localhost:8080/fastlege/)

Ved første kjøring:

```sh
$ cp .env.template .env # for å sette opp lokale miljøvariabler
$ npm install --legacy-peer-deps # installerer avhengigheter
```

## Redis Cache

Bruker teamsykefravr sin felles Redis-cache på Aiven for å cache bruker-sessions.
