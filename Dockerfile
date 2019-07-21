# Inspired by
# https://github.com/ljnelson/docker-calibre-alpine/blob/master/Dockerfile

# We can not use an Alpine image because of Calibre which seems
# to really need a libC and has a ton of dependencies
FROM node:12

# We are in a production context
ENV NODE_ENV production

# Install Calibre
RUN apt update && \
    apt -y install \
    calibre

# Change directory
WORKDIR /app

# Get our project files
# See .dockerignore file
COPY . .

# Install our dependencies
RUN npm i

# Create the directory that holds the uploaded EPUBs
# and the converted PDFs
RUN mkdir -p /files

# Run the application
CMD ["npm", "start"]
