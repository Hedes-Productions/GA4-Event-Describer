const { notionClient } = require("../clients/notion.client");

exports.addTable = async (table) => {
  const blockId = "354330e3e18d42a7a18f53c9ac36740a";
  const response = await notionClient.blocks.children.append({
    block_id: blockId,
    children: table,
  });
  console.log(response);
};
