'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.today()', function () {
	it('sets `page` query parameter to `0`', function *() {
		const httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.today().exec();

		const [ args ] = httpStub.args;
		const params = args[1];

		expect(params.page).to.equal(0);

		httpStub.restore();
	});
});
