FROM navikt/node-express:12.2.0

WORKDIR /var/app
ADD . /var/app/

CMD ["npm", "start"]