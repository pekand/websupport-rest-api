### Installation steps
- Create configuration file:  **cp ./Config/appConfig.example.php  ./Config/appConfig.php**
- set apiKey and secret

```php
<?php
$config->set('websupport.apikey', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
$config->set('websupport.secret', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
```

- create table for users: **php command.php init/users**
- create user for administration: **php command.php user/create USERNAME PASSWORD**
- run buildin server: **php -S localhost:8080 index.php**

### Installation steps for apache (optional)
-make ./storage writable for server: **chown -r www-data. ./storage**

```apache
<VirtualHost *:80>

  ServerName websupport.com

  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/websupport.com/public

  ErrorLog ${APACHE_LOG_DIR}/websupport_error.log
  CustomLog ${APACHE_LOG_DIR}/websupport_access.log combined

  <Directory "/var/www/websupport.com/public">
      Options FollowSymLinks
      AllowOverride All
      DirectoryIndex index.php
      Order allow,deny
      Allow from all
  </Directory>
</VirtualHost>
```

### Build frontend (optional - after frontend update)
- cd ./Modules/main
- npm install
- node node_modules\gulp\bin\gulp.js
- node node_modules\gulp\bin\gulp.js watch

### Code structure
- **./Config** - main configuration files
- **./Core** - application core classies  (router, template engine,db connect, auth ...)
- **./Modules/Api** - api auth
- **./Modules/Main** - frontend
- **./Modules/Main/src/scripts** - frontend application
- **./Modules/Main/src/styles** - frontend
- **./Modules/WebSupport** - WebSupport rest api connector and api routes
