import { defineConfig, UserConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { relative, resolve } from "path";
import fs from "node:fs";
import typescript, { readConfigFile } from "typescript";

type UserConfigWithTest = UserConfig & {
  test: Exclude<UserConfig[`test`], undefined>;
};

/**
 * uses './test/tsconfig.json' as tsconfig by default
 *
 * This is used to inject aliases for vite to resolve
 */
export function createConfig(
  options: {
    default?: boolean;
    tsconfig?: string;
    /**
     * experimental vite alias resolution.
     * Supply the path to the root tsconfig
     */
    experimentalViteAliasResolution?: string;
  } = {}
): UserConfigWithTest {
  // Force cast
  // @ts-ignore
  const config: UserConfigWithTest = defineConfig({
    plugins: [
      tsconfigPaths({
        root: `.`,
        parseNative: false,
      }),
    ],
    test: {
      reporters: `verbose`,
      bail: 1,
      globals: true,
      watch: false,
      typecheck: {
        tsconfig: options.tsconfig ?? `./test/tsconfig.json`,
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
    ...(options.experimentalViteAliasResolution && {
      resolve: {
        alias: (() => {
          console.log(`[experimental vite alias resolution] enabled`);
          try {
            const config = readConfigFile(
              options.experimentalViteAliasResolution,
              typescript.sys.readFile
            );

            const tsconfig = typescript.parseJsonConfigFileContent(
              config,
              typescript.sys,
              `./`
            );

            const paths = tsconfig.raw.config.compilerOptions.paths;
            const newPaths = Object.create(null);

            const cwd = process.cwd();

            const rel = relative(
              cwd,
              resolve(options.experimentalViteAliasResolution, `..`)
            );

            // eslint-disable-next-line prefer-const
            for (let [k, arr] of Object.entries(paths) as [
              string,
              string[]
            ][]) {
              let isGlob = false;
              if (k.includes(`*`)) {
                // should contain at most one *
                if (k.endsWith(`/*`)) {
                  k = k.slice(0, -2);
                  isGlob = true;
                } else {
                  console.warn(
                    `[experimental vite alias resolution] cannot support non trailing glob for now, ignoring key: ${k}`
                  );
                  continue;
                }
              }

              newPaths[k] = arr.map((p) =>
                resolve(
                  rel,
                  isGlob
                    ? (() => {
                        if (p.endsWith(`/*`)) {
                          return p.slice(0, -2);
                        }
                        console.warn(
                          `[experimental vite alias resolution] ${p}, which is the value of ${k}, is not a glob. Not applying transformation`
                        );
                        return p;
                      })()
                    : p
                )
              );
            }

            console.log(
              `[experimental vite alias resolution] paths (post transform): `,
              { ...newPaths }
            );

            return newPaths;
          } catch (e) {
            console.log(
              `[experimental vite alias resolution] error reading tsconfig.json`
            );
            console.log(
              `[experimental vite alias resolution] path was: `,
              options.experimentalViteAliasResolution
            );
            console.log(tsconfig);
            console.log(tsconfig.raw.config);

            throw e;
          }
        })(),
      },
    }),
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
