import { builder, BuilderContent } from '@builder.io/sdk';
import { ProjectsListingClient } from '@/components/projects-listing-client';
import { BackLink } from '@/components/back-link';

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface ProjectData {
  slug?: string;
  title?: string;
  description?: string;
  keywords?: string;
  metaImage?: string;
  category?: string;
  tags?: string[];
  designer?: {
    name?: string;
  };
  date?: number;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

// Helper function to format date
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

// Helper function to extract category from keywords
function extractCategory(keywords?: string, category?: string): string {
  if (category) return category;
  if (!keywords) return 'MINIMAL';
  // Take the first keyword as the category
  const firstKeyword = keywords.split(',')[0].trim().toUpperCase();
  return firstKeyword || 'MINIMAL';
}

export default async function ProjectsListingPage() {
  // Fetch all published featured projects from Builder.io
  const featuredProjects = await builder.getAll('featured-project', {
    options: {
      noTargeting: true,
    },
    limit: 100, // Adjust this limit as needed
  });

  // Transform Builder.io featured projects to match Projects7 component structure
  const transformedProjects: Project[] = featuredProjects.map((project: BuilderContent) => {
    const projectData = project.data as ProjectData;
    return {
      id: project.id || 'unknown',
      title: projectData?.title || 'Untitled Project',
      category: extractCategory(projectData?.keywords, projectData?.category),
      description: projectData?.description || 'No description available',
      image: projectData?.metaImage || 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
      tags: projectData?.tags || (projectData?.keywords ? projectData.keywords.split(',').map(k => k.trim()) : []),
      url: `/projects/${projectData?.slug || project.id}`,
    };
  });

  return (
    <>
      <BackLink href="/" label="Back to Home" />
      <ProjectsListingClient projects={transformedProjects} />
    </>
  );
}
