import { defineConfig } from "vite";
import "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
// import JSON5 from "json5";
import fs from "node:fs";

export function createConfig(options: { default?: boolean } = {}) {
  const config = defineConfig({
    plugins: [
      tsconfigPaths({
        root: `.`,
        parseNative: false,
      }),
    ],
    test: {
      globals: true,
      watch: false,
      typecheck: {
        tsconfig: `./test/tsconfig.json`,
        include: [
          `./src/**/*.spec.ts`,
          `./test/**/*.spec.ts`,
          `./test/**/*.test.ts`,
        ],
      },
      deps: {
        registerNodeLoader: true,
      },
    },
  });

  if (options.default) {
    return config;
  }

  // get tsconfig.json in test directory
  console.log(
    `[test.typecheck.include]  has been configured using tsconfig. check vite.config.ts for more information`
  );
  const tsconfig = JSON.parse(fs.readFileSync(`./test/tsconfig.json`, `utf-8`));

  const includes: string[] = tsconfig.include;

  if (!includes) {
    throw new Error(`tsconfig.json must have include property`);
  }

  if (includes.length === 0) {
    throw new Error(`tsconfig.json must have at least one include property`);
  }

  // @ts-ignore
  config.test.typecheck.include = includes.map((p) => p.slice(1));
  // @ts-ignore
  console.log(`[test.typecheck.include] ${config.test.typecheck.include}`);

  return config;
}
