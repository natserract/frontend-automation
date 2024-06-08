// danger has to be the first thing required!
import { danger, markdown } from "danger";

const dangerCommand = process.env.DANGER_COMMAND;

const maxCommitMessageLength = 72;

function checkGitCommitMessage() {
  const commitMessage = danger.git.commits[0]?.message;
  if (!commitMessage) return false;

  // Check if the commit message follows the Conventional Commits specification
  const conventionalCommitsRegex =
    /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?!?: .+/;
  if (!conventionalCommitsRegex.test(commitMessage)) {
    return false;
  }

  // Check if the commit message is too long
  if (commitMessage.length > maxCommitMessageLength) {
    return false;
  }

  return true;
}

async function run() {
  const isCommitMessageValid = checkGitCommitMessage();

  if (!isCommitMessageValid) {
    const message = `## 🚀 Improve Commit Message
    Your Git commit message could be improved to follow best practices:

    - Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
    - Keep the commit message under ${maxCommitMessageLength} characters

    Please update your commit message to match these guidelines.
    `;

    markdown(message);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
