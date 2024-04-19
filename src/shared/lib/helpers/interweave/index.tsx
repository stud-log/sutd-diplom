import { FileImageOutlined } from "@ant-design/icons";

export const transform = (node: any, children: any) => {
  if (node.tagName.toLowerCase() === 'table') {
    return <span className="markup-replacement">таблица</span>;
  } else if (node.tagName.toLowerCase() === 'img') {
    return <FileImageOutlined />;
  } else if (node.tagName.toLowerCase() === 'figure') {
    return <FileImageOutlined />;
  }
};