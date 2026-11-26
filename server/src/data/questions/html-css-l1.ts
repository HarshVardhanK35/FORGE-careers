// HTML+CSS, level 1 (basics): 3 sets of 21 questions (a small HTML and CSS page per question).
// Written with Codex, then checked: every `check` was run in a real browser (Edge, 800 x 600) and equals one of the accepted
// answers; the answer options were balanced so that neither their length nor their wording gives a clue.
// A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const HTML_CSS_LEVEL_1: QuestionBank = {
  skillId: "css",
  level: 1,
  questions: [
      {
        "id": "hc-document-structure-l1-s1-q01",
        "topicId": "hc-document-structure",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }</style>\n</head>\n<body>\n<p class=\"welcome\">Welcome <span>back</span>.</p>\n<p class=\"notice\">Read the <span>notice</span>.</p>\n</body>\n</html>",
        "check": "document.querySelectorAll('body > p').length",
        "partA": {
          "ask": "How many `p` elements are direct children of `body`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "Which statement correctly describes a relationship between elements?",
          "options": [
            "Elements nested at different depths are siblings of one another.",
            "Elements placed beside one another are parent and child elements.",
            "An element nested directly inside another is its child.",
            "Elements inside the same page are children of the same parent."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-semantic-html-l1-s1-q02",
        "topicId": "hc-semantic-html",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }</style>\n</head>\n<body>\n<main>\n<section><h1>Reading room</h1><section><h2>New books</h2></section></section>\n</main>\n<section><h2>Opening times</h2></section>\n</body>\n</html>",
        "check": "document.querySelectorAll('main > section').length",
        "partA": {
          "ask": "How many `section` elements are direct children of `main`? Answer with a number.",
          "accepted": [
            "1"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a `section` element?",
          "options": [
            "A `section` groups related content, usually introduced by a heading.",
            "A `section` groups navigation links that lead to other pages.",
            "A `section` groups closing details, usually giving copyright information.",
            "A `section` groups introductory content, usually giving a site title."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-links-images-media-l1-s1-q03",
        "topicId": "hc-links-images-media",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }</style>\n</head>\n<body>\n<img id=\"decoration\" src=\"data:,\" alt=\"\" width=\"80\" height=\"60\">\n<img id=\"photo\" src=\"data:,\" width=\"80\" height=\"60\">\n</body>\n</html>",
        "check": "document.querySelector('#decoration').alt === document.querySelector('#photo').alt",
        "partA": {
          "ask": "Do `#decoration` and `#photo` have equal `alt` property values, despite having different attributes? Answer yes or no.",
          "accepted": [
            "true",
            "yes"
          ]
        },
        "partB": {
          "ask": "What is the purpose of the `alt` attribute?",
          "options": [
            "The `alt` attribute provides a caption displayed beneath an image.",
            "The `alt` attribute provides a tooltip displayed beside an image.",
            "The `alt` attribute provides a destination address for an image link.",
            "The `alt` attribute provides a text alternative that describes an image."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-forms-l1-s1-q04",
        "topicId": "hc-forms",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }</style>\n</head>\n<body>\n<form><label for=\"guest-email\">Email</label><input id=\"guest-email\" type=\"email\" required value=\"\"></form>\n</body>\n</html>",
        "check": "document.querySelector('#guest-email').checkValidity()",
        "partA": {
          "ask": "Is the empty `input` valid? Answer yes or no.",
          "accepted": [
            "false",
            "no"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `required` attribute sets a field to a starting value.",
            "The `required` attribute makes a field need a nonempty value.",
            "The `required` attribute prevents later changes to a field value.",
            "The `required` attribute excludes a field from submission."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-html-accessibility-l1-s1-q05",
        "topicId": "hc-html-accessibility",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }</style>\n</head>\n<body>\n<form>\n<label for=\"guest-name\">Guest name</label><input id=\"guest\" name=\"guest-name\" type=\"text\">\n<label>Email <input id=\"contact\" type=\"email\"></label>\n</form>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('input')].filter(control => control.labels.length > 0).length",
        "partA": {
          "ask": "How many `input` elements have an associated `label`? Answer with a number.",
          "accepted": [
            "1"
          ]
        },
        "partB": {
          "ask": "What is a benefit of associating a `label` with a control?",
          "options": [
            "A `label` can set a control value for later form submission.",
            "A `label` can make a control reject an empty text entry.",
            "A `label` can set a control position in keyboard navigation.",
            "A `label` names a control for assistive tool users."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-selectors-l1-s1-q06",
        "topicId": "hc-selectors",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.menu > a { color: red; }</style>\n</head>\n<body>\n<nav class=\"menu\"><a href=\"#start\">Start</a><span><a href=\"#help\">Help</a></span></nav>\n</body>\n</html>",
        "check": "document.querySelectorAll('.menu > a').length",
        "partA": {
          "ask": "How many links match `.menu > a`? Answer with a number.",
          "accepted": [
            "1"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `>` combinator selects matching more deeply nested descendants.",
            "The `>` combinator selects matching later siblings of an element.",
            "The `>` combinator selects matching direct children of an element.",
            "The `>` combinator selects matching ancestor elements of an element."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-cascade-specificity-l1-s1-q07",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.alert { color: red; }\np { color: blue; }</style>\n</head>\n<body>\n<p class=\"alert\">Check the schedule.</p>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.alert')).color",
        "partA": {
          "ask": "What is the text colour of `.alert`? Answer with a colour word.",
          "accepted": [
            "red",
            "rgb(255, 0, 0)",
            "#ff0000",
            "#FF0000",
            "#f00",
            "#F00"
          ]
        },
        "partB": {
          "ask": "What does specificity mean in CSS?",
          "options": [
            "Specificity is a weight calculated from the selectors used to match an element.",
            "Specificity is a weight calculated from the number of declarations in a rule.",
            "Specificity is a weight calculated from a rule position within a stylesheet.",
            "Specificity is a weight calculated from the number of elements a rule matches."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `p` element matches `.alert` and `p`.",
            "The rules both set `color`.",
            "The `.alert` selector has higher specificity than `p`."
          ],
          "modelAnswer": "The `p` element matches both rules. Both rules set `color`. The class selector `.alert` has higher specificity than the type selector `p`. The browser therefore uses `red` from `.alert`."
        }
      },
      {
        "id": "hc-box-model-l1-s1-q08",
        "topicId": "hc-box-model",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.ticket { box-sizing: content-box; width: 160px; height: 40px; padding: 10px; border: 2px solid black; }</style>\n</head>\n<body>\n<div class=\"ticket\">Entry ticket</div>\n</body>\n</html>",
        "check": "document.querySelector('.ticket').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the outer width of `.ticket`, including its padding and borders, in px? Answer with a number.",
          "accepted": [
            "184",
            "184px",
            "184 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "With `content-box`, padding and borders add to the declared width.",
            "With `content-box`, padding fits within the declared width.",
            "With `content-box`, horizontal borders fit inside the declared width.",
            "With `content-box`, horizontal margins fit inside the declared width."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-units-l1-s1-q09",
        "topicId": "hc-units",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.banner { width: 25vw; height: 40px; }</style>\n</head>\n<body>\n<div class=\"banner\">Weather banner</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.banner')).width",
        "partA": {
          "ask": "At a viewport width of 800 px, what is the width of `.banner` in px? Answer with a number.",
          "accepted": [
            "200",
            "200px",
            "200 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `vw` unit measures a percentage of viewport height.",
            "The `vw` unit measures a percentage of parent element width.",
            "The `vw` unit measures a percentage of viewport width.",
            "The `vw` unit measures a percentage of current element height."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-display-l1-s1-q10",
        "topicId": "hc-display",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.old-offer { display: none; width: 120px; height: 30px; }</style>\n</head>\n<body>\n<div class=\"old-offer\">Expired offer</div><p>Current offers</p>\n</body>\n</html>",
        "check": "document.querySelector('.old-offer').getBoundingClientRect().height",
        "partA": {
          "ask": "What is the rendered height of `.old-offer` in px? Answer with a number.",
          "accepted": [
            "0",
            "0px",
            "0 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "Using `display: none` hides content but keeps its layout space.",
            "Using `display: none` removes the element box from the page layout.",
            "Using `display: none` makes the content transparent in its layout space.",
            "Using `display: none` moves the content beyond the visible page area."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-positioning-l1-s1-q11",
        "topicId": "hc-positioning",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.map { position: relative; width: 240px; height: 120px; }\n.pin { position: absolute; left: 30px; top: 20px; width: 12px; height: 12px; }</style>\n</head>\n<body>\n<div class=\"map\"><span class=\"pin\"></span></div>\n</body>\n</html>",
        "check": "document.querySelector('.pin').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.pin` from the viewport’s left edge in px? Answer with a number.",
          "accepted": [
            "30",
            "30px",
            "30 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "An absolutely positioned child uses its nearest following sibling as its reference.",
            "An absolutely positioned child uses its nearest preceding sibling as its reference.",
            "An absolutely positioned child uses its nearest static ancestor as its reference.",
            "An absolutely positioned child uses its nearest positioned ancestor as its reference."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-z-index-stacking-l1-s1-q12",
        "topicId": "hc-z-index-stacking",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.layer { position: absolute; left: 0; top: 0; width: 100px; height: 100px; }\n.front { z-index: 2; background: red; }\n.back { z-index: 1; background: blue; }</style>\n</head>\n<body>\n<div class=\"layer front\" id=\"front\"></div>\n<div class=\"layer back\" id=\"back\"></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(50, 50).id",
        "partA": {
          "ask": "Which element covers the point 50 px from the viewport’s left and top edges? Answer with its `id`.",
          "accepted": [
            "front"
          ]
        },
        "partB": {
          "ask": "What does a stacking context do?",
          "options": [
            "A stacking context groups elements into a row for arranging their horizontal positions.",
            "A stacking context groups elements into a unit for sharing their text formatting.",
            "A stacking context groups elements into a unit for painting among outside elements.",
            "A stacking context groups elements into a unit for calculating their selector weights."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.front` and `.back` rectangles overlap at the given point.",
            "Both elements are positioned siblings in the same stacking context.",
            "The `.front` element has a higher `z-index`."
          ],
          "modelAnswer": "The two rectangles occupy the same area. The measured point is inside both rectangles. The positioned siblings share a stacking context, so their `z-index` values determine which is in front. The `.front` element has the higher value and covers the point."
        }
      },
      {
        "id": "hc-pseudo-l1-s1-q13",
        "topicId": "hc-pseudo",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.badge::before { content: \"\"; display: inline-block; width: 12px; height: 12px; background: red; }</style>\n</head>\n<body>\n<p class=\"badge\">New message</p>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.badge'), '::before').width",
        "partA": {
          "ask": "What is the width of the `.badge::before` pseudo-element in px? Answer with a number.",
          "accepted": [
            "12",
            "12px",
            "12 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `::before` pseudo-element generates a box after the content of an element.",
            "The `::before` pseudo-element generates a box before the content of an element.",
            "The `::before` pseudo-element styles the first child of an element in the markup.",
            "The `::before` pseudo-element styles the previous sibling of an element in the markup."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-flexbox-basics-l1-s1-q14",
        "topicId": "hc-flexbox-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.toolbar { display: flex; justify-content: center; width: 300px; height: 40px; }\n.tool { width: 60px; height: 40px; }</style>\n</head>\n<body>\n<div class=\"toolbar\"><div class=\"tool\">Save</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.tool').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.tool` from the viewport’s left edge in px? Answer with a number.",
          "accepted": [
            "120",
            "120px",
            "120 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "In a flex row, `justify-content` aligns children along the main axis.",
            "In a flex row, `justify-content` aligns children along the cross axis.",
            "In a flex row, `justify-content` sets the direction of the chosen main axis.",
            "In a flex row, `justify-content` sets the available cross axis length."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-practice-l1-s1-q15",
        "topicId": "hc-flexbox-practice",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.shelf { display: flex; width: 300px; }\n.book { flex: 1 0 100px; height: 40px; }</style>\n</head>\n<body>\n<div class=\"shelf\"><div class=\"book\">Guide</div><div class=\"book\">Notes</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.book').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of the first `.book` in px? Answer with a number.",
          "accepted": [
            "150",
            "150px",
            "150 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "Equal `flex-grow` factors divide free space by content length.",
            "Equal `flex-grow` factors divide positive free space by source position.",
            "Equal `flex-grow` factors divide positive free space by element height.",
            "Equal `flex-grow` factors divide positive free space into equal shares."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.shelf` has a width of `300px`.",
            "The two `.book` elements start from a `100px` flex basis.",
            "The remaining `100px` is shared equally because both have `flex-grow: 1`."
          ],
          "modelAnswer": "The `.shelf` provides `300px` of space. The two `.book` elements start from `100px` apiece, leaving `100px` of free space. Both have `flex-grow: 1`, so they receive equal shares of that space. Adding `50px` to the starting basis gives the first book a width of `150px`."
        }
      },
      {
        "id": "hc-grid-basics-l1-s1-q16",
        "topicId": "hc-grid-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.gallery { display: grid; grid-template-columns: 100px 200px; width: 300px; }\n.tile { height: 40px; }</style>\n</head>\n<body>\n<div class=\"gallery\"><div class=\"tile\">Sketch</div><div class=\"tile\">Painting</div></div>\n</body>\n</html>",
        "check": "document.querySelectorAll('.tile')[1].getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of the second `.tile` in px? Answer with a number.",
          "accepted": [
            "200",
            "200px",
            "200 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `grid-template-columns` property defines the heights of the grid row tracks.",
            "The `grid-template-columns` property defines the widths of the grid column tracks.",
            "The `grid-template-columns` property defines the gaps between grid column tracks.",
            "The `grid-template-columns` property defines the source order of grid children."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-lists-tables-l1-s1-q17",
        "topicId": "hc-lists-tables",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>table { border-collapse: collapse; }</style>\n</head>\n<body>\n<table>\n<caption>Class supplies</caption>\n<tbody><tr><td colspan=\"2\">Notebooks</td><td id=\"price\">12</td></tr></tbody>\n</table>\n</body>\n</html>",
        "check": "document.querySelector('#price').cellIndex",
        "partA": {
          "ask": "What is the zero-based position of `#price` among the cells in its `tr`, as reported by `cellIndex`? Answer with a number.",
          "accepted": [
            "1"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a `tr` element?",
          "options": [
            "A `tr` groups the cells forming a table column.",
            "A `tr` supplies the text that makes a table caption.",
            "A `tr` groups the cells that make up a table row.",
            "A `tr` supplies the rules that make a table border."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-backgrounds-borders-l1-s1-q18",
        "topicId": "hc-backgrounds-borders",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.stamp { width: 100px; height: 40px; border: 4px solid red; background: white; }</style>\n</head>\n<body>\n<div class=\"stamp\">Paid</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.stamp')).borderTopWidth",
        "partA": {
          "ask": "What is the top border width of `.stamp` in px? Answer with a number.",
          "accepted": [
            "4",
            "4px",
            "4 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "The `border` shorthand sets border width, spacing and colour.",
            "The `border` shorthand sets border width, radius and colour.",
            "The `border` shorthand sets border width, offset and colour.",
            "The `border` shorthand sets border width, style and colour."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-cascade-specificity-l1-s1-q19",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.status { color: blue; }\n.status { color: green; }</style>\n</head>\n<body>\n<p class=\"status\">Available</p>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.status')).color",
        "partA": {
          "ask": "What is the text colour of `.status`? Answer with a colour word.",
          "accepted": [
            "green",
            "rgb(0, 128, 0)",
            "#008000"
          ]
        },
        "partB": {
          "ask": "What does source order mean in CSS?",
          "options": [
            "Source order is the sequence in which CSS rules appear in the stylesheet.",
            "Source order is the written sequence of elements in the page markup.",
            "Source order is the sequence in which selectors rank by their specificity.",
            "Source order is the sequence in which declarations rank by property name."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-box-model-l1-s1-q20",
        "topicId": "hc-box-model",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>.parcel { box-sizing: border-box; width: 180px; height: 80px; padding: 10px; border: 2px solid black; }</style>\n</head>\n<body>\n<div class=\"parcel\">Delivery</div>\n</body>\n</html>",
        "check": "document.querySelector('.parcel').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the outer width of `.parcel`, including its padding and borders, in px? Answer with a number.",
          "accepted": [
            "180",
            "180px",
            "180 px"
          ]
        },
        "partB": {
          "ask": "Which statement describes why?",
          "options": [
            "With `border-box`, the declared width contains content and padding, not borders.",
            "With `border-box`, the declared width contains content, padding and margins.",
            "With `border-box`, the declared width contains content, padding and borders together.",
            "With `border-box`, the declared width contains content and borders, not padding."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-flexbox-basics-l1-s1-q21",
        "topicId": "hc-flexbox-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Practice page</title>\n<style>body { margin: 0; }\n.steps { display: flex; width: 180px; }\n.step { width: 60px; height: 30px; }\n.later { order: 1; }</style>\n</head>\n<body>\n<div class=\"steps\"><div class=\"step later\" id=\"a\">A</div><div class=\"step\" id=\"b\">B</div><div class=\"step\" id=\"c\">C</div></div>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('.step')].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left).map(e => e.id).join(',')",
        "partA": {
          "ask": "What is the visual order of the `.step` elements from left to right? Answer with their `id` values separated by commas, without spaces.",
          "accepted": [
            "b,c,a"
          ]
        },
        "partB": {
          "ask": "How does changing `order` affect the DOM sequence of flex children?",
          "options": [
            "Changing `order` changes visual arrangement by rewriting the DOM sequence.",
            "Changing `order` changes visual arrangement while preserving the DOM sequence.",
            "Changing `order` changes visual arrangement by assigning new element widths.",
            "Changing `order` changes visual arrangement by switching the main axis direction."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-units-l1-s2-q01",
        "topicId": "hc-units",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Measuring ribbon</title>\n<style>\nbody { margin: 0; }\nhtml { font-size: 20px; }\n.ribbon-board { font-size: 30px; }\n.ribbon { font-size: 10px; width: 6em; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"ribbon-board\"><div class=\"ribbon\">Ribbon</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.ribbon')).width",
        "partA": {
          "ask": "What is the width of `.ribbon` in px? Answer with a number.",
          "accepted": [
            "60",
            "60px",
            "60 px"
          ]
        },
        "partB": {
          "ask": "What reference does the `rem` unit use?",
          "options": [
            "It uses the font size of the direct parent element.",
            "It uses the font size of the element being styled.",
            "It uses the font size of the root `html` element.",
            "It uses the font size of the nearest sibling element."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-display-l1-s2-q02",
        "topicId": "hc-display",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reserved announcement</title>\n<style>\nbody { margin: 0; }\n.announcement { visibility: hidden; width: 180px; height: 32px; }\n.next-announcement { width: 180px; height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"announcement\">Draft</div><div class=\"next-announcement\">Published</div>\n</body>\n</html>",
        "check": "document.querySelector('.next-announcement').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.next-announcement` from the viewport top in px? Answer with a number.",
          "accepted": [
            "32",
            "32px",
            "32 px"
          ]
        },
        "partB": {
          "ask": "What is the usual layout role of `display: inline`?",
          "options": [
            "It places a box within the surrounding flow of text.",
            "It places a box across a new full row of content.",
            "It places a box outside the surrounding flow of text.",
            "It places a box within a separate grid of content."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-positioning-l1-s2-q03",
        "topicId": "hc-positioning",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Shifted delivery tag</title>\n<style>\nbody { margin: 0; }\n.delivery-tag { position: relative; top: 18px; width: 100px; height: 40px; }\n.delivery-note { width: 100px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"delivery-tag\">Packed</div><div class=\"delivery-note\">Ready</div>\n</body>\n</html>",
        "check": "document.querySelector('.delivery-note').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.delivery-note` from the viewport top in px? Answer with a number.",
          "accepted": [
            "40",
            "40px",
            "40 px"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of fixed positioning?",
          "options": [
            "It keeps a notice beside a preceding sibling during scrolling.",
            "It keeps a notice inside a parent content row during scrolling.",
            "It keeps a notice below a following sibling during scrolling.",
            "It keeps a notice at a chosen viewport location during scrolling."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-z-index-stacking-l1-s2-q04",
        "topicId": "hc-z-index-stacking",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Exhibit layers</title>\n<style>\nbody { margin: 0; }\n.exhibit { position: relative; z-index: 1; width: 120px; height: 120px; }\n.exhibit-label { position: absolute; inset: 0; z-index: 99; background: red; }\n.exhibit-cover { position: absolute; left: 0; top: 0; width: 120px; height: 120px; z-index: 2; background: blue; }\n</style>\n</head>\n<body>\n<div class=\"exhibit\"><div class=\"exhibit-label\" id=\"label\"></div></div>\n<div class=\"exhibit-cover\" id=\"cover\"></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(50, 50).id",
        "partA": {
          "ask": "Which element covers the point 50 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "cover"
          ]
        },
        "partB": {
          "ask": "What does `z-index` describe for a positioned element?",
          "options": [
            "It describes the horizontal placement of the element within its layout.",
            "It describes the stacking level of the element within its context.",
            "It describes the selector weight of the element within its stylesheet.",
            "It describes the vertical placement of the element within its layout."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The positioned `.exhibit` creates a stacking context with `z-index: 1`.",
            "The `.exhibit-label` stays inside that context despite `z-index: 99`.",
            "The `.exhibit-cover` has `z-index: 2` in the outer context and covers the point."
          ],
          "modelAnswer": "The `.exhibit` creates a stacking context with `z-index: 1`. The `.exhibit-label` is stacked inside that context. Its `z-index: 99` does not lift it above the whole parent context. The `.exhibit-cover` has `z-index: 2` in the outer context, so `cover` is on top at the measured point."
        }
      },
      {
        "id": "hc-pseudo-l1-s2-q05",
        "topicId": "hc-pseudo",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Alternating pickup queue</title>\n<style>\nbody { margin: 0; }\n.pickup-queue { margin: 0; padding: 0; list-style: none; }\n.pickup-queue > li { width: 120px; height: 20px; }\n.pickup-queue > li:nth-child(2n) { background: blue; }\n</style>\n</head>\n<body>\n<ul class=\"pickup-queue\"><li>Tea</li><li>Bread</li><li>Milk</li><li>Rice</li><li>Fruit</li></ul>\n</body>\n</html>",
        "check": "document.querySelectorAll('.pickup-queue > li:nth-child(2n)').length",
        "partA": {
          "ask": "How many entries receive the `blue` background from `.pickup-queue > li:nth-child(2n)`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What does the `:not()` pseudo-class do?",
          "options": [
            "It selects elements based on a matching sibling selector.",
            "It selects elements based on a matching parent selector.",
            "It selects elements based on a matching child selector.",
            "It selects elements based on a failed selector match."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-flexbox-basics-l1-s2-q06",
        "topicId": "hc-flexbox-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Bottom aligned controls</title>\n<style>\nbody { margin: 0; }\n.control-dock { display: flex; align-items: flex-end; width: 220px; height: 100px; }\n.dock-control { width: 50px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"control-dock\"><div class=\"dock-control\">Play</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.dock-control').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.dock-control` from the viewport top in px? Answer with a number.",
          "accepted": [
            "70",
            "70px",
            "70 px"
          ]
        },
        "partB": {
          "ask": "What does `flex-direction` define?",
          "options": [
            "It defines the direction of the main axis in a flex layout.",
            "It defines the spacing between adjacent children in a flex layout.",
            "It defines the alignment of separate lines in a flex layout.",
            "It defines the growth of individual children in a flex layout."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-practice-l1-s2-q07",
        "topicId": "hc-flexbox-practice",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Fitting storage trays</title>\n<style>\nbody { margin: 0; }\n.tray-rack { display: flex; width: 180px; }\n.storage-tray { flex: 0 1 120px; min-width: 0; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"tray-rack\"><div class=\"storage-tray\">Pins</div><div class=\"storage-tray\">Clips</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.storage-tray').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of the first `.storage-tray` in px? Answer with a number.",
          "accepted": [
            "90",
            "90px",
            "90 px"
          ]
        },
        "partB": {
          "ask": "What does `flex-wrap` control?",
          "options": [
            "It controls the individual growth factors of flex children in a layout.",
            "It controls the initial content sizes of flex children in a layout.",
            "It controls the wrapping into new lines of flex children in a layout.",
            "It controls the visual display sequence of flex children in a layout."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-grid-basics-l1-s2-q08",
        "topicId": "hc-grid-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Spanning schedule heading</title>\n<style>\nbody { margin: 0; }\n.session-grid { display: grid; grid-template-columns: 80px 80px 80px; gap: 12px; width: 264px; }\n.session-title { grid-column: 1 / 3; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"session-grid\"><div class=\"session-title\">Morning sessions</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.session-title').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of `.session-title` in px? Answer with a number.",
          "accepted": [
            "172",
            "172px",
            "172 px"
          ]
        },
        "partB": {
          "ask": "What does `grid-auto-flow: row` control?",
          "options": [
            "It controls the direction used to resize explicit grid columns.",
            "It controls the direction used to place unpositioned grid children.",
            "It controls the direction used to paint overlapping grid children.",
            "It controls the direction used to align text inside grid children."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-grid-practice-l1-s2-q09",
        "topicId": "hc-grid-practice",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Sharing dashboard space</title>\n<style>\nbody { margin: 0; }\n.reading-dashboard { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; width: 330px; }\n.reading-summary, .reading-chart { height: 40px; min-width: 0; }\n</style>\n</head>\n<body>\n<div class=\"reading-dashboard\"><div class=\"reading-summary\">Summary</div><div class=\"reading-chart\">Chart</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.reading-summary').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of `.reading-summary` in px? Answer with a number.",
          "accepted": [
            "100",
            "100px",
            "100 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of named grid areas?",
          "options": [
            "They name layout regions for placing content in a grid.",
            "They name selector groups for sharing styles across pages.",
            "They name spacing values for separating tracks in a grid.",
            "They name colour values for painting backgrounds across pages."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-layout-patterns-l1-s2-q10",
        "topicId": "hc-layout-patterns",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Centered booking panel</title>\n<style>\nbody { margin: 0; }\n.booking-page { width: 400px; height: 100px; }\n.booking-panel { width: 120px; height: 60px; margin-inline: auto; }\n</style>\n</head>\n<body>\n<div class=\"booking-page\"><div class=\"booking-panel\">Choose a date</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.booking-panel').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.booking-panel` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "140",
            "140px",
            "140 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `max-width` in a page layout?",
          "options": [
            "It sets an upper limit on a box height as space changes.",
            "It sets a lower limit on a box width as space changes.",
            "It sets a lower limit on a box height as space changes.",
            "It sets an upper limit on a box width as space changes."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.booking-page` provides `400px` of width.",
            "The `.booking-panel` uses `120px`, leaving `280px` of horizontal space.",
            "The two automatic inline margins share that space equally."
          ],
          "modelAnswer": "The `.booking-page` starts at the viewport left edge and is `400px` wide. The `.booking-panel` is `120px` wide, leaving `280px` of free space. Its `margin-inline: auto` divides that space equally between the left and right margins. The panel therefore starts `140px` from the viewport left edge."
        }
      },
      {
        "id": "hc-mobile-first-media-l1-s2-q11",
        "topicId": "hc-mobile-first-media",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Responsive packing list</title>\n<style>\nbody { margin: 0; }\n.packing-list { width: 160px; height: 40px; }\n@media (min-width: 600px) { .packing-list { width: 240px; } }\n@media (min-width: 1000px) { .packing-list { width: 320px; } }\n</style>\n</head>\n<body>\n<div class=\"packing-list\">Travel supplies</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.packing-list')).width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the width of `.packing-list` in px? Answer with a number.",
          "accepted": [
            "240",
            "240px",
            "240 px"
          ]
        },
        "partB": {
          "ask": "What is the starting point of a mobile-first stylesheet?",
          "options": [
            "It starts with a layout suited to the largest screens.",
            "It starts with a layout suited to small screen sizes.",
            "It starts with a layout suited to printed documents.",
            "It starts with a layout suited to landscape screens."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-custom-properties-l1-s2-q12",
        "topicId": "hc-custom-properties",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Local theme spacing</title>\n<style>\nbody { margin: 0; }\n:root { --badge-size: 20px; }\n.membership-theme { --badge-size: 12px; }\n.membership-badge { width: calc(var(--badge-size) * 4); height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"membership-theme\"><div class=\"membership-badge\">Member</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.membership-badge')).width",
        "partA": {
          "ask": "What is the width of `.membership-badge` in px? Answer with a number.",
          "accepted": [
            "48",
            "48px",
            "48 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of the fallback argument in `var()`?",
          "options": [
            "It supplies a replacement when the custom property has a shorter value.",
            "It supplies a replacement when the custom property has a local value.",
            "It supplies a replacement when the custom property has no usable value.",
            "It supplies a replacement when the custom property has an inherited value."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `:root` rule sets `--badge-size` to `20px`.",
            "The `.membership-theme` sets its own `--badge-size` to `12px`.",
            "The `.membership-badge` inherits `12px` and multiplies it by four in `calc()`."
          ],
          "modelAnswer": "The `:root` rule supplies a starting `--badge-size` of `20px`. The `.membership-theme` defines a local value of `12px`. The `.membership-badge` inherits that local value. Its `calc()` expression multiplies `12px` by four, giving a width of `48px`."
        }
      },
      {
        "id": "hc-css-architecture-l1-s2-q13",
        "topicId": "hc-css-architecture",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Urgent task cards</title>\n<style>\nbody { margin: 0; }\n.task-card { width: 120px; height: 24px; }\n.task-card.task-card--urgent { background: red; }\n</style>\n</head>\n<body>\n<div class=\"task-card task-card--urgent\">Repair</div>\n<div class=\"task-card\">Review</div>\n<div class=\"task-card--urgent\">Reminder</div>\n<div class=\"task-card task-card--urgent\">Restock</div>\n</body>\n</html>",
        "check": "document.querySelectorAll('.task-card.task-card--urgent').length",
        "partA": {
          "ask": "How many elements receive the `red` background from `.task-card.task-card--urgent`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a utility class in CSS?",
          "options": [
            "It provides a focused styling rule for reuse across unrelated components.",
            "It provides a generated component name for local stylesheet boundaries.",
            "It provides a selector boundary for styles inside a single document.",
            "It provides a shared markup structure for several related components."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-debugging-crossbrowser-l1-s2-q14",
        "topicId": "hc-debugging-crossbrowser",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Invalid forecast height</title>\n<style>\nbody { margin: 0; }\n.forecast-card { width: 140px; height: 36px; }\n.forecast-card { height: 60p; }\n</style>\n</head>\n<body>\n<div class=\"forecast-card\">Sunny</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.forecast-card')).height",
        "partA": {
          "ask": "What height does the browser use for `.forecast-card` in px? Answer with a number.",
          "accepted": [
            "36",
            "36px",
            "36 px"
          ]
        },
        "partB": {
          "ask": "What does the Computed panel in browser developer tools show?",
          "options": [
            "It shows the original declarations written in a selected stylesheet.",
            "It shows the network requests made by a selected document.",
            "It shows the event handlers attached to a selected element.",
            "It shows the resolved property values for a selected element."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-css-accessibility-l1-s2-q15",
        "topicId": "hc-css-accessibility",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Keyboard booking control</title>\n<style>\nbody { margin: 0; }\n.reserve-control { width: 120px; height: 40px; outline: none; }\n.reserve-control:focus { outline: 2px solid blue; }\n</style>\n</head>\n<body>\n<button class=\"reserve-control\" type=\"button\">Reserve</button>\n</body>\n</html>",
        "check": "(() => { const control = document.querySelector('.reserve-control'); control.focus(); return getComputedStyle(control).outlineStyle; })()",
        "partA": {
          "ask": "After `.reserve-control` receives keyboard focus, what is its computed `outline-style`? Answer with a CSS keyword.",
          "accepted": [
            "solid"
          ]
        },
        "partB": {
          "ask": "Why is an outline useful as a focus indicator?",
          "options": [
            "An outline is a focus cue within the border and part of layout sizing.",
            "An outline is a focus cue outside the border and outside layout sizing.",
            "An outline is a focus cue within the content and part of content sizing.",
            "An outline is a focus cue within the margin and part of margin sizing."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-transitions-animations-l1-s2-q16",
        "topicId": "hc-transitions-animations",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Updating progress indicator</title>\n<style>\nbody { margin: 0; }\n.progress-marker { width: 100px; height: 20px; transition-duration: 2s; }\n.progress-marker { transition: opacity 150ms linear; }\n</style>\n</head>\n<body>\n<div class=\"progress-marker\">Progress</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.progress-marker')).transitionDuration",
        "partA": {
          "ask": "What is the computed `transition-duration` of `.progress-marker` in seconds? Answer with a number.",
          "accepted": [
            "0.15",
            "0.15s",
            "0.15 s",
            ".15",
            ".15s",
            ".15 s"
          ]
        },
        "partB": {
          "ask": "What does `animation-iteration-count` control?",
          "options": [
            "It controls the number of properties used by an animation.",
            "It controls the number of keyframes used by an animation.",
            "It controls the number of times an animation cycle repeats.",
            "It controls the number of elements sharing an animation name."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-fluid-sizing-l1-s2-q17",
        "topicId": "hc-fluid-sizing",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Fluid recipe preview</title>\n<style>\nbody { margin: 0; }\n.recipe-preview { width: clamp(120px, 20vw, 240px); height: 60px; }\n</style>\n</head>\n<body>\n<div class=\"recipe-preview\">Recipe preview</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.recipe-preview')).width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the width of `.recipe-preview` in px? Answer with a number.",
          "accepted": [
            "160",
            "160px",
            "160 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `object-fit: contain` for an image in a fixed box?",
          "options": [
            "It scales the image with full box coverage and cropped outer content.",
            "It scales the image with full box coverage and altered proportions.",
            "It scales the image with original dimensions and possible overflow.",
            "It scales the image with complete content in the box and intact proportions."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-cascade-specificity-l1-s2-q18",
        "topicId": "hc-cascade-specificity",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Inherited archive colour</title>\n<style>\nbody { margin: 0; }\nbody { color: blue; }\n.archive-section { color: green; }\n.archive-caption { color: inherit; width: 160px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"archive-section\"><div class=\"archive-caption\">Archive notes</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.archive-caption')).color",
        "partA": {
          "ask": "What is the text colour of `.archive-caption`? Answer with a colour word.",
          "accepted": [
            "green",
            "rgb(0, 128, 0)",
            "#008000"
          ]
        },
        "partB": {
          "ask": "What is a benefit of inheritance when styling a page?",
          "options": [
            "It reduces repeated declarations for shared text styles.",
            "It reduces selector weights for deeply nested elements.",
            "It reduces stylesheet downloads for separate page visits.",
            "It reduces layout calculations for overlapping page sections."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-box-model-l1-s2-q19",
        "topicId": "hc-box-model",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Space between journal entries</title>\n<style>\nbody { margin: 0; }\n.journal-first { width: 180px; height: 40px; margin-bottom: 24px; }\n.journal-second { width: 180px; height: 40px; margin-top: 16px; }\n</style>\n</head>\n<body>\n<div class=\"journal-first\">Morning</div><div class=\"journal-second\">Afternoon</div>\n</body>\n</html>",
        "check": "document.querySelector('.journal-second').getBoundingClientRect().top - document.querySelector('.journal-first').getBoundingClientRect().bottom",
        "partA": {
          "ask": "What is the vertical gap between the border boxes of `.journal-first` and `.journal-second` in px? Answer with a number.",
          "accepted": [
            "24",
            "24px",
            "24 px"
          ]
        },
        "partB": {
          "ask": "Where does padding provide space in the box model?",
          "options": [
            "It provides space between a box border and surrounding boxes.",
            "It provides space between the content area and the box border.",
            "It provides space between a box outer outline and surrounding boxes.",
            "It provides space between a box margin and its parent border."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-positioning-l1-s2-q20",
        "topicId": "hc-positioning",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Fixed assistance tab</title>\n<style>\nbody { margin: 0; }\n.help-page { position: relative; margin-left: 100px; width: 200px; height: 100px; }\n.assistance-tab { position: fixed; right: 40px; top: 20px; width: 60px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"help-page\"><div class=\"assistance-tab\">Help</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.assistance-tab').getBoundingClientRect().left",
        "partA": {
          "ask": "At an 800 px wide viewport, how far is the left edge of `.assistance-tab` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "700",
            "700px",
            "700 px"
          ]
        },
        "partB": {
          "ask": "What is a common purpose of sticky positioning?",
          "options": [
            "It provides a viewport anchor for a heading outside normal document flow.",
            "It provides an ancestor anchor for a heading outside normal document flow.",
            "It provides a scrolling constraint for a heading within normal document flow.",
            "It provides a sibling reference for a heading within normal document flow."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-grid-basics-l1-s2-q21",
        "topicId": "hc-grid-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Extra row of lockers</title>\n<style>\nbody { margin: 0; }\n.locker-grid { display: grid; grid-template-columns: 80px 80px; grid-auto-rows: 30px; row-gap: 10px; width: 160px; }\n.locker-cell { min-width: 0; }\n</style>\n</head>\n<body>\n<div class=\"locker-grid\"><div class=\"locker-cell\">A</div><div class=\"locker-cell\">B</div><div class=\"locker-cell\" id=\"locker-c\">C</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#locker-c').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#locker-c` from the viewport top in px? Answer with a number.",
          "accepted": [
            "40",
            "40px",
            "40 px"
          ]
        },
        "partB": {
          "ask": "What are grid lines used for?",
          "options": [
            "They provide references for positioning children within a grid.",
            "They provide references for weighting selectors within a stylesheet.",
            "They provide references for ordering elements within a document.",
            "They provide references for naming colours within a theme."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-document-structure-l1-s3-q01",
        "topicId": "hc-document-structure",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Separate delivery notices</title>\n<style>\nbody { margin: 0; }\n.dispatch-note { width: 90px; height: 24px; }\n.arrival-note { width: 70px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"dispatch-note\">Dispatched</div><div class=\"arrival-note\">Arrived</div>\n</body>\n</html>",
        "check": "document.querySelector('.arrival-note').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.arrival-note` from the viewport top in px? Answer with a number.",
          "accepted": [
            "24",
            "24px",
            "24 px"
          ]
        },
        "partB": {
          "ask": "What does an HTML attribute provide?",
          "options": [
            "It provides the closing boundary of an element.",
            "It provides the visible text content of an element.",
            "It provides extra information for an element.",
            "It provides a child element within another element."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-semantic-html-l1-s3-q02",
        "topicId": "hc-semantic-html",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Independent reading entries</title>\n<style>\nbody { margin: 0; }\n.reading-entry { width: 240px; }\n</style>\n</head>\n<body>\n<main><h1>Reading journal</h1>\n<article class=\"reading-entry\"><h2>Maps</h2><footer id=\"entry-credit\">Editor credit</footer></article>\n<article class=\"reading-entry\"><h2>Trails</h2><footer>Reader credit</footer></article>\n</main><footer>Journal details</footer>\n</body>\n</html>",
        "check": "document.querySelector('#entry-credit').closest('article').querySelector('h2').textContent",
        "partA": {
          "ask": "Which heading belongs to the `article` containing `#entry-credit`? Answer with its one-word text.",
          "accepted": [
            "Maps",
            "maps"
          ]
        },
        "partB": {
          "ask": "What is the purpose of an `article` element?",
          "options": [
            "It groups content intended as an independent, reusable piece of writing.",
            "It groups content intended as introductory material for a page.",
            "It groups content intended as navigation to related page destinations.",
            "It groups content intended as closing details for a page or section."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-links-images-media-l1-s3-q03",
        "topicId": "hc-links-images-media",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Relative help destination</title>\n<base href=\"https://example.test/guides/\">\n<style>\nbody { margin: 0; }\n.guide-link { display: inline-block; width: 100px; height: 24px; }\n</style>\n</head>\n<body>\n<a class=\"guide-link\" href=\"../help\">Help</a>\n</body>\n</html>",
        "check": "new URL(document.querySelector('.guide-link').href).pathname",
        "partA": {
          "ask": "What pathname does the browser resolve for `.guide-link`? Answer with the path beginning with a slash.",
          "accepted": [
            "/help"
          ]
        },
        "partB": {
          "ask": "What is the purpose of the `download` attribute on a link?",
          "options": [
            "It suggests opening the resource in a separate browser tab.",
            "It suggests displaying the resource within the current document.",
            "It suggests loading the resource before the link is activated.",
            "It suggests saving the resource as a file on the local device."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `base` element supplies `https://example.test/guides/` as the base URL.",
            "The `../` segment moves up from the base directory.",
            "The `help` segment becomes the path `/help`."
          ],
          "modelAnswer": "The `base` element supplies the URL used to resolve the relative link. The base directory is `/guides/`. The `../` segment moves up to the root directory. Adding `help` produces the pathname `/help`."
        }
      },
      {
        "id": "hc-forms-l1-s3-q04",
        "topicId": "hc-forms",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Pack quantity increments</title>\n<style>\nbody { margin: 0; }\n#pack-count { width: 100px; height: 24px; }\n</style>\n</head>\n<body>\n<form><label for=\"pack-count\">Packs</label><input id=\"pack-count\" type=\"number\" min=\"2\" max=\"12\" step=\"2\" value=\"5\"><button type=\"button\">Preview</button></form>\n</body>\n</html>",
        "check": "document.querySelector('#pack-count').checkValidity()",
        "partA": {
          "ask": "Is `#pack-count` valid with its current value? Answer yes or no.",
          "accepted": [
            "false",
            "no"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `type=\"button\"` on a `button`?",
          "options": [
            "It creates a control whose default action submits the form data.",
            "It creates a control with no built-in form submission or reset action.",
            "It creates a control whose default action restores the original field values.",
            "It creates a control whose default action checks the surrounding form fields."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-html-accessibility-l1-s3-q05",
        "topicId": "hc-html-accessibility",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Programmatic status focus</title>\n<style>\nbody { margin: 0; }\n.status-message { width: 180px; height: 30px; }\n</style>\n</head>\n<body>\n<button type=\"button\">Refresh</button><div class=\"status-message\" tabindex=\"-1\">Status updated</div>\n</body>\n</html>",
        "check": "(() => { const message = document.querySelector('.status-message'); message.focus(); return document.activeElement === message; })()",
        "partA": {
          "ask": "If code calls `focus()` on `.status-message`, does it receive focus? Answer yes or no.",
          "accepted": [
            "true",
            "yes"
          ]
        },
        "partB": {
          "ask": "Why use a native `button` for an action?",
          "options": [
            "It supplies a built-in action name from nearby heading text.",
            "It supplies a built-in keyboard shortcut for moving between pages.",
            "It supplies a built-in control role and keyboard activation behavior.",
            "It supplies a built-in form label for nearby editable controls."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-selectors-l1-s3-q06",
        "topicId": "hc-selectors",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Notes after headings</title>\n<style>\nbody { margin: 0; }\n.field-notes p { margin: 0; width: 160px; height: 20px; }\n.field-notes h2 + p { color: red; }\n</style>\n</head>\n<body>\n<section class=\"field-notes\"><h2>River</h2><p>Depth</p><p>Current</p><h2>Bank</h2><p>Soil</p><h3>Plants</h3><p>Reeds</p></section>\n</body>\n</html>",
        "check": "document.querySelectorAll('.field-notes h2 + p').length",
        "partA": {
          "ask": "How many paragraphs match `.field-notes h2 + p`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What does an attribute selector such as `[title]` match?",
          "options": [
            "It matches elements with the named child element present.",
            "It matches elements with the named attribute present.",
            "It matches elements with the named class value present.",
            "It matches elements with the named text content present."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-cascade-specificity-l1-s3-q07",
        "topicId": "hc-cascade-specificity",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Priority for service notices</title>\n<style>\nbody { margin: 0; }\n.service-notice { color: blue !important; width: 180px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"service-notice\" style=\"color: red\">Service update</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.service-notice')).color",
        "partA": {
          "ask": "What is the text colour of `.service-notice`? Answer with a colour word.",
          "accepted": [
            "blue",
            "rgb(0, 0, 255)",
            "#0000ff",
            "#0000FF",
            "#00f",
            "#00F"
          ]
        },
        "partB": {
          "ask": "What is a CSS declaration?",
          "options": [
            "It is a property and a value describing one styling choice.",
            "It is a selector and a rule block describing elements.",
            "It is a file name and a path describing one stylesheet location.",
            "It is a tag pair describing one page element in the document."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-box-model-l1-s3-q08",
        "topicId": "hc-box-model",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Proportional poster padding</title>\n<style>\nbody { margin: 0; }\n.poster-frame { width: 240px; height: 100px; }\n.poster-sheet { width: 80px; height: 20px; padding-top: 10%; }\n</style>\n</head>\n<body>\n<div class=\"poster-frame\"><div class=\"poster-sheet\">Poster</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.poster-sheet')).paddingTop",
        "partA": {
          "ask": "What is the top padding of `.poster-sheet` in px? Answer with a number.",
          "accepted": [
            "24",
            "24px",
            "24 px"
          ]
        },
        "partB": {
          "ask": "What is the role of a border in the box model?",
          "options": [
            "It forms an edge between the content and the padding.",
            "It forms an edge between the margin and nearby content boxes.",
            "It forms an edge around the text lines inside the content area.",
            "It forms an edge around the padding and content of a box."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-grid-practice-l1-s3-q09",
        "topicId": "hc-grid-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Fitting seed cards</title>\n<style>\nbody { margin: 0; }\n.seed-rack { display: grid; width: 340px; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 20px; }\n.seed-card { min-width: 0; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"seed-rack\"><div class=\"seed-card\">Mint</div><div class=\"seed-card\">Pea</div><div class=\"seed-card\">Bean</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.seed-card').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of the first `.seed-card` in px? Answer with a number.",
          "accepted": [
            "100",
            "100px",
            "100 px"
          ]
        },
        "partB": {
          "ask": "What does `repeat(3, 90px)` express in a grid track list?",
          "options": [
            "It expresses a track pattern separated by a stated size of track gap.",
            "It expresses a track pattern repeated a stated number of times.",
            "It expresses a track pattern limited by a stated total grid width.",
            "It expresses a track pattern offset by a stated starting line number."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-layout-patterns-l1-s3-q10",
        "topicId": "hc-layout-patterns",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Navigation actions at the edge</title>\n<style>\nbody { margin: 0; }\n.studio-nav { display: flex; width: 300px; height: 40px; }\n.studio-brand { width: 80px; }\n.studio-actions { width: 60px; margin-left: auto; }\n</style>\n</head>\n<body>\n<nav class=\"studio-nav\"><div class=\"studio-brand\">Studio</div><div class=\"studio-actions\">Account</div></nav>\n</body>\n</html>",
        "check": "document.querySelector('.studio-actions').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.studio-actions` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "240",
            "240px",
            "240 px"
          ]
        },
        "partB": {
          "ask": "What does the holy grail layout usually arrange?",
          "options": [
            "It arranges a header and footer with a stack of equal-width cards.",
            "It arranges a header and footer with a row of equal-height buttons.",
            "It arranges a header and footer with a single column of navigation links.",
            "It arranges a header and footer with a central column and two sidebars."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-mobile-first-media-l1-s3-q11",
        "topicId": "hc-mobile-first-media",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Landscape trail controls</title>\n<style>\nbody { margin: 0; }\n.trail-controls { display: flex; flex-direction: column; width: 240px; height: 100px; }\n.trail-control { width: 80px; height: 30px; }\n@media (orientation: landscape) { .trail-controls { flex-direction: row; } }\n</style>\n</head>\n<body>\n<div class=\"trail-controls\"><div class=\"trail-control\">Map</div><div class=\"trail-control\" id=\"trail-key\">Key</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#trail-key').getBoundingClientRect().left",
        "partA": {
          "ask": "At an 800 by 600 px viewport, how far is the left edge of `#trail-key` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "80",
            "80px",
            "80 px"
          ]
        },
        "partB": {
          "ask": "What is a responsive layout breakpoint?",
          "options": [
            "It is a condition where the stylesheet changes the layout for available space.",
            "It is a condition where the document inserts a new paragraph break.",
            "It is a condition where the browser downloads a separate document version.",
            "It is a condition where the viewport adopts the width of its widest child."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The viewport is wider than it is tall.",
            "The `orientation: landscape` media query matches.",
            "The controls use `flex-direction: row`, with `80px` wide children."
          ],
          "modelAnswer": "The viewport is 800 px wide and 600 px tall. This matches the `orientation: landscape` media query. The query changes `.trail-controls` from a column to a row. The first `.trail-control` occupies `80px`, so `#trail-key` begins `80px` from the left edge."
        }
      },
      {
        "id": "hc-custom-properties-l1-s3-q12",
        "topicId": "hc-custom-properties",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Fallback marker size</title>\n<style>\nbody { margin: 0; }\n.route-marker { width: calc(var(--marker-unit, 14px) * 3); height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"route-marker\">Route</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.route-marker')).width",
        "partA": {
          "ask": "What is the width of `.route-marker` in px? Answer with a number.",
          "accepted": [
            "42",
            "42px",
            "42 px"
          ]
        },
        "partB": {
          "ask": "Why give reusable design values custom property names?",
          "options": [
            "They let related declarations share a higher selector weight for markup.",
            "They let related declarations share a generated markup tag for a component.",
            "They let related declarations share a meaningful name for a design value.",
            "They let related declarations share a separate browser viewport for a design."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-css-architecture-l1-s3-q13",
        "topicId": "hc-css-architecture",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Composing shelf utilities</title>\n<style>\nbody { margin: 0; }\n.shelf-row { display: flex; }\n.space-12 { gap: 12px; }\n.swatch { width: 40px; height: 24px; }\n.palette { width: 200px; }\n</style>\n</head>\n<body>\n<div class=\"palette shelf-row space-12\"><div class=\"swatch\">Ink</div><div class=\"swatch\">Clay</div><div class=\"swatch\" id=\"last-swatch\">Sand</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#last-swatch').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `#last-swatch` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "104",
            "104px",
            "104 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of local class names in CSS Modules?",
          "options": [
            "They help keep component class names shared across one global stylesheet scope.",
            "They help keep component class names separated across module boundaries.",
            "They help keep component class names tied to the markup nesting depth.",
            "They help keep component class names resolved by a browser-defined naming list."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.shelf-row` class creates a flex row.",
            "The `.space-12` class adds `12px` gaps.",
            "Two `40px` swatches and two `12px` gaps precede `#last-swatch`."
          ],
          "modelAnswer": "The `.palette` element combines the `.shelf-row` and `.space-12` classes. These classes supply a flex row and `12px` gaps. The first two swatches occupy `80px` in total, and the two gaps add `24px`. The third swatch therefore begins `104px` from the viewport left edge."
        }
      },
      {
        "id": "hc-debugging-crossbrowser-l1-s3-q14",
        "topicId": "hc-debugging-crossbrowser",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Feature supported layout</title>\n<style>\nbody { margin: 0; }\n.weather-panel { width: 180px; height: 30px; }\n@supports (display: grid) { .weather-panel { width: calc(180px + 40px); } }\n</style>\n</head>\n<body>\n<div class=\"weather-panel\">Forecast</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.weather-panel')).width",
        "partA": {
          "ask": "In current Edge, what width does `.weather-panel` use in px? Answer with a number.",
          "accepted": [
            "220",
            "220px",
            "220 px"
          ]
        },
        "partB": {
          "ask": "What does a crossed-out declaration in the DevTools Styles panel often indicate?",
          "options": [
            "It indicates a declaration that lost to another declaration in the cascade.",
            "It indicates a declaration whose stylesheet has not been downloaded yet.",
            "It indicates a declaration whose element is outside the visible viewport.",
            "It indicates a declaration whose element is waiting for keyboard focus."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-css-accessibility-l1-s3-q15",
        "topicId": "hc-css-accessibility",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Screen reader shipping note</title>\n<style>\nbody { margin: 0; }\n.shipping-hint { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n.shipping-summary { width: 200px; height: 30px; }\n</style>\n</head>\n<body>\n<span class=\"shipping-hint\">Shipping cost is included</span><div class=\"shipping-summary\">Order summary</div>\n</body>\n</html>",
        "check": "document.querySelector('.shipping-summary').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.shipping-summary` from the viewport top in px? Answer with a number.",
          "accepted": [
            "0",
            "0px",
            "0 px"
          ]
        },
        "partB": {
          "ask": "Why use a visually hidden text pattern for extra context?",
          "options": [
            "It keeps text available to sighted users while removing its spoken description.",
            "It keeps text available to pointer users while removing its keyboard access.",
            "It keeps text available to search engines while removing its document content.",
            "It keeps text available to screen readers while removing its visual presence."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-container-queries-l1-s3-q16",
        "topicId": "hc-container-queries",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Adapting a narrow recipe slot</title>\n<style>\nbody { margin: 0; }\n.recipe-slot { container-type: inline-size; width: 260px; }\n.ingredient-chip { width: 70px; height: 24px; }\n@container (min-width: 300px) { .ingredient-chip { width: 120px; } }\n</style>\n</head>\n<body>\n<div class=\"recipe-slot\"><div class=\"ingredient-chip\">Oats</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.ingredient-chip')).width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the width of `.ingredient-chip` in px? Answer with a number.",
          "accepted": [
            "70",
            "70px",
            "70 px"
          ]
        },
        "partB": {
          "ask": "Why use container queries for a reusable component?",
          "options": [
            "They let component styles respond to the root element font configuration settings.",
            "They let component styles respond to the document text reading order.",
            "They let component styles respond to space provided by a containing region.",
            "They let component styles respond to the device screen pixel density."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-rendering-performance-l1-s3-q17",
        "topicId": "hc-rendering-performance",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Resetting rendering hints</title>\n<style>\nbody { margin: 0; }\n.timeline-preview { width: 160px; height: 40px; will-change: transform; }\n.timeline-caption { width: 140px; height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"timeline-preview\"><div class=\"timeline-caption\">Recent updates</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.timeline-caption')).willChange",
        "partA": {
          "ask": "What is the computed `will-change` of `.timeline-caption`? Answer with a CSS keyword.",
          "accepted": [
            "auto"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `will-change`?",
          "options": [
            "It gives the browser a list of properties permitted to inherit.",
            "It gives the browser a schedule for properties to change over time.",
            "It gives the browser a hint about properties expected to change.",
            "It gives the browser a priority for properties in selector matching."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-flexbox-basics-l1-s3-q18",
        "topicId": "hc-flexbox-basics",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Wrapping tool kits</title>\n<style>\nbody { margin: 0; }\n.kit-tray { display: flex; flex-wrap: wrap; width: 150px; gap: 10px; }\n.kit-tile { flex: 0 0 70px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"kit-tray\"><div class=\"kit-tile\">Brush</div><div class=\"kit-tile\">Roller</div><div class=\"kit-tile\" id=\"third-kit\">Tape</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#third-kit').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#third-kit` from the viewport top in px? Answer with a number.",
          "accepted": [
            "40",
            "40px",
            "40 px"
          ]
        },
        "partB": {
          "ask": "What does `align-self` control for a flex child?",
          "options": [
            "It controls the child placement along the cross axis of its flex line.",
            "It controls the child placement along the main axis of its flex line.",
            "It controls the child placement within the source sequence of its siblings.",
            "It controls the child placement within the stacking levels of its parent."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-z-index-stacking-l1-s3-q19",
        "topicId": "hc-z-index-stacking",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Overlapping flex labels</title>\n<style>\nbody { margin: 0; }\n.label-strip { display: flex; width: 200px; height: 100px; }\n.label-first { width: 100px; height: 100px; z-index: 9; background: red; }\n.label-second { width: 100px; height: 100px; margin-left: -60px; z-index: 1; background: blue; }\n</style>\n</head>\n<body>\n<div class=\"label-strip\"><div class=\"label-first\" id=\"first\"></div><div class=\"label-second\" id=\"second\"></div></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(50, 50).id",
        "partA": {
          "ask": "Which element covers the point 50 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "first"
          ]
        },
        "partB": {
          "ask": "Which property can create a stacking context without positioned layout?",
          "options": [
            "The `margin` property with a positive horizontal spacing value.",
            "The `opacity` property with a value between zero and one.",
            "The `padding` property with a positive horizontal spacing value.",
            "The `border-width` property with a positive horizontal size value."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-display-l1-s3-q20",
        "topicId": "hc-display",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Restoring a hidden child</title>\n<style>\nbody { margin: 0; }\n.draft-shelf { visibility: hidden; width: 180px; height: 50px; }\n.published-tag { visibility: visible; width: 100px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"draft-shelf\"><div class=\"published-tag\">Published</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.published-tag')).visibility === 'visible'",
        "partA": {
          "ask": "Is `.published-tag` visible despite the `visibility` setting on `.draft-shelf`? Answer yes or no.",
          "accepted": [
            "true",
            "yes"
          ]
        },
        "partB": {
          "ask": "What does `display: inline-block` let a badge do?",
          "options": [
            "It lets a badge accept width and height within a new block row.",
            "It lets a badge accept width and height outside normal document flow.",
            "It lets a badge accept width and height within a separate grid track.",
            "It lets a badge accept width and height within an inline text flow."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-units-l1-s3-q21",
        "topicId": "hc-units",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Nested relative type size</title>\n<style>\nbody { margin: 0; }\nhtml { font-size: 20px; }\n.lesson-card { font-size: 30px; }\n.lesson-label { font-size: 0.5em; width: 100px; height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"lesson-card\"><div class=\"lesson-label\">Lesson</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.lesson-label')).fontSize",
        "partA": {
          "ask": "What is the computed `font-size` of `.lesson-label` in px? Answer with a number.",
          "accepted": [
            "15",
            "15px",
            "15 px"
          ]
        },
        "partB": {
          "ask": "What is a benefit of relative units in a typography scale?",
          "options": [
            "They let text sizes stay linked to a chosen reference size.",
            "They let text sizes stay linked to a chosen character count.",
            "They let text sizes stay linked to a chosen number of lines.",
            "They let text sizes stay linked to a chosen font file length."
          ],
          "correct": 0
        }
      }
    ],
};
