# docker stop sns-manager && docker rm sns-manager

# Build and run backend docker container
# docker build . --tag sns-manager
# docker run -d --restart unless-stopped -p 8080:5000 --name sns-manager sns-manager

# # Build frontend
# cd ./sns-manager && npm run build

# Copy frontend to local apache server
sudo cp -r ./sns-manager/dist/ /srv/http/social-media-manager
