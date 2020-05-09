module.exports = {
    click: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: "${selector}"`)
        }
    },
    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error(`Could not get text from selector: "${selector}"`)
        }
    },
    getCount: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error(`Could not get count of selector: "${selector}"`)
        }
    },
    typeText: async function (page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(`Could not into selector: "${selector}"`)
        }
    },
    waitForText: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                    {},
                    selector,
                    text
            })
        } catch (error) {
            throw new Error(`TExt: "${text}" not found for selector: "${selector}"`)
        }
    },
    shouldNotExist: async function (page, selector) {
        try {
            await page.waitForSelector(selector, {hidden: true})
        } catch(error) {
            throw new Error(`Selector: "${selector}" is visible, but should NOT be`)
        }

    },
    autoScroll: async function (page, height) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                try {
                    var totalHeight = 0
                    var distance = 100
                    var timer = setInterval(() => {
                        var scrollHeight = height
                        window.scrollBy(0, distance)
                        totalHeight += distance

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer)
                            resolve()
                        }
                    }, 100)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}
