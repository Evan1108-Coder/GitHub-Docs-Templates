# Quickstart

This is the fastest way to use GitHub Docs Templates.

## If You Are Brand New

Use this starter pack:

```text
starter-packs/personal-project/
```

Copy the files into your own project:

```text
starter-packs/personal-project/README.md -> README.md
starter-packs/personal-project/LICENSE -> LICENSE
starter-packs/personal-project/CONTRIBUTING.md -> CONTRIBUTING.md
```

Then replace the placeholder text inside the files.

## How To Copy Files

If you are using the GitHub website:

1. Open the template file.
2. Click the copy button or open the raw file.
3. Create a new file in your repository with the correct name.
4. Paste the template.
5. Replace the placeholders.

If you are using a terminal, copy the starter pack into your project:

```bash
cp -R starter-packs/personal-project/. /path/to/your/project/
```

## Pick A Starter Pack

| Your project | Copy this folder |
| --- | --- |
| Personal project, homework, or first repo | `starter-packs/personal-project/` |
| Open-source package or library | `starter-packs/open-source-library/` |
| Website or web app | `starter-packs/web-app/` |
| Command-line tool | `starter-packs/cli-tool/` |
| Documentation website | `starter-packs/docs-site/` |

## Pick Individual Templates Instead

If you only want one file, copy from `templates/`.

Examples:

```text
templates/README/README_minimal.md -> README.md
templates/LICENSE/LICENSE_MIT.txt -> LICENSE
templates/CONTRIBUTING/CONTRIBUTING_simple.md -> CONTRIBUTING.md
templates/ISSUE_TEMPLATE/ISSUE_bug_report.md -> .github/ISSUE_TEMPLATE/bug_report.md
templates/PULL_REQUEST_TEMPLATE/PULL_REQUEST_simple.md -> .github/PULL_REQUEST_TEMPLATE.md
```

## Replace Placeholders

Before publishing, search for:

```text
[
```

Common placeholders:

```text
[PROJECT_NAME]
[PROJECT_DESCRIPTION]
[YOUR_NAME]
[CONTACT_EMAIL]
[REPO_URL]
[LICENSE_NAME]
```

## Delete What You Do Not Need

Templates are starting points. It is okay to delete sections that do not fit your project.
