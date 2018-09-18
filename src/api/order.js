export default {
    post: data => new Promise(
        resolve => setTimeout(() => {
            console.log(`POST ${JSON.stringify(data)}`); // eslint-disable-line
            resolve(`The order will arrive in ${
                Math.round(Math.random() * 30 + 10)
            } minutes`);
        }, 1000 + (Math.random() * 2000))
    )
};
