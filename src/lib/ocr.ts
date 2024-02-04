import tesseract from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';
let nanoid: any;
import('nanoid').then((module) => {
	nanoid = module.nanoid;
});

async function extractText(source_path: string): Promise<void> {
	try {
		const targetPath = path.join(
			process.cwd(),
			'files',
			`${nanoid()}-${Date.now()}.txt`,
		);
		const worker = await tesseract.createWorker('eng');
		const result = await worker.recognize(source_path);
		if (!fs.existsSync('files')) {
			fs.mkdirSync('files');
		}
		await fs.promises.appendFile(targetPath, result.data.text);
	} catch (error) {
		console.error(error);
	}
}

export default extractText;
