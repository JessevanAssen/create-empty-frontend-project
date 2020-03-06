const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	initializing() {
		this.composeWith(require.resolve('../eslint'));
	}

	configuring() {
		this.spawnCommandSync('git', ['init'], { cwd: this.destinationPath() });
	}

	writing() {
		this.fs.copy(
			this.templatePath(),
			this.destinationPath(),
			{
				globOptions: {
					ignore: ['**/_gitignore'],
					dot: true
				}
			}
		);
		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore')
		);
	}

	install() {
		this.npmInstall([]);
	}
};