# Form Studio

A form builder built with Laravel 13, React, TypeScript, and Inertia.

## Tech Stack

- Laravel 13
- React
- TypeScript
- Inertia.js
- Tailwind CSS
- SQLite

## Requirements

- PHP 8.2+
- Composer
- Node.js 20+

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <folder-name>
```

Install dependencies:

```bash
composer install
npm install
```

Create/Update the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Run the database migrations:

```bash
php artisan migrate
```

## Running the Application

Start the development environment:

```bash
composer run dev
```

Visit:

```text
http://localhost:8000
```

## Testing

Run the test suite:

```bash
composer run test
```

## Code Style

Check formatting:

```bash
./vendor/bin/pint --test
```

Fix formatting:

```bash
./vendor/bin/pint
```

## Production Build

```bash
npm run build
```