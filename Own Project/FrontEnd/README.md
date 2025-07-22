# FrontEnd Packages

# react-redux

The react-redux package is the official binding between React and Redux.  
It allows React components to interact with the Redux store,  
by reading state, and dispatching actions — in a way that’s efficient and easy to manage.

### react-redux Installation:
    npm install react-redux

### What It Does?
Redux by itself is UI-agnostic, meaning it doesn’t care what frontend library (like React, Vue, etc.) you use.  
react-redux bridges that gap for React.

### Why Use react-redux?
- Performance-optimized: It uses efficient re-rendering to avoid unnecessary updates.
- Hooks-based: Modern API supports useSelector, useDispatch, and avoids class components or HOCs.
- Maintained by Redux team: It’s fully supported and works seamlessly with Redux Toolkit.

# @reduxjs/toolkit

The @reduxjs/toolkit package is the official, recommended way to write Redux logic.  
It provides a modern, streamlined API that helps you avoid common pitfalls and boilerplate associated with traditional Redux.

### @reduxjs/toolkit Installation:
    npm install @reduxjs/toolkit

### What is @reduxjs/toolkit?
@reduxjs/toolkit (RTK) is a set of utilities built on top of Redux to simplify:
- Store setup
- Reducer logic
- Async logic (like fetching from APIs)
- Code organization

It’s maintained by the Redux team and is the standard way to use Redux as of Redux v4+.v

### @reduxjs/toolkit Features:
- configureStore - Sets up the store with good defaults (DevTools, middleware, etc.)
- createSlice - Combines reducers and actions into one easy structure
- createAsyncThunk - Handles async logic like API calls with minimal code
- createReducer - Lets you write reducers with Immer-style mutability
- createAction - Simplifies creating Redux action creators

### Why Use @reduxjs/toolkit?
- Less boilerplate – no more huge switch statements
- Opinionated defaults – includes good practices out of the box
- Redux DevTools support enabled by default
- Built-in Immer – allows writing “mutating” code that actually creates immutable updates
- createAsyncThunk – built-in support for async actions
- TypeScript support – first-class TS integration

# react-router-dom

The react-router-dom package is the standard routing library for React applications that run in the browser.  
It lets you create single-page applications (SPAs) with multiple views (URLs) without reloading the page.

### react-router-dom Installation:
    npm install react-router-dom

### What is Routing?
Routing is how your app responds to different URL paths (like /home, /about, etc.) by showing different components.  
In traditional websites, each URL loads a new HTML page. In SPAs with React,  
React Router DOM changes views without refreshing the browser, giving a smoother, faster experience.

### What is react-router-dom?
It’s the browser-specific version of React Router, designed for use in web apps (as opposed to React Native or server environments).

### react-router-dom Features:
- Declarative routing with components
- Nested routes
- Dynamic route matching (e.g. /user/:id)
- Route params and query strings
- Redirects and protected routes
- Navigation with hooks like useNavigate, useParams

### Common react-router-dom Components & Hooks:
- \<BrowserRouter> - Wraps the app; keeps UI in sync with URL
- \<Routes> - Replaces older \<Switch>; holds \<Route>s
- \<Route> - Defines a path → component mapping
- useNavigate() - Programmatically navigate (like history.push)
- useParams() - Access route params like /user/:id
- useLocation() - Access the current location object

### react-router-dom Summary:
- Benefit	Why it matters
- Declarative routing - Easier to read, reason about
- Component-based	- Fits React’s philosophy
- No page reloads	- Fast, smooth user experience
- Dynamic and nested routes - Supports complex UI patterns

# react-icons

The react-icons package provides popular icon libraries as React components,  
so you can easily include scalable icons in your app without dealing with raw SVG or image files.

### react-icons Installation:
    npm install react-icons

### Why Use react-icons?
- One package, many icon sets
- Icons as React components
- Lightweight — tree-shaking supported
- Customizable with CSS or props

### Supported Icon Libraries:
react-icons includes icons from many popular sets, such as:

- Font Awesome - Fa - FaBeer, FaGithub, FaUser
- Material Design - Md - MdHome, MdEmail
- Bootstrap Icons	- Bs - BsFillAlarmFill
- Heroicons - Hi - HiOutlineSearch
- Remix Icon - Ri	- RiMoonClearLine
- Tabler Icons - Tb - TbArrowBack

### Summary:
- SVG icons	Crisp on any screen
- Easy to use	React components
- Massive set	20+ icon libraries
- Tree-shakable	Good for performance

# react-toastify

The react-toastify package is a popular library in React used for displaying toast notifications,  
small temporary popup messages, in a simple and customizable way.

### react-toastify Installation:
    npm install react-toastify

### What Is a Toast?
A toast is a non-blocking UI message that:
- Appears briefly (e.g., bottom-right of screen)
- Automatically disappears after a few seconds
- Can be used for success, error, info, or warning messages

### react-toastify Features:
- Easy to use and configure
- Automatic timeout with optional manual dismissal
- Supports different types of toasts (success, error, info, etc.)
- Custom positioning (top-left, top-right, etc.)
- Works with async actions (like form submission or API responses)

### When to Use react-toastify?
- After API calls (e.g., form success or error)
- Login/logout notifications
- System alerts (like "Copied to clipboard")
- Background job status (e.g., upload complete)

# axios

The axios package is a popular HTTP client for making requests to servers in JavaScript,  
especially in React, Node.js, and other frontend/backend frameworks.

### axios Installation:
    npm install axios

### What is Axios?
axios is a Promise-based HTTP client that lets you:
- Send HTTP requests: GET, POST, PUT, DELETE, etc.
- Handle responses and errors
- Automatically transform JSON data
- Work on both client (browser) and server (Node.js)

### Why Use Axios?
- Simpler and cleaner than native fetch()
- Supports request/response interceptors
- Automatically transforms JSON responses
- Supports timeout, cancellation, and custom headers
- Built-in support for CSRF/XSRF protection

### When to Use Axios
- When making API calls from a frontend like React
- When building a backend service with Node.js
- When you want more control and features than fetch()

<br>

*EOF*
