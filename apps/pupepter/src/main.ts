import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';
import fs from 'fs';
import { chromium } from 'playwright';

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


    (async () => {
        const browser = await chromium.launch({ headless: false })
        const context = await browser.newContext();
        await context.addCookies([])
        const page = await context.newPage()

        await page.setViewportSize({ width: 1200, height: 800 })
        const reuquests: any[] = [];
        const responses: any[] = [];
        page.on('request', async request => {
            const headers = await request.allHeaders()
            reuquests.push({url: request.url(), headers: headers})
        })
        page.on('response', response => responses.push(response))

        await page.goto('https://editor.wix.com/html/editor/web/renderer/edit/ce5af839-fec6-4fd5-8ff0-4ea7b9582598?metaSiteId=5c350215-5f2c-47d6-9778-e56dce773a7c')
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
                
        await sleep(25000)
        // const cookies = await context.cookies();

        // const cookiesStringify = JSON.stringify(cookies);
        // fs.writeFileSync('cookies.json', cookiesStringify);

        await page.locator('[data-automation-id="leftBarButton-addPanelInfra.newAddPanel"]').click()
        await page.locator('span[data-hook="add-panel-category-name-wrapper-store"]').click()
        await page.locator('div[id="Wix_Stores_Grid_Gallery"]').click()
        await sleep(5000)

        const reuquestsStringify = JSON.stringify(reuquests);
        fs.writeFileSync('requests.json', reuquestsStringify);


        const responseStringify = JSON.stringify(responses);
        fs.writeFileSync('responses.json', responseStringify);

        // await page.screenshot({ path: 'screenshot.png' })

        await browser.close()
    })()

});
server.on('error', console.error);
