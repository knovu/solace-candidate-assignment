'use client';

import React from 'react';
import { For, HStack, Table, VStack } from '@chakra-ui/react';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../ui';
import useGetAdvocates from './useGetAdvocates';
import { useEffect } from 'react';
import { useState } from 'react';
import AdvocateTableSearch from './advocate-table-search';

export interface AdvocateTableProps {}

const AdvocateTable = (props: AdvocateTableProps) => {
    const {} = props;
    const { advocateData, error, isLoading, refetch } = useGetAdvocates();
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <VStack w="100%" px={10}>
            <HStack w="100%" justify={'end'}>
                <AdvocateTableSearch search={search} onSearch={setSearch} />
            </HStack>
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
                        each={advocateData?.data}
                        fallback={
                            <VStack textAlign="center" fontWeight="medium">
                                No items to show
                            </VStack>
                        }>
                        {(item, index) => (
                            <Table.Row key={`row-${index}`}>
                                <Table.Cell>{item.firstName}</Table.Cell>
                                <Table.Cell>{item.lastName}</Table.Cell>
                                <Table.Cell>{item.city}</Table.Cell>
                                <Table.Cell>{item.degree}</Table.Cell>
                                <Table.Cell>{(item.specialties as string[]).join(', ')}</Table.Cell>
                                <Table.Cell>{item.yearsOfExperience}</Table.Cell>
                                <Table.Cell>{item.phoneNumber}</Table.Cell>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>

                <PaginationRoot
                    count={advocateData?.pageInfo?.totalCount ?? 0}
                    pageSize={limit}
                    page={Math.floor((offset ?? 0) / (limit ?? 1)) + 1}>
                    <HStack>
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
