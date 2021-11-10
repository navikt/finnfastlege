# Finnfastlege

Frontend i Modia for oppslag av person sin fastlege

## TL;DR

React-app for oversikt med all informasjon om en gitt person sin fastlege i Modia for NAV-identer med tilgang til SYFO.
Node-app som kjører på Naiserator, og bygges med GitHub Actions.

## Kjøre lokalt

Applikasjonen har en mock som kan brukes lokalt. Her mockes endepunktene.

Du må ha Node installert.

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
$ npm install # installerer avhengigheter
```

Kjøre redis og mock-oauth2-server i docker-compose:

```sh
$ ./start-dev.sh # starter Redis og mock-oauth2-server (se under for mer info)
```

## Redis Cache

Brukes for å cache bruker-sessions.
Lokalt oppsett ligger i `docker-compose.yml`, mens nais-oppsettet ligger i `.nais/redis.yaml`.
Redis pod deployes automatisk ved endringer i workflow eller config i master,
men kan også deployes manuelt til NAIS ved å kjøre følgdende kommando: `kubectl apply -f .nais/redis.yaml`.
