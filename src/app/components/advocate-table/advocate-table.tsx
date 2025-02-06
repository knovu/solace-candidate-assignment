import React from 'react';
import { For, HStack, Table, VStack } from '@chakra-ui/react';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../ui';

export interface AdvocateTableProps {}

const AdvocateTable = (props: AdvocateTableProps) => {
    const {} = props;

    return (
        <VStack w="100%">
            <Table.Root>
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

                <Table.Body>
                    <For
                        each={[]}
                        fallback={
                            <VStack textAlign="center" fontWeight="medium">
                                No items to show
                            </VStack>
                        }>
                        {(item, index) => (
                            <Table.Row key={`row-${index}`}>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                                <Table.Cell>{item.placeholder}</Table.Cell>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>

                <PaginationRoot>
                    <HStack wrap="wrap">
                        <PaginationPrevTrigger />
                        <PaginationItems />
                        <PaginationNextTrigger />
                    </HStack>
                </PaginationRoot>
            </Table.Root>
        </VStack>
    );
};

export default AdvocateTable;
