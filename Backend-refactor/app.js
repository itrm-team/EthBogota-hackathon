const express = require('express');
const cors = require('cors');
const port = process.env.BACK_PORT || 5000;
const { sequelize } = require('./models');
const { getDataFromWise, TRMScrapper, historicalTRM } = require('./controller/wise_controller');

async function connectToDatabase(){
    await sequelize.authenticate();
    console.log("database connected");
    let TRM = '';
    let hour = new Date().getHours();
    if (TRM == '' && hour < 16 && hour >= 0) {
        TRM = await TRMScrapper();
    } else if ( TRM == '' && hour >= 16 ) {
        TRM = await historicalTRM();
    }
    await getDataFromWise(TRM);
    setInterval(async () => { 
        var hour = new Date().getHours();
        if (hour >= 0 && hour < 16) {
             TRM = await TRMScrapper();
        }
    } , 90000);
    setInterval(async () => {
        await getDataFromWise(TRM);
    }, 90000);
}

const app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.json({ limit: '5gb', extended: true }))
app.use(express.urlencoded({ limit: '5gb', extended: true }))

var whitelist = [
    'https://uat.sekuritance.io/verification/v1/kyc',
    'https://uat.sekuritance.io/',
    'uat.sekuritance.io',
    'https://api.sekuritance.com/verification/v1/kyc',
    'https://api.sekuritance.com/',
    'api.sekuritance.com',
    'services.itrmachines.com',
    'https://services.itrmachines.com',
    'https://services.itrmachines.com/viio',
    'https://services.itrmachines.com/tviio',
    'https://services.itrmachines.com/viiomodule',
    'https://services.itrmachines.com/tviiomodule',
    'http://localhost:8100',
    'http://localhost:8101',
    'http://localhost:5000',
    'http://localhost:3000',
];

function isOriginAllowed(origin) {
    console.log(
        "Origin Allowed: ",
        origin,
        whitelist.indexOf(origin) !== -1
    );
    return whitelist.indexOf(origin) !== -1;
}

var corsOptions = function (req, cb) {
    var origin = req.header("Origin") || req.headers.origin;
    const originFromHost = req.protocol + "://" + req.hostname;
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("> Origin: ", origin);
    console.log("> Full url", fullUrl);


    var cOptions = {
        origin: function (origin, callback) {
            
            if (isOriginAllowed(origin) || isOriginAllowed(originFromHost) || isOriginAllowed(req.get("host")) || isOriginAllowed(req.get("origin")))
                callback(null, true);
            else
                callback(
                    new Error(
                        "Not allowed by CORS, try again <br/> \n" +
                            JSON.stringify(origin, null, 2)
                    ),
                    false
                );
        },
        credentials: true,
    };

    cb(null, cOptions); // callback expects two parameters: error and options
};


app.use(cors(corsOptions));
const routes = require('./routes/routes');
app.use('/api', routes);


const kycController = require("./controller/kyc_controller");

app.post("/kyc/update",kycController.update)


app.get('/', function(req, res){
    return res.send('Hello! The API is working');
});


app.listen({port}, async ()=>{
    await connectToDatabase();
    console.log('Hello! The API is at http://localhost:'+port+'/api');
});

