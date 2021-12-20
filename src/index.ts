import express from 'express';
import processor from './processor';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	let html: string =
		'<h2>usage info</h2>\
			   <p>route: api/image</p><br>\
			   <p>req query params</p><br>\
			   <ol><li>filename</li>\
			   <li>width default 400px</li>\
			   <li>height default 400px</li></ol><br>\
			   <p>example request : /api/image/?filename=""&width=""&height=""</p>';

	res.send(html);
});

app.get('/api/image/', async (req, res) => {
	let imageName: string = req.query.filename as string;
	let width = Number(req.query.width) || 400;
	let height = Number(req.query.height) || 400;

	console.log(width, height);
	// check if it is already exist with the same width and height
	let exist = processor.doesExist(imageName, width, height);
	if (exist) {
		res.sendFile(exist);
		return;
	}

	// prepare info
	let propertiesObj = processor.prepareImageProperties(imageName, width, height, res);

	// resize image
	if (propertiesObj) {
		let result = await processor.resize(propertiesObj.imagePath, propertiesObj.width, propertiesObj.height, res);
		if (result) {
			res.sendFile(result);
		}
	}
});

app.listen(port, () => {
	console.log(`app is up and running at http://localhost:${port}`);
});
