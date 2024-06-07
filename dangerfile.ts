// danger has to be the first thing required!
import { danger, markdown } from "danger";
import path from "node:path";

const dangerCommand = process.env.DANGER_COMMAND;

function checkSecretFiles() {
  const changedFiles = danger.git.modified_files.concat(
    danger.git.created_files,
  );
  const sensitiveFileExtensions = [".pem", ".key", ".crt", ".pfx"];

  const sensitiveFilesIncluded = changedFiles.some((file) => {
    const fileExtension = path.extname(file).toLowerCase();
    return sensitiveFileExtensions.includes(fileExtension);
  });

  const message = `
    ## 🔒 Sensitive Files Detected
    Please do not include private keys, certificates, or other sensitive files in your pull request. These should be managed securely outside of the codebase.
    The following sensitive files were detected in your changes:
    `;

  if (sensitiveFilesIncluded) {
    const sensitiveFiles = danger.git.modified_files
      .concat(danger.git.created_files)
      .filter((file) => {
        const fileExtension = path.extname(file).toLowerCase();
        return sensitiveFileExtensions.includes(fileExtension);
      });

    const formattedFiles = sensitiveFiles
      .map((file) => `- \`${file}\``)
      .join("\n");

    markdown(`${message}
   ${formattedFiles}
   `);
  } else {
    markdown(`${message}
   ${"✓"}
   `);
  }
}

async function run() {
  checkSecretFiles();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
