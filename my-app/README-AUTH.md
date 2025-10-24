# Authentication Screens

This project includes modern, responsive signin, signup, and dashboard screens built with Next.js and shadcn/ui components.

## Features

### Signin Page (`/signin`)
- Modern card-based design with gradient background
- Email and password fields with validation
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Social login options (GitHub, Google)
- Responsive design with dark mode support

### Signup Page (`/signup`)
- Additional fields: First name, Last name, email, password, confirm password
- Password confirmation validation
- Terms and conditions acceptance checkbox
- Social registration options
- Form validation and error handling
- Consistent styling with signin page

### Dashboard Page (`/dashboard`)
- Comprehensive dashboard with sidebar navigation
- Stats cards showing key metrics
- Recent activity feed
- Quick actions panel
- Recent projects overview with progress bars
- User profile dropdown
- Search functionality
- Responsive sidebar with mobile support

## Navigation

The main page (`/`) automatically redirects to the signin page. Users can navigate between:

- `/signin` - Sign in to existing account
- `/signup` - Create new account
- `/dashboard` - Main dashboard (accessible after authentication)
- `/` - Home page (redirects to signin)

## Usage

1. **Development**: Run `npm run dev` to start the development server
2. **Production**: Run `npm run build` and `npm start`
3. **Navigation**: Use the links in each page or navigate directly to the URLs

## Components Used

- **shadcn/ui**: Card, Button, Input, Label, Avatar, Badge, Sidebar, etc.
- **Lucide React**: Icons for UI elements
- **Next.js**: App router and navigation
- **Tailwind CSS**: Styling and responsive design

## Customization

The screens are built with modular components and can be easily customized:

- **Colors**: Update the gradient backgrounds and theme colors
- **Fields**: Add/remove form fields as needed
- **Layout**: Modify the card layouts and spacing
- **Authentication**: Integrate with your preferred auth service
- **Navigation**: Update sidebar items and routing

## Responsive Design

All screens are fully responsive and work well on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Dark Mode Support

All components include dark mode styling using Tailwind's dark mode classes.
