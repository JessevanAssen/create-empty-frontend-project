#!/usr/bin/env node

const path = require('path');
const yeoman = require('yeoman-environment');

const env = yeoman.createEnv();
env.run(path.join(__dirname, 'generators', 'app'));
