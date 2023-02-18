import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addData, deleteData } from '../redux/data/data.action';

export default function Home() {
    const { data } = useSelector((store) => store.data);
    // console.log('data:', data)
    const dispatch = useDispatch();
    const handleFetch = () => {
        dispatch(addData());
    }
    const handleDelete = () => {
        dispatch(deleteData());
    }
    return (
        <Flex
            maxW={"1348px"}
            h={"550px"}
            justifyContent={"center"} alignItems="center" gap="10px">
            <Button bg="red.100" onClick={handleFetch}>Fetch</Button>
            <Button bg="blue.100" onClick={handleDelete}>Delete</Button>
            <Button bg="green.100">
                <Link to="/details">UserDetails</Link>
            </Button>
        </Flex>
    )
}
