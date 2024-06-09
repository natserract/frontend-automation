# CI/CD pipeline

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=natserract_frontend-automation&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=natserract_frontend-automation)

This is an official starter Turborepo.

## Knowledgements

### Gitflow workflow

![Git workflow](https://res.cloudinary.com/dqo6txtrv/image/upload/v1717904646/Natserract%20Blog/mermaid-diagram-2024-06-09-114256_i3mxyu.png)

The Gitflow workflow is a popular branching model for managing Git repositories. It consists of the following main components:

1. *Master Branch*: The master branch represents the official release history. This branch should always be deployable.
Develop Branch: The develop branch serves as an integration branch for features. New features are first merged into this branch before being incorporated into the master branch.

2. *Feature Branches*: When starting a new feature, developers create a new branch off the develop branch. These feature branches should have descriptive names, such as feature/user-authentication or feature/shopping-cart. Once the feature is complete, the branch is merged back into develop.

3. *Release Branches*: When the develop branch has reached a state that is ready for an official release, a new release branch is created off of develop. This branch is used for testing, documentation, and other release-related tasks. Bug fixes made on the release branch are also merged back into develop.

4. *Hotfix Branches*: If a critical bug is found in the master branch (the production version), a new hotfix branch is created off of master. This allows you to quickly fix the issue without including any of the ongoing development from the develop branch. Once the fix is complete, the hotfix branch is merged back into both master and develop.

5. *Tagging*: The master branch is typically tagged with version numbers (e.g., v1.2.3) to mark official releases.

*References*:
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- https://nvie.com/posts/a-successful-git-branching-model/
- https://docs.github.com/en/get-started/using-github/github-flow

## What's inside:

- [x] github actions https://github.com/features/actions
- [x] renovate https://www.mend.io/renovate/
- [x] pnpm https://pnpm.io/
- [x] dangerjs https://github.com/danger/danger-js
- [x] husky https://typicode.github.io/husky/
- [x] argos-ci https://argos-ci.com/
- [x] sonarcloud https://sonarcloud.io/
