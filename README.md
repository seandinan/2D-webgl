# rex
Skeleton for Node/Express backend + React front-end + Babel/Webpack to bundle things up

## Setup
1. Fork this repo
  - ```git clone https://github.com/seancdinan/rex.git <new-repo-name>```
  - ```git remote set-url origin <your-new-remote-location>```
  - ```git push -u origin master```
2. ```npm run install``` to install dependencies
3. ```npm run dev``` to fire up [webpack](https://webpack.github.io/) (it'll continue to listen for changes).
4. ```npm run start``` to fire up the Express server on port 3000.

## Developing/Folder Structure
- Images and other static resources should go in ```/public/assets```
- Views should go in ```/public/html```. With react-router, just having ```index.html``` should be enough.
- Front-end code should go in ```/src```. It will compile to ```/public/js```. The ```pages``` folder should contain full pages (anything that gets routed to in ```entry.js```) while ```components``` should contain the parts that the pages are made up of.
