# Simple Site Tech Stack
## AI-Optimized Architecture for MicroVM Deployment

---

## Overview
Lightweight, single-binary architecture designed for easy AI development and microVM deployment.

---

## Core Stack

### Frontend & Backend
- **Go (Golang)** - Single binary application
  - Built-in HTTP server
  - HTML templating (html/template)
  - Static file serving
  - Embedded assets (embed package)

### Database
- **SQLite** - Embedded, zero-config database
  - Single file storage
  - No separate server needed
  - Perfect for microVM constraints
  - Driver: `github.com/mattn/go-sqlite3`

### Admin Interface
- **Go HTML templates** with HTMX
  - Server-side rendered
  - Minimal JavaScript
  - CRUD operations
  - Basic authentication

### Hosting
- **MicroVM** (Fly.io, Firecracker, or similar)
  - Single Go binary deployment
  - ~10-20MB Docker image (Alpine-based)
  - Minimal resource footprint

---

## Project Structure

```
mysite/
├── main.go                 # Application entry point
├── go.mod                  # Go dependencies
├── database/
│   ├── db.go              # Database initialization
│   ├── queries.go         # SQL queries
│   └── migrations.go      # Schema setup
├── handlers/
│   ├── public.go          # Public-facing handlers
│   └── admin.go           # Admin panel handlers
├── middleware/
│   └── auth.go            # Admin authentication
├── templates/
│   ├── base.html          # Base layout
│   ├── index.html         # Homepage
│   ├── admin/
│   │   ├── login.html     # Admin login
│   │   ├── dashboard.html # Admin dashboard
│   │   └── edit.html      # CRUD interface
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── htmx.min.js    # HTMX library
├── data/
│   └── site.db            # SQLite database file
├── Dockerfile             # Container config
└── fly.toml               # Fly.io config (or equivalent)
```

---

## Key Dependencies

```go
// go.mod essentials
require (
    github.com/mattn/go-sqlite3 v1.14.18
    golang.org/x/crypto v0.17.0  // For password hashing
)
```

---

## Database Schema Example

```sql
-- Example tables
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES admin_users(id)
);
```

---

## Deployment Configuration

### Dockerfile
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=1 GOOS=linux go build -o server .

FROM alpine:latest
RUN apk --no-cache add ca-certificates sqlite
WORKDIR /root/
COPY --from=builder /app/server .
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/static ./static
EXPOSE 8080
CMD ["./server"]
```

### Environment Variables
```bash
PORT=8080
DATABASE_PATH=./data/site.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt-hash>
SESSION_SECRET=<random-secret>
```

---

## Admin Features

### Authentication
- Session-based auth with cookies
- Bcrypt password hashing
- CSRF protection

### CRUD Operations
- Create/Edit/Delete pages
- Manage content
- Simple file uploads (stored in SQLite as blobs or filesystem)

### Interface
- Clean, minimal HTML forms
- HTMX for dynamic updates without page reloads
- Responsive design (simple CSS)

---

## Why This Stack for AI Development?

1. **Single Language** - Go only, no frontend/backend split
2. **Minimal Dependencies** - Few external libraries to manage
3. **Self-Contained** - Everything in one binary + one database file
4. **Clear Structure** - Straightforward folder organization
5. **No Build Tools** - No npm, webpack, or complex toolchains
6. **Easy Testing** - Standard Go testing framework
7. **Simple Deployment** - Copy binary + database, done

---

## Development Workflow

1. **Initialize**: `go mod init mysite`
2. **Develop**: Run `go run main.go`
3. **Test**: `go test ./...`
4. **Build**: `go build -o server`
5. **Deploy**: Push to microVM platform

---

## Alternative Considerations

### If you need more features later:
- **Chi/Gorilla Mux** - More robust routing
- **Templ** - Type-safe Go templating
- **PostgreSQL** - If you outgrow SQLite
- **Caddy** - Automatic HTTPS (can run alongside Go app)

### MicroVM Platforms:
- **Fly.io** - Excellent for Go apps, free tier
- **Railway** - Simple deployment
- **Render** - Good free tier
- **DigitalOcean App Platform** - Straightforward
- **AWS Lightsail** - Traditional VPS option

---

## Getting Started Command

```bash
# Initialize new project
mkdir mysite && cd mysite
go mod init mysite
go get github.com/mattn/go-sqlite3
go get golang.org/x/crypto/bcrypt

# Create structure
mkdir -p {database,handlers,middleware,templates/admin,static/{css,js},data}

# Ready for AI to generate code!
```

---

## Security Checklist

- [ ] Use HTTPS in production (Let's Encrypt/Caddy)
- [ ] Hash all passwords with bcrypt
- [ ] Implement CSRF tokens for admin forms
- [ ] Use secure session cookies (HttpOnly, Secure, SameSite)
- [ ] Validate and sanitize all inputs
- [ ] Set proper file permissions on database
- [ ] Regular backups of SQLite database
- [ ] Rate limiting on login attempts

---

## Performance Notes

- SQLite handles 100k+ reads/sec easily
- Go binary uses ~5-10MB RAM at idle
- Suitable for thousands of concurrent users
- Can scale horizontally with read replicas if needed

---

## Summary

This stack gives you:
- ✅ Fast development with AI assistance
- ✅ Single binary deployment
- ✅ Minimal resource usage
- ✅ Easy to understand and modify
- ✅ Production-ready with proper config
- ✅ No complex build pipelines
- ✅ Self-contained and portable

Perfect for MVPs, internal tools, and simple public sites running on microVMs!
