import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';
import fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';


const app = express();
const port = 3044;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: [`http://127.0.0.1:${port}`, `http://localhost:${port}`],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

app.use(json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        maxAge: 60 * 1000,
    })
);
const isProduction = app.get('env') === 'production';

if (isProduction) {
    app.set('trust proxy', 1); // trust first proxy
}

const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);

    (async function example() {
        const driver = await new Builder()
            .forBrowser('chrome')
            .build();
        try {
            await driver.get('https://jordantestsmart.multiscreensite.com/');
            console.log(await driver.getPageSource())
        } finally {
            await driver.quit();
        }
    })();
});
server.on('error', console.error);
