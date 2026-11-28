// The React topic notes (30 topics, in the order of data/roadmap.ts): 23 deep notes (9 of them extra deep, 8 with a "How to decide" section) and 7 light notes.
// Written with Codex, then checked: every example was rendered in jsdom with react and react-dom and its clicks, typing and timers
// were run; every link was opened; every fact was read. Four links were replaced by hand. The server component example is an illustration and cannot run.
// A correction is made here, in the data, with no change to the code.

import type { TopicNotes } from "./types";

export const REACT_NOTES: TopicNotes[] = [
    {
      "topicId": "react-jsx-rendering",
      "summary": "JSX describes the screen inside JavaScript. React calls component functions to find out what should appear.",
      "syntax": [
        {
          "title": "Elements, expressions and a Fragment",
          "language": "jsx",
          "code": "const element = (\n  <>\n    <div className={className}>{content}</div>\n    <input />\n  </>\n);",
          "parts": [
            {
              "part": "element",
              "meaning": "The JSX value describing the elements to render."
            },
            {
              "part": "<>",
              "meaning": "Starts a Fragment that groups children without adding a DOM element."
            },
            {
              "part": "className={className}",
              "meaning": "Sets the CSS class attribute from the className variable."
            },
            {
              "part": "{content}",
              "meaning": "Inserts a JavaScript value that React can render."
            },
            {
              "part": "<input />",
              "meaning": "Closes an element that has no children."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "The idea",
          "points": [
            "Think of JSX as a recipe card for a screen. The card describes the result, but it is not the finished screen.",
            "JSX is extra writing syntax for JavaScript, which means extra rules for writing code. It looks like HTML but is not HTML.",
            "HTML is the markup language browsers understand for page structure. JSX instead lives beside JavaScript values and follows some different rules.",
            "A component is a function that returns JSX describing one piece of the screen. Its name starts with a capital letter."
          ]
        },
        {
          "heading": "From JSX to the screen",
          "points": [
            "A build tool turns JSX into JavaScript function calls before the browser runs it. Those calls make objects describing screen elements.",
            "Rendering means React calls component functions to read their returned screen descriptions. Returning JSX does not directly draw pixels in the browser.",
            "The DOM is the browser’s live tree of page elements. A commit is when React applies needed changes to that tree.",
            "In an entry file, createRoot selects a browser container; calling the returned root’s render method starts displaying the chosen component."
          ]
        },
        {
          "heading": "Group and close tags",
          "points": [
            "Return one parent element around neighboring tags. A section can hold both a heading and a paragraph in one returned value.",
            "A Fragment groups neighboring tags without adding a browser element. Write its short form as <> followed by children and </>.",
            "Close every JSX tag, including tags that HTML sometimes leaves open. Write <input /> for an input without nested content.",
            "Put an opening parenthesis beside return when JSX spans several lines. Otherwise JavaScript can finish return before reaching the next line."
          ]
        },
        {
          "heading": "Put values into markup",
          "points": [
            "An attribute is a named setting on a tag. Use className for a styling class, rather than writing the HTML attribute class.",
            "CamelCase joins words with capital letters after the first word. JSX uses names such as tabIndex; aria-* and data-* keep hyphens.",
            "Curly braces insert a JavaScript expression, meaning code that produces a value. For example, {2 + 3} shows the number 5.",
            "Quotes hold fixed attribute text, while braces read changing values. In the recipe comparison, braces fill in ingredients before serving."
          ]
        },
        {
          "heading": "Read a render carefully",
          "points": [
            "React can call a component again later. Another render does not mean every browser element must be removed and rebuilt.",
            "Keep rendering focused on returning the screen description. Do not change outside variables while the component function runs.",
            "Use lowercase names for built-in browser tags, such as section. Use capital names for your own components, such as App.",
            "Read JSX from the outer parent inward when debugging. Check matching tags first, then braces, attribute names, and displayed values."
          ]
        }
      ],
      "terms": [
        {
          "term": "JSX",
          "meaning": "JSX adds HTML-like screen descriptions to JavaScript."
        },
        {
          "term": "component",
          "meaning": "A component is a function that returns a piece of the screen."
        },
        {
          "term": "rendering",
          "meaning": "Rendering means React calls components to find their current screen descriptions."
        },
        {
          "term": "DOM",
          "meaning": "The DOM is the browser’s live tree of page elements."
        },
        {
          "term": "Fragment",
          "meaning": "A Fragment groups JSX children without adding a browser element."
        },
        {
          "term": "expression",
          "meaning": "An expression is JavaScript code that produces a value."
        }
      ],
      "examples": [
        {
          "title": "A heading",
          "language": "jsx",
          "environment": "browser",
          "code": "export default function App() {\n  return <h1>Welcome</h1>;\n}",
          "walkthrough": [
            "Step 1: Define App so React can call it to get a screen description.",
            "Step 2: Return a heading whose fixed text is Welcome.",
            "Step 3: The screen shows the heading \"Welcome\". The console prints nothing."
          ],
          "output": "The screen shows the heading \"Welcome\". The console prints nothing."
        },
        {
          "title": "A small reading card",
          "language": "jsx",
          "environment": "browser",
          "code": "export default function App() {\n  const subject = \"Reading\";\n  const minutes = 15;\n  return (\n    <section className=\"card\">\n      <h1>{subject}</h1>\n      <p>Minutes: {minutes}</p>\n      <input aria-label=\"Daily goal\" defaultValue=\"One chapter\" />\n    </section>\n  );\n}",
          "walkthrough": [
            "Step 1: Define App as the function React calls for this card.",
            "Step 2: Keep the heading text in a JavaScript value.",
            "Step 3: Keep the reading time as a number for insertion into JSX.",
            "Step 4: Start returning the grouped JSX across several lines.",
            "Step 5: Use one section as the parent and className as its styling attribute.",
            "Step 6: Insert subject into the heading with curly braces.",
            "Step 7: Insert minutes after the fixed text Minutes:.",
            "Step 8: Close the input tag; aria-label names it and defaultValue sets its starting text.",
            "Step 9: Close the parent section around the card content.",
            "Step 10: The screen shows heading \"Reading\", paragraph \"Minutes: 15\", and an input containing \"One chapter\". The console prints nothing."
          ],
          "output": "The screen shows heading \"Reading\", paragraph \"Minutes: 15\", and an input containing \"One chapter\". The console prints nothing."
        }
      ],
      "keyPoints": [
        "JSX becomes JavaScript function calls before it runs.",
        "Rendering calls component functions; committing changes the DOM.",
        "Return one parent or a Fragment and close every tag.",
        "Use className and the appropriate JSX attribute spelling.",
        "Use braces for JavaScript values and quotes for fixed text."
      ],
      "commonMistakes": [
        "Writing adjacent returned tags without a parent causes a syntax error.",
        "Writing a value inside quotes shows fixed text instead of reading that value.",
        "Putting JSX on the line after a bare return can make the component return nothing."
      ],
      "links": [
        {
          "title": "Writing Markup with JSX",
          "url": "https://react.dev/learn/writing-markup-with-jsx",
          "kind": "article",
          "language": "English",
          "why": "Shows small markup examples and explains each JSX rule."
        }
      ]
    },
    {
      "topicId": "react-components-props",
      "summary": "Components split a screen into reusable pieces. Props carry values and functions from a parent to a child.",
      "syntax": [
        {
          "title": "Define and use a component",
          "language": "jsx",
          "code": "function ContentBox({ title = 'Title', children }) {\n  return <section><h2>{title}</h2>{children}</section>;\n}\nconst element = <ContentBox title={heading}>{content}</ContentBox>;",
          "parts": [
            {
              "part": "ContentBox",
              "meaning": "A function component whose capitalized name allows JSX usage."
            },
            {
              "part": "title = 'Title'",
              "meaning": "Destructures a prop and supplies a default when it is missing or undefined."
            },
            {
              "part": "children",
              "meaning": "The nested JSX or other renderable content passed between the component tags."
            },
            {
              "part": "heading",
              "meaning": "The value passed to the title prop."
            },
            {
              "part": "content",
              "meaning": "The content passed as the children prop."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "The idea",
          "points": [
            "Think of a component as a reusable greeting card template. Props are the details you write into each copy of that template.",
            "Props are values passed into a component through its JSX tag. They let the same component show different text or behavior.",
            "A parent is the component that includes another component in its JSX. The included component is called its child.",
            "Give function components capital-letter names, such as Greeting. A lowercase tag names a built-in browser element instead of your function."
          ]
        },
        {
          "heading": "Read the props object",
          "points": [
            "React passes props as one object argument to the component function. Read a name with props.name when the argument is called props.",
            "Destructuring means taking named values out of an object into variables. Write function Greeting({ name }) to read name directly.",
            "A default value supplies a fallback when a prop is missing or undefined. Write { name = \"Guest\" } in the function parameter.",
            "A default does not replace null, zero, false, or an empty string. Pass those values only when their meaning suits the component."
          ]
        },
        {
          "heading": "Pass different kinds of values",
          "points": [
            "Use quotes to pass fixed text and braces to pass other JavaScript values. A number inside braces stays a number.",
            "Objects and arrays can travel through props too. Pass a small set of clear inputs so the child remains easy to understand.",
            "The children prop contains content nested between a component’s opening and closing tags. That content can include text or more JSX.",
            "A wrapper component can place children inside its own section or button. This lets callers choose the content while sharing the surrounding structure."
          ]
        },
        {
          "heading": "Keep ownership clear",
          "points": [
            "Props are read-only inputs during rendering. A child must not assign new values into props or change objects received through them.",
            "Data flows one way, from parent to child. The parent chooses values, and the child uses those values to return its screen.",
            "Pass a function when the child needs to report an action. A callback is a function supplied for another function to call later.",
            "Calling that callback lets the parent decide what happens next. It does not give the child permission to rewrite its props."
          ]
        },
        {
          "heading": "Build useful pieces",
          "points": [
            "In the greeting card comparison, name customizes the message while children supplies extra content. Each use can choose different details.",
            "Define reusable components outside other component functions. This keeps their definitions steady when a parent runs again with different inputs.",
            "Choose prop names that describe meaning, such as title or onChoose. Clear names explain the agreement between the parent and child.",
            "In an interview, describe props as inputs rather than private storage. Explain that a child can ask for changes through a callback."
          ]
        }
      ],
      "terms": [
        {
          "term": "props",
          "meaning": "Props are the input values a parent passes to a child component."
        },
        {
          "term": "parent",
          "meaning": "A parent component includes another component in its returned JSX."
        },
        {
          "term": "destructuring",
          "meaning": "Destructuring reads named object values into local variables."
        },
        {
          "term": "children",
          "meaning": "The children prop carries content nested inside a component tag."
        },
        {
          "term": "callback",
          "meaning": "A callback is a function passed along for another function to call later."
        }
      ],
      "examples": [
        {
          "title": "A reusable greeting",
          "language": "jsx",
          "environment": "browser",
          "code": "function Greeting({ name = \"Guest\" }) {\n  return <p>Hello, {name}!</p>;\n}\nexport default function App() {\n  return <><Greeting name=\"Reader\" /><Greeting /></>;\n}",
          "walkthrough": [
            "Step 1: Read name from props and use Guest when name is missing or undefined.",
            "Step 2: Use the received name in this greeting.",
            "Step 3: Define the parent that chooses the greeting inputs.",
            "Step 4: Pass Reader to one greeting and let the other use its default.",
            "Step 5: The screen shows two paragraphs: \"Hello, Reader!\" and \"Hello, Guest!\". The console prints nothing."
          ],
          "output": "The screen shows two paragraphs: \"Hello, Reader!\" and \"Hello, Guest!\". The console prints nothing."
        },
        {
          "title": "A reusable choice button",
          "language": "jsx",
          "environment": "browser",
          "code": "function Choice({ label = \"Choose\", onChoose, children }) {\n  return <button onClick={onChoose}>{label}: {children}</button>;\n}\nexport default function App() {\n  function chooseBook() {\n    console.log(\"Book selected\");\n  }\n  return <Choice label=\"Pick\" onChoose={chooseBook}>Book</Choice>;\n}",
          "walkthrough": [
            "Step 1: Read a label, a callback, and nested content from the props object.",
            "Step 2: Place the callback on the button and show the supplied label and children.",
            "Step 3: Define the parent that owns the choice behavior.",
            "Step 4: Define the callback the child will use when the button is clicked.",
            "Step 5: Print Book selected when that callback runs.",
            "Step 6: Pass the callback as a value and Book as nested content.",
            "Step 7: The screen shows a button labeled \"Pick: Book\". Initially the console prints nothing; after one click it prints \"Book selected\", and the button stays the same."
          ],
          "output": "The screen shows a button labeled \"Pick: Book\". Initially the console prints nothing; after one click it prints \"Book selected\", and the button stays the same."
        }
      ],
      "keyPoints": [
        "Component names start with capital letters.",
        "Props arrive as one object and can be destructured.",
        "Defaults apply to missing or undefined props.",
        "Nested JSX content arrives through children.",
        "Props are read-only and flow from parent to child.",
        "Function props let children report actions to parents."
      ],
      "commonMistakes": [
        "Changing an object received through props breaks the read-only input rule.",
        "Expecting a default value to replace null gives an unexpected result.",
        "Forgetting to place children in returned JSX hides the nested content."
      ],
      "links": [
        {
          "title": "Passing Props to a Component",
          "url": "https://react.dev/learn/passing-props-to-a-component",
          "kind": "article",
          "language": "English",
          "why": "Builds from simple inputs to defaults and nested content."
        }
      ]
    },
    {
      "topicId": "react-lists-keys",
      "summary": "Lists turn arrays into repeated screen elements. Keys help React match each item when the list changes.",
      "syntax": [
        {
          "title": "Map items to keyed elements",
          "language": "jsx",
          "code": "const list = (\n  <ul>{items.map(item => <li key={item.id}>{item.label}</li>)}</ul>\n);",
          "parts": [
            {
              "part": "list",
              "meaning": "The JSX value containing the rendered list."
            },
            {
              "part": "items",
              "meaning": "The array of data to render."
            },
            {
              "part": "map",
              "meaning": "Transforms each array item into an element."
            },
            {
              "part": "item",
              "meaning": "The current data item passed to the mapping function."
            },
            {
              "part": "key={item.id}",
              "meaning": "Gives each sibling a stable, unique identity from its data."
            },
            {
              "part": "item.label",
              "meaning": "The renderable text or content for the current item."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "The idea",
          "points": [
            "Think of list items as coats with numbered tickets. A ticket identifies the same coat even when its rack position changes.",
            "An array is an ordered collection of values. Keep repeated records in an array instead of writing almost identical JSX many times.",
            "The map method makes a new array by returning one result for each original item. Return JSX to turn records into visible rows.",
            "Each row can read the current record’s fields. This keeps the screen tied to the data instead of copying labels into many places."
          ]
        },
        {
          "heading": "Give each row a key",
          "points": [
            "A key is a string or number that identifies one item among its siblings. Siblings are elements in the same surrounding list.",
            "React uses keys to match items between renders. Matching helps preserve the right browser elements and component memory as items move.",
            "A stable key stays the same for the same record across renders. A unique key differs from the other keys among siblings.",
            "A stored record id usually works well when it meets both rules. The same id can appear in separate, unrelated lists."
          ]
        },
        {
          "heading": "Avoid position-based identity",
          "points": [
            "An array index is an item’s current position, starting at zero. That position can change after insertion, removal, filtering, or sorting.",
            "Using an index as a key can attach an existing input or component memory to the wrong record after the order changes.",
            "Do not generate random keys during rendering. New keys make React treat existing rows as new ones and can erase user input.",
            "The coat ticket comparison applies directly to key={item.id}. The id follows the record, while the array position only describes its location."
          ]
        },
        {
          "heading": "Place keys correctly",
          "points": [
            "Put key on the outermost element returned directly from map. For a row component, write <Row key={item.id} item={item} />.",
            "Key is special information used by React, rather than a normal prop. Pass id separately when the child needs to read it.",
            "For several tags per item, use an enclosing element with a key. An explicit Fragment can also carry a key when needed.",
            "With braces around a map callback body, write return explicitly. With parentheses around a JSX expression, the arrow function returns it directly."
          ]
        },
        {
          "heading": "Prepare the visible items",
          "points": [
            "The filter method makes a new array containing only matching items. Filter before map when only some records belong on the screen.",
            "The sort method reorders its own array. Copy first with [...items], then sort that copy so the original array stays unchanged.",
            "A comparator is the function sort uses to decide item order. For numbers, subtract the second value from the first for ascending order.",
            "Check the prepared array’s length before returning rows. Show a clear empty-list message when filtering leaves no items to display."
          ]
        }
      ],
      "terms": [
        {
          "term": "map",
          "meaning": "The map array method returns a new array with one transformed value per item."
        },
        {
          "term": "key",
          "meaning": "A key identifies an item among siblings across renders."
        },
        {
          "term": "stable key",
          "meaning": "A stable key keeps the same value for the same record."
        },
        {
          "term": "array index",
          "meaning": "An array index is the current position of an item, starting at zero."
        },
        {
          "term": "filter",
          "meaning": "The filter array method returns a new array containing only matching items."
        },
        {
          "term": "comparator",
          "meaning": "A comparator tells sort which of two items should come first."
        }
      ],
      "examples": [
        {
          "title": "Two list rows",
          "language": "jsx",
          "environment": "browser",
          "code": "export default function App() {\n  const items = [{ id: \"a\", name: \"Pen\" }, { id: \"b\", name: \"Book\" }];\n  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;\n}",
          "walkthrough": [
            "Step 1: Define the component that returns the list.",
            "Step 2: Store two records with separate, stable ids.",
            "Step 3: Map each record to a list item and put its key on that returned element.",
            "Step 4: The screen shows a bulleted list with \"Pen\" followed by \"Book\". The console prints nothing."
          ],
          "output": "The screen shows a bulleted list with \"Pen\" followed by \"Book\". The console prints nothing."
        },
        {
          "title": "Available items by price",
          "language": "jsx",
          "environment": "browser",
          "code": "const products = [\n  { id: \"book\", name: \"Book\", price: 8, available: true },\n  { id: \"bag\", name: \"Bag\", price: 20, available: false },\n  { id: \"pen\", name: \"Pen\", price: 2, available: true }\n];\nfunction ProductList({ items }) {\n  const available = items.filter(item => item.available);\n  const sorted = [...available].sort((a, b) => a.price - b.price);\n  if (sorted.length === 0) return <p>No available items</p>;\n  return <ul>{sorted.map(item => <li key={item.id}>{item.name}: {item.price}</li>)}</ul>;\n}\nexport default function App() {\n  return <ProductList items={products} />;\n}",
          "walkthrough": [
            "Step 1: Start the fixed collection of product records.",
            "Step 2: Add an available book with its stable id and numeric price.",
            "Step 3: Add an unavailable bag so filtering has a record to exclude.",
            "Step 4: Add an available pen with a lower numeric price.",
            "Step 5: Receive the collection to display.",
            "Step 6: Build a separate array containing only available products.",
            "Step 7: Copy the filtered array and sort the copy from cheapest to most expensive.",
            "Step 8: Return an empty-list message if no available products remain.",
            "Step 9: Map the prepared records into keyed rows showing names and prices.",
            "Step 10: Define the parent that supplies the fixed product collection.",
            "Step 11: Pass the original collection without changing its order.",
            "Step 12: The screen shows a bulleted list with \"Pen: 2\" followed by \"Book: 8\". The bag is absent, and the console prints nothing."
          ],
          "output": "The screen shows a bulleted list with \"Pen: 2\" followed by \"Book: 8\". The bag is absent, and the console prints nothing."
        }
      ],
      "keyPoints": [
        "Use map to turn records into JSX rows.",
        "Keys must stay stable and be unique among siblings.",
        "Put key on the element returned directly from map.",
        "Changing lists need record identities rather than position-based keys.",
        "Filter and copy before sorting to protect the original array.",
        "Show an explicit message when the prepared list is empty."
      ],
      "commonMistakes": [
        "Using array positions as keys can mix up row memory after reordering.",
        "Generating random keys during rendering causes rows to be recreated.",
        "Calling sort directly on a received array changes data owned elsewhere.",
        "A map callback with braces and no return produces no rows."
      ],
      "links": [
        {
          "title": "Rendering Lists",
          "url": "https://react.dev/learn/rendering-lists",
          "kind": "article",
          "language": "English",
          "why": "Shows array transformations and explains why rows need stable keys."
        }
      ]
    },
    {
      "topicId": "react-conditional-rendering",
      "summary": "Conditional rendering chooses which JSX to return using JavaScript conditions. It lets a screen match the current situation.",
      "syntax": [
        {
          "title": "Choose between two branches",
          "language": "jsx",
          "code": "const element = (\n  <div>{condition ? content : fallback}</div>\n);",
          "parts": [
            {
              "part": "condition",
              "meaning": "The expression whose truthiness selects a branch."
            },
            {
              "part": "content",
              "meaning": "The renderable value selected when the condition is truthy."
            },
            {
              "part": "fallback",
              "meaning": "The renderable value selected when the condition is falsy."
            }
          ]
        },
        {
          "title": "Show content only when true",
          "language": "jsx",
          "code": "const element = (\n  <div>{Boolean(condition) && content}</div>\n);",
          "parts": [
            {
              "part": "Boolean(condition)",
              "meaning": "Converts the condition to a boolean so falsy numbers do not render as text."
            },
            {
              "part": "&&",
              "meaning": "Returns the content when the left side is true; otherwise returns false, which renders nothing."
            },
            {
              "part": "content",
              "meaning": "The renderable value shown when the condition is true."
            }
          ]
        },
        {
          "title": "Return early from a component",
          "language": "jsx",
          "code": "function Content({ condition, children }) {\n  if (!condition) return null;\n  return <section>{children}</section>;\n}",
          "parts": [
            {
              "part": "Content",
              "meaning": "The component that chooses whether to render its children."
            },
            {
              "part": "condition",
              "meaning": "The prop controlling whether content is shown."
            },
            {
              "part": "children",
              "meaning": "The nested content rendered when the condition is truthy."
            },
            {
              "part": "return null",
              "meaning": "Ends rendering for this component without producing visible content."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "The idea",
          "points": [
            "Think of a doorway sign saying Open or Closed. One condition chooses which message visitors see.",
            "Conditional rendering means choosing JSX using a condition, which is a check in JavaScript. Ordinary JavaScript tools handle these choices.",
            "Use your data to decide what appears. You do not need to hide or remove browser elements by hand.",
            "Like the doorway sign, a component returns the appropriate message for the current values. Another render can make a different choice."
          ]
        },
        {
          "heading": "Start with early returns",
          "points": [
            "An early return finishes a function before its remaining lines run. Use an if statement to handle one clear case first.",
            "A loading state is the period when needed information is not ready. Return a loading message before trying to show that information.",
            "An empty state means loading has finished but there are no matching records. Give it a separate message so readers understand the difference.",
            "Return null when a component should add nothing to the screen. This still lets its parent display other content beside it."
          ]
        },
        {
          "heading": "Choose between two values",
          "points": [
            "The ternary operator uses condition ? first : second to choose one value. It works inside JSX braces because it is an expression.",
            "Use a ternary for two short alternatives, such as an open or closed label. Keep the condition close to the content it controls.",
            "For longer branches, use if statements or separate components. Several nested ternaries make the order of decisions harder to read and explain.",
            "An if statement cannot go directly inside JSX braces because it does not produce an expression value. Put it before the returned JSX."
          ]
        },
        {
          "heading": "Use && with care",
          "points": [
            "The && operator checks its left value and may return its right value. Use it when content should appear only for one case.",
            "A boolean is either true or false. React displays neither boolean value as text, so a boolean condition works well before &&.",
            "Zero is different: 0 && <p>Items</p> evaluates to 0. React displays that zero instead of showing nothing, which can surprise beginners.",
            "Write count > 0 && <p>Items</p> to make the left side boolean. The comparison clearly says when the content belongs on screen."
          ]
        },
        {
          "heading": "Choose screens from state",
          "points": [
            "State keeps a component’s changing values between renders. The useState Hook, a React function for state, returns a value and setter.",
            "A setter is the returned function that changes state for a later render. Call it after an action to choose different content.",
            "Call Hooks at the top level before early returns, rather than inside branches. Their calling order must stay consistent across renders.",
            "Choose between components with the same tools used for text. For example, one state value can select either a list or its empty message."
          ]
        }
      ],
      "terms": [
        {
          "term": "conditional rendering",
          "meaning": "Conditional rendering chooses JSX according to a JavaScript condition."
        },
        {
          "term": "early return",
          "meaning": "An early return finishes a function before its remaining lines run."
        },
        {
          "term": "ternary operator",
          "meaning": "The ternary operator chooses one of two values with condition ? first : second."
        },
        {
          "term": "boolean",
          "meaning": "A boolean is a value that is either true or false."
        },
        {
          "term": "Hook",
          "meaning": "A Hook is a React function that gives a component a feature such as state."
        },
        {
          "term": "setter",
          "meaning": "A setter is the function returned by useState for changing its state value."
        }
      ],
      "examples": [
        {
          "title": "An optional notice",
          "language": "jsx",
          "environment": "browser",
          "code": "function Notice({ visible }) {\n  if (!visible) return null;\n  return <p>Ready</p>;\n}\nexport default function App() {\n  return <><Notice visible={true} /><Notice visible={false} /></>;\n}",
          "walkthrough": [
            "Step 1: Read the condition that controls whether this notice appears.",
            "Step 2: Return nothing when visible is false.",
            "Step 3: Return the notice only when the early return did not run.",
            "Step 4: Define the parent containing two differently configured notices.",
            "Step 5: Include one visible notice and one notice that returns null.",
            "Step 6: The screen shows \"Ready\" once. The hidden notice adds no content, and the console prints nothing."
          ],
          "output": "The screen shows \"Ready\" once. The hidden notice adds no content, and the console prints nothing."
        },
        {
          "title": "Switch an item list",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Results({ loading, items }) {\n  if (loading) return <p>Loading...</p>;\n  if (items.length === 0) return <p>No items</p>;\n  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;\n}\nexport default function App() {\n  const [showItems, setShowItems] = useState(false);\n  const items = showItems ? [{ id: \"book\", name: \"Book\" }] : [];\n  return (\n    <section>\n      <button onClick={() => setShowItems(!showItems)}>Switch</button>\n      {items.length > 0 && <p>Items found</p>}\n      <Results loading={false} items={items} />\n    </section>\n  );\n}",
          "walkthrough": [
            "Step 1: Import the Hook that keeps the screen choice between renders.",
            "Step 2: Read separate inputs for loading and the prepared records.",
            "Step 3: Choose the loading message before checking records.",
            "Step 4: Choose the empty message after loading when there are no records.",
            "Step 5: Choose list content only after the earlier cases are excluded.",
            "Step 6: Define the component that owns the screen choice.",
            "Step 7: Keep the choice in state, starting with no items.",
            "Step 8: Use a ternary to choose a fixed record array or an empty array.",
            "Step 9: Start returning the controls and current result together.",
            "Step 10: Group the conditional content in one section.",
            "Step 11: Toggle the state value after a click so the next render chooses another result.",
            "Step 12: Use a boolean comparison before && so an empty list does not print zero.",
            "Step 13: Select the results branch with loading false and the current records.",
            "Step 14: Close the section around the controls and result.",
            "Step 15: Initially the screen shows button \"Switch\" and paragraph \"No items\". After one click it shows \"Switch\", \"Items found\", and list item \"Book\". A second click restores \"No items\". The console prints nothing."
          ],
          "output": "Initially the screen shows button \"Switch\" and paragraph \"No items\". After one click it shows \"Switch\", \"Items found\", and list item \"Book\". A second click restores \"No items\". The console prints nothing."
        }
      ],
      "keyPoints": [
        "Use early returns for loading, empty, or hidden content.",
        "A ternary chooses between two expression values.",
        "Use && for optional content with a boolean left side.",
        "Zero before && can appear as visible text.",
        "Returning null adds no screen content.",
        "Keep Hooks above conditional returns."
      ],
      "commonMistakes": [
        "Writing count && JSX can show an unwanted zero.",
        "Checking an empty array before loading can show the wrong message.",
        "Calling a Hook only inside one branch breaks the Hook calling rules.",
        "Deeply nested ternaries make screen choices difficult to follow."
      ],
      "links": [
        {
          "title": "Conditional Rendering",
          "url": "https://react.dev/learn/conditional-rendering",
          "kind": "article",
          "language": "English",
          "why": "Explains each conditional pattern with small examples and the zero trap."
        }
      ]
    },
    {
      "topicId": "react-events",
      "summary": "Event handlers run when a user clicks, types, or submits a form. They connect user actions to changes in state or other work.",
      "syntax": [
        {
          "title": "Pass a handler or an argument",
          "language": "jsx",
          "code": "const buttons = (\n  <>\n    <button onClick={handler}>{label}</button>\n    <button onClick={() => handler(argument)}>{label}</button>\n  </>\n);",
          "parts": [
            {
              "part": "onClick={handler}",
              "meaning": "Passes a function for React to call when the button is clicked."
            },
            {
              "part": "label",
              "meaning": "The renderable button text."
            },
            {
              "part": "() => handler(argument)",
              "meaning": "Creates a function that calls handler with the chosen argument after a click."
            },
            {
              "part": "argument",
              "meaning": "The value passed to the handler."
            }
          ]
        },
        {
          "title": "Read an input change",
          "language": "jsx",
          "code": "const input = (\n  <input onChange={event => handler(event.target.value)} />\n);",
          "parts": [
            {
              "part": "onChange",
              "meaning": "Runs the supplied handler when the user changes the input."
            },
            {
              "part": "event",
              "meaning": "The event object supplied by React."
            },
            {
              "part": "handler",
              "meaning": "The function receiving the updated input text."
            },
            {
              "part": "event.target.value",
              "meaning": "The current string value of the input that triggered the event."
            }
          ]
        },
        {
          "title": "Prevent the default browser action",
          "language": "jsx",
          "code": "function handleSubmit(event) {\n  event.preventDefault();\n  /* handle submission */\n}\nconst form = <form onSubmit={handleSubmit}>{children}</form>;",
          "parts": [
            {
              "part": "handleSubmit",
              "meaning": "The handler called when the form is submitted."
            },
            {
              "part": "event",
              "meaning": "The submit event supplied by React."
            },
            {
              "part": "event.preventDefault()",
              "meaning": "Stops the browser from performing its default form submission."
            },
            {
              "part": "onSubmit={handleSubmit}",
              "meaning": "Connects form submission to the handler."
            },
            {
              "part": "children",
              "meaning": "The form controls and other nested content."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "The idea",
          "points": [
            "Think of an event handler as instructions left beside a doorbell. The instructions wait until someone rings before any work begins.",
            "An event is a notification that something happened, such as a click. An event handler is the function that responds to that notification.",
            "Attach a handler through a prop such as onClick on a button. React calls that function when the matching action happens.",
            "Use the built-in button element for clickable actions. It already supports keyboard use, so people can activate it without a pointer."
          ]
        },
        {
          "heading": "Pass work for later",
          "points": [
            "Write onClick={handle} to pass a function for later. Writing onClick={handle()} calls it immediately while the component is rendering.",
            "The doorbell comparison applies to that missing pair of parentheses. Passing the function leaves instructions ready instead of doing the work early.",
            "An arrow function is a short way to write a function. Use onClick={() => choose(\"book\")} to supply an argument after clicking.",
            "Keep longer actions in named handlers above the returned JSX. A clear name such as handleSave tells readers what the action means."
          ]
        },
        {
          "heading": "Read the event details",
          "points": [
            "The event object is the argument React passes to a handler with action details. Name it event, or choose another clear variable name.",
            "The target is the element where the event started. For a text input, event.target.value contains the text currently inside that input.",
            "The currentTarget is the element whose handler is running. It can differ from target when a nested element started the event.",
            "Use onChange to handle changes while someone types into a text input. Read its current value before passing that value to a setter."
          ]
        },
        {
          "heading": "Control browser behavior",
          "points": [
            "A default action is work the browser normally does after an event. Submitting a form commonly causes navigation without extra handling.",
            "Call event.preventDefault() in a submit handler to stop that browser action. Then keep the page and decide how to handle the entered values.",
            "Event bubbling means an event travels to ancestor handlers; ancestors are surrounding elements. Call event.stopPropagation() to stop that travel.",
            "Stopping bubbling and preventing default behavior solve different problems. A handler can need either method, both methods, or neither method."
          ]
        },
        {
          "heading": "Connect input and state",
          "points": [
            "A controlled input takes its displayed value from state and updates that state in onChange. This keeps the field and related text together.",
            "Start controlled text values as strings, such as an empty string. Update state promptly so typed characters remain visible in the field.",
            "Use a submit button for saving a form and type=\"button\" for unrelated actions inside it. This avoids accidental submissions from extra buttons.",
            "In an interview, separate rendering from interaction: rendering returns JSX, while handlers run after actions. Handlers can then change state for another render."
          ]
        }
      ],
      "terms": [
        {
          "term": "event handler",
          "meaning": "An event handler is a function that runs in response to an action."
        },
        {
          "term": "event object",
          "meaning": "The event object carries details about the action being handled."
        },
        {
          "term": "target",
          "meaning": "The target is the element where an event started."
        },
        {
          "term": "currentTarget",
          "meaning": "The currentTarget is the element whose handler is currently running."
        },
        {
          "term": "event bubbling",
          "meaning": "Event bubbling carries an event to handlers on surrounding elements."
        },
        {
          "term": "controlled input",
          "meaning": "A controlled input gets its displayed value from state that its change handler updates."
        }
      ],
      "examples": [
        {
          "title": "Pass a click handler",
          "language": "jsx",
          "environment": "browser",
          "code": "export default function App() {\n  function handleClick() {\n    console.log(\"Clicked\");\n  }\n  return <button onClick={handleClick}>Click</button>;\n}",
          "walkthrough": [
            "Step 1: Define the component containing the clickable action.",
            "Step 2: Define a handler that waits for a click.",
            "Step 3: Print Clicked only when the handler is called.",
            "Step 4: Pass the handler itself so clicking the button runs it later.",
            "Step 5: The screen shows a button labeled \"Click\". Initially the console prints nothing; after one click it prints \"Clicked\", and the button stays the same."
          ],
          "output": "The screen shows a button labeled \"Click\". Initially the console prints nothing; after one click it prints \"Clicked\", and the button stays the same."
        },
        {
          "title": "Save a typed label",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [name, setName] = useState(\"\");\n  const [saved, setSaved] = useState(\"\");\n  function handleSubmit(event) {\n    event.preventDefault();\n    setSaved(name);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <label>Label: <input value={name} onChange={event => setName(event.target.value)} /></label>\n      <button type=\"submit\">Save</button>\n      <button type=\"button\" onClick={() => setName(\"Book\")}>Use Book</button>\n      <p>Saved: {saved || \"Nothing\"}</p>\n    </form>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useState for the values changed by user actions.",
            "Step 2: Define the component containing the input and submit handler.",
            "Step 3: Keep the current input value as a string.",
            "Step 4: Keep the last submitted value separately from the current input.",
            "Step 5: Receive the submit event so its default action can be stopped.",
            "Step 6: Prevent browser navigation when the form is submitted.",
            "Step 7: Copy the current input value into the saved state.",
            "Step 8: Start returning the form and its controls.",
            "Step 9: Attach the submit handler to the form so submission has one handling point.",
            "Step 10: Control the input with name and update it from the change event’s target value.",
            "Step 11: Provide a button that submits the form.",
            "Step 12: Pass an arrow function that supplies Book to the setter after clicking without submitting.",
            "Step 13: Show the saved value, or Nothing when the saved string is empty.",
            "Step 14: Close the form containing these controls.",
            "Step 15: Initially the screen shows \"Label:\", an empty input, buttons \"Save\" and \"Use Book\", and \"Saved: Nothing\". Typing \"Notes\" fills the input while the paragraph stays \"Saved: Nothing\". Clicking \"Save\" shows \"Saved: Notes\" without navigation. Clicking \"Use Book\" changes the input to \"Book\" while \"Saved: Notes\" remains. Clicking \"Save\" again shows \"Saved: Book\". The console prints nothing."
          ],
          "output": "Initially the screen shows \"Label:\", an empty input, buttons \"Save\" and \"Use Book\", and \"Saved: Nothing\". Typing \"Notes\" fills the input while the paragraph stays \"Saved: Nothing\". Clicking \"Save\" shows \"Saved: Notes\" without navigation. Clicking \"Use Book\" changes the input to \"Book\" while \"Saved: Notes\" remains. Clicking \"Save\" again shows \"Saved: Book\". The console prints nothing."
        }
      ],
      "keyPoints": [
        "Pass handlers as functions rather than calling them during rendering.",
        "An arrow function can supply arguments when an action happens.",
        "Read event.target.value for text input changes.",
        "preventDefault stops browser behavior; stopPropagation stops event travel.",
        "Controlled inputs pair value with an onChange state update.",
        "Give extra form buttons type=\"button\" when they should not submit."
      ],
      "commonMistakes": [
        "Writing onClick={handle()} runs work during rendering instead of waiting for a click.",
        "Giving an input value without an updating onChange handler prevents normal editing.",
        "Using stopPropagation to prevent form navigation confuses two separate event behaviors.",
        "Leaving an extra form button without a type can cause an unintended submission."
      ],
      "links": [
        {
          "title": "Responding to Events",
          "url": "https://react.dev/learn/responding-to-events",
          "kind": "article",
          "language": "English",
          "why": "Introduces handlers step by step and compares the two event-stopping methods."
        }
      ]
    },
    {
      "topicId": "react-usestate",
      "summary": "useState keeps one component’s memory between renders. Its setter tells React to show the next state.",
      "syntax": [
        {
          "title": "Initialize state and replace its value",
          "language": "jsx",
          "code": "const [value, setValue] = useState(initial);\nfunction handler() {\n  setValue(next);\n}",
          "parts": [
            {
              "part": "value",
              "meaning": "The state value for the current render."
            },
            {
              "part": "setValue",
              "meaning": "The setter that queues a state update."
            },
            {
              "part": "useState(initial)",
              "meaning": "Declares state at the top level of a component or custom Hook, using initial on the first render."
            },
            {
              "part": "handler",
              "meaning": "An event handler or callback that updates state after rendering."
            },
            {
              "part": "next",
              "meaning": "The replacement state value."
            }
          ]
        },
        {
          "title": "Update from the previous state",
          "language": "jsx",
          "code": "function handler() {\n  setValue(previous => computeNext(previous));\n}",
          "parts": [
            {
              "part": "handler",
              "meaning": "The callback that requests the state update."
            },
            {
              "part": "setValue",
              "meaning": "The setter returned by useState."
            },
            {
              "part": "previous",
              "meaning": "The pending state supplied by React when processing this update."
            },
            {
              "part": "computeNext(previous)",
              "meaning": "A pure calculation returning the next state without mutating the previous state."
            }
          ]
        },
        {
          "title": "Initialize lazily",
          "language": "jsx",
          "code": "const [value, setValue] = useState(() => createInitial());\n/* use value and setValue */",
          "parts": [
            {
              "part": "value",
              "meaning": "The state value for this render."
            },
            {
              "part": "setValue",
              "meaning": "The function that queues a state update."
            },
            {
              "part": "useState",
              "meaning": "Declares state at the top level of a component or custom Hook."
            },
            {
              "part": "() => createInitial()",
              "meaning": "A pure initializer used on mount; development Strict Mode may call it twice."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Memory for one component",
          "points": [
            "Think of useState as a notebook kept beside one component, holding details such as a count or a shopping list. React keeps that notebook when the component function runs again, so the remembered details survive the call.",
            "Calling useState returns the current value and its setter, which tells React which value should come next. Name them together, such as count and setCount.",
            "Call useState at the top of the component, before any early return. Do not put it inside conditions or loops.",
            "An instance is one separate appearance of a component on the screen, such as each counter in a pair. Two counters made from the same function keep separate notebooks, so clicking one does not increase the other."
          ]
        },
        {
          "heading": "Each render sees one snapshot",
          "points": [
            "A snapshot is the fixed set of state values seen during one render, even while more updates are being added. Every handler from that render reads those same values until React supplies handlers from a newer render.",
            "Calling setCount(count + 1) asks React to render again with the new count. It does not change count inside the running handler.",
            "If count is zero, logging count after calling setCount(1) still prints zero. The next render receives one instead of zero.",
            "This matches the notebook comparison: a render receives a photocopy of one page, showing the values available at that moment. Asking for another page cannot rewrite that photocopy, just as a setter cannot rewrite the current handler’s count."
          ]
        },
        {
          "heading": "Several updates can travel together",
          "points": [
            "Batching means React groups several state updates before showing the result. It avoids showing a screen with only part of an event’s changes.",
            "Inside one click handler, React waits for the handler to finish before processing its state updates. Multiple setters need not cause separate screen updates.",
            "React 19 also batches updates inside timer callbacks and promise callbacks, which run after a result becomes available. Separate intentional clicks are handled separately.",
            "Calling setCount(count + 1) twice from a zero snapshot supplies one twice. Those calls replace the upcoming value; they do not add twice."
          ]
        },
        {
          "heading": "Build from the pending value",
          "points": [
            "A functional update passes a function to the setter instead of a finished value that was already worked out. React gives that function the pending state value, including the results of earlier update functions waiting in the same list.",
            "In setCount(c => c + 1), c names that pending value. Two such calls receive zero then one, producing a final count of two.",
            "Use this form when several updates depend on earlier updates, or delayed work must use the latest pending value. Direct replacement remains fine for setOpen(true).",
            "Keep update functions pure: the same input gives the same result without changing anything outside the function. Development checks may call them twice."
          ]
        },
        {
          "heading": "Replace objects and arrays",
          "points": [
            "A mutation changes an existing object or array in place. Treat stored state as read-only, because changing old values damages earlier snapshots.",
            "Spread syntax, written as three dots, copies entries into a new object or array. Use setProfile(p => ({ ...p, name: \"New\" })) to preserve other fields.",
            "For an array, setItems(items => [...items, \"Milk\"]) builds a new array. Avoid items.push(\"Milk\"), which changes the original array instead.",
            "Spread copies only the outer level, so copy every nested object you change. A useState setter replaces its whole value rather than merging object fields."
          ]
        },
        {
          "heading": "Starting and resetting memory",
          "points": [
            "Lazy initialization means passing a function that creates the starting state when React initializes this component. Write useState(() => buildItems()) rather than calling buildItems immediately.",
            "Keep that starting function pure too, since development checks may call it twice. Later renders keep the existing state instead of using another starting value.",
            "Changing a component’s key makes React replace it and start its state again. Use this when switching between forms that need separate fresh drafts.",
            "When the next value equals the current value under Object.is, JavaScript’s sameness check, React can skip updating the screen. Reusing a mutated object often hides changes."
          ]
        }
      ],
      "terms": [
        {
          "term": "snapshot",
          "meaning": "The fixed state values available to one render and its handlers."
        },
        {
          "term": "batching",
          "meaning": "React groups several state updates before showing their combined result."
        },
        {
          "term": "functional update",
          "meaning": "A setter receives a function that builds the next value from pending state."
        },
        {
          "term": "spread syntax",
          "meaning": "Three dots copy entries into a new object or array."
        },
        {
          "term": "lazy initialization",
          "meaning": "A function creates the starting state when React initializes a component."
        },
        {
          "term": "mutation",
          "meaning": "A change made directly to an existing object or array."
        }
      ],
      "examples": [
        {
          "title": "A snapshot stays fixed",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  function add() {\n    setCount(count + 1);\n    console.log(count);\n  }\n  return <button onClick={add}>Count: {count}</button>;\n}",
          "walkthrough": [
            "Step 1: Import useState to keep a value between renders.",
            "Step 2: Keep this counter’s memory inside App.",
            "Step 3: Start at zero and keep the setter beside the current snapshot.",
            "Step 4: Group the update and the snapshot read in one click handler.",
            "Step 5: Tell React to use a count one larger on the next render.",
            "Step 6: Read the current handler’s snapshot, which the setter has not changed.",
            "Step 7: Show the count and run add when the button is clicked.",
            "Step 8: The screen starts with Count: 0; one click shows Count: 1 and prints 0."
          ],
          "output": "Initially the button says \"Count: 0\". After one click it says \"Count: 1\", and the console prints 0."
        },
        {
          "title": "Copy a shopping list",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [cart, setCart] = useState(() => ({ items: [\"Bread\"], checked: false }));\n  function addMilk() {\n    setCart(c => ({ ...c, items: [...c.items, \"Milk\"] }));\n  }\n  return (\n    <div>\n      <p>Items: {cart.items.join(\", \")}</p>\n      <p>Checked: {String(cart.checked)}</p>\n      <button onClick={addMilk}>Add milk</button>\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import the state hook for the shopping list.",
            "Step 2: Keep this cart’s state inside App.",
            "Step 3: Pass a starting function so React creates the initial cart during initialization.",
            "Step 4: Keep the cart change in the Add milk handler.",
            "Step 5: Use pending state, copy the cart, and replace items with a copied array containing Milk.",
            "Step 6: Return the cart’s current details and its update button.",
            "Step 7: Group the two cart details with their button.",
            "Step 8: Show the stored item names separated by a comma and space.",
            "Step 9: Show that the object spread preserved the checked field.",
            "Step 10: Connect the Add milk button to the copying update.",
            "Step 11: End the cart’s visible group.",
            "Step 12: The screen changes from Items: Bread to Items: Bread, Milk after one click; Checked: false stays visible."
          ],
          "output": "Initially the screen shows \"Items: Bread\", \"Checked: false\", and \"Add milk\". After one Add milk click, the first line says \"Items: Bread, Milk\". \"Checked: false\" stays unchanged. Nothing is printed to the console."
        },
        {
          "title": "Buggy replacement and functional fix",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  function buggy() {\n    setCount(count + 1);\n    setCount(count + 1);\n  }\n  function fixed() {\n    setCount(c => c + 1);\n    setCount(c => c + 1);\n  }\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={buggy}>Buggy +2</button>\n      <button onClick={fixed}>Fixed +2</button>\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useState for the shared counter.",
            "Step 2: Keep both update approaches in the same component for comparison.",
            "Step 3: Start the shared count at zero.",
            "Step 4: Define the handler that mistakenly expects two replacements to add twice.",
            "Step 5: Supply the current snapshot plus one as the next value.",
            "Step 6: Supply that same next value again, so this call adds nothing further.",
            "Step 7: Define the handler that correctly builds on pending values.",
            "Step 8: Add one to the pending count.",
            "Step 9: Add one to the result of the previous update.",
            "Step 10: Return the counter and both comparison buttons.",
            "Step 11: Keep the comparison controls together.",
            "Step 12: Show the final value after React processes the updates.",
            "Step 13: Run the two identical replacement updates.",
            "Step 14: Run the two functional updates.",
            "Step 15: End the comparison group.",
            "Step 16: Count: 0 becomes Count: 1 after Buggy +2, then Count: 3 after Fixed +2."
          ],
          "output": "The screen starts with \"Count: 0\", \"Buggy +2\", and \"Fixed +2\". Click Buggy +2 once: \"Count: 1\" appears. Then click Fixed +2 once: \"Count: 3\" appears. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Each component instance keeps its own state.",
        "A setter affects a later render, not the running snapshot.",
        "React batches related updates.",
        "Use functional updates when building from pending state.",
        "Copy objects and arrays instead of changing stored values.",
        "Use a starting function for lazy initialization and a changed key for a reset."
      ],
      "commonMistakes": [
        "Expecting a state variable to change immediately after its setter runs.",
        "Repeating setCount(count + 1) and expecting every call to add one.",
        "Changing stored arrays with push or changing object fields directly.",
        "Calling an expensive starting function on every render instead of passing it to useState."
      ],
      "links": [
        {
          "title": "Queueing a Series of State Updates",
          "url": "https://react.dev/learn/queueing-a-series-of-state-updates",
          "kind": "article",
          "language": "English",
          "why": "Small counter examples show batching and functional updates step by step."
        }
      ]
    },
    {
      "topicId": "react-useeffect",
      "summary": "useEffect keeps a component in step with something outside React. Dependencies decide when to repeat that work, and cleanup stops the old work.",
      "syntax": [
        {
          "title": "Run after every committed render",
          "language": "jsx",
          "code": "useEffect(() => {\n  /* synchronize with an external system */\n});",
          "parts": [
            {
              "part": "useEffect",
              "meaning": "Declares synchronization at the top level of a component or custom Hook."
            },
            {
              "part": "() => {",
              "meaning": "Starts the setup function; omitting dependencies reruns it after every committed render."
            }
          ]
        },
        {
          "title": "Run on mount with no reactive dependencies",
          "language": "jsx",
          "code": "useEffect(() => {\n  /* setup that reads no reactive values */\n}, []);",
          "parts": [
            {
              "part": "useEffect",
              "meaning": "Declares an effect at the top level of a component or custom Hook."
            },
            {
              "part": "[]",
              "meaning": "Prevents dependency reruns; remounting runs setup again, and development Strict Mode adds an initial setup and cleanup cycle."
            }
          ]
        },
        {
          "title": "Rerun for dependencies and clean up",
          "language": "jsx",
          "code": "useEffect(() => {\n  const cleanup = setup(dependency);\n  return () => cleanup();\n}, [setup, dependency]);",
          "parts": [
            {
              "part": "useEffect",
              "meaning": "Declares an effect at the top level of a component or custom Hook."
            },
            {
              "part": "cleanup",
              "meaning": "The function returned by setup to undo its external work."
            },
            {
              "part": "setup(dependency)",
              "meaning": "Starts synchronization using the reactive input and returns a cleanup function."
            },
            {
              "part": "return () => cleanup()",
              "meaning": "Registers cleanup before setup reruns and when the component unmounts."
            },
            {
              "part": "[setup, dependency]",
              "meaning": "Lists every reactive value read by setup; changes are compared with Object.is."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Keep outside things in step",
          "points": [
            "Think of an effect as adjusting a room’s lamp after choosing a setting on a control panel. The lamp lives outside the panel.",
            "An effect is code that keeps something outside React matched to current props or state. Examples include browser titles, timers, and event listeners.",
            "Call useEffect at the top of the component and give it a setup function. Setup starts the outside work after React commits its screen changes.",
            "Effects follow committed screen changes. Browser painting, when updated pixels become visible, may happen before or after the effect runs."
          ]
        },
        {
          "heading": "Read the dependency list",
          "points": [
            "A dependency is a value from the component that an effect reads and must keep following. List changing props, state, and locally declared values used by setup, rather than choosing a list just to control timing.",
            "With no second argument, setup runs after every commit of that component. This is usually too frequent for work that should stay running.",
            "With [], setup does not repeat because props or state changed. It still runs when the component first appears, with extra development checks possible.",
            "With [count], setup runs initially and after count changes, while unrelated state changes do not restart it. React compares each dependency using Object.is, just as state updates compare values."
          ]
        },
        {
          "heading": "Stop before starting again",
          "points": [
            "Cleanup is the function returned by setup to stop or undo its outside work. Cancel a timer, remove a listener, or disconnect a connection.",
            "When a dependency changes, React runs the previous cleanup before the next setup. That cleanup still has the previous setup’s values.",
            "React also runs cleanup when the component leaves the screen. Returning clearTimeout(id) directly is wrong because that cancels immediately instead of returning a function.",
            "Match cleanup to setup, like switching off the old lamp before adjusting another. The reminder example cancels its old timer before starting a replacement."
          ]
        },
        {
          "heading": "Development checks reveal missing cleanup",
          "points": [
            "Strict Mode is a development check that helps find unsafe component behavior. When enabled at the root, it adds an initial setup, cleanup, setup cycle.",
            "People often call this effects running twice, but the middle cleanup matters because it tests whether setup can safely restart. Correct code leaves one active listener or timer after that check, rather than two copies doing the same work.",
            "This extra cycle does not happen in production because of Strict Mode. Do not disable the check or block setup with a flag.",
            "Instead, make setup safe to repeat after cleanup. Test what happens when the component disappears and returns, since real navigation can also restart its effects."
          ]
        },
        {
          "heading": "Choose simpler code when possible",
          "points": [
            "Derived data means a value worked out from existing props or state. Calculate a filtered list or full name during rendering instead of storing it through an effect.",
            "Work caused by a particular click belongs in that click handler. Saving a form should follow the submit event, rather than an effect watching a saved flag.",
            "Keep separate effects for unrelated outside jobs. A browser title update and a timer need different setup and cleanup, even inside one component.",
            "For fetching, cleanup can set an ignore flag so an older response cannot replace newer data. This prevents stale results without cancelling the request itself."
          ]
        },
        {
          "heading": "Find loops and old values",
          "points": [
            "An infinite loop is work that keeps repeating without stopping. It happens when an effect changes state and that change makes the effect run again.",
            "A new object or function created during each render can also change a dependency every time. Move unnecessary object creation inside setup when appropriate.",
            "Missing dependencies can leave a callback reading an old snapshot. Keep the dependency list honest instead of hiding warnings from the tool that checks it.",
            "For a timer that only increments state, use setCount(c => c + 1). This avoids reading count inside setup and keeps an empty dependency list correct."
          ]
        }
      ],
      "terms": [
        {
          "term": "effect",
          "meaning": "Code that keeps a component matched with something outside React."
        },
        {
          "term": "dependency",
          "meaning": "A value an effect reads that can make its setup run again when changed."
        },
        {
          "term": "cleanup",
          "meaning": "A returned function that stops the previous setup’s outside work."
        },
        {
          "term": "browser painting",
          "meaning": "The browser draws the updated page pixels that become visible on screen."
        },
        {
          "term": "Strict Mode",
          "meaning": "Development checks that help reveal unsafe component behavior."
        },
        {
          "term": "derived data",
          "meaning": "A value worked out from props or state already available."
        }
      ],
      "examples": [
        {
          "title": "Set and restore a browser title",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect } from \"react\";\nexport default function App() {\n  useEffect(() => {\n    const previous = document.title;\n    document.title = \"Reading notes\";\n    return () => { document.title = previous; };\n  }, []);\n  return <p>Open the browser tab title.</p>;\n}",
          "walkthrough": [
            "Step 1: Import useEffect to update a browser value outside React.",
            "Step 2: Place title synchronization in App.",
            "Step 3: Start setup after React commits the component.",
            "Step 4: Remember the title to restore when this setup ends.",
            "Step 5: Set the browser tab title to Reading notes.",
            "Step 6: Return cleanup that restores the previous title.",
            "Step 7: Use an empty list because setup reads no changing component values.",
            "Step 8: Show an instruction while the effect manages the browser title.",
            "Step 9: The page shows Open the browser tab title. and the tab title becomes Reading notes."
          ],
          "output": "The page says \"Open the browser tab title.\" The browser tab title becomes \"Reading notes\". Removing the component restores the previous title. Nothing is printed to the console."
        },
        {
          "title": "Restart a reminder when its choice changes",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [choice, setChoice] = useState(\"Tea\");\n  const [message, setMessage] = useState(\"Waiting\");\n  useEffect(() => {\n    const id = setTimeout(() => setMessage(\"Ready: \" + choice), 1000);\n    return () => clearTimeout(id);\n  }, [choice]);\n  return (\n    <div>\n      <p>Choice: {choice}</p>\n      <p>{message}</p>\n      <button onClick={() => setChoice(\"Water\")}>Choose Water</button>\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import the effect and state hooks for the changing reminder.",
            "Step 2: Keep the choice and reminder together in App.",
            "Step 3: Start with Tea as the value the timer must follow.",
            "Step 4: Keep Waiting visible until a timer finishes.",
            "Step 5: Start outside timer work after the current choice reaches the screen.",
            "Step 6: Schedule a message using this setup’s choice after one second.",
            "Step 7: Cancel this setup’s timer before replacement or removal.",
            "Step 8: Repeat setup whenever choice changes, keeping the timer matched to it.",
            "Step 9: Return the reminder details and choice button.",
            "Step 10: Group the choice, message, and button.",
            "Step 11: Show which choice the next timer result belongs to.",
            "Step 12: Show the message produced by the timer.",
            "Step 13: Choose Water so cleanup cancels Tea’s pending timer.",
            "Step 14: End the reminder group.",
            "Step 15: Initially Choice: Tea and Waiting appear; choose Water immediately, then one second later Ready: Water appears."
          ],
          "output": "Initially the page shows \"Choice: Tea\", \"Waiting\", and \"Choose Water\". Click Choose Water before one second passes: \"Choice: Water\" appears. One second after that click, \"Waiting\" becomes \"Ready: Water\". Nothing is printed to the console."
        },
        {
          "title": "Buggy timer and functional fix",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [bad, setBad] = useState(0);\n  const [good, setGood] = useState(0);\n  useEffect(() => {\n    // Bug: this callback keeps reading the first bad snapshot.\n    const brokenId = setInterval(() => setBad(bad + 1), 1000);\n    return () => clearInterval(brokenId);\n  }, []);\n  useEffect(() => {\n    // Fix: each update receives the pending value.\n    const fixedId = setInterval(() => setGood(g => g + 1), 1000);\n    return () => clearInterval(fixedId);\n  }, []);\n  return <p>Bad: {bad} | Good: {good}</p>;\n}",
          "walkthrough": [
            "Step 1: Import effects for timers and state for their visible counts.",
            "Step 2: Keep both timer versions together for comparison.",
            "Step 3: Start the broken count at zero.",
            "Step 4: Start the corrected count at zero.",
            "Step 5: Set up the intentionally broken timer separately.",
            "Step 6: Mark the old-snapshot bug before the timer line.",
            "Step 7: Read bad from the first render, so every tick supplies one.",
            "Step 8: Return cleanup that stops the broken timer.",
            "Step 9: Intentionally omit bad to demonstrate the bug; the dependency checker should flag this list.",
            "Step 10: Set up the corrected timer as a separate outside job.",
            "Step 11: Explain why the fixed callback avoids an old snapshot.",
            "Step 12: Use a functional update so each tick adds to pending state.",
            "Step 13: Return cleanup that stops the corrected timer.",
            "Step 14: Use an empty list correctly because this setup reads no changing component value.",
            "Step 15: Show how the two counters separate after repeated ticks.",
            "Step 16: Bad: 0 | Good: 0 becomes Bad: 1 | Good: 1 after one second, then Bad: 1 | Good: 2."
          ],
          "output": "Initially the page says \"Bad: 0 | Good: 0\". After one second it says \"Bad: 1 | Good: 1\". After two seconds it says \"Bad: 1 | Good: 2\". The broken effect deliberately has a missing dependency. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Use effects to synchronize with something outside React.",
        "Setup runs after React commits screen changes.",
        "List every changing component value read by setup.",
        "Cleanup runs before replacement setup and when the component is removed.",
        "Strict Mode adds a development setup, cleanup, setup check.",
        "Calculate derived values during rendering and handle click work in handlers."
      ],
      "commonMistakes": [
        "Using an effect to calculate a value that rendering could calculate directly.",
        "Leaving out a dependency to prevent reruns while keeping an old snapshot by accident.",
        "Starting timers or listeners without cleanup.",
        "Changing state in an effect that reruns because of that same change."
      ],
      "links": [
        {
          "title": "Synchronizing with Effects",
          "url": "https://react.dev/learn/synchronizing-with-effects",
          "kind": "article",
          "language": "English",
          "why": "Explains setup, dependencies, cleanup, and development checks with small examples."
        }
      ]
    },
    {
      "topicId": "react-useref",
      "summary": "useRef keeps a value between renders without causing a render when it changes. Use it for a page element or a timer handle.",
      "syntax": [
        {
          "title": "Keep a ref and attach it to the DOM",
          "language": "jsx",
          "code": "const ref = useRef(null);\nfunction handler() {\n  ref.current?.focus();\n}\nconst element = <input ref={ref} onFocus={handler} />;",
          "parts": [
            {
              "part": "ref",
              "meaning": "The stable object used to hold the DOM reference."
            },
            {
              "part": "useRef(null)",
              "meaning": "Creates a ref with an initial null value at the top level of a component or custom Hook."
            },
            {
              "part": "handler",
              "meaning": "An event handler that accesses the ref after the DOM element exists."
            },
            {
              "part": "ref.current",
              "meaning": "The mutable current value; changing it does not trigger rendering."
            },
            {
              "part": "?.focus()",
              "meaning": "Calls focus only when the current input node exists."
            },
            {
              "part": "ref={ref}",
              "meaning": "Lets React store the input node in ref.current and clear it when detached."
            },
            {
              "part": "onFocus={handler}",
              "meaning": "Calls the handler when the input receives focus."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "A pocket beside the screen",
          "points": [
            "A ref is a small object that holds a remembered value in its current property. Think of it as a pocket beside the component’s notebook.",
            "Call useRef(null) at the top of the component to start with an empty pocket. React returns the same ref object on later renders.",
            "Changing ref.current does not tell React to render again. Use state for values that must immediately change visible text when they change.",
            "Use a ref for details that handlers need but the screen does not show. The pocket stays available without making the screen follow its contents."
          ]
        },
        {
          "heading": "Reach a browser element",
          "points": [
            "A DOM ref holds an actual page element, rather than the text or number that element shows. Use it when a handler needs browser behavior.",
            "Pass the ref object to an input with ref={inputRef}. After React creates the input, React places that element into inputRef.current.",
            "In a click handler, inputRef.current.focus() moves typing focus to that input. Focus means the element becomes the place that receives keyboard input.",
            "The pocket comparison now becomes concrete: inputRef.current holds the browser input rather than its text. React clears it when that element is removed."
          ]
        },
        {
          "heading": "Remember a timer handle",
          "points": [
            "A timer ID is the handle returned when you schedule a timer. Store that handle in a ref so later clicks can cancel it.",
            "The second example keeps the pending timeout handle in timerRef.current. Its status message stays in state because the message must appear on screen.",
            "Clear any earlier timer before starting another, then replace the stored handle. Cleanup should also cancel a timer when its component leaves the screen.",
            "After cancelling, setting current back to null records that no timer is pending. That assignment changes the pocket without causing another render."
          ]
        },
        {
          "heading": "Keep rendering predictable",
          "points": [
            "Do not read or write ref.current during ordinary rendering. Read and change it in event handlers or effects instead, keeping rendering based on props and state.",
            "Passing an initial value to useRef is allowed and expected. That does not mean you should repeatedly change current while returning JSX.",
            "Use DOM refs for narrow actions such as focusing or scrolling. Let React keep control of the elements and text it creates.",
            "If a changing value belongs in the returned JSX, choose state. If only later work needs that value, a ref may be enough."
          ]
        }
      ],
      "terms": [
        {
          "term": "ref",
          "meaning": "An object that remembers a value without causing renders when changed."
        },
        {
          "term": "current",
          "meaning": "The property that holds a ref’s remembered value."
        },
        {
          "term": "DOM ref",
          "meaning": "A ref holding an actual browser element."
        },
        {
          "term": "focus",
          "meaning": "The element receiving keyboard input."
        },
        {
          "term": "timer ID",
          "meaning": "A handle used to cancel a scheduled timer."
        }
      ],
      "examples": [
        {
          "title": "Focus a name field",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useRef } from \"react\";\nexport default function App() {\n  const inputRef = useRef(null);\n  return (\n    <div>\n      <input aria-label=\"Name\" placeholder=\"Name\" ref={inputRef} />\n      <button onClick={() => inputRef.current.focus()}>Focus name</button>\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useRef to remember the browser input element.",
            "Step 2: Keep the input ref inside App.",
            "Step 3: Start without an element; React fills current after creating the input.",
            "Step 4: Return the field and its focus control.",
            "Step 5: Group the field and button.",
            "Step 6: Attach inputRef to the actual input and give it the accessible name Name.",
            "Step 7: Read current inside the click handler and focus that element.",
            "Step 8: End the field group.",
            "Step 9: The screen shows a blank Name field and Focus name; clicking the button moves typing focus into the field."
          ],
          "output": "The page shows an empty input with placeholder \"Name\" and a \"Focus name\" button. After clicking Focus name, the input has keyboard focus and its text stays empty. Nothing is printed to the console."
        },
        {
          "title": "Cancel a pending reminder",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useRef, useState } from \"react\";\nexport default function App() {\n  const timerRef = useRef(null);\n  const [status, setStatus] = useState(\"Idle\");\n  useEffect(() => () => clearTimeout(timerRef.current), []);\n  function start() {\n    clearTimeout(timerRef.current);\n    setStatus(\"Waiting\");\n    timerRef.current = setTimeout(() => {\n      timerRef.current = null;\n      setStatus(\"Done\");\n    }, 1000);\n  }\n  function cancel() {\n    clearTimeout(timerRef.current);\n    timerRef.current = null;\n    setStatus(\"Cancelled\");\n  }\n  return <div><p>{status}</p><button onClick={start}>Start</button><button onClick={cancel}>Cancel</button></div>;\n}",
          "walkthrough": [
            "Step 1: Import a ref for the handle, state for visible status, and an effect for cleanup.",
            "Step 2: Keep this reminder’s handle inside App.",
            "Step 3: Remember the pending timer handle without making it visible state.",
            "Step 4: Use state for the status that must update the screen.",
            "Step 5: Return cleanup that reads the latest handle when the component leaves.",
            "Step 6: Define the handler that starts a reminder.",
            "Step 7: Cancel any previous pending timer before replacing it.",
            "Step 8: Show Waiting through state rather than through the ref.",
            "Step 9: Store the handle returned by scheduling a one-second timeout.",
            "Step 10: Mark the timer as finished when its callback runs.",
            "Step 11: Show Done when the timeout finishes.",
            "Step 12: Set the waiting time to one thousand milliseconds.",
            "Step 13: Define the handler that cancels a pending reminder.",
            "Step 14: Use the remembered handle to stop the timeout.",
            "Step 15: Record that no timeout remains pending.",
            "Step 16: Show cancellation through a state update.",
            "Step 17: Show the status and connect the start and cancel controls.",
            "Step 18: Idle becomes Waiting after Start; Cancel before one second shows Cancelled, which remains after the timer would have finished."
          ],
          "output": "Initially the page shows \"Idle\", \"Start\", and \"Cancel\". Click Start: \"Waiting\" appears. Click Cancel before one second: \"Cancelled\" appears and remains after one second. Click Start again and wait one second: \"Done\" appears. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "The same ref object survives later renders.",
        "Changing current does not cause a render.",
        "Use state for changing values shown in JSX.",
        "Read DOM refs in handlers or effects after React attaches the element.",
        "Store timer handles in refs and cancel pending work during cleanup."
      ],
      "commonMistakes": [
        "Expecting a ref change to update visible text.",
        "Reading current during rendering before React has attached the element.",
        "Using a ref to directly rewrite text that React controls.",
        "Starting a timer without cancelling earlier timers or cleaning up on removal."
      ],
      "links": [
        {
          "title": "Manipulating the DOM with Refs",
          "url": "https://react.dev/learn/manipulating-the-dom-with-refs",
          "kind": "article",
          "language": "English",
          "why": "Uses a small focus example to show how refs reach real browser elements."
        }
      ]
    },
    {
      "topicId": "react-usecontext",
      "summary": "Context lets components read a shared value from a parent without passing it through every middle component. useContext reads the nearest matching provider’s value.",
      "syntax": [
        {
          "title": "Create context and provide a value",
          "language": "jsx",
          "code": "const ValueContext = createContext(defaultValue);\nfunction Provider({ value, children }) {\n  return <ValueContext.Provider value={value}>{children}</ValueContext.Provider>;\n}",
          "parts": [
            {
              "part": "ValueContext",
              "meaning": "The shared context object, created outside components."
            },
            {
              "part": "createContext(defaultValue)",
              "meaning": "Creates context with a static fallback used when no matching provider exists above the consumer."
            },
            {
              "part": "Provider",
              "meaning": "The wrapper component supplying context to its descendants."
            },
            {
              "part": "value",
              "meaning": "The context value supplied to descendants."
            },
            {
              "part": "children",
              "meaning": "The nested content that can consume this context."
            },
            {
              "part": "ValueContext.Provider",
              "meaning": "The explicit provider syntax, supported in React 19; ValueContext itself also works as the provider."
            }
          ]
        },
        {
          "title": "Read context in a consumer",
          "language": "jsx",
          "code": "function Consumer() {\n  const value = useContext(ValueContext);\n  return <span>{value}</span>;\n}",
          "parts": [
            {
              "part": "Consumer",
              "meaning": "A component that reads shared context."
            },
            {
              "part": "value",
              "meaning": "The renderable value from the nearest provider above this component, or the context default."
            },
            {
              "part": "useContext(ValueContext)",
              "meaning": "Reads and subscribes to the context at the component top level."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "A shared notice board",
          "points": [
            "Think of context as a notice board that descendants can read. Context is a way to pass a value through several component levels.",
            "Prop drilling means passing a prop through middle components that only forward it. Context removes that forwarding when many distant components need the same value.",
            "A provider is the parent wrapper that supplies a context value. A consumer is any component that reads that context through useContext.",
            "Typical shared values include a theme or the signed-in user. Context helps readers reach those values; it does not create changing state itself."
          ]
        },
        {
          "heading": "Create, provide, and read",
          "points": [
            "Call createContext(defaultValue) outside components to create the shared context object. The default is a fixed fallback used when no matching provider exists above.",
            "In React 19, write <ThemeContext value={theme}> around descendants. The older <ThemeContext.Provider value={theme}> form also works, but the shorter form is enough.",
            "Call useContext(ThemeContext) at the top of a descendant component. It reads the closest matching provider above that component, even through several middle components.",
            "The example’s theme label reads the notice board with useContext. A provider returned by that same label component would not supply its own useContext call."
          ]
        },
        {
          "heading": "Changes reach the readers",
          "points": [
            "Keep a changing shared value in state and pass it to the provider. Updating that state supplies the new value to its consumers.",
            "When the supplied value changes, every consumer reading that provider’s context renders again. React uses Object.is to compare the old provided value with the new one.",
            "New object values can cause consumer updates even when their fields look unchanged. Split a large context into smaller contexts with different responsibilities.",
            "For example, separate theme from user details so a theme change does not notify user-only consumers. A supplied undefined value does not activate the default."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Use props when only nearby components need the value. Explicit props make the source easy to follow and often solve the problem with less setup.",
            "Use context when many descendants need the same theme, user, or screen settings. Keep the provider near the part that actually shares those values.",
            "Consider an external state library, a separate package for shared state, when complex updates need fewer reader updates or dedicated debugging tools.",
            "An interview rule: start with props, add context for shared reach, and choose more tools when real complexity requires them. Context alone is not a performance guarantee."
          ]
        }
      ],
      "terms": [
        {
          "term": "context",
          "meaning": "A way to supply a value to descendants without forwarding props through every level."
        },
        {
          "term": "prop drilling",
          "meaning": "Passing props through middle components that only forward them."
        },
        {
          "term": "provider",
          "meaning": "A wrapper that supplies a context value to descendants."
        },
        {
          "term": "consumer",
          "meaning": "A component that reads a context value."
        },
        {
          "term": "default value",
          "meaning": "The fixed fallback returned when no matching provider exists above a consumer."
        },
        {
          "term": "external state library",
          "meaning": "A separate package that helps manage shared state."
        }
      ],
      "examples": [
        {
          "title": "Read a provided theme",
          "language": "jsx",
          "environment": "browser",
          "code": "import { createContext, useContext } from \"react\";\nconst ThemeContext = createContext(\"light\");\nfunction ThemeLabel() {\n  const theme = useContext(ThemeContext);\n  return <p>Theme: {theme}</p>;\n}\nexport default function App() {\n  return <ThemeContext value=\"dark\"><ThemeLabel /></ThemeContext>;\n}",
          "walkthrough": [
            "Step 1: Import the tools that create a context and read its value.",
            "Step 2: Create one context with light as its no-provider fallback.",
            "Step 3: Keep the context reader in a descendant component.",
            "Step 4: Read the closest provider’s theme.",
            "Step 5: Show the value read from context.",
            "Step 6: Place the provider above ThemeLabel.",
            "Step 7: Supply dark, overriding the fallback for this descendant.",
            "Step 8: The screen shows Theme: dark because the provider supplies dark."
          ],
          "output": "The page shows \"Theme: dark\". The fallback \"light\" is not used because a matching provider supplies \"dark\". Nothing is printed to the console."
        },
        {
          "title": "Change a theme through a middle component",
          "language": "jsx",
          "environment": "browser",
          "code": "import { createContext, useContext, useState } from \"react\";\nconst ThemeContext = createContext(\"light\");\nfunction ThemeLabel() {\n  const theme = useContext(ThemeContext);\n  return <p>Theme: {theme}</p>;\n}\nfunction Toolbar() {\n  return <section><ThemeLabel /><ThemeLabel /></section>;\n}\nexport default function App() {\n  const [theme, setTheme] = useState(\"light\");\n  return (\n    <ThemeContext value={theme}>\n      <button onClick={() => setTheme(t => t === \"light\" ? \"dark\" : \"light\")}>Toggle theme</button>\n      <Toolbar />\n    </ThemeContext>\n  );\n}",
          "walkthrough": [
            "Step 1: Import context tools and state for the changing provider value.",
            "Step 2: Create the context once outside all components.",
            "Step 3: Define the component that consumes the shared theme.",
            "Step 4: Read the closest provided theme in each label.",
            "Step 5: Show the theme received through context.",
            "Step 6: Define a middle component that does not read the theme.",
            "Step 7: Place two consumers below Toolbar without forwarding a theme prop.",
            "Step 8: Keep the shared theme state above both consumers.",
            "Step 9: Start the provider’s changing value at light.",
            "Step 10: Return the provider and the components that share its value.",
            "Step 11: Supply the current state value to all matching consumers below.",
            "Step 12: Switch the shared value between light and dark.",
            "Step 13: Render the middle component without passing theme through it.",
            "Step 14: End the provider’s shared area.",
            "Step 15: Two Theme: light labels become two Theme: dark labels after one Toggle theme click."
          ],
          "output": "The page shows \"Toggle theme\" and two separate lines saying \"Theme: light\". After one Toggle theme click, both lines say \"Theme: dark\". Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Create context outside components.",
        "A consumer reads the nearest matching provider above it.",
        "The default applies only when there is no matching provider.",
        "React 19 supports the context object itself as a provider.",
        "A changed provided value updates its context consumers.",
        "Choose props first and split contexts by responsibility."
      ],
      "commonMistakes": [
        "Expecting a provider returned by a component to affect useContext inside that same component.",
        "Expecting the default when a provider explicitly supplies undefined.",
        "Putting unrelated values in one large context and updating all its consumers together.",
        "Using context for values that a nearby prop could pass clearly."
      ],
      "links": [
        {
          "title": "Passing Data Deeply with Context",
          "url": "https://react.dev/learn/passing-data-deeply-with-context",
          "kind": "article",
          "language": "English",
          "why": "Shows prop drilling first, then replaces it with context in small steps."
        }
      ]
    },
    {
      "topicId": "react-usereducer",
      "summary": "useReducer keeps state changes together in one function. Components describe what happened with actions, and the reducer returns the next state.",
      "syntax": [
        {
          "title": "Define a pure reducer",
          "language": "jsx",
          "code": "function reducer(state, action) {\n  switch (action.type) {\n    case 'replace': return action.payload;\n    default: return state;\n  }\n}",
          "parts": [
            {
              "part": "reducer",
              "meaning": "A pure function returning the next state without mutating its inputs."
            },
            {
              "part": "state",
              "meaning": "The current state supplied by React."
            },
            {
              "part": "action",
              "meaning": "The object describing the requested update."
            },
            {
              "part": "action.type",
              "meaning": "The field identifying which update to perform."
            },
            {
              "part": "'replace'",
              "meaning": "The action type handled by this branch."
            },
            {
              "part": "action.payload",
              "meaning": "The replacement state carried by this action."
            },
            {
              "part": "default: return state",
              "meaning": "Keeps the current state for unrecognized action types."
            }
          ]
        },
        {
          "title": "Create reducer state and dispatch",
          "language": "jsx",
          "code": "const [state, dispatch] = useReducer(reducer, initial);\nfunction handler() {\n  dispatch({ type: 'replace', payload: next });\n}",
          "parts": [
            {
              "part": "state",
              "meaning": "The current reducer state."
            },
            {
              "part": "dispatch",
              "meaning": "The function that queues an action for the reducer."
            },
            {
              "part": "useReducer(reducer, initial)",
              "meaning": "Declares reducer state at the component or custom Hook top level, using initial as its starting value."
            },
            {
              "part": "handler",
              "meaning": "The callback that requests a state update."
            },
            {
              "part": "{ type: 'replace', payload: next }",
              "meaning": "An action identifying replacement and carrying next as the replacement state."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "One desk for related changes",
          "points": [
            "Think of a reducer as one service desk handling several kinds of requests. Instead of changing related fields everywhere, send each request to that desk.",
            "A reducer is a function that receives the current state and an action, then returns the next state. An action describes what happened.",
            "Keep the reducer pure, as with state update functions. Its rules should depend only on the state and action it receives.",
            "Call useReducer(reducer, initialState) at the top of the component. It returns the current state and dispatch, the function used to send an action."
          ]
        },
        {
          "heading": "Describe events, return new state",
          "points": [
            "An action often looks like { type: \"added\" }, where type names the event. Include extra information when needed, such as the item being added.",
            "Calling dispatch({ type: \"added\" }) sends that description to React. React uses the reducer to work out the next state for a later render.",
            "The reducer’s added branch copies the old state and changes the related fields together. Return new objects instead of changing the old state.",
            "Keep timers, logging, and other outside work out of the reducer. Development checks may call a reducer twice, so outside changes could happen twice too."
          ]
        },
        {
          "heading": "Compare the same counter",
          "points": [
            "The first example uses useState for a quantity and its status. Its Add handler builds the next object directly, and Reset replaces it.",
            "The second example keeps the same visible behavior with useReducer. Its handlers send added and reset actions, while the reducer holds both update rules.",
            "That service desk comparison matches dispatch: handlers report events instead of each carrying all the rules. Related fields stay together when the rules grow.",
            "You can combine useReducer with context by providing state and dispatch to distant descendants. This shares the same update rules without forwarding many props."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Use useState when a value has only a few simple changes. It usually needs less code and keeps a small component easy to follow.",
            "Use useReducer when many events change related fields, or update rules are scattered across handlers. Named actions make those changes easier to inspect.",
            "A reducer does not automatically make rendering faster or share state between components. Each useReducer call still manages its own state.",
            "An interview rule: choose useState for simple updates and useReducer for complex update rules. Separate pure rules when that makes the behavior easier to explain."
          ]
        }
      ],
      "terms": [
        {
          "term": "reducer",
          "meaning": "A function that receives state and an action and returns the next state."
        },
        {
          "term": "action",
          "meaning": "A description of what happened, often an object with a type field."
        },
        {
          "term": "dispatch",
          "meaning": "The function that sends an action for React to process with the reducer."
        },
        {
          "term": "pure function",
          "meaning": "A function with the same result for the same inputs and no outside changes."
        }
      ],
      "examples": [
        {
          "title": "Quantity and status with useState",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [cart, setCart] = useState({ quantity: 0, status: \"Empty\" });\n  return (\n    <div>\n      <p>Quantity: {cart.quantity} | Status: {cart.status}</p>\n      <button onClick={() => setCart(c => ({ ...c, quantity: c.quantity + 1, status: \"Changed\" }))}>Add</button>\n      <button onClick={() => setCart({ quantity: 0, status: \"Empty\" })}>Reset</button>\n    </div>);\n}",
          "walkthrough": [
            "Step 1: Use the familiar state hook as the comparison before moving rules into a reducer.",
            "Step 2: Keep the quantity and status comparison inside App.",
            "Step 3: Start the related fields together with quantity zero and status Empty.",
            "Step 4: Return the same controls that the reducer version will use.",
            "Step 5: Keep both controls beside their shared result.",
            "Step 6: Show both fields so each update rule can be compared.",
            "Step 7: Keep the add rule inside the handler, changing both fields together.",
            "Step 8: Keep the reset rule inside its handler, replacing both fields together.",
            "Step 9: End the comparison group and returned JSX.",
            "Step 10: Quantity: 0 | Status: Empty becomes Quantity: 1 | Status: Changed after Add, then resets after Reset."
          ],
          "output": "The page starts with \"Quantity: 0 | Status: Empty\", \"Add\", and \"Reset\". After one Add click, it says \"Quantity: 1 | Status: Changed\". After Reset, it says \"Quantity: 0 | Status: Empty\" again. Nothing is printed to the console."
        },
        {
          "title": "The same behavior with useReducer",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useReducer } from \"react\";\nconst initialCart = { quantity: 0, status: \"Empty\" };\nfunction reducer(state, action) {\n  switch (action.type) {\n    case \"added\": return { ...state, quantity: state.quantity + 1, status: \"Changed\" };\n    case \"reset\": return { ...initialCart };\n    default: throw new Error(\"Unknown action\");\n  }\n}\nexport default function App() {\n  const [cart, dispatch] = useReducer(reducer, initialCart);\n  return (\n    <div>\n      <p>Quantity: {cart.quantity} | Status: {cart.status}</p>\n      <button onClick={() => dispatch({ type: \"added\" })}>Add</button>\n      <button onClick={() => dispatch({ type: \"reset\" })}>Reset</button>\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useReducer to keep the update rules together.",
            "Step 2: Name the starting state so initialization and reset use the same values.",
            "Step 3: Receive the current state and the event description in a pure reducer.",
            "Step 4: Choose an update rule from the action’s type.",
            "Step 5: Return a copied object with the increased quantity and changed status.",
            "Step 6: Return a fresh copy of the starting values for reset.",
            "Step 7: Reject an unexpected action instead of silently returning the wrong state.",
            "Step 8: Keep the visible controls in App while the rules stay outside it.",
            "Step 9: Receive the current cart and the function that sends actions.",
            "Step 10: Return the same visible result as the useState version.",
            "Step 11: Group the result and event controls.",
            "Step 12: Show the reducer’s current state fields.",
            "Step 13: Describe an added event instead of building state in this handler.",
            "Step 14: Describe a reset event so the reducer chooses its reset rule.",
            "Step 15: End the cart controls.",
            "Step 16: Quantity: 0 | Status: Empty becomes Quantity: 1 | Status: Changed after Add, then resets after Reset."
          ],
          "output": "The page starts with \"Quantity: 0 | Status: Empty\", \"Add\", and \"Reset\". After one Add click, it says \"Quantity: 1 | Status: Changed\". After Reset, it says \"Quantity: 0 | Status: Empty\" again. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "A reducer receives state and an action and returns next state.",
        "Reducers must be pure and must not mutate stored state.",
        "Dispatch sends an event description rather than directly replacing state.",
        "Use reducers when many related update rules need one clear home.",
        "useReducer manages state locally; context can share state and dispatch."
      ],
      "commonMistakes": [
        "Changing the existing state object inside a reducer.",
        "Starting timers or doing other outside work inside a reducer.",
        "Dispatching immediately during rendering instead of inside a handler.",
        "Forgetting to return a complete next state for a handled action."
      ],
      "links": [
        {
          "title": "Extracting State Logic into a Reducer",
          "url": "https://react.dev/learn/extracting-state-logic-into-a-reducer",
          "kind": "article",
          "language": "English",
          "why": "Moves familiar state updates into a reducer one step at a time."
        }
      ]
    },
    {
      "topicId": "react-memoization",
      "summary": "Memoization keeps earlier work so React can sometimes skip doing it again. Use it when measurements show repeated work slows interaction.",
      "syntax": [
        {
          "title": "Cache a calculated value",
          "language": "jsx",
          "code": "const value = useMemo(() => calculate(input), [calculate, input]);\n/* use the cached value */",
          "parts": [
            {
              "part": "value",
              "meaning": "The cached calculation result."
            },
            {
              "part": "useMemo",
              "meaning": "Caches a pure calculation at the component or custom Hook top level."
            },
            {
              "part": "calculate(input)",
              "meaning": "The pure calculation using the reactive input."
            },
            {
              "part": "[calculate, input]",
              "meaning": "Lists all reactive values used by the calculation; a changed dependency causes recalculation."
            }
          ]
        },
        {
          "title": "Cache a callback",
          "language": "jsx",
          "code": "const callback = useCallback(() => handler(input), [handler, input]);\n/* pass callback to a child */",
          "parts": [
            {
              "part": "callback",
              "meaning": "The cached function reference."
            },
            {
              "part": "useCallback",
              "meaning": "Caches a function at the component or custom Hook top level without calling it."
            },
            {
              "part": "handler(input)",
              "meaning": "The work performed later when the callback is invoked."
            },
            {
              "part": "[handler, input]",
              "meaning": "Lists all reactive values captured by the callback; changes produce a new function reference."
            }
          ]
        },
        {
          "title": "Memoize a component",
          "language": "jsx",
          "code": "const MemoizedComponent = memo(Component);\nconst element = <MemoizedComponent value={value} />;",
          "parts": [
            {
              "part": "MemoizedComponent",
              "meaning": "The component returned by memo, normally declared outside rendering."
            },
            {
              "part": "memo(Component)",
              "meaning": "Allows skipping parent-driven rerenders when props compare equal; state and context changes can still rerender."
            },
            {
              "part": "value={value}",
              "meaning": "Passes the value prop, compared using Object.is by default."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Keep useful work",
          "points": [
            "Memoization means remembering an earlier result so you can reuse it during later work. Think of keeping a shopping total instead of adding every item’s price again each time someone asks.",
            "A cache is a place that keeps something for later reuse. React provides different tools for keeping calculated values, functions, and component work.",
            "These tools help when the same inputs appear again during otherwise unrelated updates. They cannot remove work when the inputs really change and a new answer is needed for the screen.",
            "Keep calculations pure, meaning they return answers without changing outside values or causing visible actions. React can repeat or discard calculations, so visible behavior must stay correct whenever React chooses to run the calculation again."
          ]
        },
        {
          "heading": "Keep a calculated value",
          "points": [
            "useMemo caches the value returned by a calculation. Write useMemo(() => calculate(items), [items]) to reuse that value while items stays the same.",
            "Its dependency list contains every changing value used from the component. React compares each dependency with its previous value using Object.is.",
            "The first render still performs the calculation and stores its returned answer for possible reuse. Later renders can reuse its answer, like reusing the shopping total until the basket changes rather than adding unchanged prices.",
            "Use this for a measured slow filter or calculation. Do not rely on the cached value as permanent storage; React may discard it."
          ]
        },
        {
          "heading": "Keep component work",
          "points": [
            "React.memo, usually imported as memo, wraps a component. It can skip a parent-driven render when the component receives the same props.",
            "Its default shallow comparison checks each prop separately with Object.is against the last received value. It does not walk through every field inside an object or array to check whether their contents match.",
            "Reference equality means two values point to the same object or function. Two separately created objects fail this check, even with identical contents.",
            "A new object prop can therefore defeat memo on every parent render. The child still renders for its own state or context changes."
          ]
        },
        {
          "heading": "Keep a function",
          "points": [
            "useCallback caches a function rather than its returned answer. Write useCallback(() => save(id), [id]) when a stable function has a useful purpose.",
            "React returns the earlier function while its dependencies match their values from the previous render. It does not call that function; the click or other caller does that later when the operation is needed.",
            "A freshly written function prop has a different reference on each render. A memo-wrapped child may therefore render even when other props match.",
            "Include every changing value that the function reads. Leaving one out can keep a function that still reads an earlier render’s value."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Measure a slow interaction before adding memoization. A profiler, a tool that records rendering work, helps identify which component actually takes time.",
            "First remove unnecessary effects, keep state near its users, and simplify slow calculations. Those changes can remove work without adding dependency lists.",
            "Memoization helps when expensive work repeats with unchanged inputs. It adds noise when calculations are cheap or the inputs change every time anyway.",
            "An interview rule is: measure, fix the structure, then cache repeated expensive work. Keep the change only when another measurement shows useful improvement."
          ]
        },
        {
          "heading": "Keep the result correct",
          "points": [
            "In the second example, a stable list and callback let memo reuse child work. Changing the separate counter need not repeat that work.",
            "The third example shows an omitted dependency beside its fix. Both functions are cached, but only the complete dependency list keeps their answers current.",
            "React Compiler is a build tool that can add memoization automatically when configured. Its use reduces the need for manual memoization in many components.",
            "Treat skipping work as an optional improvement, never a behavior guarantee. Removing memoization should leave the same visible answers and working event handlers."
          ]
        }
      ],
      "terms": [
        {
          "term": "memoization",
          "meaning": "Memoization reuses earlier work when its inputs have not changed."
        },
        {
          "term": "cache",
          "meaning": "A cache keeps a value for later reuse."
        },
        {
          "term": "pure",
          "meaning": "A pure calculation returns an answer without changing anything outside itself."
        },
        {
          "term": "shallow comparison",
          "meaning": "A shallow comparison checks each prop without comparing all fields inside it."
        },
        {
          "term": "reference equality",
          "meaning": "Reference equality checks whether values point to the same object or function."
        },
        {
          "term": "profiler",
          "meaning": "A profiler records rendering work so you can find slow components."
        }
      ],
      "examples": [
        {
          "title": "Cache a small total",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useMemo, useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const total = useMemo(() => 2 + 3, []);\n  return <button onClick={() => setCount(c => c + 1)}>Total: {total}; clicks: {count}</button>;\n}",
          "walkthrough": [
            "Step 1: Import the hooks used to cache a value and trigger an unrelated update.",
            "Step 2: Keep the calculation and unrelated counter together so reuse is easy to see.",
            "Step 3: Use this counter to cause renders without changing the calculation’s inputs.",
            "Step 4: Cache 5 with no changing inputs; this tiny calculation illustrates the syntax only.",
            "Step 5: Change the click count while the cached total remains 5.",
            "Step 6: Initially the button says \"Total: 5; clicks: 0\". After one click it says \"Total: 5; clicks: 1\". Nothing is logged to the console."
          ],
          "output": "Initially the button says \"Total: 5; clicks: 0\". After one click it says \"Total: 5; clicks: 1\". Nothing is logged to the console."
        },
        {
          "title": "Keep list props stable",
          "language": "jsx",
          "environment": "browser",
          "code": "import { memo, useCallback, useMemo, useState } from \"react\";\nconst foods = [\"Pear\", \"Peach\", \"Plum\"];\nconst FoodList = memo(function FoodList({ items, onPick }) {\n  return <div>{items.map(item => <button key={item} onClick={() => onPick(item)}>{item}</button>)}</div>;\n});\nexport default function App() {\n  const [clicks, setClicks] = useState(0);\n  const [picked, setPicked] = useState(\"None\");\n  const items = useMemo(() => foods.filter(food => food.startsWith(\"Pe\")), []);\n  const onPick = useCallback(food => setPicked(food), []);\n  return <><button onClick={() => setClicks(c => c + 1)}>Other: {clicks}</button><FoodList items={items} onPick={onPick} /><p>Picked: {picked}</p></>;\n}",
          "walkthrough": [
            "Step 1: Import all three memoization tools to give a child stable props.",
            "Step 2: Keep the source array outside rendering so it retains its reference.",
            "Step 3: Wrap the child in memo so matching props can skip parent-driven work.",
            "Step 4: Call the supplied callback with the chosen food; these internal handlers do not change the child’s incoming props.",
            "Step 5: Own the selection and an unrelated counter above the memo-wrapped child.",
            "Step 6: Keep an independent update that leaves the child’s inputs unchanged.",
            "Step 7: Keep the selected food for the message below the list.",
            "Step 8: Keep the filtered array reference because the source never changes.",
            "Step 9: Keep the callback reference; the state setter is stable and no changing value is read.",
            "Step 10: Pass stable props to the child while showing selection and unrelated updates.",
            "Step 11: Initially the buttons say \"Other: 0\", \"Pear\", and \"Peach\", followed by \"Picked: None\". Click Other: it becomes \"Other: 1\". Click Pear: the message becomes \"Picked: Pear\". Nothing is logged to the console."
          ],
          "output": "Initially the buttons say \"Other: 0\", \"Pear\", and \"Peach\", followed by \"Picked: None\". Click Other: it becomes \"Other: 1\". Click Pear: the message becomes \"Picked: Pear\". Nothing is logged to the console."
        },
        {
          "title": "An old value inside a cached function",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useCallback, useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const [answer, setAnswer] = useState(\"None\");\n  const broken = useCallback(() => setAnswer(String(count)), []);\n  const fixed = useCallback(() => setAnswer(String(count)), [count]);\n  return <><button onClick={() => setCount(c => c + 1)}>Count: {count}</button><button onClick={broken}>Broken read</button><button onClick={fixed}>Fixed read</button><p>Read: {answer}</p></>;\n}",
          "walkthrough": [
            "Step 1: Import the hook whose dependency list controls which function is kept.",
            "Step 2: Compare an incorrect callback and its corrected version side by side.",
            "Step 3: Provide a changing value for both callbacks to read.",
            "Step 4: Show the callback result so the bug is visible.",
            "Step 5: Demonstrate the bug: the empty list keeps the function reading the initial count.",
            "Step 6: Fix the dependency list so the function reads the current count.",
            "Step 7: Increase the count, then compare the old answer with the current answer.",
            "Step 8: Initially: \"Count: 0\", \"Broken read\", \"Fixed read\", and \"Read: None\". Click Count once, then Broken read: \"Count: 1\" and \"Read: 0\". Click Fixed read: \"Read: 1\". Nothing is logged to the console."
          ],
          "output": "Initially: \"Count: 0\", \"Broken read\", \"Fixed read\", and \"Read: None\". Click Count once, then Broken read: \"Count: 1\" and \"Read: 0\". Click Fixed read: \"Read: 1\". Nothing is logged to the console."
        }
      ],
      "keyPoints": [
        "useMemo caches a calculated value.",
        "useCallback caches a function without calling it.",
        "memo compares each prop with Object.is by default.",
        "Fresh object and function props can prevent skipping a render.",
        "Include all changing dependencies and measure before optimizing.",
        "Memoization must never be required for correct behavior."
      ],
      "commonMistakes": [
        "Caching every small calculation makes code harder to read without a measured benefit.",
        "Omitting dependencies can keep functions that read old values.",
        "Passing fresh objects to a memo-wrapped child can defeat the intended improvement."
      ],
      "links": [
        {
          "title": "useMemo",
          "url": "https://react.dev/reference/react/useMemo",
          "kind": "article",
          "language": "English",
          "why": "Shows what useMemo does with small examples and answers the common questions."
        }
      ]
    },
    {
      "topicId": "react-custom-hooks",
      "summary": "A custom hook puts reusable hook logic into a named function. Each call keeps its own state while sharing the same instructions.",
      "syntax": [
        {
          "title": "Define and call a custom Hook",
          "language": "jsx",
          "code": "function useValue(initial) {\n  const [value, setValue] = useState(initial);\n  return [value, setValue];\n}\nfunction Content({ initial }) {\n  const [value, setValue] = useValue(initial);\n  return <input value={value} onChange={event => setValue(event.target.value)} />;\n}",
          "parts": [
            {
              "part": "useValue",
              "meaning": "A custom Hook named with use followed by a capital letter, called unconditionally at the top level."
            },
            {
              "part": "initial",
              "meaning": "The initial input string."
            },
            {
              "part": "value",
              "meaning": "The current input state."
            },
            {
              "part": "setValue",
              "meaning": "The state setter returned for callers to use."
            },
            {
              "part": "useState(initial)",
              "meaning": "Calls a built-in Hook unconditionally at the custom Hook top level."
            },
            {
              "part": "Content",
              "meaning": "A component using its own independent custom Hook state."
            },
            {
              "part": "event.target.value",
              "meaning": "The input string used to update state synchronously."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Reuse instructions",
          "points": [
            "A custom hook is a function whose name starts with use and that calls other hooks. It packages related behavior behind a clear name.",
            "Think of giving two cooks the same recipe. They follow identical instructions, but each cook still has a separate bowl and separate ingredients.",
            "Likewise, calling useToggle twice does not create shared state. Each call keeps its own value, even when both calls appear in one component.",
            "Extract repeated behavior when its purpose is clear. A hook can handle one useful task without also choosing the buttons or text around it."
          ]
        },
        {
          "heading": "Follow the calling rules",
          "points": [
            "Call hooks only at the top level of a component or another hook. Top level means outside loops, conditions, and nested functions.",
            "Place hook calls before early returns, which leave a function before its remaining lines run. Every render must reach the same hook calls.",
            "React matches ordinary hook state by call order. Skipping one call could make later calls match the wrong stored values, breaking that connection.",
            "Do not call hooks from click handlers or ordinary helper functions. Call the hook during rendering, then let handlers call the functions it returns."
          ]
        },
        {
          "heading": "Choose a clear interface",
          "points": [
            "An interface is the inputs and outputs another piece of code uses to work with it. Give a custom hook inputs that describe the behavior it should manage without exposing every detail inside its implementation.",
            "For useToggle, an initial value can be the input that lets different callers start differently. Returning the current value and a toggle function gives the caller everything it needs without revealing how the value is kept.",
            "Return an array when a small ordered pair feels natural. Return an object with named fields when several results would be hard to remember.",
            "Start the name with use followed by a capital letter, such as useToggle. Name the behavior rather than a particular screen or button."
          ]
        },
        {
          "heading": "Build useful hooks",
          "points": [
            "useToggle can keep a boolean, a value that is either true or false. Its toggle function uses the previous value to choose the opposite.",
            "useLocalStorage can keep a value in browser storage, which remembers text between page visits. Accept a stable key and an initial fallback value.",
            "Serialization means turning a value into text for storage. Use JSON.stringify when saving and JSON.parse when reading, with handling for invalid saved text.",
            "A small useFetch can accept an address and return data, loading, and error. Its effect starts work and cleans up when that address changes."
          ]
        },
        {
          "heading": "Keep ownership and timing clear",
          "points": [
            "Moving an effect into a hook does not remove its dependencies or change when cleanup must happen. Include changing inputs, and clean up timers or pending work when appropriate so callers do not receive outdated results.",
            "A storage hook should read an initial value carefully and save changes in an effect. Handle blocked storage instead of assuming access always succeeds.",
            "Treat the storage key as fixed unless the hook explicitly supports changing it. Otherwise old state might be saved under an unexpected new key.",
            "The recipe comparison appears directly in useToggle: two calls run the same instructions but hold separate booleans. Neither call changes the other bowl."
          ]
        },
        {
          "heading": "Avoid hidden surprises",
          "points": [
            "A hook should return values and useful operations, rather than hide unrelated screen changes that callers cannot predict. The caller should understand its purpose from the name and understand its results without reading every implementation line.",
            "When behavior should be conditional, put the condition inside the hook’s effect or returned operation. The hook call itself must remain unconditional during every render.",
            "The special React 19 use API can read resources and allows conditional calls. This exception does not apply to useState or custom hooks.",
            "Keep an ordinary calculation as an ordinary function when it calls no hooks. Adding use to its name creates restrictions without giving it state."
          ]
        }
      ],
      "terms": [
        {
          "term": "custom hook",
          "meaning": "A custom hook is a use-named function that calls hooks to share behavior."
        },
        {
          "term": "top level",
          "meaning": "Top level is the part of a function outside nested blocks and functions."
        },
        {
          "term": "early return",
          "meaning": "An early return exits a function before its remaining lines run."
        },
        {
          "term": "interface",
          "meaning": "An interface is the inputs and outputs other code uses."
        },
        {
          "term": "boolean",
          "meaning": "A boolean is a value that is either true or false."
        },
        {
          "term": "serialization",
          "meaning": "Serialization turns a value into text that can be stored or sent."
        }
      ],
      "examples": [
        {
          "title": "One reusable toggle",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  return [on, () => setOn(value => !value)];\n}\nexport default function App() {\n  const [on, toggle] = useToggle();\n  return <button onClick={toggle}>{on ? \"On\" : \"Off\"}</button>;\n}",
          "walkthrough": [
            "Step 1: Use state inside the custom hook instead of repeating the toggle behavior in each caller.",
            "Step 2: Name the hook after its behavior and accept an optional starting value.",
            "Step 3: Keep a separate boolean for each call to this hook.",
            "Step 4: Return the current value and an operation that reverses the latest value.",
            "Step 5: Use the hook without tying it to a particular button design.",
            "Step 6: Receive the value and operation from one unconditional hook call.",
            "Step 7: Connect the returned operation to the button and display the returned value.",
            "Step 8: Initially the button says \"Off\". After one click it says \"On\". After another click it says \"Off\". Nothing is logged to the console."
          ],
          "output": "Initially the button says \"Off\". After one click it says \"On\". After another click it says \"Off\". Nothing is logged to the console."
        },
        {
          "title": "Remember a saved choice",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nfunction useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    try {\n      const saved = localStorage.getItem(key);\n      return saved === null ? initial : JSON.parse(saved);\n    } catch { return initial; }\n  });\n  useEffect(() => {\n    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}\n  }, [key, value]);\n  return [value, setValue];\n}\nexport default function App() {\n  const [choice, setChoice] = useLocalStorage(\"snack-choice\", \"Pear\");\n  return <><p>Snack: {choice}</p><button onClick={() => setChoice(\"Plum\")}>Choose Plum</button></>;\n}",
          "walkthrough": [
            "Step 1: Use state for the current choice and an effect to save committed changes.",
            "Step 2: Accept a storage key that callers keep fixed and a fallback value.",
            "Step 3: Read storage only when this hook call initializes its state.",
            "Step 4: Handle unavailable storage or invalid saved text without stopping the screen.",
            "Step 5: Read text stored under this hook call’s key.",
            "Step 6: Use the fallback when nothing is saved, or turn saved text back into a value.",
            "Step 7: Use the fallback if reading or parsing fails.",
            "Step 8: Save after rendering rather than writing to storage during rendering.",
            "Step 9: Turn the value into text and tolerate storage failure while keeping the choice usable.",
            "Step 10: Save again when the current value changes.",
            "Step 11: Expose the current value and its setter while keeping storage work inside the hook.",
            "Step 12: Use the saved choice in an ordinary component.",
            "Step 13: Use a fixed key and start with Pear if no valid saved value exists.",
            "Step 14: Change the choice through the returned setter so the saving effect follows automatically.",
            "Step 15: With no saved snack-choice value, the screen says \"Snack: Pear\" and \"Choose Plum\". Click Choose Plum: \"Snack: Plum\" appears. Reloading still shows \"Snack: Plum\" when storage works. If storage is blocked, the choice still changes but cannot be remembered. Nothing is logged to the console."
          ],
          "output": "With no saved snack-choice value, the screen says \"Snack: Pear\" and \"Choose Plum\". Click Choose Plum: \"Snack: Plum\" appears. Reloading still shows \"Snack: Plum\" when storage works. If storage is blocked, the choice still changes but cannot be remembered. Nothing is logged to the console."
        },
        {
          "title": "Fix cleanup in a small data hook",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nconst fruits = { Slow: \"Pear\", Fast: \"Plum\" };\nfunction useFetch(name) {\n  const [result, setResult] = useState({ data: null, loading: true, error: \"\" });\n  useEffect(() => {\n    setResult({ data: null, loading: true, error: \"\" });\n    const timer = setTimeout(() => {\n      setResult({ data: fruits[name] ?? null, loading: false, error: fruits[name] ? \"\" : \"Fruit not found\" });\n    }, name === \"Slow\" ? 200 : 20);\n    // Bug: without cleanup, the older result can replace the newer result.\n    return () => clearTimeout(timer);\n  }, [name]);\n  return result;\n}\nexport default function App() {\n  const [name, setName] = useState(\"Slow\");\n  const { data, loading, error } = useFetch(name);\n  return <><button onClick={() => setName(\"Fast\")}>Load Plum</button><p>{loading ? \"Loading...\" : error || `Fruit: ${data}`}</p></>;\n}",
          "walkthrough": [
            "Step 1: Use an effect inside the custom hook to manage delayed data and its cleanup.",
            "Step 2: Use fixed data so this small useFetch needs no outside request.",
            "Step 3: Accept the requested name as the hook’s changing input.",
            "Step 4: Keep this call’s data, progress, and error together behind the hook interface.",
            "Step 5: Start new delayed work when the requested name changes.",
            "Step 6: Clear the old outcome while this request is waiting.",
            "Step 7: Keep the delayed operation’s identifier so cleanup can stop it.",
            "Step 8: Return a successful fixed value or a readable error through the same interface.",
            "Step 9: Make the first request slower so an outdated overwrite would be visible.",
            "Step 10: Identify the missing-cleanup bug that this hook must prevent.",
            "Step 11: Fix the bug by canceling the earlier work before the next request starts.",
            "Step 12: Repeat and clean up the effect whenever its input changes.",
            "Step 13: Return named fields so the caller can choose its own waiting and error messages.",
            "Step 14: Keep display choices outside the reusable hook.",
            "Step 15: Start with the slower request.",
            "Step 16: Call the hook unconditionally and read its named results.",
            "Step 17: Change the request input while keeping loading and result display in the component.",
            "Step 18: Initially the button says \"Load Plum\" and the message says \"Loading...\". Click Load Plum before 200 milliseconds pass. After the fast timer finishes, the message says \"Fruit: Plum\" and stays there after the original slow deadline. Without that click, the first request finishes with \"Fruit: Pear\". Nothing is logged to the console."
          ],
          "output": "Initially the button says \"Load Plum\" and the message says \"Loading...\". Click Load Plum before 200 milliseconds pass. After the fast timer finishes, the message says \"Fruit: Plum\" and stays there after the original slow deadline. Without that click, the first request finishes with \"Fruit: Pear\". Nothing is logged to the console."
        }
      ],
      "keyPoints": [
        "A custom hook starts with use and calls other hooks.",
        "Custom hooks share instructions, not one state value.",
        "Call hooks at the top level before early returns.",
        "Call hooks only from components or other hooks.",
        "Choose clear inputs and useful returned values or operations.",
        "Effects inside hooks still need dependencies and cleanup."
      ],
      "commonMistakes": [
        "Calling a hook only when a condition is true can change hook order.",
        "Calling a hook inside a click handler breaks the calling rules.",
        "Using the same hook twice does not make its state shared.",
        "Naming a plain calculation with use adds unnecessary calling restrictions."
      ],
      "links": [
        {
          "title": "Reusing Logic with Custom Hooks",
          "url": "https://react.dev/learn/reusing-logic-with-custom-hooks",
          "kind": "article",
          "language": "English",
          "why": "Builds reusable behavior in small steps and explains independent state."
        }
      ]
    },
    {
      "topicId": "react-concurrent-hooks",
      "summary": "useId connects related elements. useTransition and useDeferredValue help typing stay responsive while less urgent content changes.",
      "syntax": [
        {
          "title": "Generate an accessibility ID",
          "language": "jsx",
          "code": "const id = useId();\nconst field = <><label htmlFor={id}>{label}</label><input id={id} /></>;",
          "parts": [
            {
              "part": "id",
              "meaning": "The unique ID returned for this Hook call; it is not a list key."
            },
            {
              "part": "useId()",
              "meaning": "Generates an ID at the component or custom Hook top level."
            },
            {
              "part": "htmlFor={id}",
              "meaning": "Associates the label with the input having this ID."
            },
            {
              "part": "label",
              "meaning": "The visible label text."
            },
            {
              "part": "id={id}",
              "meaning": "Assigns the generated ID to the input element."
            }
          ]
        },
        {
          "title": "Mark an update as a transition",
          "language": "jsx",
          "code": "const [isPending, startTransition] = useTransition();\nfunction handler() {\n  startTransition(() => setValue(next));\n}",
          "parts": [
            {
              "part": "isPending",
              "meaning": "Indicates whether this Hook has a pending transition."
            },
            {
              "part": "startTransition",
              "meaning": "Runs an action immediately and marks its synchronous state updates as nonblocking."
            },
            {
              "part": "useTransition()",
              "meaning": "Declares transition state at the component or custom Hook top level."
            },
            {
              "part": "handler",
              "meaning": "The event handler that starts the transition."
            },
            {
              "part": "setValue(next)",
              "meaning": "Queues the next state value; transition updates must not control text inputs."
            }
          ]
        },
        {
          "title": "Defer a value used for rendering",
          "language": "jsx",
          "code": "const deferredValue = useDeferredValue(value);\nconst element = <Results value={deferredValue} />;",
          "parts": [
            {
              "part": "deferredValue",
              "meaning": "A value that can lag behind the latest input during background rendering."
            },
            {
              "part": "useDeferredValue(value)",
              "meaning": "Defers a render value at the component or custom Hook top level without imposing a fixed delay."
            },
            {
              "part": "Results",
              "meaning": "The child component rendering results from the deferred value."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Connect fields and choose priorities",
          "points": [
            "Think of a label and input sharing a matching name tag on a page with several separate fields. useId gives them an ID, a unique text identifier, to share.",
            "Put that ID in the label's htmlFor and the input's id. Clicking the label then focuses its matching input, even with several copies.",
            "A transition is a state change that can wait behind urgent work. useTransition returns startTransition to mark updates this way and isPending to show waiting."
          ]
        },
        {
          "heading": "Keep recent content visible",
          "points": [
            "Keep input state urgent so each typed letter appears promptly. Put a slower results update inside startTransition; React can pause that work for more typing.",
            "A deferred value is a value allowed to lag behind its source. useDeferredValue keeps the old value visible while React prepares the new view.",
            "Choose useTransition when you control the state update, or useDeferredValue when you receive the changing value. Neither sets a fixed delay or makes slow code faster."
          ]
        }
      ],
      "terms": [
        {
          "term": "ID",
          "meaning": "An ID is a text identifier used to connect or distinguish elements."
        },
        {
          "term": "transition",
          "meaning": "A transition marks a state change as less urgent than work such as typing."
        },
        {
          "term": "deferred value",
          "meaning": "A deferred value may keep its previous value while React prepares a newer view."
        }
      ],
      "examples": [
        {
          "title": "Connect a label to its input",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useId } from \"react\";\nfunction App() {\n  const id = useId();\n  return (\n    <>\n      <label htmlFor={id}>Name</label>\n      <input id={id} defaultValue=\"Mira\" />\n    </>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useId to create a matching identifier.",
            "Step 2: Begin App, which contains the connected field.",
            "Step 3: Get the identifier for this useId call.",
            "Step 4: Start returning the connected elements.",
            "Step 5: Group the label and input without an extra element.",
            "Step 6: Set htmlFor to the shared identifier.",
            "Step 7: Give the input that same identifier and the starting value Mira.",
            "Step 8: Close the group.",
            "Step 9: Finish the return.",
            "Step 10: Finish App.",
            "Step 11: The screen shows Name beside an input containing Mira. The label and input share the same identifier."
          ],
          "output": "The label shows \"Name\". The input contains \"Mira\"."
        }
      ],
      "keyPoints": [
        "Use useId for related field identifiers.",
        "Use data identifiers for list keys.",
        "Transitions mark less urgent updates.",
        "Deferred values can keep old content visible.",
        "Keep controlled input updates urgent."
      ],
      "commonMistakes": [
        "Using useId to make list keys ignores the identity already stored in the data.",
        "Putting a controlled input's own state update in a transition can break responsive typing."
      ],
      "links": [
        {
          "title": "useTransition",
          "url": "https://react.dev/reference/react/useTransition",
          "kind": "article",
          "language": "English",
          "why": "Small examples show urgent input updates and less urgent content updates."
        }
      ]
    },
    {
      "topicId": "react-lifting-state",
      "summary": "Lifting state up puts a shared value in the nearest parent of the components that need it. That parent keeps the value consistent.",
      "explanation": [
        {
          "heading": "Keep one shared answer",
          "points": [
            "When two components need the same changing value, place it in their nearest common parent. That parent is the closest component containing both.",
            "Think of two people checking one kitchen notice board. One shared board avoids the different answers that two separately updated boards could show.",
            "Lifting state up means moving that shared state into the parent. Remove competing copies from the children so there is one place to update."
          ]
        },
        {
          "heading": "Send values and operations",
          "points": [
            "Pass the parent’s current value down through props. Each child reads that value instead of keeping another copy that might fall behind later.",
            "A callback prop is a function the parent passes for a child to call. The child calls it when a user wants a change.",
            "People say props go down and callbacks go up. More precisely, a child calls a supplied function, and that function changes the parent’s state."
          ]
        },
        {
          "heading": "Store less state",
          "points": [
            "Derived data means a value calculated from existing state or props. A selected item’s price and a basket total are often derived data.",
            "Store the user’s choice, then calculate its matching label or total while rendering. Never store another state value when you can calculate it directly.",
            "This avoids updating two values after every action. In the basket example, the notice board holds quantity, while the total follows from that quantity."
          ]
        },
        {
          "heading": "Avoid passing unnecessary props",
          "points": [
            "Prop drilling means passing a prop through intermediate components that do not use it. A few clear steps are often simple and perfectly reasonable.",
            "Composition means combining components by passing prepared content, often through children. A parent can prepare a component with its needed props before placing it.",
            "Context can carry a shared value to distant readers without each middle component forwarding it. Prefer clear props until the repeated forwarding becomes difficult."
          ]
        },
        {
          "heading": "Choose the owner carefully",
          "points": [
            "Move state only as high as its actual readers require. A local input draft can stay near its input until other components need it.",
            "Give callbacks names that describe an intention, such as onQuantityChange. This lets the parent decide the update while children focus on their own controls.",
            "In an interview, identify the shared value, its nearest common parent, and the callbacks that change it. Then explain which displayed values are calculated."
          ]
        }
      ],
      "terms": [
        {
          "term": "lifting state up",
          "meaning": "Lifting state up moves shared state to the nearest parent that contains its users."
        },
        {
          "term": "callback prop",
          "meaning": "A callback prop is a function supplied by a parent for a child to call."
        },
        {
          "term": "derived data",
          "meaning": "Derived data is a value calculated from existing state or props."
        },
        {
          "term": "prop drilling",
          "meaning": "Prop drilling passes values through components that do not use those values."
        },
        {
          "term": "composition",
          "meaning": "Composition combines components by supplying prepared content or children."
        }
      ],
      "examples": [
        {
          "title": "Two controls share one count",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Counter({ count, onAdd }) {\n  return <button onClick={onAdd}>Count: {count}</button>;\n}\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const add = () => setCount(c => c + 1);\n  return <><Counter count={count} onAdd={add} /><Counter count={count} onAdd={add} /></>;\n}",
          "walkthrough": [
            "Step 1: Keep the shared value in the parent rather than either control.",
            "Step 2: Receive the shared answer and the operation that changes its owner.",
            "Step 3: Call the parent’s operation instead of updating a separate local count.",
            "Step 4: Use the nearest common parent as the single state owner.",
            "Step 5: Keep one count for both children.",
            "Step 6: Provide one parent operation for either child to call.",
            "Step 7: Send the same count and operation to both controls.",
            "Step 8: Initially both buttons say \"Count: 0\". Click either button once: both say \"Count: 1\". Nothing is logged to the console."
          ],
          "output": "Initially both buttons say \"Count: 0\". Click either button once: both say \"Count: 1\". Nothing is logged to the console."
        },
        {
          "title": "Quantity and a calculated total",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Quantity({ value, onChange }) {\n  return <button onClick={() => onChange(value + 1)}>Quantity: {value}</button>;\n}\nfunction Total({ quantity, price }) {\n  return <p>Total: {quantity * price} coins</p>;\n}\nexport default function App() {\n  const [quantity, setQuantity] = useState(1);\n  return <><Quantity value={quantity} onChange={setQuantity} /><Total quantity={quantity} price={4} /></>;\n}",
          "walkthrough": [
            "Step 1: Keep the quantity shared by the controls and the total.",
            "Step 2: Receive quantity and a callback without owning another quantity state.",
            "Step 3: Send the requested next quantity to the parent.",
            "Step 4: Receive just the values needed to calculate the total.",
            "Step 5: Calculate during rendering instead of storing a second state value.",
            "Step 6: Own the state above both its readers.",
            "Step 7: Store only the changing quantity.",
            "Step 8: Connect the callback upward and pass the current quantity downward.",
            "Step 9: Initially the button says \"Quantity: 1\" and the message says \"Total: 4 coins\". After one click they say \"Quantity: 2\" and \"Total: 8 coins\". Nothing is logged to the console."
          ],
          "output": "Initially the button says \"Quantity: 1\" and the message says \"Total: 4 coins\". After one click they say \"Quantity: 2\" and \"Total: 8 coins\". Nothing is logged to the console."
        }
      ],
      "keyPoints": [
        "Put shared state in its nearest common parent.",
        "Pass values down and let children call parent callbacks.",
        "Keep one owner for each shared value.",
        "Calculate totals and other derived values instead of duplicating state.",
        "Use composition or context when prop forwarding becomes difficult."
      ],
      "commonMistakes": [
        "Keeping separate copies of shared state lets children show different answers.",
        "Storing a calculated total requires extra updates and can leave an outdated answer.",
        "Moving every value to the highest component makes local changes harder to manage."
      ],
      "links": [
        {
          "title": "Sharing State Between Components",
          "url": "https://react.dev/learn/sharing-state-between-components",
          "kind": "article",
          "language": "English",
          "why": "Shows how a parent coordinates two children through props and callbacks."
        }
      ]
    },
    {
      "topicId": "react-forms",
      "summary": "Forms collect user choices and handle submission. Controlled fields keep their current values in React state; uncontrolled fields keep them in browser elements.",
      "syntax": [
        {
          "title": "Control text and checkbox inputs",
          "language": "jsx",
          "code": "const [value, setValue] = useState('');\nconst [checked, setChecked] = useState(false);\nconst fields = <>\n  <input value={value} onChange={event => setValue(event.target.value)} />\n  <input type=\"checkbox\" checked={checked} onChange={event => setChecked(event.target.checked)} />\n</>;",
          "parts": [
            {
              "part": "[value, setValue]",
              "meaning": "The current text string and its setter, declared at the component top level."
            },
            {
              "part": "useState('')",
              "meaning": "Initializes controlled text with an empty string."
            },
            {
              "part": "[checked, setChecked]",
              "meaning": "The current checkbox boolean and its setter, declared at the component top level."
            },
            {
              "part": "useState(false)",
              "meaning": "Initializes the checkbox as unchecked."
            },
            {
              "part": "value={value}",
              "meaning": "Makes state control the text displayed by the input."
            },
            {
              "part": "event.target.value",
              "meaning": "The latest string, copied into state synchronously by onChange."
            },
            {
              "part": "checked={checked}",
              "meaning": "Makes boolean state control whether the checkbox is checked."
            },
            {
              "part": "event.target.checked",
              "meaning": "The latest checkbox boolean, copied into state synchronously by onChange."
            }
          ]
        },
        {
          "title": "Submit an uncontrolled input using a ref",
          "language": "jsx",
          "code": "const ref = useRef(null);\nfunction handleSubmit(event) {\n  event.preventDefault();\n  submit(ref.current.value);\n}\nconst form = (\n  <form onSubmit={handleSubmit}>\n    <input defaultValue={initial} ref={ref} /><button type=\"submit\">Submit</button>\n  </form>\n);",
          "parts": [
            {
              "part": "ref",
              "meaning": "The input node reference, created with useRef at the component top level."
            },
            {
              "part": "handleSubmit",
              "meaning": "The callback handling form submission."
            },
            {
              "part": "event.preventDefault()",
              "meaning": "Stops the default browser submission."
            },
            {
              "part": "submit",
              "meaning": "The application function receiving the submitted input text."
            },
            {
              "part": "ref.current.value",
              "meaning": "Reads the current DOM input value during submission."
            },
            {
              "part": "onSubmit={handleSubmit}",
              "meaning": "Connects the form to its submit handler."
            },
            {
              "part": "defaultValue={initial}",
              "meaning": "Sets the initial uncontrolled input text; later user edits live in the DOM."
            },
            {
              "part": "ref={ref}",
              "meaning": "Stores the mounted input node in the ref."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Choose who keeps the value",
          "points": [
            "A controlled input gets its current value from React state. Think of a clerk keeping the official form record while the visible field follows it.",
            "An uncontrolled input keeps its current value in the DOM, the browser’s page elements. Its defaultValue supplies a starting value rather than controlling later typing.",
            "For controlled text, pass value and update it immediately in onChange. Keep that value a string from the start, using an empty string when needed."
          ]
        },
        {
          "heading": "Handle different fields",
          "points": [
            "A checkbox uses checked and event.target.checked for its true-or-false choice. Using value instead does not control whether the checkbox is selected.",
            "A select uses value on the select element, with option values for choices. A textarea also uses value and onChange for controlled text.",
            "One state object can hold several related fields. Copy its previous fields before replacing one, so changing a name does not erase another choice."
          ]
        },
        {
          "heading": "Read and submit",
          "points": [
            "Handle onSubmit on the form so both button clicks and keyboard submission work. preventDefault stops the browser’s normal submission from navigating away.",
            "FormData collects named form fields and their current values. For uncontrolled fields, read it from the submitted form, or use a ref for one element.",
            "Give fields name attributes for FormData and labels for users. Unchecked checkboxes are absent from FormData, so treat a missing checkbox entry as false."
          ]
        },
        {
          "heading": "Check the answers",
          "points": [
            "Validation means checking whether entered values meet your rules. Show a clear error, such as Name is required, beside the form when a check fails.",
            "The clerk comparison matches controlled state: each edit updates the official record immediately. This makes live previews and linked fields easier to keep consistent.",
            "React 19 form actions let action receive a function with FormData. After that function succeeds, React resets uncontrolled fields to their starting values."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Choose controlled fields when typing must update a preview, another field, or a live error. State then gives those readers the same current answer.",
            "Choose uncontrolled fields when you mainly need values at submission. FormData often avoids keeping a separate state value for every simple text field.",
            "An interview rule is: use state when rendering needs the current value. Otherwise, start with named uncontrolled fields and read them when the form submits."
          ]
        }
      ],
      "terms": [
        {
          "term": "controlled input",
          "meaning": "A controlled input follows a current value supplied by React state."
        },
        {
          "term": "uncontrolled input",
          "meaning": "An uncontrolled input keeps its current value in the browser element."
        },
        {
          "term": "DOM",
          "meaning": "The DOM is the browser’s collection of page elements."
        },
        {
          "term": "FormData",
          "meaning": "FormData collects named form fields and their submitted values."
        },
        {
          "term": "validation",
          "meaning": "Validation checks whether entered values satisfy stated rules."
        },
        {
          "term": "form action",
          "meaning": "A form action is a function passed to action to handle submitted FormData."
        }
      ],
      "examples": [
        {
          "title": "Read an uncontrolled field",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [message, setMessage] = useState(\"Not submitted\");\n  function submit(event) {\n    event.preventDefault();\n    setMessage(\"Hello, \" + new FormData(event.currentTarget).get(\"name\"));\n  }\n  return <form onSubmit={submit}><label>Name <input name=\"name\" defaultValue=\"Guest\" /></label><button>Send</button><p>{message}</p></form>;\n}",
          "walkthrough": [
            "Step 1: Keep the submitted message in state while the browser owns the input’s current text.",
            "Step 2: Read the uncontrolled field only when the form submits.",
            "Step 3: Keep a result message without controlling each keystroke.",
            "Step 4: Handle submission at the form rather than only a button click.",
            "Step 5: Prevent navigation so the result can remain visible.",
            "Step 6: Read the named field’s current browser value and show it.",
            "Step 7: Provide an initial uncontrolled value and a named field for FormData.",
            "Step 8: Initially the field labeled \"Name\" contains \"Guest\", the button says \"Send\", and the message says \"Not submitted\". Replace Guest with Reader and submit: the message becomes \"Hello, Reader\". Nothing is logged to the console."
          ],
          "output": "Initially the field labeled \"Name\" contains \"Guest\", the button says \"Send\", and the message says \"Not submitted\". Replace Guest with Reader and submit: the message becomes \"Hello, Reader\". Nothing is logged to the console."
        },
        {
          "title": "Control and validate related fields",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [fields, setFields] = useState({ name: \"\", updates: false, size: \"Small\", note: \"\" });\n  const [message, setMessage] = useState(\"Ready\");\n  const change = (key, value) => setFields(previous => ({ ...previous, [key]: value }));\n  function submit(event) {\n    event.preventDefault();\n    setMessage(fields.name.trim() ? `Saved: ${fields.name.trim()}; ${fields.size}; updates: ${fields.updates ? \"yes\" : \"no\"}; note: ${fields.note || \"None\"}` : \"Name is required\");\n  }\n  return <form onSubmit={submit}>\n    <label>Name <input value={fields.name} onChange={e => change(\"name\", e.target.value)} /></label>\n    <label>Updates <input type=\"checkbox\" checked={fields.updates} onChange={e => change(\"updates\", e.target.checked)} /></label>\n    <label>Size <select value={fields.size} onChange={e => change(\"size\", e.target.value)}><option>Small</option><option>Large</option></select></label>\n    <label>Note <textarea value={fields.note} onChange={e => change(\"note\", e.target.value)} /></label>\n    <button>Save</button><p role=\"status\">{message}</p>\n  </form>;\n}",
          "walkthrough": [
            "Step 1: Keep related field values together for submission and validation.",
            "Step 2: Control text, checkbox, select, and textarea values from one state object.",
            "Step 3: Give every controlled field a defined starting value.",
            "Step 4: Keep validation and success feedback separate from the field values.",
            "Step 5: Copy the other fields before replacing the one that changed.",
            "Step 6: Check the collected values at submission time.",
            "Step 7: Keep submission on the current page.",
            "Step 8: Show a clear error for a blank name or a message containing the controlled values.",
            "Step 9: Let keyboard and button submission share the same validation.",
            "Step 10: Update the controlled text value immediately on edits.",
            "Step 11: Control the checkbox through checked rather than its text value.",
            "Step 12: Control the selected option through the select element.",
            "Step 13: Control the textarea through value instead of text between tags.",
            "Step 14: Show submission feedback in a status message.",
            "Step 15: Return the completed form with all fields using the same state owner.",
            "Step 16: Initially Name and Note are empty, Updates is unchecked, Size shows \"Small\", the button says \"Save\", and the message says \"Ready\". Submit empty: \"Name is required\" appears. Enter Reader, check Updates, select Large, enter Hello in Note, and submit: \"Saved: Reader; Large; updates: yes; note: Hello\" appears. Nothing is logged to the console."
          ],
          "output": "Initially Name and Note are empty, Updates is unchecked, Size shows \"Small\", the button says \"Save\", and the message says \"Ready\". Submit empty: \"Name is required\" appears. Enter Reader, check Updates, select Large, enter Hello in Note, and submit: \"Saved: Reader; Large; updates: yes; note: Hello\" appears. Nothing is logged to the console."
        }
      ],
      "keyPoints": [
        "Controlled text uses value and onChange; controlled checkboxes use checked.",
        "Uncontrolled fields can be read with FormData or a ref.",
        "Handle submission on the form and prevent navigation when needed.",
        "Copy a state object before changing one field.",
        "Choose controlled fields when rendering needs their current values.",
        "React 19 function actions receive FormData."
      ],
      "commonMistakes": [
        "Passing value without updating it in onChange prevents normal typing.",
        "Changing a controlled text value from undefined to a string changes its control mode.",
        "Reading checkbox value instead of checked loses its selected state.",
        "Forgetting name attributes leaves fields out of FormData."
      ],
      "links": [
        {
          "title": "Reacting to Input with State",
          "url": "https://react.dev/learn/reacting-to-input-with-state",
          "kind": "article",
          "language": "English",
          "why": "Walks through form states, submission, and visible feedback."
        }
      ]
    },
    {
      "topicId": "react-data-fetching",
      "summary": "Data fetching brings information into a component after rendering. Track progress, failure, and results, and prevent outdated work from replacing newer answers.",
      "syntax": [
        {
          "title": "Fetch with state and stale-result cleanup",
          "language": "jsx",
          "code": "const [loading, setLoading] = useState(false), [error, setError] = useState(null), [data, setData] = useState(null);\nuseEffect(() => {\n  let cancelled = false;\n  setLoading(true); setError(null); setData(null);\n  fetch(url).then(response => { if (!response.ok) throw new Error(String(response.status)); return response.json(); })\n    .then(result => { if (!cancelled) setData(result); })\n    .catch(error => { if (!cancelled) setError(error); })\n    .finally(() => { if (!cancelled) setLoading(false); });\n  return () => { cancelled = true; };\n}, [url]);",
          "parts": [
            {
              "part": "[loading, setLoading]",
              "meaning": "The request status and its setter, declared at the component or custom Hook top level."
            },
            {
              "part": "[error, setError]",
              "meaning": "The request error and its setter, initially null."
            },
            {
              "part": "[data, setData]",
              "meaning": "The parsed response data and its setter, initially null."
            },
            {
              "part": "useEffect",
              "meaning": "Runs client-side fetching after commit, rerunning when its URL dependency changes."
            },
            {
              "part": "cancelled",
              "meaning": "A per-effect flag that prevents obsolete requests from updating state; it does not stop network activity."
            },
            {
              "part": "fetch(url)",
              "meaning": "Requests the resource at url; non-success HTTP responses are explicitly turned into errors before parsing JSON."
            },
            {
              "part": "if (!cancelled)",
              "meaning": "Guards data, error and loading updates against results from a cleaned-up effect."
            },
            {
              "part": "return () => { cancelled = true; }",
              "meaning": "Marks this request obsolete before the next setup or when unmounting."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Plan the waiting time",
          "points": [
            "Fetching means asking an outside source for data. Think of ordering a meal: you need different messages while waiting, after failure, and after success.",
            "Keep loading, error, and data as three pieces of state. Loading says work is pending, error explains failure, and data holds the successful answer.",
            "Choose what to show for each state before writing the request, including how the user can recover after failure. An empty successful list should have a helpful message rather than look like loading that never finishes.",
            "The examples use timers instead of outside requests. Their waiting and cleanup behavior still shows why a result must belong to the current selection."
          ]
        },
        {
          "heading": "Start work in an effect",
          "points": [
            "A Promise is an object representing a future result or failure. fetch returns one; response.json also returns a Promise, so wait for the data before trying to display its fields.",
            "Inside an effect, define an async function, which can wait with await. Call that function; do not make the effect callback itself async.",
            "Start by setting loading true and clearing the previous error. Check response.ok: HTTP, the web’s request-and-response rules, allows error responses that do not automatically make fetch fail.",
            "On success, save the data; on failure, save a readable error. Finish loading only if that effect’s work still belongs to the current request."
          ]
        },
        {
          "heading": "Stop outdated work",
          "points": [
            "AbortController is a browser object that can signal cancellation. Create one per effect, pass its signal to fetch, and call abort during cleanup.",
            "Cleanup runs before the effect starts again with changed dependencies and when the component is removed. This is where the earlier request loses ownership.",
            "An aborted fetch usually fails with an AbortError. Treat that cancellation as expected cleanup rather than showing the user a failed-request message.",
            "Also guard state updates with an ignore flag or request identity when needed. Cancellation cannot undo every later calculation or separately started asynchronous task."
          ]
        },
        {
          "heading": "Prevent responses arriving out of order",
          "points": [
            "A race condition means timing changes which result wins. An older slow request can finish after a newer fast request and overwrite its answer.",
            "Imagine changing a meal order before the first dish arrives. The screen must show the latest order, even if an earlier dish arrives later.",
            "Give each effect its own ignore flag, initially false. Cleanup changes that flag to true, and completed work checks it before changing any state.",
            "Guard error and loading changes as well as data changes whenever work can continue after cleanup has run. Otherwise an old failure could hide a newer success or end its loading message early while its request is still pending."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Use a plain effect for a small isolated browser request when you can handle cleanup and all visible states clearly. Keep the dependency list complete.",
            "Choose a data-fetching library when many screens reuse remote data. Remote data means values owned outside your page that may change independently of local state.",
            "A library such as TanStack Query adds caching, retries, and deduplication: remembering results, trying failed work again, and sharing duplicate requests. Configure these behaviors deliberately.",
            "An interview rule is: use an effect for a simple isolated need, and shared data tools for repeated needs. Prefer existing framework loading tools when available."
          ]
        },
        {
          "heading": "Know the wider choices",
          "points": [
            "A fetch waterfall means requests wait for earlier components to finish before starting. Load independent data together when possible instead of nesting those waits.",
            "React 19 use reads a stable Promise during rendering; Suspense shows waiting content, and an error boundary handles rejection. Suspense coordinates waiting screens.",
            "An error boundary is a component that shows fallback content after supported rendering failures. Use needs supported stable Promises, not a new Promise every render.",
            "In the final example, cleanup cancels the earlier timer to fix the race. For real requests, combine suitable cancellation with guards around remaining asynchronous work."
          ]
        }
      ],
      "terms": [
        {
          "term": "Promise",
          "meaning": "A Promise represents a result or failure that may arrive later."
        },
        {
          "term": "AbortController",
          "meaning": "AbortController sends a cancellation signal to work such as fetch."
        },
        {
          "term": "race condition",
          "meaning": "A race condition lets completion timing decide which competing result wins."
        },
        {
          "term": "deduplication",
          "meaning": "Deduplication shares identical pending work instead of starting duplicate requests."
        },
        {
          "term": "Suspense",
          "meaning": "Suspense shows waiting content while supported rendering work is pending."
        },
        {
          "term": "error boundary",
          "meaning": "An error boundary shows fallback content after a supported rendering failure."
        }
      ],
      "examples": [
        {
          "title": "Show loading before a result",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const timer = setTimeout(() => setData(\"Pear\"), 40);\n    return () => clearTimeout(timer);\n  }, []);\n  return <p>{data === null ? \"Loading...\" : `Fruit: ${data}`}</p>;\n}",
          "walkthrough": [
            "Step 1: Use an effect to start delayed work and state to show its result.",
            "Step 2: Keep a small waiting screen and its completed answer together.",
            "Step 3: Use null to represent a result that has not arrived.",
            "Step 4: Start the delayed work after rendering.",
            "Step 5: Deliver a fixed result after a short wait without using the network.",
            "Step 6: Cancel pending work when this effect is cleaned up.",
            "Step 7: Start this work for the component without changing request inputs.",
            "Step 8: Show waiting text until the fixed result arrives.",
            "Step 9: Initially the message says \"Loading...\". After the timer finishes it says \"Fruit: Pear\". Nothing is logged to the console."
          ],
          "output": "Initially the message says \"Loading...\". After the timer finishes it says \"Fruit: Pear\". Nothing is logged to the console."
        },
        {
          "title": "Loading, failure, and success",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [choice, setChoice] = useState(\"Pear\");\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(\"\");\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    setLoading(true); setError(\"\"); setData(null);\n    const timer = setTimeout(() => {\n      if (choice === \"Fail\") setError(\"Could not load fruit\");\n      else setData(choice);\n      setLoading(false);\n    }, 40);\n    return () => clearTimeout(timer);\n  }, [choice]);\n  return <><button onClick={() => setChoice(\"Fail\")}>Fail</button><button onClick={() => setChoice(\"Plum\")}>Load Plum</button><p>{loading ? \"Loading...\" : error || `Fruit: ${data}`}</p></>;\n}",
          "walkthrough": [
            "Step 1: Use an effect for delayed work and separate state for its visible outcomes.",
            "Step 2: Let a choice control whether the simulated request succeeds or fails.",
            "Step 3: Keep the current request input.",
            "Step 4: Track pending work explicitly.",
            "Step 5: Keep a readable failure message separately from successful data.",
            "Step 6: Keep the successful answer when one is available.",
            "Step 7: Start a new simulated request whenever its input changes.",
            "Step 8: Clear the previous outcome before waiting for this request.",
            "Step 9: Delay completion so loading has a visible state.",
            "Step 10: Simulate a failed request with a readable message.",
            "Step 11: Save the requested answer on the success path.",
            "Step 12: End waiting after this timer’s outcome is known.",
            "Step 13: Use a short fixed wait for either outcome.",
            "Step 14: Cancel an earlier pending timer before it can overwrite a newer result.",
            "Step 15: Repeat the effect when the chosen request input changes.",
            "Step 16: Show pending, failure, or success while providing controls for both outcomes.",
            "Step 17: The buttons say \"Fail\" and \"Load Plum\". Initially the message says \"Loading...\", then \"Fruit: Pear\". Click Fail: it shows \"Loading...\", then \"Could not load fruit\". Click Load Plum: it shows \"Loading...\", then \"Fruit: Plum\". Nothing is logged to the console."
          ],
          "output": "The buttons say \"Fail\" and \"Load Plum\". Initially the message says \"Loading...\", then \"Fruit: Pear\". Click Fail: it shows \"Loading...\", then \"Could not load fruit\". Click Load Plum: it shows \"Loading...\", then \"Fruit: Plum\". Nothing is logged to the console."
        },
        {
          "title": "Fix an older result overwriting a newer one",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [choice, setChoice] = useState(\"Slow\");\n  const [broken, setBroken] = useState(\"Loading...\");\n  const [fixed, setFixed] = useState(\"Loading...\");\n  useEffect(() => {\n    setTimeout(() => setBroken(choice), choice === \"Slow\" ? 200 : 20);\n  }, [choice]);\n  useEffect(() => {\n    const timer = setTimeout(() => setFixed(choice), choice === \"Slow\" ? 200 : 20);\n    return () => clearTimeout(timer);\n  }, [choice]);\n  return <><button onClick={() => setChoice(\"Fast\")}>Load Fast</button><p>Broken: {broken}</p><p>Fixed: {fixed}</p></>;\n}",
          "walkthrough": [
            "Step 1: Use two effects to compare missing cleanup with a cancellation fix.",
            "Step 2: Display the broken result and fixed result for the same changing request.",
            "Step 3: Start with an earlier request that takes longer to finish.",
            "Step 4: Keep the result from the effect that intentionally lacks cleanup.",
            "Step 5: Keep the result from the effect that cancels outdated work.",
            "Step 6: Demonstrate the race in an intentionally incorrect effect.",
            "Step 7: Leave the slow timer active so it can overwrite a later fast result.",
            "Step 8: Start another unprotected timer when the selection changes.",
            "Step 9: Repeat the same delayed work with cleanup added.",
            "Step 10: Keep the timer identifier so cleanup can cancel this particular request.",
            "Step 11: Fix the race by stopping the earlier timer when a newer request starts.",
            "Step 12: Tie the fixed request to the same selection as the broken request.",
            "Step 13: Show both answers so an outdated overwrite can be compared with the fix.",
            "Step 14: Initially: \"Load Fast\", \"Broken: Loading...\", and \"Fixed: Loading...\". Click Load Fast before 200 milliseconds pass. After the fast timer finishes, both results say \"Fast\". After the original slow timer finishes, the messages say \"Broken: Slow\" and \"Fixed: Fast\". Nothing is logged to the console."
          ],
          "output": "Initially: \"Load Fast\", \"Broken: Loading...\", and \"Fixed: Loading...\". Click Load Fast before 200 milliseconds pass. After the fast timer finishes, both results say \"Fast\". After the original slow timer finishes, the messages say \"Broken: Slow\" and \"Fixed: Fast\". Nothing is logged to the console."
        }
      ],
      "keyPoints": [
        "Plan loading, error, and successful data states.",
        "Check response.ok because fetch does not reject solely for an HTTP error status.",
        "Cleanup must stop or ignore outdated work.",
        "Guard loading and error changes as well as data changes.",
        "Use AbortController to cancel fetch and handle cancellation quietly.",
        "Prefer shared fetching tools when caching and repeated requests become complex."
      ],
      "commonMistakes": [
        "Making the effect callback async returns a Promise instead of a cleanup function.",
        "Letting an old response update state can replace a newer answer.",
        "Treating cancellation as an ordinary failure shows unnecessary error messages.",
        "Ignoring response.ok can treat an HTTP error response as success."
      ],
      "links": [
        {
          "title": "You Might Not Need an Effect",
          "url": "https://react.dev/learn/you-might-not-need-an-effect",
          "kind": "article",
          "language": "English",
          "why": "Has a section on fetching data and on the race condition."
        }
      ]
    },
    {
      "topicId": "react-state-location",
      "summary": "Keep each value close to the components that need it. Move it farther out only when sharing, navigation, or outside data requires that.",
      "explanation": [
        {
          "heading": "Start near the user action",
          "points": [
            "Local state means state owned by one component rather than shared across a whole screen. Think of a private notebook beside one person's desk.",
            "Keep a menu's open flag beside its button when nobody else needs it. This makes changes easier to follow because the owner and the action stay together.",
            "Ownership means deciding which component controls a value and changes it. Give each fact one owner, so two separate copies cannot quietly disagree after different actions.",
            "Form state includes unfinished field values, touched fields, and messages explaining invalid input. Keep it inside the form unless another screen truly needs the unfinished work."
          ]
        },
        {
          "heading": "Share with the nearest parent",
          "points": [
            "Lifting state up means moving a shared value into the closest parent of its readers. The parent becomes the notebook that nearby desks can share.",
            "Siblings are components under the same parent. When a filter and a results list need one selection, their shared parent owns that selection and passes it down.",
            "Pass the current value to readers and a change function to controls. This keeps one clear path from an action to the next displayed result.",
            "A derived value is an answer calculated from existing information, such as a filtered list. Calculate it while rendering instead of keeping another state variable synchronized."
          ]
        },
        {
          "heading": "Reach distant readers carefully",
          "points": [
            "Context carries a value to components far below its provider, the component supplying that value. It avoids passing the same information through many uninterested components.",
            "Use context first for widely needed values that change rarely, such as a display preference. Context can change often, but each changed value can make its readers render again.",
            "An external store keeps shared state outside individual components and lets readers follow selected information. Consider Redux Toolkit or Zustand when large shared client state has many readers.",
            "Client state is information controlled by the browser interface, such as an unfinished comparison list. A store adds structure, but a small screen rarely needs that extra machinery."
          ]
        },
        {
          "heading": "Separate outside data and addresses",
          "points": [
            "Server data belongs to another system and can change without a local click. A data-fetching library such as TanStack Query manages reading, keeping, and refreshing it.",
            "A cache is a saved copy for later use. Treat cached job listings as server data, rather than manually copying them into several unrelated component state variables.",
            "The URL is the page address, including shareable choices such as a search phrase or page number. Reading those choices from it makes copied addresses useful.",
            "Keep temporary form typing local until sharing or submission requires something else. Never put passwords or private draft details into an address that someone might copy."
          ]
        },
        {
          "heading": "A job board decision",
          "points": [
            "Start a job board with the search field and results under one owner. Keep an application message inside its form because other panels do not need each keystroke.",
            "Move the submitted search phrase into the URL when users should bookmark results. Derive the visible result count from the displayed jobs instead of storing a separate count.",
            "Put a rarely changed display preference in context when distant panels need it. Let a data-fetching library manage job records and refreshes from the server.",
            "Consider an external store only when saved comparisons or other shared client workflows become difficult to coordinate. The notebook comparison still applies: share each fact only as widely as necessary."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Ask who reads this value and who changes it. Start locally, then lift it to the nearest shared parent when two nearby components must stay together.",
            "Ask whether distant readers need a rarely changed setting or many independently changing facts. Choose context for the setting and consider a store for complex shared facts.",
            "Ask whether the value comes from a server or should survive a copied address. Choose a data-fetching library for server records and the URL for shareable navigation choices.",
            "Ask whether this is unfinished form work or something you can calculate. My interview rule is: keep one owner, derive answers, and expand sharing only when needed."
          ]
        }
      ],
      "terms": [
        {
          "term": "local state",
          "meaning": "Local state belongs to one component."
        },
        {
          "term": "ownership",
          "meaning": "Ownership identifies the component or system responsible for a value."
        },
        {
          "term": "context",
          "meaning": "Context carries a provided value to readers deeper in the component tree."
        },
        {
          "term": "external store",
          "meaning": "An external store keeps shared information outside individual components."
        },
        {
          "term": "derived value",
          "meaning": "A derived value can be calculated from information already available."
        },
        {
          "term": "cache",
          "meaning": "A cache saves a copy for later use."
        }
      ],
      "examples": [
        {
          "title": "Keep a toggle local",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [open, setOpen] = useState(false);\n  return <button onClick={() => setOpen(!open)}>{open ? \"Close filters\" : \"Open filters\"}</button>;\n}",
          "walkthrough": [
            "Step 1: Bring in the state hook for the local flag.",
            "Step 2: Keep the toggle and its state owner together.",
            "Step 3: Own the flag here because only this control needs it.",
            "Step 4: Change and display the same local flag.",
            "Step 5: Initially the button says \"Open filters\". After one click it says \"Close filters\". Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Open filters\". After one click it says \"Close filters\". Nothing is printed to the console."
        },
        {
          "title": "One filter for two siblings",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Filters({ remote, onToggle }) {\n  return <button onClick={onToggle}>{remote ? \"Show all\" : \"Remote only\"}</button>;\n}\nfunction Results({ jobs }) {\n  return <p>Jobs: {jobs.join(\", \")}</p>;\n}\nexport default function App() {\n  const [remote, setRemote] = useState(false);\n  const jobs = [{ title: \"UI\", remote: true }, { title: \"API\", remote: false }];\n  const visible = jobs.filter(job => !remote || job.remote).map(job => job.title);\n  return <><Filters remote={remote} onToggle={() => setRemote(value => !value)} /><Results jobs={visible} /></>;\n}",
          "walkthrough": [
            "Step 1: Bring in the shared owner's state hook.",
            "Step 2: Receive the selection and change function from the owner.",
            "Step 3: Let this sibling change the parent's selection.",
            "Step 4: Receive already filtered records rather than another selection copy.",
            "Step 5: Show the other sibling's view of the shared choice.",
            "Step 6: Own the selection above both siblings.",
            "Step 7: Keep the only stored selection here.",
            "Step 8: Use fixed job records to focus on ownership.",
            "Step 9: Derive the displayed titles instead of storing them.",
            "Step 10: Connect both siblings to one decision.",
            "Step 11: Initially the button says \"Remote only\" and the paragraph says \"Jobs: UI, API\". After one click they say \"Show all\" and \"Jobs: UI\". Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Remote only\" and the paragraph says \"Jobs: UI, API\". After one click they say \"Show all\" and \"Jobs: UI\". Nothing is printed to the console."
        },
        {
          "title": "Bug: two owners; fix: one owner",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [left, setLeft] = useState(false);\n  const [right] = useState(false);\n  const [shared, setShared] = useState(false);\n  return <>\n    <button onClick={() => setLeft(!left)}>Bug toggle</button>\n    <p>Bug: {String(left)} / {String(right)}</p>\n    <button onClick={() => setShared(!shared)}>Fixed toggle</button>\n    <p>Fixed: {String(shared)} / {String(shared)}</p>\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for the broken copies and the shared replacement.",
            "Step 2: Compare duplicated ownership with shared ownership.",
            "Step 3: Keep the first broken copy.",
            "Step 4: Keep a second copy that does not follow the first.",
            "Step 5: Create one owner for the fixed pair.",
            "Step 6: Display the bug beside its fix.",
            "Step 7: Change only the first broken copy.",
            "Step 8: Expose how the two copies disagree.",
            "Step 9: Change the single shared value.",
            "Step 10: Read the same owner twice so both views agree.",
            "Step 11: Finish both comparisons within the same returned group.",
            "Step 12: Initially the paragraphs say \"Bug: false / false\" and \"Fixed: false / false\". Click \"Bug toggle\": the first becomes \"Bug: true / false\". Click \"Fixed toggle\": the second becomes \"Fixed: true / true\". Nothing is printed to the console."
          ],
          "output": "Initially the paragraphs say \"Bug: false / false\" and \"Fixed: false / false\". Click \"Bug toggle\": the first becomes \"Bug: true / false\". Click \"Fixed toggle\": the second becomes \"Fixed: true / true\". Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Start with local state and widen ownership only when needed.",
        "Lift shared state to the nearest common parent.",
        "Use context for distant shared settings and consider stores for complex shared client state.",
        "Use a data-fetching library for server data and the URL for shareable choices.",
        "Keep form drafts nearby and calculate derived values."
      ],
      "commonMistakes": [
        "Keeping separate copies of one shared selection allows them to disagree.",
        "Putting every keystroke into a broad context can make unrelated readers render again.",
        "Storing filtered results or counts duplicates information you already have."
      ],
      "links": [
        {
          "title": "Sharing State Between Components",
          "url": "https://react.dev/learn/sharing-state-between-components",
          "kind": "article",
          "language": "English",
          "why": "Shows how two nearby controls can share one state owner."
        }
      ]
    },
    {
      "topicId": "react-stale-closures",
      "summary": "A delayed function can read values from an older render. Choose a fix based on whether you need an earlier snapshot or the latest value.",
      "explanation": [
        {
          "heading": "A function keeps its earlier view",
          "points": [
            "A closure is a function together with access to the variables around where it was created. In a component, that includes values from a particular render.",
            "Think of a timer carrying a photograph of a notice board. Changing the real board later does not change the words already captured in that photograph.",
            "A snapshot is the set of values seen during one render. Setting state causes another render, but it does not rewrite variables inside functions created earlier.",
            "A stale closure reads an earlier value when your behavior needs a newer one. Earlier values are sometimes intentional, such as remembering which message someone originally chose to send."
          ]
        },
        {
          "heading": "Recognize the delayed mismatch",
          "points": [
            "A callback is a function saved for another piece of code to call later. Timers and outside event listeners can keep callbacks after their creating render has finished.",
            "An ordinary click handler normally comes from the latest committed screen. However, a timeout started inside that handler still keeps the values from when the click happened.",
            "Watch for a count that stops at one, a timer printing zero forever, or a delayed message showing an earlier selection. These patterns suggest an old photograph survived.",
            "Compare the visible value with what the delayed function reads. Check where that function was created, what values it uses, and when anything replaces or removes it."
          ]
        },
        {
          "heading": "Why the classic interval fails",
          "points": [
            "An effect connects your component to something outside rendering, such as a repeating timer. Its dependency list names changing values that should make that connection run again.",
            "An interval repeats a callback after a chosen delay. If an effect starts one with an empty dependency list, its callback keeps the first render's captured values.",
            "With count starting at zero, console.log(count) inside that interval keeps printing zero. Even when a separate button increases the displayed count, the saved callback still reads zero.",
            "Using setCount(count + 1) inside that same callback repeatedly sets one. The addition uses the captured zero each time, so the count does not keep growing."
          ]
        },
        {
          "heading": "Choose updates or dependencies",
          "points": [
            "A functional update passes a function to the state setter instead of a finished value. React supplies the pending state, so setCount(current => current + 1) keeps increasing.",
            "This fix works when the next value only needs the previous value of that state. It does not magically refresh every other variable that the callback reads.",
            "Include each changing value read by an effect in its dependency list. When count changes, an effect depending on count stops its old interval and starts a fresh one.",
            "Cleanup is the function returned by an effect to stop its earlier work. Clear each old interval there, so refreshing the connection does not leave multiple timers running."
          ]
        },
        {
          "heading": "Read the latest value deliberately",
          "points": [
            "A ref is a stable container whose current field you can change without causing a render. It can hold the newest value for a callback that stays installed.",
            "Update that field in an effect when the value changes, or in the event that changes it when timing requires. Avoid writing or reading refs during rendering for this pattern.",
            "Let the timer read latest.current when it runs, rather than the original count variable. Unlike the photograph, the container points to information you deliberately keep current.",
            "Use state for visible values because changing a ref does not refresh the screen. A latest-value ref is for a delayed reader, not another independent source of displayed truth."
          ]
        },
        {
          "heading": "Find the smallest honest fix",
          "points": [
            "A missing dependency often makes a connection follow an old selection. Add the selection and keep cleanup correct before reaching for a more complicated latest-value workaround.",
            "Use functional updates for increments, proper dependencies for changing connections, and a ref when a stable delayed reader needs current information. Each fixes a different need.",
            "Keep dependency warnings enabled rather than silencing them to force an effect to run once. Such warnings reveal that the callback and its changing inputs may disagree.",
            "Check both the immediate click and the delayed result when investigating this bug. The visible count can be correct while an older timer quietly continues reading an earlier snapshot."
          ]
        }
      ],
      "terms": [
        {
          "term": "closure",
          "meaning": "A closure lets a function access variables from where it was created."
        },
        {
          "term": "snapshot",
          "meaning": "A snapshot is the set of values seen during one render."
        },
        {
          "term": "stale closure",
          "meaning": "A stale closure reads an older value when newer information is needed."
        },
        {
          "term": "callback",
          "meaning": "A callback is a function passed elsewhere to be called later."
        },
        {
          "term": "functional update",
          "meaning": "A functional update calculates next state from the pending state supplied by React."
        },
        {
          "term": "cleanup",
          "meaning": "Cleanup stops work started by an earlier effect."
        }
      ],
      "examples": [
        {
          "title": "An earlier click snapshot",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const [seen, setSeen] = useState(\"waiting\");\n  return <>\n    <button onClick={() => setTimeout(() => setSeen(String(count)), 500)}>Capture</button>\n    <button onClick={() => setCount(value => value + 1)}>Add</button>\n    <p>Now: {count}; captured: {seen}</p>\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for the visible count and delayed report.",
            "Step 2: Keep the delayed reader beside its changing source.",
            "Step 3: Start the value captured by the timer at zero.",
            "Step 4: Keep the delayed report visible.",
            "Step 5: Group the two actions and their report.",
            "Step 6: Save this render's count for a report after 500 milliseconds.",
            "Step 7: Change current state without replacing the saved timer callback.",
            "Step 8: Compare current state with the timer's earlier view.",
            "Step 9: Finish the returned group.",
            "Step 10: Buttons say \"Capture\" and \"Add\". Initially the paragraph says \"Now: 0; captured: waiting\". Click \"Capture\", then click \"Add\" before 500 milliseconds. After the timer runs, it says \"Now: 1; captured: 0\". Nothing is printed to the console."
          ],
          "output": "Buttons say \"Capture\" and \"Add\". Initially the paragraph says \"Now: 0; captured: waiting\". Click \"Capture\", then click \"Add\" before 500 milliseconds. After the timer runs, it says \"Now: 1; captured: 0\". Nothing is printed to the console."
        },
        {
          "title": "A stable timer reads a latest-value ref",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useRef, useState } from \"react\";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const [seen, setSeen] = useState(\"waiting\");\n  const latest = useRef(count);\n  useEffect(() => { latest.current = count; }, [count]);\n  useEffect(() => {\n    const id = setTimeout(() => setSeen(String(latest.current)), 500);\n    return () => clearTimeout(id);\n  }, []);\n  return <><button onClick={() => setCount(value => value + 1)}>Add</button><p>Now: {count}; latest: {seen}</p></>;\n}",
          "walkthrough": [
            "Step 1: Bring in effects and a ref for the delayed reader.",
            "Step 2: Keep a latest-value container next to the displayed state.",
            "Step 3: Track the currently displayed count.",
            "Step 4: Track the timer's report.",
            "Step 5: Keep one container across renders, initially holding zero.",
            "Step 6: Refresh the container after each committed count change.",
            "Step 7: Install one short timer for this mounted component.",
            "Step 8: Read the container when the timer runs, rather than capturing count.",
            "Step 9: Cancel pending work when the component leaves the screen.",
            "Step 10: Keep the timer independent of count changes.",
            "Step 11: Change state while keeping the timer callback installed.",
            "Step 12: Initially the button says \"Add\" and the paragraph says \"Now: 0; latest: waiting\". Click \"Add\" before 500 milliseconds and allow its effect to run. After the timer runs, the paragraph says \"Now: 1; latest: 1\". Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Add\" and the paragraph says \"Now: 0; latest: waiting\". Click \"Add\" before 500 milliseconds and allow its effect to run. After the timer runs, the paragraph says \"Now: 1; latest: 1\". Nothing is printed to the console."
        },
        {
          "title": "Bug: captured increment; fix: pending state",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [bug, setBug] = useState(0);\n  const [fixed, setFixed] = useState(0);\n  useEffect(() => {\n    const a = setInterval(() => setBug(bug + 1), 500);\n    const b = setInterval(() => setFixed(current => current + 1), 500);\n    return () => { clearInterval(a); clearInterval(b); };\n  }, []); // Intentional bug: the first interval captures bug.\n  return <p>Bug: {bug}; fixed: {fixed}</p>;\n}",
          "walkthrough": [
            "Step 1: Bring in effects for two repeating timers.",
            "Step 2: Compare captured state with a functional update.",
            "Step 3: Start the broken counter at zero.",
            "Step 4: Start the corrected counter at zero.",
            "Step 5: Start both intervals from the first render.",
            "Step 6: Intentionally capture zero, so every tick sets one.",
            "Step 7: Use pending state so every tick adds another one.",
            "Step 8: Stop both intervals when their owner is removed.",
            "Step 9: Leave the first callback stale to demonstrate the problem.",
            "Step 10: Display the different results of the two update styles.",
            "Step 11: Initially the paragraph says \"Bug: 0; fixed: 0\". After one timer tick it says \"Bug: 1; fixed: 1\". After two ticks it says \"Bug: 1; fixed: 2\". Nothing is printed to the console."
          ],
          "output": "Initially the paragraph says \"Bug: 0; fixed: 0\". After one timer tick it says \"Bug: 1; fixed: 1\". After two ticks it says \"Bug: 1; fixed: 2\". Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Each render creates functions that can remember that render's values.",
        "A delayed callback does not automatically receive newer state.",
        "Functional updates read pending state for the state being updated.",
        "Effect dependencies must match the changing values the effect reads.",
        "Use cleanup to stop old timers and a latest-value ref only when needed."
      ],
      "commonMistakes": [
        "Assuming an empty dependency list makes a timer read current state creates stale reads.",
        "Using a functional update does not refresh other captured variables.",
        "Suppressing dependency warnings can hide a connection to an old selection.",
        "Changing a ref alone does not change displayed text."
      ],
      "links": [
        {
          "title": "State as a Snapshot",
          "url": "https://react.dev/learn/state-as-a-snapshot",
          "kind": "article",
          "language": "English",
          "why": "Uses delayed actions to explain why earlier handlers keep earlier values."
        }
      ]
    },
    {
      "topicId": "react-reconciliation",
      "summary": "React compares descriptions of the screen before changing browser elements. Types, positions, and keys help it decide which existing elements and state to keep.",
      "explanation": [
        {
          "heading": "Describe before changing",
          "points": [
            "The virtual DOM is a lightweight description of what the screen should contain. DOM means the browser's tree of real elements, such as buttons and input fields.",
            "Think of a seating plan compared with the actual chairs in a room. Updating the plan does not mean replacing every chair whenever one guest moves.",
            "JSX creates descriptions rather than directly editing browser elements. React uses those descriptions to decide what changed and which existing parts of the screen can stay.",
            "Reconciliation is React's process of matching an earlier screen description with a newer one. It helps React preserve useful existing work while making the screen match the latest result."
          ]
        },
        {
          "heading": "Render first, commit second",
          "points": [
            "The render phase is when React calls components to find their next descriptions. A state change can start this work, including calls to components nested below the owner.",
            "The commit phase is when React applies needed changes to real browser elements. Rendering a component again does not mean every element it returns changes in the browser.",
            "If a paragraph still has the same text, React can leave that text alone. If only its number changes, React can update the number while preserving the element.",
            "Keep rendering pure, meaning it does not change outside values or perform visible actions. React can repeat or abandon render work before any matching commit happens."
          ]
        },
        {
          "heading": "Type and position preserve identity",
          "points": [
            "Identity means which existing component React considers to be the same continuing component. By default, React uses its type and place under its parent to make that match.",
            "The component tree is the nested arrangement of components and elements. State belongs to a position in that tree, rather than to a variable name or JSX spelling.",
            "The same component type in the same position normally keeps its state. Giving it different props changes its inputs without automatically making it a new component.",
            "A different type in that position replaces the previous part and resets state below it. Switching from an input to a paragraph therefore removes the input and its browser-held value."
          ]
        },
        {
          "heading": "Keys name siblings across changes",
          "points": [
            "A key is a stable label that helps React match children under the same parent. Use an item's lasting identifier when rendering a list that can change order.",
            "Keys let React follow an item when it moves, rather than treating the new first item as the old first item. The seating plan now tracks names instead of chair numbers.",
            "Keys only need to be unique among siblings, not across the whole screen. React uses them for matching and does not pass key through as an ordinary prop.",
            "Keep the key stable for the same item between renders. A new random key every time makes React treat the item as new and throw away its earlier state."
          ]
        },
        {
          "heading": "Why index keys mix up inputs",
          "points": [
            "An index key uses an item's current array position as its label. That position can belong to a different item after sorting, inserting, or removing list entries.",
            "An uncontrolled input keeps its current typed value in the browser rather than React state. Its defaultValue supplies an initial value and does not control later typing.",
            "Suppose someone edits the first row, then removes that row with index keys. React can reuse its input for the next record, leaving the old typed text beside a different label.",
            "Use the record's identifier as its key so its input follows that record. For a permanently fixed list, index keys may work, but stable identifiers remain clearer when available."
          ]
        },
        {
          "heading": "Reset deliberately with a new key",
          "points": [
            "Changing a key tells React that a component should have a new identity. React discards the old component's state and creates fresh state for the replacement at that location.",
            "Use this when switching between separate drafts that should start fresh, such as a message editor for another recipient. Changing a key resets everything below that keyed component too.",
            "Define component functions outside their parent functions so their types stay stable. Creating a new component function during every parent render can accidentally replace its subtree and erase input.",
            "In an interview, describe matching through type, position, and key before discussing browser updates. The plan comparison explains why preserving identity matters more than counting newly created JSX descriptions."
          ]
        }
      ],
      "terms": [
        {
          "term": "virtual DOM",
          "meaning": "The virtual DOM is a lightweight description of the desired screen."
        },
        {
          "term": "DOM",
          "meaning": "The DOM is the browser's tree of real page elements."
        },
        {
          "term": "reconciliation",
          "meaning": "Reconciliation matches an earlier screen description with a newer description."
        },
        {
          "term": "render phase",
          "meaning": "The render phase calls components to find the next screen description."
        },
        {
          "term": "commit phase",
          "meaning": "The commit phase applies needed changes to browser elements."
        },
        {
          "term": "key",
          "meaning": "A key is a stable label used to match siblings between renders."
        }
      ],
      "examples": [
        {
          "title": "Change a key to reset state",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>;\n}\nexport default function App() {\n  const [version, setVersion] = useState(0);\n  return <><Counter key={version} /><button onClick={() => setVersion(value => value + 1)}>Reset</button></>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for a counter and its identity choice.",
            "Step 2: Define a stable component type outside its parent.",
            "Step 3: Create fresh state whenever this counter gets a new identity.",
            "Step 4: Increase the state attached to the current identity.",
            "Step 5: Own the key that chooses the counter's identity.",
            "Step 6: Keep the current identity number.",
            "Step 7: Replace the counter identity when Reset changes its key.",
            "Step 8: Initially the buttons say \"Count: 0\" and \"Reset\". Click \"Count: 0\": it becomes \"Count: 1\". Click \"Reset\": it becomes \"Count: 0\". Nothing is printed to the console."
          ],
          "output": "Initially the buttons say \"Count: 0\" and \"Reset\". Click \"Count: 0\": it becomes \"Count: 1\". Click \"Reset\": it becomes \"Count: 0\". Nothing is printed to the console."
        },
        {
          "title": "Stable keys keep the right typed draft",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [rows, setRows] = useState([{ id: \"a\", name: \"One\" }, { id: \"b\", name: \"Two\" }]);\n  return <>\n    <button onClick={() => setRows(current => current.slice(1))}>Remove first</button>\n    {rows.map(row => <label key={row.id}>{row.name}: <input defaultValue={row.name} /></label>)}\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for the removable records.",
            "Step 2: Render records whose identities survive a changed position.",
            "Step 3: Give each row a lasting identifier.",
            "Step 4: Group the removal action and the current rows.",
            "Step 5: Remove the first record so the second moves to the first position.",
            "Step 6: Match each uncontrolled input to its record using a stable key.",
            "Step 7: Finish the returned list group.",
            "Step 8: Initially the button says \"Remove first\", labels say \"One:\" and \"Two:\", and inputs contain \"One\" and \"Two\". Replace the second input with \"Draft\", then click \"Remove first\". Only \"Two:\" remains and its input still contains \"Draft\". Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Remove first\", labels say \"One:\" and \"Two:\", and inputs contain \"One\" and \"Two\". Replace the second input with \"Draft\", then click \"Remove first\". Only \"Two:\" remains and its input still contains \"Draft\". Nothing is printed to the console."
        },
        {
          "title": "Bug: position keys; fix: record keys",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nexport default function App() {\n  const [rows, setRows] = useState([{ id: \"a\", name: \"One\" }, { id: \"b\", name: \"Two\" }]);\n  return <>\n    <button onClick={() => setRows(current => current.slice(1))}>Remove first</button>\n    <section><h2>Bug</h2>{rows.map((row, index) => <label key={index}>{row.name}: <input defaultValue={row.name} /></label>)}</section>\n    <section><h2>Fixed</h2>{rows.map(row => <label key={row.id}>{row.name}: <input defaultValue={row.name} /></label>)}</section>\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for records shared by both demonstrations.",
            "Step 2: Compare position matching with record matching.",
            "Step 3: Start with two records that have stable identifiers.",
            "Step 4: Group one removal action with both lists.",
            "Step 5: Shift the second record into the first position.",
            "Step 6: Intentionally reuse positions, allowing an input to keep another record's text.",
            "Step 7: Match records by identifier so removed records take their inputs away.",
            "Step 8: Finish the comparison.",
            "Step 9: Initially both sections, \"Bug\" and \"Fixed\", show labels \"One:\" and \"Two:\" with input values \"One\" and \"Two\". Replace the first input in each section with \"Draft\", then click \"Remove first\". Both remaining labels say \"Two:\". The Bug input contains \"Draft\"; the Fixed input contains \"Two\". The button still says \"Remove first\". Nothing is printed to the console."
          ],
          "output": "Initially both sections, \"Bug\" and \"Fixed\", show labels \"One:\" and \"Two:\" with input values \"One\" and \"Two\". Replace the first input in each section with \"Draft\", then click \"Remove first\". Both remaining labels say \"Two:\". The Bug input contains \"Draft\"; the Fixed input contains \"Two\". The button still says \"Remove first\". Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Rendering finds the next description; committing changes browser elements.",
        "The same type at the same tree position normally keeps state.",
        "A different type or key resets the affected subtree.",
        "Stable keys identify sibling records when their positions change.",
        "Index keys can attach old input values to different records."
      ],
      "commonMistakes": [
        "Assuming every render replaces all browser elements confuses rendering with committing.",
        "Using array positions as keys in a changing list can preserve the wrong input.",
        "Generating random keys during rendering resets existing state.",
        "Defining a component inside another component can change its type on every render."
      ],
      "links": [
        {
          "title": "Preserving and Resetting State",
          "url": "https://react.dev/learn/preserving-and-resetting-state",
          "kind": "article",
          "language": "English",
          "why": "Shows how positions, component types, and keys preserve or reset state."
        }
      ]
    },
    {
      "topicId": "react-rerenders",
      "summary": "Components render again when React needs a new screen description. Reduce repeated work only where measurements show that it makes interaction slow.",
      "explanation": [
        {
          "heading": "Know what repeated work means",
          "points": [
            "A re-render is another call to a component to find what it should show now. Think of checking a shopping list again before deciding whether anything needs buying.",
            "A DOM update changes a real browser element or its text. React may call several components and still find that only one number on the screen needs changing.",
            "A component's own state change can cause it to render again. Setting state to the same value can let React skip work, although a component call can sometimes still happen.",
            "A parent rendering normally causes its children to render too, even when their prop values match earlier values. New props are therefore not the only explanation for repeated child calls."
          ]
        },
        {
          "heading": "Follow context and keep rendering safe",
          "points": [
            "Context lets distant components read a value supplied above them. A reader renders again when its provider's value changes, even if its ordinary props did not change.",
            "Separate unrelated context values when their readers need different information. A changing search value should not require every component reading a rarely changed display setting to do more work.",
            "Pure rendering means returning the same result for the same inputs without changing outside information. Keep visible actions in handlers or effects so repeated calls remain safe.",
            "Strict Mode is a development check that calls component bodies twice to reveal unsafe rendering. It also checks effect cleanup with an extra setup and cleanup cycle where applicable."
          ]
        },
        {
          "heading": "Move the changing work closer",
          "points": [
            "Move state down means placing a changing value inside the smallest component that needs it. Keep a typing field's draft beside that field instead of above a large results panel.",
            "Updating that lower owner does not itself make its parent render. This often removes repeated work from distant siblings without adding any special comparison or remembered result.",
            "Composition means arranging components by placing some inside others. A wrapper can receive already created content through children while owning its own open flag or temporary selection.",
            "When only that wrapper's state changes, React can reuse the same children value passed by its parent. This helps keep unrelated content outside the wrapper's repeated work."
          ]
        },
        {
          "heading": "Skip suitable child work",
          "points": [
            "Memoization means remembering earlier work to reuse it when relevant inputs match. React.memo, imported as memo, can usually skip a parent's repeated child call when that child's props match.",
            "The default comparison checks each prop with Object.is, a JavaScript same-value test. Fresh objects, arrays, and functions usually fail that test even when their contents look the same.",
            "Prefer simple props and avoid building unnecessary new objects for a memoized child. Consider useMemo for a calculated value or useCallback for a function only when keeping it stable helps.",
            "Memo does not block the child's own state updates or context changes. It is a performance aid rather than a promise, so correctness must survive React choosing to render again."
          ]
        },
        {
          "heading": "See the actual cost",
          "points": [
            "React DevTools is a browser tool for inspecting components. Its highlight updates option marks areas involved in updates, helping you notice which parts participate while you type or click.",
            "The Profiler records committed rendering work and its time. Record a specific slow interaction, inspect the expensive components, and compare the same interaction after a targeted change.",
            "Highlighting or counting calls alone does not prove that users experience slowness. A tiny component rendering often can cost less than one large calculation that happens only once.",
            "Development checks add extra work, so compare production behavior when judging real speed. React Compiler, when configured, can automate some memoization; installing React 19 alone does not enable it."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "First reproduce the slow interaction and record it with the Profiler. Ask which component takes time, rather than assuming every repeated call needs to disappear immediately.",
            "Next remove unnecessary effects that set more state, then move state down or use children to isolate changes. These structural fixes often reduce more work than scattered comparisons.",
            "Then split unrelated contexts and consider memo for expensive children receiving unchanged props. Stabilize a prop only when its changing identity actually prevents useful reuse in that measured path.",
            "Finally measure the same interaction again and keep changes that help. My interview rule is: fix state placement first, then skip repeated work where the measured cost justifies it."
          ]
        }
      ],
      "terms": [
        {
          "term": "re-render",
          "meaning": "A re-render calls a component again to find its next output."
        },
        {
          "term": "DOM update",
          "meaning": "A DOM update changes a real browser element or its text."
        },
        {
          "term": "composition",
          "meaning": "Composition arranges components by placing some inside others."
        },
        {
          "term": "memoization",
          "meaning": "Memoization saves earlier work for reuse when relevant inputs match."
        },
        {
          "term": "Object.is",
          "meaning": "Object.is is the JavaScript same-value test used for default prop comparisons."
        },
        {
          "term": "Profiler",
          "meaning": "The Profiler records committed rendering work and its timing."
        }
      ],
      "examples": [
        {
          "title": "Move the changing state down",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>;\n}\nexport default function App() {\n  return <><h1>Overview</h1><Counter /></>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for the small changing control.",
            "Step 2: Put the state owner below the static content.",
            "Step 3: Keep count inside the component that needs it.",
            "Step 4: Update this owner without updating its parent's state.",
            "Step 5: Keep the surrounding content above the changing owner.",
            "Step 6: Place the static heading beside the isolated counter.",
            "Step 7: The heading says \"Overview\" and the button initially says \"Count: 0\". After one click the button says \"Count: 1\" and the heading still says \"Overview\". Nothing is printed to the console."
          ],
          "output": "The heading says \"Overview\" and the button initially says \"Count: 0\". After one click the button says \"Count: 1\" and the heading still says \"Overview\". Nothing is printed to the console."
        },
        {
          "title": "Pass stable children into a changing wrapper",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction Panel({ children }) {\n  const [open, setOpen] = useState(false);\n  return <section><button onClick={() => setOpen(value => !value)}>{open ? \"Close\" : \"Open\"}</button>{open && <p>Details</p>}{children}</section>;\n}\nfunction Report() {\n  return <p>Report ready</p>;\n}\nexport default function App() {\n  return <Panel><Report /></Panel>;\n}",
          "walkthrough": [
            "Step 1: Bring in state for the wrapper's local flag.",
            "Step 2: Receive content created by the parent rather than recreating it here.",
            "Step 3: Keep the wrapper's changing choice local.",
            "Step 4: Change wrapper content while reusing the same children value.",
            "Step 5: Define the content outside the changing wrapper.",
            "Step 6: Keep this content independent of the open flag.",
            "Step 7: Create the report as a child of the panel.",
            "Step 8: Pass the report element through children so local panel updates can reuse it.",
            "Step 9: Initially the button says \"Open\" and the paragraph says \"Report ready\". After one click the button says \"Close\", a paragraph says \"Details\", and \"Report ready\" remains. Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Open\" and the paragraph says \"Report ready\". After one click the button says \"Close\", a paragraph says \"Details\", and \"Report ready\" remains. Nothing is printed to the console."
        },
        {
          "title": "Bug: a fresh prop; fix: a simple prop",
          "language": "jsx",
          "environment": "browser",
          "code": "import { memo, useState } from \"react\";\nconst Bad = memo(function Bad({ settings }) {\n  return <p>Bug: {settings.label}</p>;\n});\nconst Good = memo(function Good({ label }) {\n  return <p>Fixed: {label}</p>;\n});\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return <>\n    <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>\n    <Bad settings={{ label: \"Report\" }} />\n    <Good label=\"Report\" />\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in memo for comparing unchanged child props.",
            "Step 2: Wrap a child whose object prop will change identity unnecessarily.",
            "Step 3: Show the label despite the ineffective comparison.",
            "Step 4: Wrap a child receiving a directly comparable string.",
            "Step 5: Show the same information using the simpler prop.",
            "Step 6: Keep an unrelated changing count above both children.",
            "Step 7: Track a change neither child needs.",
            "Step 8: Compare two prop choices under the same parent update.",
            "Step 9: Render the parent again on each click.",
            "Step 10: Create a fresh object, defeating the usual unchanged-props skip.",
            "Step 11: Pass an unchanged string so memo can usually skip repeated child work.",
            "Step 12: Finish the comparison.",
            "Step 13: Initially the button says \"Count: 0\" and the paragraphs say \"Bug: Report\" and \"Fixed: Report\". After one click the button says \"Count: 1\" and both paragraphs stay unchanged. The bug concerns extra rendering work, not incorrect text; inspect it with the Profiler. Nothing is printed to the console."
          ],
          "output": "Initially the button says \"Count: 0\" and the paragraphs say \"Bug: Report\" and \"Fixed: Report\". After one click the button says \"Count: 1\" and both paragraphs stay unchanged. The bug concerns extra rendering work, not incorrect text; inspect it with the Profiler. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Own state, parent rendering, and changed context can cause another render.",
        "Rendering again does not necessarily change browser elements.",
        "Move state down and use children to isolate unrelated work.",
        "Memo can skip unchanged props but cannot block own state or context changes.",
        "Measure a slow interaction before and after optimizing it.",
        "Strict Mode intentionally repeats rendering checks during development."
      ],
      "commonMistakes": [
        "Assuming unchanged props always prevent a child render overlooks parent rendering.",
        "Passing a new object on every render can defeat memo.",
        "Treating development Strict Mode checks as production behavior leads to misleading measurements.",
        "Adding memo everywhere creates extra comparisons without proving a speed improvement."
      ],
      "links": [
        {
          "title": "Render and Commit",
          "url": "https://react.dev/learn/render-and-commit",
          "kind": "article",
          "language": "English",
          "why": "Separates component calls from the browser changes that follow them."
        }
      ]
    },
    {
      "topicId": "react-performance",
      "summary": "Measure slow interactions before changing code. Load optional code later and reduce expensive work where it noticeably helps users.",
      "syntax": [
        {
          "title": "Load a component on demand",
          "language": "jsx",
          "code": "const Panel = lazy(() => import('./Panel'));\nfunction Content() {\n  return <Suspense fallback={fallback}><Panel /></Suspense>;\n}",
          "parts": [
            {
              "part": "Panel",
              "meaning": "The lazy component declared outside other components."
            },
            {
              "part": "lazy(() => import('./Panel'))",
              "meaning": "Loads a module whose default export is the component when first rendered."
            },
            {
              "part": "Content",
              "meaning": "The component rendering the lazy panel inside a loading boundary."
            },
            {
              "part": "Suspense",
              "meaning": "Shows fallback while a descendant suspends, including during lazy module loading."
            },
            {
              "part": "fallback={fallback}",
              "meaning": "Supplies the renderable loading UI."
            }
          ]
        },
        {
          "title": "Measure committed rendering",
          "language": "jsx",
          "code": "const element = (\n  <Profiler id={id} onRender={onRender}>{children}</Profiler>\n);",
          "parts": [
            {
              "part": "Profiler",
              "meaning": "Measures committed rendering work in the wrapped tree; profiling requires an enabled build."
            },
            {
              "part": "id={id}",
              "meaning": "Supplies an identifier included in profiling callbacks."
            },
            {
              "part": "onRender={onRender}",
              "meaning": "Receives id, phase, actualDuration, baseDuration, startTime and commitTime after the profiled tree commits."
            },
            {
              "part": "children",
              "meaning": "The subtree whose rendering is measured."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Find the slow part",
          "points": [
            "Performance means how quickly a page loads and responds to actions. Think of preparing a meal: first find whether shopping, chopping, or cooking causes the wait.",
            "The React DevTools Profiler records committed rendering work and its time. Record a slow click or typing action, then inspect which components took the longest to render.",
            "Slow rendering often comes from expensive calculations, large lists, repeated parent updates, or effects that keep setting state. Slow loading can instead come from downloading too much JavaScript."
          ]
        },
        {
          "heading": "Reduce the work that matters",
          "points": [
            "Move temporary state closer to its readers and remove unnecessary effects before adding remembered results. Repeat the same measurement afterward, because fewer component calls alone do not prove faster interaction.",
            "Virtualising a long list means showing only nearby rows while preserving scrolling space. It reduces how many elements the browser and React must manage at once.",
            "A bundle is a file of JavaScript prepared for the browser. Keep bundles small by removing unused dependencies and avoiding large helpers for tiny tasks you can write clearly."
          ]
        },
        {
          "heading": "Load optional code later",
          "points": [
            "Code splitting means building separate JavaScript pieces that can load independently. Lazy loading means waiting to load a piece until someone needs that feature, like preparing dessert later.",
            "React.lazy creates a component from a loader that returns a Promise, an object representing a future result. Usually the loader uses import() to load another file with a default export.",
            "Declare lazy components outside other components. The bundler, which prepares browser files, must support splitting dynamic imports; a one-file delayed Promise does not shrink its bundle.",
            "Suspense shows a fallback, temporary replacement content, while a supported child waits. It handles lazy code loading, but it does not automatically detect ordinary data loading inside an effect."
          ]
        },
        {
          "heading": "How to decide",
          "points": [
            "Split large optional features, such as a chart or editor, when measurements show they weigh down the first load. Keep small controls needed immediately available without extra waits.",
            "Split by route, meaning a page selected by its address, when different pages need different code. Put each Suspense fallback around a useful area that can load together.",
            "Avoid optimizing already fast interactions or adding many tiny loading boundaries. My interview rule is: measure, change the largest avoidable cost, and measure again before adding more complexity."
          ]
        }
      ],
      "terms": [
        {
          "term": "Profiler",
          "meaning": "The Profiler records committed rendering work and its timing."
        },
        {
          "term": "virtualising",
          "meaning": "Virtualising displays only nearby list rows while keeping scrolling space."
        },
        {
          "term": "bundle",
          "meaning": "A bundle is a JavaScript file prepared for the browser."
        },
        {
          "term": "code splitting",
          "meaning": "Code splitting creates separate JavaScript pieces that can load independently."
        },
        {
          "term": "Promise",
          "meaning": "A Promise represents a result that will become available later."
        },
        {
          "term": "fallback",
          "meaning": "A fallback is temporary replacement content shown while a supported child waits."
        }
      ],
      "examples": [
        {
          "title": "A tiny lazy component",
          "language": "jsx",
          "environment": "browser",
          "code": "import { lazy, Suspense } from \"react\";\nconst Note = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Note ready</p> }), 500);\n}));\nexport default function App() {\n  return <Suspense fallback={<p>Loading note...</p>}><Note /></Suspense>;\n}",
          "walkthrough": [
            "Step 1: Bring in deferred component loading and its waiting boundary.",
            "Step 2: Declare one stable lazy component with a future result.",
            "Step 3: Provide the required default component after a short local delay.",
            "Step 4: Choose the waiting content for the deferred note.",
            "Step 5: Replace the fallback when the lazy component becomes ready.",
            "Step 6: Initially the paragraph says \"Loading note...\". After the 500-millisecond timer resolves and React commits the result, it says \"Note ready\". This one-file delay demonstrates waiting behavior; it does not create a separate code bundle. Nothing is printed to the console."
          ],
          "output": "Initially the paragraph says \"Loading note...\". After the 500-millisecond timer resolves and React commits the result, it says \"Note ready\". This one-file delay demonstrates waiting behavior; it does not create a separate code bundle. Nothing is printed to the console."
        },
        {
          "title": "Open an optional report",
          "language": "jsx",
          "environment": "browser",
          "code": "import { lazy, Suspense, useState } from \"react\";\nconst Report = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Saved jobs: 2</p> }), 500);\n}));\nexport default function App() {\n  const [open, setOpen] = useState(false);\n  return <>\n    <button onClick={() => setOpen(true)}>Open report</button>\n    {open && <Suspense fallback={<p>Loading report...</p>}><Report /></Suspense>}\n  </>;\n}",
          "walkthrough": [
            "Step 1: Bring in local state and lazy waiting behavior.",
            "Step 2: Keep the lazy report identity outside the owner.",
            "Step 3: Resolve a fixed report component after a short delay without a network request.",
            "Step 4: Own whether the optional report is needed.",
            "Step 5: Avoid starting the loader before the report is requested.",
            "Step 6: Keep the action outside the report's waiting boundary.",
            "Step 7: Attempt to show the lazy report only after this action.",
            "Step 8: Show temporary content only in the report area while it waits.",
            "Step 9: Finish the optional report group.",
            "Step 10: Initially only the button \"Open report\" appears. Click it: the button remains and a paragraph says \"Loading report...\". After the timer resolves and React commits, the paragraph says \"Saved jobs: 2\". This local delay does not reduce bundle size; real splitting uses a supported dynamic import of another file. Nothing is printed to the console."
          ],
          "output": "Initially only the button \"Open report\" appears. Click it: the button remains and a paragraph says \"Loading report...\". After the timer resolves and React commits, the paragraph says \"Saved jobs: 2\". This local delay does not reduce bundle size; real splitting uses a supported dynamic import of another file. Nothing is printed to the console."
        }
      ],
      "keyPoints": [
        "Measure the same slow interaction before and after changing code.",
        "Profiler timing concerns rendering; loading speed also depends on downloaded code.",
        "Virtualise large lists when too many rendered rows cause slowness.",
        "Use lazy with a supported dynamic import for real code splitting.",
        "Use Suspense fallback content around useful loading areas.",
        "Split large optional features or routes before tiny immediate controls."
      ],
      "commonMistakes": [
        "Adding optimizations without measuring can make code harder to maintain without helping speed.",
        "Declaring a lazy component inside another component can reset its state unexpectedly.",
        "A delayed Promise in one file demonstrates Suspense but does not create code splitting.",
        "Expecting Suspense to detect an ordinary fetching effect leaves loading behavior incomplete."
      ],
      "links": [
        {
          "title": "A Developer’s Guide to Lazy Loading in React and Next.js",
          "url": "https://www.freecodecamp.org/news/react-performance-optimization-techniques/",
          "kind": "article",
          "language": "English",
          "why": "Explains common performance techniques, including list rendering and code splitting."
        }
      ]
    },
    {
      "topicId": "react-portals-fragments",
      "summary": "Portals place content elsewhere in the page. Fragments group elements without adding an extra HTML element.",
      "syntax": [
        {
          "title": "Render a portal into another DOM node",
          "language": "jsx",
          "code": "const portal = createPortal(children, domNode);\nconst element = <section>{portal}</section>;",
          "parts": [
            {
              "part": "portal",
              "meaning": "The renderable portal value."
            },
            {
              "part": "createPortal(children, domNode)",
              "meaning": "Places children in another DOM node while preserving their context and event bubbling through the component tree."
            },
            {
              "part": "children",
              "meaning": "The content rendered through the portal."
            },
            {
              "part": "domNode",
              "meaning": "The existing DOM node that receives the portal content."
            }
          ]
        },
        {
          "title": "Group children without a wrapper",
          "language": "jsx",
          "code": "const element = (\n  <>{first}{second}</>\n);",
          "parts": [
            {
              "part": "<>",
              "meaning": "Starts a Fragment without adding a DOM node; this shorthand cannot carry a key."
            },
            {
              "part": "first",
              "meaning": "The first renderable child."
            },
            {
              "part": "second",
              "meaning": "The second renderable child."
            }
          ]
        },
        {
          "title": "Give a group a key",
          "language": "jsx",
          "code": "const groups = items.map(item => (\n  <Fragment key={item.id}><dt>{item.term}</dt><dd>{item.description}</dd></Fragment>\n));",
          "parts": [
            {
              "part": "groups",
              "meaning": "The array of keyed groups to place inside a description list."
            },
            {
              "part": "items",
              "meaning": "The source array of records."
            },
            {
              "part": "item",
              "meaning": "The current record in the mapping callback."
            },
            {
              "part": "Fragment",
              "meaning": "The explicit Fragment imported from react, needed to give the group a key."
            },
            {
              "part": "key={item.id}",
              "meaning": "Identifies the whole sibling group using a stable unique data ID."
            },
            {
              "part": "item.term",
              "meaning": "The term displayed in the description list."
            },
            {
              "part": "item.description",
              "meaning": "The description displayed for the term."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Move content outside a box",
          "points": [
            "Imagine a message that must appear outside its parent's small box. A portal places that content elsewhere while keeping its React parent relationship.",
            "createPortal takes content and an existing page element, such as document.body. Modals, which are overlay dialogs, and tooltips, which are small hints, often use portals.",
            "Overflow clipping means a parent hides content outside its edges; stacking means which overlapping elements appear above others. A portal can escape these parent limits, but styling still controls the final appearance."
          ]
        },
        {
          "heading": "Keep relationships and group elements",
          "points": [
            "Event bubbling means a child's event also reaches its parents. Portal clicks still bubble through React parents, even when the page elements live elsewhere.",
            "A fragment groups several elements without another HTML wrapper. Write <>...</> when a component must return several neighboring elements as one group, keeping the HTML flatter.",
            "For a group inside a list, import Fragment and write <Fragment key={item.id}>. The short fragment form cannot take a key, so use the named form there."
          ]
        }
      ],
      "terms": [
        {
          "term": "portal",
          "meaning": "A portal places content in another page element while preserving its React relationships."
        },
        {
          "term": "fragment",
          "meaning": "A fragment groups elements without adding a wrapper element to the page."
        },
        {
          "term": "event bubbling",
          "meaning": "Event bubbling lets an event reach handlers on its parents."
        },
        {
          "term": "overflow clipping and stacking",
          "meaning": "Overflow clipping hides content beyond edges, while stacking decides which overlapping elements appear above others."
        }
      ],
      "examples": [
        {
          "title": "A portal click reaches its React parent",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nimport { createPortal } from \"react-dom\";\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div onClick={() => setCount(count + 1)}>\n      <><p>Parent clicks: {count}</p><p>Inside the box</p></>\n      {createPortal(<button>Outside the box</button>, document.body)}\n    </div>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useState to count events reaching the parent.",
            "Step 2: Import createPortal to place content outside its parent's page element.",
            "Step 3: Begin App, which owns the portal.",
            "Step 4: Start the parent event count at zero.",
            "Step 5: Begin returning the example.",
            "Step 6: Count clicks that reach this React parent.",
            "Step 7: Use a fragment for two paragraphs without another HTML wrapper.",
            "Step 8: Place the button directly in document.body while keeping its React parent.",
            "Step 9: Close the parent element.",
            "Step 10: Finish the return.",
            "Step 11: Finish App.",
            "Step 12: The screen shows Parent clicks: 0, Inside the box, and Outside the box. Click Outside the box to see Parent clicks: 1."
          ],
          "output": "Initially: \"Parent clicks: 0\", \"Inside the box\", and a button labeled \"Outside the box\". Clicking it changes the first line to \"Parent clicks: 1\"."
        }
      ],
      "keyPoints": [
        "Portals change page placement while keeping React relationships.",
        "Portal events bubble through React parents.",
        "Fragments add no HTML wrapper.",
        "Use the named Fragment form when a key is needed."
      ],
      "commonMistakes": [
        "Expecting a portal alone to style or position a dialog leaves its appearance unfinished.",
        "Trying to add a key to <>...</> uses a form that cannot accept it."
      ],
      "links": [
        {
          "title": "createPortal",
          "url": "https://react.dev/reference/react-dom/createPortal",
          "kind": "article",
          "language": "English",
          "why": "Explains portals with small modal examples."
        }
      ]
    },
    {
      "topicId": "react-forwarding-refs",
      "summary": "A child can pass a ref through to its input so a parent can focus it. In React 19, function components receive ref as a normal prop.",
      "syntax": [
        {
          "title": "Receive a ref as a prop",
          "language": "jsx",
          "code": "function TextInput({ ref, value, onChange }) {\n  return <input ref={ref} value={value} onChange={onChange} />;\n}\nconst inputRef = useRef(null);\nconst element = <TextInput ref={inputRef} value={value} onChange={handler} />;",
          "parts": [
            {
              "part": "TextInput",
              "meaning": "A function component accepting a ref prop directly in React 19."
            },
            {
              "part": "ref",
              "meaning": "The parent ref forwarded to the input DOM node."
            },
            {
              "part": "value",
              "meaning": "The controlled input string."
            },
            {
              "part": "onChange",
              "meaning": "The callback that synchronously updates the controlling state."
            },
            {
              "part": "inputRef",
              "meaning": "The parent reference, created with useRef at the parent component top level."
            },
            {
              "part": "handler",
              "meaning": "The parent callback passed as the input change handler."
            }
          ]
        },
        {
          "title": "Expose a custom ref handle",
          "language": "jsx",
          "code": "function TextInput({ ref }) {\n  const inputRef = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus() { inputRef.current?.focus(); }\n  }), []);\n  return <input ref={inputRef} />;\n}",
          "parts": [
            {
              "part": "TextInput",
              "meaning": "A component that exposes a custom ref handle instead of its input node."
            },
            {
              "part": "ref",
              "meaning": "The parent ref receiving the custom handle."
            },
            {
              "part": "inputRef",
              "meaning": "The private ref holding the input DOM node."
            },
            {
              "part": "useImperativeHandle",
              "meaning": "Customizes the exposed ref at the component top level."
            },
            {
              "part": "focus()",
              "meaning": "The method made available on the parent ref handle."
            },
            {
              "part": "inputRef.current?.focus()",
              "meaning": "Focuses the input if its DOM node exists."
            },
            {
              "part": "[]",
              "meaning": "Keeps the handle stable because it reads only the stable local ref."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Give the parent access",
          "points": [
            "Think of a parent needing a handle to a child's input. A ref keeps access to a page element without storing that element in state.",
            "The parent creates a ref with useRef and passes it to the child. The child puts it on its input, letting the parent focus that field.",
            "Before React 19, React treated ref specially instead of including it in a function component's normal props. forwardRef solved this by receiving the ref as a separate second argument."
          ]
        },
        {
          "heading": "Use the simpler React 19 pattern",
          "points": [
            "In React 19, receive ref alongside other props and pass it to the input. Function components no longer need forwardRef for this common pattern.",
            "useImperativeHandle creates a custom handle, an object exposing selected methods such as focus. This lets a child offer a small set of actions instead of its whole element.",
            "Read the ref after React places the element on the page, usually inside an event handler. Its current field can be null before placement or after removal."
          ]
        }
      ],
      "terms": [
        {
          "term": "ref",
          "meaning": "A ref keeps access to a value or page element without causing rendering when changed."
        },
        {
          "term": "forwardRef",
          "meaning": "forwardRef lets older function components receive a ref as a separate argument."
        },
        {
          "term": "custom handle",
          "meaning": "A custom handle is an object containing the selected methods a child exposes through its ref."
        }
      ],
      "examples": [
        {
          "title": "Focus a child input",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useRef } from \"react\";\nfunction NameField({ ref }) {\n  return <input ref={ref} aria-label=\"Name\" defaultValue=\"Mira\" />;\n}\nfunction App() {\n  const inputRef = useRef(null);\n  return (\n    <>\n      <NameField ref={inputRef} />\n      <button onClick={() => inputRef.current?.focus()}>Focus name</button>\n    </>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useRef for access to the input.",
            "Step 2: Receive ref as a normal prop in React 19.",
            "Step 3: Pass ref to the input; aria-label gives it the accessible name Name.",
            "Step 4: Finish the child that passes the ref through.",
            "Step 5: Begin the parent App.",
            "Step 6: Create a ref whose current value starts as null.",
            "Step 7: Begin returning the field and its focus button.",
            "Step 8: Group them without an extra element.",
            "Step 9: Pass the parent's ref to NameField.",
            "Step 10: Focus the stored input on a click, if current is available.",
            "Step 11: Close the group.",
            "Step 12: Finish the return.",
            "Step 13: Finish App.",
            "Step 14: The screen shows an input containing Mira and a Focus name button. Clicking the button moves focus into the input."
          ],
          "output": "An input contains \"Mira\", beside a button labeled \"Focus name\". Clicking the button focuses the input without changing its text."
        }
      ],
      "keyPoints": [
        "React 19 function components receive ref as a prop.",
        "Pass the ref to the element the parent needs.",
        "Older code may use forwardRef.",
        "useImperativeHandle can expose only selected methods."
      ],
      "commonMistakes": [
        "Receiving ref without putting it on an element leaves the parent without that element.",
        "Reading ref.current during rendering assumes an element is already available."
      ],
      "links": [
        {
          "title": "Manipulating the DOM with Refs",
          "url": "https://react.dev/learn/manipulating-the-dom-with-refs",
          "kind": "article",
          "language": "English",
          "why": "A focus example explains access to another component's input."
        }
      ]
    },
    {
      "topicId": "react-composition",
      "summary": "Composition means building larger pieces by putting smaller components together. It helps you share layouts and behavior while keeping each piece easy to change.",
      "syntax": [
        {
          "title": "Wrap nested children",
          "language": "jsx",
          "code": "function Wrapper({ children }) {\n  return <section>{children}</section>;\n}\nconst element = <Wrapper>{content}</Wrapper>;",
          "parts": [
            {
              "part": "Wrapper",
              "meaning": "A component that controls layout around nested content."
            },
            {
              "part": "children",
              "meaning": "The nested content supplied by the caller."
            },
            {
              "part": "content",
              "meaning": "The renderable value inserted inside the wrapper."
            }
          ]
        },
        {
          "title": "Call a render prop",
          "language": "jsx",
          "code": "function Container({ value, render }) {\n  return <section>{render(value)}</section>;\n}\nconst element = <Container value={value} render={item => <span>{item.label}</span>} />;",
          "parts": [
            {
              "part": "Container",
              "meaning": "A component that delegates some rendering to a function prop."
            },
            {
              "part": "value",
              "meaning": "The data passed to the render function."
            },
            {
              "part": "render",
              "meaning": "The function prop returning renderable content."
            },
            {
              "part": "render(value)",
              "meaning": "Calls the function prop during rendering with the supplied data."
            },
            {
              "part": "item",
              "meaning": "The data received by the caller-provided render callback."
            },
            {
              "part": "item.label",
              "meaning": "The renderable property selected by the callback."
            }
          ]
        },
        {
          "title": "Share context across compound components",
          "language": "jsx",
          "code": "const GroupContext = createContext(null);\nfunction Group({ value, children }) {\n  return <GroupContext value={value}>{children}</GroupContext>;\n}\nGroup.Item = function Item() {\n  const value = useContext(GroupContext);\n  return <span>{value}</span>;\n};\nconst element = <Group value={value}><Group.Item /></Group>;",
          "parts": [
            {
              "part": "GroupContext",
              "meaning": "The module-level context shared by the related components."
            },
            {
              "part": "createContext(null)",
              "meaning": "Creates context with a null fallback."
            },
            {
              "part": "Group",
              "meaning": "The parent component that supplies a renderable shared value."
            },
            {
              "part": "value",
              "meaning": "The shared value supplied to the compound components."
            },
            {
              "part": "children",
              "meaning": "The nested components rendered under the provider."
            },
            {
              "part": "<GroupContext value={value}>",
              "meaning": "Provides context using the React 19 provider shorthand."
            },
            {
              "part": "Group.Item",
              "meaning": "The related component exposed as a property of Group."
            },
            {
              "part": "useContext(GroupContext)",
              "meaning": "Reads the nearest Group provider at the Item component top level."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Build with pieces",
          "points": [
            "Think of a lunchbox with separate spaces for food. Composition means putting components together, like filling those spaces with different dishes.",
            "Inheritance means making one component extend another to reuse its behavior. Prefer composition for screens: wrap or combine function components instead.",
            "A wrapper is a component that surrounds supplied content. A Card wrapper can add a border while its caller chooses the message inside.",
            "The children prop holds content written between opening and closing component tags. Returning children places that supplied content inside the wrapper."
          ]
        },
        {
          "heading": "Choose where content goes",
          "points": [
            "A slot is a named place for supplied content. Pass JSX through props such as header or footer when one children area is insufficient.",
            "The wrapper decides where each slot appears, while the caller decides its contents. This separates the page arrangement from the details being shown.",
            "Prop drilling means passing data through layers that only forward it. Build a child where its data exists, then pass that JSX through wrappers.",
            "For example, pass <Profile user={user} /> inside Layout instead of sending user through Layout. Like the lunchbox, Layout carries something already prepared."
          ]
        },
        {
          "heading": "Let the caller choose the display",
          "points": [
            "A render prop is a function prop that returns JSX. Its receiver calls that function with useful values, allowing the caller to choose their display.",
            "For example, Counter can call render(count) while keeping its counting behavior inside. One caller shows a sentence; another caller shows a badge.",
            "Use a render prop when supplied content needs values owned by the receiving component. Use ordinary children when the caller already has those values.",
            "A function passed as children can serve the same purpose. The receiver must call it; React does not show an uncalled function as content."
          ]
        },
        {
          "heading": "Make related pieces cooperate",
          "points": [
            "Compound components are related components designed to work together. Tabs and Tab form one control while letting the caller arrange its pieces.",
            "Context means sharing a value with components below a provider without forwarding props through every layer. Tabs can provide the selected value to Tab.",
            "Choose children for a flexible wrapper, named slots for several regions, and compound components for cooperating controls. Composition removes unnecessary forwarding, not every sharing problem.",
            "The second example shares selection through context and uses ordinary buttons. A complete accessible tab control also needs keyboard behavior and correct accessibility attributes."
          ]
        }
      ],
      "terms": [
        {
          "term": "composition",
          "meaning": "Composition builds a larger interface by combining smaller components."
        },
        {
          "term": "inheritance",
          "meaning": "Inheritance reuses behavior by making one class extend another."
        },
        {
          "term": "slot",
          "meaning": "A slot is a named place where a component shows content supplied through a prop."
        },
        {
          "term": "prop drilling",
          "meaning": "Prop drilling passes data through components that only forward it."
        },
        {
          "term": "render prop",
          "meaning": "A render prop is a function prop that returns JSX using values supplied by its receiver."
        },
        {
          "term": "compound components",
          "meaning": "Compound components are related components that cooperate as parts of one control."
        }
      ],
      "examples": [
        {
          "title": "A card with a title slot",
          "language": "jsx",
          "environment": "browser",
          "code": "function Card({ title, children }) {\n  return <section><h2>{title}</h2>{children}</section>;\n}\nexport default function App() {\n  return <Card title=\"Reminder\"><p>Bring water.</p></Card>;\n}",
          "walkthrough": [
            "Step 1: Card accepts a named title slot and the content supplied between its tags.",
            "Step 2: Card places title above children, keeping their arrangement inside the wrapper.",
            "Step 3: App chooses which content fills the wrapper.",
            "Step 4: The caller supplies Reminder as the title and the paragraph as children.",
            "Step 5: The screen shows the heading \"Reminder\" and the paragraph \"Bring water.\" The console prints nothing."
          ],
          "output": "The screen shows the heading \"Reminder\" and the paragraph \"Bring water.\" The console prints nothing."
        },
        {
          "title": "Tabs share their selected value",
          "language": "jsx",
          "environment": "browser",
          "code": "import { createContext, useContext, useState } from \"react\";\nconst Selection = createContext(null);\nfunction Tabs({ children }) {\n  const [active, setActive] = useState(\"Overview\");\n  return <Selection value={{ active, setActive }}>{children}</Selection>;\n}\nfunction Tab({ name, children }) {\n  const { active, setActive } = useContext(Selection);\n  return <section><button onClick={() => setActive(name)}>{name}</button>{active === name && <p>{children}</p>}</section>;\n}\nexport default function App() {\n  return <Tabs><Tab name=\"Overview\">Quick facts</Tab><Tab name=\"Details\">Full notes</Tab></Tabs>;\n}",
          "walkthrough": [
            "Step 1: Import the tools that create shared context, read it, and keep the selected name.",
            "Step 2: Create Selection with null as the value used when no provider exists above a reader.",
            "Step 3: Tabs receives the cooperating pieces through children.",
            "Step 4: Tabs owns selection and starts with Overview selected.",
            "Step 5: The React 19 context provider shares selection and its change function with the pieces inside.",
            "Step 6: Tab receives its own name and the content associated with that name.",
            "Step 7: Tab reads the selection owned by Tabs, so intermediate pieces need no selection props.",
            "Step 8: Each button selects its name; only the matching piece shows its paragraph.",
            "Step 9: App chooses the cooperating pieces and their content.",
            "Step 10: Nest both Tab pieces inside Tabs so both can read the same shared selection.",
            "Step 11: Initially the screen shows \"Overview\", \"Quick facts\", and \"Details\" in that order. After clicking \"Details\", it shows \"Overview\", \"Details\", and \"Full notes\". The console prints nothing."
          ],
          "output": "Initially the screen shows \"Overview\", \"Quick facts\", and \"Details\" in that order. After clicking \"Details\", it shows \"Overview\", \"Details\", and \"Full notes\". The console prints nothing."
        }
      ],
      "keyPoints": [
        "Prefer combining function components over component inheritance.",
        "children supplies one flexible content area; named props can supply several slots.",
        "A render prop lets the receiver supply values to caller-chosen JSX.",
        "Compound components cooperate through shared state, often using context.",
        "Passing prepared JSX can remove unnecessary prop forwarding."
      ],
      "commonMistakes": [
        "A wrapper that never returns children hides the supplied content.",
        "Rendering a function prop directly instead of calling it does not show its returned JSX.",
        "Using Tab outside its Tabs provider leaves this example without a selection value."
      ],
      "links": [
        {
          "title": "Passing Props to a Component",
          "url": "https://react.dev/learn/passing-props-to-a-component",
          "kind": "article",
          "language": "English",
          "why": "Shows how children lets a wrapper accept different content."
        }
      ]
    },
    {
      "topicId": "react-error-boundaries",
      "summary": "An error boundary replaces a broken section with a helpful message. It lets other sections remain usable when a child fails during rendering.",
      "syntax": [
        {
          "title": "Define and use an error boundary",
          "language": "jsx",
          "code": "class ErrorBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) { return { hasError: true }; }\n  componentDidCatch(error, info) { this.props.onError(error, info); }\n  render() {\n    return this.state.hasError ? this.props.fallback : this.props.children;\n  }\n}\nconst element = <ErrorBoundary fallback={fallback} onError={reportError}>{children}</ErrorBoundary>;",
          "parts": [
            {
              "part": "ErrorBoundary",
              "meaning": "The component catching descendant rendering errors; ordinary event handler and asynchronous callback errors are not caught."
            },
            {
              "part": "Component",
              "meaning": "The class component base imported from react."
            },
            {
              "part": "state = { hasError: false }",
              "meaning": "Initializes the flag used to select normal content or fallback."
            },
            {
              "part": "static getDerivedStateFromError(error)",
              "meaning": "Receives the thrown error and returns fallback state during rendering."
            },
            {
              "part": "componentDidCatch(error, info)",
              "meaning": "Receives the error and component stack information for reporting after an error is caught."
            },
            {
              "part": "this.props.onError(error, info)",
              "meaning": "Calls the supplied reporting function with the error and diagnostic information."
            },
            {
              "part": "this.state.hasError ? this.props.fallback : this.props.children",
              "meaning": "Chooses the supplied fallback after an error, otherwise renders nested children."
            },
            {
              "part": "onError={reportError}",
              "meaning": "Passes the application reporting function; fallback and children provide the corresponding renderable content."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Keep a failure inside one area",
          "points": [
            "Think of a safety door around a room. An error boundary surrounds part of the component tree and keeps certain failures inside that area.",
            "The component tree is the arrangement of components inside other components. A boundary handles rendering errors from descendants, meaning components anywhere below it.",
            "A fallback is replacement content shown after failure. Use a clear message such as \"Panel unavailable\" so users understand why their usual content disappeared.",
            "A boundary does not repair the broken value or resume the failed component. React removes the failed section and shows the fallback instead."
          ]
        },
        {
          "heading": "Write the special boundary class",
          "points": [
            "A class is a JavaScript structure with named methods, which are functions attached to it. A handwritten React error boundary must extend Component.",
            "There is no built-in function-component replacement for defining a boundary. Keep the surrounding components as functions; only the boundary needs this special structure.",
            "static getDerivedStateFromError returns state for the fallback after an error. Keep it free of outside actions, such as logging or changing other values.",
            "componentDidCatch receives the error and information about the failing component chain. Use it for logging; render chooses between this.props.children and the fallback."
          ]
        },
        {
          "heading": "Know what stays outside",
          "points": [
            "Boundaries catch descendant rendering failures and failures in React-managed setup or cleanup work. They cannot catch failures in their own fallback or boundary code.",
            "Event handlers run after rendering, so their thrown errors are outside this protection. Handle a risky click operation with try/catch near that operation.",
            "Async code runs later, such as a timer callback or a rejected promise. Its errors are not automatically caught by a surrounding boundary.",
            "Server rendering means producing HTML before it reaches the browser. These boundaries do not catch server-rendering failures; handle those through the server framework."
          ]
        },
        {
          "heading": "Choose a useful recovery area",
          "points": [
            "Place a boundary around a whole page for broad protection, or around independent panels for smaller failures. Avoid wrapping every tiny label without reason.",
            "Like the safety door, a panel boundary lets neighboring controls stay available. In the second example, the page heading survives the panel failure.",
            "Retry means attempting the failed section again. Fix its input or clear the cause before resetting a boundary, or the same failure returns.",
            "The react-error-boundary library supplies a reusable boundary with fallback, logging, and reset options. Its public component lets you keep your own components as functions."
          ]
        }
      ],
      "terms": [
        {
          "term": "error boundary",
          "meaning": "An error boundary catches certain descendant failures and replaces the failed section."
        },
        {
          "term": "component tree",
          "meaning": "The component tree describes which components contain other components."
        },
        {
          "term": "fallback",
          "meaning": "A fallback is replacement content shown when the usual content cannot be shown."
        },
        {
          "term": "method",
          "meaning": "A method is a function attached to an object or class."
        },
        {
          "term": "async code",
          "meaning": "Async code finishes later, outside the current sequence of instructions."
        },
        {
          "term": "server rendering",
          "meaning": "Server rendering produces HTML before it reaches the browser."
        }
      ],
      "examples": [
        {
          "title": "Replace a broken section",
          "language": "jsx",
          "environment": "browser",
          "code": "import { Component } from \"react\";\nclass Boundary extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  componentDidCatch(error) { console.log(\"Caught:\", error.message); }\n  render() { return this.state.failed ? <p>Section unavailable.</p> : this.props.children; }\n}\nfunction Broken() { throw new Error(\"Missing item\"); }\nexport default function App() {\n  return <Boundary><Broken /></Boundary>;\n}",
          "walkthrough": [
            "Step 1: Import Component to define the special class required for a handwritten boundary.",
            "Step 2: Boundary extends Component so React can call its error methods.",
            "Step 3: Start without a recorded failure so children can be shown.",
            "Step 4: Return failed state when a descendant throws, making the next result the fallback.",
            "Step 5: Log the caught error message after React handles the failure.",
            "Step 6: Choose the fallback when failed is true; otherwise show the supplied children.",
            "Step 7: Broken throws during rendering, which this boundary can catch.",
            "Step 8: App places the failure below a boundary.",
            "Step 9: Boundary surrounds Broken, so the rendering error becomes replacement content.",
            "Step 10: The screen shows \"Section unavailable.\" The explicit console.log prints \"Caught: Missing item\". React also reports the caught error in development; diagnostic formatting can vary."
          ],
          "output": "The screen shows \"Section unavailable.\" The explicit console.log prints \"Caught: Missing item\". React also reports the caught error in development; diagnostic formatting can vary."
        },
        {
          "title": "Keep a heading and recover the panel",
          "language": "jsx",
          "environment": "browser",
          "code": "import { Component, useState } from \"react\";\nclass Boundary extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  componentDidCatch(error) { console.log(\"Caught:\", error.message); }\n  render() { return this.state.failed ? <p>Panel unavailable.</p> : this.props.children; }\n}\nfunction Panel({ broken }) {\n  if (broken) throw new Error(\"Panel failed\");\n  return <p>Panel ready.</p>;\n}\nexport default function App() {\n  const [broken, setBroken] = useState(false);\n  const [attempt, setAttempt] = useState(0);\n  function recover() {\n    setBroken(false);\n    setAttempt(n => n + 1);\n  }\n  return <><h1>Workspace</h1><button onClick={() => setBroken(true)}>Break panel</button><button onClick={recover}>Recover</button><Boundary key={attempt}><Panel broken={broken} /></Boundary></>;\n}",
          "walkthrough": [
            "Step 1: Import the boundary class base and state for controlling failure and recovery.",
            "Step 2: Define the boundary around the panel rather than the whole page.",
            "Step 3: Each new boundary starts without a recorded failure.",
            "Step 4: Switch to failed state when Panel throws during rendering.",
            "Step 5: Log the handled failure message.",
            "Step 6: Show Panel unavailable. after failure; otherwise show the protected panel.",
            "Step 7: Panel receives a flag that determines whether its render can finish.",
            "Step 8: Throw during rendering when broken is true, allowing Boundary to handle the error.",
            "Step 9: Show the healthy panel message when its input is safe.",
            "Step 10: App owns the failure flag and the boundary replacement counter.",
            "Step 11: Start with a healthy panel.",
            "Step 12: Start with the first boundary identity.",
            "Step 13: Group the two recovery changes in one handler.",
            "Step 14: Remove the failure cause before showing the panel again.",
            "Step 15: Change the key to create a fresh boundary with fresh error state.",
            "Step 16: Keep the heading and controls outside Boundary; the buttons trigger failure and recovery.",
            "Step 17: Initially the screen shows \"Workspace\", \"Break panel\", \"Recover\", and \"Panel ready.\" Clicking \"Break panel\" replaces \"Panel ready.\" with \"Panel unavailable.\" and explicitly logs \"Caught: Panel failed\". React also reports the caught error in development; diagnostic formatting can vary. Clicking \"Recover\" restores \"Panel ready.\" and adds no explicit console log."
          ],
          "output": "Initially the screen shows \"Workspace\", \"Break panel\", \"Recover\", and \"Panel ready.\" Clicking \"Break panel\" replaces \"Panel ready.\" with \"Panel unavailable.\" and explicitly logs \"Caught: Panel failed\". React also reports the caught error in development; diagnostic formatting can vary. Clicking \"Recover\" restores \"Panel ready.\" and adds no explicit console log."
        }
      ],
      "keyPoints": [
        "A handwritten boundary uses a class; the surrounding components can stay functions.",
        "getDerivedStateFromError selects fallback state; componentDidCatch handles logging.",
        "Boundaries protect descendants rather than their own code.",
        "Event-handler and ordinary async failures need separate handling.",
        "Resetting a boundary succeeds only when the failure cause is gone."
      ],
      "commonMistakes": [
        "Putting try/catch around returned child JSX does not catch a later child render failure.",
        "Expecting a boundary to catch a thrown timer or click-handler error leaves that error unhandled.",
        "Resetting error state without fixing the cause makes the section fail again."
      ],
      "links": [
        {
          "title": "How to Avoid Breaking Your React Application in Production",
          "url": "https://www.freecodecamp.org/news/how-to-avoid-breaking-your-react-app-in-production",
          "kind": "article",
          "language": "English",
          "why": "Explains fallback screens with a concrete broken-page example and written code."
        }
      ]
    },
    {
      "topicId": "react-hoc",
      "summary": "A higher-order component is a function that takes a component and returns a new component. It shares behavior by wrapping existing components.",
      "syntax": [
        {
          "title": "Return a component that passes props through",
          "language": "jsx",
          "code": "function withSomething(Component) {\n  return function EnhancedComponent(props) {\n    /* add behavior */\n    return <Component {...props} />;\n  };\n}\nconst Enhanced = withSomething(BaseComponent);",
          "parts": [
            {
              "part": "withSomething",
              "meaning": "A higher-order function called outside rendering to create a component with additional behavior."
            },
            {
              "part": "Component",
              "meaning": "The component being wrapped."
            },
            {
              "part": "EnhancedComponent",
              "meaning": "The returned component, whose body can add behavior before rendering the wrapped component."
            },
            {
              "part": "props",
              "meaning": "The props received by the returned component."
            },
            {
              "part": "{...props}",
              "meaning": "Spreads all received props onto the wrapped component."
            },
            {
              "part": "Enhanced",
              "meaning": "The component produced by applying the higher-order function."
            },
            {
              "part": "BaseComponent",
              "meaning": "The original component supplied to the higher-order function."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Add a shared outer layer",
          "points": [
            "Imagine putting the same cover around several notebooks. A higher-order component, or HOC, takes a component and returns a new component with shared behavior.",
            "The wrapper is that new outer component. A withLoading function can return a wrapper that shows a waiting message while loading and otherwise shows the original component.",
            "Pass unrelated props through to the original component so its callers keep their usual options. A wrapper should add behavior without changing the original component's code."
          ]
        },
        {
          "heading": "Keep the wrapper predictable",
          "points": [
            "Create the wrapped component once, outside other components. Creating it during rendering gives React a different component type each time, which can reset state below it.",
            "A custom hook is a function starting with use that shares logic using hooks. Custom hooks replaced most HOC uses for sharing stateful behavior in function components.",
            "An HOC still makes sense when you need the same surrounding display for several components. Prefer a custom hook when callers mainly need shared values and functions."
          ]
        }
      ],
      "terms": [
        {
          "term": "higher-order component (HOC)",
          "meaning": "An HOC is a function that takes a component and returns another component with added behavior."
        },
        {
          "term": "wrapper",
          "meaning": "A wrapper is an outer component that adds behavior or display around another component."
        },
        {
          "term": "custom hook",
          "meaning": "A custom hook is a function starting with use that shares logic built with hooks."
        }
      ],
      "examples": [
        {
          "title": "Share a loading display",
          "language": "jsx",
          "environment": "browser",
          "code": "function withLoading(Component) {\n  return function LoadingWrapper({ loading, ...props }) {\n    return loading ? <p>Loading...</p> : <Component {...props} />;\n  };\n}\nfunction Greeting({ name }) {\n  return <p>Hello, {name}</p>;\n}\nconst GreetingWithLoading = withLoading(Greeting);\nfunction App() {\n  return <><GreetingWithLoading loading={true} /><GreetingWithLoading loading={false} name=\"Mira\" /></>;\n}",
          "walkthrough": [
            "Step 1: Accept the component to wrap.",
            "Step 2: Return a new component that separates loading from the remaining props.",
            "Step 3: Show the waiting message or pass the remaining props to Component.",
            "Step 4: Finish the returned wrapper.",
            "Step 5: Finish the HOC function.",
            "Step 6: Define the component that will receive forwarded props.",
            "Step 7: Use its name prop in the greeting.",
            "Step 8: Finish Greeting.",
            "Step 9: Create the wrapped component once, outside App.",
            "Step 10: Begin App, which uses the existing wrapper.",
            "Step 11: Show one waiting instance and one ready instance with a forwarded name.",
            "Step 12: Finish App.",
            "Step 13: The screen shows Loading... followed by Hello, Mira."
          ],
          "output": "Two lines show \"Loading...\" and \"Hello, Mira\"."
        }
      ],
      "keyPoints": [
        "An HOC takes a component and returns a component.",
        "Forward unrelated props to the wrapped component.",
        "Create wrapped components outside other components.",
        "Custom hooks replaced most uses for shared stateful logic."
      ],
      "commonMistakes": [
        "Creating the wrapped component inside App can reset its children's state on later renders.",
        "Dropping the remaining props prevents the wrapped component from receiving needed values."
      ],
      "links": [
        {
          "title": "Higher-Order Components: The Ultimate Guide",
          "url": "https://www.freecodecamp.org/news/higher-order-components-the-ultimate-guide-b453a68bb851/",
          "kind": "article",
          "language": "English",
          "why": "It builds the function-wrapping idea step by step; some examples use older React syntax."
        }
      ]
    },
    {
      "topicId": "react-project-structure",
      "summary": "A clear folder layout makes related code easy to find. Small components and shared hooks make changes easier to understand.",
      "explanation": [
        {
          "heading": "Put related work together",
          "points": [
            "Think of folders as labeled drawers that help you find things quickly. Keep files that usually change together close, including their styles and tests when present.",
            "A feature folder groups files for one task, such as search. It keeps related work together, but shared pieces may need a separate place later.",
            "A type folder groups files by kind, such as components or hooks. This is simple at first, but one feature's files may spread across many folders."
          ]
        },
        {
          "heading": "Keep each piece clear",
          "points": [
            "Keep each component focused on one clear job, and move reusable logic into custom hooks. Split files when doing so makes their purpose easier to follow.",
            "Use meaningful names such as SearchBox for components and useSearch for hooks. Match component filenames to their names where practical, and follow one consistent naming style.",
            "An environment variable is a setting supplied outside your source code. Vite exposes VITE_ names through import.meta.env, such as import.meta.env.VITE_TITLE; these browser values are public, never secret."
          ]
        }
      ],
      "terms": [
        {
          "term": "feature folder",
          "meaning": "A feature folder keeps code for one user task together."
        },
        {
          "term": "type folder",
          "meaning": "A type folder keeps files of the same kind together."
        },
        {
          "term": "environment variable",
          "meaning": "An environment variable supplies a setting from outside the source code."
        }
      ],
      "examples": [
        {
          "title": "Separate logic from a focused button",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useState } from \"react\";\nfunction useCounter() {\n  const [count, setCount] = useState(0);\n  return { count, increment: () => setCount(c => c + 1) };\n}\nfunction CounterButton() {\n  const { count, increment } = useCounter();\n  return <button onClick={increment}>Count: {count}</button>;\n}\nfunction App() {\n  return <CounterButton />;\n}",
          "walkthrough": [
            "Step 1: Import the hook needed by the reusable logic.",
            "Step 2: Give the custom hook a clear name beginning with use.",
            "Step 3: Keep the counter's state inside that hook.",
            "Step 4: Expose the value and an operation with a clear name.",
            "Step 5: Finish the logic that could later move to useCounter.js.",
            "Step 6: Give the focused display component a matching name.",
            "Step 7: Get the shared logic through useCounter.",
            "Step 8: Keep CounterButton responsible for showing and connecting the button.",
            "Step 9: Finish the component that could later move to CounterButton.jsx.",
            "Step 10: Begin App, which combines the focused pieces.",
            "Step 11: Use CounterButton without repeating its logic.",
            "Step 12: Finish App.",
            "Step 13: The screen shows Count: 0 on a button. Clicking once changes it to Count: 1."
          ],
          "output": "A button shows \"Count: 0\". After one click, it shows \"Count: 1\"."
        }
      ],
      "keyPoints": [
        "Choose a folder layout that fits the code you have.",
        "Keep files that change together close.",
        "Use small components and reusable hooks.",
        "Use clear, consistent names.",
        "VITE_ values are public browser settings."
      ],
      "commonMistakes": [
        "Creating many empty folders before they are useful adds work without making code clearer.",
        "Putting a secret in a VITE_ variable exposes it to people using the page."
      ],
      "links": [
        {
          "title": "Importing and Exporting Components",
          "url": "https://react.dev/learn/importing-and-exporting-components",
          "kind": "article",
          "language": "English",
          "why": "It shows when and how to split components into understandable files."
        }
      ]
    },
    {
      "topicId": "react-router",
      "summary": "React Router chooses which components to show for a web address. It supports links, changing address values, shared page layouts, and redirects.",
      "syntax": [
        {
          "title": "Declare nested routes inside a browser router",
          "language": "jsx",
          "code": "const routes = (\n  <BrowserRouter>\n    <Routes>\n      <Route path=\"/items\" element={<Layout />}>\n        <Route path=\":id\" element={<Details />} />\n      </Route>\n      <Route path=\"/private\" element={<Protected allowed={allowed}><Private /></Protected>} />\n      <Route path=\"/login\" element={<Login />} />\n    </Routes></BrowserRouter>\n);",
          "parts": [
            {
              "part": "BrowserRouter",
              "meaning": "Provides routing using browser history; import it from react-router-dom (react-router in version 7 also works)."
            },
            {
              "part": "Routes",
              "meaning": "Selects the matching branch of Route elements for the current location."
            },
            {
              "part": "Route",
              "meaning": "Associates a path pattern with the element to render."
            },
            {
              "part": "path=\"/items\"",
              "meaning": "Defines the parent URL path."
            },
            {
              "part": "element={<Layout />}",
              "meaning": "Renders the parent layout, which must include an Outlet for matched child routes."
            },
            {
              "part": "path=\":id\"",
              "meaning": "Matches a dynamic child segment relative to the parent; Details renders at /items/:id."
            },
            {
              "part": "<Protected allowed={allowed}><Private /></Protected>",
              "meaning": "Wraps the private page with a guard using the allowed boolean."
            },
            {
              "part": "element={<Login />}",
              "meaning": "Renders the login page at /login."
            }
          ]
        },
        {
          "title": "Link, read params and render nested content",
          "language": "jsx",
          "code": "function Layout() {\n  return <><Link to=\"/items\">Items</Link><Outlet /></>;\n}\nfunction Details() {\n  const { id } = useParams();\n  return <span>{id}</span>;\n}",
          "parts": [
            {
              "part": "Layout",
              "meaning": "The parent route component containing shared UI and a child route slot."
            },
            {
              "part": "Link",
              "meaning": "Provides an anchor that supports client-side navigation inside the router."
            },
            {
              "part": "to=\"/items\"",
              "meaning": "Sets the destination URL for the link."
            },
            {
              "part": "Outlet",
              "meaning": "Renders the matching child route inside the parent layout."
            },
            {
              "part": "Details",
              "meaning": "The component assigned to the dynamic child route."
            },
            {
              "part": "id",
              "meaning": "The string captured by the matching :id path segment."
            },
            {
              "part": "useParams()",
              "meaning": "Reads matched dynamic URL parameters at the route component top level."
            }
          ]
        },
        {
          "title": "Redirect when access is denied",
          "language": "jsx",
          "code": "function Protected({ allowed, children }) {\n  return allowed ? children : <Navigate to=\"/login\" replace />;\n}",
          "parts": [
            {
              "part": "Protected",
              "meaning": "A route wrapper that checks client-side access; server authorization must protect private data separately."
            },
            {
              "part": "allowed",
              "meaning": "The resolved boolean controlling access to the nested page."
            },
            {
              "part": "children",
              "meaning": "The protected content rendered when access is allowed."
            },
            {
              "part": "Navigate",
              "meaning": "Changes the current location when rendered inside a router."
            },
            {
              "part": "to=\"/login\"",
              "meaning": "Specifies the redirect destination."
            },
            {
              "part": "replace",
              "meaning": "Replaces the current browser history entry instead of adding one."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Match an address to a screen",
          "points": [
            "A route connects an address pattern to content. Think of a building directory: a room number tells you which room to open.",
            "Use react-router-dom version 7 for these notes. BrowserRouter connects routing to browser history, the list of addresses visited in the current tab.",
            "Routes chooses the best matching route branch, while Route describes a path and its element. The path is the address part such as /products.",
            "MemoryRouter keeps its address history in memory instead of the address bar. The examples use initialEntries to choose their starting address."
          ]
        },
        {
          "heading": "Move and read address values",
          "points": [
            "Link provides a normal clickable link for moving between routes without reloading the whole document. NavLink also exposes whether its destination is active.",
            "A parameter is a named value matched from an address. In /items/:itemId, useParams reads itemId as a string, such as \"7\".",
            "useNavigate returns a function for moving after an action, such as saving a form. Prefer Link when the user simply chooses a destination.",
            "Search parameters are address values after ?, such as ?sort=price. useSearchParams reads and updates them, making filters shareable through the address."
          ]
        },
        {
          "heading": "Keep a shared layout",
          "points": [
            "Nested routes are routes placed inside another route. Their matched content shares the parent layout, such as navigation beside a product details section.",
            "Outlet marks where the matched child appears inside the parent. Without it, the parent layout can appear while its child content stays hidden.",
            "An index route is the default child shown at its parent address. Its index prop replaces path; ordinary child paths extend the parent path.",
            "A path of * catches unmatched addresses and can show \"Page not found.\" Like the building directory, provide guidance when a room does not exist."
          ]
        },
        {
          "heading": "Redirect and choose routing tools",
          "points": [
            "A protected route checks whether a visitor may see content. Navigate redirects by rendering a destination; replace overwrites the current history entry.",
            "Put Outlet behind the permission check for a group of protected children. Wait for any sign-in check to finish before deciding the destination.",
            "A browser route check controls visible content, not access to private data. The server must independently check permission before returning that data.",
            "A data router manages route-based data work. createBrowserRouter defines routes with loaders for reading data and actions for changes, then RouterProvider shows them."
          ]
        }
      ],
      "terms": [
        {
          "term": "route",
          "meaning": "A route connects an address pattern to the content shown for that address."
        },
        {
          "term": "browser history",
          "meaning": "Browser history keeps the sequence of addresses visited in a tab."
        },
        {
          "term": "parameter",
          "meaning": "A parameter is a named value matched from part of an address."
        },
        {
          "term": "nested route",
          "meaning": "A nested route shows child content within a shared parent layout."
        },
        {
          "term": "redirect",
          "meaning": "A redirect moves the visitor to another address automatically."
        },
        {
          "term": "data router",
          "meaning": "A data router coordinates routes with functions for reading and changing data."
        }
      ],
      "examples": [
        {
          "title": "Move between two screens",
          "language": "jsx",
          "environment": "browser",
          "code": "import { MemoryRouter, Routes, Route, Link } from \"react-router-dom\";\nexport default function App() {\n  return <MemoryRouter initialEntries={[\"/\"]}>\n      <Link to=\"/about\">About</Link>\n      <Routes>\n        <Route path=\"/\" element={<h1>Home</h1>} />\n        <Route path=\"/about\" element={<h1>About page</h1>} />\n      </Routes>\n    </MemoryRouter>;\n}",
          "walkthrough": [
            "Step 1: Import the version 7 routing pieces used for an in-memory address and route links.",
            "Step 2: App groups the links and matching screen inside one router.",
            "Step 3: Start the internal history at / without changing the address bar.",
            "Step 4: Link targets /about through routing rather than a whole-document reload.",
            "Step 5: Routes selects the matching route branch for the current internal address.",
            "Step 6: At /, show the Home heading.",
            "Step 7: At /about, show the About page heading.",
            "Step 8: Finish the route choices inside the shared router.",
            "Step 9: Finish the router that supplies address information to Link and Routes.",
            "Step 10: Initially the screen shows the link \"About\" and heading \"Home\". After clicking \"About\", the heading becomes \"About page\" and the link remains. The browser address bar does not change. The console prints nothing."
          ],
          "output": "Initially the screen shows the link \"About\" and heading \"Home\". After clicking \"About\", the heading becomes \"About page\" and the link remains. The browser address bar does not change. The console prints nothing."
        },
        {
          "title": "Nested details and a protected account",
          "language": "jsx",
          "environment": "browser",
          "code": "import { MemoryRouter, Routes, Route, NavLink, Outlet, Navigate, useParams, useNavigate } from \"react-router-dom\";\nfunction Layout() {\n  return <><nav><NavLink to=\"/items/7\">Item</NavLink>{\" | \"}<NavLink to=\"/account\">Account</NavLink>{\" | \"}<NavLink to=\"/missing\">Missing</NavLink></nav><Outlet /></>;\n}\nfunction Item() {\n  const { itemId } = useParams();\n  const navigate = useNavigate();\n  return <><h1>Item {itemId}</h1><button onClick={() => navigate(\"/account\")}>Open account</button></>;\n}\nfunction Protected({ allowed }) {\n  return allowed ? <Outlet /> : <Navigate to=\"/login\" replace />;\n}\nexport default function App() {\n  return (\n    <MemoryRouter initialEntries={[\"/items/7\"]}>\n      <Routes><Route element={<Layout />}>\n        <Route path=\"items/:itemId\" element={<Item />} />\n        <Route element={<Protected allowed={false} />}><Route path=\"account\" element={<h1>Account page</h1>} /></Route>\n        <Route path=\"login\" element={<h1>Please sign in</h1>} />\n        <Route path=\"*\" element={<h1>Page not found.</h1>} />\n      </Route></Routes>\n    </MemoryRouter>\n  );\n}",
          "walkthrough": [
            "Step 1: Import version 7 pieces for navigation, matched values, shared layouts, and redirects.",
            "Step 2: Layout supplies navigation shared by its nested routes.",
            "Step 3: Show three navigation links and place the currently matched child at Outlet.",
            "Step 4: Item reads the current route and offers action-driven navigation.",
            "Step 5: Read itemId from the :itemId part of the matched path.",
            "Step 6: Get the function that can move to another route after an action.",
            "Step 7: Show the matched identifier and navigate to the protected account when the button is clicked.",
            "Step 8: Protected receives the permission result for its nested routes.",
            "Step 9: Show a child when allowed; otherwise replace the current history entry with /login.",
            "Step 10: App connects the layout, details, protection, and fallback routes.",
            "Step 11: Return the router and its route descriptions.",
            "Step 12: Start the internal address at /items/7.",
            "Step 13: Group routes below the shared Layout without adding a parent path segment.",
            "Step 14: Match an item address and supply its identifier to Item.",
            "Step 15: Protect /account with a fixed false permission result, so its heading is never shown here.",
            "Step 16: Show Please sign in at the redirect destination.",
            "Step 17: Show Page not found. for an address that matches no other child.",
            "Step 18: Finish the shared layout route and route choices.",
            "Step 19: Finish the router that owns the internal address history.",
            "Step 20: Initially the screen shows \"Item | Account | Missing\", the heading \"Item 7\", and the button \"Open account\". Clicking \"Open account\" redirects to \"Please sign in\" while the navigation remains. Clicking \"Item\" restores the item screen; clicking \"Account\" also redirects to \"Please sign in\". Clicking \"Missing\" shows \"Page not found.\" with the navigation still visible. The browser address bar does not change. The console prints nothing."
          ],
          "output": "Initially the screen shows \"Item | Account | Missing\", the heading \"Item 7\", and the button \"Open account\". Clicking \"Open account\" redirects to \"Please sign in\" while the navigation remains. Clicking \"Item\" restores the item screen; clicking \"Account\" also redirects to \"Please sign in\". Clicking \"Missing\" shows \"Page not found.\" with the navigation still visible. The browser address bar does not change. The console prints nothing."
        }
      ],
      "keyPoints": [
        "BrowserRouter uses browser history; MemoryRouter keeps history in memory.",
        "Routes and Route connect address patterns to content.",
        "Use Link for destinations and useNavigate for movement after actions.",
        "useParams reads named path values as strings.",
        "Nested content appears at Outlet; * handles unmatched paths.",
        "Navigate can redirect visitors, but private data still requires server permission checks."
      ],
      "commonMistakes": [
        "Leaving Outlet out of a parent layout prevents its matched child from appearing.",
        "Treating useParams values as numbers without conversion can cause incorrect calculations.",
        "Treating a protected browser route as data security leaves the server unprotected."
      ],
      "links": [
        {
          "title": "Routing in declarative mode",
          "url": "https://reactrouter.com/start/declarative/routing",
          "kind": "article",
          "language": "English",
          "why": "Introduces routes, links, nested routes and params step by step."
        }
      ]
    },
    {
      "topicId": "react-19-actions",
      "summary": "React 19 actions help forms handle submitted work and waiting states. Related APIs keep results, show temporary changes, and read shared or waiting values.",
      "syntax": [
        {
          "title": "Submit a form with action state",
          "language": "jsx",
          "code": "async function fn(previousState, formData) {\n  return await save(previousState, formData);\n}\nfunction ActionForm({ initial }) {\n  const [state, formAction, isPending] = useActionState(fn, initial);\n  return <form action={formAction}>\n    <input name=\"value\" /><button disabled={isPending}>Submit</button><output>{state}</output>\n  </form>;\n}",
          "parts": [
            {
              "part": "fn",
              "meaning": "The action receiving previous state and submitted FormData, then returning the next state."
            },
            {
              "part": "save(previousState, formData)",
              "meaning": "The application function saving submitted fields and returning renderable state."
            },
            {
              "part": "ActionForm",
              "meaning": "The component declaring action state at its top level."
            },
            {
              "part": "initial",
              "meaning": "The initial renderable action state."
            },
            {
              "part": "state",
              "meaning": "The latest state returned by the action."
            },
            {
              "part": "formAction",
              "meaning": "The action dispatcher returned by useActionState for the form action prop."
            },
            {
              "part": "isPending",
              "meaning": "Indicates whether an action is pending and disables submission here."
            },
            {
              "part": "action={formAction}",
              "meaning": "Runs the function action on submission with FormData; a plain function action receives only FormData."
            }
          ]
        },
        {
          "title": "Update optimistically inside an action",
          "language": "jsx",
          "code": "const [optimistic, addOptimistic] = useOptimistic(value, (current, update) => updateValue(current, update));\nasync function action(formData) {\n  const update = formData.get('value');\n  addOptimistic(update);\n  await save(update);\n}\nconst element = <form action={action}><input name=\"value\" /><button>Submit</button><output>{optimistic}</output></form>;",
          "parts": [
            {
              "part": "optimistic",
              "meaning": "The temporary renderable state shown while the action is pending."
            },
            {
              "part": "addOptimistic",
              "meaning": "The updater called inside an action or transition to request an optimistic state update."
            },
            {
              "part": "useOptimistic(value, (current, update) => updateValue(current, update))",
              "meaning": "Declares optimistic state at the component top level, using value as the authoritative state."
            },
            {
              "part": "updateValue(current, update)",
              "meaning": "A pure reducer combining the current optimistic state with the submitted update."
            },
            {
              "part": "action",
              "meaning": "The form action that runs the optimistic update and asynchronous save."
            },
            {
              "part": "formData.get('value')",
              "meaning": "Reads the submitted field named value."
            },
            {
              "part": "save(update)",
              "meaning": "Persists the update; the authoritative value must then reflect the saved result."
            },
            {
              "part": "action={action}",
              "meaning": "Provides the action context required for the optimistic update."
            }
          ]
        },
        {
          "title": "Read a stable promise during rendering",
          "language": "jsx",
          "code": "function AsyncContent({ promise }) {\n  const value = use(promise);\n  return <span>{value}</span>;\n}\nconst element = <Suspense fallback={fallback}><AsyncContent promise={promise} /></Suspense>;",
          "parts": [
            {
              "part": "AsyncContent",
              "meaning": "The component that reads asynchronous data during rendering."
            },
            {
              "part": "promise",
              "meaning": "A stable promise supplied externally, rather than newly created during each client render."
            },
            {
              "part": "value",
              "meaning": "The resolved renderable result."
            },
            {
              "part": "use(promise)",
              "meaning": "Reads the result, suspends while pending, or throws a rejection to the nearest error boundary."
            },
            {
              "part": "Suspense",
              "meaning": "The boundary displaying fallback while the promise is pending."
            },
            {
              "part": "fallback",
              "meaning": "The renderable loading content."
            }
          ]
        }
      ],
      "explanation": [
        {
          "heading": "Submit work and keep its result",
          "points": [
            "Think of submitting a form as handing over a filled paper slip. A form action is a function supplied to <form action={save}> that handles that submission.",
            "The action receives FormData, an object holding submitted field names and values. Use data.get(\"name\") to read a named input; successful actions reset inputs whose values React state does not control.",
            "useActionState keeps an action's latest returned result and provides a wrapped action plus a pending flag. Its action receives the previous result before the submitted data, which helps build the next result."
          ]
        },
        {
          "heading": "Show waiting work clearly",
          "points": [
            "useOptimistic shows a temporary expected result while an action runs. Change its value inside an action, then update the real state when the work succeeds.",
            "A Promise represents a result that will arrive later. use reads a Promise's result or context, which supplies a shared value from a parent provider.",
            "An unresolved Promise makes use wait behind Suspense, a component showing temporary fallback content. Unlike ordinary hooks, use can run conditionally, but only inside components or hooks."
          ]
        }
      ],
      "terms": [
        {
          "term": "form action and FormData",
          "meaning": "A form action handles a submission and receives FormData containing its named field values."
        },
        {
          "term": "useActionState",
          "meaning": "useActionState keeps the latest action result and returns a wrapped action and pending flag."
        },
        {
          "term": "useOptimistic",
          "meaning": "useOptimistic shows an expected temporary value while an action is running."
        },
        {
          "term": "use, Promise, context, and Suspense",
          "meaning": "use reads a Promise's future result or a parent's shared context value, while Suspense shows fallback content during waiting."
        }
      ],
      "examples": [
        {
          "title": "Keep a form action's result",
          "language": "jsx",
          "environment": "browser",
          "code": "import { useActionState } from \"react\";\nfunction App() {\n  const [message, formAction, pending] = useActionState(\n    async (_previous, data) => \"Saved: \" + data.get(\"name\"),\n    \"Nothing saved\"\n  );\n  return (\n    <form action={formAction}>\n      <input aria-label=\"Name\" name=\"name\" defaultValue=\"Mira\" />\n      <button disabled={pending}>Save</button>\n      <p>{message}</p>\n    </form>\n  );\n}",
          "walkthrough": [
            "Step 1: Import useActionState to keep the action result.",
            "Step 2: Begin App, which owns the form action.",
            "Step 3: Receive the result, wrapped form action, and waiting flag.",
            "Step 4: Return a message using the submitted name; the unused first argument is the previous result.",
            "Step 5: Set the initial result to Nothing saved.",
            "Step 6: Finish the hook call.",
            "Step 7: Begin returning the action form.",
            "Step 8: Connect form submission to the wrapped action.",
            "Step 9: Give the input the name used by data.get and the starting value Mira.",
            "Step 10: Disable Save while the action is pending.",
            "Step 11: Display the latest returned result.",
            "Step 12: Close the form.",
            "Step 13: Finish the return.",
            "Step 14: Finish App.",
            "Step 15: The screen initially shows Mira, Save, and Nothing saved. Submit once to see Saved: Mira."
          ],
          "output": "Initially, the input contains \"Mira\", the button shows \"Save\", and the message is \"Nothing saved\". After submission, the message is \"Saved: Mira\" and the input returns to its initial value, \"Mira\"."
        }
      ],
      "keyPoints": [
        "A function form action receives submitted FormData.",
        "useActionState adds the previous result as the first argument.",
        "useOptimistic values are temporary until real state changes.",
        "use can read a Promise or context.",
        "Suspense supplies fallback content while use waits."
      ],
      "commonMistakes": [
        "Reading submitted data from useActionState's first action argument confuses previous state with FormData.",
        "Treating an optimistic value as confirmed skips the real state update and error handling.",
        "Creating a fresh Promise during every client render can cause repeated waiting."
      ],
      "links": [
        {
          "title": "React v19",
          "url": "https://react.dev/blog/2024/12/05/react-19",
          "kind": "article",
          "language": "English",
          "why": "The introduction explains actions and each related API with small examples."
        }
      ]
    },
    {
      "topicId": "react-server-components",
      "summary": "Server components run before their result reaches the browser. Client components provide browser interactions; a supporting framework connects the two.",
      "explanation": [
        {
          "heading": "Choose where each piece runs",
          "points": [
            "Imagine preparing part of a meal before bringing it to the table. A server component runs outside the browser, at build time or during a request.",
            "Its component code stays outside the browser and can read server data. It cannot use browser features, click handlers, or hooks such as useState for interactive state.",
            "A client component supports browser interaction, including state and clicks. A framework may also turn it into initial HTML on the server before making it interactive in the browser."
          ]
        },
        {
          "heading": "Use a supporting framework",
          "points": [
            "The 'use client' line marks a file whose exports and imported code belong to the client side. Put it before imports; it does not mean the initial HTML must come only from the browser.",
            "The Next.js App Router is its folder-based page system, with server components by default. It uses them to keep data work near the server and send less component code to browsers.",
            "FORGE and most Vite setups are client-only, meaning their components run in the browser. The example needs server component support; adding async alone cannot turn browser code into a server component."
          ]
        }
      ],
      "terms": [
        {
          "term": "server component",
          "meaning": "A server component runs outside the browser and sends its rendered result onward."
        },
        {
          "term": "client component",
          "meaning": "A client component can use browser interactions and may also have its initial HTML prepared on a server."
        },
        {
          "term": "use client",
          "meaning": "The use client directive marks a file and its imported code for client component use."
        },
        {
          "term": "App Router",
          "meaning": "The App Router is the folder-based page system that uses server components by default."
        }
      ],
      "examples": [
        {
          "title": "Illustrate a server-prepared list",
          "language": "jsx",
          "environment": "browser",
          "code": "// Illustration only: requires a server component environment.\nasync function App() {\n  const lessons = await Promise.resolve([\"Components\", \"Hooks\"]);\n  return (\n    <section>\n      <h1>Lessons</h1>\n      <ul>{lessons.map(name => <li key={name}>{name}</li>)}</ul>\n    </section>\n  );\n}",
          "walkthrough": [
            "Step 1: Mark this file as an illustration needing server component support.",
            "Step 2: Define an async component that a supporting framework runs outside the browser.",
            "Step 3: Wait for fixed lesson data, standing in for server-side data work.",
            "Step 4: Return the prepared lesson view after the value is ready.",
            "Step 5: Group the server-prepared content in a section.",
            "Step 6: Supply the heading as part of the prepared result.",
            "Step 7: Build the list before sending the result onward.",
            "Step 8: Close the prepared section.",
            "Step 9: Finish the return.",
            "Step 10: Finish the server component illustration.",
            "Step 11: This cannot run as a browser-only component. In a server component environment, the intended screen shows Lessons, Components, and Hooks."
          ],
          "output": "Illustration only: this async server component cannot run in the browser-only environment. With server component support, the intended screen shows the heading \"Lessons\" and list items \"Components\" and \"Hooks\"."
        }
      ],
      "keyPoints": [
        "Server component code runs outside the browser.",
        "Client components support state and browser events.",
        "Place 'use client' before imports to mark the client side.",
        "The App Router uses server components by default.",
        "Client-only setups need extra framework support for server components."
      ],
      "commonMistakes": [
        "Adding 'use client' does not mean initial HTML can never be prepared on a server.",
        "Using useState or browser globals inside a server component puts browser behavior in the wrong environment.",
        "Making a browser component async does not give it server component support."
      ],
      "links": [
        {
          "title": "Server and Client Components",
          "url": "https://nextjs.org/learn/react-foundations/server-and-client-components",
          "kind": "article",
          "language": "English",
          "why": "The beginner lesson separates server preparation from browser interaction."
        }
      ]
    }
  ];
