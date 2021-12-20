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

app.get('/api/image/', (req, res) => {
	let imageName: string = req.query.filename as string;
	let width = 400;
	let height = 400;

	if (Number(req.query.width) && Number(req.query.height)) {
		width = Number(req.query.width);
		height = Number(req.query.height);
	}

	let propertiesObj = processor.prepareImageProperties(imageName, width, height, res);

	console.log(propertiesObj);
});

app.listen(port, () => {
	console.log(`app is up and running at http://localhost:${port}`);
});
