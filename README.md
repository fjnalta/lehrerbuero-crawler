# lehrerbuero-crawler
node.js script to download all files in root directory of "lehrerbuero.de" account.

## Installation

### Create Config
Create config.json in root directory with the following settings

``
{
username : "<username>",
password : "<password>"
}
``

### Install node modules
``
npm install --save
``

## Usage
Start script by using node.js

``
node index.js
``

## node Dependencies
* got
* promisify
* puppeteer
* tough-cookie