//easy-readme index.js

const fs = require('fs');
const inquirer = require('inquirer');

console.log("Easy Readme README.md creator. Please answer the questions below to create your README.md file in the output folder.");

//Create inquirer questions array
const questions = [
    {
        type: 'input',
        message: 'What is the projects title?:',
        name: 'title',
        //validate input
        validate(value) {
            if (value === "")
                return "A project title is required.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Provide a short description of the project:',
        name: 'description',
        //validate input
        validate(value) {
            if (value === "")
                return "A project description is required.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Provide details on how to install the application:',
        name: 'installation',
        //validate input
        validate(value) {
            if (value === "")
                return "Provide details of how to install the project.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Provide details on how the application is used:',
        name: 'usage',
        //validate input
        validate(value) {
            if (value === "")
                return "Provide details of how to the application is used or type 'skip'.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Provide details of others who contributed (first last githubusername seperated by comma e.g First Second gitubuser1,First Second gitubuser2):',
        name: 'credits',
    },
    {
        type: 'input',
        message: 'Provide details on how others can contribute to the project:',
        name: 'contribute',
        //validate input
        validate(value) {
            if (value === "")
                return "Provide details of how others can contribute to the project or type 'skip'.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Provide details on any tests that can be used for the application:',
        name: 'tests',
        //validate input
        validate(value) {
            if (value === "")
                return "Provide details on what tests can be used for the application or type 'skip'.";
            else {
                return true;
            }
        },
    },
    {
        type: 'list',
        message: 'Select the licence type for this project:',
        choices: ['Apache Licence 2.0',
            'BSD 3 Clause',
            'BSD 2 Clause',
            'GNU General Public License v3',
            'GNU General Public License v2',
            'GNU Lesser General Public License v3',
            'MIT License',
            'Mozilla Public License 2.0',
            'Eclipse Public License 2.0'
        ],
        name: 'licence',
        //validate input
        validate(value) {
            if (value === "")
                return "You must assign a licence type to your project.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Enter in your GitHub user name:',
        name: 'github',
        //validate input
        validate(value) {
            if (value === "")
                return "You must provide a github user name.";
            else {
                return true;
            }
        },
    },
    {
        type: 'input',
        message: 'Enter in your email address:',
        name: 'email',
        //validate input
        validate(value) {
            if (value === "")
                return "You must provide an email address.";
            else {
                return true;
            }
        },
    },
];

//Run questions, parse responses to create text file then save to output folder.
inquirer.prompt(questions).then((response) => {
    fs.writeFile('./output/README.md', createMD(response), (err) =>
        err ? console.error(err) : console.log('Success!')
    )
});


function createMD(response) {

    //Get the relevant licence badge from shields.io
    let licence = ""
    switch (response.licence) {
        case 'Apache Licence 2.0':
            licence = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case 'BSD 3 Clause':
            licence = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            break;
        case 'BSD 2 Clause':
            licence = "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case 'GNU General Public License v3':
            licence = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case 'GNU General Public License v2':
            licence = "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
            break;
        case 'GNU Lesser General Public License v3':
            licence = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
            break;
        case 'MIT License':
            licence = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case 'Mozilla Public License 2.0':
            licence = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;
        case 'Eclipse Public License 2.0':
            licence = "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-2.0)";
            break;
        default:
            break;
    }

    //Compile contributors
    let contributor;
    let credits = "";
    if (response.credits === "" || response.credits === undefined) {
        credits = "There were no other contributors to this project";
    } else {
        contributor = response.credits.split(',');

        contributor.forEach((value, index, array) => {
            if (array.length > 1) {
                credits = credits + `${value}<br>`;
            } else {
                credits = credits + `${value}`;
            }
        })
    }

    //Create README text file using template literals to populate entered data
    mdText =
        `# ${response.title}

${licence}

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
${response.usage === "skip" ? "No usage details provided." : response.usage}

## Credits
${credits}

## Licence
${response.licence}

## Contributing
${response.contribute === "skip" ? "No contribution details provided." : response.contribute}

## Tests
${response.tests === "skip" ? "No test details provided." : response.tests}

## Questions
* Github: [${response.github}](https://github.com/${response.github})
* Email: ${response.email}

Created by ['Easy Readme'](https://github.com/robertpdavis/easy-readme)

`;
    return mdText;
}

