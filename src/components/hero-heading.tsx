interface HeroHeadingProps {
  children?: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export function HeroHeading({
  children = 'Your Heading',
  level = 'h1',
  className = ''
}: HeroHeadingProps) {
  const Tag = level;

  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
}
