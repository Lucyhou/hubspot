const express = require('express');
const axios = require('axios');
//We'll start at the top of the file and require express and axios.
// Then we'll create an express app.
const app = express();



///---step 3---   code:  npm install pug          nodemon

//we'll use app.set and have our view engine set to pug. 
//This template is a simple card layout. In pug, we're able to parse through data we receive from the API call and
//output it onto the page
app.set("view engine", "pug");


//we'll loop over our data array just like a basic “for Each loop” in JavaScript, so we can create a
 //single card for //each contact. Inside of each card, we'll call the first and last name properties
 // of the contact, as well as the email.
//we'll create a public folder, a css folder, and a style.css file inside of the css folder. 
//The style.css file is called inside of our contacts.pug file through a link in the head section. 
//Lastly, we have to link our public directory to our index file through app.use. 
//Express makes it easy for us to call all of our files within our public folder. 
//Now, let's return to the browser and refresh the page. Our /contacts route should be showing a 
//basic layout with a few cards that contain each contact's name and email address.
app.use(express.static(__dirname + '/public'));

// we’ve added code that uses some built-in
//express methods that will help with posting our form data.
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());







///----step2
const private_app_token ='pat-na1-9b225eea-4af7-4d41-b09a-18a9d51a7295'
//create a constant at the top of this app and store the private app access token there
//. Access tokens, like API keys, give you permission to access sensitive data
//going to make a call to the contacts object endpoint from the CRM API, and print the data
// Let's create a route for /contacts. Inside this route, we'll create a constant to store the endpoint
//URL. The access token is sent via a headers object, so we'll create a constant named “headers.”
// This object includes 'Authorization' and 'Content-Type'. For 'Authorization', we'll write our value in back-ticks.
//Back-ticks allow you to use template literals and call variables within strings. 
app.get('/contacts', async (req, res) => {

  const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
  const headers = {
      Authorization: `Bearer ${private_app_token}`,
      'Content-Type': 'application/json'
  }
//This endpoint uses the HTTP GET method. In axios.get, we'll send along both the API URL
//constant and the headers constant. Since headers is an object, we'll wrap it in curly brackets.
// Promises



try {
    const resp = await axios.get(contacts, { headers });
    const data = resp.data.results; //---step 3
//The data that we received from the API call is in an object called ‘results’, so we'll use dot
//notation to change our data constant to response.data.results. This will change our data from 
//an object to an array,and make it easier to work with in our pug file.
     //resp.data.results;
    //res.json(data);      
    //---step 3

    res.render('contacts', { title: 'Contacts | HubSpot APIs', data });
    //use this to replace the above code     
} catch (error) {
    console.error(error);
}

});
///---step2   contact.pug test in : http://localhost:3000/contats

//we'll listen for this app on port 3000. We'll also
//using console log a useful link to the localhost URL. 
//now let's open up a terminal and install our dependencies
//using npm instal
app.listen(3000, () => console.log('Listening on http://localhost:3000'));