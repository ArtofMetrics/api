# Art of Metrics

### Setup

1) Go to the folder in which you want all AOM projects to live and `git clone git@github.com:ArtofMetrics/api.git`

2) `npm install -g yarn`

3) `yarn install`

4) in one terminal window, `npm run serve`

5) once the first terminal window says `bundle is VALID` (should take a bout 5-10 seconds the first time), in a different terminal window, type `npm run watch-server`

6) Wait for step 5 to complete (it will say listening on port 3000), then open up your browser and go
   to `localhost:8080` (NOT `localhost:3000`, the development environment "proxies" requests to the server through a different port)
