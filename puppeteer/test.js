const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 800,
            height: 600,
            isMobile: true
        }

    });
    const page = await browser.newPage();
    await page.goto('http://localhost:9502/bdc39580-2a1a-11eb-b27d-3bb049f3f7e1#/page/0f723a80-2a1b-11eb-b27d-3bb049f3f7e1');
    await page.screenshot({
        path: './puppeteer/imgs/example.png'
    });
    // await browser.close();
})();