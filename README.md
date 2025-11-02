# Bermuda Freelance Marketplace 🇧🇲

A fully-featured marketplace connecting Bermuda's freelancers, companies, and clients. Built with Cloudflare Pages, Workers, and D1 (SQLite) for serverless deployment.

## Features

### For Clients
- Post job opportunities with detailed requirements
- Browse available services and professionals
- Filter by category, budget, and skills
- Direct contact with service providers

### For Freelancers & Companies
- List your services and expertise
- Showcase portfolio and skills
- Set pricing and availability
- Connect directly with potential clients

### Platform Features
- 🎨 Modern, responsive design with navy blue & rich yellow theme
- ⚡ Fast, serverless architecture
- 🔍 Search and filter functionality
- 📱 Mobile-friendly interface
- 💾 SQLite database (Cloudflare D1)
- 🌐 No complex servers or plugins required

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Cloudflare Workers (JavaScript)
- **Database**: Cloudflare D1 (SQLite)
- **Hosting**: Cloudflare Pages
- **Deployment**: Wrangler CLI

## Project Structure

```
bermuda-freelance-marketplace/
├── public/                  # Frontend files
│   ├── index.html          # Homepage
│   ├── jobs.html           # Job listings
│   ├── services.html       # Service listings
│   ├── post-job.html       # Post job form
│   ├── post-service.html   # Post service form
│   └── styles.css          # Global styles
├── functions/              # Cloudflare Pages Functions (API)
│   └── api/
│       ├── jobs.js         # Jobs API endpoints
│       ├── services.js     # Services API endpoints
│       ├── inquiries.js    # Inquiries API endpoint
│       ├── job/[id].js     # Single job endpoint
│       └── service/[id].js # Single service endpoint
├── schema.sql              # Database schema
├── wrangler.toml          # Cloudflare configuration
└── package.json           # Project metadata
```

## Database Schema

The platform uses SQLite (via Cloudflare D1) with three main tables:

- **jobs**: Client job postings
- **services**: Freelancer/company service listings
- **inquiries**: Connection requests between clients and providers

## Quick Start

### Prerequisites

1. Node.js (v16 or higher)
2. A Cloudflare account (free tier works!)
3. Wrangler CLI installed globally

### Installation

1. **Install Wrangler CLI** (if not already installed):
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Create a D1 Database**:
```bash
wrangler d1 create bermuda_db
```

This will output a database ID. Copy it!

4. **Update wrangler.toml**:

Replace `your-database-id` in `wrangler.toml` with your actual database ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "bermuda_db"
database_id = "your-actual-database-id-here"
```

5. **Initialize the Database**:
```bash
wrangler d1 execute bermuda_db --file=./schema.sql
```

6. **Test Locally**:
```bash
npm run dev
```

Visit http://localhost:8788 to see your site!

### Deployment

1. **Deploy to Cloudflare Pages**:
```bash
npm run deploy
```

2. **Bind the D1 Database**:

After deploying, you need to bind the D1 database to your Pages project:

```bash
wrangler pages deployment create
```

Or use the Cloudflare Dashboard:
- Go to your Pages project
- Settings → Functions → D1 database bindings
- Add binding: name `DB`, database `bermuda_db`

3. **Your site is live!** 🎉

The deployment will give you a URL like: `https://bermuda-freelance-marketplace.pages.dev`

## Configuration

### Custom Domain

1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Add your domain (e.g., `bermudafreelance.com`)
4. Follow the DNS setup instructions

### Environment Variables

You can add environment variables in `wrangler.toml` under `[vars]`:

```toml
[vars]
ENVIRONMENT = "production"
CONTACT_EMAIL = "admin@yourdomain.com"
```

## Development

### Local Development

```bash
# Start local dev server with D1 binding
npm run dev
```

### Database Operations

```bash
# Execute SQL on local database
wrangler d1 execute bermuda_db --local --file=./schema.sql

# Execute SQL on production database
wrangler d1 execute bermuda_db --file=./schema.sql

# Query the database
wrangler d1 execute bermuda_db --command="SELECT * FROM jobs LIMIT 5"
```

### Adding New Features

The project structure makes it easy to extend:

1. **New API Endpoints**: Add files in `functions/api/`
2. **New Pages**: Add HTML files in `public/`
3. **Database Changes**: Update `schema.sql` and run migrations

## API Endpoints

All API endpoints are under `/api/`:

- `GET /api/jobs` - List all jobs (query params: `category`, `status`)
- `POST /api/jobs` - Create a new job
- `GET /api/job/[id]` - Get single job
- `GET /api/services` - List all services (query params: `category`, `availability`)
- `POST /api/services` - Create a new service
- `GET /api/service/[id]` - Get single service
- `POST /api/inquiries` - Create an inquiry

## Categories

Available categories for both jobs and services:
- Web Development
- Mobile Development
- Design & Creative
- Writing & Content
- Marketing & SEO
- Business & Consulting
- Accounting & Finance
- Legal Services
- Construction & Trades
- Photography & Video
- Other

## Design Theme

- **Primary Color**: Navy Blue (`#1a2b4a`)
- **Accent Color**: Rich Yellow (`#ffc107`)
- **Background**: Dark Navy (`#0a1628`)
- **Font**: System fonts for optimal performance

## Performance

- ⚡ Served from Cloudflare's global CDN
- 🚀 Serverless functions with instant scaling
- 💾 SQLite database with sub-millisecond queries
- 📦 No build step required for deployment

## Costs

Using Cloudflare's free tier, you get:
- **Cloudflare Pages**: Unlimited static sites
- **Cloudflare Workers**: 100,000 requests/day
- **Cloudflare D1**: 5GB storage, 5M reads/day, 100K writes/day

This is more than enough for a local marketplace!

## Troubleshooting

### Database not found
Make sure you've created the D1 database and updated `wrangler.toml` with the correct database ID.

### API endpoints returning 500
Check that your database is properly initialized with `schema.sql`.

### Local development not working
Ensure you're using the latest version of Wrangler: `npm install -g wrangler@latest`

## Future Enhancements

Some ideas for extending the platform:
- User authentication and profiles
- Image uploads for portfolios
- Rating and review system
- Email notifications
- Advanced search with Cloudflare's search API
- Analytics dashboard

## Support

For Cloudflare-specific questions:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

## License

MIT License - feel free to use this for your own marketplace!

---

Built with ❤️ for Bermuda's freelance community
