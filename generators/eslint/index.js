const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	async prompting() {
		this.answers = await this.prompt([
			{
				type: 'confirm',
				name: 'enable',
				message: 'Add ESLint?'
			}
		]);
	}

	get skip() {
		const { answers: { enable = false } = {} } = this;
		return !enable;
	}

	writing() {
		if (this.skip) return;

		this.fs.copy(
			this.templatePath(),
			this.destinationPath(),
			{
				globOptions: {
					dot: true
				}
			}
		);

		this.fs.extendJSON(
			this.destinationPath('package.json'),
			{
				scripts: {
					'lint': 'eslint src/**/*.js'
				}
			}
		);
	}

	install() {
		if (this.skip) return;

		this.npmInstall(['eslint'], { '--save-dev': true });
	}
};