import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	let html =
		'<h2>usage info</h2>\
			   <p>route: api/image</p><br>\
			   <p>req query params</p><br>\
			   <ol><li>filename</li>\
			   <li>width</li>\
			   <li>height</li></ol><br>\
			   <p>example request : api/image/?filename=""&width=""&height=""</p>';

	res.send(html);
});

app.listen(port, () => {
	console.log(`app is up and running at http://localhost:${port}`);
});
