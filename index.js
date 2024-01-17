const puppeteer = require("puppeteer")


async function getSpecs() {

    const browser = await puppeteer.launch({
        headless: false
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
