import chalk from "chalk";

class Logger {
  static info(message) {
    console.log(chalk.blue(`[INFO] ${message}`));
  }

  static success(message) {
    console.log(chalk.green(`[SUCCESS] ${message}`));
  }

  static error(message, error) {
    console.error(chalk.red(`[ERROR] ${message}`));
    if (error) {
      console.error(chalk.red(error.stack || error));
    }
  }

  static warn(message) {
    console.warn(chalk.yellow(`[WARNING] ${message}`));
  }
}

export default Logger;
