import React from 'react';
import { Box, Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { AdvocateTable } from './components';

const Home = () => {
    return (
        <VStack w="100%" h="100vh">
            {/* Page header */}
            <HStack w="100%" h={12} bgColor="#265b4e" justify="center">
                <Heading color="white">Solace Candidate Assignment</Heading>
            </HStack>

            {/* Page content */}
            <Box py={5}>
                <AdvocateTable />
            </Box>

            <Spacer />

            {/* Page footer */}
            <HStack py={5} px={5} w="100%" justify={'center'}>
                <Heading fontSize={'sm'}>
                    © {new Date().getFullYear()} Find Solace, Inc. All rights reserved.
                </Heading>
            </HStack>
        </VStack>
    );
};

export default Home;
