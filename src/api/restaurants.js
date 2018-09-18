import request from 'superagent';

// restaurants.json was generated using https://www.mockaroo.com/
export default {
    // TODO change the restaurants.json to have better looking images
    get: () => request
        .get('/restaurants.json')
        .set('Accept', 'application/json')
        .then(res => new Promise(
            resolve => setTimeout(() => resolve(res.body), 1000 + (Math.random() * 2000))
        ))
};
