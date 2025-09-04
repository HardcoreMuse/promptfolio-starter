# Promptfolio — Workers Adapter Setup

1. Install dependencies:
   npm i -D @opennextjs/cloudflare wrangler

2. Add scripts to package.json:
   "build": "next build",
   "cf:workers:build": "opennext build --adapter=@opennextjs/cloudflare",
   "cf:workers:deploy": "wrangler deploy"

3. Set env vars in wrangler.toml.

4. Build and deploy:
   npm run cf:workers:build
   npm run cf:workers:deploy
