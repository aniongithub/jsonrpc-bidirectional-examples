FROM ubuntu

ARG DEBIAN_FRONTEND=noninteractive

# Install some basic packages
RUN apt-get update &&\
    apt-get install -y \
        software-properties-common \
        nano git git-lfs \
        build-essential cmake \
        curl httping

# Install npm and node.js
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest
