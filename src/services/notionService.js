const { notionClient } = require("../clients/notion.client");

exports.createAPage = async () => {
  return await notionClient.pages.create({
    cover: {
      type: "external",
      external: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
      },
    },
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    parent: {
      type: "database_id",
      database_id: "db96ae89791e4ae5a23cf36556263093",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "Tuscan kale",
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: "A dark green leafy vegetable",
            },
          },
        ],
      },
      "Food group": {
        select: {
          name: "🥬 Vegetable",
        },
      },
    },
    children: [
      {
        object: "block",
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
        object: "block",
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
              href: "https://en.wikipedia.org/wiki/Lacinato_kale",
            },
          ],
          color: "default",
        },
      },
    ],
  });
};

exports.addTable = async (table) => {
  const blockId = "354330e3e18d42a7a18f53c9ac36740a";
  const response = await notionClient.blocks.children.append({
    block_id: blockId,
    children: table,
  });
  console.log(response);
};
