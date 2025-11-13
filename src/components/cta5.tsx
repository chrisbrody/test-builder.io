import { Button } from "@/components/ui/button";

interface Cta5Props {
  variant?: 'image-left' | 'image-right' | 'image-top';
  heading?: string;
  description?: string;
  showButton?: boolean;
  button?: {
    text: string;
    url: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

const Cta5 = ({
  variant = "image-left",
  heading = "Call to Action",
  description = "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.</p>",
  showButton = true,
  button = {
    text: "Get Started",
    url: "#",
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    alt: "placeholder hero",
    caption: "",
  },
}: Cta5Props) => {
  const imageSection = (isStacked: boolean) => (
    <div className={`w-full shrink-0 ${isStacked ? '' : 'lg:w-1/2'} flex flex-col`}>
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-auto ${
          isStacked
            ? 'rounded-t-md md:rounded-t-xl'
            : 'rounded-t-md md:rounded-l-md md:rounded-t-none lg:rounded-none'
        }`}
      />
      {image.caption && (
        <p className="text-muted-foreground text-xs mt-2 px-2 italic text-center">
          {image.caption}
        </p>
      )}
    </div>
  );

  const contentSection = (isStacked: boolean) => (
    <div className={`w-full shrink-0 px-4 py-6 md:p-8 ${isStacked ? 'lg:px-16' : 'lg:w-1/2 lg:px-16'}`}>
      <h2 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
        {heading}
      </h2>
      <div
        className="text-muted-foreground mb-8 lg:text-lg"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {showButton && button?.text && (
        <Button asChild>
          <a href={button.url}>{button.text}</a>
        </Button>
      )}
    </div>
  );

  return (
    <section className="py-32">
      <div className="container">
        <div className={`bg-muted flex w-full flex-col overflow-hidden rounded-lg md:rounded-xl ${
          variant === 'image-top' ? '' : 'lg:flex-row lg:items-center'
        }`}>
          {variant === 'image-top' ? (
            <>
              {imageSection(true)}
              {contentSection(true)}
            </>
          ) : variant === 'image-left' ? (
            <>
              {imageSection(false)}
              {contentSection(false)}
            </>
          ) : (
            <>
              {contentSection(false)}
              {imageSection(false)}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { Cta5 };
