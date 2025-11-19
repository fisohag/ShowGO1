
export interface Event {
  id: string;
  eventName: string;
  description: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  category: string;
  price: string;
  link: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  savedEventIds: string[];
}
