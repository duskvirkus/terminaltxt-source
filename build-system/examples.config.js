module.exports = (libraryConfig) => {
  let examplesConfig = {
    shellCommands: {},
    exampleTaskLists: {},
  };

  for (var i = 0; i < libraryConfig.examples.length; i++) {
    const exampleName = 'examples-' + libraryConfig.examples[i].name;

    examplesConfig.shellCommands[exampleName] = {
      command: 'git clone ' + libraryConfig.examples[i].repository + ' ' + libraryConfig.examplesDir + '/' + libraryConfig.examples[i].name,
    };
    
    examplesConfig.exampleTaskLists[exampleName] = {
      tasks: ['shell'],
    };
  }

  return examplesConfig;
}