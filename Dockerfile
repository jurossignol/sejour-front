# Pull base image.
FROM digitallyseamless/nodejs-bower-grunt

# Install ruby & compass libs
RUN apt-get update && apt-get install -y ruby ruby-compass && \
            apt-get clean && \
            rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

# Install node dependencies
COPY package.json /app/package.json  
RUN npm install

# Install bower dependencies
COPY .bowerrc /app/.bowerrc  
COPY bower.json /app/bower.json  
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
COPY . /app

EXPOSE 3000 3001

CMD ["grunt", "serve:dist"]