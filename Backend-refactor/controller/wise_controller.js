const { Sequelize, ExchangeRate, Currency, ExchangeLimits } = require("./../models");
const axios = require("axios");
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getCurrenciesFromDB = async () => {
    const currencies = await Currency.findAll();
    return currencies;
}

const waitMillis = async (millis) => {
    let start = Date.now(), currentDate = null;
    do { currentDate = Date.now(); } while (currentDate - start < millis);
}

const getTRM = async () => {
    let cnt = 0;
    do {
        try {
            const browser = await puppeteer.launch({
                headless: true,
            });
            const page = await browser.newPage();
            await page.goto('https://totoro.banrep.gov.co/estadisticas-economicas/');
            await page.setExtraHTTPHeaders({
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
                "upgrade-insecure-requests": "1",
                "accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,en;q=0.8",
            });
            await page.waitForSelector(".valor-indicador-principal", { visible: true });
            let elements = await page.$$('.valor-indicador-principal');
            let value = await elements[5].evaluate(el => el.textContent);
            let data = value.split(' ');
            let parsable = data[0].replace(/,/g, ';').replace(/\./g, '').replace(/;/g, '.');
            console.log(parsable)
            let trm = parseFloat(parsable);
            console.log(trm);
            await browser.close();
            cnt = 3;
            return trm;
        } catch (error) {
            cnt++;
            waitMillis(5000);
        }
    } while (cnt < 3);
}

const TRMScrapper = async () => {
    const url = "https://totoro.banrep.gov.co/estadisticas-economicas/";
    let trm = 0;
    await axios(url).then((result) => {
        const html_data = result.data;
        const $ = cheerio.load(html_data);
        const element = ".valor-indicador-principal";
        $(element).each((_, e) => {
            let row = $(e).text().replace(/(\s+)/g, ' ');
            if (_ == 5) {
                let data = row.split(' ');
                let parsable = data[0].replace(/,/g, ';').replace(/\./g, '').replace(/;/g, '.');
                //console.log(parsable)
                trm = parseFloat(parsable);
            }
            //console.log(`${row}`);
        });
    }).catch((err) => {

    });
    return trm;
}

const historicalTRM = async () => {
    const url = 'https://www.datos.gov.co/resource/mcec-87by.json';
    let trm = 0;
    await axios(url).then((result) => {
        const json_data = result.data;
        let date_string = new Date();
        date_string.setHours(0);
        date_string.setMinutes(0);
        date_string.setSeconds(0);
        date_string.setMilliseconds(0);
        let date_final = new Date(date_string).toLocaleString("en-US", { timeZone: "America/Bogota" });
        console.log("DS >> ",date_final);
        for (let data of json_data) {
            let date_trm = new Date(data.vigenciahasta).toLocaleString("en-US", { timeZone: "America/Bogota" });
            //console.log("DT >> ", date_trm);
            if (date_final == date_trm) {
                console.log("TRM >>", data.valor);
                trm = parseFloat(data.valor);
            }
        }
    }).catch((err) => {
        console.log(err);
    });
    return trm;
}

const getDataFromWise = async (TRMScrapper) => {
    const auth = {
        username: process.env.WISE_USERNAME,
        password: process.env.WISE_PASSWORD
    };

    try {
        const currencies = await getCurrenciesFromDB();
        let TRM = TRMScrapper;
        console.log("TRM HOY>>> ", TRM);
        let apiRequests = [];
        for (const currency of currencies) {
            if (currency.dataValues.ticker === 'USDC' || currency.dataValues.ticker === 'USDT' || currency.dataValues.ticker === 'USD') {
                console.log('USDC/USDT NOT SUPPORTED')
            } else {
                const sourceUSD = {
                    name: `USD-${currency.dataValues.ticker}`,
                    url: `https://api.transferwise.com/v1/rates?source=USD&target=${currency.dataValues.ticker}`,
                }
                const targetUSD = {
                    name: `${currency.dataValues.ticker}-USD`,
                    url: `https://api.transferwise.com/v1/rates?source=${currency.dataValues.ticker}&target=USD`,
                }
                apiRequests.push(sourceUSD, targetUSD);
            }
            //console.log(apiRequests);
        }
        //console.log("API REQS >>>>> ", apiRequests);
        let api = apiRequests.map((url) => axios.get(url.url, { auth }));
        const res = await Promise.all(api);

        //console.log(res);

        res.forEach(async (element) => {
            try {

                let data = {
                    id_base_currency: "",
                    id_quote_currency: "",
                    buy_rate: "",
                    sell_rate: "",
                }

                let rate = element.data[0].rate;
                if (element.data[0].source == 'USD') {
                    if (element.data[0].target == 'COP') {
                        rate = TRM;
                        console.log("RATE>> ", rate);
                    }
                    let target = currencies.find(currency => currency.dataValues.ticker == element.data[0].target);
                    //let source = currencies.find(currency => currency.dataValues.ticker == element.data[0].source);
                    //source.dataValues.id_currency
                    data.id_base_currency = 1;
                    data.id_quote_currency = target.dataValues.id_currency;
                } else if (element.data[0].target == 'USD') {
                    let source = currencies.find(currency => currency.dataValues.ticker == element.data[0].source);
                    //let target = currencies.find(currency => currency.dataValues.ticker == element.data[0].target);
                    data.id_quote_currency = 1;
                    data.id_base_currency = source.dataValues.id_currency;
                }
                data.buy_rate = rate;
                data.sell_rate = rate;
                let requestBody = ExchangeRate.checkPostParams(data)
                let dataToSave = ExchangeRate.build(requestBody);
                //console.log(dataToSave);
                dataToSave.save({logging: false});
            } catch (err) {
                console.error("No se guardo exchange rates", err);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDataFromWise, TRMScrapper, historicalTRM };