#FROM docker.dev.dszn.cz/mapycz/node14-stretch AS build
FROM docker.ops.iszn.cz/baseimage/debian-python3:buster as build

# pro spravny nodejs
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y \
    nodejs


ADD . /www/mapi-address-example
WORKDIR /www/mapi-address-example
RUN npm config set registry https://npm.dev.dszn.cz && \
	npm config set strict-ssl false && \
	npm install


RUN npm run build-prod && \
    mv /www/mapi-address-example/dist/index.html /www/mapi-address-example/dist/index.tmpl && \
    rm -f /www/mapi-address-example/dist/index.html.*

FROM docker.ops.iszn.cz/baseimage/debian:buster

RUN apt-get update \
    && apt-get install -y \
        szn-nginx-core \
        szn-nginx-mods-prometheus \
        szn-nginx-conf-ssl \
        goenvtemplator2 \
        gzip \
        coreutils \
        brotli \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src
COPY --from=build /www/mapi-address-example/dist /www/mapi-address-example/html

COPY conf/nginx.conf.tmpl /www/nginx/conf/nginx.conf.tmpl
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]


ARG VERSION
ARG BUILD_DATE
ARG BUILD_HOSTNAME
ARG BUILD_JOB_NAME
ARG BUILD_NUMBER
ARG BUILD_TYPE
ARG VCS_REF

LABEL org.label-schema.schema-version="1.0.0-rc.1" \
      org.label-schema.vendor="Seznam, a.s." \
      org.label-schema.build-date="$BUILD_DATE" \
      org.label-schema.build-type="$BUILD_TYPE" \
      org.label-schema.build-ci-job-name="$BUILD_JOB_NAME" \
      org.label-schema.build-ci-build-id="$BUILD_NUMBER" \
      org.label-schema.build-ci-host-name="$BUILD_HOSTNAME" \
      org.label-schema.version="$VERSION" \
      org.label-schema.vcs-url="https://gitlab.seznam.net/mapycz/mapi-address-example" \
      org.label-schema.vcs-ref="$VCS_REF" \
      org.label-schema.name="mapi-address-example" \
      org.label-schema.description="Examples for Mapy API NG." \
      org.label-schema.usage="Don't" \
      org.label-schema.url="https://gitlab.seznam.net/mapycz/mapi-address-example"
