import { Table, VStack } from '@chakra-ui/react';
import React from 'react';

export interface AdvocateTableProps {}

const AdvocateTable = (props: AdvocateTableProps) => {
    const {} = props;

    return (
        <VStack w="100%">
            <Table.Root>
                <Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>First name</Table.ColumnHeader>
                            <Table.ColumnHeader>Last name</Table.ColumnHeader>
                            <Table.ColumnHeader>City</Table.ColumnHeader>
                            <Table.ColumnHeader>Degree</Table.ColumnHeader>
                            <Table.ColumnHeader>Specialties</Table.ColumnHeader>
                            <Table.ColumnHeader>Years of experience</Table.ColumnHeader>
                            <Table.ColumnHeader>Phone number</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                </Table.Header>
            </Table.Root>
        </VStack>
    );
};

export default AdvocateTable;
