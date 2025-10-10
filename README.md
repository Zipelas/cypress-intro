# Testning - Uppgift 2.

## Beskrivning

Det här projektet är byggt med Next.JS, Cypress, MongoDB, Prisma, Tailwind, Zod. Jag har skapat komponenter där du kan välja datum, fylla i hur många steg man har gått, fylla i ett namnt, <ul> där namn visas och tas bort, en dropdown, ett infocard där statistik visas.

Jag skrev ett par användarflöden om användarna Tom & Jerry:

1a-gångsanvändaren
Tom går in på sidan. Han väljer vilket datum han vill använda. Sen fyller han i ett inputfält hur många steg han har gått för dagen och så sparar han det. När han skriver in "tusen" så får han ett felmeddelande. Han fyller sedan i med siffror (1000). Sen stänger han ner sidan.

Återgångsanvändare
Jerry gör samma sak som Tom + plus att han går in klickar på knappen statistik. Där kan han välja på olika statistik (Gått i snitt, Gått varje månad och Gått totalt per år) som han vill se. Sen så stänger han ner sidan.


## Installation

Kör `npm install` för att installera alla paket.

## Utveckling

Kör `npm run dev` för att starta utvecklingsservern.

## Testning

Kör `npm test` för att köra testerna.