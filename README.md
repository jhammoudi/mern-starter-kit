# MERN Starter Kit

The MERN stack is a popular stack of technologies for building a modern single-page application. In this tutorial, you will learn the MERN stack by building a boilerplate web app.

The MERN stack consists of the following technologies:

- **MongoDB**: A document-based open source database.
- **Express**: A web application framework for Node.js.
- **React**: A JavaScript front-end library for building user interfaces.
- **Node.js**: JavaScript run-time environment that executes JavaScript code outside of a browser (such as a server).

## Initial set-up/install

You would need to install a few programs first.

- Node.js https://nodejs.org/en/download/
- Git - https://git-scm.com/downloads
- Any code editor (for eg. Visual Studio, Atom Editor, Notepad ++)

To verify that you have Node.js installed on your system, type the following commands in your command line terminal (Terminal for Mac/Linux, CMD for Windows). Note: Throughout this tutorial, type everything after the `$`, in a terminal window.

```console
$ node -v
```

```console
$ npm -v
```

To verify that you have Git installed, also type the following command in your terminal

```console
$ git --version
```

If there are any error with the above commands, then they have not been installed, and you would need to install them before continuing.

## MongoDB Atlas

We’ll be hosting our database in the cloud using MongoDB Atlas. Firstly, we need to create a MongoDB Atlas account, create a cluster, then we will code the app.

You can host your MongoDB database locally but I’ve found that it is easier to host the database using MongoDB Atlas. We will be using the free tier on MongoDB Atlas in this tutorial. The first step is to make an account at the MongoDB Atlas website found [here](https://www.mongodb.com/cloud/atlas)

After you get logged in, click the green 'New Project' button to create a new project and then the green 'Build a Cluster' button to build a new cluster.

The first step to configure the new cluster is to choose your Cloud Provider, the zone or region you want your data to be stored in.

Notice that some of the regions offer a Free Tier which is great for a sandbox environment.

After the cluster is created, you will have to configure your security. The two things we are required to setup from a security standpoint are IP Whitelist addresses and a database user. For the IP Whitelist, just add your current IP address, or you could add 0.0.0.0/0 to Whitelist everything.

Once those steps have been completed, we can move on and get our connection information.

There are a few different ways that we provide information to connect to MongoDB Atlas.

1. Through the MongoDB Shell, which is a command line interface.
2. With an application connection string, which is what we’ll use.
3. Through MongoDB Compass which is a GUI tool for interacting with data stored in MongoDB.

Click the “Connect Your Application” button. You will see information on getting a connection string and then some connection examples for different languages.

Save the connection string and password, as we will need it later in the tutorial!

## Node.js

### Initialising Node.js project

To create a Node.js project, you would need to first create an empty directory. Run the following commands in your terminal, to make a new directory, and change into that folder. This will create a new project folder called `mern-sample-app`

```console
$ mkdir mern-sample-app
$ cd mern-sample-app
```

Now that you are within the `mern-sample-app` directory, you would need to create a new file called `server.js`. You could do this either through the terminal, or you can create this file within your code editor.

Start your code editor, and open the `mern-sample-app` project, and create a new file called `server.js`.

Next, we need to create a _package.json_ file inside the `mern-sample-app` directory. This is done by running the following command in the terminal. This will bring up a series of prompts, where you can give a name and description to your app, as well as specify the entry point for your Node.js app. As the entry point, type `server.js`, instead of _index.js_.

```console
$ npm init
```

Now, we can install a few dependencies, using the following command in your terminal.

```console
$ npm install express cors mongoose dotenv
```

This will install _Express_, which we have already mentioned, a fast and lightweight web framework for Node.js

Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts. The cors package provides an Express middleware that can that can enable CORS with different options.

Mongoose is being used as it makes interacting with MongoDB through Node.js simpler.

_dotenv_ loads environment variables from a `.env` file into `process.env`. This makes development simpler. Instead of setting environment variables on our development machine, they can be stored in a file. We’ll create the `.env` file later.

## Express.js

### Creating a backend server using Express.js

In the `server.js` file, we’ll create an Express server, attach the cors and express.json middleware (since we will be sending and receiving json), and make the server listen on port 5001.

Add the following code to `server.js` to create a basic Node.js / Express server:

```js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

app.use(express.static(`${__dirname}/client/build`));

app.get("/health", (req, res) => {
  res.send({
    health: "UP"
  });
});

app.get("/*", function(req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`, function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// log your server is running and the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Click here to open: http://localhost:${port}`);
});
```

After saving, we can start the server by running the following command in the terminal.

```console
$ npm start
```

You should be able to see that the server is running in the terminal. If it started correctly, the following message will appear in the terminal, `Server is running on port 5001`. Try visiting http://localhost:5001/health. You should see a message that _Health_ is up.

### Connect MongoDB database to your Express server

It’s finally time to connect to our database in MongoDB Atlas. At the top of _server.js_, you will notice that we have already added `const mongoose = require(‘mongoose’);`, which is needed to connect to your MongoDB database.

Now, after the line `app.use(express.json());`, add the following lines of code:

```js
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
```

After saving the file, we would need to add the correct `ATLAS_URI` environment variable, for the connection to work.

In the `mern-sample-app` directory, create a file named `.env`. In this file, you would need to add the connection string from MongoDB which was mentioned earlier, when setting up the MongoDB Atlas cluster. Here, type “ATLAS_URI=” and then paste the MongoDB connection string which you copied.

In your `.env` file, it should similar to the following:

`ATLAS_URI=mongodb+srv://<user>:<password>@cluster0-91icu.gcp.mongodb.net/test?retryWrites=true`

Replace `<user>` with your username that you created, and replace `<password>` with the password that you set up for your user.

After saving, we can start restart the server, to apply these changes. In the terminal, this can be done by stopping the server first, using the following command _CTRL + C_. We can start the server again by running the following command in the terminal.

```console
$ npm start
```

You should now see the line _“MongoDB database connection established successfully”_

## React JS

### Adding the React directory to the project.

The backend is now complete, and it is time to start the fontend. We will be using ReactJS for the frontend, which will be used to create static UI files, to be displayed by the Express server.

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

In your `mern-sample-app` directory, run the following command in your terminal. This will add React JS to your project, within a directory called `client`.

```console
$ npx create-react-app client
```

### Removing Git from the React directory

This will take a few moments to complete the installation. Once it is done, this will automatically create a `.git` folder in the `client` React directory. The `.git` folder is used when pushing code to a Git repository, but since we are not pushing just the `client` directory to Git, we would need to remove the `.git` folder. To remove this, we would need to first change into the `client` directory using the following command in terminal.

```console
$ cd client
```

On Mac/Linux, you could remove the `.git` folder using the following command.

```console
$ rm -rf .git
```

On Windows, you could remove the `.git` folder using the following command

```console
$ rmdir /s /q .git
```

### Testing the React app

To start the React app on a development server, you could run the following command:

```console
$ npm start
```

Running this command within the `client` directory will start the UI server. This has no connection to the backend server, so you would not be able to connect to MongoDB. Running this command within the `client` directory is useful for designing and developing the UI only. For testing the both the backend and front end simultaneously, you would need to run the _build_ command, which will create static UI files, which the server will serve. Running the following command will _build_ and create those static files.

```console
$ npm run build
```

This will create a folder called `Build` which includes all necessary UI files.

## Testing Frontend and Backend

To test your complete MERN app, you would need to navigate and change into your `mern-sample-app` directory. Assuming that you are currently in the `client` directory, you would need to run the following command. This will move yourself _up_ one level in the directory path, within the `mern-sample-app` directory

```console
$ cd ..
```

Now, you would be able to start your MERN app using the following command.

```console
$ npm start
```

Again, you will see the _"Server is running on port 5001"_, and _“MongoDB database connection established successfully”_ messages. This indicates that your backend is running.

To test that your frontend is running, you would need to visit _"http://localhost:5001"_. You should see the the sample React page which has a link to "Learn React".

## Conclusion

Wow! You have now created your own MERN Web app from scratch! To recap, you have created a MongoDB database. You have also created a new Node.js app using Express.js as your middleware. Also, you have added React to your application.

Next, you would need to make some changes to multiple files to create a functioning web app. You would be able to use this codebase as a template for creating your own custom web apps.

Stay tuned for that tutorial! As well as instructions for deploying your custom application to IBM Cloud using a Delivery Pipeline

## Author

- Jihad Hammoudi

This tutorial was created using help from this [MERN tutorial](https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1)
