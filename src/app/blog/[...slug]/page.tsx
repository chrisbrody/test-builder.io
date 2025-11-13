'use client';

import { useEffect, useState } from 'react';
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { usePathname } from 'next/navigation';

// IMPORTANT: Import the builder-registry to register custom components
// This must be imported before using BuilderComponent
import '@/components/builder-registry';

// Initialize Builder with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function BlogPost() {
  const pathname = usePathname();
  const isPreviewingInBuilder = useIsPreviewing();
  const [content, setContent] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      try {
        const fetchedContent = await builder
          .get('blog-post', {
            userAttributes: {
              urlPath: pathname || '/',
            },
          })
          .toPromise();

        setContent(fetchedContent);
        setNotFound(!fetchedContent);

        console.log('Blog post data:', fetchedContent);

        // If the page title is found, set the document title
        if (fetchedContent?.data?.title) {
          document.title = fetchedContent.data.title;
        }
      } catch (error) {
        console.error('Error fetching Builder.io blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading blog post...</p>
      </div>
    );
  }

  // If no page is found, return a 404 page
  // Unless we're in the Builder.io preview mode
  if (notFound && !isPreviewingInBuilder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">404 - Blog Post Not Found</h1>
        <p className="text-muted-foreground">
          No blog post found at this URL.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Create a new blog post in your Builder.io space with the URL path: {pathname}
        </p>
      </div>
    );
  }

  // Return the page when found
  return (
    <>
      {/* Render the Builder blog post */}
      <BuilderComponent model="blog-post" content={content} />
    </>
  );
}
