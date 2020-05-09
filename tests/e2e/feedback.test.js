const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Feedback Test', () => {
    let browser
    let page

    before(async function () {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devtools: false,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function () {
        await browser.close()
    })

    it('Display feedback form', async function () {
        await page.goto('http://zero.webappsecurity.com/feedback.html')
        await page.waitForSelector('form')
        await page.type('#name', 'Name')
        await page.type('#email', 'test@email.com')
        await page.type('#subject', 'Subject')
        await page.type('#comment', 'Just a message into the textarea')
        await page.click('input[type="submit"]')
    })

    it('Submit feedback form', async function () {
        await page.waitForSelector('#feedback-title')
        const url = page.url()
        expect(url).to.include('/sendFeedback.html')
    })

    it('Display results page', async function () {

    })
})
