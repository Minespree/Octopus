# Octopus

[![Discord](https://img.shields.io/discord/352874955957862402.svg)](https://discord.gg/KUFmKXN)
[![License](https://img.shields.io/github/license/Minespree/Octopus.svg)](LICENSE)
![Documentation](https://img.shields.io/badge/docs-missing-red.svg)

This is the code that powered the unfinished private and public REST APIs of the former Minespree Network. Please note that this project was never tested and was in heavy development when the server closed and work on it ceased. As so, this project isn't ready for production as there are some key features missing and there is a lack of some really important security additions such as [CSRF](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>) protection.

Besides the removal of some branding and configuration data, it is more or less unmodified. It is probably not _directly_ useful to third parties in its current state, but it may be help in understanding how the Minespree network operated.

We are quite open to the idea of evolving this into something more generally useful. If you would like to contribute to this effort, talk to us in [Discord](https://discord.gg/KUFmKXN).

Please note that this project might have legacy code that was planned to be refactored and as so, we kindly ask you not to judge the programming skills of the author(s) based on this single codebase.

## Requirements

To build Octopus, the following will need to be installed and available from your shell:

* [Node.js](https://nodejs.org/en/download/) version 8.9.4 or later (older versions _might_ work)
* [npm](https://docs.npmjs.com/getting-started/installing-node) (normally installed with Node.js)
* [Git](https://git-scm.com/)

You can find detailed installation instructions for these tools on the [Getting started](https://github.com/Minespree/Docs/blob/master/setup/DEPENDENCIES.md) docs page.

## Getting started

This project uses [Babel](https://babeljs.io/) to transpile ES6 code to ES5 Node.js supported code. The `package.json` file has some defined scripts so you can use:

```shell
# Install the dependencies using npm
npm install

# OR Install the dependencies using yarn
yarn

# Transpile the project with Babel
npm run build
```

Once the transpilation is done, change your database details, port, HTTPS config... on the `dist/config/production.js` and `dist/config/development.js` files. Once done, you can start the server using:

```
npm run start
```

**Please note** that this project was never used in production and is not complete. Please, only use this project on a development environment.

## Architecture

This repo contains the following components:

* Public API routes
* Private API routes to be used by staff members

Please check the [Routes](ROUTES.md) document for a detailed listing of all the routes.

~~Staff passwords are hashed with PBKDF2-SHA256 with 36,000 iterations. In the future, this might change, but this is reasonably secure enough for the immediate future.~~ We never implemented the password storage.

There were plans to create a React dashboard that communicated with this app using websockets but the server closed down before the development work started on this.

## Authors

This project was maintained by the Minespree Network team. If you have any questions or problems, feel free to reach out to the specific writers and maintainers of this project:

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/hugmanrique">
          <img width="150" height="150" src="https://github.com/hugmanrique.png?v=3&s=150">
          </br>
          Hugmanrique
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/exception">
          <img width="150" height="150" src="https://github.com/exception.png?v=3&s=150">
          </br>
          exception
        </a>
      </td>
    </tr>
  <tbody>
</table>

## Coding Conventions

* We use the [Google JavaScript](https://google.github.io/styleguide/jsguide.html) coding standard and enforce it by using [ESLint](https://eslint.org/)
* Formatting issues will get taken care of by [Prettier](https://github.com/prettier/prettier)

## License

Octopus is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

A copy of the GNU Affero General Public License is included in the file LICENSE, and can also be found at https://www.gnu.org/licenses/agpl-3.0.en.html

**The AGPL license is quite restrictive, please make sure you understand it. If you run a modified version of this software as a network service, anyone who can use that service must also have access to the modified source code.**
