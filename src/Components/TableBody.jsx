import { Td, Tr } from '@chakra-ui/react'
import React from 'react'

export default function TableBody({ item, index }) {
    return (
        <Tr m="auto">
            <Td>{index}</Td>
            <Td>{item.name.title} {item.name.first} {item.name.last}</Td>
            <Td>{item.gender}</Td>
            <Td>{item.dob.age}</Td>
            <Td>{item.location.country}</Td>
            <Td>{item.location.city}</Td>
        </Tr>
    )
}
