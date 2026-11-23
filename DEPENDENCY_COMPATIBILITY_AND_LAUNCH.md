# Dependency compatibility update — VEC V49.2

## What changed
- React and React DOM are both pinned to 19.3.1. The previous 19.2.3 versions did not satisfy the peer range reported by the installed Sanity Portable Text editor (`^19.3.1`).
- Added a Node.js engine floor of 20.9.0 for this Next.js 16 project. Use a current Node.js 22 LTS release for deployment and local development.
- No `--force`, `--legacy-peer-deps`, or npm audit auto-fix override is configured.

## First install on Windows
Open Command Prompt in this project folder and run:

```bat
node -v
npm -v
npm install
npm ls react react-dom next sanity @portabletext/editor
npm run typecheck
npm run lint
npm run build
```

`npm install` should create `package-lock.json`. Keep that file in source control and use `npm ci` for repeatable installs thereafter.

## Security advisories
The earlier install reported 18 vulnerabilities. This archive does not claim those are resolved: an audit result must be reviewed against the exact dependency lockfile. After `npm install`, run:

```bat
npm audit
```

Review the report and update affected packages in a controlled change. Do not run `npm audit fix --force`; it can introduce breaking major-version upgrades. A deployment should not be considered release-ready until the audit findings have been triaged and the production build passes.

## Verification status
The package manifest has been updated. A fresh npm dependency resolution and full Next.js production build could not be completed in this packaging environment, so those checks must be run after installation on the target machine.
