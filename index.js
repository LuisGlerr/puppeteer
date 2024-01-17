const puppeteer = require("puppeteer")
// const translate = require("translate")

async function openWebPage() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    })
    const page = await browser.newPage()
    await page.goto('https://example.com')

    await browser.close()

}

// openWebPage()

async function captureScreenshot() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    })
    const page = await browser.newPage()
    await page.goto('https://example.com')
    await page.screenshot({ path: 'example.png' })
    await browser.close()

}

// captureScreenshot()

async function navegateWebPage() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    })
    const page = await browser.newPage()
    await page.goto('https://quotes.toscrape.com/')
    await page.click('a[href="/login"]')
    await new Promise(r => setTimeout(r, 5000))
    await page.screenshot({ path: 'example.png' })
    await browser.close()

}

// navegateWebPage()

async function getDataPage() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    })
    const page = await browser.newPage()
    await page.goto('https://example.com/')

    const result = await page.evaluate(() => {
        const tittle = document.querySelector('h1').innerText
        const desc = document.querySelector('p').innerText
        const more = document.querySelector('a').innerText
        return {
            tittle,
            desc,
            more
        }
    })
    console.log(result)

    await browser.close()

}

// getDataPage()

async function handelDinamycPage() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    })
    const page = await browser.newPage()
    await page.goto('https://quotes.toscrape.com/')

    const result = await page.evaluate(() => {
        const quotes = document.querySelectorAll('.quote')
        const data = [...quotes].map(el => {
            const quoteText = el.querySelector('.text').innerText;
            const author = el.querySelector('.author').innerText;
            const tags = [...el.querySelectorAll('.tag')].map((tag) => tag.innerText);
            return {
                quoteText,
                author,
                tags
            }
        })
        return data
    })
    console.log(result)

    await browser.close()

}

// handelDinamycPage()

async function getSpecs() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400
    })
    const page = await browser.newPage()
    let firstLink = 'https://www.bestbuy.com/?intl=nosplash'
    await page.goto(firstLink)

    const inputSelector = 'input[id="gh-search-input"]';
    await page.type(inputSelector, 'Apple iPhone 15 128GB Dual SIM Física');
    await page.keyboard.press('Enter');
    const imageSelector = 'img.product-image';
    await page.waitForSelector(imageSelector);
    const firstImage = await page.$(imageSelector);

    if (firstImage) {
        await firstImage.click();
        await page.keyboard.press('Enter');
        await new Promise(r => setTimeout(r, 5000))
        const listItemSelector = 'li.zebra-list-item';
        const data = await page.$$eval(listItemSelector, (listItems) => {
            return listItems.map((li) => {
                const properties = li.querySelectorAll('.property');
                const descriptions = li.querySelectorAll('.description');

                return Array.from(properties).map((property, index) => {
                    return {
                        property: property.textContent.trim(),
                        description: descriptions[index].textContent.trim()
                    };
                });
            });
        });

       let data2 = data.flat(Infinity)
        console.log(data2);
    }
    await browser.close()

}

getSpecs()
