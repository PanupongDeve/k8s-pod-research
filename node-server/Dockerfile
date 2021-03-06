# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

USER root
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y bash htop curl dnsutils
RUN apt-get autoremove -y


# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .


# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "npm", "run", "start"]