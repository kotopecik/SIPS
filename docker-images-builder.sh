#!/bin/bash

# shellcheck disable=SC2164


IS_PUSH=$1


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

if [[ $IS_PUSH == "push" ]]; then
  docker push simplen1/auth-vrsdop
  docker push simplen1/composite-data-vrsdop
  docker push simplen1/info-composite-data-vrsdop
  docker push simplen1/celery-vrsdop
  docker push simplen1/frontend-vrsdop

  # later
#  docker push simplen1/loader-vrsdop
#  docker push simplen1/data-processing-vrsdop
#  docker push simplen1/tile-vrsdop
fi