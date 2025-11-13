import { builder, BuilderContent } from '@builder.io/sdk';
import { BlogListingClient } from '@/components/blog-listing-client';
import { BackLink } from '@/components/back-link';

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPostData {
  slug?: string;
  title?: string;
  description?: string;
  keywords?: string;
  metaImage?: string;
  designer?: {
    name?: string;
  };
  date?: number;
}

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
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
function extractCategory(keywords?: string): string {
  if (!keywords) return 'Article';
  // Take the first keyword as the category
  const firstKeyword = keywords.split(',')[0].trim();
  return firstKeyword || 'Article';
}

export default async function BlogListingPage() {
  // Fetch all published blog posts from Builder.io
  const blogPosts = await builder.getAll('blog-post', {
    options: {
      noTargeting: true,
    },
    limit: 100, // Adjust this limit as needed
  });

  // Transform Builder.io blog posts to match Blog7 component structure
  const transformedPosts: Post[] = blogPosts.map((post: BuilderContent) => {
    const postData = post.data as BlogPostData;
    return {
      id: post.id || 'unknown',
      title: postData?.title || 'Untitled Post',
      summary: postData?.description || 'No description available',
      label: extractCategory(postData?.keywords),
      author: postData?.designer?.name || 'Anonymous',
      published: postData?.date ? formatDate(postData.date) : 'Not published',
      url: `/blog/${postData?.slug || post.id}`,
      image: postData?.metaImage || 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
    };
  });

  return (
    <>
      <BackLink href="/" label="Back to Home" />
      <BlogListingClient posts={transformedPosts} />
    </>
  );
}
