# React XML Representation

This is a React-based project that allows you to parse and display XML data in a
structured and visual format. The core functionality includes converting XML
strings into a tree structure and rendering them with expandable/collapsible
nodes. It also provides testing utilities and a fully integrated development
environment with Vite and TypeScript.

## Features

- **XML Parsing and Tree Representation**: Converts XML strings into a tree
  structure that is displayed in a React UI.
- **Expandable/Collapsible Nodes**: Visualize the nested structure of XML data
  with the ability to expand or collapse child nodes.
- **TypeScript and React**: Built with TypeScript and React for a strongly
  typed, modern web application.
- **Test Suite**: Includes unit tests using Vitest and React Testing Library to
  ensure the correct behavior of components and utility functions.
- **TailwindCSS**: Uses TailwindCSS for styling the UI components.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/liliangousiou/react-xml-representation.git
    cd react-xml-representation
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```
    The application should now be running at
    [http://localhost:3000](http://localhost:3000).

## Project Structure

The project structure is organized as follows:

```
├── src
│   ├── components
│   │   ├── Title
│   │   │   ├── index.tsx
│   │   │   └── Title.test.tsx
│   │   ├── UploadForm
│   │   │   ├── FileInput.test.tsx
│   │   │   ├── FileInput.tsx
│   │   │   ├── index.tsx
│   │   │   └── UploadForm.test.tsx
│   │   ├── XMLDiagram
│   │   │   ├── index.tsx
│   │   │   ├── XMLDiagram.test.tsx
│   │   │   ├── XMLNode.test.tsx
│   │   │   └── XMLNode.tsx
│   ├── utils
│   │   ├── formatNodeAttrValue.test.tsx
│   │   ├── index.tsx
│   │   ├── parseXML.test.tsx
│   │   └── xmlToTree.test.tsx
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── setupTests.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.json
```


### Key Components

1. **`App.tsx`**:

    - The main component that renders the `Title` and `UploadForm` components,
      structuring the app.

2. **`components/Title.tsx`**:

    - Displays the title at the top of the app.

3. **`components/UploadForm/index.tsx`**:

    - Manages the file upload and conditional rendering of `FileInput` or
      `XMLDiagram` based on XML content.

4. **`components/UploadForm/FileInput.tsx`**:

    - Handles file selection, validation, and error messaging, passing valid XML
      content to the parent.

5. **`components/XMLDiagram/index.tsx`**:

    - Parses and displays the uploaded XML content, rendering it through
      `XMLNode`.

6. **`components/XMLDiagram/XMLNode.tsx`**:
    - Recursively renders XML nodes, their tags, values, attributes, and
      children with expand/collapse functionality.

### Testing

The project uses **Vitest** for testing and **React Testing Library** for
testing React components. The tests are designed to ensure that the components
and utilities work as expected.

To run the tests:

```bash
npm test
```

To clear the test cache and rerun:

```bash
npm run test:clear-and-run
```

### Available Scripts

- `npm run dev`: Start the development server with hot module replacement.
- `npm run build`: Build the production-ready application using TypeScript and
  Vite.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint to check for any code style issues.
- `npm run lint:fix`: Automatically fix any linting issues.
- `npm run format`: Format the code using Prettier.
- `npm test`: Run the tests using Vitest.

### Linting and Formatting

This project uses **ESLint** for linting and **Prettier** for code formatting.
The following rules are in place:

- ESLint checks for potential issues in the JavaScript/TypeScript code.
- Prettier ensures consistent code style, including spaces, line lengths, etc.

To fix issues automatically, you can run:

```bash
npm run lint:fix
```

To format the code, you can run:

```bash
npm run format
```

### TailwindCSS

The project is styled using **TailwindCSS**, a utility-first CSS framework that
allows for rapid UI development. Tailwind is configured in `tailwind.config.js`,
and you can customize the design system as needed.

### Dependencies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **TailwindCSS**: A utility-first CSS framework.
- **Vite**: A fast build tool and development server for modern web projects.
- **Vitest**: A testing framework for unit and integration tests.

### Development Setup

1. **Vite**: The development server is powered by Vite, which provides fast and
   efficient builds with hot-reloading support.
2. **TypeScript**: This project is written in TypeScript, and it includes type
   definitions for React and other dependencies.
3. **ESLint and Prettier**: Ensure your code adheres to a consistent style.

## License

Created by _Lilian Gousiou_ for [Axiomatics](https://axiomatics.com) interview
process.
