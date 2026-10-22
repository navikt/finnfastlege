# Finnfastlege

Frontend i Modia for oppslag av person sin fastlege

## TL;DR

React-app for oversikt med all informasjon om en gitt person sin fastlege i Modia for NAV-identer med tilgang til SYFO.
Node-app som kjører på Naiserator, og bygges med GitHub Actions.

## Kjøre lokalt

Applikasjonen har en mock som kan brukes lokalt. Her mockes endepunktene.

Node-versjonen styres av `.nvmrc`, og pnpm-versjonen er angitt i `package.json`.
Med [nvm](https://github.com/nvm-sh/nvm) installert:

```sh
nvm install
nvm use
```

Endre kun `.nvmrc` for å oppdatere Node lokalt, i GitHub Actions og i Docker.
Docker bruker samme hovedversjon som bygget. Etter at appen er bygget, kan
Docker-imaget bygges lokalt med den valgte Node-versjonen:

```sh
docker build --build-arg NODE_VERSION="$(node -p 'process.versions.node.split(".")[0]')" .
```

- For å kjøre koden lokalt:
  - `$ pnpm install`
  - `$ pnpm start`
  - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
- Kjør tester med `pnpm test` eller `pnpm test:watch`
- Lint JS-kode med `pnpm run lint` eller `pnpm run lint:fix`

Appen nås på [http://localhost:8080](http://localhost:8080)

Ved første kjøring:

```sh
$ cp .env.template .env # for å sette opp lokale miljøvariabler
$ pnpm install # installerer avhengigheter
```

## Redis Cache

Bruker teamsykefravr sin felles Valkey-cache på Aiven for å cache bruker-sessions.
