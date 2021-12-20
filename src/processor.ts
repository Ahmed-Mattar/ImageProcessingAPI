import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import express from 'express';

const prepareImageProperties = (
	filename: string,
	width: number,
	height: number,
	res: express.Response
):
	| {
			imagePath: string;
			width: number;
			height: number;
		}
	| undefined => {
	try {
		const imagePath = path.join(__dirname, '/../assets/original-images/', filename + '.jpg');

		if (fs.existsSync(imagePath)) {
			return {
				imagePath,
				width,
				height
			};
		} else {
			throw new Error('Please provide a correct image name which is located in assets/original-images folder');
		}
	} catch (error) {
		let message;
		if (error instanceof Error) message = error.message;
		res.status(404).send(message);
	}
};

const resize = async (imagePath: string, width: number, height: number): Promise<string> => {
	//console.log('in resize');
	const routes = imagePath.split('\\');
	const imageName = routes[routes.length - 1];

	const outputPath = path.join(__dirname, '../assets/modified-images', `${width}-${height}-${imageName}`);

	try {
		await sharp(imagePath)
			.resize({
				width,
				height
			})
			.toFile(outputPath);
		return outputPath;
	} catch (error) {
		return '';
	}
};

const doesExist = (imageName: string, width: number, height: number): string => {
	const testingPath = path.join(__dirname, '/../assets/modified-images/', `${width}-${height}-${imageName}.jpg`);
	const result = fs.existsSync(testingPath);
	if (result) return testingPath;
	else return '';
};

export = { prepareImageProperties, resize, doesExist };
