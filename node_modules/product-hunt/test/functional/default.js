'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('Default values', function () {
	before(function *() {
		this.httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		yield productHunt.exec();

		const [ args ] = this.httpStub.args;

		this.params = args[1];
	});

	it('sets `filter` query parameter to `popular`', function () {
		expect(this.params.filter).to.equal('popular');
	});

	it('sets `page` query parameter to `0`', function () {
		expect(this.params.page).to.equal(0);
	});

	after(function () {
		this.httpStub.restore();
	});
});
