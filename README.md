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

Nå skal nettsiden være tilgjengelig på <a href="http://localhost:4100">http://localhost:4100</a>. Det kan imidlertid være at siden ikke fungerer helt som den skal. Dessverre har det lurt seg inn noen bugs i koden, og disse skal du forsøke å finne frem til i løpet av oppgavene under.

## Oppgave 1

Cypress er et rammeverk for å skrive ende-til-ende-tester i JavaScript. Disse testene simulerer valg en bruker foretar seg og sjekker at man ender opp i forventet tilstand. For eksempel kan Cypress automatisk finne et input-felt på siden, fylle det med tekst og trykke på en submit-knapp. Det gjør Cypress til et ekstremt kraftig verktøy! Cypress er allerede installert i dette prosjektet her og klart til bruk, men for et nytt prosjekt er det ikke verre enn å skrive `npm install --save-dev cypress`.

Fra før av har vi lagt til en Cypress-test. Denne finner du i `cypress/e2e`-mappa. Testen er skrevet riktig, men den feiler! Argg! Din første oppgave er å finne og rette opp i feilen i React-koden, slik at testen blir grønn.

La oss begynne med å kjøre Cypress-testene. For å starte Cypress skriver du

```
npm run cypress
```

Cypress-testene krever at nettsiden allerede kjører, så bruk gjerne to terminalvinduer der du kjører `npm start` i det ene og `npm run cypress` i det andre. Da skal du få opp et Cypress-vindu. Trykk på knappen "Run all specs". Dette kjører alle testene. Du skal nå kunne se at testen "fremtidig testnavn her" kjører, men feiler.

For å finne ut hva som er galt i koden er det lurt å begynne med å kikke på testkoden. Når testen har blitt grønn kan du gå videre til neste oppgave.

## Oppgave 2

I denne oppgaven skal du skrive egne Cypress-tester.

a)

Det første vi vil teste er at det skal gå an å publisere en ny artikkel. Denne testen skal simulere følgende løp:

- Brukeren logger inn
- Brukeren trykker på knappen for å opprette en ny artikkel
- Brukeren fyller ut feltene for tittel, tekst or tags
- Brukeren publiserer artikkelen

I alle stegene kan du bruke tilfeldige verdier som data. Avslutt testen med å verifisere at artikkelen er blitt publisert til feeden.

**Tips:**

Det er flere mulige måter for å velge et element på siden. Den enkleste måten er å bruke Cypress sitt "selector"-verktøy for å få tak i en css-selektor som identifserer elementet du er interessert i. Denne kan du bruke ved å trykke på knappen "Open Selector Playground" i Cypress-dashboardet, og så kan du gi selektoren til `cy.get("...")`-funksjonen.

Ulempen med denne fremgangsmåten er at du i stor grad tester en implementasjonsdetalj, nemmelig css-navn. Dette gjør at testen svært fort kan knekke når det gjøres kodeendringer som ikke egentlig endrer funksjonaliteten på siden. I stedet vil det som regel være litt bedre å bruke funksjoner som `findByText` og `findByLabelText` (<a href="https://testing-library.com/docs/dom-testing-library/cheatsheet">se oversikt her</a>), som finner et element med basert på tekstinnhold og derfor er litt mer semantiske.

b) Kanskje har du lagt merke til at du nå har to ulike tester som begge var nødt til å begynne med å logge inn, og derfor dupliserer litt kode. Dette er et vanlig problem og noe vi gjerne ønsker å unngå. Cypress lar oss løse dette ved å trekke ut slike gjentatte steg som egne Cypress-kommandoer.

Man kan legge til en egen kommando med navn `writeSomeText` ved å legge til følgende kode under `cypress/support/commands.js`:

```js
Cypress.Commands.add('writeSomeText', (text) => {
  // For eksempel
  cy.get('.text-input').type(text);
});
```

Dette gjør `writeSomeText` tilgjengelig i testene ved å f.eks. skrive `cy.visit('/').writeSomeText()`.

Lag en Cypress-kommando for å logge inn med et gitt brukernavn og ta den i bruk i de to eksisterende testene.

c) La oss skrive en test for å sjekke at man kan markere en artikkel som favoritt. En god test bør sørge for å laste siden på nytt etter markering, så du er sikker på at effekten av handlingen er persistent og ikke kun er registrert i frontend-en.

**Tips**:

- En utfordring her er å finne favoritt-knappen som hører til riktig artikkel. En mulig løsning på det problemet er å først lete etter artikkelteksten og navigere seg til knappen derfra. Det kan du gjøre ved å først finne tekstelementet, og så bruke `.parent()` for å navigere deg oppover i hierarkiet, fulgt av et nytt `.findBy`-kall for å finne knappen herfra.
- Her legger du nok fort merke til at favoritt-knappen ikke inneholder noe tekst som Cypress kan lete etter. Et alternativ som ofte er litt bedre enn å bruke CSS-selektoren til knappen er å legge til et eget Cypress-attributt på button-komponenten som hjelper oss med å finne den. Hvis du legger til attributtet `data-testid="min-id"`, kan du få tak i knappen ved å skrive `cy.findByTestId('min-id'))`.
- Du kan sjekke om et element har en gitt css-klasse med assert-en `.should('have.class', 'klassenavn')`. <a href="https://docs.cypress.io/guides/references/assertions.html#Common-Assertions">Her er noen eksempler på vanlige assertions.</a>

## Oppgave 3

Mocking...

## Oppgave 4

Hvis du har kommet deg helt til oppgave 4 er vi imponert! Godt jobbet! I denne oppgaven skal du få fritt spillerom. Her skal du legge til en test eller to for noe som du synes det er lurt å teste. Eventuelt, hvis det er noe funksjonalitet i Cypress som du har lyst å prøve ut kan du gjøre det nå.
