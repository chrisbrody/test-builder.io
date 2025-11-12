'use client';

import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';
import { usePathname } from 'next/navigation';

// IMPORTANT: Import the builder-registry to register custom components
// This must be imported before using BuilderComponent
import '@/components/builder-registry';

// Initialize Builder with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Page() {
  const pathname = usePathname();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedContent = await builder
          .get('page', {
            userAttributes: {
              urlPath: pathname || '/',
            },
          })
          .toPromise();

        setContent(fetchedContent);
      } catch (error) {
        console.error('Error fetching Builder.io content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          No Builder.io content found for this URL.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Create a new page in your Builder.io space with the URL path: {pathname}
        </p>
      </div>
    );
  }

  return <BuilderComponent model="page" content={content} />;
}
