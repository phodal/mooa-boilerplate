const _prompt = require('prompt');
const colors = require('colors');
const replace = require('replace-in-file');
const path = require('path');

const modifyFiles = [
  'package.json',
  'src/main.ts',
  'src/index.html',
  'src/app/app.component.ts'
];

_prompt.start();

const _promptSchemaLibraryName = {
  properties: {
    library: {
      description: colors.cyan(
        'What do you want the application to be called? (use kebab-case)'
      ),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: 'string',
      required: true,
      message:
        '"kebab-case" uses lowercase letters, and hyphens for any punctuation'
    }
  }
};

libraryNameCreate();

function libraryNameCreate() {
  _prompt.get(_promptSchemaLibraryName, (err: any, res: any) => {
    if (err) {
      console.log(colors.red('Sorry, there was an error building the workspace :('));
      process.exit(1);
      return;
    }

    setupApplication(res.library);
  });
}

function setupApplication(libraryName: string) {
  modifyContents(libraryName);
}

function modifyContents(libraryName: string) {
  console.log(colors.underline.white('Modified'));

  const files = modifyFiles.map(f => path.resolve(__dirname, '..', f));
  try {
    const changes = replace.sync({
      files,
      from: [/mooa-boilerplate/g],
      to: [libraryName]
    });
    console.log(colors.yellow(modifyFiles.join('\n')));
  } catch (error) {
    console.error('An error occurred modifying the file: ', error);
  }
}
