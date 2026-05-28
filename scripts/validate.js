const fs = require("fs");
const path = require("path");

const root = process.cwd();
const starterPacks = [
  "starter-packs/personal-project",
  "starter-packs/open-source-library",
  "starter-packs/web-app",
  "starter-packs/cli-tool",
  "starter-packs/docs-site",
];

const expectedStarterFiles = {
  "starter-packs/personal-project": [
    "README.md",
    "LICENSE",
    "CONTRIBUTING.md",
  ],
  "starter-packs/open-source-library": [
    "README.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/ISSUE_TEMPLATE/feature_request.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
  ],
  "starter-packs/web-app": [
    "README.md",
    "SECURITY.md",
    "SUPPORT.md",
    ".github/ISSUE_TEMPLATE/bug_report.md",
  ],
  "starter-packs/cli-tool": [
    "README.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
  ],
  "starter-packs/docs-site": [
    "README.md",
    "CONTRIBUTING.md",
    ".github/ISSUE_TEMPLATE/documentation.md",
  ],
};

function walk(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function checkMarkdownLinks() {
  const missing = [];
  const files = walk(root).filter((file) => file.endsWith(".md"));
  const linkPattern = /\[[^\]]+\]\((?!https?:|mailto:|#)([^)]+)\)/g;

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    let match;

    while ((match = linkPattern.exec(text))) {
      const rawTarget = match[1].split("#")[0];
      if (!rawTarget) continue;

      const target = decodeURIComponent(rawTarget);
      const fullTarget = path.normalize(path.join(path.dirname(file), target));

      if (!fs.existsSync(fullTarget)) {
        missing.push(`${path.relative(root, file)} -> ${match[1]}`);
      }
    }
  }

  if (missing.length) {
    fail(`Missing markdown links:\n${missing.join("\n")}`);
  } else {
    console.log("Markdown relative links OK");
  }
}

function checkStarterPacks() {
  for (const pack of starterPacks) {
    const fullPath = path.join(root, pack);

    if (!fs.existsSync(fullPath)) {
      fail(`Missing starter pack: ${pack}`);
      continue;
    }

    for (const file of expectedStarterFiles[pack]) {
      const filePath = path.join(fullPath, file);

      if (!fs.existsSync(filePath)) {
        fail(`Starter pack is missing ${file}: ${pack}`);
      }
    }

    console.log(`Starter pack OK: ${pack}`);
  }
}

function checkRootFiles() {
  const required = [
    "README.md",
    "QUICKSTART.md",
    "TEMPLATE_INDEX.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
  ];

  for (const file of required) {
    if (!fs.existsSync(path.join(root, file))) {
      fail(`Missing root file: ${file}`);
    }
  }

  console.log("Root files OK");
}

function checkTemplateReadmes() {
  const templatesDir = path.join(root, "templates");
  const missing = [];

  for (const entry of fs.readdirSync(templatesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const readmePath = path.join(templatesDir, entry.name, "README.md");
    if (!fs.existsSync(readmePath)) {
      missing.push(`templates/${entry.name}/README.md`);
    }
  }

  if (missing.length) {
    fail(`Missing template folder guides:\n${missing.join("\n")}`);
  } else {
    console.log("Template folder guides OK");
  }
}

function checkUnwantedText() {
  const unwanted = ["Placholder", "github-docs-templates"];
  const matches = [];

  for (const file of walk(root)) {
    if (file.includes(`${path.sep}.git${path.sep}`)) continue;
    if (path.relative(root, file) === "scripts/validate.js") continue;

    const text = fs.readFileSync(file, "utf8");

    for (const word of unwanted) {
      if (text.includes(word)) {
        matches.push(`${path.relative(root, file)} contains ${word}`);
      }
    }
  }

  if (matches.length) {
    fail(`Unwanted text found:\n${matches.join("\n")}`);
  } else {
    console.log("Unwanted text check OK");
  }
}

checkMarkdownLinks();
checkRootFiles();
checkStarterPacks();
checkTemplateReadmes();
checkUnwantedText();

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("All validation checks passed");
