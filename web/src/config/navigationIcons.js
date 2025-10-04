import {
  Squares2x2Icon,
  ClipboardDocumentCheckIcon,
  BugAntIcon,
  ClipboardDocumentListIcon,
  CloudArrowUpIcon,
  CircleStackIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export const navigationIconMap = {
  dashboard: Squares2x2Icon,
  cases: ClipboardDocumentCheckIcon,
  bugs: BugAntIcon,
  checklists: ClipboardDocumentListIcon,
  api: CloudArrowUpIcon,
  sql: CircleStackIcon,
  reports: ChartBarIcon
};

export const getNavigationIcon = (key) => navigationIconMap[key] ?? Squares2x2Icon;
