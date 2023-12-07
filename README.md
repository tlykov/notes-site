# Notes Site
Site for adding, deleting, storing notes. Made using Angular, Node, Docker. This is a reupload of my project for Web Development II at SFU.

## Running the project

The project uses [Docker](https://docs.docker.com/) for deployment. The site can be launched by running `docker compose up` from `prod` directory, deploying the site within a docker container. Alternatively, the site can be run by using the image `tlykov/a3-docker-server` from [Docker Hub](https://hub.docker.com/).

## Developer Server

The `dev-angular` directory contains the front end Angular source code, which can be test run using Angular's CLI. Run `ng serve` within the directory to run the front end locally.

## Build

The site is ready for deployment, however building the project is done by running `ng build` within `dev-angular` directory. This compiles the front end into `prod/dist`, which is then ready to be run as part of the Docker container.