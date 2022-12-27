# Remove old container to start a new one
docker stop sns-manager && docker rm sns-manager

# Build and run backend docker container
docker build . --tag sns-manager
docker run -d --restart unless-stopped -p 8080:5000 --name sns-manager sns-manager


# Build and copy frontend to local apache server
cd ./sns-manager
npm run build
sudo cp -r ./dist/* /srv/http/social-media-manager
