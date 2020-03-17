const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	async prompting() {
		this.answers = await this.prompt([
			{
				type: 'confirm',
				name: 'enable',
				message: 'Add Jest?'
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
					'test': 'jest'
				}
			}
		);

		if (this.fs.exists(this.destinationPath('.eslintrc.json'))) {
			this.fs.extendJSON(
				this.destinationPath('.eslintrc.json'),
				{
					"overrides": [
						{
							"files": ["*.test.js"],
							"env": {
								"jest": true
							}
						}
					]
				}
			);
		}
	}

	install() {
		if (this.skip) return;

		this.npmInstall(['@babel/core', '@babel/preset-env', 'jest'], { '--save-dev': true });
	}
};