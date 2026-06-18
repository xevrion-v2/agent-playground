# Environment Variables

## apps/web
| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_API_URL | API base URL | Yes |
| NEXT_PUBLIC_APP_URL | Frontend URL | Yes |

## apps/api
| Variable | Description | Required |
|----------|-------------|----------|
| PORT | API server port (default: 4000) | No |
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| STRIPE_SECRET_KEY | Stripe API secret | For payments |

## packages/db
| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
