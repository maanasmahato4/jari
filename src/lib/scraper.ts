import playwright from 'playwright';
import randomUserAgent from 'random-useragent';
import * as fs from 'fs';
import * as path from 'path';
const nanoid = import('nanoid');

async function takeScreenShot(url: string): Promise<string> {
	if (!fs.existsSync('screenshots')) {
		fs.mkdirSync('screenshots');
	}
	const target_path = path.join(
		process.cwd(),
		'screenshots',
		`${(await nanoid).nanoid()}_${Date.now()}.png`,
	);
	const agent = randomUserAgent.getRandom();
	const browser = await playwright.chromium.launch({ headless: true });
	const context = await browser.newContext({
		userAgent: agent,
		bypassCSP: true,
	});
	const page = await context.newPage();

	// navigate to the url
	await page.goto(url);

	await page.screenshot({
		path: target_path,
		fullPage: true,
	});
	await browser.close();
	return target_path;
}

export default takeScreenShot;
