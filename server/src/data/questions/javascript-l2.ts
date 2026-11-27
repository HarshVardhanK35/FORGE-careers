// JavaScript, level 2 (intermediate): 3 sets of 18 questions (two ideas in one snippet).
// Written with Codex, then checked: every snippet was run (Node, or jsdom for the DOM and storage questions) and equals an accepted
// answer; the answer options were checked so that neither their length nor their wording gives a clue. A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const JAVASCRIPT_LEVEL_2: QuestionBank = {
  skillId: "javascript",
  level: 2,
  questions: [
      {
        "id": "js-values-types-l2-s1-q01",
        "topicId": "js-values-types",
        "set": 1,
        "environment": "node",
        "code": "const failedReading = Number(\"mist\");\nconsole.log(failedReading === failedReading);\nconsole.log(Object.is(failedReading, NaN));\nconsole.log(Object.is(0, -0));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "false\ntrue\nfalse"
          ]
        },
        "partB": {
          "ask": "How does Number.isNaN differ from the global isNaN function?",
          "options": [
            "Number.isNaN converts its argument to a number first, as isNaN also does.",
            "Number.isNaN returns true for a string value, unlike the global isNaN.",
            "Number.isNaN tests the value without converting its type, unlike global isNaN.",
            "Number.isNaN throws a TypeError for a string value, unlike the global isNaN."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-truthy-logical-l2-s1-q02",
        "topicId": "js-truthy-logical",
        "set": 1,
        "environment": "node",
        "code": "const searchMatches = [];\nfunction loadSuggestions() {\n  console.log(\"loading\");\n  return [\"fern\"];\n}\nconst visibleMatches = searchMatches || loadSuggestions();\nconsole.log(Boolean(visibleMatches), visibleMatches.length);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "true 0"
          ]
        },
        "partB": {
          "ask": "If a numeric setting may be zero, which check chooses a fallback just for null or undefined?",
          "options": [
            "Use setting ?? fallback to choose the fallback from the stored setting.",
            "Use setting || fallback to choose the fallback from the current stored setting.",
            "Use setting && fallback to choose the fallback from the stored numeric setting.",
            "Use !setting && fallback to choose the fallback from the current stored setting."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-variables-scope-l2-s1-q03",
        "topicId": "js-variables-scope",
        "set": 1,
        "environment": "node",
        "code": "const rackChecks = [];\nfor (var rack = 0; rack < 2; rack++) {\n  rackChecks.push(() => rack);\n}\nconst drawerChecks = [];\nfor (let drawer = 0; drawer < 2; drawer++) {\n  drawerChecks.push(() => drawer);\n}\nconsole.log(rackChecks.map(check => check()).join(\",\"));\nconsole.log(drawerChecks.map(check => check()).join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "2,2\n0,1"
          ]
        },
        "partB": {
          "ask": "Inside a function, what happens if var is redeclared with an initializer in an if block?",
          "options": [
            "The redeclaration creates a block binding and leaves the function binding unchanged.",
            "The redeclaration raises a SyntaxError because the name already exists in the function.",
            "The redeclaration creates a block binding that is discarded when the block ends.",
            "The redeclaration reuses the function binding and replaces its stored value."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-hoisting-l2-s1-q04",
        "topicId": "js-hoisting",
        "set": 1,
        "environment": "node",
        "code": "try {\n  console.log(typeof Compass);\n} catch (compassIssue) {\n  console.log(compassIssue.name);\n}\nclass Compass {}\nconsole.log(typeof Compass);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "ReferenceError\nfunction"
          ]
        },
        "partB": {
          "ask": "What does typeof return for an undeclared name that has no binding in scope?",
          "options": [
            "It returns the string null without creating a binding for that name.",
            "It returns the string undefined without creating a new binding for that name.",
            "It returns the string object without creating a binding for that name.",
            "It returns the string ReferenceError without creating a binding for that name."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-closures-l2-s1-q05",
        "topicId": "js-closures",
        "set": 1,
        "environment": "node",
        "code": "function prepareOven() {\n  let temperature = 160;\n  const display = \"Heat: \" + temperature;\n  return {\n    warm() { temperature += 20; },\n    read() { console.log(display, temperature); }\n  };\n}\nconst ovenPanel = prepareOven();\novenPanel.warm();\novenPanel.warm();\novenPanel.read();",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "Heat: 160 200"
          ]
        },
        "partB": {
          "ask": "What would two separate calls to prepareOven create?",
          "options": [
            "They would create separate returned objects with access to the same shared outer temperature binding.",
            "They would create separate returned objects with access to the global temperature binding.",
            "They would create separate returned objects with access to separate local temperature bindings.",
            "They would create separate returned objects with access to their caller's temperature binding."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "temperature starts at 160 and display is computed once as Heat: 160.",
            "The returned methods retain access to the local bindings.",
            "Two warm calls change temperature to 200 without recomputing display.",
            "read prints the saved string followed by the current temperature."
          ],
          "modelAnswer": "prepareOven creates temperature and computes the display string from its starting value. The returned methods retain access to these local bindings. Two warm calls raise temperature to 200, but the saved display string stays Heat: 160. The read method prints Heat: 160 followed by 200 on the same line."
        }
      },
      {
        "id": "js-this-binding-l2-s1-q06",
        "topicId": "js-this-binding",
        "set": 1,
        "environment": "node",
        "code": "const telescope = {\n  lens: \"wide\",\n  makeReader() {\n    return () => this.lens;\n  }\n};\nconst readLens = telescope.makeReader.call({ lens: \"zoom\" });\nconsole.log(readLens.call({ lens: \"macro\" }));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "zoom"
          ]
        },
        "partB": {
          "ask": "How does apply supply arguments to an ordinary function, compared with call?",
          "options": [
            "It supplies arguments through separate parameters after the requested receiver value.",
            "It supplies arguments through an array-like value after the requested receiver value.",
            "It supplies arguments through object property names after the requested receiver value.",
            "It supplies arguments through a JSON string after the requested receiver value."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-promises-l2-s1-q07",
        "topicId": "js-promises",
        "set": 1,
        "environment": "node",
        "code": "Promise.resolve(4)\n  .then(pages => { throw new Error(\"torn\"); })\n  .catch(damage => {\n    console.log(damage.message);\n    return 6;\n  })\n  .finally(() => {\n    console.log(\"checked\");\n    return 90;\n  })\n  .then(pages => console.log(pages + 1));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "torn\nchecked\n7"
          ]
        },
        "partB": {
          "ask": "What happens if a finally handler throws a new Error instead of returning normally?",
          "options": [
            "The resulting promise fulfills with the Error object as its replacement outcome.",
            "The resulting promise stays pending with the Error object as its replacement outcome.",
            "The resulting promise fulfills with the earlier value as its unchanged outcome.",
            "The resulting promise rejects with the newly thrown Error object as its replacement outcome."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The first then handler throws, rejecting the promise it returns.",
            "catch prints torn and recovers by returning 6.",
            "finally prints checked; its normal return value does not replace 6.",
            "The last then receives 6 and prints 7."
          ],
          "modelAnswer": "The first then handler throws an error, so the next promise rejects. The catch handler prints torn and returns 6, recovering to a fulfilled promise. The finally handler prints checked, but its normal return of 90 does not replace the fulfillment value. The last handler receives 6 and prints 7."
        }
      },
      {
        "id": "js-event-loop-l2-s1-q08",
        "topicId": "js-event-loop",
        "set": 1,
        "environment": "node",
        "code": "async function rinseBrush() {\n  console.log(\"dip\");\n  await null;\n  console.log(\"rinse\");\n  queueMicrotask(() => console.log(\"dry\"));\n}\nsetTimeout(() => console.log(\"store\"), 0);\nrinseBrush();\nPromise.resolve().then(() => console.log(\"wipe\"));\nconsole.log(\"pause\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "dip\npause\nrinse\nwipe\ndry\nstore"
          ]
        },
        "partB": {
          "ask": "What can happen if a microtask keeps queuing another microtask without stopping?",
          "options": [
            "It can delay timer callbacks while the microtask queue continues to receive work.",
            "It can delay synchronous statements while the microtask queue interrupts their current execution.",
            "It can delay promise creation while the microtask queue prevents new promise objects.",
            "It can delay timer registration while the microtask queue discards pending timer requests."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "rinseBrush prints dip synchronously and suspends at await null.",
            "The script queues the promise handler and prints pause.",
            "The await continuation prints rinse and queues dry behind the pending wipe handler.",
            "wipe and dry run before the zero-delay timer prints store."
          ],
          "modelAnswer": "The timer is registered, and rinseBrush prints dip before suspending at await. The script queues the promise handler and prints pause. The await continuation runs first, prints rinse, and queues dry behind the pending handler that prints wipe. The microtasks print wipe and dry, and then the timer prints store."
        }
      },
      {
        "id": "js-dom-events-l2-s1-q09",
        "topicId": "js-dom-events",
        "set": 1,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Sound controls</title></head><body><div id=\"sound-panel\"><button id=\"mute\" type=\"button\">Mute</button></div></body></html>",
        "code": "const soundPanel = document.querySelector(\"#sound-panel\");\nconst muteButton = document.querySelector(\"#mute\");\nsoundPanel.addEventListener(\"click\", () => console.log(\"capture\"), true);\nsoundPanel.addEventListener(\"click\", () => console.log(\"bubble\"));\nmuteButton.addEventListener(\"click\", clickEvent => {\n  console.log(\"first\");\n  clickEvent.stopPropagation();\n});\nmuteButton.addEventListener(\"click\", () => console.log(\"second\"));\nmuteButton.click();",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "capture\nfirst\nsecond"
          ]
        },
        "partB": {
          "ask": "What would adding once: true do to the second button listener?",
          "options": [
            "It would remove that listener before its first invocation has taken place.",
            "It would remove that listener when the first bubbling ancestor handler runs.",
            "It would remove that listener after its first invocation has taken place.",
            "It would remove that listener when the button receives its next focus event."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-higher-order-l2-s1-q10",
        "topicId": "js-higher-order",
        "set": 1,
        "environment": "node",
        "code": "const stitchLabels = [\"10\", \"10\", \"10\"];\nconst stitchCounts = stitchLabels.map(parseInt);\nconsole.log(stitchCounts.join(\",\"));\nconsole.log(stitchLabels.map(label => parseInt(label, 10)).join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "10,NaN,2\n10,10,10"
          ]
        },
        "partB": {
          "ask": "Why wrap a callback when its parameter meaning differs from the caller's callback contract?",
          "options": [
            "A wrapper lets you select which arguments the wrapped callback will receive.",
            "A wrapper lets you select which return value the callback received earlier.",
            "A wrapper lets you select which parameter names the wrapped callback declares.",
            "A wrapper lets you select which source values the caller stored earlier."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-immutability-l2-s1-q11",
        "topicId": "js-immutability",
        "set": 1,
        "environment": "node",
        "code": "const plantingPlan = { beds: [{ crop: \"peas\" }] };\nconst revisedPlan = structuredClone(plantingPlan);\nrevisedPlan.beds[0].crop = \"beans\";\nconsole.log(plantingPlan.beds[0].crop, revisedPlan.beds[0].crop);\nconsole.log(plantingPlan.beds === revisedPlan.beds);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "peas beans\nfalse"
          ]
        },
        "partB": {
          "ask": "What happens if the value passed to structuredClone contains a function property?",
          "options": [
            "It leaves the function property out of the clone and finishes normally.",
            "It converts the function property to its source text in the clone.",
            "It copies the function property as the same reference into the clone.",
            "It throws a DataCloneError because a function cannot be cloned."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-debounce-throttle-l2-s1-q12",
        "topicId": "js-debounce-throttle",
        "set": 1,
        "environment": "node",
        "code": "function trailingThrottle(publish, delay) {\n  let scheduled = false;\n  let latest;\n  return value => {\n    latest = value;\n    if (scheduled) return;\n    scheduled = true;\n    setTimeout(() => {\n      scheduled = false;\n      publish(latest);\n    }, delay);\n  };\n}\nconst reportDepth = trailingThrottle(depth => console.log(depth), 10);\nconst depthBurst = [2, 5, 8];\ndepthBurst.forEach(reportDepth);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "8"
          ]
        },
        "partB": {
          "ask": "What would make a trailing debounce postpone its deadline when another call arrives?",
          "options": [
            "It would keep the pending timer and replace the saved argument with the latest value.",
            "It would cancel the pending timer and start a fresh timer with the full delay again.",
            "It would keep the pending timer and start a separate timer with the full delay.",
            "It would cancel the pending timer and invoke the saved callback without a new timer."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-dom-l2-s1-q13",
        "topicId": "js-dom",
        "set": 1,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Route choices</title></head><body><ul id=\"routes\"><li>ridge</li></ul></body></html>",
        "code": "const routeList = document.querySelector(\"#routes\");\nconst routeSnapshot = routeList.querySelectorAll(\"li\");\nconst routeLive = routeList.children;\nconst valleyRoute = document.createElement(\"li\");\nvalleyRoute.textContent = \"valley\";\nrouteList.append(valleyRoute);\nconsole.log(routeSnapshot.length, routeLive.length);\nconsole.log(routeList.lastElementChild.textContent);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "1 2\nvalley"
          ]
        },
        "partB": {
          "ask": "If an li is already inside the list, what does append do when passed that same node?",
          "options": [
            "It creates a duplicate of the existing node at the end of the list.",
            "It leaves the existing node at its previous position inside the same list.",
            "It replaces the existing node with its text content at the list's end.",
            "It moves the existing node to the final position within the same list."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-polyfills-l2-s1-q14",
        "topicId": "js-polyfills",
        "set": 1,
        "environment": "node",
        "code": "function mapPresent(samples, convert) {\n  const converted = new Array(samples.length);\n  for (let position = 0; position < samples.length; position++) {\n    if (position in samples) {\n      converted[position] = convert(samples[position], position, samples);\n    }\n  }\n  return converted;\n}\nconst beadSizes = [, 4, 6];\nconst beadMarks = mapPresent(beadSizes, (size, position) => size + position);\nconsole.log(beadMarks.length, 0 in beadMarks, beadMarks.join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "3 false ,5,8"
          ]
        },
        "partB": {
          "ask": "What should this helper do to match native map if convert is not callable?",
          "options": [
            "It should throw a TypeError after traversal finishes, including when the input array is empty.",
            "It should throw a TypeError when a present entry is reached, leaving empty inputs without errors.",
            "It should throw a TypeError before traversal starts, including when the input is an empty or sparse array.",
            "It should throw a TypeError when a hole is reached, leaving dense input arrays without errors."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-classes-l2-s1-q15",
        "topicId": "js-classes",
        "set": 1,
        "environment": "node",
        "code": "class Instrument {\n  constructor(tone) { this.tone = tone; }\n  describe() { return this.tone; }\n}\nclass Flute extends Instrument {\n  constructor() { super(\"soft\"); }\n  describe() { return super.describe() + \" note\"; }\n  get label() { return this.describe().toUpperCase(); }\n}\nconst woodenFlute = new Flute();\nconsole.log(woodenFlute.describe());\nconsole.log(woodenFlute.label);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "soft note\nSOFT NOTE"
          ]
        },
        "partB": {
          "ask": "If Instrument gained a static method, where would that method be available by inheritance?",
          "options": [
            "It would be available through the Flute constructor via its inheritance chain.",
            "It would be available through a flute instance via its instance inheritance chain.",
            "It would be available through Flute.prototype via its instance method inheritance chain.",
            "It would be available through the tone property via its property inheritance chain."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-errors-l2-s1-q16",
        "topicId": "js-errors",
        "set": 1,
        "environment": "node",
        "code": "function reservePitch() {\n  try {\n    throw new Error(\"wet ground\");\n  } catch (pitchIssue) {\n    console.log(pitchIssue.message);\n    return \"retry\";\n  } finally {\n    console.log(\"release lock\");\n    return \"closed\";\n  }\n}\nconsole.log(reservePitch());",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "wet ground\nrelease lock\nclosed"
          ]
        },
        "partB": {
          "ask": "If the catch block rethrows and finally completes normally without returning, what happens?",
          "options": [
            "The rethrown error becomes the normal return value after the finally block completes its cleanup.",
            "The rethrown error leaves the function after the finally block finishes its cleanup work.",
            "The rethrown error enters the same catch block after the finally block completes.",
            "The rethrown error becomes a fulfilled promise after the finally block completes."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The error thrown in try transfers control to catch.",
            "catch prints wet ground and starts a pending return of retry.",
            "finally runs before the return completes and prints release lock.",
            "The return in finally replaces retry with closed, which the outer log prints."
          ],
          "modelAnswer": "The try block throws an error, which the catch block receives. The catch block prints wet ground and starts returning retry. Before that return completes, finally prints release lock and returns closed instead. The outer console.log receives closed and prints it."
        }
      },
      {
        "id": "js-map-set-l2-s1-q17",
        "topicId": "js-map-set",
        "set": 1,
        "environment": "node",
        "code": "const northBuoy = { zone: \"north\" };\nconst southBuoy = { zone: \"south\" };\nconst buoySignals = new Map([[northBuoy, \"dim\"], [southBuoy, \"clear\"]]);\nbuoySignals.set(northBuoy, \"bright\");\nconsole.log(buoySignals.size, buoySignals.get({ zone: \"north\" }));\nconsole.log([...buoySignals.values()].join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "2 undefined\nbright,clear"
          ]
        },
        "partB": {
          "ask": "What would deleting a Map key and then inserting that key again do to iteration order?",
          "options": [
            "It would place the reinserted key at its previous position within the iteration order.",
            "It would place the reinserted key at the first position in the iteration order.",
            "It would place the reinserted key at the final position within the iteration order.",
            "It would place the reinserted key at its sorted position in the iteration order."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-json-dates-regex-l2-s1-q18",
        "topicId": "js-json-dates-regex",
        "set": 1,
        "environment": "node",
        "code": "const exhibitDraft = {\n  caption: undefined,\n  slots: [undefined, function paint() {}],\n  open: true\n};\nconsole.log(JSON.stringify(exhibitDraft));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "{\"slots\":[null,null],\"open\":true}"
          ]
        },
        "partB": {
          "ask": "If a property held a valid Date, how would JSON.stringify serialize it with default behavior?",
          "options": [
            "It would serialize the date as a quoted decimal count of elapsed milliseconds.",
            "It would serialize the date as a local formatted string with a timezone name.",
            "It would serialize the date as an object containing its numeric calendar fields.",
            "It would serialize the date as an ISO string in UTC through its toJSON method."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-operators-equality-l2-s2-q01",
        "topicId": "js-operators-equality",
        "set": 2,
        "environment": "node",
        "code": "let stampCount = 4;\nconst stampScore = stampCount++ + ++stampCount;\nconsole.log(stampScore, stampCount);\nconsole.log(null == undefined, null === undefined);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "10 6\ntrue false"
          ]
        },
        "partB": {
          "ask": "Why is stampCount++ valid here while 4++ would be invalid?",
          "options": [
            "It requires a variable declared with var so numeric changes can be stored.",
            "It requires an explicit conversion before a numeric result can be stored.",
            "It requires a writable location where the updated value can be stored.",
            "It requires a surrounding assignment where the expression can be stored."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-control-flow-l2-s2-q02",
        "topicId": "js-control-flow",
        "set": 2,
        "environment": "node",
        "code": "const exploredTiles = [];\nrows: for (let row = 1; row <= 3; row++) {\n  for (let column = 1; column <= 3; column++) {\n    if (column === row) continue rows;\n    exploredTiles.push(row + \":\" + column);\n  }\n}\nconsole.log(exploredTiles.join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "2:1,3:1,3:2"
          ]
        },
        "partB": {
          "ask": "If continue rows were replaced with break rows, what would that statement do?",
          "options": [
            "It would leave the labelled loop and resume after the complete loop statement.",
            "It would skip the inner iteration and resume at the inner loop update step.",
            "It would restart the outer loop and resume with its initial variable value.",
            "It would leave the current block and resume at the next inner loop statement."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-functions-l2-s2-q03",
        "topicId": "js-functions",
        "set": 2,
        "environment": "node",
        "code": "function priceLesson(rate, minutes = rate * 2, fee = minutes + 1) {\n  return [rate, minutes, fee].join(\":\");\n}\nconsole.log(priceLesson(3));\nconsole.log(priceLesson(3, 0));\nconsole.log(priceLesson(3, undefined, 9));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "3:6:7\n3:0:1\n3:6:9"
          ]
        },
        "partB": {
          "ask": "If minutes = rate * 2 became minutes = later and later was the next parameter, what would happen when minutes is omitted?",
          "options": [
            "The default expression would obtain the later argument through positional matching.",
            "The default expression would obtain undefined through parameter name hoisting.",
            "The default expression would obtain the outer value through a scope fallback.",
            "The default expression would throw a ReferenceError through access before initialization."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-objects-l2-s2-q04",
        "topicId": "js-objects",
        "set": 2,
        "environment": "node",
        "code": "const paintMix = {\n  drops: 3,\n  get strength() { return this.drops * 2; },\n  set strength(amount) { this.drops = amount / 2; }\n};\npaintMix.strength += 4;\nconsole.log(paintMix.drops, paintMix.strength);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "5 10"
          ]
        },
        "partB": {
          "ask": "What would Object.getOwnPropertyDescriptor(paintMix, \"strength\") describe?",
          "options": [
            "It would describe a data property with a stored number and a writable flag.",
            "It would describe an accessor property with getter and setter functions.",
            "It would describe a prototype property with the inherited drops descriptor.",
            "It would describe a method property with an argument list and return type."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-closures-l2-s2-q05",
        "topicId": "js-closures",
        "set": 2,
        "environment": "node",
        "code": "function makeInkSupply(amount) {\n  return {\n    use() { amount -= 1; return amount; },\n    refill(extra) { amount += extra; }\n  };\n}\nconst redSupply = makeInkSupply(4);\nconst blueSupply = makeInkSupply(4);\nconst useRed = redSupply.use;\nredSupply.refill(2);\nconsole.log(useRed(), blueSupply.use(), useRed());",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "5 3 4"
          ]
        },
        "partB": {
          "ask": "Why can a closure be useful for hiding state behind a small API?",
          "options": [
            "It lets exposed methods manage local state without adding public state properties.",
            "It lets exposed methods manage caller state without receiving explicit arguments.",
            "It lets exposed methods manage frozen state without creating replacement values.",
            "It lets exposed methods manage global state without declaring shared variable names."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The two factory calls create separate amount bindings starting at 4.",
            "The methods from one call share that call's amount binding.",
            "useRed retains its binding when detached; it does not read this.",
            "Refilling red adds 2; the calls then return 5, 3, and 4."
          ],
          "modelAnswer": "The factory runs twice, creating separate amount bindings for the two supplies. The red methods share one binding, and refill increases it to 6. The detached useRed function still has access to that binding because it reads amount rather than this. The three calls return 5 from red, 3 from blue, and 4 from red, which the log prints on one line."
        }
      },
      {
        "id": "js-this-binding-l2-s2-q06",
        "topicId": "js-this-binding",
        "set": 2,
        "environment": "node",
        "code": "function markCrate(prefix, suffix) {\n  return prefix + this.code + suffix;\n}\nconst markCold = markCrate.bind({ code: \"C2\" }, \"[\");\nconsole.log(markCold.call({ code: \"W8\" }, \"]\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "[C2]"
          ]
        },
        "partB": {
          "ask": "What does bind return, compared with invoking the original function directly?",
          "options": [
            "It returns the function result after invoking the target with the supplied receiver.",
            "It returns the receiver object after storing the target as an additional property.",
            "It returns a new function that saves a receiver and optional leading arguments.",
            "It returns a promise object that schedules the target with optional leading arguments."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-promises-l2-s2-q07",
        "topicId": "js-promises",
        "set": 2,
        "environment": "node",
        "code": "Promise.resolve(5)\n  .then(sheets => { Promise.resolve(sheets * 2); })\n  .then(sheets => {\n    console.log(sheets);\n    return Promise.resolve(12);\n  })\n  .then(sheets => console.log(sheets));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "undefined\n12"
          ]
        },
        "partB": {
          "ask": "If the first handler threw an Error, what would a following then with just a fulfillment handler do?",
          "options": [
            "It would call that handler with the Error and fulfill its resulting promise.",
            "It would skip that handler and reject its resulting promise with the same Error.",
            "It would call that handler without arguments and leave its resulting promise pending.",
            "It would skip that handler and fulfill its resulting promise without a value."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-event-loop-l2-s2-q08",
        "topicId": "js-event-loop",
        "set": 2,
        "environment": "node",
        "code": "setTimeout(() => {\n  console.log(\"gate\");\n  queueMicrotask(() => console.log(\"scan\"));\n  console.log(\"pass\");\n}, 0);\nsetTimeout(() => console.log(\"platform\"), 0);\nconsole.log(\"station\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "station\ngate\npass\nscan\nplatform"
          ]
        },
        "partB": {
          "ask": "What does moving a long calculation into queueMicrotask do for responsiveness?",
          "options": [
            "It moves the calculation onto a worker thread that can share the current stack.",
            "It moves the calculation past a rendering opportunity that precedes queued microtasks.",
            "It moves the calculation into smaller chunks that yield between arithmetic operations.",
            "It moves the calculation past the current stack but still occupies the same thread."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The script registers two zero-delay timers and prints station.",
            "The first timer prints gate, queues scan, and then prints pass.",
            "The queued microtask runs after that callback completes.",
            "The second timer prints platform after scan."
          ],
          "modelAnswer": "The script registers the timers in order and prints station. The first timer prints gate and queues a microtask, then prints pass before its callback ends. Node runs that microtask and prints scan before starting the next timer callback. The second timer then prints platform."
        }
      },
      {
        "id": "js-dom-events-l2-s2-q09",
        "topicId": "js-dom-events",
        "set": 2,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Drawing tools</title></head><body><div id=\"tool-tray\"><button type=\"button\" data-tool=\"brush\"><span id=\"tool-icon\">Brush</span></button></div></body></html>",
        "code": "const toolTray = document.querySelector(\"#tool-tray\");\ntoolTray.addEventListener(\"click\", actionEvent => {\n  const toolButton = actionEvent.target.closest(\"button[data-tool]\");\n  if (toolButton) console.log(toolButton.dataset.tool);\n});\ntoolTray.addEventListener(\"click\", () => console.log(\"hint\"), { once: true });\nconst toolIcon = document.querySelector(\"#tool-icon\");\ntoolIcon.click();\ntoolIcon.click();",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "brush\nhint\nbrush"
          ]
        },
        "partB": {
          "ask": "What benefit does delegation give when more tool buttons are added inside this tray?",
          "options": [
            "It lets the tray handle new buttons through clicks that bubble from descendants.",
            "It lets new buttons copy listeners from the tray during their DOM insertion.",
            "It lets the tray redirect clicks to the first button through its stored selector.",
            "It lets new buttons register callbacks through their matching data attributes."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-prototypes-l2-s2-q10",
        "topicId": "js-prototypes",
        "set": 2,
        "environment": "node",
        "code": "function Paddle(size) { this.size = size; }\nconst riverPaddle = new Paddle(7);\nPaddle.prototype.describe = function () { return \"size \" + this.size; };\nconsole.log(riverPaddle.describe());\nconsole.log(Object.hasOwn(riverPaddle, \"describe\"), \"describe\" in riverPaddle);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "size 7\nfalse true"
          ]
        },
        "partB": {
          "ask": "What would replacing Paddle.prototype with a different object do to riverPaddle?",
          "options": [
            "It would move the existing instance to the replacement prototype during assignment.",
            "It would copy replacement properties onto the existing instance during assignment.",
            "It would preserve the existing instance's link to the earlier prototype object.",
            "It would remove the existing instance's link to its earlier constructor function."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-async-await-l2-s2-q11",
        "topicId": "js-async-await",
        "set": 2,
        "environment": "node",
        "code": "async function inspectBridge() {\n  try {\n    return await Promise.reject(\"loose bolt\");\n  } catch (bridgeFault) {\n    console.log(bridgeFault);\n    return \"repair\";\n  }\n}\nconst bridgeReport = inspectBridge();\nconsole.log(bridgeReport instanceof Promise);\nbridgeReport.then(report => console.log(report));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "true\nloose bolt\nrepair"
          ]
        },
        "partB": {
          "ask": "If return await Promise.reject(...) became return Promise.reject(...), how would error handling change here?",
          "options": [
            "The catch would receive the rejection reason and the returned promise would fulfill.",
            "The catch would receive the promise object and the returned promise would fulfill.",
            "The catch would be skipped and the returned promise would stay pending without settlement.",
            "The catch would be skipped and the returned promise would adopt that same rejection."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "Calling inspectBridge returns a promise while await suspends the function.",
            "The synchronous log prints true before the rejection is handled.",
            "await throws the rejection reason inside try, so catch prints loose bolt.",
            "Returning repair fulfills bridgeReport; its then handler prints repair."
          ],
          "modelAnswer": "The async function reaches await and returns a promise while it is suspended. The synchronous instanceof check therefore prints true. The rejected promise resumes the function by throwing loose bolt inside try, so catch prints that reason and returns repair. That return fulfills bridgeReport, and its handler prints repair."
        }
      },
      {
        "id": "js-timers-l2-s2-q12",
        "topicId": "js-timers",
        "set": 2,
        "environment": "node",
        "code": "let pulse = 0;\nconst beaconInterval = setInterval(() => {\n  pulse += 1;\n  console.log(\"pulse \" + pulse);\n  if (pulse === 3) {\n    clearInterval(beaconInterval);\n    setTimeout(() => console.log(\"dark\"), 0);\n  }\n}, 5);\nconsole.log(\"lit\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "lit\npulse 1\npulse 2\npulse 3\ndark"
          ]
        },
        "partB": {
          "ask": "How should a requested timer delay be understood when the main thread is busy?",
          "options": [
            "It specifies an exact start time that can interrupt the current JavaScript callback.",
            "It specifies a waiting threshold before the callback can run when execution permits.",
            "It specifies a callback deadline after which the runtime discards the scheduled work.",
            "It specifies a reserved timeslot that moves the callback onto a separate thread."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-promise-combinators-l2-s2-q13",
        "topicId": "js-promise-combinators",
        "set": 2,
        "environment": "node",
        "code": "const archiveMiss = Promise.reject(\"no copy\");\nconst archiveHit = Promise.resolve(\"found\");\nPromise.any([archiveMiss, archiveHit]).then(copy => console.log(copy));\nPromise.any([Promise.reject(\"sealed\"), Promise.reject(\"empty\")])\n  .catch(archiveError => {\n    console.log(archiveError.name);\n    console.log(archiveError.errors.join(\",\"));\n  });",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "found\nAggregateError\nsealed,empty"
          ]
        },
        "partB": {
          "ask": "How would Promise.race([archiveMiss, archiveHit]) differ from the first Promise.any call?",
          "options": [
            "It would reject from the first input because its settlement reaction is queued first.",
            "It would fulfill from the second input because rejection is excluded from selection.",
            "It would fulfill with an array because settlement gathers the input fulfillment values.",
            "It would reject with an AggregateError because rejection collects the input failure reasons."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The first Promise.any skips the rejected input and fulfills with found.",
            "The second Promise.any has no fulfilled input and rejects with AggregateError.",
            "The errors array contains rejection reasons in input order.",
            "The first fulfillment handler prints before the second call's catch handler."
          ],
          "modelAnswer": "The first Promise.any observes one rejection and one fulfillment, so it fulfills with found. The second call receives two rejections and rejects with an AggregateError. In this code, the first call's fulfillment handler runs before the second call's catch handler. The catch prints the error name and then its errors array in input order, producing sealed,empty."
        }
      },
      {
        "id": "js-fetch-abort-l2-s2-q14",
        "topicId": "js-fetch-abort",
        "set": 2,
        "environment": "node",
        "code": "function requestPreview(signal) {\n  return new Promise((resolve, reject) => {\n    const pendingPreview = setTimeout(() => resolve({ ok: true }), 25);\n    signal.addEventListener(\"abort\", () => {\n      clearTimeout(pendingPreview);\n      reject(new DOMException(\"Preview stopped\", \"AbortError\"));\n    }, { once: true });\n  });\n}\nconst previewControl = new AbortController();\nrequestPreview(previewControl.signal).catch(problem => console.log(problem.name));\npreviewControl.abort();\nconsole.log(\"requested stop\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "requested stop\nAbortError"
          ]
        },
        "partB": {
          "ask": "With real fetch, how should a caller handle an HTTP 404 response?",
          "options": [
            "It should read the catch reason as a Response because HTTP failures reject fetch.",
            "It should retry the body reader because HTTP failures leave response bodies pending.",
            "It should check response.ok or response.status because fetch can fulfill on HTTP errors.",
            "It should check signal.aborted because HTTP failures change the request abort signal."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-callbacks-promises-l2-s2-q15",
        "topicId": "js-callbacks-promises",
        "set": 2,
        "environment": "node",
        "code": "function readDial(done) {\n  setTimeout(() => done(new Error(\"jammed\")), 0);\n}\nfunction readDialAsync() {\n  return new Promise((resolve, reject) => {\n    readDial((fault, value) => {\n      if (fault) { reject(fault); return; }\n      resolve(value);\n    });\n  });\n}\nreadDialAsync().catch(fault => console.log(fault.message));\nconsole.log(\"checking\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "checking\njammed"
          ]
        },
        "partB": {
          "ask": "Why pass callback errors to reject instead of throwing them inside this timer callback?",
          "options": [
            "It connects the callback error to the wrapper promise so callers can handle rejection.",
            "It connects the callback error to the timer delay so callers can restart scheduling.",
            "It connects the callback error to the resolve value so callers can receive fulfillment.",
            "It connects the callback error to the executor stack so callers can catch it there."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-currying-compose-l2-s2-q16",
        "topicId": "js-currying-compose",
        "set": 2,
        "environment": "node",
        "code": "const compose = (outer, inner) => value => outer(inner(value));\nconst pipe = (first, second) => value => second(first(value));\nconst trimMargin = width => width - 2;\nconst scalePanel = width => width * 3;\nconsole.log(compose(trimMargin, scalePanel)(5));\nconsole.log(pipe(trimMargin, scalePanel)(5));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "13\n9"
          ]
        },
        "partB": {
          "ask": "How does currying change a function that accepts several arguments?",
          "options": [
            "It represents the function as one call that receives an array of argument values.",
            "It represents the function as a chain of calls that receive one argument per call.",
            "It represents the function as repeated calls that receive the complete argument list.",
            "It represents the function as a saved result that receives no further argument values."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-web-storage-l2-s2-q17",
        "topicId": "js-web-storage",
        "set": 2,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Layout settings</title></head><body><main>Layout settings</main></body></html>",
        "code": "const savedLayout = { columns: 2 };\nlocalStorage.setItem(\"layout\", JSON.stringify(savedLayout));\nconst loadedLayout = JSON.parse(localStorage.getItem(\"layout\"));\nloadedLayout.columns = 4;\nconsole.log(JSON.parse(localStorage.getItem(\"layout\")).columns);\nlocalStorage.setItem(\"enabled\", false);\nconsole.log(typeof localStorage.getItem(\"enabled\"), Boolean(localStorage.getItem(\"enabled\")));\nconsole.log(localStorage.getItem(\"absent\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "2\nstring true\nnull"
          ]
        },
        "partB": {
          "ask": "How do cookies differ from localStorage when a browser sends an HTTP request?",
          "options": [
            "Cookies can supply parsed JavaScript objects through matching request body fields.",
            "Cookies can supply localStorage values through matching origin storage keys.",
            "Cookies can supply sessionStorage entries through matching browsing context identifiers.",
            "Cookies can supply stored name-value pairs through matching headers of HTTP requests."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-array-utilities-l2-s2-q18",
        "topicId": "js-array-utilities",
        "set": 2,
        "environment": "node",
        "code": "const shells = [{ shade: \"pale\" }, { shade: \"dark\" }, { shade: \"pale\" }];\nconst sharedShell = shells[0];\nconsole.log(new Set([...shells, sharedShell]).size);\nconst distinctShades = [...new Set(shells.map(shell => shell.shade))];\nconsole.log(distinctShades.join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "3\npale,dark"
          ]
        },
        "partB": {
          "ask": "When would grouping help more than deduplicating these records?",
          "options": [
            "It can organize records by shade while discarding repeated records from the source.",
            "It can organize records by shade while replacing matching records with one object.",
            "It can organize records by shade while retaining the records in separate collections.",
            "It can organize records by shade while sorting the records by their field names."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-arrays-l2-s3-q01",
        "topicId": "js-arrays",
        "set": 3,
        "environment": "node",
        "code": "const flavors = [\"mint\", \"lemon\", \"plum\", \"pear\"];\nconst sample = flavors.slice(1, 3);\nconst removed = flavors.splice(1, 2, \"lime\");\nsample.push(\"fig\");\nconsole.log(flavors.join(\",\"));\nconsole.log(removed.join(\",\"));\nconsole.log(sample.join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "mint,lime,pear\nlemon,plum\nlemon,plum,fig"
          ]
        },
        "partB": {
          "ask": "If a splice call removes no entries and inserts one flavor, what does it return?",
          "options": [
            "It returns the source array, with the newly inserted flavor placed at its chosen index.",
            "It returns the inserted flavor, with its text wrapped inside a separate result array.",
            "It returns an empty array, with no removed entries available to include in the result.",
            "It returns the updated length, with the inserted flavor counted in the source array."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-destructuring-spread-l2-s3-q02",
        "topicId": "js-destructuring-spread",
        "set": 3,
        "environment": "node",
        "code": "const cabinSettings = { roof: { shade: undefined }, door: null };\nconst { roof: { shade = \"gray\" } = {}, door = \"oak\" } = cabinSettings;\nconst { roof: { shade: spareShade = \"white\" } = {} } = {};\nconsole.log(shade, door, spareShade);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "gray null white"
          ]
        },
        "partB": {
          "ask": "What is the purpose of an object rest property in a destructuring pattern?",
          "options": [
            "It collects remaining own enumerable properties into a new object after binding keys.",
            "It removes remaining own enumerable properties from the source after named bindings.",
            "It links remaining own enumerable properties to their source through live bindings.",
            "It merges remaining own enumerable properties into the object used for named bindings."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-optional-nullish-l2-s3-q03",
        "topicId": "js-optional-nullish",
        "set": 3,
        "environment": "node",
        "code": "let lookupPosition = 0;\nconst absentRow = null;\nconsole.log(absentRow?.[lookupPosition++] ?? \"blank\");\nconst captionTools = { format: undefined };\nconsole.log(captionTools.format?.(\"title\") ?? \"plain\");\nconsole.log(lookupPosition);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "blank\nplain\n0"
          ]
        },
        "partB": {
          "ask": "If format were the number 7, what would captionTools.format?.(\"title\") do?",
          "options": [
            "It would convert the stored number into a function and return the supplied text.",
            "It would return the stored number without trying to use the supplied argument.",
            "It would produce undefined after treating that number as an unavailable method.",
            "It would throw a TypeError because that present property cannot be called as a function."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-modules-l2-s3-q04",
        "topicId": "js-modules",
        "set": 3,
        "environment": "node",
        "code": "exports.shape = \"round\";\nconst firstExport = exports;\nmodule.exports = { shape: \"square\" };\nexports.shape = \"oval\";\nconsole.log(module.exports.shape);\nconsole.log(firstExport.shape);\nconsole.log(exports === module.exports);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "square\noval\nfalse"
          ]
        },
        "partB": {
          "ask": "In an ES module, what does a named import of an exported let binding provide?",
          "options": [
            "It provides an independent snapshot that stays at the value seen during module loading.",
            "It provides a live binding that reflects later assignments made by the exporting module.",
            "It provides a direct writable alias that permits reassignment from inside the importing module.",
            "It provides a queued promise that resolves after changes made by the exporting module."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-prototypes-l2-s3-q05",
        "topicId": "js-prototypes",
        "set": 3,
        "environment": "node",
        "code": "const fountainDefaults = { flow: \"low\" };\nconst courtyardFountain = Object.create(fountainDefaults);\ncourtyardFountain.flow = \"high\";\nfountainDefaults.flow = \"steady\";\nconsole.log(courtyardFountain.flow);\ndelete courtyardFountain.flow;\nconsole.log(courtyardFountain.flow);\nconsole.log(Object.hasOwn(courtyardFountain, \"flow\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "high\nsteady\nfalse"
          ]
        },
        "partB": {
          "ask": "If Object.setPrototypeOf(courtyardFountain, null) ran at the end, what would it change?",
          "options": [
            "It would freeze the fountain object and block additions to its own property collection.",
            "It would copy the former prototype's properties into the fountain's own property collection.",
            "It would erase the fountain's own properties while preserving its inherited property lookup.",
            "It would end inherited property lookup while preserving the fountain's own properties."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "Object.create links the fountain to fountainDefaults.",
            "The own flow property hides the changed prototype value at the first log.",
            "Deleting the own property exposes the prototype's current steady value.",
            "Object.hasOwn returns false because flow is now inherited."
          ],
          "modelAnswer": "Object.create makes fountainDefaults the fountain's prototype. Assigning high creates an own property, so the first log prints high even after the prototype changes. Deleting that own property makes the next lookup find steady on the prototype. The final check prints false because the fountain no longer owns flow."
        }
      },
      {
        "id": "js-async-await-l2-s3-q06",
        "topicId": "js-async-await",
        "set": 3,
        "environment": "node",
        "code": "async function inspectDrawers() {\n  for (const drawerCode of [\"A\", \"B\", \"C\"]) {\n    try {\n      console.log(\"start \" + drawerCode);\n      await (drawerCode === \"B\" ? Promise.reject(\"stuck\") : Promise.resolve());\n      console.log(\"open \" + drawerCode);\n    } catch (drawerFault) {\n      console.log(drawerCode + \" \" + drawerFault);\n    }\n  }\n}\ninspectDrawers().then(() => console.log(\"finished\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "start A\nopen A\nstart B\nB stuck\nstart C\nopen C\nfinished"
          ]
        },
        "partB": {
          "ask": "If one try/catch surrounded the entire loop instead, what would happen after a rejected await?",
          "options": [
            "It would leave the loop, enter catch, and skip the other remaining drawer inspections.",
            "It would retry the failed drawer, enter catch, and then resume the loop afterward.",
            "It would leave that iteration, enter catch, and continue with the next drawer inspection.",
            "It would finish the remaining drawers, enter catch, and then report the first rejection."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "The for loop starts one drawer inspection at a time.",
            "A fulfilled await permits the open log for A and C.",
            "The rejected await for B skips its open log and enters that iteration's catch.",
            "The loop continues to C before the returned promise fulfills and prints finished."
          ],
          "modelAnswer": "The loop prints start A, awaits fulfillment, and then prints open A. For B, the rejected await throws stuck, so its catch prints B stuck instead of open B. Because the catch is inside the loop, inspection continues with C and prints its start and open lines. After the loop ends, the function's promise fulfills and the attached handler prints finished."
        }
      },
      {
        "id": "js-timers-l2-s3-q07",
        "topicId": "js-timers",
        "set": 3,
        "environment": "node",
        "code": "let kilnStage = \"wet\";\nsetTimeout(savedStage => {\n  console.log(savedStage, kilnStage);\n}, 0, kilnStage);\nkilnStage = \"dry\";\nconsole.log(\"scheduled\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "scheduled\nwet dry"
          ]
        },
        "partB": {
          "ask": "If a mutable object were supplied as the extra timer argument, how would it be passed?",
          "options": [
            "It would be serialized into JSON text before the timer callback receives its argument.",
            "It would be cloned into a separate object before the timer callback receives its argument.",
            "It would be passed as the same object reference before the timer callback receives its argument.",
            "It would be wrapped inside a promise before the timer callback receives its argument."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-promise-combinators-l2-s3-q08",
        "topicId": "js-promise-combinators",
        "set": 3,
        "environment": "node",
        "code": "const glazeTask = new Promise(resolve => {\n  setTimeout(() => {\n    console.log(\"glaze done\");\n    resolve(\"glazed\");\n  }, 20);\n});\nconst firingTask = Promise.reject(\"cracked\");\nPromise.all([glazeTask, firingTask])\n  .then(() => console.log(\"batch ready\"))\n  .catch(batchFault => console.log(batchFault));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "cracked\nglaze done"
          ]
        },
        "partB": {
          "ask": "What does Promise.all([]) return when given an empty input array?",
          "options": [
            "It returns a pending promise whose settlement requires an input promise to be added.",
            "It returns a fulfilled promise whose fulfillment value is a newly created empty array.",
            "It returns a rejected promise whose rejection reason describes the missing input values.",
            "It returns an empty array whose entries can later receive the input promise results."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "Constructing glazeTask schedules work before Promise.all is called.",
            "The rejected firingTask makes the combined promise reject with cracked.",
            "The fulfillment handler is skipped and catch prints cracked.",
            "Promise.all does not cancel the glaze timer, which later prints glaze done."
          ],
          "modelAnswer": "Creating glazeTask schedules its timer, while firingTask is already rejected. Promise.all observes the rejection and rejects the combined promise with cracked. The fulfillment handler is skipped, and catch prints cracked before the timer runs. The glaze operation continues and later prints glaze done because rejection of the combined promise does not cancel its inputs."
        }
      },
      {
        "id": "js-fetch-abort-l2-s3-q09",
        "topicId": "js-fetch-abort",
        "set": 3,
        "environment": "node",
        "code": "function requestCatalog(signal) {\n  return new Promise((resolve, reject) => {\n    if (signal.aborted) { reject(signal.reason); return; }\n    setTimeout(() => resolve({ ok: false, status: 503 }), 0);\n  });\n}\nconst catalogControl = new AbortController();\nrequestCatalog(catalogControl.signal)\n  .then(reply => {\n    console.log(\"received\", reply.ok);\n    if (!reply.ok) throw new Error(\"HTTP \" + reply.status);\n  })\n  .catch(catalogFault => console.log(catalogFault.message));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "received false\nHTTP 503"
          ]
        },
        "partB": {
          "ask": "With real fetch, how does aborting with a custom Error reason affect a pending request?",
          "options": [
            "It rejects the fetch promise with that custom reason when the request is aborted.",
            "It fulfills the fetch promise with an error response whose status describes the abort.",
            "It retries the fetch request with that custom reason attached as an HTTP header.",
            "It preserves the fetch request and records that custom reason for the body reader."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-higher-order-l2-s3-q10",
        "topicId": "js-higher-order",
        "set": 3,
        "environment": "node",
        "code": "const altitudeMarks = [4, 9, 7];\nconst altitudeChanges = altitudeMarks.map((height, position, marks) => {\n  const previous = position === 0 ? height : marks[position - 1];\n  return height - previous;\n});\nconsole.log(altitudeChanges.join(\",\"));\nconsole.log(altitudeMarks.join(\",\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "0,5,-2\n4,9,7"
          ]
        },
        "partB": {
          "ask": "If the callback changed marks[2] while processing position 0, what would the later callback at position 2 read?",
          "options": [
            "It would read the earlier element value from a snapshot created before mapping started.",
            "It would receive undefined because changing a later element removes it from traversal.",
            "It would receive the changed element after restarting traversal from the first position.",
            "It would read the changed element value when traversal reaches that later position."
          ],
          "correct": 3
        }
      },
      {
        "id": "js-immutability-l2-s3-q11",
        "topicId": "js-immutability",
        "set": 3,
        "environment": "node",
        "code": "\"use strict\";\nconst lockedSchedule = Object.freeze({ room: { seats: 6 }, day: \"Mon\" });\nlockedSchedule.room.seats = 8;\ntry {\n  lockedSchedule.day = \"Tue\";\n} catch (scheduleFault) {\n  console.log(scheduleFault.name);\n}\nconsole.log(lockedSchedule.day, lockedSchedule.room.seats);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "TypeError\nMon 8"
          ]
        },
        "partB": {
          "ask": "For an ordinary array, what does toReversed provide when changing display order?",
          "options": [
            "It returns the original array after changing its entries into the reversed display order.",
            "It returns a new array with reversed entries while preserving the source array's order.",
            "It returns an iterator with reversed entries while freezing the source array's positions.",
            "It returns a new array with cloned objects while preserving the source array's order."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-debounce-throttle-l2-s3-q12",
        "topicId": "js-debounce-throttle",
        "set": 3,
        "environment": "node",
        "code": "function cancellableDebounce(send, delay) {\n  let pendingSend;\n  function queuedSend(message) {\n    clearTimeout(pendingSend);\n    pendingSend = setTimeout(() => send(message), delay);\n  }\n  queuedSend.cancel = () => clearTimeout(pendingSend);\n  return queuedSend;\n}\nconst sendDraft = cancellableDebounce(text => console.log(text), 15);\nsendDraft(\"old draft\");\nsendDraft.cancel();\nsetTimeout(() => {\n  sendDraft(\"new draft\"); sendDraft(\"final draft\");\n}, 35);\nconsole.log(\"queued\");",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "queued\nfinal draft"
          ]
        },
        "partB": {
          "ask": "If send became a method that reads this, what receiver handling would a general debounce wrapper need?",
          "options": [
            "It would copy the method's properties onto the wrapper before invoking the saved callback.",
            "It would bind the method's receiver to the timer object before invoking the saved callback.",
            "It would retain the caller's receiver and forward it with arguments when invoking the saved callback.",
            "It would use the wrapper's prototype as the receiver when invoking the saved callback."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-dom-l2-s3-q13",
        "topicId": "js-dom",
        "set": 3,
        "environment": "browser",
        "html": "<!doctype html><html><head><title>Label preview</title></head><body><section id=\"label-preview\"><em>Waiting</em></section></body></html>",
        "code": "const labelPreview = document.querySelector(\"#label-preview\");\nlabelPreview.textContent = \"<strong>Fresh</strong>\";\nconsole.log(labelPreview.querySelectorAll(\"strong\").length);\nconsole.log(labelPreview.textContent);\nlabelPreview.innerHTML = \"<strong>Fresh</strong>\";\nconsole.log(labelPreview.querySelectorAll(\"strong\").length);\nconsole.log(labelPreview.textContent);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "0\n<strong>Fresh</strong>\n1\nFresh"
          ]
        },
        "partB": {
          "ask": "If a click listener was attached to the original em child, how would replacing its parent's contents affect it?",
          "options": [
            "It would transfer the listener to the replacement child through their shared parent element.",
            "It would move the listener onto the parent element for clicks from replacement children.",
            "It would copy the listener onto new descendants with the original child's element name.",
            "It would leave the listener on the removed child without attaching it to replacement nodes."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, what happens when this code runs.",
          "keyPoints": [
            "Assigning textContent replaces the em child with literal text.",
            "The apparent strong markup is text, so the first selector finds zero elements.",
            "Assigning innerHTML parses the string and creates a strong element.",
            "The second selector finds one element, and textContent then returns Fresh."
          ],
          "modelAnswer": "The first assignment removes the em child and inserts the supplied string as literal text. There is no strong element, so the first two logs print zero and the string containing angle brackets. The innerHTML assignment then parses the same string and creates a strong element. The last two logs print one and Fresh, since textContent reads the element's text without its tags."
        }
      },
      {
        "id": "js-polyfills-l2-s3-q14",
        "topicId": "js-polyfills",
        "set": 3,
        "environment": "node",
        "code": "function reduceWithoutSeed(values, combine) {\n  let cursor = 0;\n  while (cursor < values.length && !(cursor in values)) cursor++;\n  if (cursor === values.length) throw new TypeError(\"No entries\");\n  let result = values[cursor++];\n  for (; cursor < values.length; cursor++) {\n    if (cursor in values) result = combine(result, values[cursor], cursor, values);\n  }\n  return result;\n}\nconst fabricLengths = [, 6, , 4];\nconsole.log(reduceWithoutSeed(fabricLengths, (length, next, position) => {\n  console.log(position);\n  return length + next;\n}));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "3\n10"
          ]
        },
        "partB": {
          "ask": "What should native reduce do with an empty array and no initial value?",
          "options": [
            "It should throw a TypeError because no entry can supply the initial accumulator.",
            "It should return undefined because an empty array supplies no callback result value.",
            "It should return zero because addition supplies a numeric starting accumulator.",
            "It should call the callback because undefined can supply the missing array entry."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-strings-numbers-l2-s3-q15",
        "topicId": "js-strings-numbers",
        "set": 3,
        "environment": "node",
        "code": "const rulerText = \"18.75cm\";\nconsole.log(parseInt(rulerText, 10), Number(rulerText));\nconsole.log(parseInt(\"1e2\", 10), Number(\"1e2\"));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "18 NaN\n1 100"
          ]
        },
        "partB": {
          "ask": "What kind of value does toFixed return for a finite number with magnitude below 1e21?",
          "options": [
            "It returns a number whose stored precision changes to the requested decimal places.",
            "It returns an object whose fraction field contains the requested decimal digits.",
            "It returns a string whose fractional digits match the requested decimal places.",
            "It returns an integer whose digits omit the requested fractional decimal places."
          ],
          "correct": 2
        }
      },
      {
        "id": "js-memory-l2-s3-q16",
        "topicId": "js-memory",
        "set": 3,
        "environment": "node",
        "code": "function holdImage() {\n  let imageData = { pixels: [8, 6, 4] };\n  return {\n    read() { return imageData?.pixels.length ?? 0; },\n    release() { imageData = null; }\n  };\n}\nconst imageHandle = holdImage();\nconst readPixels = imageHandle.read;\nconsole.log(readPixels());\nimageHandle.release();\nconsole.log(readPixels());",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "3\n0"
          ]
        },
        "partB": {
          "ask": "How can a listener on a long-lived event target retain data after a view closes?",
          "options": [
            "It can retain data because closing the view copies its objects into the event target.",
            "It can retain data through a registered callback that closes over the view's state.",
            "It can retain data because removing visible nodes freezes the view's captured objects.",
            "It can retain data through a callback result that becomes the event target's prototype."
          ],
          "correct": 1
        }
      },
      {
        "id": "js-deep-clone-equal-l2-s3-q17",
        "topicId": "js-deep-clone-equal",
        "set": 3,
        "environment": "node",
        "code": "function cloneRecord(record) {\n  if (record === null || typeof record !== \"object\") return record;\n  if (Array.isArray(record)) return record.map(cloneRecord);\n  return Object.fromEntries(Object.entries(record).map(([key, value]) =>\n    [key, cloneRecord(value)]\n  ));\n}\nconst museumRecord = { opened: new Date(\"2004-06-01T00:00:00Z\") };\nconst museumCopy = cloneRecord(museumRecord);\nconsole.log(museumRecord.opened.getUTCFullYear());\nconsole.log(museumCopy.opened instanceof Date);\nconsole.log(Object.keys(museumCopy.opened).length);",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "2004\nfalse\n0"
          ]
        },
        "partB": {
          "ask": "If an ordinary record pointed to itself, what would this cloning approach need?",
          "options": [
            "It would need a source-to-copy lookup to reuse a previously created copy when revisiting the same object.",
            "It would need sorted property names to prevent a self-reference from entering recursive traversal.",
            "It would need a shallow spread first to remove self-references before beginning recursive traversal.",
            "It would need a larger recursion limit to complete a self-reference without tracking visited objects."
          ],
          "correct": 0
        }
      },
      {
        "id": "js-promises-l2-s3-q18",
        "topicId": "js-promises",
        "set": 3,
        "environment": "node",
        "code": "Promise.resolve(\"baked\")\n  .finally(() => Promise.reject(\"tray stuck\"))\n  .then(breadState => console.log(\"serve \" + breadState))\n  .catch(trayFault => {\n    console.log(trayFault);\n    return \"released\";\n  })\n  .then(trayState => console.log(trayState));",
        "partA": {
          "ask": "What does this print?",
          "accepted": [
            "tray stuck\nreleased"
          ]
        },
        "partB": {
          "ask": "If a finally callback returns a still-pending promise, what happens to the next chain step?",
          "options": [
            "It proceeds with the earlier fulfillment while that returned promise settles independently.",
            "It waits for that returned promise to settle before continuing along the resulting chain.",
            "It receives that promise as its value without waiting for the promise to settle.",
            "It stops with a TypeError because cleanup callbacks cannot return a pending promise."
          ],
          "correct": 1
        }
      }
    ],
};
