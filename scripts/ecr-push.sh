#!/bin/bash

ACCOUNT_ID=806928763398
REGION=us-east-1
REPO=smart-task-manager

aws ecr get-login-password --region $REGION | \
docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

docker build -t $REPO .
docker tag $REPO:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:latest
