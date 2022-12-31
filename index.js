const fs = require("fs");
const { loadEnv } = require("vite");

module.exports = function vitePluginEnvDTS(option = {}) {
	const path = option.path || "types/vite-env.d.ts";
	const prefix = option.prefix;
	const parser = option.parser || "auto";
	const arrayType = option.arrayType || "array";

	return {
		name: "vite-plugin-env-dts",
		config(_, { mode }) {
			let env = loadEnv(mode, process.cwd(), prefix);
			env = parse(env, parser, arrayType);
			const template = JSON.stringify(env, null, 2).replace(/"/g, "").replace(/,/g, ";");
			const str = `interface ImportMetaEnv ${template}`;

			fs.writeFile(path, str, { encoding: "utf-8" }, console.error);
		},
	};
};

const toString = Object.prototype.toString;
function getType(x) {
	return mapper[toString.call(x)] || "undefined";
}

function parse(env, parser, arrayType) {
	for (const key in env) {
		const value = env[key];
		if (typeof parser === "function") {
			env = parser(key, value);
		} else {
			if (arrayType === "array" && getType(value) === "array") {
				// 去重
				const a = Array.from(new Set(parse(value)));
				env[key] = `Array<${a.join("|")}>`;
			} else if (typeof value === "object") {
				parse(value);
			} else if (parser === "auto") {
				env[key] = getType(value);
			}
		}
	}
	return env;
}

const mapper = {
	"[object String]": "string",
	"[object Number]": "number",
	"[object Boolean]": "boolean",
	"[object Null]": "null",
	"[object Array]": "array",
	"[object Object]": "Record<string,any>",
};
