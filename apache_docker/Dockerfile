FROM httpd:2.4-alpine

# Update packages and install required packages
RUN apk update; \
    apk upgrade;

# Copy Apache virtual host file to proxy .php requests to PHP-FPM container
COPY apache-vhost.conf /usr/local/apache2/conf/apache-vhost.conf
RUN echo "Include /usr/local/apache2/conf/apache-vhost.conf" \
    >> /usr/local/apache2/conf/httpd.conf

# Enable Apache mod_rewrite
RUN sed -i 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/' /usr/local/apache2/conf/httpd.conf
