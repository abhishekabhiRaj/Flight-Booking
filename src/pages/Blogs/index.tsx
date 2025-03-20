import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Stack,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Blog } from "../../types/blog";
import BlogCard from "../../components/Card/BlogCard";
import {
  useBlogListMutation,
  useBlogByTagSlugMutation,
} from "../../store/services/blogListApi";
import LargeAds from "../../components/LargeAds";
import flightImg from "../../img/flight-page-ads.png";
import Help from "../../components/Help";
import CitySlider from "../../components/CitySlider";
import SharedDetails from "../../components/SharedDetails";
import DestinationDeals from "../../components/DestinationDeals";
import "./index.css";
import { TabsWithCustom, TabsWithPadding } from "../../components/Tabs";
import LeftArrowSvg from "../../svg/pagination/left";
import AllLeftArrow from "../../svg/pagination/allLeft";
import RightArrowSvg from "../../svg/pagination/right";
import RightAll from "../../svg/pagination/rightAll";
import { Pagination } from "../../components/FlightResults";
import bg from "../../img/flight_bg.png";
import FakeHeight from "../../components/FakeHeight";
import { BsSearch } from "react-icons/bs";
import SearchIcon from "../../svg/search";
import moment from "moment";


import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as P } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const items = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

const ResponsiveSlider = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ position: 'relative', width: '80%', margin: '20px auto' }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={isMobile ? { clickable: true } : false}
        navigation={!isMobile}
        modules={[P, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ddd',
                borderRadius: '8px',
              }}
            >
              {item}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobile && (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
            }}
            onClick={handlePrev}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
            }}
            onClick={handleNext}
          >
            <ArrowForward />
          </IconButton>
        </>
      )}
    </Box>
  );
};



const categories = ["All", "ADVENTURE", "TRAVEL", "BUDGET", "TRENDING"];

const TRAVEL_IMAGE =
  "https://media.istockphoto.com/id/1526986072/photo/airplane-flying-over-tropical-sea-at-sunset.jpg?s=612x612&w=0&k=20&c=Ccvg3BqlqsWTT0Mt0CvHlbwCuRjPAIWaCLMKSl3PCks=";

// Dummy data generator
const generateDummyBlogs = (category?: string): Blog[] => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `blog-${category || "all"}-${index + 1}`,
    header: [
      "The Art of Budget Travel: Maximizing Adventure on a Shoestring",
      "Top Adventure Destinations for Adrenaline Junkies",
      "How to Save, Invest, and Travel Debt-Free",
      "Hidden Gems: Unexplored Travel Destinations",
      "Backpacking Through Southeast Asia",
    ][Math.floor(Math.random() * 5)],
    description:
      "Discover must-visit spots for adventure lovers, from skydiving in New Zealand to scuba diving in Indonesia. Get insider tips on planning these high-energy trips while staying within your travel budget. Learn about affordable destinations, smart saving tips, and hacks for securing cheap flights and accommodations while still enjoying an adventurous experience.",
    category:
      category || categories[Math.floor(Math.random() * categories.length)],
    imageUrl: TRAVEL_IMAGE,
    readTime: Math.floor(Math.random() * 10) + 5,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    updatedAt: new Date(),
    likesCount: Math.floor(Math.random() * 100),
    shareCount: Math.floor(Math.random() * 50),
  }));
};

const Blogs = () => {
  const [loading, setLoading] = React.useState(true);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState("all");
  // my code

  const [searchBlogs, { data, error, isLoading }] = useBlogListMutation();
  const [searchBlogsBySlug, { data2, error2, isLoading2 }] =
    useBlogByTagSlugMutation();

  const [slug, setSlug] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState([]);

  const [pagination, setPaginationData] = useState({
    page: 1,
    limit: 6,
    pages: 3,
    total: 15,
    next: 2,
    prev: null,
  });
  const handleSearch = async (page) => {
    setSlug(null);
    const requestData = {
      email: "triwizeflights@gmail.com",
      password: "Triwize@123",
      page: page,
    };

    try {
      const result = await searchBlogs(requestData).unwrap();

      if (result) {
        setBlogs(result?.posts);
        setPaginationData(result?.meta?.pagination);
        if (result?.meta?.pagination) {
          let array = [];
          for (let i = 0; i < result?.meta?.pagination.pages; i++) {
            array.push(i + 1);
          }
          setNoOfPage(array);
        }
        // let pagination = {
        //   page: 1,
        //   limit: 6,
        //   pages: 3,
        //   total: 15,
        //   next: 2,
        //   prev: null,
        // };
      } else {
        console.warn("Response structure is different than expected:", result);
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  const handleSearchBySlug = async (page, slug) => {
    const requestData = {
      email: "triwizeflights@gmail.com",
      password: "Triwize@123",
      page: page,
      slug: slug,
    };

    try {
      const result = await searchBlogsBySlug(requestData).unwrap();

      if (result) {
        setBlogs(result?.posts);
        setPaginationData(result?.meta?.pagination);
        if (result?.meta?.pagination) {
          let array = [];
          for (let i = 0; i < result?.meta?.pagination.pages; i++) {
            array.push(i + 1);
          }
          setNoOfPage(array);
        }
        // let pagination = {
        //   page: 1,
        //   limit: 6,
        //   pages: 3,
        //   total: 15,
        //   next: 2,
        //   prev: null,
        // };
      } else {
        console.warn("Response structure is different than expected:", result);
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  useEffect(() => {
    if (!slug) {
      if (active == "all") {
        handleSearch(currentPage);
      } else {
        handleSearchBySlug(currentPage, active);
      }
    } else {
      handleSearchBySlug(currentPage, slug);
    }
  }, [currentPage, active]);

  // --my code

  const filteredBlogs = React.useMemo(() => {
    if (activeTab === 0) {
      return blogs;
    }
    const selectedCategory = categories[activeTab];
    return blogs.filter((blog) => blog.category === selectedCategory);
  }, [activeTab, blogs]);




  const handleTab = (tab) => {
    setSlug(null);
    setAnimating(true); // Start animation
    setTimeout(() => {
      setActive(tab);
      setAnimating(false); // End animation after 500ms
    }, 300);
  };

  let tabs = ["All", "Adventure", "Travel", "Budget", "Trending"];

  const [searchTerm, setSearchTerm] = useState('');


  const filteredData = filteredBlogs.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <>
      <FakeHeight/>
        <div className="blog-page-banner">
          <div className="blog-page-banner-search">
            {/* <BsSearch  color="#FC7300" fontWeight="700" /> */}
            <SearchIcon/>
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search our blogs by topic or keywords"/>
          </div>
          <img width="100%" style={{ zIndex: "-1" }} src={bg} alt="bg" />
        </div>
      <Container maxWidth="lg" sx={{ mb: 3, mt: 3 }}>
        {/* <ResponsiveSlider/> */}
        <div className="cards" style={{marginBottom:'24px'}}>
          <section className="large-blod-card">
            <div className="left">
            <button
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            // cursor: "disabled",
            background: "#A64DFFBA",
            fontSize: "10px",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "6px 10px",
            fontWeight: "700",
          }}
          // onClick={() => {
          //   setSlug(blog.primary_tag?.slug);
          //   handleSearchBySlug(1, blog.primary_tag?.slug);
          // }}
        >
          {filteredData[1]?.primary_tag?.name || "UNCATEGORIZED"}
        </button>
              <img width="100%" src={filteredData[1]?.feature_image || "https://placehold.co/300x200"}  />
            </div>
            <div className="right">
              <p className={!isMobile?"font-16 text-grey-2 font-weight-400 mb-2":"font-12 text-grey-2 font-weight-400 mb-1"}> <i>{moment(filteredData[1]?.created_at).format("MMM DD, YYYY")}         .        {filteredData[1]?.reading_time} min read </i> </p>
              <p className={!isMobile?"font-32 text-grey-1 font-weight-700 mb-2":"font-16 text-grey-1 font-weight-700 mb-1"} style={{lineHeight:!isMobile?'34px':"unset"}}>{filteredData[1]?.title}</p>
              <p className={!isMobile?"font-16 text-grey-2 font-weight-400":"font-12 text-grey-2 font-weight-400"}>{filteredData[1]?.excerpt}</p>
            </div>
          </section>
        </div>
        <div className="cards" style={{marginTop:'0px'}}>
          <div style={{ overflowX: "scroll" }}>
            <TabsWithCustom tabs={tabs} active={active} handleTab={handleTab} />
          </div>

          <div className="blog-card-container" style={{ marginTop: "24px" }}>
            {filteredData.map((blog) => (
              <BlogCard
                blog={blog}
                handleSearchBySlug={handleSearchBySlug}
                setSlug={setSlug}
              />
            ))}
          </div>

          {filteredData.length != 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              {/* Pagination */}
              <Pagination
                totalPages={pagination.pages}
                pageLimit={3}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {filteredData.length === 0 && (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              No blogs found in this category.
            </Box>
          )}
        </div>
      </Container>
      {/* Ads */}
      <LargeAds flightImg={flightImg} />
      {/* Help */}
      <Help />

      {/* City */}
      <CitySlider />

      <div id="contact"></div>

      {/* Share Details */}
      <SharedDetails />

      <DestinationDeals />
    </>
  );
};

export default Blogs;
