## Welcome to Expense Tracker Application

### Set up Instructions:
1. clone the repository
2. in the root directory: run the command `npm install --legacy-peer-deps`
3. then build the project with `npm run build`
4. run the server: `npm run start`
5. This will start the express server at `http://localhost:3000`. Please paste the URL in any browser.

### Development Environment:
1. Please follow the above steps as mentioned till `3`.
2. Run the application with `npm run development` which supports nodemon for continous changes in both frontend and backend.

### MongoDB:
1. This project is using the MongoDB cloud Atlas Database.
2. The URL for the MongoDB is present in `config/config.js:mongoUri`. If the application is not working with some errors, consider to change the MongoDB URL to different URL based on your enviornment.