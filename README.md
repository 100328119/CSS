#RESTFUL API:
All API links are provided in routes folder:
please not the link within
secure file the structure will be : localhost:4000/secure/name_provided_in_file
api file the structure will be :localhost:4000/api/name_provided_in_file

For all POST/PUT request links are restricted to accept specific data structure. The detail input schema please see  helper/routeHelper.js

some examples:
1.  Post localhost:4000/secure/register  
2.  Post localhost:4000/secure/signin   
3.  Get/Post localhost:4000/api/admin
4.  Put/DELET localhost:4000/api/admin/:admin_id
5.  get/post localhost:4000/api/campus
6.  put/delete localhost:4000/api/campus/:campus_id
7.  get/post localhost:4000/api/building
8.  put/delete localhost:4000/api/building/:building_id
9.  get localhost:4000/api/building/campus/:campus_id
10. get/post localhost:4000/api/room/
11. put/delete localhost:4000/api/room/:building_id

Before you run the project on local, you first need to :
1. have node, mongodb, yarn installed on local
2. populate your mongodb with following step (you could mongodb community or cmd )
  1.  create a database call "CSS"
  2.  create collections according the files in "sample data" folder
  3.  import the json file accordingly
3. once your mongodb is created, you could start next phrase


### Before starting the project, you need to install all dependencies:
1. From the project's home directory, run command:
`npm install` for the first time running the backend
`node server` or `nodemon server` to execute the backend

2. Then, go to the Create-React-App directory, `cd client_react`, and run command:
`yarn` for the first time running the frontend
`yarn start` to execute frontend

3. If you finish the development and want to host the project on your website,
you should create an optimized production build for the react app.
So, in directory `/client`, run command:
`yarn build`

---

### For development, you need to run both Express server on `http://localhost:4000` and React App on `http://localhost:3000`.
1. Run the following command in both the root project folder (/) and the React App folder (/client):
`node server` or `yarn start`

2. The project will automatically open in your default browser. **Google Chrome is recommended.** The website will open on port 3000 of localhost.

3. Whenever you make changes on the Express server, you need to restart the Express server.

4. For React App, you can make changes and they will automatically reflect in the browser.

### When you finish your project and want to go live on your own website hosting service, build the React App first then run the following command in the root project folder:
`npm start` or `yarn start`

If you are testing the project on Localhost, the project will start on port 4000. So, in your browser, open:
```
http://localhost:4000
```
