const puppeteer = require('puppeteer');
const path = require('path');
const filePath = path.join(__dirname,"questionsPdf")
console.log("FilePath : "+filePath);
const fs = require('fs');



const pdfScript =  async() => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, args: ['--start-maximized'] };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 768});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // go to the target web
    await page.goto('https://www.onlineocr.net/');

    // get the selector input type=file (for upload file)
    await page.waitForSelector("#fileupload");
    await page.waitForTimeout(2000);

    // get the ElementHandle of the selector above
    const inputUploadHandle = await page.$("#fileupload");
  
    if(fs.existsSync('questions.txt') == true){
      inputUploadHandle.uploadFile('answerPdf.pdf');
    }else{
      inputUploadHandle.uploadFile('questionsPdf.pdf');
    }

   
    await page.waitForTimeout(4000);
    await page.click("[value = 'CONVERT']");
    // --------------------------------------------------2

    await page.waitForSelector("[name = 'ctl00$MainContent$txtOCRResultText']");
    let Question1 = await page.evaluate(()=>{
     return document.querySelector("[name = 'ctl00$MainContent$txtOCRResultText']").innerHTML;
    })

    
    
    if(fs.existsSync('questions.txt') == true){
      fs.writeFileSync("answers.txt",Question1);
    }else{
      fs.writeFileSync("questions.txt",Question1);
    }

    await browser.close();

};

module.exports = pdfScript;