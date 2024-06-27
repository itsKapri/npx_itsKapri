#!/usr/bin/env node

'use strict';

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import ora from 'ora';
import cliSpinners from 'cli-spinners';
import fs from 'fs';
import https from 'https';
import path from 'path';

clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:nileshkapri57@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    const loader = ora({
                        text: 'Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();

                    const file = fs.createWriteStream(path.join(process.cwd(), 'nilesh_resume.pdf'));
                    https.get('https://drive.google.com/file/d/1Ahvsboocwi9aigVJJvadX9nuA4vqi1OO/view?usp=drive_link', (response) => {
                        response.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            console.log(`\nResume downloaded to ${path.join(process.cwd(), 'NileshKapri_resume.pdf')}\n`);
                            open(file.path);
                            loader.stop();
                        });
                    }).on('error', (err) => {
                        fs.unlink(file.path);
                        console.error(`Error downloading the file: ${err.message}`);
                        loader.stop();
                    });
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Nilesh Kapri"),
    handle: chalk.white("@itsKapri"),
    work: `${chalk.white("Associate Application Engineer")} ${chalk.hex("#2b82b2").bold("Raw Engineering")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("nileshKapri_"),
    github: chalk.gray("https://github.com/") + chalk.green("itskapri"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("nilesh-kapri/"),
    itsKapri: chalk.gray("https://itskapri.github.io/")+chalk.blue("nk-portfolio/"),
    linkList: chalk.cyan("https://itskapri.github.io/LinkList/"),
    npx: chalk.red("npx") + " " + chalk.white("itsKapri"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic("I am currently looking for new opportunities,")}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic("question or just want to say hi, I will try ")}`,
        `${chalk.italic("my best to get back to you!")}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
