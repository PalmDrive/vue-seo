const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const port = 9100;
// const baseUrl = 'https://www.qbitnetwork.com'
// const baseUrl = 'http://localhost:9010'
const baseUrl = 'http://staging.qbitnetwork.com';
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
puppeteer.launch().then(async browser => {
  app.get('*', async (req, res) => {
    const url = baseUrl + req.originalUrl;
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'zh-CN,zh;',
    });
    await page.goto(url);
    const content = await page.content();
    res.send(content);
  });
});