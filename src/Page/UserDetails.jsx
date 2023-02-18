import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Select,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFilter } from "../redux/data/data.action";

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
    console.log('list:', list)
    const [form, setForm] = useState(filterPayload);
    const [btn, setBtn] = useState();
    const [page, setPage] = useState(0);
    const [text, setText] = useState("");

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
        }
        else if (name === "name") {
            console.log("hello i am here    ")
            if (value === "") {
                form.name = "";
                console.log('form hello here--------------------:', form)
                dispatch(getDataFilter(form));
            } else {
                setForm({ ...form, [name]: value });
                setText(value);
                // dispatch(getDataFilter(form));
            }
        }
        else {
            setForm({ ...form, [name]: value });
        }
        console.log("form:", form);
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
            <Heading m="auto">UserDetails</Heading>
            <Text>{text}</Text>
            <Stack>
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

                    <Select name="sortName" value={form.sortName} onChange={(e) => handleChange(e)}>
                        <option value="">Sort Name</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
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
                <Heading> {page + 1}</Heading>
            </Flex>
            <Box>
                {data &&
                    data.map((item, index) => (
                        <Heading as="h1" key={index}>
                            {index + 1}. {item.name.first}
                        </Heading>
                    ))}
            </Box>
            <Flex
                gap="10px"
                m="auto"
                mt="10px"
                justifyContent="center"
                alignItems="center"
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
        </Box>
    );
}
