"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enquirer_1 = __importDefault(require("enquirer"));
const scraper_1 = __importDefault(require("./lib/scraper"));
const ocr_1 = __importDefault(require("./lib/ocr"));
const enquirer = new enquirer_1.default();
enquirer
    .prompt({
    type: 'input',
    name: 'url',
    message: 'Enter the site url',
})
    .then((values) => __awaiter(void 0, void 0, void 0, function* () {
    const options = values;
    const source_path = yield (0, scraper_1.default)(options.url);
    yield (0, ocr_1.default)(source_path);
}))
    .catch((error) => console.error(error))
    .finally(() => process.exit());
