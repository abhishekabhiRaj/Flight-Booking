import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { Blog } from "../../types/blog";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment";

interface BlogCardProps {
  blog: Blog;
}

const BlogCardOld = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  // Format date with fallback
  const formatDate = (date: Date | undefined) => {
    if (!date) return "No date";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "none",
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
        bgcolor: "white",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          paddingTop: "66.67%" /* 3:2 aspect ratio */,
        }}
      >
        <CardMedia
          component="img"
          image={blog.feature_image || "https://placehold.co/300x200"}
          alt={blog.header || "Blog image"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Chip
          label={blog.slug || "UNCATEGORIZED"}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "#7C3AED",
            color: "white",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            fontWeight: 600,
            borderRadius: "12px",
            px: 2,
            py: 1,
            height: "auto",
            "& .MuiChip-label": {
              px: 0,
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              {formatDate(blog.created_at)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              {`${blog.reading_time || 5} min read`}
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: "1.25rem",
              lineHeight: 1.4,
              color: "#1A1A1A",
            }}
          >
            {blog.title || "Untitled Blog"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666666",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.6,
              fontSize: "0.9375rem",
            }}
          >
            {/* {blog.html || "No description available"} */}
            {blog.html ? parse(blog.html) : "No description available"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const BlogCard = ({ blog, handleSearchBySlug, setSlug }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };
  return (
    <section
      className="benefit_card shadow-small"
      style={{
        // width: "",
        // display: "flex",
        padding: "12px",
        border: "1px solid #e5e5e5",
        // margin: "12px",
        borderRadius: "8px",
        // borderRight: i !== 2 ? "1px solid #d3d3d3" : undefined, // Apply borderRadius conditionally
      }}
    >
      <div
        className="left"
        style={{
          fontSize: "64px",
          fontWeight: "500",
          color: "#EBD9FF",
          position: "relative",

          // paddingLeft: "12px",
        }}
      >
        <button
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            cursor: "pointer",
            background: "#A64DFFBA",
            fontSize: "10px",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "6px 10px",
            fontWeight: "700",
          }}
          onClick={() => {
            setSlug(blog.primary_tag?.slug);
            handleSearchBySlug(1, blog.primary_tag?.slug);
          }}
        >
          {blog.primary_tag?.name || "UNCATEGORIZED"}
        </button>
        <div
          style={{
            borderRadius: "8px",
            width: "100%",
            height: "180px",
            overflow: "hidden",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <img
            width="100%"
            src={blog.feature_image || "https://placehold.co/300x200"}
          />
        </div>
      </div>
      <div className="right">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "#525252",
            marginBottom: "12px",
          }}
        >
          <span>
            <i>{moment(blog.created_at).format("MMM DD, YYYY")}</i>
          </span>
          <span>
            <i>{blog.reading_time} min read</i>
          </span>
        </div>
        <p
          style={{
            margin: "0px",
            marginTop: "0px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleClick(blog.id)}
          className="font-18 font-weight-700 text-grey-1 hover-text"
        >
          {blog.title}
        </p>
        <p
          style={{ margin: "0px" }}
          className="font-12 font-weight-400 text-grey-2"
        >
          {blog.excerpt.length > 200
            ? blog.excerpt.slice(0, 200) + "..."
            : blog.excerpt}
        </p>
      </div>
    </section>
  );
};

export default BlogCard;
