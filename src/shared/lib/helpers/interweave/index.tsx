import { FileImageOutlined } from "@ant-design/icons";

export const transform = (node: any, children: any) => {
  if (node.tagName.toLowerCase() === 'table' || node.className.toLowerCase() === 'table') {
    return <span className="markup-replacement">таблица</span>;
  } else if ([ 'ol', 'ul' ].includes(node.tagName.toLowerCase())) {
    return <span className="markup-replacement">список</span>;
  } else if (node.tagName.toLowerCase() === 'a') {
    return <span className="markup-replacement">ссылка</span>;
  } else if (node.tagName.toLowerCase() === 'img') {
    return <FileImageOutlined />;
  } else if (node.tagName.toLowerCase() === 'figure') {
    return <FileImageOutlined />;
  }
};