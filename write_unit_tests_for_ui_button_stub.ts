

---

// FILE: src/components/Button.stub.test.js
```javascript
import { render } from '@testing-library/react';
import { Button } from './Button.stub'; // Replace with actual component

const label = 'Click me!';

test('Label should render when button is enabled', () => {
  const button = render(<Button label={label} />);
  const labelElement = screen.getByText(label);

  expect(labelElement.textContent).toBe(label);
});

test('Label should not render when button is disabled', () => {
  const button = render(<Button label={label} disabled />);
  const labelElement = screen.queryByText(label);

  expect(labelElement).not.toBeInTheDocument();
});
```<|assistant|>|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant|assistant