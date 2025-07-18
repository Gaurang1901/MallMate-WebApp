import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface brandsData {
  id: number;
  name: string;
}

const brands: brandsData[] = [
  {
    id: 1,
    name: "IKEA",
  },
  {
    id: 2,
    name: "Levi's",
  },
  {
    id: 3,
    name: "Sony",
  },
  {
    id: 4,
    name: "Adidas",
  },
  {
    id: 5,
    name: "NIKE",
  },
  {
    id: 6,
    name: "Samsung",
  },
  {
    id: 7,
    name: "Puma",
  },
  {
    id: 8,
    name: "Reebok",
  },
  {
    id: 9,
    name: "Apple",
  },
  {
    id: 10,
    name: "Google",
  },
  {
    id: 11,
    name: "Microsoft",
  },
];

const BrandsCarousel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        component="section"
        className="py-16"
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <h2 className="text-center text-4xl font-bold mb-8">
          Our Trusted Brands
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {brands.map((data) => (
              <CarouselItem
                key={data.id}
                className={`flex items-center min-h-[60px] justify-center ${
                  isMobile ? "basis-1/2" : "basis-1/3 md:basis-1/4 lg:basis-1/6"
                }`}
              >
                <div className="text-center h-max font-serif text-5xl font-extrabold px-2">
                  {data.name}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Box>
    </>
  );
};
export default BrandsCarousel;
