# Vite: `transformIndexHtml` ignores `sharedDuringBuild`

Minimal reproduction for Vite 8.3.8.

```sh
npm install
npm run build
```

Actual output: `transformIndexHtml` runs on a second plugin instance that never received `configResolved`.

```
configResolved     -> instance 1
configResolved     -> instance 1
generateBundle     -> instance 1 (configResolved ran: true)
transformIndexHtml -> instance 2 (configResolved ran: false)
```

Expected output: every hook runs on instance 1.

Removing `builder: {}` from `vite.config.js` gives the expected output.
