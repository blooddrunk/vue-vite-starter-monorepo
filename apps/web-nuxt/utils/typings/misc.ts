import type { RouteLocationNamedRaw } from '#vue-router';
import type { RouteNamedMap } from 'vue-router/auto/routes';

import { availableSystemList } from '../constants';

export type SystemList = typeof availableSystemList;
export type SystemValue = (typeof availableSystemList)[number]['value'];
export type MenuItem = {
  id: string;
  title?: string;
  icon?: string;
  route?: keyof RouteNamedMap;
  routeProps?: Omit<RouteLocationNamedRaw, 'name'>;
  children?: MenuItem[];
  system: SystemValue;
  isVisible?: boolean;
};

export type BreadcrumbItem = {
  title: string;
  route?: keyof RouteNamedMap;
  icon?: string;
  isVisible?: boolean;
};

export type ReadonlyFieldsetData = Record<string | number | symbol, any>;

export type ReadonlyFieldsetRow = {
  value?: ((data: ReadonlyFieldsetData) => string) | string;
  valueKey?: string | string[];
  className?: ((content: string) => string) | string;
  label?: string;
};

export type ServerResponse = {
  errcode: string;
  errmsg: string;
  data: unknown;
};
