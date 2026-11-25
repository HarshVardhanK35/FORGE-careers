// The JavaScript topic notes (38 topics, in the order of data/roadmap.ts).
// Written with Codex from the prompts in FORGE/prompts, then checked: every code example was run and every fact read.
// A correction is made here, in the data, with no change to the code.

import type { TopicNotes } from "./types";

export const JAVASCRIPT_NOTES: TopicNotes[] = [
  {
    "topicId": "js-values-types",
    "summary": "A value is a piece of data, and a type tells JavaScript how to treat it. Types matter because an operation can produce different results for text, numbers, and other values.",
    "explanation": [
      {
        "heading": "Values first",
        "points": [
          "A value is one piece of information, such as 12, \"tea\", or true. JavaScript code reads values and combines them to do work.",
          "A type is the category of a value. It is like a label on a storage box that tells JavaScript what is inside.",
          "The primitive types are string, number, bigint, boolean, undefined, symbol, and null. An object is the remaining main type and can hold related values.",
          "A string is text in quotes, a number is numeric data, and a boolean is true or false. Use typeof to ask JavaScript for a value's type."
        ]
      },
      {
        "heading": "Names can change",
        "points": [
          "JavaScript is dynamically typed: a variable name is not permanently one type. The value currently stored in it has the type.",
          "A variable is a named place for a value, like a labelled cup. The cup can first hold a number and later hold text.",
          "undefined means a variable has no assigned value yet. null is a value you deliberately use to say there is no object or value here.",
          "typeof null is \"object\" because of a long-standing language quirk. Test null with value === null instead."
        ]
      },
      {
        "heading": "Conversion",
        "points": [
          "Type coercion means JavaScript automatically changes a value's type for an operation. It is like a cashier reading a price label in a format it can use.",
          "With +, if either operand becomes a string, JavaScript joins text. With -, *, and /, JavaScript usually tries to make numbers.",
          "Number(\"12\") makes the number 12, String(12) makes text, and Boolean(value) makes true or false. Explicit conversion makes intent clearer.",
          "NaN means an invalid numeric result, such as Number(\"tea\"). NaN is still a number type, and Number.isNaN checks it safely."
        ]
      },
      {
        "heading": "Use predictable values",
        "points": [
          "Prefer clear conversions at program boundaries, such as turning form text into a number. Do not rely on a surprising automatic conversion.",
          "Template literals, written with backticks, intentionally turn embedded values into text. They are useful for readable messages.",
          "Objects and arrays are reference values: a variable holds a reference, or route, to the same object. Primitive values are used directly.",
          "In the code, Number changes the text price before multiplication, so the result is numeric instead of joined text."
        ]
      }
    ],
    "terms": [
      {
        "term": "value",
        "meaning": "A single piece of data used by a program."
      },
      {
        "term": "type",
        "meaning": "A category that describes how JavaScript treats a value."
      },
      {
        "term": "primitive",
        "meaning": "A simple value that is not an object."
      },
      {
        "term": "coercion",
        "meaning": "An automatic type conversion done by JavaScript."
      },
      {
        "term": "NaN",
        "meaning": "A number value that represents an invalid numeric result."
      }
    ],
    "examples": [
      {
        "title": "Text becomes a number",
        "environment": "node",
        "code": "const text = '8';\nconst total = Number(text) * 2;\nconsole.log(total);",
        "walkthrough": [
          "Step 1: text stores the string '8'.",
          "Step 2: Number converts that text to 8, then multiplication produces 16.",
          "Step 3: console.log prints total.",
          "Step 4: The output is 16."
        ],
        "output": "16"
      },
      {
        "title": "A parsed order",
        "environment": "node",
        "code": "const order = { quantity: '3', price: '4.50' };\nconst quantity = Number(order.quantity);\nconst price = Number(order.price);\nconst cost = quantity * price;\nconsole.log(`Cost: ${cost}`);",
        "walkthrough": [
          "Step 1: order stores two text values from an outside source.",
          "Step 2: Number converts quantity into a numeric value.",
          "Step 3: Number converts price into a numeric value.",
          "Step 4: Multiplication calculates cost as 13.5.",
          "Step 5: The template literal prints the readable result.",
          "Step 6: The output is Cost: 13.5."
        ],
        "output": "Cost: 13.5"
      }
    ],
    "keyPoints": [
      "Every value has a type.",
      "Variables can hold values of different types over time.",
      "+ can join text while arithmetic operators often coerce to numbers.",
      "Use explicit conversion when input type matters.",
      "Check null with === null."
    ],
    "commonMistakes": [
      "Expecting '2' + 2 to produce 4.",
      "Treating null and undefined as exactly the same value.",
      "Using global isNaN when Number.isNaN is the intended check."
    ],
    "links": [
      {
        "title": "Data types",
        "url": "https://javascript.info/types",
        "kind": "article",
        "language": "English",
        "why": "It introduces each JavaScript type with small examples."
      }
    ]
  },
  {
    "topicId": "js-truthy-logical",
    "summary": "Every value acts as true or false in a condition, and logical operators combine or choose values. Short-circuit evaluation can skip work when the answer is already known.",
    "explanation": [
      {
        "heading": "Boolean context",
        "points": [
          "A boolean is the value true or false. A condition is code that needs a yes-or-no answer, such as an if test.",
          "Truthy means a value behaves like true in a condition; falsy means it behaves like false. Think of a door sensor: any real object triggers it, while an empty signal does not.",
          "The falsy values are false, 0, -0, 0n, \"\", null, undefined, and NaN. Every other value, including [] and {}, is truthy.",
          "Boolean(value) shows the boolean version of a value. Use it when you need an actual true or false value."
        ]
      },
      {
        "heading": "Three logical tools",
        "points": [
          "! means NOT and returns the opposite boolean. !!value is a common way to coerce a value to boolean.",
          "&& means AND. It returns the first falsy operand, or the last operand when all are truthy.",
          "|| means OR. It returns the first truthy operand, or the last operand when all are falsy.",
          "?? means nullish coalescing. It returns its right side only when the left side is null or undefined, not when it is 0 or an empty string."
        ]
      },
      {
        "heading": "Stopping early",
        "points": [
          "Short-circuit evaluation means an operator stops when its result is decided. Like checking an empty ticket first, there is no reason to check later tickets.",
          "false && work() never calls work because AND already has a falsy answer. true || work() also skips work because OR already has a truthy answer.",
          "This can safely guard property access, as user && user.name. Optional chaining, user?.name, is often clearer for that specific job.",
          "Do not put required side effects on an operand that might be skipped. A side effect is a change outside the returned value, such as logging or assigning."
        ]
      },
      {
        "heading": "Choose the right default",
        "points": [
          "Use || when every falsy value should mean use the fallback. Use ?? when 0, false, or \"\" are valid values to keep.",
          "In the code, retries is 0, which is a real setting, so ?? keeps the 0. The name is null (missing), so ?? uses Guest instead. Only a missing value triggers the fallback.",
          "Parentheses make mixed logical expressions easier to read. JavaScript does not allow mixing ?? with && or || without parentheses.",
          "A condition can use truthiness, but compare directly when a particular value is required."
        ]
      }
    ],
    "terms": [
      {
        "term": "boolean",
        "meaning": "A value that is either true or false."
      },
      {
        "term": "truthy",
        "meaning": "A value that acts like true in a condition."
      },
      {
        "term": "falsy",
        "meaning": "A value that acts like false in a condition."
      },
      {
        "term": "short-circuit evaluation",
        "meaning": "Stopping an expression once later operands cannot change its result."
      },
      {
        "term": "nullish",
        "meaning": "Specifically null or undefined."
      }
    ],
    "examples": [
      {
        "title": "A simple fallback",
        "environment": "node",
        "code": "const label = '';\nconsole.log(label || 'Untitled');",
        "walkthrough": [
          "Step 1: label stores an empty string, which is falsy.",
          "Step 2: OR chooses the first truthy value, so it prints the fallback.",
          "Step 3: The output is Untitled."
        ],
        "output": "Untitled"
      },
      {
        "title": "Keep a zero setting",
        "environment": "node",
        "code": "const settings = { retries: 0, name: null };\nconst retries = settings.retries ?? 3;\nconst name = settings.name ?? 'Guest';\nconsole.log(`Retries: ${retries}`);\nconsole.log(`Name: ${name}`);",
        "walkthrough": [
          "Step 1: settings has a valid zero and a null name.",
          "Step 2: ?? keeps 0 because zero is not nullish.",
          "Step 3: ?? replaces null with Guest.",
          "Step 4: The first log prints retries.",
          "Step 5: The second log prints name.",
          "Step 6: The output has the two shown lines."
        ],
        "output": "Retries: 0\nName: Guest"
      }
    ],
    "keyPoints": [
      "Only eight values are falsy.",
      "&& and || return operands, not always booleans.",
      "Operators can skip later operands.",
      "Use ?? when zero and empty text are valid.",
      "Avoid skipped required side effects."
    ],
    "commonMistakes": [
      "Assuming empty arrays and objects are falsy.",
      "Using || for a numeric setting that can be zero.",
      "Expecting the right side of && or || to always run."
    ],
    "links": [
      {
        "title": "Logical operators",
        "url": "https://javascript.info/logical-operators",
        "kind": "article",
        "language": "English",
        "why": "It explains operand results and short-circuiting step by step."
      }
    ]
  },
  {
    "topicId": "js-variables-scope",
    "summary": "Variables give values names, while scope controls where those names can be used. let and const are block-scoped; var has older function-scoped behavior.",
    "explanation": [
      {
        "heading": "Named storage",
        "points": [
          "A variable is a named place that stores a value. It is like a labelled drawer where code can find information later.",
          "A declaration creates the name with let, const, or var. An assignment puts a new value into an existing name.",
          "Use const by default because its name cannot be reassigned. Use let when the name must point to another value later.",
          "const does not freeze an object; it only fixes the variable's reference. Object properties can still change."
        ]
      },
      {
        "heading": "Where names exist",
        "points": [
          "Scope is the part of a program where a name is available. A block is code between braces, such as an if statement or loop body.",
          "let and const are block-scoped, so names declared in a block are not available outside it. This prevents accidental reuse.",
          "A function creates its own scope for local names and parameters. Code inside can read names from surrounding scopes unless a nearer name shadows them.",
          "Shadowing means an inner declaration uses the same name as an outer declaration. It is legal but can make code harder to follow."
        ]
      },
      {
        "heading": "The older var",
        "points": [
          "var is function-scoped, not block-scoped. A var declared inside an if block is still available throughout the containing function.",
          "var declarations are processed early and read as undefined before their assignment. let and const cannot be read before their declaration executes.",
          "That protected period is called the temporal dead zone, meaning the time before a let or const declaration runs. Reading the name then throws an error.",
          "Avoid var in new code unless you are maintaining older code. let and const match braces more predictably."
        ]
      },
      {
        "heading": "Practical choices",
        "points": [
          "Keep declarations near their first use, so the labelled drawer is easy to find. Use descriptive names that say what the value means.",
          "A loop counter commonly uses let because each iteration has a block-scoped value. That is safer for callbacks created in the loop.",
          "In the code, discount exists only inside the if block, while total remains available after the block. The braces are the drawer's boundary.",
          "Do not declare accidental globals by assigning to an undeclared name; modules and strict mode reject this mistake."
        ]
      }
    ],
    "terms": [
      {
        "term": "variable",
        "meaning": "A named place that holds a value."
      },
      {
        "term": "declaration",
        "meaning": "A statement that creates a variable name."
      },
      {
        "term": "assignment",
        "meaning": "Putting a value into an existing variable."
      },
      {
        "term": "scope",
        "meaning": "The region of code where a name can be used."
      },
      {
        "term": "shadowing",
        "meaning": "An inner variable hiding an outer variable with the same name."
      },
      {
        "term": "temporal dead zone",
        "meaning": "The time before a let or const declaration executes when it cannot be read."
      }
    ],
    "examples": [
      {
        "title": "A changing counter",
        "environment": "node",
        "code": "let count = 1;\ncount = count + 1;\nconsole.log(count);",
        "walkthrough": [
          "Step 1: count is declared with 1.",
          "Step 2: count is reassigned to 2.",
          "Step 3: The log prints count.",
          "Step 4: The output is 2."
        ],
        "output": "2"
      },
      {
        "title": "A block boundary",
        "environment": "node",
        "code": "const price = 100;\nlet total = price;\nif (price >= 100) {\n  const discount = 10;\n  total = price - discount;\n}\nconsole.log(total);",
        "walkthrough": [
          "Step 1: price is declared outside the block.",
          "Step 2: total starts with price.",
          "Step 3: The condition is true, so the block runs.",
          "Step 4: discount is declared only for this block.",
          "Step 5: total is reassigned using discount.",
          "Step 6: The block ends and discount is no longer available.",
          "Step 7: The log prints total.",
          "Step 8: The output is 90."
        ],
        "output": "90"
      }
    ],
    "keyPoints": [
      "Prefer const, then let when reassignment is needed.",
      "let and const use block scope.",
      "var uses function scope.",
      "const prevents reassignment, not object mutation.",
      "Names from inner scope can shadow outer names."
    ],
    "commonMistakes": [
      "Trying to reassign a const variable.",
      "Expecting a let variable from a block to exist outside it.",
      "Using var in a block and expecting it to stay in that block."
    ],
    "links": [
      {
        "title": "Variables",
        "url": "https://javascript.info/variables",
        "kind": "article",
        "language": "English",
        "why": "It starts with named storage before modern declaration rules."
      }
    ]
  },
  {
    "topicId": "js-hoisting",
    "summary": "Hoisting describes how declarations are processed before code runs in their scope. It matters because var, let, const, and function declarations behave differently before their written line.",
    "explanation": [
      {
        "heading": "Read it in order",
        "points": [
          "JavaScript runs statements in order, but it first prepares declarations for a scope. This preparation is commonly called hoisting.",
          "Hoisting does not mean the source code physically moves upward; it is a model for explaining early availability.",
          "A declaration creates a name, while an assignment puts a value into that name.",
          "Knowing the declaration kind lets you predict whether an early read works, returns undefined, or throws."
        ]
      },
      {
        "heading": "Function and var",
        "points": [
          "A function declaration can be called before its written line because its function value is prepared for the whole scope.",
          "A var declaration is prepared at the start of its function scope with the value undefined.",
          "Only the var name is prepared early; its later assignment still happens where it is written.",
          "That is why an early var log can hide a typo: undefined may look like a real but missing result."
        ]
      },
      {
        "heading": "let and const",
        "points": [
          "let and const names are also prepared for their block, but cannot be used before their declaration executes.",
          "The temporal dead zone, or TDZ, is the time from entering that block until the let or const declaration runs.",
          "Trying to read a TDZ name throws a ReferenceError instead of returning undefined.",
          "The TDZ ends at the declaration line, even when the initial value is undefined."
        ]
      },
      {
        "heading": "Safer habits",
        "points": [
          "A block is code inside braces, such as an if body; let and const belong to that block.",
          "Declare values close to their first use so readers do not need hoisting rules to follow the code.",
          "Prefer const when the variable name will not be reassigned, and let when it will.",
          "Treat an early reference error as a helpful signal to rearrange the program rather than a rule to work around."
        ]
      }
    ],
    "terms": [
      {
        "term": "hoisting",
        "meaning": "The early preparation of declarations within their scope."
      },
      {
        "term": "declaration",
        "meaning": "Code that introduces a name, such as let total."
      },
      {
        "term": "assignment",
        "meaning": "Code that puts a value into an existing name."
      },
      {
        "term": "function scope",
        "meaning": "The region inside one function where var belongs."
      },
      {
        "term": "temporal dead zone",
        "meaning": "The period before a let or const declaration executes when its name cannot be used."
      }
    ],
    "examples": [
      {
        "title": "var has an early name",
        "environment": "node",
        "code": "console.log(score);\nvar score = 10;\nconsole.log(score);",
        "walkthrough": [
          "Step 1: var score is prepared with undefined before the first line runs.",
          "Step 2: The first log prints undefined.",
          "Step 3: The assignment stores 10, so the second log prints 10."
        ],
        "output": "undefined\n10"
      },
      {
        "title": "Function declaration first",
        "environment": "node",
        "code": "console.log(add(2, 3));\nfunction add(left, right) {\n  return left + right;\n}\nconst answer = add(4, 5);\nconsole.log(answer);",
        "walkthrough": [
          "Step 1: The function declaration is available before its written line.",
          "Step 2: The first call returns 5.",
          "Step 3: The later call returns 9 and the final log prints it."
        ],
        "output": "5\n9"
      }
    ],
    "keyPoints": [
      "Hoisting is declaration preparation, not code movement.",
      "Function declarations are callable early.",
      "var reads as undefined before assignment.",
      "let and const throw in their TDZ.",
      "Assignments are not hoisted."
    ],
    "commonMistakes": [
      "Expecting let before its declaration to behave like var.",
      "Saying a var assignment is hoisted along with its declaration.",
      "Using a value before declaration and hiding the bug with hoisting."
    ],
    "links": [
      {
        "title": "The old var",
        "url": "https://javascript.info/var",
        "kind": "article",
        "language": "English",
        "why": "It contrasts var behavior with modern declarations."
      }
    ]
  },
  {
    "topicId": "js-operators-equality",
    "summary": "Operators calculate, compare, or assign values. Strict equality is usually the safest equality test because it does not convert types.",
    "explanation": [
      {
        "heading": "Operators do work",
        "points": [
          "An operator is a symbol or word that works with values. + adds or joins, while = assigns a value to a variable.",
          "An operand is a value an operator uses. In 2 + 3, 2 and 3 are operands and + is the operator.",
          "Arithmetic operators include +, -, *, /, %, and **. % gives the remainder, and ** raises a number to a power.",
          "Comparison operators such as >, <, >=, and <= return booleans. They are useful in conditions and loops."
        ]
      },
      {
        "heading": "Equality choices",
        "points": [
          "=== is strict equality: it checks both type and value without converting either operand. This is the normal choice.",
          "== is loose equality: it tries type coercion before comparing. This can make unlike-looking values compare equal.",
          "For example, '5' == 5 is true but '5' === 5 is false. The values look similar after conversion, but their types differ.",
          "!== and != are the matching not-equal operators. Prefer !== for the same predictable reason as ===."
        ]
      },
      {
        "heading": "Objects differ",
        "points": [
          "Primitive values compare by their value, so two separate strings with the same characters are strictly equal. Objects compare by reference.",
          "A reference is the route to an object in memory, like a library card pointing to one book. Two object literals create two different routes.",
          "Two variables are strictly equal for objects only when they hold the same reference. Changing an object through either route changes that shared object.",
          "To compare object contents, write or use a deliberate comparison suited to the data; === does not inspect every property."
        ]
      },
      {
        "heading": "Read expressions safely",
        "points": [
          "Operator precedence is the order JavaScript uses when several operators appear together. Parentheses explicitly choose an order and help readers.",
          "Use parentheses when an expression mixes arithmetic, comparisons, and logical operators. Clear code beats relying on a remembered precedence table.",
          "In the code, === confirms that a parsed number is the expected numeric value. It does not accept text by accident.",
          "Never use = inside a comparison by mistake; = changes a variable, while === tests it."
        ]
      }
    ],
    "terms": [
      {
        "term": "operator",
        "meaning": "A symbol or keyword that performs an operation on values."
      },
      {
        "term": "operand",
        "meaning": "A value used by an operator."
      },
      {
        "term": "strict equality",
        "meaning": "Equality that requires the same type and value without conversion."
      },
      {
        "term": "loose equality",
        "meaning": "Equality that can convert values before comparing them."
      },
      {
        "term": "reference",
        "meaning": "A route a variable uses to reach an object."
      }
    ],
    "examples": [
      {
        "title": "Strict versus loose",
        "environment": "node",
        "code": "console.log('5' == 5);\nconsole.log('5' === 5);",
        "walkthrough": [
          "Step 1: Loose equality converts before comparing, so the first log prints true.",
          "Step 2: Strict equality sees a string and number, so the second log prints false.",
          "Step 3: The output has true then false."
        ],
        "output": "true\nfalse"
      },
      {
        "title": "Validate a numeric score",
        "environment": "node",
        "code": "const rawScore = '80';\nconst score = Number(rawScore);\nconst passed = score >= 60 && score === 80;\nconsole.log(passed);",
        "walkthrough": [
          "Step 1: rawScore stores text from input.",
          "Step 2: Number converts it to a number.",
          "Step 3: The comparisons both return true, so AND returns true.",
          "Step 4: The log prints passed.",
          "Step 5: The output is true."
        ],
        "output": "true"
      }
    ],
    "keyPoints": [
      "= assigns; === compares strictly.",
      "Prefer === and !== in application code.",
      "== may coerce different types.",
      "Comparisons return booleans.",
      "Objects compare by reference, not matching contents."
    ],
    "commonMistakes": [
      "Writing = when a comparison was intended.",
      "Using == and being surprised by coercion.",
      "Expecting two separate object literals to be ===."
    ],
    "links": [
      {
        "title": "Comparisons",
        "url": "https://javascript.info/comparison",
        "kind": "article",
        "language": "English",
        "why": "It builds from basic comparisons to equality rules."
      }
    ]
  },
  {
    "topicId": "js-control-flow",
    "summary": "Control flow chooses which statements run and how often they repeat. Conditions and loops let a program react to data instead of only running top to bottom.",
    "explanation": [
      {
        "heading": "Choose a path",
        "points": [
          "Control flow is the order in which a program runs statements. By default, code runs from top to bottom.",
          "An if statement runs a block when its condition is truthy. Think of a route sign: the condition chooses which road code takes.",
          "else provides the path when the if condition is falsy. else if adds another condition before the final fallback.",
          "Use a clear boolean condition instead of deeply nested choices where possible. Early returns in functions can reduce nesting."
        ]
      },
      {
        "heading": "Many fixed choices",
        "points": [
          "A switch statement compares one expression with case values using strict equality. It can be clearer than many equality checks against the same value.",
          "break exits the switch after a matching case. Without break, execution falls through into the next case.",
          "default is the fallback when no case matches. Put it deliberately rather than assuming every input is known.",
          "Use switch for a small fixed set of exact options; use if when conditions need ranges or different comparisons."
        ]
      },
      {
        "heading": "Repeat safely",
        "points": [
          "A loop repeats code. A for loop groups setup, a condition, and an update in one line.",
          "A while loop repeats while its condition is truthy. A do...while loop runs its body once before checking its condition.",
          "for...of reads values from an iterable, such as an array or string. It is often simpler than managing an array index.",
          "A loop needs progress toward a false condition; otherwise it becomes an infinite loop and may freeze the program."
        ]
      },
      {
        "heading": "Change the route",
        "points": [
          "break exits the nearest loop or switch immediately. continue skips the rest of the current loop turn and starts the next one.",
          "Use break and continue sparingly because a well-written condition is often easier to read. They are useful for searching or skipping invalid data.",
          "In the code, continue skips an unavailable item before it reaches the total. The shopping-basket route only visits usable items.",
          "Do not change an array's length carelessly while looping through it, because positions and the stopping condition can shift."
        ]
      }
    ],
    "terms": [
      {
        "term": "control flow",
        "meaning": "The order in which a program executes statements."
      },
      {
        "term": "condition",
        "meaning": "An expression evaluated as true or false for a decision."
      },
      {
        "term": "loop",
        "meaning": "Code that repeats while following a chosen rule."
      },
      {
        "term": "iteration",
        "meaning": "One pass through a loop body."
      },
      {
        "term": "break",
        "meaning": "A statement that immediately exits the nearest loop or switch."
      },
      {
        "term": "continue",
        "meaning": "A statement that skips to the next loop iteration."
      }
    ],
    "examples": [
      {
        "title": "Choose a message",
        "environment": "node",
        "code": "const age = 18;\nif (age >= 18) {\n  console.log('Adult');\n}",
        "walkthrough": [
          "Step 1: age stores 18.",
          "Step 2: The condition is true, so the block runs.",
          "Step 3: The log prints the message.",
          "Step 4: The output is Adult."
        ],
        "output": "Adult"
      },
      {
        "title": "Add available prices",
        "environment": "node",
        "code": "const items = [5, 0, 12];\nlet total = 0;\nfor (const price of items) {\n  if (price === 0) continue;\n  total += price;\n}\nconsole.log(total);",
        "walkthrough": [
          "Step 1: items stores three prices.",
          "Step 2: total starts at zero.",
          "Step 3: The loop visits each price.",
          "Step 4: The zero price triggers continue and skips addition.",
          "Step 5: The other prices are added to total.",
          "Step 6: The loop ends.",
          "Step 7: The log prints total.",
          "Step 8: The output is 17."
        ],
        "output": "17"
      }
    ],
    "keyPoints": [
      "if chooses code from a condition.",
      "switch uses strict equality for cases.",
      "for, while, and for...of repeat work.",
      "Every loop needs a reliable stopping path.",
      "break exits and continue skips one iteration."
    ],
    "commonMistakes": [
      "Forgetting break in a switch case when fallthrough is not intended.",
      "Writing a loop whose condition never becomes false.",
      "Using for...in to get array values instead of for...of."
    ],
    "links": [
      {
        "title": "Loops: while and for",
        "url": "https://javascript.info/while-for",
        "kind": "article",
        "language": "English",
        "why": "It introduces loop forms with short, concrete examples."
      }
    ]
  },
  {
    "topicId": "js-functions",
    "summary": "Functions package reusable work behind a name or value. Parameters let callers supply data, while default and rest parameters make calls flexible.",
    "explanation": [
      {
        "heading": "Reusable recipes",
        "points": [
          "A function is a reusable set of statements. It is like a recipe: define the steps once, then run them whenever needed.",
          "A function declaration uses function name() {} and creates a named function. Its declaration is available throughout its scope.",
          "A function expression puts a function value into a variable, such as const add = function () {}. It is available after that assignment runs.",
          "Calling a function means using parentheses to run it. A function can return a value with return, ending that call."
        ]
      },
      {
        "heading": "Inputs and outputs",
        "points": [
          "A parameter is a named input inside a function. An argument is the actual value supplied at a call.",
          "A default parameter supplies a value when the corresponding argument is undefined or omitted. Passing null does not use the default.",
          "A rest parameter, written ...values, gathers remaining arguments into a real array. It must be the last parameter.",
          "Functions can return any value, including another function or an object. Without return, the result is undefined."
        ]
      },
      {
        "heading": "Arrow functions",
        "points": [
          "An arrow function is a shorter function expression, written with =>. It can have an expression body that returns that expression automatically.",
          "Arrow functions do not have their own this or arguments. They inherit this from surrounding code, which differs from regular functions.",
          "Use arrows for small callbacks and expressions. Use a regular function when you need its own this, arguments, or generator behavior.",
          "A concise arrow body returning an object needs parentheses around the object literal, so JavaScript does not read braces as a block."
        ]
      },
      {
        "heading": "Good function design",
        "points": [
          "Give a function one clear job and a descriptive verb name. Small functions are easier to test and reuse.",
          "Avoid changing unrelated outside values when a returned result will do. This makes the recipe easier to predict.",
          "In the code, ...scores gathers all supplied scores like ingredients in one bowl, then reduce adds them. The default label handles an omitted name.",
          "Validate inputs at the edge of a program when incorrect values would cause misleading results."
        ]
      }
    ],
    "terms": [
      {
        "term": "function declaration",
        "meaning": "A named function created with the function keyword."
      },
      {
        "term": "function expression",
        "meaning": "A function used as a value, often assigned to a variable."
      },
      {
        "term": "parameter",
        "meaning": "A named input in a function definition."
      },
      {
        "term": "argument",
        "meaning": "A value passed when calling a function."
      },
      {
        "term": "default parameter",
        "meaning": "A parameter value used when the argument is undefined or missing."
      },
      {
        "term": "rest parameter",
        "meaning": "A final parameter that gathers remaining arguments into an array."
      }
    ],
    "examples": [
      {
        "title": "A default greeting",
        "environment": "node",
        "code": "function greet(name = 'Guest') {\n  return `Hello, ${name}`;\n}\nconsole.log(greet());",
        "walkthrough": [
          "Step 1: greet is declared with a default name.",
          "Step 2: return builds the greeting when greet is called.",
          "Step 3: The call omits an argument, so the default is used and logged.",
          "Step 4: The output is Hello, Guest."
        ],
        "output": "Hello, Guest"
      },
      {
        "title": "Total several scores",
        "environment": "node",
        "code": "const report = (label = 'Scores', ...scores) => {\n  const total = scores.reduce((sum, score) => sum + score, 0);\n  return `${label}: ${total}`;\n};\nconsole.log(report('Round', 4, 7, 9));",
        "walkthrough": [
          "Step 1: report declares a default label and a rest array of scores.",
          "Step 2: reduce adds each score starting from zero.",
          "Step 3: return creates the final text.",
          "Step 4: The function definition ends.",
          "Step 5: The call supplies a label and three scores, then the log prints its return value.",
          "Step 6: The output is Round: 20."
        ],
        "output": "Round: 20"
      }
    ],
    "keyPoints": [
      "Functions package reusable behavior.",
      "Parameters are names; arguments are passed values.",
      "Default parameters apply only to undefined or missing arguments.",
      "Rest parameters create an array of remaining arguments.",
      "Arrow functions inherit this from outside."
    ],
    "commonMistakes": [
      "Expecting a function to return a value without return.",
      "Putting a rest parameter anywhere except last.",
      "Using an arrow function when a method needs its own this."
    ],
    "links": [
      {
        "title": "Functions",
        "url": "https://javascript.info/function-basics",
        "kind": "article",
        "language": "English",
        "why": "It begins with declarations and parameters in plain steps."
      }
    ]
  },
  {
    "topicId": "js-objects",
    "summary": "Objects group related values under named properties. Dot and bracket access retrieve those properties, while shorthand and computed keys make object creation concise.",
    "explanation": [
      {
        "heading": "A labelled cabinet",
        "points": [
          "An object stores related data as properties. A property is a key and its associated value, like a labelled drawer in a cabinet.",
          "Create an object literal with braces, such as { name: 'Asha' }. A property value can be a string, number, array, function, or another object.",
          "Objects are mutable, meaning their properties can be added, changed, or removed after creation. A const object name still allows property changes.",
          "Each property key is a string or symbol. Numeric-looking keys are converted to strings when used as ordinary property keys."
        ]
      },
      {
        "heading": "Read and write",
        "points": [
          "Dot notation, user.name, reads a property with a known identifier-like key. Bracket notation, user['name'], reads using a string expression.",
          "Bracket notation is required for keys with spaces, dashes, or a variable key. user[key] uses the current value of key, not the letters k-e-y.",
          "Reading a missing property produces undefined. Optional chaining, user?.name, stops safely when user is null or undefined.",
          "Use delete object.key to remove a property, but prefer clear data updates over frequent deletion in normal program flow."
        ]
      },
      {
        "heading": "Build keys cleanly",
        "points": [
          "Property shorthand lets { name } mean { name: name } when the key and variable name match. It reduces repeated text.",
          "A computed property key is written in brackets inside an object literal, such as { [field]: value }. JavaScript evaluates field to choose the key.",
          "A method is a function property, and method shorthand is written greet() {}. It is useful for behavior tied to an object.",
          "Object destructuring takes chosen properties into variables, such as const { name } = user. Give a new name with const { name: userName } = user."
        ]
      },
      {
        "heading": "References matter",
        "points": [
          "An object variable stores a reference, a route to the object, rather than a copied cabinet. Assigning it to another variable shares the same object.",
          "The spread syntax { ...user } makes a shallow copy: top-level properties are copied, but nested objects are still shared.",
          "In the code, [field] creates the chosen property name, and shorthand stores the title variable. The cabinet labels are created from data.",
          "Do not use dot notation when the key comes from a variable; it will look for the literal property name instead."
        ]
      }
    ],
    "terms": [
      {
        "term": "object",
        "meaning": "A value that stores related data under keys."
      },
      {
        "term": "property",
        "meaning": "A key and value stored on an object."
      },
      {
        "term": "dot notation",
        "meaning": "Property access written with a dot and known key name."
      },
      {
        "term": "computed key",
        "meaning": "A property key calculated from an expression."
      },
      {
        "term": "shorthand",
        "meaning": "A shorter object syntax that uses a variable name as its property key."
      },
      {
        "term": "reference",
        "meaning": "A route to the same object rather than a separate object copy."
      }
    ],
    "examples": [
      {
        "title": "Read a property",
        "environment": "node",
        "code": "const user = { name: 'Asha' };\nconsole.log(user.name);",
        "walkthrough": [
          "Step 1: user stores an object with a name property.",
          "Step 2: Dot notation reads that property and prints it.",
          "Step 3: The output is Asha."
        ],
        "output": "Asha"
      },
      {
        "title": "Build a dynamic record",
        "environment": "node",
        "code": "const field = 'status';\nconst title = 'Task';\nconst item = { title, [field]: 'open' };\nconsole.log(item.title);\nconsole.log(item[field]);",
        "walkthrough": [
          "Step 1: field stores the property name to calculate.",
          "Step 2: title stores a value whose name matches its future property.",
          "Step 3: shorthand creates title and the computed key creates status.",
          "Step 4: Dot notation prints the known title property.",
          "Step 5: Bracket notation uses field to print status.",
          "Step 6: The output has Task then open."
        ],
        "output": "Task\nopen"
      }
    ],
    "keyPoints": [
      "Objects store key-value properties.",
      "Use dot notation for known simple keys.",
      "Use brackets for dynamic or unusual keys.",
      "Shorthand copies a matching variable name into an object.",
      "Object assignments can share one reference."
    ],
    "commonMistakes": [
      "Using object.key when key is a variable.",
      "Thinking const makes an object's properties immutable.",
      "Expecting a spread copy to deeply copy nested objects."
    ],
    "links": [
      {
        "title": "Objects",
        "url": "https://javascript.info/object",
        "kind": "article",
        "language": "English",
        "why": "It uses a cabinet comparison and introduces property access."
      }
    ]
  },
  {
    "topicId": "js-arrays",
    "summary": "Arrays hold ordered lists of values, and array methods transform, select, or inspect those lists. Knowing which methods mutate the original array prevents many bugs.",
    "explanation": [
      {
        "heading": "An ordered list",
        "points": [
          "An array is an ordered collection of values. Think of a numbered shelf: each item has a position called an index.",
          "Indexes start at 0, so the first item is array[0]. length is one more than the highest normal position and reports the list size.",
          "Arrays can hold mixed value types, but one consistent kind usually makes code easier to understand. const arrays can still have items changed.",
          "for...of reads each array value in order. It is a clear default when you only need values rather than indexes."
        ]
      },
      {
        "heading": "Create a new list",
        "points": [
          "map calls a callback for every item and returns a new array of the callback results. A callback is a function a method calls for each item.",
          "filter returns a new array containing only items whose callback result is truthy. find returns the first matching item or undefined.",
          "some returns true if at least one item matches; every returns true only if all items match. These methods do not change the original array.",
          "reduce combines items into one value, such as a sum or object. Its accumulator is the running result, and an initial value makes the result predictable."
        ]
      },
      {
        "heading": "Changing order",
        "points": [
          "sort rearranges the original array and also returns it. Without a compare function, it compares items as strings.",
          "For numeric sorting, use (a, b) => a - b for ascending order. A negative result puts a before b, and a positive result puts b before a.",
          "push and pop change the end of an array; shift and unshift change the beginning. These mutating methods alter the numbered shelf.",
          "Use toSorted when available and you need a sorted copy instead of changing the original. It returns a new array."
        ]
      },
      {
        "heading": "A useful pipeline",
        "points": [
          "Method chaining applies one array method after another. Read it as a pipeline: take items, select them, then transform them.",
          "In the code, filter keeps scores at least 60, map adds a label, and join makes one printable string. Each stage has one job.",
          "Do not use map only for side effects such as logging; use forEach for that. map should use its returned array.",
          "Do not forget reduce's initial value when an array might be empty, because there would be no safe first accumulator."
        ]
      }
    ],
    "terms": [
      {
        "term": "array",
        "meaning": "An ordered collection of values with numbered indexes."
      },
      {
        "term": "index",
        "meaning": "The zero-based position of an item in an array."
      },
      {
        "term": "callback",
        "meaning": "A function passed to another operation to be called later."
      },
      {
        "term": "accumulator",
        "meaning": "The running combined value used by reduce."
      },
      {
        "term": "mutate",
        "meaning": "To change an existing array or object."
      },
      {
        "term": "compare function",
        "meaning": "A function that tells sort how two items should be ordered."
      }
    ],
    "examples": [
      {
        "title": "Double each number",
        "environment": "node",
        "code": "const numbers = [1, 2, 3];\nconst doubled = numbers.map(number => number * 2);\nconsole.log(doubled.join(', '));",
        "walkthrough": [
          "Step 1: numbers stores three values.",
          "Step 2: map creates a new array with every number doubled.",
          "Step 3: join makes printable text and the log prints it.",
          "Step 4: The output is 2, 4, 6."
        ],
        "output": "2, 4, 6"
      },
      {
        "title": "Prepare passing scores",
        "environment": "node",
        "code": "const scores = [45, 72, 91, 58];\nconst passed = scores\n  .filter(score => score >= 60)\n  .map(score => `Pass: ${score}`);\nconsole.log(passed.join(' | '));",
        "walkthrough": [
          "Step 1: scores stores four results.",
          "Step 2: passed starts a chain using scores.",
          "Step 3: filter creates a list containing 72 and 91.",
          "Step 4: map creates a label for each kept score.",
          "Step 5: The statement ends with the new array in passed.",
          "Step 6: join creates one string and the log prints it.",
          "Step 7: The output is Pass: 72 | Pass: 91."
        ],
        "output": "Pass: 72 | Pass: 91"
      }
    ],
    "keyPoints": [
      "Array indexes start at zero.",
      "map and filter return new arrays.",
      "find returns one item or undefined.",
      "some and every return booleans.",
      "sort mutates and needs a compare function for numbers.",
      "reduce combines to one result."
    ],
    "commonMistakes": [
      "Expecting sort() to sort numbers numerically by default.",
      "Using map but ignoring its returned array.",
      "Forgetting that filter does not change the original array."
    ],
    "links": [
      {
        "title": "Array methods",
        "url": "https://javascript.info/array-methods",
        "kind": "article",
        "language": "English",
        "why": "It groups common methods with concise runnable examples."
      }
    ]
  },
  {
    "topicId": "js-strings-numbers",
    "summary": "Strings are text values and numbers are numeric values. Template literals make text with inserted values easier to write.",
    "explanation": [
      {
        "heading": "Text and quantities",
        "points": [
          "A string is text, such as a name or message. Write it inside single quotes, double quotes, or backticks.",
          "A number is a value used for arithmetic, such as 12 or 3.5. Unlike some languages, JavaScript uses one number type for ordinary whole and decimal numbers.",
          "Think of a string as words on a label and a number as items in a box. Mixing their jobs can give a surprising result."
        ]
      },
      {
        "heading": "Making strings",
        "points": [
          "Single and double quotes both create ordinary strings. Choose one style consistently, and use the other inside it when that makes a quote easier to read.",
          "A template literal is a string wrapped in backticks. It can insert an expression, meaning code that produces a value, inside ${...}.",
          "Template literals can also contain line breaks. In the later code, the template literal puts the numeric total into a clear message."
        ]
      },
      {
        "heading": "Doing arithmetic",
        "points": [
          "The + operator adds two numbers, but it joins text when a string is involved. For example, '2' + 3 produces the string '23'.",
          "The -, *, /, and % operators try to turn suitable text into numbers. Still, explicit conversion is clearer when data arrives as text.",
          "Number(text) converts numeric-looking text to a number. Number('tea') produces NaN, a special number value meaning the numeric result is not valid."
        ]
      },
      {
        "heading": "Useful habits",
        "points": [
          "Use Number for text from forms, files, or other outside input before calculating. Check important input because an invalid conversion can spread NaN through later arithmetic.",
          "Use String(value) when you deliberately need text. Template interpolation also converts its inserted value to text for the resulting message.",
          "Numbers are floating-point values, which means some decimal calculations are not exact in binary. For money, keep the smallest unit as whole numbers when exact cents matter."
        ]
      }
    ],
    "terms": [
      {
        "term": "string",
        "meaning": "A JavaScript value that holds text."
      },
      {
        "term": "number",
        "meaning": "A JavaScript value used for ordinary numeric calculations."
      },
      {
        "term": "template literal",
        "meaning": "A backtick string that can insert expressions with ${...}."
      },
      {
        "term": "expression",
        "meaning": "Code that evaluates to a value."
      },
      {
        "term": "NaN",
        "meaning": "A number value that represents an invalid numeric result."
      }
    ],
    "examples": [
      {
        "title": "Insert a name",
        "environment": "node",
        "code": "const name = 'Ada';\nconsole.log(`Hello, ${name}!`);",
        "walkthrough": [
          "Step 1: name stores the string Ada.",
          "Step 2: The template literal inserts name and console.log prints the completed text.",
          "Step 3: The output is Hello, Ada!."
        ],
        "output": "Hello, Ada!"
      },
      {
        "title": "Calculate a total",
        "environment": "node",
        "code": "const priceText = '12.50';\nconst quantity = 2;\nconst price = Number(priceText);\nconst total = price * quantity;\nconsole.log(`Total: ${total}`);",
        "walkthrough": [
          "Step 1: priceText stores a price as text.",
          "Step 2: quantity stores the numeric count.",
          "Step 3: Number converts the text price to the number 12.5.",
          "Step 4: Multiplication calculates total as 25.",
          "Step 5: The template literal prints a readable total.",
          "Step 6: The output is Total: 25."
        ],
        "output": "Total: 25"
      }
    ],
    "keyPoints": [
      "Strings hold text and numbers support arithmetic.",
      "Backticks create template literals.",
      "${...} inserts an expression into a template literal.",
      "+ can join text instead of adding.",
      "Convert outside numeric text before calculations."
    ],
    "commonMistakes": [
      "Expecting '2' + 3 to equal 5.",
      "Using a decimal calculation as exact money without considering floating-point rounding.",
      "Forgetting that Number can produce NaN for invalid text."
    ],
    "links": [
      {
        "title": "Strings",
        "url": "https://javascript.info/string",
        "kind": "article",
        "language": "English",
        "why": "It introduces quotes, backticks, and common string operations with small examples."
      }
    ]
  },
  {
    "topicId": "js-destructuring-spread",
    "summary": "Destructuring takes selected values from an array or object, while spread and rest use ... to expand or collect values. They make copying and function inputs easier to express.",
    "explanation": [
      {
        "heading": "Taking values out",
        "points": [
          "Destructuring is syntax for taking values from an array or object into named variables. It is like unpacking only the tools you need from a kit.",
          "An array is an ordered list, so array destructuring uses positions: const [first] = names takes index zero. Skip a position with a comma.",
          "An object stores values by property name, so object destructuring uses matching names: const { name } = user takes user.name."
        ]
      },
      {
        "heading": "Names and defaults",
        "points": [
          "Rename an object property with const { name: displayName } = user. The original property stays name; displayName is the new local variable.",
          "A default value is used only when the selected value is undefined. For example, const { theme = 'light' } = settings provides a fallback.",
          "Destructuring does not modify the source array or object. Like reading tools from the kit, it only gives your code convenient handles."
        ]
      },
      {
        "heading": "Spread copies outward",
        "points": [
          "The spread syntax, ..., expands an iterable such as an array into separate values, or expands an object's own enumerable properties into another object.",
          "An iterable is a value that can provide items one by one, such as an array or string. [...items] makes a new outer array, so adding to it does not add to items.",
          "Object spread is useful for an updated copy: { ...user, active: true }. It is a shallow copy, meaning nested objects are still shared."
        ]
      },
      {
        "heading": "Rest gathers inward",
        "points": [
          "Rest syntax also uses ..., but it collects remaining items into one array or object. Its meaning depends on where it appears.",
          "In const [first, ...others] = list, others receives the remaining array items. In a function parameter, ...numbers collects extra arguments into an array.",
          "In the code, destructuring chooses the first task, while rest gathers the later tasks. That continues the unpacking-kit comparison without changing the original list."
        ]
      }
    ],
    "terms": [
      {
        "term": "destructuring",
        "meaning": "Syntax that assigns selected array or object values to variables."
      },
      {
        "term": "spread syntax",
        "meaning": "Three dots that expand a value into separate values or properties."
      },
      {
        "term": "rest syntax",
        "meaning": "Three dots that collect remaining values into an array or object."
      },
      {
        "term": "iterable",
        "meaning": "A value, such as an array or string, that can provide items one at a time."
      },
      {
        "term": "shallow copy",
        "meaning": "A new outer container that still shares nested objects with the original."
      }
    ],
    "examples": [
      {
        "title": "Pick two colors",
        "environment": "node",
        "code": "const colors = ['red', 'blue'];\nconst [first, second] = colors;\nconsole.log(`${first} and ${second}`);",
        "walkthrough": [
          "Step 1: colors stores an ordered array.",
          "Step 2: Array destructuring assigns its first two positions to variables.",
          "Step 3: The template literal prints both variables.",
          "Step 4: The output is red and blue."
        ],
        "output": "red and blue"
      },
      {
        "title": "Keep the first task",
        "environment": "node",
        "code": "const tasks = ['email', 'review', 'ship'];\nconst [first, ...later] = tasks;\nconst plan = { first, later };\nconsole.log(plan.first);\nconsole.log(plan.later.join(', '));",
        "walkthrough": [
          "Step 1: tasks stores three ordered task strings.",
          "Step 2: Destructuring assigns email to first and gathers the other items in later.",
          "Step 3: plan creates an object using the two variables.",
          "Step 4: The first log prints the first task.",
          "Step 5: join makes the remaining tasks into one comma-separated string and prints it.",
          "Step 6: The output has the two shown lines."
        ],
        "output": "email\nreview, ship"
      }
    ],
    "keyPoints": [
      "Array destructuring follows position.",
      "Object destructuring follows property names.",
      "Spread expands values or properties.",
      "Rest collects remaining values.",
      "Object and array spread copies only one level deeply."
    ],
    "commonMistakes": [
      "Assuming a spread copy also copies nested objects.",
      "Using rest anywhere except the final element of an array destructuring pattern.",
      "Expecting a destructuring default to replace null as well as undefined."
    ],
    "links": [
      {
        "title": "Destructuring assignment",
        "url": "https://javascript.info/destructuring-assignment",
        "kind": "article",
        "language": "English",
        "why": "It builds array and object unpacking from short examples."
      }
    ]
  },
  {
    "topicId": "js-optional-nullish",
    "summary": "Optional chaining safely stops a property lookup when a needed value is null or undefined. Nullish coalescing supplies a fallback only for those two missing values.",
    "explanation": [
      {
        "heading": "Missing data",
        "points": [
          "null is an intentional value meaning no object or value is present. undefined usually means a property was not found or no value was assigned.",
          "Trying to read a property through null or undefined throws an error. This commonly happens when optional data is absent.",
          "Think of nested data as a set of doors. Opening a door that is not there fails, so code needs a safe way to stop."
        ]
      },
      {
        "heading": "Optional chaining",
        "points": [
          "Optional chaining uses ?., as in user?.address. It returns undefined instead of throwing when the value immediately before ?. is null or undefined.",
          "It can safely read a property, call an optional method with method?.(), or use a computed property with object?.[key]. It does not make an undeclared variable safe.",
          "Optional chaining only protects the part where you write it. user?.address.street can still fail if address is missing, so write user?.address?.street."
        ]
      },
      {
        "heading": "A precise fallback",
        "points": [
          "Nullish coalescing uses ?? to choose a fallback. It returns its right side only when its left side is null or undefined.",
          "This differs from ||, which falls back for every falsy value, including 0, false, and an empty string. Those can be meaningful settings that should stay.",
          "Use parentheses when combining ?? with && or || because JavaScript does not allow mixing them without clear grouping."
        ]
      },
      {
        "heading": "Use them carefully",
        "points": [
          "Optional chaining is for genuinely optional data, not for hiding a required-data bug. Validate required input near where it enters the program.",
          "The result of a failed optional chain is undefined, so ?? can give that missing result a display value. In the code, the absent door leads to the fallback street.",
          "Do not assign through an optional chain, such as user?.name = 'A'. The chain is for safely reading or conditionally calling, not creating a missing object."
        ]
      }
    ],
    "terms": [
      {
        "term": "nullish",
        "meaning": "Specifically null or undefined."
      },
      {
        "term": "optional chaining",
        "meaning": "The ?. syntax that safely stops on a nullish value."
      },
      {
        "term": "nullish coalescing",
        "meaning": "The ?? operator that chooses a fallback for null or undefined."
      },
      {
        "term": "fallback",
        "meaning": "A value used when the preferred value is missing."
      },
      {
        "term": "falsy",
        "meaning": "A value that behaves like false in a condition, such as 0 or an empty string."
      }
    ],
    "examples": [
      {
        "title": "Safe missing property",
        "environment": "node",
        "code": "const user = {};\nconsole.log(user.profile?.name);",
        "walkthrough": [
          "Step 1: user is an object with no profile property.",
          "Step 2: Optional chaining sees undefined before the next property and prints undefined instead of throwing.",
          "Step 3: The output is undefined."
        ],
        "output": "undefined"
      },
      {
        "title": "Keep a zero setting",
        "environment": "node",
        "code": "const settings = { retries: 0, user: {} };\nconst retries = settings.retries ?? 3;\nconst city = settings.user.address?.city ?? 'Unknown';\nconsole.log(`Retries: ${retries}`);\nconsole.log(`City: ${city}`);",
        "walkthrough": [
          "Step 1: settings has a valid zero and a user without address.",
          "Step 2: ?? keeps 0 because it is not nullish.",
          "Step 3: Optional chaining produces undefined for the missing address, then ?? chooses Unknown.",
          "Step 4: The first log prints retries.",
          "Step 5: The second log prints city.",
          "Step 6: The output has the two shown lines."
        ],
        "output": "Retries: 0\nCity: Unknown"
      }
    ],
    "keyPoints": [
      "?. stops only for null or undefined.",
      "Use ?. at every optional link in a nested lookup.",
      "?? preserves 0, false, and empty text.",
      "|| uses a fallback for all falsy values.",
      "Do not use optional chaining to hide required data problems."
    ],
    "commonMistakes": [
      "Using || when zero is a valid setting.",
      "Writing one ?. and expecting later property reads to be safe.",
      "Trying to assign through an optional chain."
    ],
    "links": [
      {
        "title": "Optional chaining '?.'",
        "url": "https://javascript.info/optional-chaining",
        "kind": "article",
        "language": "English",
        "why": "It explains safe nested access with focused examples."
      }
    ]
  },
  {
    "topicId": "js-modules",
    "summary": "A module is a file that shares selected code with other files. ES modules use import and export, while CommonJS uses require and module.exports.",
    "explanation": [
      {
        "heading": "Why split files",
        "points": [
          "A module is a JavaScript file with one focused job, such as formatting dates or calculating totals. Splitting code keeps large programs easier to read and test.",
          "A module has its own scope, meaning names inside it do not automatically become global names. This avoids unrelated files accidentally changing each other's variables.",
          "Think of modules as labeled drawers. A drawer exposes only the tools another drawer is allowed to use."
        ]
      },
      {
        "heading": "ES modules",
        "points": [
          "ES modules are the language-standard module system. export marks a value that another module may use, and import receives that value.",
          "A named export has a chosen name and is imported inside braces. A default export is one main exported value and can be given a local name by the importer.",
          "ES module imports are static, meaning their locations are known before normal module code runs. Imported bindings are read-only views of the exported value, not copied snapshots."
        ]
      },
      {
        "heading": "CommonJS",
        "points": [
          "CommonJS is a module system commonly used by Node projects. require loads another module, and module.exports chooses what the current file exposes.",
          "CommonJS code can call require during normal execution, so its loading style is more dynamic. It uses an exports object and is not the same syntax as ES modules.",
          "Node supports both systems, but the project configuration and file extension decide how a file is treated. Avoid mixing styles in one file unless a tool specifically supports it."
        ]
      },
      {
        "heading": "Choose clear boundaries",
        "points": [
          "Export the small public interface other files need, rather than every helper. This is like lending only the tool from the labeled drawer, not the entire drawer.",
          "Use relative paths such as './math.js' for your own neighboring ES module files. The exact extension and environment rules matter when running code.",
          "The examples are shown as separate files because modules need files to import from. Their output illustrates the exported function being called after import."
        ]
      }
    ],
    "terms": [
      {
        "term": "module",
        "meaning": "A file that organizes and shares a focused piece of code."
      },
      {
        "term": "export",
        "meaning": "A declaration that makes a module value available to other modules."
      },
      {
        "term": "import",
        "meaning": "A declaration that receives an exported module value."
      },
      {
        "term": "CommonJS",
        "meaning": "A module system using require and module.exports."
      },
      {
        "term": "binding",
        "meaning": "The connection between a variable name and its value."
      }
    ],
    "examples": [
      {
        "title": "A CommonJS value",
        "environment": "node",
        "code": "const path = require('node:path');\nconsole.log(path.basename('/work/note.txt'));",
        "walkthrough": [
          "Step 1: require loads Node's path module into path.",
          "Step 2: basename takes the final part of the file path and console.log prints it.",
          "Step 3: The output is note.txt."
        ],
        "output": "note.txt"
      },
      {
        "title": "Two ES module files",
        "environment": "node",
        "code": "// math.mjs\nexport function double(value) { return value * 2; }\n// app.mjs\nimport { double } from './math.mjs';\nconsole.log(double(6));",
        "walkthrough": [
          "Step 1: math.mjs declares and exports double.",
          "Step 2: double returns twice its received value when called.",
          "Step 3: app.mjs imports the named export from math.mjs.",
          "Step 4: app.mjs calls double with 6 and prints its result.",
          "Step 5: The output is 12."
        ],
        "output": "12"
      }
    ],
    "keyPoints": [
      "Modules isolate their own names.",
      "ES modules use export and import.",
      "Named imports use braces.",
      "CommonJS uses require and module.exports.",
      "Keep each module's public interface small."
    ],
    "commonMistakes": [
      "Expecting module variables to become global.",
      "Mixing require and import without checking the project's module setup.",
      "Forgetting that the ES module example needs separate files."
    ],
    "links": [
      {
        "title": "Modules, introduction",
        "url": "https://javascript.info/modules-intro",
        "kind": "article",
        "language": "English",
        "why": "It introduces module files and import/export before advanced details."
      }
    ]
  },
  {
    "topicId": "js-closures",
    "summary": "A closure is a function that can still use variables from where it was created. It matters because callbacks and function factories often need to remember data later.",
    "explanation": [
      {
        "heading": "The simple idea",
        "points": [
          "A closure is a function together with access to the variables around it when it was created.",
          "Think of the function as carrying a backpack of routes back to its surrounding variables.",
          "A scope is the part of code where a name can be used; an inner function can look outward into its enclosing scope.",
          "The surrounding place is chosen when the function is created, not from the place that later calls it."
        ]
      },
      {
        "heading": "What it remembers",
        "points": [
          "When a function runs, it reads the current value in its outer variable, not a frozen copy of that value.",
          "If an outer function returns an inner function, the inner function can keep using needed outer variables after the outer call ends.",
          "Each call to an outer function creates its own set of local variables, so two counters can be independent.",
          "The outer data stays reachable while a reachable closure still needs it, then normal memory cleanup can remove it."
        ]
      },
      {
        "heading": "Using the backpack",
        "points": [
          "A function factory is a function that returns another function configured with some data, such as a saved label or limit.",
          "In the counter code, the returned function uses its backpack route to find and change count.",
          "This is useful for private state: outside code cannot directly name a local variable inside the finished outer call.",
          "A closure is useful when a later event needs both a function and the small piece of data that explains its job."
        ]
      },
      {
        "heading": "Loops and old values",
        "points": [
          "A callback is a function saved to run later. A loop may finish before its callbacks run.",
          "With var, loop iterations share one function-scoped variable, so delayed callbacks commonly see its final value.",
          "With let in a for loop, each iteration gets its own loop variable, so delayed callbacks can see 0, 1, and 2.",
          "A stale closure is a callback that reads an old or unwanted value because it kept the wrong variable or was not recreated when data changed."
        ]
      }
    ],
    "terms": [
      {
        "term": "closure",
        "meaning": "A function that can access variables from its creation environment."
      },
      {
        "term": "scope",
        "meaning": "The part of code where a name is available."
      },
      {
        "term": "callback",
        "meaning": "A function another operation saves and runs later."
      },
      {
        "term": "function factory",
        "meaning": "A function that returns a configured new function."
      },
      {
        "term": "stale closure",
        "meaning": "A callback that uses a value that is no longer the value you intended."
      }
    ],
    "examples": [
      {
        "title": "A remembered counter",
        "environment": "node",
        "code": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = makeCounter();\nconsole.log(next());\nconsole.log(next());",
        "walkthrough": [
          "Step 1: makeCounter creates local count with 0.",
          "Step 2: It returns an arrow function that can still reach count.",
          "Step 3: Each call to next increases that same count and prints it."
        ],
        "output": "1\n2"
      },
      {
        "title": "Loop callbacks",
        "environment": "node",
        "code": "const jobs = [];\nfor (let i = 0; i < 3; i++) {\n  jobs.push(() => console.log(`job ${i}`));\n}\nfor (const job of jobs) {\n  job();\n}",
        "walkthrough": [
          "Step 1: The first loop creates three callbacks.",
          "Step 2: let gives each loop turn its own i value.",
          "Step 3: The second loop calls each callback, which finds its remembered i."
        ],
        "output": "job 0\njob 1\njob 2"
      }
    ],
    "keyPoints": [
      "Closures read outer variables from their creation scope.",
      "They read live values, not automatic snapshots.",
      "Every outer-function call can have separate state.",
      "Use let for loop callbacks that need each index.",
      "Closures can accidentally keep unwanted data alive."
    ],
    "commonMistakes": [
      "Thinking a closure copies every outer value when the function is created.",
      "Using var in a delayed loop callback and expecting a separate index each time.",
      "Calling any old callback safe when it may hold stale data."
    ],
    "links": [
      {
        "title": "Variable scope, closure",
        "url": "https://javascript.info/closure",
        "kind": "article",
        "language": "English",
        "why": "It builds from scope to closures with small examples."
      }
    ]
  },
  {
    "topicId": "js-this-binding",
    "summary": "this is a value chosen by how a regular function is called. call, apply, and bind let you choose it explicitly, while arrow functions take it from outside.",
    "explanation": [
      {
        "heading": "The receiver",
        "points": [
          "this is a special value available in regular functions. It often refers to the object that called the method.",
          "A method is a function stored on an object. In object.method(), this is that object for this call.",
          "Think of this as the return address on a letter: the call form tells the function who sent it.",
          "The function definition alone does not permanently decide this; the actual invocation decides it."
        ]
      },
      {
        "heading": "It depends on the call",
        "points": [
          "The same regular function can be called through different objects, so its this can change.",
          "Taking a method out of an object and calling it as a plain function loses that object receiver.",
          "In strict mode, a plain regular-function call has this set to undefined.",
          "A callback API usually calls your function later as a plain function, so save the receiver before passing it."
        ]
      },
      {
        "heading": "Choose this yourself",
        "points": [
          "call runs a function now and takes the chosen this value first, followed by normal arguments.",
          "apply also runs now, but takes its arguments as one array-like value.",
          "bind does not run the function now. It returns a new function with this fixed for later use.",
          "In the code, bind creates a reusable greeting that keeps the person as its return address."
        ]
      },
      {
        "heading": "Arrow functions",
        "points": [
          "An arrow function has no this of its own. It reads this from the surrounding non-arrow code.",
          "This makes arrows useful inside a method callback when the callback should keep the method's this.",
          "Do not use an arrow as an object method when you need that method call to provide this.",
          "call, apply, and bind cannot replace the inherited this of an arrow function."
        ]
      }
    ],
    "terms": [
      {
        "term": "this",
        "meaning": "A special function value usually chosen by the way a regular function is called."
      },
      {
        "term": "method",
        "meaning": "A function stored as an object property."
      },
      {
        "term": "receiver",
        "meaning": "The object before the dot in a method call."
      },
      {
        "term": "call",
        "meaning": "A method that runs a function immediately with a chosen this value."
      },
      {
        "term": "bind",
        "meaning": "A method that returns a function with a fixed this value."
      }
    ],
    "examples": [
      {
        "title": "Method receiver",
        "environment": "node",
        "code": "const user = {\n  name: 'Mina',\n  say() { console.log(this.name); }\n};\nuser.say();",
        "walkthrough": [
          "Step 1: user has a name and a regular method.",
          "Step 2: user.say() calls the method through user.",
          "Step 3: this is user, so the method prints its name."
        ],
        "output": "Mina"
      },
      {
        "title": "Call, apply, and bind",
        "environment": "node",
        "code": "function greet(greeting, mark) {\n  console.log(`${greeting}, ${this.name}${mark}`);\n}\nconst person = { name: 'Ravi' };\ngreet.call(person, 'Hi', '!');\ngreet.apply(person, ['Hello', '.']);\nconst later = greet.bind(person, 'Welcome');\nlater('!');",
        "walkthrough": [
          "Step 1: greet reads this.name and two arguments.",
          "Step 2: call runs it now with person and separate arguments.",
          "Step 3: apply runs it now with person and an argument array.",
          "Step 4: bind returns later, which keeps person and the first argument."
        ],
        "output": "Hi, Ravi!\nHello, Ravi.\nWelcome, Ravi!"
      }
    ],
    "keyPoints": [
      "Regular-function this comes from the call form.",
      "object.method() gives the method that object as this.",
      "call and apply run immediately.",
      "bind returns a later callable function.",
      "Arrow functions inherit this from outside."
    ],
    "commonMistakes": [
      "Assuming this means the object where a function was written.",
      "Passing a method as a callback without preserving its receiver.",
      "Expecting call or bind to give an arrow function its own this."
    ],
    "links": [
      {
        "title": "Decorators and forwarding, call/apply",
        "url": "https://javascript.info/call-apply-decorators",
        "kind": "article",
        "language": "English",
        "why": "It explains explicit this with focused examples."
      }
    ]
  },
  {
    "topicId": "js-prototypes",
    "summary": "A prototype is an object JavaScript consults when a property is missing. Prototype chains let objects share behavior without copying it onto every object.",
    "explanation": [
      {
        "heading": "The basic idea",
        "points": [
          "An object stores properties, which are named values such as name or move. When a property is missing, JavaScript can consult another linked object called its prototype.",
          "Think of a prototype as a shared instruction card behind an object's own card. JavaScript reads the object's own card first, then the shared card if needed.",
          "Every ordinary object has an internal prototype link that is another object or null. This link is separate from the object's own properties."
        ]
      },
      {
        "heading": "Following links",
        "points": [
          "A prototype chain is the sequence of linked prototype objects JavaScript follows during a property lookup. It stops when it finds the property or reaches null.",
          "An inherited property is found on a prototype rather than directly on the starting object. Reading it works, but it remains shared by objects using that prototype.",
          "An own property is stored directly on the object. If it has the same name as an inherited property, it wins; this is called shadowing."
        ]
      },
      {
        "heading": "Making prototypes",
        "points": [
          "Object.create(prototype) makes a new object linked to the chosen prototype. It is a clear way to make a simple relationship.",
          "Object.getPrototypeOf reads the linked prototype. Object.setPrototypeOf can change one, but changing existing objects can slow property access.",
          "Classes and constructor functions use prototypes behind the scenes. Their shared methods are usually stored once on a prototype."
        ]
      },
      {
        "heading": "Reading and writing",
        "points": [
          "Prototype lookup happens when code reads a property. Assigning object.name normally creates or changes an own property on that object.",
          "Do not change a shared prototype for data each object should own. Every object using the shared instruction card could see that change.",
          "In the code, bird finds move on animal through the chain, but its kind is its own property. One shared method can work with many objects."
        ]
      }
    ],
    "terms": [
      {
        "term": "prototype",
        "meaning": "An object consulted when a property is missing on another object."
      },
      {
        "term": "prototype chain",
        "meaning": "The linked sequence of prototypes used during property lookup."
      },
      {
        "term": "own property",
        "meaning": "A property stored directly on the object being used."
      },
      {
        "term": "inherited property",
        "meaning": "A property found on an object's prototype."
      },
      {
        "term": "shadowing",
        "meaning": "An own property hiding a same-named inherited property."
      }
    ],
    "examples": [
      {
        "title": "Read from a prototype",
        "environment": "node",
        "code": "const animal = { sound: 'chirp' };\nconst bird = Object.create(animal);\nconsole.log(bird.sound);",
        "walkthrough": [
          "Step 1: animal has its own sound property.",
          "Step 2: Object.create makes bird with animal as its prototype.",
          "Step 3: bird has no own sound, so lookup finds and prints animal's sound.",
          "Step 4: The output is chirp."
        ],
        "output": "chirp"
      },
      {
        "title": "Share a method",
        "environment": "node",
        "code": "const animal = {\n  move() { return `${this.kind} moves`; }\n};\nconst bird = Object.create(animal);\nbird.kind = 'Bird';\nconsole.log(bird.move());",
        "walkthrough": [
          "Step 1: animal stores a shared move method.",
          "Step 2: The method builds text using the calling object's kind.",
          "Step 3: The object literal ends.",
          "Step 4: bird is created with animal as its prototype.",
          "Step 5: bird receives its own kind property.",
          "Step 6: Lookup finds move on animal, and the call prints its returned text.",
          "Step 7: The output is Bird moves."
        ],
        "output": "Bird moves"
      }
    ],
    "keyPoints": [
      "Lookup checks own properties first.",
      "Missing properties can be found on a prototype.",
      "Lookup follows the chain until null.",
      "Own properties shadow inherited properties.",
      "Classes use prototypes for shared methods."
    ],
    "commonMistakes": [
      "Confusing an object's prototype link with its own properties.",
      "Changing a shared prototype value when each object needs a separate value.",
      "Assuming assignment writes back to a prototype property."
    ],
    "links": [
      {
        "title": "Prototypal inheritance",
        "url": "https://javascript.info/prototype-inheritance",
        "kind": "article",
        "language": "English",
        "why": "It introduces lookup and prototype links with small object examples."
      }
    ]
  },
  {
    "topicId": "js-classes",
    "summary": "A class is syntax for creating objects with shared methods and setup. Inheritance lets a child class reuse and extend a parent class.",
    "explanation": [
      {
        "heading": "A class template",
        "points": [
          "A class is a template for creating related objects. It is like a recipe that says how each new object starts and what actions it can perform.",
          "new calls a class to create an instance, meaning one object made from that class. A constructor is the setup method that runs during creation.",
          "Inside an instance method, this refers to the instance that called the method. Store per-instance data, such as a name, on this."
        ]
      },
      {
        "heading": "Shared behavior",
        "points": [
          "A method is a function written in a class body. Methods are shared through the class prototype, so each instance does not need its own copy.",
          "A property is data attached to an instance or class. A class field is convenient syntax for defining an instance property during construction.",
          "A static method belongs to the class itself rather than an instance. Call it as ClassName.method(), often for a related utility."
        ]
      },
      {
        "heading": "Extending classes",
        "points": [
          "Inheritance lets one class build on another. class Dog extends Animal makes Dog a child class and Animal its parent class.",
          "A child class can use inherited methods, add methods, or override a method by defining another one with the same name.",
          "A derived constructor must call super(...) before using this. super runs the parent constructor so its setup occurs first."
        ]
      },
      {
        "heading": "Practical design",
        "points": [
          "Use a class when objects truly share a clear shape and behavior. Do not use one only because every value must fit in a class.",
          "Favor small focused classes and composition, meaning combining useful objects, when a deep family tree would become hard to understand.",
          "In the code, Dog reuses Animal's constructor and overrides speak. Each dog keeps its own name while the methods are shared."
        ]
      }
    ],
    "terms": [
      {
        "term": "class",
        "meaning": "A template used to create related objects and shared methods."
      },
      {
        "term": "instance",
        "meaning": "An object created from a class with new."
      },
      {
        "term": "constructor",
        "meaning": "The class method that initializes a new instance."
      },
      {
        "term": "inheritance",
        "meaning": "A child class reusing behavior from a parent class."
      },
      {
        "term": "super",
        "meaning": "A keyword for calling a parent constructor or method."
      }
    ],
    "examples": [
      {
        "title": "Create an instance",
        "environment": "node",
        "code": "class Lamp {\n  shine() { return 'light'; }\n}\nconst lamp = new Lamp();\nconsole.log(lamp.shine());",
        "walkthrough": [
          "Step 1: Lamp declares a class.",
          "Step 2: shine declares a shared instance method.",
          "Step 3: The class body ends.",
          "Step 4: new creates a Lamp instance.",
          "Step 5: The method call returns and prints light.",
          "Step 6: The output is light."
        ],
        "output": "light"
      },
      {
        "title": "Extend a parent",
        "environment": "node",
        "code": "class Animal {\n  constructor(name) { this.name = name; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks`; }\n}\nconst dog = new Dog('Rex');\nconsole.log(dog.speak());",
        "walkthrough": [
          "Step 1: Animal declares the parent class.",
          "Step 2: Its constructor stores the received name.",
          "Step 3: The Animal class body ends.",
          "Step 4: Dog declares a child class.",
          "Step 5: Dog declares its speak method.",
          "Step 6: The Dog class body ends.",
          "Step 7: new Dog uses the inherited constructor to store Rex.",
          "Step 8: The method returns and prints the dog message.",
          "Step 9: The output is Rex barks."
        ],
        "output": "Rex barks"
      }
    ],
    "keyPoints": [
      "new creates an instance.",
      "The constructor initializes it.",
      "Methods are shared through the prototype.",
      "extends creates a child class.",
      "A derived constructor calls super before this."
    ],
    "commonMistakes": [
      "Calling a class without new.",
      "Using this before super in a derived constructor.",
      "Assuming static methods are available on instances."
    ],
    "links": [
      {
        "title": "Class inheritance",
        "url": "https://javascript.info/class-inheritance",
        "kind": "article",
        "language": "English",
        "why": "It explains extends, overrides, and super using small classes."
      }
    ]
  },
  {
    "topicId": "js-higher-order",
    "summary": "A higher-order function takes a function, returns one, or both. A callback is a function passed in so another function can decide when to run it.",
    "explanation": [
      {
        "heading": "Functions as values",
        "points": [
          "In JavaScript, a function is a value that can be stored in a variable, property, or array. This lets code pass behavior around just like data.",
          "A higher-order function is a function that receives another function, returns another function, or does both. Think of it as a kitchen tool that accepts a recipe card.",
          "A callback is a function given to another function to run later or under a chosen condition. The receiving function controls the timing."
        ]
      },
      {
        "heading": "Common array tools",
        "points": [
          "map calls a callback for every array item and returns a new array of its returned values. It is useful for transforming each item.",
          "filter calls a callback for every item and returns a new array containing items where the callback result is truthy. It selects without changing the input array.",
          "reduce combines array items into one result. Its callback receives an accumulator, the running result, and the current item."
        ]
      },
      {
        "heading": "Callbacks and timing",
        "points": [
          "Some callbacks run immediately, such as the callback passed to map. Others run later, such as a timer callback.",
          "A synchronous callback runs before the current function returns. An asynchronous callback runs later after an outside event or scheduled task.",
          "Name reusable callbacks when their job needs explaining. Small inline arrow functions are clearer when the action is obvious."
        ]
      },
      {
        "heading": "Safe use",
        "points": [
          "Read the callback's expected arguments before using an API. A callback's parameter order differs between APIs.",
          "Do not call a callback before passing it when the API expects the function itself. Pass doWork, not doWork().",
          "In the code, map receives the recipe card double and calls it for each item. It returns a new transformed array while values stays unchanged."
        ]
      }
    ],
    "terms": [
      {
        "term": "higher-order function",
        "meaning": "A function that takes a function, returns a function, or both."
      },
      {
        "term": "callback",
        "meaning": "A function passed to another function for it to call."
      },
      {
        "term": "map",
        "meaning": "An array method that returns transformed values."
      },
      {
        "term": "filter",
        "meaning": "An array method that returns items passing a test."
      },
      {
        "term": "accumulator",
        "meaning": "The running result used by reduce."
      }
    ],
    "examples": [
      {
        "title": "Pass a callback",
        "environment": "node",
        "code": "const values = [1, 2];\nconst doubled = values.map(value => value * 2);\nconsole.log(doubled.join(', '));",
        "walkthrough": [
          "Step 1: values stores two numbers.",
          "Step 2: map calls the arrow callback for each number and stores its returned values in a new array.",
          "Step 3: join makes text and console.log prints it.",
          "Step 4: The output is 2, 4."
        ],
        "output": "2, 4"
      },
      {
        "title": "Filter then total",
        "environment": "node",
        "code": "const orders = [5, 12, 8];\nconst large = orders.filter(value => value >= 10);\nconst total = large.reduce((sum, value) => sum + value, 0);\nconsole.log(total);",
        "walkthrough": [
          "Step 1: orders stores three amounts.",
          "Step 2: filter calls its callback and returns an array containing only 12.",
          "Step 3: reduce starts at 0 and combines the kept value into total.",
          "Step 4: console.log prints total.",
          "Step 5: The output is 12."
        ],
        "output": "12"
      }
    ],
    "keyPoints": [
      "Functions are values.",
      "Higher-order functions use functions as input or output.",
      "Callbacks may run now or later.",
      "map and filter return new arrays.",
      "reduce combines items into one value."
    ],
    "commonMistakes": [
      "Writing callback() when an API needs the callback function itself.",
      "Assuming every callback is asynchronous.",
      "Forgetting to return a value from a block-bodied map callback."
    ],
    "links": [
      {
        "title": "Introduction: callbacks",
        "url": "https://javascript.info/callbacks",
        "kind": "article",
        "language": "English",
        "why": "It introduces callbacks and later execution in small steps."
      }
    ]
  },
  {
    "topicId": "js-currying-compose",
    "summary": "Currying turns a multi-argument function into a chain of one-argument functions. Function composition connects small functions so one result becomes the next input.",
    "explanation": [
      {
        "heading": "One argument at a time",
        "points": [
          "Currying transforms a function that accepts several arguments into nested functions that accept one argument at a time. For example, add(a, b) becomes add(a)(b).",
          "The first call remembers its argument in a closure, meaning a returned function can access values from where it was created. It then waits for the next argument.",
          "Think of currying as filling a recipe card one blank at a time. Each filled blank creates a more specific card for later."
        ]
      },
      {
        "heading": "Why curry",
        "points": [
          "A partially applied function is a function with some arguments already supplied. Currying makes partial application easy for one-argument steps.",
          "This can create reusable specialized functions, such as a function that always adds tax at one chosen rate. It is most useful when the specialized name improves clarity.",
          "Do not curry simple code only because it is possible. A normal function call is often easier for beginners to read."
        ]
      },
      {
        "heading": "Composition",
        "points": [
          "Function composition means connecting functions so the output of one becomes the input of another. Small functions can then be tested separately.",
          "For unary functions, meaning functions with one input, compose(f, g)(value) commonly means f(g(value)). The rightmost function runs first.",
          "A pipeline is the same idea written left to right: value goes through one step, then the next. Choose the direction your team can read easily."
        ]
      },
      {
        "heading": "Keep steps clear",
        "points": [
          "Each composed function should have a focused job and return a value. Side effects, meaning changes outside the returned value, make a pipeline harder to predict.",
          "Use descriptive names for intermediate operations. The recipe-card comparison still applies: each step should say what it adds or changes.",
          "In the code, add(2) remembers 2 and waits for the next number, so add(2)(3) gives 5. compose(addOne, double)(4) runs double first (8) and then addOne (9)."
        ]
      }
    ],
    "terms": [
      {
        "term": "currying",
        "meaning": "Transforming a multi-argument function into nested one-argument functions."
      },
      {
        "term": "closure",
        "meaning": "A function that can access values from where it was created."
      },
      {
        "term": "partial application",
        "meaning": "Creating a function with some arguments already supplied."
      },
      {
        "term": "composition",
        "meaning": "Passing one function's output into another function."
      },
      {
        "term": "unary function",
        "meaning": "A function that accepts one input."
      }
    ],
    "examples": [
      {
        "title": "A curried add",
        "environment": "node",
        "code": "const add = first => second => first + second;\nconsole.log(add(2)(3));",
        "walkthrough": [
          "Step 1: add receives first and returns a function that remembers it.",
          "Step 2: The second call supplies second, adds both values, and prints the result.",
          "Step 3: The output is 5."
        ],
        "output": "5"
      },
      {
        "title": "Compose two steps",
        "environment": "node",
        "code": "const double = value => value * 2;\nconst addOne = value => value + 1;\nconst compose = (first, second) => value => first(second(value));\nconst result = compose(addOne, double)(4);\nconsole.log(result);",
        "walkthrough": [
          "Step 1: double declares a function that doubles one value.",
          "Step 2: addOne declares a function that adds one.",
          "Step 3: compose declares a function that feeds second's result into first.",
          "Step 4: compose runs double on 4, then addOne on 8, and stores 9.",
          "Step 5: console.log prints result.",
          "Step 6: The output is 9."
        ],
        "output": "9"
      }
    ],
    "keyPoints": [
      "Currying changes f(a, b) into f(a)(b).",
      "A curried call can create a specialized function.",
      "Composition passes output into another function.",
      "In compose(f, g), g normally runs first.",
      "Small pure steps are easier to combine."
    ],
    "commonMistakes": [
      "Assuming every partially applied function is automatically curried.",
      "Forgetting which compose function runs first.",
      "Using currying when a direct function is clearer."
    ],
    "links": [
      {
        "title": "Currying",
        "url": "https://javascript.info/currying-partials",
        "kind": "article",
        "language": "English",
        "why": "It demonstrates the transformation with a small two-argument function."
      }
    ]
  },
  {
    "topicId": "js-immutability",
    "summary": "Immutability means keeping an existing value unchanged and making a new value for a change. It matters because shared data is easier to reason about when one piece of code cannot silently alter it.",
    "explanation": [
      {
        "heading": "The basic idea",
        "points": [
          "A mutable value can be changed after it is created. An immutable approach leaves the old value alone and creates a replacement.",
          "Think of an array as a paper list. Editing the same sheet affects everyone holding it, while making a copied sheet protects the original.",
          "This is a programming habit, not a rule that all JavaScript values must follow. Objects and arrays are normally mutable.",
          "Primitive values, such as numbers and strings, cannot have their contents changed; assigning a new value simply changes what a variable refers to."
        ]
      },
      {
        "heading": "Copies are often shallow",
        "points": [
          "A shallow copy creates a new outer object or array but keeps references to nested objects. A reference is a value that points to an object in memory.",
          "Spread syntax, such as {...user}, and Array.from make shallow copies. Changing a top-level property on the copy does not change the original.",
          "However, changing copy.address.city can change original.address.city when both outer objects point to the same address object.",
          "In the paper-list comparison, a shallow copy is a fresh cover sheet with the same attached notes inside."
        ]
      },
      {
        "heading": "Deep copies and modern array methods",
        "points": [
          "A deep copy creates independent copies through supported nested data too. structuredClone(value) can deep-clone many built-in values, including Date, Map, Set, arrays, and plain objects.",
          "structuredClone cannot clone functions, and it throws for values it cannot clone. Do not use JSON conversion as a general deep-copy tool because it loses values such as undefined and changes Date into text.",
          "toSorted, toReversed, and with return new arrays instead of changing the original array. with(index, value) replaces one item in its returned copy.",
          "They make the copied-sheet idea visible in code: the old array stays available for another reader."
        ]
      },
      {
        "heading": "Choose the right level",
        "points": [
          "Copy only the levels you plan to change. For nested updates, copy each object or array on the path to that change.",
          "Object.freeze prevents ordinary changes to an object’s own properties, but it is shallow and does not freeze nested objects.",
          "Immutability helps comparisons, undo histories, and predictable functions. It also costs allocations, so use it for clarity rather than copying huge data without need.",
          "In an interview, say that const prevents reassignment of a variable name; it does not make the referenced object immutable."
        ]
      }
    ],
    "terms": [
      {
        "term": "immutability",
        "meaning": "The practice of leaving an existing value unchanged and making a new value for a change."
      },
      {
        "term": "shallow copy",
        "meaning": "A new outer container that still shares nested object references."
      },
      {
        "term": "deep copy",
        "meaning": "A copy with independent supported nested values."
      },
      {
        "term": "reference",
        "meaning": "A value that points to an object or other non-primitive value."
      },
      {
        "term": "structuredClone",
        "meaning": "A built-in function that deep-clones many supported JavaScript values."
      }
    ],
    "examples": [
      {
        "title": "Sort without changing the source",
        "environment": "node",
        "code": "const scores = [3, 1, 2];\nconst ordered = scores.toSorted();\nconsole.log(scores.join(','));\nconsole.log(ordered.join(','));",
        "walkthrough": [
          "Step 1: scores stores the original order.",
          "Step 2: toSorted creates a separate sorted array and stores it in ordered.",
          "Step 3: The first log shows that scores still has its original order.",
          "Step 4: The second log prints the sorted copy.",
          "Step 5: The output is 3,1,2 followed by 1,2,3."
        ],
        "output": "3,1,2\n1,2,3"
      },
      {
        "title": "Copy the path being changed",
        "environment": "node",
        "code": "const user = { name: 'Ana', address: { city: 'Pune' } };\nconst moved = { ...user, address: { ...user.address, city: 'Delhi' } };\nconsole.log(user.address.city);\nconsole.log(moved.address.city);",
        "walkthrough": [
          "Step 1: user contains a nested address object.",
          "Step 2: Spread makes a new user object and a new address object before replacing city.",
          "Step 3: The original nested city is printed unchanged.",
          "Step 4: The changed copy's city is printed.",
          "Step 5: The output is Pune followed by Delhi."
        ],
        "output": "Pune\nDelhi"
      }
    ],
    "keyPoints": [
      "const does not make an object immutable.",
      "Spread copies are shallow.",
      "Copy every nested level you change.",
      "structuredClone handles many but not all values.",
      "toSorted, toReversed, and with do not mutate their source array."
    ],
    "commonMistakes": [
      "Assuming {...object} also copies nested objects.",
      "Using JSON stringify and parse as a safe deep copy for every value.",
      "Calling sort when code needs to preserve the original array."
    ],
    "links": [
      {
        "title": "Array methods",
        "url": "https://javascript.info/array-methods",
        "kind": "article",
        "language": "English",
        "why": "It explains copying array methods with small examples."
      }
    ]
  },
  {
    "topicId": "js-errors",
    "summary": "Error handling lets a program respond to a problem instead of stopping without a useful plan. try, catch, and finally separate normal work, recovery, and cleanup.",
    "explanation": [
      {
        "heading": "Errors are signals",
        "points": [
          "An error is a value that describes a failed operation, such as invalid input or a missing property. A thrown error normally stops the current path unless code handles it.",
          "Think of an error as a warning light in a car. The light is useful information, but it does not tell you to ignore the engine.",
          "JavaScript has built-in error objects such as TypeError for a wrong kind of value and SyntaxError for invalid code text.",
          "Read error.message for a human-readable explanation, but do not build important program decisions from an exact message because it can vary."
        ]
      },
      {
        "heading": "try and catch",
        "points": [
          "Put code that may throw inside try. If it finishes normally, the following catch block is skipped.",
          "If an error occurs in try, execution moves to catch(error). The error parameter receives the thrown value, usually an Error object.",
          "A catch should handle errors it understands and either rethrow unknown errors or let them reach a higher-level handler. Rethrow means using throw again.",
          "try...catch handles synchronous errors in its try block. For a promise, await it inside an async try block or use a promise catch handler."
        ]
      },
      {
        "heading": "Cleanup and custom errors",
        "points": [
          "finally runs after try and catch whether work succeeded or failed. Use it for cleanup, such as closing a resource or turning off a loading flag.",
          "finally can replace an earlier result if it returns or throws, so keep it focused on cleanup.",
          "A custom error is an Error object made for a known application problem. A class extending Error can give the problem a meaningful name.",
          "Set the custom error's name so logs and checks identify it clearly. Include a short message that tells the caller what input was wrong."
        ]
      },
      {
        "heading": "Design a useful boundary",
        "points": [
          "Validate input near where it enters the program, then throw a clear custom error when the input breaks a required rule.",
          "Handle an error at the level that can decide what to do next: retry, show a message, use a fallback, or stop safely.",
          "Do not use exceptions for ordinary expected branches when a simple return value is clearer. Errors suit failures that interrupt normal work.",
          "In the code, the warning light is caught only for an age rule; unexpected problems can continue upward instead of being hidden."
        ]
      }
    ],
    "terms": [
      {
        "term": "throw",
        "meaning": "To signal an error by stopping normal execution and producing a value."
      },
      {
        "term": "try",
        "meaning": "A block containing code whose thrown errors can be handled."
      },
      {
        "term": "catch",
        "meaning": "A block that receives and handles an error from its matching try."
      },
      {
        "term": "finally",
        "meaning": "A block that runs after try and catch for cleanup."
      },
      {
        "term": "custom error",
        "meaning": "An Error object created to represent a specific known problem."
      }
    ],
    "examples": [
      {
        "title": "Catch a bad conversion",
        "environment": "node",
        "code": "try {\n  JSON.parse('{bad}');\n} catch (error) {\n  console.log(error.name);\n}",
        "walkthrough": [
          "Step 1: try begins code that might fail.",
          "Step 2: JSON.parse throws because the text is not valid JSON.",
          "Step 3: catch receives the thrown error.",
          "Step 4: The log prints the error type.",
          "Step 5: The output is SyntaxError."
        ],
        "output": "SyntaxError"
      },
      {
        "title": "Use a custom validation error",
        "environment": "node",
        "code": "class AgeError extends Error {\n  constructor(message) { super(message); this.name = 'AgeError'; }\n}\nfunction register(age) {\n  if (age < 18) throw new AgeError('Adult required');\n  return 'registered';\n}\ntry {\n  console.log(register(16));\n} catch (error) {\n  console.log(`${error.name}: ${error.message}`);\n}",
        "walkthrough": [
          "Step 1: AgeError declares a custom Error class.",
          "Step 2: Its constructor stores the message and names the error.",
          "Step 3: The class body ends.",
          "Step 4: register declares a function that checks age.",
          "Step 5: An age below 18 throws the custom error.",
          "Step 6: A valid age would return registered.",
          "Step 7: try begins the attempted registration.",
          "Step 8: register throws before console.log can print a success value.",
          "Step 9: catch receives the AgeError.",
          "Step 10: The log prints its name and message.",
          "Step 11: The output is AgeError: Adult required."
        ],
        "output": "AgeError: Adult required"
      }
    ],
    "keyPoints": [
      "catch receives errors thrown in its try path.",
      "finally runs for both success and failure.",
      "Use Error subclasses for known domain failures.",
      "Rethrow errors you cannot correctly handle.",
      "try...catch does not catch later asynchronous failures by itself."
    ],
    "commonMistakes": [
      "Using an empty catch block that silently hides a real failure.",
      "Throwing strings instead of Error objects for application errors.",
      "Putting important return or throw logic in finally by accident."
    ],
    "links": [
      {
        "title": "Error handling, try...catch",
        "url": "https://javascript.info/try-catch",
        "kind": "article",
        "language": "English",
        "why": "It introduces the control flow with clear small examples."
      }
    ]
  },
  {
    "topicId": "js-json-dates-regex",
    "summary": "JSON moves simple data as text, Date represents a moment in time, and regular expressions describe text patterns. Each is useful only when you know its limits and conversions.",
    "explanation": [
      {
        "heading": "JSON is data text",
        "points": [
          "JSON, short for JavaScript Object Notation, is a text format for exchanging structured data. It looks like object and array syntax but follows stricter rules.",
          "JSON.stringify converts supported JavaScript data into JSON text. JSON.parse converts valid JSON text back into JavaScript values.",
          "JSON object keys and strings require double quotes. JSON cannot directly represent undefined, functions, Map, Set, or a cyclic object that refers back to itself.",
          "Think of JSON as a shipping label: it carries basic information, not the live object with all its JavaScript behavior."
        ]
      },
      {
        "heading": "Dates need care",
        "points": [
          "A Date object represents one time value measured in milliseconds from a standard starting point. It can display that instant in different local or UTC forms.",
          "new Date('2026-01-15T10:00:00Z') reads an ISO 8601 time string with Z meaning UTC. Use ISO text when storing or exchanging a precise instant.",
          "Date objects become ISO strings during JSON.stringify because Date provides toJSON. After JSON.parse, that value is still a string, so construct a Date again when needed.",
          "Month numbers in numeric Date constructors start at zero, so 0 means January. ISO date text uses the familiar 01 through 12 months."
        ]
      },
      {
        "heading": "Patterns with regex",
        "points": [
          "A regular expression, or regex, is a pattern used to search or test text. Write one as /pattern/flags or construct one with new RegExp.",
          "The test method returns true or false for a match. The match method can return matching text and details.",
          "Anchors ^ and $ mean the start and end of the whole string. They help validate that every character fits the pattern, not merely part of it.",
          "In the shipping-label comparison, a regex checks whether a field has the required label shape before it is sent."
        ]
      },
      {
        "heading": "Keep parsing deliberate",
        "points": [
          "Validate user input before trusting it, but remember that a simple regex can check shape without proving a real calendar date or email address.",
          "Use try...catch around JSON.parse for text from outside your program because malformed JSON throws a SyntaxError.",
          "Avoid the global g flag with repeated regex.test calls unless you understand lastIndex, because that flag can make successive tests move through the string.",
          "For dates across users, decide whether the data means an instant, a date-only value, or local clock time before choosing a format."
        ]
      }
    ],
    "terms": [
      {
        "term": "JSON",
        "meaning": "A text format for representing simple structured data."
      },
      {
        "term": "JSON.stringify",
        "meaning": "A method that converts supported JavaScript data into JSON text."
      },
      {
        "term": "JSON.parse",
        "meaning": "A method that converts valid JSON text into JavaScript values."
      },
      {
        "term": "ISO 8601",
        "meaning": "A standard date and time text format such as 2026-01-15T10:00:00Z."
      },
      {
        "term": "regular expression",
        "meaning": "A pattern used to find or test text."
      }
    ],
    "examples": [
      {
        "title": "JSON round trip",
        "environment": "node",
        "code": "const text = JSON.stringify({ name: 'Lee', active: true });\nconst user = JSON.parse(text);\nconsole.log(user.name);",
        "walkthrough": [
          "Step 1: stringify creates JSON text from a simple object.",
          "Step 2: parse creates a new JavaScript object from that text.",
          "Step 3: The log prints the parsed name.",
          "Step 4: The output is Lee."
        ],
        "output": "Lee"
      },
      {
        "title": "Check an ISO date shape",
        "environment": "node",
        "code": "const text = '2026-01-15';\nconst datePattern = /^\\d{4}-\\d{2}-\\d{2}$/;\nconst isIsoDate = datePattern.test(text);\nconst date = new Date(`${text}T00:00:00Z`);\nconsole.log(isIsoDate);\nconsole.log(date.toISOString());",
        "walkthrough": [
          "Step 1: text stores a date-only string.",
          "Step 2: datePattern requires four digits, a dash, two digits, a dash, and two digits.",
          "Step 3: test stores whether the whole text matches that shape.",
          "Step 4: A UTC time suffix makes a Date from the text.",
          "Step 5: The first log prints the pattern result.",
          "Step 6: The second log prints the Date in ISO form.",
          "Step 7: The output is true followed by the UTC midnight timestamp."
        ],
        "output": "true\n2026-01-15T00:00:00.000Z"
      }
    ],
    "keyPoints": [
      "JSON is text, not a live JavaScript object.",
      "JSON.parse can throw for invalid text.",
      "Parsed date JSON values are strings unless you convert them.",
      "A Date represents one instant.",
      "A regex can validate text shape but not every real-world rule."
    ],
    "commonMistakes": [
      "Expecting JSON.stringify to preserve functions or undefined properties.",
      "Forgetting that Date constructor month numbers start at zero.",
      "Using a regex as complete proof that a date or email is valid."
    ],
    "links": [
      {
        "title": "JSON methods, toJSON",
        "url": "https://javascript.info/json",
        "kind": "article",
        "language": "English",
        "why": "It explains stringify and parse with approachable examples."
      }
    ]
  },
  {
    "topicId": "js-map-set",
    "summary": "Map stores key-value pairs with keys of any type, while Set stores unique values. They make membership checks and keyed data clearer than forcing every job into an object or array.",
    "explanation": [
      {
        "heading": "Two useful collections",
        "points": [
          "A collection stores several values. An array keeps ordered items, while an object stores properties under string or symbol keys.",
          "A Map stores pairs: each key identifies one value. Unlike an ordinary object, a Map can use an object, number, boolean, or function as a key without turning it into a string.",
          "A Set stores values only once according to JavaScript's equality rule for sets. Adding the same primitive value again does not create another entry.",
          "Think of Map as a coat-check desk with ticket-to-coat pairs, and Set as a guest list where each name appears once."
        ]
      },
      {
        "heading": "Using Map",
        "points": [
          "new Map creates an empty map. map.set(key, value) adds or replaces a pair and returns the map, so set calls can be chained.",
          "map.get(key) returns the stored value or undefined when the key is absent. Use map.has(key) when undefined could itself be a valid stored value.",
          "map.size is the number of pairs. map.delete(key) removes one pair and reports whether it existed.",
          "Maps remember insertion order when you iterate keys, values, or entries. for...of map yields [key, value] pairs."
        ]
      },
      {
        "heading": "Using Set",
        "points": [
          "new Set(iterable) can create a set from an array or another iterable, meaning a value that can supply items one by one.",
          "set.add(value), set.has(value), set.delete(value), and set.size are the everyday operations. add returns the set for chaining.",
          "Convert a set back into an array with [...set] when you need array methods or JSON-friendly output.",
          "Set is often a simple answer to duplicate removal, but its stored object values are unique by reference, not by matching object contents."
        ]
      },
      {
        "heading": "Choose by the question",
        "points": [
          "Use Map when you ask, 'what value belongs to this key?' Use Set when you ask, 'have I seen this exact value?'",
          "Use an object for a small record with known property names, such as a user with name and age. Do not treat it as a Map merely because it holds data.",
          "In the coat-check example, the same object ticket retrieves the coat because Map preserves object identity as a key.",
          "WeakMap and WeakSet have special memory behavior, but begin with Map and Set unless you specifically need that behavior."
        ]
      }
    ],
    "terms": [
      {
        "term": "Map",
        "meaning": "A collection of key-value pairs whose keys may be any value type."
      },
      {
        "term": "Set",
        "meaning": "A collection that keeps each stored value at most once."
      },
      {
        "term": "key",
        "meaning": "A value used to find an associated value in a Map."
      },
      {
        "term": "entry",
        "meaning": "One key-value pair in a Map."
      },
      {
        "term": "iterable",
        "meaning": "A value that can provide items one at a time, such as an array or Set."
      }
    ],
    "examples": [
      {
        "title": "Keep unique tags",
        "environment": "node",
        "code": "const tags = new Set(['js', 'web', 'js']);\nconsole.log(tags.size);\nconsole.log(tags.has('web'));",
        "walkthrough": [
          "Step 1: Set receives three values but keeps js only once.",
          "Step 2: The log prints the number of unique values.",
          "Step 3: The second log checks that web exists.",
          "Step 4: The output is 2 followed by true."
        ],
        "output": "2\ntrue"
      },
      {
        "title": "Use an object as a Map key",
        "environment": "node",
        "code": "const ticket = { number: 7 };\nconst coats = new Map();\ncoats.set(ticket, 'blue coat');\nconsole.log(coats.get(ticket));\nconsole.log(coats.has({ number: 7 }));",
        "walkthrough": [
          "Step 1: ticket stores one object reference.",
          "Step 2: coats creates an empty Map.",
          "Step 3: set associates that exact ticket object with a coat.",
          "Step 4: get with the same object prints the stored coat.",
          "Step 5: A different object with similar contents is not the same key, so has prints false.",
          "Step 6: The output is blue coat followed by false."
        ],
        "output": "blue coat\nfalse"
      }
    ],
    "keyPoints": [
      "Map keys can be any value type.",
      "Set removes duplicate primitive values.",
      "Use has when a Map value might be undefined.",
      "Maps iterate in insertion order.",
      "Object equality in Map and Set uses object identity."
    ],
    "commonMistakes": [
      "Using map.key instead of map.get(key).",
      "Expecting two separately created but equal-looking objects to be the same Map key.",
      "Using an object when a Set clearly describes a unique membership list."
    ],
    "links": [
      {
        "title": "Map and Set",
        "url": "https://javascript.info/map-set",
        "kind": "article",
        "language": "English",
        "why": "It compares both collections and their everyday methods."
      }
    ]
  },
  {
    "topicId": "js-callbacks-promises",
    "summary": "Callbacks pass a function to receive a later result, while promises represent that future result as an object. Promises usually make success and failure flow easier to combine and read.",
    "explanation": [
      {
        "heading": "Work that finishes later",
        "points": [
          "Asynchronous work starts now but supplies its result later, such as a timer or network request. Code needs a way to say what happens after it finishes.",
          "A callback is a function passed to another function for it to call later. Think of leaving your phone number with a repair shop so it can call when the job is ready.",
          "A callback-style API often uses an error-first shape: callback(error, result). The first argument is null on success and holds an error on failure.",
          "The function receiving the callback controls when and how many times it calls it, so callers must read that API's contract."
        ]
      },
      {
        "heading": "Callback limits",
        "points": [
          "Callbacks work well for one small operation. Nested dependent operations can become hard to follow because each next step sits inside the last callback.",
          "This nesting is often called callback hell, meaning deeply indented callbacks that mix success paths and error paths.",
          "A callback can theoretically be called twice, never called, or called both synchronously and asynchronously unless the API promises otherwise.",
          "These risks do not make callbacks bad; they mean the caller depends strongly on the callback API behaving correctly."
        ]
      },
      {
        "heading": "A promise is a future result",
        "points": [
          "A promise is an object that represents one eventual success value or failure reason. It starts pending and then settles once as fulfilled or rejected.",
          "then registers a success handler and returns a new promise. catch registers a rejection handler, including errors thrown earlier in the chain.",
          "Returning a plain value from then passes it to the next then. Returning another promise makes the chain wait for that promise.",
          "The repair-shop comparison changes from waiting for a phone call to holding a numbered receipt that can be passed through each next step."
        ]
      },
      {
        "heading": "Pick and convert carefully",
        "points": [
          "Prefer a promise-returning API when one future result should flow through several operations or share one error path.",
          "new Promise runs its executor immediately. Use it mainly to wrap a trustworthy callback API, and settle it once with resolve or reject.",
          "Do not wrap a promise-returning function in new Promise without a reason; returning its promise directly preserves errors more simply.",
          "Promises schedule their then handlers asynchronously, even when the promise was already fulfilled, which gives a consistent later-handling model."
        ]
      }
    ],
    "terms": [
      {
        "term": "asynchronous",
        "meaning": "Describing work whose result is handled later."
      },
      {
        "term": "callback",
        "meaning": "A function passed to another function for it to call."
      },
      {
        "term": "promise",
        "meaning": "An object representing one future success value or failure reason."
      },
      {
        "term": "fulfilled",
        "meaning": "The settled promise state containing a success value."
      },
      {
        "term": "rejected",
        "meaning": "The settled promise state containing a failure reason."
      }
    ],
    "examples": [
      {
        "title": "A callback receives a result",
        "environment": "node",
        "code": "function doubleLater(value, callback) {\n  setTimeout(() => callback(null, value * 2), 0);\n}\ndoubleLater(3, (error, result) => console.log(result));",
        "walkthrough": [
          "Step 1: doubleLater declares a function that accepts a value and callback.",
          "Step 2: The timer later calls the callback with no error and a doubled result.",
          "Step 3: The call supplies 3 and a callback that prints its result.",
          "Step 4: The output is 6."
        ],
        "output": "6"
      },
      {
        "title": "Wrap a callback as a promise",
        "environment": "node",
        "code": "function doubleLater(value) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve(value * 2), 0);\n  });\n}\ndoubleLater(3)\n  .then(value => value + 1)\n  .then(value => console.log(value));",
        "walkthrough": [
          "Step 1: doubleLater declares a promise-returning function.",
          "Step 2: new Promise creates the future result and receives resolve.",
          "Step 3: The timer later fulfills the promise with a doubled value.",
          "Step 4: The promise executor ends.",
          "Step 5: The function body ends.",
          "Step 6: Calling the function starts the chain.",
          "Step 7: The first then adds one to the fulfilled value.",
          "Step 8: The second then prints the new value.",
          "Step 9: The output is 7."
        ],
        "output": "7"
      }
    ],
    "keyPoints": [
      "Callbacks give control of timing to another function.",
      "A promise settles only once.",
      "then creates a new promise for chaining.",
      "catch handles rejections and earlier thrown errors.",
      "Wrap callback APIs carefully and settle every path."
    ],
    "commonMistakes": [
      "Calling a callback immediately instead of passing the function.",
      "Forgetting to return a promise or value from a then handler.",
      "Creating new Promise around an API that already returns a promise."
    ],
    "links": [
      {
        "title": "Introduction: callbacks",
        "url": "https://javascript.info/callbacks",
        "kind": "article",
        "language": "English",
        "why": "It starts with simple later-running functions before promises."
      }
    ]
  },
  {
    "topicId": "js-promises",
    "summary": "A promise is an object for a result that will arrive later or fail. It lets code handle success and errors in a clear chain.",
    "explanation": [
      {
        "heading": "A result later",
        "points": [
          "A promise is like a restaurant order slip: it is pending while work is happening, then succeeds or fails later.",
          "A promise can be pending, fulfilled with a value, or rejected with a reason. Once settled, it cannot change state again.",
          "Asynchronous work is work whose result is handled later, such as a timer, file read, or network request.",
          "The promise is the receipt for the future result; it is not the result itself while work is pending."
        ]
      },
      {
        "heading": "Create one",
        "points": [
          "new Promise creates a promise and immediately runs its executor, the function passed to the constructor.",
          "The executor receives resolve and reject functions. Call resolve(value) for success or reject(error) for failure.",
          "Use new Promise mainly to adapt an existing callback-style API, rather than wrapping code that already returns a promise.",
          "If the executor throws before settlement, JavaScript turns that thrown error into a rejection."
        ]
      },
      {
        "heading": "Use and chain",
        "points": [
          "then registers a success handler and returns a new promise, which makes chaining possible.",
          "Return a value from then to pass it to the next then. Return a promise to make the chain wait for it.",
          "catch handles a rejection or an error thrown earlier in the chain. finally runs after settlement for cleanup and normally passes the original result onward.",
          "Put catch near the end when one error handler should cover several earlier chain steps."
        ]
      },
      {
        "heading": "Wrap a callback",
        "points": [
          "A callback-style function reports later by calling a function you give it. A wrapper can return a promise instead.",
          "Inside the wrapper callback, call reject for an error and resolve for the useful result.",
          "The caller can then use one then/catch chain instead of nesting callbacks.",
          "Always ensure every callback path settles the wrapper, otherwise callers can wait forever on a pending promise."
        ]
      }
    ],
    "terms": [
      {
        "term": "promise",
        "meaning": "An object representing a future success value or failure reason."
      },
      {
        "term": "pending",
        "meaning": "The promise state while no success or failure result has been chosen."
      },
      {
        "term": "fulfilled",
        "meaning": "The promise state after it successfully receives a value."
      },
      {
        "term": "rejected",
        "meaning": "The promise state after it fails with a reason."
      },
      {
        "term": "executor",
        "meaning": "The function that new Promise runs immediately with resolve and reject."
      },
      {
        "term": "chaining",
        "meaning": "Connecting promise handlers by returning values or promises to the next handler."
      }
    ],
    "examples": [
      {
        "title": "Resolve then use",
        "environment": "node",
        "code": "const result = Promise.resolve(4);\nresult.then(value => {\n  console.log(value * 2);\n});",
        "walkthrough": [
          "Step 1: Promise.resolve creates an already fulfilled promise with 4.",
          "Step 2: then schedules its success handler.",
          "Step 3: The handler multiplies 4 and prints 8."
        ],
        "output": "8"
      },
      {
        "title": "Wrap a callback",
        "environment": "node",
        "code": "function readLater(callback) {\n  setTimeout(() => callback(null, 'done'), 0);\n}\nfunction readPromise() {\n  return new Promise((resolve, reject) => {\n    readLater((error, value) => error ? reject(error) : resolve(value));\n  });\n}\nreadPromise().then(value => console.log(value)).catch(console.error);",
        "walkthrough": [
          "Step 1: readPromise creates a promise and starts the callback API.",
          "Step 2: readLater later calls its callback with a value and no error.",
          "Step 3: The wrapper calls resolve with that value.",
          "Step 4: then receives the fulfilled value and prints it."
        ],
        "output": "done"
      }
    ],
    "keyPoints": [
      "A promise settles once as fulfilled or rejected.",
      "The Promise executor runs immediately.",
      "then returns a new promise for chaining.",
      "Return values or promises from handlers instead of nesting.",
      "catch handles earlier chain failures and finally is for cleanup."
    ],
    "commonMistakes": [
      "Thinking new Promise delays its executor until then is called.",
      "Forgetting to return a value or promise from a then handler when the next step needs it.",
      "Using finally to transform the main success value."
    ],
    "links": [
      {
        "title": "Promise",
        "url": "https://javascript.info/promise-basics",
        "kind": "article",
        "language": "English",
        "why": "It explains states, creation, and handlers in small steps."
      }
    ]
  },
  {
    "topicId": "js-async-await",
    "summary": "async and await let promise-based code read in a top-to-bottom style. Error handling still needs try...catch or a returned rejected promise.",
    "explanation": [
      {
        "heading": "Promise syntax with a pause",
        "points": [
          "An async function is a function marked with async that always returns a promise. A returned plain value becomes a fulfilled promise value.",
          "await pauses only that async function until an awaited promise settles; it does not block the whole JavaScript program. Other queued work can continue.",
          "Think of await as placing a bookmark in one chapter while you read a different available chapter. The bookmarked function resumes when its result arrives.",
          "await can use a non-promise value too, but it is most useful for a promise from an asynchronous operation."
        ]
      },
      {
        "heading": "Success flow",
        "points": [
          "Write const result = await getData() to wait for a result before the next line in the async function runs. This makes dependent steps easier to read.",
          "If an awaited promise fulfills, await produces its value. If it rejects, await throws its rejection reason at that line.",
          "Call an async function to start it, then either await its returned promise from another async context or attach then and catch.",
          "Starting several promises before awaiting them can let independent work happen together; awaiting each creation immediately makes them run one after another."
        ]
      },
      {
        "heading": "Handle failure and cleanup",
        "points": [
          "Use try around awaited work and catch(error) for a failure you can handle. The catch receives an error just like synchronous try...catch.",
          "Use finally for cleanup that must occur after either outcome, such as resetting a loading state. Avoid replacing the result from finally.",
          "An async function that throws returns a rejected promise. If nobody awaits or catches it, the runtime can report an unhandled rejection.",
          "The bookmark comparison applies here: when the awaited operation fails, control jumps to the catch that can decide the next page."
        ]
      },
      {
        "heading": "Keep concurrency intentional",
        "points": [
          "Use Promise.all with await when several independent results are all required. It starts from the promises you give it and rejects when one rejects.",
          "Do not use await inside Array.prototype.forEach expecting the outer function to wait; use for...of for sequence or Promise.all with map for parallel work.",
          "Keep functions small: one async function can fetch or compute, while another chooses how to display or recover from errors.",
          "Top-level await works in modern ES modules, but an async function is the portable beginner pattern for Node scripts."
        ]
      }
    ],
    "terms": [
      {
        "term": "async function",
        "meaning": "A function marked async that always returns a promise."
      },
      {
        "term": "await",
        "meaning": "An operator that pauses an async function until a promise settles."
      },
      {
        "term": "rejection",
        "meaning": "A promise failure result that await throws."
      },
      {
        "term": "unhandled rejection",
        "meaning": "A rejected promise with no error handler attached in time."
      },
      {
        "term": "concurrency",
        "meaning": "Starting independent work so it can make progress during the same period."
      }
    ],
    "examples": [
      {
        "title": "Await a value",
        "environment": "node",
        "code": "async function answer() {\n  const value = await Promise.resolve(42);\n  console.log(value);\n}\nanswer();",
        "walkthrough": [
          "Step 1: answer declares an async function.",
          "Step 2: await receives the fulfilled promise value 42.",
          "Step 3: The log prints that value after await resumes.",
          "Step 4: The function body ends.",
          "Step 5: Calling answer starts the async function.",
          "Step 6: The output is 42."
        ],
        "output": "42"
      },
      {
        "title": "Catch an awaited rejection",
        "environment": "node",
        "code": "async function loadName() {\n  try {\n    await Promise.reject(new Error('offline'));\n  } catch (error) {\n    console.log(`Fallback: ${error.message}`);\n  } finally {\n    console.log('finished');\n  }\n}\nloadName();",
        "walkthrough": [
          "Step 1: loadName declares an async function.",
          "Step 2: try begins the awaited work.",
          "Step 3: The rejected promise makes await throw an Error.",
          "Step 4: The try block ends because of that error.",
          "Step 5: catch receives the error.",
          "Step 6: The log prints a fallback message.",
          "Step 7: finally begins cleanup.",
          "Step 8: The cleanup log runs.",
          "Step 9: The function body ends.",
          "Step 10: Calling loadName starts the function.",
          "Step 11: The output is the fallback line followed by finished."
        ],
        "output": "Fallback: offline\nfinished"
      }
    ],
    "keyPoints": [
      "async functions always return promises.",
      "await pauses one async function, not all JavaScript.",
      "Rejected awaited promises throw at the await line.",
      "Use try...catch for awaited errors.",
      "Start independent promises before awaiting them when parallel progress is wanted."
    ],
    "commonMistakes": [
      "Forgetting that an async function call returns a promise.",
      "Using await in forEach and expecting the surrounding code to wait.",
      "Catching an error but silently hiding an unexpected failure."
    ],
    "links": [
      {
        "title": "Async/await",
        "url": "https://javascript.info/async-await",
        "kind": "article",
        "language": "English",
        "why": "It explains async return values, await, and error handling in order."
      }
    ]
  },
  {
    "topicId": "js-event-loop",
    "summary": "The event loop decides when queued asynchronous callbacks may run after current JavaScript finishes. It explains why promise handlers usually print before timers.",
    "explanation": [
      {
        "heading": "One worker",
        "points": [
          "The call stack is the stack of functions JavaScript is running right now. JavaScript runs one stack frame at a time.",
          "Picture a single cashier: they finish the current customer before starting a queued request.",
          "Synchronous code runs on the current stack, so its logs happen before delayed callbacks.",
          "A stack frame is one active function call, including its current work and local values."
        ]
      },
      {
        "heading": "Two queues",
        "points": [
          "A macrotask is a later unit of work, such as a timer callback. setTimeout adds its callback after the delay is eligible, not exactly at that moment.",
          "A microtask is a higher-priority small job, such as a settled promise handler or queueMicrotask callback.",
          "After current code or a macrotask finishes, JavaScript drains all available microtasks before taking the next macrotask.",
          "A microtask that adds another microtask keeps the drain going before timers get their next turn."
        ]
      },
      {
        "heading": "Read output order",
        "points": [
          "First read ordinary console.log calls in source order because they run on the current stack.",
          "Then read promise then callbacks as microtasks, in the order they were queued.",
          "Finally read eligible timer callbacks as macrotasks. A long task can delay all queued work.",
          "This order is a reliable way to answer common interview output questions without guessing."
        ]
      },
      {
        "heading": "Node additions",
        "points": [
          "Node has process.nextTick, which queues work in Node's next-tick queue and normally runs before promise microtasks after the current operation.",
          "setImmediate queues a callback for Node's check phase. Its order against setTimeout(..., 0) is not guaranteed from top-level code.",
          "Do not keep scheduling nextTick recursively, because it can prevent promise and timer callbacks from getting a turn.",
          "Browser-specific rendering is not part of Node, so do not use browser painting rules to explain Node output."
        ]
      }
    ],
    "terms": [
      {
        "term": "call stack",
        "meaning": "The ordered stack of functions currently executing."
      },
      {
        "term": "event loop",
        "meaning": "The scheduler that lets queued callbacks run when JavaScript is free."
      },
      {
        "term": "microtask",
        "meaning": "A high-priority queued job such as a promise handler."
      },
      {
        "term": "macrotask",
        "meaning": "A queued task such as a timer callback."
      },
      {
        "term": "process.nextTick",
        "meaning": "A Node scheduling API whose callbacks run before promise microtasks after an operation."
      }
    ],
    "examples": [
      {
        "title": "Promise before timer",
        "environment": "node",
        "code": "setTimeout(() => console.log('timer'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('script');",
        "walkthrough": [
          "Step 1: The timer callback is queued as a later task.",
          "Step 2: The promise handler is queued as a microtask.",
          "Step 3: The current script prints first, then the microtask, then the timer."
        ],
        "output": "script\npromise\ntimer"
      },
      {
        "title": "Node queue order",
        "environment": "node",
        "code": "console.log('start');\nsetTimeout(() => console.log('timer'), 0);\nPromise.resolve().then(() => console.log('promise'));\nprocess.nextTick(() => console.log('nextTick'));\nconsole.log('end');",
        "walkthrough": [
          "Step 1: The two ordinary logs run on the current stack.",
          "Step 2: Node runs the nextTick queue after the script.",
          "Step 3: It then runs the promise microtask.",
          "Step 4: The timer callback runs later."
        ],
        "output": "start\nend\nnextTick\npromise\ntimer"
      }
    ],
    "keyPoints": [
      "Current synchronous code finishes first.",
      "Promise handlers are microtasks.",
      "Microtasks drain before the next timer task.",
      "setTimeout delay is a minimum wait, not an exact run time.",
      "In Node, nextTick normally precedes promise microtasks."
    ],
    "commonMistakes": [
      "Expecting a zero-delay timer to run immediately.",
      "Calling every async callback a timer task.",
      "Assuming setImmediate always beats a zero-delay timer in Node."
    ],
    "links": [
      {
        "title": "Event loop: microtasks and macrotasks",
        "url": "https://javascript.info/event-loop",
        "kind": "article",
        "language": "English",
        "why": "It gives a careful output-order model with diagrams."
      }
    ]
  },
  {
    "topicId": "js-timers",
    "summary": "setTimeout schedules one later callback and setInterval schedules repeated callbacks. Their delay is a minimum waiting time, not a guarantee of exact timing.",
    "explanation": [
      {
        "heading": "Schedule instead of wait",
        "points": [
          "A timer asks the runtime to make a callback eligible later. JavaScript continues running the current code instead of stopping for the delay.",
          "setTimeout(callback, delay) schedules one callback after at least delay milliseconds. One thousand milliseconds is one second.",
          "setInterval(callback, delay) schedules repeated callbacks with a requested interval. Both functions return an identifier used to cancel the timer.",
          "Think of a timer as taking a number at a busy counter: your number becomes ready later, but the clerk must finish current work before calling it."
        ]
      },
      {
        "heading": "Cancel and avoid leaks",
        "points": [
          "clearTimeout(id) cancels a timeout that has not run. clearInterval(id) stops future interval callbacks.",
          "Store the returned identifier when a timer might need cancellation, such as when a user leaves a screen or a task finishes early.",
          "An interval continues until cleared or the program ends. Forgetting to clear one can keep work and references alive longer than intended.",
          "Pass a function to a timer, not the result of calling that function. setTimeout(doWork(), 100) runs doWork immediately."
        ]
      },
      {
        "heading": "Timing is not exact",
        "points": [
          "The delay is a minimum, because a callback waits until the current JavaScript work and earlier queued work allow it to run.",
          "A zero-delay timeout still runs later, after the current synchronous code has finished. It is useful for scheduling, not immediate execution.",
          "Long callbacks and a busy event loop can make interval ticks arrive late. Do not use ordinary timers as a precise clock.",
          "In the counter comparison, a ready number cannot interrupt the clerk's current customer; the callback cannot interrupt current JavaScript."
        ]
      },
      {
        "heading": "Repeated work safely",
        "points": [
          "For repeated asynchronous work that may take longer than the interval, schedule the next timeout after the current work finishes. This avoids overlapping operations.",
          "An interval is fine for small repeated checks when overlap is harmless and you always clear it.",
          "In Node, a pending timer usually keeps the event loop alive. timer.unref can change that behavior, but it is an advanced choice.",
          "A recursive timeout is a function that schedules its next timeout only after its present callback completes. It gives each run space to finish before another begins.",
          "Test timer code by checking ordering and cancellation, not by expecting an exact millisecond timestamp."
        ]
      }
    ],
    "terms": [
      {
        "term": "setTimeout",
        "meaning": "A function that schedules one callback after a minimum delay."
      },
      {
        "term": "setInterval",
        "meaning": "A function that schedules a callback repeatedly at a requested interval."
      },
      {
        "term": "callback",
        "meaning": "A function saved for another operation to run later."
      },
      {
        "term": "timer identifier",
        "meaning": "The value returned by a timer function and used to cancel it."
      },
      {
        "term": "event loop",
        "meaning": "The runtime scheduling process that runs queued callbacks when JavaScript is free."
      }
    ],
    "examples": [
      {
        "title": "One later callback",
        "environment": "node",
        "code": "console.log('start');\nsetTimeout(() => console.log('later'), 0);\nconsole.log('end');",
        "walkthrough": [
          "Step 1: The first log runs now.",
          "Step 2: The timeout schedules its callback for a later turn.",
          "Step 3: The second ordinary log still runs now.",
          "Step 4: The queued callback later prints its text.",
          "Step 5: The output is start, end, then later."
        ],
        "output": "start\nend\nlater"
      },
      {
        "title": "Stop an interval",
        "environment": "node",
        "code": "let count = 0;\nconst id = setInterval(() => {\n  count += 1;\n  console.log(count);\n  if (count === 2) clearInterval(id);\n}, 1);",
        "walkthrough": [
          "Step 1: count starts at zero.",
          "Step 2: setInterval schedules repeated calls and stores its identifier.",
          "Step 3: The callback begins on each tick.",
          "Step 4: The callback increases count.",
          "Step 5: The log prints the current count.",
          "Step 6: At count two, clearInterval stops future ticks.",
          "Step 7: The callback body ends.",
          "Step 8: The output is 1 followed by 2."
        ],
        "output": "1\n2"
      }
    ],
    "keyPoints": [
      "Timers schedule callbacks; they do not block code.",
      "A delay is a minimum, not exact timing.",
      "Keep an identifier when cancellation is needed.",
      "Use clearTimeout or clearInterval to stop pending work.",
      "Do not pass a called function result where a callback is required."
    ],
    "commonMistakes": [
      "Expecting setTimeout with zero delay to run before later synchronous lines.",
      "Forgetting to clear an interval that is no longer needed.",
      "Using setInterval for slow work that can overlap itself."
    ],
    "links": [
      {
        "title": "Scheduling: setTimeout and setInterval",
        "url": "https://javascript.info/settimeout-setinterval",
        "kind": "article",
        "language": "English",
        "why": "It explains scheduling, cancellation, and delay limits with examples."
      }
    ]
  },
  {
    "topicId": "js-promise-combinators",
    "summary": "Promise combinators wait for a group of promises using different success rules. Choose all, allSettled, race, or any based on whether you need every result, every report, the first settlement, or the first success.",
    "explanation": [
      {
        "heading": "One group, different questions",
        "points": [
          "A promise combinator takes several promises and returns one new promise describing the group. It does not cancel the input promises when its own result settles.",
          "Think of promises as several delivery slips. The combinator is the rule for when you stop waiting and what report you receive.",
          "Pass an iterable, usually an array, to these methods. Plain values are accepted too and are treated like already-fulfilled promises.",
          "Start independent operations before combining them so they can make progress together."
        ]
      },
      {
        "heading": "All and allSettled",
        "points": [
          "Promise.all fulfills when every input fulfills and gives an array of values in input order, not completion order. It rejects as soon as one input rejects.",
          "Use all when every piece is required, such as data needed to build one screen. Add catch around it when any request may fail.",
          "Promise.allSettled waits for every input to settle. It fulfills with report objects whose status is fulfilled or rejected and whose value or reason explains that input.",
          "Use allSettled when a partial report is useful, such as showing which independent uploads succeeded."
        ]
      },
      {
        "heading": "race and any",
        "points": [
          "Promise.race settles with the first input promise that settles, whether it fulfills or rejects. Use it for a timeout race only when you also handle the losing operation responsibly.",
          "Promise.any fulfills with the first input that fulfills. It ignores early rejections, but rejects with an AggregateError if every input rejects.",
          "An AggregateError is an error holding several individual failure reasons. Check its errors property when you need the details.",
          "The delivery-slip comparison helps: race accepts the first completed slip, while any waits specifically for the first successful delivery."
        ]
      },
      {
        "heading": "Write a small combinator",
        "points": [
          "You can build a simple all-like function with Promise.resolve for each input, an output array, and a remaining count. Promise.resolve also adopts a passed promise.",
          "Keep input positions so results remain in input order even when completion order differs. Reject immediately on the first failure for all-like behavior.",
          "Handle an empty input deliberately: Promise.all([]) fulfills immediately with an empty array, while Promise.race([]) stays pending.",
          "Use built-ins in production unless a custom rule is genuinely different; they are clearer and cover tricky edge cases."
        ]
      }
    ],
    "terms": [
      {
        "term": "Promise.all",
        "meaning": "A combinator that fulfills with all values or rejects when one input rejects."
      },
      {
        "term": "Promise.allSettled",
        "meaning": "A combinator that fulfills with a status report for every input."
      },
      {
        "term": "Promise.race",
        "meaning": "A combinator that settles with the first input to settle."
      },
      {
        "term": "Promise.any",
        "meaning": "A combinator that fulfills with the first input to fulfill."
      },
      {
        "term": "AggregateError",
        "meaning": "An error containing several individual failure reasons."
      }
    ],
    "examples": [
      {
        "title": "Keep input order with all",
        "environment": "node",
        "code": "const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 5));\nconst fast = Promise.resolve('fast');\nPromise.all([slow, fast]).then(values => console.log(values.join(', ')));",
        "walkthrough": [
          "Step 1: slow creates a promise that fulfills later.",
          "Step 2: fast creates an already-fulfilled promise.",
          "Step 3: all waits for both and prints values in input order.",
          "Step 4: The output is slow, fast."
        ],
        "output": "slow, fast"
      },
      {
        "title": "Write an all-like helper",
        "environment": "node",
        "code": "function allValues(items) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let remaining = items.length;\n    if (remaining === 0) resolve(results);\n    items.forEach((item, index) => Promise.resolve(item).then(value => {\n      results[index] = value;\n      remaining -= 1;\n      if (remaining === 0) resolve(results);\n    }, reject));\n  });\n}\nallValues([Promise.resolve('A'), 'B']).then(values => console.log(values.join('-')));",
        "walkthrough": [
          "Step 1: allValues declares an all-like helper.",
          "Step 2: It creates the promise returned to the caller.",
          "Step 3: results will hold values at their input positions.",
          "Step 4: remaining counts unfinished inputs.",
          "Step 5: An empty list resolves immediately.",
          "Step 6: forEach begins handling each input.",
          "Step 7: Promise.resolve turns each item into a promise and waits for its value.",
          "Step 8: A fulfilled value is stored at its original index.",
          "Step 9: remaining decreases after one success.",
          "Step 10: When no inputs remain, the helper resolves with results.",
          "Step 11: A rejection rejects the helper immediately.",
          "Step 12: The executor ends.",
          "Step 13: The function body ends.",
          "Step 14: The helper receives one promise and one plain value, then prints both results.",
          "Step 15: The output is A-B."
        ],
        "output": "A-B"
      }
    ],
    "keyPoints": [
      "all needs every success and preserves input order.",
      "allSettled always reports every outcome.",
      "race uses the first settlement, including failure.",
      "any uses the first success and rejects only if all fail.",
      "Combinators do not automatically cancel remaining input work."
    ],
    "commonMistakes": [
      "Assuming Promise.all returns results in completion order.",
      "Using race when the first rejection should not end the operation.",
      "Forgetting that Promise.any rejects with AggregateError when every input fails."
    ],
    "links": [
      {
        "title": "Promise API",
        "url": "https://javascript.info/promise-api",
        "kind": "article",
        "language": "English",
        "why": "It compares the built-in combinators with short examples."
      }
    ]
  },
  {
    "topicId": "js-debounce-throttle",
    "summary": "Debounce waits until rapid calls stop, while throttle limits calls to a steady pace. Both helpers reduce repeated work from busy events.",
    "explanation": [
      {
        "heading": "Why delay work",
        "points": [
          "Typing, scrolling, and resizing can create many events in a short time. An event is a message saying that an action or change happened.",
          "A handler is a function that responds to an event. Running expensive work in every handler call can make a page feel slow.",
          "Think of a receptionist receiving many calls. The receptionist can wait for quiet or pass messages along at a controlled pace.",
          "Debounce and throttle return wrappers, which are new functions around original functions. Code calls the wrapper instead of calling the original directly."
        ]
      },
      {
        "heading": "Debounce waits for quiet",
        "points": [
          "Debounce schedules the original function after a delay, which is a chosen wait in milliseconds. Every new wrapper call restarts that wait.",
          "A timer is a scheduled future action. clearTimeout cancels the old timer before setTimeout creates the new one.",
          "When calls finally stop, the original function runs once with the newest arguments. The receptionist delivers only the last message after the phones become quiet.",
          "Use debounce for search suggestions, autosave, or resize calculations. These jobs usually need the final state, not every intermediate state."
        ]
      },
      {
        "heading": "Throttle limits pace",
        "points": [
          "Throttle allows at most one original call during each interval, meaning a fixed block of time. It can run the first call immediately.",
          "A simple throttle ignores calls until its timer finishes. Another design saves the latest ignored call for later, so always state which design you use.",
          "For scrolling or pointer movement, steady updates can be better than one update after silence. Here the receptionist delivers messages regularly.",
          "The interval should fit measured work and user needs. A very short interval may still overload the page, while a long one can feel unresponsive."
        ]
      },
      {
        "heading": "Preserve call details",
        "points": [
          "A wrapper may be called as an object method, so it should preserve this, the object chosen for that call. Normal function syntax receives call-time this.",
          "apply calls the original function with a chosen this value and collected arguments. This makes a reusable helper work with different methods.",
          "Clear timers when later work is no longer wanted, such as when a screen is removed. Otherwise the callback can run after its feature is gone.",
          "Test a single call, many quick calls, and calls after the delay. The code examples show the receptionist rule with visible output."
        ]
      }
    ],
    "terms": [
      {
        "term": "event",
        "meaning": "A message that says an action or change happened."
      },
      {
        "term": "handler",
        "meaning": "A function that responds to an event."
      },
      {
        "term": "debounce",
        "meaning": "Delaying work until calls have stopped for a chosen time."
      },
      {
        "term": "throttle",
        "meaning": "Limiting how often work may run."
      },
      {
        "term": "wrapper",
        "meaning": "A function that adds behavior around another function."
      },
      {
        "term": "timer",
        "meaning": "A scheduled action that runs after a delay."
      }
    ],
    "examples": [
      {
        "title": "Debounce keeps the last call",
        "environment": "node",
        "code": "function debounce(fn, delay) {\n  let timer;\n  return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); };\n}\nconst report = debounce(function (value) { console.log(`${this.label}:${value}`); }, 10);\nreport.call({ label: 'last' }, 'A');\nreport.call({ label: 'last' }, 'B');",
        "walkthrough": [
          "Step 1: debounce receives original work and its delay.",
          "Step 2: timer stores the latest scheduled action.",
          "Step 3: The wrapper cancels its old timer and schedules fn with the caller's this and arguments.",
          "Step 4: The debounce declaration ends.",
          "Step 5: report becomes a debounced function that prints its caller label and value.",
          "Step 6: The first call schedules a report for A.",
          "Step 7: The second call replaces that timer with a report for B.",
          "Step 8: The output is the one shown line after the delay."
        ],
        "output": "last:B"
      },
      {
        "title": "Throttle allows one call per interval",
        "environment": "node",
        "code": "function throttle(fn, delay) {\n  let waiting = false;\n  return function (...args) {\n    if (waiting) return;\n    waiting = true;\n    fn.apply(this, args);\n    setTimeout(() => { waiting = false; }, delay);\n  };\n}\nconst report = throttle(value => console.log(value), 10);\nreport('first');\nreport('second');",
        "walkthrough": [
          "Step 1: throttle receives original work and its interval length.",
          "Step 2: waiting records whether an interval is active.",
          "Step 3: A wrapper function is returned.",
          "Step 4: Calls during an active interval leave immediately.",
          "Step 5: An allowed call starts the interval.",
          "Step 6: apply runs the original with the current call details.",
          "Step 7: A timer will allow a later call after the delay.",
          "Step 8: The wrapper declaration ends.",
          "Step 9: The throttle declaration ends.",
          "Step 10: report becomes a throttled logging function.",
          "Step 11: The first call is allowed and starts the interval.",
          "Step 12: The second call is ignored during that interval.",
          "Step 13: The output is the shown line."
        ],
        "output": "first"
      }
    ],
    "keyPoints": [
      "Debounce waits for quiet.",
      "Throttle limits frequency.",
      "Both return wrappers.",
      "Debounce clears its old timer.",
      "Preserve this and arguments when needed.",
      "Throttle designs can differ about final calls."
    ],
    "commonMistakes": [
      "Forgetting to cancel the previous debounce timer.",
      "Using an arrow wrapper when call-time this must be preserved.",
      "Assuming every throttle queues a final ignored call."
    ],
    "links": [
      {
        "title": "Debounce decorator",
        "url": "https://javascript.info/task/debounce",
        "kind": "article",
        "language": "English",
        "why": "It explains quiet-period behavior with a small practical task."
      }
    ]
  },
  {
    "topicId": "js-fetch-abort",
    "summary": "fetch sends an HTTP request and returns a promise for a response. Check HTTP status yourself and use AbortController to cancel work that is no longer needed.",
    "explanation": [
      {
        "heading": "A request and response",
        "points": [
          "fetch(url) starts an HTTP request, a standard message sent between a client and server. It returns a promise, an object representing a result that will arrive later.",
          "Await pauses only the async function until that promise settles. The result is a Response object, which contains status information and methods for reading its body.",
          "Think of fetch as ordering a package. Receiving a package at the door is not proof that the item inside is the one you ordered."
        ]
      },
      {
        "heading": "Check errors",
        "points": [
          "A fetch promise rejects for network-level failures, such as no connection or an aborted request. A server response such as 404 or 500 still usually resolves to a Response.",
          "Check response.ok before reading successful data. ok is true for HTTP status codes from 200 through 299.",
          "If ok is false, throw an Error with useful status information. A catch block can then show a safe message or choose a recovery action."
        ]
      },
      {
        "heading": "Read data",
        "points": [
          "response.json() reads the response body and parses JSON text into JavaScript data. It also returns a promise, so await it inside an async function.",
          "A response body can be read once because it is a stream, meaning data arrives in sequence. Choose json(), text(), blob(), or another reader based on the expected content.",
          "The package comparison returns here: check the label with ok, then open the package once using the matching reader."
        ]
      },
      {
        "heading": "Cancel safely",
        "points": [
          "AbortController is an object that owns a signal, a cancellation message shared with work. Pass controller.signal in fetch options.",
          "Calling controller.abort() marks the signal aborted and makes a pending fetch reject. In a catch block, recognize AbortError so normal cancellation is not shown as a failure.",
          "Abort old searches when a newer search starts, and abort requests when their page is discarded. Cancellation saves unnecessary work but does not replace normal error handling."
        ]
      }
    ],
    "terms": [
      {
        "term": "HTTP",
        "meaning": "A standard set of messages used by browsers and servers."
      },
      {
        "term": "promise",
        "meaning": "An object representing a result that may arrive later."
      },
      {
        "term": "Response",
        "meaning": "The object fetch provides for an HTTP reply."
      },
      {
        "term": "AbortController",
        "meaning": "An object used to signal that cancelable work should stop."
      },
      {
        "term": "JSON",
        "meaning": "A text format commonly used to exchange simple data."
      }
    ],
    "examples": [
      {
        "title": "Check a response",
        "environment": "node",
        "code": "const response = { ok: true, status: 200 };\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconsole.log('ready');",
        "walkthrough": [
          "Step 1: A small Response-like object represents a successful reply.",
          "Step 2: The condition is false, so no error is thrown.",
          "Step 3: The log prints the successful path.",
          "Step 4: The output is the shown line."
        ],
        "output": "ready"
      },
      {
        "title": "Abort a pending operation",
        "environment": "node",
        "code": "const controller = new AbortController();\nconst work = new Promise((resolve, reject) => {\n  controller.signal.addEventListener('abort', () => reject(new Error('cancelled')));\n});\nwork.catch(error => console.log(error.message));\ncontroller.abort();",
        "walkthrough": [
          "Step 1: A controller and its signal are created.",
          "Step 2: A pending promise is created.",
          "Step 3: The signal listener rejects when cancellation happens.",
          "Step 4: The promise executor ends.",
          "Step 5: catch prepares to print a rejection message.",
          "Step 6: abort sends the abort event.",
          "Step 7: The output is the shown line."
        ],
        "output": "cancelled"
      }
    ],
    "keyPoints": [
      "fetch resolves for HTTP error responses.",
      "Check response.ok.",
      "Body readers return promises.",
      "A response body is read once.",
      "AbortController cancels pending fetch work."
    ],
    "commonMistakes": [
      "Treating a 404 response as an automatic rejected promise.",
      "Calling response.json twice on the same body.",
      "Showing an expected abort as a user-facing error."
    ],
    "links": [
      {
        "title": "Fetch: Abort",
        "url": "https://javascript.info/fetch-abort",
        "kind": "article",
        "language": "English",
        "why": "It explains the controller and signal with direct examples."
      }
    ]
  },
  {
    "topicId": "js-dom",
    "summary": "The DOM is the browser object tree for a web page. JavaScript uses it to find elements and safely change their text, classes, and children.",
    "explanation": [
      {
        "heading": "The page as objects",
        "points": [
          "The Document Object Model, called the DOM, is the browser's object tree for an HTML page. An object is a value with named properties and actions.",
          "A node is one item in that tree, and an element is a node representing an HTML tag. document is the starting object for the whole page.",
          "Think of the page as a family tree. Parent elements contain child elements, and each child may contain further children.",
          "Changing a DOM element changes the live page the browser shows. It does not rewrite the original HTML file on disk."
        ]
      },
      {
        "heading": "Find the right element",
        "points": [
          "A selector is a CSS-style pattern for finding elements, such as '#save' or '.notice'. Choose labels tied to the feature rather than a fragile tree position.",
          "document.querySelector(selector) returns the first matching element, or null when none match. Check for null before using a result.",
          "document.querySelectorAll(selector) returns a NodeList, a list-like collection of all matches. It is useful when a change applies to several elements.",
          "In the family-tree comparison, selection finds the branch with the requested label. Keeping the selected reference can avoid repeated searches."
        ]
      },
      {
        "heading": "Change content and classes",
        "points": [
          "textContent reads or replaces plain text inside an element. It is the safer default for text that may include angle brackets.",
          "classList is an element property for CSS class names, which are reusable labels used for styling. classList.add adds one label without replacing the others.",
          "createElement makes a new detached element, meaning it is not yet in the page tree. Set its text before placing it where users can see it.",
          "append attaches a node as the last child of another element. The new family-tree branch becomes part of the live document then."
        ]
      },
      {
        "heading": "Update safely",
        "points": [
          "innerHTML parses a string as HTML, so untrusted text can create unwanted markup. Prefer textContent and created elements unless trusted HTML is required.",
          "A DOM update should handle missing selections and empty lists. Small checks stop code from trying to change null.",
          "Use classes for presentation instead of filling JavaScript with visual style details. This keeps page structure, behavior, and appearance easier to change.",
          "Test ordinary text and text containing special characters. The example connects selection, text, classes, creation, and attachment in one small update."
        ]
      }
    ],
    "terms": [
      {
        "term": "DOM",
        "meaning": "The browser object tree representing a web page."
      },
      {
        "term": "node",
        "meaning": "One item in the DOM tree."
      },
      {
        "term": "element",
        "meaning": "A node that represents an HTML tag."
      },
      {
        "term": "selector",
        "meaning": "A CSS-style pattern used to find elements."
      },
      {
        "term": "textContent",
        "meaning": "A property for an element's plain text."
      },
      {
        "term": "classList",
        "meaning": "A property used to add and remove CSS classes."
      }
    ],
    "examples": [
      {
        "title": "Select and update a message",
        "environment": "browser",
        "html": "<p id=\"message\"></p>",
        "code": "const message = document.querySelector('#message');\nmessage.textContent = 'Ready';\nmessage.classList.add('visible');\nconsole.log(`${message.textContent}:${message.classList.contains('visible')}`);",
        "walkthrough": [
          "Step 1: querySelector finds the real element whose id is message.",
          "Step 2: textContent replaces that element's plain text.",
          "Step 3: classList adds the visible CSS class.",
          "Step 4: The log reads back the text and confirms the class.",
          "Step 5: The output is the shown line."
        ],
        "output": "Ready:true"
      },
      {
        "title": "Create a list item",
        "environment": "browser",
        "html": "<ul id=\"tasks\"></ul>",
        "code": "const list = document.querySelector('#tasks');\nconst item = document.createElement('li');\nitem.textContent = 'Read notes';\nitem.classList.add('task');\nlist.append(item);\nconsole.log(`${list.children.length}:${list.lastElementChild.textContent}`);",
        "walkthrough": [
          "Step 1: querySelector finds the real task list.",
          "Step 2: createElement makes a detached li element.",
          "Step 3: textContent gives the new item plain text.",
          "Step 4: classList adds its task class.",
          "Step 5: append attaches the new item to the list.",
          "Step 6: The log reads the number of children and newest text.",
          "Step 7: The output is the shown line."
        ],
        "output": "1:Read notes"
      }
    ],
    "keyPoints": [
      "The DOM is a live page tree.",
      "querySelector returns the first match or null.",
      "textContent sets plain text.",
      "classList changes CSS labels.",
      "createElement makes a detached node.",
      "append attaches a child."
    ],
    "commonMistakes": [
      "Calling a method on a null selection.",
      "Using innerHTML for untrusted text.",
      "Expecting createElement to show an item before appending it."
    ],
    "links": [
      {
        "title": "Document",
        "url": "https://javascript.info/document",
        "kind": "article",
        "language": "English",
        "why": "It introduces DOM trees, finding elements, and safe document changes."
      }
    ]
  },
  {
    "topicId": "js-dom-events",
    "summary": "Browser events report user actions and can travel through nested elements. Understanding their path lets code delegate work, prevent defaults, and stop unwanted propagation.",
    "explanation": [
      {
        "heading": "An event travels",
        "points": [
          "An event is a browser message saying an action happened, such as a click. A listener is a function registered to react to that message.",
          "The target is the deepest element where the event began. It stays the same even while listeners on outer elements run.",
          "Think of a note traveling through rooms in a house. The note starts in one room, then can travel through the rooms around it.",
          "Most click events travel in two directions: capturing travels from outer ancestors down, then bubbling travels from the target back up. An ancestor is a containing element higher in the tree."
        ]
      },
      {
        "heading": "Capture and bubble",
        "points": [
          "addEventListener registers a listener on an element. Passing true as its third argument asks that listener to run during capturing.",
          "Without that capture option, a click listener normally runs during bubbling. A target listener runs between the capture and bubble parts of the route.",
          "event.currentTarget is the element whose listener is running now, unlike event.target. This difference matters when one parent handles many children.",
          "The first example prints the route so the house comparison becomes visible: outer capture, inner target, then outer bubble."
        ]
      },
      {
        "heading": "Delegate shared work",
        "points": [
          "Delegation means placing one listener on a common parent instead of a listener on every child. Bubbling lets the parent receive child clicks.",
          "The parent checks event.target to learn which child started the event. closest can find a matching ancestor when a click begins inside a child label or icon.",
          "Delegation also works for matching children added later, because their events still bubble to the existing parent. This can reduce repeated setup.",
          "Only act on targets inside the intended parent. This avoids accidentally handling an event from another nearby tree."
        ]
      },
      {
        "heading": "Control the event",
        "points": [
          "Some events have a default action, meaning browser behavior that happens unless code cancels it. A link click normally tries to navigate.",
          "preventDefault asks the browser not to perform that cancelable default action. It does not stop other listeners from running.",
          "stopPropagation stops the event from continuing to further elements on its route. Use it sparingly because outer code may depend on bubbling.",
          "Choose delegation before stopping propagation where possible. The second example shows a parent handling a list click while canceling a link's default action."
        ]
      }
    ],
    "terms": [
      {
        "term": "event",
        "meaning": "A browser message that says an action happened."
      },
      {
        "term": "listener",
        "meaning": "A function registered to respond to an event."
      },
      {
        "term": "target",
        "meaning": "The deepest element where an event began."
      },
      {
        "term": "capturing",
        "meaning": "The event phase that travels from outer elements toward the target."
      },
      {
        "term": "bubbling",
        "meaning": "The event phase that travels from the target toward outer elements."
      },
      {
        "term": "delegation",
        "meaning": "A parent listener handling events from its children."
      }
    ],
    "examples": [
      {
        "title": "See capture and bubble order",
        "environment": "browser",
        "html": "<div id=\"outer\">\n  <div id=\"inner\"></div>\n</div>",
        "code": "const outer = document.querySelector('#outer');\nconst inner = document.querySelector('#inner');\nouter.addEventListener('click', () => console.log('outer capture'), true);\ninner.addEventListener('click', () => console.log('inner target'));\nouter.addEventListener('click', () => console.log('outer bubble'));\ninner.dispatchEvent(new MouseEvent('click', { bubbles: true }));",
        "walkthrough": [
          "Step 1: querySelector finds the real outer element.",
          "Step 2: querySelector finds its real inner element.",
          "Step 3: A capture listener is registered on outer.",
          "Step 4: A normal listener is registered on inner for the target phase.",
          "Step 5: A normal bubbling listener is registered on outer.",
          "Step 6: A bubbling click is dispatched from inner, so listeners run along its route.",
          "Step 7: The output is the three shown lines in event order."
        ],
        "output": "outer capture\ninner target\nouter bubble"
      },
      {
        "title": "Delegate a link click",
        "environment": "browser",
        "html": "<ul id=\"menu\">\n  <li><a href=\"/docs\">Docs</a></li>\n  <li><a href=\"/api\">API</a></li>\n</ul>",
        "code": "const menu = document.querySelector('#menu');\nmenu.addEventListener('click', event => {\n  const link = event.target.closest('a');\n  if (!link || !menu.contains(link)) return;\n  event.preventDefault();\n  event.stopPropagation();\n  console.log(`chosen:${link.textContent}`);\n});\nmenu.querySelector('a').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));",
        "walkthrough": [
          "Step 1: querySelector finds the real menu element.",
          "Step 2: One click listener is registered on the menu for delegation.",
          "Step 3: closest finds the clicked link or a link containing the clicked target.",
          "Step 4: The guard ignores clicks that are not menu links.",
          "Step 5: preventDefault cancels the link navigation.",
          "Step 6: stopPropagation prevents the click from reaching outer listeners.",
          "Step 7: The selected link text is printed.",
          "Step 8: The listener function ends.",
          "Step 9: A real bubbling, cancelable click is dispatched from the menu link.",
          "Step 10: The output is the shown line."
        ],
        "output": "chosen:Docs"
      }
    ],
    "keyPoints": [
      "Events have a target.",
      "Capturing runs from outer to inner.",
      "Bubbling runs from inner to outer.",
      "Delegation uses a parent listener.",
      "preventDefault cancels browser behavior.",
      "stopPropagation stops further travel."
    ],
    "commonMistakes": [
      "Confusing event.target with event.currentTarget.",
      "Expecting preventDefault to stop bubbling.",
      "Using stopPropagation when delegation would be clearer."
    ],
    "links": [
      {
        "title": "Bubbling and capturing",
        "url": "https://javascript.info/bubbling-and-capturing",
        "kind": "article",
        "language": "English",
        "why": "It explains the event route and target with direct browser examples."
      }
    ]
  },
  {
    "topicId": "js-web-storage",
    "summary": "Web storage saves strings in the browser, while cookies can also be sent with HTTP requests. Use storage for appropriate small data and never treat it as secret storage.",
    "explanation": [
      {
        "heading": "Two storage areas",
        "points": [
          "localStorage and sessionStorage store key-value pairs for one origin. An origin is the protocol, host, and port combination for a page.",
          "localStorage normally survives closing the browser, while sessionStorage normally lasts for one tab session. Both keep only strings as keys and values.",
          "Think of localStorage as a locker at one building and sessionStorage as a desk drawer for one visit. Neither locker is a secure vault."
        ]
      },
      {
        "heading": "Read and write",
        "points": [
          "setItem stores a string and getItem returns a string or null when the key is missing. removeItem removes one key and clear removes all values in that storage area.",
          "Use JSON.stringify to turn an object into storage text. Use JSON.parse to rebuild suitable data, with error handling for missing or broken text.",
          "The locker comparison matters in code: choose stable labels for keys and package structured values clearly instead of relying on automatic string conversion."
        ]
      },
      {
        "heading": "Cookie basics",
        "points": [
          "A cookie is small browser data that may be sent with matching HTTP requests. Cookie attributes set lifetime, path, Secure transmission, and SameSite cross-site rules.",
          "Unlike cookies, web storage is not automatically included with requests. JavaScript cannot read an HttpOnly cookie, which can help protect it from scripts.",
          "Cookies often support a server need, while local preferences usually fit web storage. Security rules require server decisions as well as client code."
        ]
      },
      {
        "heading": "Safe choices",
        "points": [
          "Do not casually save passwords, private information, or security tokens in readable web storage. Scripts running on the same origin can read normal storage.",
          "Storage can be full, blocked, cleared, or outdated. Treat a stored value like outside input and validate it before using it.",
          "Store small preferences and drafts with a versioned shape. Remove or migrate old values deliberately when the application format changes."
        ]
      }
    ],
    "terms": [
      {
        "term": "origin",
        "meaning": "A page's protocol, host, and port together."
      },
      {
        "term": "localStorage",
        "meaning": "Browser string storage that normally persists."
      },
      {
        "term": "sessionStorage",
        "meaning": "Browser string storage limited to a tab session."
      },
      {
        "term": "cookie",
        "meaning": "Small browser data that may be sent with requests."
      },
      {
        "term": "JSON",
        "meaning": "Text format for simple structured data."
      }
    ],
    "examples": [
      {
        "title": "Store a theme",
        "environment": "node",
        "code": "const store = new Map();\nstore.set('theme', 'dark');\nconsole.log(store.get('theme'));",
        "walkthrough": [
          "Step 1: Map stands in for browser storage.",
          "Step 2: A theme string is stored.",
          "Step 3: The stored string is printed.",
          "Step 4: The output is the shown line."
        ],
        "output": "dark"
      },
      {
        "title": "Save JSON text",
        "environment": "node",
        "code": "const store = new Map();\nstore.set('settings', JSON.stringify({ size: 16 }));\nconst settings = JSON.parse(store.get('settings'));\nconsole.log(settings.size);",
        "walkthrough": [
          "Step 1: Map represents storage.",
          "Step 2: An object becomes JSON text and is stored.",
          "Step 3: The text becomes an object again.",
          "Step 4: The restored value is printed.",
          "Step 5: The output is the shown line."
        ],
        "output": "16"
      }
    ],
    "keyPoints": [
      "Storage values are strings.",
      "localStorage persists.",
      "sessionStorage is tab-based.",
      "Cookies may travel with requests.",
      "Do not casually store secrets."
    ],
    "commonMistakes": [
      "Storing objects without JSON conversion.",
      "Assuming a missing key is an empty string.",
      "Saving sensitive values in readable storage."
    ],
    "links": [
      {
        "title": "LocalStorage, sessionStorage",
        "url": "https://javascript.info/localstorage",
        "kind": "article",
        "language": "English",
        "why": "It compares the two browser storage areas."
      }
    ]
  },
  {
    "topicId": "js-memory",
    "summary": "JavaScript collects objects that can no longer be reached, but references you keep accidentally can cause memory leaks. Release listeners, timers, and caches when their work ends.",
    "explanation": [
      {
        "heading": "Automatic collection",
        "points": [
          "JavaScript allocates memory for values and uses garbage collection to reclaim unreachable objects. Reachable means a value can still be found from a starting reference.",
          "Roots are values the engine treats as starting points, including current local variables and global references. If a chain of references leads from a root to an object, it stays alive.",
          "Imagine a house with strings tied to useful boxes. A box can be removed only when no string connects it back to the house."
        ]
      },
      {
        "heading": "What leaks",
        "points": [
          "A memory leak is memory that remains allocated even though the program no longer needs it. The collector cannot guess that a reachable value is logically useless.",
          "A long-lived listener can retain its callback, and that callback can retain data or DOM nodes. A timer or interval can also keep running and retain values through its callback.",
          "The string comparison connects to code: a global array, listener, or timer is a string from the house. Remove it when its feature ends."
        ]
      },
      {
        "heading": "Avoid leaks",
        "points": [
          "Call removeEventListener with the same target, event type, listener function, and relevant capture setting used when adding it. Keep a named callback when removal is needed.",
          "Call clearTimeout or clearInterval for scheduled work that should not survive teardown. Avoid unbounded caches; give caches a maximum size, expiration rule, or explicit clear action.",
          "For DOM features, discard references to nodes after removing them and detach feature listeners. WeakMap can associate metadata with objects without preventing those object keys from being collected."
        ]
      },
      {
        "heading": "Investigate",
        "points": [
          "Growing memory after repeating the same screen action is a warning sign, not proof by itself. Compare heap snapshots and inspect retaining paths, which show why an object remains reachable.",
          "Do not depend on a specific moment when garbage collection runs. It is automatic and engine-controlled, so program correctness must not require immediate collection.",
          "First fix ownership: decide who creates each listener or timer and who disposes it. Small cleanup functions make the lifecycle clear and testable."
        ]
      }
    ],
    "terms": [
      {
        "term": "garbage collection",
        "meaning": "Automatic reclaiming of unreachable memory."
      },
      {
        "term": "reachable",
        "meaning": "Still findable through references from a root."
      },
      {
        "term": "memory leak",
        "meaning": "Memory kept although the program no longer needs it."
      },
      {
        "term": "listener",
        "meaning": "A callback registered to respond to an event."
      },
      {
        "term": "WeakMap",
        "meaning": "A map whose object keys do not keep those keys alive."
      }
    ],
    "examples": [
      {
        "title": "Release a reference",
        "environment": "node",
        "code": "let box = { name: 'draft' };\nconsole.log(box.name);\nbox = null;\nconsole.log(box);",
        "walkthrough": [
          "Step 1: box refers to an object.",
          "Step 2: The object name is printed.",
          "Step 3: The reference is removed.",
          "Step 4: The log prints the empty reference.",
          "Step 5: The output is the two shown lines."
        ],
        "output": "draft\nnull"
      },
      {
        "title": "Stop a repeating task",
        "environment": "node",
        "code": "let count = 0;\nconst timer = setInterval(() => {\n  count += 1;\n  console.log(count);\n  clearInterval(timer);\n}, 1);",
        "walkthrough": [
          "Step 1: count starts at zero.",
          "Step 2: A repeating timer is created.",
          "Step 3: Its callback increases count.",
          "Step 4: The callback prints count.",
          "Step 5: The callback clears its own timer.",
          "Step 6: The callback definition ends.",
          "Step 7: The output is the shown line."
        ],
        "output": "1"
      }
    ],
    "keyPoints": [
      "Collection uses reachability.",
      "Reachable does not mean useful.",
      "Listeners can retain data.",
      "Clear unwanted timers.",
      "Do not rely on collection timing."
    ],
    "commonMistakes": [
      "Expecting garbage collection to remove a globally referenced object.",
      "Adding listeners without a cleanup plan.",
      "Using an unlimited cache for changing data."
    ],
    "links": [
      {
        "title": "Garbage collection",
        "url": "https://javascript.info/garbage-collection",
        "kind": "article",
        "language": "English",
        "why": "It explains reachability with simple reference diagrams."
      }
    ]
  },
  {
    "topicId": "js-polyfills",
    "summary": "A polyfill supplies a standard feature when an older JavaScript environment does not have it. Writing small learning versions shows how array callbacks and fixed this values work.",
    "explanation": [
      {
        "heading": "Why polyfills exist",
        "points": [
          "A polyfill is code that adds a standard feature missing from an older environment, meaning the place where JavaScript runs.",
          "Think of an adapter that lets an old wall socket accept a newer plug. The adapter gives old code a missing connection.",
          "Feature detection means checking whether a capability already exists before adding one. This avoids replacing a working built-in method.",
          "A production polyfill must follow detailed standard rules. A short learning helper should clearly say which unusual cases it does not handle."
        ]
      },
      {
        "heading": "Transform and choose",
        "points": [
          "A callback is a function passed into another function so that the other function can run it later. Array helpers call a callback once for each item.",
          "A map-style helper creates a new array from callback results. In the example, each number enters the adapter and comes out doubled.",
          "A filter-style helper keeps items when its callback returns a truthy value, meaning a value JavaScript treats as true.",
          "A reduce-style helper combines items into one accumulator, which is the running result. It is useful for totals, groups, and other single answers."
        ]
      },
      {
        "heading": "Fix this with bind",
        "points": [
          "this is the object value selected when a normal function is called. The selected value can change with the way the function is invoked.",
          "bind returns a new function with a fixed this value and optional starting arguments. This is useful when passing a method elsewhere.",
          "apply calls a function with a chosen this value and an array of arguments. A learning myBind can use apply inside its returned function.",
          "Arrow functions keep this from the surrounding code, so call-time binding does not change them. Use a normal function when binding must control this."
        ]
      },
      {
        "heading": "Keep helpers honest",
        "points": [
          "A prototype is an object where instances can find shared methods. Adding methods there affects every matching value.",
          "If adding a prototype helper, make it non-enumerable so ordinary property loops do not unexpectedly see it. Native array methods behave that way.",
          "Check that a callback is a function before calling it, and decide how empty arrays or missing initial values behave. These choices matter for reduce-like helpers.",
          "Prefer native methods or tested compatibility tools in application code. Hand-written versions are best treated as learning tools unless fully tested."
        ]
      }
    ],
    "terms": [
      {
        "term": "polyfill",
        "meaning": "Code that supplies a missing standard feature."
      },
      {
        "term": "feature detection",
        "meaning": "Checking whether a feature exists before using or adding it."
      },
      {
        "term": "callback",
        "meaning": "A function another function receives and later calls."
      },
      {
        "term": "accumulator",
        "meaning": "The running result built while combining items."
      },
      {
        "term": "bind",
        "meaning": "Creating a function with a fixed this value."
      },
      {
        "term": "prototype",
        "meaning": "An object that supplies shared properties to related values."
      }
    ],
    "examples": [
      {
        "title": "Map and filter from scratch",
        "environment": "node",
        "code": "function myMap(items, fn) { const result = []; for (const item of items) result.push(fn(item)); return result; }\nfunction myFilter(items, fn) { const result = []; for (const item of items) if (fn(item)) result.push(item); return result; }\nconst doubled = myMap([1, 2, 3], number => number * 2);\nconst even = myFilter(doubled, number => number % 2 === 0);\nconsole.log(even.join(','));",
        "walkthrough": [
          "Step 1: myMap receives an array and callback, builds a fresh array with a loop, and returns each callback result.",
          "Step 2: myFilter receives an array and callback, keeps only items whose callback result is true, and returns them.",
          "Step 3: myMap calls its callback for every number and creates doubled values.",
          "Step 4: myFilter keeps the doubled numbers that are even.",
          "Step 5: The log prints the selected values as text.",
          "Step 6: The output is the shown line."
        ],
        "output": "2,4,6"
      },
      {
        "title": "Bind a greeting from scratch",
        "environment": "node",
        "code": "function myBind(fn, thisValue, ...firstArgs) {\n  return function (...laterArgs) { return fn.apply(thisValue, [...firstArgs, ...laterArgs]); };\n}\nfunction greet(punctuation) { console.log(`${this.name}${punctuation}`); }\nconst greetLee = myBind(greet, { name: 'Lee' });\ngreetLee('!');",
        "walkthrough": [
          "Step 1: myBind receives the original function, its fixed this value, and any first arguments.",
          "Step 2: It returns a wrapper that uses apply to call the original with the fixed this and all arguments.",
          "Step 3: The myBind function declaration ends.",
          "Step 4: greet reads name from this and prints a greeting.",
          "Step 5: myBind creates a function whose this value will be the object named Lee.",
          "Step 6: Calling the returned function supplies the punctuation.",
          "Step 7: The output is the shown line."
        ],
        "output": "Lee!"
      }
    ],
    "keyPoints": [
      "Polyfills fill missing standard APIs.",
      "Check before adding a feature.",
      "map transforms every item.",
      "filter chooses matching items.",
      "reduce builds one running result.",
      "bind fixes this for a returned function."
    ],
    "commonMistakes": [
      "Calling a learning helper a complete polyfill despite missing edge cases.",
      "Overwriting an existing native method without feature detection.",
      "Expecting bind to change this inside an arrow function."
    ],
    "links": [
      {
        "title": "Polyfills and transpilers",
        "url": "https://javascript.info/polyfills",
        "kind": "article",
        "language": "English",
        "why": "It introduces why missing built-in functions need polyfills."
      }
    ]
  },
  {
    "topicId": "js-deep-clone-equal",
    "summary": "Deep cloning copies nested supported data, while deep equality compares nested values. Both need clear rules because JavaScript has many value types and cycles.",
    "explanation": [
      {
        "heading": "References first",
        "points": [
          "Objects and arrays are held through references, which are routes from a variable to a value. Copying an object variable normally copies the route, not the nested object.",
          "A shallow copy makes a new outer object but shares nested references. A deep clone makes independent nested copies for the types it supports.",
          "Think of a folder containing folders. A shallow copy duplicates the cover, while a deep copy duplicates the folders inside as well."
        ]
      },
      {
        "heading": "Cloning choices",
        "points": [
          "structuredClone can deeply copy many built-in values and circular structures, where an object eventually refers back to itself. It cannot clone functions.",
          "JSON stringify and parse is not a general clone: it loses undefined and functions, changes Date objects to strings, and fails on cycles. Use it only for suitable JSON data.",
          "The folder comparison reaches code when a copied nested address can change without changing the original address. Verify the supported types before choosing a clone method."
        ]
      },
      {
        "heading": "Deep equality",
        "points": [
          "Deep equality asks whether two values have matching contents, not merely whether two references are identical. === compares object references, so two separate but similar objects are not ===.",
          "A recursive function calls itself to compare nested arrays or plain objects. It needs base cases for primitives, null, and different types.",
          "Real equality rules must specify treatment for Date, Map, Set, prototypes, symbols, property descriptors, and cycles. A small helper should say it handles only JSON-like data."
        ]
      },
      {
        "heading": "Use carefully",
        "points": [
          "Cloning everything can be slow and can hide unclear ownership. Prefer copying only the branch you will change when that meets the feature need.",
          "For tests, deep equality is useful for comparing expected plain data. For identity-sensitive work, deliberately compare references instead.",
          "Do not assume object key order changes equality semantics. Compare key sets and values by key, and prevent endless recursion when cycles are allowed."
        ]
      }
    ],
    "terms": [
      {
        "term": "reference",
        "meaning": "A route from a variable to an object or array."
      },
      {
        "term": "shallow copy",
        "meaning": "A new outer container that shares nested references."
      },
      {
        "term": "deep clone",
        "meaning": "An independent copy of nested supported values."
      },
      {
        "term": "deep equality",
        "meaning": "Comparison of nested value contents."
      },
      {
        "term": "recursive",
        "meaning": "Describing a function that calls itself for smaller work."
      }
    ],
    "examples": [
      {
        "title": "Copy a nested array",
        "environment": "node",
        "code": "const original = [[1]];\nconst copy = structuredClone(original);\ncopy[0][0] = 2;\nconsole.log(original[0][0]);\nconsole.log(copy[0][0]);",
        "walkthrough": [
          "Step 1: original contains a nested array.",
          "Step 2: structuredClone makes independent supported values.",
          "Step 3: Only the copied nested number changes.",
          "Step 4: The first log reads the original number.",
          "Step 5: The second log reads the copied number.",
          "Step 6: The output is the two shown lines."
        ],
        "output": "1\n2"
      },
      {
        "title": "Compare plain values",
        "environment": "node",
        "code": "function deepEqual(a, b) {\n  if (a === b) return true;\n  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;\n  const keys = Object.keys(a);\n  return keys.length === Object.keys(b).length && keys.every(key => deepEqual(a[key], b[key]));\n}\nconsole.log(deepEqual({ x: [1] }, { x: [1] }));",
        "walkthrough": [
          "Step 1: deepEqual receives two values.",
          "Step 2: Identical primitive values finish early.",
          "Step 3: Nonmatching non-objects finish as false.",
          "Step 4: Keys from the first object are collected.",
          "Step 5: Matching key counts and recursive values decide the result.",
          "Step 6: The function declaration ends.",
          "Step 7: Two equal plain objects are compared.",
          "Step 8: The output is the shown line."
        ],
        "output": "true"
      }
    ],
    "keyPoints": [
      "Object assignment shares references.",
      "A shallow copy shares nested objects.",
      "structuredClone supports many values.",
      "JSON cloning has limits.",
      "Deep equality needs defined rules."
    ],
    "commonMistakes": [
      "Using JSON cloning for Date or cyclic data.",
      "Calling separate equal objects strictly equal.",
      "Writing recursive comparison without cycle handling."
    ],
    "links": [
      {
        "title": "Object references and copying",
        "url": "https://javascript.info/object-copy",
        "kind": "article",
        "language": "English",
        "why": "It starts with the essential difference between values and object references."
      }
    ]
  },
  {
    "topicId": "js-array-utilities",
    "summary": "Small utilities can flatten nested arrays, group records, and remove duplicates. Make each utility's input, output, order, and equality rules explicit.",
    "explanation": [
      {
        "heading": "Transform collections",
        "points": [
          "An array is an ordered list of values, while an object maps property names to values. Utilities turn raw collections into shapes that a feature can use.",
          "Flattening turns nested arrays into one list. Think of unpacking small boxes from larger boxes until all items sit on one table.",
          "Array.prototype.flat(depth) handles a chosen nesting depth, and flat(Infinity) handles all depths. For known data, prefer a clear built-in method over a clever loop."
        ]
      },
      {
        "heading": "Group records",
        "points": [
          "Grouping places items into buckets based on a key, such as orders by status. A bucket is simply the array stored for one group.",
          "reduce visits items and returns an accumulator, the running result. Start with an empty object or Map, then create a bucket when a key first appears.",
          "The table comparison applies: each record is placed in the labeled box for its status. Keep the original item rather than losing information by storing only a count too early."
        ]
      },
      {
        "heading": "Remove duplicates",
        "points": [
          "A Set stores each distinct value once according to JavaScript's SameValueZero equality rule. For primitive strings and numbers, new Set(values) is a simple unique utility.",
          "Separate object literals are different references even if their visible properties match. To make objects unique by id, keep a Set of seen ids or use a Map keyed by id.",
          "Decide whether first or last duplicate wins and whether output order matters. State that decision in the utility name or documentation."
        ]
      },
      {
        "heading": "Practical choices",
        "points": [
          "Avoid mutating input unless the function clearly promises it. Methods such as map, filter, reduce, flat, and Array.from can return new arrays.",
          "Validate missing keys and unexpected non-array values at the boundary where data enters. A grouping key like '__proto__' needs care with ordinary objects; Map accepts arbitrary keys safely.",
          "Test empty arrays, one item, duplicates, and nested empty arrays. Small utilities become reliable building blocks when their edge cases are deliberate."
        ]
      }
    ],
    "terms": [
      {
        "term": "flatten",
        "meaning": "To turn nested arrays into a less nested list."
      },
      {
        "term": "grouping",
        "meaning": "Putting items into collections based on a shared key."
      },
      {
        "term": "accumulator",
        "meaning": "The running result built during reduction."
      },
      {
        "term": "Set",
        "meaning": "A collection that keeps each distinct value once."
      },
      {
        "term": "reference",
        "meaning": "The identity route used for objects and arrays."
      }
    ],
    "examples": [
      {
        "title": "Flatten values",
        "environment": "node",
        "code": "const nested = [1, [2, 3]];\nconst flat = nested.flat();\nconsole.log(flat.join(','));",
        "walkthrough": [
          "Step 1: nested has a smaller array inside it.",
          "Step 2: flat removes one level of nesting.",
          "Step 3: The log prints the flat array values.",
          "Step 4: The output is the shown line."
        ],
        "output": "1,2,3"
      },
      {
        "title": "Group and make unique",
        "environment": "node",
        "code": "const orders = [{ status: 'new', id: 1 }, { status: 'new', id: 2 }, { status: 'done', id: 1 }];\nconst groups = orders.reduce((result, order) => {\n  (result[order.status] ??= []).push(order.id);\n  return result;\n}, {});\nconst ids = [...new Set(orders.map(order => order.id))];\nconsole.log(groups.new.join(','));\nconsole.log(ids.join(','));",
        "walkthrough": [
          "Step 1: orders contains records with status and id.",
          "Step 2: reduce begins building group buckets.",
          "Step 3: The matching status bucket receives an id.",
          "Step 4: The running grouping object is returned.",
          "Step 5: reduce receives an empty initial object.",
          "Step 6: Set removes repeated primitive ids.",
          "Step 7: The first log prints the new bucket.",
          "Step 8: The second log prints unique ids.",
          "Step 9: The output is the two shown lines."
        ],
        "output": "1,2\n1,2"
      }
    ],
    "keyPoints": [
      "flat removes nesting.",
      "reduce can build groups.",
      "A Set removes duplicate primitives.",
      "Objects compare by reference.",
      "Define ordering rules."
    ],
    "commonMistakes": [
      "Expecting Set to merge separate equal-looking objects.",
      "Mutating input when callers expect a new result.",
      "Using an object group safely for every possible key."
    ],
    "links": [
      {
        "title": "Array methods",
        "url": "https://javascript.info/array-methods",
        "kind": "article",
        "language": "English",
        "why": "It groups common array transformations with small examples."
      }
    ]
  }
];
