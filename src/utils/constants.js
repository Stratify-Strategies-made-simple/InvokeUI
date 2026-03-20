import { LayoutGrid, FileText, Image as ImageIcon, Music } from 'lucide-react';

export const MAIN_CATEGORIES = [
  { name: 'All', icon: LayoutGrid, isMain: true, id: 'main-all' },
  { name: 'Image Gen', icon: ImageIcon, isMain: true, id: 'main-img' },
  { name: 'Text Gen', icon: FileText, isMain: true, id: 'main-text' },
  { name: 'Audio', icon: Music, isMain: true, id: 'main-audio' },
];
