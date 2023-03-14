/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config();
const cli = require('next/dist/cli/next-dev');
cli.nextDev(['-p', process.env.PORT || 3000]);
