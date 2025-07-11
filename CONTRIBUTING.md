# Contributing

This project leverages two GitHub Actions workflows to ensure code quality and automate the deployment process:

1. Continous Integration via [ci.yaml](.github/workflows/ci.yaml): runs tests, checks code and commit style and runs security scans.
2. Continous Deployment via [cd.yaml](.github/workflows/ci.yaml): runs tests, tags the commit and publishes the package to npm.

The rest of this document describes how to pass these checks by writing code that adheres to the project's coding standards and commit message conventions.

## Coding Standards

This project uses the following guiding principles for coding standards:

- **Readability**: Code should be easy to read and understand. Use meaningful variable names, consistent indentation, and clear comments.
- **Simplicity**: Keep the code as simple as possible. Avoid unnecessary complexity and over-engineering.
- **Consistency**: Follow the established coding style and conventions throughout the codebase.

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. Please follow the guidelines below when making commits:

- Use the format `<type>(<scope>): <subject>`.
- The `<type>` should be one of the following: `feat`, `fix`, `chore`, or `docs`.
- The `<scope>` is optional and can be used to specify the area of the codebase affected by the commit.
- The `<subject>` should be a brief description of the change, written in the imperative mood (e.g., "add feature" instead of "added feature").

## Feeedback

To request features or report bugs, please open an issue using our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) or [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).
