# Environment Variables Documentation



This document describes all environment variables required to run TaskFlow locally.



## Quick Start



1. Copy environment variable templates:
2. 
   ```bash
   
   cp apps/web/.env.example apps/web/.env.local
   
   cp apps/api/.env.example apps/api/.env
   
   ```
   


2. Fill in the required values in each `.env` file
3. 


3. Start the development servers
4. 


## Web Application (`apps/web`)



The web application uses Next.js and requires the following environment variables:



### Required Variables



| Variable | Description | Example |

|----------|-------------|---------|

| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `http://localhost:3001` |

| `NEXT_PUBLIC_OAUTH_CLIENT_ID` | OAuth client ID for authentication | `your_github_oauth_id` |



### Optional Variables



| Variable | Description | Default |

|----------|-------------|---------|

| `NEXT_PUBLIC_API_TIMEOUT` | API request timeout in milliseconds | `30000` |

| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics tracking | `true` |

| `NEXT_PUBLIC_ENABLE_NOTIFICATIONS` | Enable push notifications | `true` |

| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key for payments | - |

| `NODE_ENV` | Environment mode | `development` |



## API Application (`apps/api`)



The API uses Express.js and requires the following environment variables:



### Required Variables



| Variable | Description | Example |

|----------|-------------|---------|

| `PORT` | Server port | `3001` |

| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/taskflow_db` |

| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |

| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |



### Authentication Variables



| Variable | Description |

|----------|-------------|

| `GITHUB_OAUTH_ID` | GitHub OAuth application ID |

| `GITHUB_OAUTH_SECRET` | GitHub OAuth application secret |



### Email Configuration



| Variable | Description |

|----------|-------------|

| `SMTP_HOST` | SMTP server hostname |

| `SMTP_PORT` | SMTP server port |

| `SMTP_USER` | SMTP authentication username |

| `SMTP_PASSWORD` | SMTP authentication password |



### Payment Configuration (Stripe)



| Variable | Description |

|----------|-------------|

| `STRIPE_SECRET_KEY` | Stripe API secret key |

| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |



### File Storage (AWS S3)



| Variable | Description |

|----------|-------------|

| `AWS_ACCESS_KEY_ID` | AWS access key |

| `AWS_SECRET_ACCESS_KEY` | AWS secret key |

| `AWS_S3_BUCKET` | S3 bucket name for uploads |

| `AWS_REGION` | AWS region |



### External Services



| Variab






