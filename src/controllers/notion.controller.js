const { notionClient } = require("../clients/notion.client");
const { redisClient } = require("../clients/redis.client");
const { table, createCells } = require("../data/table");
const { createAPage, addTable } = require("../services/notionService");
const { getListFromCache } = require("../services/redisCacheService");

exports.createAPageNotion = async (req, res) => {
  const response = createAPage();
  res.status(200).send(response);
};

exports.checkNotion = async (req, res) => {
  // const listUsersResponse = await notionClient.users.list({})
  // // console.log(listUsersResponse)
  // res.status(200).send(listUsersResponse.results)
  // const pageId = '354330e3e18d42a7a18f53c9ac36740a';
  //   const response = await notionClient.pages.retrieve({ page_id: pageId });
  //   console.log(response);
  const blockId = "354330e3e18d42a7a18f53c9ac36740a";
  //   const response = await notionClient.blocks.children.list({
  //     block_id: blockId,
  //     // page_size: 50,
  //   });

  const response = await notionClient.blocks.children.append({
    block_id: blockId,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Lacinato kale",
              },
            },
          ],
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content:
                  "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                link: {
                  url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                },
              },
            },
          ],
        },
      },
    ],
  });
  res.status(200).send(response);
};

exports.addATableNotion = async (req, res) => {
  const gaEventList = await getListFromCache("gaEventList");
  const tableChildren = this.getTableChildrenForGAEvent(gaEventList);
  const tableData = table(
    (tableWidth = 1),
    (columnHeader = false),
    (rowHeader = false),
    (children = tableChildren)
  );
  addTable(tableData);
  res.status(200).send("Table added");
};

exports.getTableChildrenForGAEvent = (gaEventList) => {
  const tableRows = [];
  gaEventList.map((gaEvent) => {
    tableRows.push({
      type: "table_row",
      table_row: {
        cells: [createCells(gaEvent)],
      },
    });
  });
  return tableRows;
};
