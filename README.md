Prerequisites
# XAMPP Installation
Install XAMPP to manage PHP, MariaDB, and other server settings:
- Download XAMPP from [Apache Friends](https://www.apachefriends.org/index.html).
- Follow the installer instructions specific to your operating system.

## Clone the repository


## Environment Setup
Copy the .env.example file to create a .env file which will be used to configure your environment settings:

## Dependency Installation
Install Composer and NPM dependencies:
cp .env.example .env

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

## Run the database migrations to set up your database schema:
php artisan migrate

## Seed the database with dummy data
php artisan db:seed

## Running the Application
After setting up your environment and dependencies, you can start the application using:

# Compile assets
npm run dev

# In a separate terminal, serve the application
php artisan serve

## Testing
To run the automated tests for the application, use:
php artisan test