# Testing JavaScript workshop

## Komme i gang

For å gjøre denne workshop-en trenger du Node installert. Hvis du skriver `node -v` i terminalen og får opp et versjonsnummer som er 12.x eller høyere er du klar til å begynne. For å installere Node kan du for eksempel <a href="https://nodejs.org/en/download/">gå hit</a>.

### Sett opp prosjektet

Begynn med å klone dette repoet,

```
git clone git@github.com:erlenlo/javascript-testing-workshop.git
```

Installer deretter avhengigheter ved å kjøre kommandoen

```
npm install
```

### Start prosjektet

Nå skal du kunne kjøre nettsiden. Dette er en enkel React-Redux-app der du kan skrive artikler, og få dem opp sammen med andres i en felles feed. Appen kobler seg altså til en eksisterende backend, men den behøver du ikke tenke på i denne workshopen. For å få opp nettsiden kan du skrive,

```
npm start
```

Nå skal nettsiden være tilgjengelig på <a href="http://localhost:4100">http://localhost:4100</a>. Prøv gjerne å legge inn en artikkel eller to, og bli kjent med nettsiden før du går videre!

## Oppgave 1

Cypress er et rammeverk for å skrive ende-til-ende-tester i JavaScript. Cypress er allerede installert i dette prosjektet her og klart til å tas i bruk, men for et nytt prosjekt er det ikke verre enn å skrive `npm install --save-dev cypress`.

Fra før av har vi lagt til en Cypress-test. Denne finner du i `cypress/e2e`-mappa. Testen er skrevet riktig, men den feiler! Argg! Din første oppgave er å finne og rette opp i feilen i React-koden, slik at testen blir grønn.

La oss begynne med å kjøre Cypress-testene. For å starte Cypress skriver du

```
npm run cypress
```

Cypress-testene krever at nettsiden allerede kjører, så bruk gjerne to terminalvinduer der du kjører `npm start` i det ene og `npm run cypress` i det andre. Da skal du få opp et Cypress-vindu. Trykk på knappen "Run all specs". Da skal testen "fremtidig testnavn her" kjøre men feile.

For å finne feilen er det lurt å begynne med å kikke på testkoden. Når testen har blitt grønn kan du gå videre til neste oppgave.

## Oppgave 2

... Lage noen egne Cypress-tester

## Oppgave 3

... Unit testing med Jest

## Oppgave 4

... Mer viderekommende Cypress-oppgaver; noe mot api; mocking?
