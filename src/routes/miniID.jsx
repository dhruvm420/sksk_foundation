import { Flex, Box, Text, Button, list } from "@chakra-ui/react";
import FrontID from "../components/actionButtons/idCards/frontID";
import BackID from "../components/actionButtons/idCards/backID";
import state_front from "../assets/state-front.png";
import state_back from "../assets/state-back.png";
import district_front from "../assets/district-front.png";
import district_back from "../assets/district-back.png";
import tehsil_front from "../assets/tehsil-front.png";
import tehsil_back from "../assets/tehsil-back.png";
import panchayat_front from "../assets/panchayat-front.png";
import panchayat_back from "../assets/panchayat-back.png";
import qr from "../assets/qr.png";
import html2canvas from "html2canvas";
import { useState } from "react";
import Header from "../components/header";
import { useParams } from "react-router-dom";
export default function MiniID() {
  const { listName } = useParams();
  const userData = JSON.parse(localStorage.getItem("userKaData"));
  if (userData["fatherName"]) userData.sonOf = userData["fatherName"];
  const [cardImage, setCardImage] = useState("");
  const handleDownload = () => {
    const idCardElement = document.getElementById("id-card");
    if (idCardElement) {
      html2canvas(idCardElement, {
        allowTaint: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        setCardImage(dataUrl);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "id-card.png";
        link.click();
      });
    }
  };
  let bg_front, bg_back;
  if (listName == "state") {
    bg_front = state_front;
    bg_back = state_back;
  } else if (listName == "district") {
    bg_front = district_front;
    bg_back = district_back;
  } else if (listName == "tehsil") {
    bg_front = tehsil_front;
    bg_back = tehsil_back;
  } else if (listName == "panchayat") {
    bg_front = panchayat_front;
    bg_back = panchayat_back;
  }
  return (
    <>
      <Header title={`ID Card`} noHamburger={true} />
      <Box mx="auto">
        <Flex flexDirection="column">
          <Flex
            justifyContent="space-around"
            py="8"
            px="2"
            wrap="wrap"
            mx="auto"
            id="id-card"
          >
            <Flex flexDirection="column">
              <Flex
                id="front-side"
                w="340px"
                h="550px"
                flexDirection="column"
                justifyContent="end"
                px="6"
                pb="24"
                backgroundImage={bg_front}
                backgroundPosition="cover"
                backgroundSize="cover"
              >
                <Box
                  w="150px"
                  h="150px"
                  borderRadius="xl"
                  overflow="auto"
                  margin="auto"
                  my="0"
                  p="2"
                >
                  <img
                    src={`https://sksk-backend.onrender.com/${userData.profilePictureLink}`}
                    alt="user-image"
                    crossOrigin="anonymous"
                    // crossorigin="anonymous"
                  />
                </Box>
                <Text fontSize="xl" my="1" px="2" textAlign="center">
                  {userData.name.toUpperCase()}
                </Text>
                <FrontID userData={userData} />
              </Flex>
            </Flex>
            <Flex flexDirection="column" mx="4">
              <Flex
                id="back-side"
                w="340px"
                h="550px"
                flexDirection="column"
                justifyContent="center"
                px="6"
                pb="14"
                backgroundImage={bg_back}
                backgroundPosition="center"
                backgroundSize="cover"
              >
                <Box
                  w="150px"
                  h="150px"
                  borderRadius="xl"
                  overflow="auto"
                  margin="auto"
                  my="0"
                  p="2"
                >
                  <img src={qr} alt="user-image" />
                </Box>
                <BackID userData={userData} />
              </Flex>
            </Flex>
          </Flex>
          <Box textAlign="center" mt="4">
            <Button onClick={handleDownload} colorScheme="teal">
              <Text fontSize={["sm", "base", "lg"]}>Download ID Card</Text>
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
