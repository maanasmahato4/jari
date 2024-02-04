import tesseract from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';
let nanoid: any;
import('nanoid').then((module) => {
	nanoid = module.nanoid;
});

async function extractText(source_path: string): Promise<boolean> {
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
		return true;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw 'error generating text file';
		}
	}
}

export default extractText;
