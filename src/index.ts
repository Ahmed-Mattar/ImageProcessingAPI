import express from 'express';
import processor from './processor';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	const html =
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
	const imageName: string = req.query.filename as string;
	const width = Number(req.query.width) || 400;
	const height = Number(req.query.height) || 400;

	// check if it is already exist with the same width and height and if not it will continue
	const exist = processor.doesExist(imageName, width, height);
	if (exist) {
		res.sendFile(exist);
		return;
	}

	// prepare info
	const propertiesObj = processor.prepareImageProperties(imageName, width, height, res);

	// resize image
	if (propertiesObj) {
		const result = await processor.resize(propertiesObj.imagePath, propertiesObj.width, propertiesObj.height, res);
		if (result) {
			res.sendFile(result);
		}
	}
});

app.listen(port, () => {
	console.log(`app is up and running at http://localhost:${port}`);
});
