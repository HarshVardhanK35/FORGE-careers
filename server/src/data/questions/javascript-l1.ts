// JavaScript, level 1 (basics): 3 sets of 21 questions.
// Written with Codex, then checked: every snippet was run and every option read; the answer options were polished so that
// neither their length nor their wording gives a clue. A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const JAVASCRIPT_LEVEL_1: QuestionBank = {
  skillId: "javascript",
  level: 1,
  questions: [
    {
      "id": "js-values-types-l1-s1-q01",
      "topicId": "js-values-types",
      "set": 1,
      "environment": "node",
      "code": "const ticketLabel = \"42\";\nconsole.log(typeof ticketLabel);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "string"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The type reflects conversion by typeof, so the stored value becomes a number.",
          "The type reflects the quoted value, so the stored value is a string.",
          "The type reflects the const declaration, so the stored value is a number.",
          "The type reflects the numeric characters, so the stored value is a number."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-truthy-logical-l1-s1-q02",
      "topicId": "js-truthy-logical",
      "set": 1,
      "environment": "node",
      "code": "const chosenTheme = \"\";\nconsole.log(chosenTheme || \"light\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "light"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Logical OR returns a boolean result when the left operand is falsy.",
          "Logical OR returns the left operand when that operand is an empty string.",
          "Logical OR returns joined string values when its operands contain text.",
          "Logical OR returns the right operand when the left operand is falsy."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-variables-scope-l1-s1-q03",
      "topicId": "js-variables-scope",
      "set": 1,
      "environment": "node",
      "code": "let seat = \"window\";\n{\n  let seat = \"aisle\";\n}\nconsole.log(seat);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "window"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The inner let declaration creates a separate binding within the block.",
          "The inner let declaration replaces the outer binding beyond the block.",
          "The inner let declaration creates a binding visible throughout the file.",
          "The inner let declaration causes a syntax error by reusing the outer name."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-hoisting-l1-s1-q04",
      "topicId": "js-hoisting",
      "set": 1,
      "environment": "node",
      "code": "console.log(parcel);\nvar parcel = \"ready\";",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "undefined"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The var binding starts with its assigned string before this log, through hoisting.",
          "The var binding raises a reference error before this log, due to its later declaration.",
          "The var binding starts as undefined before this log, with assignment occurring later.",
          "The var binding starts as null before this log, with assignment occurring later."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-operators-equality-l1-s1-q05",
      "topicId": "js-operators-equality",
      "set": 1,
      "environment": "node",
      "code": "const storedPin = \"27\";\nconst enteredPin = 27;\nconsole.log(storedPin === enteredPin);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "false"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Strict equality compares the two values without converting their different types.",
          "Strict equality compares the two values after converting both operands to booleans.",
          "Strict equality compares the two values after converting both operands to strings.",
          "Strict equality compares the two values after converting numeric text to numbers."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-control-flow-l1-s1-q06",
      "topicId": "js-control-flow",
      "set": 1,
      "environment": "node",
      "code": "for (let step = 1; step <= 3; step++) {\n  console.log(step);\n}",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "1\n2\n3"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This for loop updates before the initial check and then runs the loop body.",
          "This for loop checks its condition after the body and runs once past its limit.",
          "This for loop checks its condition at startup and then runs without retesting.",
          "This for loop checks its condition before the body and updates after the body."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-functions-l1-s1-q07",
      "topicId": "js-functions",
      "set": 1,
      "environment": "node",
      "code": "function greeting(language = \"hello\") {\n  return language;\n}\nconsole.log(greeting());",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "hello"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The default parameter supplies its declared value when the argument is omitted.",
          "The default parameter supplies an empty string when the argument is omitted.",
          "The default parameter supplies its declared value in place of a supplied argument.",
          "The default parameter supplies undefined when a regular function receives no argument."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-objects-l1-s1-q08",
      "topicId": "js-objects",
      "set": 1,
      "environment": "node",
      "code": "const forecast = { sky: \"clear\", wind: \"calm\" };\nconst detail = \"wind\";\nconsole.log(forecast[detail]);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "calm"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Bracket access uses the character count of detail as a numeric property index.",
          "Bracket access uses the literal name detail as the property name to look up.",
          "Bracket access uses the value of detail as the property name to look up.",
          "Bracket access uses the first defined property as the property to look up."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-arrays-l1-s1-q09",
      "topicId": "js-arrays",
      "set": 1,
      "environment": "node",
      "code": "const widths = [2, 4, 6];\nconst expanded = widths.map(width => width * 2);\nconsole.log(expanded.join(\",\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "4,8,12"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The map method builds a new array containing the results returned by its callback.",
          "The map method returns the first source value that produces a truthy callback result.",
          "The map method rewrites the source array with the results returned by its callback.",
          "The map method builds a new array containing source values with truthy callback results."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-strings-numbers-l1-s1-q10",
      "topicId": "js-strings-numbers",
      "set": 1,
      "environment": "node",
      "code": "const aisleNumber = 5;\nconsole.log(`Aisle ${aisleNumber}`);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Aisle 5"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The template literal rejects the numeric expression instead of inserting its value.",
          "The template literal inserts the placeholder syntax into the surrounding text.",
          "The template literal inserts the evaluated expression into the surrounding text.",
          "The template literal reads a property named aisleNumber instead of the variable."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-destructuring-spread-l1-s1-q11",
      "topicId": "js-destructuring-spread",
      "set": 1,
      "environment": "node",
      "code": "const coordinates = [8, 3];\nconst [horizontal, vertical] = coordinates;\nconsole.log(vertical);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "3"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Array destructuring assigns elements by removing them from the front of the source array.",
          "Array destructuring assigns source elements to the named variables according to their positions.",
          "Array destructuring assigns the complete source array to the variables in the pattern.",
          "Array destructuring assigns source elements to the named variables according to matching names."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-optional-nullish-l1-s1-q12",
      "topicId": "js-optional-nullish",
      "set": 1,
      "environment": "node",
      "code": "const savedVolume = 0;\nconsole.log(savedVolume ?? 10);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "0"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Nullish coalescing selects the fallback for null or undefined, preserving this zero.",
          "Nullish coalescing selects the right operand as its result, replacing this zero.",
          "Nullish coalescing selects the fallback for a falsy left operand, replacing this zero.",
          "Nullish coalescing converts the left operand to a boolean, turning this zero into false."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-modules-l1-s1-q13",
      "topicId": "js-modules",
      "set": 1,
      "environment": "node",
      "code": "const fileTools = require(\"node:path\");\nconsole.log(fileTools.posix.extname(\"notes.txt\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          ".txt"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "CommonJS require returns the module name string, requiring another lookup for its functions.",
          "CommonJS require returns the module exports, providing access to the exported functions.",
          "CommonJS require returns the module source text, requiring evaluation to use its functions.",
          "CommonJS require installs the module functions globally, returning no usable module object."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-closures-l1-s1-q14",
      "topicId": "js-closures",
      "set": 1,
      "environment": "node",
      "code": "function makeBadge(prefix) {\n  return function (label) {\n    return prefix + \": \" + label;\n  };\n}\nconst badge = makeBadge(\"Room\");\nconsole.log(badge(\"Blue\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Room: Blue"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The returned function receives prefix as its own first argument when badge is invoked.",
          "The returned function retains access to prefix through the scope where it was created.",
          "The returned function loses access to prefix when the outer function finishes running.",
          "The returned function accesses prefix because returning it moves prefix to global scope."
        ],
        "correct": 1
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "Calling the outer function creates a local prefix binding.",
          "The returned function keeps access to that binding.",
          "The later call combines the saved prefix with its own label argument."
        ],
        "modelAnswer": "Calling makeBadge creates a local prefix binding and returns an inner function. The badge variable holds that function. The inner function keeps access to prefix after makeBadge returns. Calling badge combines that prefix with the label and logs the returned text."
      }
    },
    {
      "id": "js-this-binding-l1-s1-q15",
      "topicId": "js-this-binding",
      "set": 1,
      "environment": "node",
      "code": "const meter = {\n  unit: \"meters\",\n  read() { return this.unit; }\n};\nconst readUnit = meter.read.bind(meter);\nconsole.log(readUnit());",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "meters"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The bind method invokes the method and returns its result for later invocation.",
          "The bind method changes the original method so later calls use meter as this.",
          "The bind method returns a new function that receives meter as its first parameter.",
          "The bind method returns a new function that uses meter as its fixed this value."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-prototypes-l1-s1-q16",
      "topicId": "js-prototypes",
      "set": 1,
      "environment": "node",
      "code": "const animalTraits = { sound: \"chirp\" };\nconst bird = Object.create(animalTraits);\nconsole.log(bird.sound);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "chirp"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The property lookup returns undefined because bird has no own sound property to read.",
          "The property lookup rejects sound on the prototype because it holds data rather than a method.",
          "The property lookup finds sound on the prototype because bird has no own sound property.",
          "The property lookup finds sound copied onto bird as an own property by Object.create."
        ],
        "correct": 2
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The traits object has its own sound property.",
          "Object.create makes that object the prototype of bird.",
          "The missing own property is found on the prototype."
        ],
        "modelAnswer": "The animalTraits object stores a sound property. Object.create makes a new object whose prototype is animalTraits. The bird object has no own sound property, so lookup continues to its prototype. That lookup finds the value, which console.log prints."
      }
    },
    {
      "id": "js-errors-l1-s1-q17",
      "topicId": "js-errors",
      "set": 1,
      "environment": "node",
      "code": "try {\n  throw new Error(\"Invalid size\");\n} catch (issue) {\n  console.log(issue.message);\n} finally {\n  console.log(\"Finished\");\n}",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Invalid size\nFinished"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The thrown error exits the try statement, bypassing both catch and finally blocks.",
          "The thrown error enters finally to log its text, then catch logs the error message.",
          "The thrown error enters catch to log its message, then bypasses the finally block.",
          "The thrown error enters catch to log its message, then finally logs its completion text."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-higher-order-l1-s1-q18",
      "topicId": "js-higher-order",
      "set": 1,
      "environment": "node",
      "code": "function transformReading(reading, operation) {\n  return operation(reading);\n}\nconst tripled = transformReading(7, amount => amount * 3);\nconsole.log(tripled);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "21"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The helper receives the callback as source text and evaluates that text with the reading.",
          "The helper receives the callback as a function and schedules its invocation through a timer.",
          "The helper receives the callback as a function and invokes it with the supplied reading.",
          "The helper receives the result of running the callback before the helper starts executing."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-immutability-l1-s1-q19",
      "topicId": "js-immutability",
      "set": 1,
      "environment": "node",
      "code": "const originalMenu = { title: \"Lunch\" };\nconst revisedMenu = { ...originalMenu };\nrevisedMenu.title = \"Dinner\";\nconsole.log(originalMenu.title);\nconsole.log(revisedMenu.title);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Lunch\nDinner"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Object spread freezes the original object, so its title is protected from later changes.",
          "Object spread creates a separate object, so replacing its title leaves the original intact.",
          "Object spread creates nonwritable copied properties, so replacing the copied title fails.",
          "Object spread reuses the original object, so replacing its title changes the original too."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-map-set-l1-s1-q20",
      "topicId": "js-map-set",
      "set": 1,
      "environment": "node",
      "code": "const labels = new Set();\nlabels.add(\"urgent\");\nlabels.add(\"urgent\");\nlabels.add(\"later\");\nconsole.log(labels.size);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "2"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "A Set stores insertion entries, so adding the repeated label increases its size again.",
          "A Set stores occurrence counts, so size reports the count of the latest label.",
          "A Set stores the latest added value, so adding another label replaces its contents.",
          "A Set stores distinct values, so adding the repeated label leaves its size unchanged."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-promises-l1-s1-q21",
      "topicId": "js-promises",
      "set": 1,
      "environment": "node",
      "code": "const delivery = Promise.resolve(\"Packed\");\ndelivery.then(status => {\n  console.log(status);\n});\nconsole.log(\"Waiting\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Waiting\nPacked"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The then handler receives the promise object instead of its value, so Packed is not logged.",
          "The then handler runs during registration on a fulfilled promise, so Packed is logged first.",
          "The then handler runs after the current synchronous code, so Waiting is logged first.",
          "The then handler needs a later timer to trigger execution, so Packed remains unprinted."
        ],
        "correct": 2
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "Promise.resolve creates a fulfilled promise.",
          "Calling then registers a handler for later execution.",
          "The synchronous log runs before the registered handler.",
          "The handler receives the fulfilled value and logs it."
        ],
        "modelAnswer": "Promise.resolve creates a promise fulfilled with the supplied text. Calling then registers a handler, which runs asynchronously even though the promise is already fulfilled. The synchronous console.log prints Waiting first. After the current code finishes, the handler receives the fulfilled value and prints Packed."
      }
    },
    {
      "id": "js-destructuring-spread-l1-s2-q01",
      "topicId": "js-destructuring-spread",
      "set": 2,
      "environment": "node",
      "code": "const parcel = { destination: \"harbor\", weight: 4 };\nconst { destination: stop } = parcel;\nconsole.log(stop);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "harbor"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Object destructuring reads destination and removes that property from the source object.",
          "Object destructuring reads stop and stores its value in the local binding destination.",
          "Object destructuring reads destination and stores its value in the local binding stop.",
          "Object destructuring uses stop as a fallback when the destination property is absent."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-optional-nullish-l1-s2-q02",
      "topicId": "js-optional-nullish",
      "set": 2,
      "environment": "node",
      "code": "const profile = { username: \"reader\" };\nconsole.log(profile.address?.city);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "undefined"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Optional chaining stops at the nullish address value and produces undefined.",
          "Optional chaining stops at a falsy base value, including false and zero.",
          "Optional chaining creates an empty address object before reading its city.",
          "Optional chaining throws an error when it encounters the missing address property."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-modules-l1-s2-q03",
      "topicId": "js-modules",
      "set": 2,
      "environment": "node",
      "code": "module.exports = { format: \"text\" };\nconsole.log(module.exports.format);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "text"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The module.exports assignment ends the module execution, preventing the following log from running.",
          "The module.exports property requires a read from another module to access the exposed value.",
          "The module.exports assignment copies format into global scope instead of storing the object.",
          "The module.exports property holds the exposed value and can be read within this module."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-closures-l1-s2-q04",
      "topicId": "js-closures",
      "set": 2,
      "environment": "node",
      "code": "function makeTicketCounter() {\n  let issued = 0;\n  return function () {\n    issued += 1;\n    return issued;\n  };\n}\nconst issueTicket = makeTicketCounter();\nconsole.log(issueTicket());\nconsole.log(issueTicket());",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "1\n2"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The returned function moves the outer local state into global scope between calls.",
          "The returned function retains the outer local state and updates it between calls.",
          "The returned function reads the outer local state but cannot update it between calls.",
          "The returned function reruns the outer function and recreates its state between calls."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-this-binding-l1-s2-q05",
      "topicId": "js-this-binding",
      "set": 2,
      "environment": "node",
      "code": "function describeRoom(suffix) {\n  return this.label + suffix;\n}\nconst studio = { label: \"quiet\" };\nconsole.log(describeRoom.call(studio, \" room\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "quiet room"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The call method returns a bound function with studio as this instead of invoking the function.",
          "The call method invokes the function with studio as its parameter and the suffix as this.",
          "The call method changes the function so future plain invocations use studio as their this.",
          "The call method invokes the function with studio as this and the suffix as its parameter."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-prototypes-l1-s2-q06",
      "topicId": "js-prototypes",
      "set": 2,
      "environment": "node",
      "code": "const signDefaults = { color: \"blue\" };\nconst doorwaySign = Object.create(signDefaults);\ndoorwaySign.color = \"green\";\nconsole.log(doorwaySign.color);\nconsole.log(signDefaults.color);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "green\nblue"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The assignment fails because Object.create prevents the creation of own color properties.",
          "The assignment changes the inherited color property stored on the prototype object.",
          "The assignment creates an own color property that shadows the unchanged prototype color.",
          "The assignment creates an own color property that lookup checks after the prototype color."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-classes-l1-s2-q07",
      "topicId": "js-classes",
      "set": 2,
      "environment": "node",
      "code": "class Lantern {\n  constructor(shade) {\n    this.shade = shade;\n  }\n  describe() {\n    return this.shade + \" light\";\n  }\n}\nconst deskLamp = new Lantern(\"warm\");\nconsole.log(deskLamp.describe());",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "warm light"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The instance method requires a separate constructor call after new creates the new instance.",
          "The instance method reads shade from this after new runs the constructor to store it.",
          "The instance method receives shade as a local variable copied from the constructor arguments.",
          "The instance method reads shade from the class as a static field instead of the instance."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-higher-order-l1-s2-q08",
      "topicId": "js-higher-order",
      "set": 2,
      "environment": "node",
      "code": "const shelfSizes = [3, 8, 5, 10];\nconst wideShelves = shelfSizes.filter(function (width) {\n  return width > 6;\n});\nconsole.log(wideShelves.join(\",\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "8,10"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The filter method builds a new array of callback results instead of the source values.",
          "The filter method returns the first matching source value after stopping its search.",
          "The filter method builds a new array of source values whose callback results are truthy.",
          "The filter method sorts the source values using the callback as a comparison function."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-immutability-l1-s2-q09",
      "topicId": "js-immutability",
      "set": 2,
      "environment": "node",
      "code": "const originalPoster = { layout: { size: \"small\" } };\nconst posterCopy = { ...originalPoster };\nposterCopy.layout.size = \"large\";\nconsole.log(originalPoster.layout.size);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "large"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Object spread creates a copy whose nested properties resist changes due to the const declaration.",
          "Object spread creates a separate outer object while preserving the nested object reference.",
          "Object spread creates separate outer and nested objects by copying the nested structure.",
          "Object spread creates another reference to the existing outer object instead of a new object."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-json-dates-regex-l1-s2-q10",
      "topicId": "js-json-dates-regex",
      "set": 2,
      "environment": "node",
      "code": "const badgePattern = /^ID-/;\nconsole.log(badgePattern.test(\"ID-42\"));\nconsole.log(badgePattern.test(\"user-ID-42\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "true\nfalse"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The caret anchors the following ID- text to the beginning of the tested string.",
          "The caret lets the following ID- text match within the middle of the tested string.",
          "The caret makes the following ID- text optional when testing the input string.",
          "The caret anchors the following ID- text to the ending of the tested string."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-callbacks-promises-l1-s2-q11",
      "topicId": "js-callbacks-promises",
      "set": 2,
      "environment": "node",
      "code": "function readRecipe(done) {\n  done(null, \"soup\");\n}\nreadRecipe(function (error, recipe) {\n  if (error) {\n    console.log(\"unavailable\");\n    return;\n  }\n  console.log(recipe);\n});",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "soup"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This callback treats null as an error value, so the unavailable branch logs its message.",
          "This callback receives the result before the error, so null represents the supplied recipe value.",
          "This callback receives the error before the result, so null allows the recipe to be logged.",
          "This callback waits for a timer before running, so the recipe cannot be logged by this call."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-promises-l1-s2-q12",
      "topicId": "js-promises",
      "set": 2,
      "environment": "node",
      "code": "const reservation = Promise.reject(\"no seats\");\nreservation.catch(function (reason) {\n  console.log(reason);\n});",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "no seats"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The catch method needs try around Promise.reject to handle its synchronous exception.",
          "The catch method changes the original promise to fulfilled before calling its handler.",
          "The catch method calls its handler with the fulfilled promise's fulfillment value.",
          "The catch method calls its handler with the rejected promise's rejection reason."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-async-await-l1-s2-q13",
      "topicId": "js-async-await",
      "set": 2,
      "environment": "node",
      "code": "async function showForecast() {\n  const outlook = await Promise.resolve(\"clear\");\n  console.log(outlook);\n  console.log(\"forecast ready\");\n}\nshowForecast();",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "clear\nforecast ready"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The await expression suspends this async function and supplies the fulfilled promise value.",
          "The await expression suspends JavaScript execution elsewhere until this promise settles.",
          "The await expression supplies the promise object itself before this async function continues.",
          "The await expression starts the following statements in parallel with the awaited operation."
        ],
        "correct": 0
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "Calling showForecast starts the async function.",
          "await pauses the function and later produces the fulfilled value.",
          "The function logs clear, then forecast ready."
        ],
        "modelAnswer": "Calling showForecast starts the function. Promise.resolve creates a fulfilled promise, and await pauses the function before resuming with its value. That value is stored in outlook and printed as clear. The next statement prints forecast ready."
      }
    },
    {
      "id": "js-event-loop-l1-s2-q14",
      "topicId": "js-event-loop",
      "set": 2,
      "environment": "node",
      "code": "console.log(\"packing\");\nsetTimeout(() => console.log(\"delivery\"), 0);\nPromise.resolve().then(() => console.log(\"label\"));\nconsole.log(\"sealed\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "packing\nsealed\nlabel\ndelivery"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The current script finishes before the timer callback, followed by the promise handler.",
          "The current script finishes before the promise handler, followed by the timer callback.",
          "The current script pauses for the zero-delay timer, then resumes before the promise handler.",
          "The current script pauses for the fulfilled promise handler, then resumes before the timer."
        ],
        "correct": 1
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The first log runs immediately and the timer is scheduled.",
          "The promise handler is queued as a microtask.",
          "The last synchronous log runs before queued callbacks.",
          "The promise handler runs before the timer callback."
        ],
        "modelAnswer": "The script prints packing and schedules a timer. It queues the promise handler as a microtask, then prints sealed. After the script finishes, the microtask prints label. The timer callback later prints delivery."
      }
    },
    {
      "id": "js-timers-l1-s2-q15",
      "topicId": "js-timers",
      "set": 2,
      "environment": "node",
      "code": "setTimeout(() => console.log(\"tea ready\"), 20);\nconsole.log(\"kettle on\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "kettle on\ntea ready"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The timer schedules its callback for later, after the delay and the current script.",
          "The timer runs its callback during registration, then delays the return of its handle.",
          "The timer runs its callback before the next statement, then starts the specified delay.",
          "The timer pauses the current script for the delay, then runs its scheduled callback."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-promise-combinators-l1-s2-q16",
      "topicId": "js-promise-combinators",
      "set": 2,
      "environment": "node",
      "code": "const mapTask = Promise.resolve(\"map\");\nconst guideTask = Promise.resolve(\"guide\");\nPromise.all([mapTask, guideTask]).then(function (documents) {\n  console.log(documents.join(\" + \"));\n});",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "map + guide"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The combined promise takes the first fulfilled input value without waiting for the rest.",
          "The combined promise collects outcome records for fulfilled and rejected input promises.",
          "The combined promise collects the input fulfillment values sorted alphabetically by their contents.",
          "The combined promise collects fulfillment values in input order once the inputs fulfill."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-debounce-throttle-l1-s2-q17",
      "topicId": "js-debounce-throttle",
      "set": 2,
      "environment": "node",
      "code": "function debounce(action, delay) {\n  let pending;\n  return function (query) {\n    clearTimeout(pending);\n    pending = setTimeout(() => action(query), delay);\n  };\n}\nconst suggest = debounce(query => console.log(query), 20);\nsuggest(\"ca\");\nsuggest(\"cabin\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "cabin"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This debounce replaces the pending action when a later call arrives before the delay ends.",
          "This debounce schedules independent pending actions when later calls arrive before the delay ends.",
          "This debounce runs the first action on entry and suppresses later calls until the delay ends.",
          "This debounce keeps the first pending action when later calls arrive before the delay ends."
        ],
        "correct": 0
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The wrapper stores its pending timer between calls.",
          "The first call schedules an action with ca.",
          "The second call cancels that timer and schedules an action with cabin.",
          "Only the final scheduled action runs after the delay."
        ],
        "modelAnswer": "debounce returns a function that keeps a pending timer. The first call schedules the action with ca. The second call clears that timer and schedules a new one with cabin. After the delay, the remaining timer prints cabin."
      }
    },
    {
      "id": "js-fetch-abort-l1-s2-q18",
      "topicId": "js-fetch-abort",
      "set": 2,
      "environment": "node",
      "code": "const downloadController = new AbortController();\nconst downloadSignal = downloadController.signal;\nconsole.log(downloadSignal.aborted);\ndownloadController.abort();\nconsole.log(downloadSignal.aborted);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "false\ntrue"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The aborted flag returns to false when code reads it after the cancellation request.",
          "The aborted flag reports whether the controller has requested cancellation of its signal.",
          "The aborted flag stays unchanged because calling abort replaces the controller's existing signal.",
          "The aborted flag becomes true after a fetch completes rather than when abort is called."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-dom-l1-s2-q19",
      "topicId": "js-dom",
      "set": 2,
      "environment": "browser",
      "html": "<!doctype html><html><head><title>Notice</title></head><body><p id=\"notice\">Closed</p></body></html>",
      "code": "const noticeElement = document.querySelector(\"#notice\");\nnoticeElement.textContent = \"Open\";\nconsole.log(document.querySelector(\"#notice\").textContent);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "Open"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The selector returns the matching element, and textContent appends Open to its text.",
          "The selector returns the matching element, and textContent replaces its text with Open.",
          "The selector returns a detached element copy, so the document keeps its previous text.",
          "The selector returns the matching element, but textContent updates form input values."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-dom-events-l1-s2-q20",
      "topicId": "js-dom-events",
      "set": 2,
      "environment": "browser",
      "html": "<!doctype html><html><head><title>Actions</title></head><body><div id=\"actions\"><button id=\"save\" type=\"button\">Save</button></div></body></html>",
      "code": "const actionPanel = document.querySelector(\"#actions\");\nactionPanel.addEventListener(\"click\", function (event) {\n  console.log(event.target.id);\n  console.log(event.currentTarget.id);\n});\ndocument.querySelector(\"#save\").click();",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "save\nactions"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The click stops at save because the actions listener requires a direct click on actions.",
          "The click bubbles with actions as target, while currentTarget identifies the clicked save element.",
          "The click bubbles with save as target, while currentTarget identifies the actions listener element.",
          "The click requires capture mode to reach the actions listener from its child save element."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-polyfills-l1-s2-q21",
      "topicId": "js-polyfills",
      "set": 2,
      "environment": "node",
      "code": "function myMap(items, transform) {\n  const mapped = [];\n  for (let index = 0; index < items.length; index += 1) {\n    mapped.push(transform(items[index]));\n  }\n  return mapped;\n}\nconst ropeLengths = myMap([2, 4, 6], length => length * 3);\nconsole.log(ropeLengths.join(\",\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "6,12,18"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This helper returns the callback function instead of an array built from its results.",
          "This helper builds a new array by retaining input elements with truthy callback results.",
          "This helper changes the input array by replacing its elements with the callback results.",
          "This helper builds a new array by storing the callback result for the input elements."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-values-types-l1-s3-q01",
      "topicId": "js-values-types",
      "set": 3,
      "environment": "node",
      "code": "const seatLabel = \"5\";\nconsole.log(seatLabel + 2);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "52"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The plus operator joins string representations when one operand is a string value.",
          "The plus operator raises a type error when its operands have different value types.",
          "The plus operator returns the left string operand without using the right operand.",
          "The plus operator adds numeric values when one operand contains numeric string text."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-truthy-logical-l1-s3-q02",
      "topicId": "js-truthy-logical",
      "set": 3,
      "environment": "node",
      "code": "const gateOpen = false;\nfunction ringBell() {\n  console.log(\"bell\");\n  return \"entry\";\n}\nconsole.log(gateOpen && ringBell());",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "false"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Logical AND skips the right operand when the left operand has a truthy value.",
          "Logical AND evaluates and returns the right operand when the left operand is falsy.",
          "Logical AND evaluates both of its operands before returning the falsy left operand.",
          "Logical AND returns the falsy left operand without evaluating the right operand."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-variables-scope-l1-s3-q03",
      "topicId": "js-variables-scope",
      "set": 3,
      "environment": "node",
      "code": "const cabinCode = \"A7\";\ntry {\n  cabinCode = \"B8\";\n} catch (problem) {\n  console.log(problem.name);\n}",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "TypeError"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "A const binding accepts reassignment when the assignment is inside a try block.",
          "A const binding rejects reassignment, causing a runtime error caught by this catch.",
          "A const binding discards reassignment, continuing execution without raising an error.",
          "A const binding accepts reassignment when the replacement has the same value type."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-hoisting-l1-s3-q04",
      "topicId": "js-hoisting",
      "set": 3,
      "environment": "node",
      "code": "console.log(describeTrail());\nfunction describeTrail() {\n  return \"gravel\";\n}",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "gravel"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The function declaration makes the function callable before execution reaches its line.",
          "The function declaration produces undefined when invoked before execution reaches its line.",
          "The function declaration executes the function body during the creation of its scope.",
          "The function declaration leaves the function unavailable until execution reaches its line."
        ],
        "correct": 0
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The function declaration is available before the first statement runs.",
          "The first statement calls describeTrail.",
          "The function returns gravel, which console.log prints."
        ],
        "modelAnswer": "The function declaration is made available before the statements run. The first statement calls describeTrail even though its declaration is written below. The function returns the string gravel. console.log prints that returned string."
      }
    },
    {
      "id": "js-operators-equality-l1-s3-q05",
      "topicId": "js-operators-equality",
      "set": 3,
      "environment": "node",
      "code": "const firstEnvelope = { size: \"small\" };\nconst secondEnvelope = { size: \"small\" };\nconsole.log(firstEnvelope === secondEnvelope);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "false"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Strict equality compares the property counts of the objects rather than their identity.",
          "Strict equality compares the property names of the objects rather than their identity.",
          "Strict equality compares the identity of the objects rather than their matching contents.",
          "Strict equality compares the property values of the objects rather than their identity."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-control-flow-l1-s3-q06",
      "topicId": "js-control-flow",
      "set": 3,
      "environment": "node",
      "code": "const windSpeed = 18;\nif (windSpeed > 30) {\n  console.log(\"strong\");\n} else if (windSpeed > 10) {\n  console.log(\"steady\");\n} else {\n  console.log(\"calm\");\n}",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "steady"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The if chain checks conditions backward and runs the last branch whose condition is truthy.",
          "The if chain checks conditions in order and runs matching branches plus the final else branch.",
          "The if chain checks conditions in order and runs the first branch whose condition is truthy.",
          "The if chain checks the first condition and goes to else without testing the else-if condition."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-functions-l1-s3-q07",
      "topicId": "js-functions",
      "set": 3,
      "environment": "node",
      "code": "const doubleRibbon = length => length * 2;\nconsole.log(doubleRibbon(6));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "12"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The arrow function changes the caller's input variable through its expression body.",
          "The arrow function returns the value of its expression body without a return keyword.",
          "The arrow function discards its expression value because the return keyword is missing.",
          "The arrow function returns its first argument instead of evaluating its expression body."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-objects-l1-s3-q08",
      "topicId": "js-objects",
      "set": 3,
      "environment": "node",
      "code": "const vase = { color: \"white\" };\nvase.material = \"clay\";\nconsole.log(vase.material);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "clay"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Dot assignment rejects the missing property because the literal did not declare it.",
          "Dot assignment rejects the missing property because const prevents adding new object properties.",
          "Dot assignment adds the missing property, which requires brackets for later reading.",
          "Dot assignment adds the missing property, which later dot access can read by name."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-arrays-l1-s3-q09",
      "topicId": "js-arrays",
      "set": 3,
      "environment": "node",
      "code": "const crateWeights = [2, 5, 3];\nconst shipmentWeight = crateWeights.reduce((weight, crate) => weight + crate, 0);\nconsole.log(shipmentWeight);",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "10"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The reduce method uses the returned callback value as the accumulator for the next step.",
          "The reduce method collects the returned callback values into a new array as its result.",
          "The reduce method runs the callback once with the first and last items as its arguments.",
          "The reduce method replaces the source array items with the current accumulator during traversal."
        ],
        "correct": 0
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The initial accumulator is zero.",
          "The callback adds each crate weight to the running accumulator.",
          "The accumulator becomes 2, then 7, then 10.",
          "reduce returns 10, which is stored and printed."
        ],
        "modelAnswer": "reduce starts with an accumulator of zero. It adds each crate weight in array order. The running weight becomes 2, then 7, then 10. reduce returns the final weight, and console.log prints it."
      }
    },
    {
      "id": "js-currying-compose-l1-s3-q10",
      "topicId": "js-currying-compose",
      "set": 3,
      "environment": "node",
      "code": "const addBorder = border => width => border + width;\nconst withFrame = addBorder(4);\nconsole.log(withFrame(9));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "13"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The first call returns a function whose later argument replaces the saved border value.",
          "The first call returns a function that needs both arguments supplied again for addition.",
          "The first call returns a number that can be called again to perform the later addition.",
          "The first call returns a function that retains the first argument for the later addition."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-async-await-l1-s3-q11",
      "topicId": "js-async-await",
      "set": 3,
      "environment": "node",
      "code": "async function checkLocker() {\n  try {\n    await Promise.reject(\"locked\");\n    console.log(\"available\");\n  } catch (reason) {\n    console.log(reason);\n  }\n}\ncheckLocker();",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "locked"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The awaited rejection runs the remaining try statements before transferring control to the catch block.",
          "The awaited rejection throws at await and transfers control to the enclosing catch block.",
          "The awaited rejection becomes a normal value and continues with the rest of the try block.",
          "The awaited rejection leaves the async function without entering the catch block that surrounds await."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-event-loop-l1-s3-q12",
      "topicId": "js-event-loop",
      "set": 3,
      "environment": "node",
      "code": "queueMicrotask(() => {\n  console.log(\"fold\");\n  queueMicrotask(() => console.log(\"seal\"));\n});\nconsole.log(\"paper\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "paper\nfold\nseal"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Microtasks wait for a timer callback, and nested microtasks require a further timer callback.",
          "Microtasks run after the current script, and nested microtasks are discarded on registration.",
          "Microtasks run after the current script, and nested microtasks join the pending queue.",
          "Microtasks interrupt the current script, and nested microtasks interrupt the outer callback."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-timers-l1-s3-q13",
      "topicId": "js-timers",
      "set": 3,
      "environment": "node",
      "code": "const reminderTimer = setTimeout(() => console.log(\"water plants\"), 10);\nclearTimeout(reminderTimer);\nconsole.log(\"reminder canceled\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "reminder canceled"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The clearTimeout call cancels pending callbacks associated with handles other than the supplied one.",
          "The clearTimeout call invokes the pending callback before removing the supplied timer handle.",
          "The clearTimeout call postpones the pending callback until a different timer callback runs.",
          "The clearTimeout call cancels the pending callback associated with the supplied timer handle."
        ],
        "correct": 3
      }
    },
    {
      "id": "js-promise-combinators-l1-s3-q14",
      "topicId": "js-promise-combinators",
      "set": 3,
      "environment": "node",
      "code": "const tentCheck = Promise.resolve(\"packed\");\nconst stoveCheck = Promise.reject(\"missing\");\nPromise.allSettled([tentCheck, stoveCheck]).then(checks => {\n  console.log(checks[0].status, checks[0].value);\n  console.log(checks[1].status, checks[1].reason);\n});",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "fulfilled packed\nrejected missing"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The combined promise collects fulfilled and rejected outcomes in their settlement order.",
          "The combined promise rejects when an input rejects instead of collecting the input outcomes.",
          "The combined promise collects fulfilled outcomes while dropping the rejected input outcomes.",
          "The combined promise collects fulfilled and rejected outcomes in the supplied input order."
        ],
        "correct": 3
      },
      "partC": {
        "ask": "Explain, step by step, what happens when this code runs.",
        "keyPoints": [
          "The tent promise fulfills with packed and the stove promise rejects with missing.",
          "allSettled waits for all inputs and fulfills with an array of outcome objects.",
          "The array keeps input order; fulfilled outcomes have value and rejected ones have reason.",
          "The handler prints each outcome's status and its value or reason."
        ],
        "modelAnswer": "The tent promise fulfills with packed, and the stove promise rejects with missing. allSettled waits for the inputs and fulfills with their outcome objects in input order. The first object has a status and a value, while the second has a status and a reason. The handler prints fulfilled packed, then rejected missing."
      }
    },
    {
      "id": "js-debounce-throttle-l1-s3-q15",
      "topicId": "js-debounce-throttle",
      "set": 3,
      "environment": "node",
      "code": "let coolingDown = false;\nfunction announceStop(stop) {\n  if (coolingDown) return;\n  coolingDown = true;\n  console.log(stop);\n  setTimeout(() => { coolingDown = false; }, 10);\n}\nannounceStop(\"pier\");\nannounceStop(\"market\");",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "pier"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This throttle replaces a pending call and restarts its cooldown when another call arrives.",
          "This throttle schedules incoming calls separately to run after their own cooldown delays.",
          "This throttle runs the accepted call at once and skips calls received during its cooldown.",
          "This throttle queues skipped calls and replays them together when its cooldown finishes."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-fetch-abort-l1-s3-q16",
      "topicId": "js-fetch-abort",
      "set": 3,
      "environment": "node",
      "code": "const uploadController = new AbortController();\nuploadController.signal.addEventListener(\"abort\", () => {\n  console.log(\"upload canceled\");\n});\nuploadController.abort();",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "upload canceled"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "Calling abort dispatches the abort event on the controller object rather than its signal.",
          "Calling abort postpones the abort event on the signal until a fetch request has completed.",
          "Calling abort dispatches the abort event on the signal object belonging to the controller.",
          "Calling abort postpones the abort event on the signal until code reads the signal later."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-dom-l1-s3-q17",
      "topicId": "js-dom",
      "set": 3,
      "environment": "browser",
      "html": "<!doctype html><html><head><title>Weather badge</title></head><body><div id=\"weather\" class=\"badge\"></div></body></html>",
      "code": "const weatherBadge = document.querySelector(\"#weather\");\nweatherBadge.classList.add(\"sunny\");\nconsole.log(weatherBadge.classList.contains(\"sunny\"));\nconsole.log(weatherBadge.classList.contains(\"badge\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "true\ntrue"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The classList.add method adds sunny to a detached copy while leaving the element unchanged.",
          "The classList.add method adds sunny to the element while retaining the existing badge class.",
          "The classList.add method changes the element ID to sunny while retaining its badge class.",
          "The classList.add method replaces the existing badge class with the supplied sunny class."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-dom-events-l1-s3-q18",
      "topicId": "js-dom-events",
      "set": 3,
      "environment": "browser",
      "html": "<!doctype html><html><head><title>Reading link</title></head><body><a id=\"chapter\" href=\"#next\">Next chapter</a></body></html>",
      "code": "const chapterLink = document.querySelector(\"#chapter\");\nchapterLink.addEventListener(\"click\", event => {\n  event.preventDefault();\n  console.log(event.defaultPrevented);\n});\nchapterLink.click();",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "true"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The preventDefault call postpones the default action until the event listeners finish running.",
          "The preventDefault call stops the event from bubbling and leaves the default action enabled.",
          "The preventDefault call cancels the cancelable default action and sets defaultPrevented to true.",
          "The preventDefault call removes the registered click listener and leaves the defaultPrevented flag unchanged."
        ],
        "correct": 2
      }
    },
    {
      "id": "js-web-storage-l1-s3-q19",
      "topicId": "js-web-storage",
      "set": 3,
      "environment": "browser",
      "html": "<!doctype html><html><head><title>Reading preference</title></head><body></body></html>",
      "code": "localStorage.setItem(\"readingSize\", \"large\");\nlocalStorage.setItem(\"readingSize\", \"medium\");\nconsole.log(localStorage.getItem(\"readingSize\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "medium"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The second setItem replaces the stored string, so getItem returns the replacement value.",
          "The second setItem queues another stored string, so getItem removes and returns the oldest.",
          "The second setItem appends to the stored string, so getItem returns the combined value.",
          "The second setItem preserves the stored string, so getItem returns the original value."
        ],
        "correct": 0
      }
    },
    {
      "id": "js-polyfills-l1-s3-q20",
      "topicId": "js-polyfills",
      "set": 3,
      "environment": "node",
      "code": "function myFilter(pieces, keep) {\n  const selected = [];\n  for (const piece of pieces) {\n    if (keep(piece)) selected.push(piece);\n  }\n  return selected;\n}\nconst longBoards = myFilter([3, 8, 2, 6], board => board > 5);\nconsole.log(longBoards.join(\",\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "8,6"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "This helper builds a new array of callback results instead of the matching source items.",
          "This helper builds a new array of source items that produce truthy callback results.",
          "This helper removes failing items from the source array instead of building a new array.",
          "This helper returns the first source item that produces a truthy callback result."
        ],
        "correct": 1
      }
    },
    {
      "id": "js-array-utilities-l1-s3-q21",
      "topicId": "js-array-utilities",
      "set": 3,
      "environment": "node",
      "code": "const drawerContents = [[\"pen\", \"clip\"], [\"tape\"]];\nconst supplies = drawerContents.flat();\nconsole.log(supplies.join(\",\"));",
      "partA": {
        "ask": "What does this print?",
        "accepted": [
          "pen,clip,tape"
        ]
      },
      "partB": {
        "ask": "Which statement describes why it prints that?",
        "options": [
          "The flat method uses a default depth of one, creating a new array with one level removed.",
          "The flat method joins the nested items into a string, producing text instead of a new array.",
          "The flat method takes the first item from the nested arrays, creating a new array of those items.",
          "The flat method removes duplicate values from the nested arrays, creating a new array of unique items."
        ],
        "correct": 0
      }
    }
  ],
};
