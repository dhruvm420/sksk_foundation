import {
  Flex,
  Box,
  Input,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../components/pagination";
import { Center, Spinner } from "@chakra-ui/react";
import TableGenerator from "../components/tableGenerator";
import { useState, useEffect } from "react";
import ActionPopUp from "../components/actionButtons/actionPopUp";
import { setAuthToken, axiosInstance } from "../components/axiosInstance.jsx";
import Root from "./root";
import { useParams } from "react-router-dom";
export default function UnVerifiedList() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [action, setAction] = useState("");
  const [unVerifiedData, setUnVerifiedData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storedValuesString = localStorage.getItem("myValues");
  const storedValues = JSON.parse(storedValuesString);
  const count = (storedValues && storedValues.unverifiedmembers) || 0;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
    // You can perform filtering or any other actions based on the search value here
  };
  function putinDummy(obj, d) {
    let dataItem = {
      USER_ID: "0226",
      NAME: "KESHAW DAS",
      MOBILE: "9999889999",
      CITY: "Kawardha",
      DATE: "2023-09-09 13:24:09",
    };

    dataItem.USER_ID = obj["_id"];
    dataItem.NAME = obj.name;
    dataItem.MOBILE = obj.mobile;
    dataItem.CITY = obj.city;
    dataItem.DATE = getCorrectDate(obj["joiningDate"]);
    d.push(dataItem);
  }
  const fetch = async () => {
    const storedToken = localStorage.getItem("jwtToken"); // Fetch the stored token
    if (storedToken) {
      // Set the token in the Axios headers before making the request
      setAuthToken(storedToken);
      // Make an authenticated request using axiosInstance
      await axiosInstance

        .get(
          `superadmin/crud/member?isVerified=false&limit=10&fields=${searchVal}&page=${currentPage}`
        )
        .then((response) => {
          console.log(response);
          if (response.status != "fail") {
            let obj = response.data.data.response;
            let arr = Object.keys(obj);
            let dumm = [];
            arr.forEach((element) => {
              putinDummy(obj[element], dumm);
            });
            setUnVerifiedData(dumm);
          }
          setDataLoaded(true);
        })
        .catch((error) => {
          setUnVerifiedData([
            {
              "USER ID": null,
              IMAGE: null,
              NAME: null,
              EMAIL: null,
              DESIGNATION: null,
              "Total Tehsil": null,
              DATE: null,
            },
          ]);
          setDataLoaded(true);
          // Handle error, e.g., unauthorized access
          console.error("Error fetching data:", error);
        });
    }
  };
  useEffect(() => {
    fetch();
  }, [searchVal, currentPage]);

  if (!dataLoaded)
    return (
      <>
        <Center height="100vh">
          <Spinner size="xl" color="blue.500" />
          <Text px="2"> Loading... </Text>
        </Center>
      </>
    );
  return (
    <Root title="Unverified Members">
      <Flex direction="column" mx="auto" mt="4">
        <ActionPopUp
          formName={"unverified"}
          action={action}
          modifyId={id}
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
        />
        <Box alignSelf="flex-end">
          <InputGroup my="2">
            <InputRightElement pointerEvents="none">
              <SearchIcon />
            </InputRightElement>
            <Input
              placeholder="Search"
              value={searchVal}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Box>
        <TableGenerator
          data={unVerifiedData}
          title="Unverified Members"
          setIsOpen={setDialogIsOpen}
          setAction={setAction}
          setId={setId}
          actionItems={["verify", "delete"]}
        />
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={count < 10 ? 1 : Math.ceil(count / 10)}
        />
      </Flex>
    </Root>
  );
}
