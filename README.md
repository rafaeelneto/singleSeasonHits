# Single Season Hits

Single Season Hits is a responsive web application developer to solve a front-end assessment. This app gets data from API and exhibits a list of records of the singles season hits on baseball. When one item on the list is clicked, a side panel is shown with more detail about a specific record.
This application was built using Vue.js v3 and is tested using Selenium.

# Vue.js

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

# Testing with Selenium

First, you should configure Selenium with the initial instructions [in this article](https://medium.com/dailyjs/how-to-setup-selenium-on-node-environment-ee33023da72d). You also should set up and run the Standalone Selenium Server and browser driver your specific choice ([here you can obtain specific instructions about it](https://www.selenium.dev/selenium/docs/api/javascript/index.html)).

After the initial setup, you can go to the folder /tests/selenium and alter the runTest.js options object to your specific configuration.

Then run the command:

```
node runTest.js
```
