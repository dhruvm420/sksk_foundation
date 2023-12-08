import { Box, Heading, Flex } from "@chakra-ui/react";
import Header from "../components/header.jsx";
import Sidebar from "../components/sidebar.jsx";
import ListPreview from "../components/listPreview.jsx";
import DashboardCards from "../components/dashboardCards.jsx";
import Root from "./root.jsx";
import { useState } from "react";
let dummyData = {
  State: {
    count: "11",
  },
  District: {
    count: "19",
  },
  Tehsil: {
    count: "33",
  },
  Panchayat: {
    count: "12",
  },
  "Verified Members": {
    count: "31",
  },
  "Unverified Members": {
    count: "39",
  },
  Complaints: {
    count: "40",
  },
  Testimonials: {
    count: "80",
  },
  Donations: {
    count: "98",
  },
  "Contact Us": {
    count: "18",
  },
  Management: {
    count: "53",
  },
  "Public User List": {
    count: "81",
  },
};
let posts = [
  {
    POSTDATE: "2023-09-07 16:22:24",
    TITLE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    POSTDATE: "2023-09-07 16:22:24",
    TITLE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    POSTDATE: "2023-09-07 16:22:24",
    TITLE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    POSTDATE: "2023-09-07 16:22:24",
    TITLE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    POSTDATE: "2023-09-07 16:22:24",
    TITLE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
];
let complaints = [
  {
    NAME: "2023-09-07 16:22:24",
    MESSAGE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    NAME: "2023-09-07 16:22:24",
    MESSAGE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    NAME: "2023-09-07 16:22:24",
    MESSAGE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    NAME: "2023-09-07 16:22:24",
    MESSAGE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
  {
    NAME: "2023-09-07 16:22:24",
    MESSAGE: "SKSK Foundation",
    DESCRIPTION: "SKSK Foundation",
  },
];
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  let postPreview = (
    <ListPreview data={posts} head="Latest Posts" title="TITLE" link="/posts" />
  );
  let complaintsPreview = (
    <ListPreview
      data={complaints}
      head="Latest Suggestions / Complaints"
      title="MESSAGE"
      link="/complaints"
    />
  );
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <Root title="Admin Dashboard">
      <Box w="85vw" p="6">
        <Flex padding="4" justifyContent="space-between" wrap="wrap">
          <DashboardCards data={dashboardData} />
          {postPreview} {complaintsPreview}
        </Flex>
      </Box>
    </Root>
  );
}
