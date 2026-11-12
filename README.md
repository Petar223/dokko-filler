# Dokko Filler

Fills Word contract templates with data read from Serbian ID cards and vehicle
registration cards, then lets the user preview and download the `.docx`.

## Requirements

- Node.js 24 (see `.nvmrc`)
- For the real flow: the local card reader service (default
  `http://localhost:8080`, endpoint `GET /read`)
- Without a reader: open `/demo`

## Setup

```bash
npm install
cp .env-cmdrc.example .env-cmdrc   # fill in the values
npm start                           # http://localhost:3000
```

## Environment variables

Read from `.env-cmdrc` in development and from the shell/CI at build time.
Only these reach the browser bundle (see `PUBLIC_ENV` in `webpack.config.js`):

| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Backend API (contract list, contract details, `/case`) |
| `READER_API_BASE_URL` | Local card reader service |
| `CASE_API_KEY` | Key for `POST /case` (public; to be replaced by Cognito auth) |
| `REACT_APP_COGNITO_USER_POOL_ID` | Cognito user pool |
| `REACT_APP_COGNITO_CLIENT_ID` | Cognito app client |
| `REACT_APP_COGNITO_DOMAIN` | Cognito hosted UI domain |
| `REACT_APP_COGNITO_REDIRECT_URLS` | Comma-separated OAuth redirect URLs |

Dev-only: `PORT`, `HTTPS`, `BASE_PATH`.

## Scripts

| Script | |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` (`npx env-cmd -e <profile> npm run build` to load a profile) |
| `npm run analyze` | Production build + bundle analyzer |
| `npm test` | Unit and component tests (Jest + RTL) |
| `npm run lint` | ESLint |
| `npm run template:check -- file.docx` | Check a Word template's placeholders |
| `npm run svgr` | Regenerate icon components from `public/assets/icons` |

## Documentation

See [CLAUDE.md](CLAUDE.md) and [docs/](docs/).
