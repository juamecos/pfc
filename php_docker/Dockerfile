# Start with the official PHP 8.2-FPM image
FROM php:8.2-fpm

# Update package list and install dependencies
RUN apt-get update && apt-get install -y \
    zip \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    libxml2-dev \
    git \
    unzip

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql gd zip intl xml

# Clean up the apt cache to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

    # Copy .env.production to .env
COPY .env.production /var/www/html/.env