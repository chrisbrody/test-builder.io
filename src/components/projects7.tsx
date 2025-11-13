"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Projects7Type {
  id: number | string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

interface Projects7Props {
  projects?: Projects7Type[];
}

const Projects7Data: Projects7Type[] = [
  {
    id: 1,
    title: "Minimalist Geometry",
    category: "MINIMAL",
    description:
      "A clean composition focusing on simple shapes and negative space, evoking calm and clarity.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    tags: ["minimal", "geometry"],
  },
  {
    id: 2,
    title: "Abstract Color Flow",
    category: "ABSTRACT",
    description:
      "Vivid colors blend and swirl in an abstract pattern, creating a sense of movement and energy.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    tags: ["abstract", "color"],
  },
  {
    id: 3,
    title: "Editorial Portrait",
    category: "EDITORIAL",
    description:
      "A striking editorial portrait with dramatic lighting and a focus on expression and mood.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random3.jpeg",
    tags: ["editorial", "portrait"],
  },
  {
    id: 4,
    title: "Studio Still Life",
    category: "STUDIO SHOT",
    description:
      "A carefully arranged studio shot featuring everyday objects, highlighting texture and form.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random4.jpeg",
    tags: ["studio", "still-life"],
  },
  {
    id: 5,
    title: "Minimal Shadows",
    category: "MINIMAL",
    description:
      "Soft shadows and subtle gradients create a tranquil, minimalist scene with a modern touch.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
    tags: ["minimal", "shadows"],
  },
  {
    id: 6,
    title: "Abstract Studio",
    category: "ABSTRACT",
    description:
      "Studio lighting meets abstract forms in this experimental composition, blending art and photography.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
    tags: ["abstract", "studio"],
  },
];

const filterCategories = [
  "ALL",
  "Kitchen Design",
  "New Home Design",
  "Remodeling Design",
  "Interior Design",
];

const Projects7 = ({ projects = Projects7Data }: Projects7Props) => {
  // console.log('🎨 Projects7 received projects:', projects);
  // console.log('🎨 Projects7 projects count:', projects.length);

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredItems, setFilteredItems] = useState(projects);

  // console.log('🎨 Current filtered items:', filteredItems);
  // console.log('🎨 Current active filter:', activeFilter);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "ALL") {
      console.log('🎨 Setting all projects:', projects);
      setFilteredItems(projects);
    } else {
      const filtered = projects.filter(
        (item) => {
          const matchesTags = Array.isArray(item.tags) && item.tags.includes(category);
          return matchesTags;
        }
      );
      // console.log(`🎨 Filtered for category "${category}":`, filtered);
      setFilteredItems(filtered);
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap justify-center gap-8">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`hover:text-foreground text-sm font-medium tracking-wider transition-colors duration-300 ${
                  activeFilter === category
                    ? "border-border text-foreground border-b-2 pb-1"
                    : "text-gray-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => item.url && (window.location.href = item.url)}
                >
                  <div className="relative aspect-[4/3] h-96 w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-300"
                    />

                    <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <motion.div className="translate-y-5 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="mb-4 text-xs font-medium tracking-widest text-gray-300">
                          {item.category}
                        </p>
                        <h3 className="mb-4 text-2xl font-light tracking-wide">
                          {item.title}
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-200">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-lg text-gray-500">
                No items found for "{activeFilter}" category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Projects7 };
