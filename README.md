# BookClubExamination
This is a mono-repo for teaching purposes!

Root level is a Vite+React+JS project.

As a backend we use the CMS strapi (contained in the strapi folder)

## Teknikstack

- Node.js
- Express
- SQLite (better-sqlite3)
- Dotenv (.env)
- UUIDv4

### Install dependencies
To install all dependencies

```
npm install
cd strapi
npm install
```

Why don't we use npm workspaces? Currently strapi has an issue with installing its dependencies correctly when using npm workspaces.

### Start the dev environment
In the root folder run

```
npm start
```

### Admin credentials for strapi during development

```
First name: Admin 
Email: jimmybookkyh@gmail.com
Password: Admin123
```

## Installation

```bash
# Klona repot
git clone [https://github.com/HelenaRhawi/Examinerande-projektarbete.git]
cd [Examinerande-projektarbete]

# Installera beroenden
npm install

# Skapa .env (kopiera från .env.example)
cp .env.example .env
# Fyll i dina värden i .env

# Starta servern
node server.js
# eller med nodemon:
nodemon server.js
```

Servern startar på `http://localhost:3000`.

## API-dokumentation

[API Dokumentation](api-docs.md)
[I länken ovan kan man finna alla endpoint med metod, URL, body, svar och felfall.]

## WebSocket-diskussion

[Text]

## Gruppmedlemmar

| Namn             | Datum  | Signatur / OK |
| -----------------| -------| ------------- |
| Andrea Vega      | 260505 | OK ⛵        |
| Teddy Lind       | 260505 | OK 🧸        |
| Eva Maria Köning | 260505 | OK 😂        |
| Jimmy Book       | 260505 | OK 📘        |
| Sara Kempii      | 260505 | OK 🌹        |



