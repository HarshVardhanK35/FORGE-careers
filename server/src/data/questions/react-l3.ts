// React, level 3 (hard, production level): 3 sets of 15 questions: find the bug, predict the order or result, review a flaw and
// design choice. Written with Codex, then checked: every `check` was run on the rendered component in jsdom (react and react-dom 19,
// not in Strict Mode) and equals one of the accepted answers; the answer options were checked so that neither their length nor their
// wording gives a clue. A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const REACT_LEVEL_3: QuestionBank = {
  skillId: "react",
  level: 3,
  questions: [
      {
        "id": "react-stale-closures-l3-s1-q01",
        "topicId": "react-stale-closures",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [queued, setQueued] = useState(2);\n  const [sent, setSent] = useState(0);\n  function schedule() {\n    setTimeout(() => setSent(queued), 40);\n  }\n  return <section>\n    <button onClick={schedule}>Schedule dispatch</button>\n    <button onClick={() => setQueued(n => n + 3)}>Queue files</button>\n    <p>{queued}/{sent}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Schedule dispatch\"); await click(\"Queue files\"); await wait(50); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Schedule dispatch`, then `Queue files` before the timer fires. Let the queue update finish, then wait 50 ms. What does the paragraph show? Answer with the two numbers separated by a slash.",
          "accepted": [
            "5/2"
          ]
        },
        "partB": {
          "ask": "Dispatch should read the queue at execution time. Which change supports that requirement?",
          "options": [
            "Move the saved dispatch function into state and keep its preparation-time inputs.",
            "Wrap the preparation handler in a memoized callback with an empty dependency list.",
            "Read the queue from a ref refreshed after commits when delayed work executes.",
            "Add a longer delay before running the existing dispatch function from the handler."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain how scheduling the dispatch, changing the queue, and firing the timer lead to the displayed result.",
          "keyPoints": [
            "Scheduling creates a timeout callback that captures `queued` from that render.",
            "Changing `queued` creates new handlers but does not replace the pending timeout callback.",
            "The timeout reads the captured queue value, while the screen reads current state."
          ],
          "modelAnswer": "Scheduling the dispatch creates a timeout callback when `queued` is two. Queueing files changes `queued` to five and renders the screen again. The pending callback still belongs to the earlier render, so it sets `sent` to two. The paragraph combines the current queue with that older dispatch value."
        }
      },
      {
        "id": "react-useeffect-l3-s1-q02",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction UploadMonitor() {\n  useEffect(() => {\n    function finished() { console.log('receipt'); }\n    window.addEventListener('upload-finished', finished);\n  }, []);\n  return <small>Watching uploads</small>;\n}\nexport default function App() {\n  const [watching, setWatching] = useState(true);\n  return <section>\n    <button onClick={() => setWatching(v => !v)}>Toggle monitor</button>\n    <button onClick={() => window.dispatchEvent(new Event('upload-finished'))}>Finish upload</button>\n    {watching && <UploadMonitor />}\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle monitor\"); await click(\"Toggle monitor\"); await click(\"Finish upload\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect finishes, click `Toggle monitor` twice, letting effects finish after each click. Click `Finish upload` once. What is the console order? Answer with words separated by commas, without spaces.",
          "accepted": [
            "receipt,receipt"
          ]
        },
        "partB": {
          "ask": "The monitor must tolerate repeated mounting. Which change gives its subscription the right lifetime?",
          "options": [
            "Return cleanup that removes the listener using the same event name and function.",
            "Register the listener during rendering so its lifetime follows the visible screen.",
            "Move the visibility flag to a ref so toggling the monitor avoids state updates.",
            "Add the visibility flag as a key so the monitor gets a component identity."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usestate-l3-s1-q03",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nconst CartTotal = memo(function CartTotal({ lines }) {\n  return <p>{lines.reduce((sum, line) => sum + line.price, 0)}</p>;\n});\nexport default function App() {\n  const [lines, setLines] = useState([{ id: 'tea', price: 4 }]);\n  const [expanded, setExpanded] = useState(false);\n  function addMug() {\n    lines.push({ id: 'mug', price: 7 });\n    setLines(lines);\n  }\n  return <section>\n    <button onClick={addMug}>Add mug</button>\n    <button onClick={() => setExpanded(v => !v)}>Toggle details</button>\n    <small>{expanded ? lines.length + ' lines' : 'Cart'}</small>\n    <CartTotal lines={lines} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Add mug\"); await click(\"Toggle details\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Add mug`, then `Toggle details`, letting updates finish after each click. What number remains in the cart total paragraph? Answer with a number.",
          "accepted": [
            "4",
            "4 credits"
          ]
        },
        "partB": {
          "ask": "Which change keeps the cart data and its memoized total consistent after adding a product?",
          "options": [
            "Remove the memo wrapper and leave the existing array update in the add handler.",
            "Toggle the detail state inside the add handler to force the parent to render.",
            "Store the total in a ref and update the ref after modifying the existing array.",
            "Build a fresh array in a functional setter when appending the new product record."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-reconciliation-l3-s1-q04",
        "topicId": "react-reconciliation",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction TaskRow({ task, save }) {\n  const [draft, setDraft] = useState(task.title);\n  return <li>\n    <input aria-label={task.id} value={draft} onChange={e => setDraft(e.target.value)} />\n    <button onClick={() => save(task.id + ':' + draft)}>Save {task.id}</button>\n  </li>;\n}\nexport default function App() {\n  const [tasks, setTasks] = useState([\n    { id: 'a', title: 'Audit' }, { id: 'b', title: 'Build' }, { id: 'c', title: 'Check' }\n  ]);\n  const [saved, setSaved] = useState('Pending');\n  return <section>\n    <button onClick={() => setTasks(list => list.filter(task => task.id !== 'b'))}>Remove middle task</button>\n    <ul>{tasks.map((task, index) => <TaskRow key={index} task={task} save={setSaved} />)}</ul>\n    <p>{saved}</p>\n  </section>;\n}",
        "check": "(async () => { await type(\"input[aria-label=b]\", \"Urgent\"); await click(\"Remove middle task\"); await click(\"Save c\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Replace the input labeled b with Urgent. Click `Remove middle task`, then `Save c`, letting updates finish between actions. What text does the paragraph show? Answer with the exact text.",
          "accepted": [
            "c:Urgent"
          ]
        },
        "partB": {
          "ask": "Which change lets an edited row follow its task through removal and reordering?",
          "options": [
            "Use the current draft text as the row key so editing gives the row a new identity.",
            "Use the task identifier as the row key so drafts stay attached to the same task.",
            "Use the list length as the row key so deletion rebuilds the task rows.",
            "Move the row definition into the parent so parent updates recreate its local state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-data-fetching-l3-s1-q05",
        "topicId": "react-data-fetching",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction searchCatalog(term) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve(term + ' matches'), term === 'lamp' ? 40 : 5);\n  });\n}\nexport default function App() {\n  const [result, setResult] = useState('No search');\n  function search(term) {\n    setResult('Loading');\n    searchCatalog(term).then(setResult);\n  }\n  return <section>\n    <button onClick={() => search('lamp')}>Search lamps</button>\n    <button onClick={() => search('desk')}>Search desks</button>\n    <p>{result}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Search lamps\"); await click(\"Search desks\"); await wait(50); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Search lamps` and then `Search desks` before either request finishes. Wait 50 ms after the second click. What does the paragraph show? Answer with the full text.",
          "accepted": [
            "lamp matches"
          ]
        },
        "partB": {
          "ask": "Search results must belong to the latest request. Which change enforces that requirement?",
          "options": [
            "Clear the previous result when a search starts, before attaching its promise handler.",
            "Put the response state update in a transition so it has less urgent priority.",
            "Memoize the search handler by its term so the promise keeps the matching search text.",
            "Assign request numbers and accept a response when its number matches the latest one."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-rerenders-l3-s1-q06",
        "topicId": "react-rerenders",
        "set": 1,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nfunction QueueLabel() {\n  console.log('label');\n  return <small>Review queue</small>;\n}\nconst QueueHelp = memo(function QueueHelp() {\n  console.log('help');\n  return <small>Choose a document</small>;\n});\nfunction QueuePanel({ children }) {\n  const [page, setPage] = useState(1);\n  console.log('panel');\n  return <section>\n    <button onClick={() => setPage(n => n + 1)}>Next queue page</button>\n    <p>{page}</p><QueueLabel /><QueueHelp />{children}\n  </section>;\n}\nfunction QueueBanner() {\n  console.log('banner');\n  return <aside>Pending review</aside>;\n}\nexport default function App() {\n  const [compact, setCompact] = useState(false);\n  console.log('shell');\n  return <main data-compact={compact}>\n    <button onClick={() => setCompact(v => !v)}>Toggle queue layout</button>\n    <QueuePanel><QueueBanner /></QueuePanel>\n  </main>;\n}",
        "check": "(async () => { await click(\"Next queue page\"); await click(\"Toggle queue layout\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render. Click `Next queue page`, then `Toggle queue layout`, letting updates finish after each click. What is the console order? Answer with words separated by commas, without spaces.",
          "accepted": [
            "shell,panel,label,help,banner,panel,label,shell,panel,label,banner"
          ]
        },
        "partB": {
          "ask": "Why should a render function avoid side effects such as network requests?",
          "options": [
            "React may call a render again or discard it, so a side effect could repeat or never finish.",
            "React runs render functions after the browser paints, so side effects arrive too late to matter.",
            "React freezes the props during render, so a side effect cannot read the values it needs.",
            "React stores render results in a cache, so a side effect would write into stale shared data."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain the render sequence for the local page update and the layout update. Include the memoized child and the supplied child element.",
          "keyPoints": [
            "The local state update renders `QueuePanel` and its ordinary `QueueLabel` child.",
            "`QueueHelp` can skip these updates because its props do not change.",
            "The local update reuses the same `children` element, while the `App` update creates a new `QueueBanner` element.",
            "`App` does not render for the state change inside `QueuePanel`."
          ],
          "modelAnswer": "The initial render visits `App`, `QueuePanel`, `QueueLabel`, `QueueHelp`, and `QueueBanner` in tree order. Changing the local page renders `QueuePanel` and `QueueLabel`, while `App` stays untouched. `QueueHelp` skips the update because its props match, and the supplied `children` element is reused. Changing the layout renders `App` and creates a new `QueueBanner` element, so that update also visits `QueueBanner` after `QueueLabel`."
        }
      },
      {
        "id": "react-useeffect-l3-s1-q07",
        "topicId": "react-useeffect",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction ChannelView({ room }) {\n  useEffect(() => {\n    console.log('view-open-' + room);\n    return () => console.log('view-close-' + room);\n  }, [room]);\n  return <p>{room}</p>;\n}\nfunction ChannelSession({ room }) {\n  useEffect(() => {\n    console.log('session-open-' + room);\n    return () => console.log('session-close-' + room);\n  }, [room]);\n  return <ChannelView room={room} />;\n}\nexport default function App() {\n  const [room, setRoom] = useState('draft');\n  return <section>\n    <button onClick={() => setRoom('live')}>Join live room</button>\n    <ChannelSession room={room} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Join live room\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effects finish, click `Join live room` once and let effects finish. What is the complete console order, including mount logs? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "view-open-draft,session-open-draft,view-close-draft,session-close-draft,view-open-live,session-open-live"
          ]
        },
        "partB": {
          "ask": "A screen needs one external operation to finish before another starts. Which structure expresses that dependency?",
          "options": [
            "Use separate sibling effects and treat their source order as an asynchronous barrier.",
            "Use a layout effect for the later operation so pending promises settle before it runs.",
            "Use one effect that sequences the operations and cleans up the resources it creates.",
            "Use a shared dependency array so React waits for the earlier effect promise to resolve."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usestate-l3-s1-q08",
        "topicId": "react-usestate",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [reserved, setReserved] = useState(3);\n  useEffect(() => {\n    console.log('commit-' + reserved);\n  }, [reserved]);\n  function reserveBatch() {\n    console.log('begin-' + reserved);\n    setReserved(reserved + 2);\n    setReserved(n => n * 2);\n    setReserved(reserved + 1);\n    setReserved(n => n + 3);\n    console.log('end-' + reserved);\n  }\n  return <section>\n    <button onClick={reserveBatch}>Reserve batch</button>\n    <p>{reserved}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Reserve batch\"); return logs(); })()",
        "partA": {
          "ask": "After the first effect finishes, click `Reserve batch` once and let effects finish. What is the complete console order, including the initial effect? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "commit-3,begin-3,end-3,commit-7"
          ]
        },
        "partB": {
          "ask": "A pending update should add a value computed by a pure helper. Which use of that helper is safe?",
          "options": [
            "Have the helper assign to the captured state variable before returning its result.",
            "Have the helper write the number into the paragraph before returning the value.",
            "Have the helper return a number without changing objects or triggering side effects.",
            "Have the helper call a state setter and use its return value as the same computed number."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-events-l3-s1-q09",
        "topicId": "react-events",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [selected, setSelected] = useState(0);\n  useEffect(() => { console.log('paint-' + selected); }, [selected]);\n  return <section onClick={() => {\n    console.log('list-' + selected);\n    setSelected(n => n + 10);\n  }}>\n    <article onClick={() => console.log('card-' + selected)}>\n      <button onClick={() => {\n        setSelected(n => n + 1);\n        console.log('choose-' + selected);\n      }}>Select listing</button>\n    </article>\n    <p>{selected}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Select listing\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect finishes, click directly on `Select listing` once and let effects finish. What is the complete console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "paint-0,choose-0,card-0,list-0,paint-11"
          ]
        },
        "partB": {
          "ask": "An outer handler should react to clicks on its own background. Which condition implements that policy?",
          "options": [
            "Handle the click when the action was prevented by a descendant handler.",
            "Handle the click when the event target matches the handler current target node.",
            "Handle the click when the event reports that it can bubble through its ancestors.",
            "Handle the click when the clicked target tag differs from the background node tag."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-custom-hooks-l3-s1-q10",
        "topicId": "react-custom-hooks",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction useAuditFilter(team) {\n  return { team, status: 'open' };\n}\nexport default function App() {\n  const [team] = useState('support');\n  const [passes, setPasses] = useState(0);\n  const filter = useAuditFilter(team);\n  useEffect(() => {\n    console.log('audit');\n    if (passes < 3) setPasses(n => n + 1);\n  }, [filter, passes]);\n  return <section>\n    <h1>Audit feed</h1>\n    <p>{passes}</p>\n  </section>;\n}",
        "check": "(async () => { return logs().split(\",\").filter(line => line === \"audit\").length; })()",
        "partA": {
          "ask": "Mount the screen and let the effect and its guarded updates finish. How many audit console lines are recorded? Answer with a number.",
          "accepted": [
            "4",
            "4 runs",
            "4 times"
          ]
        },
        "partB": {
          "ask": "The effect should follow filter changes; the counter is a diagnostic guard. Which refactor removes this feedback cycle?",
          "options": [
            "Memoize `filter`; put the counter guard inside a functional update and depend on `filter`.",
            "Keep the object dependency and remove the guard so updates can finish naturally.",
            "Use an empty dependency list so the effect retains its original filter for later teams.",
            "Move the counter into the hook and return its fresh object as the effect dependency."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-memoization-l3-s1-q11",
        "topicId": "react-memoization",
        "set": 1,
        "environment": "react",
        "code": "import { useCallback, useState } from 'react';\nconst shipments = [\n  { id: 'r', region: 'east', ready: true },\n  { id: 's', region: 'east', ready: false },\n  { id: 't', region: 'west', ready: true }\n];\nexport default function App() {\n  const [region] = useState('east');\n  const [readyOnly, setReadyOnly] = useState(true);\n  const [visible, setVisible] = useState('Not checked');\n  const include = useCallback(shipment => {\n    return shipment.region === region && (!readyOnly || shipment.ready);\n  }, [region]);\n  return <section>\n    <button onClick={() => setReadyOnly(false)}>Include waiting shipments</button>\n    <button onClick={() => setVisible(shipments.filter(include).map(s => s.id).join(','))}>Apply shipment filter</button>\n    <p>{visible}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Include waiting shipments\"); await click(\"Apply shipment filter\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Include waiting shipments`, then `Apply shipment filter`, letting updates finish between clicks. What does the paragraph show? Answer with the shipment identifiers separated by commas, without spaces.",
          "accepted": [
            "r"
          ]
        },
        "partB": {
          "ask": "Which review practice helps keep a memoized predicate correct as filter controls are added?",
          "options": [
            "List the rendered fields and use that list to decide which captured values can be omitted.",
            "List the reactive values read by the predicate and verify its dependencies cover them.",
            "List the array identifiers and substitute them for the dependency values read by the callback.",
            "List the button handlers and rebuild the predicate when a handler stores its filtered result."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-forms-l3-s1-q12",
        "topicId": "react-forms",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [address, setAddress] = useState('');\n  const [candidate, setCandidate] = useState('');\n  const [status, setStatus] = useState('Not saved');\n  function save(event) {\n    event.preventDefault();\n    setStatus(address.trim() ? 'Saved' : 'Missing address');\n  }\n  return <form onSubmit={save}>\n    <label>Delivery address\n      <input value={address} onChange={e => setCandidate(e.target.value)} />\n    </label>\n    <button type=\"submit\">Save delivery</button>\n    <p>{status}</p>\n    <small>{candidate ? 'Edited' : 'Untouched'}</small>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"Dock 8\"); await submit(); return text(\"p\"); })()",
        "partA": {
          "ask": "Type Dock 8 into the empty Delivery address input, then submit the form once. Let updates finish between actions. What does the paragraph show? Answer with the full text.",
          "accepted": [
            "Missing address"
          ]
        },
        "partB": {
          "ask": "The address must stay editable and be validated on submission. Which ownership model suits this form?",
          "options": [
            "Keep the bound value fixed and validate the candidate state captured by the change handler.",
            "Remove the change handler and use the bound value as the editable browser-managed draft.",
            "Write the typed value through a DOM ref and keep the submitted state value unchanged.",
            "Bind the value to the editable draft state and update that state from the change handler."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-state-location-l3-s1-q13",
        "topicId": "react-state-location",
        "set": 1,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction RegionPicker({ region, change }) {\n  return <button onClick={() => change(region === 'north' ? 'south' : 'north')}>Switch service region</button>;\n}\nfunction SlotList({ region }) {\n  return <p>{region === 'north' ? '2 slots' : '5 slots'}</p>;\n}\nfunction BookingPreview({ region }) {\n  return <output>{region.toUpperCase()}</output>;\n}\nfunction BookingFooter({ region }) {\n  return <footer><BookingPreview region={region} /></footer>;\n}\nfunction BookingLayout({ region }) {\n  return <aside><BookingFooter region={region} /></aside>;\n}\nexport default function App() {\n  const [region, setRegion] = useState('north');\n  const [showPicker, setShowPicker] = useState(true);\n  return <main>\n    <button onClick={() => setShowPicker(v => !v)}>Toggle region controls</button>\n    {showPicker && <RegionPicker region={region} change={setRegion} />}\n    <SlotList region={region} /><BookingLayout region={region} />\n  </main>;\n}",
        "check": "(async () => { await click(\"Switch service region\"); await click(\"Toggle region controls\"); await click(\"Toggle region controls\"); await click(\"Switch service region\"); return text(\"p\") + \"/\" + text(\"output\"); })()",
        "partA": {
          "ask": "Click `Switch service region`, hide and show the picker with two clicks on `Toggle region controls`, then click `Switch service region` again. Let updates finish between clicks. What do the slot paragraph and preview show? Answer with their texts separated by a slash.",
          "accepted": [
            "2 slots/NORTH"
          ]
        },
        "partB": {
          "ask": "The picker, slot list, and nested preview must agree after edits. Which state boundary fits that requirement?",
          "options": [
            "Keep one region value in their common parent and pass values and edit requests down.",
            "Keep independent region state in the siblings and synchronize it through mounting effects.",
            "Keep the region inside the picker and copy its initial value into the preview component.",
            "Keep the region in a module variable and let consumers read it during unrelated renders."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain when keeping the region inside the picker would be a better design, and when a scoped context would help instead.",
          "keyPoints": [
            "Local state suits a private draft that other components do not need yet.",
            "A shared committed region belongs above the components that must agree.",
            "A scoped context can distribute shared state through many intermediate components."
          ],
          "modelAnswer": "State inside `RegionPicker` would suit a temporary selection that stays private until confirmation. The shared committed `region` should still have one owner above the displays that use it. A scoped context would help if many nested consumers needed that same value and passing props became repetitive. For this small tree, direct props keep the data flow easy to follow."
        }
      },
      {
        "id": "react-usecontext-l3-s1-q14",
        "topicId": "react-usecontext",
        "set": 1,
        "environment": "react",
        "code": "import { createContext, memo, useContext, useState } from 'react';\nconst Appearance = createContext(null);\nconst ThemeSwatch = memo(function ThemeSwatch() {\n  const { theme } = useContext(Appearance);\n  console.log('swatch');\n  return <output>{theme}</output>;\n});\nexport default function App() {\n  const [theme, setTheme] = useState('light');\n  const [drawer, setDrawer] = useState(false);\n  return <Appearance value={{ theme, setTheme, drawer }}>\n    <button onClick={() => setDrawer(v => !v)}>Toggle settings drawer</button>\n    <button onClick={() => setTheme('dark')}>Use dark theme</button>\n    <ThemeSwatch />\n  </Appearance>;\n}",
        "check": "(async () => { await click(\"Toggle settings drawer\"); await click(\"Toggle settings drawer\"); await click(\"Use dark theme\"); return logs().split(\",\").filter(line => line === \"swatch\").length; })()",
        "partA": {
          "ask": "Include the initial mount. Click `Toggle settings drawer` twice, then `Use dark theme` once, letting updates finish after each click. How many swatch console lines are recorded? Answer with a number.",
          "accepted": [
            "4",
            "4 renders",
            "4 times"
          ]
        },
        "partB": {
          "ask": "Many distant widgets need the theme; drawer visibility is private to settings. Which design reduces unrelated context notifications?",
          "options": [
            "Keep the combined provider object and memoize the consumer with a props comparator.",
            "Store theme and drawer in one ref so consumers read their changes without notification.",
            "Provide the theme separately, stabilize its value, and keep drawer state in settings.",
            "Move the provider into the swatch so distant widgets can read the same local theme."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "When would passing theme props or composing themed children be preferable to using context?",
          "keyPoints": [
            "Props suit a small number of consumers with short explicit data paths.",
            "Composition lets a parent prepare themed content without making layout components read the value.",
            "Context suits many distant consumers, with provider values scoped to their needs."
          ],
          "modelAnswer": "Props are a good choice when a few nearby widgets need the theme because their inputs stay explicit. Composition helps when a parent can prepare themed content and pass it through layout slots. Those layout components then need no theme awareness. Context becomes more useful when many distant widgets need direct access, and separating unrelated values reduces unnecessary notifications."
        }
      },
      {
        "id": "react-data-fetching-l3-s1-q15",
        "topicId": "react-data-fetching",
        "set": 1,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction loadReport(period) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => period === 'closed'\n      ? reject(new Error('Unavailable')) : resolve('9 entries'), 10);\n  });\n}\nexport default function App() {\n  const [period, setPeriod] = useState('open');\n  const [reload, setReload] = useState(0);\n  const [view, setView] = useState('Loading');\n  useEffect(() => {\n    let current = true;\n    setView('Loading');\n    loadReport(period).then(\n      data => { if (current) setView(data); },\n      error => { if (current) setView('Error: ' + error.message); }\n    );\n    return () => { current = false; };\n  }, [period, reload]);\n  return <section>\n    <button onClick={() => setPeriod('closed')}>Open closed period</button>\n    <button onClick={() => setReload(n => n + 1)}>Reload report</button>\n    <p>{view}</p>\n  </section>;\n}",
        "check": "(async () => { await wait(30); await click(\"Open closed period\"); await wait(30); await click(\"Reload report\"); await wait(30); return text(\"p\"); })()",
        "partA": {
          "ask": "After mounting, wait 30 ms. Click `Open closed period` and wait 30 ms. Click `Reload report` and wait another 30 ms. What does the paragraph show? Answer with the full text.",
          "accepted": [
            "Error: Unavailable"
          ]
        },
        "partB": {
          "ask": "Several routes need shared cached reports, request deduplication, and background refresh. Which approach fits those needs?",
          "options": [
            "Use separate mount effects in route components and retain their last results in local refs.",
            "Use a query cache with shared keys and explicit policies for loading, failure, and background refresh.",
            "Use memo calculations to start requests and keep the resulting promises as rendered data.",
            "Use a context object of promises and let consumers attach their own refresh timers to it."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain when a component effect is enough for fetching, and when a query library is a better choice.",
          "keyPoints": [
            "An isolated request can use an effect with loading, error, and stale-response handling.",
            "The cleanup flag prevents obsolete requests from updating state but does not cancel their work.",
            "A query library can coordinate cached data and requests shared across screens.",
            "Cache lifetime and retry behavior still need deliberate choices."
          ],
          "modelAnswer": "An effect is reasonable for an isolated request with simple refresh needs. This effect shows a loading state, handles rejection, and stops obsolete responses from updating `view`. Its cleanup flag does not cancel the pending request. A query library is a better fit when screens need shared cache entries, request deduplication, retries, and background refresh, though those policies still need configuration."
        }
      },
      {
        "id": "react-useref-l3-s2-q01",
        "topicId": "react-useref",
        "set": 2,
        "environment": "react",
        "code": "import { useRef, useState } from 'react';\nexport default function App() {\n  const amountField = useRef(null);\n  const [amount, setAmount] = useState(12);\n  const displayed = amountField.current?.value ?? 'Pending';\n  return <section>\n    <h1>Invoice preview</h1>\n    <input aria-label=\"Invoice amount\" ref={amountField} value={amount} readOnly />\n    <button onClick={() => setAmount(n => n * 2)}>Double invoice</button>\n    <p>{displayed}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Double invoice\"); await click(\"Double invoice\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Double invoice` twice, letting updates finish after each click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "24"
          ]
        },
        "partB": {
          "ask": "Which change makes the invoice preview follow the amount selected by the user?",
          "options": [
            "Move the DOM read into a layout effect without scheduling another state update.",
            "Give the input a changing key so that the DOM node follows the selected amount.",
            "Use `amount` as the text in the paragraph to show the invoice value.",
            "Set `amountField` to an object with a value for the starting invoice amount."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usecontext-l3-s2-q02",
        "topicId": "react-usecontext",
        "set": 2,
        "environment": "react",
        "code": "import { createContext, memo, useContext, useState } from 'react';\nconst Units = createContext(null);\nconst WeightLabel = memo(function WeightLabel({ size }) {\n  const { unit } = useContext(Units);\n  console.log('weight');\n  return <p>{size} {unit}</p>;\n});\nexport default function App() {\n  const [compact, setCompact] = useState(false);\n  const [unit] = useState('kg');\n  return <Units value={{ unit }}>\n    <button onClick={() => setCompact(v => !v)}>Change packing layout</button>\n    <section data-compact={compact}>\n      <WeightLabel size={2} /><WeightLabel size={5} />\n    </section>\n  </Units>;\n}",
        "check": "(async () => { await click(\"Change packing layout\"); await click(\"Change packing layout\"); return logs().split(\",\").filter(line => line === \"weight\").length; })()",
        "partA": {
          "ask": "Include the initial mount. Click `Change packing layout` twice, letting updates finish between clicks. How many `weight` console lines are recorded in total? Answer with a number.",
          "accepted": [
            "6",
            "6 times",
            "6 logs"
          ]
        },
        "partB": {
          "ask": "Which change avoids context work caused by layout changes while preserving future unit changes?",
          "options": [
            "Memoize the provider object with `unit` as its dependency before passing it.",
            "Copy `unit` into consumer state and render from that local copy instead.",
            "Compare the `size` props in a custom comparator on the memoized consumers.",
            "Move the provider inside the layout section while keeping its value expression."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-usereducer-l3-s2-q03",
        "topicId": "react-usereducer",
        "set": 2,
        "environment": "react",
        "code": "import { useReducer, useState } from 'react';\nfunction allocate(state, action) {\n  if (action.type === 'reserve') {\n    state.available -= action.seats;\n    state.reserved += action.seats;\n  }\n  return state;\n}\nexport default function App() {\n  const [booking, dispatch] = useReducer(allocate, { available: 8, reserved: 0 });\n  const [details, setDetails] = useState(false);\n  return <section>\n    <button onClick={() => dispatch({ type: 'reserve', seats: 3 })}>Reserve seats</button>\n    <button onClick={() => setDetails(v => !v)}>Show booking details</button>\n    <p>{booking.available}/{booking.reserved}</p>\n    {details && <small>Group booking</small>}\n  </section>;\n}",
        "check": "(async () => { await click(\"Reserve seats\"); const first = text(\"p\"); await click(\"Show booking details\"); return first + \",\" + text(\"p\"); })()",
        "partA": {
          "ask": "Click `Reserve seats` and record the paragraph. Then click `Show booking details` and record it again. Let updates finish between clicks. Answer with the two texts separated by a comma, without spaces.",
          "accepted": [
            "8/0,5/3"
          ]
        },
        "partB": {
          "ask": "Which reducer change keeps seat allocation safe when other views retain earlier booking snapshots?",
          "options": [
            "Add a revision counter to the existing state and return that modified object.",
            "Dispatch a second action after allocation so the booking view can refresh.",
            "Spread the state after changing its fields so the reducer returns a new object.",
            "Calculate a new state object from the prior fields without changing the prior state."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain the two visible snapshots and how to repair `allocate` without damaging earlier snapshots.",
          "keyPoints": [
            "`allocate` changes `booking` in place and returns the same object.",
            "The same reducer result permits React to skip committing the changed display.",
            "`setDetails` causes a later render that reads the mutated fields.",
            "The repair returns new fields without mutating the previous state."
          ],
          "modelAnswer": "`allocate` changes the stored object but returns its original reference. React can skip committing that reducer update, so the paragraph retains its previous text. Updating `details` later renders the component again and reveals the changed fields. Return a new object with the calculated seat counts, and leave the previous object untouched."
        }
      },
      {
        "id": "react-error-boundaries-l3-s2-q04",
        "topicId": "react-error-boundaries",
        "set": 2,
        "environment": "react",
        "code": "import { Component, useEffect } from 'react';\nclass PaymentGuard extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() { return this.state.failed ? <p>Payment unavailable</p> : this.props.children; }\n}\nfunction PaymentButton() {\n  function pay() {\n    console.log('attempt');\n    throw new Error('Card expired');\n  }\n  return <button onClick={pay}>Pay balance</button>;\n}\nexport default function App() {\n  useEffect(() => {\n    function report(event) { event.preventDefault(); console.log('unhandled'); }\n    window.addEventListener('error', report);\n    return () => window.removeEventListener('error', report);\n  }, []);\n  return <PaymentGuard><PaymentButton /></PaymentGuard>;\n}",
        "check": "(async () => { await click(\"Pay balance\"); return logs(); })()",
        "partA": {
          "ask": "After the initial effect finishes, click `Pay balance` once. What is the order of console lines? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "attempt,unhandled"
          ]
        },
        "partB": {
          "ask": "Which change lets the payment interaction present a useful failure message to the user?",
          "options": [
            "Place another boundary directly around the payment button to handle the failure.",
            "Catch the failure inside `pay` and update local state with a useful message.",
            "Return a rejected promise from `pay` so the boundary can receive the failure.",
            "Attach a fallback prop to the button so React can display the failure message."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-lists-keys-l3-s2-q05",
        "topicId": "react-lists-keys",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction UploadRow({ file }) {\n  const [caption, setCaption] = useState(file.caption);\n  return <li><input aria-label={file.id} value={caption}\n    onChange={event => setCaption(event.target.value)} /></li>;\n}\nexport default function App() {\n  const [version, setVersion] = useState(0);\n  const [files] = useState([{ id: 'scan', caption: 'Receipt' }]);\n  return <section>\n    <button onClick={() => setVersion(v => v + 1)}>Refresh upload progress</button>\n    <ul>{files.map(file => <UploadRow key={file.id + ':' + version} file={file} />)}</ul>\n    <small>Progress refresh {version}</small>\n  </section>;\n}",
        "check": "(async () => { await type(\"input\", \"Tax copy\"); await click(\"Refresh upload progress\"); return value(\"input\"); })()",
        "partA": {
          "ask": "Replace the input text with `Tax copy`, then click `Refresh upload progress` once. What text remains in the input? Answer with the exact text.",
          "accepted": [
            "Receipt"
          ]
        },
        "partB": {
          "ask": "Which change lets row drafts survive progress refreshes without moving them to the parent?",
          "options": [
            "Use `file.id` as the row key independently of the progress refresh version.",
            "Memoize `UploadRow` so progress changes can be skipped by comparing its props.",
            "Give the input a stable key while retaining the version in its surrounding key.",
            "Initialize `caption` lazily so the draft can be restored when a row is mounted."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-useeffect-l3-s2-q06",
        "topicId": "react-useeffect",
        "set": 2,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nfunction SessionEditor({ revision }) {\n  useEffect(() => {\n    console.log('open');\n    return () => console.log('close');\n  }, []);\n  useEffect(() => {\n    console.log('watch-' + revision);\n    return () => console.log('unwatch-' + revision);\n  }, [revision]);\n  return <p>Revision {revision}</p>;\n}\nexport default function App() {\n  const [revision, setRevision] = useState(1);\n  const [session, setSession] = useState(0);\n  return <section>\n    <button onClick={() => setRevision(n => n + 1)}>Revise session</button>\n    <button onClick={() => setSession(n => n + 1)}>Replace session</button>\n    <SessionEditor key={session} revision={revision} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Revise session\"); await click(\"Replace session\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial effects. Click `Revise session`, then `Replace session`, letting effects finish after each click. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "open,watch-1,unwatch-1,watch-2,close,unwatch-2,open,watch-2"
          ]
        },
        "partB": {
          "ask": "An editor also opens a document subscription. Which effect design ties it to the current document?",
          "options": [
            "Keep an empty dependency list and read the document identifier during effect cleanup.",
            "Open the subscription during render and keep its handle inside a local variable.",
            "Depend on the document identifier and close that subscription in a cleanup block.",
            "Store the subscription handle in state and reopen it when that state changes."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain which work belongs to the update and which work belongs to replacing `SessionEditor`.",
          "keyPoints": [
            "Mount runs the two effect setups in their declaration order.",
            "Changing `revision` cleans up and reruns the dependent effect.",
            "Changing `session` changes the key and removes the old `SessionEditor`.",
            "The replacement runs fresh setups after the old cleanups."
          ],
          "modelAnswer": "Mount runs the lifetime setup followed by the revision setup. The revision update cleans up the earlier revision subscription and starts its replacement. The key change removes the old `SessionEditor`, so its lifetime cleanup and revision cleanup run. The new `SessionEditor` then runs its setups using the current `revision`."
        }
      },
      {
        "id": "react-memoization-l3-s2-q07",
        "topicId": "react-memoization",
        "set": 2,
        "environment": "react",
        "code": "import { memo, useCallback, useState } from 'react';\nconst ExportAction = memo(function ExportAction({ run }) {\n  console.log('action');\n  return <button onClick={run}>Export inventory</button>;\n});\nexport default function App() {\n  const [drawer, setDrawer] = useState(false);\n  const [exports, setExports] = useState(0);\n  const record = useCallback(() => setExports(n => n + 1), []);\n  return <section>\n    <button onClick={() => setDrawer(v => !v)}>Toggle export drawer</button>\n    <aside hidden={!drawer}>Inventory tools</aside>\n    <ExportAction run={() => record()} />\n    <p>{exports}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle export drawer\"); await click(\"Export inventory\"); await click(\"Toggle export drawer\"); return logs().split(\",\").filter(line => line === \"action\").length; })()",
        "partA": {
          "ask": "Include the initial render. Click `Toggle export drawer`, `Export inventory`, then `Toggle export drawer` again. Let updates finish between clicks. How many `action` console lines are recorded? Answer with a number.",
          "accepted": [
            "4",
            "4 times",
            "4 logs"
          ]
        },
        "partB": {
          "ask": "Which callback arrangement is suitable when the child needs no arguments added by the parent?",
          "options": [
            "Memoize the child element with an empty dependency list to retain its first props.",
            "Compare the function source strings in a custom comparator before skipping work.",
            "Wrap the handler in another arrow inside a memoized object passed to the child.",
            "Pass the stable `record` callback directly as the `run` prop to the memoized `ExportAction`."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-performance-l3-s2-q08",
        "topicId": "react-performance",
        "set": 2,
        "environment": "react",
        "code": "import { lazy, Suspense, useState } from 'react';\nconst AuditChart = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Chart ready</p> }), 15);\n}));\nexport default function App() {\n  const [open, setOpen] = useState(false);\n  return <section>\n    <button onClick={() => setOpen(v => !v)}>Toggle audit chart</button>\n    {open ? <Suspense fallback={<p>Loading chart</p>}>\n      <AuditChart />\n    </Suspense> : <p>Chart closed</p>}\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle audit chart\"); const first = text(\"p\"); await wait(40); const second = text(\"p\"); await click(\"Toggle audit chart\"); await click(\"Toggle audit chart\"); return [first, second, text(\"p\")].join(\",\"); })()",
        "partA": {
          "ask": "Click `Toggle audit chart` and record the paragraph before the 15 ms timer fires. Wait 40 ms and record it again. Hide and reopen the chart with two more clicks, letting updates finish between clicks, and record the paragraph once more. Answer with the three texts separated by commas, without spaces around the commas.",
          "accepted": [
            "Loading chart,Chart ready,Chart ready"
          ]
        },
        "partB": {
          "ask": "A later version adds several independently useful panels. Where should their loading boundaries go?",
          "options": [
            "Place one outer boundary around the whole screen so its controls share the loading view.",
            "Wrap independent panels in boundaries to keep nearby screen controls ready to use.",
            "Place a boundary inside the lazy module so its own import gets a loading view.",
            "Place a boundary around the toggle control so it can hold the panel loading view."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-usestate-l3-s2-q09",
        "topicId": "react-usestate",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [quota, setQuota] = useState(4);\n  function processBatch() {\n    setQuota(n => n - 1);\n    setQuota(n => n * 2);\n    setQuota(quota + 5);\n    setQuota(n => n - quota);\n  }\n  return <section>\n    <h1>Processing quota</h1>\n    <button onClick={processBatch}>Process batch</button>\n    <p>{quota}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Process batch\"); await click(\"Process batch\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Process batch` twice, letting the first update finish before the second click. What number does the paragraph show? Answer with a number.",
          "accepted": [
            "5"
          ]
        },
        "partB": {
          "ask": "A processing job must update remaining quota and consumed quota as one domain operation. Which design fits?",
          "options": [
            "Represent the related values in a reducer and handle the job with one domain action.",
            "Read the remaining quota from the DOM and write the consumed quota into a ref.",
            "Use separate timeout callbacks for the setters so the values can settle independently.",
            "Keep consumed quota in an effect that increments it whenever remaining quota changes."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-custom-hooks-l3-s2-q10",
        "topicId": "react-custom-hooks",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nconst preferences = {\n  reads: 0,\n  read() { this.reads += 1; return 'weekly'; }\n};\nfunction useDigestPreference() {\n  const stored = preferences.read();\n  const [digest, setDigest] = useState(stored);\n  return [digest, setDigest];\n}\nexport default function App() {\n  const [digest, setDigest] = useDigestPreference();\n  const [help, setHelp] = useState(false);\n  return <section>\n    <button onClick={() => setHelp(v => !v)}>Toggle digest help</button>\n    <button onClick={() => setDigest('daily')}>Choose daily digest</button>\n    <p>{digest}/{preferences.reads}</p>\n    {help && <small>Choose how often to receive a summary.</small>}\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle digest help\"); await click(\"Choose daily digest\"); await click(\"Toggle digest help\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Toggle digest help`, `Choose daily digest`, then `Toggle digest help` again. Let updates finish between clicks. What does the paragraph show? Answer with the word and number separated by a slash.",
          "accepted": [
            "daily/4"
          ]
        },
        "partB": {
          "ask": "Storage should seed a draft when it mounts, without polling during edits. Which hook design fits?",
          "options": [
            "Memoize a storage read with the draft as a dependency to refresh stored values.",
            "Move the read to an effect without dependencies and store its result after rendering.",
            "Use a lazy state initializer for the read and keep later edits in the local state.",
            "Refresh the stored value in the setter before applying a change to the local draft."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-composition-l3-s2-q11",
        "topicId": "react-composition",
        "set": 2,
        "environment": "react",
        "code": "import { Children, cloneElement, useState } from 'react';\nfunction FilterOption({ label, onChoose }) {\n  return <button onClick={onChoose}>{label}</button>;\n}\nfunction FilterGroup({ children }) {\n  const [choice, setChoice] = useState('Open');\n  return <section>\n    {Children.map(children, child => child.type === FilterOption\n      ? cloneElement(child, { onChoose: () => setChoice(child.props.label) })\n      : child)}\n    <p>{choice}</p>\n  </section>;\n}\nexport default function App() {\n  return <FilterGroup>\n    <FilterOption label=\"Closed\" />\n    <div><FilterOption label=\"Assigned\" /></div>\n  </FilterGroup>;\n}",
        "check": "(async () => { await click(\"Closed\"); await click(\"Assigned\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Closed`, then `Assigned`, letting updates finish after each click. What text does the paragraph show? Answer with one word.",
          "accepted": [
            "Closed"
          ]
        },
        "partB": {
          "ask": "The options must work inside wrappers and custom layout components. Which composition design fits?",
          "options": [
            "Flatten the direct children into an array before first checking their component types.",
            "Attach the selection callback to the wrapper element instead of the option button.",
            "Give the wrapper the same key as its option so their injected props stay connected.",
            "Provide selection through context and let `FilterOption` read it wherever it is rendered."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-router-l3-s2-q12",
        "topicId": "react-router",
        "set": 2,
        "environment": "react",
        "code": "import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';\nfunction WorkspaceNav() {\n  const location = useLocation();\n  return <>\n    <a href=\"/reports\" onClick={event => event.preventDefault()}>Open reports</a>\n    <output>{location.pathname}</output>\n  </>;\n}\nexport default function App() {\n  return <MemoryRouter initialEntries={['/workspace']}>\n    <WorkspaceNav />\n    <Routes>\n      <Route path=\"/workspace\" element={<p>Workspace home</p>} />\n      <Route path=\"/reports\" element={<p>Reports home</p>} />\n    </Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Open reports\"); return text(\"output\"); })()",
        "partA": {
          "ask": "The host uses `MemoryRouter` and blocks document navigation on its plain anchor. Click `Open reports` once. What pathname does the output show? Answer with the exact path.",
          "accepted": [
            "/workspace"
          ]
        },
        "partB": {
          "ask": "Which change makes this internal navigation use the router while retaining normal link semantics?",
          "options": [
            "Change the anchor to a button that assigns the reports path to the browser location.",
            "Replace the anchor with a router link using `to` and remove the blocking handler.",
            "Keep the anchor and set its `href` to a hash containing the reports route path.",
            "Remove the blocking handler and let the plain anchor request the reports document."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-usereducer-l3-s2-q13",
        "topicId": "react-usereducer",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [plan, setPlan] = useState('basic');\n  const [seats, setSeats] = useState(2);\n  const [issue, setIssue] = useState('');\n  function chooseTeam() {\n    setPlan('team');\n    setSeats(5);\n    setIssue('');\n  }\n  function resetPlan() {\n    setPlan('basic');\n  }\n  return <form onSubmit={event => event.preventDefault()}>\n    <button type=\"button\" onClick={chooseTeam}>Choose team plan</button>\n    <button type=\"button\" onClick={resetPlan}>Reset subscription</button>\n    <p>{plan}/{seats}/{issue || 'clear'}</p>\n  </form>;\n}",
        "check": "(async () => { await click(\"Choose team plan\"); await click(\"Reset subscription\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Choose team plan`, then `Reset subscription`, letting updates finish between clicks. What does the paragraph show? Answer with the exact slash-separated text.",
          "accepted": [
            "basic/5/clear"
          ]
        },
        "partB": {
          "ask": "The form will gain discounts, validation and reset rules shared by several controls. Which design fits?",
          "options": [
            "Keep separate state setters and synchronize the related fields through dependent effects.",
            "Store the form fields in mutable refs and refresh the preview after submission.",
            "Use domain actions in a reducer to coordinate the related field transitions.",
            "Read the rendered inputs during reset and use their defaults to rebuild the state."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain when separate state values would be a better choice than a reducer for this kind of form.",
          "keyPoints": [
            "Independent fields with simple updates can use separate state values.",
            "Shared transitions such as resetting related fields favor a reducer.",
            "A reducer should preserve relationships among `plan`, `seats` and `issue`.",
            "A reducer is not required merely because a component has several inputs."
          ],
          "modelAnswer": "Separate state values work well when fields change independently and their update rules are short. They keep a small form easy to follow without defining domain actions. A reducer becomes useful when several controls must apply the same rules across `plan`, `seats` and `issue`. The deciding factor is how the transitions relate, rather than the number of inputs."
        }
      },
      {
        "id": "react-composition-l3-s2-q14",
        "topicId": "react-composition",
        "set": 2,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction ReviewCard({ title, showApprove, approveLabel, onApprove,\n  showNote, noteLabel, onNote }) {\n  return <article>\n    <h2>{title}</h2>\n    <footer>\n      {showApprove && <button onClick={onApprove}>{approveLabel}</button>}\n      {showNote && <button onClick={onNote}>{noteLabel}</button>}\n    </footer>\n  </article>;\n}\nexport default function App() {\n  const [status, setStatus] = useState('Pending');\n  const [canReview, setCanReview] = useState(true);\n  return <section>\n    <button onClick={() => setCanReview(false)}>Revoke review access</button>\n    <ReviewCard title=\"Expense review\" showApprove={canReview}\n      approveLabel=\"Approve expense\" onApprove={() => setStatus('Approved')}\n      showNote noteLabel=\"Add review note\" onNote={() => setStatus('Note saved')} />\n    <p>{status}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Approve expense\"); await click(\"Revoke review access\"); await click(\"Add review note\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click `Approve expense`, `Revoke review access`, then `Add review note`. Let updates finish after each click. What does the paragraph show? Answer with the full text.",
          "accepted": [
            "Note saved"
          ]
        },
        "partB": {
          "ask": "Several screens need different action groups with their own permissions. Which card API scales to that need?",
          "options": [
            "Accept action content through `children` and let the caller compose the footer.",
            "Add label and visibility props for the extra actions requested by other screens.",
            "Inspect the card title and use it to choose the matching action group.",
            "Move screen action state into the card so it can build the footer itself."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain when explicit action props would be better than a `children` slot for `ReviewCard`.",
          "keyPoints": [
            "A fixed action set can benefit from explicit, narrow props.",
            "The card can enforce consistent labels, order and accessibility for fixed actions.",
            "A `children` slot helps when callers need different action structures."
          ],
          "modelAnswer": "Explicit props suit a card with a small, stable action set and consistent behavior across screens. They let `ReviewCard` enforce the order and accessible markup of those actions. A `children` slot is useful when callers need different controls or permission layouts. The caller then owns that action markup while the card owns its surrounding layout."
        }
      },
      {
        "id": "react-performance-l3-s2-q15",
        "topicId": "react-performance",
        "set": 2,
        "environment": "react",
        "code": "import { lazy, Suspense, useState } from 'react';\nconst DeliveryMap = lazy(() => new Promise(resolve => {\n  setTimeout(() => resolve({ default: () => <p>Map ready</p> }), 20);\n}));\nfunction DeliveryDashboard() {\n  const [showMap, setShowMap] = useState(false);\n  return <main>\n    <h1>Dispatch dashboard</h1>\n    <button onClick={() => setShowMap(true)}>Show delivery map</button>\n    {showMap ? <Suspense fallback={<p>Loading map</p>}>\n      <DeliveryMap />\n    </Suspense> : <p>List ready</p>}\n  </main>;\n}\nexport default function App() {\n  return <DeliveryDashboard />;\n}",
        "check": "(async () => { const first = text(\"p\"); await click(\"Show delivery map\"); const second = text(\"p\"); await wait(45); return [first, second, text(\"p\")].join(\",\"); })()",
        "partA": {
          "ask": "Record the initial paragraph. Click `Show delivery map` and record it before the 20 ms timer fires. Wait 45 ms and record it again. Answer with the three texts separated by commas, without spaces around the commas.",
          "accepted": [
            "List ready,Loading map,Map ready"
          ]
        },
        "partB": {
          "ask": "The map has a large dependency used by few visitors; the delivery list is needed on entry. Where should code split?",
          "options": [
            "Split the whole dashboard at its route so entering the list also loads the map.",
            "Keep the map in the entry bundle and memoize it to reduce component rendering.",
            "Split the map loader inside the button handler by creating a fresh lazy component.",
            "Split the optional map into a module and keep the list available in the entry bundle."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain when splitting a whole route, splitting a heavy component, or keeping code together would be better.",
          "keyPoints": [
            "A route split fits a large destination that is not needed on entry.",
            "A component split fits an optional heavy feature such as `DeliveryMap`.",
            "Small features needed on entry may not justify another loading boundary.",
            "Production code needs a separate module loaded through a dynamic import."
          ],
          "modelAnswer": "Split a whole route when it is a large destination that many visitors do not open. Split a heavy component when the surrounding screen is needed sooner than that optional feature. Keep small, frequently needed code together when another loading step would cost more than it saves. The timer here models a delayed module; a real split needs a separate module loaded through a dynamic import."
        }
      },
      {
        "id": "react-useeffect-l3-s3-q01",
        "topicId": "react-useeffect",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [warehouse, setWarehouse] = useState('east');\n  const [compact, setCompact] = useState(false);\n  const connection = { warehouse };\n  useEffect(() => {\n    console.log('connect');\n    return () => console.log('disconnect');\n  }, [connection]);\n  return <section data-compact={compact}>\n    <button onClick={() => setCompact(v => !v)}>Resize stock panel</button>\n    <button onClick={() => setWarehouse('west')}>Move stock feed</button>\n    <p>{warehouse}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Resize stock panel\"); await click(\"Move stock feed\"); await click(\"Resize stock panel\"); return logs().split(\",\").filter(line => line === \"connect\").length; })()",
        "partA": {
          "ask": "Include the initial effect. Click Resize stock panel, Move stock feed, then Resize stock panel again. Let effects finish between clicks. How many connection setups have logged in total? Answer with a number.",
          "accepted": [
            "4",
            "4 setups",
            "4 times"
          ]
        },
        "partB": {
          "ask": "The stock connection should follow warehouse changes and survive panel resizing. Which refactor fits?",
          "options": [
            "Store `connection` in a ref initialized at mount and depend on its stable reference.",
            "Move the connection setup into the resize handler and remove the subscription effect.",
            "Build `connection` inside the effect and depend on the current `warehouse` string instead.",
            "Keep the object dependency and memoize its cleanup function to stabilize the connection lifecycle."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-usestate-l3-s3-q02",
        "topicId": "react-usestate",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [packed, setPacked] = useState(2);\n  const [requested, setRequested] = useState(0);\n  function packSelection() {\n    const selection = ['label', 'tape', 'sleeve'];\n    for (const supply of selection) {\n      setPacked(packed + 1);\n    }\n    setRequested(selection.length);\n  }\n  return <section>\n    <button onClick={packSelection}>Pack selection</button>\n    <p>{packed}/{requested}</p>\n  </section>;\n}",
        "check": "(async () => { await click(\"Pack selection\"); await click(\"Pack selection\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Pack selection twice, letting the first update finish before the second click. What does the paragraph show? Answer with the two numbers separated by a slash.",
          "accepted": [
            "4/3"
          ]
        },
        "partB": {
          "ask": "Packing must accumulate one increment per selected supply without changing the stored state shape. Which fix fits?",
          "options": [
            "Pass a functional increment to `setPacked` inside the loop so queued changes can accumulate safely.",
            "Add `packed` to an effect dependency list and move the entire existing packing loop into that effect.",
            "Wrap `packSelection` in a stable memoized callback so its captured initial count persists between selections.",
            "Move the existing loop into a short timeout so the captured count can settle before packing."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-portals-fragments-l3-s3-q03",
        "topicId": "react-portals-fragments",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nimport { createPortal } from 'react-dom';\nexport default function App() {\n  const [decision, setDecision] = useState('Waiting');\n  const [open, setOpen] = useState(true);\n  return <>\n    <p>{decision}</p>\n    <section onClick={() => setDecision('Cancelled')}>\n      <h2>Return approval</h2>\n      {open && createPortal(<aside>\n        <button onClick={() => {\n          setDecision('Approved');\n          setOpen(false);\n        }}>Approve return</button>\n      </aside>, document.body)}\n    </section>\n  </>;\n}",
        "check": "(async () => { await click(\"Approve return\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Approve return once and let the update finish. What decision does the paragraph show? Answer with one word.",
          "accepted": [
            "Cancelled",
            "cancelled"
          ]
        },
        "partB": {
          "ask": "The section should cancel direct section clicks while the approval control keeps its own action. Which change fits?",
          "options": [
            "Call `preventDefault()` in the approval handler before updating the decision and closing the panel.",
            "Move the portal target to a body child while retaining the current handler on the section.",
            "Wrap the approval updates in a transition so the section can finish handling its click first.",
            "Call `stopPropagation()` in the approval handler before updating the decision and closing the panel."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-forms-l3-s3-q04",
        "topicId": "react-forms",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nexport default function App() {\n  const [heading, setHeading] = useState('Draft');\n  const [slug, setSlug] = useState('draft');\n  function rename(event) {\n    setHeading(event.target.value);\n    setSlug(heading.trim().toLowerCase().replaceAll(' ', '-'));\n  }\n  return <form onSubmit={event => event.preventDefault()}>\n    <label>Article heading<input value={heading} onChange={rename} /></label>\n    <p>{slug}</p>\n  </form>;\n}",
        "check": "(async () => { await type(\"input\", \"Fresh Guide\"); await type(\"input\", \"Field Notes\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Replace the input with Fresh Guide in one change event. Then replace it with Field Notes in one change event. Let updates finish between changes. What does the paragraph show for `slug`? Answer with the exact text.",
          "accepted": [
            "fresh-guide"
          ]
        },
        "partB": {
          "ask": "The `slug` value is a live preview with no separate edits. Which design prevents the preview from lagging?",
          "options": [
            "Store the input node in a ref and keep the `slug` state initialized from the first heading.",
            "Derive the slug from the current `heading` during rendering instead of keeping a second state value.",
            "Memoize `rename` with an empty dependency list so the preview keeps using a stable input change handler.",
            "Move the slug setter into a delayed callback that reads the same captured heading value."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain the two changes step by step, then explain why deriving this preview is safer than synchronizing two state values.",
          "keyPoints": [
            "`rename` reads `heading` from the render that created that handler.",
            "The first change derives `slug` from the old heading, and the second derives it from the first replacement.",
            "Deriving `slug` during rendering gives the preview the current `heading` without synchronization."
          ],
          "modelAnswer": "The first change queues a new `heading`, but that call to `rename` still reads the previous heading. It therefore keeps `slug` at its initial text. The second change reads the heading from the preceding render and produces the earlier replacement's slug. Deriving the preview from `heading` during rendering removes the duplicate state and keeps the preview current."
        }
      },
      {
        "id": "react-forwarding-refs-l3-s3-q05",
        "topicId": "react-forwarding-refs",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useRef } from 'react';\nfunction SearchField({ placeholder }) {\n  return <input placeholder={placeholder} />;\n}\nexport default function App() {\n  const queryNode = useRef(null);\n  const helpNode = useRef(null);\n  useEffect(() => { helpNode.current.focus(); }, []);\n  return <section>\n    <button ref={helpNode}>Open support help</button>\n    <SearchField ref={queryNode} placeholder=\"Search support articles\" />\n    <button onClick={() => queryNode.current?.focus()}>Focus article search</button>\n  </section>;\n}",
        "check": "(async () => { await click(\"Focus article search\"); return focused(); })()",
        "partA": {
          "ask": "Let the initial effect focus Open support help. Dispatch a click on Focus article search without focusing that button first. Which element has focus afterward? Answer with its lowercase tag name.",
          "accepted": [
            "button"
          ]
        },
        "partB": {
          "ask": "The wrapper must expose its input node through the supplied ref in React 19. Which change fits?",
          "options": [
            "Accept `ref` in `SearchField` and attach it to the returned input node.",
            "Give the input a matching identifier and retain the current wrapper signature.",
            "Replace `queryNode` with a local variable and pass that variable to the wrapper.",
            "Attach `queryNode` to the outer section and keep the current focus handler."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-rerenders-l3-s3-q06",
        "topicId": "react-rerenders",
        "set": 3,
        "environment": "react",
        "code": "import { createContext, memo, useContext, useState } from 'react';\nconst DisplayUnit = createContext('metric');\nconst UnitCaption = memo(function UnitCaption() {\n  console.log('caption-' + useContext(DisplayUnit));\n  return <p>Measurement unit</p>;\n});\nconst StaticHint = memo(function StaticHint() {\n  console.log('hint');\n  return <small>Values are rounded</small>;\n});\nexport default function App() {\n  const [revision, setRevision] = useState(0);\n  const [unit, setUnit] = useState('metric');\n  console.log('panel-' + revision);\n  function apply() {\n    setRevision(n => n + 1);\n    setUnit('imperial');\n  }\n  return <DisplayUnit value={unit}>\n    <button onClick={apply}>Apply measurement settings</button>\n    <UnitCaption /><StaticHint />\n  </DisplayUnit>;\n}",
        "check": "(async () => { await click(\"Apply measurement settings\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render. Click Apply measurement settings once and let the update finish. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "panel-0,caption-metric,hint,panel-1,caption-imperial"
          ]
        },
        "partB": {
          "ask": "Suppose the settings handler gains a third state update. Which statement describes batching in this event?",
          "options": [
            "The setters force separate DOM commits so later calls can read the earlier updated state.",
            "The handler should await the setters to make related updates part of a single commit.",
            "The related updates can share a render while the handler retains its state snapshot.",
            "The context provider delays its value update until a consumer requests another render."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-data-fetching-l3-s3-q07",
        "topicId": "react-data-fetching",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [attempt, setAttempt] = useState(0);\n  const [phase, setPhase] = useState('loading');\n  useEffect(() => {\n    let active = true;\n    const timer = setTimeout(() => {\n      if (active) setPhase(attempt === 0 ? 'error' : 'data');\n    }, attempt === 0 ? 10 : 30);\n    return () => { active = false; clearTimeout(timer); };\n  }, [attempt]);\n  useEffect(() => { console.log(phase); }, [phase]);\n  function retry() {\n    setPhase('retry');\n    setAttempt(n => n + 1);\n  }\n  return <section>\n    <p>{phase}</p>\n    <button disabled={phase !== 'error'} onClick={retry}>Retry availability</button>\n  </section>;\n}",
        "check": "(async () => { await wait(50); await click(\"Retry availability\"); await wait(50); return logs(); })()",
        "partA": {
          "ask": "Include the initial effects. Wait 50 ms, click Retry availability once, then wait another 50 ms. What is the order of the phase console lines? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "loading,error,retry,data"
          ]
        },
        "partB": {
          "ask": "If this panel also gains a resource selector, which request policy prevents stale data after fast selection changes?",
          "options": [
            "Retain the last successful response in a ref and apply it when the selected resource changes.",
            "Associate results with the active request identity and discard late completions from superseded requests.",
            "Serialize selection changes behind the pending request and show its result for the new selection.",
            "Memoize the request function at mount and reuse its captured resource for later selections."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-19-actions-l3-s3-q08",
        "topicId": "react-19-actions",
        "set": 3,
        "environment": "react",
        "code": "import { useActionState, useEffect } from 'react';\nasync function saveHandle(previous, formData) {\n  const handle = String(formData.get('handle')).trim();\n  await new Promise(resolve => setTimeout(resolve, 20));\n  return handle ? 'Saved' : 'Missing';\n}\nexport default function App() {\n  const [message, saveAction, pending] = useActionState(saveHandle, 'Ready');\n  const shown = pending ? 'Saving' : message;\n  useEffect(() => { console.log(shown); }, [shown]);\n  return <form action={saveAction}>\n    <label>Public handle<input name=\"handle\" defaultValue=\"\" /></label>\n    <button disabled={pending}>Save public handle</button>\n    <p>{shown}</p>\n  </form>;\n}",
        "check": "(async () => { await submit(); await wait(50); await type(\"input\", \"harbor\"); await submit(); await wait(50); return logs(); })()",
        "partA": {
          "ask": "Include the initial effect. Submit the empty form and wait 50 ms. Replace the input with harbor, submit again, and wait another 50 ms. What is the console order? Answer with the words separated by commas, without spaces.",
          "accepted": [
            "Ready,Saving,Missing,Saving,Saved"
          ]
        },
        "partB": {
          "ask": "A revised action must count successful saves. What does its first parameter represent?",
          "options": [
            "It provides the form element that triggered submission so the action can inspect its controls.",
            "It provides the submission event object so the action can prevent the browser's default action.",
            "It provides the current input text so the action can process the edited handle before storing it.",
            "It provides the previous action state so the next result can build on earlier completed work."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain the message sequence step by step. Why does a missing handle return a message rather than throw an error?",
          "keyPoints": [
            "`message` starts as Ready, and `pending` selects Saving during submitted work.",
            "`saveHandle` reads the submitted data and resolves after its timer.",
            "The empty submission returns Missing; the nonempty submission returns Saved.",
            "Expected validation failures can be action state that the form renders."
          ],
          "modelAnswer": "The first effect records the initial `message`. Submitting starts the action, so `pending` makes the form display Saving until the timer finishes. The empty submission resolves to Missing, while the later nonempty submission resolves to Saved after another pending phase. A missing handle is an expected validation failure, so returning it as action state keeps the form available for correction."
        }
      },
      {
        "id": "react-hoc-l3-s3-q09",
        "topicId": "react-hoc",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction withPermission(View) {\n  return function PermissionGate(props) {\n    console.log('permission');\n    return props.allowed ? <View {...props} /> : <p>Access removed</p>;\n  };\n}\nfunction withAudit(View) {\n  return function AuditFrame(props) {\n    console.log('audit');\n    return <View {...props} />;\n  };\n}\nfunction Ledger() {\n  console.log('ledger');\n  return <p>Ledger ready</p>;\n}\nconst ProtectedLedger = withPermission(withAudit(Ledger));\nexport default function App() {\n  const [allowed, setAllowed] = useState(true);\n  return <section>\n    <button onClick={() => setAllowed(v => !v)}>Toggle ledger access</button>\n    <ProtectedLedger allowed={allowed} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle ledger access\"); await click(\"Toggle ledger access\"); return logs(); })()",
        "partA": {
          "ask": "Include the initial render. Click Toggle ledger access twice, letting updates finish between clicks. What is the console order? Answer with the logged words separated by commas, without spaces.",
          "accepted": [
            "permission,audit,ledger,permission,permission,audit,ledger"
          ]
        },
        "partB": {
          "ask": "The wrapped ledger later needs its caller's DOM ref. What must the wrappers do in React 19?",
          "options": [
            "Attach the supplied ref to a new wrapper section so callers receive the surrounding layout node.",
            "Read the supplied ref in an effect and copy its current value into a local state field.",
            "Pass the supplied ref through the wrappers and attach it to the intended inner DOM element.",
            "Replace the supplied ref with a wrapper-owned ref so callers receive a separate local handle."
          ],
          "correct": 2
        }
      },
      {
        "id": "react-memoization-l3-s3-q10",
        "topicId": "react-memoization",
        "set": 3,
        "environment": "react",
        "code": "import { memo, useState } from 'react';\nconst ReceiptPreview = memo(function ReceiptPreview({ settings }) {\n  const [expanded, setExpanded] = useState(false);\n  console.log('preview');\n  return <article>\n    <p>{settings.currency}/{expanded ? 'detailed' : 'compact'}</p>\n    <button onClick={() => setExpanded(v => !v)}>Toggle receipt details</button>\n  </article>;\n});\nexport default function App() {\n  const [drawer, setDrawer] = useState(false);\n  const [currency, setCurrency] = useState('EUR');\n  return <section data-drawer={drawer}>\n    <button onClick={() => setDrawer(v => !v)}>Toggle receipt tools</button>\n    <button onClick={() => setCurrency('GBP')}>Use pounds</button>\n    <ReceiptPreview settings={{ currency }} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Toggle receipt tools\"); await click(\"Toggle receipt details\"); await click(\"Use pounds\"); return logs().split(\",\").filter(line => line === \"preview\").length; })()",
        "partA": {
          "ask": "Include the initial render. Click Toggle receipt tools, Toggle receipt details, then Use pounds. Let updates finish between clicks. How many preview render lines are logged in total? Answer with a number.",
          "accepted": [
            "4",
            "4 renders",
            "4 times"
          ]
        },
        "partB": {
          "ask": "The preview needs just the currency value. Which prop design avoids unnecessary work from unrelated parent changes?",
          "options": [
            "Pass `currency` as a primitive prop to the memoized preview and read it directly inside the component.",
            "Pass a serialized settings value as the preview key so React can recreate its state when settings change.",
            "Keep the inline object and compare the settings object's keys rather than the values inside those keys.",
            "Move the memo wrapper into the parent function so it can capture the current settings before rendering."
          ],
          "correct": 0
        }
      },
      {
        "id": "react-reconciliation-l3-s3-q11",
        "topicId": "react-reconciliation",
        "set": 3,
        "environment": "react",
        "code": "import { useEffect, useState } from 'react';\nexport default function App() {\n  const [dense, setDense] = useState(false);\n  function ShipmentNote() {\n    const [note, setNote] = useState('Leave at desk');\n    useEffect(() => { console.log('note-mount'); }, []);\n    return <input aria-label=\"Shipment note\" value={note}\n      onChange={event => setNote(event.target.value)} />;\n  }\n  return <section data-dense={dense}>\n    <button onClick={() => setDense(v => !v)}>Toggle shipment density</button>\n    <ShipmentNote key=\"note\" />\n  </section>;\n}",
        "check": "(async () => { await type(\"input\", \"Ring twice\"); await click(\"Toggle shipment density\"); await type(\"input\", \"Use side gate\"); await click(\"Toggle shipment density\"); return logs().split(\",\").filter(line => line === \"note-mount\").length; })()",
        "partA": {
          "ask": "Include the initial effect. Replace the input with Ring twice, click Toggle shipment density, replace the input with Use side gate, then click Toggle shipment density again. Let updates and effects finish between actions. How many note mount lines are logged? Answer with a number.",
          "accepted": [
            "3",
            "3 mounts",
            "3 times"
          ]
        },
        "partB": {
          "ask": "Draft notes must survive density changes. Which change preserves the editor's component identity?",
          "options": [
            "Wrap `ShipmentNote` with a memo call inside `App` so the parent can skip its unchanged props.",
            "Declare `ShipmentNote` at module scope and pass it the values it needs through ordinary props.",
            "Move the note text into a ref inside `ShipmentNote` so it can outlive the parent's renders.",
            "Add a stable key to the input inside `ShipmentNote` so it retains its existing local state."
          ],
          "correct": 1
        }
      },
      {
        "id": "react-state-location-l3-s3-q12",
        "topicId": "react-state-location",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction InviteControl({ canInvite }) {\n  const [enabled] = useState(canInvite);\n  const [notice, setNotice] = useState('Not sent');\n  return <article>\n    <button disabled={!enabled} onClick={() => setNotice('Queued')}>Queue invitation</button>\n    <p>{notice}</p>\n  </article>;\n}\nexport default function App() {\n  const [canInvite, setCanInvite] = useState(true);\n  return <section>\n    <button onClick={() => setCanInvite(false)}>Revoke invitation permission</button>\n    <InviteControl canInvite={canInvite} />\n  </section>;\n}",
        "check": "(async () => { await click(\"Revoke invitation permission\"); await click(\"Queue invitation\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Revoke invitation permission, then Queue invitation. Let updates finish between clicks. What does the paragraph show? Answer with one word.",
          "accepted": [
            "Queued",
            "queued"
          ]
        },
        "partB": {
          "ask": "The control must reflect the parent's current permission and has no private permission draft. Which change fits?",
          "options": [
            "Add an effect with an empty dependency list to copy the permission after the control mounts.",
            "Store the permission in a ref initialized from the prop and read that ref when rendering.",
            "Use a lazy state initializer to capture the permission after the parent finishes rendering its settings.",
            "Read `canInvite` directly for the button's disabled condition and remove the copied `enabled` state."
          ],
          "correct": 3
        }
      },
      {
        "id": "react-router-l3-s3-q13",
        "topicId": "react-router",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nimport { MemoryRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';\nfunction TicketList() {\n  const [status, setStatus] = useState('open');\n  return <section>\n    <button onClick={() => setStatus('closed')}>Show closed tickets</button>\n    <p>{status}</p>\n    <Link to=\"/tickets/42\">Read ticket</Link>\n  </section>;\n}\nfunction TicketDetails() {\n  const navigate = useNavigate();\n  return <button onClick={() => navigate(-1)}>Back to tickets</button>;\n}\nexport default function App() {\n  return <MemoryRouter initialEntries={['/tickets']}>\n    <Routes>\n      <Route path=\"/tickets\" element={<TicketList />} />\n      <Route path=\"/tickets/42\" element={<TicketDetails />} />\n    </Routes>\n  </MemoryRouter>;\n}",
        "check": "(async () => { await click(\"Show closed tickets\"); await click(\"Read ticket\"); await click(\"Back to tickets\"); return text(\"p\"); })()",
        "partA": {
          "ask": "Click Show closed tickets, Read ticket, then Back to tickets. Let navigation and updates finish between clicks. What filter does the list paragraph show after returning? Answer with one word.",
          "accepted": [
            "open"
          ]
        },
        "partB": {
          "ask": "In the browser version, ticket filters must survive reloads and be reproducible from a shared link. Which design fits?",
          "options": [
            "Read and update URL search parameters as the committed filter source so navigation can reproduce the selected view.",
            "Keep the filter in list component state and memoize the list so route changes can preserve the selection.",
            "Put the filter in context above the routes and let shared links load the provider's initial filter value.",
            "Keep the filter in a module variable and read it when the list mounts after navigation or reload."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain why the filter changes on returning. When would local state or context be a better home than URL search parameters?",
          "keyPoints": [
            "Leaving the list route unmounts `TicketList`; returning initializes its `status` again.",
            "URL search parameters can represent a navigable and shareable filter selection.",
            "Local state suits a private unsaved control draft.",
            "Context suits shared in-memory state within a provider, without providing URL persistence."
          ],
          "modelAnswer": "Opening the detail route unmounts `TicketList`, so returning creates fresh `status` state. URL search parameters suit a committed filter that users need to revisit or share. Local state would suit a temporary filter draft before an Apply action. Context would suit a session selection shared across nested screens when reproducing it from a URL is unnecessary."
        }
      },
      {
        "id": "react-error-boundaries-l3-s3-q14",
        "topicId": "react-error-boundaries",
        "set": 3,
        "environment": "react",
        "code": "import { Component, useState } from 'react';\nclass WorkspaceGuard extends Component {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  render() {\n    return this.state.failed ? <p>Workspace unavailable</p> : this.props.children;\n  }\n}\nfunction ActivityWidget() {\n  const [broken, setBroken] = useState(false);\n  if (broken) throw new Error('Activity view failed');\n  return <button onClick={() => setBroken(true)}>Open activity breakdown</button>;\n}\nfunction MessageWidget() {\n  return <aside><p>Messages ready</p></aside>;\n}\nexport default function App() {\n  return <WorkspaceGuard>\n    <main><ActivityWidget /><MessageWidget /></main>\n  </WorkspaceGuard>;\n}",
        "check": "(async () => { await click(\"Open activity breakdown\"); return count(\"aside\") > 0; })()",
        "partA": {
          "ask": "Click Open activity breakdown and let error recovery finish. Does the messages widget remain visible? Answer yes or no.",
          "accepted": [
            "no",
            "false"
          ]
        },
        "partB": {
          "ask": "Activity and messages are independently useful. Which boundary layout keeps useful content available during a widget failure?",
          "options": [
            "Place one boundary around the main area and render a loading indicator while a failed widget is retried.",
            "Place a boundary around the activity button's label and let its surrounding widget handle render failures.",
            "Place a boundary around each independent widget and retain an outer boundary for wider application failures.",
            "Place a try block around the widget elements in `App` and return separate matching fallback elements from its catch."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain what the current boundary replaces. When is a single screen boundary preferable to separate widget boundaries?",
          "keyPoints": [
            "The click changes state; the error is thrown during the next `ActivityWidget` render.",
            "`WorkspaceGuard` replaces its child tree, including the healthy `MessageWidget`.",
            "Independent widgets benefit from separate recovery and fallback regions.",
            "A single boundary suits content that cannot be used meaningfully as separate parts."
          ],
          "modelAnswer": "The click changes local state, and the following `ActivityWidget` render throws. `WorkspaceGuard` then replaces its child tree, which also removes `MessageWidget`. Separate boundaries would suit widgets that remain useful independently. A single screen boundary is preferable when partial content would be misleading or the screen must recover as one unit."
        }
      },
      {
        "id": "react-custom-hooks-l3-s3-q15",
        "topicId": "react-custom-hooks",
        "set": 3,
        "environment": "react",
        "code": "import { useState } from 'react';\nfunction useTextHistory(initial) {\n  const [history, setHistory] = useState([initial]);\n  return {\n    text: history[history.length - 1],\n    edit: next => setHistory(old => [...old, next]),\n    undo: () => setHistory(old => old.length > 1 ? old.slice(0, -1) : old)\n  };\n}\nfunction LabelEditor() {\n  const label = useTextHistory('Parcel');\n  return <section>\n    <input value={label.text} onChange={event => label.edit(event.target.value)} />\n    <button onClick={label.undo}>Undo label edit</button>\n  </section>;\n}\nfunction InstructionEditor() {\n  const instructions = useTextHistory('Keep dry');\n  return <aside>\n    <textarea value={instructions.text} onChange={event => instructions.edit(event.target.value)} />\n    <button onClick={instructions.undo}>Undo instruction edit</button>\n  </aside>;\n}\nexport default function App() {\n  return <main><LabelEditor /><InstructionEditor /></main>;\n}",
        "check": "(async () => { await type(\"input\", \"Fragile\"); await type(\"input\", \"Glass\"); await type(\"textarea\", \"Keep upright\"); await click(\"Undo label edit\"); return value(\"input\") + \"/\" + value(\"textarea\"); })()",
        "partA": {
          "ask": "Replace the input with Fragile, then Glass, using one change event per replacement. Replace the textarea with Keep upright, then click Undo label edit. Let updates finish between actions. What are the two field values? Answer with the input and textarea values separated by a slash.",
          "accepted": [
            "Fragile/Keep upright"
          ]
        },
        "partB": {
          "ask": "Several editors need the same undo rules with different markup and controls. Which reuse boundary fits?",
          "options": [
            "Build a shared editor component that selects field markup by inspecting the supplied draft text.",
            "Keep history logic in `useTextHistory` and let calling components choose their markup and controls.",
            "Build a higher-order component that injects history and requires the editors to use one fixed layout.",
            "Store one history array in a shared module and let editor components read it while rendering."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain how the undo result is produced. When would a shared component or a higher-order component be a better choice?",
          "keyPoints": [
            "`useTextHistory` appends edits and removes the latest entry when undoing.",
            "The two hook calls maintain separate histories, so label undo leaves instructions unchanged.",
            "A shared component suits repeated markup and interaction alongside the same history rules.",
            "A higher-order component can adapt an established component API that expects injected props."
          ],
          "modelAnswer": "The label history contains its initial text followed by the two replacements, so undo removes the latest replacement. The instructions have a separate history and retain their edit. A shared component would be useful if the editors also needed the same field markup and undo controls. A higher-order component can be useful when adapting an existing collection of components that already consume injected history props."
        }
      }
    ],
};
