# CI/CD pipeline

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/FW584pHa6KjeRAGUTkms28/9bgHCchCj26tx5maxVQHux/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/FW584pHa6KjeRAGUTkms28/9bgHCchCj26tx5maxVQHux/tree/main) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=natserract_frontend-automation&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=natserract_frontend-automation) [![Covered by Argos Visual Testing](https://argos-ci.com/badge.svg)](https://app.argos-ci.com/natserract/frontend-automation/reference)

## What's inside:

This turborepo uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages:

- [Github Actions](https://github.com/features/actions): automate software workflows, including building, testing, and deploying code directly from GitHub.
- [CircleCI](https://circleci.com/) standalone CI/CD platform allows you to automate your build, test, and deployment pipeline. CircleCI is scalable, so it can meet the needs of large development teams.
- [Renovate](https://www.mend.io/renovate/): automatically detect and propose updates for dependencies in your project
- [Danger.js](https://github.com/danger/danger-js): automate code review tasks and enforce consistency. Provide feedback and suggestions to developers
- [Husky](https://typicode.github.io/husky): automatically run Git hooks (e.g., pre-commit, pre-push) to enforce code quality standards
- [Argos](https://argos-ci.com/): implement visual regression testing to detect and prevent unintended visual changes in your web application
- [SonarCloud](https://sonarcloud.io): continuously inspect the quality of your codebase, identifying bugs, vulnerabilities, and code smells
- [Changesets](https://github.com/changesets/changesets): manage the versioning and release process for your monorepo, ensuring that interdependent packages are updated and released in a coordinated manner

## PR Workflow

All pull requests should include a changeset. To create a changeset, ensure you don't have any uncommitted changes and then run the following command:

```bash
# from the root of the repo
pnpm changeset
```

Choose the package or packages that were affected by your work. _(Tip: you may have to wait a couple of seconds after selecting your packages, sometimes it doesn't get registered and it'll ask you to pick again)_

> Note: You do not need to select packages which depend on changes you made in other packages, the release process will do this automatically for you later on. Just choose packages you worked on directly.

## E2E-Testing

Be sure to set the environment variable `NEXTAUTH_URL` to the correct value. If you are running locally, as the documentation within .env.example mentions, the value should be `http://localhost:3000`.

```bash
# In a terminal just run:
pnpm test:e2e

# To open the last HTML report run:
pnpm playwright show-report test-results/reports/playwright-html-report
```

## Knowledgements

### Gitflow workflow

![Git workflow](https://res.cloudinary.com/dqo6txtrv/image/upload/v1717904646/Natserract%20Blog/mermaid-diagram-2024-06-09-114256_i3mxyu.png)

The Gitflow workflow is a popular branching model for managing Git repositories. It consists of the following main components:

1. **Master Branch**: The master branch represents the official release history. This branch should always be deployable.
   Develop Branch: The develop branch serves as an integration branch for features. New features are first merged into this branch before being incorporated into the master branch.

2. **Feature Branches**: When starting a new feature, developers create a new branch off the develop branch. These feature branches should have descriptive names, such as feature/user-authentication or feature/shopping-cart. Once the feature is complete, the branch is merged back into develop.

3. **Release Branches**: When the develop branch has reached a state that is ready for an official release, a new release branch is created off of develop. This branch is used for testing, documentation, and other release-related tasks. Bug fixes made on the release branch are also merged back into develop.

4. **Hotfix Branches**: If a critical bug is found in the master branch (the production version), a new hotfix branch is created off of master. This allows you to quickly fix the issue without including any of the ongoing development from the develop branch. Once the fix is complete, the hotfix branch is merged back into both master and develop.

5. **Tagging**: The master branch is typically tagged with version numbers (e.g., v1.2.3) to mark official releases.

**References**:

- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- https://nvie.com/posts/a-successful-git-branching-model/
- https://docs.github.com/en/get-started/using-github/github-flow
