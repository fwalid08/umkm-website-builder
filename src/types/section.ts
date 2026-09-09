import React from 'react';
import { WebsiteConfig, SectionConfig } from './project';

export type SectionCategory =
  | 'Header'
  | 'Hero'
  | 'Business'
  | 'Content'
  | 'Commerce'
  | 'Social Proof'
  | 'Contact'
  | 'Media'
  | 'Footer';

export interface SectionStyleOption {
  id: string;
  name: string;
  description: string;
  previewThumbnail?: string;
}

export interface SectionProps {
  section: SectionConfig;
  config: WebsiteConfig;
  isBuilder?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
}

export interface SectionTypeDefinition {
  type: string;
  name: string;
  description: string;
  category: SectionCategory;
  icon: string;
  availableStyles: SectionStyleOption[];
  defaultStyle: string;
  defaultContent: () => Record<string, any>;
  component: React.ComponentType<SectionProps>;
}
