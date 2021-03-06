---
id: configuration-noderize
title: Configuration: Noderize
sidebar_label: Noderize
---

Noderize's options can be configured in a few ways:

* A `noderize` key in your `package.json` file (recommended):

  ```json
  {
  	"...": "...",
  	"noderize": {
  		"minify": true
  	}
  }
  ```

* A `.noderizerc` file, written in JSON/YAML/JS, with optional extensions: `.json`/`.yml`/`.yaml`/`.js`:

  * JSON:

    ```json
    {
    	"minify": true
    }
    ```

  * YAML:

    ```yml
    minify: true
    ```

  * JS:
    ```js
    module.exports = {
    	minify: true
    };
    ```

* A `noderize.config.js` file that exports an object (like the `.noderizerc` JS example above).

* Command line arguments:

  * Every configuration options can be passed as arguments to the `build`/`watch`/`start`/etc command.

    * `yarn build --minify`

  * When passing objects as argument, provide a JSON string.

    * `yarn build --targets '{"node": true}'`.

  * When passing arrays as argument, simply pass it multiple times.

    * `yarn build --languages javascript --languages typescript`.

**All configuration options are optional with Noderize. Only configure if required.**

See more details in [scripts](scripts.md).

## Index

<AUTOGENERATED_TABLE_OF_CONTENTS>

## Build Options

### `bundles`

[array] Default: `[ { "entry": "index.js", "output": "index.js" } ]`

Array of bundles to be built. Entry files will be taken from `src`, and output will be placed in `dist`.

Example of 2 bundles:

```json
"bundles": [
    {
        "entry": "index.js",
        "output": "index.js"
    },
    {
        "entry": ["~myExternalDependency", "secondBundle.ts"],
        "output": "secondBundle.js"
    }
]
```

The `entry` field may be an array of multiple files. To use an external entry file, prefix it with `~`.

If bundles are not set and only using the `typescript` [`language`](#languages), the default bundle entry is set to `index.ts`.

### `static`

[object] Default: _none_

Static files/directories to be copied.

Input is sourced from `src` and output placed into `dist`

Example (will copy the `templates` directory from `src/templates` to `dist/templates`):

```json
"static": {
    "templates": "templates"
}
```

### `runtime`

[string] Default: `noderize` if `noderize-runtime` is dependency, else `include`

Which runtime to use.

* `noderize`: Use the Noderize runtime dependency (external Babel runtime)
  * This requires `noderize-runtime` as dependency
* `include`: Includes the Babel runtime in your bundle
  * Will increase your file size.
* `polyfill`: Includes the Babel polyfill in your bundle
  * This will dramatically increase your bundle size
  * Do not use in libraries. Instead, use `noderize` for smaller file size
* `none`: Don't include a runtime.
  * This is useful if you are compiling for a recent engine (Node 8+ for instance)
  * This will be just under `noderize`'s file size, but no features are polyfille/transformed
  * Only use this if you know what you are doing

### `shebang`

[boolean] Default: if `bin` field in `package.json` is set

Adds a shebang to top of built file. Useful for building CLI apps.

You can omit this as it will infer if this is a CLI app by checking if the `bin` field in `package.json` is set.

> Note: If this option is activated, it will apply the shebang to all your bundles

### `targets`

[object] Default: `{ "node": true }`

Specify a [Babel target](https://babeljs.io/docs/plugins/preset-env/#targets) to compile to.

Default to current Node version. You may want to compile to standard ES5 if your app is a library by using `{}`.

This is overridden per environment with [`env`](#env) option.

### `target`

[string] Default: `node`

Specify a target. Options are:

* `node`
* `web`

### `globals`

[object] Default: _none_

Set a globals.

Example:

```json
"globals": {
    "$": "jquery"
}
```

### `sourcemap`

[boolean] Default: `true`

Generate source maps.

This is overridden in production with [`env`](#env) option.

### `includeExternal`

[boolean] Default: `false`

Include all your dependencies in your bundle. This will make your file size a lot larger.

### `minify`

[boolean] Default: `false`

Minifies (compress) your app.

### `languages`

[string|array] Default: `javascript`

Array of languages to be used.

Languages available:

* `javascript`
* `typescript`

### `name`

[string] Default: `name` field in `package.json`

Name of exported library (for CommonJS1 (old) and IIFE). Only useful for libraries.

### `babel`

[object] Default: _none_

Additional Babel plugins and presets.

For instance, to add the React preset for creating a React library:

```json
"babel": {
    "presets": ["@babel/preset-react"]
}
```

### `buildThreads`

[number] Default: `3`

Amount of build threads to use. Minimum of 1.

### `srcDirectory`

[string] Default: `src`

Directory of source code.

### `distDirectory`

[string] Default: `dist`

Directory of output code.

> Note: The [`clean` script](scripts.md#clean) will delete this directory when ran.

## Run Options

### `runOnWatch`

[boolean] Default: `true`

Enable running the app while watching. Might be useful to disable if you are working on a CLI app.

### `startFile`

[string] Default: `main` field in `package.json`, or first output in [`bundles`](#bundles).

File to run when using `start` or `watch` command.

This is relative to your project root. Add `dist/` before.

### `inspect`

[boolean] Default: `false`

Start the [Node debugger](https://nodejs.org/api/debugger.html) with Noderize.

### `inspectChrome`

[number] Default: _none_

Start the [Chrome DevTools (Node) debugger](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js) with Noderize.

Number given will be used as port to listen on.

## Other Options

### `env`

[object] Default: See below

Provide environment-specific variables.

Default:

```json
"env": {
    "production": {
        "sourcemap": false,
        "target": {}
    }
}
```

Example of adding other options:

```json
"env": {
    "production": {
        "minify": true
    },
    "test": {
        "debug": true
    }
}
```

Useful when building a production build with `yarn build --env production`.

Resolving is done in this order:

* If in testing, use `test`
* Try `--env` argument
* Try `NODE_ENV` environment variable
* Use `development`

> Note: Is it not recommened to use the `development` environment. Instead, set the values to the root config.

### `debug`

[boolean] Default: `false`

* Prints configuration at start
* Shows warnings in builds
