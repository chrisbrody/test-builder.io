import { ChevronLeft } from 'lucide-react';

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <div className="container mx-auto px-4 pt-8">
      <a
        href={href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        {label}
      </a>
    </div>
  );
}
