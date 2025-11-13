'use client';

import { Builder } from '@builder.io/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hero1 } from '@/components/hero1';
import { HeroHeading } from '@/components/hero-heading';

// Register components immediately when this module loads
console.log('🔧 Registering components with Builder.io...');

// --- Register Eminent Button Component ---
Builder.registerComponent(Button, {
  name: 'Eminent Button',
  defaultStyles: {
    marginTop: '0px',
  },
  image: 'https://cdn.builder.io/api/v1/image/assets%2F44da67156a76411da3de2c85cd07271a%2F75e1274b761a439580462d573f29c15d',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Click Me',
      helperText: 'The text to display inside the button',
    },
    {
      name: 'variant',
      type: 'text',
      enum: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      defaultValue: 'default',
      helperText: 'The visual style variant of the button',
    },
    {
      name: 'size',
      type: 'text',
      enum: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      defaultValue: 'default',
      helperText: 'The size of the button',
    },
    {
      name: 'asChild',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Render as a child component (for links, etc.)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable the button',
    },
    {
      name: 'type',
      type: 'text',
      enum: ['button', 'submit', 'reset'],
      defaultValue: 'button',
      helperText: 'The HTML button type',
    },
    {
      name: 'className',
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes',
    },
  ],
});

console.log('✅ Registered: Eminent Button');

// --- Register Eminent Badge Component ---
Builder.registerComponent(Badge, {
  name: 'Eminent Badge',
  defaultStyles: {
    marginTop: '0px',
  },
  image: 'https://cdn.builder.io/api/v1/image/assets%2F44da67156a76411da3de2c85cd07271a%2Fa6340c5b843e474b8ae82cb0bcab3488',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Badge',
      helperText: 'The text to display inside the badge',
    },
    {
      name: 'variant',
      type: 'text',
      enum: ['default', 'secondary', 'destructive', 'outline'],
      defaultValue: 'default',
      helperText: 'The visual style variant of the badge',
    },
    {
      name: 'asChild',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Render as a child component (for links, etc.)',
    },
    {
      name: 'className',
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes',
    },
  ],
});

console.log('✅ Registered: Eminent Badge');

// --- Register Heading Component (h1-h6) ---
Builder.registerComponent(HeroHeading, {
  name: 'Eminent Heading',
  defaultStyles: {
    marginTop: '0px',
  },
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Your Heading',
      helperText: 'The heading text content',
    },
    {
      name: 'level',
      type: 'text',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      defaultValue: 'h1',
      helperText: 'Heading level (h1-h6) - automatically styled with Shadcn UI styles',
    },
    {
      name: 'className',
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes to override or extend default styles',
    },
  ],
});

console.log('✅ Registered: Eminent Heading');

// --- Register Hero1 Component ---
Builder.registerComponent(Hero1, {
  name: 'Eminent Hero 1',
  defaultStyles: {
    marginTop: '0px',
  },
  inputs: [
    {
      name: 'badge',
      type: 'string',
      defaultValue: '✨ Your Website Builder',
      helperText: 'Optional badge text shown above the heading',
    },
    {
      name: 'heading',
      type: 'string',
      defaultValue: 'Blocks Built With Shadcn & Tailwind',
      helperText: 'Main hero heading text',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
      helperText: 'Hero description text',
    },
    {
      name: 'buttons',
      type: 'object',
      defaultValue: {
        primary: {
          text: 'Discover all components',
          url: 'https://www.shadcnblocks.com',
        },
        secondary: {
          text: 'View on GitHub',
          url: 'https://www.shadcnblocks.com',
        },
      },
      subFields: [
        {
          name: 'primary',
          type: 'object',
          subFields: [
            {
              name: 'text',
              type: 'string',
              defaultValue: 'Discover all components',
            },
            {
              name: 'url',
              type: 'string',
              defaultValue: 'https://www.shadcnblocks.com',
            },
          ],
        },
        {
          name: 'secondary',
          type: 'object',
          subFields: [
            {
              name: 'text',
              type: 'string',
              defaultValue: 'View on GitHub',
            },
            {
              name: 'url',
              type: 'string',
              defaultValue: 'https://www.shadcnblocks.com',
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'object',
      defaultValue: {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
        alt: 'Hero section demo image showing interface components',
      },
      subFields: [
        {
          name: 'src',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
          defaultValue: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
          helperText: 'Hero image',
        },
        {
          name: 'alt',
          type: 'string',
          defaultValue: 'Hero section demo image showing interface components',
          helperText: 'Image alt text for accessibility',
        },
      ],
    },
  ],
  image: 'https://cdn.builder.io/api/v1/image/assets%2F44da67156a76411da3de2c85cd07271a%2F76e7f1e807554abe87f0d6731005ed79',
});

console.log('✅ Registered: Eminent Hero 1');

Builder.register('insertMenu', {
  name: 'Eminent Blocks',
  items: [
    { name: 'Eminent Hero 1', item: 'Eminent Hero 1' },
  ],
});

Builder.register('insertMenu', {
  name: 'Eminent Components',
  items: [
    { name: 'Eminent Heading', item: 'Eminent Heading' },
    { name: 'Eminent Button', item: 'Eminent Button' },
    { name: 'Eminent Badge', item: 'Eminent Badge' },
  ],
});

console.log('✅ Registered: Eminent Pages section');
console.log('✅ Registered: Eminent Blocks section');
console.log('✅ Registered: Eminent Components section');
console.log('✅ All custom components registered!');
