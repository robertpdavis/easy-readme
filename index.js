//easy-readme index.js

const fs = require('fs');
const inquirer = require('inquirer');

console.log("Easy Readme README.md creator.");

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the projects title?:',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Provide a short description of the project:',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Provide details on how to install the application:',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Provide details on how the application is used:',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Provide details on how others can contribute to the project:',
            name: 'contribute',
        },
        {
            type: 'input',
            message: 'Provide details on any tests that can be used for the application:',
            name: 'tests',
        },
        {
            type: 'checkbox',
            message: 'Select the licence type for this project:',
            choices: ['Apache Licence 2.0',
                'BSD 3 Clause',
                'BSD 2 Clause',
                'Contributing',
                'GNU General Public License',
                'GNU Lesser General Public License',
                'MIT License',
                'Mozilla Public License 2.0',
                'Common Development and Distribution Licence 1.0',
                'Eclipse Public License 2.0'
            ],
            name: 'license',
        },
        {
            type: 'input',
            message: 'Enter in your GitHub user name:',
            name: 'github',
        },
        {
            type: 'input',
            message: 'Enter in your email address:',
            name: 'email',
        },
    ])
    .then((response) => {
        fs.writeFile('./output/README.md', createMD(response), (err) =>
            err ? console.error(err) : console.log('Success!')
        )
    });


function createMD(response) {

    mdText =
        `# ${response.title}

## Description
${response.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence](#Licence)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)


## Installation
${response.installation}

## Usage
${response.usage}

## Credits
${response.credits}

## License
${response.license}

## Contributing
${response.contribute}

## Tests
${response.tests}

## Questions
${response.github}
${response.email}

`;
    return mdText;
}

