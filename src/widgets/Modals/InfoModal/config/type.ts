import { FC } from "react";

export interface ModalConfig {
 
  isOpen: boolean;
  onClick: () => void;
  btnText: string;
  description: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  
}