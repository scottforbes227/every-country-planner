# every-country-planner

Interactive trip planner for visiting every country in the world, live at **[everywere.works](https://everywere.works)**.

## Local Development

```bash
npm install
npm run dev
```

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.

## DNS Setup (name.com → everywere.works)

To point your domain at GitHub Pages, add these DNS records in your [name.com dashboard](https://www.name.com/account/domain/details#dns):

### A records (apex domain `everywere.works`)

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### CNAME record (www subdomain)

| Type | Host | Value |
|------|------|-------|
| CNAME | www | scottforbes227.github.io |

### GitHub Pages settings

1. Go to your repository **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. The custom domain `everywere.works` is already configured via `public/CNAME`

DNS changes can take up to 24 hours to propagate globally. GitHub will automatically provision a free TLS certificate via Let's Encrypt once the DNS is active.
