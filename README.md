# fmc-website
Deploy a RedwoodSDK website on Cloudflare using markdown in GitHub repo.
No build required once deployed, simply push changes and shift-reload in browser.

### Scripts
```json
{
  "dev": "vite dev --force",
  "test": "vitest run",
  "build": "vite build",
  "preview": "vite build && vite preview",
  "ship": "vite build && wrangler deploy",
  "types": "wrangler types --include-runtime false --strict-vars false",
  "tail": "wrangler tail"
}
```

### Cloudflare setup

1. Create secrets and configure dev content source in .dev.vars
  ```txt
GH_PAT=<GitHub Personal Access Token with read access to the repo>
IMAGE_KEY=<string for signing image URLs - non-critical, just for abuse protection>
DEV_CONTENT_DIR=<local content directory for dev - defaults to ./content>
  ```

2. Configure secrets and bindings (paste secret when prompted) - requires Cloudflare account with R2 enabled
  ```sh
pnpm wrangler secret put GH_PAT
pnpm wrangler secret put IMAGE_KEY
pnpm wrangler kv namespace create fmc-website_PAGEDATA_CACHE
pnpm wrangler kv namespace create fmc-website_STATIC_CACHE
pnpm wrangler r2 bucket create fmc-website-images
  ```

3. wrangler.jsonc
  - Change worker name
  - Change GH_OWNER, GH_REPO, GH_BRANCH, GH_PATH
  - Copy IDs for KV namespaces from previous commands

### Docs
- https://docs.rwsdk.com/
- https://developers.cloudflare.com/workers/
- https://developers.cloudflare.com/r2/
- https://developers.cloudflare.com/kv/