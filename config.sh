#!/bin/bash

# Install third party module

sudo apt install libgbm1 libnss3-dev libgconf-2-4 libfontconfig1 libxss1

sudo apt install libasound2 libnss3-dev libgconf-2-4 libfontconfig1 libxss1

sudo apt install libatk-bridge2.0-0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libxkbcommon0

sudo apt update && sudo apt install libatk-bridge2.0-0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libxkbcommon0

# Modify the code as below
#   const browser = await puppeteer.launch({
#     args: ['--no-sandbox'],
#     headless: true,
#   })