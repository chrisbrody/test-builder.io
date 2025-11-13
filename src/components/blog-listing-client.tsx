'use client';

import { Blog7 } from '@/components/blog7';

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

interface BlogListingClientProps {
  posts: Post[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  return (
    <Blog7
      tagline="Latest Updates"
      heading="Our Blog"
      description="Discover the latest trends, tips, and best practices. Stay updated with our expert insights."
      buttonText="View all articles"
      buttonUrl="/blog"
      posts={posts}
    />
  );
}
