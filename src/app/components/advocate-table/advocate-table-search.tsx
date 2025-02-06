import React from 'react';
import { Button, InputGroup } from '../ui';
import { HStack, Icon } from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { Input } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useState } from 'react';

interface AdvocateTableSearchProps {
    search?: string;
    onSearch?: (value: string) => void;
}

const AdvocateTableSearch = (props: AdvocateTableSearchProps) => {
    const { search, onSearch } = props;
    const [value, setValue] = useState<string>(search || '');

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;

            if (onSearch) {
                onSearch(val);
            }

            return setValue(val);
        },
        [onSearch],
    );

    const handleOnSubmit = useCallback(() => {
        if (onSearch) {
            onSearch(value);
        }
    }, [onSearch, value]);

    const handleOnKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && onSearch) {
                onSearch(value);
            }
        },
        [onSearch, value],
    );

    return (
        <HStack>
            <InputGroup startElement={<Icon as={BiSearchAlt} />}>
                <Input value={value} onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
            </InputGroup>
            <Button bgColor={'gray.400'} _hover={{ opacity: 0.7 }}>
                Clear
            </Button>
            <Button bgColor={'#265b4e'} _hover={{ opacity: 0.7 }} onClick={handleOnSubmit}>
                Search
            </Button>
        </HStack>
    );
};

export default AdvocateTableSearch;
