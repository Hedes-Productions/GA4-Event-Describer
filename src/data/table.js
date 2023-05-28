exports.createCells = (
  cellText,
  bold,
  italic,
  strikethrough,
  underline,
  code,
  color,
  link
) => {
  return (cell = [
    {
      type: "text",
      text: {
        content: cellText,
        link: link ? { url: link } : null,
      },
      annotations: {
        bold: bold || false,
        italic: italic || false,
        strikethrough: strikethrough || false,
        underline: underline || false,
        code: code || false,
        color: color || "default",
      },
      plain_text: cellText,
      href: link || null,
    },
  ]);
};

exports.table = (tableWidth, columnHeader, rowHeader, children) => {
  return [
    {
      object: "block",
      type: "table",
      table: {
        table_width: tableWidth || 2,
        has_column_header: columnHeader || false,
        has_row_header: rowHeader || false,
        children: children || null,
      },
    },
  ];
};
