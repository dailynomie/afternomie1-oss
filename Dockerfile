#Dockerfile

# Use this image as the platform to build the app
FROM node:18-alpine AS external-website

# A small line inside the image to show who made it
LABEL Developers="Ronald de Lange"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY . .

# Make db writable
RUN set -ex && apk --no-cache add sudo
RUN sudo chmod 777 /app/data/an_v2-1.sqli
RUN sudo chmod 777 /app/data

# Clean install all node modules
RUN npm ci

# Build SvelteKit app
RUN npm run build


# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","build/index.js"]