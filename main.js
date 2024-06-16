import { crawlPage } from "./crawl.js";

function main() {
  const args = process.argv;

  if (args.length > 3) {
    console.error("The tool accepts only one argument");
    process.exit(1);
  }
  if (args.length < 3) {
    console.error("The tool needs one argument to run");
    process.exit(1);
  }
  if (args.length === 3) {
    console.log(args[2]);
  }

  crawlPage(args[2]).then((res) => console.log(res));
}

main();
