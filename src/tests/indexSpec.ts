import axios from 'axios';

describe('image processing server', function() {
	let base_url = 'http://localhost:3000/';

	describe('GET /', function() {
		it('returns status code 200', async function() {
			let response = await axios.get(base_url);
			expect(response.status).toBe(200);
		});
	});
});
