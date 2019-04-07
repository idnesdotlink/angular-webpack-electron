import { join } from 'path';
import { writeFileSync } from 'fs';
import { root_path } from '../constants/paths';
const secureToken = 'u+28XDc4iIMZ2IVTgfBj/CeBGrX7qu6VR1F6LQbp0JPfNVW/cOgwY5J/nUy6B5gnKgIfkwVeR92PdQpNaWYcZEGTT1U7svwWKX434yF8dC7Uvwp4mrL1d15/vVU4g0wm8SVIOAiwScAs4QIQ+oP5PlGj9MkzcfoNEDJReokVEQxVvRtelfM4IAxJU0YxgWz2F9+tJNKyFgKkcQjXJ1V3jqbItneX0O0f5IumxhN8CsNgZF+HnIY1E3S+43YmIJpseXpMKSy3IeaF1d5eaY+RYHKIqvva9pK1IGSargEpHT4oJD0JLmn9BXzaPK1Y82qsEYi4OgsY3Ok3nD72npnhYYLHfXD8zomK6xcM6iPSPA1LG8XU8AmvduSdcH5NVH1cz+zOY3/VaUR9J41e5cf6QZJvupzn4AVgZbBuOoP+OfzYejJ4PlCPxcAYwbRmJTNLrXhzm3qCY4Zwn1IPaYym0G3tDw66zfDe/OhDV1kzVFUZGmXDVb6sl7NMl1QYdLUVvWm/xV8wvj6ra9L1UelVg6dBMasPuwJy4zxTLhNKfCwGGa8EuM3TBhT648SpZNRVLWIa258Br1gaPFdEjGb9hE8iaLqfsPa77NTAqVWSlReB1UelH5CIIbnOr3J32wbfLtqqDbo/pJ7mAIb3eYjwSTBBOScSwdVTbWPPe3GgQ38=';
const config = `osx_image: xcode8.3
sudo: required
dist: xenial
language: c
matrix:
  include:
  - os: osx
  - os: linux
    env: CC=clang CXX=clang++ npm_config_clang=1
    compiler: clang
addons:
  apt:
    update: true
    packages:
    - libgnome-keyring-dev
    - icnsutils
    - libcups2-dev
    - graphicsmagick
    - xz-utils
before_install:
- export LANG=en_US.UTF-8
- nvm install
- nvm use
- source ~/.bashrc
install:
- npm install -g xvfb-maybe
- npm install -g npm@latest
- npm install
- npm install -g typescript@3.2.4
script:
- npm run release
branches:
  only:
  - master
env:
  global:
    secure: ${secureToken}
`;
writeFileSync(join(root_path, '.travis.yml'), config);

