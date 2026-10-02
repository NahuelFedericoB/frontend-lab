import type { ComponentType } from 'react';

export interface ComponentDefinition {
  slug: string;
  name: string;
  description: string;
  category: string;
  Demo: ComponentType;
}

export interface SourceFile {
  name: string;
  code: string;
}
