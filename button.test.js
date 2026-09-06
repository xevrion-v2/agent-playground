const React = require('react');
const { render } = require('@testing-library/react');
const { Button } = require('../packages/ui/src/index');

async function runTests() {
    try {
        // Test 1: Label rendering
        const { getByText } = render(<Button label="Click Me" />);
        if (!getByText('Click Me')) {
            throw new Error('Button label not rendered');
        }
        console.log('✅ Label rendering passed');

        // Test 2: Disabled state
        const { getByRole } = render(<Button label="Disabled" disabled={true} />);
        const button = getByRole('button');
        if (!button.disabled) {
            throw new Error('Button should be disabled');
        }
        console.log('✅ Disabled state passed');

        console.log('All Button tests passed!');
    } catch (e) {
        console.error('❌ Test failed:', e.message);
        process.exit(1);
    }
}

runTests();
