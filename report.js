function printReport(pages) {
  console.log("The report is starting");
  let pageList = sortPages(pages);
  for (let page of pageList) {
    console.log(`Found ${page.count} number of ${page.name}`);
  }
}

function sortPages(pages) {
  let pageList = [];
  for (let page in pages) {
    pageList.push({
      name: page,
      count: pages[page],
    });
  }
  pageList.sort((a, b) => b.count - a.count);
  return pageList;
}

export { printReport };
