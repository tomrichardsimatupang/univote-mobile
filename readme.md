<div align="center">
  <img src="https://github.com/tomrichardsimatupang/univote-mobile/blob/master/resources/univote-simple-logo.png?raw=true" alt="Univote Logo">
</div>

# Univote (University E-Voting Mobile)

## Overview
Univote is a mobile-responsive electronic voting system designed specifically for university elections. Built with Ionic Angular, this application provides a secure, efficient, and user-friendly platform for conducting various types of university elections, from student body representatives to academic senate members.

Univote adalah sistem pemungutan suara elektronik berbasis web mobile yang dirancang khusus untuk pemilihan di lingkungan universitas. Dibangun dengan Ionic Angular, aplikasi ini menyediakan platform yang aman, efisien, dan mudah digunakan untuk melaksanakan berbagai jenis pemilihan di universitas, mulai dari perwakilan mahasiswa hingga anggota senat akademik.

## Features
- Secure authentication system for university members
- Real-time vote counting and result visualization
- Mobile-responsive design for seamless voting experience
- Support for multiple concurrent elections
- Role-based access control (Admin, Election Committee, Voters)
- Detailed election analytics and reporting
- Voter verification system
- Audit trail for transparency

## Prerequisites
- Node.js (version 14.x or higher)
- Angular CLI (version 15.x or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/univote.git
cd univote
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
ng serve
```

The application will be available at `http://localhost:4200/`

## Project Structure
```
univote-mobile-new/
├── .angular/
├── .vscode/
├── node_modules/
├── resources/
├── src/
│   ├── app/
│   │   ├── @component/
│   │   ├── @core/
│   │   ├── @guards/
│   │   ├── @interceptors/
│   │   ├── @services/
│   │   ├── auth/
│   │   ├── tabs/
│   │   ├── vote/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── theme/
│   ├── global.scss
│   ├── index.html
│   ├── main.ts
│   └── manifest.webmanifest
```

## Configuration
1. Update the `environment.ts` file with your backend API endpoints
2. Configure authentication settings in the `auth` module
3. Adjust voting parameters in the `vote` module

## Core Modules
- `@component` - Shared components used across the application
- `@core` - Core functionality and services
- `@guards` - Route guards for authentication and authorization
- `@interceptors` - HTTP interceptors for request/response handling
- `@services` - Shared services
- `auth` - Authentication module
- `tabs` - Tab-based navigation
- `vote` - Main voting functionality

## Available Scripts
- `npm run start` - Run development server
- `npm run build` - Build the project for production

## Deployment

1. Setup environment variables:
   - Copy `.env.example` to `.env`
   - Configure the following variables in your `.env` file:
   ```
   FTP_HOST="ftp.example.com"
   FTP_PORT=21
   FTP_USER="user@example.com"
   FTP_PASS="yourpassword"
   ```

2. Build the project:
```bash
npm run build
```

## Security Features
- Session Management
  - Secure JWT (JSON Web Token) implementation
  - Automatic session timeout
  - Token refresh mechanism
  - Session invalidation on logout
  
- QR Validation
  - Unique QR code generation per voter
  - One-time use QR codes
  - Time-based validity
  - Encrypted QR data

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support
For support, email support@univote.or.id or create an issue in the GitHub repository.

## Authors
- Your Name - *Initial work* - [YourGithub](https://github.com/yourusername)

## Version History
- 1.0.0
    - Initial Release
    - Basic voting functionality
- 1.1.0
    - Added real-time results
    - Enhanced security features
