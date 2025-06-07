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
  image: string;
}

const brands: brandsData[] = [
  // Fashion Brands
  {
    id: 1,
    name: "Louis Vuitton",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Louis_Vuitton_Logo.svg",
  },
  {
    id: 2,
    name: "Gucci",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Gucci_Logo.svg",
  },
  {
    id: 3,
    name: "Chanel",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chanel_logo_interlocking_cs.svg",
  },
  {
    id: 4,
    name: "Prada",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Prada-Logo.svg",
  },
  {
    id: 5,
    name: "Hermès",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hermes_logo.svg",
  },

  // Electronics Brands
  {
    id: 6,
    name: "Apple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 7,
    name: "Samsung",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    id: 8,
    name: "Sony",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Sony_Logo.svg",
  },
  {
    id: 9,
    name: "Bang & Olufsen",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Bang_%26_Olufsen_logo.svg",
  },
  {
    id: 10,
    name: "Bose",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Bose_logo.svg",
  },

  // Jewelry / Watch / Lifestyle
  {
    id: 11,
    name: "Rolex",
    image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Rolex_logo.svg",
  },
  {
    id: 12,
    name: "Cartier",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Cartier_logo.svg",
  },
  {
    id: 13,
    name: "Montblanc",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Montblanc_logo.svg",
  },
  {
    id: 14,
    name: "Dior",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Dior_Logo.svg",
  },
  {
    id: 15,
    name: "Versace",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e3/Versace_logo.svg",
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
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {brands.map((data) => (
              <CarouselItem
                key={data.id}
                className={`pl-4 ${
                  isMobile
                    ? "basis-full"
                    : "basis-1/2 md:basis-1/3 lg:basis-1/4"
                }`}
              >
                <Box
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Box>
    </>
  );
};
export default BrandsCarousel;
