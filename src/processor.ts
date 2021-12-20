import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import express from 'express';

const prepareImageProperties = (filename: string, width: number, height: number, res: express.Response) => {
	try {
		let imagePath = path.join(__dirname, '/../assets/original-images/', filename + '.jpg');
		console.log(imagePath);
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

const resize = async (path: string, width: number, height: number) => {};

export = { prepareImageProperties, resize };
