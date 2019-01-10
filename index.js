const puppeteer = require('puppeteer');

var bb;

var init = async () => {
  
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            args:[
                '--start-maximized' // you can also use '--start-fullscreen'
             ]
        }
        );

        bb = browser;

        const page = await browser.newPage();

        await page.setViewport({ width: 1366, height: 768});

        await page.goto('https://www.imovelweb.com.br');

        // // Get the "viewport" of the page, as reported by the page.
        // const   try {dimensions = await page.evaluate(() => {
        //     re  try {turn {
        //         try {  width: document.documentElement.clientWidth,
        //         try {  height: document.documentElement.clientHeight,
        //         try {  deviceScaleFactor: window.devicePixelRatio
        //     };  try {
        // });

        // console.log('Dimensions:', dimensions);


        // await page.click('#searchbox-home_ubicacion');
        // await page.keyboard.type("testet");

        await page.click('#submitBtn');


        await page.waitFor(4000);

        await page.click('#avisos-content > li:nth-child(1)');
        // await page.waitForNavigation();

        



await page.waitFor(9000);


//         const newPagePromise = new Promise(x => browser.on('_targetInfoChanged', target => x(target.page())));
//   await page.evaluate(async () => await window.open("","Schedule","menubar=0,scrollbars=1,resizable=1"));
// const popup = await newPagePromise;

var page2 = (await browser.pages())[2];
                
        await page2.screenshot({ path: 'example.png' });

       


        await browser.close();


};

init().catch((e) =>{ 
    console.log('err: ' + e);
    console.log('erro geral');
    bb.close();
});

// console.log("teste");