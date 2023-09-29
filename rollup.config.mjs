// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const external = [];

const plugins = [
  nodeResolve({
    preferBuiltins: false,
  }),
  commonjs(),
];

const builds = [
  {
    input: "./index.js",
    plugins: [...plugins],
    external,
    output: [
      {
        format: "esm",
        file: "dist/index.js",
        banner: "#!/usr/bin/env node",
      },
    ],
  },
];

export default () => builds;
