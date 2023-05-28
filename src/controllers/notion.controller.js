const { table, createCells } = require("../data/table");
const { addTable } = require("../services/notionService");
const { getListFromCache } = require("../services/redisCacheService");

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
