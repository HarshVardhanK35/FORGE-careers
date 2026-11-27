// JavaScript, level 3 (hard, production level): 3 sets of 15 questions: find the bug, output order, review a flaw and design choice.
// Written with Codex, then checked: every snippet was run (Node, or jsdom for the DOM and storage questions) five times with the same
// output and equals an accepted answer; the answer options were checked so that neither their length nor their wording gives a clue.
// A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const JAVASCRIPT_LEVEL_3: QuestionBank = {
  skillId: "javascript",
  level: 3,
  questions: [
      {
        "id": "js-closures-l3-s1-q01",
        "topicId": "js-closures",
        "set": 1,
        "environment": "node",
        "code": "function scheduleExports(filenames) {\n  const folder = \"archive/\";\n  for (var position = 0; position < filenames.length; position++) {\n    setTimeout(() => {\n      const filename = filenames[position] ?? \"missing\";\n      console.log(\"export \" + folder + filename);\n    }, 0);\n  }\n  console.log(\"scheduled \" + filenames.length);\n}\nscheduleExports([\"sales.csv\", \"stock.csv\"]);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "scheduled 2\nexport archive/missing\nexport archive/missing"
          ]
        },
        "partB": {
          "ask": "Which change makes the scheduled exports use their intended filenames?",
          "options": [
            "Move the position declaration above the loop and reset its value before scheduling the callbacks.",
            "Increase the timer delay inside the loop and keep the existing filename lookup in the callbacks.",
            "Pass the selected filename as an extra timer argument and read that argument in the callback.",
            "Wrap the loop body in a plain block and keep the existing position declaration and filename lookup."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the callbacks end up exporting the wrong filenames.",
          "keyPoints": [
            "The function's var position binding is shared by the callbacks.",
            "The loop finishes with position equal to the array length.",
            "The scheduling log runs before the timer callbacks.",
            "The missing array entry makes the callbacks use the fallback filename."
          ],
          "modelAnswer": "The function queues two timers whose callbacks refer to the same position binding. The loop finishes with position equal to two and then prints the scheduling message. When the callbacks run, they read the array at that final position. There is no entry there, so they print the folder with the missing fallback. Passing a filename as a timer argument would save the needed value for that callback."
        }
      },
      {
        "id": "js-this-binding-l3-s1-q02",
        "topicId": "js-this-binding",
        "set": 1,
        "environment": "node",
        "code": "class PriceLabel {\n  constructor(currency) { this.currency = currency; }\n  format(amount) {\n    return this.currency + amount.toFixed(2);\n  }\n}\nconst receiptLabel = new PriceLabel(\"EUR \" );\ntry {\n  const labels = [12, 30].map(receiptLabel.format);\n  console.log(labels.join(\" | \"));\n} catch (formatFault) {\n  console.log(formatFault.name);\n}\nconsole.log(receiptLabel.format(12));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "TypeError\nEUR 12.00"
          ]
        },
        "partB": {
          "ask": "Which change repairs formatting through map while keeping the class method?",
          "options": [
            "Pass an arrow callback that calls receiptLabel.format with the amount supplied by map.",
            "Save receiptLabel.format in a local variable and pass the saved function into map.",
            "Replace map with forEach and pass receiptLabel.format as the callback for the array.",
            "Add a default amount parameter to format before passing the method into the map operation."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-immutability-l3-s1-q03",
        "topicId": "js-immutability",
        "set": 1,
        "environment": "node",
        "code": "const dispatchBoard = [\"minor\", \"urgent\", \"normal\"];\nconst savedBoard = dispatchBoard;\nconst priority = { urgent: 0, normal: 1, minor: 2 };\nfunction previewDispatch(rows) {\n  return rows.sort((left, right) => priority[left] - priority[right]);\n}\nconst preview = previewDispatch(dispatchBoard);\nconsole.log(\"preview \" + preview.join(\",\"));\nconsole.log(\"saved \" + savedBoard.join(\",\"));\nconsole.log(preview === savedBoard);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "preview urgent,normal,minor\nsaved urgent,normal,minor\ntrue"
          ]
        },
        "partB": {
          "ask": "Which change lets the preview rank these strings without disturbing the saved board?",
          "options": [
            "Replace the comparator with its negative so the preview uses the opposite ranking direction.",
            "Assign the sort result to another variable before giving the preview to the rendering function.",
            "Freeze the source array before sorting it so the preview can rank its existing entries safely.",
            "Create a shallow array copy inside previewDispatch and sort that copy instead of the input rows."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-async-await-l3-s1-q04",
        "topicId": "js-async-await",
        "set": 1,
        "environment": "node",
        "code": "function storeAsset(name) {\n  return new Promise(resolve => {\n    setTimeout(() => { console.log(\"saved \" + name); resolve(); }, 0);\n  });\n}\nasync function publishAlbum() {\n  const savedAssets = [];\n  await [\"cover\", \"credits\"].forEach(async name => {\n    await storeAsset(name);\n    savedAssets.push(name);\n  });\n  console.log(\"album committed\");\n  return savedAssets.length;\n}\npublishAlbum().then(size => console.log(\"receipt \" + size));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "album committed\nreceipt 0\nsaved cover\nsaved credits"
          ]
        },
        "partB": {
          "ask": "The assets must be stored sequentially before committing. Which rewrite meets that requirement?",
          "options": [
            "Map calls to storeAsset and await Promise.all to finish before recording the album commit.",
            "Use a for...of loop and await storeAsset before recording the asset in the savedAssets array.",
            "Return storeAsset from the forEach callback and keep awaiting the result of the forEach call.",
            "Move the commit into a zero-delay timer and leave the existing async forEach operation in place."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-fetch-abort-l3-s1-q05",
        "topicId": "js-fetch-abort",
        "set": 1,
        "environment": "node",
        "code": "function fakeFetch(term, delay, signal) {\n  return new Promise((resolve, reject) => {\n    if (signal.aborted) { reject(signal.reason); return; }\n    const pending = setTimeout(() => resolve(term.toUpperCase()), delay);\n    signal.addEventListener(\"abort\", () => {\n      clearTimeout(pending); reject(signal.reason);\n    }, { once: true });\n  });\n}\nlet activeControl;\nlet displayedResult = \"\";\nasync function loadGlossary(term, delay) {\n  activeControl = new AbortController();\n  const reply = await fakeFetch(term, delay, activeControl.signal);\n  displayedResult = reply;\n  console.log(\"display \" + displayedResult);\n}\nloadGlossary(\"older\", 40);\nloadGlossary(\"newer\", 0);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "display NEWER\ndisplay OLDER"
          ]
        },
        "partB": {
          "ask": "Which change prevents stale commits even when a request implementation cannot cancel work?",
          "options": [
            "Reuse a shared AbortController across searches and attach the selected term to its signal object.",
            "Sort the returned text before committing it and use the same sort function for subsequent searches.",
            "Delay the next search a bit more and keep the code that writes replies into the display.",
            "Assign increasing request IDs and commit a reply when its ID still matches the latest search ID."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-event-loop-l3-s1-q06",
        "topicId": "js-event-loop",
        "set": 1,
        "environment": "node",
        "code": "console.log(\"checkout\");\nsetTimeout(() => {\n  console.log(\"receipt\");\n  Promise.resolve().then(() => console.log(\"receipt micro\"));\n}, 0);\nPromise.resolve().then(() => {\n  console.log(\"discount\");\n  queueMicrotask(() => console.log(\"tax\"));\n});\nasync function reserveStock() {\n  console.log(\"reserve\");\n  await null;\n  console.log(\"reserved\");\n}\nreserveStock();\nqueueMicrotask(() => console.log(\"stock\"));\nconsole.log(\"submitted\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "checkout\nreserve\nsubmitted\ndiscount\nreserved\nstock\ntax\nreceipt\nreceipt micro"
          ]
        },
        "partB": {
          "ask": "If scheduled work throws, how does queueMicrotask differ from a fulfillment handler passed to then?",
          "options": [
            "A queueMicrotask throw reaches uncaught exception handling; a then handler throw rejects its result promise.",
            "A queueMicrotask throw becomes a rejected result promise; a then handler throw reaches uncaught exception handling.",
            "A queueMicrotask throw resumes the calling stack; a then handler throw reopens the original promise executor.",
            "A queueMicrotask throw cancels pending timers; a then handler throw fulfills its result with the thrown error."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the script, nested microtask, async continuation and timer share execution.",
          "keyPoints": [
            "The script and the async function before await run synchronously.",
            "The first promise handler, await continuation and stock callback enter the microtask queue in that order.",
            "The nested tax microtask joins the queue behind work already waiting.",
            "The timer runs after these microtasks and then queues its own promise handler."
          ],
          "modelAnswer": "The script prints checkout, enters reserveStock and prints reserve, then prints submitted. The first promise handler prints discount and adds tax behind the waiting reserved and stock work. The queue then prints reserved, stock and tax. The timer prints receipt after that queue drains, and its promise handler prints receipt micro."
        }
      },
      {
        "id": "js-promises-l3-s1-q07",
        "topicId": "js-promises",
        "set": 1,
        "environment": "node",
        "code": "const documentReady = Promise.resolve(\"signed\");\ndocumentReady.then(() => {\n  console.log(\"attach\");\n  return Promise.resolve(\"attached\");\n}).then(status => console.log(status));\ndocumentReady.then(() => {\n  console.log(\"stamp\");\n  return \"stamped\";\n}).then(status => {\n  console.log(status);\n}).then(() => console.log(\"filed\"));\nconsole.log(\"opened\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "opened\nattach\nstamp\nstamped\nfiled\nattached"
          ]
        },
        "partB": {
          "ask": "If attachment later returns a rejected promise, where should the attachment failure handler go?",
          "options": [
            "Wrap handler registration in try/catch so an asynchronous attachment failure can be caught.",
            "Read a rejection property from documentReady after registering the attachment operation and its callback.",
            "Attach catch to the promise returned by the attachment chain to handle its asynchronous failure.",
            "Add catch to documentReady before registering attachment so the source promise receives attachment failures."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-timers-l3-s1-q08",
        "topicId": "js-timers",
        "set": 1,
        "environment": "node",
        "code": "let probeNumber = 0;\nconst healthPoll = setInterval(() => {\n  probeNumber += 1;\n  console.log(\"probe \" + probeNumber);\n  Promise.resolve().then(() => console.log(\"probe queued\"));\n  if (probeNumber === 1) {\n    clearInterval(healthPoll);\n    setTimeout(() => console.log(\"probe closed\"), 0);\n  }\n}, 20);\nsetTimeout(() => {\n  console.log(\"panel ready\");\n  Promise.resolve().then(() => console.log(\"panel queued\"));\n}, 0);\nPromise.resolve().then(() => console.log(\"panel start\"));\nconsole.log(\"mounted\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "mounted\npanel start\npanel ready\npanel queued\nprobe 1\nprobe queued\nprobe closed"
          ]
        },
        "partB": {
          "ask": "For repeated polling with an async probe that may take longer than the interval, what prevents overlapping probes?",
          "options": [
            "Increase the fixed interval to an estimated duration and let the async callback return its pending promise.",
            "Schedule the next timeout after awaiting probe completion so the next poll begins after the active work finishes.",
            "Move the probe into a promise callback in setInterval so its pending work stays within the interval schedule.",
            "Call clearTimeout on the promise returned by the probe so the next interval tick can start with fresh work."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-async-await-l3-s1-q09",
        "topicId": "js-async-await",
        "set": 1,
        "environment": "node",
        "code": "async function releaseLease() {\n  try {\n    console.log(\"lease\");\n    return \"released\";\n  } finally {\n    console.log(\"cleanup\");\n    await Promise.resolve();\n    console.log(\"clean\");\n  }\n}\nasync function refreshBadge() {\n  console.log(\"badge\");\n  try { await null; console.log(\"paint\"); }\n  finally { console.log(\"badge settled\"); }\n}\nreleaseLease().then(status => console.log(status));\nrefreshBadge().then(() => console.log(\"refresh done\"));\nconsole.log(\"idle\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "lease\ncleanup\nbadge\nidle\nclean\npaint\nbadge settled\nreleased\nrefresh done"
          ]
        },
        "partB": {
          "ask": "If asynchronous cleanup in finally rejects without being caught, what happens to a return pending from try?",
          "options": [
            "The cleanup rejection replaces the pending return and supplies the async function's new rejection reason.",
            "The earlier return fulfills the function and puts the cleanup rejection on a separate promise.",
            "The function reruns its try block and uses the repeated return value to recover from cleanup failure.",
            "The cleanup promise becomes a fulfilled return value and exposes its rejection through its own status field."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-debounce-throttle-l3-s1-q10",
        "topicId": "js-debounce-throttle",
        "set": 1,
        "environment": "node",
        "code": "function debounceBand(action, delay) {\n  let pendingBand;\n  return (...bounds) => {\n    clearTimeout(pendingBand);\n    pendingBand = setTimeout(() => action(), delay);\n  };\n}\nfunction applyPriceBand(low, high) {\n  console.log(\"range\", low ?? \"unset\", high ?? \"unset\");\n}\nconst queueBand = debounceBand(applyPriceBand, 10);\nqueueBand(10, 20);\nqueueBand(30, 50);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "range unset unset"
          ]
        },
        "partB": {
          "ask": "This wrapper is for plain functions and should deliver the latest supplied bounds. What must change?",
          "options": [
            "Invoke action before starting the timer so its return value can carry the supplied bounds into the delay.",
            "Assign bounds onto properties of action so its named parameters can read those properties when invoked.",
            "Drop clearTimeout from the wrapper so pending calls can retain the bounds supplied to the wrapper.",
            "Forward the captured bounds with action(...bounds) inside the timer callback once the delay has expired."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-deep-clone-equal-l3-s1-q11",
        "topicId": "js-deep-clone-equal",
        "set": 1,
        "environment": "node",
        "code": "function sameSchema(left, right) {\n  if (left === right) return true;\n  if (left === null || right === null) return false;\n  if (typeof left !== \"object\" || typeof right !== \"object\") return false;\n  const keys = Object.keys(left);\n  return keys.length === Object.keys(right).length && keys.every(key =>\n    Object.hasOwn(right, key) && sameSchema(left[key], right[key])\n  );\n}\nconst storedSchema = { columns: [\"title\", \"status\"] };\nconst importedSchema = { columns: { 0: \"title\", 1: \"status\" } };\nconsole.log(\"skip migration\", sameSchema(storedSchema, importedSchema));\nconsole.log(\"imported array\", Array.isArray(importedSchema.columns));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "skip migration true\nimported array false"
          ]
        },
        "partB": {
          "ask": "For JSON-like schemas where arrays and records are distinct types, which addition fixes this comparison flaw?",
          "options": [
            "Sort the property names before recursive comparison so numeric keys can be checked in a stable order.",
            "Reject a pair if the two Array.isArray checks differ before comparing the names and values of properties.",
            "Convert property names to strings before lookup so the recursive comparison can match numeric entries.",
            "Compare the lists from Object.values instead of Object.keys so matching contents can establish structural equality."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-promise-combinators-l3-s1-q12",
        "topicId": "js-promise-combinators",
        "set": 1,
        "environment": "node",
        "code": "function gatherUploads(tasks) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    if (tasks.length === 0) { resolve(results); return; }\n    tasks.forEach(task => {\n      Promise.resolve(task).then(value => {\n        results.push(value);\n        if (results.length === tasks.length) resolve(results);\n      }, reject);\n    });\n  });\n}\nfunction uploadPart(label, delay) {\n  return new Promise(resolve => setTimeout(() => resolve(label), delay));\n}\nconst uploads = [uploadPart(\"photo\", 40), uploadPart(\"badge\", 0)];\ngatherUploads(uploads).then(parts => console.log(parts.join(\",\")));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "badge,photo"
          ]
        },
        "partB": {
          "ask": "The caller pairs results with input metadata by position. Which rewrite gives this utility that Promise.all behavior?",
          "options": [
            "Sort the collected fulfillment values by their text before resolving so the caller gets a stable result array.",
            "Allocate results with the input length and resolve after the first assignment because the array has its final size.",
            "Write fulfillment values at their original input indexes and track a separate completion count before resolving the array.",
            "Reverse the collected result array before resolving so the entries can be paired with their input metadata positions."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-debounce-throttle-l3-s1-q13",
        "topicId": "js-debounce-throttle",
        "set": 1,
        "environment": "node",
        "code": "let searchDeadline;\nfunction onSearchText(text) {\n  clearTimeout(searchDeadline);\n  if (text.length < 2) {\n    console.log(\"suggestions cleared\");\n    return;\n  }\n  searchDeadline = setTimeout(() => {\n    console.log(\"request \" + text);\n  }, 15);\n}\n[\"p\", \"pi\", \"piano\"].forEach(onSearchText);\nconsole.log(\"input painted\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "suggestions cleared\ninput painted\nrequest piano"
          ]
        },
        "partB": {
          "ask": "For a costly search endpoint whose results are useful after typing pauses, which policy best fits the traffic goal?",
          "options": [
            "Use trailing debounce to group bursts of typing before sending searches to the costly endpoint.",
            "Choose a leading throttle to send the first term in a window as the completed search intent.",
            "Start a request on keypress and hide stale replies to reduce how much work reaches the endpoint.",
            "Queue the typed terms for sequential dispatch so the endpoint can avoid processing redundant searches."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain when throttling or sending a request on keypress would be better than this search policy.",
          "keyPoints": [
            "Throttling can provide periodic results during sustained typing.",
            "A trailing debounce can postpone results while typing continues.",
            "Requests on keypress suit cheap operations that need prompt intermediate feedback.",
            "Debouncing alone does not prevent stale responses from requests already in flight."
          ],
          "modelAnswer": "Throttling is useful when a field should show periodic results during a long typing session. A trailing debounce can keep postponing those results while input continues. Sending a request on keypress can suit a cheap operation when intermediate feedback matters more than reducing traffic. Whichever policy is chosen, requests already in flight still need cancellation or a stale response check."
        }
      },
      {
        "id": "js-map-set-l3-s1-q14",
        "topicId": "js-map-set",
        "set": 1,
        "environment": "node",
        "code": "const templateCache = new Map();\nfunction compiledTemplate(locale, mode) {\n  const key = JSON.stringify([locale, mode]);\n  if (!templateCache.has(key)) {\n    templateCache.set(key, { source: locale + \":\" + mode });\n  }\n  return templateCache.get(key);\n}\nconst firstTemplate = compiledTemplate(\"en\", \"print\");\nconst secondTemplate = compiledTemplate(\"en\", \"print\");\nconsole.log(firstTemplate === secondTemplate);\nconsole.log(templateCache.size);\ntemplateCache.delete(JSON.stringify([\"en\", \"print\"]));\nconsole.log(firstTemplate === compiledTemplate(\"en\", \"print\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "true\n1\nfalse"
          ]
        },
        "partB": {
          "ask": "Locale and mode are strings. Equivalent inputs must share entries, with size inspection and explicit removal. Which design fits?",
          "options": [
            "Use a WeakMap keyed by fresh configuration objects to combine equivalent settings with cache size inspection.",
            "Choose a plain object keyed by fresh arrays to distinguish string tuples without an explicit key encoding.",
            "Keep a Map keyed by encoded string tuples for shared entries, size inspection and explicit removal.",
            "Build a Set of compiled template objects to retrieve cached templates directly from matching locale and mode."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain when a WeakMap or a plain object would be better than the Map design shown here.",
          "keyPoints": [
            "A WeakMap suits metadata tied to the identity and lifetime of object keys.",
            "WeakMap keys do not keep otherwise unreachable objects alive and cannot be enumerated.",
            "A plain object suits a small string-keyed record that needs JSON serialization.",
            "The shown Map needs an explicit removal or eviction policy for bounded growth."
          ],
          "modelAnswer": "A WeakMap is useful when cached metadata belongs to a particular object and should follow that object's lifetime. It does not keep an otherwise unreachable object key alive, but it cannot list its keys or report a size. A plain object can be simpler for a small string-keyed record that needs direct JSON serialization. The shown Map provides inspection and explicit removal, so a growing cache also needs an eviction policy."
        }
      },
      {
        "id": "js-dom-events-l3-s1-q15",
        "topicId": "js-dom-events",
        "set": 1,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Release queue</title></head><body><ul id=\"releases\"><li><button data-release=\"stable\">Stable</button><ul><li><button id=\"nested\" data-release=\"sandbox\">Sandbox</button></li></ul></li></ul></body></html>",
        "code": "const releaseQueue = document.querySelector(\"#releases\");\nreleaseQueue.addEventListener(\"click\", event => {\n  const trigger = event.target.closest(\"button[data-release]\");\n  if (!trigger || trigger.closest(\"ul\") !== releaseQueue) return;\n  console.log(\"deploy \" + trigger.dataset.release);\n});\nconst releaseRow = document.createElement(\"li\");\nreleaseRow.innerHTML = '<button data-release=\"hotfix\"><span>Deploy patch</span></button>';\nreleaseQueue.append(releaseRow);\nreleaseRow.querySelector(\"span\").click();\ndocument.querySelector(\"#nested\").click();\nreleaseQueue.querySelector('[data-release=\"stable\"]').click();",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "deploy hotfix\ndeploy stable"
          ]
        },
        "partB": {
          "ask": "Rows change frequently and nested queues own their actions. Which listener policy best fits those requirements?",
          "options": [
            "Scan the initial buttons and attach direct listeners, relying on later inserted markup to copy those listeners.",
            "Delegate on the stable queue container and check ownership before dispatching the matched action to its handler.",
            "Bind clicks to the document and dispatch from the nearest matching button without checking which queue owns it.",
            "Rebind direct listeners across the queue after insertions without tracking registrations already present on buttons."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain when direct listeners on the buttons would be better than the delegated approach shown here.",
          "keyPoints": [
            "Direct listeners can be simpler for a small, stable collection of controls.",
            "Separate controls can need distinct handlers or independent listener lifetimes.",
            "Delegation through a bubbling listener depends on events reaching the container.",
            "Direct listeners on dynamic controls require registration when the controls are created."
          ],
          "modelAnswer": "Direct listeners can be simpler when a small set of buttons stays stable. They also suit controls that need distinct handlers or independent listener cleanup. A listener at the control can handle an event even when propagation is stopped before it reaches the delegated container. If buttons are added later, their creation path must register the needed direct listeners."
        }
      },
      {
        "id": "js-closures-l3-s2-q01",
        "topicId": "js-closures",
        "set": 2,
        "environment": "node",
        "code": "const fallbackDraft = { text: \"\" };\nfunction openComposer(draft = fallbackDraft) {\n  return {\n    write(text) { draft.text = text; },\n    preview() { return draft.text || \"blank\"; }\n  };\n}\nconst supportComposer = openComposer();\nconst feedbackComposer = openComposer();\nsupportComposer.write(\"Please help\");\nconsole.log(feedbackComposer.preview());\nfeedbackComposer.write(\"Looks good\");\nconsole.log(supportComposer.preview());",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "Please help\nLooks good"
          ]
        },
        "partB": {
          "ask": "Omitted drafts should belong to separate composers. Which change repairs that contract?",
          "options": [
            "Freeze the fallback draft before opening composers and keep the existing write method for editing its text.",
            "Bind the preview method to its returned composer object and keep using the fallback draft for new drafts.",
            "Create a fresh draft in the default expression so separate calls can edit separate drafts.",
            "Copy the text when preview runs and store that text on the composer object before returning the preview."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-prototypes-l3-s2-q02",
        "topicId": "js-prototypes",
        "set": 2,
        "environment": "node",
        "code": "function UploadLane(label) { this.label = label; }\nUploadLane.prototype.pending = [];\nUploadLane.prototype.enqueue = function (filename) {\n  this.pending.push(this.label + \":\" + filename);\n};\nconst photosLane = new UploadLane(\"photos\");\nconst invoicesLane = new UploadLane(\"invoices\");\nphotosLane.enqueue(\"scan.png\");\ninvoicesLane.enqueue(\"bill.pdf\");\nconsole.log(photosLane.pending.join(\"|\"));\nconsole.log(Object.hasOwn(invoicesLane, \"pending\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "photos:scan.png|invoices:bill.pdf\nfalse"
          ]
        },
        "partB": {
          "ask": "The lanes need independent pending lists and a shared enqueue method. Which change fits?",
          "options": [
            "Initialize this.pending to a new array inside the constructor and remove the prototype pending property.",
            "Call the inherited push method with the lane as receiver and leave pending on the shared prototype.",
            "Reset the pending array on the shared prototype before creating lanes and leave their constructor unchanged.",
            "Assign distinct label strings in the constructor and retain pending as a property on the shared prototype."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-immutability-l3-s2-q03",
        "topicId": "js-immutability",
        "set": 2,
        "environment": "node",
        "code": "const savedWorkflow = { name: \"Checkout\", steps: [\"address\"] };\nconst undoHistory = [savedWorkflow];\nfunction appendReview(workflow) {\n  const revised = { ...workflow };\n  revised.steps.push(\"review\");\n  return revised;\n}\nconst activeWorkflow = appendReview(savedWorkflow);\nconsole.log(\"undo \" + undoHistory[0].steps.join(\">\"));\nconsole.log(\"active \" + activeWorkflow.steps.join(\">\"));\nconsole.log(undoHistory[0] === activeWorkflow);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "undo address>review\nactive address>review\nfalse"
          ]
        },
        "partB": {
          "ask": "Undo must retain the previous steps. Which replacement for appendReview preserves that requirement?",
          "options": [
            "Freeze the workflow record before spreading it, then keep pushing the review step onto revised.steps.",
            "Slice undoHistory before appending review, then spread the workflow and push into the existing steps array.",
            "Spread workflow.steps into a new array after pushing review, then return the revised workflow record.",
            "Return a separate workflow record with steps built from the previous steps array followed by the review step."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, why undo changes and how to repair the update without copying unrelated data.",
          "keyPoints": [
            "The undo entry retains the original workflow record.",
            "Object spread creates a new record but shares its steps array.",
            "Pushing into the shared array changes the undo entry.",
            "Replace the steps array while copying the workflow record."
          ],
          "modelAnswer": "Undo history holds the original workflow record. The spread creates a different outer record but keeps the same steps array. Pushing review changes that shared array, so undo displays the added step too. Return a new record with a new steps array containing the old steps and review, while keeping unrelated values shared."
        }
      },
      {
        "id": "js-promises-l3-s2-q04",
        "topicId": "js-promises",
        "set": 2,
        "environment": "node",
        "code": "function buildManifest() {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      console.log(\"manifest built\");\n      resolve({ pages: 3 });\n    }, 10);\n  });\n}\nPromise.resolve(\"approved\")\n  .then(() => { buildManifest(); })\n  .then(manifest => {\n    console.log(\"manifest received\", manifest === undefined);\n    return manifest.pages;\n  })\n  .catch(fault => console.log(\"publish\", fault.name));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "manifest received true\npublish TypeError\nmanifest built"
          ]
        },
        "partB": {
          "ask": "Publication must use the completed manifest and route build failures to catch. Which change repairs the chain?",
          "options": [
            "Move buildManifest into finally on the initial promise and keep the manifest consumer on the existing then.",
            "Return buildManifest() from the first handler and keep the manifest consumer attached to the resulting chain.",
            "Pass buildManifest as an argument to console.log in the first handler and keep the existing manifest consumer.",
            "Attach catch directly to buildManifest inside the first handler and leave the existing manifest consumer there."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-memory-l3-s2-q05",
        "topicId": "js-memory",
        "set": 2,
        "environment": "node",
        "code": "const heartbeatBus = new EventTarget();\nlet retainedCalls = 0;\nfunction mountMeter() {\n  const sampleBuffer = new Array(1000).fill(7);\n  const onBeat = () => { retainedCalls++; sampleBuffer.push(7); };\n  heartbeatBus.addEventListener(\"beat\", onBeat);\n  return { dispose() { console.log(\"meter closed\"); } };\n}\nlet meterPanel = mountMeter();\nheartbeatBus.dispatchEvent(new Event(\"beat\"));\nmeterPanel.dispose();\nmeterPanel = null;\nheartbeatBus.dispatchEvent(new Event(\"beat\"));\nheartbeatBus.dispatchEvent(new Event(\"beat\"));\nconsole.log(\"retained calls\", retainedCalls);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "meter closed\nretained calls 3"
          ]
        },
        "partB": {
          "ask": "Which disposal change stops future meter callbacks and releases the bus reference to the captured buffer?",
          "options": [
            "Set meterPanel to undefined during dispose and keep the registered beat callback on the heartbeat bus.",
            "Replace sampleBuffer with a smaller array inside mountMeter and keep the registered beat callback active.",
            "Remove the beat listener inside dispose using the same onBeat function reference used for registration.",
            "Register a second beat callback in dispose that returns early and leave the first registration in place."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-event-loop-l3-s2-q06",
        "topicId": "js-event-loop",
        "set": 2,
        "environment": "node",
        "code": "async function refreshInventory() {\n  console.log(\"inventory read\");\n  await Promise.resolve();\n  console.log(\"inventory merge\");\n  await null;\n  console.log(\"inventory paint\");\n}\nasync function refreshDelivery() {\n  console.log(\"delivery read\");\n  await null;\n  console.log(\"delivery merge\");\n  await Promise.resolve();\n  console.log(\"delivery paint\");\n}\nrefreshInventory();\nrefreshDelivery();\nconsole.log(\"refresh launched\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "inventory read\ndelivery read\nrefresh launched\ninventory merge\ndelivery merge\ninventory paint\ndelivery paint"
          ]
        },
        "partB": {
          "ask": "If a refresh later awaits a rejected request without a local catch, how can its caller observe the failure?",
          "options": [
            "Read the async function return as a status record whose error property contains the awaited rejection reason.",
            "Surround the unawaited refresh call with a synchronous try/catch to handle the rejection from its request.",
            "Supply an error callback as an extra argument to then so its third parameter receives the refresh rejection.",
            "Attach catch to the returned refresh promise or await that promise inside a surrounding try/catch statement."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the two refresh functions interleave at their await expressions.",
          "keyPoints": [
            "Calling an async function runs its body up to its first await.",
            "The initial calls queue inventory and delivery continuations in that order.",
            "The next await queues a new continuation behind work already waiting.",
            "Awaiting null also defers the continuation."
          ],
          "modelAnswer": "The initial calls print inventory read and delivery read before the script prints refresh launched. Their first await continuations enter the microtask queue in call order. Inventory prints its merge message and queues its next continuation behind delivery, which then does the same. The queue next prints inventory paint and delivery paint; awaiting null also suspends execution."
        }
      },
      {
        "id": "js-promise-combinators-l3-s2-q07",
        "topicId": "js-promise-combinators",
        "set": 2,
        "environment": "node",
        "code": "function renderTile(label, delay) {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      console.log(\"rendered \" + label);\n      resolve(label);\n    }, delay);\n  });\n}\nconst detailTile = renderTile(\"detail\", 40);\nconst summaryTile = renderTile(\"summary\", 0);\nPromise.all([detailTile, summaryTile])\n  .then(tiles => console.log(\"bundle \" + tiles.join(\"|\")));\nPromise.race([detailTile, summaryTile])\n  .then(tile => console.log(\"first \" + tile));\nconsole.log(\"dashboard requested\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "dashboard requested\nrendered summary\nfirst summary\nrendered detail\nbundle detail|summary"
          ]
        },
        "partB": {
          "ask": "A future version races costly requests. What extra behavior must be designed to stop unnecessary pending work?",
          "options": [
            "Pass cancellation signals to the request operations and explicitly abort pending work after choosing a result.",
            "Replace the request array with a Set so the race can release pending operations after choosing a result.",
            "Return the winning value from the race handler so pending operations can detect completion from that value.",
            "Wrap the request promises in Promise.resolve so the race can dispose of pending operations when it settles."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-timers-l3-s2-q08",
        "topicId": "js-timers",
        "set": 2,
        "environment": "node",
        "code": "console.log(\"toast queued\");\nsetTimeout(() => {\n  console.log(\"toast shown\");\n  setTimeout(() => {\n    console.log(\"toast focused\");\n    Promise.resolve().then(() => console.log(\"focus recorded\"));\n    setTimeout(() => console.log(\"toast hidden\"), 10);\n  }, 0);\n  Promise.resolve().then(() => console.log(\"show recorded\"));\n}, 0);\nPromise.resolve().then(() => console.log(\"queue recorded\"));",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "toast queued\nqueue recorded\ntoast shown\nshow recorded\ntoast focused\nfocus recorded\ntoast hidden"
          ]
        },
        "partB": {
          "ask": "If the toast closes after its outer callback has finished, which cleanup handles its pending nested callbacks?",
          "options": [
            "Clear the outer timeout handle during closure so completed callbacks can withdraw their nested timeout work.",
            "Mark the toast record as closed during closure so the timer service can withdraw callbacks reading that record.",
            "Retain the nested timeout handles and clear those pending handles when the toast closes during its display.",
            "Replace the outer callback with a blank function during closure so nested callbacks inherit the new behavior."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-dom-events-l3-s2-q09",
        "topicId": "js-dom-events",
        "set": 2,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Publishing controls</title></head><body><main id=\"workspace\"><div id=\"toolbar\"><button id=\"publish\" type=\"button\">Publish</button></div></main></body></html>",
        "code": "const workspace = document.querySelector(\"#workspace\");\nconst toolbar = document.querySelector(\"#toolbar\");\nconst publish = document.querySelector(\"#publish\");\nworkspace.addEventListener(\"click\", () => console.log(\"workspace capture\"), true);\ntoolbar.addEventListener(\"click\", event => {\n  console.log(\"toolbar guard\");\n  event.stopPropagation();\n}, true);\ntoolbar.addEventListener(\"click\", () => console.log(\"toolbar audit\"), true);\npublish.addEventListener(\"click\", () => console.log(\"publish target\"));\ntoolbar.addEventListener(\"click\", () => console.log(\"toolbar bubble\"));\nworkspace.addEventListener(\"click\", () => console.log(\"workspace bubble\"));\npublish.click();\nconsole.log(\"dispatch complete\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "workspace capture\ntoolbar guard\ntoolbar audit\ndispatch complete"
          ]
        },
        "partB": {
          "ask": "A separate link guard must cancel navigation while allowing analytics listeners to run. Which policy fits?",
          "options": [
            "Return false from a listener registered with addEventListener and retain the existing analytics listeners.",
            "Call preventDefault in a non-passive click listener and keep propagation available for analytics listeners.",
            "Use stopImmediatePropagation in the link listener and keep the current registration of analytics listeners.",
            "Remove the link click listener after its first invocation and keep the current analytics listeners attached."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-polyfills-l3-s2-q10",
        "topicId": "js-polyfills",
        "set": 2,
        "environment": "node",
        "code": "function bindPricing(fn, receiver, ...preset) {\n  return function (...later) {\n    return fn.apply(receiver, later);\n  };\n}\nconst shippingRules = { base: 5 };\nfunction quoteShipping(regionFee, weight) {\n  return this.base + regionFee + weight;\n}\nconst quoteRegional = bindPricing(quoteShipping, shippingRules, 4);\nconsole.log(\"quote\", quoteRegional(3));\nconsole.log(\"native\", quoteShipping.bind(shippingRules, 4)(3));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "quote NaN\nnative 12"
          ]
        },
        "partB": {
          "ask": "For ordinary calls, the helper must honor bound arguments before later arguments. Which rewrite meets that contract?",
          "options": [
            "Invoke fn with later.concat(preset) through apply so arguments supplied at call time precede the saved arguments.",
            "Assign preset values onto receiver before invoking fn through apply with the existing later argument array.",
            "Replace apply with call(receiver, preset, later) so the saved and later argument arrays reach fn as parameters.",
            "Forward preset.concat(later) through apply with receiver so saved arguments precede the arguments from the call."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-array-utilities-l3-s2-q11",
        "topicId": "js-array-utilities",
        "set": 2,
        "environment": "node",
        "code": "function flattenPermissions(tree, depth = 1) {\n  const flat = [];\n  for (const branch of tree) {\n    if (Array.isArray(branch)) {\n      flat.push(...flattenPermissions(branch));\n    } else flat.push(branch);\n  }\n  return flat;\n}\nconst permissionTree = [\"read\", [\"edit\", [\"approve\"]]];\nconst previewPermissions = flattenPermissions(permissionTree, 1);\nconsole.log(JSON.stringify(previewPermissions));\nconsole.log(JSON.stringify(permissionTree));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "[\"read\",\"edit\",\"approve\"]\n[\"read\",[\"edit\",[\"approve\"]]]"
          ]
        },
        "partB": {
          "ask": "For dense arrays and nonnegative integer depths, which change makes the utility honor the requested nesting limit?",
          "options": [
            "Recurse into arrays when depth is positive, pass depth minus one, and otherwise append the branch unchanged.",
            "Decrease depth after processing a sibling branch, then continue recursing with the default depth parameter.",
            "Slice the completed flat array to the requested depth, then append the remaining source branches unchanged.",
            "Sort nested arrays ahead of scalar entries before recursion, then call the same helper with its default depth."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-higher-order-l3-s2-q12",
        "topicId": "js-higher-order",
        "set": 2,
        "environment": "node",
        "code": "function onceReceipt(action) {\n  let completed = false;\n  let saved;\n  return function (...args) {\n    if (!completed) {\n      saved = action(...args);\n      completed = true;\n    }\n    return saved;\n  };\n}\nlet receiptWrites = 0;\nlet sendReceipt;\nsendReceipt = onceReceipt(() => {\n  receiptWrites += 1;\n  if (receiptWrites === 1) sendReceipt();\n  return \"sent\";\n});\nconsole.log(sendReceipt(), receiptWrites);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "sent 2"
          ]
        },
        "partB": {
          "ask": "A synchronous action may reenter through a hook. It must start at most once, even if it throws. Which policy fits?",
          "options": [
            "Schedule completed to change in a promise handler after action returns, preserving the current saved result.",
            "Mark the wrapper as started before invoking action, and define what a call made during execution receives.",
            "Cache the action reference outside the returned function, then invoke that reference before marking completion.",
            "Clear the saved result when action is entered again, then invoke action to replace the missing cached result."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-promises-l3-s2-q13",
        "topicId": "js-promises",
        "set": 2,
        "environment": "node",
        "code": "let reportAttempts = 0;\nfunction requestReport() {\n  return new Promise((resolve, reject) => setTimeout(() => {\n    reportAttempts += 1;\n    console.log(\"report attempt \" + reportAttempts);\n    if (reportAttempts < 3) reject(new Error(\"busy\"));\n    else resolve(\"download ready\");\n  }, 0));\n}\nasync function fetchReport() {\n  for (let attempt = 1; attempt <= 3; attempt++) {\n    try { return await requestReport(); }\n    catch (fault) {\n      if (attempt === 3) throw fault;\n      console.log(\"retry queued\");\n    }\n  }\n}\nfetchReport().then(result => console.log(result));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "report attempt 1\nretry queued\nreport attempt 2\nretry queued\nreport attempt 3\ndownload ready"
          ]
        },
        "partB": {
          "ask": "Report reads are safe to repeat, but transient overload affects many clients. Which retry policy best fits?",
          "options": [
            "Repeat failed report reads without a pause and keep a bounded attempt count to reduce extra pressure during overload.",
            "Retry failed report reads after a fixed tiny wait and reset the attempt limit when another rejection arrives.",
            "Stop after the first failed report read and treat transient overload as a permanent report validation failure.",
            "Use bounded retries with growing capped delays and jitter, retrying transient failures within a request budget."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "When would no retry or a retry without an added wait be better than growing delays? Explain the tradeoffs.",
          "keyPoints": [
            "No retry suits validation failures and operations unsafe to repeat.",
            "A tightly bounded retry without added wait can suit isolated transient faults with a strict latency budget.",
            "Growing capped waits reduce repeated pressure during overload.",
            "Attempt limits and cancellation bound the work."
          ],
          "modelAnswer": "No retry is better for invalid input or an operation that could duplicate a side effect. A tightly bounded retry without an added wait can suit an isolated transient fault when latency matters and overload is not the cause. Growing capped delays are better when repeated attempts would add pressure to a busy service. Limits and cancellation keep retries within the caller's budget."
        }
      },
      {
        "id": "js-immutability-l3-s2-q14",
        "topicId": "js-immutability",
        "set": 2,
        "environment": "node",
        "code": "const previousJobs = [\n  { id: \"export\", status: \"queued\" },\n  { id: \"index\", status: \"running\" }\n];\nfunction markFinished(jobs, finishedId) {\n  return jobs.map(job => job.id === finishedId\n    ? { ...job, status: \"finished\" }\n    : job);\n}\nconst nextJobs = markFinished(previousJobs, \"export\");\nconsole.log(previousJobs === nextJobs);\nconsole.log(previousJobs[0] === nextJobs[0], previousJobs[1] === nextJobs[1]);\nconsole.log(previousJobs[0].status + \" -> \" + nextJobs[0].status);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "false\nfalse true\nqueued -> finished"
          ]
        },
        "partB": {
          "ask": "The job board keeps prior snapshots and uses reference checks to refresh rows. Which update policy fits?",
          "options": [
            "Mutate the matching job in place and reuse the list so reference checks can detect its changed status value.",
            "Replace the list and changed job while sharing unchanged jobs, preserving snapshots and useful row references.",
            "Copy the list after mutating the matching job so prior snapshots retain the status saved before mutation.",
            "Freeze the list and assign matching status in place so row references can signal the job was updated."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "When would changing a job in place be better than the map and spread approach? Explain the ownership needed.",
          "keyPoints": [
            "Mutation can suit a privately owned working buffer.",
            "No prior snapshot may depend on the mutated objects.",
            "Change notification must not depend solely on new references.",
            "Copying a large list has allocation and traversal costs."
          ],
          "modelAnswer": "Changing a job in place can be simpler for a private working buffer with no retained snapshots. The owner must know that other readers do not depend on the old job values. Updates must use explicit notification or another mechanism that does not depend solely on new references. This can avoid the traversal and allocation cost of replacing a large list."
        }
      },
      {
        "id": "js-web-storage-l3-s2-q15",
        "topicId": "js-web-storage",
        "set": 2,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Job board display settings</title></head><body><main><h1>Display settings</h1><p id=\"density\">Compact rows</p></main></body></html>",
        "code": "const displayPrefs = { density: \"compact\", hidden: new Set([\"salary\", \"notes\"]) };\nconst volatileAccessToken = \"temporary-token\";\nlocalStorage.setItem(\"job-board-view\", JSON.stringify(displayPrefs));\nconst restoredPrefs = JSON.parse(localStorage.getItem(\"job-board-view\"));\nconsole.log(restoredPrefs.density);\nconsole.log(JSON.stringify(restoredPrefs.hidden));\nconsole.log(restoredPrefs.hidden instanceof Set);\nconsole.log(localStorage.getItem(\"access-token\") === null);\nconsole.log(typeof volatileAccessToken);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "compact\n{}\nfalse\ntrue\nstring"
          ]
        },
        "partB": {
          "ask": "Preferences must survive reloads; scripts need short-lived access tokens; a server session should use HttpOnly. Which split fits?",
          "options": [
            "Encode persistent preferences as JSON records with arrays in localStorage, keep access tokens in memory, and use a server-set HttpOnly cookie.",
            "Serialize preferences into memory for reload recovery, keep access tokens in localStorage, and set HttpOnly session cookies through document.cookie.",
            "Store preferences in a request cookie for offline reads, attach access tokens to DOM attributes, and keep server sessions in localStorage.",
            "Keep preferences as raw objects in localStorage for type recovery, place access tokens in memory, and keep server sessions in script-readable cookies."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain when memory or a cookie is better than localStorage, and how to repair the preference round trip.",
          "keyPoints": [
            "Serialize the hidden Set as an array and rebuild it explicitly.",
            "Memory suits temporary values that should disappear with the page.",
            "Cookies suit server sessions because matching requests send them.",
            "A server-set HttpOnly cookie blocks script reads; memory tokens remain exposed to injected script."
          ],
          "modelAnswer": "Convert hidden to an array before storing preferences, then explicitly rebuild its Set after parsing. Memory is useful for temporary access tokens, though injected script can still read accessible memory. A server-set HttpOnly cookie is better for a session the server needs on matching requests because script cannot read that cookie. Choose localStorage for persistent, non-sensitive display preferences that the page needs after reload."
        }
      },
      {
        "id": "js-async-await-l3-s3-q01",
        "topicId": "js-async-await",
        "set": 3,
        "environment": "node",
        "code": "function transmitInvoice() {\n  return Promise.reject(new Error(\"gateway unavailable\"));\n}\nasync function submitInvoice() {\n  try {\n    return transmitInvoice();\n  } catch (fault) {\n    console.log(\"local recovery\");\n    return \"queued offline\";\n  }\n}\nsubmitInvoice()\n  .then(receipt => console.log(receipt))\n  .catch(fault => console.log(\"boundary: \" + fault.message));\nconsole.log(\"submission started\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "submission started\nboundary: gateway unavailable"
          ]
        },
        "partB": {
          "ask": "The local recovery must cover failed transmission while preserving successful receipts. Which change meets that requirement?",
          "options": [
            "Move the transmission call above try so the catch block receives its rejection.",
            "Wrap the returned promise in Promise.resolve inside try and leave the catch block intact.",
            "Await the transmission inside try and return its result from the protected block.",
            "Bind the transmission function to submitInvoice so its rejection reaches the local catch."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, which promise rejects and why the local recovery does not run.",
          "keyPoints": [
            "The transmission returns a rejected promise rather than throwing synchronously.",
            "The try block returns without awaiting that promise.",
            "The async function adopts the returned rejection.",
            "The caller catches that rejection at the boundary."
          ],
          "modelAnswer": "The transmission creates a rejected promise without throwing in the current call. The try block returns that promise, so its catch does not run. The async function adopts the rejection and the synchronous start message prints first. The caller then logs the failure at its catch. Awaiting the transmission inside try would let the local catch handle it."
        }
      },
      {
        "id": "js-this-binding-l3-s3-q02",
        "topicId": "js-this-binding",
        "set": 3,
        "environment": "node",
        "code": "function buildLabelPanel() {\n  return {\n    prefix: \"parcel\",\n    format: code => this.prefix + \":\" + code,\n    preview(code) { return this.format(code); }\n  };\n}\nconst labelPanel = buildLabelPanel.call({ prefix: \"factory\" });\nconsole.log(labelPanel.preview(\"P7\"));\nlabelPanel.prefix = \"express\";\nconsole.log(labelPanel.preview(\"P8\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "factory:P7\nfactory:P8"
          ]
        },
        "partB": {
          "ask": "Formatting must read the panel prefix at call time, including after edits. Which change fits?",
          "options": [
            "Replace format with method syntax and keep preview invoking it through the panel object.",
            "Apply bind(labelPanel) to the existing arrow and keep preview invoking the bound function.",
            "Pass the panel as an extra argument to format while retaining its existing arrow body.",
            "Copy the panel prefix onto preview before calling the existing format function through it."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-timers-l3-s3-q03",
        "topicId": "js-timers",
        "set": 3,
        "environment": "node",
        "code": "let renewalHandle;\nlet renewalRuns = 0;\nfunction startRenewal() {\n  const ownedHandle = setInterval(() => {\n    renewalRuns += 1;\n    console.log(\"renewal \" + renewalRuns);\n    if (renewalRuns === 2) clearInterval(ownedHandle);\n  }, 5);\n  renewalHandle = ownedHandle;\n}\nfunction stopRenewal() {\n  clearInterval(renewalHandle);\n  console.log(\"renewal stopped\");\n}\nstartRenewal();\nstartRenewal();\nstopRenewal();",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "renewal stopped\nrenewal 1\nrenewal 2"
          ]
        },
        "partB": {
          "ask": "The two-run guard is diagnostic. Production needs one active interval and a reliable stop. Which change fits?",
          "options": [
            "Call unref on the saved timer handle during stop so renewal callbacks stop being dispatched.",
            "Reset renewalRuns during start so a replacement interval begins with fresh execution state.",
            "Increase the interval delay during start so repeated starts can share the saved handle.",
            "Clear the earlier interval during start so one handle stays active and stop can clear it."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-optional-nullish-l3-s3-q04",
        "topicId": "js-optional-nullish",
        "set": 3,
        "environment": "node",
        "code": "const savedAlerts = { channels: { digest: { subject: \"\", retries: 0 } } };\nfunction prepareDigest(settings) {\n  const digest = settings.channels?.digest;\n  return {\n    subject: digest?.subject || \"Daily digest\",\n    retries: digest?.retries || 3\n  };\n}\nconst deliveryPlan = prepareDigest(savedAlerts);\nconsole.log(JSON.stringify(deliveryPlan));\nconsole.log(JSON.stringify(prepareDigest({})));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "{\"subject\":\"Daily digest\",\"retries\":3}\n{\"subject\":\"Daily digest\",\"retries\":3}"
          ]
        },
        "partB": {
          "ask": "Blank subjects and zero retries are valid. Missing or null fields need defaults. Which edit meets this contract?",
          "options": [
            "Remove optional chaining from the field reads and retain logical OR for the defaults.",
            "Replace the default operators with nullish coalescing and retain the optional field reads.",
            "Convert the field reads to booleans before passing their values into the default expressions.",
            "Merge the default object after the saved fields so its properties replace the stored settings."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-event-loop-l3-s3-q05",
        "topicId": "js-event-loop",
        "set": 3,
        "environment": "node",
        "code": "const pendingReceipts = Array.from({ length: 200000 }, (_, index) => index);\nlet indexedReceipts = 0;\nsetTimeout(() => {\n  console.log(\"health check \" + indexedReceipts);\n}, 0);\nfunction rebuildReceiptIndex() {\n  for (const receiptNumber of pendingReceipts) {\n    indexedReceipts += receiptNumber >= 0 ? 1 : 0;\n  }\n  console.log(\"index ready \" + indexedReceipts);\n}\nrebuildReceiptIndex();\nconsole.log(\"handler returned\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "index ready 200000\nhandler returned\nhealth check 200000"
          ]
        },
        "partB": {
          "ask": "The real index is much larger. Which rewrite lets pending timers run between bounded batches?",
          "options": [
            "Put the complete loop inside a promise handler and publish its result after traversal finishes.",
            "Declare the indexing function async and keep the complete loop before its first await expression.",
            "Process a bounded batch and schedule the next batch through setTimeout with a zero delay.",
            "Enqueue the next batch through queueMicrotask until traversal has finished processing the receipts."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-event-loop-l3-s3-q06",
        "topicId": "js-event-loop",
        "set": 3,
        "environment": "node",
        "code": "setTimeout(() => {\n  console.log(\"dispatch phase\");\n  process.nextTick(() => console.log(\"dispatch tick\"));\n  Promise.resolve().then(() => console.log(\"dispatch promise\"));\n  setImmediate(() => {\n    console.log(\"dispatch immediate\");\n    process.nextTick(() => console.log(\"immediate tick\"));\n    Promise.resolve().then(() => console.log(\"immediate promise\"));\n  });\n  setTimeout(() => console.log(\"dispatch timeout\"), 0);\n}, 0);\nconsole.log(\"dispatch armed\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "dispatch armed\ndispatch phase\ndispatch tick\ndispatch promise\ndispatch immediate\nimmediate tick\nimmediate promise\ndispatch timeout"
          ]
        },
        "partB": {
          "ask": "A dispatch promise handler schedules a nextTick callback and another promise handler. What governs that new tick?",
          "options": [
            "Treat it as a timer callback whose readiness depends on the next timers phase threshold.",
            "Finish the active microtask drain before servicing the nextTick work added during that drain.",
            "Interrupt the active promise handler to execute the tick before its remaining synchronous statements.",
            "Attach it to the promise result so rejection skips that tick during subsequent chain processing."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-promises-l3-s3-q07",
        "topicId": "js-promises",
        "set": 3,
        "environment": "node",
        "code": "Promise.resolve(\"packet\")\n  .then(packet => {\n    console.log(\"encode \" + packet);\n    throw new Error(\"bad checksum\");\n  })\n  .then(() => console.log(\"upload\"))\n  .finally(() => {\n    console.log(\"release encoder\");\n  })\n  .then(() => console.log(\"acknowledge\"))\n  .catch(fault => {\n    console.log(\"recover \" + fault.message);\n    return \"quarantined\";\n  })\n  .then(state => console.log(\"state \" + state));\nconsole.log(\"pipeline started\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "pipeline started\nencode packet\nrelease encoder\nrecover bad checksum\nstate quarantined"
          ]
        },
        "partB": {
          "ask": "If recovery itself fails, how should it preserve the original failure for later diagnostics?",
          "options": [
            "Wrap the original failure in an Error with cause, then throw it to reject the continuing chain.",
            "Return the original Error as a normal result, then let a later catch recover its cause.",
            "Assign the failure to the promise object, then let a later finally retrieve that property.",
            "Log the failure before returning undefined, then let the next queued handler reconstruct its cause."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-async-await-l3-s3-q08",
        "topicId": "js-async-await",
        "set": 3,
        "environment": "node",
        "code": "function requestSection(section) {\n  console.log(\"request \" + section);\n  return Promise.resolve(section.toUpperCase());\n}\nasync function openTripSheet() {\n  const routePromise = requestSection(\"route\");\n  const farePromise = requestSection(\"fare\");\n  console.log(\"paint \" + await routePromise);\n  console.log(\"paint \" + await farePromise);\n  const rules = await requestSection(\"rules\");\n  console.log(\"paint \" + rules);\n  console.log(\"paint \" + await requestSection(\"notes\"));\n}\nopenTripSheet();\nconsole.log(\"sheet shell\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "request route\nrequest fare\nsheet shell\npaint ROUTE\npaint FARE\nrequest rules\npaint RULES\nrequest notes\npaint NOTES"
          ]
        },
        "partB": {
          "ask": "A section request can fail while another is pending. Which launch policy avoids an unobserved sibling rejection?",
          "options": [
            "Start sibling requests and defer their catch handlers until the next section is ready for painting.",
            "Schedule sibling requests in nextTick callbacks and retain separate awaits when their panels become visible.",
            "Wrap sibling requests in async functions and discard the returned promises while assembling panel markup.",
            "Attach Promise.all to sibling requests at launch and handle the combined rejection at the outer sheet boundary."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the first pair starts together while the last pair starts sequentially.",
          "keyPoints": [
            "Calling requestSection starts work before returning its promise.",
            "Route and fare start before the first await.",
            "Await suspends the sheet function even for fulfilled promises.",
            "Notes starts after rules has been awaited and painted."
          ],
          "modelAnswer": "Route and fare are requested before the first await, so their work is started together. The first await yields and lets the shell message print. The sheet then paints route and fare through separate await continuations. Rules is requested and awaited before notes is even requested, so that pair starts sequentially."
        }
      },
      {
        "id": "js-higher-order-l3-s3-q09",
        "topicId": "js-higher-order",
        "set": 3,
        "environment": "node",
        "code": "const resizeModes = [\"crop\", \"fit\"];\nconst pendingRenders = [];\nresizeModes.forEach(mode => {\n  console.log(\"queue \" + mode);\n  pendingRenders.push(() => console.log(\"render \" + mode));\n});\nconst resizeLabels = resizeModes.map(mode => {\n  console.log(\"label \" + mode);\n  return mode.toUpperCase();\n});\nsetTimeout(() => {\n  pendingRenders.forEach(render => render());\n  console.log(resizeLabels.join(\"/\"));\n}, 0);\nconsole.log(\"resize menu ready\");",
        "partA": {
          "ask": "What is the exact output order?",
          "accepted": [
            "queue crop\nqueue fit\nlabel crop\nlabel fit\nresize menu ready\nrender crop\nrender fit\nCROP/FIT"
          ]
        },
        "partB": {
          "ask": "The render callbacks will return promises. Which change gives the caller a promise for completed rendering?",
          "options": [
            "Await pendingRenders.forEach with an async callback and return its result after starting the render functions.",
            "Return Promise.all over pendingRenders.map(render => render()) so the caller can await the resulting rendering promises.",
            "Pass pendingRenders into Promise.resolve and return that promise after replacing the render callback declarations.",
            "Schedule pendingRenders.forEach inside setTimeout and return the timer handle as the completed rendering promise."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-polyfills-l3-s3-q10",
        "topicId": "js-polyfills",
        "set": 3,
        "environment": "node",
        "code": "function foldStock(amounts, combine, seed) {\n  let balance = seed || amounts[0];\n  for (let slot = 1; slot < amounts.length; slot++) {\n    balance = combine(balance, amounts[slot]);\n  }\n  return balance;\n}\nconst stockChanges = [5, 2];\nconst addStock = (balance, change) => balance + change;\nconsole.log(\"custom \" + foldStock(stockChanges, addStock, 10));\nconsole.log(\"native \" + stockChanges.reduce(addStock, 10));\nconsole.log(\"empty \" + foldStock([], addStock, 0));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "custom 12\nnative 17\nempty undefined"
          ]
        },
        "partB": {
          "ask": "For dense arrays and callable callbacks, what seed handling would match reduce with and without an initial argument?",
          "options": [
            "Convert a missing seed to zero, start at the first position, and return zero for empty input.",
            "Select the first element as seed, start at the second position, and return undefined for empty input.",
            "Reverse the input before folding, treat its final value as seed, and preserve a supplied fallback argument.",
            "Detect argument presence, choose the matching start position, and throw for empty input without a seed."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-json-dates-regex-l3-s3-q11",
        "topicId": "js-json-dates-regex",
        "set": 3,
        "environment": "node",
        "code": "function copyReminder(reminder) {\n  return JSON.parse(JSON.stringify(reminder));\n}\nconst sourceReminder = {\n  due: new Date(\"2030-04-05T06:00:00.000Z\"),\n  channel: undefined,\n  describe() { return \"check equipment\"; }\n};\nconst archivedReminder = copyReminder(sourceReminder);\nconsole.log(typeof archivedReminder.due, archivedReminder.due instanceof Date);\nconsole.log(\"channel\" in archivedReminder, \"describe\" in archivedReminder);\ntry { archivedReminder.due.getUTCFullYear(); }\ncatch (fault) { console.log(fault.name); }",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "string false\nfalse false\nTypeError"
          ]
        },
        "partB": {
          "ask": "An in-memory copy must retain Date values, present undefined fields, and the same callable function references. Which policy fits?",
          "options": [
            "Use structuredClone on the complete reminder and reuse its returned object as the executable in-memory copy.",
            "Parse with a date reviver and trust the serialized record to restore missing properties and callable methods.",
            "Clone this known record explicitly, copy its Date, and retain undefined fields and existing function references.",
            "Freeze the source reminder before serialization and parse the frozen representation into a separate executable copy."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-promise-combinators-l3-s3-q12",
        "topicId": "js-promise-combinators",
        "set": 3,
        "environment": "node",
        "code": "function settleChecks(checks) {\n  return Promise.all(checks.map(check => Promise.resolve(check).then(\n    value => ({ status: \"fulfilled\", value })\n  )));\n}\nconst checks = [Promise.resolve(\"reachable\"), Promise.reject(\"expired\")];\nsettleChecks(checks)\n  .then(results => console.log(\"custom \" + JSON.stringify(results)))\n  .catch(reason => console.log(\"custom rejected \" + reason));\nPromise.allSettled(checks).then(results => {\n  console.log(\"native \" + JSON.stringify(results));\n});",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "native [{\"status\":\"fulfilled\",\"value\":\"reachable\"},{\"status\":\"rejected\",\"reason\":\"expired\"}]\ncustom rejected expired"
          ]
        },
        "partB": {
          "ask": "The helper must report rejected checks as settled records while preserving fulfilled records. Which change meets that contract?",
          "options": [
            "Add a rejection mapper beside the fulfillment mapper, returning a record with status rejected and its reason.",
            "Catch the outer Promise.all rejection and return a single rejected record in place of the completed checks.",
            "Replace Promise.all with Promise.race and collect its first returned record as the final settled report array.",
            "Filter rejected checks before calling Promise.all and fill their positions later with empty fulfilled result records."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-fetch-abort-l3-s3-q13",
        "topicId": "js-fetch-abort",
        "set": 3,
        "environment": "node",
        "code": "function fetchSearch(term, signal) {\n  return new Promise((resolve, reject) => {\n    if (signal.aborted) { reject(signal.reason); return; }\n    const stopped = () => { clearTimeout(deadline); reject(signal.reason); };\n    const deadline = setTimeout(() => {\n      signal.removeEventListener(\"abort\", stopped);\n      console.log(\"work finished \" + term); resolve(term.toUpperCase());\n    }, 10);\n    signal.addEventListener(\"abort\", stopped, { once: true });\n  });\n}\nlet searchControl;\nfunction searchPlaces(term) {\n  searchControl?.abort();\n  searchControl = new AbortController();\n  fetchSearch(term, searchControl.signal).then(reply => console.log(\"show \" + reply))\n    .catch(fault => console.log(fault.name === \"AbortError\" ? \"search canceled\" : \"search failed\"));\n}\nsearchPlaces(\"lake\");\nsearchPlaces(\"lakeside\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "search canceled\nwork finished lakeside\nshow LAKESIDE"
          ]
        },
        "partB": {
          "ask": "Requests honor cancellation and consume scarce resources. Fresh results must win. Which search policy best fits?",
          "options": [
            "Debounce input and retain pending requests, allowing their replies to paint without checking the active search.",
            "Abort the prior request, handle its cancellation, and gate commits by request identity if further asynchronous work follows.",
            "Tag searches and discard stale replies, retaining the pending request work until it finishes consuming resources.",
            "Serialize requests and paint their replies in launch order, delaying fresh input until earlier work has completed."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "When would ignoring stale replies be better than canceling earlier requests? Explain the tradeoff.",
          "keyPoints": [
            "Cancellation needs support from the underlying operation.",
            "Shared work may still be useful to another consumer.",
            "A request identity check can prevent stale display updates.",
            "Discarding replies does not stop the underlying work."
          ],
          "modelAnswer": "Ignoring stale replies is useful when the operation cannot be canceled or another consumer still needs its result. Give requests identities and update the display when the completed identity matches the current search. This protects the display while letting shared work finish. Canceling supported private requests can save resources, and identity checks can still protect later processing."
        }
      },
      {
        "id": "js-classes-l3-s3-q14",
        "topicId": "js-classes",
        "set": 3,
        "environment": "node",
        "code": "class ScheduledExport {\n  constructor() { this.pending = []; }\n  schedule(format) { this.pending.push(format); }\n  cancelPending() { this.pending.length = 0; }\n  encode(format) { return format.toUpperCase(); }\n}\nclass ExportPreview extends ScheduledExport {\n  preview(format) { return \"preview \" + this.encode(format); }\n}\nconst previewPane = new ExportPreview();\nconsole.log(previewPane.preview(\"csv\"));\npreviewPane.schedule(\"zip\");\nconsole.log(\"queued \" + previewPane.pending.join(\",\"));\nconsole.log(typeof previewPane.cancelPending);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "preview CSV\nqueued zip\nfunction"
          ]
        },
        "partB": {
          "ask": "The preview needs encoding but must expose no scheduling API. Which design best fits that boundary?",
          "options": [
            "Override schedule to throw and keep cancellation inherited so preview instances still share the export scheduler type.",
            "Build the preview as a plain object that copies the scheduler methods and hides the ones it should not expose.",
            "Compose the preview with a separate encoder and expose preview methods without inheriting the export scheduler interface.",
            "Freeze preview instances after construction and keep inheritance so scheduling methods remain available for specialized callers."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "When would inheritance be better than composition for an export feature? Explain the required relationship.",
          "keyPoints": [
            "A subclass should satisfy the base class contract.",
            "Callers should be able to substitute the subclass for the base.",
            "Stable shared behavior can justify inheritance.",
            "Composition suits reuse of a smaller independent capability."
          ],
          "modelAnswer": "Inheritance fits when the specialized export is a valid scheduled export with the same scheduling and cancellation contract. Code expecting the base type should be able to use the subclass without extra exceptions. A stable shared lifecycle can then make inheritance useful. The preview needs a smaller encoding capability, so composition gives it a narrower interface."
        }
      },
      {
        "id": "js-errors-l3-s3-q15",
        "topicId": "js-errors",
        "set": 3,
        "environment": "node",
        "code": "class CapacityError extends Error {\n  constructor() { super(\"room full\"); this.name = \"CapacityError\"; }\n}\nfunction claimWorkshopSeat(reason) {\n  if (reason === \"capacity\") throw new CapacityError();\n  throw new TypeError(\"invalid allocation record\");\n}\nfunction bookWorkshop(reason) {\n  try { return claimWorkshopSeat(reason); }\n  catch (fault) {\n    if (fault instanceof CapacityError) return \"join waiting list\";\n    throw fault;\n  }\n}\nconsole.log(bookWorkshop(\"capacity\"));\ntry { bookWorkshop(\"corrupt\"); }\ncatch (fault) { console.log(\"boundary \" + fault.name); }",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "join waiting list\nboundary TypeError"
          ]
        },
        "partB": {
          "ask": "Booking can recover from capacity failures, while unexpected faults need central reporting. Which catch policy fits?",
          "options": [
            "Recover from the known capacity domain error near booking and rethrow unexpected faults to the reporting boundary.",
            "Translate unexpected faults into waiting-list results and let the boundary infer failures from later bookings.",
            "Catch failures inside the seat helper and return undefined so booking can continue without interrupting its caller.",
            "Add logging catches at the helper and booking layers so the reporting boundary receives previously reported failures."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "When would catching closer to the seat helper be better than rethrowing to the outer boundary?",
          "keyPoints": [
            "A lower layer can catch when it has a valid recovery action.",
            "A bounded retry must be safe for the operation.",
            "A fallback must preserve the caller contract.",
            "Unexpected errors should retain diagnostic context and reach a responsible boundary."
          ],
          "modelAnswer": "Catch closer to the helper when that layer can safely recover, such as retrying a transient read within a fixed limit. The operation must be safe to repeat, and the fallback must preserve what the caller expects. That layer can then return a valid result rather than an unexplained missing value. Unexpected faults should keep their context and reach a boundary that can report them."
        }
      }
    ],
};
