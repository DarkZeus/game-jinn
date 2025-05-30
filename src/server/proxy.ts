import corsAnywhere from "cors-anywhere";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const server = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ["origin", "x-requested-with"],
	removeHeaders: ["cookie", "cookie2"],
});

server.listen(port, host, () => {
	console.log(`Running CORS Anywhere on ${host}:${port}`);
});
