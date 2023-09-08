## Developing

Before running make sure you populate the two variables in `main.js`:

```
ENDPOINT_URL=
API_KEY=
```

**Note**: the `API_KEY` value will be readable in plain text in JavaScript. If you want to secure your API key you can implement a backend proxy of you choice such as a severless function (e.g. Vercel, Netlify, Azure, etc.).

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
