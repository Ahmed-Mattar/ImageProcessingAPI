import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import express from 'express';

const prepareImageProperties = (filename: string, width: number, height: number, res: express.Response) => {
	try {
		let imagePath = path.join(__dirname, '/../assets/original-images/', filename + '.jpg');

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

const resize = async (imagePath: string, width: number, height: number, res: express.Response) => {
	try {
		console.log('in resize');
		let routes = imagePath.split('\\');
		let imageName = routes[routes.length - 1];

		let outputPath = path.join(__dirname, '../assets/modified-images', `${width}-${height}-${imageName}`);
		await sharp(imagePath)
			.resize({
				width,
				height
			})
			.toFile(outputPath);
		return outputPath;
	} catch (error) {
		let message;
		if (error instanceof Error) message = error.message;
		res.status(500).send(message);
	}
};

const doesExist = (imageName: string, width: number, height: number): string => {
	let testingPath = path.join(__dirname, '/../assets/modified-images/', `${width}-${height}-${imageName}.jpg`);
	let result = fs.existsSync(testingPath);
	console.log(result, testingPath);
	if (result) return testingPath;
	else return '';
};

export = { prepareImageProperties, resize, doesExist };
