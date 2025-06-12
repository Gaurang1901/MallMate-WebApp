import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Paper,
  ImageList,
  ImageListItem,
  Stack,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus } from "lucide-react";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

// Placeholder product data (will be replaced with actual data in a real app)
const dummyProduct = {
  id: "1",
  name: "Modern Bluetooth Headphones",
  price: 199.99,
  description:
    "Experience unparalleled sound quality and comfort with these sleek, noise-cancelling Bluetooth headphones. Featuring long-lasting battery life and intuitive controls, they are perfect for your daily commute or extended listening sessions.",
  images: [
    "https://source.unsplash.com/random/800x600?headphones-1",
    "https://source.unsplash.com/random/800x600?headphones-2",
    "https://source.unsplash.com/random/800x600?headphones-3",
    "https://source.unsplash.com/random/800x600?headphones-4",
  ],
  availability: "5+ in stock, ready to be shipped",
  sku: "4550344637135",
};

const dummyReviews = [
  {
    id: 1,
    author: "Alice B.",
    rating: 5,
    comment:
      "These headphones are amazing! The sound quality is superb and they are so comfortable.",
    date: "2023-10-26",
  },
  {
    id: 2,
    author: "Bob W.",
    rating: 4,
    comment: "Great value for money. Battery life is impressive.",
    date: "2023-10-20",
  },
];

const ProductView: React.FC = () => {
  const theme = useTheme();
  const [mainImage, setMainImage] = useState(dummyProduct.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (event.target.value === "") {
      setQuantity(0);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      // In a real app, you'd send this to a backend
      console.log("New Review:", newReview);
      setNewReview("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensure it takes full height
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1a1a1a 0%, #2d1b36 100%)"
            : "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        py: 4, // Adjusted padding
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <MotionPaper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? "rgba(45, 27, 54, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column", // Stack main content and reviews vertically
            gap: 4,
            overflow: "hidden", // Ensure no overflow from inner elements
            height: "100%",
          }}
        >
          {/* Main Product Display Section (Images + Details) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Image and Thumbnails Section */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Main Image */}
              <MotionBox
                key={mainImage}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                sx={{
                  width: "100%",
                  pt: "75%", // 4:3 aspect ratio
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                      : "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box
                  component="img"
                  src={mainImage}
                  alt={dummyProduct.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </MotionBox>

              {/* Thumbnails */}
              <ImageList
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "auto",
                  flexWrap: "nowrap",
                  gap: 8,
                  height: 80, // Reduced fixed height for thumbnail row
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.divider,
                    borderRadius: "4px",
                  },
                }}
                rowHeight={80} // Adjusted row height
              >
                {dummyProduct.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ flexShrink: 0, width: "80px !important" }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`Product thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(image)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 2,
                        cursor: "pointer",
                        border:
                          mainImage === image
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1px solid ${theme.palette.divider}`,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          borderColor: theme.palette.primary.light,
                          transform: "scale(1.02)",
                        },
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>

            {/* Product Details Section */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                {dummyProduct.name}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                ${dummyProduct.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SKU: {dummyProduct.sku}
              </Typography>
              <Typography variant="body2" color="success.main">
                Availability: {dummyProduct.availability}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Quantity Selector and Add to Cart Button */}
              <Stack
                direction={{ xs: "column", sm: "column" }}
                alignItems={{ xs: "stretch", sm: "stretch" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                {/* Quantity Controls */}
                <div className="flex flex-row justify-center items-center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">Quantity:</Typography>
                    <IconButton onClick={handleDecrement} size="small">
                      <Minus size={20} />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={handleQuantityChange}
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "60px",
                        textAlign: "center",
                        "& input": { textAlign: "center" },
                      }}
                    />
                    <IconButton onClick={handleIncrement} size="small">
                      <Plus size={20} />
                    </IconButton>
                  </Stack>
                </div>

                {/* Action Buttons */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ flexGrow: 1 }}
                >
                  <MotionButton
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      borderRadius: 2,
                      py: 0.5,
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)"
                          : "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(45deg, #90caf9 40%, #ce93d8 100%)"
                            : "linear-gradient(45deg, #1976d2 40%, #9c27b0 100%)",
                      },
                    }}
                  >
                    Add to Cart
                  </MotionButton>
                  <MotionButton
                    variant="outlined"
                    size="large"
                    fullWidth
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                    }}
                  >
                    Buy Now
                  </MotionButton>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" color="text.secondary">
                {dummyProduct.description}
              </Typography>

              {/* Additional Product Details (from original image) */}
              <Box>
                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Product Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingredients: Citrus Bergamia (Bergamot), Citrus Sinensis
                  (Sweet Orange), Cinnamomum camphora CT Linalool (Ho Wood),
                  Cupressus sempervirens (Cypress)
                  <br />
                  Volume: 0.3fl oz / 10ml
                  <br />
                  Country of Origin: USA
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Additional Information
                </Typography>
                <Typography
                  component="ul"
                  variant="body2"
                  color="text.secondary"
                  sx={{ pl: 2 }}
                >
                  <li>
                    This is a highly concentrated product, do not apply directly
                    to the skin.
                  </li>
                  <li>Do not consume this product.</li>
                  <li>Keep away from children.</li>
                  <li>Keep away from fire.</li>
                  <li>Avoid direct exposure to the sunlight.</li>
                  <li>
                    If using for infants, elderly and pregnant women, please
                    consult with a doctor before using this product.
                  </li>
                  <li>This oil is not safe to be used around pets.</li>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Review Section */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Customer Reviews
            </Typography>

            {/* Add Review Form */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Add a Review
              </Typography>
              {/* <Rating name="new-review-rating" value={0} onChange={(event, newValue) => { /* handle rating change * / }} /> */}
              <TextField
                label="Write your review..."
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleAddReview}>
                Submit Review
              </Button>
            </Box>

            {/* List of Reviews */}
            <Stack spacing={3}>
              {dummyReviews.map((review) => (
                <Paper
                  key={review.id}
                  sx={{ p: 2, background: theme.palette.background.default }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {review.author}
                  </Typography>
                  {/* <Rating name={`review-rating-${review.id}`} value={review.rating} readOnly size="small" /> */}
                  <Typography variant="body2" color="text.secondary">
                    {review.date}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default ProductView;
