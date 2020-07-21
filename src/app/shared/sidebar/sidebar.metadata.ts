// Sidebar route metadata
export interface RouteInfo {
  path: string;
  pathClient: string;
  pathAdmin: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  value: number;
  submenu: RouteInfo[];
}
