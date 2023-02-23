import { defineConfig } from './base-config.mjs';
import { build } from 'vite';
import chalk from 'chalk';
import { execa } from 'execa';

(async () => {
  const DIST = 'dist';

  const helpers = [
      'compose',
      'identity',
      'invert',
      'mutate',
      'rotate',
      'scale',
      'scale-at-origin',
      'transform',
      'translate',
      'utility',
  ];

  // Main UMD build.
  buildMsg('UMD');
  await build(
    defineConfig({
      entry: `src/index.ts`,
      name: 'index',
      outDir: DIST,
      globalName: 'DNA',
    })
  );

  buildMsg('@atlas-viewer/dna');
  await build(
    defineConfig({
      entry: `src/index.ts`,
      name: 'index',
      outDir: `${DIST}/bundle`,
    })
  );

  for (const helper of helpers) {
      buildMsg(`@atlas-viewer/dna/${helper}`);
      await build(
          defineConfig({
              entry: `./src/${helper}.ts`,
              name: 'index',
              outDir: `${DIST}/${helper}`,
          })
      );
  }

  buildMsg('Types');

  listItem('@atlas-viewer/dna');
  await execa('./node_modules/.bin/dts-bundle-generator', [`--out-file=${DIST}/index.d.ts`, './src/index.ts']);


  for (const helper of helpers) {
      listItem(`@atlas-viewer/dna/${helper}`);
      await execa('./node_modules/.bin/dts-bundle-generator', [
          `--out-file=${DIST}/${helper}.d.ts`,
          `./src/${helper}.ts`,
      ]);
  }

  function buildMsg(name) {
    console.log(chalk.grey(`\n\nBuilding ${chalk.blue(name)}\n`));
  }
  function listItem(name) {
    console.log(chalk.gray(`- ${chalk.green(name)}`));
  }
})();
