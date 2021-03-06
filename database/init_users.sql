use @DB_NAME@;

CREATE USER '@DB_USER@'@'@DB_SERVER@' IDENTIFIED BY  '@DB_PASSWORD@';

GRANT SELECT ON @DB_NAME@. * 
TO  '@DB_USER@'@'@DB_SERVER@'
IDENTIFIED BY  '@DB_PASSWORD@'
WITH MAX_QUERIES_PER_HOUR 0 
MAX_CONNECTIONS_PER_HOUR 0 
MAX_UPDATES_PER_HOUR 0 
MAX_USER_CONNECTIONS 0 ;

CREATE USER '@DB_ADMIN_USER@'@'@DB_SERVER@' IDENTIFIED BY  '@DB_ADMIN_PASSWORD@';

GRANT SELECT, INSERT, UPDATE, DELETE ON @DB_NAME@. * 
TO  '@DB_ADMIN_USER@'@'@DB_SERVER@'
IDENTIFIED BY  '@DB_ADMIN_PASSWORD@'
WITH MAX_QUERIES_PER_HOUR 0 
MAX_CONNECTIONS_PER_HOUR 0 
MAX_UPDATES_PER_HOUR 0 
MAX_USER_CONNECTIONS 0 ;
