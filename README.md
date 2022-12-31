# vite-plugin-env-dts

A plugin for Vite to auto-genarate d.ts delcaration file from .env\* files

# Install

npm

```
npm i -D vite-plugin-env-dts
```

yarn

```
yarn add --dev vite-plugin-env-dts
```

pnpm

```
pnpm i -D vite-plugin-env-dts
```

# Usage

```
// vite.config.{ts,js}

import EnvDTS from 'vite-plugin-env-dts'

{
    //...
    plugins:[EnvDTS({
        //... options
    })]
}

```

# Options

## Options.path

### relative to your vite.config.{js,ts} file.

-   type: string
-   default: 'types/vite-env.d.ts'

## Options.prefix

### The constants what in your .env\* files will be output in .d.ts.

-   type: string
-   default: 'VITE\_'

## Options.parser

### custom your parser decide to what styles will be output.

-   type: "constant" | "auto" | ((x: any) => any);
-   default: 'auto'

```
//souce
{foo:1,bar:'baz'}
//auto -> {foo:1,bar:'baz'}
//constant -> {foo:number,bar:string}
```

## Options.arrayType

### select the array style range in tuple and array

-   type: "tuple" | "array";
-   default: 'array'

```
//souce
[100,'baz']
//tuple -> [number,string]
//array -> Array<number|string>
```
