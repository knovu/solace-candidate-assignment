import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

// Add theme overrides here in the system config
const config = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: { value: 'var(--font-inter)' },
                body: { value: 'var(--font-inter)' },
            },
        },
    },
});

// Extends the default system
const system = createSystem(defaultConfig, config);

export default system;
