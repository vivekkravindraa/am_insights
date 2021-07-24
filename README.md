[Cisco AM Insights](https://cisco-am-insights.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5b69e7f-1fd3-4f3b-8ddc-417fb806be35/deploy-status)](https://app.netlify.com/sites/cisco-am-insights/deploys)

# Deployment

```
# Locally build react production code from source
cd react
yarn install
yarn build
cd ..
```

```
# Locally build docker image
docker build -t am-insights-app .
docker tag am-insights-app gcr.io/dao-aa-poc-uyim/am-insights-app
```

```
# Locally test run docker container
docker run -it -p 8080:8080 gcr.io/dao-aa-poc-uyim/am-insights-app
# App viewable at http://localhost:8080/home
# ctrl-C to kill container
```

```
# Push and deploy image in GCP
docker push gcr.io/dao-aa-poc-uyim/am-insights-app
gcloud app deploy --image-url gcr.io/dao-aa-poc-uyim/am-insights-app
```

```
# Gcloud help
gcloud auth list
gcloud config list
gcloud projects list
gcloud auth revoke vivekkravindraa@gmail.com
gcloud config set account vivekrav@cisco.com
gcloud config set project dao-aa-poc-uyim
gcloud auth application-default login
gcloud auth configure-docker
```

```
# Set CRLF to LF
git config --global core.eol lf
git config --global core.autocrlf input
find . -type f -print0 | xargs -0 dos2unix
# The same can be done in VS Code editor
```

```
# Add to Dockerfile
RUN cat /entrypoint.sh | tr -d '\r' > /entrypoint.sh
```

```
# Change at entrypoint.sh
Change #!/bin/bash to #!/bin/sh
```
