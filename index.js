#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import { cyan, lightGray, lightGreen, lightRed, red } from "kolorist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let TEMPLATES_DIR = path.resolve(__dirname, "templates");

if (!fs.existsSync(TEMPLATES_DIR)) {
  TEMPLATES_DIR = path.resolve(__dirname, "../templates");
}

const TEMPLATES = [
  {
    id: "vanilla",
    name: lightGreen("JavaScript"),
    aliases: ["javascript", "js"],
  },
  {
    id: "vanilla-ts",
    name: lightGreen("TypeScript"),
    aliases: ["typescript", "ts"],
  },
  {
    id: "react",
    name: cyan("React JavaScript"),
  },
  {
    id: "react-ts",
    name: cyan("React TypeScript"),
  },
];

const init = async () => {
  const argv = minimist(process.argv.slice(2));

  const questions = [];

  if (!argv._[1]) {
    questions.push({
      type: "text",
      name: "projectName",
      message: "Project Name",
      initial: "verza-scripts",
      min: 1,
    });
  }

  if (!argv._[0]) {
    questions.push({
      type: "select",
      name: "template",
      message: "Template",
      choices: TEMPLATES.map((template) => ({
        title: template.name,
        value: template.id,
      })),
    });
  }

  //

  let { projectName, template } = await prompts(questions);

  projectName = projectName ?? argv._[1];
  template = template ?? argv._[0];

  if (!projectName || !template) {
    console.log(`\n${red("✖")} Cancelled`);
    return;
  }

  const resolvedTemplate = TEMPLATES.find(
    (t) => t.id === template || t.aliases?.includes(template)
  );

  if (!resolvedTemplate) {
    console.log(
      `\n${red("✖")} Invalid template: "${lightGreen(
        template
      )}". Please specify one of:`
    );
    TEMPLATES.forEach((t) => {
      console.log(`  - ${lightGreen(t.id)} (${t.name})`);
    });
    console.log();
    return;
  }

  const templateId = resolvedTemplate.id;

  //

  const projectDir = path.join(process.cwd(), projectName);
  const templateDir = path.join(TEMPLATES_DIR, templateId);

  //

  if (fs.existsSync(projectDir)) {
    console.log(
      `\n${red("✖")} Directory ${lightRed(
        projectName
      )} already exists. Try another name or delete the existing directory.\n`
    );
    return;
  }

  //

  copyDir(templateDir, projectDir);

  //

  // show finished message
  console.log(`\n${lightGreen("✔")} Project created. To get started:\n`);
  console.log(lightGray(`  cd ${projectName}`));
  console.log(lightGray("  npm install"));
  console.log(lightGray("  npm run dev"));
  console.log("\n");
};

const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);

    copy(srcFile, destFile);
  }
};

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

init();
