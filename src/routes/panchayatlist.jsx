import { Flex, Button, Box } from "@chakra-ui/react";
import Root from "./root";
import TableGenerator from "../components/tableGenerator";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteOrVerify from "../components/actionButtons/deleteOrVerify";
let panchayatData = [
  {
    "USER ID": "0134",
    IMAGE: "https://skskf.in/userimg/IMG-20230627-WA0045_09152023162926.jpg",
    NAME: "KESHAW DAS",
    EMAIL: "keshawkwd666@gmail.com",
    DESIGNATION: "s./lohara",
    DATE: "2023-09-09 13:24:09",
  },
];

export default function PanchayatList() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [action, setAction] = useState("");
  return (
    <>
      <DeleteOrVerify
        formName={"panchayat"}
        action={action}
        modifyId={id}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
      <Root title="Panchayat List">
        <Flex direction="column" mx="auto" mt="4">
          <Box mx="auto">
            <Link to="/createPanchayat">
              <Button colorScheme="teal" mb="4">
                Create Panchayat
              </Button>
            </Link>
          </Box>
          <TableGenerator
            data={panchayatData}
            title="Panchayat"
            setIsOpen={setDialogIsOpen}
            setAction={setAction}
            setId={setId}
          />
        </Flex>
      </Root>
    </>
  );
}
