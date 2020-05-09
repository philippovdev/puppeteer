const puppeteer = require('puppeteer')

describe('Device emulation', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
        const context = await browser.createIncognitoBrowserContext()
		page = await context.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Desktop device test', async function () {
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto('https://example.com')
		await page.waitFor(3000)
	})
	it('Tablet device test', async function () {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('https://example.com')
		await page.waitFor(3000)
	})
	it('Mobile device test', async function () {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
		await page.goto('https://example.com')
		await page.waitFor(3000)
	})
})
