'use strict';

const chai = require('chai');
const nock = require('nock');
const productHunt = require('../../src');
const fixture = require('../fixtures/posts');

const expect = chai.expect;
const domain = 'https://posts.producthunt.com';

describe('http', function () {
	it('200 status returns products Array', function *() {
		nock(domain)
			.get('/posts/currentUser')
			.query(true)
			.reply(200, fixture);

		const res = yield productHunt.exec();

		expect(res).to.deep.equal(fixture.posts);

		nock.cleanAll();
	});

	it('non 200 status returns error Object', function *() {
		const status = 404;

		nock(domain)
			.get('/posts/currentUser')
			.query(true)
			.reply(status);

		try {
			yield productHunt.exec();
		} catch (err) {
			expect(err).to.exist;
			expect(err.message).to.equal('Request failed: Not Found');
			expect(err.status).to.equal(status);
		}

		nock.cleanAll();
	});
});
