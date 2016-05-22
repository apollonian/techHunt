'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.daysAgo(n)', function () {
	it('sets `page` query parameter to `n`', function *() {
		const n = 20;
		const httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.daysAgo(n).exec();

		const [ args ] = httpStub.args;
		const params = args[1];

		expect(params.page).to.equal(n);

		httpStub.restore();
	});

	it('defaults to `0` for invalid `n`', function *() {
		const httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.daysAgo(true).exec();

		const [ args ] = httpStub.args;
		const params = args[1];

		expect(params.page).to.equal(0);

		httpStub.restore();
	});
});
