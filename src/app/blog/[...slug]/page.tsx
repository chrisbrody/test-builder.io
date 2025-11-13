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
  const [blogDate, setBlogDate] = useState<string>('');

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

        // Set meta description
        if (fetchedContent?.data?.description) {
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', fetchedContent.data.description);
        }

        // Set meta keywords
        if (fetchedContent?.data?.keywords) {
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute('content', fetchedContent.data.keywords);
        }

        // Set Open Graph image
        if (fetchedContent?.data?.metaImage) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute('content', fetchedContent.data.metaImage);

          // Also set Twitter card image
          let twitterImage = document.querySelector('meta[name="twitter:image"]');
          if (!twitterImage) {
            twitterImage = document.createElement('meta');
            twitterImage.setAttribute('name', 'twitter:image');
            document.head.appendChild(twitterImage);
          }
          twitterImage.setAttribute('content', fetchedContent.data.metaImage);
        }

        // Set Open Graph title
        if (fetchedContent?.data?.title) {
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', fetchedContent.data.title);
        }

        // Set Open Graph description
        if (fetchedContent?.data?.description) {
          let ogDescription = document.querySelector('meta[property="og:description"]');
          if (!ogDescription) {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescription);
          }
          ogDescription.setAttribute('content', fetchedContent.data.description);
        }

        if (fetchedContent?.data?.date) {
          console.log('Blog date:', fetchedContent?.data?.date);
          // Format date to MM-DD-YYYY
          const date = new Date(fetchedContent.data.date);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${month}-${day}-${year}`;
          setBlogDate(formattedDate);
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
      <h1 className='text-center my-6 text-pretty text-4xl font-bold lg:text-6xl'>{content?.data?.title}</h1>
      {blogDate && (
        <p className='text-muted-foreground mb-8 text-center lg:text-xl'>{blogDate}</p>
      )}
      {/* Render the Builder blog post */}
      <BuilderComponent model="blog-post" content={content} />
    </>
  );
}
