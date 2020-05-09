const puppeteer = require('puppeteer')

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

        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me', {clickCount: 1})
        await page.click('input[type="submit"]', {clickCount: 1})
    })

    after(async function () {
        await browser.close()
    })

    it('Display Currency Exchange Form', async function () {
        await page.waitForSelector('.nav-tabs')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
        await page.click('#tabs > ul > li:nth-child(3) > a')
        await page.waitForSelector('.board')

    })
    it('Exchange currency', async function () {
        await page.select('#pc_currency', 'GBP')
        await page.type('#pc_amount', '100')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        await page.click('#purchase_cash')
        await page.waitForSelector('#alert_content')
    })
})
