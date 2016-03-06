#! /usr/bin/env node
'use strict';

var fs = require('fs')
	, path = require('path')
	, pkg = require(path.join(__dirname, '../package.json'))
	, cmd = require('commander')
	, chalk = require('chalk');

var lower_case = /^([a-z]+|[^a-z0-9][a-z]+)$/
	, lower_case_with_hyphen = ''
	, lower_case_with_underscore = ''
	, camel_case = ''
	, upper_case = ''
	, exclude = ['node_modules', 'bower_component', '.git', '.svn', '.hg'];

cmd
	.version(pkg.version)
	.description(pkg.description)
	.usage('[--path][--custom-regex][--exclude][--use-gitignore]')
	.option('-c, --custom-regex', 'format type to check.', lower_case)
	.option('-i, --use-gitignore', 'don\'t use ".gitignore"', true)
	.option('-x, --exclude', 'files or Folder to exclude. ', exclude)
	.option('-p, --path <folder path>', 'folder path to run a filename check', process.cwd())
	.parse(process.argv);

var checkFileName = module.exports = {
	Folders: [],
	Files: [],
	files_with_error: [],
	folders_with_error: [],

	readAllFiles: function (srcPath) {
		fs.readdir(srcPath, function (error, files) {
			files.forEach(function (elem, index) {
				if (fs.lstatSync(path.join(srcPath, elem)).isDirectory()) {
					if (!checkFileName.isLowerCase(elem))
						checkFileName.folders_with_error.push(elem);
					checkFileName.Folders.push(elem);
					checkFileName.readAllFiles(path.join(srcPath, elem));
				}
				else {
					if (!checkFileName.isLowerCase(elem))
						checkFileName.files_with_error.push(elem);

					checkFileName.Files.push(elem);
				}
			});
		});
		checkFileName.displayResults();
	},

	timer: setTimeout(function () { }, 0),

	displayResults: function () {
		if (checkFileName.timer) {
			clearTimeout(checkFileName.timer);
			checkFileName.timer = setTimeout(function () {
				console.log("====================================");
				console.log(chalk.blue('Total Folders Scanned:'), chalk.white(checkFileName.Folders.length));
				console.log(chalk.blue('Total Files Scanned:'), chalk.white(checkFileName.Files.length));
				console.log("====================================");
				console.log(chalk.red('Folders (lower case violation):'), chalk.red(checkFileName.folders_with_error.length));
				console.log(chalk.red('Files (lower case violation):'), chalk.red(checkFileName.files_with_error.length));
				console.log("====================================");
			}, 1000);
		}
	},

	isLowerCase: function (stringToCheck) {
		return lower_case.test(stringToCheck);
	}
};

//debug notes
// console.log("Default args:\n--------------------");
if (cmd.customRegex) {
	// console.log('Custom Regex:',cmd.customRegex);
}
if (cmd.exclude) {
	// console.log('Exclude:',cmd.exclude);
}
if (cmd.useGitignore) {
	// console.log('Use Gitignore:',cmd.useGitignore);
}
if (cmd.path) {
	// console.log("Path: " + cmd.path);
	checkFileName.readAllFiles(cmd.path);
}
// console.log("--------------------");