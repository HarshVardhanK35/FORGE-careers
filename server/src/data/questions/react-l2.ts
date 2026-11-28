// React, level 2 (intermediate): 3 sets of 18 questions (one file of React code per question, two ideas per snippet).
// Written with Codex, then checked: every `check` was run on the rendered component in jsdom (react and react-dom 19, not in Strict
// Mode) and equals one of the accepted answers; the answer options were checked so that neither their length nor their wording gives a
// clue. A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const REACT_LEVEL_2: QuestionBank = {
  skillId: "react",
  level: 2,
  questions: [
      {
        "id": "react-lists-keys-l2-s1-q01",
        "topicId": "react-lists-keys",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Crate({ label }) {\n  return <li><input aria-label=\"Crate note\" defaultValue={label} /></li>;\n}\nexport default function App() {\n  const [shipped, setShipped] = useState(false);\n  const crate = { id: 'c7', label: 'Tools' };\n  return <>\n    <button onClick={() => setShipped(true)}>Ship crate</button>\n    <ul aria-label=\"Waiting\">\n      {!shipped && <Crate key={crate.id} label={crate.label} />}\n    </ul>\n    <ul aria-label=\"Sent\">\n      {shipped && <Crate key={crate.id} label={crate.label} />}\n    </ul>\n  </>;\n}",
        "check": "(async () => { await type(\"input\", \"Fragile\"); await click(\"Ship crate\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the `input` text with `Fragile`, then click `Ship crate` once. What text does the remaining `input` contain? Answer with the exact text.",
          "accepted": [
            "Tools"
          ]
        },
        "partB": {
          "ask": "If `Crate` also needed to display its identifier, how should it receive that identifier?",
          "options": [
            "Read the identifier from the `key` stored in the component's received props.",
            "Get the identifier from the nearest list element's generated `key` attribute.",
            "Pass the identifier through a separate prop that the component can read.",
            "Extract the identifier from the position passed to the component by React."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-events-l2-s1-q02",
        "topicId": "react-events",
        "set": 1,
        "environment": "react",
        "code": "export default function App() {\n  function signal(event, word) {\n    console.log(word);\n    event.stopPropagation();\n  }\n  return <section onClickCapture={() => console.log('scan')}\n    onClick={() => console.log('shelf')}>\n    <button onClick={event => signal(event, 'stamp')}>Stamp parcel</button>\n  </section>;\n}",
        "check": "(async () => { await click(\"Stamp parcel\"); return logs(); })()",
        "partA": {
          "ask": "Click `Stamp parcel` once. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "scan,stamp"
          ]
        },
        "partB": {
          "ask": "What would calling `preventDefault()` on a form submission event do?",
          "options": [
            "It cancels the browser's default form submission without canceling the handler's own state updates.",
            "It stops ancestor submission handlers without changing the browser's default form submission.",
            "It clears the form's field values before the submission handler reads the current input data.",
            "It delays the browser's submission until state updates queued by the submission handler finish."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-jsx-rendering-l2-s1-q03",
        "topicId": "react-jsx-rendering",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [folded, setFolded] = useState(false);\n  const badge = {\n    title: (folded ? 'short-' : 'wide-') + (folded ? 3 : 6),\n    'aria-label': 'Route card'\n  };\n  return <>\n    <button onClick={() => setFolded(value => !value)}>Fold route</button>\n    <p title=\"route\" {...badge}>Trail notes</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Fold route\"); return attr(\"p\", \"title\"); })()",
        "partA": {
          "ask": "After one click on `Fold route`, what is the `title` attribute of the paragraph? Answer with the exact text.",
          "accepted": [
            "short-3"
          ]
        },
        "partB": {
          "ask": "When generating JSX from data, why should a mapped component return a key?",
          "options": [
            "A key becomes the DOM identifier used by a label to locate its associated input field.",
            "A key supplies the display order React uses to sort rendered siblings during an update.",
            "A key provides a stored result React can reuse instead of evaluating the component body.",
            "A key lets React match a rendered sibling with its earlier identity during a UI update."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-usestate-l2-s1-q04",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [fuel, setFuel] = useState(2);\n  function refill() {\n    setFuel(fuel + 3);\n    setFuel(current => current * 2);\n    setFuel(fuel + 1);\n    setFuel(current => current + 4);\n  }\n  return <><button onClick={refill}>Refill tank</button><p>{fuel}</p></>;\n}",
        "check": "(async () => { await click(\"Refill tank\"); await click(\"Refill tank\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Refill tank` twice, letting the first click finish before the second. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "12"
          ]
        },
        "partB": {
          "ask": "Which approach updates a nested object held in state without changing the existing object?",
          "options": [
            "Change the nested object, copy the outer object, then pass the new outer object to the setter.",
            "Copy the outer object and the changed nested object, then pass the new outer object to the setter.",
            "Copy the nested object, assign it onto the existing outer object, then pass that object to the setter.",
            "Pass the changed nested fields to the setter so it merges them into the existing outer object."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-useeffect-l2-s1-q05",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [decorated, setDecorated] = useState(false);\n  const settings = { room: 'loft' };\n  useEffect(() => {\n    console.log('attach');\n    return () => console.log('detach');\n  }, [settings]);\n  return <>\n    <button onClick={() => setDecorated(value => !value)}>Change curtains</button>\n    <p>{decorated ? 'Striped' : 'Plain'}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Change curtains\"); await click(\"Change curtains\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect runs, click `Change curtains` twice, letting the effect finish after each click. What is the full console order? Answer with words separated by commas, without spaces.",
          "accepted": [
            "attach,detach,attach,detach,attach"
          ]
        },
        "partB": {
          "ask": "How should an effect start asynchronous work while still providing a cleanup function?",
          "options": [
            "Declare the effect callback async and return cleanup after its awaited work.",
            "Start an inner async function and return a separate cleanup function.",
            "Return the work's promise with the cleanup attached as a property on it.",
            "Call the cleanup from rendering before the asynchronous task is started."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, why the console has this order even though the room does not change.",
          "keyPoints": [
            "The initial effect logs `attach`.",
            "`settings` is a new object on each render.",
            "Its changed reference triggers cleanup and setup after each click.",
            "Cleanup logs `detach` before the next setup logs `attach`."
          ],
          "modelAnswer": "The initial effect logs `attach`. Changing `decorated` renders `App` again and creates a new `settings` object. React compares that object reference with the previous dependency, so it runs the old cleanup before the new setup. The second click does the same thing, producing the repeated `detach` and `attach` lines."
        }
      },
      {
        "id": "react-usecontext-l2-s1-q06",
        "topicId": "react-usecontext",
        "set": 1,
        "environment": "react",
        "code": "import { createContext, useContext, useState } from 'react';\nconst Broadcast = createContext('weather');\nfunction Receiver() {\n  const station = useContext(Broadcast);\n  return <span>{station ?? 'silent'}</span>;\n}\nexport default function App() {\n  const [muted, setMuted] = useState(false);\n  return <Broadcast value={muted ? undefined : 'traffic'}>\n    <button onClick={() => setMuted(true)}>Mute broadcast</button>\n    <p><Receiver />/<Broadcast value=\"harbor\"><Receiver /></Broadcast></p>\n  </Broadcast>;\n}",
        "check": "(async () => { await click(\"Mute broadcast\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Mute broadcast`, what text does the paragraph show? Answer with the full text, including the slash.",
          "accepted": [
            "silent/harbor"
          ]
        },
        "partB": {
          "ask": "How can a consumer request a state change when a context provider owns that state?",
          "options": [
            "The consumer can assign a new default value to the context to change the provider's state.",
            "The consumer can return a different context value to replace the state held by the provider.",
            "The provider can read a consumer's local state through the context without receiving a callback.",
            "The provider can expose an update function through its context value for consumers to call."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-usereducer-l2-s1-q07",
        "topicId": "react-usereducer",
        "set": 1,
        "environment": "react",
        "code": "import { useReducer } from 'react';\nfunction cut(state, action) {\n  if (action.type === 'double') return { strips: state.strips * 2 };\n  if (action.type === 'add') return { strips: state.strips + action.amount };\n  return state;\n}\nexport default function App() {\n  const [ribbon, dispatch] = useReducer(cut, { strips: 3 });\n  function prepare() {\n    dispatch({ type: 'double' });\n    dispatch({ type: 'add', amount: ribbon.strips });\n  }\n  return <><button onClick={prepare}>Prepare ribbon</button><p>{ribbon.strips}</p></>;\n}",
        "check": "(async () => { await click(\"Prepare ribbon\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Prepare ribbon` once. What number does the paragraph show after the queued actions finish? Answer with a number.",
          "accepted": [
            "9"
          ]
        },
        "partB": {
          "ask": "Which statement about the dispatch function returned by `useReducer` is correct?",
          "options": [
            "Its identity stays stable between renders, so an effect can omit it from its dependency list.",
            "Its return value is the updated state, so a handler can read the reducer result directly.",
            "It accepts a second callback argument to run after the updated state has been committed.",
            "Its reference changes with the state, so consumers can use it to detect a state update."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-forms-l2-s1-q08",
        "topicId": "react-forms",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [bundles, setBundles] = useState('');\n  const [wrapped, setWrapped] = useState(true);\n  const [receipt, setReceipt] = useState('No sale');\n  function sell(event) {\n    event.preventDefault();\n    setReceipt(String(Number(bundles) * 4 + (wrapped ? 2 : 0)));\n    setBundles('');\n  }\n  return <form onSubmit={sell}>\n    <input aria-label=\"Bundles\" value={bundles}\n      onChange={event => setBundles(event.target.value)} />\n    <label><input type=\"checkbox\" checked={wrapped}\n      onChange={event => setWrapped(event.target.checked)} />Wrap</label>\n    <button type=\"submit\">Sell bundles</button>\n    <p>{receipt}/{bundles.length}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input[aria-label=Bundles]\", \"3\"); await submit(); return text(\"p\"); })()",
        "partA": {
          "ask": "Type `3` into the empty `Bundles` input, then submit the form once. What text does the paragraph show after the update? Answer with the full text, including the slash.",
          "accepted": [
            "14/0"
          ]
        },
        "partB": {
          "ask": "What should a controlled checkbox use as its checked state and change value?",
          "options": [
            "Use the text in `value` as its checked state and read `event.target.value` on change.",
            "Use `defaultChecked` for current state and read `event.target.checked` when it changes.",
            "Use a boolean for `checked` and read `event.target.checked` when handling a UI change.",
            "Use a boolean in `checked` and read `event.target.value` to find the new checked state."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-state-location-l2-s1-q09",
        "topicId": "react-state-location",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction LabelEditor({ draft, onEdit }) {\n  return <input aria-label=\"Jar label\" value={draft}\n    onChange={event => onEdit(event.target.value.toUpperCase())} />;\n}\nexport default function App() {\n  const [draft, setDraft] = useState('SALT');\n  const [open, setOpen] = useState(true);\n  return <>\n    <button onClick={() => setOpen(value => !value)}>Toggle editor</button>\n    {open && <LabelEditor draft={draft} onEdit={setDraft} />}\n  </>;\n}",
        "check": "(async () => { await type(\"input\", \"herbs\"); await click(\"Toggle editor\"); await click(\"Toggle editor\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the `input` text with `herbs`. Click `Toggle editor` to hide it, then click again to show it. What value does the new `input` contain? Answer with the exact text.",
          "accepted": [
            "HERBS"
          ]
        },
        "partB": {
          "ask": "Why should a total that can be calculated from existing state usually be derived during rendering?",
          "options": [
            "Storing it as another state value lets React keep its calculation in sync.",
            "Moving its calculation into an effect lets the first render use the new total.",
            "Keeping it in a ref causes the view to refresh when the calculation changes.",
            "Deriving it avoids a second stored value that could fall out of sync."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-stale-closures-l2-s1-q10",
        "topicId": "react-stale-closures",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [stride, setStride] = useState(2);\n  const [distance, setDistance] = useState(1);\n  const [walk, setWalk] = useState(null);\n  return <>\n    <button onClick={() => setWalk(() => () =>\n      setDistance(current => current + stride))}>Save walk</button>\n    <button onClick={() => setStride(5)}>Lengthen stride</button>\n    <button onClick={() => walk?.()}>Take walk</button>\n    <p>{distance}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Save walk\"); await click(\"Lengthen stride\"); await click(\"Take walk\"); await click(\"Take walk\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Save walk`, then `Lengthen stride`, then `Take walk` twice. Let each click finish. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "5"
          ]
        },
        "partB": {
          "ask": "Why should a functional state updater avoid sending requests or changing external data?",
          "options": [
            "React may call an updater again while checking purity, so external changes could be duplicated.",
            "The updater runs after browser paint, so external work must wait for another rendered frame.",
            "The updater receives a detached copy of state, so external changes would affect that copy.",
            "The updater can return cleanup, so external work belongs in the function returned from it."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, which values the saved function uses for the two walks.",
          "keyPoints": [
            "`Save walk` stores a function from the render where `stride` is 2.",
            "Changing `stride` does not replace `walk`.",
            "The updater receives current `distance` but still closes over the saved `stride`.",
            "The two walks change `distance` from 1 to 3 and then to 5."
          ],
          "modelAnswer": "`Save walk` stores a function that captures `stride` as 2. Changing `stride` to 5 does not replace that stored function. Its functional updater receives the current `distance`, but its reference to `stride` still uses the captured value. The walks therefore change `distance` from 1 to 3 and then to 5."
        }
      },
      {
        "id": "react-reconciliation-l2-s1-q11",
        "topicId": "react-reconciliation",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [border, setBorder] = useState(false);\n  function StampPad() {\n    const [marks, setMarks] = useState(2);\n    return <button onClick={() => setMarks(value => value + 3)}>Marks: {marks}</button>;\n  }\n  return <section className={border ? 'lined' : 'plain'}>\n    <button onClick={() => setBorder(value => !value)}>Toggle border</button>\n    <StampPad />\n  </section>;\n}",
        "check": "(async () => { await click(\"Marks: 2\"); await click(\"Toggle border\"); return text(\"section button:last-child\"); })()",
        "partA": {
          "ask": "Click `Marks: 2` once, then `Toggle border` once. What is the full text on the last button?",
          "accepted": [
            "Marks: 2",
            "2"
          ]
        },
        "partB": {
          "ask": "What does React do with the real DOM when a component renders again?",
          "options": [
            "React replaces the component's full DOM subtree so its nodes reflect the latest render output.",
            "React edits the DOM as JSX expressions run so the browser can display intermediate values.",
            "React compares the new output with the previous output and applies the required DOM changes.",
            "React copies the existing DOM into state so the next render can read the current node values."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, why changing the border affects the marks on the pad.",
          "keyPoints": [
            "The first pad update changes `marks` from 2 to 5.",
            "Changing `border` renders `App` again.",
            "That render creates a new `StampPad` function, which is a different component type.",
            "React replaces the old pad instance and initializes `marks` to 2."
          ],
          "modelAnswer": "Clicking the pad changes its local `marks` to 5. Changing `border` renders `App` again, defining a new `StampPad` function. React treats that function as a different component type and mounts a fresh pad. The fresh pad initializes `marks` to 2."
        }
      },
      {
        "id": "react-performance-l2-s1-q12",
        "topicId": "react-performance",
        "set": 1,
        "environment": "react",
        "code": "import { useMemo, useState } from 'react';\nfunction Compass({ scale }) {\n  console.log('compass');\n  return <p>{scale} km</p>;\n}\nexport default function App() {\n  const [night, setNight] = useState(false);\n  const [scale, setScale] = useState(2);\n  const compass = useMemo(() => <Compass scale={scale} />, [scale]);\n  return <main className={night ? 'night' : 'day'}>\n    <button onClick={() => setNight(value => !value)}>Change map color</button>\n    <button onClick={() => setScale(value => value + 1)}>Increase scale</button>\n    {compass}\n  </main>;\n}",
        "check": "(async () => { await click(\"Change map color\"); await click(\"Increase scale\"); await click(\"Change map color\"); return logs().split(\",\").length; })()",
        "partA": {
          "ask": "Include the initial mount. Click `Change map color`, `Increase scale`, then `Change map color` again. How many times is `compass` logged in total? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "Which measurement helps decide whether a rendering optimization is useful?",
          "options": [
            "Compare the number of hooks in the source before and after adding the optimization code.",
            "Compare render durations during representative interactions before and after a change.",
            "Count the resulting DOM nodes to estimate how much JavaScript work a render performs.",
            "Check the downloaded bundle size to determine the time spent rendering updated state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-composition-l2-s1-q13",
        "topicId": "react-composition",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction DisplayCase({ controls, children }) {\n  const [shelf, setShelf] = useState(1);\n  return <section>\n    <header>{controls}</header>\n    <button onClick={() => setShelf(value => value + 1)}>Raise shelf</button>\n    <main>{children(shelf)}</main>\n  </section>;\n}\nexport default function App() {\n  const [width, setWidth] = useState(3);\n  return <DisplayCase controls={\n    <button onClick={() => setWidth(value => value + 2)}>Widen case</button>\n  }>{level => <p>{width * level} spaces</p>}</DisplayCase>;\n}",
        "check": "(async () => { await click(\"Raise shelf\"); await click(\"Widen case\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Raise shelf` once, then `Widen case` once. What text does the paragraph inside `main` show? Answer with the full text.",
          "accepted": [
            "10 spaces",
            "10"
          ]
        },
        "partB": {
          "ask": "What is an advantage of receiving a control as a JSX prop instead of importing that control inside a wrapper?",
          "options": [
            "The caller can choose the control and its behavior while the wrapper remains responsible for placement.",
            "The wrapper can read the control's private state without needing a callback from the supplied control.",
            "The supplied control can update the wrapper's props without asking the caller to render new values.",
            "The control can keep its state after removal because its JSX value is stored in the wrapper's props."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-router-l2-s1-q14",
        "topicId": "react-router",
        "set": 1,
        "environment": "react",
        "code": "import { MemoryRouter, Routes, Route, Link, Navigate, Outlet,\n  useParams, useSearchParams } from 'react-router-dom';\nfunction Rack() {\n  return <main><Link to=\"/rack/rope?packs=3\">Choose rope</Link><Outlet /></main>;\n}\nfunction Supply() {\n  const { material } = useParams();\n  const [query] = useSearchParams();\n  return <p>{material}:{Number(query.get('packs') ?? 1) * 2}</p>;\n}\nexport default function App() {\n  return <MemoryRouter initialEntries={['/']}>\n    <Routes>\n      <Route path=\"/\" element={<Navigate to=\"/rack/thread?packs=2\" replace />} />\n      <Route path=\"rack\" element={<Rack />}>\n        <Route path=\":material\" element={<Supply />} />\n      </Route>\n    </Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Choose rope\"); return text(\"main p\"); })()",
        "partA": {
          "ask": "Let the initial redirect finish, then click `Choose rope` once. What text appears in the paragraph inside `main`? Answer with the exact text, including the colon.",
          "accepted": [
            "rope:6"
          ]
        },
        "partB": {
          "ask": "What does `useParams` return for a matched route?",
          "options": [
            "It returns an object containing the query string pairs after the question mark.",
            "It returns an array containing every route pattern declared in the router tree.",
            "It returns a function used to move to another location in the router history.",
            "It returns an object containing the dynamic path segments of the matched route."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the redirect, nested route, and query produce the displayed text.",
          "keyPoints": [
            "`Navigate` first redirects to `/rack/thread?packs=2`.",
            "`Choose rope` navigates to `/rack/rope?packs=3`.",
            "`Rack` renders `Supply` through `Outlet`, and `useParams` supplies `material` as `rope`.",
            "`useSearchParams` supplies `packs` as the string `3`, which becomes 6 after conversion and multiplication."
          ],
          "modelAnswer": "`Navigate` first sends the router to `/rack/thread?packs=2`. Clicking `Choose rope` changes the location to `/rack/rope?packs=3`. The nested route renders `Supply` inside the `Outlet` in `Rack`, with `material` equal to `rope`. The query supplies `packs` as the string `3`, so the calculation produces 6 and the paragraph shows `rope:6`."
        }
      },
      {
        "id": "react-concurrent-hooks-l2-s1-q15",
        "topicId": "react-concurrent-hooks",
        "set": 1,
        "environment": "react",
        "code": "import { useState, useTransition } from 'react';\nexport default function App() {\n  const [orders, setOrders] = useState(0);\n  const [crates, setCrates] = useState(0);\n  const [pending, startTransition] = useTransition();\n  function pack() {\n    setOrders(value => value + 1);\n    startTransition(() => {\n      setCrates(value => value + 3);\n      setCrates(value => value + 3);\n    });\n  }\n  return <>\n    <button onClick={pack}>Pack order</button>\n    <p>{orders}/{crates}/{pending ? 'packing' : 'settled'}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Pack order\"); await click(\"Pack order\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Pack order` twice, letting the transition finish after each click. What text does the paragraph show after the second transition finishes? Answer with the full text.",
          "accepted": [
            "2/12/settled"
          ]
        },
        "partB": {
          "ask": "Why should the state that directly controls a text input be updated outside a transition?",
          "options": [
            "Text inputs require a promise from a transition before they can accept another typed value.",
            "Typing needs an urgent state update so the displayed input value follows the user's keystrokes.",
            "Transition callbacks receive text input events after their target values have been cleared.",
            "Text input values are stored by the browser, so transition updates cannot reach current React state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-hoc-l2-s1-q16",
        "topicId": "react-hoc",
        "set": 1,
        "environment": "react",
        "code": "function withDiscount(View) {\n  return function Discounted(props) {\n    return <View {...props} price={props.price - 2} />;\n  };\n}\nfunction withDouble(View) {\n  return function Doubled(props) {\n    return <View {...props} price={props.price * 2} />;\n  };\n}\nfunction Invoice({ price }) { return <p>{price} credits</p>; }\nconst SaleInvoice = withDiscount(withDouble(Invoice));\nexport default function App() {\n  return <SaleInvoice price={12} />;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does the paragraph show after the two wrappers pass their props? Answer with the full text.",
          "accepted": [
            "20 credits",
            "20"
          ]
        },
        "partB": {
          "ask": "Why is a wrapped component usually created outside the component that renders it?",
          "options": [
            "Creating it outside lets the wrapper read local state from the parent without receiving additional props.",
            "Creating it outside makes its returned JSX independent of later changes to props passed by its parent.",
            "Creating it outside keeps its component type stable across parent renders and avoids accidental child remounts.",
            "Creating it outside gives the wrapped child direct access to the DOM nodes created by its parent."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usestate-l2-s1-q17",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction prepareClay() {\n  console.log('clay');\n  return 4;\n}\nfunction prepareGlaze() {\n  console.log('glaze');\n  return 7;\n}\nexport default function App() {\n  const [clay, setClay] = useState(prepareClay);\n  const [glaze, setGlaze] = useState(prepareGlaze());\n  function shape() {\n    setClay(value => value + 1);\n    setGlaze(value => value - 1);\n  }\n  return <><button onClick={shape}>Shape pot</button><p>{clay}/{glaze}</p></>;\n}",
        "check": "(async () => { await click(\"Shape pot\"); await click(\"Shape pot\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click `Shape pot` twice, letting each click finish. What is the order of the console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "clay,glaze,glaze,glaze"
          ]
        },
        "partB": {
          "ask": "How should a function itself be stored as state rather than used as a state updater?",
          "options": [
            "Pass a wrapping function to the setter that returns the function intended for storage.",
            "Pass the function directly to the setter so React stores it without evaluating its body.",
            "Pass the function inside an array to the setter so React extracts it as the stored value.",
            "Pass the function as a second setter argument so React separates it from an updater."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-useeffect-l2-s1-q18",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useRef, useState } from 'react';\nexport default function App() {\n  const [length, setLength] = useState(10);\n  const [change, setChange] = useState(0);\n  const previous = useRef(10);\n  useEffect(() => {\n    setChange(length - previous.current);\n    previous.current = length;\n  }, [length]);\n  function extend() {\n    setLength(value => value + 2);\n    setLength(value => value + 3);\n  }\n  return <>\n    <button onClick={extend}>Extend cable</button>\n    <button onClick={() => setLength(value => value - 1)}>Trim cable</button>\n    <p>{length}/{change}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Extend cable\"); await click(\"Trim cable\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After the initial effect finishes, click `Extend cable`, then `Trim cable`, once each. Let effects finish after each click. What text does the paragraph show? Answer with the full text, including the slash.",
          "accepted": [
            "14/-1"
          ]
        },
        "partB": {
          "ask": "When is a layout effect preferable to a regular effect?",
          "options": [
            "When a calculation can be completed from props without reading the DOM.",
            "When a request should run in the background after the page becomes visible.",
            "When a user action needs a message sent without waiting for another render.",
            "When DOM measurement must adjust layout before the browser paints."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-useref-l2-s2-q01",
        "topicId": "react-useref",
        "set": 2,
        "environment": "react",
        "code": "import { useRef, useState } from 'react';\nexport default function App() {\n  const [depth, setDepth] = useState(3);\n  const spare = useRef(0);\n  function dig() {\n    spare.current = depth;\n    setDepth(depth + 6);\n  }\n  function swap() {\n    const saved = spare.current;\n    spare.current = depth;\n    setDepth(saved);\n  }\n  return <>\n    <button onClick={dig}>Dig trench</button>\n    <button onClick={swap}>Swap depth</button>\n    <p>{depth}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Dig trench\"); await click(\"Swap depth\"); await click(\"Swap depth\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Dig trench` once, then `Swap depth` twice. Let the update finish after each click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "9"
          ]
        },
        "partB": {
          "ask": "Suppose a later render passes a different starting argument to `useRef`. What happens to the existing ref?",
          "options": [
            "The ref stores that argument after the next effect finishes running.",
            "The ref becomes a new object while retaining its earlier stored value.",
            "The ref keeps its current value instead of taking the new argument.",
            "The ref queues a render so the new starting argument can be applied."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-lifting-state-l2-s2-q02",
        "topicId": "react-lifting-state",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Portion({ size, request }) {\n  return <button onClick={() => request(size)}>Serve {size}</button>;\n}\nfunction Pantry({ left }) { return <p>{left} left</p>; }\nexport default function App() {\n  const [left, setLeft] = useState(7);\n  function request(size) {\n    setLeft(current => size <= current ? current - size : current);\n  }\n  return <>\n    <Portion size={4} request={request} />\n    <Portion size={2} request={request} />\n    <Pantry left={left} />\n  </>;\n}",
        "check": "(async () => { await click(\"Serve 4\"); await click(\"Serve 4\"); await click(\"Serve 2\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Serve 4` twice, then `Serve 2` once. Let the update finish after each click. What text does `Pantry` show? Answer with the full text.",
          "accepted": [
            "1 left",
            "1"
          ]
        },
        "partB": {
          "ask": "When several nearby components need shared state, which placement is usually a useful starting point?",
          "options": [
            "Place the state in their nearest common parent and pass the needed props down.",
            "Give the siblings separate state copies and match their own starting values.",
            "Keep the value in a module variable and read it from component functions.",
            "Put the state in the deepest child and let ancestors read its local hooks."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usestate-l2-s2-q03",
        "topicId": "react-usestate",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [draft, setDraft] = useState({ title: 'Plan', cover: { price: 5 } });\n  const [saved] = useState(draft);\n  function revise() {\n    const next = { ...draft };\n    next.cover.price += 2;\n    setDraft(next);\n  }\n  return <>\n    <button onClick={revise}>Revise cover</button>\n    <p>{draft.cover.price}/{saved.cover.price}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Revise cover\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Revise cover`, what text does the paragraph show? Answer with the two numbers separated by a slash.",
          "accepted": [
            "7/7"
          ]
        },
        "partB": {
          "ask": "Which statement describes the return value of a state setter?",
          "options": [
            "It returns the updated state object, which the handler can use before rendering.",
            "It returns a promise for the new state, which the handler can await before reading.",
            "It returns the queued updater function, which the handler can call to read state.",
            "It returns undefined; the updated state can be read during a subsequent render."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-useeffect-l2-s2-q04",
        "topicId": "react-useeffect",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction Locker({ code }) {\n  useEffect(() => {\n    console.log('open-' + code);\n    return () => console.log('close-' + code);\n  }, []);\n  return <p>{code}</p>;\n}\nexport default function App() {\n  const [code, setCode] = useState('red');\n  const [visible, setVisible] = useState(true);\n  return <>\n    <button onClick={() => setCode('blue')}>Repaint locker</button>\n    <button onClick={() => setVisible(false)}>Remove locker</button>\n    {visible && <Locker code={code} />}\n  </>;\n}",
        "check": "(async () => { await click(\"Repaint locker\"); await click(\"Remove locker\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect finishes, click `Repaint locker`, then `Remove locker`. Let effects finish after each click. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "open-red,close-red"
          ]
        },
        "partB": {
          "ask": "An effect subscribes to a DOM event. Which cleanup approach removes that subscription correctly?",
          "options": [
            "Return the listener function so React can dispatch a final event to it.",
            "Remove the listener with its original target, event type and function.",
            "Set the event object's target to null before the effect finishes running.",
            "Register an empty listener with the same event type on the target node."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, why repainting and removing `Locker` produce this console order.",
          "keyPoints": [
            "The mount effect captures `code` as `red` and logs `open-red`.",
            "Repainting renders `Locker` with `blue` without replacing the effect.",
            "The empty dependency list keeps the initial cleanup until unmount.",
            "Removing `Locker` runs that cleanup and logs `close-red`."
          ],
          "modelAnswer": "The mount effect captures `code` as `red` and logs `open-red`. Repainting changes the displayed `code` to `blue`. The empty dependency list means this update does not replace the effect or its cleanup. Removing `Locker` runs the initial cleanup, which logs `close-red`."
        }
      },
      {
        "id": "react-usecontext-l2-s2-q05",
        "topicId": "react-usecontext",
        "set": 2,
        "environment": "react",
        "code": "import { createContext, useContext, useState } from 'react';\nconst Pace = createContext(2);\nfunction Trip() {\n  const pace = useContext(Pace);\n  return <p>{pace * 3} steps</p>;\n}\nexport default function App() {\n  const base = useContext(Pace);\n  const [factor, setFactor] = useState(3);\n  return <Pace value={base * factor}>\n    <button onClick={() => setFactor(4)}>Lengthen trip</button>\n    <Trip />\n  </Pace>;\n}",
        "check": "(async () => { await click(\"Lengthen trip\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Lengthen trip`, what text does `Trip` show? Answer with the full text.",
          "accepted": [
            "24 steps",
            "24"
          ]
        },
        "partB": {
          "ask": "A provider passes an object containing several fields. How does a consumer receive that object?",
          "options": [
            "The consumer selects a field by passing its name as a second hook argument.",
            "A consumer reads the provided object and can destructure the fields it needs.",
            "The provider combines its fields with the object supplied by an outer provider.",
            "The consumer receives the fields as named props without calling a context hook."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-usereducer-l2-s2-q06",
        "topicId": "react-usereducer",
        "set": 2,
        "environment": "react",
        "code": "import { useReducer } from 'react';\nfunction edit(state, action) {\n  if (action.type === 'write') {\n    return { word: action.word, history: [...state.history, state.word] };\n  }\n  if (action.type === 'undo' && state.history.length) {\n    return { word: state.history.at(-1), history: state.history.slice(0, -1) };\n  }\n  return state;\n}\nexport default function App() {\n  const [note, dispatch] = useReducer(edit, { word: 'sand', history: [] });\n  return <>\n    <button onClick={() => dispatch({ type: 'write', word: 'stone' })}>Write stone</button>\n    <button onClick={() => dispatch({ type: 'write', word: 'glass' })}>Write glass</button>\n    <button onClick={() => dispatch({ type: 'undo' })}>Undo note</button>\n    <p>{note.word}/{note.history.length}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Write stone\"); await click(\"Write glass\"); await click(\"Undo note\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Write stone`, `Write glass`, then `Undo note`. Let the update finish after each click. What text does the paragraph show? Answer with the word and number separated by a slash.",
          "accepted": [
            "stone/1"
          ]
        },
        "partB": {
          "ask": "What makes a reducer a useful place for related state transitions?",
          "options": [
            "It schedules related browser events in the order their UI handlers were declared.",
            "It combines returned objects with the previous stored state through a shallow merge.",
            "It refreshes the initial state argument when the parent supplies changed input props.",
            "It groups transition rules in a function that can be tested directly with plain inputs."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-forms-l2-s2-q07",
        "topicId": "react-forms",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [seeds, setSeeds] = useState('');\n  const [tray, setTray] = useState('2');\n  const [notice, setNotice] = useState('Empty');\n  function plant(event) {\n    event.preventDefault();\n    const missing = Number(tray) - Number(seeds);\n    setNotice(missing > 0 ? 'Need ' + missing : String(Number(seeds) * Number(tray)));\n  }\n  return <form onSubmit={plant}>\n    <input aria-label=\"Seeds\" value={seeds} onChange={event => setSeeds(event.target.value)} />\n    <select aria-label=\"Tray\" value={tray} onChange={event => setTray(event.target.value)}>\n      <option value=\"2\">Small</option><option value=\"4\">Large</option>\n    </select>\n    <button type=\"button\" onClick={() => setTray('4')}>Use large tray</button>\n    <button type=\"submit\">Plant seeds</button>\n    <p>{notice}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"3\"); await click(\"Use large tray\"); await submit(); return text(\"p\"); })()",
        "partA": {
          "ask": "Type `3` into the empty `Seeds` input, click `Use large tray`, then submit the form. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Need 1",
            "need 1"
          ]
        },
        "partB": {
          "ask": "Which change keeps a text input controlled when its initial data is missing?",
          "options": [
            "Use an empty string as its state value until the requested text becomes available.",
            "Remove its change handler while the data is missing, then attach the handler later.",
            "Switch from a missing controlled value to a default value when the data arrives.",
            "Assign its next value through a DOM ref while keeping the state value undefined."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-memoization-l2-s2-q08",
        "topicId": "react-memoization",
        "set": 2,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nconst TagPrinter = memo(function TagPrinter({ caption, print }) {\n  return <button onClick={print}>{caption}</button>;\n}, (before, after) => before.caption === after.caption);\nexport default function App() {\n  const [cost, setCost] = useState(4);\n  const [printed, setPrinted] = useState(0);\n  return <>\n    <button onClick={() => setCost(9)}>Raise tag price</button>\n    <TagPrinter caption=\"Print tag\" print={() => setPrinted(cost)} />\n    <p>{printed}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Raise tag price\"); await click(\"Print tag\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Raise tag price`, then `Print tag`, letting the update finish after each click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "4"
          ]
        },
        "partB": {
          "ask": "What happens when a component wrapped with `memo` updates its own local state?",
          "options": [
            "The component waits for its own parent to pass a changed prop before it can update.",
            "The memo comparison receives the new local state as another prop before rendering it.",
            "The component can render for that state update even if its props have not changed.",
            "The parent takes ownership of that state so it can decide whether to render it."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, why `Print tag` uses this price after the increase.",
          "keyPoints": [
            "The first `print` callback captures `cost` as 4.",
            "Raising `cost` creates a new callback in `App`.",
            "The custom comparison checks `caption` and skips the child update.",
            "The button retains the old `print` callback and sets `printed` to 4."
          ],
          "modelAnswer": "The first `print` callback captures `cost` as 4. Raising the price renders `App` with `cost` equal to 9 and creates a new callback. The custom comparison sees the unchanged `caption` and skips updating `TagPrinter`. Its button retains the earlier callback, so clicking it sets `printed` to 4."
        }
      },
      {
        "id": "react-custom-hooks-l2-s2-q09",
        "topicId": "react-custom-hooks",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction usePulse(step) {\n  const [total, setTotal] = useState(0);\n  useEffect(() => {\n    function receive() { setTotal(value => value + step); }\n    window.addEventListener('pulse', receive);\n    return () => window.removeEventListener('pulse', receive);\n  }, [step]);\n  return total;\n}\nexport default function App() {\n  const [step, setStep] = useState(2);\n  const total = usePulse(step);\n  return <>\n    <button onClick={() => window.dispatchEvent(new window.Event('pulse'))}>Send pulse</button>\n    <button onClick={() => setStep(5)}>Boost pulse</button>\n    <p>{total}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Send pulse\"); await click(\"Boost pulse\"); await click(\"Send pulse\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Send pulse`, `Boost pulse`, then `Send pulse` again. Let effects finish after each click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "7"
          ]
        },
        "partB": {
          "ask": "Why should a custom hook that calls other hooks have a name starting with use?",
          "options": [
            "The prefix makes its local state available to other hooks with matching names.",
            "The prefix causes React to cache its returned value between component renders.",
            "The prefix registers an effect that runs before the calling component is mounted.",
            "The prefix lets lint rules recognize calls subject to hook restrictions."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-data-fetching-l2-s2-q10",
        "topicId": "react-data-fetching",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction readCapacity(attempt) {\n  return new Promise((resolve, reject) => setTimeout(() => {\n    if (attempt === 0) reject(new Error('Locked'));\n    else resolve(12);\n  }, 20));\n}\nexport default function App() {\n  const [attempt, setAttempt] = useState(0);\n  const [status, setStatus] = useState('Loading');\n  useEffect(() => {\n    let active = true;\n    setStatus('Loading');\n    readCapacity(attempt).then(\n      seats => { if (active) setStatus(seats + ' seats'); },\n      error => { if (active) setStatus(error.message); }\n    );\n    return () => { active = false; };\n  }, [attempt]);\n  return <>\n    <button onClick={() => setAttempt(value => value + 1)}>Retry capacity</button>\n    <p>{status}</p>\n  </>;\n}",
        "check": "(async () => { await wait(40); await click(\"Retry capacity\"); await wait(40); return text(\"p\"); })()",
        "partA": {
          "ask": "After mounting, wait 40 ms for the first request to finish. Click `Retry capacity`, then wait another 40 ms. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "12 seats",
            "12"
          ]
        },
        "partB": {
          "ask": "Why track a request's loading state separately from its returned list?",
          "options": [
            "A successful response can contain an empty list, which differs from a pending request.",
            "A nonempty list means the next request has finished even if its promise is pending.",
            "An empty list indicates a rejected request, so a separate error value is unnecessary.",
            "A list's length records the remaining request time once the loading state is stored."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, the request states before and after clicking `Retry capacity`.",
          "keyPoints": [
            "The first `readCapacity` call uses `attempt` equal to 0 and rejects with `Locked`.",
            "The click increments `attempt` and causes effect cleanup followed by new setup.",
            "The new effect sets `status` to `Loading` and requests capacity again.",
            "The successful result sets `status` to `12 seats` while its effect is active."
          ],
          "modelAnswer": "The first call uses `attempt` equal to 0 and rejects after 20 ms, so `status` becomes `Locked`. Clicking `Retry capacity` increments `attempt` and cleans up the previous effect. The new effect changes `status` to `Loading` and starts another request. This request resolves with 12, and its active effect updates the paragraph to `12 seats`."
        }
      },
      {
        "id": "react-rerenders-l2-s2-q11",
        "topicId": "react-rerenders",
        "set": 2,
        "environment": "react",
        "code": "import { createContext, memo, useContext, useState } from 'react';\nconst Air = createContext('cool');\nfunction Vent() {\n  console.log('vent');\n  return <p>{useContext(Air)}</p>;\n}\nconst Duct = memo(function Duct() {\n  console.log('duct');\n  return <Vent />;\n});\nexport default function App() {\n  const [air, setAir] = useState('cool');\n  console.log('roof');\n  return <Air value={air}>\n    <button onClick={() => setAir('warm')}>Warm air</button>\n    <Duct />\n  </Air>;\n}",
        "check": "(async () => { await click(\"Warm air\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click `Warm air` once and let the update finish. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "roof,duct,vent,roof,vent"
          ]
        },
        "partB": {
          "ask": "Which statement describes the difference between rendering and committing an update?",
          "options": [
            "Rendering edits the DOM, while committing calculates the next component output.",
            "Rendering creates a fresh DOM tree, while committing replaces the previous tree.",
            "Rendering calculates component output, while a commit applies needed DOM changes.",
            "Rendering runs after the effects, while committing decides which effects to queue."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, which component functions run when `Warm air` is clicked.",
          "keyPoints": [
            "The mount calls `App`, `Duct` and `Vent` in that order.",
            "Updating `air` calls `App` again and changes the `Air` provider value.",
            "`Duct` has unchanged props, so its memoized function can be skipped.",
            "`Vent` consumes `Air` and updates through the memoized ancestor."
          ],
          "modelAnswer": "The initial render logs `roof`, `duct`, then `vent`. Clicking `Warm air` updates state in `App`, so it logs `roof` again. `Duct` has unchanged props, and its memoized function is skipped. `Vent` reads the changed `Air` value, so React reaches it through `Duct` and it logs `vent` again."
        }
      },
      {
        "id": "react-error-boundaries-l2-s2-q12",
        "topicId": "react-error-boundaries",
        "set": 2,
        "environment": "react",
        "code": "import { Component, useState } from 'react';\nclass Shield extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() { return this.state.failed ? this.props.fallback : this.props.children; }\n}\nfunction BrokenNotice() { throw new Error('Notice failed'); }\nfunction Lens({ cracked }) {\n  if (cracked) throw new Error('Lens failed');\n  return <p>Clear lens</p>;\n}\nexport default function App() {\n  const [cracked, setCracked] = useState(false);\n  return <>\n    <button onClick={() => setCracked(true)}>Crack lens</button>\n    <Shield fallback={<p>Cabinet closed</p>}>\n      <Shield fallback={<BrokenNotice />}><Lens cracked={cracked} /></Shield>\n      <p>Spare lens</p>\n    </Shield>\n  </>;\n}",
        "check": "(async () => { await click(\"Crack lens\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Crack lens`, let error recovery finish. What text appears in the remaining paragraph? Answer with the full text.",
          "accepted": [
            "Cabinet closed",
            "cabinet closed"
          ]
        },
        "partB": {
          "ask": "How should a failure thrown inside a button's event handler usually be handled?",
          "options": [
            "Return the error from the handler so a surrounding boundary can show its fallback.",
            "Catch the error in the handler and update state to show a suitable failure message.",
            "Wrap the handler function with a boundary element before passing it to the button.",
            "Add a boundary around the button so it receives errors thrown during click handling."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-portals-fragments-l2-s2-q13",
        "topicId": "react-portals-fragments",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nimport { createPortal } from 'react-dom';\nexport default function App() {\n  const [extra, setExtra] = useState(false);\n  const flags = <><span>North</span>{extra && <span>South</span>}</>;\n  return <section>\n    <button onClick={() => setExtra(true)}>Add direction</button>\n    <span>Compass</span>\n    {createPortal(<aside>{flags}</aside>, document.body)}\n  </section>;\n}",
        "check": "(async () => { await click(\"Add direction\"); return count(\"section span\"); })()",
        "partA": {
          "ask": "After one click on `Add direction`, how many `span` elements are DOM descendants of `section`? Answer with a number.",
          "accepted": [
            "1",
            "1 span",
            "1 element",
            "1 span element"
          ]
        },
        "partB": {
          "ask": "A button rendered through a portal needs a value from an ancestor context provider. What happens?",
          "options": [
            "It reads context via its React ancestry even in a different DOM location.",
            "It reads the context default because the portal target is outside the provider's DOM.",
            "It finds a provider by walking the real DOM upwards from the portal target element.",
            "It receives context as a copied prop when the portal first mounts its DOM content."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-19-actions-l2-s2-q14",
        "topicId": "react-19-actions",
        "set": 2,
        "environment": "react",
        "code": "import { useActionState } from 'react';\nasync function tally(previous, formData) {\n  await new Promise(resolve => setTimeout(resolve, 20));\n  return previous + Number(formData.get('pairs')) * 2;\n}\nexport default function App() {\n  const [socks, record, pending] = useActionState(tally, 1);\n  return <form action={record}>\n    <input name=\"pairs\" aria-label=\"Pairs\" defaultValue=\"0\" />\n    <button type=\"submit\" disabled={pending}>Record pairs</button>\n    <p>{socks}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"3\"); await submit(); await wait(40); await type(\"input\", \"2\"); await submit(); await wait(40); return text(\"p\"); })()",
        "partA": {
          "ask": "Replace the `Pairs` input with `3`, submit, and wait 40 ms. Replace the input with `2`, submit again, and wait another 40 ms. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "11"
          ]
        },
        "partB": {
          "ask": "What is a useful reason to disable a form's submit button while its action is pending?",
          "options": [
            "It cancels the current action if a second submit event reaches the form element.",
            "It preserves the input values by turning the form into a set of controlled fields.",
            "It moves the action outside its transition so the result appears before completion.",
            "It reduces extra submissions from button clicks while the request is in progress."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-usestate-l2-s2-q15",
        "topicId": "react-usestate",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [loads, setLoads] = useState([\n    { grain: 'rye', sacks: 2 }, { grain: 'oat', sacks: 4 }\n  ]);\n  function sortLoads() {\n    setLoads(current => current.map(load => ({ ...load, sacks: load.sacks + 2 })));\n    setLoads(current => current.filter(load => load.sacks <= 5));\n  }\n  return <>\n    <button onClick={sortLoads}>Sort grain</button>\n    <p>{loads.reduce((sum, load) => sum + load.sacks, 0)} sacks</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Sort grain\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After one click on `Sort grain`, what text does the paragraph show? Answer with the full text.",
          "accepted": [
            "4 sacks",
            "4"
          ]
        },
        "partB": {
          "ask": "When rendering state entries as a list, what should a stable key represent?",
          "options": [
            "The entry's current array position after filtering and sorting change its current location.",
            "The entry's stable identity across edits and moves so React can match the same entry.",
            "The entry's current display text so a text edit can preserve its existing identity.",
            "The entry's latest object reference so a copied object can keep its mounted state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-useeffect-l2-s2-q16",
        "topicId": "react-useeffect",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [water, setWater] = useState(1);\n  const full = water >= 3;\n  useEffect(() => { console.log(full ? 'full' : 'low'); }, [full]);\n  return <>\n    <button onClick={() => setWater(value => value + 1)}>Fill basin</button>\n    <button onClick={() => setWater(1)}>Drain basin</button>\n    <p>{water}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Fill basin\"); await click(\"Fill basin\"); await click(\"Fill basin\"); await click(\"Drain basin\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect finishes, click `Fill basin` three times, then `Drain basin` once. Let effects finish after each click. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "low,full,low"
          ]
        },
        "partB": {
          "ask": "Why should a state change caused directly by a user's click often stay in its event handler?",
          "options": [
            "The handler can modify state variables directly without passing values to setters.",
            "The handler runs before the component mounts, letting it prepare the output.",
            "The handler expresses a user interaction directly without an extra effect to infer it.",
            "The handler pauses browser paint until requests started inside it have been resolved."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-memoization-l2-s2-q17",
        "topicId": "react-memoization",
        "set": 2,
        "environment": "react",
        "code": "import { useMemo, useState } from 'react';\nexport default function App() {\n  const [length, setLength] = useState(4);\n  const [rate, setRate] = useState(2);\n  const charge = useMemo(() => length * rate, [length]);\n  return <>\n    <button onClick={() => setRate(5)}>Change fabric rate</button>\n    <button onClick={() => setLength(value => value + 1)}>Add fabric</button>\n    <p>{charge}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Change fabric rate\"); const earlier = text(\"p\"); await click(\"Add fabric\"); return earlier + \"/\" + text(\"p\"); })()",
        "partA": {
          "ask": "Click `Change fabric rate` and note the paragraph's number. Then click `Add fabric` and note its new number. Answer with those numbers in order, separated by a slash.",
          "accepted": [
            "8/25"
          ]
        },
        "partB": {
          "ask": "Where should another hook be called when a component also uses `useMemo`?",
          "options": [
            "Call it at the component's top level where the hook call order stays consistent.",
            "Call it inside the whole memo calculation so React can reuse its internal hook state.",
            "Call it inside the dependency array so React can track the returned hook value.",
            "Call it from the event handler that changes the memo calculation's input value."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-rerenders-l2-s2-q18",
        "topicId": "react-rerenders",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction BadgeText({ count }) {\n  console.log('badge');\n  return <p>{count} badges</p>;\n}\nfunction BadgeStand({ draw }) {\n  const [count, setCount] = useState(1);\n  console.log('stand');\n  return <>\n    <button onClick={() => setCount(value => value + 1)}>Add badge</button>\n    {draw(count)}\n  </>;\n}\nexport default function App() {\n  console.log('stall');\n  return <BadgeStand draw={count => <BadgeText count={count} />} />;\n}",
        "check": "(async () => { await click(\"Add badge\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click `Add badge` once and let the update finish. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "stall,stand,badge,stand,badge"
          ]
        },
        "partB": {
          "ask": "Why should a component that uses hooks be rendered through JSX instead of being called as a plain function?",
          "options": [
            "JSX caches the returned markup so the component can reuse its earlier hook values.",
            "JSX lets the parent read the child's hook state without passing a callback as a prop.",
            "JSX gives React a separate component boundary to manage its own identity and hook state.",
            "JSX moves new hook execution into effects after the parent finishes its current render."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-conditional-rendering-l2-s3-q01",
        "topicId": "react-conditional-rendering",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Oven({ visible }) {\n  const [heat, setHeat] = useState(2);\n  if (!visible) return null;\n  return <button onClick={() => setHeat(h => h + 3)}>Heat: {heat}</button>;\n}\nexport default function App() {\n  const [visible, setVisible] = useState(true);\n  return <>\n    <button onClick={() => setVisible(v => !v)}>Toggle oven</button>\n    <Oven visible={visible} />\n  </>;\n}",
        "check": "(async () => { await click(\"Heat: 2\"); await click(\"Toggle oven\"); await click(\"Toggle oven\"); return text(\"button:last-child\"); })()",
        "partA": {
          "ask": "Click the button labeled Heat: 2, then Toggle oven twice, letting updates finish between clicks. What text does the oven button show? Answer with the full label.",
          "accepted": [
            "Heat: 5",
            "5"
          ]
        },
        "partB": {
          "ask": "Why must a hook call appear before a conditional return in its component?",
          "options": [
            "The return value determines the starting values of hooks.",
            "The hook name connects its state to matching JSX elements.",
            "React matches hook state by the order of hook calls.",
            "A conditional return schedules hook calls for a later effect."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-components-props-l2-s3-q02",
        "topicId": "react-components-props",
        "set": 3,
        "environment": "react",
        "code": "function Tagline({ children, suffix = '!' }) {\n  return <p>{children ?? 'Blank'}{suffix ?? '?'}</p>;\n}\nfunction Label({ word }) {\n  return <Tagline children=\"Stored\" suffix={null}>{word + word}</Tagline>;\n}\nexport default function App() {\n  return <Label word=\"ha\" />;\n}",
        "check": "(async () => text(\"p\"))()",
        "partA": {
          "ask": "On the first render, what text does the paragraph in `Tagline` show? Answer with the exact text.",
          "accepted": [
            "haha?"
          ]
        },
        "partB": {
          "ask": "A parent needs to pass a changing message to a child. Which design fits props?",
          "options": [
            "Pass the message as a prop and let the parent update its own state.",
            "Assign the new message to the child props object during an event.",
            "Store the message on the component function for the child to read.",
            "Return the new message from the child to replace the parent state."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-memoization-l2-s3-q03",
        "topicId": "react-memoization",
        "set": 3,
        "environment": "react",
        "code": "import { memo, useCallback, useState } from 'react';\nconst ReelButton = memo(function ReelButton({ wind }) {\n  console.log('reel');\n  return <button onClick={wind}>Wind reel</button>;\n});\nexport default function App() {\n  const [turns, setTurns] = useState(0);\n  const [step, setStep] = useState(2);\n  const wind = useCallback(() => setTurns(t => t + step), [step]);\n  return <>\n    <ReelButton wind={wind} />\n    <button onClick={() => setStep(5)}>Change gear</button>\n    <p>{turns}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Wind reel\"); await click(\"Change gear\"); await click(\"Wind reel\"); return logs().split(\",\").filter(line => line === \"reel\").length; })()",
        "partA": {
          "ask": "Include the initial render. Click Wind reel, Change gear, then Wind reel, letting updates finish between clicks. How many times is the word reel logged in total? Answer with a number.",
          "accepted": [
            "2",
            "2 times",
            "2 renders"
          ]
        },
        "partB": {
          "ask": "Which statement describes a safe use of a custom prop comparison with `memo`?",
          "options": [
            "Compare displayed text alone, since handlers do not affect output.",
            "Compare incoming state values to determine whether child props should update.",
            "Compare component names to decide whether their props are equivalent.",
            "Compare function props too, since their closures can alter behavior."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain step by step when `ReelButton` renders and how `wind` changes.",
          "keyPoints": [
            "The initial mount renders `ReelButton`.",
            "`wind` keeps its reference when `turns` changes.",
            "Changing `step` creates a new `wind` reference and renders `ReelButton` again.",
            "The final winding uses the new `step` without changing the callback reference."
          ],
          "modelAnswer": "`ReelButton` renders on mount. The first winding updates `turns`, but `wind` keeps its reference because `step` has not changed. Changing `step` creates a new `wind`, so `ReelButton` renders again. The last winding updates `turns` through that new callback and does not add another child render."
        }
      },
      {
        "id": "react-custom-hooks-l2-s3-q04",
        "topicId": "react-custom-hooks",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction useQuota(start) {\n  const [quota, setQuota] = useState(start);\n  return { quota, spend: () => setQuota(q => q - 1), reset: () => setQuota(start) };\n}\nexport default function App() {\n  const [start, setStart] = useState(4);\n  const { quota, spend, reset } = useQuota(start);\n  return <>\n    <button onClick={spend}>Use token</button>\n    <button onClick={() => setStart(9)}>Change allowance</button>\n    <button onClick={reset}>Reset allowance</button>\n    <p>{quota}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Use token\"); await click(\"Change allowance\"); await click(\"Reset allowance\"); await click(\"Use token\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Use token, Change allowance, Reset allowance, then Use token. Let updates finish between clicks. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "8",
            "8 tokens"
          ]
        },
        "partB": {
          "ask": "What is a useful reason to extract logic into a custom hook?",
          "options": [
            "Move component state into a shared module level variable.",
            "Reuse stateful logic through a focused hook interface.",
            "Render a reusable section of markup outside its parent.",
            "Cache a calculation without providing its changing inputs."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-data-fetching-l2-s3-q05",
        "topicId": "react-data-fetching",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction readLedger() {\n  return new Promise(resolve => setTimeout(() => resolve({ shelf: 3 }), 10));\n}\nfunction readShelf(shelf) {\n  return new Promise(resolve => setTimeout(() => resolve(shelf * 4), 10));\n}\nexport default function App() {\n  const [message, setMessage] = useState('Loading ledger');\n  useEffect(() => {\n    let active = true;\n    readLedger().then(ledger => {\n      if (active) setMessage('Loading shelf');\n      return readShelf(ledger.shelf);\n    }).then(total => { if (active) setMessage((total - 2) + ' volumes'); });\n    return () => { active = false; };\n  }, []);\n  return <p>{message}</p>;\n}",
        "check": "(async () => { await wait(80); return text(\"p\"); })()",
        "partA": {
          "ask": "After mounting, wait 80 ms for the two fake requests to finish. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "10 volumes",
            "10"
          ]
        },
        "partB": {
          "ask": "A fake request might reject. Which approach handles that failure in a promise chain?",
          "options": [
            "Read the promise status property in the next component render pass.",
            "Wrap the returned promise in a render boundary to receive its rejection.",
            "Add a rejection handler that records useful error state for rendering.",
            "Return the error from effect cleanup to replace the displayed response text."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain step by step how the two requests produce the final message, and what `active` protects.",
          "keyPoints": [
            "`readLedger` resolves with an object whose `shelf` is 3.",
            "Returning the `readShelf` promise makes the next handler await its result.",
            "`readShelf` resolves to 12, and the display subtracts 2.",
            "Cleanup sets `active` to false so later handlers cannot update the message."
          ],
          "modelAnswer": "`readLedger` resolves with `shelf` set to 3. Its handler starts `readShelf` and returns that promise, so the next handler receives the shelf result rather than the ledger object. The shelf result is 12, and subtracting 2 produces the message 10 volumes. After cleanup, `active` blocks message updates even though the promises can still finish."
        }
      },
      {
        "id": "react-rerenders-l2-s3-q06",
        "topicId": "react-rerenders",
        "set": 3,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nfunction Chime({ beats }) {\n  console.log('chime');\n  return <p>{beats}</p>;\n}\nconst Pendulum = memo(function Pendulum() {\n  const [beats, setBeats] = useState(1);\n  console.log('pendulum');\n  return <>\n    <button onClick={() => setBeats(b => b + 1)}>Swing pendulum</button>\n    <Chime beats={beats} />\n  </>;\n});\nexport default function App() {\n  console.log('clock');\n  return <Pendulum />;\n}",
        "check": "(async () => { await click(\"Swing pendulum\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render, then click Swing pendulum once and let the update finish. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "clock,pendulum,chime,pendulum,chime"
          ]
        },
        "partB": {
          "ask": "What does React do when a component returns the same visible text after an update?",
          "options": [
            "It restores the prior state value because matching text cancels updates.",
            "It replaces the parent DOM element to record the new component result.",
            "It reruns the mount effects because unchanged text signals a new mount.",
            "It can finish rendering without changing the displayed text in the page DOM."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-error-boundaries-l2-s3-q07",
        "topicId": "react-error-boundaries",
        "set": 3,
        "environment": "react",
        "code": "import { Component, useState } from 'react';\nclass Circuit extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() { return this.state.failed ? <p>Power cut</p> : this.props.children; }\n}\nfunction FusePanel() {\n  const [notice, setNotice] = useState('Idle');\n  function test() {\n    try { throw new Error('Fuse loose'); }\n    catch (error) { setNotice(error.message); }\n  }\n  return <><button onClick={test}>Test fuse</button><p>{notice}</p></>;\n}\nexport default function App() {\n  return <Circuit><FusePanel /></Circuit>;\n}",
        "check": "(async () => { await click(\"Test fuse\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Test fuse once and let the update finish. What text does the paragraph show? Answer with the full text.",
          "accepted": [
            "Fuse loose"
          ]
        },
        "partB": {
          "ask": "What happens if an error boundary throws while rendering its own fallback?",
          "options": [
            "An enclosing boundary can catch that failure and display its fallback.",
            "The same boundary can retry the fallback with earlier child props.",
            "The failing fallback becomes the boundary's stored error state by default.",
            "The original child can resume rendering after the fallback is removed."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-state-location-l2-s3-q08",
        "topicId": "react-state-location",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction PackingDesk({ saved, save }) {\n  const [draft, setDraft] = useState(1);\n  return <>\n    <button onClick={() => setDraft(d => d + 2)}>Add draft parcel</button>\n    <button onClick={() => save(draft)}>Save parcels</button>\n    <p>{saved}/{draft}</p>\n  </>;\n}\nexport default function App() {\n  const [saved, save] = useState(0);\n  const [open, setOpen] = useState(true);\n  return <>\n    <button onClick={() => setOpen(o => !o)}>Toggle desk</button>\n    {open && <PackingDesk saved={saved} save={save} />}\n  </>;\n}",
        "check": "(async () => { await click(\"Add draft parcel\"); await click(\"Save parcels\"); await click(\"Toggle desk\"); await click(\"Toggle desk\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Add draft parcel, Save parcels, then Toggle desk twice. Let updates finish between clicks. What text does the paragraph show? Answer with the two numbers separated by a slash.",
          "accepted": [
            "3/1"
          ]
        },
        "partB": {
          "ask": "A total can be calculated from a stored list. How should the total usually be represented?",
          "options": [
            "Keep the total in a ref updated during list rendering.",
            "Copy the total into state and update it in an effect.",
            "Derive the total during rendering from the stored list state.",
            "Attach the total to the list object before calling its setter."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-stale-closures-l2-s3-q09",
        "topicId": "react-stale-closures",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [depth, setDepth] = useState(2);\n  function lowerLater() {\n    setTimeout(() => setDepth(depth + 1), 50);\n  }\n  return <>\n    <button onClick={lowerLater}>Schedule lowering</button>\n    <button onClick={() => setDepth(10)}>Set deep mark</button>\n    <p>{depth}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Schedule lowering\"); await click(\"Set deep mark\"); await wait(80); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Schedule lowering, then Set deep mark before the 50 ms timer fires. Wait 80 ms after the second click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "3",
            "3 units"
          ]
        },
        "partB": {
          "ask": "Which technique lets a delayed calculation read the most recently committed state?",
          "options": [
            "Wrap the original handler with an empty dependency callback.",
            "Read a ref synchronized with state after updates commit.",
            "Copy the state into a constant before scheduling the timer.",
            "Await the state setter before reading the captured variable."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain step by step which `depth` the timer uses and how a functional updater would change the outcome.",
          "keyPoints": [
            "The scheduled callback closes over `depth` equal to 2.",
            "Set deep mark changes the visible state to 10 before the timer runs.",
            "The timer replaces state with 3 from its captured value.",
            "Using `setDepth(d => d + 1)` would update the latest state to 11."
          ],
          "modelAnswer": "`lowerLater` schedules a callback from the render where `depth` is 2. Set deep mark updates the state to 10, but it does not change that callback's captured value. The timer therefore calls `setDepth` with 3 and replaces the newer state. With `setDepth(d => d + 1)`, the timer would use the latest state and produce 11."
        }
      },
      {
        "id": "react-reconciliation-l2-s3-q10",
        "topicId": "react-reconciliation",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Tile() {\n  const [dots, setDots] = useState(1);\n  return <button onClick={() => setDots(d => d + 2)}>Dots: {dots}</button>;\n}\nexport default function App() {\n  const [edition, setEdition] = useState(0);\n  return <>\n    <button onClick={() => setEdition(e => e + 1)}>New mosaic</button>\n    <section key={edition}><Tile key=\"center\" /></section>\n  </>;\n}",
        "check": "(async () => { await click(\"Dots: 1\"); await click(\"New mosaic\"); return text(\"section button\"); })()",
        "partA": {
          "ask": "Click the button labeled Dots: 1, then New mosaic, letting updates finish between clicks. What text does the tile button show? Answer with the full label.",
          "accepted": [
            "Dots: 1",
            "1"
          ]
        },
        "partB": {
          "ask": "How are keys compared when matching children in a rendered tree?",
          "options": [
            "Keys identify child components among siblings of their shared parent.",
            "Keys identify mounted child components across two unrelated parent trees.",
            "Keys determine when pending child effects run during update commits.",
            "Keys become named component props that expose their child's hook state."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-performance-l2-s3-q11",
        "topicId": "react-performance",
        "set": 3,
        "environment": "react",
        "code": "import { lazy, Suspense, useState } from 'react';\nconst Harbor = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Harbor ready</p> }), 10);\n}));\nconst Tide = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Tide ready</p> }), 20);\n}));\nexport default function App() {\n  const [showTide, setShowTide] = useState(false);\n  return <>\n    <button onClick={() => setShowTide(true)}>Open tide</button>\n    <Suspense fallback={<p>Loading harbor</p>}><Harbor /></Suspense>\n    {showTide && <aside><Suspense fallback={<p>Loading tide</p>}><Tide /></Suspense></aside>}\n  </>;\n}",
        "check": "(async () => { await wait(80); await click(\"Open tide\"); return text(\"p\") + \"/\" + text(\"aside p\"); })()",
        "partA": {
          "ask": "After mounting, wait 80 ms for the harbor to load. Click Open tide and read the page before the new 20 ms timer fires. What are the harbor paragraph and the paragraph inside `aside`? Answer with their full texts separated by a slash.",
          "accepted": [
            "Harbor ready/Loading tide"
          ]
        },
        "partB": {
          "ask": "What must a `lazy` loader promise resolve to for a function component?",
          "options": [
            "A JSX element object whose props contain the component loading callback.",
            "A component name string that React uses to locate the requested function.",
            "A cleanup callback that supplies the component after the fallback mounts.",
            "A module shaped object whose default export contains the component function."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-composition-l2-s3-q12",
        "topicId": "react-composition",
        "set": 3,
        "environment": "react",
        "code": "import { cloneElement, useState } from 'react';\nfunction IncrementSlot({ children, amount, add }) {\n  return cloneElement(children, { onClick: () => add(amount) });\n}\nexport default function App() {\n  const [pieces, setPieces] = useState(1);\n  return <>\n    <IncrementSlot amount={3} add={n => setPieces(p => p + n)}>\n      <button onClick={() => setPieces(50)}>Add puzzle pieces</button>\n    </IncrementSlot>\n    <p>{pieces}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Add puzzle pieces\"); await click(\"Add puzzle pieces\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Add puzzle pieces twice, letting the first update finish before the second. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "7",
            "7 pieces"
          ]
        },
        "partB": {
          "ask": "Which design makes a reusable wrapper accept content without inspecting its child props?",
          "options": [
            "Call the child component function to discover its internal local state.",
            "Accept content as `children` and place it in the wrapper markup.",
            "Find the child DOM node and copy its markup into the wrapper tree.",
            "Store child props in shared state for the wrapper to replace."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-router-l2-s3-q13",
        "topicId": "react-router",
        "set": 3,
        "environment": "react",
        "code": "import { MemoryRouter, Routes, Route, useSearchParams } from 'react-router-dom';\nfunction MineralList() {\n  const [query, setQuery] = useSearchParams();\n  const page = Number(query.get('page') ?? 1);\n  return <>\n    <button onClick={() => setQuery({ kind: 'quartz' })}>Choose quartz</button>\n    <p>{query.get('kind')}:{page * 2}</p>\n  </>;\n}\nexport default function App() {\n  return <MemoryRouter initialEntries={['/minerals?kind=slate&page=4']}>\n    <Routes><Route path=\"minerals\" element={<MineralList />} /></Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Choose quartz\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Choose quartz once and let navigation finish. What text does the paragraph show? Answer with the exact text, including the colon.",
          "accepted": [
            "quartz:2"
          ]
        },
        "partB": {
          "ask": "What is the purpose of the `Outlet` component in a parent route?",
          "options": [
            "It lists every child route pattern as links inside the parent route layout.",
            "It redirects the parent route to its first child route when it renders.",
            "It marks where the matched child route renders inside the parent route's layout.",
            "It keeps the parent route layout mounted while the address bar stays unchanged."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain step by step how `setQuery` affects `query`, `page`, and the rendered text.",
          "keyPoints": [
            "The initial search parameters include `kind` and `page`.",
            "`setQuery` receives a replacement object containing `kind` without `page`.",
            "The missing `page` uses the fallback 1.",
            "The new `kind` and doubled `page` produce quartz:2."
          ],
          "modelAnswer": "At first, `query` contains `kind` set to slate and `page` set to 4. The button passes `setQuery` a new object containing `kind` set to quartz, which replaces the search parameters. Because `page` is missing, its fallback is 1. The paragraph therefore shows quartz:2 after multiplying `page` by 2."
        }
      },
      {
        "id": "react-forwarding-refs-l2-s3-q14",
        "topicId": "react-forwarding-refs",
        "set": 3,
        "environment": "react",
        "code": "import { useRef } from 'react';\nfunction AddressEntry({ ref }) {\n  const internal = useRef(null);\n  return <input ref={internal} aria-label=\"Delivery address\" />;\n}\nexport default function App() {\n  const address = useRef(null);\n  const note = useRef(null);\n  return <>\n    <AddressEntry ref={address} />\n    <textarea ref={note} aria-label=\"Delivery note\" />\n    <button onClick={() => {\n      note.current.focus();\n      address.current?.focus();\n    }}>Focus address</button>\n  </>;\n}",
        "check": "(async () => { await click(\"Focus address\"); return focused(); })()",
        "partA": {
          "ask": "Click Focus address once. Which element has focus when the handler finishes? Answer with its lowercase tag name.",
          "accepted": [
            "textarea"
          ]
        },
        "partB": {
          "ask": "Which use of a DOM ref is appropriate in a function component?",
          "options": [
            "Scroll to a mounted DOM element from a user event handler.",
            "Read an input ref during rendering to choose its text.",
            "Change a state object through the DOM ref to trigger a render.",
            "Replace JSX children by assigning new HTML during render calls."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-stale-closures-l2-s3-q15",
        "topicId": "react-stale-closures",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [started, setStarted] = useState(false);\n  const [laps, setLaps] = useState(2);\n  useEffect(() => {\n    if (!started) return;\n    let ticks = 0;\n    const timer = setInterval(() => {\n      setLaps(current => current + 2);\n      ticks += 1;\n      if (ticks === 3) clearInterval(timer);\n    }, 10);\n    return () => clearInterval(timer);\n  }, [started]);\n  return <>\n    <button onClick={() => setStarted(true)}>Start laps</button>\n    <button onClick={() => setLaps(10)}>Set lap baseline</button>\n    <p>{laps}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Set lap baseline\"); await click(\"Start laps\"); await wait(80); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Set lap baseline, then Start laps. Wait 80 ms for the three interval ticks to finish. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "16",
            "16 laps"
          ]
        },
        "partB": {
          "ask": "What can an effect cleanup do for a repeating timer?",
          "options": [
            "Restore the state snapshot captured before the timer began running.",
            "Stop future timer callbacks when that effect is replaced or unmounted.",
            "Refresh the callback closure with values from the next render pass.",
            "Delay state commits until the remaining timer callbacks have fired."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-data-fetching-l2-s3-q16",
        "topicId": "react-data-fetching",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nconst pending = new Map();\nfunction readBundle(name) {\n  return new Promise(resolve => pending.set(name, resolve));\n}\nexport default function App() {\n  const [bundle, setBundle] = useState('linen');\n  const [result, setResult] = useState('Loading');\n  useEffect(() => { readBundle(bundle).then(setResult); }, [bundle]);\n  return <>\n    <button onClick={() => setBundle('wool')}>Request wool</button>\n    <button onClick={() => pending.get('wool')('Wool ready')}>Finish wool</button>\n    <button onClick={() => pending.get('linen')('Linen ready')}>Finish linen</button>\n    <p>{bundle}/{result}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Request wool\"); await click(\"Finish wool\"); await click(\"Finish linen\"); return text(\"p\"); })()",
        "partA": {
          "ask": "After the initial effect registers its request, click Request wool, Finish wool, then Finish linen. Let effects and promise handlers finish between clicks. What text does the paragraph show? Answer with the exact text, including the slash.",
          "accepted": [
            "wool/Linen ready"
          ]
        },
        "partB": {
          "ask": "Why should a data cache key include the inputs used to request a resource?",
          "options": [
            "The key schedules requests after the component finishes unmounting.",
            "The cache key cancels the pending promise producing its entry.",
            "The key turns rejected promises into successful response results.",
            "Different inputs can identify different resources in the cache."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-reconciliation-l2-s3-q17",
        "topicId": "react-reconciliation",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction Candle({ label }) {\n  const [flames, setFlames] = useState(1);\n  return <button onClick={() => setFlames(f => f + 1)}>{label}: {flames}</button>;\n}\nexport default function App() {\n  const [evening, setEvening] = useState(false);\n  return <>\n    <button onClick={() => setEvening(e => !e)}>Change setting</button>\n    {evening ? <Candle label=\"Evening\" /> : <Candle label=\"Morning\" />}\n  </>;\n}",
        "check": "(async () => { await click(\"Morning: 1\"); await click(\"Change setting\"); return text(\"button:last-child\"); })()",
        "partA": {
          "ask": "Click the button labeled Morning: 1, then Change setting, letting updates finish between clicks. What text does the candle button show? Answer with the full label.",
          "accepted": [
            "Evening: 2",
            "2"
          ]
        },
        "partB": {
          "ask": "What does a stable key represent for a child in a collection?",
          "options": [
            "Its current position within the sorted array.",
            "Its displayed text after a label edit occurs.",
            "Its identity across edits to the collection.",
            "Its component function name within the module."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-custom-hooks-l2-s3-q18",
        "topicId": "react-custom-hooks",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction useSettledWord(word) {\n  const [settled, setSettled] = useState(word);\n  useEffect(() => {\n    const timer = setTimeout(() => setSettled(word), 30);\n    return () => clearTimeout(timer);\n  }, [word]);\n  return settled;\n}\nexport default function App() {\n  const [word, setWord] = useState('reed');\n  const settled = useSettledWord(word);\n  return <>\n    <button onClick={() => setWord('fern')}>Choose fern</button>\n    <p>{word}/{settled}</p>\n  </>;\n}",
        "check": "(async () => { await click(\"Choose fern\"); const before = text(\"p\"); await wait(80); return before + \",\" + text(\"p\"); })()",
        "partA": {
          "ask": "Click Choose fern before the initial 30 ms timer fires. Read the paragraph after the update but before the replacement timer fires, then read it again after waiting 80 ms. Answer with the two full texts separated by a comma, without spaces.",
          "accepted": [
            "fern/reed,fern/fern"
          ]
        },
        "partB": {
          "ask": "A custom hook returns an object. Which statement describes that object?",
          "options": [
            "Its shape follows the hook API chosen by the developer.",
            "Its fields are merged into the caller component props.",
            "Its identity is preserved by React across caller renders.",
            "Its methods run as effects when the caller commits updates."
          ],
          "correct": 0
        }
      }
    ],
};
