'use client';

import { Projects7 } from '@/components/projects7';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

interface ProjectsListingClientProps {
  projects: Project[];
}

export function ProjectsListingClient({ projects }: ProjectsListingClientProps) {
  return <Projects7 projects={projects} />;
}
