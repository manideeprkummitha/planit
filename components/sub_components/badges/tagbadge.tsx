// components/badges/TagBadge.tsx
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tag as TagIcon } from 'lucide-react'; // Import Tag Icon

interface TagBadgeProps {
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => (
  <Badge variant="outline" className="flex items-center gap-1 text-[12px] bg-green-50 p-1 text-green-600 border-green-600">
    <TagIcon className="h-3 w-3" /> {/* Tag Icon */}
    {tag}
  </Badge>
);

export default TagBadge;
