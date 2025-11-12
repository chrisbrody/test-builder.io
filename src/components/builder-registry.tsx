'use client';

import { Builder } from '@builder.io/react';
import { Button } from '@/components/ui/button';
import ButtonStandard1 from '@/components/button-standard-1';

// Register components immediately when this module loads
console.log('🔧 Registering components with Builder.io...');

// --- Register Shadcn Button Component ---
Builder.registerComponent(Button, {
  name: 'Shadcn Button',
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
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
});

console.log('✅ Registered: Shadcn Button');

// --- Register Test Button Component ---
Builder.registerComponent(ButtonStandard1, {
  name: 'Button Standard 1',
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
});

console.log('✅ Registered: Button Standard 1');
console.log('✅ All custom components registered!');
