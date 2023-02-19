import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Select,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFilter } from "../redux/data/data.action";
import TableBody from "../Components/TableBody";
import { Link } from "react-router-dom";

let filterPayload = {
    page: 1,
    limit: "",
    ageL: 100,
    ageR: 0,
    country: "",
    gender: "",
    name: "",
    age: "",
    sortAge: "",
};

export default function UserDetails() {
    const dispatch = useDispatch();
    const { data, length, list } = useSelector((store) => store.data);
    const [form, setForm] = useState(filterPayload);
    const [btn, setBtn] = useState();
    const [page, setPage] = useState(0);
    const [text, setText] = useState("");
    console.log("text:", text);

    useEffect(() => {
        dispatch(getDataFilter(form));
    }, [dispatch, form]);

    useEffect(() => {
        let arr = new Array(length && length.paginationLimit).fill(0);
        setBtn(arr);
    }, [data, form, length]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "age") {
            let split = e.target.value.split(",").map(Number);
            let ageL = split[0];
            let ageR = split[1];
            setForm({ ...form, age: value, ageL, ageR });
            setPage(0);
        } else if (name === "name") {
            if (value === "") {
                console.log("helo");
                form.name = "";
                dispatch(getDataFilter(form));
            } else {
                setForm({ ...form, [name]: value });
                setText(value);
            }
            setPage(0);
        } else if (name === "sortName") {
            setForm({ ...form, [name]: value });
        } else {
            setForm({ ...form, [name]: value });
            setPage(0);
        }
        setText(value);
    };

    const handleReset = () => {
        setForm(filterPayload);
        setPage(0);
        dispatch(getDataFilter(filterPayload));
    };

    const handlePagination = (value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(getDataFilter({ ...form, page: page + 1 }));
    }, [page, dispatch, form]);

    return (
        <Box maxW={"1348px"} m="auto">
            <Flex
                maxW={"1348px"}
                m="auto"
                mt="50px"
                justifyContent={"center"}
                alignItems="center"
                gap="10px"
            >
                <Button colorScheme="Orange" bg="Orange">
                    <Link to="/">Back</Link>
                </Button>
                <Heading>User Details Page</Heading>
            </Flex>
            {/* <Text>{text}</Text> */}
            <Stack mt="50px">
                <Box>
                    <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Search Name"
                    />
                </Box>
                <Flex gap="10px">
                    <Select
                        name="gender"
                        value={form.gender}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>

                    <Select
                        name="limit"
                        value={form.limit}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select Page Limit</option>
                        <option value="10">10 Items</option>
                        <option value="15">15 Items</option>
                        <option value="20">20 Items</option>
                    </Select>

                    <Select
                        name="country"
                        value={form.country}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select Country</option>
                        {list.countryArray &&
                            list.countryArray.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))}
                    </Select>

                    <Select name="age" value={form.age} onChange={(e) => handleChange(e)}>
                        <option value="">Select Age Range</option>
                        <option value={`18,0`}>below 18</option>
                        <option value={`30,18`}>above 18 and less than 30</option>
                        <option value={`50,30`}>above 30 and less than 50</option>
                        <option value={`70,50`}>above 50 and less than 70</option>
                        <option value={`100,70`}>above 70 and less than 100</option>
                        <option value={`100,0`}>Reset Age</option>
                    </Select>

                    <Select
                        name="sortName"
                        value={form.sortName}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Sort Name</option>
                        <option value="asc">Ascending order</option>
                        <option value="desc">Descending order</option>
                    </Select>

                    <Button onClick={handleReset} p={5} w="200px" bg="blue.200">
                        Reset
                    </Button>
                </Flex>
            </Stack>

            <Flex
                gap="10px"
                m="auto"
                mt="10px"
                justifyContent="center"
                alignItems="center"
            >
                <Heading>Page {page + 1}</Heading>
            </Flex>
            <Box>
                <TableContainer>
                    <Table variant="striped" colorScheme="red">
                        <TableCaption>List of Users</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>SrNo.</Th>
                                <Th>Name</Th>
                                <Th>Gender</Th>
                                <Th>Age</Th>
                                <Th>Country</Th>
                                <Th>City</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data &&
                                data.map((item, index) => (
                                    <TableBody index={index + 1} key={index} item={item} />
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            {data.length !== 0 ? (
                <Flex
                    gap="10px"
                    m="auto"
                    mt="10px"
                    maxW={"1000px"}
                    justifyContent="center"
                    alignItems="center"
                    mb="50px"
                >
                    <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
                        Prev
                    </Button>

                    {btn &&
                        btn.map((item, index) => (
                            <Button
                                onClick={() => handlePagination(index)}
                                key={index}
                                style={index === page ? { background: "red" } : null}
                            >
                                {index + 1}
                            </Button>
                        ))}

                    <Button
                        disabled={length && page + 1 === length.paginationLimit}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </Flex>
            ) : null}
        </Box>
    );
}
