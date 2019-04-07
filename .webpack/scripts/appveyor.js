import { join } from 'path';
import { writeFileSync } from 'fs';
import { root_path } from '../constants/paths';
const ghToken = 'qINuNo/jaOTGiBCe3+GfIPTzYdVQ/HZKUXrqR+bmjLWdOwqXC5SkiXLdeSv0sokZ';
const config = `version: 0.1.{build}

environment:
  nodejs_version: "10.15.1"
  GH_TOKEN:
    secure: ${ghToken}
  APPVEYOR_YML_DISABLE_PS_LINUX: true

image:
  - Visual Studio 2015
  - Ubuntu

platform:
  - x86
  - x64

init:
  - sh: sudo apt-get update
  - cmd: git config --global core.autocrlf input

stack: node 10, python 2.7.15

install:
  - ps: Install-Product node $env:nodejs_version
  - npm install -g npm@latest
  - npm install
  - npm install -g typescript@3.2.4

build_script:
  - npm run release

test: off

deploy: off
`;
writeFileSync(join(root_path, 'appveyor.yml'), config);