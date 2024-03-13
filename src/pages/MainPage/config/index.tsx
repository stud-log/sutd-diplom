import { DefaultOptionType } from "shared/ui/Dropdown";

export const dropdownFilterOptions: DefaultOptionType[] = [
  {
    label: <span>manager</span>,
    title: 'manager',
    options: [
      { label: <span>Jack</span>, value: 'Jack' },
      { label: <span>Lucy</span>, value: 'Lucy' },
    ],
  },
  {
    label: <span>engineer</span>,
    title: 'engineer',
    options: [
      { label: <span>Chloe</span>, value: 'Chloe' },
      { label: <span>Lucas</span>, value: 'Lucas' },
    ],
  },
];