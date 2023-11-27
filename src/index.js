/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const urlObj = {
	'blog': 'https://www.ruanyifeng.com/blog',
	'github': 'https://github.com/ruanyf',
};

function response404() {
  return new Response(undefined, {
    status: 404
	});
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		let reqPath = url.pathname;

		if (reqPath === '/') return response404();

		reqPath = reqPath.substr(1);
    const responseUrl = urlObj[reqPath];

		if (responseUrl === undefined) return response404();

		return new Response(undefined, {
			status: 301,
			headers: {
				"Location": responseUrl,
			},
		});
	},
};
