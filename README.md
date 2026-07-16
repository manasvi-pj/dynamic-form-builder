# Dynamic Form Builder & Renderer

A flexible, interactive React application built with Material UI (MUI) and React Hook Form that allows users to dynamically build custom forms, manage fields with inline validations, test the generated layout in real-time, and preserve the configuration across page refreshes.

## Features

- **Dynamic Form Builder**: Add, update, delete, and reorder fields (Text, Number, Dropdown, and Checkbox).
- **Conditional Option Management**: Inline option addition and deletion built natively into Dropdown field components.
- **Smart Validation & Guardrails**:
  - Prevents adding new fields until current empty fields are named.
  - Automatically flags case-insensitive duplicate field labels and enforces uniqueness.
  - Form validation on required text/number inputs and mandatory checkboxes.
- **Robust Real-Time Previews**: Dynamically outputs structured, production-ready `snake_case` JSON keys derived from configured labels upon submission.
- **Persistence Layer**: Implements synchronized data preservation to `localStorage` utilizing custom state wrappers to withstand window refreshes.
- **Polished UX**: Clean layouts built using MUI primitives, persistent layout structural flows during scroll events via header triggers, and smooth automated target scrolls on field insertions.

## Project Structure

```text
src/
├── components/
│   ├── FormBuilder/
│   │   ├── FieldEditor.jsx     # Handles isolated component updates and positioning triggers
│   │   ├── FormBuilder.jsx     # Handles main schema layout, sorting state, and alerts
│   │   └── OptionsEditor.jsx   # Manages contextual inline dropdown array options
│   ├── FormRenderer/
│   │   ├── FormRenderer.jsx    # Resolves valid layout configurations and exposes JSON payload
│   │   └── FieldRenderer.jsx   # Binds dynamic form elements explicitly to React Hook Form controllers
│   └── ScrollToTop.jsx         # Custom FAB window viewport viewport layout utility
├── hooks/
│   └── useLocalStorage.js      # Synchronized state persistent engine wrapper hook
├── utils/
│   ├── constants.js            # Hardcoded structural dictionary parameters and enums
│   └── schema.js               # Formatting utilities, label cleaning, syntax mapping algorithms
├── theme.js                    # Core app configurations and layout variables overrides
├── App.jsx                     # Viewport screen context routing manager
└── main.jsx                    # Dom rendering mounting orchestration engine
```

## Installation & Setup Steps

Follow these sequential steps in your terminal to clone and run the project locally:

1. **Clone the Repository**  
   Clone the repository from GitHub to your local machine using the command below:

   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

2. **Install Application Dependencies**
   Run the standard package manager installation command to download all required
   frontend dependencies (Material UI, React Hook Form, etc.):

   npm install

3. **Launch the Local Development Server**
   Boot up the application local runtime workspace by executing the start script:

   npm start
