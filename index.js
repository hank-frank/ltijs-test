const Lti = require('ltijs').Provider
const path = require('path')


require('dotenv').config();

// Creating a provider instance
const lti = new Lti(process.env.LTI_KEY,
    // Setting up database configurations
    { 
        url: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE,
        connection: { user: process.env.DB_USER, pass: process.env.DB_PASS } 
    }
);

async function setup () {
    // Deploying provider, connecting to the database and starting express server.
    
    await lti.deploy()
    
    // Register Moodle as a platform
    const plat = await lti.registerPlatform({
        url: process.env.BASE_URL,
        name: 'Local Moodle',
        clientId: process.env.CLIENT_ID,
        authenticationEndpoint: process.env.AUTH_END,
        accesstokenEndpoint: process.env.TOKEN_END,
        authConfig: { 
        method: 'JWK_SET', 
        key: process.env.KEY }
    })
    // Get the public key generated for that platform
    console.log(await plat.platformPublicKey());

    lti.onConnect((connection, request, response) => {

        lti.redirect(response, '/main', { ignoreRoot: true, isNewResource: true })
    }, { secure: true }, {sameSite: 'None'});
    console.log('Deployed!')
    }

        // Main route
lti.app.get('/main', async (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Grading route
lti.app.post('/grade', async (req, res) => {
    console.log('in route: ', res.locals.token.userInfo.given_name);
    try {
        const grade = {
            scoreGiven: 70,
            activityProgress: 'Completed',
            gradingProgress: 'FullyGraded'
        }
        // Sends a grade to a platform's grade line
        lti.Grade.ScorePublish(res.locals.token, grade)
            return res.send('Grade Succesfully Created')
    } catch (err) {
        return res.status(500).send(err.message)
    }
})


setup();
