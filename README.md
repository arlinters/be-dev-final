# Final Project
Uses mongoDB, Express / NodeJS.



## Final Project Discussion / SuggestionsFinal Project Discussion / Suggestions
### Automated Tests
https://dazzling-snickerdoodle-777101.netlify.app/
### Example API
It will help to verify the output of your project matches that of the example project.
Deploying your Github Repo to Glitch.com
You will need to set up a free Glitch.com account. You can link it to your Github.
You can simply use this URL in your browser to deploy your Github repo to Glitch: 
https://glitch.com/edit/#!/import/github/YOUR_GITHUB_USERNAME/YOUR_GITHUB_REPO_NAME
That said, every time you use the link, you will create a new Glitch project - not update the same one.
Glitch does support environment variables and makes them easy to update. Just look for the .env file in the file tree when you edit your project on Glitch.
I recommend testing your API thoroughly in your local dev environment before deploying. 
I will also allow other hosts if you prefer to set up a deployment pipeline with Heroku or similar.
NOTE: If using Glitch to host your API, you should add the following property to your package.json file:
```json
"engines": {
    "node": "14.x"
  },
```
### The Example Code from the Tutorial Videos
All of the example code is available from the Node.js / Express / MongoDB tutorials. 
It is important to understand it, but also, you can use it! 
You will need to understand it to know what to modify for this project. 
### Creating a MongoDB collection
This is well-documented in the assigned videos for class. Nothing new here. 
### Middleware
You will need to verify the URL parameter :state for most endpoints. 
It is best to just write the code for this once and include the middleware where needed. 
Permit lowercase, uppercase, and mixed versions of the state abbreviations to be accepted for the :state parameter. 
To create an array that only contains the 50 state abbreviation codes from the state.json data, you may find the array map method useful. 
You may also discover the array find method is useful afterwards.
Respond appropriately to an invalid state abbreviation code (see example project)
If the state code is valid, attach the value to the request object before calling next() because you will need to refer to it in the controller functions, too.
Strategies for each GET method API endpoint
### The /states/ endpoint:
Start by just returning the data from the states.json file. This will help you pass some of the automated tests quickly. 
The remainder of the requirements for this endpoint actually make it one of the most difficult, so you may want to come back to it AFTER finishing the other GET endpoints. 
To determine the list of states you are going to respond with, it will either be 1) all 2) contiguous or 3) non-contiguous. 
Contiguous means the lower 48 and not HI and AK. Non-contiguous is the opposite.
This endpoint should acknowledge a query parameter named contig if it is sent. Otherwise, all states data will be sent in the response.
The array methods find, filter, and forEach may be useful as you build the controller function to handle this endpoint.
To deliver ALL of the required data, you will need to query your MongoDB model and attach the "funfacts" to the response for each state that has fun facts saved for it in the MongoDB collection.
### The /states/:state endpoint:
You will need to find the requested state in the states.json data and also attach the "funfacts" from MongoDB if they exist before sending the response.
### The /states/:state/funfact endpoint:
You are once again finding the specified state, but now you must respond with one random fun fact if it exists or the appropriate message (see example app) if no fun facts exist.
Do you know how to select a random element from an array? You will need to.
The capital, nickname, population, and admission endpoints:
These are all nearly identical and the easiest endpoints to complete. 
You are finding the specified state from the states.json data and creating a response with the state name and capital, nickname, population, or admission date. 
There is no interaction with the MongoDB model in these endpoints.
### The /states/:state/funfact POST request
The request body should have a "funfacts" property with a value that is an array containing one or more fun facts about the state. 
You will want to verify you have received this "funfacts" data. 
You should also verify this data is provided as an array.
You will need to find the requested state in your MongoDB collection. 
If the state already has some fun facts, you should add the new fun facts to them without deleting the pre-existing fun facts. 
If the state has no pre-existing fun facts, then create a new record in your MongoDB collection with the stateCode and funfacts array.
### The /states/:state/funfact PATCH request
We are not replacing the entire record. Therefore, we use PATCH instead of PUT.
The request body should have a "funfact" property with a value that is a fun fact about the state and there should also be an "index" property (starting at 1, not zero) that indicates the element of the funfacts array to be updated in the funfacts array stored in the MongoDB collection. 
After checking to see if the index value exists, you will want to subtract 1 from the value to match up with the zero index of the array in MongoDB. Why? Zero is equal to false. My suggestion may be easier or you may do it a different way.
Respond appropriately (see example project) if the index or funfact values are not received.
You will need to find the specified state in your MongoDB collection. 
If no fun facts are found or no fun fact is found at the specified element position, send an appropriate response (see example project). 
Otherwise, set the element at the specified position of the funfacts array to the new value. 
Save the record and respond with the result received from the model.
### The /states/:state/funfact DELETE request
This request body should have an "index" property. Handle it as described above in the PATCH request suggestions. 
Again, appropriate responses as noted in the PATCH request, too. 
You may find filtering an element from an existing array to be the best approach here. You do not want to simply delete an element and leave an undefined value in the array. 
Afterwards, save the record and respond with the result received from the model.