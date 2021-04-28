export interface Action<T = any> {
  type: string;
  payload?: T;
}

export type Role = 'teacher' | 'student';

export interface NavLink {
  title: string;
  path: string;
  icon: any;
}

export type NavLinks = Array<NavLink>;

export interface BreadNav {
  title: string;
  path: string;
}

export type BreadNavs = Array<BreadNav>;
