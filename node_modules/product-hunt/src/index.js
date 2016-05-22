'use strict';

const http = require('./utils/http');

const API = 'https://posts.producthunt.com/posts/currentUser';
const DEFAULT_QUERY_PARAMS = {
	filter: 'popular',
	page: 0
};

/**
 * Creates interface to build requests to retrieve products
 * from the public Product Hunt API.
 *
 * @return {Object} `productHunt` module
 */
function productHunt() {
	let queryParams = { };

	return {

		/**
		 * Sets the request query parameters to fetch the
		 * most popular products from Product Hunt.
		 *
		 * @return {Object} `productHunt` module
		 */
		popular() {
			queryParams.filter = 'popular';

			return this;
		},

		/**
		 * Sets the request query parameters to fetch the
		 * newest products from Product Hunt.
		 *
		 * @return {Object} `productHunt` module
		 */
		newest() {
			queryParams.filter = 'newest';

			return this;
		},

		/**
		 * Sets the request query parameters to fetch todays
		 * products from Product Hunt.
		 *
		 * @return {Object} `productHunt` module
		 */
		today() {
			queryParams.page = 0;

			return this;
		},

		/**
		 * Sets the request query parameters to fetch
		 * yesterdays products from Product Hunt.
		 *
		 * @return {Object} `productHunt` module
		 */
		yesterday() {
			queryParams.page = 1;

			return this;
		},

		/**
		 * Sets the request query parameters to fetch
		 * Product Hunt products from `n` days ago.
		 *
		 * @param {Number} n - number of days
		 *
		 * @return {Object} `productHunt` module
		 */
		daysAgo(n) {
			const days = parseInt(n, 10);

			if (!isNaN(days)) {
				queryParams.page = days;
			}

			return this;
		},

		/**
		 * Executes the built request.
		 *
		 * @return {Promise} resolves to an Array of products
		 */
		exec() {
			const params = Object.assign(
				{},
				DEFAULT_QUERY_PARAMS,
				queryParams
			);

			const request = http.GET(API, params);

			queryParams = { };

			return request;
		}
	};
}

module.exports = productHunt();
