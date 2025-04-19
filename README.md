# TypeOn React Component
A simple and customizable React component that creates a typewriter effect for text animation. Written in TypeScript with zero dependencies.

## Features
- Lightweight and performant
- Zero dependencies
- Fully customizable

## Installation
```bash
npm install typeon-react
# or
yarn add typeon-react
```

## Usage
```tsx
import { TypeOn } from 'typeon-react';

function App() {
  return (
    <TypeOn
      phrases={['Hello World!', 'Welcome to my website', 'This is a typewriter effect']}
      baseSpeed={24}
      pauseDuration={3000}
      className="my-custom-class"
    />
  );
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| phrases | string[] | required | Array of phrases to type |
| baseSpeed | number | 24 | Characters per second |
| pauseDuration | number | 3000 | Milliseconds to pause between phrases |
| className | string | 'title-keyword-text' | CSS class name for styling |

## Styling
The component renders a `span` element with your provided className, which contains the phrases being typed-on. The typing cursor is rendered as a `span` with the class `cursor`. The cursor character is an underscore `_` by default; you can change this by modifying the contents of the `cursor` span in `TypeOn.tsx`. You can style the typed phrase span and the cursor elements using CSS:

```css
.type-on-text {
  font-family: monospace;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
```

## Examples

### Basic Usage
```tsx
<TypeOn phrases={['Simple', 'Easy', 'Fast']} />
```

### Custom Speed and Pause Duration
```tsx
<TypeOn 
  phrases={['Faster typing', 'Longer pauses']}
  baseSpeed={50}  // Faster typing
  pauseDuration={5000}  // Longer pauses
/>
```

### Custom Styling
```tsx
<TypeOn 
  phrases={['Custom styled text']}
  className="my-fancy-text"
/>
```

## Dependencies
This library has zero dependencies and only requires React as a peer dependency.

Note: The demo project in the repository includes additional dependencies, but these are only for demonstration purposes and are not required to use the library in your project.

## Contributing
Contributions are welcome! 

## License
MIT © Mike Thorn