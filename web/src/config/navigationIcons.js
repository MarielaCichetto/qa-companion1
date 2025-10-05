import {
  Squares2x2Icon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  BugAntIcon,
  SwatchIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export const navigationIconMap = {
  dashboard: Squares2x2Icon,
  stories: BookOpenIcon,
  cases: ClipboardDocumentCheckIcon,
  bugs: BugAntIcon,
  tasks: SwatchIcon,
  reports: ChartBarIcon,
  settings: AdjustmentsHorizontalIcon
};

export const getNavigationIcon = (key) => navigationIconMap[key] ?? Squares2x2Icon;
