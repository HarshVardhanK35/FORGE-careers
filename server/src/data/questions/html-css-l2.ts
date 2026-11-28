// HTML+CSS, level 2 (intermediate): 3 sets of 18 questions (a page with its CSS per question, two ideas per page).
// Written with Codex, then checked: every `check` was run twice in a real browser (Edge, 800 x 600) with the same result and equals one of
// the accepted answers; the answer options were checked so that neither their length nor their wording gives a clue.
// A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const HTML_CSS_LEVEL_2: QuestionBank = {
  skillId: "css",
  level: 2,
  questions: [
      {
        "id": "hc-cascade-specificity-l2-s1-q01",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reservoir warning</title>\n<style>\nbody { margin: 0; }\n.reservoir { color: green; }\n.warning-label { color: blue; width: 180px; height: 30px; }\n:where(#water-level) { color: red; }\n</style>\n</head>\n<body>\n<div class=\"reservoir\"><p id=\"water-level\" class=\"warning-label\">Water is low</p></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.warning-label')).color",
        "partA": {
          "ask": "What is the text colour of `.warning-label`? Answer with a colour word.",
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
          "ask": "What would removing the `color` declaration from `.reservoir` change here?",
          "options": [
            "It would raise the priority of the later matching declaration.",
            "It would prevent the paragraph from matching the class selector.",
            "It would leave the paragraph's chosen text colour unchanged.",
            "It would transfer the parent's selector weight to the paragraph."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this text colour.",
          "keyPoints": [
            "The paragraph matches `.warning-label` and `:where(#water-level)`.",
            "The `:where(#water-level)` selector has zero specificity.",
            "The class declaration beats the later zero-specificity declaration.",
            "The parent's `green` is not used because the paragraph has its own `color`."
          ],
          "modelAnswer": "The paragraph matches `.warning-label` and `:where(#water-level)`. The selector inside `:where()` adds no specificity. The class declaration wins even though it appears earlier. The paragraph uses `blue` rather than inheriting `green` from `.reservoir`."
        }
      },
      {
        "id": "hc-box-model-l2-s1-q02",
        "topicId": "hc-box-model",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Minimum drawer width</title>\n<style>\nbody { margin: 0; }\n.drawer-frame { box-sizing: border-box; width: 160px; min-width: 220px; height: 100px; padding: 20px; border: 5px solid black; }\n.drawer-liner { width: 100%; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"drawer-frame\"><div class=\"drawer-liner\">Liner</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.drawer-liner').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.drawer-liner` in px? Answer with a number.",
          "accepted": [
            "170",
            "170px",
            "170 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `min-width` in a component layout?",
          "options": [
            "It sets a lower bound for the component's final rendered width.",
            "It reserves extra spacing between the component and nearby siblings.",
            "It chooses the starting width before flexible space is distributed.",
            "It limits the component's width when spare horizontal space grows."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-basics-l2-s1-q03",
        "topicId": "hc-flexbox-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Vertical signal controls</title>\n<style>\nbody { margin: 0; }\n.signal-stack { display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-end; width: 240px; height: 180px; }\n.signal-control { width: 60px; height: 30px; flex-shrink: 0; }\n.signal-test { align-self: center; }\n</style>\n</head>\n<body>\n<div class=\"signal-stack\"><div class=\"signal-control\">Start</div><div class=\"signal-control signal-test\">Test</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.signal-test').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.signal-test` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "90",
            "90px",
            "90 px"
          ]
        },
        "partB": {
          "ask": "What would changing `justify-content` to `flex-start` affect in `.signal-stack`?",
          "options": [
            "It would change the horizontal space reserved between the controls.",
            "It would change the source order used for keyboard reading.",
            "It would change the cross-axis width assigned to the controls.",
            "It would change the controls' vertical placement within the stack."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-display-l2-s1-q04",
        "topicId": "hc-display",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Transparent tracing layers</title>\n<style>\nbody { margin: 0; }\n.tracing-layer { position: absolute; left: 0; top: 0; width: 120px; height: 80px; }\n.tracing-base { background: yellow; }\n.tracing-film { opacity: 0; }\n.tracing-guide { visibility: hidden; }\n</style>\n</head>\n<body>\n<div class=\"tracing-layer tracing-base\" id=\"base\"></div>\n<div class=\"tracing-layer tracing-film\" id=\"film\"></div>\n<div class=\"tracing-layer tracing-guide\" id=\"guide\"></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(40, 40).id",
        "partA": {
          "ask": "Which element is returned by hit testing at 40 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "film"
          ]
        },
        "partB": {
          "ask": "What would setting `display: none` on `.tracing-base` do?",
          "options": [
            "It would keep the base rectangle and suppress its painted background.",
            "It would remove the base's rendered rectangle from the page layout.",
            "It would place the base rectangle behind the document background.",
            "It would retain the base rectangle but disable its pointer targeting."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-flexbox-practice-l2-s1-q05",
        "topicId": "hc-flexbox-practice",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Constrained inventory panels</title>\n<style>\nbody { margin: 0; }\n.stock-row { display: flex; width: 260px; height: 40px; }\n.stock-panel { flex: 0 1 180px; min-width: 0; height: 40px; }\n.stock-names { min-width: 160px; }\n</style>\n</head>\n<body>\n<div class=\"stock-row\"><div class=\"stock-panel stock-names\">Names</div><div class=\"stock-panel stock-totals\">Totals</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.stock-totals').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.stock-totals` in px? Answer with a number.",
          "accepted": [
            "100",
            "100px",
            "100 px"
          ]
        },
        "partB": {
          "ask": "What does the middle number in `flex: 0 1 180px` represent?",
          "options": [
            "It supplies the shrinking factor used when the row lacks space.",
            "It specifies the preferred source position used when children are ordered.",
            "It supplies the growth factor used when the row has spare space.",
            "It specifies the minimum pixel width used when the row becomes narrow."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-layout-patterns-l2-s1-q06",
        "topicId": "hc-layout-patterns",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Short catalog footer</title>\n<style>\nbody { margin: 0; }\n.catalog-page { display: flex; flex-direction: column; width: 320px; min-height: 420px; }\n.catalog-heading { flex: 0 0 60px; }\n.catalog-content { flex: 1 0 80px; min-height: 0; }\n.catalog-footer { flex: 0 0 40px; }\n</style>\n</head>\n<body>\n<div class=\"catalog-page\"><header class=\"catalog-heading\">Catalog</header><main class=\"catalog-content\">New arrivals</main><footer class=\"catalog-footer\">Help</footer></div>\n</body>\n</html>",
        "check": "document.querySelector('.catalog-footer').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.catalog-footer` from the viewport top in px? Answer with a number.",
          "accepted": [
            "380",
            "380px",
            "380 px"
          ]
        },
        "partB": {
          "ask": "Why use `min-height` for `.catalog-page` rather than a fixed height?",
          "options": [
            "It pins the footer to the viewport while the main content scrolls.",
            "It makes the content area overlap the footer when text becomes longer.",
            "It lets the page grow beyond its minimum size as content needs space.",
            "It moves excess content into a new column when the minimum is reached."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-mobile-first-media-l2-s1-q07",
        "topicId": "hc-mobile-first-media",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Museum map breakpoints</title>\n<style>\nbody { margin: 0; }\n.museum-map { width: 160px; height: 60px; }\n@media (min-width: 600px) { .museum-map.compact-map { width: 280px; } }\n@media (min-width: 760px) { .museum-map { width: 340px; } }\n@media (min-width: 900px) { .museum-map.compact-map { width: 400px; } }\n</style>\n</head>\n<body>\n<div class=\"museum-map compact-map\">Gallery map</div>\n</body>\n</html>",
        "check": "document.querySelector('.museum-map').getBoundingClientRect().width",
        "partA": {
          "ask": "At an 800 by 600 px viewport, what is the rendered width of `.museum-map` in px? Answer with a number.",
          "accepted": [
            "280",
            "280px",
            "280 px"
          ]
        },
        "partB": {
          "ask": "What does a mobile-first stylesheet generally provide outside media queries?",
          "options": [
            "It provides a separate document structure chosen by the device name.",
            "It provides base styles intended to work with narrow available space.",
            "It provides a fixed desktop width scaled down by the browser zoom.",
            "It provides a screen density test used to select smaller text files."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this width.",
          "keyPoints": [
            "The `600px` and `760px` minimum-width queries match.",
            "The `900px` minimum-width query does not match.",
            "The `.museum-map.compact-map` selector has greater specificity than `.museum-map`.",
            "The matching `280px` declaration wins over the later `340px` declaration."
          ],
          "modelAnswer": "The viewport meets the `600px` and `760px` minimum widths. It does not meet the `900px` minimum width. The matching `.museum-map.compact-map` selector has greater specificity than `.museum-map`. Its `280px` width wins even though the `340px` rule appears later."
        }
      },
      {
        "id": "hc-custom-properties-l2-s1-q08",
        "topicId": "hc-custom-properties",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Inherited measure token</title>\n<style>\nbody { margin: 0; }\n.fabric-roll { --unit: 12px; --cut-length: calc(var(--unit) * 5); width: 300px; height: 80px; }\n.fabric-cut { --unit: 20px; width: var(--cut-length); height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"fabric-roll\"><div class=\"fabric-cut\">Sample</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.fabric-cut').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.fabric-cut` in px? Answer with a number.",
          "accepted": [
            "60",
            "60px",
            "60 px"
          ]
        },
        "partB": {
          "ask": "What is a benefit of using custom properties for design tokens?",
          "options": [
            "They convert related measurements into viewport units during page layout.",
            "They give related declarations stronger selector weights during cascade resolution.",
            "They generate related markup elements from the stylesheet during page parsing.",
            "They give related styling decisions shared names for reuse across a design."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-selectors-l2-s1-q09",
        "topicId": "hc-selectors",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Audio transcript links</title>\n<style>\nbody { margin: 0; }\n.audio-notes > p { margin: 0; width: 180px; height: 20px; }\n.audio-notes > p:nth-of-type(2n) + a { color: red; }\n</style>\n</head>\n<body>\n<section class=\"audio-notes\">\n<h2>Recordings</h2><p>Intro</p><a href=\"#intro\">Read</a>\n<p>Interview</p><a href=\"#interview\">Read</a><span>Pause</span>\n<p>Summary</p><a href=\"#summary\">Read</a>\n<p>Credits</p><a href=\"#credits\">Read</a>\n</section>\n</body>\n</html>",
        "check": "document.querySelectorAll('.audio-notes > p:nth-of-type(2n) + a').length",
        "partA": {
          "ask": "How many links match `.audio-notes > p:nth-of-type(2n) + a`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What would replacing `+` with `~` change in this selector's sibling relationship?",
          "options": [
            "It would permit matching links farther after a qualifying paragraph sibling.",
            "It would permit matching links nested deeper inside a qualifying paragraph element.",
            "It would permit matching links earlier than a qualifying paragraph sibling.",
            "It would permit matching links above a qualifying paragraph in its ancestry."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-units-l2-s1-q10",
        "topicId": "hc-units",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Mixed-unit tide scale</title>\n<style>\nhtml { font-size: 20px; }\nbody { margin: 0; }\n.tide-stage { font-size: 30px; width: 500px; height: 100px; }\n.tide-scale { width: calc(50vw - 2rem + 10vh); height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"tide-stage\"><div class=\"tide-scale\">Tide</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.tide-scale').getBoundingClientRect().width",
        "partA": {
          "ask": "At an 800 by 600 px viewport, what is the width of `.tide-scale` in px? Answer with a number.",
          "accepted": [
            "420",
            "420px",
            "420 px"
          ]
        },
        "partB": {
          "ask": "What would changing `.tide-stage` to `font-size: 40px` do to this width?",
          "options": [
            "It would increase the width because the viewport becomes relatively wider.",
            "It would reduce the width because the subtraction uses larger parent units.",
            "It would leave the width unchanged because its unit references stay unchanged.",
            "It would double the width because the root reference follows parent text."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-pseudo-l2-s1-q11",
        "topicId": "hc-pseudo",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Dispatch queue exceptions</title>\n<style>\nbody { margin: 0; }\n.dispatch-queue { margin: 0; padding: 0; list-style: none; }\n.dispatch-queue > li { width: 140px; height: 20px; }\n.dispatch-queue > li:not(.held):nth-child(2n) { background-color: blue; }\n</style>\n</head>\n<body>\n<ul class=\"dispatch-queue\"><li>Maps</li><li>Labels</li><li>Envelopes</li><li class=\"held\">Stamps</li><li>String</li><li>Tape</li></ul>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('.dispatch-queue > li')].filter(el => getComputedStyle(el).backgroundColor === 'rgb(0, 0, 255)').length",
        "partA": {
          "ask": "How many entries in `.dispatch-queue` have a `blue` background? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "How does a pseudo-class differ from a pseudo-element?",
          "options": [
            "A pseudo-class adds an attribute to markup; a pseudo-element adds a child node.",
            "A pseudo-class has type selector weight; a pseudo-element has class selector weight.",
            "A pseudo-class represents a styled part; a pseudo-element tests an element condition.",
            "A pseudo-class tests an element condition; a pseudo-element represents a page part."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this count.",
          "keyPoints": [
            "The `li` elements occupy sibling positions one through six.",
            "The `:nth-child(2n)` condition selects positions two, four and six.",
            "The `:not(.held)` condition excludes the fourth entry without renumbering siblings.",
            "The second and sixth entries receive `background-color: blue`."
          ],
          "modelAnswer": "The browser counts the six sibling `li` elements in their document order. The `:nth-child(2n)` condition matches positions two, four and six. The fourth entry fails `:not(.held)`, and this exclusion does not change the sibling positions. Two entries therefore receive the `blue` background."
        }
      },
      {
        "id": "hc-forms-l2-s1-q12",
        "topicId": "hc-forms",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Meal preference submission</title>\n<style>\nbody { margin: 0; }\n.meal-request input { box-sizing: border-box; width: 100px; height: 24px; }\n</style>\n</head>\n<body>\n<form class=\"meal-request\">\n<label>Seat <input name=\"seat\" value=\"A7\"></label>\n<label>Soup <input type=\"checkbox\" name=\"extra\" value=\"soup\" checked></label>\n<label>Fruit <input type=\"checkbox\" name=\"extra\" value=\"fruit\" checked></label>\n<label>Tea <input type=\"checkbox\" name=\"extra\" value=\"tea\"></label>\n<label>Code <input name=\"code\" value=\"LUNCH\" disabled></label>\n</form>\n</body>\n</html>",
        "check": "[...new FormData(document.querySelector('.meal-request')).entries()].length",
        "partA": {
          "ask": "How many name-value entries does `new FormData()` create from `.meal-request`, counting repeated names separately? Answer with a number.",
          "accepted": [
            "3"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a form control's `name` attribute?",
          "options": [
            "It supplies the visible caption read beside the editable control.",
            "It supplies the key associated with the control's submitted value.",
            "It supplies the unique page target used by a linked label.",
            "It supplies the validation message shown for an invalid value."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-lists-tables-l2-s1-q13",
        "topicId": "hc-lists-tables",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Nested assembly steps</title>\n<style>\nbody { margin: 0; }\n.assembly-steps, .assembly-steps ul { margin: 0; padding-left: 24px; }\n</style>\n</head>\n<body>\n<ol class=\"assembly-steps\">\n<li>Prepare<ul><li>Sort screws</li><li>Find tools</li></ul></li>\n<li>Build<ul><li>Attach legs</li></ul></li>\n<li>Inspect</li>\n</ol>\n</body>\n</html>",
        "check": "document.querySelectorAll('.assembly-steps > li li').length",
        "partA": {
          "ask": "How many nested entries match `.assembly-steps > li li`? Answer with a number.",
          "accepted": [
            "3"
          ]
        },
        "partB": {
          "ask": "Where should a nested list be placed to represent substeps of a list entry?",
          "options": [
            "It belongs inside the `li` element for the step it expands.",
            "It belongs beside the outer list with a matching class attribute.",
            "It belongs between outer `li` siblings as a separate list child.",
            "It belongs before the outer list with a linking start attribute."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-backgrounds-borders-l2-s1-q14",
        "topicId": "hc-backgrounds-borders",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Resetting a gradient swatch</title>\n<style>\nbody { margin: 0; }\n.gradient-sample { width: 160px; height: 60px; background-size: 40px 20px; background-repeat: no-repeat; }\n.gradient-sample { background: linear-gradient(red, blue); }\n</style>\n</head>\n<body>\n<div class=\"gradient-sample\">Colour sample</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.gradient-sample')).backgroundSize",
        "partA": {
          "ask": "What is the computed `background-size` of `.gradient-sample` after the later rule applies? Answer with a CSS keyword.",
          "accepted": [
            "auto"
          ]
        },
        "partB": {
          "ask": "What is a useful property of a CSS gradient background?",
          "options": [
            "It draws a coloured outline whose thickness adds to the element's size.",
            "It assigns text colours to descendants using their relative layout positions.",
            "It paints a smooth colour transition without needing an external image file.",
            "It blends sibling elements into a shared layer before their layout completes."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-cascade-specificity-l2-s1-q15",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Local invoice status</title>\n<style>\nbody { margin: 0; }\n#invoice-summary { color: red !important; width: 240px; height: 100px; }\n.invoice-status { color: blue; width: 160px; height: 30px; }\n</style>\n</head>\n<body>\n<section id=\"invoice-summary\"><p class=\"invoice-status\">Awaiting payment</p></section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.invoice-status')).color",
        "partA": {
          "ask": "What is the text colour of `.invoice-status`? Answer with a colour word.",
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
          "ask": "What does `!important` change for a CSS declaration?",
          "options": [
            "It increases the selector's specificity by adding an extra identifier weight.",
            "It moves the matching element to a higher level in visual stacking.",
            "It adds the declaration's property to the browser's inherited property list.",
            "It changes the declaration's importance category for comparison in the cascade."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-flexbox-basics-l2-s1-q16",
        "topicId": "hc-flexbox-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Separated sample rows</title>\n<style>\nbody { margin: 0; }\n.sample-board { display: flex; flex-wrap: wrap; align-content: space-between; align-items: flex-start; width: 200px; height: 180px; gap: 20px; }\n.sample-chip { flex: 0 0 90px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"sample-board\"><div class=\"sample-chip\">Oak</div><div class=\"sample-chip\">Ash</div><div class=\"sample-chip\" id=\"sample-pine\">Pine</div><div class=\"sample-chip\">Elm</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#sample-pine').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#sample-pine` from the viewport top in px? Answer with a number.",
          "accepted": [
            "160",
            "160px",
            "160 px"
          ]
        },
        "partB": {
          "ask": "What would changing `align-items` to `center` affect in this layout?",
          "options": [
            "It would change how spare vertical space is shared between flex lines.",
            "It would change how children align vertically within their own flex line.",
            "It would change how spare horizontal space is shared between adjacent children.",
            "It would change how children are sorted before being assigned to lines."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this vertical position.",
          "keyPoints": [
            "Two `90px` children and one `20px` gap fill the `200px` width.",
            "The four children form two flex lines of `20px` height.",
            "The lines and minimum row gap use `60px`, leaving `120px` of free height.",
            "The `align-content: space-between` declaration adds that space between lines, placing the second line at `160px`."
          ],
          "modelAnswer": "Two `90px` children plus a `20px` gap fit on a line, so `#sample-pine` starts the second line. The two lines are `20px` tall. Together with the minimum `20px` row gap, they use `60px` of the `180px` height. The `align-content: space-between` declaration places the remaining `120px` between the lines, so the second line starts at `160px`."
        }
      },
      {
        "id": "hc-selectors-l2-s1-q17",
        "topicId": "hc-selectors",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Public reference routes</title>\n<style>\nbody { margin: 0; }\n.reference-links a { display: block; width: 180px; height: 24px; }\n.reference-links a[data-route^=\"help/\"][data-tags~=\"public\"] { color: green; }\n</style>\n</head>\n<body>\n<nav class=\"reference-links\">\n<a href=\"#setup\" data-route=\"help/setup\" data-tags=\"public quick\">Setup</a>\n<a href=\"#editing\" data-route=\"help/editing\" data-tags=\"publicity\">Editing</a>\n<a href=\"#billing\" data-route=\"helpdesk/billing\" data-tags=\"public\">Billing</a>\n<a href=\"#search\" data-route=\"help/search\" data-tags=\"quick public\">Search</a>\n<a href=\"#private\" data-route=\"help/private\" data-tags=\"staff\">Private</a>\n</nav>\n</body>\n</html>",
        "check": "document.querySelectorAll('.reference-links a[data-route^=\"help/\"][data-tags~=\"public\"]').length",
        "partA": {
          "ask": "How many links match `.reference-links a[data-route^=\"help/\"][data-tags~=\"public\"]`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What is a useful role of `data-route` and `data-tags` attributes?",
          "options": [
            "They store custom metadata that styles and scripts can read from elements.",
            "They supply navigation destinations when a link has no target address.",
            "They provide built-in validation rules for checking a link's destination.",
            "They define accessible names used by screen readers for link announcements."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-grid-basics-l2-s1-q18",
        "topicId": "hc-grid-basics",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Centered transit key</title>\n<style>\nbody { margin: 0; }\n.transit-grid { display: grid; grid-template-columns: 100px 1fr 2fr; column-gap: 20px; width: 500px; height: 60px; }\n.transit-grid > div { min-width: 0; height: 40px; }\n.transit-key { width: 60px; justify-self: center; }\n</style>\n</head>\n<body>\n<div class=\"transit-grid\"><div>Route</div><div>Times</div><div class=\"transit-key\">Key</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.transit-key').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.transit-key` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "350",
            "350px",
            "350 px"
          ]
        },
        "partB": {
          "ask": "What does `justify-self` control for a grid child?",
          "options": [
            "It controls the spacing between column tracks across the full grid.",
            "It controls the sequence used to place children into available cells.",
            "It controls the child's inline alignment inside its assigned grid area.",
            "It controls the child's stacking level relative to overlapping grid siblings."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-cascade-specificity-l2-s2-q01",
        "topicId": "hc-cascade-specificity",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Ticket availability</title>\n<style>\nbody { margin: 0; }\n.ticket-status { color: blue; width: 180px; height: 30px; }\n:is(#sold-out, .ticket-status) { color: red; }\n.ticket-status.available { color: green; }\n</style>\n</head>\n<body>\n<p class=\"ticket-status available\">Seats available</p>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.ticket-status')).color",
        "partA": {
          "ask": "What is the text colour of `.ticket-status`? Answer with a colour word.",
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
          "ask": "What is the purpose of grouping selectors into a selector list?",
          "options": [
            "It combines their weights into a stronger selector for matching descendants.",
            "It applies shared declarations to elements matching a listed selector.",
            "It creates a nesting boundary for declarations that style related descendants.",
            "It changes the inheritance path for properties shared by matching elements."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-box-model-l2-s2-q02",
        "topicId": "hc-box-model",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Collapsing crate spacing</title>\n<style>\nbody { margin: 0; }\n.crate-stage { display: flow-root; width: 300px; height: 160px; }\n.crate-shell { margin-top: 12px; width: 200px; height: 80px; }\n.crate-label { margin-top: 28px; width: 100px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"crate-stage\"><div class=\"crate-shell\"><div class=\"crate-label\">Fragile</div></div></div>\n</body>\n</html>",
        "check": "document.querySelector('.crate-shell').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top border edge of `.crate-shell` from the viewport top in px? Answer with a number.",
          "accepted": [
            "28",
            "28px",
            "28 px"
          ]
        },
        "partB": {
          "ask": "What is a useful distinction between margins and padding?",
          "options": [
            "Margins separate content from borders; padding separates adjacent outer edges.",
            "Margins paint the surrounding background; padding supplies transparent outer spacing.",
            "Margins change selector matching; padding changes the inheritance of dimensions.",
            "Margins supply external spacing; padding supplies spacing inside the border."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.crate-stage` establishes a block formatting context with `display: flow-root`.",
            "The `.crate-shell` has no top border or padding separating it from `.crate-label`.",
            "The adjoining `margin-top` values collapse to the larger positive margin.",
            "The collapsed margin places `.crate-shell` 28 px below the viewport top."
          ],
          "modelAnswer": "The `.crate-stage` starts at the viewport top and keeps descendant margins inside its formatting context. The `.crate-shell` has no top border or padding separating its margin from the first child margin. Their `margin-top` values of `12px` and `28px` collapse to `28px`. The top border edge of `.crate-shell` is therefore 28 px from the viewport top."
        }
      },
      {
        "id": "hc-flexbox-basics-l2-s2-q03",
        "topicId": "hc-flexbox-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reversed instrument tray</title>\n<style>\nbody { margin: 0; }\n.instrument-tray { display: flex; flex-direction: row-reverse; justify-content: flex-start; gap: 10px; width: 300px; height: 40px; }\n.instrument-key { flex: 0 0 60px; height: 40px; }\n</style>\n</head>\n<body>\n<div class=\"instrument-tray\"><div class=\"instrument-key\">Tune</div><div class=\"instrument-key\" id=\"sound-key\">Sound</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#sound-key').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `#sound-key` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "170",
            "170px",
            "170 px"
          ]
        },
        "partB": {
          "ask": "What does the final size in `flex: 0 0 60px` provide?",
          "options": [
            "It sets the initial main size before flexible space is distributed.",
            "It sets the extra main spacing that appears between adjacent children.",
            "It sets the cross size used when several flex lines are aligned.",
            "It sets the minimum main size that limits shrinking of text content."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-display-l2-s2-q04",
        "topicId": "hc-display",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Empty inline divider</title>\n<style>\nbody { margin: 0; }\n.divider-line { width: 300px; height: 40px; font-size: 0; line-height: 0; }\n.inline-divider { display: inline; width: 150px; padding: 0 10px; border: 2px solid black; }\n.divider-end { display: inline-block; width: 40px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"divider-line\"><span class=\"inline-divider\"></span><span class=\"divider-end\"></span></div>\n</body>\n</html>",
        "check": "document.querySelector('.divider-end').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.divider-end` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "24",
            "24px",
            "24 px"
          ]
        },
        "partB": {
          "ask": "What would `display: inline-block` let `.inline-divider` do?",
          "options": [
            "It would turn its horizontal padding into spacing outside the border.",
            "It would stretch its content to fill the available parent width.",
            "It would use its declared width while participating in inline flow.",
            "It would align its border with the top edge of the viewport."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-positioning-l2-s2-q05",
        "topicId": "hc-positioning",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Transformed microscope frame</title>\n<style>\nbody { margin: 0; }\n.microscope-frame { transform: translateX(0); margin-left: 80px; width: 300px; height: 160px; }\n.magnifier-tab { position: fixed; right: 20px; top: 10px; width: 40px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"microscope-frame\"><div class=\"magnifier-tab\">Zoom</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.magnifier-tab').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.magnifier-tab` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "320",
            "320px",
            "320 px"
          ]
        },
        "partB": {
          "ask": "What is a containing block used for in positioned layout?",
          "options": [
            "It supplies a shared selector weight for declarations targeting positioned descendants.",
            "It supplies the reference rectangle used to resolve dimensions and position offsets.",
            "It supplies a clipping boundary that removes overflowing parts of positioned descendants.",
            "It supplies the keyboard sequence used to navigate controls within positioned descendants."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-z-index-stacking-l2-s2-q06",
        "topicId": "hc-z-index-stacking",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Overlapping parcel seals</title>\n<style>\nbody { margin: 0; }\n.parcel-seal { position: absolute; left: 20px; top: 20px; width: 100px; height: 80px; z-index: 3; }\n.seal-received { background: red; opacity: 0.8; }\n.seal-checked { background: blue; }\n</style>\n</head>\n<body>\n<div class=\"parcel-seal seal-received\" id=\"received\"></div>\n<div class=\"parcel-seal seal-checked\" id=\"checked\"></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(50, 50).id",
        "partA": {
          "ask": "Which element is returned by hit testing at 50 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "checked"
          ]
        },
        "partB": {
          "ask": "What is the purpose of hit testing in a browser?",
          "options": [
            "It determines which element is targeted at a supplied viewport coordinate.",
            "It determines which selector contributes the strongest matching declaration weight.",
            "It determines which stylesheet resource finishes downloading before page rendering.",
            "It determines which control receives focus next during sequential keyboard navigation."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.parcel-seal` rectangles overlap at the tested point.",
            "The positioned siblings have equal `z-index: 3` in the outer stacking context.",
            "The later sibling `#checked` paints above `#received` at that equal level.",
            "The `opacity: 0.8` declaration does not raise the earlier sibling above that level."
          ],
          "modelAnswer": "The point lies inside the two `.parcel-seal` rectangles. They are positioned siblings with equal `z-index: 3`. The `opacity: 0.8` on `#received` does not give it a higher outer stacking level. At equal levels the later sibling paints above the earlier one, so hit testing returns `checked`."
        }
      },
      {
        "id": "hc-grid-basics-l2-s2-q07",
        "topicId": "hc-grid-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Alternating archive rows</title>\n<style>\nbody { margin: 0; }\n.archive-slots { display: grid; grid-template-columns: 100px 100px; grid-template-rows: 20px; grid-auto-rows: 30px 50px; gap: 10px; width: 210px; }\n.archive-file { width: 100px; height: 20px; min-width: 0; }\n</style>\n</head>\n<body>\n<div class=\"archive-slots\"><div class=\"archive-file\">A</div><div class=\"archive-file\">B</div><div class=\"archive-file\">C</div><div class=\"archive-file\">D</div><div class=\"archive-file\" id=\"archive-last\">E</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#archive-last').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#archive-last` from the viewport top in px? Answer with a number.",
          "accepted": [
            "70",
            "70px",
            "70 px"
          ]
        },
        "partB": {
          "ask": "What is an explicit grid track?",
          "options": [
            "It is a track inferred from the intrinsic size of a child.",
            "It is a track inserted when an extra child exceeds defined tracks.",
            "It is a track reserved for content removed from normal layout flow.",
            "It is a track defined through the grid template track properties."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-grid-practice-l2-s2-q08",
        "topicId": "hc-grid-practice",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Vacant pottery slots</title>\n<style>\nbody { margin: 0; }\n.pottery-rack { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 20px; width: 500px; }\n.pottery-label { min-width: 0; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"pottery-rack\"><div class=\"pottery-label\">Bowl</div><div class=\"pottery-label\">Cup</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.pottery-label').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the border-box width of the first `.pottery-label` in px? Answer with a number.",
          "accepted": [
            "110",
            "110px",
            "110 px"
          ]
        },
        "partB": {
          "ask": "How does `gap` differ from a margin on a grid child?",
          "options": [
            "It contributes space inside a child rather than space surrounding its border.",
            "It contributes shared space between tracks rather than attaching spacing to a child.",
            "It contributes space around the grid perimeter rather than inside its tracks.",
            "It contributes space through text metrics rather than through track sizing rules."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-html-accessibility-l2-s2-q09",
        "topicId": "hc-html-accessibility",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Keyboard access to exhibit controls</title>\n<style>\nbody { margin: 0; }\n.exhibit-access { width: 300px; height: 160px; }\n.exhibit-access > * { box-sizing: border-box; display: block; width: 160px; height: 24px; margin: 0; }\n</style>\n</head>\n<body>\n<div class=\"exhibit-access\">\n<button type=\"button\">Start</button>\n<div tabindex=\"0\">Details</div>\n<div tabindex=\"2\">Quick access</div>\n<a href=\"#end\" tabindex=\"-1\">End</a>\n<button type=\"button\" disabled>Unavailable</button>\n</div>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('.exhibit-access > *')].filter(el => el.tabIndex >= 0 && !el.disabled).length",
        "partA": {
          "ask": "How many controls or regions inside `.exhibit-access` are stops in sequential Tab navigation? Answer with a number.",
          "accepted": [
            "3"
          ]
        },
        "partB": {
          "ask": "What is the purpose of an accessible name?",
          "options": [
            "It gives a control an identifier for matching stylesheet rules.",
            "It gives a control a position in the keyboard navigation sequence.",
            "It gives a control a name that assistive technology can announce.",
            "It gives a control a visible caption below its rendered border."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-semantic-html-l2-s2-q10",
        "topicId": "hc-semantic-html",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Headings inside a field guide</title>\n<style>\nbody { margin: 0; }\nh1, h2 { margin: 0; font-size: 20px; line-height: 24px; }\n.guide-content { width: 400px; }\n</style>\n</head>\n<body>\n<header><h1>Field guide</h1></header>\n<main class=\"guide-content\">\n<section><h2>Wetlands</h2><article><h1>Reeds</h1></article></section>\n<section><h1>Grassland</h1></section>\n</main>\n<footer><h2>Credits</h2></footer>\n</body>\n</html>",
        "check": "document.querySelectorAll('main h1').length",
        "partA": {
          "ask": "How many elements does `document.querySelectorAll('main h1')` find? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What is a good reason to choose heading levels deliberately?",
          "options": [
            "They communicate the hierarchy of content to readers using assistive navigation.",
            "They assign the default keyboard sequence to nearby interactive page controls.",
            "They determine the inherited landmark roles of surrounding document regions.",
            "They establish the selector specificity of rules matching surrounding page content."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The selector `main h1` matches descendant `h1` elements of `main`.",
            "The `h1` inside `article` remains a descendant of `main`.",
            "The second `section` contributes another matching `h1`.",
            "The `header` heading is outside `main` and does not match."
          ],
          "modelAnswer": "The browser starts with the `main` element and looks for descendant `h1` elements. The `h1` inside the nested `article` matches despite the extra nesting. The `h1` in the second `section` also matches. The `header` heading is outside `main`, so the result contains two elements."
        }
      },
      {
        "id": "hc-css-architecture-l2-s2-q11",
        "topicId": "hc-css-architecture",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Scoped repair notice</title>\n<style>\nbody { margin: 0; }\n.repair-widget { width: 240px; height: 80px; }\n.repair-widget .repair-note { color: green; width: 180px; height: 24px; }\n.ink-alert { color: blue; }\n</style>\n</head>\n<body>\n<div class=\"repair-widget\"><p class=\"repair-note ink-alert\">Parts ready</p></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.repair-note')).color",
        "partA": {
          "ask": "What is the text colour of `.repair-note`? Answer with a colour word.",
          "accepted": [
            "green",
            "rgb(0, 128, 0)",
            "#008000"
          ]
        },
        "partB": {
          "ask": "What is a benefit of using a descendant selector to scope component styles?",
          "options": [
            "It turns component styles into inline declarations attached directly to rendered markup.",
            "It gives component styles a separate cascade origin from other author stylesheet rules.",
            "It prevents component styles from participating in inheritance within nested component markup.",
            "It limits component style matches to elements within the specifically selected ancestor region."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-debugging-crossbrowser-l2-s2-q12",
        "topicId": "hc-debugging-crossbrowser",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Malformed selector list</title>\n<style>\nbody { margin: 0; }\n.permit-label { width: 160px; height: 30px; color: blue; }\n.permit-label, .permit-note..active { color: red; }\n</style>\n</head>\n<body>\n<div class=\"permit-label\">Permit pending</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.permit-label')).color",
        "partA": {
          "ask": "The later selector list contains a typo. What is the text colour of `.permit-label`? Answer with a colour word.",
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
          "ask": "Why is testing a page in more than one browser useful?",
          "options": [
            "Browser testing converts unsupported styles into equivalent supported fallback declarations.",
            "Browser testing can reveal differences in feature support and rendering behavior.",
            "Browser testing synchronizes the default style rules installed by different browser engines.",
            "Browser testing makes selector weights depend on a shared browser configuration."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-transitions-animations-l2-s2-q13",
        "topicId": "hc-transitions-animations",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Transition lists for a drawer grip</title>\n<style>\nbody { margin: 0; }\n.drawer-grip { width: 100px; height: 30px; transition: width 2s linear; }\n.drawer-grip { transition: opacity 300ms linear, transform 600ms ease; }\n</style>\n</head>\n<body>\n<div class=\"drawer-grip\">Grip</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.drawer-grip')).transitionProperty",
        "partA": {
          "ask": "What is the computed `transition-property` list of `.drawer-grip`? Answer with property names separated by a comma.",
          "accepted": [
            "opacity, transform",
            "opacity,transform"
          ]
        },
        "partB": {
          "ask": "What does a transition timing function describe?",
          "options": [
            "It describes how transition progress changes over the transition duration.",
            "It describes which property names the browser includes in the transition.",
            "It describes how many times the browser repeats a completed transition.",
            "It describes which selector weight applies when a transition is declared."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-fluid-sizing-l2-s2-q14",
        "topicId": "hc-fluid-sizing",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Proportional aquarium preview</title>\n<style>\nbody { margin: 0; }\n.aquarium-preview { width: min(50vw, 360px); aspect-ratio: 3 / 2; }\n</style>\n</head>\n<body>\n<div class=\"aquarium-preview\">Tank preview</div>\n</body>\n</html>",
        "check": "document.querySelector('.aquarium-preview').getBoundingClientRect().height",
        "partA": {
          "ask": "At an 800 by 600 px viewport, what is the height of `.aquarium-preview` in px? Answer with a number.",
          "accepted": [
            "240",
            "240px",
            "240 px"
          ]
        },
        "partB": {
          "ask": "What would adding an explicit `height: 100px` do to this rectangle?",
          "options": [
            "It would force the width to change until the preferred ratio returns.",
            "It would replace the preferred ratio with a new inherited height ratio.",
            "It would set the height without requiring the preferred ratio to hold.",
            "It would turn the width limit into a matching limit on its content height."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-positioning-l2-s2-q15",
        "topicId": "hc-positioning",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Stretched directory rail</title>\n<style>\nbody { margin: 0; }\n.directory-frame { position: relative; width: 240px; height: 200px; }\n.directory-rail { position: absolute; top: 10%; bottom: 20%; left: 0; width: 80px; height: auto; box-sizing: content-box; padding: 10px; border: 2px solid black; }\n</style>\n</head>\n<body>\n<div class=\"directory-frame\"><div class=\"directory-rail\">Index</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.directory-rail')).height",
        "partA": {
          "ask": "What is the content height of `.directory-rail` in px? Answer with a number.",
          "accepted": [
            "116",
            "116px",
            "116 px"
          ]
        },
        "partB": {
          "ask": "What happens to the normal flow slot of an absolutely positioned element?",
          "options": [
            "Its slot remains reserved at the location where its markup appears.",
            "Its slot moves to the top start edge of its nearest positioned ancestor.",
            "Its slot expands to cover the padding area of its containing block.",
            "Its slot is removed so following flow content can occupy that space."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-grid-practice-l2-s2-q16",
        "topicId": "hc-grid-practice",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Filling small packing gaps</title>\n<style>\nbody { margin: 0; }\n.packing-board { display: grid; grid-template-columns: repeat(3, 100px); grid-auto-rows: 30px; grid-auto-flow: row dense; gap: 10px; width: 320px; }\n.packing-wide { grid-column: span 2; height: 30px; min-width: 0; }\n.packing-small { width: 100px; height: 30px; }\n</style>\n</head>\n<body>\n<div class=\"packing-board\"><div class=\"packing-wide\">Long tools</div><div class=\"packing-wide\">Spare rails</div><div class=\"packing-small\">Clips</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.packing-small').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.packing-small` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "220",
            "220px",
            "220 px"
          ]
        },
        "partB": {
          "ask": "What should be checked when visual grid placement differs from document order?",
          "options": [
            "Whether the keyboard and reading sequences remain understandable to users.",
            "Whether the grid track names become part of the accessible names.",
            "Whether the selector weights change when content enters another grid row.",
            "Whether the browser replaces semantic roles with visual column numbers."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-basics-l2-s2-q17",
        "topicId": "hc-flexbox-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Two expandable spaces in a ribbon</title>\n<style>\nbody { margin: 0; }\n.service-ribbon { display: flex; width: 400px; height: 40px; gap: 20px; }\n.ribbon-control { flex: 0 0 60px; height: 40px; }\n.ribbon-separate { margin-left: auto; }\n</style>\n</head>\n<body>\n<div class=\"service-ribbon\"><div class=\"ribbon-control\">Open</div><div class=\"ribbon-control ribbon-separate\" id=\"ribbon-help\">Help</div><div class=\"ribbon-control ribbon-separate\">Close</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#ribbon-help').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `#ribbon-help` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "170",
            "170px",
            "170 px"
          ]
        },
        "partB": {
          "ask": "What does a flex shrink factor describe?",
          "options": [
            "It describes the priority used to sort flex children before visual placement.",
            "It describes how positive free space increases a child before margin allocation.",
            "It describes a child contribution to shrinking when the line has insufficient space.",
            "It describes the preferred cross size used when flex children have different heights."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "Three `60px` controls use 180 px of width.",
            "Two `20px` gaps add 40 px, leaving 180 px of positive free space.",
            "The two `margin-left: auto` margins divide that free space equally.",
            "The first control, first gap and first automatic margin precede `#ribbon-help`."
          ],
          "modelAnswer": "The three `.ribbon-control` elements use 180 px, and the two gaps use 40 px. That leaves 180 px of positive free space in `.service-ribbon`. The two `margin-left: auto` margins receive 90 px apiece. The left edge of `#ribbon-help` is after the first 60 px control, a 20 px gap and a 90 px margin, giving 170 px."
        }
      },
      {
        "id": "hc-box-model-l2-s2-q18",
        "topicId": "hc-box-model",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Pulling a ledger entry upward</title>\n<style>\nbody { margin: 0; }\n.ledger-page { display: flow-root; width: 240px; height: 160px; }\n.ledger-credit { width: 180px; height: 40px; margin-bottom: 30px; }\n.ledger-debit { width: 180px; height: 30px; margin-top: -12px; }\n</style>\n</head>\n<body>\n<div class=\"ledger-page\"><div class=\"ledger-credit\">Credit</div><div class=\"ledger-debit\">Debit</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.ledger-debit').getBoundingClientRect().top - document.querySelector('.ledger-credit').getBoundingClientRect().bottom",
        "partA": {
          "ask": "What is the vertical gap between the border boxes of `.ledger-credit` and `.ledger-debit` in px? Answer with a number.",
          "accepted": [
            "18",
            "18px",
            "18 px"
          ]
        },
        "partB": {
          "ask": "What would replacing the upward margin adjustment with a relative offset change?",
          "options": [
            "It would shrink the content height before the surrounding layout is calculated.",
            "It would move the painted rectangle while retaining its normal layout slot.",
            "It would remove the rectangle from flow and anchor it to the viewport.",
            "It would transfer the offset to the nearest ancestor with a definite height."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-positioning-l2-s3-q01",
        "topicId": "hc-positioning",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Badge inside an inset drawer</title>\n<style>\nbody { margin: 0; }\n.drawer-stage { position: relative; width: 400px; height: 180px; margin-left: 30px; }\n.drawer-pocket { margin-left: 70px; width: 200px; height: 100px; }\n.drawer-badge { position: absolute; left: 25%; top: 10px; width: 20px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"drawer-stage\"><div class=\"drawer-pocket\"><div class=\"drawer-badge\">New</div></div></div>\n</body>\n</html>",
        "check": "document.querySelector('.drawer-badge').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.drawer-badge` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "130",
            "130px",
            "130 px"
          ]
        },
        "partB": {
          "ask": "What is the purpose of a positioning inset?",
          "options": [
            "It specifies a distance from a reference edge for placement.",
            "It sets the thickness of a painted edge around content.",
            "It reserves spacing between the content and its border edge.",
            "It chooses a stacking level relative to nearby painted content."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-z-index-stacking-l2-s3-q02",
        "topicId": "hc-z-index-stacking",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Transparent sleeve over a print</title>\n<style>\nbody { margin: 0; }\n.print-sleeve { opacity: 0.6; width: 160px; height: 100px; }\n.sleeve-mark { position: absolute; left: 0; top: 0; width: 100px; height: 80px; z-index: 50; background: red; }\n.print-cover { position: absolute; left: 0; top: 0; width: 100px; height: 80px; z-index: 1; background: blue; }\n</style>\n</head>\n<body>\n<div class=\"print-sleeve\"><div class=\"sleeve-mark\" id=\"mark\"></div></div><div class=\"print-cover\" id=\"cover\"></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(30, 30).id",
        "partA": {
          "ask": "Which element receives hit testing at 30 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "cover"
          ]
        },
        "partB": {
          "ask": "How does group transparency differ from a transparent background colour?",
          "options": [
            "Group transparency changes the inherited colour used for text in descendants.",
            "Group transparency changes the pointer target area surrounding the element.",
            "Group transparency blends the element and its descendants as a painted unit.",
            "Group transparency changes the layout space reserved by descendant rectangles."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-grid-basics-l2-s3-q03",
        "topicId": "hc-grid-basics",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reserved square on a game board</title>\n<style>\nbody { margin: 0; }\n.game-board { display: grid; width: 260px; grid-template-columns: repeat(3, 80px); grid-auto-rows: 30px; gap: 10px; }\n.game-board > div { width: 80px; height: 30px; }\n.reserved-square { grid-column: 2; grid-row: 1; }\n</style>\n</head>\n<body>\n<div class=\"game-board\"><div class=\"free-square\" id=\"start-square\">Start</div><div class=\"reserved-square\">Reserved</div><div class=\"free-square\" id=\"finish-square\">Finish</div></div>\n</body>\n</html>",
        "check": "document.querySelector('#finish-square').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `#finish-square` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "180",
            "180px",
            "180 px"
          ]
        },
        "partB": {
          "ask": "What does a grid area represent?",
          "options": [
            "It represents the empty spacing separating adjacent tracks in a grid.",
            "It represents a rectangle bounded by selected grid lines in the layout.",
            "It represents the outer spacing surrounding the entire grid element.",
            "It represents the source sequence of children inside the grid markup."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.reserved-square` occupies column two in row one before automatic placement.",
            "The first `.free-square` fills column one in row one.",
            "The next available cell for `#finish-square` is column three.",
            "Two `80px` tracks and two `10px` gaps precede column three."
          ],
          "modelAnswer": "The browser places `.reserved-square` in its specified cell first. It then places `#start-square` in the first available cell. The reserved cell is occupied, so `#finish-square` goes into the third column. Two tracks and two gaps put its left edge 180 px from the viewport left edge."
        }
      },
      {
        "id": "hc-grid-practice-l2-s3-q04",
        "topicId": "hc-grid-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Spanning the report columns</title>\n<style>\nbody { margin: 0; }\n.report-sheet { display: grid; width: 420px; grid-template-columns: [edge] 80px [body-start] 140px [notes] 160px [body-end]; gap: 20px; }\n.report-band { grid-column: body-start / body-end; height: 32px; min-width: 0; }\n</style>\n</head>\n<body>\n<div class=\"report-sheet\"><div class=\"report-band\">Weekly totals</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.report-band').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of `.report-band` in px? Answer with a number.",
          "accepted": [
            "320",
            "320px",
            "320 px"
          ]
        },
        "partB": {
          "ask": "What is a benefit of named grid lines?",
          "options": [
            "They provide semantic landmarks that assistive tools expose as page regions.",
            "They provide shared design tokens for sizing unrelated layout components.",
            "They provide local selector scopes that limit styling to grid descendants.",
            "They provide readable placement references that remain useful as tracks change."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-flexbox-practice-l2-s3-q05",
        "topicId": "hc-flexbox-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Preview widths with a shared basis</title>\n<style>\nbody { margin: 0; }\n.preview-rail { display: flex; width: 360px; height: 40px; }\n.preview-short { width: 40px; flex: 1 0 80px; min-width: 0; height: 40px; }\n.preview-long { width: 200px; flex: 3 0 80px; min-width: 0; height: 40px; }\n</style>\n</head>\n<body>\n<div class=\"preview-rail\"><div class=\"preview-short\">Draft</div><div class=\"preview-long\">Final</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.preview-long').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.preview-long` in px? Answer with a number.",
          "accepted": [
            "230",
            "230px",
            "230 px"
          ]
        },
        "partB": {
          "ask": "What would setting `flex-grow: 0` on the children prevent?",
          "options": [
            "It would prevent distributing positive free space into their main sizes.",
            "It would prevent using their preferred sizes when calculating line breaks.",
            "It would prevent shrinking their main sizes when the line has insufficient space.",
            "It would prevent placing their rectangles in the document source sequence."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-layout-patterns-l2-s3-q06",
        "topicId": "hc-layout-patterns",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Centering a kiosk overlay</title>\n<style>\nbody { margin: 0; }\n.kiosk-screen { position: relative; width: 360px; height: 240px; margin-left: 40px; }\n.kiosk-prompt { position: absolute; left: 50%; top: 50%; width: 120px; height: 60px; transform: translate(-50%, -50%); }\n</style>\n</head>\n<body>\n<div class=\"kiosk-screen\"><div class=\"kiosk-prompt\">Choose a ticket</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.kiosk-prompt').getBoundingClientRect().left",
        "partA": {
          "ask": "How far is the left edge of `.kiosk-prompt` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "160",
            "160px",
            "160 px"
          ]
        },
        "partB": {
          "ask": "What would adding a border to `.kiosk-prompt` change without changing its sizing mode?",
          "options": [
            "It would reduce the content dimensions to preserve the existing outer dimensions.",
            "It would replace the reference rectangle used to resolve the positioning insets.",
            "It would increase the outer dimensions used to draw and center the whole prompt.",
            "It would transfer the added thickness into the surrounding parent padding area."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.kiosk-screen` begins 40 px from the viewport left edge and is `360px` wide.",
            "The `left: 50%` inset places the untransformed left edge 180 px inside the screen.",
            "The horizontal percentage in `translate(-50%, -50%)` uses the prompt width.",
            "Half the `120px` prompt width is subtracted from the initial horizontal position."
          ],
          "modelAnswer": "The `.kiosk-screen` starts 40 px from the viewport left edge. The `left: 50%` inset adds half its width, placing the initial left edge at 220 px. The horizontal translation subtracts half the width of `.kiosk-prompt`, which is 60 px. Its final left edge is therefore 160 px from the viewport left edge."
        }
      },
      {
        "id": "hc-mobile-first-media-l2-s3-q07",
        "topicId": "hc-mobile-first-media",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Overlapping display breakpoints</title>\n<style>\nbody { margin: 0; }\n.schedule-strip { width: 120px; height: 30px; }\n@media (min-width: 600px) { .schedule-strip { width: 200px; } }\n@media (min-height: 500px) { .schedule-strip { width: 260px; } }\n@media (min-width: 900px) { .schedule-strip { width: 320px; } }\n</style>\n</head>\n<body>\n<div class=\"schedule-strip\">Opening hours</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.schedule-strip')).width",
        "partA": {
          "ask": "At an 800 by 600 px viewport, what width does `.schedule-strip` use in px? Answer with a number.",
          "accepted": [
            "260",
            "260px",
            "260 px"
          ]
        },
        "partB": {
          "ask": "Why can a viewport height query be useful?",
          "options": [
            "It can distinguish touch input from pointer input on a compact screen.",
            "It can adapt a layout when the vertical viewing space becomes limited.",
            "It can estimate the rendered text height before the page content loads.",
            "It can select image resources according to the screen pixel density."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-custom-properties-l2-s3-q08",
        "topicId": "hc-custom-properties",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>An unsuitable custom size token</title>\n<style>\nbody { margin: 0; }\n.sample-window { width: 240px; height: 80px; }\n.sample-label { --label-size: red; width: 90px; width: var(--label-size, 120px); height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"sample-window\"><div class=\"sample-label\">Sample name</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.sample-label').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.sample-label` in px? Answer with a number.",
          "accepted": [
            "240",
            "240px",
            "240 px"
          ]
        },
        "partB": {
          "ask": "When can a custom property hold a colour name?",
          "options": [
            "It can hold a colour name after a colour property uses that name elsewhere.",
            "It can hold a colour name when its spelling matches a predefined theme token.",
            "It can hold a colour name after an ancestor supplies a matching text colour.",
            "It can hold a colour name without being declared as a typed colour property."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-document-structure-l2-s3-q09",
        "topicId": "hc-document-structure",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Rows in a repair log</title>\n<style>\nbody { margin: 0; }\n.repair-log { width: 240px; border-spacing: 0; }\n.repair-log td { width: 120px; height: 24px; padding: 0; }\n</style>\n</head>\n<body>\n<table class=\"repair-log\"><tr><td>Wheel</td><td>Ready</td></tr><tr><td>Brake</td><td>Testing</td></tr></table>\n</body>\n</html>",
        "check": "document.querySelectorAll('.repair-log > tbody > tr').length",
        "partA": {
          "ask": "After HTML parsing, how many rows match `.repair-log > tbody > tr`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "What is a DOM tree?",
          "options": [
            "It is a hierarchy of nodes representing a parsed document in memory.",
            "It is a sequence of rendering instructions describing painted screen pixels.",
            "It is a collection of computed declarations grouped by selector weight.",
            "It is a list of downloaded resources arranged by their request timing."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The source writes two `tr` elements inside `.repair-log` without a `tbody` tag.",
            "The HTML parser inserts a `tbody` element to group these table rows.",
            "The two `tr` elements become children of that implied `tbody`."
          ],
          "modelAnswer": "The browser parses the table markup rather than copying its nesting literally. When it encounters the first `tr`, it inserts an implied `tbody`. The next `tr` joins the same row group. The selector `.repair-log > tbody > tr` therefore matches two rows."
        }
      },
      {
        "id": "hc-links-images-media-l2-s3-q10",
        "topicId": "hc-links-images-media",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Sizing a catalogue placeholder</title>\n<style>\nbody { margin: 0; }\n.catalog-slot { width: 240px; height: 100px; }\n.catalog-photo { display: block; width: 180px; max-width: 50%; height: 60px; }\n</style>\n</head>\n<body>\n<div class=\"catalog-slot\"><img class=\"catalog-photo\" src=\"data:,\" alt=\"Catalogue cover\" width=\"300\" height=\"100\"></div>\n</body>\n</html>",
        "check": "document.querySelector('.catalog-photo').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.catalog-photo` in px? Answer with a number.",
          "accepted": [
            "120",
            "120px",
            "120 px"
          ]
        },
        "partB": {
          "ask": "Why supply image dimension attributes when CSS can also set dimensions?",
          "options": [
            "They choose an alternative resource URL when the viewport becomes wider.",
            "They describe the intended image dimensions and can help reserve layout space.",
            "They replace the text alternative when the requested image cannot be decoded.",
            "They crop image content to match the proportions of its surrounding element."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-css-accessibility-l2-s3-q11",
        "topicId": "hc-css-accessibility",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Focusing a hidden receipt control</title>\n<style>\nbody { margin: 0; }\n.receipt-action { box-sizing: border-box; width: 140px; height: 32px; }\n.receipt-closed { display: none; }\n.receipt-hint { width: 200px; height: 24px; }\n</style>\n</head>\n<body>\n<button class=\"receipt-action\" id=\"receipt-open\" type=\"button\">Open receipt</button><button class=\"receipt-action receipt-closed\" id=\"receipt-save\" type=\"button\" tabindex=\"0\">Save receipt</button><div class=\"receipt-hint\">Receipt actions</div>\n</body>\n</html>",
        "check": "(() => { document.querySelector('#receipt-open').focus(); document.querySelector('#receipt-save').focus(); return document.activeElement.id; })()",
        "partA": {
          "ask": "Code focuses `#receipt-open`, then tries to focus `#receipt-save`. Which element has focus afterward? Answer with its `id`.",
          "accepted": [
            "receipt-open"
          ]
        },
        "partB": {
          "ask": "Why should a focus indicator remain easy to see?",
          "options": [
            "It helps readers infer the document language from the control appearance.",
            "It helps pointer users enlarge the target area surrounding a small control.",
            "It helps screen readers derive a control name from its painted outline.",
            "It helps keyboard users locate the control receiving their next command."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-container-queries-l2-s3-q12",
        "topicId": "hc-container-queries",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Nested compartments for a gauge</title>\n<style>\nbody { margin: 0; }\n.gauge-cabinet { container-type: inline-size; width: 400px; height: 100px; }\n.gauge-compartment { container-type: inline-size; width: 160px; height: 80px; }\n.gauge-fill { width: 25cqw; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"gauge-cabinet\"><div class=\"gauge-compartment\"><div class=\"gauge-fill\">Level</div></div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.gauge-fill')).width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the width of `.gauge-fill` in px? Answer with a number.",
          "accepted": [
            "40",
            "40px",
            "40 px"
          ]
        },
        "partB": {
          "ask": "Why use a container name with a size query?",
          "options": [
            "It lets a query assign the queried ancestor a different semantic element role.",
            "It lets a query choose the browser viewport as the nearest named ancestor.",
            "It lets a query select an eligible ancestor using a chosen identifying name.",
            "It lets a query distribute unused track space across similarly named children."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-rendering-performance-l2-s3-q13",
        "topicId": "hc-rendering-performance",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Moving a stamp without reflow</title>\n<style>\nbody { margin: 0; }\n.approval-stamp { width: 100px; height: 40px; transform: translateY(30px); }\n.approval-note { width: 180px; height: 20px; }\n</style>\n</head>\n<body>\n<div class=\"approval-stamp\">Approved</div><div class=\"approval-note\">Recorded</div>\n</body>\n</html>",
        "check": "document.querySelector('.approval-note').getBoundingClientRect().top - document.querySelector('.approval-stamp').getBoundingClientRect().bottom",
        "partA": {
          "ask": "Subtract the rendered bottom edge of `.approval-stamp` from the top edge of `.approval-note`. What is the signed difference in px? Answer with a number.",
          "accepted": [
            "-30",
            "-30px",
            "-30 px"
          ]
        },
        "partB": {
          "ask": "What does layout calculate during browser rendering?",
          "options": [
            "It calculates element geometry from styles and available space.",
            "It calculates selector weights from the count of painted pixels.",
            "It calculates image encodings from the colours used by elements.",
            "It calculates network priorities from the order of visible text."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-practice-l2-s3-q14",
        "topicId": "hc-flexbox-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Comparing flexible reading panes</title>\n<style>\nbody { margin: 0; }\n.reader-split { display: flex; width: 400px; height: 40px; }\n.reader-index { width: 100px; height: 40px; min-width: 0; flex: 1; }\n.reader-page { width: 100px; height: 40px; min-width: 0; flex: auto; }\n</style>\n</head>\n<body>\n<div class=\"reader-split\"><div class=\"reader-index\">Index</div><div class=\"reader-page\">Page</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.reader-page').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the rendered width of `.reader-page` in px? Answer with a number.",
          "accepted": [
            "250",
            "250px",
            "250 px"
          ]
        },
        "partB": {
          "ask": "What would adding `gap: 20px` to `.reader-split` change?",
          "options": [
            "It would increase the preferred starting width assigned to the leading pane.",
            "It would reserve space between panes before flexible space is distributed.",
            "It would add equal inner padding to the content rectangles of the panes.",
            "It would reduce the shrink factor used when the panes need less space."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-grid-basics-l2-s3-q15",
        "topicId": "hc-grid-basics",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Vertical alignment of a parcel label</title>\n<style>\nbody { margin: 0; }\n.parcel-grid { display: grid; width: 200px; height: 160px; grid-template-columns: 200px; grid-template-rows: 60px 80px; row-gap: 20px; align-items: end; }\n.parcel-cell { width: 100px; height: 20px; }\n.parcel-code { grid-row: 2; align-self: center; }\n</style>\n</head>\n<body>\n<div class=\"parcel-grid\"><div class=\"parcel-cell\">Address</div><div class=\"parcel-cell parcel-code\">Code</div></div>\n</body>\n</html>",
        "check": "document.querySelector('.parcel-code').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `.parcel-code` from the viewport top in px? Answer with a number.",
          "accepted": [
            "110",
            "110px",
            "110 px"
          ]
        },
        "partB": {
          "ask": "What does `align-content` control in a grid with spare block space?",
          "options": [
            "It controls the block size assigned to the content inside a grid child.",
            "It controls the source order used when placing children into grid cells.",
            "It controls the stacking levels used when overlapping grid children paint.",
            "It controls the distribution of the grid tracks within the available block space."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-z-index-stacking-l2-s3-q16",
        "topicId": "hc-z-index-stacking",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>A backing layer inside an isolated tag</title>\n<style>\nbody { margin: 0; }\n.tag-shell { isolation: isolate; position: relative; width: 140px; height: 100px; background: blue; }\n.tag-backing { position: absolute; left: 10px; top: 10px; width: 80px; height: 60px; z-index: -1; background: red; }\n</style>\n</head>\n<body>\n<div class=\"tag-shell\" id=\"shell\"><div class=\"tag-backing\" id=\"backing\"></div></div>\n</body>\n</html>",
        "check": "document.elementFromPoint(30, 30).id",
        "partA": {
          "ask": "Which element receives hit testing at 30 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "backing"
          ]
        },
        "partB": {
          "ask": "What is the purpose of `isolation: isolate`?",
          "options": [
            "It removes descendant rectangles from the document normal flow.",
            "It clips overflowing descendant content to the element border edge.",
            "It establishes a stacking context for the element and its descendants.",
            "It prevents inherited text properties from reaching descendant content."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the browser arrives at this result.",
          "keyPoints": [
            "The `.tag-shell` establishes a stacking context through `isolation: isolate`.",
            "Its own background paints before its negative stacking level descendants.",
            "The `.tag-backing` stays above that background despite `z-index: -1`.",
            "The tested point is inside `.tag-backing` and no foreground child covers it."
          ],
          "modelAnswer": "The `.tag-shell` creates an isolated stacking context. Its `blue` background is painted before descendants at negative stacking levels. The `red` `.tag-backing` therefore paints above that background even with `z-index: -1`. The tested point lies inside it, so hit testing returns `backing`."
        }
      },
      {
        "id": "hc-custom-properties-l2-s3-q17",
        "topicId": "hc-custom-properties",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\" class=\"compact-notices\">\n<head>\n<meta charset=\"utf-8\">\n<title>Compact theme on a notice board</title>\n<style>\nbody { margin: 0; }\n:root { --notice-step: 20px; }\n:root.compact-notices { --notice-step: 12px; }\n.notice-board { width: 240px; height: 80px; }\n.notice-chip { width: calc(var(--notice-step) * 5 + 10px); height: 24px; }\n</style>\n</head>\n<body>\n<div class=\"notice-board\"><div class=\"notice-chip\">Updated</div></div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.notice-chip')).width",
        "partA": {
          "ask": "With `compact-notices` on the root element, what is the width of `.notice-chip` in px? Answer with a number.",
          "accepted": [
            "70",
            "70px",
            "70 px"
          ]
        },
        "partB": {
          "ask": "What does the `:root` selector match in this HTML document?",
          "options": [
            "It matches the element representing the HTML document root.",
            "It matches the element containing the visible document body content.",
            "It matches the nearest ancestor surrounding the element being styled.",
            "It matches the earliest child element inside the document body."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-layout-patterns-l2-s3-q18",
        "topicId": "hc-layout-patterns",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Equal panels with bottom actions</title>\n<style>\nbody { margin: 0; }\n.course-panels { display: flex; align-items: stretch; gap: 20px; width: 320px; }\n.course-panel { display: flex; flex-direction: column; width: 150px; }\n.course-summary { width: 150px; height: 40px; }\n.course-summary.long-summary { height: 100px; }\n.course-action { width: 150px; height: 30px; margin-top: auto; }\n</style>\n</head>\n<body>\n<div class=\"course-panels\"><div class=\"course-panel\"><div class=\"course-summary\">Short lesson</div><div class=\"course-action\" id=\"short-action\">Start</div></div><div class=\"course-panel\"><div class=\"course-summary long-summary\">Long lesson</div><div class=\"course-action\">Start</div></div></div>\n</body>\n</html>",
        "check": "document.querySelector('#short-action').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#short-action` from the viewport top in px? Answer with a number.",
          "accepted": [
            "100",
            "100px",
            "100 px"
          ]
        },
        "partB": {
          "ask": "Why use a column layout inside a panel?",
          "options": [
            "It makes the panel span the available tracks of a surrounding grid.",
            "It lets the panel arrange direct children along a vertical main axis.",
            "It makes the panel reserve horizontal spacing around its outer border.",
            "It lets the panel anchor its children to the browser viewport corners."
          ],
          "correct": 1
        }
      }
    ],
};
