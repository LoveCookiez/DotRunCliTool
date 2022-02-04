#! /usr/bin/env node
const prompt = require('multiselect-prompt');
const process = require('process');
const Conf = require('conf');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const config = new Conf();

const selected = (items) => items
    .filter((item) => item.selected)
    .map((item) => item.title);

// All these options are optional
const opts = {
    cursor: 0,     // Initial position of the cursor, defaults to 0 (first entry),
    // The message to display as hint if enabled, below is the default value
    hint: '– Space to select, Return to submit.'
}

const savePreviouslySelected = (selected) => {
    config.set('projects', selected);
}

var currDir = process.cwd();
var folderNames = fs.readdirSync(currDir);
var subPaths = [];
var count = 0;
const previouslySelectedProjects = config.get('projects', []);

folderNames.forEach((name) => {
    if (name === "." || name === "..") {
        return;
    }
    if (fs.lstatSync(currDir + "/" + name).isDirectory()) {
        count++;
        let isPreviouslySelected = previouslySelectedProjects.includes(path.basename(currDir + '/' + name));
        subPaths.push({ title: path.basename(currDir + "/" + name), value: count.toString(), selected: isPreviouslySelected });
    }
});

const startProjects = (projects) => {
    for (project in projects) {
        let fullProjectPath = "";
        let folderProjectName = projects[project];
        let srcSubFolder = fs.existsSync(currDir + '/' + folderProjectName + '/src') ? '\\src\\' : '\\';
        fullProjectPath = currDir + `\\${(folderProjectName)}${(srcSubFolder)}${(folderProjectName)}`;
        exec(`start dotnet run -- --interactive `, {
            cwd: `${fullProjectPath}`
        });
    }
    console.log('Done');
    // for unknown reason, if process.exit doesn't wait, it will run before all projects start
    setTimeout(() => process.exit(), 1000)
}

prompt('Which Projects would you like to run?', subPaths, opts)
    .on('data', (data) => console.log(selected(data.value)))
    .on('abort', (items) => console.log('Aborted with', selected(items)))
    .on('submit', (items) => {
        startProjects(selected(items));
        savePreviouslySelected(selected(items));
    })

