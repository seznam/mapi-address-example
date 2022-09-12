#!/bin/bash
set -e

/usr/bin/goenvtemplator2 \
    -template "/www/nginx/conf/nginx.conf.tmpl:/www/nginx/conf/nginx.conf" \
    -template "/www/mapi-address-example/html/index.tmpl:/www/mapi-address-example/html/index.html"
gzip -k /www/mapi-address-example/html/index.html
brotli --output=/www/mapi-address-example/html/index.html.br /www/mapi-address-example/html/index.html
exec /www/nginx/sbin/nginx -c /www/nginx/conf/nginx.conf
