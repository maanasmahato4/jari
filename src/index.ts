import Enquirer from 'enquirer';
import takeScreenShot from './lib/scraper';
import extractText from './lib/ocr';

const enquirer = new Enquirer();

enquirer
	.prompt({
		type: 'input',
		name: 'url',
		message: 'Enter the site url',
	})
	.then(async (values: unknown) => {
		const options = values as { url: string };
		const source_path = await takeScreenShot(options.url);
		await extractText(source_path);
	})
	.catch((error) => console.error(error))
	.finally(() => process.exit());
