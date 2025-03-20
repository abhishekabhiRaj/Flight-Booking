import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Skeleton,
} from "@mui/material";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Blog } from "../../types/blog";
import { Facebook, Twitter, Share2 } from "lucide-react";
import { useBlogPostByIdQuery } from "../../store/services/blogListApi";
import parse from "html-react-parser";
import "./index.css";
import FakeHeight from "../../components/FakeHeight";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [loading, setLoading] = React.useState(true);

  // my code

  const { data, error, isLoading } = useBlogPostByIdQuery(id);

  useEffect(() => {
    if (data) {
      setBlog(data.posts[0]);
    }
  }, [data]);

  const handleShare = async (platform: "facebook" | "twitter") => {
    if (!blog || !id) return;

    const url = window.location.href;
    let shareUrl = "";

    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(blog.header)}`;
    }

    // Update share count in Firebase
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, {
        shareCount: increment(1),
      });

      // Open share dialog
      window.open(shareUrl, "_blank", "width=600,height=400");

      // Update local state
      setBlog((prev) =>
        prev ? { ...prev, shareCount: (prev.shareCount || 0) + 1 } : null
      );
    } catch (error) {
      console.error("Error updating share count:", error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh" }}>
        {/* Hero Section Skeleton */}
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            position: "relative",
            bgcolor: "grey.200",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <Stack spacing={3} maxWidth="800px">
              <Skeleton variant="text" height={80} width="80%" />
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={80} />
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Content Section Skeleton */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack direction="row" spacing={4}>
            {/* Left Sidebar Skeleton */}
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                position: "sticky",
                top: 24,
                alignSelf: "flex-start",
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Skeleton variant="text" width={60} height={40} />
                <Skeleton variant="text" width={40} />
              </Stack>

              <Divider sx={{ width: "100%" }} />

              <Stack alignItems="center" spacing={1}>
                <Skeleton variant="text" width={60} height={40} />
                <Skeleton variant="text" width={40} />
              </Stack>

              <Stack spacing={1} sx={{ mt: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </Stack>
            </Stack>

            {/* Main Content Skeleton */}
            <Box sx={{ flex: 1, maxWidth: 800 }}>
              <Stack spacing={2}>
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} width="80%" />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F8F9FA",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Blog not found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <FakeHeight />
      <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh" }}>
        {/* Hero Section */}
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={blog.feature_image}
            alt={blog.slug}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Container
            maxWidth="lg"
            sx={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              zIndex: 2,
            }}
          >
            <Stack spacing={3} maxWidth="800px">
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {blog.title}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                divider={
                  <Box component="span" sx={{ opacity: 0.6 }}>
                    •
                  </Box>
                }
              >
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {blog.slug}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {`${blog.reading_time} minute read`}
                </Typography>
                {/* <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {`${blog.likesCount}K Likes`}
              </Typography> */}
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Content Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack direction="row" spacing={4}>
            {/* Left Sidebar - Share Section */}
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                position: "sticky",
                top: 24,
                alignSelf: "flex-start",
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  {blog.likesCount || 0}K
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666666",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  views
                </Typography>
              </Stack>

              <Divider sx={{ width: "100%" }} />

              <Stack alignItems="center" spacing={1}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  {blog.shareCount || 0}K
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666666",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  shares
                </Typography>
              </Stack>

              <Stack spacing={1} sx={{ mt: 2 }}>
                <IconButton
                  onClick={() => handleShare("facebook")}
                  sx={{
                    bgcolor: "#1877F2",
                    color: "white",
                    "&:hover": { bgcolor: "#1877F2" },
                  }}
                >
                  <Facebook size={20} />
                </IconButton>
                <IconButton
                  onClick={() => handleShare("twitter")}
                  sx={{
                    bgcolor: "#1DA1F2",
                    color: "white",
                    "&:hover": { bgcolor: "#1DA1F2" },
                  }}
                >
                  <Twitter size={20} />
                </IconButton>
              </Stack>
            </Stack>

            {/* Main Content */}
            <Box sx={{ flex: 1, maxWidth: 800 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  color: "#444",
                  "& p": { mb: 3 },
                }}
              >
                <div className="short-image">
                  {blog.html ? parse(blog.html) : "No description available"}
                </div>
                {/* <Typography component="p" sx={{ my: 0 }}>
                Structured gripped tape invisible moulded cups for sauppor firm hold strong powermesh front liner sport detail. 
                Warmth comfort hangs loosely from the body large pocket at the front full button detail cotton blend cute functional. 
                Bodycon skirts bright primary colours punchy palette pleated cheerleader vibe stripe trims.
              </Typography>
              <Typography component="p" sx={{ my: 0 }}>
                Striking pewter studded epaulettes silver zips inner drawstring waist channel urban edge single-breasted jacket. 
                Engraved attention to detail elegant with neutral colours chime quartz leather strap fastens with a pin buckle. 
                Workwear bow detailing a slingback buckle strap stiletto heel timeless new season glamorous.
              </Typography> */}
              </Typography>

              {/* <Box component="blockquote" sx={{ 
              my: 6,
              pl: 4,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                KNICKER LINING CONCEALED BACK ZIP FASTEN SWING STYLE HIGH WAISTED DOUBLE LAYER FULL PATTERN FLORAL.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Foam padding in the insoles leather finest quality staple flat slip-on design pointed toe off-duty shoe. 
                Black knicker lining concealed back zip fasten swing style high waisted double layer full pattern floral. 
                Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design.
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#444' }}>
              Effortless comfortable full leather lining eye-catching unique detail to the toe low 'cut-away' sides clean and sleek. 
              Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design.
            </Typography>

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Key Features:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Crisp fresh iconic elegant timeless clean perfume</li>
                <li>Neck straight sharp silhouette and dart detail</li>
                <li>Machine wash cold slim fit premium stretch selvedge denim comfortable low waist</li>
              </ul>
            </Box> */}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default BlogDetail;
