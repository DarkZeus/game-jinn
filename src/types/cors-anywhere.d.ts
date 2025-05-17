declare module "cors-anywhere" {
	interface ServerOptions {
		originWhitelist?: string[];
		requireHeader?: string[];
		removeHeaders?: string[];
	}

	interface Server {
		listen(port: number, host: string, callback: () => void): void;
	}

	function createServer(options?: ServerOptions): Server;

	export = {
		createServer,
	};
}
