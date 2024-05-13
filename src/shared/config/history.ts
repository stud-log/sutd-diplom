import { NavigateFunction } from "react-router-dom";

const AppHistory = {
  navigate: null as NavigateFunction | null,
  push: (page: string, ...rest: any) => AppHistory.navigate?.(page, ...rest),
};

export default AppHistory;