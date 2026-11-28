// HTML+CSS, level 3 (hard, production level): 3 sets of 15 questions: find the bug, predict the result, review a flaw and design choice.
// Written with Codex, then checked: every `check` was run twice in a real browser (Edge, 800 x 600) with the same result and equals one of
// the accepted answers; the answer options were checked so that neither their length nor their wording gives a clue.
// A correction is made here, in the data.

import type { QuestionBank } from "./types";

export const HTML_CSS_LEVEL_3: QuestionBank = {
  skillId: "css",
  level: 3,
  questions: [
      {
        "id": "hc-cascade-specificity-l3-s1-q01",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Compact export controls</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n#export-tools .export-action { padding: 12px 24px; }\n.export-action { display: block; box-sizing: content-box; width: 100px; height: 24px; border: 2px solid black; }\n.export-action.export-action--compact { padding-inline: 8px; }\n.export-toolbar { width: 320px; height: 80px; background: silver; }\n</style>\n</head>\n<body>\n<div class=\"export-toolbar\" id=\"export-tools\">\n<button class=\"export-action export-action--compact\" type=\"button\">Export</button>\n</div>\n</body>\n</html>",
        "check": "document.querySelector('.export-action').getBoundingClientRect().width",
        "partA": {
          "ask": "The compact export control is too wide. What is the outer width of `.export-action` in px? Answer with a number.",
          "accepted": [
            "152",
            "152px",
            "152 px"
          ]
        },
        "partB": {
          "ask": "Which edit makes the compact spacing apply while preserving the default spacing for other controls?",
          "options": [
            "Move the compact rule above the default rule to give its declarations earlier priority.",
            "Add another compact class to the control so its existing selector gains extra weight.",
            "Use `#export-tools .export-action--compact` later so the two CSS selectors have equal weight.",
            "Replace the compact longhand with a shorthand so its declarations gain greater selector weight."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the cascade produces the width and how the proposed selector fixes the bug.",
          "keyPoints": [
            "The default selector includes `#export-tools`; the compact selector has two classes.",
            "The default `padding` wins over the compact `padding-inline` for the horizontal sides.",
            "The outer width adds the content width, horizontal padding and borders.",
            "The proposed selector ties the default specificity, so its later declaration wins."
          ],
          "modelAnswer": "The default selector has an ID, so its `padding` wins over the two classes in the compact selector. The content width is `100px`, the horizontal padding totals `48px`, and the borders total `4px`. This produces an outer width of `152px`. Using `#export-tools .export-action--compact` ties the default selector weight, so the later compact rule can replace the horizontal padding."
        }
      },
      {
        "id": "hc-box-model-l3-s1-q02",
        "topicId": "hc-box-model",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Billing panel overflow</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.billing-shell { box-sizing: border-box; width: 360px; height: 120px; padding: 20px; border: 4px solid black; }\n.billing-summary { box-sizing: content-box; width: 100%; height: 40px; padding: 12px 16px; border: 3px solid blue; }\n</style>\n</head>\n<body>\n<section class=\"billing-shell\" aria-label=\"Billing\">\n<div class=\"billing-summary\">Next payment</div>\n</section>\n</body>\n</html>",
        "check": "(() => { const shell = document.querySelector('.billing-shell'); const child = document.querySelector('.billing-summary'); return child.getBoundingClientRect().right - (shell.getBoundingClientRect().right - 24); })()",
        "partA": {
          "ask": "How far does `.billing-summary` extend past the right content edge of `.billing-shell` in px? Answer with a number.",
          "accepted": [
            "38",
            "38px",
            "38 px"
          ]
        },
        "partB": {
          "ask": "Which change keeps the summary inside the available content width while retaining its padding and border?",
          "options": [
            "Set `box-sizing: border-box` on `.billing-summary` so its declared width includes its padding and border.",
            "Set `overflow: hidden` on `.billing-shell` so clipping reduces the outer width of its summary child.",
            "Set `width: 100%` on `.billing-shell` so the summary resolves its percentage against the viewport instead.",
            "Set `margin-inline: auto` on `.billing-summary` so the browser absorbs its extra width into negative margins."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-flexbox-practice-l3-s1-q03",
        "topicId": "hc-flexbox-practice",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Upload queue actions</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.upload-row { display: flex; width: 320px; height: 48px; gap: 16px; background: silver; }\n.upload-preview { flex: 1 1 0; height: 48px; }\n.upload-wave { width: 340px; height: 32px; background: blue; }\n.upload-cancel { box-sizing: border-box; flex: 0 0 80px; height: 48px; }\n</style>\n</head>\n<body>\n<div class=\"upload-row\">\n<div class=\"upload-preview\"><div class=\"upload-wave\" aria-label=\"Audio preview\"></div></div>\n<button class=\"upload-cancel\" type=\"button\">Cancel</button>\n</div>\n</body>\n</html>",
        "check": "document.querySelector('.upload-cancel').getBoundingClientRect().right - document.querySelector('.upload-row').getBoundingClientRect().right",
        "partA": {
          "ask": "By how many px does the right edge of `.upload-cancel` exceed the right edge of `.upload-row`? Answer with a number.",
          "accepted": [
            "116",
            "116px",
            "116 px"
          ]
        },
        "partB": {
          "ask": "Which change fits the row and clips the oversized preview inside its flexible region?",
          "options": [
            "Set `flex-grow: 0` on `.upload-preview` to stop the preview from taking additional positive free space.",
            "Set `flex-shrink: 1` on `.upload-cancel` to preserve the preview by reducing the action control width.",
            "Set `flex-basis: auto` on `.upload-preview` to use its content width as the preferred starting size.",
            "Set `min-width: 0` and `overflow: clip` on `.upload-preview` to permit shrinkage and contain the oversized graphic."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-positioning-l3-s1-q04",
        "topicId": "hc-positioning",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Inventory card marker</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.inventory-stage { transform: translateX(0); width: 600px; height: 220px; margin-left: 40px; }\n.inventory-card { width: 240px; height: 120px; margin-left: 100px; background: silver; }\n.inventory-marker { position: absolute; right: 12px; top: 12px; width: 32px; height: 24px; background: blue; }\n</style>\n</head>\n<body>\n<div class=\"inventory-stage\">\n<article class=\"inventory-card\" aria-label=\"Inventory\"><span class=\"inventory-marker\">New</span></article>\n</div>\n</body>\n</html>",
        "check": "document.querySelector('.inventory-marker').getBoundingClientRect().right - document.querySelector('.inventory-card').getBoundingClientRect().right",
        "partA": {
          "ask": "The marker belongs inside the card. How far is the right edge of `.inventory-marker` beyond the right edge of `.inventory-card` in px? Answer with a number.",
          "accepted": [
            "248",
            "248px",
            "248 px"
          ]
        },
        "partB": {
          "ask": "Which edit anchors the marker to the card while keeping the card in normal flow?",
          "options": [
            "Give `.inventory-marker` `position: fixed` so its offsets follow the card during page layout.",
            "Give `.inventory-card` `position: relative` so its rectangle supplies the marker positioning reference.",
            "Give `.inventory-card` `display: inline-block` so its rectangle becomes the marker positioning reference.",
            "Give `.inventory-stage` `overflow: hidden` so its clipping boundary relocates the marker inside the card."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-z-index-stacking-l3-s1-q05",
        "topicId": "hc-z-index-stacking",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Dashboard flyout behind a notice</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.status-board { position: relative; width: 300px; height: 180px; }\n.status-flyout { width: 160px; height: 100px; z-index: 999; background: red; }\n.status-notice { position: absolute; left: 40px; top: 20px; width: 160px; height: 80px; z-index: 1; background: blue; }\n</style>\n</head>\n<body>\n<main class=\"status-board\">\n<div class=\"status-flyout\" id=\"status-menu\">Filters</div>\n<div class=\"status-notice\" id=\"status-alert\">Sync paused</div>\n</main>\n</body>\n</html>",
        "check": "document.elementFromPoint(60, 40).id",
        "partA": {
          "ask": "Which element receives a pointer hit 60 px from the viewport left and 40 px from its top? Answer with its `id`.",
          "accepted": [
            "status-alert"
          ]
        },
        "partB": {
          "ask": "Which edit makes the flyout cover the notice at their overlap without changing their layout positions?",
          "options": [
            "Set `position: relative` on `.status-flyout` to enable its stacking level in this layout.",
            "Increase `.status-flyout` to `z-index: 9999` so its current stacking level exceeds the notice.",
            "Set `isolation: isolate` on `.status-board` so the flyout stacking level beats the positioned notice.",
            "Set `overflow: visible` on `.status-board` so its flyout paints above the positioned notice rectangle."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-cascade-specificity-l3-s1-q06",
        "topicId": "hc-cascade-specificity",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Audit severity swatch</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.audit-line { width: 300px; height: 60px; color: purple; }\n.audit-swatch { width: 160px; height: 32px; color: black; }\n:is(#unused-severity, .audit-swatch).ready { color: blue !important; }\n#audit-severity { color: red !important; }\n:where(#audit-severity).ready { color: orange !important; }\n</style>\n</head>\n<body>\n<div class=\"audit-line\">\n<div class=\"audit-swatch ready\" id=\"audit-severity\" style=\"color: green\">Review pending</div>\n</div>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('#audit-severity')).color",
        "partA": {
          "ask": "What is the final text colour of `#audit-severity`? Answer with a colour word.",
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
          "ask": "When does the inherited text colour from a surrounding panel supply a child text colour?",
          "options": [
            "It supplies that colour when the surrounding selector has more weight than the child selector.",
            "It supplies that colour when the surrounding declaration is written later than the child declaration.",
            "It supplies that colour when the child has no winning declaration that supplies another colour.",
            "It supplies that colour when the surrounding element establishes a new local stacking context."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "Explain, step by step, how the inline declaration and the three important selectors compete.",
          "keyPoints": [
            "The normal inline `color` loses to matching author declarations marked `!important`.",
            "`:is()` takes the highest argument specificity, including the unmatched ID argument.",
            "The class outside `:is()` raises its selector above the competing ID selector.",
            "`:where()` contributes zero specificity despite its ID argument."
          ],
          "modelAnswer": "The normal inline `color: green` loses to the matching declarations marked `!important`. The `:is()` selector takes ID weight from `#unused-severity` even though that argument does not match. Its additional `.ready` class puts it above `#audit-severity`. The ID inside `:where()` adds no weight, so the later rule does not win. The resulting text colour is `blue`."
        }
      },
      {
        "id": "hc-grid-practice-l3-s1-q07",
        "topicId": "hc-grid-practice",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Comparing sparse product grids</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.product-fill, .product-fit { display: grid; width: 520px; height: 60px; gap: 20px; }\n.product-fill { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }\n.product-fit { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }\n.product-fill > article, .product-fit > article { min-width: 0; height: 60px; background: silver; }\n</style>\n</head>\n<body>\n<section class=\"product-fill\" aria-label=\"Reserved slots\"><article>Basic</article><article>Plus</article></section>\n<section class=\"product-fit\" aria-label=\"Expanded cards\"><article>Basic</article><article>Plus</article></section>\n</body>\n</html>",
        "check": "document.querySelector('.product-fit > article').getBoundingClientRect().width - document.querySelector('.product-fill > article').getBoundingClientRect().width",
        "partA": {
          "ask": "Subtract the first card width in `.product-fill` from the first card width in `.product-fit`. What is the difference in px? Answer with a number.",
          "accepted": [
            "90",
            "90px",
            "90 px"
          ]
        },
        "partB": {
          "ask": "Why might a product catalogue keep automatic placement instead of assigning explicit cells to product cards?",
          "options": [
            "Automatic placement assigns semantic reading priorities according to the products displayed visual sizes.",
            "Automatic placement adapts card positions to the available tracks as the product list changes.",
            "Automatic placement selects responsive image resources according to the products available track sizes.",
            "Automatic placement equalizes product description lengths before allocating the available grid track space."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-units-l3-s1-q08",
        "topicId": "hc-units",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Nested report scale</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\nhtml { font-size: 18px; }\n.report-scale { width: 480px; height: 140px; font-size: 2rem; }\n.report-module { width: 50%; height: 100px; font-size: 75%; }\n.report-meter { box-sizing: content-box; font-size: .5em; width: calc(50% + 2em + 1rem); height: 24px; padding-inline: 1em; background: blue; }\n</style>\n</head>\n<body>\n<section class=\"report-scale\" aria-label=\"Report scale\">\n<div class=\"report-module\"><div class=\"report-meter\"></div></div>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.report-meter').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the outer width of `.report-meter`, including its horizontal padding, in px? Answer with a number.",
          "accepted": [
            "192",
            "192px",
            "192 px"
          ]
        },
        "partB": {
          "ask": "Why can root based spacing help keep unrelated dashboard modules visually consistent?",
          "options": [
            "It scales with the nearest module width, so nested panels share proportional internal spacing.",
            "It inherits the nearest module spacing declaration, so nested panels share the same padding.",
            "It follows the browser viewport width, so nested modules share the same responsive breakpoint.",
            "It uses a consistent root font reference, so component typography changes need not compound spacing."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-mobile-first-media-l3-s1-q09",
        "topicId": "hc-mobile-first-media",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Exact breakpoint overlap</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.device-settings { width: 500px; height: 100px; }\n.device-preview { width: 140px; height: 40px; background: silver; }\n@media (min-width: 600px) { .device-preview { width: 260px; } }\n@media (min-width: 800px) { .device-preview { width: 360px; } }\n@media (max-width: 800px) { .device-preview { width: calc(50% - 20px); } }\n</style>\n</head>\n<body>\n<section class=\"device-settings\" aria-label=\"Device settings\">\n<div class=\"device-preview\">Preview</div>\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.device-preview')).width",
        "partA": {
          "ask": "At a viewport width of 800 px, what is the computed width of `.device-preview` in px? Answer with a number.",
          "accepted": [
            "230",
            "230px",
            "230 px"
          ]
        },
        "partB": {
          "ask": "Why is testing just below, at, and just above a layout breakpoint useful?",
          "options": [
            "It can expose layout discontinuities near boundaries that broad device presets miss during review.",
            "It can establish browser zoom levels from the number of style declarations active during review.",
            "It can determine the device pixel density from the number of matching layout rules during review.",
            "It can make the browser select breakpoints according to available content rather than viewport width."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-custom-properties-l3-s1-q10",
        "topicId": "hc-custom-properties",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Theme token scoped too low</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.theme-workspace { width: 400px; height: 120px; color: navy; }\n.theme-panel { width: 300px; height: 80px; color: green; color: var(--panel-ink); }\n.theme-caption { --panel-ink: red; width: 180px; height: 24px; }\n</style>\n</head>\n<body>\n<main class=\"theme-workspace\">\n<section class=\"theme-panel\" aria-label=\"Theme preview\"><div class=\"theme-caption\">Draft theme</div></section>\n</main>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.theme-panel')).color",
        "partA": {
          "ask": "What text colour does `.theme-panel` compute when the token is defined on `.theme-caption`? Answer with a colour word.",
          "accepted": [
            "navy",
            "rgb(0, 0, 128)",
            "#000080"
          ]
        },
        "partB": {
          "ask": "Which change lets the panel and its caption share the supplied theme token?",
          "options": [
            "Keep the token on `.theme-caption` and move its rule earlier so the parent reads it first.",
            "Keep the token on `.theme-caption` and add `!important` so the parent inherits its stronger value.",
            "Move the token to `.theme-panel` so the consuming element and its descendants can also read it.",
            "Replace the caption token with `color: red` so the parent receives its child computed text colour."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-layout-patterns-l3-s1-q11",
        "topicId": "hc-layout-patterns",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Oversized centred review strip</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.review-window { display: flex; justify-content: center; width: 360px; height: 80px; margin-left: 100px; overflow: hidden; }\n.review-strip { flex: 0 0 520px; height: 60px; background: silver; }\n.review-first { width: 80px; height: 60px; background: blue; }\n</style>\n</head>\n<body>\n<section class=\"review-window\" aria-label=\"Review steps\">\n<div class=\"review-strip\"><div class=\"review-first\">Start</div></div>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.review-strip').getBoundingClientRect().left",
        "partA": {
          "ask": "The start of the review strip is clipped. How far is the left edge of `.review-strip` from the viewport left edge in px? Answer with a number.",
          "accepted": [
            "20",
            "20px",
            "20 px"
          ]
        },
        "partB": {
          "ask": "Which change preserves centring when the strip fits, while keeping its start reachable when it overflows?",
          "options": [
            "Use `align-items: center` instead, letting cross axis alignment preserve the strip horizontal starting edge.",
            "Use `justify-content: safe center`, letting excess overflow fall back to alignment at the main starting edge.",
            "Use `overflow: auto` instead, letting the existing centring expose the clipped starting region through scrolling.",
            "Use `flex-direction: row-reverse` instead, letting reversed placement keep the original first step inside view."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-forms-l3-s1-q12",
        "topicId": "hc-forms",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reference search validation</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.reference-form { width: 360px; height: 100px; }\n.reference-form label { display: block; width: 320px; height: 24px; }\n#reference-query { box-sizing: border-box; width: 280px; height: 32px; }\n</style>\n</head>\n<body>\n<form class=\"reference-form\">\n<label for=\"reference-query\">Text containing a reference code</label>\n<input id=\"reference-query\" name=\"query\" required pattern=\"[A-Z]{2}[0-9]{3}\" value=\"ref-AB123-draft\">\n</form>\n</body>\n</html>",
        "check": "document.querySelector('#reference-query').checkValidity()",
        "partA": {
          "ask": "The search field should accept surrounding text containing a reference code. Is `#reference-query` valid as written? Answer yes or no.",
          "accepted": [
            "false",
            "no"
          ]
        },
        "partB": {
          "ask": "Which edit accepts this surrounding text while still requiring an embedded reference code?",
          "options": [
            "Remove `required` from the field so its supplied search text can pass the reference check.",
            "Add `^` before the pattern so the reference check begins searching inside the supplied text.",
            "Set `type=\"search\"` on the field so the reference check uses a substring matching method.",
            "Use `pattern=\".*[A-Z]{2}[0-9]{3}.*\"` so the pattern also permits extra text around the reference code."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-layout-patterns-l3-s1-q13",
        "topicId": "hc-layout-patterns",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Workspace navigation and editor</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.editor-workspace { display: grid; width: 600px; height: 200px; grid-template-columns: 180px minmax(0, 1fr); gap: 24px; }\n.editor-navigation { width: 180px; height: 200px; background: silver; }\n.editor-document { height: 200px; overflow: hidden; background: lightblue; }\n.editor-canvas { width: 700px; height: 100px; }\n</style>\n</head>\n<body>\n<div class=\"editor-workspace\">\n<nav class=\"editor-navigation\" aria-label=\"Workspace\">Files</nav>\n<main class=\"editor-document\"><div class=\"editor-canvas\">Document preview</div></main>\n</div>\n</body>\n</html>",
        "check": "document.querySelector('.editor-document').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of `.editor-document` despite the wider `.editor-canvas` descendant, in px? Answer with a number.",
          "accepted": [
            "396",
            "396px",
            "396 px"
          ]
        },
        "partB": {
          "ask": "The workspace will add headers aligned across navigation and content. Which layout approach best suits that requirement?",
          "options": [
            "Keep a shared grid so named areas and tracks can coordinate the horizontal and vertical layout.",
            "Use separate flex rows so matching child positions establish shared column tracks across the workspace.",
            "Use floating panels so their surrounding text flow creates aligned rows across the workspace regions.",
            "Use absolute offsets so content height changes provide matching row sizes across the workspace regions."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "When would a flex layout be a better choice for a sidebar and content pair? Explain how you would handle wide content.",
          "keyPoints": [
            "Flex suits a single row whose children do not need shared row tracks.",
            "The sidebar can use a fixed `flex-basis` and disable shrinking.",
            "The main region can grow with `flex` and use `min-width: 0`.",
            "Wide descendants still need a deliberate clipping, scrolling or wrapping policy."
          ],
          "modelAnswer": "Flex is a good choice when the sidebar and content form a single row without shared row alignment. The sidebar can use `flex: 0 0 180px` to keep its intended width. The content can use `flex: 1` with `min-width: 0` to take the remaining space. Wide content then needs an explicit scrolling, clipping or wrapping policy."
        }
      },
      {
        "id": "hc-css-architecture-l3-s1-q14",
        "topicId": "hc-css-architecture",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Compact moderation card</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.moderation-card { --moderation-space: 24px; box-sizing: border-box; width: 320px; height: 120px; padding: var(--moderation-space); border: 2px solid black; }\n.moderation-card--compact { --moderation-space: 8px; }\n.moderation-pad-inline { padding-inline: 12px; }\n.moderation-body { height: 40px; background: silver; }\n</style>\n</head>\n<body>\n<article class=\"moderation-card moderation-card--compact moderation-pad-inline\" aria-label=\"Moderation\">\n<div class=\"moderation-body\">Pending review</div>\n</article>\n</body>\n</html>",
        "check": "document.querySelector('.moderation-body').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the width of `.moderation-body` after the compact modifier and spacing utility apply, in px? Answer with a number.",
          "accepted": [
            "292",
            "292px",
            "292 px"
          ]
        },
        "partB": {
          "ask": "Compact spacing should be a reusable component variant. Which ownership choice keeps that intent clear?",
          "options": [
            "Add deeper page selectors for compact spacing, keeping the component dependent on its surrounding markup structure.",
            "Add `!important` to the component padding, keeping consumer adjustments dependent on stronger declarations for later changes.",
            "Keep compact spacing in the modifier and remove the local spacing utility so the component owns the complete variant.",
            "Move compact spacing into page utilities, keeping the component variant dependent on callers assembling the matching classes."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "When would a spacing utility be a better choice than adding another component modifier? Explain how you would avoid conflicting ownership.",
          "keyPoints": [
            "A utility suits a small shared adjustment across unrelated components.",
            "A modifier suits a named component state with a coherent visual contract.",
            "The same spacing axis should have a clear owner.",
            "A documented token or override policy can make deliberate composition predictable."
          ],
          "modelAnswer": "A spacing utility works well for a small shared adjustment across unrelated components. A modifier is more useful when compact appearance is part of the component contract. Here, `.moderation-pad-inline` replaces the horizontal padding produced by the modifier token. Choose a clear owner for that axis and document deliberate overrides so callers can predict the result."
        }
      },
      {
        "id": "hc-display-l3-s1-q15",
        "topicId": "hc-display",
        "set": 1,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Closed settings panel strategies</title>\n<style>\nbody { margin: 0; font-size: 16px; line-height: 20px; }\n.panel-toggle { box-sizing: border-box; display: block; width: 200px; height: 32px; }\n.panel-option { width: 240px; height: 48px; }\n.panel-option button { box-sizing: border-box; width: 160px; height: 32px; }\n.panel-removed { display: none; }\n.panel-reserved { visibility: hidden; }\n.panel-transparent { opacity: 0; pointer-events: none; }\n.panel-offscreen { position: absolute; left: -10000px; top: 0; }\n</style>\n</head>\n<body>\n<button class=\"panel-toggle\" id=\"settings-toggle\" type=\"button\">Settings</button>\n<section class=\"panel-option panel-removed\"><button id=\"removed-save\" type=\"button\">Save</button></section>\n<section class=\"panel-option panel-reserved\"><button id=\"reserved-save\" type=\"button\">Save</button></section>\n<section class=\"panel-option panel-transparent\"><button id=\"transparent-save\" type=\"button\">Save</button></section>\n<section class=\"panel-option panel-offscreen\"><button id=\"offscreen-save\" type=\"button\">Save</button></section>\n</body>\n</html>",
        "check": "(() => { document.querySelector('#settings-toggle').focus(); return [...document.querySelectorAll('.panel-option button')].find(button => { button.focus({preventScroll: true}); return document.activeElement === button; }).id; })()",
        "partA": {
          "ask": "Focus starts on `#settings-toggle`. In document order, code tries the panel buttons until one receives focus. Which is the first successful button? Answer with its `id`.",
          "accepted": [
            "transparent-save"
          ]
        },
        "partB": {
          "ask": "A closed panel should leave no blank space and no hidden keyboard stops. Which approach meets that requirement?",
          "options": [
            "Use `visibility: hidden` on the panel, preserving its rectangle while removing its controls from keyboard navigation.",
            "Use `display: none` on the panel, removing its layout rectangle and taking its controls out of keyboard navigation.",
            "Use `opacity: 0` on the panel, preserving its rectangle while taking its controls out of keyboard navigation.",
            "Use off-screen absolute positioning on the panel, removing its flow space and taking its controls out of keyboard navigation."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "When is preserving panel space useful? Explain how geometry, pointer hit testing and keyboard access differ among the approaches shown.",
          "keyPoints": [
            "Use `visibility: hidden` when blank reserved space is intentional; its descendants here cannot receive focus.",
            "`display: none` removes layout boxes and focus access.",
            "`opacity: 0` preserves geometry; `pointer-events: none` changes hit testing without removing keyboard stops.",
            "Off-screen positioning removes normal flow participation but leaves these controls focusable."
          ],
          "modelAnswer": "Use `visibility: hidden` when preserving the panel space prevents unwanted layout movement. The `display: none` panel has no layout rectangle and its button cannot receive focus. The `opacity: 0` panel retains its rectangle, and `pointer-events: none` lets pointer hits pass through while its button remains a keyboard stop. The off-screen panel leaves normal flow but its button is still focusable, so that approach also needs a keyboard access policy."
        }
      },
      {
        "id": "hc-selectors-l3-s2-q01",
        "topicId": "hc-selectors",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Subscription navigation highlight</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.plan-nav { width: 360px; height: 120px; background: whitesmoke; }\n.plan-nav > * { display: block; width: 240px; height: 24px; }\n.plan-nav > a { border-left: 0 solid blue; }\n.plan-nav > a:nth-child(3) { border-left-width: 6px; }\n</style>\n</head>\n<body>\n<nav class=\"plan-nav\" aria-label=\"Subscription\">\n<strong>Manage plan</strong>\n<a href=\"#overview\" id=\"plan-overview\">Overview</a>\n<a href=\"#billing\" id=\"plan-billing\">Billing</a>\n<a href=\"#history\" id=\"plan-history\">History</a>\n<a href=\"#preferences\" id=\"plan-preferences\">Preferences</a>\n</nav>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('.plan-nav > a')].find(e => getComputedStyle(e).borderLeftWidth === '6px').id",
        "partA": {
          "ask": "The third link should carry the highlight. Which link actually has the thick left border? Answer with its `id`.",
          "accepted": [
            "plan-billing"
          ]
        },
        "partB": {
          "ask": "Which edit keeps the highlight on the third link when the heading remains?",
          "options": [
            "Use `.plan-nav > a:last-child` so the highlight follows the final navigation entry.",
            "Use `.plan-nav > a:nth-of-type(3)` so the highlight targets the intended navigation entry.",
            "Use `.plan-nav > a:nth-child(3n)` so the highlight repeats across eligible navigation entries.",
            "Use `.plan-nav a:nth-child(3)` so the highlight searches through nested navigation entries."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-display-l3-s2-q02",
        "topicId": "hc-display",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Inline download badge spacing</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.download-line { width: 400px; height: 140px; font-size: 0; line-height: 0; background: whitesmoke; }\n.download-mark { display: inline; width: 120px; height: 60px; margin: 30px 0; padding: 0 12px; border: 2px solid blue; }\n.download-next { display: inline-block; width: 40px; height: 20px; vertical-align: top; background: silver; }\n</style>\n</head>\n<body>\n<section class=\"download-line\" aria-label=\"Download status\">\n<span class=\"download-mark\" aria-label=\"Ready\"></span><span class=\"download-next\" aria-label=\"Next download\"></span>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.download-next').getBoundingClientRect().top",
        "partA": {
          "ask": "The empty `.download-mark` should reserve its declared size and vertical margins. How far is the top edge of `.download-next` from the viewport top in px? Answer with a number.",
          "accepted": [
            "0",
            "0px",
            "0 px"
          ]
        },
        "partB": {
          "ask": "Which edit makes the badge reserve its declared size and vertical margins in the line?",
          "options": [
            "Set `position: relative` on `.download-mark` to establish a positioning reference for the badge.",
            "Set `white-space: nowrap` on `.download-line` to keep the badge within its current line.",
            "Set `box-sizing: border-box` on `.download-mark` to include its border in the declared dimensions.",
            "Set `display: inline-block` on `.download-mark` to give the badge a sized inline rectangle."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-grid-basics-l3-s2-q03",
        "topicId": "hc-grid-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Oversized analytics track</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.metrics-layout { display: grid; grid-template-columns: 120px 1fr; gap: 20px; width: 440px; height: 120px; background: whitesmoke; }\n.metrics-menu { width: 120px; height: 120px; }\n.metrics-chart { height: 120px; background: lightblue; }\n.metrics-canvas { width: 520px; height: 80px; background: silver; }\n</style>\n</head>\n<body>\n<main class=\"metrics-layout\">\n<nav class=\"metrics-menu\" aria-label=\"Analytics\">Reports</nav>\n<section class=\"metrics-chart\" aria-label=\"Revenue\"><div class=\"metrics-canvas\">Revenue chart</div></section>\n</main>\n</body>\n</html>",
        "check": "document.querySelector('.metrics-chart').getBoundingClientRect().right - document.querySelector('.metrics-layout').getBoundingClientRect().right",
        "partA": {
          "ask": "By how many px does the right edge of `.metrics-chart` exceed the right edge of `.metrics-layout`? Answer with a number.",
          "accepted": [
            "220",
            "220px",
            "220 px"
          ]
        },
        "partB": {
          "ask": "Which edit keeps the flexible track within the layout and makes the wide chart scroll?",
          "options": [
            "Use `minmax(0, 1fr)` for the flexible track and `overflow: auto` on `.metrics-chart`.",
            "Use `max-content` for the flexible track and `overflow: visible` on `.metrics-chart`.",
            "Use `1fr` for the flexible track and `overflow: auto` on `.metrics-layout` instead.",
            "Use `minmax(520px, 1fr)` for the flexible track and `overflow: hidden` on `.metrics-chart`."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the wide descendant affects track sizing and how the proposed fix contains it.",
          "keyPoints": [
            "The fixed track and `gap` leave `300px` for the flexible track.",
            "The automatic minimum of `1fr` accommodates the `520px` descendant here.",
            "`minmax(0, 1fr)` removes the track minimum imposed by that content.",
            "`overflow: auto` gives `.metrics-chart` a way to expose the wider descendant."
          ],
          "modelAnswer": "The layout leaves `300px` after the fixed track and `gap`. The automatic minimum of the `1fr` track accommodates the `520px` canvas, so the chart extends beyond the layout. Using `minmax(0, 1fr)` lets the track fit the remaining space. Adding `overflow: auto` to `.metrics-chart` makes the excess canvas reachable by scrolling."
        }
      },
      {
        "id": "hc-custom-properties-l3-s2-q04",
        "topicId": "hc-custom-properties",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Sibling theme token</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.accent-settings { width: 400px; height: 160px; background: whitesmoke; }\n.accent-source { --accent-depth: 18px; width: 280px; height: 32px; }\n.accent-preview { box-sizing: content-box; width: 200px; height: 40px; padding-inline: var(--accent-depth, 6px); border: 2px solid blue; }\n</style>\n</head>\n<body>\n<section class=\"accent-settings\" aria-label=\"Accent settings\">\n<div class=\"accent-source\">Selected accent spacing</div>\n<div class=\"accent-preview\">Sample notification</div>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.accent-preview').getBoundingClientRect().width",
        "partA": {
          "ask": "The preview should use the selected accent spacing. What is the outer width of `.accent-preview`, including padding and borders, in px? Answer with a number.",
          "accepted": [
            "216",
            "216px",
            "216 px"
          ]
        },
        "partB": {
          "ask": "Which edit shares the selected token with the settings preview?",
          "options": [
            "Move `.accent-source` after `.accent-preview` so the token can resolve from a later sibling declaration.",
            "Add `!important` to `--accent-depth` on `.accent-source` so the token gains precedence across sibling boundaries.",
            "Define `--accent-depth` on `.accent-settings` so its preview and other descendants inherit the selected spacing token.",
            "Add `padding-inline: inherit` to `.accent-preview` so the token is copied from the adjacent settings entry."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-html-accessibility-l3-s2-q05",
        "topicId": "hc-html-accessibility",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Delivery labels sharing one target</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.delivery-form { width: 380px; height: 160px; background: whitesmoke; }\n.delivery-form label { display: block; width: 260px; height: 24px; }\n.delivery-form input { box-sizing: border-box; display: block; width: 260px; height: 32px; }\n</style>\n</head>\n<body>\n<form class=\"delivery-form\">\n<label for=\"delivery-email\">Receipt address</label>\n<input id=\"delivery-email\" class=\"delivery-primary\" type=\"email\" value=\"primary@example.test\">\n<label for=\"delivery-email\">Backup address</label>\n<input class=\"delivery-backup\" type=\"email\" value=\"backup@example.test\">\n</form>\n</body>\n</html>",
        "check": "document.querySelector('.delivery-primary').labels.length",
        "partA": {
          "ask": "The backup address is missing its own accessible label. How many associated labels does `.delivery-primary` have? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "Which edit gives the backup field its own explicit label association?",
          "options": [
            "Give `.delivery-backup` a `name` matching the backup label text so submission naming establishes the association.",
            "Give `.delivery-backup` a unique `id` and update the backup label’s `for` to match that identifier.",
            "Give the backup label a unique `id` and leave its existing `for` pointing at the primary field.",
            "Give `.delivery-backup` a `title` matching the backup label text so the existing label moves its association."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-z-index-stacking-l3-s2-q06",
        "topicId": "hc-z-index-stacking",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Transformed preview with nested tooltip</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.proof-stage { position: relative; width: 420px; height: 200px; }\n.proof-preview { transform: translateX(20px); width: 260px; height: 160px; background: silver; }\n.proof-tip { position: absolute; top: 20px; left: 20px; width: 180px; height: 60px; z-index: 900; background: yellow; }\n.proof-banner { position: absolute; top: 30px; left: 60px; width: 180px; height: 60px; z-index: 2; background: lightblue; }\n</style>\n</head>\n<body>\n<main class=\"proof-stage\">\n<section class=\"proof-preview\" aria-label=\"Print preview\"><div class=\"proof-tip\" id=\"proof-tip\">Page guidance</div></section>\n<aside class=\"proof-banner\" id=\"proof-banner\">Review needed</aside>\n</main>\n</body>\n</html>",
        "check": "document.elementFromPoint(80, 50).id",
        "partA": {
          "ask": "Which element receives the pointer hit at 80 px from the viewport left and 50 px from its top? Answer with its `id`.",
          "accepted": [
            "proof-banner"
          ]
        },
        "partB": {
          "ask": "A tooltip must cover unrelated page regions. Which placement strategy reduces coupling to local paint boundaries?",
          "options": [
            "Place the tooltip in a dedicated page overlay host and map its anchor position into that host.",
            "Place the tooltip within a clipped preview region and increase its local painting number for that region.",
            "Place the tooltip earlier in the preview markup and use a later stylesheet rule for its painted appearance.",
            "Place the tooltip within an extra transparent wrapper and increase its dimensions to cover the required region."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the browser chooses the hit target despite the tooltip’s large `z-index`.",
          "keyPoints": [
            "`transform: translateX(20px)` establishes a stacking context on `.proof-preview`.",
            "The test point falls within `.proof-tip` and `.proof-banner`.",
            "The child’s `z-index: 900` orders it inside the preview context.",
            "The sibling `.proof-banner` paints above that context with `z-index: 2`."
          ],
          "modelAnswer": "The `transform` on `.proof-preview` creates a stacking context. The test point lies within the tooltip and the banner. The tooltip’s `z-index: 900` operates inside the preview context. The sibling `.proof-banner` paints above that context with `z-index: 2`, so it receives the hit."
        }
      },
      {
        "id": "hc-flexbox-basics-l3-s2-q07",
        "topicId": "hc-flexbox-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Wrapped dispatch tiles</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.dispatch-board { display: flex; flex-wrap: wrap; align-content: space-around; align-items: center; gap: 20px; width: 260px; height: 220px; background: whitesmoke; }\n.dispatch-tile { flex: 0 0 120px; height: 40px; background: lightblue; }\n.dispatch-tall { height: 60px; }\n</style>\n</head>\n<body>\n<section class=\"dispatch-board\" aria-label=\"Dispatch queue\">\n<article class=\"dispatch-tile dispatch-tall\">Packing</article><article class=\"dispatch-tile\">Ready</article>\n<article class=\"dispatch-tile\" id=\"dispatch-next\">Collected</article><article class=\"dispatch-tile dispatch-tall\">In transit</article>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('#dispatch-next').getBoundingClientRect().top",
        "partA": {
          "ask": "How far is the top edge of `#dispatch-next` from the viewport top in px? Answer with a number.",
          "accepted": [
            "150",
            "150px",
            "150 px"
          ]
        },
        "partB": {
          "ask": "A shorter tile needs its own cross axis alignment without changing its neighbors. Which property suits that requirement?",
          "options": [
            "Use `align-content` on that tile to control its placement within the line’s cross axis space.",
            "Use `justify-content` on that tile to control its placement within the line’s cross axis space.",
            "Use `flex-basis` on that tile to control its placement within the line’s cross axis space.",
            "Use `align-self` on that tile to control its own placement within the line’s cross axis space."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-positioning-l3-s2-q08",
        "topicId": "hc-positioning",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Sticky activity group</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.activity-scroll { margin-top: 30px; width: 300px; height: 160px; overflow: auto; }\n.activity-group { width: 280px; height: 240px; background: whitesmoke; }\n.activity-heading { position: sticky; top: 10px; width: 280px; height: 40px; background: lightblue; }\n.activity-tail { width: 280px; height: 400px; }\n</style>\n</head>\n<body>\n<section class=\"activity-scroll\" aria-label=\"Recent activity\">\n<div class=\"activity-group\"><div class=\"activity-heading\">Earlier today</div></div>\n<div class=\"activity-tail\">Older activity</div>\n</section>\n</body>\n</html>",
        "check": "(() => { const pane = document.querySelector('.activity-scroll'); pane.scrollTop = 220; return document.querySelector('.activity-heading').getBoundingClientRect().top - pane.getBoundingClientRect().top; })()",
        "partA": {
          "ask": "After `.activity-scroll` is scrolled down by 220 px, what is the signed offset of `.activity-heading` from the scroll area’s top edge in px? Answer with a number.",
          "accepted": [
            "-20",
            "-20px",
            "-20 px"
          ]
        },
        "partB": {
          "ask": "A product needs a summary visible across the whole viewport during page scrolling. Which approach suits that requirement?",
          "options": [
            "Use `position: absolute` inside the activity group and set a viewport sized width for the summary.",
            "Use `position: relative` inside the activity group and set a top inset for the visible summary.",
            "Use `position: fixed` outside transformed ancestors and reserve flow space to avoid covering nearby content.",
            "Use `position: static` after the activity group and add a large stacking value for the summary."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-box-model-l3-s2-q09",
        "topicId": "hc-box-model",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Empty reconciliation spacer</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.reconcile-feed { display: flow-root; width: 360px; height: 220px; background: whitesmoke; }\n.reconcile-entry { width: 300px; height: 40px; margin-bottom: 18px; background: lightblue; }\n.reconcile-spacer { width: 300px; height: 0; margin-top: 32px; margin-bottom: 24px; }\n.reconcile-total { width: 300px; height: 40px; margin-top: 12px; background: silver; }\n</style>\n</head>\n<body>\n<section class=\"reconcile-feed\" aria-label=\"Reconciliation\">\n<div class=\"reconcile-entry\">Payment recorded</div>\n<div class=\"reconcile-spacer\"></div>\n<div class=\"reconcile-total\">Current balance</div>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.reconcile-total').getBoundingClientRect().top - document.querySelector('.reconcile-entry').getBoundingClientRect().bottom",
        "partA": {
          "ask": "What is the vertical gap between the border boxes of `.reconcile-entry` and `.reconcile-total` in px? Answer with a number.",
          "accepted": [
            "32",
            "32px",
            "32 px"
          ]
        },
        "partB": {
          "ask": "A future version should separate entries without adding empty markup. Which approach best expresses that intent?",
          "options": [
            "Use a column flex layout with `gap` and remove the spacer and entry margins.",
            "Use a column flex layout with `line-height` and remove the spacer and entry margins.",
            "Use a block layout with `text-indent` and remove the spacer and entry margins.",
            "Use a block layout with `letter-spacing` and remove the spacer and entry margins."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-cascade-specificity-l3-s2-q10",
        "topicId": "hc-cascade-specificity",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Layered warning border override</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n@layer safeguards, theme;\n.warning-panel { box-sizing: border-box; width: 340px; height: 100px; border: 2px solid blue; }\n@layer safeguards { .warning-panel { border-left-width: 10px !important; } }\n@layer theme { #warning-review { border-left-width: 4px !important; } }\n#warning-review { border-left-width: 6px !important; }\n</style>\n</head>\n<body>\n<section class=\"warning-panel\" id=\"warning-review\" aria-label=\"Import warnings\">\nReview rejected rows before confirming.\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.warning-panel')).borderLeftWidth",
        "partA": {
          "ask": "The theme override fails to replace the warning border. What is the computed `border-left-width` of `.warning-panel` in px? Answer with a number.",
          "accepted": [
            "10",
            "10px",
            "10 px"
          ]
        },
        "partB": {
          "ask": "A routine theme should override component defaults without escalation. Which stylesheet policy supports that goal?",
          "options": [
            "Keep theme rules unlayered and increase selector depth while retaining important component defaults in their existing layer.",
            "Put theme rules later in source order while retaining important component defaults and their existing layer order.",
            "Move theme rules into inline styles while retaining important component defaults and their existing declaration importance.",
            "Use normal declarations with component defaults in an earlier layer and routine theme overrides in a later named layer."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-fluid-sizing-l3-s2-q11",
        "topicId": "hc-fluid-sizing",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Overspecified recording preview ratio</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.recording-card { width: 500px; height: 280px; background: whitesmoke; }\n.recording-preview { width: clamp(240px, 40vw, 400px); height: 180px; aspect-ratio: 1 / 1; background: silver; }\n</style>\n</head>\n<body>\n<article class=\"recording-card\" aria-label=\"Recording\">\n<div class=\"recording-preview\">Preview area</div>\n</article>\n</body>\n</html>",
        "check": "document.querySelector('.recording-preview').getBoundingClientRect().height",
        "partA": {
          "ask": "The preview should stay square as its width changes. At an 800 px wide viewport, what is the actual height of `.recording-preview` in px? Answer with a number.",
          "accepted": [
            "180",
            "180px",
            "180 px"
          ]
        },
        "partB": {
          "ask": "Which change lets the preferred ratio determine the preview height?",
          "options": [
            "Replace `aspect-ratio` with `1 / 1 !important` while retaining the explicit height declaration.",
            "Replace `height: 180px` with `height: auto` while retaining the responsive width declaration.",
            "Replace `width` with `100%` while retaining the explicit height and preferred ratio declarations.",
            "Replace the width maximum with `180px` while retaining the explicit height and ratio declarations."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-css-accessibility-l3-s2-q12",
        "topicId": "hc-css-accessibility",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Focus reset without replacement</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.consent-panel { width: 380px; height: 120px; background: whitesmoke; }\n.consent-action { box-sizing: border-box; width: 160px; height: 40px; border: 2px solid blue; background: white; outline: 3px solid blue; }\n.consent-action:focus { outline: none; }\n</style>\n</head>\n<body>\n<section class=\"consent-panel\" aria-label=\"Consent options\">\n<button class=\"consent-action\" type=\"button\">Review consent</button>\n</section>\n</body>\n</html>",
        "check": "(() => { const action = document.querySelector('.consent-action'); action.focus(); return getComputedStyle(action).outlineStyle; })()",
        "partA": {
          "ask": "After `.consent-action` receives focus, what is its computed `outline-style`? Answer with a CSS keyword.",
          "accepted": [
            "none"
          ]
        },
        "partB": {
          "ask": "The focused state needs a clear visible change. Which revision addresses the missing indicator?",
          "options": [
            "Add a descriptive `title` to the button so keyboard focus has a visible marker during navigation.",
            "Add `cursor: pointer` to the button so keyboard focus has a visible marker during navigation.",
            "Replace the reset with a distinct outline on focus so keyboard navigation has a visible marker.",
            "Add `tabindex=\"0\"` to the button so keyboard focus has a visible marker during navigation."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-grid-basics-l3-s2-q13",
        "topicId": "hc-grid-basics",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Gallery rows with independent expansion</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.asset-gallery { display: flex; flex-wrap: wrap; gap: 20px; width: 520px; height: 180px; align-content: flex-start; }\n.asset-card { box-sizing: border-box; flex: 1 1 140px; min-width: 0; height: 70px; background: lightblue; }\n</style>\n</head>\n<body>\n<section class=\"asset-gallery\" aria-label=\"Saved templates\">\n<article class=\"asset-card\">Invoice</article><article class=\"asset-card\">Receipt</article><article class=\"asset-card\">Summary</article>\n<article class=\"asset-card\" id=\"asset-final\">Statement</article>\n</section>\n</body>\n</html>",
        "check": "(() => { const cards = [...document.querySelectorAll('.asset-card')]; return [cards.filter(e => e.getBoundingClientRect().top === cards[0].getBoundingClientRect().top).length, cards[0].getBoundingClientRect().width, cards[3].getBoundingClientRect().width].join(','); })()",
        "partA": {
          "ask": "How many cards occupy the first row, what is the first card’s width, and what is the last card’s width in px? Answer as count,width,width without spaces.",
          "accepted": [
            "3,160,520"
          ]
        },
        "partB": {
          "ask": "The gallery now needs column edges aligned between rows, including an incomplete final row. Which choice fits?",
          "options": [
            "Use a shared grid with explicit column tracks so card edges align across the gallery rows.",
            "Keep growing flex rows with independent sizing so card edges align across the gallery rows.",
            "Use inline blocks with content sized widths so card edges align across the gallery rows.",
            "Use floats with content sized widths and clearing so card edges align across the gallery rows."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "When is the shown flex approach better than a shared grid? Explain the tradeoff for the last row.",
          "keyPoints": [
            "Flex suits rows whose free space can be distributed independently.",
            "`flex-grow` can expand cards on an incomplete final row.",
            "Grid suits column alignment shared across rows.",
            "Reading order should remain meaningful when the layout wraps."
          ],
          "modelAnswer": "The flex approach suits a gallery where cards may expand independently on their own row. The final row can use its spare space through `flex-grow`. A shared grid is better when column edges must match between rows. Keep a meaningful reading order as the layout wraps."
        }
      },
      {
        "id": "hc-mobile-first-media-l3-s2-q14",
        "topicId": "hc-mobile-first-media",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Reusable account card in two slots</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.account-slot { container-type: inline-size; height: 120px; margin-bottom: 20px; background: whitesmoke; }\n.account-narrow { width: 240px; }\n.account-wide { width: 480px; }\n.account-card { display: grid; grid-template-columns: 80px; gap: 20px; width: 200px; height: 100px; }\n.account-piece { width: 80px; height: 30px; background: lightblue; }\n@container (min-width: 400px) { .account-card { grid-template-columns: 80px 80px; } }\n</style>\n</head>\n<body>\n<section class=\"account-slot account-narrow\" aria-label=\"Sidebar account\"><div class=\"account-card\"><div class=\"account-piece\">Profile</div><div class=\"account-piece\">Details</div></div></section>\n<section class=\"account-slot account-wide\" aria-label=\"Main account\"><div class=\"account-card\"><div class=\"account-piece\">Profile</div><div class=\"account-piece\">Details</div></div></section>\n</body>\n</html>",
        "check": "[...document.querySelectorAll('.account-card')].map(e => getComputedStyle(e).gridTemplateColumns.split(' ').length).join(',')",
        "partA": {
          "ask": "At an 800 px wide viewport, how many columns does `.account-card` use in `.account-narrow` and `.account-wide`, in that order? Answer as two counts separated by a comma, without spaces.",
          "accepted": [
            "1,2"
          ]
        },
        "partB": {
          "ask": "The account card is reused in slots with different widths on the same page. Which responsive strategy fits?",
          "options": [
            "Use viewport media queries so sibling slots obtain distinct breakpoints from their individual allocated widths.",
            "Use root font breakpoints so sibling slots obtain distinct layouts from their individual allocated widths.",
            "Use orientation media queries so sibling slots obtain distinct layouts from their individual allocated widths.",
            "Use container queries so the card responds to available inline space supplied by its surrounding panel slot."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "When would a viewport media query be a better choice than this container query? Explain the scope of the decision.",
          "keyPoints": [
            "Viewport media queries suit page level changes tied to viewport space.",
            "Container queries suit components reused in differently sized slots.",
            "A size query styles descendants of the query container.",
            "`container-type: inline-size` provides the inline size query boundary here."
          ],
          "modelAnswer": "A viewport media query suits a page level decision, such as changing the main navigation when the viewport narrows. A container query suits a reusable card whose available space can differ within that page. Here, `container-type: inline-size` establishes the query boundary on the slot. The query then changes the descendant `.account-card` according to that slot’s width."
        }
      },
      {
        "id": "hc-units-l3-s2-q15",
        "topicId": "hc-units",
        "set": 2,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Font preference and fixed spacing</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\nhtml { font-size: 24px; }\n.reading-settings { box-sizing: border-box; width: 360px; height: 120px; padding: 16px; background: whitesmoke; }\n.reading-description { margin: 0; width: 280px; height: 60px; font-size: 1rem; line-height: 30px; }\n</style>\n</head>\n<body>\n<section class=\"reading-settings\" aria-label=\"Reading preferences\">\n<p class=\"reading-description\">Larger text preference is active.</p>\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.reading-settings')).paddingLeft",
        "partA": {
          "ask": "The root size is explicitly raised to simulate a larger text preference. What is the computed left padding of `.reading-settings` in px? Answer with a number.",
          "accepted": [
            "16",
            "16px",
            "16 px"
          ]
        },
        "partB": {
          "ask": "Text and spacing should respond together to the user’s font preference. Which strategy supports that goal?",
          "options": [
            "Use pixel text and viewport spacing, leaving the root size unset so the font preference controls them.",
            "Use root relative text and spacing, leaving the root size unset so the chosen font preference supplies their base.",
            "Use percentage text and pixel spacing, fixing the root size so the font preference controls their shared base.",
            "Use viewport text and percentage spacing, fixing the root size so the font preference supplies their shared base."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "When is local font relative spacing better than root relative spacing? Explain how to preserve the user’s text preference.",
          "keyPoints": [
            "`em` spacing follows the component’s computed font size.",
            "`rem` spacing follows the root’s computed font size.",
            "Local scaling is useful for controls with different text sizes.",
            "Avoid fixing the root in pixels when it should follow the user’s default font setting."
          ],
          "modelAnswer": "Use `em` spacing when a control’s padding should grow with its own text size. Use `rem` spacing when unrelated components should share a root based spacing scale. Let the root follow the user’s default font size rather than fixing it in pixels. In this page, the explicit root size simulates a changed preference, while the pixel padding stays fixed."
        }
      },
      {
        "id": "hc-flexbox-basics-l3-s3-q01",
        "topicId": "hc-flexbox-basics",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Uncentered search controls</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.search-tools { display: flex; flex-wrap: nowrap; align-content: center; justify-content: center; width: 420px; height: 120px; padding-top: 16px; background: whitesmoke; }\n.search-field { box-sizing: border-box; flex: 0 0 240px; height: 36px; border: 2px solid gray; }\n.search-submit { box-sizing: border-box; flex: 0 0 80px; height: 36px; border: 2px solid blue; }\n</style>\n</head>\n<body>\n<form class=\"search-tools\" role=\"search\">\n<input class=\"search-field\" type=\"search\" aria-label=\"Search records\">\n<button class=\"search-submit\" type=\"submit\">Search</button>\n</form>\n</body>\n</html>",
        "check": "document.querySelector('.search-submit').getBoundingClientRect().top",
        "partA": {
          "ask": "The controls should be vertically centered in the content area of `.search-tools`. How far is the top edge of `.search-submit` from the viewport top in px? Answer with a number.",
          "accepted": [
            "16",
            "16px",
            "16 px"
          ]
        },
        "partB": {
          "ask": "Which edit centers the controls vertically while retaining their horizontal arrangement?",
          "options": [
            "Replace `justify-content: center` with `space-around` to distribute the controls within the available vertical space.",
            "Add equal vertical padding to `.search-submit` to place its outer rectangle centrally within the search form.",
            "Add `align-items: center` to `.search-tools` to center the controls within the available cross axis space.",
            "Change `.search-tools` to `flex-direction: column` to center the controls without changing their horizontal arrangement."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-positioning-l3-s3-q02",
        "topicId": "hc-positioning",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Scrolling report help badge</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.report-scroll { margin-top: 60px; width: 360px; height: 180px; overflow: auto; }\n.report-canvas { transform: translateX(0); width: 320px; height: 500px; background: whitesmoke; }\n.report-help { position: fixed; top: 20px; left: 24px; width: 120px; height: 32px; background: lightblue; }\n</style>\n</head>\n<body>\n<section class=\"report-scroll\" aria-label=\"Report preview\">\n<div class=\"report-canvas\">\n<aside class=\"report-help\">Report help</aside>\n</div>\n</section>\n</body>\n</html>",
        "check": "(() => { document.querySelector('.report-scroll').scrollTop = 80; return document.querySelector('.report-help').getBoundingClientRect().top; })()",
        "partA": {
          "ask": "The help badge should stay at a viewport location. After `.report-scroll` scrolls down by 80 px, what is the signed top position of `.report-help` relative to the viewport in px, even if clipped? Answer with a number.",
          "accepted": [
            "0",
            "0px",
            "0 px"
          ]
        },
        "partB": {
          "ask": "Which change keeps the badge attached to the viewport while preserving the transformed report preview?",
          "options": [
            "Move `.report-help` into a dedicated direct child of `body` outside the scrolling preview and retain its fixed positioning.",
            "Increase the `z-index` of `.report-help` inside the preview so its reference rectangle extends beyond the scroll area.",
            "Add `position: relative` to `.report-scroll` so the existing fixed badge uses a stable reference outside the report preview.",
            "Replace the badge positioning with `position: absolute` inside `.report-canvas` so scrolling leaves its viewport location stable."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "Explain, step by step, how the scroll changes the measured badge position and why the proposed placement fixes the bug.",
          "keyPoints": [
            "The `transform` on `.report-canvas` establishes the containing block for `.report-help`.",
            "The unscrolled top position combines the `60px` outer offset and the `20px` inset.",
            "Scrolling `.report-scroll` by `80px` moves the badge geometry to `0px` from the viewport top.",
            "Moving `.report-help` outside that ancestor chain restores a viewport containing block."
          ],
          "modelAnswer": "The `transform` on `.report-canvas` makes it the containing block for the fixed badge. Before scrolling, `.report-help` starts at `80px` from the viewport top. Scrolling `.report-scroll` by `80px` moves its measured top to `0px`, where clipping can hide it. Moving the badge outside this ancestor chain lets its fixed positioning use the viewport."
        }
      },
      {
        "id": "hc-document-structure-l3-s3-q03",
        "topicId": "hc-document-structure",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Repaired notification summary</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.notice-preview { width: 400px; height: 180px; background: whitesmoke; }\n.notice-preview p { margin: 0; width: 360px; height: 24px; }\n.notice-actions { width: 360px; height: 40px; background: lightblue; }\n</style>\n</head>\n<body>\n<section class=\"notice-preview\" aria-label=\"Notification summary\">\n<p class=\"notice-copy\">Pending changes\n<div class=\"notice-actions\">Review changes</div>\nbefore publishing.</p>\n</section>\n</body>\n</html>",
        "check": "document.querySelectorAll('.notice-preview > p').length",
        "partA": {
          "ask": "The summary was intended to be one `p` containing the action region. After HTML parsing, how many elements match `.notice-preview > p`? Answer with a number.",
          "accepted": [
            "2"
          ]
        },
        "partB": {
          "ask": "Which markup revision keeps the action region grouped with the summary using conforming HTML?",
          "options": [
            "Set `.notice-actions` to `display: inline` so its existing nested placement becomes a conforming child of the surrounding paragraph.",
            "Replace the action region with a `section` so its existing placement becomes valid within the surrounding paragraph element.",
            "Give `.notice-copy` `display: contents` so the surrounding paragraph accepts the action region without changing the given element nesting.",
            "Use a `div` wrapper for the complete group, with separate `p` elements for prose and the action region as a sibling."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-backgrounds-borders-l3-s3-q04",
        "topicId": "hc-backgrounds-borders",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Selection ring shifts saved filters</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.filter-strip { display: flex; gap: 12px; width: 460px; height: 100px; background: whitesmoke; }\n.filter-tile { box-sizing: content-box; flex: 0 0 200px; height: 60px; border: 0 solid blue; background: lightblue; }\n.filter-selected { border-width: 6px; }\n</style>\n</head>\n<body>\n<section class=\"filter-strip\" aria-label=\"Saved filters\">\n<article class=\"filter-tile filter-selected\">Active records</article>\n<article class=\"filter-tile\" id=\"filter-archived\">Archived records</article>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('#filter-archived').getBoundingClientRect().left",
        "partA": {
          "ask": "Selecting the first tile should not move the second tile. What is the left position of `#filter-archived` relative to the viewport in px? Answer with a number.",
          "accepted": [
            "224",
            "224px",
            "224 px"
          ]
        },
        "partB": {
          "ask": "Which selection treatment preserves the tile content dimensions and prevents neighboring tiles from shifting?",
          "options": [
            "Keep the selected border and add `overflow: hidden` to the strip so the extra edge stays inside the row.",
            "Replace the selected border with an inset `box-shadow` so the selection ring paints inside the existing tile rectangle.",
            "Keep the selected border and set a matching `border-radius` so the extra edge follows the existing tile rectangle.",
            "Replace the selected border with equal padding so the selection treatment contributes a matching amount of internal spacing."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-debugging-crossbrowser-l3-s3-q05",
        "topicId": "hc-debugging-crossbrowser",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Feature tested export actions</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.export-actions { width: 360px; height: 80px; display: block; display: grid-flex; background: whitesmoke; }\n.export-actions button { box-sizing: border-box; width: 120px; height: 32px; }\n@supports not (display: grid-flex) { .export-actions { display: flex; gap: 12px; } }\n</style>\n</head>\n<body>\n<section class=\"export-actions\" aria-label=\"Export formats\">\n<button type=\"button\">Download</button>\n<button type=\"button\">Print</button>\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.export-actions')).display",
        "partA": {
          "ask": "The intended feature branch uses `display: grid-flex`. In current Edge, what is the computed `display` of `.export-actions`? Answer with a CSS keyword.",
          "accepted": [
            "flex"
          ]
        },
        "partB": {
          "ask": "The feature branch should use a supported two dimensional layout, with a simpler baseline. Which revision expresses that intent?",
          "options": [
            "Keep `grid-flex` and add a vendor prefix to the property name so the browser recognizes the combined layout.",
            "Provide the baseline first, then test `display: grid` and apply the grid enhancement inside that positive feature query.",
            "Keep `grid-flex` and wrap it in a matching positive feature query so the query enables the combined layout.",
            "Replace the feature query with a viewport query and retain `grid-flex` so wide screens enable the combined layout."
          ],
          "correct": 1
        }
      },
      {
        "id": "hc-grid-practice-l3-s3-q06",
        "topicId": "hc-grid-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Dense operations dashboard</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.ops-grid { display: grid; width: 430px; grid-template-columns: repeat(4, 100px); grid-template-areas: \"summary . . .\" \"summary . . .\"; grid-auto-rows: 60px; gap: 10px; grid-auto-flow: row dense; }\n.ops-grid > article { min-width: 0; background: lightblue; }\n.ops-summary { grid-area: summary; }\n.ops-history { grid-column: span 3; }\n.ops-wide { grid-column: span 2; }\n</style>\n</head>\n<body>\n<main class=\"ops-grid\">\n<article class=\"ops-summary\">Summary</article><article class=\"ops-history\">History</article>\n<article class=\"ops-wide\">Revenue</article><article class=\"ops-wide\">Forecast</article>\n<article id=\"ops-alert\">Alert</article>\n</main>\n</body>\n</html>",
        "check": "(() => { const r = document.querySelector('#ops-alert').getBoundingClientRect(); return [r.left, r.top].join(','); })()",
        "partA": {
          "ask": "What are the viewport left and top positions of `#ops-alert` in px? Answer as left,top without spaces.",
          "accepted": [
            "330,70",
            "330px,70px",
            "330 px,70 px"
          ]
        },
        "partB": {
          "ask": "This dashboard includes keyboard controls. Which review addresses a usability risk of visual packing?",
          "options": [
            "Assign positive `tabindex` values from column positions so screen readers adopt the same sequence as the packed dashboard.",
            "Duplicate cards in unused cells and hide the originals visually so assistive tools encounter the new packed sequence.",
            "Use row numbers as accessible names so keyboard navigation follows visual packing without changing the original focus sequence.",
            "Compare the visual sequence with the reading and focus sequences so the dashboard remains understandable when packing changes."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-container-queries-l3-s3-q07",
        "topicId": "hc-container-queries",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Nested billing widget slots</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.billing-region { container-type: inline-size; width: 500px; height: 160px; }\n.billing-slot { container-type: inline-size; width: 300px; height: 140px; }\n.billing-frame { container-name: billing-frame; width: 180px; height: 100px; background: whitesmoke; }\n.billing-widget { width: 120px; height: 40px; background: lightblue; }\n@container (min-width: 250px) { .billing-widget { width: 220px; } }\n@container (min-width: 400px) { .billing-widget { width: 340px; } }\n</style>\n</head>\n<body>\n<section class=\"billing-region\" aria-label=\"Billing overview\">\n<div class=\"billing-slot\"><div class=\"billing-frame\">\n<div class=\"billing-widget\">Upcoming charge</div>\n</div></div>\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.billing-widget')).width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the computed width of `.billing-widget` in px? Answer with a number.",
          "accepted": [
            "220",
            "220px",
            "220 px"
          ]
        },
        "partB": {
          "ask": "A future variant must follow a particular outer region rather than incidental wrappers. Which query design expresses that requirement?",
          "options": [
            "Give the intended size container a distinct name and reference that name in the query so the target ancestor is explicit.",
            "Use a viewport query and repeat the outer region class so the condition measures the selected region rather than the window.",
            "Add a class to the inner widget and increase selector specificity so the size condition measures the intended outer region.",
            "Put the size query inside the region rule so stylesheet nesting binds the condition to the selected region rectangle."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-custom-properties-l3-s3-q08",
        "topicId": "hc-custom-properties",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\" class=\"compact-retention\">\n<head>\n<meta charset=\"utf-8\">\n<title>Compact retention settings</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n:root { --retention-step: 20px; --retention-edge: 12px; }\n:root.compact-retention { --retention-step: 14px !important; }\n.retention-settings { width: 340px; height: 120px; background: whitesmoke; }\n.retention-scale { --retention-step: 8px; width: calc(var(--retention-step) * 5 + var(--retention-edge)); height: 32px; background: lightblue; }\n</style>\n</head>\n<body>\n<section class=\"retention-settings\" aria-label=\"Retention settings\">\n<div class=\"retention-scale\">Retention</div>\n</section>\n</body>\n</html>",
        "check": "getComputedStyle(document.querySelector('.retention-scale')).width",
        "partA": {
          "ask": "With `compact-retention` on the root, what is the computed width of `.retention-scale` in px? Answer with a number.",
          "accepted": [
            "52",
            "52px",
            "52 px"
          ]
        },
        "partB": {
          "ask": "A reusable size expression should also work when its spacing token is absent. Which design provides that behavior?",
          "options": [
            "Declare the token after its consuming expression so source order supplies the missing size during substitution.",
            "Add `!important` to the consuming expression so a missing spacing token receives a valid length during substitution.",
            "Supply a valid length fallback in `var()` so an absent spacing token still leaves a usable size expression.",
            "Wrap the token reference in `calc()` so arithmetic supplies a suitable length when the spacing token is absent."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-flexbox-practice-l3-s3-q09",
        "topicId": "hc-flexbox-practice",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Three pane review workspace</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.review-panes { display: flex; width: 500px; height: 140px; gap: 20px; }\n.review-outline { flex: 1 1 240px; min-width: 220px; height: 140px; background: whitesmoke; }\n.review-draft { flex: 3 1 180px; min-width: 0; height: 140px; background: lightblue; }\n.review-comments { flex: 2 2 180px; min-width: 0; height: 140px; background: silver; }\n</style>\n</head>\n<body>\n<main class=\"review-panes\">\n<nav class=\"review-outline\" aria-label=\"Outline\">Outline</nav>\n<section class=\"review-draft\" aria-label=\"Draft\">Draft</section>\n<aside class=\"review-comments\">Comments</aside>\n</main>\n</body>\n</html>",
        "check": "document.querySelector('.review-draft').getBoundingClientRect().width",
        "partA": {
          "ask": "What is the final width of the second pane, `.review-draft`, in px? Answer with a number.",
          "accepted": [
            "140",
            "140px",
            "140 px"
          ]
        },
        "partB": {
          "ask": "If a wider version instead has positive free space and no active limits, what does the growth factor control?",
          "options": [
            "It sets the pane final width as a fraction of the row, with starting sizes excluded from the allocation.",
            "It gives the pane a weighted share of spare space, added to its starting size after gaps are accounted for.",
            "It ranks the pane for expansion before neighboring panes, with earlier ranks consuming the available spare space.",
            "It multiplies the pane starting size to determine its share of spare space, using the same weights as shrinking."
          ],
          "correct": 1
        },
        "partC": {
          "ask": "Explain, step by step, how the row reaches the final width of `.review-draft` after the minimum constraint is applied.",
          "keyPoints": [
            "Two `20px` gaps leave `460px` for the three panes.",
            "The bases total `600px`; scaled shrink weights are `240`, `180`, and `360`.",
            "The first shrink pass would violate the `220px` minimum on `.review-outline`, so that pane freezes.",
            "The remaining panes share a `120px` deficit in a `1:2` ratio, reaching `140px` and `100px`."
          ],
          "modelAnswer": "The two `20px` gaps leave `460px` for bases totaling `600px`. Scaled shrink weights come from `flex-shrink` times `flex-basis`, giving `240`, `180`, and `360`. The initial shrink would make `.review-outline` narrower than its `220px` minimum, so it freezes there. The other panes must then fit `240px`, sharing their `120px` deficit in a `1:2` ratio and ending at `140px` and `100px`. The `flex-grow` factors do not distribute space during this shrink calculation."
        }
      },
      {
        "id": "hc-links-images-media-l3-s3-q10",
        "topicId": "hc-links-images-media",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Stretched listing photograph</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.listing-editor { width: 360px; height: 200px; background: whitesmoke; }\n.listing-photo { display: block; width: 300px; }\n</style>\n</head>\n<body>\n<article class=\"listing-editor\" aria-label=\"Listing photograph\">\n<img class=\"listing-photo\" src=\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22 viewBox=%220 0 400 200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22steelblue%22/%3E%3Ccircle cx=%22200%22 cy=%22100%22 r=%2280%22 fill=%22gold%22/%3E%3C/svg%3E\" width=\"200\" height=\"100\" alt=\"Circular product detail\">\n</article>\n</body>\n</html>",
        "check": "(() => { const r = document.querySelector('.listing-photo').getBoundingClientRect(); return [r.width, r.height].join(','); })()",
        "partA": {
          "ask": "The image source has a 2:1 aspect ratio. What are the rendered width and height of `.listing-photo` in px? Answer as width,height without spaces.",
          "accepted": [
            "300,100",
            "300px,100px",
            "300 px,100 px"
          ]
        },
        "partB": {
          "ask": "Which revision keeps the requested width and preserves the source proportions without cropping?",
          "options": [
            "Add `height: auto` to `.listing-photo` so the specified CSS width can determine its proportional rendered height.",
            "Add `object-fit: fill` to `.listing-photo` so the requested width can preserve proportions inside the retained height.",
            "Change the `width` attribute to match the CSS width so the retained height scales with the source proportions.",
            "Add `max-height: 100px` to `.listing-photo` so the requested width can determine a proportional rendered height."
          ],
          "correct": 0
        }
      },
      {
        "id": "hc-rendering-performance-l3-s3-q11",
        "topicId": "hc-rendering-performance",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Height hint does not expand a panel</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.audit-feed { width: 360px; height: 180px; background: whitesmoke; }\n.audit-detail { width: 320px; height: 40px; will-change: height; background: lightblue; }\n.audit-expanded { width: 320px; height: 90px; background: silver; }\n.audit-next { width: 320px; height: 30px; background: pink; }\n</style>\n</head>\n<body>\n<section class=\"audit-feed\" aria-label=\"Audit events\">\n<div class=\"audit-detail\"><div class=\"audit-expanded\">Expanded event details</div></div>\n<div class=\"audit-next\">Next event</div>\n</section>\n</body>\n</html>",
        "check": "document.querySelector('.audit-expanded').getBoundingClientRect().bottom - document.querySelector('.audit-next').getBoundingClientRect().top",
        "partA": {
          "ask": "The author added `will-change: height` expecting expanded content to push the next event down. By how many px does `.audit-expanded` extend below the top edge of `.audit-next`? Answer with a number.",
          "accepted": [
            "50",
            "50px",
            "50 px"
          ]
        },
        "partB": {
          "ask": "Which change makes the expanded content reserve space for the following event?",
          "options": [
            "Replace the hint with `will-change: transform` so the browser allocates a larger panel when the event details expand.",
            "Apply a downward `transform` to the details so their expanded appearance contributes a larger panel to normal flow.",
            "Remove the fixed panel height and the unnecessary hint so the panel grows with details and displaces the following event.",
            "Add `overflow: visible` to the panel so its overflowing details contribute extra height before the following event."
          ],
          "correct": 2
        }
      },
      {
        "id": "hc-transitions-animations-l3-s3-q12",
        "topicId": "hc-transitions-animations",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Broad preference switch transition</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.preference-row { width: 400px; height: 80px; background: whitesmoke; }\n.preference-switch { box-sizing: border-box; width: 140px; height: 36px; transition-duration: 1.2s; transition-property: opacity; }\n.preference-row button { transition: all 200ms ease; }\n.preference-switch { transition-duration: 900ms; }\n</style>\n</head>\n<body>\n<section class=\"preference-row\" aria-label=\"Notification preferences\">\n<button class=\"preference-switch\" type=\"button\">Notifications</button>\n</section>\n</body>\n</html>",
        "check": "(() => { const s = getComputedStyle(document.querySelector('.preference-switch')); return s.transitionProperty + ',' + s.transitionDuration; })()",
        "partA": {
          "ask": "Before a state change, what are the computed `transition-property` and `transition-duration` of `.preference-switch`? Answer as property,seconds using the browser forms and no spaces.",
          "accepted": [
            "all,0.2s",
            "all,0.20s",
            "all,0.200s"
          ]
        },
        "partB": {
          "ask": "The control may change dimensions, but its motion should affect `opacity` alone. Which revision makes that scope explicit?",
          "options": [
            "Keep the broad shorthand and lengthen its delay so geometry changes settle before the visible motion starts.",
            "Keep the broad shorthand and add `will-change: opacity` so the hint restricts which properties receive motion.",
            "Move the broad shorthand to the surrounding row so its motion settings pass into the control through inheritance.",
            "Change the broad rule to `transition: opacity 200ms ease` so new size changes stay outside the intended motion."
          ],
          "correct": 3
        }
      },
      {
        "id": "hc-z-index-stacking-l3-s3-q13",
        "topicId": "hc-z-index-stacking",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Confirmation overlay host</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.settings-root { isolation: isolate; position: relative; z-index: 1; width: 800px; height: 400px; background: whitesmoke; }\n.settings-bar { position: fixed; top: 0; left: 0; width: 800px; height: 80px; z-index: 20; background: lightblue; }\n.confirm-shade { position: fixed; inset: 0; z-index: 50; background: rgb(0 0 0 / 0.3); }\n.confirm-card { position: absolute; left: 240px; top: 160px; width: 320px; height: 160px; background: white; }\n</style>\n</head>\n<body>\n<main class=\"settings-root\">Account settings</main>\n<header class=\"settings-bar\" id=\"settings-bar\">Settings navigation</header>\n<div class=\"confirm-shade\" id=\"confirm-shade\">\n<section class=\"confirm-card\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Confirm removal\">Confirm removal</section>\n</div>\n</body>\n</html>",
        "check": "document.elementFromPoint(40, 40).id",
        "partA": {
          "ask": "The overlay host is a direct child of `body` after the settings page. Which element receives a hit 40 px from the viewport left and top edges? Answer with its `id`.",
          "accepted": [
            "confirm-shade"
          ]
        },
        "partB": {
          "ask": "This approach is intended for a blocking confirmation. Which interaction design makes it suitable for keyboard users?",
          "options": [
            "Move focus into the dialog, contain keyboard navigation there, make the background inert, and restore prior focus when it closes.",
            "Keep focus on the launch control and add a stronger overlay tint so keyboard commands stay associated with the pending action.",
            "Add positive `tabindex` values to background controls and use the overlay click handler to represent the blocked interaction state.",
            "Mark the surface with `aria-modal=\"true\"` and retain existing focus handling so the accessibility declaration also manages keyboard navigation."
          ],
          "correct": 0
        },
        "partC": {
          "ask": "When would a native `dialog` opened with `showModal()` be a better approach? Explain the painting and interaction tradeoffs step by step.",
          "keyPoints": [
            "The shown `.confirm-shade` is outside `.settings-root` and participates in normal document stacking.",
            "A modal `dialog` opened with `showModal()` enters the top layer.",
            "The native modal mechanism makes the rest of the document inert and provides modal focus behavior.",
            "A custom overlay needs explicit focus, dismissal, and background interaction management."
          ],
          "modelAnswer": "Use a native `dialog` with `showModal()` when the confirmation should block interaction with the rest of the document. It enters the top layer, so ordinary page stacking contexts do not trap it. The native modal mechanism also makes background content inert and provides focus behavior that should still be tested. The shown `.confirm-shade` suits a custom overlay system, but that system must implement and test keyboard navigation, dismissal, and focus restoration."
        }
      },
      {
        "id": "hc-fluid-sizing-l3-s3-q14",
        "topicId": "hc-fluid-sizing",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Cropped collection preview</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.collection-row { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: 20px; width: 520px; height: 180px; }\n.collection-meta { width: 180px; height: 180px; background: whitesmoke; }\n.collection-visual { min-width: 0; height: 180px; background: silver; }\n.collection-cover { display: block; width: 100%; height: 180px; object-fit: cover; }\n</style>\n</head>\n<body>\n<article class=\"collection-row\" aria-label=\"Collection preview\">\n<div class=\"collection-meta\">Featured collection</div>\n<div class=\"collection-visual\"><img class=\"collection-cover\" src=\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22 viewBox=%220 0 400 200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22steelblue%22/%3E%3Ccircle cx=%22200%22 cy=%22100%22 r=%2280%22 fill=%22gold%22/%3E%3C/svg%3E\" width=\"400\" height=\"200\" alt=\"Circular collection emblem\"></div>\n</article>\n</body>\n</html>",
        "check": "document.querySelector('.collection-cover').getBoundingClientRect().width",
        "partA": {
          "ask": "At an 800 px wide viewport, what is the rendered element width of `.collection-cover` in px, excluding image content cropped inside it? Answer with a number.",
          "accepted": [
            "320",
            "320px",
            "320 px"
          ]
        },
        "partB": {
          "ask": "The preview must fill its allotted rectangle while preserving source proportions, and edge cropping is acceptable. Which treatment fits?",
          "options": [
            "Use `object-fit: contain` with the sized image rectangle so the preview fills the slot while retaining the complete source image.",
            "Use `object-fit: fill` with the sized image rectangle so the preview fills the slot while preserving its original source proportions.",
            "Remove the fixed height and use the source aspect ratio so the preview fills the allotted rectangle without cropping or empty bands.",
            "Keep `object-fit: cover` with the sized image rectangle so the preview fills the slot while preserving its original source proportions."
          ],
          "correct": 3
        },
        "partC": {
          "ask": "When would `object-fit: contain` be better? Explain step by step what it changes inside the image rectangle.",
          "keyPoints": [
            "`object-fit` controls image content inside the element rectangle rather than the grid track width.",
            "`cover` preserves proportions while cropping content when aspect ratios differ.",
            "`contain` preserves the complete image and may leave unused space.",
            "Complete diagrams or product details can matter more than edge to edge coverage."
          ],
          "modelAnswer": "Use `object-fit: contain` when the complete source image must remain visible, such as a diagram or an identification image. It scales the content proportionally until the complete image fits inside the rectangle. If the source and rectangle ratios differ, unused space remains around the content. Changing from `cover` to `contain` does not change the element width determined by the grid and `width: 100%`."
        }
      },
      {
        "id": "hc-layout-patterns-l3-s3-q15",
        "topicId": "hc-layout-patterns",
        "set": 3,
        "environment": "page",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Growing account history page</title>\n<style>\nbody { margin: 0; font: 16px/20px sans-serif; }\n.history-shell { display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh; width: 700px; }\n.history-header { width: 700px; height: 60px; background: lightblue; }\n.history-content { width: 700px; min-height: 640px; background: whitesmoke; }\n.history-footer { width: 700px; height: 40px; background: silver; }\n</style>\n</head>\n<body>\n<div class=\"history-shell\">\n<header class=\"history-header\">Account history</header>\n<main class=\"history-content\">History records</main>\n<footer class=\"history-footer\">End of history</footer>\n</div>\n</body>\n</html>",
        "check": "document.querySelector('.history-footer').getBoundingClientRect().top",
        "partA": {
          "ask": "At an 800 × 600 px viewport with the page unscrolled, how far is the top edge of `.history-footer` from the viewport top in px? Answer with a number.",
          "accepted": [
            "700",
            "700px",
            "700 px"
          ]
        },
        "partB": {
          "ask": "A redesign uses a column flex layout and must support short and long content. Which replacement keeps the same footer intent?",
          "options": [
            "Give the shell a fixed viewport height and absolutely position the footer at its bottom so growing records remain separate from the footer.",
            "Fix the footer to the viewport bottom and retain the main region dimensions so growing records share the same visible footer boundary.",
            "Apply a viewport minimum height, nonshrinking header and footer, and a growing main region so the footer follows longer records in flow.",
            "Set the shell to a fixed viewport height and clip overflowing records so the footer remains reachable without changing the main region."
          ],
          "correct": 2
        },
        "partC": {
          "ask": "When is a fixed viewport footer better than this page footer? Explain the space and scrolling tradeoffs step by step.",
          "keyPoints": [
            "The shown grid keeps `.history-footer` in document flow after `.history-content`.",
            "`min-height: 100vh` allows `.history-shell` to grow beyond the viewport.",
            "A fixed footer suits controls that must stay visible while content scrolls.",
            "A fixed footer needs reserved space so it does not cover content or focused controls."
          ],
          "modelAnswer": "Use a fixed viewport footer when persistent actions must remain visible while the user scrolls. The shown grid instead keeps `.history-footer` after the records in document flow. Its `min-height: 100vh` supports a short page while allowing a longer page to grow. A fixed footer needs reserved space and careful focus testing so it does not cover the final records or keyboard controls."
        }
      }
    ],
};
