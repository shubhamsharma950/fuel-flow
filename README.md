# Fuel Flow - B2B Fuel Management Platform

A comprehensive B2B fuel management web platform for transporters, fleet managers, and fuel pump partners.

## Features

### Admin Dashboard
- 👥 User Management (Transporters, Drivers, Admins)
- 🚛 Vehicle Fleet Overview
- ⛽ Pump Partner Management
- 📦 Order Management
- 💳 Payment Tracking
- 📊 Analytics & Reports

### Transporter Dashboard
- 🚗 Vehicle Management
- 👨‍✈️ Driver Management
- 📝 Fuel Order Creation
- 📜 Order History
- 💰 Payment Management
- 📱 OTP-based Fuel Delivery Verification

### Driver Features
- 📱 OTP Verification for Fuel Pickup
- 📋 Assigned Orders View
- 🚚 Vehicle Assignment Status

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Wouter** for routing
- **React Query** for data fetching
- **React Hook Form** for form management
- **Zod** for validation

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Passport.js** for authentication
- **bcryptjs** for password hashing
- **Express Session** for session management

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/shubhamsharma950/fuel-flow.git
cd fuel-flow
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fuelflow
SESSION_SECRET=your-super-secret-key-change-this
NODE_ENV=development
PORT=5000
```

4. **Set up the database**

Create a PostgreSQL database:
```bash
createdb fuelflow
```

Push the schema to the database:
```bash
npm run db:push
```

5. **Seed the database with sample data**
```bash
npm run db:seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```

This will start the development server on `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

## Default Login Credentials

After seeding the database, you can use these credentials:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | password123 |
| Transporter | transporter1 | password123 |
| Transporter | transporter2 | password123 |
| Driver | driver1 | password123 |
| Driver | driver2 | password123 |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Vehicles
- `GET /api/vehicles` - Get vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Drivers
- `GET /api/drivers` - Get drivers
- `GET /api/drivers/:id` - Get driver by ID
- `POST /api/drivers` - Create driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Pump Partners
- `GET /api/pumps` - Get all pump partners
- `GET /api/pumps/:id` - Get pump partner by ID
- `POST /api/pumps` - Create pump partner (Admin only)
- `PUT /api/pumps/:id` - Update pump partner (Admin only)
- `DELETE /api/pumps/:id` - Delete pump partner (Admin only)

### Fuel Orders
- `GET /api/orders` - Get orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `POST /api/orders/:id/verify-otp` - Verify OTP
- `DELETE /api/orders/:id` - Delete order

### Payments
- `GET /api/payments` - Get all payments (Admin only)
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/orders/:orderId/payments` - Get payments for order
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment

### Dashboard Stats
- `GET /api/stats/dashboard` - Get dashboard statistics

## Database Schema

### Users
- Admin, Transporter, and Driver roles
- Authentication and authorization
- Company and contact information

### Vehicles
- Registration details
- Fuel type and capacity
- Status tracking (active, maintenance, inactive)

### Drivers
- License information
- Vehicle assignment
- Availability status

### Pump Partners
- Location and contact details
- Supported fuel types
- Pricing information

### Fuel Orders
- Order tracking with unique order numbers
- OTP-based verification
- Status workflow (pending → confirmed → in_progress → completed/cancelled)

### Payments
- Transaction tracking
- Multiple payment methods
- Payment status management

## Project Structure

```
fuel-flow/
├── client/              # Frontend React application
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── hooks/       # Custom React hooks
│       └── lib/         # Utilities and helpers
├── server/              # Backend Express application
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── auth.ts         # Authentication setup
│   ├── db.ts           # Database connection
│   └── storage.ts      # Database operations
├── shared/              # Shared code between client and server
│   └── schema.ts       # Database schema and types
├── script/              # Build and utility scripts
│   ├── build.ts        # Production build script
│   └── seed.ts         # Database seeding script
└── migrations/          # Database migrations
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` configuration is already set up for deployment.

### Environment Variables for Production

Make sure to set these in your production environment:

```env
DATABASE_URL=your-production-database-url
SESSION_SECRET=a-strong-random-secret
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Real-time notifications
- [ ] SMS/Email integration for OTP
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Invoice generation
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] GPS tracking for vehicles
- [ ] Fuel consumption analytics

---

Built with ❤️ using React, Node.js, and PostgreSQL
