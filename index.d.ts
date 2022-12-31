import type { Plugin } from "vite";

export default function vitePluginEnvDTS(option?: {
	path?: string;
	prefix?: string;
	parser?: "constant" | "auto" | ((x: any) => any);
	arrayType?: "tuple" | "array";
}): Plugin;
