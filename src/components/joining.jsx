import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { axiosInstance, setAuthToken } from "../utilities/axiosInstance";
import JoinLetter from "./makeJoiningLetter";
export default function Joining() {
  const { listName, userId } = useParams();
  const [userData, setUserData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const fetch = async () => {
    const storedToken = localStorage.getItem("jwtToken"); // Fetch the stored token
    let url = `/superadmin/crud/${listName}/${userId}`;
    if (storedToken) {
      // Set the token in the Axios headers before making the request
      setAuthToken(storedToken);

      // Make an authenticated request using axiosInstance
      await axiosInstance
        .get(url)
        .then((response) => {
          let obj = response.data.data.response[0];
          setUserData(obj);
          setDataLoaded(true);
        })
        .catch((error) => {
          setUserData({
            "USER ID": null,
            IMAGE: null,
            NAME: null,
            EMAIL: null,
            DESIGNATION: null,
            "Total District": null,
            DATE: null,
          });
          setDataLoaded(true);
          // Handle error, e.g., unauthorized access
          console.error("Error fetching data:", error);
        });
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  if (!dataLoaded)
    return (
      <>
        <Center height="100vh">
          <Spinner size="xl" color="blue.500" />
          <Text px="2"> Loading... </Text>
        </Center>
      </>
    );
  return <JoinLetter data={userData} type = {listName} />;
}
