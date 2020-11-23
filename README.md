Shufflix
=====

### Introduction
Shuffle Netflix TV show episodes. A web app that provides a random episode from any/all of the seasons of a TV show.

### Live Version
[Demo](http://www.shufflix.tech)

### Set-Up
1. Download all the files from this repo.
2. Visit [OMDB](https://www.omdbapi.com/apikey.aspx) and get an API key.
3. Create a file called `config.js` in `src/` folder in this project with the following code:
```javascript
export default {
    "API_KEY": "<Paste your API key from OMDB here>"
}   
```
4. Run `npm start` to start the server. 
5. Enjoy :)
