import { betterAuth } from "better-auth";
import { oidcProvider } from "better-auth/plugins";

const auth = betterAuth({
	plugins: [
		oidcProvider({
			loginPage: "/sign-in", // path to the login page
			// ...other options
		}),
	],
});
