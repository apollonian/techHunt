'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.newest()', function () {
	it('sets `filter` query parameter to `newest`', function *() {
		const httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.newest().exec();

		const [ args ] = httpStub.args;
		const params = args[1];

		expect(params.filter).to.equal('newest');

		httpStub.restore();
	});
});
