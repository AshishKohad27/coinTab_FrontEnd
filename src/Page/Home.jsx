import {
    Box,
    Button,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addData, deleteData } from "../redux/data/data.action";

export default function Home() {
    const { data, loading } = useSelector((store) => store.data);
    console.log("data:", data);
    const [flag, setFlag] = useState(false);
    console.log("loading:", loading);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // console.log('data:', data)
    const toast = useToast();

    const dispatch = useDispatch();
    const handleFetch = () => {
        if (loading) {
            toast({
                title: "Wait for Previous response",
                status: "warning",
                duration: 1000,
                position: "top",
            });
            return;
        } else {
            dispatch(addData());
            toast({
                title: "Fetching process start.",
                status: "info",
                duration: 2000,
                position: "top",
            });
            setFlag(true);
        }
    };

    if (!loading && flag) {
        toast({
            title: "Data Added SuccessFully into database",
            status: "success",
            duration: 2000,
            position: "top",
        });
        setFlag(false);
    }
    return (
        <Box maxW={"1348px"} h={"550px"}>
            <Flex
                maxW={"1348px"}
                m="auto"
                mt="50px"
                justifyContent={"center"}
                alignItems="center"
                gap="10px"
            >
                <Heading>Home Page</Heading>
            </Flex>
            <Flex
                m="auto"
                mt="100px"
                justifyContent={"center"}
                alignItems="center"
                gap="10px"
            >
                <Button bg="blue.100" onClick={handleFetch}>
                    Fetch Users
                </Button>

                <Button onClick={onOpen} bg="red.100">
                    Delete Users
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Users</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <Lorem count={2} /> */}
                            Are you Sure You want to Delete Entries from DataBase
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                No
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    if (data.length === 0) {
                                        toast({
                                            title:
                                                "Database is Empty Add data in database then delete",
                                            status: "error",
                                            duration: 3000,
                                            isClosable: true,
                                            position: "top",
                                        });
                                    } else {
                                        dispatch(deleteData());
                                        toast({
                                            title: "User Deleted Successfully",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true,
                                            position: "top",
                                        });
                                    }
                                    onClose();
                                }}
                                bg="red.300"
                            >
                                Yes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Button bg="green.100">
                    <Link to="/details">User Details</Link>
                </Button>
            </Flex>
        </Box>
    );
}
