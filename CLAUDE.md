DO NOT INCLUDE YOURESELF IN THE GIT COMMITS: ALWAYS LEAVE THIS OUT: 🤖 Generated with [Claude Code](https://claude.com/claude-code) Co-Authored-By: Claude <noreply@anthropic.com>

Overall Strategy
The core idea is to:
Integrate Builder.io into your React/Next.js project.
Create your Shadcn UI components as usual.
Register these Shadcn components with Builder.io, making them available in the visual editor.
Use Builder.io's visual editor to drag, drop, and configure these components to build pages quickly.
Step-by-Step Guide
Phase 1: Project Setup and Builder.io Integration
Create a New React/Next.js Project (if you don't have one):
code
Bash
npx create-next-app@latest my-builder-shadcn-app --typescript --eslint --tailwind --app
cd my-builder-shadcn-app
Why Next.js? Builder.io generally plays best with Next.js for its server-side rendering (SSR) and static site generation (SSG) capabilities, which align well with how Builder.io delivers content.
Install Shadcn UI:
Follow the official Shadcn UI installation guide for Next.js. This typically involves:
Initializing Shadcn:
code
Bash
npx shadcn-ui@latest init
Choose your style (default is fine) and base color.
Ensure it correctly sets up components.json, tailwind.config.js, globals.css, and lib/utils.ts.
Add your first component (e.g., Button) to verify:
code
Bash
npx shadcn-ui@latest add button
Install Builder.io SDK:
code
Bash
npm install @builder.io/react @builder.io/sdk
# or yarn add @builder.io/react @builder.io/sdk
Create a Builder.io Account and Space:
Go to builder.io and sign up.
Create a new "Space" (e.g., "My Shadcn App").
Note your Public API Key from your Space settings. You'll need this.
Configure Builder.io API Key:
Create a .env.local file in your project root.
Add your API key:
code
Code
NEXT_PUBLIC_BUILDER_API_KEY=YOUR_BUILDER_PUBLIC_API_KEY
Replace YOUR_BUILDER_PUBLIC_API_KEY with the key you got from Builder.io.
Integrate Builder.io Content Fetching:
For Pages/Routes:
Create a file like app/[...page]/page.tsx (using Next.js App Router) or pages/[...page].tsx (using Pages Router). This route will catch all unspecified paths and attempt to render Builder.io content.
Example app/[...page]/page.tsx (App Router):
code
Tsx
import { builder } from '@builder.io/react';
import { BuilderContent } from '@builder.io/react';

// Replace with your Builder.io API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const content = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params.page?.join('/') || ''),
      },
      // For a production site, use `cacheSeconds` for better performance.
      // For development, keep it low or remove it to see changes quickly.
      // cacheSeconds: 120,
    })
    .toPromise();

  if (!content) {
    return (
      <div>
        <p>No Builder.io content found for this URL.</p>
        {/* You might want to render a custom 404 page here */}
      </div>
    );
  }

  return (
    <BuilderContent content={content} model="page" />
  );
}
For specific sections/components (optional):
You can also fetch content for specific slots on a page using builder.get('your-model-name') and render it with <BuilderContent />.
Phase 2: Registering Shadcn UI Components with Builder.io
This is the most crucial part. You'll create a file (e.g., builder-components.ts or lib/builder.ts) where you register your Shadcn components.
Create a Registration File (e.g., lib/builder.ts):
code
TypeScript
// lib/builder.ts
import { builder, Builder } from '@builder.io/react';
import { Button } from '@/components/ui/button'; // Adjust path as needed
import { Input } from '@/components/ui/input';   // Adjust path as needed
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Adjust path as needed
import { Textarea } from '@/components/ui/textarea'; // Assuming you add it
import { Label } from '@/components/ui/label'; // Assuming you add it


// Initialize Builder (important to do this once)
// Make sure this matches how you initialize in your main app.
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
} else if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
   // For SSR context, ensure init is called if necessary.
   // Builder.io SDK handles this gracefully, but good to be explicit.
   builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
}


// --- Register Shadcn Button ---
Builder.registerComponent(Button, {
  name: 'Shadcn Button',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Click Me',
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
    },
    {
      name: 'size',
      type: 'text',
      enum: ['default', 'sm', 'lg', 'icon'],
      defaultValue: 'default',
    },
    {
      name: 'asChild',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'className', // Allow custom Tailwind classes
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes.',
    },
  ],
  // Optional: Builder.io icon for the component in the editor
  icon: 'Button',
});


// --- Register Shadcn Input ---
Builder.registerComponent(Input, {
  name: 'Shadcn Input',
  inputs: [
    {
      name: 'type',
      type: 'text',
      enum: ['text', 'email', 'password', 'number', 'url', 'search'],
      defaultValue: 'text',
    },
    {
      name: 'placeholder',
      type: 'text',
      defaultValue: 'Enter text...',
    },
    {
      name: 'value',
      type: 'text',
      // Note: In Builder, inputs are usually for displaying static values
      // or for binding to Builder state. For interactive forms, you'd usually
      // wrap this in a custom form component.
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'className',
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes.',
    },
  ],
  icon: 'Input',
});

// --- Register Shadcn Card ---
// For composite components like Card, you have a few options:
// 1. Register the whole Card with slots (recommended for full control in Builder)
// 2. Register individual parts (CardHeader, CardContent, etc.) and compose them manually in Builder.
// Let's go with option 1 for better structure.

Builder.registerComponent(Card, {
  name: 'Shadcn Card',
  inputs: [
    {
      name: 'className',
      type: 'text',
      helperText: 'Add custom Tailwind CSS classes to the card wrapper.',
    },
  ],
  // This tells Builder that the Card component can contain other components
  // in its default slot.
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Shadcn CardHeader', // Refer to a registered component
      },
      // You might set default children for the header here if you registered it separately
      // or use an internal text element.
      children: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Shadcn CardTitle',
          },
          // Default text for title
          children: [{ '@type': '@builder.io/sdk:Element', tagName: 'div', properties: { text: 'Card Title' } }]
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Shadcn CardDescription',
          },
          // Default text for description
          children: [{ '@type': '@builder.io/sdk:Element', tagName: 'div', properties: { text: 'Card description goes here.' } }]
        }
      ]
    },
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Shadcn CardContent',
      },
      children: [{ '@type': '@builder.io/sdk:Element', tagName: 'div', properties: { text: 'Card content goes here.' } }]
    },
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Shadcn CardFooter',
      },
      children: [{ '@type': '@builder.io/sdk:Element', tagName: 'div', properties: { text: 'Card footer.' } }]
    }
  ],
  // If you want to define specific regions within the Card as separate slots, use `component.defaultSetModel` and `component.defaultChildren`
  // Or define custom slots (e.g., `headerSlot`, `contentSlot`, `footerSlot`)
  // For simple cases, `defaultChildren` is enough.
  icon: 'Box', // Or a custom card icon
});

// --- Register Card Sub-Components (essential if you want to drag them individually into a Card's slots) ---
// These should only be droppable INTO a Card, not anywhere.
// We achieve this by not defining a `defaultChildren` for them, and letting Builder infer their usage.
// Or, more explicitly, by using `canDropIn` if you had a custom Card slot.
Builder.registerComponent(CardHeader, {
  name: 'Shadcn CardHeader',
  inputs: [{ name: 'className', type: 'text' }],
  noWrap: true, // Prevents Builder from adding an extra div wrapper
});

Builder.registerComponent(CardTitle, {
  name: 'Shadcn CardTitle',
  inputs: [
    { name: 'children', type: 'text', defaultValue: 'Card Title' },
    { name: 'className', type: 'text' }
  ],
  noWrap: true,
});

Builder.registerComponent(CardDescription, {
  name: 'Shadcn CardDescription',
  inputs: [
    { name: 'children', type: 'text', defaultValue: 'Card Description' },
    { name: 'className', type: 'text' }
  ],
  noWrap: true,
});

Builder.registerComponent(CardContent, {
  name: 'Shadcn CardContent',
  inputs: [
    { name: 'children', type: 'html', defaultValue: '<div>Card Content</div>' }, // Use html type for rich text content
    { name: 'className', type: 'text' }
  ],
  noWrap: true,
});

Builder.registerComponent(CardFooter, {
  name: 'Shadcn CardFooter',
  inputs: [
    { name: 'children', type: 'html', defaultValue: '<div>Card Footer</div>' },
    { name: 'className', type: 'text' }
  ],
  noWrap: true,
});

// --- Example: Textarea with Label (Composite Component) ---
// If you want to group components, you can create a wrapper component first.
function LabeledTextarea(props: { label: string; placeholder?: string; className?: string }) {
  return (
    <div className={props.className}>
      <Label htmlFor="textarea">{props.label}</Label>
      <Textarea id="textarea" placeholder={props.placeholder} />
    </div>
  );
}

Builder.registerComponent(LabeledTextarea, {
  name: 'Shadcn Labeled Textarea',
  inputs: [
    { name: 'label', type: 'text', defaultValue: 'Your Label' },
    { name: 'placeholder', type: 'text', defaultValue: 'Enter your message...' },
    { name: 'className', type: 'text' }
  ],
  icon: 'Textarea',
});

// IMPORTANT: Import this file somewhere in your main application to ensure components are registered.
// For Next.js App Router, you might import it in your `layout.tsx` or a server component.
// For Pages Router, you might import it in `_app.tsx`.
// Example: import '@/lib/builder';
Import the Registration File:
For Next.js App Router:
You can import it directly in your app/layout.tsx or in the app/[...page]/page.tsx file you created.
code
Tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/lib/builder'; // <-- IMPORTANT: Import your Builder.io component registration file here!

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
For Next.js Pages Router:
Import it in pages/_app.tsx:
code
Tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '@/lib/builder'; // <-- IMPORTANT: Import your Builder.io component registration file here!

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
Phase 3: Building in Builder.io Visual Editor
Start Your Development Server:
code
Bash
npm run dev
# or yarn dev
Go to Builder.io Editor:
Navigate to your Builder.io space (app.builder.io).
Go to "Content" -> "Pages".
Click "New Page".
Create a New Page:
Give it a name (e.g., "Home Page").
Set the URL Path to / (for your homepage).
Select your framework (e.g., "React").
Drag and Drop Your Shadcn Components:
In the Builder.io editor, look for the "Components" tab (usually on the left).
You should now see "Shadcn Button," "Shadcn Input," "Shadcn Card," etc., listed there.
Drag these components onto the canvas.
Configure Component Properties:
Select a component on the canvas.
In the right-hand panel, you'll see the "Props" section.
Modify the variant, size, children (for Button), placeholder, type (for Input), etc., using the input fields you defined in Builder.registerComponent.
You can also add className to apply custom Tailwind CSS classes directly from the editor.
Add Content to Card Slots:
Drag a "Shadcn Card" onto the canvas.
You'll notice it has default children. You can click on "Card Title" or "Card Content" to edit their text.
You can also drag other Builder.io elements (like a simple "Text" block or another "Shadcn Button") directly into the CardContent or CardFooter areas if they are defined as general slots (which they are with defaultChildren).
Publish Your Page:
Once you're happy with your page, click the "Publish" button in the top right of the Builder.io editor.
View Your Page:
Open your running Next.js app in the browser (e.g., http://localhost:3000).
You should now see the page built with your Shadcn components rendered by Builder.io.
Important Considerations and Best Practices:
className Prop: Always include a className input for your registered components. This allows users to add custom Tailwind classes directly from the Builder.io editor, which is essential for fine-tuning layout and styles.
Composite Components: For more complex components like Card, you have choices:
Register as a whole with defaultChildren: This makes it a pre-structured block in Builder.io, great for consistency. Users can then drag simple text/images or other specific components into its slots.
Register individual parts and compose in Builder: Register CardHeader, CardContent, etc., separately, allowing users to build a card piece by piece. This offers maximum flexibility but can be more effort for the user.
Recommendation: Register the main Card with sensible defaultChildren containing its sub-components (like CardHeader, CardTitle, etc.) for quick starts. Also, register the sub-components individually (without defaultChildren if they are meant to be dropped into another component) so advanced users can customize.
Rich Text (html type): For areas like CardContent or custom components where you expect multi-line text, formatting, or even embedded Builder.io elements, use type: 'html' for the input. This provides a rich text editor in Builder.io. For simple text, type: 'text' is sufficient.
Component Wrapping (noWrap: true): For components like CardHeader or CardTitle that must be direct children of another component (e.g., <Card><CardHeader>...</CardHeader></Card>), use noWrap: true in Builder.registerComponent. This prevents Builder.io from adding an extra div wrapper around them, which could break styling.
State and Interactivity: Builder.io excels at rendering static content and basic interactions. For complex forms, client-side state management, or custom logic that directly interacts with your backend, you'll likely create custom React components that handle this logic internally and then register that wrapper component with Builder.io. Builder.io then provides inputs to configure the props of this interactive component.
Styling Customization:
Tailwind Classes: Use the className prop in Builder.io to add utility classes.
Builder.io's Style Editor: Builder.io has its own style editor (padding, margin, flexbox, etc.). This can be used for general layout but might sometimes clash with your Shadcn/Tailwind setup if not used carefully. Prioritize className for Shadcn components.
Storybook (Optional but Recommended): If you're building many components, using Storybook alongside Shadcn UI is excellent for component development and testing. You can then reference these Storybook stories when defining Builder.registerComponent for easy testing in isolation.
Preview URL: In your Builder.io space settings, configure a "Preview URL" (e.g., http://localhost:3000?builder.preview=true). This will allow you to see your changes in your local app as you edit in Builder.io.
Error Handling: Ensure robust error handling for builder.get calls, especially for 404s.
By following these steps, you'll be well on your way to creating a highly efficient workflow for building beautiful, responsive pages with Shadcn UI components managed through Builder.io!