const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My first puppeteer test', () => {
	let browser
	let page
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
			args: ['--start-fullscreen'],
		})
		page = browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	beforeEach(async function () {
    // Runs before each test's step
    })
    afterEach(async function () {
        // Runs after each test's step
    })
	it('Should launch browser', async () => {
		await page.setExtraHTTPHeaders({ DNT: '1' })

		await page.goto('https://example.com')
		await page.waitForXPath('//h1')
		const title = await page.title()
		const url = await page.url()
		const text = await page.$eval('h1', element => element.textContent)
		const count = await page.$$eval('p', element => element.length)

		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)

		await page.goto('http://zero.webappsecurity.com/')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')

		await page.waitFor(() => !document.querySelector('#signin_button'))
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000,
		})
	})
})

async function autoScroll(page, height) {
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
