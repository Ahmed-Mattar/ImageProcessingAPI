import axios from 'axios';

describe('image processing server', function() {
	const base_url = 'http://localhost:3000/';

	describe('GET /    check if server is online', function() {
		it('returns status code 200', async function() {
			const response = await axios.get(base_url);
			expect(response.status).toBe(200);
		});
	});

	describe('GET /api/image/  sending a wrong image name', function() {
		const width = 250;
		const height = 250;
		const filename = 'asdqwda'; // non existent image
		it('returns status code 404 and image is not found', async function() {
			console.log(base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`);
			await axios
				.get(base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`)
				.catch((error) => {
					expect(error.response.status).toBe(404);
				});
		});
	});

	describe('GET /api/image/  sending a correct image name', function() {
		const width = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
		const height = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
		const filename = 'fjord';
		it('returns status code 200 and image is found', async function() {
			console.log(base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`);
			const response = await axios.get(
				base_url + `api/image/?filename=${filename}&width=${width}&height=${height}`
			);
			expect(response.status).toBe(200);
		});
	});
});
