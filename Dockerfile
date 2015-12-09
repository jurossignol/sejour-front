FROM node

RUN apt-get update

WORKDIR /app

# Install Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install packages
COPY package.json /app/package.json  
RUN npm install

# Manually trigger bower.
COPY .bowerrc /app/.bowerrc  
COPY bower.json /app/bower.json  
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
COPY . /app

EXPOSE 9000

CMD ["grunt", "serve:dist"]
