const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

var bb;


function getElement(selector) {

  try {
    return document.querySelector(selector).textContent;
  }
  catch (exception) {
    console.log("erro leitura template");
  }
  return ""
}

let url = 'https://www.imovelweb.com.br/propriedades/apartamento-ponta-das-canas-2935774343.html?labs=I-27-i-i-removeTipoCategoria-&userid=0&itemid=2935270194&labs_source=RECOMENDADOS_FICHA_PROPIEDAD_DESKTOP',

  init = async (url) => {

    var resposta = {
      "imovel":
      {
        "url_imovel": "",
        "descricao": "",
        "observacao": "",
        "titulo_imovel": "",
        "tipo_imovel": "",
        "valor": 0,
        "enderecos": {
          "logradouro": "",
          "numero": "",
          "complemento": "",
          "bairro": "",
          "cidade": "",
          "estado": "",
          "latitude": 0,
          "longitude": 0,
          "cep": ""
        },
        "contatos": {
          "nome": "",
          "telefone": "",
          "creci": ""
        },
        "areas": [
          {
            "tipo_area": "",
            "valor": 0,
            "medida": ""
          }
        ],
        "caracteristicas": {
          "banheiro": 0,
          "dormitorio": 0,
          "vaga": 0,
          "suite": 0
        },
        "imagens": [
          {
            "url": ""
          },
          {
            "url": ""
          },
          {
            "url": ""
          }
        ]
      }

    }

    resposta.imovel.url_imovel = this.url;



    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: false,
      // args: [
      //   '--start-maximizgetElemented' // you can also use '--start-fullscreen'
      // ]
      args: ['--no-sandbox','--disable-setuid-sandbox', '--disable-dev-shm-usage']}
    
    );

    bb = browser;

    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url);

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

    // await page.click('#submitBtn');


    // await page.waitFor(4000);

    // await page.click('#avisos-content > li:nth-child(1)');
    // await page.waitForNavigation();     

    // await page.evaluate(() => {

    //     responsta.imovel.titulo_imovel = getElement('.title-type-sup');
    //     responsta.imovel.descricao = getElement('#verDatosDescripcion');
    //     responsta.imovel.valor = parseInt(getElement('#sidebar-price-container > div > div.block-price.block-row > div.price-items'));

    //     responsta.imovel.enderecos.logradouro = getElement('.section-location > b');

    //     responsta.imovel.caracteristicas.banheiro = parseInt(getElement('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(3) > b'));
    //     responsta.imovel.caracteristicas.dormitorio = parseInt(getElement('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(5) > b'));
    //     responsta.imovel.caracteristicas.suite = parseInt(getElement('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(5) > b'));

    //   // responsta.imovel.caracteristicas. = +document.querySelector('#sidebar-price-container > div > div.block-price.block-row > div.price-items > span').textContent;
    //   return responsta
    // }).then(x => {
    //   console.log("resultado da pesquisa");
    //   console.log(x);
    // })

    await page.evaluate(() =>
      document.querySelector('.title-type-sup').textContent).then(x => {
        resposta.imovel.titulo_imovel = x;
      })

    await page.evaluate(() =>
      document.querySelector('#verDatosDescripcion').textContent).then(x => {
        resposta.imovel.descricao = x;
      })

    await page.evaluate(() =>
      document.querySelector('#sidebar-price-container > div > div.block-price.block-row > div.price-items').textContent).then(x => {
        resposta.imovel.valor = x;
      })

    // await page.evaluate(() =>
    //   document.querySelector('#article-container > hgroup > h2.title-location > b').textContent).then(x => {
    //     resposta.imovel.enderecos.logradouro = x;
    //   })

    await page.evaluate(() =>
      document.querySelector('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(3) > b').textContent).then(x => {
        resposta.imovel.caracteristicas.banheiro = x;
      })

    await page.evaluate(() =>
      document.querySelector('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(5) > b').textContent).then(x => {
        resposta.imovel.caracteristicas.dormitorio = x;
      })

    await page.evaluate(() =>
      document.querySelector('#article-container > section.general-section.article-section.article-section-description > ul > li:nth-child(5) > b').textContent).then(x => {
        resposta.imovel.caracteristicas.suite = x;
      })



    // await page.waitFor(2000);


    //         const newPagePromise = new Promise(x => browser.on('_targetInfoChanged', target => x(target.page())));
    //   await page.evaluate(async () => await window.open("","Schedule","menubar=0,scrollbars=1,resizable=1"));
    // const popup = await newPagePromise;

    // var page2 = (await browser.pages())[2];

    // await page.screenshot({ path: 'example.png' });


    // console.log(resposta);


    await browser.close();
      return resposta;

  };


  console.log("fim");


app.get('/buscar', function(req, res) {

  var url = req.query.url;

    init(url).then((resposta) => {
    console.log(resposta);
    
  res.send(JSON.stringify({ bruno: resposta }));
  })
  .catch((e) => {
    console.log('err: ' + e);
    console.log('erro geral');
    bb.close();
  });

});

app.listen(port, function() {
  console.log('App listening on port ' + port)
})


// console.log("teste");