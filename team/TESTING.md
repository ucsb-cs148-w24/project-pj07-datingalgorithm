We will be using Jest for our unit testing.

We tried using Codium to generate our unit tests, however, we kept getting issues regarding the TextEncoder being required.
We then used cursor in order to figure out that we needed to include "global.TextEncoder = require('util').TextEncoder" within our jest.setup file. We also realized that we needed a setupTests.js file to ensure we have the correct imports

After that, we were able to get our tests working properly. We will now be exapanding out test to encompass all the pages.

We added Cypress for component testing. Here is an example of the header working. 

<img width="1070" alt="image" src="https://github.com/ucsb-cs148-w24/project-pj07-datingalgorithm/assets/13338417/c8b62279-b491-46af-8a35-f9a890103b11">
