// React, level 1 (basics): 3 sets of 21 questions (one file of React code per question).
// Written with Codex, then checked: every `check` was run on the rendered component in jsdom (react and react-dom 19, not in
// Strict Mode) and equals one of the accepted answers; the answer options were balanced so that neither their length nor their
// wording gives a clue. A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const REACT_LEVEL_1: QuestionBank = {
  skillId: "react",
  level: 1,
  questions: [
      {
        "id": "react-jsx-rendering-l1-s1-q01",
        "topicId": "react-jsx-rendering",
        "set": 1,
        "environment": "react",
        "code": "export default function App() {\n  const seats = 9;\n  const reserved = 4;\n  return <p>{seats - reserved} seats free</p>;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "5 seats free"
          ]
        },
        "partB": {
          "ask": "What is JSX used for in a React component?",
          "options": [
            "JSX describes the user interface with HTML strings at runtime.",
            "JSX describes the user interface with a separate browser language.",
            "JSX describes the user interface with markup inside JavaScript.",
            "JSX describes the user interface with strings inserted into the DOM."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-components-props-l1-s1-q02",
        "topicId": "react-components-props",
        "set": 1,
        "environment": "react",
        "code": "function Fare({ price = 6, tickets }) {\n  return <p>{price * tickets} coins</p>;\n}\nexport default function App() {\n  return <Fare tickets={3} />;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does `Fare` show? Answer with the full text.",
          "accepted": [
            "18 coins"
          ]
        },
        "partB": {
          "ask": "How should a child request a change to state owned by its parent?",
          "options": [
            "The child uses a callback prop to request a parent state update.",
            "The child uses prop edits to request a parent state update.",
            "The child uses a new props object to request a parent state update.",
            "The child uses a parent variable to request a parent state update."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-lists-keys-l1-s1-q03",
        "topicId": "react-lists-keys",
        "set": 1,
        "environment": "react",
        "code": "export default function App() {\n  const parcels = [\n    { id: 'a', weight: 2 },\n    { id: 'b', weight: 7 },\n    { id: 'c', weight: 4 },\n    { id: 'd', weight: 6 }\n  ];\n  return <ul>{parcels.filter(parcel => parcel.weight >= 5).map(parcel =>\n    <li key={parcel.id}>{parcel.id}</li>\n  )}</ul>;\n}",
        "check": "(async () => count(\"li\"))()",
        "partA": {
          "ask": "On the first render, how many `li` elements appear? Answer with a number.",
          "accepted": [
            "2",
            "2 elements",
            "2 li elements"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a stable list key?",
          "options": [
            "A stable key gives React a sorting rule for list entries during renders.",
            "A stable key gives React a child prop for a list entry between renders.",
            "A stable key gives React a parent location for entries during renders.",
            "A stable key gives React an identity for a list entry between renders."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-conditional-rendering-l1-s1-q04",
        "topicId": "react-conditional-rendering",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [open, setOpen] = useState(false);\n  return <>\n    <button onClick={() => setOpen(current => !current)}>Toggle gate</button>\n    <p>{open ? 'Enter' : 'Wait'}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Toggle gate\"); await click(\"Toggle gate\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After two clicks on `Toggle gate`, what text does the paragraph show? Answer with one word.",
          "accepted": [
            "Wait",
            "wait"
          ]
        },
        "partB": {
          "ask": "What does returning `null` from a component mean for its output?",
          "options": [
            "Returning `null` makes the component produce its previous content.",
            "Returning `null` makes the component produce no rendered content.",
            "Returning `null` makes the component produce a blank text node.",
            "Returning `null` makes the component produce its parent content."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-events-l1-s1-q05",
        "topicId": "react-events",
        "set": 1,
        "environment": "react",
        "code": "export default function App() {\n  return <section onClick={() => console.log('panel')}>\n    <button onClick={() => console.log('bell')}>Ring bell</button>\n  </section>;\n}",
        "check": "(async () => { await click(\"Ring bell\"); return logs(); })()",
        "partA": {
          "ask": "After one click on `Ring bell`, what is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "bell,panel"
          ]
        },
        "partB": {
          "ask": "What does calling `preventDefault()` on an event do?",
          "options": [
            "It cancels the parent handler waiting to receive that event.",
            "It cancels the state updates queued while handling that event.",
            "It cancels the child handler that earlier received that event.",
            "It cancels the browser default action associated with that event."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-usestate-l1-s1-q06",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [steps, setSteps] = useState(2);\n  function climb() {\n    setSteps(previous => previous + 1);\n    setSteps(previous => previous + 1);\n    setSteps(previous => previous + 1);\n  }\n  return <><button onClick={climb}>Climb</button><p>{steps}</p></>;\n}",
        "check": "(async () => { await click(\"Climb\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Climb`, what number does the paragraph show? Answer with a number.",
          "accepted": [
            "5"
          ]
        },
        "partB": {
          "ask": "When changing a field in an object held in state, which approach should be used?",
          "options": [
            "Pass the setter the existing object after changing its field.",
            "Pass the setter a field name instead of the updated object.",
            "Pass the setter a new object containing the updated field.",
            "Pass the setter a property descriptor for the changed field."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-useeffect-l1-s1-q07",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [channel, setChannel] = useState('news');\n  useEffect(() => {\n    console.log('start-' + channel);\n    return () => console.log('stop-' + channel);\n  }, [channel]);\n  return <button onClick={() => setChannel('music')}>Switch channel</button>;\n}",
        "check": "(async () => { await click(\"Switch channel\"); return logs(); })()",
        "partA": {
          "ask": "After the first effect runs and then one click on `Switch channel` finishes, what is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "start-news,stop-news,start-music"
          ]
        },
        "partB": {
          "ask": "Which task is a suitable use of an effect?",
          "options": [
            "Use an effect to synchronize a component with an external connection.",
            "Use an effect to calculate a display total from current input props.",
            "Use an effect to choose a heading during the current render pass.",
            "Use an effect to build a filtered list from current state values."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain the effect and cleanup sequence after the click.",
          "keyPoints": [
            "The initial effect logs `start-news`.",
            "Changing `channel` causes the previous cleanup to log `stop-news`.",
            "The replacement effect logs `start-music`."
          ],
          "modelAnswer": "The initial effect runs with `channel` set to `news` and logs `start-news`. Clicking `Switch channel` changes `channel` to `music`. React runs the previous cleanup, which still has the earlier `news` value, and logs `stop-news`. React then runs the new effect and logs `start-music`."
        }
      },
      {
        "id": "react-useref-l1-s1-q08",
        "topicId": "react-useref",
        "set": 1,
        "environment": "react",
        "code": "import { useRef, useState } from 'react';\nexport default function App() {\n  const taps = useRef(0);\n  const [version, setVersion] = useState(0);\n  return <>\n    <button onClick={() => { taps.current += 1; }}>Tap</button>\n    <button onClick={() => setVersion(version + 1)}>Refresh display</button>\n    <p>{taps.current}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Tap\"); await click(\"Tap\"); await click(\"Refresh display\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Tap` twice, then `Refresh display` once. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "For an input attached to a ref, when can an event handler read the DOM node?",
          "options": [
            "The handler can read the node before React calls the component.",
            "The handler can read the node after React commits the input.",
            "The handler can read the node before React creates the input.",
            "The handler can read the node after React unmounts the input."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-usecontext-l1-s1-q09",
        "topicId": "react-usecontext",
        "set": 1,
        "environment": "react",
        "code": "import { createContext, useContext } from 'react';\nconst Currency = createContext('coin');\nfunction Price() {\n  const currency = useContext(Currency);\n  return <p>{currency}</p>;\n}\nexport default function App() {\n  return <Currency.Provider value=\"token\">\n    <Currency.Provider value=\"stamp\"><Price /></Currency.Provider>\n  </Currency.Provider>;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does `Price` show? Answer with one word.",
          "accepted": [
            "stamp"
          ]
        },
        "partB": {
          "ask": "What does the default value passed to `createContext` provide?",
          "options": [
            "It provides a replacement when a consumer receives an empty string as its value.",
            "It provides a starting state when a provider changes its supplied value.",
            "It provides a fallback when a consumer has no matching provider above it.",
            "It provides a merged value when a consumer has nested providers above it."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usereducer-l1-s1-q10",
        "topicId": "react-usereducer",
        "set": 1,
        "environment": "react",
        "code": "import { useReducer } from 'react';\nfunction basket(state, action) {\n  if (action.type === 'add') return state + action.amount;\n  if (action.type === 'remove') return state - 1;\n  return state;\n}\nexport default function App() {\n  const [apples, dispatch] = useReducer(basket, 1);\n  return <>\n    <button onClick={() => dispatch({ type: 'add', amount: 3 })}>Add bag</button>\n    <button onClick={() => dispatch({ type: 'remove' })}>Eat apple</button>\n    <p>{apples}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Add bag\"); await click(\"Eat apple\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Add bag` once, then `Eat apple` once. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "3"
          ]
        },
        "partB": {
          "ask": "What should a reducer do when handling an action?",
          "options": [
            "A reducer should return an event handler from the current state and action.",
            "A reducer should return a setter function from the current state and action.",
            "A reducer should return a rendered element from the current state and action.",
            "A reducer should return the next state from the current state and action."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-memoization-l1-s1-q11",
        "topicId": "react-memoization",
        "set": 1,
        "environment": "react",
        "code": "import { useMemo, useState } from 'react';\nexport default function App() {\n  const [pages, setPages] = useState(4);\n  const [dark, setDark] = useState(false);\n  const sheets = useMemo(() => {\n    console.log('calculate');\n    return pages * 2;\n  }, [pages]);\n  return <>\n    <button onClick={() => setDark(value => !value)}>Change theme</button>\n    <button onClick={() => setPages(value => value + 1)}>Add page</button>\n    <p>{sheets} {dark ? 'dark' : 'light'}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Change theme\"); await click(\"Add page\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "After the first render, click `Change theme` once, then `Add page` once. How many times has `calculate` been logged in total? Answer with a number.",
          "accepted": [
            "2",
            "2 times"
          ]
        },
        "partB": {
          "ask": "What kind of value does `useCallback` cache between renders?",
          "options": [
            "It caches a function result according to its listed dependencies.",
            "It caches a function reference according to its listed dependencies.",
            "It caches a component state according to its listed dependencies.",
            "It caches a rendered element according to its listed dependencies."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain why the calculation runs during some of these renders.",
          "keyPoints": [
            "The first render runs the `useMemo` calculation.",
            "Changing `dark` leaves the `pages` dependency unchanged.",
            "Changing `pages` runs the calculation again."
          ],
          "modelAnswer": "The first render runs the calculation and logs `calculate`. Clicking `Change theme` changes `dark`, but `pages` stays the same. React reuses the cached calculation result during that render. Clicking `Add page` changes `pages`, so the calculation runs again, giving two log lines in total."
        }
      },
      {
        "id": "react-custom-hooks-l1-s1-q12",
        "topicId": "react-custom-hooks",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction useScore() {\n  const [score, setScore] = useState(0);\n  return [score, () => setScore(value => value + 1)];\n}\nfunction Player({ name }) {\n  const [score, addPoint] = useScore();\n  return <button onClick={addPoint}>{name}: {score}</button>;\n}\nexport default function App() {\n  return <><Player name=\"Red\" /><Player name=\"Blue\" /></>;\n}",
        "check": "(async () => { await click(\"Red: 0\"); await click(\"Red: 1\"); return text(\"button:last-child\"); })()",
        "partA": {
          "ask": "Click `Red: 0`, then the same button now labeled `Red: 1`. What is the full text on the other button?",
          "accepted": [
            "Blue: 0",
            "Blue:0"
          ]
        },
        "partB": {
          "ask": "Where should a custom hook be called inside a function component?",
          "options": [
            "Call the hook at top level before conditional returns.",
            "Call the hook inside an event handler after a user action.",
            "Call the hook inside a loop that visits the current entries.",
            "Call the hook inside an effect that follows the first render."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-lifting-state-l1-s1-q13",
        "topicId": "react-lifting-state",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Thermostat({ onWarm }) {\n  return <button onClick={onWarm}>Warm room</button>;\n}\nfunction Thermometer({ degrees }) {\n  return <p>{degrees} C</p>;\n}\nexport default function App() {\n  const [degrees, setDegrees] = useState(18);\n  return <>\n    <Thermostat onWarm={() => setDegrees(value => value + 2)} />\n    <Thermometer degrees={degrees} />\n  </>;\n}",
        "check": "(async () => { await click(\"Warm room\"); await click(\"Warm room\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After two clicks on `Warm room`, what text does `Thermometer` show? Answer with the full text.",
          "accepted": [
            "22 C",
            "22C"
          ]
        },
        "partB": {
          "ask": "How should a display value that can be derived from existing state usually be handled?",
          "options": [
            "Store the display value in another state alongside the existing state.",
            "Store the display value in a ref instead of reading the existing state.",
            "Calculate the display value during cleanup from the existing state.",
            "Calculate the display value during rendering from the existing state."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-forms-l1-s1-q14",
        "topicId": "react-forms",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [name, setName] = useState('');\n  const [message, setMessage] = useState('Not sent');\n  function send(event) {\n    event.preventDefault();\n    setMessage('Hello ' + name.trim());\n  }\n  return <form onSubmit={send}>\n    <input aria-label=\"Guest\" value={name} onChange={event => setName(event.target.value)} />\n    <button type=\"submit\">Send greeting</button>\n    <p>{message}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"  Guest  \"); await submit(); return text(\"p\"); })()",
        "partA": {
          "ask": "Type two spaces, `Guest`, then two spaces into the empty `input`, and submit the form once. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Hello Guest"
          ]
        },
        "partB": {
          "ask": "What does `defaultValue` specify for an uncontrolled text input?",
          "options": [
            "It specifies the initial input text while the DOM manages later edits.",
            "It specifies the current input text while React state manages later edits.",
            "It specifies the hint text while an empty input awaits later edits.",
            "It specifies the saved input text while form submission handles later edits."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-data-fetching-l1-s1-q15",
        "topicId": "react-data-fetching",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction readNotice() {\n  return new Promise(resolve => setTimeout(() => resolve('Open'), 20));\n}\nexport default function App() {\n  const [notice, setNotice] = useState('Loading');\n  useEffect(() => {\n    let active = true;\n    readNotice().then(result => { if (active) setNotice(result); });\n    return () => { active = false; };\n  }, []);\n  return <p>{notice === 'Loading' ? 'Please wait' : notice + ' today'}</p>;\n}",
        "check": "(async () => { await wait(40); return text(\"p\"); })()",
        "partA": {
          "ask": "After the component mounts and 40 ms pass, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Open today"
          ]
        },
        "partB": {
          "ask": "Why might a data-loading interface keep an error state?",
          "options": [
            "An error state lets the interface explain that a request started.",
            "An error state lets the interface explain that a request succeeded.",
            "An error state lets the interface explain that a request failed.",
            "An error state lets the interface explain that a request was cached."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-state-location-l1-s1-q16",
        "topicId": "react-state-location",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction ZoomControl() {\n  const [zoom, setZoom] = useState(1);\n  return <button onClick={() => setZoom(value => value + 1)}>Zoom: {zoom}</button>;\n}\nexport default function App() {\n  console.log('gallery');\n  return <main><h1>Gallery</h1><ZoomControl /></main>;\n}",
        "check": "(async () => { await click(\"Zoom: 1\"); await click(\"Zoom: 2\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "After the first render, click `Zoom: 1`, then the same button now labeled `Zoom: 2`. How many times has `gallery` been logged in total? Answer with a number.",
          "accepted": [
            "1",
            "1 time"
          ]
        },
        "partB": {
          "ask": "Where should a value needed by two sibling components usually be owned?",
          "options": [
            "Place the state in separate copies held within the siblings.",
            "Place the state in the nearest parent shared by the siblings.",
            "Place the state in a local variable outside the siblings.",
            "Place the state in separate refs held within the siblings."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain how the location of the state affects these renders.",
          "keyPoints": [
            "`App` logs `gallery` during its initial render.",
            "`ZoomControl` owns the `zoom` state.",
            "Updating `zoom` renders `ZoomControl` without rendering its parent."
          ],
          "modelAnswer": "`App` logs `gallery` once during its initial render. The `zoom` state belongs to `ZoomControl`. Both clicks update that child state and render the child again. These child updates do not cause `App` to render again, so there is one log line in total."
        }
      },
      {
        "id": "react-forwarding-refs-l1-s1-q17",
        "topicId": "react-forwarding-refs",
        "set": 1,
        "environment": "react",
        "code": "import { useRef } from 'react';\nfunction SearchField({ ref }) {\n  return <input ref={ref} aria-label=\"Find a trail\" />;\n}\nexport default function App() {\n  const field = useRef(null);\n  return <>\n    <SearchField ref={field} />\n    <button onClick={() => field.current.focus()}>Find trail</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Find trail\"); return focused(); })()",
        "partA": {
          "ask": "After one click on `Find trail`, which element has focus? Answer with its lowercase tag name.",
          "accepted": [
            "input"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `useImperativeHandle` when exposing a ref?",
          "options": [
            "It lets a child expose a specific set of methods to its parent.",
            "It lets a child expose its state setter as a context provider.",
            "It lets a child expose its event handlers as document listeners.",
            "It lets a child expose its render result as a server response."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-hoc-l1-s1-q18",
        "topicId": "react-hoc",
        "set": 1,
        "environment": "react",
        "code": "function withFee(Receipt) {\n  return function ChargedReceipt(props) {\n    return <Receipt {...props} fee={2} />;\n  };\n}\nfunction Rental({ hours, fee }) {\n  return <p>{hours * 3 + fee} credits</p>;\n}\nconst BilledRental = withFee(Rental);\nexport default function App() {\n  return <BilledRental hours={4} fee={8} />;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does `BilledRental` show? Answer with the full text.",
          "accepted": [
            "14 credits"
          ]
        },
        "partB": {
          "ask": "What does a higher-order component take as input and return?",
          "options": [
            "It takes a component and returns a state value with added behavior.",
            "It takes a component and returns a DOM element with added behavior.",
            "It takes a component and returns a component with expanded behavior.",
            "It takes a component and returns a new props object with added behavior."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usestate-l1-s1-q19",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [coins, setCoins] = useState(4);\n  function earn() {\n    setCoins(coins + 2);\n    console.log(coins);\n  }\n  return <><button onClick={earn}>Earn coins</button><p>{coins}</p></>;\n}",
        "check": "(async () => { await click(\"Earn coins\"); return logs(); })()",
        "partA": {
          "ask": "After one click on `Earn coins`, what number was logged by the handler? Answer with a number.",
          "accepted": [
            "4"
          ]
        },
        "partB": {
          "ask": "What is the purpose of passing an initializer function to `useState`?",
          "options": [
            "It supplies a calculation used when the component props are updated.",
            "It supplies a calculation used when the component state is initialized.",
            "It supplies a calculation used when the component state is replaced.",
            "It supplies a calculation used when the component output is removed."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-useeffect-l1-s1-q20",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [status, setStatus] = useState('Waiting');\n  useEffect(() => { setStatus('Ready'); }, []);\n  return <>\n    <button onClick={() => setStatus('Waiting')}>Reset sign</button>\n    <p>{status}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Reset sign\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After the first effect has changed the paragraph to `Ready`, click `Reset sign` once. What text does the paragraph show after that update finishes? Answer with one word.",
          "accepted": [
            "Waiting",
            "waiting"
          ]
        },
        "partB": {
          "ask": "When an effect reads a changing prop, how should its dependency list handle that prop?",
          "options": [
            "The dependency list should include a setter from another state.",
            "The dependency list should include the name of the parent component.",
            "The dependency list should include the output returned by the effect.",
            "The dependency list should include that prop used by the effect."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-lists-keys-l1-s1-q21",
        "topicId": "react-lists-keys",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [drawers, setDrawers] = useState([\n    { id: 'north', name: 'North' },\n    { id: 'south', name: 'South' }\n  ]);\n  return <>\n    <button onClick={() => setDrawers(current => [...current].reverse())}>Reverse drawers</button>\n    <ul>{drawers.map(drawer => <li key={drawer.id}>\n      <label>{drawer.name}<input defaultValue={drawer.name} /></label>\n    </li>)}</ul>\n  </>;\n}",
        "check": "(async () => { await type(\"li:first-child input\", \"Spare\"); await click(\"Reverse drawers\"); return value(\"li:last-child input\"); })()",
        "partA": {
          "ask": "Replace the first `input` value with `Spare`, then click `Reverse drawers` once. What value does the last `input` now contain? Answer with the exact text.",
          "accepted": [
            "Spare"
          ]
        },
        "partB": {
          "ask": "Where should the key go when a map returns a wrapper containing several child elements?",
          "options": [
            "Put the key on the outer wrapper returned from this map.",
            "Put the key on the first nested child inside the wrapper.",
            "Put the key on the parent list that surrounds the map.",
            "Put the key on the last nested child inside the wrapper."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usecontext-l1-s2-q01",
        "topicId": "react-usecontext",
        "set": 2,
        "environment": "react",
        "code": "import { createContext, memo, useContext, useState } from 'react';\nconst Season = createContext('winter');\nconst Forecast = memo(function Forecast() {\n  return <p>{useContext(Season)}</p>;\n});\nexport default function App() {\n  const [season, setSeason] = useState('spring');\n  return <Season value={season}>\n    <button onClick={() => setSeason('summer')}>Next season</button>\n    <Forecast />\n  </Season>;\n}",
        "check": "(async () => { await click(\"Next season\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Next season`, what text does `Forecast` show? Answer with one word.",
          "accepted": [
            "summer"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of context?",
          "options": [
            "Context supplies shared values through a chain of explicit callback props.",
            "Context supplies shared values through a matching provider in the tree.",
            "Context supplies shared values through a shared variable on the DOM root.",
            "Context supplies shared values through a new state copy in consuming components."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-usereducer-l1-s2-q02",
        "topicId": "react-usereducer",
        "set": 2,
        "environment": "react",
        "code": "import { useReducer } from 'react';\nfunction prepare(crates) {\n  return { bottles: crates * 4 };\n}\nfunction stock(state, action) {\n  if (action.type === 'sell') return { bottles: state.bottles - 1 };\n  return state;\n}\nexport default function App() {\n  const [supply, dispatch] = useReducer(stock, 3, prepare);\n  return <>\n    <button onClick={() => dispatch({ type: 'sell' })}>Sell bottle</button>\n    <p>{supply.bottles}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Sell bottle\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Sell bottle`, what number does the paragraph show? Answer with a number.",
          "accepted": [
            "11",
            "11 bottles"
          ]
        },
        "partB": {
          "ask": "What does the dispatch function returned by `useReducer` receive?",
          "options": [
            "It receives a replacement reducer describing the next update.",
            "It receives a dependency list describing the next update.",
            "It receives a rendered element describing the next update.",
            "It receives an action describing the requested state update."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-memoization-l1-s2-q03",
        "topicId": "react-memoization",
        "set": 2,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nconst Badge = memo(function Badge({ details }) {\n  console.log('badge');\n  return <p>{details.title}</p>;\n});\nexport default function App() {\n  const [visits, setVisits] = useState(0);\n  return <>\n    <button onClick={() => setVisits(visits + 1)}>Visit exhibit</button>\n    <span>{visits}</span>\n    <Badge details={{ title: 'Sculpture' }} />\n  </>;\n}",
        "check": "(async () => { await click(\"Visit exhibit\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "After the initial render and one click on `Visit exhibit`, how many times has `badge` been logged in total? Answer with a number.",
          "accepted": [
            "2",
            "2 times"
          ]
        },
        "partB": {
          "ask": "Which kind of work is suitable for a `useMemo` calculation?",
          "options": [
            "A suitable calculation computes a filtered result from current input values.",
            "A suitable calculation starts a network request from current input values.",
            "A suitable calculation changes a DOM property from current input values.",
            "A suitable calculation updates a parent state from current input values."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-custom-hooks-l1-s2-q04",
        "topicId": "react-custom-hooks",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction useLatch(initiallyOpen) {\n  const [open, setOpen] = useState(initiallyOpen);\n  return { label: open ? 'Unlocked' : 'Locked', flip: () => setOpen(v => !v) };\n}\nexport default function App() {\n  const latch = useLatch(true);\n  return <>\n    <button onClick={latch.flip}>Turn latch</button>\n    <p>{latch.label}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Turn latch\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Turn latch`, what text does the paragraph show? Answer with one word.",
          "accepted": [
            "Locked",
            "locked"
          ]
        },
        "partB": {
          "ask": "What does extracting logic into a custom hook let components reuse?",
          "options": [
            "It lets components reuse a DOM subtree across separate component instances.",
            "It lets components reuse a state instance across separate component instances.",
            "It lets components reuse stateful logic across separate component instances.",
            "It lets components reuse a props object across separate component instances."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-lifting-state-l1-s2-q05",
        "topicId": "react-lifting-state",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Cabin({ name, selected, choose }) {\n  return <button onClick={choose}>{name}: {selected ? 'Chosen' : 'Available'}</button>;\n}\nexport default function App() {\n  const [chosen, setChosen] = useState('Pine');\n  return <>\n    <Cabin name=\"Pine\" selected={chosen === 'Pine'} choose={() => setChosen('Pine')} />\n    <Cabin name=\"Cedar\" selected={chosen === 'Cedar'} choose={() => setChosen('Cedar')} />\n  </>;\n}",
        "check": "(async () => { await click(\"Cedar: Available\"); return text(\"button:first-child\"); })()",
        "partA": {
          "ask": "Click `Cedar: Available` once. What is the full text on the first button afterward?",
          "accepted": [
            "Pine: Available",
            "Pine:Available"
          ]
        },
        "partB": {
          "ask": "What is meant by a single source of truth for shared state?",
          "options": [
            "It means one owner holds the value that related components read.",
            "It means one owner holds separate copies that related components edit.",
            "It means one owner holds DOM copies that related components inspect.",
            "It means one owner holds the initial value that related components copy."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-forms-l1-s2-q06",
        "topicId": "react-forms",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [seed, setSeed] = useState('Map');\n  return <>\n    <input aria-label=\"Notebook title\" defaultValue={seed} />\n    <button onClick={() => setSeed('Diary')}>Change suggestion</button>\n    <p>{seed}</p>\n  </>;\n}",
        "check": "(async () => { await type(\"input\", \"Notes\"); await click(\"Change suggestion\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the `input` text with `Notes`, then click `Change suggestion` once. What text remains in the `input`? Answer with the exact text.",
          "accepted": [
            "Notes"
          ]
        },
        "partB": {
          "ask": "What makes a text input controlled by React?",
          "options": [
            "Its displayed value comes from placeholder text supplied during rendering.",
            "Its displayed value comes from a ref object supplied during rendering.",
            "Its displayed value comes from an initial default supplied during rendering.",
            "Its displayed value comes from the value prop supplied during rendering."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-data-fetching-l1-s2-q07",
        "topicId": "react-data-fetching",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction loadSchedule() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => reject(new Error('Offline')), 20);\n  });\n}\nexport default function App() {\n  const [message, setMessage] = useState('Loading');\n  useEffect(() => {\n    loadSchedule().then(() => setMessage('Timetable ready'))\n      .catch(error => setMessage('Cannot load: ' + error.message));\n  }, []);\n  return <p>{message}</p>;\n}",
        "check": "(async () => { await wait(40); return text(\"p\"); })()",
        "partA": {
          "ask": "After the component mounts and 40 ms pass, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Cannot load: Offline"
          ]
        },
        "partB": {
          "ask": "Why can cleanup be useful when loading data in an effect?",
          "options": [
            "Cleanup can prevent an outdated request from using a cached server response.",
            "Cleanup can prevent an outdated response from updating the current screen.",
            "Cleanup can prevent an outdated response from reaching the network connection.",
            "Cleanup can prevent an outdated request from needing a loading indicator."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-state-location-l1-s2-q08",
        "topicId": "react-state-location",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction PencilCase({ start }) {\n  const [pencils, setPencils] = useState(start);\n  return <button onClick={() => setPencils(pencils + 1)}>Pencils: {pencils}</button>;\n}\nexport default function App() {\n  const [start, setStart] = useState(2);\n  return <>\n    <button onClick={() => setStart(7)}>Change starting supply</button>\n    <PencilCase start={start} />\n  </>;\n}",
        "check": "(async () => { await click(\"Pencils: 2\"); await click(\"Change starting supply\"); return text(\"button:last-child\"); })()",
        "partA": {
          "ask": "Click `Pencils: 2` once, then `Change starting supply` once. What is the full text on the last button?",
          "accepted": [
            "Pencils: 3",
            "Pencils:3"
          ]
        },
        "partB": {
          "ask": "Which value is usually a good candidate for local component state?",
          "options": [
            "A good candidate is a value that several distant views must edit together.",
            "A good candidate is a value that the parent must use to compute its output.",
            "A good candidate is a value that one component needs for its own interaction.",
            "A good candidate is a value that two sibling views must keep synchronized."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-stale-closures-l1-s2-q09",
        "topicId": "react-stale-closures",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [height, setHeight] = useState(4);\n  const [saved, setSaved] = useState(null);\n  const [report, setReport] = useState('Empty');\n  return <>\n    <button onClick={() => setSaved(() => () => setReport(String(height)))}>Save reading</button>\n    <button onClick={() => setHeight(h => h + 3)}>Grow plant</button>\n    <button onClick={() => saved?.()}>Show reading</button>\n    <p>{report}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Save reading\"); await click(\"Grow plant\"); await click(\"Show reading\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Save reading`, then `Grow plant`, then `Show reading`, once each. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "4"
          ]
        },
        "partB": {
          "ask": "When updating a counter from its previous value, what does a functional state updater receive?",
          "options": [
            "It receives the pending state value from the update queue.",
            "It receives the event object from the latest click handler.",
            "It receives the initial state value from the initial render.",
            "It receives the setter function from the current component."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain why the saved reading differs from the current `height`.",
          "keyPoints": [
            "`Save reading` stores a callback created while `height` is `4`.",
            "`Grow plant` changes `height` to `7` in a later render.",
            "The stored callback still reads the earlier render's `height`."
          ],
          "modelAnswer": "`Save reading` stores a callback from the render where `height` is `4`. Clicking `Grow plant` changes `height` to `7` and renders the component again. The callback held in `saved` is still the earlier callback. Clicking `Show reading` calls it, so it writes `4` into `report`."
        }
      },
      {
        "id": "react-reconciliation-l1-s2-q10",
        "topicId": "react-reconciliation",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Sketchpad() {\n  const [marks, setMarks] = useState(1);\n  return <button onClick={() => setMarks(marks + 1)}>Marks: {marks}</button>;\n}\nexport default function App() {\n  const [page, setPage] = useState('front');\n  return <>\n    <button onClick={() => setPage('back')}>Turn page</button>\n    <Sketchpad key={page} />\n  </>;\n}",
        "check": "(async () => { await click(\"Marks: 1\"); await click(\"Turn page\"); return text(\"button:last-child\"); })()",
        "partA": {
          "ask": "Click `Marks: 1` once, then `Turn page` once. What is the full text on the last button?",
          "accepted": [
            "Marks: 1",
            "Marks:1"
          ]
        },
        "partB": {
          "ask": "What does reconciliation help React decide?",
          "options": [
            "It helps React decide which component props should become stored state.",
            "It helps React decide which event handlers should run after an update.",
            "It helps React decide which component functions should become cached data.",
            "It helps React decide which existing DOM nodes should be reused or replaced."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-rerenders-l1-s2-q11",
        "topicId": "react-rerenders",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Switchboard({ children }) {\n  const [lit, setLit] = useState(false);\n  console.log('board');\n  return <section>\n    <button onClick={() => setLit(!lit)}>Flip light</button>\n    <p>{lit ? 'Lit' : 'Dim'}</p>\n    {children}\n  </section>;\n}\nfunction Legend() {\n  console.log('legend');\n  return <small>Room lights</small>;\n}\nexport default function App() {\n  return <Switchboard><Legend /></Switchboard>;\n}",
        "check": "(async () => { await click(\"Flip light\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click `Flip light` once. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "board,legend,board"
          ]
        },
        "partB": {
          "ask": "What is a common reason for a component to re-render?",
          "options": [
            "A common reason is a local variable change inside a component event handler.",
            "A common reason is a state update requested through the component setter.",
            "A common reason is a DOM text change outside the component tree.",
            "A common reason is a mutable ref change inside a component event handler."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain why `Legend` does not log again after this click.",
          "keyPoints": [
            "`App` creates the child element passed to `Switchboard`.",
            "Updating `lit` renders `Switchboard` again without rendering `App`.",
            "`Switchboard` receives the same `children` element, letting React reuse its output."
          ],
          "modelAnswer": "The initial render logs `board` and then `legend`. The click changes `lit`, which belongs to `Switchboard`. This renders `Switchboard` again, but does not render `App` again. The `children` element created by `App` stays the same, so React reuses that child output and the final log is `board`."
        }
      },
      {
        "id": "react-performance-l1-s2-q12",
        "topicId": "react-performance",
        "set": 2,
        "environment": "react",
        "code": "import { lazy, Suspense } from 'react';\nconst Recipe = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Mix flour</p> }), 20);\n}));\nexport default function App() {\n  return <Suspense fallback={<p>Opening recipe</p>}>\n    <Recipe />\n  </Suspense>;\n}",
        "check": "(async () => { await wait(40); return text(\"p\"); })()",
        "partA": {
          "ask": "After the component mounts and 40 ms pass, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Mix flour"
          ]
        },
        "partB": {
          "ask": "What is the purpose of React Profiler?",
          "options": [
            "It helps measure the download sizes of component source code.",
            "It helps measure the network delays of component data requests.",
            "It helps measure the rendering costs of component subtree updates.",
            "It helps measure the storage sizes of component state objects."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-composition-l1-s2-q13",
        "topicId": "react-composition",
        "set": 2,
        "environment": "react",
        "code": "function Meter({ amount, children }) {\n  return <section>{children(amount * 2)}</section>;\n}\nexport default function App() {\n  return <Meter amount={3}>\n    {reading => <p>{reading + 1} units</p>}\n  </Meter>;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "7 units"
          ]
        },
        "partB": {
          "ask": "What does the `children` prop usually let a wrapper component receive?",
          "options": [
            "It lets the wrapper receive a DOM query describing nearby sibling nodes.",
            "It lets the wrapper receive a state setter belonging to its parent component.",
            "It lets the wrapper receive a context object describing its ancestor providers.",
            "It lets the wrapper receive the child content nested inside its JSX tags."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-error-boundaries-l1-s2-q14",
        "topicId": "react-error-boundaries",
        "set": 2,
        "environment": "react",
        "code": "import { Component, useState } from 'react';\nclass Guard extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() { return this.state.failed ? <p>Preview unavailable</p> : this.props.children; }\n}\nfunction Preview({ broken }) {\n  if (broken) throw new Error('Invalid drawing');\n  return <p>Drawing ready</p>;\n}\nexport default function App() {\n  const [broken, setBroken] = useState(false);\n  return <>\n    <button onClick={() => setBroken(true)}>Break preview</button>\n    <Guard><Preview broken={broken} /></Guard>\n  </>;\n}",
        "check": "(async () => { await click(\"Break preview\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Break preview`, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Preview unavailable"
          ]
        },
        "partB": {
          "ask": "Which error generally needs handling outside an error boundary?",
          "options": [
            "An error thrown while a nested child calculates its rendered output.",
            "An error thrown inside a user click handler during an interaction.",
            "An error thrown while a nested child initializes its component state.",
            "An error thrown inside a nested child constructor during initial mounting."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain how the rendering error leads to the displayed message.",
          "keyPoints": [
            "`Break preview` sets `broken` to `true`.",
            "`Preview` throws while rendering beneath `Guard`.",
            "`Guard` changes `failed` to `true` and renders its fallback."
          ],
          "modelAnswer": "Clicking `Break preview` sets `broken` to `true`. On the next render, `Preview` throws an error instead of returning its paragraph. The enclosing `Guard` handles the rendering error through `getDerivedStateFromError`. Its `failed` state becomes `true`, so it displays `Preview unavailable`."
        }
      },
      {
        "id": "react-router-l1-s2-q15",
        "topicId": "react-router",
        "set": 2,
        "environment": "react",
        "code": "import { MemoryRouter, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';\nfunction Library() {\n  return <main><h1>Library</h1><Outlet /></main>;\n}\nfunction Shelf() {\n  const { shelf } = useParams();\n  return <p>Shelf {shelf.toUpperCase()}</p>;\n}\nexport default function App() {\n  return <MemoryRouter initialEntries={['/library']}>\n    <Link to=\"/library/maps\">Browse maps</Link>\n    <Routes>\n      <Route path=\"library\" element={<Library />}>\n        <Route path=\":shelf\" element={<Shelf />} />\n      </Route>\n    </Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Browse maps\"); return text(\"main p\"); })()",
        "partA": {
          "ask": "After one click on `Browse maps`, what text appears in the paragraph inside `main`? Answer with the full text.",
          "accepted": [
            "Shelf MAPS"
          ]
        },
        "partB": {
          "ask": "What does `MemoryRouter` use to keep navigation history?",
          "options": [
            "It keeps route history in memory within the running application.",
            "It keeps route history in the query string of the browser address.",
            "It keeps route history in a cookie shared with the web server.",
            "It keeps route history in the fragment of the browser address."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-portals-fragments-l1-s2-q16",
        "topicId": "react-portals-fragments",
        "set": 2,
        "environment": "react",
        "code": "import { createPortal } from 'react-dom';\nexport default function App() {\n  return <section onClick={() => console.log('stage')}>\n    {createPortal(\n      <button onClick={() => console.log('spotlight')}>Light stage</button>,\n      document.body\n    )}\n  </section>;\n}",
        "check": "(async () => { await click(\"Light stage\"); return logs(); })()",
        "partA": {
          "ask": "After one click on `Light stage`, what is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "spotlight,stage"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of a Fragment?",
          "options": [
            "A Fragment groups sibling elements and adds a hidden wrapper to the DOM.",
            "A Fragment groups sibling elements and adds a shared state owner.",
            "A Fragment groups sibling elements and adds no wrapper to the DOM.",
            "A Fragment groups sibling elements and adds a separate portal target node."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-concurrent-hooks-l1-s2-q17",
        "topicId": "react-concurrent-hooks",
        "set": 2,
        "environment": "react",
        "code": "import { useId } from 'react';\nfunction AddressField({ title }) {\n  const id = useId();\n  return <div><label htmlFor={id}>{title}</label><input id={id} name={title} /></div>;\n}\nexport default function App() {\n  return <>\n    <AddressField title=\"Pickup\" />\n    <AddressField title=\"Delivery\" />\n  </>;\n}",
        "check": "(async () => attr(\"input[name=Pickup]\", \"id\") !== attr(\"input[name=Delivery]\", \"id\"))()",
        "partA": {
          "ask": "On the first render, do the two `input` elements have different `id` values? Answer yes or no.",
          "accepted": [
            "yes",
            "true"
          ]
        },
        "partB": {
          "ask": "What does `useTransition` let an application mark?",
          "options": [
            "It lets an application mark a CSS animation as a background state update.",
            "It lets an application mark a network request as a background state update.",
            "It lets an application mark a DOM event as a background state update.",
            "It lets an application mark rendering work as a non-urgent state update."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-19-actions-l1-s2-q18",
        "topicId": "react-19-actions",
        "set": 2,
        "environment": "react",
        "code": "import { useActionState } from 'react';\nexport default function App() {\n  const [receipt, reserve] = useActionState((previous, formData) => {\n    return 'Reserved ' + (Number(formData.get('seats')) + 1);\n  }, 'No reservation');\n  return <form action={reserve}>\n    <input name=\"seats\" aria-label=\"Extra seats\" defaultValue=\"0\" />\n    <button type=\"submit\">Reserve seats</button>\n    <p>{receipt}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"2\"); await submit(); return text(\"p\"); })()",
        "partA": {
          "ask": "Replace the `input` text with `2`, then submit the form once and let the action finish. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Reserved 3"
          ]
        },
        "partB": {
          "ask": "What does the pending flag returned by `useActionState` describe?",
          "options": [
            "It describes whether an action is currently in progress.",
            "It describes whether a form input currently has focus.",
            "It describes whether an action has returned an error.",
            "It describes whether a form input has changed value."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usestate-l1-s2-q19",
        "topicId": "react-usestate",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [cargo, setCargo] = useState({ weight: 6 });\n  function pack() {\n    cargo.weight += 2;\n    setCargo(cargo);\n  }\n  return <><button onClick={pack}>Pack crate</button><p>{cargo.weight}</p></>;\n}",
        "check": "(async () => { await click(\"Pack crate\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Pack crate`, with no other updates, what number remains visible in the paragraph? Answer with a number.",
          "accepted": [
            "6"
          ]
        },
        "partB": {
          "ask": "What does a state setter schedule when it receives a different state value?",
          "options": [
            "It schedules an edit to the DOM performed by the setter itself.",
            "It schedules a change to the props received by the parent component.",
            "It schedules a new render using the updated local component state.",
            "It schedules a replacement of the component by a new instance."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-useeffect-l1-s2-q20",
        "topicId": "react-useeffect",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [stamps, setStamps] = useState(0);\n  useEffect(() => {\n    console.log('inspect');\n  });\n  return <button onClick={() => setStamps(stamps + 1)}>Stamp envelope</button>;\n}",
        "check": "(async () => { await click(\"Stamp envelope\"); await click(\"Stamp envelope\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "After the initial effect runs, click `Stamp envelope` twice, letting each update finish. How many times has `inspect` been logged in total? Answer with a number.",
          "accepted": [
            "3",
            "3 times"
          ]
        },
        "partB": {
          "ask": "What should effect cleanup do for a document event listener added by that effect?",
          "options": [
            "Cleanup should move the listener to the parent of the current component.",
            "Cleanup should remove the same document listener added by that effect.",
            "Cleanup should call the listener with the next component state value.",
            "Cleanup should store the listener inside the current component state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-useref-l1-s2-q21",
        "topicId": "react-useref",
        "set": 2,
        "environment": "react",
        "code": "import { useRef } from 'react';\nexport default function App() {\n  const editor = useRef(null);\n  return <>\n    <textarea ref={editor} aria-label=\"Travel journal\" defaultValue=\"Trip\" />\n    <button onClick={() => {\n      editor.current.value += '!';\n      editor.current.focus();\n    }}>Mark journal</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Mark journal\"); await click(\"Mark journal\"); return value(\"textarea\"); })()",
        "partA": {
          "ask": "After two clicks on `Mark journal`, what text does the `textarea` contain? Answer with the exact text.",
          "accepted": [
            "Trip!!"
          ]
        },
        "partB": {
          "ask": "What value is held in a DOM ref after its element is removed from the tree?",
          "options": [
            "The ref holds the removed element as an empty DOM node.",
            "The ref holds the parent element as its replacement DOM node.",
            "The ref holds the previous element as a detached DOM node.",
            "The ref holds `null` in place of the removed DOM node."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-jsx-rendering-l1-s3-q01",
        "topicId": "react-jsx-rendering",
        "set": 3,
        "environment": "react",
        "code": "import { Fragment } from 'react';\nexport default function App() {\n  const stops = ['hill', 'lake', 'wood'];\n  return <section>{stops.map(stop =>\n    <Fragment key={stop}>\n      <span>{stop}</span><span>Rest here</span>\n    </Fragment>\n  )}</section>;\n}",
        "check": "(async () => { return count(\"section > span\"); })()",
        "partA": {
          "ask": "On the first render, how many `span` elements are direct children of `section`? Answer with a number.",
          "accepted": [
            "6",
            "6 spans",
            "6 elements"
          ]
        },
        "partB": {
          "ask": "What is the purpose of braces around an expression in JSX?",
          "options": [
            "They let JSX use a JavaScript expression as static text copied directly into markup.",
            "They let JSX use a JavaScript expression as a DOM attribute name written without quotes.",
            "They let JSX use a JavaScript expression as dynamic content within markup.",
            "They let JSX use a JavaScript expression as a stylesheet rule applied to a DOM element."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-components-props-l1-s3-q02",
        "topicId": "react-components-props",
        "set": 3,
        "environment": "react",
        "code": "function Echo({ children }) {\n  return <p>{children} / {children}</p>;\n}\nfunction Announcement({ word }) {\n  return <Echo>{word.toUpperCase()}</Echo>;\n}\nexport default function App() {\n  return <Announcement word=\"go\" />;\n}",
        "check": "(async () => { return text(\"p\"); })()",
        "partA": {
          "ask": "On the first render, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "GO / GO",
            "GO/GO"
          ]
        },
        "partB": {
          "ask": "How should a component treat an object received through props?",
          "options": [
            "It should treat the object as input to leave unchanged while calculating its next output.",
            "It should treat the object as local state while applying further changes to its fields.",
            "It should treat the object as shared storage while recording its render count.",
            "It should treat the object as a DOM node while applying changes to its content."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-lists-keys-l1-s3-q03",
        "topicId": "react-lists-keys",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [flavors, setFlavors] = useState(['Mint', 'Peach']);\n  return <>\n    <button onClick={() => setFlavors(list => list.slice(1))}>Remove first flavor</button>\n    <ul>{flavors.map((flavor, index) =>\n      <li key={index}><label>{flavor}<input defaultValue={flavor} /></label></li>\n    )}</ul>\n  </>;\n}",
        "check": "(async () => { await type(\"input\", \"Cocoa\"); await click(\"Remove first flavor\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the first `input` value with `Cocoa`, then click `Remove first flavor` once. What value does the remaining `input` contain? Answer with the exact text.",
          "accepted": [
            "Cocoa"
          ]
        },
        "partB": {
          "ask": "Where must keys be unique when several lists appear in one component?",
          "options": [
            "Keys must be unique among elements rendered anywhere in the application.",
            "Keys must be unique among elements rendered with the same component type.",
            "Keys must be unique among elements rendered with matching prop values.",
            "Keys must be unique among sibling elements rendered together within the same list."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-conditional-rendering-l1-s3-q04",
        "topicId": "react-conditional-rendering",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [unread, setUnread] = useState(2);\n  return <>\n    <button onClick={() => setUnread(0)}>Read messages</button>\n    <p>{unread && <strong>Unread mail</strong>}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Read messages\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Read messages`, what text does the paragraph show? Answer with the exact text.",
          "accepted": [
            "0"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of an early return in a component?",
          "options": [
            "It lets a component postpone its event handlers until the next render.",
            "It lets a component choose its output before reaching the final return.",
            "It lets a component preserve its previous props before the next render.",
            "It lets a component delay its state updates until after its main return."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-events-l1-s3-q05",
        "topicId": "react-events",
        "set": 3,
        "environment": "react",
        "code": "export default function App() {\n  return <div onClick={() => console.log('hall')}>\n    <button onClick={event => {\n      event.stopPropagation();\n      console.log('knock');\n    }}>Knock on door</button>\n  </div>;\n}",
        "check": "(async () => { await click(\"Knock on door\"); return logs(); })()",
        "partA": {
          "ask": "After one click on `Knock on door`, what console text is logged? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "knock"
          ]
        },
        "partB": {
          "ask": "What does passing a function to an event prop let React do?",
          "options": [
            "It lets React use the function result as the initial DOM text content.",
            "It lets React use the function body as the initial component state value.",
            "It lets React use the function name as the matching native DOM event type.",
            "It lets React call the function when the matching event occurs."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-usestate-l1-s3-q06",
        "topicId": "react-usestate",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [floors, setFloors] = useState(3);\n  function ride() {\n    setFloors(floors + 2);\n    setFloors(floors + 2);\n  }\n  return <><button onClick={ride}>Ride lift</button><p>{floors}</p></>;\n}",
        "check": "(async () => { await click(\"Ride lift\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Ride lift`, what number does the paragraph show? Answer with a number.",
          "accepted": [
            "5",
            "5 floors"
          ]
        },
        "partB": {
          "ask": "Where should a component call `useState`?",
          "options": [
            "It should call `useState` inside an event handler that needs stored data.",
            "It should call `useState` inside a condition that checks the received props.",
            "It should call `useState` at the function's top level before early returns.",
            "It should call `useState` inside a loop that builds the rendered child list."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-useeffect-l1-s3-q07",
        "topicId": "react-useeffect",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [volume, setVolume] = useState(1);\n  const [muted, setMuted] = useState(false);\n  useEffect(() => { console.log('sync'); }, [volume]);\n  return <>\n    <button onClick={() => setMuted(value => !value)}>Toggle mute</button>\n    <button onClick={() => setVolume(value => value + 1)}>Raise volume</button>\n    <p>{muted ? 'Muted' : volume}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Toggle mute\"); await click(\"Raise volume\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "After the initial effect runs, click `Toggle mute`, then `Raise volume`, once each, letting each update finish. How many times has `sync` been logged in total? Answer with a number.",
          "accepted": [
            "2",
            "2 times"
          ]
        },
        "partB": {
          "ask": "Which value can an effect return to React?",
          "options": [
            "It can return a cleanup function that reverses work started by that effect's setup.",
            "It can return a JSX element that becomes the visible output of its component.",
            "It can return a state object that becomes the initial value of its next render.",
            "It can return a prop object that becomes the input of its parent component."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain which updates make the effect run in this example.",
          "keyPoints": [
            "The effect runs after the initial mount.",
            "`Toggle mute` changes `muted`, which is absent from the dependency list.",
            "`Raise volume` changes `volume`, which is present in the dependency list."
          ],
          "modelAnswer": "The effect first logs `sync` after mounting. Clicking `Toggle mute` changes `muted` and renders `App` again. The effect does not run for that update because `volume` has not changed. Clicking `Raise volume` changes `volume`, so the effect logs `sync` again."
        }
      },
      {
        "id": "react-useref-l1-s3-q08",
        "topicId": "react-useref",
        "set": 3,
        "environment": "react",
        "code": "import { useRef, useState } from 'react';\nexport default function App() {\n  const badge = useRef(null);\n  const [visible, setVisible] = useState(true);\n  return <>\n    {visible && <input ref={badge} aria-label=\"Badge name\" />}\n    <button onClick={() => setVisible(false)}>Remove badge</button>\n    <button onClick={() => console.log(badge.current === null ? 'gone' : 'here')}>Inspect badge</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Remove badge\"); await click(\"Inspect badge\"); return logs(); })()",
        "partA": {
          "ask": "Click `Remove badge`, then `Inspect badge`, once each, letting the removal finish first. What word is logged? Answer with one word.",
          "accepted": [
            "gone"
          ]
        },
        "partB": {
          "ask": "Which kind of value is a useful candidate for a ref rather than state?",
          "options": [
            "A useful candidate is a status message that determines the visible page text.",
            "A useful candidate is a timer handle which does not determine rendered output.",
            "A useful candidate is a selected option that determines the visible page title.",
            "A useful candidate is a search phrase that determines the displayed result list."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-stale-closures-l1-s3-q09",
        "topicId": "react-stale-closures",
        "set": 3,
        "environment": "react",
        "code": "import { useRef, useState } from 'react';\nexport default function App() {\n  const latest = useRef(4);\n  const [reader, setReader] = useState(null);\n  return <>\n    <button onClick={() => setReader(() => () => console.log(latest.current))}>Save reader</button>\n    <button onClick={() => { latest.current += 3; }}>Advance dial</button>\n    <button onClick={() => reader?.()}>Read dial</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Save reader\"); await click(\"Advance dial\"); await click(\"Read dial\"); return logs(); })()",
        "partA": {
          "ask": "Click `Save reader`, `Advance dial`, then `Read dial`, once each. What number is logged? Answer with a number.",
          "accepted": [
            "7"
          ]
        },
        "partB": {
          "ask": "What is a closure in JavaScript?",
          "options": [
            "It is a function together with a private copy of the rendered DOM tree.",
            "It is a function together with the pending updates of its parent component.",
            "It is a function together with access to its enclosing lexical scope.",
            "It is a function together with the event listeners of its rendered DOM node."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-reconciliation-l1-s3-q10",
        "topicId": "react-reconciliation",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction RoughCopy() {\n  return <input aria-label=\"Rough copy\" defaultValue=\"Start\" />;\n}\nfunction CleanCopy() {\n  return <input aria-label=\"Clean copy\" defaultValue=\"Start\" />;\n}\nexport default function App() {\n  const [clean, setClean] = useState(false);\n  return <>\n    <button onClick={() => setClean(true)}>Use clean copy</button>\n    {clean ? <CleanCopy /> : <RoughCopy />}\n  </>;\n}",
        "check": "(async () => { await type(\"input\", \"Revised\"); await click(\"Use clean copy\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the `input` value with `Revised`, then click `Use clean copy` once. What value does the `input` contain afterward? Answer with the exact text.",
          "accepted": [
            "Start"
          ]
        },
        "partB": {
          "ask": "What does the term virtual DOM refer to in React?",
          "options": [
            "It refers to a hidden browser document that stores a second live page.",
            "It refers to a browser event queue that stores pending user interactions.",
            "It refers to a CSS layout cache that stores measured element positions.",
            "It refers to an in-memory description of the expected page's interface."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain why the typed value changes even though the two components return similar `input` elements.",
          "keyPoints": [
            "`RoughCopy` and `CleanCopy` are different component types.",
            "Switching types removes the old subtree and mounts a new subtree.",
            "The new uncontrolled `input` starts with its own `defaultValue`."
          ],
          "modelAnswer": "Typing changes the uncontrolled `input` inside `RoughCopy` to `Revised`. The click replaces `RoughCopy` with the different component type `CleanCopy`. React removes the previous subtree and mounts a new one. The new `input` therefore starts with `Start` from its `defaultValue`."
        }
      },
      {
        "id": "react-rerenders-l1-s3-q11",
        "topicId": "react-rerenders",
        "set": 3,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nconst Plaque = memo(function Plaque({ title }) {\n  console.log('plaque');\n  return <p>{title}</p>;\n});\nexport default function App() {\n  const [visitors, setVisitors] = useState(0);\n  console.log('foyer');\n  return <>\n    <button onClick={() => setVisitors(value => value + 1)}>Count visitor</button>\n    <span>{visitors}</span><Plaque title=\"Bronze\" />\n  </>;\n}",
        "check": "(async () => { await click(\"Count visitor\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click `Count visitor` once. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "foyer,plaque,foyer"
          ]
        },
        "partB": {
          "ask": "What is a useful first step before adding render optimizations?",
          "options": [
            "A useful first step is to move changing state values into module variables.",
            "A useful first step is to measure which component updates cost noticeable rendering time.",
            "A useful first step is to wrap short event handlers in extra component functions.",
            "A useful first step is to replace state updates with direct DOM text changes."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-performance-l1-s3-q12",
        "topicId": "react-performance",
        "set": 3,
        "environment": "react",
        "code": "import { Profiler, useState } from 'react';\nfunction record(id, phase) { console.log(phase); }\nexport default function App() {\n  const [tickets, setTickets] = useState(1);\n  return <Profiler id=\"kiosk\" onRender={record}>\n    <button onClick={() => setTickets(value => value + 1)}>Print ticket</button>\n    <p>{tickets}</p>\n  </Profiler>;\n}",
        "check": "(async () => { await click(\"Print ticket\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial mount, then click `Print ticket` once. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "mount,update"
          ]
        },
        "partB": {
          "ask": "What does code splitting with `lazy` help an application do?",
          "options": [
            "It helps an application load its component code when that component is needed.",
            "It helps an application move component state into persistent browser storage.",
            "It helps an application move component rendering into a background worker.",
            "It helps an application load component styles from browser layout measurements."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-composition-l1-s3-q13",
        "topicId": "react-composition",
        "set": 3,
        "environment": "react",
        "code": "import { createContext, useContext, useState } from 'react';\nconst Choice = createContext(null);\nfunction Menu({ children }) {\n  const [selected, select] = useState('soup');\n  return <Choice value={{ selected, select }}>{children}</Choice>;\n}\nfunction MenuOption({ name }) {\n  const { select } = useContext(Choice);\n  return <button onClick={() => select(name)}>{name}</button>;\n}\nfunction MenuSummary() {\n  const { selected } = useContext(Choice);\n  return <p>{selected.toUpperCase()} chosen</p>;\n}\nexport default function App() {\n  return <Menu>\n    <MenuOption name=\"soup\" /><MenuOption name=\"salad\" />\n    <MenuSummary />\n  </Menu>;\n}",
        "check": "(async () => { await click(\"salad\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `salad`, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "SALAD chosen"
          ]
        },
        "partB": {
          "ask": "What is the purpose of composition in React?",
          "options": [
            "It lets components combine by copying their state into a shared module.",
            "It lets components combine by inheriting their markup from a base class.",
            "It lets components combine by arranging smaller pieces together.",
            "It lets components combine by joining their source into a single function."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain how `MenuOption` changes the content rendered by `MenuSummary`.",
          "keyPoints": [
            "`Menu` owns the `selected` state and provides it with `select` through `Choice`.",
            "`MenuOption` reads `select` from context and calls it with its `name`.",
            "`MenuSummary` reads the updated `selected` value from the same context."
          ],
          "modelAnswer": "`Menu` owns `selected` and shares it and `select` through `Choice`. The `salad` button calls `select` with its `name`. This updates the shared value and renders the consumers again. `MenuSummary` reads `salad`, converts it to uppercase, and adds `chosen`."
        }
      },
      {
        "id": "react-error-boundaries-l1-s3-q14",
        "topicId": "react-error-boundaries",
        "set": 3,
        "environment": "react",
        "code": "import { Component, useState } from 'react';\nclass SafetyNet extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() { return this.state.failed ? <p>Tool offline</p> : this.props.children; }\n}\nfunction Engraving({ damaged }) {\n  if (damaged) throw new Error('Damaged plate');\n  return <p>Lines {3 + 5}</p>;\n}\nexport default function App() {\n  const [damaged, setDamaged] = useState(true);\n  const [attempt, setAttempt] = useState(0);\n  return <>\n    <button onClick={() => setDamaged(false)}>Repair plate</button>\n    <button onClick={() => setAttempt(value => value + 1)}>Retry tool</button>\n    <SafetyNet key={attempt}><Engraving damaged={damaged} /></SafetyNet>\n  </>;\n}",
        "check": "(async () => { await click(\"Repair plate\"); await click(\"Retry tool\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After the initial error fallback appears, click `Repair plate`, then `Retry tool`, once each. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Lines 8",
            "Lines: 8"
          ]
        },
        "partB": {
          "ask": "What is the purpose of placing separate error boundaries around separate panels?",
          "options": [
            "They let a page keep the working panels visible when another panel fails to render.",
            "They let a page keep failing event handlers running when another panel is clicked.",
            "They let a page keep failed requests retrying when another panel receives new props.",
            "They let a page keep failing child renders running when another panel updates state."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-router-l1-s3-q15",
        "topicId": "react-router",
        "set": 3,
        "environment": "react",
        "code": "import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';\nexport default function App() {\n  return <MemoryRouter initialEntries={['/desk']}>\n    <Link to=\"/archive/old\">Open old archive</Link>\n    <Routes>\n      <Route path=\"/desk\" element={<p>Desk ready</p>} />\n      <Route path=\"/archive\" element={<p>Archive index</p>} />\n      <Route path=\"*\" element={<p>Page missing</p>} />\n    </Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Open old archive\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Open old archive`, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Page missing"
          ]
        },
        "partB": {
          "ask": "What is a purpose of using `Link` for internal navigation?",
          "options": [
            "It lets routing move between locations by submitting a form to the server.",
            "It lets routing move between locations by replacing the browser session data.",
            "It lets routing move between locations by requesting a fresh HTML document.",
            "It lets routing move between locations without requiring a full document reload."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-forwarding-refs-l1-s3-q16",
        "topicId": "react-forwarding-refs",
        "set": 3,
        "environment": "react",
        "code": "import { useImperativeHandle, useRef } from 'react';\nfunction ReplyEditor({ ref }) {\n  const reply = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focusReply() { reply.current.focus(); }\n  }), []);\n  return <><input aria-label=\"Subject\" /><textarea ref={reply} aria-label=\"Reply\" /></>;\n}\nexport default function App() {\n  const editor = useRef(null);\n  return <>\n    <ReplyEditor ref={editor} />\n    <button onClick={() => editor.current.focusReply()}>Write reply</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Write reply\"); return focused(); })()",
        "partA": {
          "ask": "After one click on `Write reply`, which element has focus? Answer with its lowercase tag name.",
          "accepted": [
            "textarea",
            "<textarea>"
          ]
        },
        "partB": {
          "ask": "In React 19, how can a function component receive a parent-provided ref?",
          "options": [
            "It can receive the ref as a context value created by its returned DOM node.",
            "It can receive the ref as a normal prop supplied by the parent in its JSX.",
            "It can receive the ref as a state value created by its first event handler.",
            "It can receive the ref as an attribute read from its returned DOM node."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-hoc-l1-s3-q17",
        "topicId": "react-hoc",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction withTally(Display) {\n  return function Tallied(props) {\n    const [tally, setTally] = useState(0);\n    return <section>\n      <button onClick={() => setTally(value => value + 1)}>{props.name}</button>\n      <Display tally={tally} />\n    </section>;\n  };\n}\nfunction CounterText({ tally }) { return <p>{tally}</p>; }\nconst TalliedStation = withTally(CounterText);\nexport default function App() {\n  return <><TalliedStation name=\"East\" /><TalliedStation name=\"West\" /></>;\n}",
        "check": "(async () => { await click(\"East\"); await click(\"West\"); await click(\"East\"); return text(\"section:first-child p\"); })()",
        "partA": {
          "ask": "Click `East`, `West`, then `East` again. What number does the paragraph in the first `section` show? Answer with a number.",
          "accepted": [
            "2",
            "2 tallies"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of a higher-order component?",
          "options": [
            "It lets components reuse behavior through a wrapping component.",
            "It lets components reuse behavior through edits to their functions.",
            "It lets components reuse behavior through inheritance from a DOM element.",
            "It lets components reuse behavior through copies of a shared state object."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usestate-l1-s3-q18",
        "topicId": "react-usestate",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [permit, setPermit] = useState({ zone: 'A', days: 2 });\n  return <>\n    <button onClick={() => setPermit({ days: 5 })}>Extend permit</button>\n    <p>{Object.keys(permit).length}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Extend permit\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Extend permit`, what number does the paragraph show? Answer with a number.",
          "accepted": [
            "1",
            "1 key",
            "1 property"
          ]
        },
        "partB": {
          "ask": "Why should an array held in state be copied before sorting it for an update?",
          "options": [
            "Copying the array lets React store the resulting order in component props.",
            "Copying the array lets React convert the resulting elements into object keys.",
            "Copying the array lets the update preserve the array used by the previous state.",
            "Copying the array lets React compare the resulting elements by visible display text."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-useeffect-l1-s3-q19",
        "topicId": "react-useeffect",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction Beacon() {\n  useEffect(() => {\n    console.log('lit');\n    return () => console.log('dark');\n  }, []);\n  return <p>Beacon active</p>;\n}\nexport default function App() {\n  const [visible, setVisible] = useState(true);\n  return <>\n    <button onClick={() => setVisible(false)}>Remove beacon</button>\n    {visible && <Beacon />}\n  </>;\n}",
        "check": "(async () => { await click(\"Remove beacon\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect runs, click `Remove beacon` once and let the update finish. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "lit,dark"
          ]
        },
        "partB": {
          "ask": "What is the usual role of an effect compared with rendering and event handling?",
          "options": [
            "An effect is used to calculate the JSX output in place of the component function.",
            "An effect is used to synchronize a component with an external system after rendering.",
            "An effect is used to process a user interaction in place of an event handler.",
            "An effect is used to initialize a local variable in place of a state initializer."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-events-l1-s3-q20",
        "topicId": "react-events",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [source, setSource] = useState('Waiting');\n  return <section onClick={event => {\n    setSource(event.target.tagName.toLowerCase() + '/' + event.currentTarget.tagName.toLowerCase());\n  }}>\n    <button>Launch glider</button>\n    <p>{source}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Launch glider\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click directly on the `Launch glider` button, what text does the paragraph show? Answer with the exact text, including the slash.",
          "accepted": [
            "button/section"
          ]
        },
        "partB": {
          "ask": "What does event bubbling describe in React?",
          "options": [
            "It describes an event moving from the document down to its target node.",
            "It describes an event repeating on other elements with the same tag name.",
            "It describes an event waiting in a queue until the next render.",
            "It describes an event moving from its target up to parent handlers."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-components-props-l1-s3-q21",
        "topicId": "react-components-props",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction TreePicker({ onChoose }) {\n  return <button onClick={() => onChoose('elm')}>Choose tree</button>;\n}\nexport default function App() {\n  const [label, setLabel] = useState('None');\n  return <>\n    <TreePicker onChoose={name => setLabel(name.toUpperCase())} />\n    <p>{label}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Choose tree\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Choose tree`, what text does the paragraph show? Answer with the exact text.",
          "accepted": [
            "ELM"
          ]
        },
        "partB": {
          "ask": "What is meant by one-way data flow through props?",
          "options": [
            "It means parents pass new data to children through their component inputs.",
            "It means children pass data to parents through their returned DOM nodes.",
            "It means siblings pass data to neighbors through their matching prop names.",
            "It means descendants pass data to ancestors through their rendered text."
          ],
          "correct": 0
        }
      }
    ],
};
