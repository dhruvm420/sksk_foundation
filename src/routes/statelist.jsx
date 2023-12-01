import { Flex, Button } from "@chakra-ui/react";
import Root from "./root";
import { Link } from "react-router-dom";
import TableGenerator from "../components/tableGenerator";
let stateData = [
  {
    IMAGE: "https://skskf.in/userimg/IMG-20230627-WA0045_09152023162926.jpg",
    NAME: "KESHAW DAS",
    EMAIL: "keshawkwd666@gmail.com",
    DESIGNATION: "s./lohara",
    "Total District": "2",
    DATE: "2023-09-09 13:24:09",
  },
];

export default function StateList() {
  return (
    <Root title="State List">
      <Flex direction="column" mx="auto" mt="4">
        <Link to="/createState">
          <Button colorScheme="teal" mb="4" mx="auto">
            Create State
          </Button>
        </Link>
        <TableGenerator data={stateData} title="State" />
      </Flex>
    </Root>
  );
}
