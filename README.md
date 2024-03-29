# SqriptSquad

## Start
Lägg .env i server mapp
öppna två terminaler  
i den första skriv "npm start"  
i den andra skriv "cd server" sen "node server.js"

## Databas
vi använder Notion som databas och hämtar data via Notions API

## Backend
Express används som server som sköter kontakten med Notions api och förvarar Api nycklar i en .env

## Frontend
För fontend använder vi react. Vi har react-router som låser ner alla sidor förutom login om man inte är inloggad

## Features
### Login
Första sidan användaren möts av är en loginsida där man kan skickas vidare till Notion för inloggning. Från Notion får vi en kod som skickas till våran server för att generera en oauht token. för att begränsa för att släppa in vem som helst så jämförs ägaren till token om den finns med i SqriptSquads workspace på notion. Om ägaren till token är medlem i workspacet så blir dom insläppta och token sparas i LocalStorage för att fortsätta vara inloggad.

på login sidan finns även en funktion som validerar att den som är sparad i LocalStorage är en del av workspacet.

### Översikt
När användaren blivit inloggad så hamnar dom på översikt-sidan. där kan vi se en översikt av alla projekt och ta oss vidare till en sida där vi kan rapportera och se rapporterad tid. som standard så filtrerar översikten på aktiva projekt.

### Projekt
På projekt sidan så får vi ett formulär för att raportera tid och en lista över rapporter för det projektet. på projekt sidan hämtas ett id från people tabellen i databasen som matchar namnet på den användarens om är inloggad. Det används för att sätta ett namn i tidrapporten. om inget namn matchar med användares i tabellen så används id för "unkown".

## Övrigt
Scrumboard: https://app.asana.com/0/1206692077462564/1206692077462564
