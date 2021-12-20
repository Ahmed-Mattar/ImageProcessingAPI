import axios from 'axios';
import processor from '../processor';

describe('image processing server', function() {
	let base_url = 'http://localhost:3000/';

	describe('GET /    check if server is online', function() {
		it('returns status code 200', async function() {
			let response = await axios.get(base_url);
			expect(response.status).toBe(200);
		});
	});

	describe('GET /api/image/  sending wrong image name', function() {
		let width = 250;
		let height = 250;
		let filename = 'asdqwda'; // non existent image
		it('returns status code 404 and image is not found', async function() {
			console.log(base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`);
			let response = await axios
				.get(base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`)
				.catch((error) => {
					expect(error.response.status).toBe(404);
				});
		});
	});
});
