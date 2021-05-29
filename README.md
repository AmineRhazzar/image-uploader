# Image Uploader
I build this project based on a [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) from https://devchallenges.io.

This project is currently live at https://img-upldng.netlify.app

## Technologies Used
I used **ReactJS** in the front-end, with my own styling, and some *lottie files* from https://lottiefiles.com. Playing with the animations has been great!

For the back-end, I used **NodeJS**, with the following packages : 
- **express** to handle the routing and the requests
- **cors** to handle cors obviously
- **multer** which is a middleware thats handles POST requests with *Content-Type: multipart/form-data* which is primarily used for uploading files.

___





# Set up for local development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run server`

Launches up the server at [http://localhost:5000](http://localhost:5000). 

This local server will take care of the coming requests and the uploaded files.

Moreover, you will have to reroute the requests to this local server.\
Go to `src/App.js` and change the line:\
`const backendPath = "https://img-upldng.herokuapp.com/";`\
to\
`const backendPath = "http://localhost:5000/";`\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


