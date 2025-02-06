'use client';

import React from 'react';
import { For, HStack, Spinner, Table, Text, VStack } from '@chakra-ui/react';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../ui';
import useGetAdvocates from './useGetAdvocates';
import { useState } from 'react';
import AdvocateTableSearch from './advocate-table-search';
import { useCallback } from 'react';

export interface AdvocateTableProps {}

const AdvocateTable = (props: AdvocateTableProps) => {
    const {} = props;
    const { data, isLoading, fetchData } = useGetAdvocates();
    const [limit] = useState<number | undefined>(10);
    const [offset, setOffset] = useState<number | undefined>(0);
    const [search, setSearch] = useState<string | undefined>('');

    const handleOnSearch = useCallback((value?: string | undefined) => {
        setSearch(value);
        fetchData({
            limit,
            offset,
            search,
        });
    }, []);

    const handleOnNavigateToPreviousPage = useCallback(() => {
        const newOffset = offset != undefined ? offset - 10 : undefined;
        setOffset(newOffset);
        fetchData({
            limit,
            offset: newOffset,
            search,
        });
    }, []);

    const handleOnNavigateToNextPage = useCallback(() => {
        const newOffset = offset != undefined ? offset + 10 : undefined;
        setOffset(newOffset);
        fetchData({
            limit,
            offset: newOffset,
            search,
        });
    }, []);

    return (
        <VStack w="100%" px={10}>
            {/* TODO: Convert loading to a skeleton */}
            {isLoading ? (
                <VStack px={300} py={50} bgColor="gray.300" w={'100%'} colorPalette={'black'}>
                    <Spinner size="lg" />
                    <Text>Loading advocates...</Text>
                </VStack>
            ) : (
                <>
                    <HStack w="100%" justify={'end'}>
                        <AdvocateTableSearch search={search} onSearch={handleOnSearch} />
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
                                each={data?.data || []}
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
                                        <Table.Cell>
                                            {(item.specialties as string[]).join(', ')}
                                        </Table.Cell>
                                        <Table.Cell>{item.yearsOfExperience}</Table.Cell>
                                        <Table.Cell>{item.phoneNumber}</Table.Cell>
                                    </Table.Row>
                                )}
                            </For>
                        </Table.Body>

                        <PaginationRoot
                            count={data?.pageInfo?.totalCount ?? 0}
                            pageSize={limit}
                            page={Math.floor((offset ?? 0) / (limit ?? 1)) + 1}>
                            <HStack>
                                <PaginationPrevTrigger onClick={handleOnNavigateToPreviousPage} />
                                <PaginationItems />
                                <PaginationNextTrigger onClick={handleOnNavigateToNextPage} />
                            </HStack>
                        </PaginationRoot>
                    </Table.Root>
                </>
            )}
        </VStack>
    );
};

export default AdvocateTable;
