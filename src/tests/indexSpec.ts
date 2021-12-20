import processor from '../processor';
import path from 'path';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('TEST endpoints responses', function() {
	describe('get /', function() {
		it('Return 200', async function() {
			const response = await request.get('/');
			expect(response.status).toBe(200);
		});
	});
	describe('get /api/image/', function() {
		it('Return 200', async function() {
			const routeWithParams = `/api/image/?filename=fjord&width=300&height=300`;
			const response = await request.get(routeWithParams);
			expect(response.status).toBe(200);
		});
	});
	describe('get /api/image/', function() {
		it('Return 404 image does not exist', async function() {
			const routeWithParams = `/api/image/?filename=noneexistent&width=300&height=300`;
			const response = await request.get(routeWithParams);
			expect(response.status).toBe(404);
		});
	});
});

describe('TEST resize function', function() {
	describe('should return the modified image path', function() {
		it('a string of the image path', async function() {
			const image_url = path.join(__dirname, '../../assets/original-images', 'fjord.jpg');

			const result = await processor.resize(image_url, 322, 400);
			expect(result).toBeTruthy();
		});
	});

	describe('should return empty image path', function() {
		it('empty string', async function() {
			const image_url = path.join(__dirname, '../../assets/original-images', 'noneexistentImage.jpg');

			const result = await processor.resize(image_url, 400, 400);
			expect(result).toBeFalsy();
		});
	});
});
