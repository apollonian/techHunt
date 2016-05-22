'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.yesterday()', function () {
	it('sets `page` query parameter to `1`', function *() {
		const httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.yesterday().exec();

		const [ args ] = httpStub.args;
		const params = args[1];

		expect(params.page).to.equal(1);

		httpStub.restore();
	});
});
