import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';

interface BreadcrumbRoute {
  path: string;
  name: string;
  icon?: React.ElementType;
}

interface CustomBreadcrumbsProps {
  routes: BreadcrumbRoute[];
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ routes }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {routes.map((route, index) => {
        const isLast = index === routes.length - 1;

        return isLast ? (
          <Typography
            key={route.path}
            color="text.primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {route.icon && <route.icon sx={{ mr: 0.5, fontSize: "inherit" }} />}
            {route.name}
          </Typography>
        ) : (
          <Link
            key={route.path}
            component={RouterLink}
            to={route.path}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {route.icon && <route.icon sx={{ mr: 0.5, fontSize: "inherit" }} />}
            {route.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
