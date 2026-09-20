# TriCheck · URMIA 2026

A responsive React + TypeScript translation of `../pdf/TriCheck_URMIA2026_Flyer_15_Palettes.pdf`. Includes the flyer, interactive worksheet, and all 15 original palettes. Colors are sampled from the source; Georgia and Arial provide local serif/sans-serif typography without external font requests.

## Run

Use Node.js 22 or newer.

```sh
cd app
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` type-checks and builds to `dist/`; `npm run preview` serves that build.

## Behavior

- The approach and worksheet tabs correspond to the two source pages.
- The palette selector applies any of the 15 PDF color schemes to both pages.
- Seven required multiple-choice questions calculate the original right-column count. The eighth, free-text question and contact fields are optional.
- Answers survive tab and palette changes within the page session. Refreshing clears them. Downloads export a JSON response, including the contact fields and call preference.
- No backend is connected and no responses are transmitted or persisted. The interface states this explicitly. The PDF's placeholder contact information is omitted, and the placeholder QR code becomes a working survey button.
- Print uses a letter-sized layout for the currently selected page.

## Verify

```sh
npm test
```

Browser tests use an installed Google Chrome. They cover palette switching, scoring and changing answers, navigation state, JSON download contents, required answers, keyboard selection, and mobile overflow.

## GitHub Pages

Published at https://billdestein.github.io/survey/.

The repository's Pages source is GitHub Actions. Changes to `app/` on `main` run `.github/workflows/pages.yml`, which builds with Node.js 22 and deploys `app/dist`. You can also run the workflow manually from GitHub Actions. Vite uses relative asset URLs so the app works under the `/survey/` project path.
