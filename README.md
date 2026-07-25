# Trueyy SDK Documentation

The documentation site for the [Trueyy SDK](https://github.com/Anti-Cheating/trueyy-sdk), deployed at **[docs.trueyy.com](https://docs.trueyy.com)**.

Built with [Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.dev), in the Trueyy brand (Sora + JetBrains Mono, signal green, light theme). Covers all three published packages: `@trueyy-sdk/node`, `@trueyy-sdk/web`, and `@trueyy-sdk/web-core`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3002
```

## Build

```bash
npm run build
npm run start    # serves the production build on :3002
```

## Structure

```
content/docs/          # the documentation (MDX + meta.json for nav order)
  index.mdx            #   Introduction (the site home, "/")
  quickstart.mdx
  authentication.mdx
  architecture.mdx
  node/                #   @trueyy-sdk/node reference + Example (Express)
  web/                 #   @trueyy-sdk/web reference + Example (React)
  web-core/            #   @trueyy-sdk/web-core (advanced)
src/
  app/
    (docs)/            # the docs route group (served at the root)
    docs-md/           # raw-markdown route (powers "Copy page" / "View as Markdown")
    api/search/        # search index
  components/          # Navbar, Footer, GitHubFab, CopyMarkdownButton
  lib/source.ts        # Fumadocs source loader (baseUrl "/")
```

Edit the docs by changing the MDX in `content/docs/`. Sidebar order is controlled by each folder's `meta.json`.

## Deploy

Any Next.js host (e.g. Vercel). The site is a standard Next.js app; point the `docs.trueyy.com` domain at the deployment.

## License

Documentation © Trueyy. SDK source: [github.com/Anti-Cheating/trueyy-sdk](https://github.com/Anti-Cheating/trueyy-sdk).
