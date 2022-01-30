## music-app

## API
- **m-api** contains the API code
- It's also hosted on heroku: https://hpm-api.herokuapp.com/v1/v1/album?artist=lady%20gaga

## UI
**music-ui-app** contains the frontend app.

## running the code

### using heroku hosted api
- `cd music-ui-app` & `npm start`

### using locally hostted m-api
- At first go to `m-api` folder & start the api by running `npm start`
- Edit  `/music-ui/config/index.js` API_URL property to `API_URL: 'https://localhost:8080/v1',`
- go to music-ui folder `cd path_to_music-ui` & `npm start`
