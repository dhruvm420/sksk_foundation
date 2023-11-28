import { Flex, Button } from "@chakra-ui/react";
import Root from "./root";
import TableGenerator from "../components/tableGenerator";
let districtData = [
  {
    IMAGE: "https://skskf.in/userimg/IMG-20230627-WA0045_09152023162926.jpg",
    NAME: "KESHAW DAS",
    EMAIL: "keshawkwd666@gmail.com",
    DESIGNATION: "s./lohara",
    "Total Tehsil": "2",
    DATE: "2023-09-09 13:24:09",
  },
];

export default function DistrictList() {
  return (
    <Root title="District List">
      <Flex direction="column" mx="auto" mt="4">
        <Button colorScheme="teal" mb="4" mx="auto">
          Create District
        </Button>
        <TableGenerator data={districtData} title="District" />
      </Flex>
    </Root>
  );
}
