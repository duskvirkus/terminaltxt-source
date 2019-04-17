module.exports = (libraryConfig) => {
  let examplesConfig = {
    shellCommands: {},
    cleanTasks: {},
    exampleTaskLists: {},
  };

  for (var i = 0; i < libraryConfig.examples.length; i++) {
    const exampleName = libraryConfig.examples[i].name;
    const path = libraryConfig.examplesDir + '/' + libraryConfig.examples[i].name;

    examplesConfig.shellCommands[exampleName] = {
      command: 'git clone ' + libraryConfig.examples[i].repository + ' ' + path,
    };

    examplesConfig.cleanTasks[exampleName] = {
      src: ['./' + path]
    }
    
    examplesConfig.exampleTaskLists[exampleName] = {
      tasks: [
        'clean',
        'shell'
      ],
    };
  }

  return examplesConfig;
}