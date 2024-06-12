#!/bin/bash

# shellcheck disable=SC2164
cd backend/;

docker build -f AuthService/Dockerfile -t simplen1/auth-vrsdop AuthService;
docker build -f CompositeDataRESTAPIService/Dockerfile -t simplen1/composite-data-vrsdop CompositeDataRESTAPIService;
docker build -f InfoCompositeOutputDataRESTAPIService/Dockerfile -t simplen1/info-composite-data-vrsdop \
 InfoCompositeOutputDataRESTAPIService;
docker build -f CeleryService/Dockerfile -t simplen1/celery-vrsdop .;

# later
#docker build -f LoaderService/Dockerfile -t simplen1/loader-vrsdop LoaderService;
#docker build -f DataProcessingService/Dockerfile -t simplen1/data-processing-vrsdop DataProcessingService;
#docker build -f TileService/Dockerfile -t simplen1/tile-vrsdop TileService;

cd ..;

docker build -f frontend/Dockerfile -t simplen1/frontend-vrsdop frontend;

