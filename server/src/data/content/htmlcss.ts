// The HTML+CSS topic notes (29 topics, in the order of data/roadmap.ts): 23 deep notes and 6 light notes.
// Written with Codex, then checked: every CSS example was loaded in a real browser and measured, and every fact was read.
// A correction is made here, in the data, with no change to the code.

import type { TopicNotes } from "./types";

export const HTML_CSS_NOTES: TopicNotes[] = [
  {
    "topicId": "hc-document-structure",
    "summary": "HTML gives a page its content and structure. Elements describe the pieces, while attributes add details about them.",
    "syntax": [
      {
        "title": "Page skeleton",
        "language": "html",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Page title</title>\n</head>\n<body><!-- page content --></body>\n</html>",
        "parts": [
          {
            "part": "<!doctype html>",
            "meaning": "Selects standards mode for an HTML document."
          },
          {
            "part": "<html lang=\"en\">",
            "meaning": "Wraps the document and declares English as its language."
          },
          {
            "part": "<head>",
            "meaning": "Contains document metadata."
          },
          {
            "part": "<meta charset=\"utf-8\">",
            "meaning": "Declares UTF-8 text encoding."
          },
          {
            "part": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
            "meaning": "Uses the device width for the viewport and starts at normal zoom."
          },
          {
            "part": "<title>Page title</title>",
            "meaning": "Sets the document title shown in the browser tab."
          },
          {
            "part": "<body>",
            "meaning": "Contains the page content."
          },
          {
            "part": "<!-- page content -->",
            "meaning": "Marks omitted content with an HTML comment."
          }
        ]
      },
      {
        "title": "Elements with attributes",
        "language": "html",
        "code": "<div class=\"container\">\n  <span class=\"text\">Text</span>\n</div>",
        "parts": [
          {
            "part": "<div",
            "meaning": "Starts a generic container that has block display by default."
          },
          {
            "part": "class=\"container\"",
            "meaning": "Assigns a class name for styling or scripting."
          },
          {
            "part": "<span",
            "meaning": "Starts a generic text container that has inline display by default."
          },
          {
            "part": "class=\"text\"",
            "meaning": "Assigns the nested element a class name."
          },
          {
            "part": "</span>",
            "meaning": "Closes the nested element."
          },
          {
            "part": "</div>",
            "meaning": "Closes the outer element."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start with pieces",
        "points": [
          "Think of a page as a house with rooms and labels. HTML, the language for describing web content, tells the browser which pieces are headings, paragraphs, links, and other content.",
          "An element is one piece of HTML content, usually written with an opening tag, content, and a closing tag. In <p>Hello</p>, the tags mark a paragraph containing Hello.",
          "An attribute is an extra detail written inside an opening tag. In <html lang=\"en\">, lang names the detail and en gives its value: the page uses English.",
          "Keep tags properly nested, like smaller boxes inside larger boxes. Close an inner span before closing the paragraph that contains it."
        ]
      },
      {
        "heading": "Build the outside",
        "points": [
          "Put <!doctype html> first in a full document. This doctype is a declaration that requests standards mode, where the browser follows modern layout rules rather than old compatibility behavior.",
          "The html element wraps the document and is its outermost element. Set its lang attribute so reading tools can choose suitable pronunciation and other tools can identify the language.",
          "Inside html, head holds information about the page and body holds the page content. Like house paperwork and furnished rooms, they have different jobs within the same document."
        ]
      },
      {
        "heading": "Give the page information",
        "points": [
          "Place <meta charset=\"utf-8\"> near the beginning of head. A character encoding is the rule for turning stored bytes into letters; UTF-8 supports text from many writing systems.",
          "Use <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> for mobile layouts. The viewport is the area used to lay out the page; this setting uses the device width initially.",
          "The title element sets the browser tab title and helps identify bookmarks. It belongs in head, while a visible page heading such as h1 belongs inside body."
        ]
      },
      {
        "heading": "Watch the visible flow",
        "points": [
          "Block layout means a box normally starts on a new line and uses the available width. Paragraphs use this behavior by default, so separate paragraphs appear one below another.",
          "Inline layout means content flows along a line with nearby text and wraps when necessary. A span usually behaves this way, so it can mark words inside a paragraph.",
          "CSS, the language that controls appearance, can change these default display behaviors. Block and inline describe layout here; they are not permanent rules about which HTML elements may contain others."
        ]
      }
    ],
    "terms": [
      {
        "term": "element",
        "meaning": "An element is a piece of content described by HTML tags."
      },
      {
        "term": "attribute",
        "meaning": "An attribute adds a named detail to an opening tag."
      },
      {
        "term": "doctype",
        "meaning": "The doctype declaration asks the browser to use standards mode."
      },
      {
        "term": "character encoding",
        "meaning": "A character encoding defines how stored bytes represent text."
      },
      {
        "term": "viewport",
        "meaning": "The viewport is the area used to lay out the page."
      },
      {
        "term": "block and inline",
        "meaning": "Block layout starts a box on a new line, while inline content flows along text lines."
      }
    ],
    "examples": [
      {
        "title": "A paragraph with an inline piece",
        "environment": "browser",
        "language": "html",
        "code": "<p>Hello <span>reader</span>.</p>",
        "walkthrough": [
          "Step 1: Create a paragraph and mark reader with a span so that the marked word stays within the sentence.",
          "Step 2: The browser shows: One paragraph reads Hello reader. The span does not start a new line."
        ],
        "output": "One paragraph reads Hello reader. The span does not start a new line."
      },
      {
        "title": "A complete small document",
        "environment": "browser",
        "language": "html",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Reading notes</title>\n</head>\n<body>\n<h1>Reading notes</h1>\n<p>Read <span>one page</span> today.</p>\n<p>Then take a break.</p>\n</body>\n</html>",
        "walkthrough": [
          "Step 1: Request standards mode for predictable layout.",
          "Step 2: Open the document and declare English as its language.",
          "Step 3: Open the page information area.",
          "Step 4: Declare UTF-8 so text is decoded correctly.",
          "Step 5: Use the device width and an initial scale of one for mobile layout.",
          "Step 6: Set Reading notes as the tab title.",
          "Step 7: Open the area containing visible content.",
          "Step 8: Add the main visible heading.",
          "Step 9: Add a paragraph with one inline span inside the sentence.",
          "Step 10: Add another paragraph, which starts a separate block.",
          "Step 11: The browser shows: The tab title is Reading notes. The page shows that heading, then Read one page today., then a separate paragraph saying Then take a break."
        ],
        "output": "The tab title is Reading notes. The page shows that heading, then Read one page today., then a separate paragraph saying Then take a break."
      }
    ],
    "keyPoints": [
      "Start a full document with <!doctype html>.",
      "Use html lang to declare the page language.",
      "Keep page information in head and visible content in body.",
      "Declare UTF-8 and a mobile viewport.",
      "Block and inline defaults can be changed with CSS."
    ],
    "commonMistakes": [
      "Putting the visible page heading inside head hides it from its intended place.",
      "Treating title as the visible heading confuses two different jobs.",
      "Assuming every element requires a closing tag overlooks elements such as meta."
    ],
    "links": [
      {
        "title": "Document structure",
        "url": "https://web.dev/learn/html/document-structure",
        "kind": "article",
        "language": "English",
        "why": "Introduces the parts of a complete document in small steps."
      }
    ]
  },
  {
    "topicId": "hc-semantic-html",
    "summary": "Semantic HTML chooses elements for their meaning. It helps people and software understand the parts of a page.",
    "explanation": [
      {
        "heading": "Choose meaningful containers",
        "points": [
          "Think of a building with signs saying entrance, information desk, and exit. Semantic HTML works like those signs: its elements describe the purpose of content instead of only wrapping it.",
          "An element is a piece of HTML marked with tags. A semantic element has a useful meaning, such as nav for major navigation links or main for the central page content.",
          "A div is a general container without a special content meaning. Use it when you only need a wrapper for appearance or grouping and no meaningful element fits the content."
        ]
      },
      {
        "heading": "Name the page areas",
        "points": [
          "A header contains introductory content, such as a page heading and navigation. It can introduce the whole page or a smaller piece, such as an article, depending on its location.",
          "Use nav for an important group of navigation links, rather than every collection of links. Use main for the main content specific to this page, with one visible main area.",
          "A footer contains information about its page or nearest relevant section, such as related links or a copyright notice. It does not have to sit at the bottom of the screen."
        ]
      },
      {
        "heading": "Group related content",
        "points": [
          "A section groups content around one theme and should normally have a heading. Choose it when the group belongs in the page outline, rather than merely needing a visual box.",
          "An article is a self-contained piece that could make sense separately, such as a recipe or a review. An article can contain sections, and a section can contain several articles.",
          "A heading names a piece of content; h1 through h6 express levels. Use one clear h1 for the page topic, then h2 for major parts and h3 for their subdivisions."
        ]
      },
      {
        "heading": "Make the structure useful",
        "points": [
          "Accessibility means people with different abilities can use the page. A screen reader, which speaks page information, can use headings and landmarks, which are named navigation regions, to help people move.",
          "Main and nav provide landmarks; page-level header and footer commonly do too. A section becomes a region landmark when it has an accessible name, meaning a name available to reading tools.",
          "The building signs become the header, nav, and main in the examples. Their meaning also helps search tools understand content, but does not guarantee a search ranking or any particular appearance."
        ]
      }
    ],
    "terms": [
      {
        "term": "semantic element",
        "meaning": "A semantic element describes the purpose of its content."
      },
      {
        "term": "landmark",
        "meaning": "A landmark is a page region that assistive tools can offer as a navigation destination."
      },
      {
        "term": "heading",
        "meaning": "A heading names a topic and has a level from h1 to h6."
      },
      {
        "term": "accessibility",
        "meaning": "Accessibility means people with different abilities can use the content."
      },
      {
        "term": "screen reader",
        "meaning": "A screen reader presents page information through speech or braille."
      },
      {
        "term": "accessible name",
        "meaning": "An accessible name is the name that assistive tools receive for an element."
      }
    ],
    "examples": [
      {
        "title": "One main topic",
        "environment": "browser",
        "language": "html",
        "code": "<main>\n<h1>Daily reading</h1>\n<p>Choose a short story.</p>\n</main>",
        "walkthrough": [
          "Step 1: Open the main content area so tools can identify the central content.",
          "Step 2: Name the page topic with its top-level heading.",
          "Step 3: Add the reading instruction below the heading.",
          "Step 4: The browser shows: The page shows Daily reading as a heading and Choose a short story. beneath it."
        ],
        "output": "The page shows Daily reading as a heading and Choose a short story. beneath it."
      },
      {
        "title": "A reading page",
        "environment": "browser",
        "language": "html",
        "code": "<header>\n<h1>Reading room</h1>\n<nav aria-label=\"Primary\"><a href=\"#tips\">Reading tips</a></nav>\n</header>\n<main>\n<section id=\"tips\">\n<h2>Reading tips</h2>\n<article>\n<h3>Start small</h3>\n<p>Read for ten minutes.</p>\n</article>\n</section>\n</main>\n<footer><p>New tips each week.</p></footer>",
        "walkthrough": [
          "Step 1: Open the page introduction, which acts as a page header landmark here.",
          "Step 2: Give the whole page one main heading.",
          "Step 3: Add a navigation landmark named Primary; its link points to the tips section.",
          "Step 4: Open the main content landmark.",
          "Step 5: Group the tips by theme and give the group a link target called tips.",
          "Step 6: Name the major section with a second-level heading.",
          "Step 7: Open a tip that can stand on its own.",
          "Step 8: Name this tip with a third-level heading.",
          "Step 9: Give the tip its short explanation.",
          "Step 10: Add the page footer and its weekly update message.",
          "Step 11: The browser shows: The page shows Reading room, a Reading tips link, a Reading tips heading, a Start small heading, its advice, and the footer message."
        ],
        "output": "The page shows Reading room, a Reading tips link, a Reading tips heading, a Start small heading, its advice, and the footer message."
      }
    ],
    "keyPoints": [
      "Choose elements by content meaning.",
      "Use div when no semantic element fits.",
      "Use one visible main area.",
      "Use one clear h1 and follow a sensible heading hierarchy.",
      "Article is self-contained; section groups a theme.",
      "Landmark meaning can depend on an element’s context."
    ],
    "commonMistakes": [
      "Using section only to add a background color gives it a job better suited to a general wrapper.",
      "Choosing h3 because its default text looks small breaks the heading hierarchy.",
      "Assuming every header is a page-level landmark ignores nested contexts."
    ],
    "links": [
      {
        "title": "Semantic HTML",
        "url": "https://web.dev/learn/html/semantic-html",
        "kind": "article",
        "language": "English",
        "why": "Explains how element meaning helps people navigate content."
      }
    ]
  },
  {
    "topicId": "hc-links-images-media",
    "summary": "Links connect pages, and images, video, and audio add other ways to share information. Clear labels and suitable alternatives keep that content usable.",
    "syntax": [
      {
        "title": "Link and image attributes",
        "language": "html",
        "code": "<a href=\"/destination\" target=\"_blank\" rel=\"noopener noreferrer\">Link text</a>\n<img src=\"image.jpg\" alt=\"Image description\" width=\"640\" height=\"360\">",
        "parts": [
          {
            "part": "<a",
            "meaning": "Creates a hyperlink when an href attribute is present."
          },
          {
            "part": "href=\"/destination\"",
            "meaning": "Sets the destination URL."
          },
          {
            "part": "target=\"_blank\"",
            "meaning": "Opens the destination in a new browsing context, usually a tab."
          },
          {
            "part": "rel=\"noopener noreferrer\"",
            "meaning": "Prevents opener access and omits referrer information."
          },
          {
            "part": "<img src=\"image.jpg\"",
            "meaning": "Embeds an image from the given URL."
          },
          {
            "part": "alt=\"Image description\"",
            "meaning": "Supplies a text alternative; use an empty value for a decorative image."
          },
          {
            "part": "width=\"640\"",
            "meaning": "Declares the image width in CSS pixels and helps reserve space."
          },
          {
            "part": "height=\"360\"",
            "meaning": "Declares the image height in CSS pixels and helps establish its aspect ratio."
          }
        ]
      },
      {
        "title": "Responsive image sources",
        "language": "html",
        "code": "<picture>\n  <source media=\"(min-width: 48rem)\" srcset=\"wide.jpg\">\n  <img src=\"image.jpg\" alt=\"Image description\">\n</picture>\n<img src=\"image.jpg\" alt=\"Image description\"\n     srcset=\"image-small.jpg 480w, image-large.jpg 960w\"\n     sizes=\"(min-width: 48rem) 50vw, 100vw\">",
        "parts": [
          {
            "part": "<picture>",
            "meaning": "Groups alternate image sources with a required fallback image."
          },
          {
            "part": "<source",
            "meaning": "Provides a candidate source for the following image."
          },
          {
            "part": "media=\"(min-width: 48rem)\"",
            "meaning": "Makes this source eligible when viewport width is at least 48 times the initial font size."
          },
          {
            "part": "srcset=\"wide.jpg\"",
            "meaning": "Supplies the image candidate for this source."
          },
          {
            "part": "<img src=\"image.jpg\" alt=\"Image description\">",
            "meaning": "Provides the fallback image URL and text alternative."
          },
          {
            "part": "srcset=\"image-small.jpg 480w, image-large.jpg 960w\"",
            "meaning": "Lists candidate URLs with their intrinsic pixel widths; each w descriptor must match its image."
          },
          {
            "part": "sizes=\"(min-width: 48rem) 50vw, 100vw\"",
            "meaning": "Declares half-viewport image width at the breakpoint, otherwise full-viewport width, to guide candidate selection."
          }
        ]
      },
      {
        "title": "Video with playback controls",
        "language": "html",
        "code": "<video controls>\n  <source src=\"video.mp4\" type=\"video/mp4\">\n  <track kind=\"captions\" src=\"captions.vtt\" srclang=\"en\" label=\"English\" default>\n  <a href=\"video.mp4\">Download video</a>\n</video>",
        "parts": [
          {
            "part": "<video controls>",
            "meaning": "Embeds video with browser playback controls."
          },
          {
            "part": "<source src=\"video.mp4\" type=\"video/mp4\">",
            "meaning": "Provides a video URL and its media type."
          },
          {
            "part": "<track kind=\"captions\"",
            "meaning": "Adds synchronized captions for speech and relevant sounds."
          },
          {
            "part": "src=\"captions.vtt\"",
            "meaning": "Points to the WebVTT caption file."
          },
          {
            "part": "srclang=\"en\"",
            "meaning": "Declares the caption language."
          },
          {
            "part": "label=\"English\"",
            "meaning": "Names the track in the language selection interface."
          },
          {
            "part": "default",
            "meaning": "Requests this track when user preferences do not select another."
          },
          {
            "part": "<a href=\"video.mp4\">Download video</a>",
            "meaning": "Provides a download link when the video element is unsupported."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Connect one place to another",
        "points": [
          "Think of a link as a sign pointing to a destination. An element is a piece of HTML; the a element makes a link when its href attribute gives a destination address.",
          "An attribute is a named detail in an opening tag. The href value can be a relative path, such as guide.html, which is resolved using the document’s base address.",
          "An absolute URL is a complete address, such as https://example.org/guide.html. A path beginning with / starts at the site root; a value beginning with # points within the current page."
        ]
      },
      {
        "heading": "Make links understandable",
        "points": [
          "Write link text that explains the destination, such as Read the guide. Like the sign in the comparison, the words should help someone decide where to go before they follow it.",
          "The target attribute chooses where to open the destination. With target=\"_blank\", the browser usually opens another tab; warn readers in the link text when opening a new tab matters.",
          "Use rel=\"noopener\" with target=\"_blank\" to prevent the opened page from accessing its opener through window.opener. Modern browsers already imply this protection for _blank, but writing it makes the intent clear."
        ]
      },
      {
        "heading": "Describe and size pictures",
        "points": [
          "The img element embeds an image using src, its source address. Its alt attribute supplies replacement text that communicates the image’s purpose when someone cannot see the picture.",
          "Use alt=\"\" for a purely decorative image so reading tools can ignore it. Describe useful information for meaningful images; avoid repeating nearby words without adding anything the reader needs.",
          "Give img width and height attributes matching the image’s proportions. They help reserve space before loading and reduce layout shift, which is the movement of surrounding content as resources arrive."
        ]
      },
      {
        "heading": "Offer suitable media",
        "points": [
          "Responsive images are images chosen for different viewing conditions: srcset lists image candidates, while picture groups source choices for conditions or formats. With width-based candidates, sizes describes the expected display width.",
          "Video and audio embed moving pictures and sound. Add controls so the browser offers playback buttons; the exact controls and their appearance depend on the browser and available media.",
          "Provide captions, meaning synchronized text for speech and relevant sounds, with video that needs them. Supply a transcript, a written equivalent, for audio; media files and caption files must actually exist to play."
        ]
      }
    ],
    "terms": [
      {
        "term": "relative path",
        "meaning": "A relative path is an address resolved using a base address."
      },
      {
        "term": "absolute URL",
        "meaning": "An absolute URL gives a complete address including its scheme and host."
      },
      {
        "term": "alt text",
        "meaning": "Alt text communicates an image’s purpose when the picture cannot be seen."
      },
      {
        "term": "layout shift",
        "meaning": "Layout shift is movement of visible content while a page is loading."
      },
      {
        "term": "responsive images",
        "meaning": "Responsive images let the browser choose image files for different viewing conditions."
      },
      {
        "term": "captions",
        "meaning": "Captions are synchronized text for speech and relevant sounds in media."
      }
    ],
    "examples": [
      {
        "title": "Jump to a paragraph",
        "environment": "browser",
        "language": "html",
        "code": "<a href=\"#note\">Read the note</a>\n<p id=\"note\">Bring a notebook.</p>",
        "walkthrough": [
          "Step 1: Create a link pointing to the element whose id is note.",
          "Step 2: Give the paragraph that id so the link has a destination.",
          "Step 3: The browser shows: A Read the note link appears above Bring a notebook.; following it targets that paragraph."
        ],
        "output": "A Read the note link appears above Bring a notebook.; following it targets that paragraph."
      },
      {
        "title": "An illustrated guide link",
        "environment": "browser",
        "language": "html",
        "code": "<p><a href=\"guide.html\">Read the local guide</a></p>\n<p><a href=\"https://example.org/\" target=\"_blank\" rel=\"noopener\">Visit the reference site (new tab)</a></p>\n<img src=\"data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27120%27%20height=%2760%27%3E%3Crect%20width=%27120%27%20height=%2760%27%20fill=%27blue%27/%3E%3C/svg%3E\" alt=\"A solid blue rectangle\" width=\"120\" height=\"60\">",
        "walkthrough": [
          "Step 1: Add a relative link to guide.html in the current directory.",
          "Step 2: Add an absolute link that requests a new tab and explicitly protects the opener.",
          "Step 3: Embed a complete image directly in the address, describe it with alt text, and reserve its 120 by 60 pixel size.",
          "Step 4: The browser shows: Two links appear in separate paragraphs, followed by a blue rectangle 120px wide and 60px high. The second link requests a new tab when followed."
        ],
        "output": "Two links appear in separate paragraphs, followed by a blue rectangle 120px wide and 60px high. The second link requests a new tab when followed."
      }
    ],
    "keyPoints": [
      "Use descriptive text for a href links.",
      "Relative paths depend on the base address.",
      "Use useful alt text or an empty alt for decoration.",
      "Image width and height help reserve space.",
      "Use controls for video and audio.",
      "Srcset and picture offer image choices."
    ],
    "commonMistakes": [
      "Leaving out alt gives reading tools no deliberate text alternative.",
      "Using a file path that does not exist produces a broken resource.",
      "Omitting playback controls can prevent people from controlling media."
    ],
    "links": [
      {
        "title": "Images",
        "url": "https://web.dev/learn/html/images",
        "kind": "article",
        "language": "English",
        "why": "Introduces image alternatives, dimensions, and image selection."
      }
    ]
  },
  {
    "topicId": "hc-forms",
    "summary": "Forms collect information and send it to a destination. Labels, suitable input types, and simple checks help people enter useful values.",
    "syntax": [
      {
        "title": "Form and required input",
        "language": "html",
        "code": "<form action=\"/submit\" method=\"post\">\n  <label for=\"field\">Field</label>\n  <input type=\"text\" name=\"field\" id=\"field\" required>\n  <button type=\"submit\">Submit</button>\n</form>",
        "parts": [
          {
            "part": "<form action=\"/submit\" method=\"post\">",
            "meaning": "Submits successful named controls to the given URL using an HTTP POST request."
          },
          {
            "part": "<label for=\"field\">",
            "meaning": "Associates the visible label with the control whose id is field."
          },
          {
            "part": "<input",
            "meaning": "Creates an input control."
          },
          {
            "part": "type=\"text\"",
            "meaning": "Selects a single-line text input."
          },
          {
            "part": "name=\"field\"",
            "meaning": "Sets the key used for the submitted value."
          },
          {
            "part": "id=\"field\"",
            "meaning": "Gives the control a unique document identifier for its label."
          },
          {
            "part": "required",
            "meaning": "Requires a nonempty value before normal form submission."
          },
          {
            "part": "<button type=\"submit\">",
            "meaning": "Creates a button that submits its form."
          }
        ]
      },
      {
        "title": "Selection and multiline controls",
        "language": "html",
        "code": "<form action=\"/submit\" method=\"post\">\n  <label for=\"choice\">Choice</label>\n  <select name=\"choice\" id=\"choice\">\n    <option value=\"option-value\">Option label</option>\n  </select>\n  <label for=\"message\">Message</label>\n  <textarea name=\"message\" id=\"message\" rows=\"4\" cols=\"40\"></textarea>\n  <button type=\"submit\">Submit</button>\n</form>",
        "parts": [
          {
            "part": "<form action=\"/submit\" method=\"post\">",
            "meaning": "Submits the named controls to the given URL using HTTP POST."
          },
          {
            "part": "<label for=\"choice\">",
            "meaning": "Labels the control with the matching id."
          },
          {
            "part": "<select name=\"choice\" id=\"choice\">",
            "meaning": "Creates a selection control with a submission key and unique label target."
          },
          {
            "part": "<option value=\"option-value\">Option label</option>",
            "meaning": "Defines a selectable label and the value sent when selected."
          },
          {
            "part": "<label for=\"message\">",
            "meaning": "Labels the textarea with the matching id."
          },
          {
            "part": "<textarea name=\"message\" id=\"message\"",
            "meaning": "Creates a multiline text control with a submission key and unique label target."
          },
          {
            "part": "rows=\"4\" cols=\"40\"",
            "meaning": "Requests a visible size of four lines and forty average character widths."
          },
          {
            "part": "<button type=\"submit\">",
            "meaning": "Submits the form."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Collect named answers",
        "points": [
          "Think of a form as a paper questionnaire with named answer boxes. The form element groups controls, which are fields and buttons a person can use to provide or send information.",
          "An attribute is a named setting inside an opening tag. An input uses the type attribute to choose its behavior, such as text for ordinary writing or email for an email address.",
          "The name attribute gives a field its submission key, meaning the label used for its value in sent data. A field without a name generally contributes no named value to that data."
        ]
      },
      {
        "heading": "Label and group fields",
        "points": [
          "A label supplies visible text explaining a field. Set label for to exactly match the input id, which is a unique identifier, so the browser connects the words and the control.",
          "Clicking a connected label can focus its field or activate a choice control. This connection also helps reading tools announce the right name, unlike placeholder text that disappears while someone types.",
          "A fieldset groups related controls, and its legend names that group. Like a heading above several paper answer boxes, the legend gives shared context for the fields that follow."
        ]
      },
      {
        "heading": "Choose types and checks",
        "points": [
          "Use number for numeric values, date for dates, checkbox for an independent choice, and radio for one choice in a group. Radio inputs share a name to form that group.",
          "Validation means checking whether a value follows rules. Required rejects an empty value for supported fields, while min and max set bounds for types such as number and date.",
          "Pattern supplies a regular expression, a text-matching rule, for supported text-like inputs. It must match the whole nonempty value; add required separately when an empty answer must also be rejected."
        ]
      },
      {
        "heading": "Send the answers",
        "points": [
          "A button with type=\"submit\" requests submission of its form. A button with type=\"button\" has no built-in submit action, so it needs separate behavior if it is meant to perform a task.",
          "On ordinary submission, the browser checks eligible fields first and blocks invalid entries. If they pass, action selects the destination and method selects how data travels, commonly GET or POST.",
          "GET places form data in the destination URL; POST sends it in the request body. The receiving server must check the values again because browser checks can be bypassed, and HTML alone does not save them."
        ]
      }
    ],
    "terms": [
      {
        "term": "control",
        "meaning": "A control is a field or button that a person can interact with."
      },
      {
        "term": "name",
        "meaning": "The name attribute supplies a field’s key in submitted data."
      },
      {
        "term": "label",
        "meaning": "A label provides a field’s visible description and can be connected to the field."
      },
      {
        "term": "fieldset",
        "meaning": "A fieldset groups related form controls under a legend."
      },
      {
        "term": "validation",
        "meaning": "Validation checks whether entered values follow stated rules."
      },
      {
        "term": "regular expression",
        "meaning": "A regular expression is a written rule for matching text."
      }
    ],
    "examples": [
      {
        "title": "A named text field",
        "environment": "browser",
        "language": "html",
        "code": "<form action=\"/search\" method=\"get\">\n<label for=\"query\">Search words</label>\n<input id=\"query\" name=\"q\" type=\"text\" required>\n<button type=\"submit\">Search</button>\n</form>",
        "walkthrough": [
          "Step 1: Group the search controls and choose GET submission to /search.",
          "Step 2: Connect Search words to the input whose id is query.",
          "Step 3: Create a required text field whose submitted key is q.",
          "Step 4: Add the button that submits the form after browser checks.",
          "Step 5: The browser shows: A Search words label, a text field, and a Search button appear. Empty submission is blocked; entering tea submits q=tea to /search."
        ],
        "output": "A Search words label, a text field, and a Search button appear. Empty submission is blocked; entering tea submits q=tea to /search."
      },
      {
        "title": "A small reservation form",
        "environment": "browser",
        "language": "html",
        "code": "<form action=\"/reserve\" method=\"post\">\n<fieldset>\n<legend>Reservation</legend>\n<label for=\"email\">Email</label>\n<input id=\"email\" name=\"email\" type=\"email\" required>\n<label for=\"seats\">Seats</label>\n<input id=\"seats\" name=\"seats\" type=\"number\" min=\"1\" max=\"4\" required>\n<label for=\"code\">Three-letter code</label>\n<input id=\"code\" name=\"code\" type=\"text\" pattern=\"[A-Za-z]{3}\" required>\n<button type=\"submit\">Reserve</button>\n<button type=\"button\">Help</button>\n</fieldset>\n</form>",
        "walkthrough": [
          "Step 1: Choose POST submission to /reserve for the grouped answers.",
          "Step 2: Group the related reservation controls.",
          "Step 3: Name the group Reservation.",
          "Step 4: Connect the Email label to the email field.",
          "Step 5: Require an email value in a browser-recognized email format.",
          "Step 6: Connect the Seats label to the seats field.",
          "Step 7: Require a numeric seat count from 1 through 4; the default number step is one.",
          "Step 8: Connect the code label to its field and show the requested format.",
          "Step 9: Require exactly three ASCII letters, uppercase or lowercase.",
          "Step 10: Add the submit button that runs the ordinary submission process.",
          "Step 11: Add a plain button that has no submit action or other behavior here.",
          "Step 12: The browser shows: A Reservation group shows Email, Seats, and Three-letter code fields plus Reserve and Help buttons. Invalid values block Reserve; Help does nothing in this HTML-only example."
        ],
        "output": "A Reservation group shows Email, Seats, and Three-letter code fields plus Reserve and Help buttons. Invalid values block Reserve; Help does nothing in this HTML-only example."
      }
    ],
    "keyPoints": [
      "Connect label for with a unique input id.",
      "Use name for each value that must be submitted.",
      "Choose appropriate input types and validation attributes.",
      "Use fieldset and legend for related controls.",
      "Write button types explicitly.",
      "The server must validate submitted values too."
    ],
    "commonMistakes": [
      "Using only placeholder text leaves a field without a persistent visible label.",
      "Omitting name can leave a field out of submitted data.",
      "Treating pattern as a replacement for required allows an empty value.",
      "Assuming HTML submission automatically stores data overlooks the receiving server."
    ],
    "links": [
      {
        "title": "Forms",
        "url": "https://web.dev/learn/html/forms",
        "kind": "article",
        "language": "English",
        "why": "Explains field labels, form controls, and submission basics."
      }
    ]
  },
  {
    "topicId": "hc-lists-tables",
    "summary": "Lists group related items. Tables connect values to row and column headings so readers can compare them.",
    "syntax": [
      {
        "title": "Unordered and ordered lists",
        "language": "html",
        "code": "<ul>\n  <li>Item text</li>\n</ul>\n<ol>\n  <li>Item text</li>\n</ol>",
        "parts": [
          {
            "part": "<ul>",
            "meaning": "Groups list items whose order is not significant."
          },
          {
            "part": "<li>",
            "meaning": "Defines one item in its containing list."
          },
          {
            "part": "<ol>",
            "meaning": "Groups list items whose order is significant."
          }
        ]
      },
      {
        "title": "Table with headers",
        "language": "html",
        "code": "<table>\n  <caption>Table title</caption>\n  <thead>\n    <tr><th scope=\"col\">Column label</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Cell value</td></tr>\n  </tbody>\n</table>",
        "parts": [
          {
            "part": "<table>",
            "meaning": "Groups tabular data into rows and cells."
          },
          {
            "part": "<caption>",
            "meaning": "Provides the table title."
          },
          {
            "part": "<thead>",
            "meaning": "Groups the header rows."
          },
          {
            "part": "<tr>",
            "meaning": "Defines a table row."
          },
          {
            "part": "<th scope=\"col\">",
            "meaning": "Defines a header cell."
          },
          {
            "part": "scope=\"col\"",
            "meaning": "Associates this header with cells in its column."
          },
          {
            "part": "<tbody>",
            "meaning": "Groups the table body rows."
          },
          {
            "part": "<td>",
            "meaning": "Defines a data cell."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Group related items",
        "points": [
          "A list groups items like a shopping list on paper. Use ul for an unordered list, where changing the item order does not change the meaning.",
          "Use ol for an ordered list, such as cooking steps where order matters. Put each item inside li, which means one list item in either kind.",
          "A description list pairs names with explanations: dl holds the list, dt holds a name, and dd holds its description. Use it for a small glossary."
        ]
      },
      {
        "heading": "Describe rows and columns",
        "points": [
          "A table arranges related data into rows and columns, like a small spreadsheet. Use table for the whole structure and caption for its visible, descriptive title.",
          "Use thead to group heading rows and tbody to group data rows. Each tr creates one row; th creates a heading cell, while td holds ordinary data.",
          "The scope attribute tells which cells a heading describes: col means its column, and row means its row. These relationships help screen readers explain simple tables."
        ]
      }
    ],
    "terms": [
      {
        "term": "unordered list",
        "meaning": "A ul list groups items whose order is not important."
      },
      {
        "term": "ordered list",
        "meaning": "An ol list groups items in a meaningful order."
      },
      {
        "term": "description list",
        "meaning": "A dl list associates names with descriptions."
      },
      {
        "term": "scope",
        "meaning": "This attribute identifies the cells described by a table heading."
      }
    ],
    "examples": [
      {
        "title": "A list and a small table",
        "environment": "browser",
        "language": "html",
        "code": "<ul><li>Apples</li><li>Pears</li></ul>\n<ol><li>Wash fruit</li><li>Slice fruit</li></ol>\n<table>\n  <caption>Fruit counts</caption>\n  <thead><tr><th scope=\"col\">Fruit</th><th scope=\"col\">Count</th></tr></thead>\n  <tbody><tr><th scope=\"row\">Apples</th><td>3</td></tr></tbody>\n</table>",
        "walkthrough": [
          "Step 1: Create a bulleted list containing Apples and Pears.",
          "Step 2: Create a numbered list containing Wash fruit and Slice fruit.",
          "Step 3: Start the table.",
          "Step 4: Give the table the visible title Fruit counts.",
          "Step 5: Create a heading row with Fruit and Count as column headings.",
          "Step 6: Create a data row with Apples as its row heading and 3 as its count.",
          "Step 7: Close the table.",
          "Step 8: The browser shows two bulleted items, two numbered steps, and a table titled Fruit counts with column headings Fruit and Count and one data row: Apples, 3."
        ],
        "output": "The browser shows two bulleted items, two numbered steps, and a table titled Fruit counts with column headings Fruit and Count and one data row: Apples, 3."
      }
    ],
    "keyPoints": [
      "Use li inside ul or ol.",
      "Use tables for related data.",
      "Give tables clear captions and headings.",
      "Use scope=\"col\" and scope=\"row\" for simple header relationships."
    ],
    "commonMistakes": [
      "Using tables to position unrelated page content makes the structure misleading.",
      "Using td for every cell loses heading information."
    ],
    "links": [
      {
        "title": "Tables",
        "url": "https://web.dev/learn/html/tables",
        "kind": "article",
        "language": "English",
        "why": "Shows table structure and heading relationships with small examples."
      }
    ]
  },
  {
    "topicId": "hc-html-accessibility",
    "summary": "Accessible HTML helps people read and use a page with different devices and abilities. Clear structure and built-in controls solve many common problems.",
    "syntax": [
      {
        "title": "Control labels and accessible names",
        "language": "html",
        "code": "<label for=\"search\">Search</label>\n<input type=\"search\" id=\"search\" name=\"query\">\n<button type=\"button\" aria-label=\"Close\">×</button>\n<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Section title</h2>\n</section>",
        "parts": [
          {
            "part": "<label for=\"search\">",
            "meaning": "Connects the visible label to the control with id search."
          },
          {
            "part": "type=\"search\"",
            "meaning": "Selects a single-line search input."
          },
          {
            "part": "id=\"search\"",
            "meaning": "Provides the unique target of the label association."
          },
          {
            "part": "name=\"query\"",
            "meaning": "Sets the submission key if the input belongs to a form."
          },
          {
            "part": "type=\"button\"",
            "meaning": "Prevents the button from submitting a form."
          },
          {
            "part": "aria-label=\"Close\"",
            "meaning": "Supplies an accessible name when visible button content does not describe its action."
          },
          {
            "part": "<section aria-labelledby=\"section-title\">",
            "meaning": "Names this section from the referenced heading, making it a region landmark."
          },
          {
            "part": "<h2 id=\"section-title\">",
            "meaning": "Provides a second-level heading and the unique target for the section name."
          }
        ]
      },
      {
        "title": "Landmark and focus targets",
        "language": "html",
        "code": "<div role=\"main\" tabindex=\"-1\">\n  <!-- main content -->\n</div>\n<div tabindex=\"0\">Focusable content</div>",
        "parts": [
          {
            "part": "role=\"main\"",
            "meaning": "Identifies the page main-content landmark; normally prefer the native main element."
          },
          {
            "part": "tabindex=\"-1\"",
            "meaning": "Allows programmatic focus while excluding this element from sequential keyboard navigation."
          },
          {
            "part": "tabindex=\"0\"",
            "meaning": "Includes this element in sequential focus order; it adds no keyboard interaction behavior."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start with usable content",
        "points": [
          "Think of a public building with clear signs, readable labels, and reachable doors. Accessibility means people with different abilities can use the page, including people who navigate without a mouse.",
          "An element is a piece of HTML content. Native elements are the built-in choices, such as button and input, that already provide useful behavior and information to browsers and assistive tools.",
          "A screen reader presents page information through speech or braille. It depends on meaningful structure and names, so a page that looks understandable can still be confusing when its HTML is poorly chosen."
        ]
      },
      {
        "heading": "Give the page a map",
        "points": [
          "Headings name topics and show their levels through h1 to h6. Use a clear main heading and sensible levels underneath it so readers can understand the content outline and jump between topics.",
          "Landmarks are page regions that assistive tools can offer for quick navigation. Main identifies central content and nav identifies major navigation; these are the page equivalent of the building’s signs.",
          "Give form fields visible labels and connect label for to input id. For images, alt supplies replacement text; use useful words for meaningful pictures and an empty alt for decoration."
        ]
      },
      {
        "heading": "Keep keyboard travel sensible",
        "points": [
          "Keyboard focus is the current destination for keyboard input, often marked with an outline. Pressing Tab usually moves between available links, buttons, and fields in their document order, subject to browser settings.",
          "Keep the HTML order logical and preserve visible focus indicators. Moving things around visually with CSS, the language for appearance, does not necessarily change the order in which keyboard users reach them.",
          "The tabindex attribute adjusts focus participation: tabindex=\"0\" includes an otherwise non-tabbable element in the normal Tab sequence. It does not add button behavior, a useful name, or keyboard activation."
        ]
      },
      {
        "heading": "Add extra meaning carefully",
        "points": [
          "Tabindex=\"-1\" excludes an element from the ordinary Tab sequence while allowing it to receive focus through other means. It is useful for destinations, but does not move focus there by itself.",
          "ARIA is a set of attributes that supplies accessibility information. Its first rule is to use a suitable native element first: a real button already supports keyboard activation without rebuilding that behavior.",
          "Aria-label supplies an accessible name, meaning the name assistive tools receive, on elements that support naming. Use it only when needed, keep it consistent with visible words, and prefer a visible label where practical."
        ]
      }
    ],
    "terms": [
      {
        "term": "accessibility",
        "meaning": "Accessibility means people with different abilities can use the content."
      },
      {
        "term": "native element",
        "meaning": "A native element is a built-in HTML element with its standard meaning and behavior."
      },
      {
        "term": "landmark",
        "meaning": "A landmark is a page region offered for navigation by assistive tools."
      },
      {
        "term": "keyboard focus",
        "meaning": "Keyboard focus identifies the element currently receiving keyboard input."
      },
      {
        "term": "ARIA",
        "meaning": "ARIA attributes supply accessibility information when HTML alone needs help expressing it."
      },
      {
        "term": "accessible name",
        "meaning": "An accessible name is the name assistive tools receive for an element."
      }
    ],
    "examples": [
      {
        "title": "A clear link name",
        "environment": "browser",
        "language": "html",
        "code": "<a href=\"#instructions\">Read instructions</a>\n<h1 id=\"instructions\">Instructions</h1>\n<p>Use the labeled fields below.</p>",
        "walkthrough": [
          "Step 1: Provide a link whose visible words describe its destination.",
          "Step 2: Add the main heading and give it the destination id.",
          "Step 3: Put the short instruction beneath its heading.",
          "Step 4: The browser shows: A Read instructions link appears above the Instructions heading and its text. The link is reachable with Tab in the usual keyboard configuration."
        ],
        "output": "A Read instructions link appears above the Instructions heading and its text. The link is reachable with Tab in the usual keyboard configuration."
      },
      {
        "title": "An accessible search area",
        "environment": "browser",
        "language": "html",
        "code": "<nav aria-label=\"Page\"><a href=\"#search-title\">Go to search</a></nav>\n<main>\n<h1 id=\"search-title\" tabindex=\"-1\">Search notes</h1>\n<form action=\"/search\" method=\"get\">\n<label for=\"search\">Search words</label>\n<input id=\"search\" name=\"q\" type=\"search\">\n<button type=\"submit\">Search</button>\n</form>\n</main>",
        "walkthrough": [
          "Step 1: Name the navigation region Page and provide a descriptive link to the search heading.",
          "Step 2: Identify the central content using its native landmark element.",
          "Step 3: Give the page its main heading; minus one allows focus without adding it to ordinary Tab stops.",
          "Step 4: Group the search controls and choose a GET destination.",
          "Step 5: Provide a visible label connected to the search field.",
          "Step 6: Use a native search field with the submitted name q.",
          "Step 7: Use a real submit button so keyboard activation is built in.",
          "Step 8: The browser shows: The page shows Go to search, the Search notes heading, a Search words field, and a Search button. Normal forward Tab order is link, field, button; the heading is skipped."
        ],
        "output": "The page shows Go to search, the Search notes heading, a Search words field, and a Search button. Normal forward Tab order is link, field, button; the heading is skipped."
      }
    ],
    "keyPoints": [
      "Prefer native HTML before adding ARIA.",
      "Use headings and landmarks to describe structure.",
      "Connect fields with visible labels and provide image alternatives.",
      "Keep document order and focus indicators usable.",
      "Tabindex 0 joins the normal sequence; -1 stays outside it.",
      "Aria-label names an element but does not implement behavior."
    ],
    "commonMistakes": [
      "Adding tabindex to a div does not turn it into a working button.",
      "Removing focus outlines without a visible replacement makes keyboard navigation difficult.",
      "Adding an aria-label that disagrees with visible text can confuse users."
    ],
    "links": [
      {
        "title": "Focus",
        "url": "https://web.dev/learn/html/focus",
        "kind": "article",
        "language": "English",
        "why": "Shows how built-in elements and tabindex affect keyboard navigation."
      }
    ]
  },
  {
    "topicId": "hc-selectors",
    "summary": "Selectors tell CSS which HTML elements to style. Combinators connect selectors so a rule can depend on where elements appear.",
    "syntax": [
      {
        "title": "Basic selectors and selector lists",
        "language": "css",
        "code": "p { /* declarations */ }\n.item { /* declarations */ }\n#content { /* declarations */ }\n[data-state=\"active\"] { /* declarations */ }\nh1, h2 { /* declarations */ }",
        "parts": [
          {
            "part": "p",
            "meaning": "Selects elements with this tag name."
          },
          {
            "part": "/* declarations */",
            "meaning": "Marks where property-value declarations belong inside each rule."
          },
          {
            "part": ".item",
            "meaning": "Selects elements whose class list contains item."
          },
          {
            "part": "#content",
            "meaning": "Selects the element whose id is content."
          },
          {
            "part": "[data-state=\"active\"]",
            "meaning": "Selects elements whose data-state attribute equals active."
          },
          {
            "part": "h1, h2",
            "meaning": "Applies the rule to either selector in the comma-separated list."
          }
        ]
      },
      {
        "title": "Relationship combinators",
        "language": "css",
        "code": ".parent .item { /* declarations */ }\n.parent > .item { /* declarations */ }\n.item + .sibling { /* declarations */ }\n.item ~ .sibling { /* declarations */ }",
        "parts": [
          {
            "part": ".parent .item",
            "meaning": "Selects item-class descendants at any depth within a parent-class element."
          },
          {
            "part": ".parent > .item",
            "meaning": "Selects item-class elements that are direct children of a parent-class element."
          },
          {
            "part": ".item + .sibling",
            "meaning": "Selects a sibling-class element immediately following an item-class element with the same parent."
          },
          {
            "part": ".item ~ .sibling",
            "meaning": "Selects sibling-class elements following an item-class element with the same parent."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Choose the pieces to style",
        "points": [
          "Think of choosing people from a seating chart: everyone wearing a badge, one named person, or the person beside someone else. A selector similarly chooses which HTML elements receive a style.",
          "CSS is the language for controlling appearance, and an element is a piece of HTML. A CSS rule combines a selector with declarations, which are property-and-value instructions inside braces, such as color: blue.",
          "A type selector uses an element name, such as p, to choose every paragraph. The universal selector, written *, matches any element, so use it when a shared rule truly belongs everywhere."
        ]
      },
      {
        "heading": "Match names and details",
        "points": [
          "A class is a reusable label in the HTML class attribute, a named detail on a tag. The class selector .notice matches elements whose class list includes notice, even alongside other classes.",
          "An id is an identifier that should be unique within a document. The selector #intro matches the element with id=\"intro\"; the dot and hash belong to CSS, not to the HTML values.",
          "An attribute selector matches the presence or value of an HTML attribute. For example, [disabled] finds elements carrying disabled, and [type=\"email\"] finds elements whose type value matches email."
        ]
      },
      {
        "heading": "Match family relationships",
        "points": [
          "A combinator is a symbol or space expressing a relationship between elements. In .card p, the space means descendant: a paragraph anywhere inside a card, even when another container sits between them.",
          "The child combinator > means one level down. In .card > p, the paragraph must belong directly to the card, which is its parent, rather than sit inside another nested container.",
          "Sibling elements share the same parent. The next-sibling combinator + matches the immediately following element sibling, so h2 + p selects the paragraph directly after a heading; intervening whitespace does not prevent matching."
        ]
      },
      {
        "heading": "Combine and inspect matches",
        "points": [
          "The subsequent-sibling combinator ~ matches later element siblings sharing that parent. The selector h2 ~ p can match several later paragraphs, while + can match only the immediately following element.",
          "A comma groups separate selectors that share declarations, as in h1, h2. Without the comma, h1 h2 means an h2 inside an h1, which expresses a completely different relationship.",
          "Return to the seating chart idea: labels match individual seats, while combinators inspect relationships. In the larger example, .card > p colors only the direct paragraph, and h2 + p underlines it too."
        ]
      }
    ],
    "terms": [
      {
        "term": "selector",
        "meaning": "A selector identifies which elements a CSS rule matches."
      },
      {
        "term": "declaration",
        "meaning": "A declaration assigns a value to a CSS property."
      },
      {
        "term": "class",
        "meaning": "A class is a reusable HTML label that a dot-prefixed selector can match."
      },
      {
        "term": "attribute selector",
        "meaning": "An attribute selector matches an HTML attribute’s presence or value."
      },
      {
        "term": "combinator",
        "meaning": "A combinator describes a relationship between elements in a selector."
      },
      {
        "term": "sibling",
        "meaning": "Sibling elements have the same parent element."
      }
    ],
    "examples": [
      {
        "title": "Match a class",
        "environment": "browser",
        "language": "css",
        "html": "<p class=\"notice\">Read this</p>\n<p>Other text</p>\n<div>End</div>",
        "code": ".notice {\n  color: blue;\n}",
        "walkthrough": [
          "Step 1: Select every element whose class list includes notice.",
          "Step 2: Set the selected element’s text color to blue.",
          "Step 3: The browser shows: Read this is blue; Other text stays the default text color."
        ],
        "output": "Read this is blue; Other text stays the default text color."
      },
      {
        "title": "Direct and nested paragraphs",
        "environment": "browser",
        "language": "css",
        "html": "<section class=\"card\">\n<h2>Reading</h2>\n<p>First tip</p>\n<div>\n<p class=\"note\">Second tip</p>\n</div>\n</section>",
        "code": ".card > p {\n  color: blue;\n}\n.card .note {\n  color: green;\n}\nh2 + p {\n  text-decoration: underline;\n}",
        "walkthrough": [
          "Step 1: Select paragraph children directly inside an element with class card.",
          "Step 2: Make those direct paragraphs blue.",
          "Step 3: Select elements with class note anywhere inside a card.",
          "Step 4: Make those note elements green.",
          "Step 5: Select paragraphs immediately following an h2 with the same parent.",
          "Step 6: Underline those paragraphs to show the sibling match.",
          "Step 7: The browser shows: The heading reads Reading. The First tip paragraph is blue and underlined; the nested Second tip paragraph is green and has no underline."
        ],
        "output": "The heading reads Reading. The First tip paragraph is blue and underlined; the nested Second tip paragraph is green and has no underline."
      }
    ],
    "keyPoints": [
      "Type selectors match tag names; * matches any element.",
      "Classes use a dot, and ids use a hash in CSS.",
      "Attribute selectors match attribute presence or values.",
      "A space matches descendants; > matches direct children.",
      "The + and ~ combinators match following siblings.",
      "A comma groups independent selectors."
    ],
    "commonMistakes": [
      "Writing .card p when only direct children are intended can style nested paragraphs.",
      "Forgetting a comma changes a selector list into a relationship.",
      "Putting a dot into the HTML class value prevents the intended class match."
    ],
    "links": [
      {
        "title": "Selectors",
        "url": "https://web.dev/learn/css/selectors",
        "kind": "article",
        "language": "English",
        "why": "Introduces matching elements before explaining their relationships."
      }
    ]
  },
  {
    "topicId": "hc-cascade-specificity",
    "summary": "The cascade chooses which CSS value wins when rules compete. Specificity and inheritance explain many results that otherwise seem surprising.",
    "syntax": [
      {
        "title": "Inline declarations",
        "language": "html",
        "code": "<p id=\"content\" class=\"text\" style=\"color: navy;\">\n  Text\n</p>",
        "parts": [
          {
            "part": "<p",
            "meaning": "Creates a paragraph, which can also match an element selector."
          },
          {
            "part": "id=\"content\"",
            "meaning": "Provides the target for an ID selector."
          },
          {
            "part": "class=\"text\"",
            "meaning": "Provides the target for a class selector."
          },
          {
            "part": "style=\"color: navy;\"",
            "meaning": "Sets a normal inline declaration, which outranks normal author stylesheet declarations."
          }
        ]
      },
      {
        "title": "Specificity, importance and inheritance",
        "language": "css",
        "code": "p { color: gray; }\n.text { color: blue; }\n#content { color: green; }\n.override { color: red !important; }\n.child { color: inherit; }",
        "parts": [
          {
            "part": "p",
            "meaning": "Has specificity 0-0-1, below class and ID selectors when earlier cascade criteria tie."
          },
          {
            "part": "color",
            "meaning": "Sets the text foreground color."
          },
          {
            "part": ".text",
            "meaning": "Has specificity 0-1-0, above element selectors and below ID selectors when earlier cascade criteria tie."
          },
          {
            "part": "#content",
            "meaning": "Has specificity 1-0-0, above class and element selectors when earlier cascade criteria tie."
          },
          {
            "part": ".override",
            "meaning": "Selects elements assigned the override class."
          },
          {
            "part": "!important",
            "meaning": "Makes this declaration important; importance is considered before specificity."
          },
          {
            "part": ".child",
            "meaning": "Selects elements assigned the child class."
          },
          {
            "part": "inherit",
            "meaning": "Uses the parent element computed value for this property."
          }
        ]
      },
      {
        "title": "Ordered cascade layers",
        "language": "css",
        "code": "@layer base, components;\n@layer base {\n  .text { color: gray; }\n}\n@layer components {\n  .text { color: navy; }\n}",
        "parts": [
          {
            "part": "@layer base, components;",
            "meaning": "Establishes layer order; later layers win for normal declarations, while important declarations reverse layer order."
          },
          {
            "part": "@layer base",
            "meaning": "Places enclosed rules in the base layer."
          },
          {
            "part": ".text",
            "meaning": "Selects elements assigned the text class."
          },
          {
            "part": "color",
            "meaning": "Sets the text foreground color."
          },
          {
            "part": "@layer components",
            "meaning": "Places enclosed rules in the later components layer."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Understand competing instructions",
        "points": [
          "Think of a noticeboard with instructions from different authorities. CSS, the language for page appearance, needs a way to choose when several instructions set the same property on the same element.",
          "A declaration is a property-and-value instruction, such as color: blue. The cascade is the ordered process that chooses a winning declaration; it does not simply choose whichever rule looks most detailed.",
          "Origin means where a style comes from: the browser, the user, or the page author. Importance is a priority category marked with !important; these categories are considered before selector specificity."
        ]
      },
      {
        "heading": "Compare the right priorities",
        "points": [
          "For ordinary declarations, author styles outrank user styles, which outrank browser defaults. For important declarations, that origin order reverses, allowing important user preferences to override important author rules.",
          "Specificity is the comparison of selector weights within otherwise tied priorities. An id selector contributes to the first count, classes and attributes to the second, and element names to the third.",
          "Compare counts from left to right, rather than adding a decimal score. The selector #intro has weight 1-0-0, while .card p has 0-1-1; an id therefore wins this comparison."
        ]
      },
      {
        "heading": "Handle ties and exceptions",
        "points": [
          "An inline style is a declaration inside an element’s style attribute. Ordinary inline author styles beat ordinary author stylesheet selectors; they are not an extra id, and an important declaration can outrank them.",
          "Source order means the order declarations appear. When earlier comparisons tie, the later declaration wins; a later low-weight selector does not automatically beat an earlier selector with greater specificity.",
          "Cascade layers are named groups of rules that establish another priority order before specificity. Animations and transitions also have priority rules, so selector counts alone cannot explain every possible CSS conflict."
        ]
      },
      {
        "heading": "Understand values passed down",
        "points": [
          "Inheritance is a child using its parent’s computed value when an inherited property has no winning declaration on that child. Computed value means the value resolved after the browser processes style rules.",
          "Text color normally inherits, while margin does not. The inherit keyword explicitly takes the parent’s computed value; initial instead uses the property’s specification default, which need not match the browser’s default stylesheet.",
          "On the noticeboard, first establish authority, then compare tied instructions. In the examples, equal selectors use source order, while the larger example shows an id winning and a child explicitly inheriting green."
        ]
      }
    ],
    "terms": [
      {
        "term": "cascade",
        "meaning": "The cascade is the ordered process for choosing a winning CSS declaration."
      },
      {
        "term": "origin",
        "meaning": "Origin identifies whether styles come from the browser, the user, or the page author."
      },
      {
        "term": "importance",
        "meaning": "Importance is a cascade priority marked by !important."
      },
      {
        "term": "specificity",
        "meaning": "Specificity compares selector weights after earlier cascade priorities tie."
      },
      {
        "term": "inheritance",
        "meaning": "Inheritance passes some computed property values from a parent to a child."
      },
      {
        "term": "cascade layer",
        "meaning": "A cascade layer groups rules into a priority order considered before specificity."
      }
    ],
    "examples": [
      {
        "title": "A source-order tie",
        "environment": "browser",
        "language": "css",
        "html": "<main>\n<p>First</p>\n<p>Second</p>\n</main>",
        "code": "p {\n  color: red;\n}\np {\n  color: blue;\n}",
        "walkthrough": [
          "Step 1: Select every paragraph for the first author rule.",
          "Step 2: Set red as its candidate text color.",
          "Step 3: Select the same paragraphs again with equal specificity.",
          "Step 4: Set blue later in source order, so blue wins the tie.",
          "Step 5: The browser shows: Both First and Second appear in blue."
        ],
        "output": "Both First and Second appear in blue."
      },
      {
        "title": "Specificity and inheritance together",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"panel\">\n<p id=\"message\" class=\"note\">Priority</p>\n<span>Passed down</span>\n</div>",
        "code": ".note {\n  color: red;\n}\n#message {\n  color: blue;\n}\n.panel {\n  color: green;\n}\n.panel span {\n  color: inherit;\n}",
        "walkthrough": [
          "Step 1: Match the paragraph with class note.",
          "Step 2: Offer red as its text color.",
          "Step 3: Match that same paragraph by its message id.",
          "Step 4: Choose blue because the id outweighs the class within these otherwise tied rules.",
          "Step 5: Match the panel container.",
          "Step 6: Give the container green text, which inherited properties can pass down.",
          "Step 7: Match spans inside the panel.",
          "Step 8: Explicitly take the parent’s computed color, which is green for this span.",
          "Step 9: The browser shows: Priority is blue because its id rule beats its class rule. Passed down is green because the span inherits the panel’s color."
        ],
        "output": "Priority is blue because its id rule beats its class rule. Passed down is green because the span inherits the panel’s color."
      }
    ],
    "keyPoints": [
      "Compare origin and importance before specificity.",
      "Selector weights compare ids, then classes and attributes, then element names.",
      "Ordinary inline author styles outrank ordinary author stylesheet rules.",
      "Source order breaks a tie after earlier comparisons.",
      "Some properties inherit; not all do.",
      "Inherit takes the parent value; initial takes the specification default."
    ],
    "commonMistakes": [
      "Treating !important as extra specificity confuses two different cascade stages.",
      "Adding specificity counts into one decimal number gives incorrect comparisons.",
      "Assuming initial always restores the browser’s default appearance overlooks browser stylesheet rules."
    ],
    "links": [
      {
        "title": "The cascade",
        "url": "https://web.dev/learn/css/the-cascade",
        "kind": "article",
        "language": "English",
        "why": "Explains why competing style declarations produce one final result."
      }
    ]
  },
  {
    "topicId": "hc-box-model",
    "summary": "The box model describes the space an element uses. Box-sizing determines whether a declared size includes its padding and border.",
    "syntax": [
      {
        "title": "Sizing and borders",
        "language": "css",
        "code": ".box {\n  box-sizing: border-box;\n  border: 1px solid currentColor;\n}",
        "parts": [
          {
            "part": ".box",
            "meaning": "Selects elements assigned the box class."
          },
          {
            "part": "box-sizing: border-box",
            "meaning": "Makes specified width and height include padding and borders, excluding margins."
          },
          {
            "part": "border: 1px solid currentColor",
            "meaning": "Sets all border widths, styles and colors using the element text color."
          }
        ]
      },
      {
        "title": "Padding shorthand lengths",
        "language": "css",
        "code": ".all { padding: 1rem; }\n.axes { padding: 1rem 2rem; }\n.three { padding: 1rem 2rem 3rem; }\n.four { padding: 1rem 2rem 3rem 4rem; }",
        "parts": [
          {
            "part": ".all",
            "meaning": "Names the class selector for the one-value form."
          },
          {
            "part": "padding: 1rem",
            "meaning": "Sets padding on all four sides; rem units use the root font size."
          },
          {
            "part": ".axes",
            "meaning": "Names the class selector for the two-value form."
          },
          {
            "part": "padding: 1rem 2rem",
            "meaning": "Sets vertical padding first, then horizontal padding."
          },
          {
            "part": ".three",
            "meaning": "Names the class selector for the three-value form."
          },
          {
            "part": "padding: 1rem 2rem 3rem",
            "meaning": "Sets top, horizontal and bottom padding, in that order."
          },
          {
            "part": ".four",
            "meaning": "Names the class selector for the four-value form."
          },
          {
            "part": "padding: 1rem 2rem 3rem 4rem",
            "meaning": "Sets top, right, bottom and left padding, in that order."
          }
        ]
      },
      {
        "title": "Margin shorthand lengths",
        "language": "css",
        "code": ".all { margin: 1rem; }\n.axes { margin: 1rem 2rem; }\n.three { margin: 1rem 2rem 3rem; }\n.four { margin: 1rem 2rem 3rem 4rem; }",
        "parts": [
          {
            "part": ".all",
            "meaning": "Names the class selector for the one-value form."
          },
          {
            "part": "margin: 1rem",
            "meaning": "Sets outer spacing on all four sides; rem units use the root font size."
          },
          {
            "part": ".axes",
            "meaning": "Names the class selector for the two-value form."
          },
          {
            "part": "margin: 1rem 2rem",
            "meaning": "Sets vertical margins first, then horizontal margins."
          },
          {
            "part": ".three",
            "meaning": "Names the class selector for the three-value form."
          },
          {
            "part": "margin: 1rem 2rem 3rem",
            "meaning": "Sets top, horizontal and bottom margins, in that order."
          },
          {
            "part": ".four",
            "meaning": "Names the class selector for the four-value form."
          },
          {
            "part": "margin: 1rem 2rem 3rem 4rem",
            "meaning": "Sets top, right, bottom and left margins, in that order."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Picture a wrapped box",
        "points": [
          "Think of a gift inside wrapping, a firm outer case, and space between packages. The CSS box model similarly separates content, padding, border, and margin when the browser lays out an element.",
          "Content is the inner area holding text or images. Padding is space between that content and its border; it gives the contents breathing room without adding another visible HTML element.",
          "A border is the edge around the padding, and margin is space outside that edge. Background color normally paints the content and padding and extends underneath the border, but never paints the margin."
        ]
      },
      {
        "heading": "Read the declared sizes",
        "points": [
          "CSS is the language for controlling appearance. Its width and height properties set sizes; px means CSS pixels, which are layout units and do not necessarily match individual physical screen pixels.",
          "Box-sizing is the property deciding which box those declared sizes describe. With content-box, the initial value, width and height describe only the content, and padding and borders increase the outer dimensions.",
          "For width: 200px, padding: 10px, and border: 2px solid, content-box gives a border-to-border width of 224px. Add both sides: 200 plus 20 of padding plus 4 of border."
        ]
      },
      {
        "heading": "Include the wrapping",
        "points": [
          "With box-sizing: border-box, declared width includes content, padding, and border. The same 200px width, 10px padding, and 2px border leave a content width of 176px, assuming no other size constraints.",
          "Margin stays outside both sizing choices, so border-box does not include margin. A 200px border box with 10px left and right margins needs 220px across when those horizontal margins remain fixed.",
          "The gift comparison connects directly to the code: border-box measures the wrapped package, while content-box measures its contents. Neither measurement includes the gap left between neighboring packages."
        ]
      },
      {
        "heading": "Check spacing and height",
        "points": [
          "Margin collapsing means some touching vertical margins of ordinary block boxes combine into one margin. Two positive adjoining margins of 20px and 12px commonly make a 20px gap, rather than 32px.",
          "Collapsing can also occur between parents and children under specific conditions; horizontal margins do not collapse. Flex and grid containers, which arrange children with different layout systems, prevent this collapsing between their items.",
          "Let height grow with content when possible, since a fixed height can leave text outside its box. Ordinary inline text boxes do not use width and height like block boxes, so begin size calculations with block examples."
        ]
      }
    ],
    "terms": [
      {
        "term": "content",
        "meaning": "Content is the inner area holding an element’s text or images."
      },
      {
        "term": "padding",
        "meaning": "Padding is space inside the border around the content."
      },
      {
        "term": "border",
        "meaning": "A border is the edge drawn around content and padding."
      },
      {
        "term": "margin",
        "meaning": "Margin is space outside an element’s border."
      },
      {
        "term": "box-sizing",
        "meaning": "Box-sizing decides whether declared dimensions measure the content or the border box."
      },
      {
        "term": "margin collapsing",
        "meaning": "Margin collapsing combines certain adjoining vertical block margins into one margin."
      }
    ],
    "examples": [
      {
        "title": "A content-sized box",
        "environment": "browser",
        "language": "css",
        "html": "<main>\n<div class=\"box\">Hello</div>\n</main>",
        "code": ".box {\n  box-sizing: content-box;\n  width: 200px;\n  height: 40px;\n  padding: 10px;\n  border: 2px solid black;\n}",
        "walkthrough": [
          "Step 1: Select the element with class box.",
          "Step 2: Make width and height measure the content alone.",
          "Step 3: Set the content width to 200 CSS pixels.",
          "Step 4: Set the content height to 40 CSS pixels.",
          "Step 5: Add 10px of space on each of the four inner sides.",
          "Step 6: Add a solid black 2px border on each side.",
          "Step 7: The browser shows: A black-bordered box contains Hello. Its content is 200px by 40px, and its border-to-border size is 224px by 64px."
        ],
        "output": "A black-bordered box contains Hello. Its content is 200px by 40px, and its border-to-border size is 224px by 64px."
      },
      {
        "title": "Two border-sized cards",
        "environment": "browser",
        "language": "css",
        "html": "<main>\n<div class=\"card first\">First</div>\n<div class=\"card second\">Second</div>\n</main>",
        "code": ".card {\n  box-sizing: border-box;\n  width: 220px;\n  height: 80px;\n  padding: 10px;\n  border: 2px solid black;\n  margin: 0;\n}\n.first {\n  margin-bottom: 20px;\n}\n.second {\n  margin-top: 12px;\n}",
        "walkthrough": [
          "Step 1: Select both cards to give them shared dimensions.",
          "Step 2: Include padding and border in each declared size.",
          "Step 3: Set each border-to-border width to 220px.",
          "Step 4: Set each border-to-border height to 80px.",
          "Step 5: Reserve 10px of inner space on all sides.",
          "Step 6: Draw a 2px solid black border around each card.",
          "Step 7: Remove all other margins to make the gap calculation clear.",
          "Step 8: Select the first card for its lower spacing.",
          "Step 9: Set its bottom margin to 20px.",
          "Step 10: Select the second card for its upper spacing.",
          "Step 11: Set its top margin to 12px; it collapses with the preceding 20px margin.",
          "Step 12: The browser shows: Two black-bordered cards read First and Second. Each is 220px by 80px with 196px by 56px of content space; the gap between their borders is 20px."
        ],
        "output": "Two black-bordered cards read First and Second. Each is 220px by 80px with 196px by 56px of content space; the gap between their borders is 20px."
      }
    ],
    "keyPoints": [
      "The layers are content, padding, border, and margin.",
      "Content-box adds padding and border outside declared dimensions.",
      "Border-box includes padding and border in declared dimensions.",
      "Margin is outside both sizing modes.",
      "Certain vertical block margins collapse; horizontal margins do not.",
      "Fixed heights can let growing content overflow."
    ],
    "commonMistakes": [
      "Adding margin into a border-box width gives the wrong border-to-border measurement.",
      "Adding two adjoining positive vertical margins can overestimate the actual gap.",
      "Setting fixed heights without checking longer text can cause overflow."
    ],
    "links": [
      {
        "title": "Box Model",
        "url": "https://web.dev/learn/css/box-model",
        "kind": "article",
        "language": "English",
        "why": "Builds box dimensions from a simple layered-box comparison."
      }
    ]
  },
  {
    "topicId": "hc-units",
    "summary": "CSS units tell the browser how to measure sizes. Choose a unit based on what the size should follow.",
    "explanation": [
      {
        "heading": "Start with a ruler",
        "points": [
          "A unit tells the browser what a number measures. Think of choosing a ruler: sometimes you need a fixed mark, and sometimes you need half of the shelf available.",
          "A CSS pixel, written px, is a standard screen measurement used by styles. It is not always one physical screen dot, because screen density and browser zoom can change that relationship.",
          "Use px for small details such as a thin border, the line around a box. Browser zoom still enlarges these details, so pixel sizes are not immune to user settings.",
          "A relative unit takes its size from something else. Before choosing one, ask whether the measurement should follow text, a surrounding box, or the visible page area."
        ]
      },
      {
        "heading": "Follow the text size",
        "points": [
          "The rem unit follows the font size of the root element, the outer html element. When that size is 16px, 2rem means 32px regardless of how deeply the element sits.",
          "The em unit follows a font size too. For font-size itself, it uses the parent font size; for padding, the space inside a box, it uses the element’s own font size.",
          "If a parent has 20px text, a child with font-size: 1.5em gets 30px text. Giving that child padding: 1em then adds 30px of space on each side.",
          "Use rem for a consistent text and spacing scale across a page. Use em when a small part, such as a button’s inner space, should grow with its own text."
        ]
      },
      {
        "heading": "Follow a box or screen",
        "points": [
          "A percentage, written %, needs a reference that depends on the property. In an ordinary block layout, width: 50% uses half the content width of its surrounding reference box.",
          "Do not assume percentage height works like percentage width. A height percentage usually needs a definite reference height; an ordinary parent whose height follows its content often cannot provide that.",
          "The viewport is the browser area used to show the page. One vw is one hundredth of its width; 50vw therefore measures half that width rather than half a parent.",
          "One vh is one hundredth of the large viewport height, based on retracted browser controls. One dvh follows the dynamic viewport height, which can change as mobile controls appear or disappear."
        ]
      },
      {
        "heading": "Choose for the job",
        "points": [
          "Use percentages for boxes that follow their surrounding space. This is the shelf comparison in code: a 50% child in a 300px content area gets a 150px width.",
          "Use min-height: 100dvh when a page section should reach the current viewport height while still growing for content. Expect its size to adjust when browser controls change."
        ]
      }
    ],
    "terms": [
      {
        "term": "CSS pixel",
        "meaning": "A CSS pixel is a standard layout measurement that can cover several physical screen dots."
      },
      {
        "term": "relative unit",
        "meaning": "A relative unit calculates its size from another measurement."
      },
      {
        "term": "root element",
        "meaning": "The root element is the outer html element of the document."
      },
      {
        "term": "padding",
        "meaning": "Padding is the space between content and the edge of its box."
      },
      {
        "term": "percentage",
        "meaning": "A percentage describes a share of a reference chosen by the property."
      },
      {
        "term": "viewport",
        "meaning": "The viewport is the browser area used to display the page."
      }
    ],
    "examples": [
      {
        "title": "Two root-sized steps",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"sample\">\n  Root-sized text\n</div>",
        "code": "html { font-size: 16px; }\n.sample { font-size: 2rem; }",
        "walkthrough": [
          "Step 1: Set the root text size to 16px so the calculation has a known starting point.",
          "Step 2: Set the sample text to twice the root size, giving 32px.",
          "Step 3: The browser shows: The sample text has a computed font size of 32px."
        ],
        "output": "The sample text has a computed font size of 32px."
      },
      {
        "title": "A flexible card",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"shelf\">\n  <div class=\"card\">Notes</div>\n</div>",
        "code": "html { font-size: 16px; }\n.shelf { width: 300px; }\n.card { box-sizing: border-box; width: 50%; font-size: 1.25rem; padding: 1em; }",
        "walkthrough": [
          "Step 1: Set the root size to 16px to make rem predictable in this demonstration.",
          "Step 2: Give the shelf a 300px content width to act as the percentage reference.",
          "Step 3: Include padding in the width, take half the shelf width, set 20px text, and add 20px padding on each side.",
          "Step 4: The browser shows: The card is 150px wide including its padding, with 20px text and 20px padding on each side."
        ],
        "output": "The card is 150px wide including its padding, with 20px text and 20px padding on each side."
      }
    ],
    "keyPoints": [
      "px is a CSS measurement, not necessarily one screen dot.",
      "rem follows the root font size.",
      "em uses the parent size for font-size and the element size for padding.",
      "Percentages depend on the property’s reference.",
      "vw follows viewport width; vh uses large height; dvh follows dynamic height."
    ],
    "commonMistakes": [
      "Assuming 50% always refers to the viewport gives incorrect sizes.",
      "Nesting em font sizes can multiply text sizes unexpectedly.",
      "Using a fixed height for growing text can make content spill outside its box."
    ],
    "links": [
      {
        "title": "Sizing Units",
        "url": "https://web.dev/learn/css/sizing",
        "kind": "article",
        "language": "English",
        "why": "Introduces measurements with small examples and visual explanations."
      }
    ]
  },
  {
    "topicId": "hc-display",
    "summary": "The display property controls how a box joins the page layout. Different hiding methods also affect space, interaction, and reading tools.",
    "syntax": [
      {
        "title": "Display and visibility values",
        "language": "css",
        "code": ".block { display: block; }\n.inline { display: inline; }\n.inline-block { display: inline-block; }\n.removed { display: none; }\n.invisible { visibility: hidden; }",
        "parts": [
          {
            "part": ".block { display: block; }",
            "meaning": "Selects the block class and gives it block-level outer display."
          },
          {
            "part": ".inline { display: inline; }",
            "meaning": "Selects the inline class and lays it out inline with surrounding text."
          },
          {
            "part": ".inline-block { display: inline-block; }",
            "meaning": "Selects the inline-block class and creates an inline-level box that accepts width and height."
          },
          {
            "part": ".removed { display: none; }",
            "meaning": "Selects the removed class and generates no boxes for it or its descendants."
          },
          {
            "part": ".invisible { visibility: hidden; }",
            "meaning": "Selects the invisible class and hides its boxes while preserving their layout space."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Boxes on a page",
        "points": [
          "Think of a page as a shelf holding boxes and labels. The display property chooses whether an element, one piece of HTML, behaves like a separate box or a label within a line.",
          "Normal flow is the browser’s usual arrangement of content before special placement rules. In normal flow, block boxes stack in the page’s block direction, usually from top to bottom.",
          "With display: block, a box starts on a new line in ordinary text layout. Its automatic width normally fills the available width, though an explicit width can make it narrower."
        ]
      },
      {
        "heading": "Share a line",
        "points": [
          "With display: inline, ordinary text content shares a line with surrounding words. A span is a common HTML wrapper for such text, and it can wrap across several lines.",
          "For an ordinary non-replaced inline box, such as a text span, width and height do not set its size. Replaced elements, such as images with their own dimensions, follow different sizing rules.",
          "With display: inline-block, a box sits within a line but accepts width and height. This is like placing a small rigid box among the shelf labels instead of stretching a paper label.",
          "Spaces between inline-block elements in the HTML can produce visible gaps. Their default vertical alignment follows the text baseline, the line on which most letters sit, rather than automatically aligning their tops."
        ]
      },
      {
        "heading": "Choose what hiding means",
        "points": [
          "With display: none, the element and its descendants generate no layout boxes. Descendants are the elements inside it, and nearby content moves into the space that those boxes would have occupied.",
          "With visibility: hidden, the box keeps its layout space but is not painted. A descendant can explicitly use visibility: visible, so hiding an outer box does not forbid every visible inner box.",
          "Opacity means how opaque the painted result is. With opacity: 0, the element and its contents look transparent, but the box still occupies space and can still receive pointer input.",
          "Opacity also does not automatically remove a control from keyboard navigation. A transparent button may still receive focus, meaning it becomes the current target for keyboard actions, despite being invisible."
        ]
      },
      {
        "heading": "Remember reading tools",
        "points": [
          "The accessibility tree is the browser’s structured view of content for assistive tools. Screen readers use this information to announce text and controls rather than simply reading visible pixels.",
          "In normal use, display: none removes an element and its descendants from that tree. Visibility: hidden also hides that content from screen readers, while a descendant made visible can be exposed.",
          "Opacity: 0 alone generally leaves content available to screen readers. Hidden text referenced as a control’s accessible name or description can still contribute that information, so those references are a special case."
        ]
      }
    ],
    "terms": [
      {
        "term": "display",
        "meaning": "Display controls the kind of layout box an element generates."
      },
      {
        "term": "normal flow",
        "meaning": "Normal flow is the browser’s usual arrangement of page content."
      },
      {
        "term": "inline-block",
        "meaning": "An inline-block box shares a line while allowing explicit width and height."
      },
      {
        "term": "visibility",
        "meaning": "Visibility controls whether a box is painted while normally preserving its space."
      },
      {
        "term": "opacity",
        "meaning": "Opacity controls how opaque the painted element and its contents are."
      },
      {
        "term": "accessibility tree",
        "meaning": "The accessibility tree holds the content and controls exposed to assistive tools."
      }
    ],
    "examples": [
      {
        "title": "A box in a sentence",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  Label <span class=\"badge\">New</span> text\n</div>",
        "code": ".badge { display: inline-block; width: 60px; height: 24px; background: gold; }",
        "walkthrough": [
          "Step 1: Make the badge a sized box that stays in the surrounding text line, and color its background gold.",
          "Step 2: The browser shows: A gold badge with a 60px content width and 24px content height sits between Label and text."
        ],
        "output": "A gold badge with a 60px content width and 24px content height sits between Label and text."
      },
      {
        "title": "Three ways to hide",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"row\">\n  <span>Start</span><span class=\"removed\">Removed</span><span class=\"hidden\">Hidden</span><span class=\"transparent\">Transparent</span><span>End</span>\n</div>",
        "code": ".row { display: flex; }\n.row span { width: 80px; height: 24px; flex-shrink: 0; }\n.removed { display: none; }\n.hidden { visibility: hidden; }\n.transparent { opacity: 0; }",
        "walkthrough": [
          "Step 1: Put the spans into a row so the preserved spaces are easy to compare.",
          "Step 2: Give each participating span an 80px width and 24px height, preventing shrinking.",
          "Step 3: Remove the Removed box entirely, including its layout space.",
          "Step 4: Hide Hidden while keeping its 80px slot.",
          "Step 5: Make Transparent invisible while preserving its 80px slot and ordinary accessibility exposure.",
          "Step 6: The browser shows: Start and End are visible. Four 80px boxes would sit side by side across 320px: the two middle ones (hidden and transparent) are invisible but keep their space, and Removed takes no space at all."
        ],
        "output": "Start and End are visible. Four 80px boxes would sit side by side across 320px: the two middle ones (hidden and transparent) are invisible but keep their space, and Removed takes no space at all."
      }
    ],
    "keyPoints": [
      "block normally starts a new line; inline shares text lines.",
      "inline-block accepts explicit width and height.",
      "display: none removes layout space and normal screen-reader exposure.",
      "visibility: hidden preserves space but normally hides content from screen readers.",
      "opacity: 0 preserves space, accessibility exposure, and possible interaction."
    ],
    "commonMistakes": [
      "Using opacity: 0 to disable a control can leave an invisible interactive target.",
      "Setting width on an ordinary text span with display: inline does not size it.",
      "Assuming visibility: hidden closes a layout gap confuses painting with layout."
    ],
    "links": [
      {
        "title": "Box Model",
        "url": "https://web.dev/learn/css/box-model",
        "kind": "article",
        "language": "English",
        "why": "Explains the box behavior behind block, inline, and inline-block."
      }
    ]
  },
  {
    "topicId": "hc-positioning",
    "summary": "Positioning changes where an element is placed and whether it keeps its usual space. The right choice lets you attach a badge, pin a control, or keep a heading nearby while scrolling.",
    "syntax": [
      {
        "title": "Relative parent and absolute child",
        "language": "css",
        "code": ".container { position: relative; }\n.container > .positioned {\n  position: absolute;\n  top: 1rem;\n  right: 2rem;\n  bottom: 3rem;\n  left: 4rem;\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects the containing element by class."
          },
          {
            "part": "position: relative",
            "meaning": "Keeps the element in normal flow and establishes a containing block for absolutely positioned descendants."
          },
          {
            "part": ".container > .positioned",
            "meaning": "Selects a positioned-class element directly inside a container-class element."
          },
          {
            "part": "position: absolute",
            "meaning": "Removes the element from normal flow and positions it against its absolute-positioning containing block."
          },
          {
            "part": "top: 1rem",
            "meaning": "Sets the top inset relative to the containing block."
          },
          {
            "part": "right: 2rem",
            "meaning": "Sets the right inset relative to the containing block."
          },
          {
            "part": "bottom: 3rem",
            "meaning": "Sets the bottom inset relative to the containing block."
          },
          {
            "part": "left: 4rem",
            "meaning": "Sets the left inset relative to the containing block."
          }
        ]
      },
      {
        "title": "Fixed insets and sticky threshold",
        "language": "css",
        "code": ".fixed {\n  position: fixed;\n  inset: 1rem 2rem 3rem 4rem;\n}\n.sticky {\n  position: sticky;\n  top: 0;\n}",
        "parts": [
          {
            "part": ".fixed",
            "meaning": "Selects elements assigned the fixed class."
          },
          {
            "part": "position: fixed",
            "meaning": "Removes the element from flow and positions it against its fixed-positioning containing block, usually the viewport."
          },
          {
            "part": "inset: 1rem 2rem 3rem 4rem",
            "meaning": "Sets top, right, bottom and left offsets, in that order."
          },
          {
            "part": ".sticky",
            "meaning": "Selects elements assigned the sticky class."
          },
          {
            "part": "position: sticky",
            "meaning": "Keeps normal-flow space while adjusting position within its containing block relative to the nearest scrollport."
          },
          {
            "part": "top: 0",
            "meaning": "Sets the top sticky inset to zero."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start from the usual place",
        "points": [
          "Imagine people standing in a queue. Normal flow is the browser’s usual placement of boxes, like each person keeping a place before anyone steps aside or moves closer to the front.",
          "The position property chooses a placement method. Its default value, static, keeps the ordinary arrangement; top, right, bottom, and left do not move a statically positioned element.",
          "An offset is a distance used to adjust placement. Top, right, bottom, and left are physical offset properties, so their names refer to actual screen sides rather than the text’s reading direction.",
          "With position: relative, the element keeps its place in normal flow but can be drawn elsewhere. Top: 10px moves it down, and left: 10px moves it right from that original place."
        ]
      },
      {
        "heading": "Attach a small piece",
        "points": [
          "With position: absolute, an element leaves normal flow. Other boxes do not reserve space for it, just as a person leaving the queue no longer determines where everyone else stands.",
          "A containing block is the reference rectangle used for an element’s placement and some sizes. For an absolute element, the nearest ancestor with non-static positioning usually provides this rectangle.",
          "An ancestor is any surrounding element above another in the HTML structure. Setting position: relative on a card commonly makes that card the reference for an absolute badge inside it.",
          "The reference normally includes that ancestor’s padding area, its inner space around content. With no qualifying ancestor, absolute placement uses an initial reference rectangle based on the page’s initial viewport."
        ]
      },
      {
        "heading": "Handle scrolling",
        "points": [
          "The viewport is the browser area displaying the page. Position: fixed normally anchors an element to this area, so the element stays there when the document scrolls and reserves no normal-flow space.",
          "A transform is a visual change such as moving or rotating a box. A transformed ancestor can supply the containing block for fixed descendants, so fixed does not always mean attached to the viewport.",
          "With position: sticky, an element keeps its normal-flow space and can remain near a scroll container’s edge. A scroll container is a box whose content has a scrolling mechanism.",
          "Use a non-auto offset such as top: 0 to request vertical sticking. The element stays constrained by its containing block, so it stops sticking when that surrounding area reaches its limit."
        ]
      },
      {
        "heading": "Choose and debug",
        "points": [
          "Return to the queue comparison when debugging overlap: relative keeps an original place, while absolute and fixed do not. An absolute child alone therefore does not give its parent a content height.",
          "If sticky fails, inspect surrounding overflow rules, which control content spilling outside a box. An ancestor with overflow: hidden or auto may become the scrolling reference even when it barely scrolls."
        ]
      }
    ],
    "terms": [
      {
        "term": "normal flow",
        "meaning": "Normal flow is the browser’s usual arrangement of boxes."
      },
      {
        "term": "offset",
        "meaning": "An offset is a distance that adjusts a positioned box."
      },
      {
        "term": "containing block",
        "meaning": "A containing block is the reference rectangle used for placement and some sizes."
      },
      {
        "term": "ancestor",
        "meaning": "An ancestor is a surrounding element above another in the HTML structure."
      },
      {
        "term": "viewport",
        "meaning": "The viewport is the browser area displaying the page."
      },
      {
        "term": "scroll container",
        "meaning": "A scroll container is a box with a mechanism for scrolling its content."
      }
    ],
    "examples": [
      {
        "title": "Move without losing a place",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"queue\">\n  <div class=\"first\">First</div><div class=\"second\">Second</div>\n</div>",
        "code": ".queue div { height: 20px; }\n.first { position: relative; top: 8px; }",
        "walkthrough": [
          "Step 1: Give both boxes a 20px height so their original places are measurable.",
          "Step 2: Draw First 8px below its original place while preserving that place for layout.",
          "Step 3: The browser shows: First is drawn 8px lower; Second still begins 20px below the queue’s top, producing 8px of box overlap."
        ],
        "output": "First is drawn 8px lower; Second still begins 20px below the queue’s top, producing 8px of box overlap."
      },
      {
        "title": "Attach a card badge",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"card\">\n  Notes\n  <span class=\"badge\">New</span>\n</div>",
        "code": ".card { position: relative; width: 240px; height: 100px; background: beige; }\n.badge { position: absolute; top: 8px; right: 8px; width: 40px; height: 20px; background: gold; }",
        "walkthrough": [
          "Step 1: Give the card a visible size and make it the reference for its absolute child.",
          "Step 2: Take the badge out of normal flow and place its 40px by 20px box 8px from the card’s top and right edges.",
          "Step 3: The browser shows: A gold 40px by 20px badge appears inside the beige card, 8px from its top and right edges."
        ],
        "output": "A gold 40px by 20px badge appears inside the beige card, 8px from its top and right edges."
      }
    ],
    "keyPoints": [
      "static is the default and ignores the four placement offsets.",
      "relative keeps its original layout space.",
      "absolute and fixed leave normal flow.",
      "Find the containing block before interpreting offsets.",
      "fixed usually follows the viewport; transformed ancestors can change this.",
      "sticky needs a suitable offset and room within its containing block."
    ],
    "commonMistakes": [
      "Forgetting position: relative on a card can attach its badge to a different reference.",
      "Using absolute children alone can leave a parent with no content height.",
      "Expecting sticky to work without an offset misses the sticking threshold."
    ],
    "links": [
      {
        "title": "Layout",
        "url": "https://web.dev/learn/css/layout",
        "kind": "article",
        "language": "English",
        "why": "Introduces placement methods with short code examples."
      }
    ]
  },
  {
    "topicId": "hc-z-index-stacking",
    "summary": "The z-index property helps choose which overlapping box appears in front. Stacking contexts group layers, so a child’s number is not compared with every box on the page.",
    "syntax": [
      {
        "title": "Positioned stacking level",
        "language": "css",
        "code": ".layer {\n  position: relative;\n  z-index: 10;\n}",
        "parts": [
          {
            "part": ".layer",
            "meaning": "Selects elements assigned the layer class."
          },
          {
            "part": "position: relative",
            "meaning": "Makes the element positioned without removing it from normal flow."
          },
          {
            "part": "z-index: 10",
            "meaning": "Creates a stacking context at level ten within its parent stacking context."
          }
        ]
      },
      {
        "title": "Isolated stacking context",
        "language": "css",
        "code": ".container {\n  isolation: isolate;\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "isolation: isolate",
            "meaning": "Creates a stacking context that groups descendant stacking independently of outside elements."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Picture separate folders",
        "points": [
          "Imagine transparent folders holding paper cards. Cards inside one folder have their own order, but lifting one card does not move its whole folder above another folder resting on top.",
          "Stacking order is the front-to-back order in which boxes are painted. It matters only where boxes overlap, so a higher layer number does not move a box across the page.",
          "The z-index property supplies a layer number for positioned boxes and for flex or grid items. Positioned means the position property is relative, absolute, fixed, or sticky rather than its default, static.",
          "Flex and grid items are direct children participating in those layout systems. They can use z-index without non-static positioning; an ordinary static box does not gain that ability just from a number."
        ]
      },
      {
        "heading": "Understand a local group",
        "points": [
          "A stacking context is a group whose internal layers are treated as one unit in an outer group. The document’s root element, the outer html element, starts the outermost stacking context.",
          "For relative or absolute positioning, an integer z-index creates a new stacking context. An integer is a whole number, such as 0 or 2; auto does not create that context by itself.",
          "Position: fixed and position: sticky create stacking contexts even with z-index: auto. A flex or grid item also creates one when its z-index is an integer rather than auto."
        ]
      },
      {
        "heading": "Spot other group makers",
        "points": [
          "Opacity controls how opaque a painted element and its contents appear. Any opacity value below 1 creates a stacking context, even a nearly solid value such as 0.99.",
          "A transform is a visual change such as moving, scaling, or rotating a box. A transform value other than none creates a context, even when the chosen transform leaves its visible position unchanged.",
          "A descendant is an element nested inside another. A descendant with z-index: 999 cannot escape its ancestor’s stacking context to overtake a sibling context that is ordered above that ancestor.",
          "This is the folder comparison in code: a card’s local layer 999 stays inside a folder at layer 1. A neighboring folder at layer 2 can still cover that entire card."
        ]
      },
      {
        "heading": "Fix the right layer",
        "points": [
          "When a large number fails, inspect the overlapping elements and their surrounding elements. Find which ancestors create contexts, then compare the two groups at the first shared outer context.",
          "Change the relevant ancestor’s layer when the whole group should move forward. Alternatively, remove an unnecessary context-making property, but first check whether it has another purpose in the design.",
          "Clipping means cutting off painting outside a boundary, often through an overflow rule. Raising z-index cannot undo that cut, so distinguish a layer hidden behind another from content cut by its container."
        ]
      }
    ],
    "terms": [
      {
        "term": "stacking order",
        "meaning": "Stacking order is the front-to-back order used to paint boxes."
      },
      {
        "term": "z-index",
        "meaning": "Z-index supplies a layer number for eligible boxes."
      },
      {
        "term": "stacking context",
        "meaning": "A stacking context groups local layers into one unit in an outer group."
      },
      {
        "term": "opacity",
        "meaning": "Opacity controls how opaque an element and its contents appear."
      },
      {
        "term": "transform",
        "meaning": "A transform visually moves, scales, or rotates a box."
      },
      {
        "term": "clipping",
        "meaning": "Clipping cuts off painting outside a boundary."
      }
    ],
    "examples": [
      {
        "title": "Choose the front card",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"stage\">\n  <div class=\"back\">Back</div><div class=\"front\">Front</div>\n</div>",
        "code": ".stage { position: relative; height: 60px; }\n.stage div { position: absolute; width: 100px; height: 40px; top: 0; left: 0; }\n.back { background: gold; z-index: 1; }\n.front { background: lightblue; z-index: 2; }",
        "walkthrough": [
          "Step 1: Make the stage a placement reference with enough height for the overlapping cards.",
          "Step 2: Place both 100px by 40px cards at the same position.",
          "Step 3: Give the gold card layer 1.",
          "Step 4: Give the light blue card layer 2 so it paints above the gold card.",
          "Step 5: The browser shows: The light blue Front card completely covers the gold Back card."
        ],
        "output": "The light blue Front card completely covers the gold Back card."
      },
      {
        "title": "A large number stays local",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"stage\">\n  <div class=\"group\"><div class=\"notice\">Notice</div></div>\n  <div class=\"cover\">Cover</div>\n</div>",
        "code": ".stage { position: relative; height: 80px; }\n.group { position: relative; z-index: 1; }\n.notice { position: absolute; z-index: 999; width: 120px; height: 60px; background: gold; }\n.cover { position: absolute; top: 0; left: 0; z-index: 2; width: 120px; height: 60px; background: lightblue; }",
        "walkthrough": [
          "Step 1: Establish a stage for the overlapping groups.",
          "Step 2: Create a local stacking context at layer 1.",
          "Step 3: Place the gold notice at local layer 999 inside that context.",
          "Step 4: Place a light blue sibling at outer layer 2, above the entire group at layer 1.",
          "Step 5: The browser shows: The light blue Cover box covers Notice even though Notice has z-index: 999."
        ],
        "output": "The light blue Cover box covers Notice even though Notice has z-index: 999."
      }
    ],
    "keyPoints": [
      "z-index affects painting order, not horizontal or vertical position.",
      "Layer numbers are compared within stacking contexts.",
      "Relative or absolute positioning plus integer z-index creates a context.",
      "Opacity below 1 and transform other than none create contexts.",
      "A descendant cannot escape an ancestor’s context with a larger number."
    ],
    "commonMistakes": [
      "Increasing a child’s number cannot fix an ancestor context that sits behind another group.",
      "Adding opacity: 0.99 can unexpectedly change layer grouping.",
      "Using z-index to fix clipped content addresses the wrong cause."
    ],
    "links": [
      {
        "title": "Z-index and stacking contexts",
        "url": "https://web.dev/learn/css/z-index",
        "kind": "article",
        "language": "English",
        "why": "Uses overlapping boxes to explain local layer order."
      }
    ]
  },
  {
    "topicId": "hc-pseudo",
    "summary": "Pseudo-classes select elements by state or position. Pseudo-elements style generated pieces, such as a decorative mark before a label.",
    "syntax": [
      {
        "title": "State and structural pseudo-classes",
        "language": "css",
        "code": ".control:hover { /* declarations */ }\n.control:focus-visible { /* declarations */ }\n.item:first-child { /* declarations */ }\n.item:nth-child(2n + 1) { /* declarations */ }\n.item:not(.disabled) { /* declarations */ }",
        "parts": [
          {
            "part": ".control:hover",
            "meaning": "Selects control-class elements while a pointing device hovers over them."
          },
          {
            "part": ".control:focus-visible",
            "meaning": "Selects focused control-class elements when the browser determines a visible focus indicator is appropriate."
          },
          {
            "part": ".item:first-child",
            "meaning": "Selects item-class elements that are their parent first element child."
          },
          {
            "part": ".item:nth-child(2n + 1)",
            "meaning": "Selects item-class elements in odd positions among all element siblings, counting from one."
          },
          {
            "part": ".item:not(.disabled)",
            "meaning": "Selects item-class elements whose class list does not include disabled."
          }
        ]
      },
      {
        "title": "Generated content before an element",
        "language": "css",
        "code": ".label::before {\n  content: \"\";\n  display: inline-block;\n}",
        "parts": [
          {
            "part": ".label",
            "meaning": "Selects elements assigned the label class."
          },
          {
            "part": "::before",
            "meaning": "Creates a pseudo-element before the selected element content."
          },
          {
            "part": "content: \"\"",
            "meaning": "Generates an empty pseudo-element that can be styled."
          },
          {
            "part": "display: inline-block",
            "meaning": "Gives the pseudo-element an inline-level box that accepts width and height."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Select an existing thing",
        "points": [
          "Think of marking seats on a bus: one mark means the first seat, and another means the seat someone is using. CSS can choose elements by similar conditions without adding extra HTML classes.",
          "A selector is the part of a CSS rule that chooses what to style. A pseudo-class adds a condition to that choice, such as the pointer being over a button or an item being first.",
          "Write pseudo-classes with one colon. In button:hover, button chooses the element type and :hover narrows the match to buttons currently being pointed at, commonly with a mouse.",
          "Do not make essential information available only on hover. Touch devices may handle hover differently, and people using a keyboard need a way to reach the same information and controls."
        ]
      },
      {
        "heading": "Show keyboard location",
        "points": [
          "Focus means an element is the current target for keyboard actions. The :focus pseudo-class matches that element, whether it gained focus through a keyboard, pointer, or another supported method.",
          "The :focus-visible pseudo-class matches a focused element when the browser judges that a visible indicator is appropriate. Keyboard navigation commonly triggers it, but it does not mean keyboard use only.",
          "An outline is a line drawn around an element without taking layout space. Give :focus-visible a clear outline so a keyboard user can tell which button or link will respond next."
        ]
      },
      {
        "heading": "Choose by sibling position",
        "points": [
          "Siblings are elements sharing the same parent. The :first-child pseudo-class matches an element that is the first element among those siblings; indentation and ordinary text do not count as element siblings.",
          "The selector li:first-child matches a list item only if that item is the parent’s first element child. It does not simply choose the first li when another element comes before it.",
          "The :nth-child() pseudo-class selects by a one-based sibling position. For example, :nth-child(2) matches the second element child, while :nth-child(even) matches positions 2, 4, 6, and so on."
        ]
      },
      {
        "heading": "Create a small visual piece",
        "points": [
          "A pseudo-element is a stylable piece associated with an element rather than a separate HTML element. Write modern pseudo-elements with two colons, as in ::before and ::after.",
          "For ordinary elements, ::before creates a piece before the element’s content and ::after creates one after it. They are inside the element’s content area, not siblings outside the element.",
          "The content property supplies what these generated pieces contain. Set content: \"\" for an empty decorative shape, or provide a short string; without suitable content these pieces normally do not appear.",
          "Put meaningful labels and instructions in HTML rather than relying on generated content. Screen-reader handling can vary, so use these pieces for decoration and keep the underlying wording complete on its own."
        ]
      }
    ],
    "terms": [
      {
        "term": "selector",
        "meaning": "A selector chooses the elements or pieces a CSS rule styles."
      },
      {
        "term": "pseudo-class",
        "meaning": "A pseudo-class selects an element when a state or structural condition matches."
      },
      {
        "term": "focus",
        "meaning": "Focus identifies the element currently targeted by keyboard actions."
      },
      {
        "term": "siblings",
        "meaning": "Siblings are elements that share the same parent."
      },
      {
        "term": "pseudo-element",
        "meaning": "A pseudo-element is a stylable piece associated with an element."
      },
      {
        "term": "content",
        "meaning": "The content property supplies generated material for pieces such as ::before."
      }
    ],
    "examples": [
      {
        "title": "A visible button state",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <button type=\"button\">Save</button>\n</div>",
        "code": "button:hover { background: gold; }\nbutton:focus-visible { outline: 3px solid blue; outline-offset: 2px; }",
        "walkthrough": [
          "Step 1: Give the button a gold background while the pointer hovers over it.",
          "Step 2: Draw a blue 3px outline 2px outside the button when the browser requests a visible focus indicator.",
          "Step 3: The browser shows: Hovering makes Save gold; tabbing to Save shows a blue 3px focus outline with a 2px offset."
        ],
        "output": "Hovering makes Save gold; tabbing to Save shows a blue 3px focus outline with a 2px offset."
      },
      {
        "title": "Mark a short list",
        "environment": "browser",
        "language": "css",
        "html": "<ul>\n  <li>Read</li>\n  <li>Practice</li>\n  <li>Review</li>\n</ul>",
        "code": "li:first-child { font-weight: bold; }\nli:nth-child(even) { background: lightyellow; }\nli::before { content: \"[ \"; }\nli::after { content: \" ]\"; }",
        "walkthrough": [
          "Step 1: Make the first list item bold to mark the beginning.",
          "Step 2: Give even-numbered items a light yellow background, which selects Practice.",
          "Step 3: Generate an opening square bracket and space before every item’s text.",
          "Step 4: Generate a space and closing square bracket after every item’s text.",
          "Step 5: The browser shows: The list shows [ Read ], [ Practice ], and [ Review ] with normal list markers; Read is bold and Practice has a light yellow background."
        ],
        "output": "The list shows [ Read ], [ Practice ], and [ Review ] with normal list markers; Read is bold and Practice has a light yellow background."
      }
    ],
    "keyPoints": [
      "Use one colon for pseudo-classes and two for modern pseudo-elements.",
      ":hover follows pointer state; :focus follows the current keyboard target.",
      ":focus-visible follows the browser’s focus-indicator decision.",
      ":first-child and :nth-child count element sibling positions.",
      "::before and ::after normally need a content value to generate a piece."
    ],
    "commonMistakes": [
      "Removing all focus outlines hides keyboard location.",
      "Assuming li:first-child means the first li ignores other element siblings.",
      "Putting essential instructions only in generated content can make them unreliable for reading tools."
    ],
    "links": [
      {
        "title": "Pseudo-classes",
        "url": "https://web.dev/learn/css/pseudo-classes",
        "kind": "article",
        "language": "English",
        "why": "Explains interaction and sibling-position selectors with small examples."
      }
    ]
  },
  {
    "topicId": "hc-backgrounds-borders",
    "summary": "Backgrounds fill a box, borders outline it, and shadows add depth. Gradients blend colours without an image file.",
    "syntax": [
      {
        "title": "Background shorthand",
        "language": "css",
        "code": ".surface {\n  background: url(\"image.jpg\") center / cover no-repeat padding-box border-box scroll #fff;\n}",
        "parts": [
          {
            "part": ".surface",
            "meaning": "Selects elements assigned the surface class."
          },
          {
            "part": "background",
            "meaning": "Sets background longhands together and resets omitted ones to their initial values."
          },
          {
            "part": "url(\"image.jpg\")",
            "meaning": "Supplies the background image URL."
          },
          {
            "part": "center / cover",
            "meaning": "Centers the image and scales it to cover the background positioning area."
          },
          {
            "part": "no-repeat",
            "meaning": "Prevents background image tiling."
          },
          {
            "part": "padding-box border-box",
            "meaning": "Uses the padding box for positioning and the border box for clipping, in that order."
          },
          {
            "part": "scroll",
            "meaning": "Makes the background move with its element rather than remain fixed to the viewport."
          },
          {
            "part": "#fff",
            "meaning": "Sets a white background color beneath the image."
          }
        ]
      },
      {
        "title": "Rounded corners and shadows",
        "language": "css",
        "code": ".surface {\n  border-radius: 0.5rem;\n  box-shadow: 2px 4px 8px 1px rgb(0 0 0 / 20%);\n}",
        "parts": [
          {
            "part": ".surface",
            "meaning": "Selects elements assigned the surface class."
          },
          {
            "part": "border-radius: 0.5rem",
            "meaning": "Rounds all four corners by half the root font size."
          },
          {
            "part": "box-shadow",
            "meaning": "Draws an outer shadow using the following offsets, blur, spread and color."
          },
          {
            "part": "2px",
            "meaning": "Sets the horizontal shadow offset; positive values move right."
          },
          {
            "part": "4px",
            "meaning": "Sets the vertical shadow offset; positive values move down."
          },
          {
            "part": "8px",
            "meaning": "Sets the nonnegative blur radius."
          },
          {
            "part": "1px",
            "meaning": "Expands the shadow by this spread distance."
          },
          {
            "part": "rgb(0 0 0 / 20%)",
            "meaning": "Sets black shadow color at twenty percent opacity."
          }
        ]
      },
      {
        "title": "Linear gradient background",
        "language": "css",
        "code": ".surface {\n  background-image: linear-gradient(to right, #fff 0%, #000 100%);\n}",
        "parts": [
          {
            "part": ".surface",
            "meaning": "Selects elements assigned the surface class."
          },
          {
            "part": "background-image",
            "meaning": "Sets the image layer used for the background."
          },
          {
            "part": "linear-gradient",
            "meaning": "Creates an image that blends colors along a straight line."
          },
          {
            "part": "to right",
            "meaning": "Directs the gradient from left to right."
          },
          {
            "part": "#fff 0%",
            "meaning": "Places a white color stop at the start."
          },
          {
            "part": "#000 100%",
            "meaning": "Places a black color stop at the end."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Fill and outline a box",
        "points": [
          "Think of each page element as a small paper card. Its background is the area behind its content, and background-color fills that area with one colour.",
          "A background image adds decoration behind the content using background-image: url(...). Keep a background colour too, so the box still looks sensible if the image fails.",
          "The background-size setting controls how large that image appears. The cover value fills the area while preserving its proportions, but some image edges may be cropped."
        ]
      },
      {
        "heading": "Add depth and blended colour",
        "points": [
          "A border is a line around the box; specify its width, style, and colour. The border-radius setting rounds corners, but does not automatically clip overflowing child content.",
          "A box shadow is a painted shape behind or inside a box. With box-shadow, set horizontal movement, vertical movement, blur amount, and colour; it reserves no space.",
          "A linear gradient is an image made by blending colours along a straight direction. Use linear-gradient(to right, lightblue, white) as background-image to blend from left to right."
        ]
      }
    ],
    "terms": [
      {
        "term": "background-size",
        "meaning": "This property sets the displayed size of a background image."
      },
      {
        "term": "border-radius",
        "meaning": "This property rounds the corners of a box."
      },
      {
        "term": "box shadow",
        "meaning": "A box shadow adds a painted shadow without moving nearby content."
      },
      {
        "term": "linear gradient",
        "meaning": "A linear gradient blends colours along a straight direction."
      }
    ],
    "examples": [
      {
        "title": "A decorated card",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"card\">\n  <p>Notes</p>\n</div>",
        "code": ".card {\n  background-color: lightblue;\n  background-image: linear-gradient(to right, lightblue, white);\n  background-size: cover;\n  border: 2px solid navy;\n  border-radius: 12px;\n  box-shadow: 0 4px 8px gray;\n  padding: 16px;\n}",
        "walkthrough": [
          "Step 1: Start the rule for the card.",
          "Step 2: Set a light blue background colour beneath the image.",
          "Step 3: Place a gradient image over the colour.",
          "Step 4: Size the background image to cover its area.",
          "Step 5: Add a solid navy border 2 CSS pixels wide.",
          "Step 6: Round the corners with a 12 CSS pixel radius.",
          "Step 7: Add a gray shadow with no horizontal movement, 4 pixels downward movement, and 8 pixels of blur.",
          "Step 8: Leave 16 pixels of space between the content and border.",
          "Step 9: End the card rule.",
          "Step 10: The browser shows Notes inside a padded card with a light blue to white background, a 2px navy border, 12px rounded corners, and a soft gray shadow below it."
        ],
        "output": "The browser shows Notes inside a padded card with a light blue to white background, a 2px navy border, 12px rounded corners, and a soft gray shadow below it."
      }
    ],
    "keyPoints": [
      "Gradients count as background images.",
      "cover can crop image edges.",
      "Borders occupy space around content.",
      "Shadows do not reserve layout space."
    ],
    "commonMistakes": [
      "Using background images for essential information hides that information from screen readers.",
      "Expecting border-radius alone to clip child content can leave content outside rounded corners."
    ],
    "links": [
      {
        "title": "Backgrounds",
        "url": "https://web.dev/learn/css/backgrounds",
        "kind": "article",
        "language": "English",
        "why": "Explains background colours, images, sizing, and layers with examples."
      }
    ]
  },
  {
    "topicId": "hc-transitions-animations",
    "summary": "Transitions smooth a change between two values. Animations can run a named sequence of changes, while reduced-motion preferences help avoid unwanted movement.",
    "syntax": [
      {
        "title": "Transition shorthand",
        "language": "css",
        "code": ".element {\n  transition: opacity 200ms ease-in-out 50ms;\n}",
        "parts": [
          {
            "part": ".element",
            "meaning": "Selects elements assigned the element class."
          },
          {
            "part": "transition",
            "meaning": "Combines property, duration, easing and delay for a property-value change."
          },
          {
            "part": "opacity",
            "meaning": "Names the property whose changes should transition."
          },
          {
            "part": "200ms",
            "meaning": "Sets the transition duration in milliseconds."
          },
          {
            "part": "ease-in-out",
            "meaning": "Starts and ends the transition slowly."
          },
          {
            "part": "50ms",
            "meaning": "Delays the transition start by this many milliseconds."
          }
        ]
      },
      {
        "title": "Keyframes and animation shorthand",
        "language": "css",
        "code": "@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.element {\n  animation: fade 1s ease-in-out 0s infinite alternate both running;\n}",
        "parts": [
          {
            "part": "@keyframes fade",
            "meaning": "Defines named animation keyframes referenced by the animation shorthand."
          },
          {
            "part": "from { opacity: 0; }",
            "meaning": "Sets the starting keyframe to fully transparent."
          },
          {
            "part": "to { opacity: 1; }",
            "meaning": "Sets the ending keyframe to fully opaque."
          },
          {
            "part": ".element",
            "meaning": "Selects the elements receiving the animation."
          },
          {
            "part": "animation: fade",
            "meaning": "Assigns the keyframes named fade."
          },
          {
            "part": "1s ease-in-out 0s",
            "meaning": "Sets one-second duration, gradual starting and ending, and zero delay, in that order."
          },
          {
            "part": "infinite alternate",
            "meaning": "Repeats indefinitely and reverses direction on every other iteration."
          },
          {
            "part": "both running",
            "meaning": "Applies endpoint styles before and after playback and starts the animation in its running state."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Make a change gradual",
        "points": [
          "A transition makes a change happen gradually, like gently closing a drawer. It needs an old value and a new value; declaring transition alone creates no movement.",
          "Choose the property, meaning the setting that changes, and a duration, meaning how long the change takes. Easing is the speed pattern; linear keeps that speed steady.",
          "A transform changes how a box is drawn, such as moving or turning it. A translateX transform moves it horizontally without moving nearby boxes into new positions."
        ]
      },
      {
        "heading": "Run a sequence responsibly",
        "points": [
          "Keyframes are named checkpoints in a change over time. Write @keyframes with from and to values, then apply the name through animation to run the sequence.",
          "An animation can start when the element appears, without a pointer action. Set its duration and repeat count deliberately; endless decorative movement can make reading harder for people.",
          "The prefers-reduced-motion setting reports whether the reader requested less motion. Use its reduce condition to disable decorative animations and transitions while keeping the content and controls usable."
        ]
      }
    ],
    "terms": [
      {
        "term": "transition",
        "meaning": "A transition gradually changes a setting between two values."
      },
      {
        "term": "easing",
        "meaning": "Easing controls the speed pattern during a change."
      },
      {
        "term": "transform",
        "meaning": "A transform changes a box visually without rearranging nearby boxes."
      },
      {
        "term": "keyframes",
        "meaning": "Keyframes define checkpoints for a named animation."
      }
    ],
    "examples": [
      {
        "title": "A button with optional motion",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <button class=\"move\" type=\"button\">Continue</button>\n</div>",
        "code": ".move { transition: transform 200ms linear; animation: appear 400ms linear; }\n.move:hover, .move:focus-visible { transform: translateX(8px); }\n@keyframes appear {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .move { transition: none; animation: none; }\n  .move:hover, .move:focus-visible { transform: none; }\n}",
        "walkthrough": [
          "Step 1: Set a 200 millisecond transform transition and a single 400 millisecond appear animation.",
          "Step 2: Move the button 8 pixels right on pointer hover or visible keyboard focus.",
          "Step 3: Start the named appear animation checkpoints.",
          "Step 4: Start fully transparent using opacity, the setting for how see-through the element is.",
          "Step 5: Finish fully visible.",
          "Step 6: Close the keyframes.",
          "Step 7: Check whether reduced motion was requested.",
          "Step 8: Disable the transition and animation for that preference.",
          "Step 9: Remove movement on hover and visible keyboard focus for that preference.",
          "Step 10: Close the preference rule.",
          "Step 11: Normally, Continue fades in over 400ms and moves 8px right over 200ms on hover or visible keyboard focus. With reduced motion requested, it is immediately visible and stays still."
        ],
        "output": "Normally, Continue fades in over 400ms and moves 8px right over 200ms on hover or visible keyboard focus. With reduced motion requested, it is immediately visible and stays still."
      }
    ],
    "keyPoints": [
      "Transitions need a value change.",
      "Animations use named keyframes.",
      "Transform movement does not rearrange nearby boxes.",
      "Respect prefers-reduced-motion."
    ],
    "commonMistakes": [
      "Setting transition without a duration leaves its default duration at zero.",
      "Removing content when reduced motion is requested makes the page harder to use."
    ],
    "links": [
      {
        "title": "Animations",
        "url": "https://web.dev/learn/css/animations",
        "kind": "article",
        "language": "English",
        "why": "Introduces keyframes, animation settings, and reduced motion."
      }
    ]
  },
  {
    "topicId": "hc-flexbox-basics",
    "summary": "Flexbox arranges direct children along one main direction. Its alignment properties help place items and share space in rows or columns.",
    "syntax": [
      {
        "title": "Flex container and alignment",
        "language": "css",
        "code": ".container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "display: flex",
            "meaning": "Creates a block-level flex container whose in-flow children become flex items."
          },
          {
            "part": "flex-direction: row",
            "meaning": "Runs the main axis along the inline direction."
          },
          {
            "part": "justify-content: space-between",
            "meaning": "Distributes main-axis free space between items, with the first and last at the edges."
          },
          {
            "part": "align-items: center",
            "meaning": "Centers items along the cross axis within each flex line."
          },
          {
            "part": "flex-wrap: wrap",
            "meaning": "Allows items to form additional flex lines."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Put items on a shelf",
        "points": [
          "Imagine arranging books on a shelf and deciding where spare space should go. Flexbox is a layout method for arranging a group primarily along one direction, such as a row or a column.",
          "Set display: flex on the surrounding element. That element becomes the flex container, the box managing the arrangement, and its direct children become flex items, the boxes being arranged.",
          "A direct child sits immediately inside the container in the HTML structure. A button inside a nested wrapper is not automatically a flex item of the outer container; its wrapper is."
        ]
      },
      {
        "heading": "Learn the two directions",
        "points": [
          "An axis is a direction used for measurement and alignment. The main axis is the direction items follow, and the cross axis runs perpendicular to it, like shelf length and shelf height.",
          "The flex-direction property chooses the main axis. Row is the default; with ordinary horizontal English text, row places items from left to right and the cross axis runs vertically.",
          "With flex-direction: column in the same writing setup, items run from top to bottom. The main axis is now vertical and the cross axis horizontal, so alignment properties act in different physical directions.",
          "Row follows the text’s inline direction, so it is not universally left to right. Row-reverse and column-reverse reverse visual direction; they do not rewrite the HTML reading or keyboard order."
        ]
      },
      {
        "heading": "Place the whole group",
        "points": [
          "The justify-content property distributes available space along the main axis after item sizing. With center, a group sits in the middle; with flex-end, it moves toward the main-axis end.",
          "With justify-content: space-between, the first and last items meet opposite ends and remaining space goes between items. There must be extra main-axis space for visible separation to appear.",
          "The align-items property supplies the default alignment of items within each line along the cross axis. In a simple row, center vertically centers items within the line’s available height.",
          "Stretch is the default cross-axis behavior for ordinary flex items. It stretches items with an automatic cross size, subject to their size limits; an explicit height in a row usually prevents that stretching."
        ]
      },
      {
        "heading": "Adjust a single item",
        "points": [
          "The align-self property overrides align-items for one item. For example, a short action label can sit at cross-axis end while its neighbors remain centered within the same line.",
          "In the shelf comparison, justify-content places the books along the shelf, while align-items controls their cross-shelf alignment. Turning the shelf into a column swaps which physical direction each property affects.",
          "Give the container enough height when demonstrating vertical centering in a row. If its height merely follows its children, there may be no extra cross-axis space to make the alignment visible."
        ]
      }
    ],
    "terms": [
      {
        "term": "flex container",
        "meaning": "A flex container is the element that manages a flex layout."
      },
      {
        "term": "flex item",
        "meaning": "A flex item is a direct child participating in a flex layout."
      },
      {
        "term": "main axis",
        "meaning": "The main axis is the direction along which flex items are arranged."
      },
      {
        "term": "cross axis",
        "meaning": "The cross axis is the direction perpendicular to the main axis."
      },
      {
        "term": "justify-content",
        "meaning": "Justify-content distributes available space along the main axis in flexbox."
      },
      {
        "term": "align-self",
        "meaning": "Align-self overrides cross-axis alignment for one flex item."
      }
    ],
    "examples": [
      {
        "title": "Center two boxes",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"shelf\">\n  <div>A</div><div>B</div>\n</div>",
        "code": ".shelf { display: flex; width: 240px; height: 80px; justify-content: center; align-items: center; }\n.shelf div { width: 40px; height: 20px; background: gold; }",
        "walkthrough": [
          "Step 1: Create a 240px by 80px row and center its items along both axes.",
          "Step 2: Give each item a visible 40px by 20px box.",
          "Step 3: The browser shows: Two gold boxes sit together in the center; the first starts 80px from the shelf’s left edge and both start 30px from its top."
        ],
        "output": "Two gold boxes sit together in the center; the first starts 80px from the shelf’s left edge and both start 30px from its top."
      },
      {
        "title": "Align a toolbar action",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"toolbar\">\n  <div>Title</div>\n  <div class=\"action\">Save</div>\n</div>",
        "code": ".toolbar { display: flex; flex-direction: row; width: 300px; height: 100px; justify-content: space-between; align-items: center; }\n.toolbar div { width: 60px; height: 20px; background: lightblue; }\n.action { align-self: flex-end; }",
        "walkthrough": [
          "Step 1: Make a row with room to separate the items horizontally and center them vertically by default.",
          "Step 2: Give both items a 60px by 20px box so alignment can be measured.",
          "Step 3: Override only Save’s cross-axis alignment to put it at the bottom of the toolbar.",
          "Step 4: The browser shows: Title starts at horizontal offset 0px and vertical offset 40px; Save starts at horizontal offset 240px and vertical offset 80px."
        ],
        "output": "Title starts at horizontal offset 0px and vertical offset 40px; Save starts at horizontal offset 240px and vertical offset 80px."
      }
    ],
    "keyPoints": [
      "display: flex makes direct children into flex items.",
      "flex-direction determines the main axis.",
      "justify-content works along the main axis.",
      "align-items controls the default cross-axis alignment.",
      "align-self changes cross-axis alignment for one item.",
      "Alignment needs available space to produce a visible difference."
    ],
    "commonMistakes": [
      "Assuming justify-content always means horizontal alignment fails for columns.",
      "Putting display: flex on each child does not arrange those children as a group.",
      "Using reverse directions to fix reading order can separate visual order from keyboard order."
    ],
    "links": [
      {
        "title": "Flexbox",
        "url": "https://web.dev/learn/css/flexbox",
        "kind": "article",
        "language": "English",
        "why": "Builds up flex directions and alignment with illustrated examples."
      }
    ]
  },
  {
    "topicId": "hc-flexbox-practice",
    "summary": "Flex sizing decides how items share extra room or give up room when space is tight. Wrapping and gaps make the same row useful at different widths.",
    "syntax": [
      {
        "title": "Container gap and item controls",
        "language": "css",
        "code": ".container { display: flex; gap: 1rem; }\n.container > .item {\n  flex: 1 1 12rem;\n  align-self: flex-start;\n  order: 1;\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects the flex container by class."
          },
          {
            "part": "display: flex",
            "meaning": "Creates a flex formatting context for the container children."
          },
          {
            "part": "gap: 1rem",
            "meaning": "Sets gaps between items and flex lines without adding outer spacing."
          },
          {
            "part": ".container > .item",
            "meaning": "Selects item-class direct children of the container."
          },
          {
            "part": "flex: 1 1 12rem",
            "meaning": "Sets grow factor, shrink factor and initial main size, in that order."
          },
          {
            "part": "align-self: flex-start",
            "meaning": "Overrides container alignment for this item, aligning it to the cross-start edge."
          },
          {
            "part": "order: 1",
            "meaning": "Sets visual ordering; lower numbers appear first, without changing document or keyboard order."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start with a shared shelf",
        "points": [
          "Imagine several adjustable boxes sharing a shelf. Each starts with a preferred size, then gets more room or gives some up; flexbox applies a similar negotiation to direct children of a container.",
          "A flex container is a box with display: flex, and its direct children are flex items. The main axis is the direction of their arrangement, usually horizontal when flex-direction is row.",
          "The flex-basis property sets an item’s initial main-axis size for this negotiation. In a row, flex-basis: 120px supplies a starting width rather than an unconditional promise about the final width."
        ]
      },
      {
        "heading": "Share extra or missing room",
        "points": [
          "The flex-grow property is a nonnegative weight for sharing extra main-axis space. If two items have grow weights 1 and 2, the second receives twice the added space, not necessarily twice the final width.",
          "The flex-shrink property is a nonnegative weight for giving up space when items do not fit. The calculation also uses each item’s basis, so equal shrink values need not remove equal pixel amounts.",
          "Minimum and maximum sizes can stop resizing, so ratios are only a starting explanation. Flex-shrink: 0 refuses shrinking but cannot create room.",
          "The flex shorthand writes grow, shrink, and basis together. Flex: 1 1 120px allows growth and shrinking from 120px; flex: 0 0 120px requests neither change from that starting size."
        ]
      },
      {
        "heading": "Make another row",
        "points": [
          "The flex-wrap property controls whether items may form additional lines. Its default, nowrap, keeps one line, which can shrink items or let content extend beyond the available width.",
          "Set flex-wrap: wrap to allow new lines when the items’ relevant starting sizes do not fit. Each line then shares its own available space, so columns across different lines need not align.",
          "The gap property adds gutters, meaning empty space between neighboring items and lines. Gap: 12px adds 12px between them but does not add matching space around the container’s outside edges.",
          "Include these gutters in width calculations. Three 100px items with two 12px gaps need 324px in one row, so a 220px shelf must wrap if those items cannot shrink."
        ]
      },
      {
        "heading": "Let long content fit",
        "points": [
          "Overflow means content extending outside its box. A row flex item’s automatic minimum width can be based on its content, so one long unbroken word may prevent the item from becoming narrow enough.",
          "Set min-width: 0 on the item that needs to become narrower. This permits shrinking below that content-based minimum, but it does not by itself break a long word or hide the extra text.",
          "Use overflow-wrap: anywhere when long text may break wherever needed. For a single-line shortened label, a different combination of clipping and text rules is needed; choose the intended behavior explicitly."
        ]
      }
    ],
    "terms": [
      {
        "term": "flex-basis",
        "meaning": "Flex-basis supplies the starting main-axis size for flex sizing."
      },
      {
        "term": "flex-grow",
        "meaning": "Flex-grow weights an item’s share of extra main-axis space."
      },
      {
        "term": "flex-shrink",
        "meaning": "Flex-shrink weights size reduction together with the item’s basis."
      },
      {
        "term": "flex shorthand",
        "meaning": "The flex shorthand sets grow, shrink, and basis together."
      },
      {
        "term": "gap",
        "meaning": "Gap adds gutters between items and lines without adding outside edge space."
      },
      {
        "term": "overflow",
        "meaning": "Overflow is content extending beyond its box."
      }
    ],
    "examples": [
      {
        "title": "Share the extra room",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"row\">\n  <div class=\"one\">A</div><div class=\"two\">B</div>\n</div>",
        "code": ".row { display: flex; width: 300px; }\n.one { flex: 1 1 100px; }\n.two { flex: 2 1 100px; }",
        "walkthrough": [
          "Step 1: Make a 300px row with no explicit gap.",
          "Step 2: Start A at 100px and give it one growth share.",
          "Step 3: Start B at 100px and give it two growth shares, sharing the remaining 100px in a one-to-two ratio.",
          "Step 4: The browser shows: A is approximately 133.33px wide and B is approximately 166.67px wide, subject to browser rounding."
        ],
        "output": "A is approximately 133.33px wide and B is approximately 166.67px wide, subject to browser rounding."
      },
      {
        "title": "Wrap cards with long labels",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"cards\">\n  <div>OneVeryLongUnbrokenLabelThatNeedsToWrap</div>\n  <div>Second card</div>\n  <div>Third card</div>\n</div>",
        "code": ".cards { display: flex; flex-wrap: wrap; gap: 12px; width: 220px; }\n.cards > div { flex: 1 1 100px; min-width: 0; overflow-wrap: anywhere; background: beige; }",
        "walkthrough": [
          "Step 1: Create a 220px container that allows multiple lines and leaves 12px gutters.",
          "Step 2: Start each card at 100px, allow growth and shrinking, remove the content-based width floor, and allow long labels to break.",
          "Step 3: The browser shows: The first row has two 104px-wide beige cards separated by 12px; the third card fills a 220px second row, and the long label wraps inside its card."
        ],
        "output": "The first row has two 104px-wide beige cards separated by 12px; the third card fills a 220px second row, and the long label wraps inside its card."
      }
    ],
    "keyPoints": [
      "flex-basis is a starting size, not always the final size.",
      "flex-grow shares extra space by weight.",
      "Shrinking is weighted by both flex-shrink and the basis.",
      "flex: grow shrink basis sets all three controls.",
      "flex-wrap permits new lines; gap separates items and lines.",
      "min-width: 0 allows shrinking but does not itself wrap text."
    ],
    "commonMistakes": [
      "Expecting flex-grow: 2 to guarantee twice the final width ignores starting sizes.",
      "Forgetting gaps in width calculations can cause an unexpected new row.",
      "Setting min-width: 0 without handling long text can leave visible overflow."
    ],
    "links": [
      {
        "title": "Flexbox",
        "url": "https://web.dev/learn/css/flexbox",
        "kind": "article",
        "language": "English",
        "why": "Explains flexible sizes, wrapping, and practical item behavior."
      }
    ]
  },
  {
    "topicId": "hc-grid-basics",
    "summary": "CSS Grid arranges direct children in rows and columns together. You define tracks, add gaps, and let items fill cells or place them across chosen lines.",
    "syntax": [
      {
        "title": "Grid tracks and gaps",
        "language": "css",
        "code": ".container {\n  display: grid;\n  grid-template-columns: 200px 1fr 2fr;\n  grid-template-rows: 80px 1fr;\n  gap: 1rem 2rem;\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "display: grid",
            "meaning": "Creates a block-level grid container whose in-flow children become grid items."
          },
          {
            "part": "grid-template-columns: 200px 1fr 2fr",
            "meaning": "Defines a fixed column followed by flexible columns with one and two shares of available space."
          },
          {
            "part": "grid-template-rows: 80px 1fr",
            "meaning": "Defines a fixed first row and a flexible second row."
          },
          {
            "part": "gap: 1rem 2rem",
            "meaning": "Sets row gaps first and column gaps second."
          }
        ]
      },
      {
        "title": "Item placement using grid lines",
        "language": "css",
        "code": ".item {\n  grid-column: 1 / 3;\n  grid-row: 2 / span 2;\n}",
        "parts": [
          {
            "part": ".item",
            "meaning": "Selects the element that must be a grid item for these placements to apply."
          },
          {
            "part": "grid-column: 1 / 3",
            "meaning": "Places the item between column lines one and three, spanning two columns."
          },
          {
            "part": "grid-row: 2 / span 2",
            "meaning": "Starts at row line two and spans two rows."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Draw a table of spaces",
        "points": [
          "Imagine a sheet of squared paper where a note can cover one square or several. CSS Grid is a layout method that lets you arrange boxes across rows and columns at the same time.",
          "Set display: grid on the surrounding box to make a grid container. Its direct children become grid items, the boxes that can be placed in the arrangement; deeper children keep their own layout.",
          "A track is the space between two neighboring grid lines. A column track runs vertically through the arrangement, while a row track runs horizontally; their intersections form cells.",
          "A grid line is a boundary used for placement. In a simple grid with two columns, there are three column lines: one at each outside edge and one between the columns."
        ]
      },
      {
        "heading": "Choose the track sizes",
        "points": [
          "The grid-template-columns property lists column sizes. Writing 100px 200px creates two columns with those widths, while grid-template-rows lists the row sizes in the same way.",
          "The fr unit gives a flexible track a share of remaining space after fixed sizes and gaps. With short content, 1fr 2fr divides that space in a one-to-two ratio; long words can impose wider minimum sizes.",
          "The gap property inserts gutters, the empty spaces between tracks. With a 300px container, a 20px column gap, and columns of 1fr 1fr containing short text, each column gets 140px."
        ]
      },
      {
        "heading": "Let the browser fill cells",
        "points": [
          "Auto-placement is the browser’s process for assigning positions to items without explicit placement. In a simple grid with ordinary horizontal writing, it fills the first row from left to right, then continues below.",
          "The explicit grid is the set of tracks you define with template properties. If extra items need more space, the browser can create an implicit grid, meaning additional tracks outside those definitions."
        ]
      },
      {
        "heading": "Place a larger note",
        "points": [
          "The grid-column property chooses the start and end column lines for an item. Grid-column: 1 / 3 begins at line 1 and ends at line 3, covering both columns of a two-column grid.",
          "The grid-row property chooses row boundaries in the same way. Grid-row: 1 / 2 selects the first row because a track lies between two lines, rather than being named by its ending line alone.",
          "The span keyword asks for a number of tracks instead of a particular ending line. Grid-column: 1 / span 2 starts at line 1 and covers two tracks, like a note covering two squares.",
          "Use grid for shared row-and-column structure and flexbox for groups primarily arranged in one direction. Keep meaningful HTML order, since visual placement alone does not rewrite reading order or keyboard navigation."
        ]
      }
    ],
    "terms": [
      {
        "term": "grid container",
        "meaning": "A grid container is the box managing a CSS Grid layout."
      },
      {
        "term": "track",
        "meaning": "A track is the space between two neighboring grid lines."
      },
      {
        "term": "grid line",
        "meaning": "A grid line is a boundary used to place grid items."
      },
      {
        "term": "fr",
        "meaning": "The fr unit assigns a flexible track a share of remaining space."
      },
      {
        "term": "auto-placement",
        "meaning": "Auto-placement is the browser’s process for assigning positions to unplaced grid items."
      },
      {
        "term": "implicit grid",
        "meaning": "The implicit grid consists of extra tracks created beyond the explicitly defined grid."
      }
    ],
    "examples": [
      {
        "title": "Two columns",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"grid\">\n  <div>A</div><div>B</div>\n</div>",
        "code": ".grid { display: grid; width: 300px; grid-template-columns: 1fr 1fr; gap: 20px; }\n.grid > div { background: lightblue; }",
        "walkthrough": [
          "Step 1: Make two equal flexible columns within 300px and reserve a 20px gap between them.",
          "Step 2: Color the items so their column areas are visible.",
          "Step 3: The browser shows: A and B occupy two light blue columns, each 140px wide, separated by 20px."
        ],
        "output": "A and B occupy two light blue columns, each 140px wide, separated by 20px."
      },
      {
        "title": "A small page layout",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"layout\">\n  <header>Notes</header>\n  <aside>Topics</aside>\n  <main>Study content</main>\n</div>",
        "code": ".layout { display: grid; width: 420px; grid-template-columns: 120px 1fr; grid-template-rows: 40px 100px; gap: 10px; }\n.layout > * { background: beige; }\nheader { grid-column: 1 / 3; grid-row: 1 / 2; }\naside { grid-column: 1 / 2; grid-row: 2 / 3; }\nmain { grid-column: 2 / 3; grid-row: 2 / 3; }",
        "walkthrough": [
          "Step 1: Define a 120px column and a flexible column, plus 40px and 100px rows with 10px gutters.",
          "Step 2: Give each direct child a beige background to show its area.",
          "Step 3: Place Notes across both columns in the first row.",
          "Step 4: Place Topics in the first column of the second row.",
          "Step 5: Place Study content in the second column of the second row.",
          "Step 6: The browser shows: Notes spans a 420px-wide, 40px-high header; below a 10px gap, Topics is 120px wide and Study content is 290px wide, both 100px high."
        ],
        "output": "Notes spans a 420px-wide, 40px-high header; below a 10px gap, Topics is 120px wide and Study content is 290px wide, both 100px high."
      }
    ],
    "keyPoints": [
      "display: grid arranges direct children in rows and columns.",
      "Template properties define explicit column and row tracks.",
      "fr shares available space after fixed sizes and gaps, with content constraints.",
      "gap creates space between tracks.",
      "grid-column and grid-row use boundary lines for placement.",
      "Extra content can create implicit tracks."
    ],
    "commonMistakes": [
      "Counting columns instead of boundary lines can give the wrong span.",
      "Assuming 1fr always ignores content minimums can produce overflow.",
      "Moving items visually without checking HTML order can make reading confusing."
    ],
    "links": [
      {
        "title": "Grid",
        "url": "https://web.dev/learn/css/grid",
        "kind": "article",
        "language": "English",
        "why": "Introduces tracks, flexible units, and placement with diagrams."
      }
    ]
  },
  {
    "topicId": "hc-grid-practice",
    "summary": "Grid arranges content in rows and columns. Named areas and flexible columns help you build page layouts and card lists with less repeated CSS.",
    "syntax": [
      {
        "title": "Automatically fitting columns",
        "language": "css",
        "code": ".container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects the grid container by class."
          },
          {
            "part": "display: grid",
            "meaning": "Creates a grid formatting context."
          },
          {
            "part": "grid-template-columns",
            "meaning": "Defines the column track list."
          },
          {
            "part": "repeat",
            "meaning": "Repeats the supplied track definition."
          },
          {
            "part": "auto-fit",
            "meaning": "Creates as many tracks as fit and collapses empty repeated tracks."
          },
          {
            "part": "minmax(12rem, 1fr)",
            "meaning": "Gives each track a twelve-rem minimum and a flexible maximum sharing available space."
          }
        ]
      },
      {
        "title": "Named grid areas and automatic placement",
        "language": "css",
        "code": ".container {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar content\";\n  grid-auto-flow: row;\n}\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.content { grid-area: content; }",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects the grid container by class."
          },
          {
            "part": "display: grid",
            "meaning": "Creates a grid formatting context."
          },
          {
            "part": "grid-template-areas",
            "meaning": "Defines named rectangular areas using one quoted string per row and equal cell counts."
          },
          {
            "part": "\"header header\"",
            "meaning": "Names a header area spanning both columns in the first row."
          },
          {
            "part": "\"sidebar content\"",
            "meaning": "Names separate sidebar and content areas in the second row."
          },
          {
            "part": "grid-auto-flow: row",
            "meaning": "Places items without explicit positions by filling rows and adding rows as needed."
          },
          {
            "part": ".header { grid-area: header; }",
            "meaning": "Selects the header-class grid item and places it in the header area."
          },
          {
            "part": ".sidebar { grid-area: sidebar; }\n.content { grid-area: content; }",
            "meaning": "Selects sidebar-class and content-class grid items and places each in its matching named area."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start with a shelf",
        "points": [
          "Imagine a shelf with labeled spaces. CSS Grid divides a box into rows and columns, so page content can occupy planned spaces.",
          "Set display: grid on the surrounding element, the HTML item containing the others. Its direct children become grid items; deeper children do not automatically join the same grid.",
          "A track is one row or column of the grid. Define column tracks with grid-template-columns, and use gap to leave space between tracks without adding space around the outside.",
          "The fr unit shares leftover space between flexible tracks. Two columns sized 1fr and 2fr request one share and two shares, after fixed sizes and gaps are accounted for."
        ]
      },
      {
        "heading": "Give spaces names",
        "points": [
          "A grid area is a named region of cells. Write grid-template-areas as quoted rows, such as \"head head\" followed by \"side main\", to draw a small map in CSS.",
          "Each quoted row must have the same number of cells. Repeating a name makes that area larger, but every named area must form one filled rectangle.",
          "Assign a child with grid-area: head to put it in the matching region. A dot in the map means an empty cell rather than another named region.",
          "The shelf labels now connect to code: the head name reserves a place for the header. Keep the HTML reading order sensible, because visual placement does not rearrange keyboard navigation."
        ]
      },
      {
        "heading": "Let columns fit",
        "points": [
          "The repeat() function repeats a track pattern. Use repeat(auto-fit, minmax(160px, 1fr)) for as many columns as fit, with each column starting at a minimum of 160px.",
          "The minmax() function sets a track's smallest and largest allowed sizes. Here, 1fr lets occupied columns share spare width; a container narrower than 160px can still overflow.",
          "With auto-fit, empty repeated tracks collapse after items are placed. With auto-fill, those empty tracks remain, so occupied cards do not necessarily stretch across all the available width.",
          "At 500px wide with a 10px gap, three 160px columns would just fit (160 + 160 + 160 + 20 = 500). With only two cards and auto-fit, the empty third column collapses, so each card becomes 245px wide."
        ]
      },
      {
        "heading": "Share alignment carefully",
        "points": [
          "Subgrid lets a child grid reuse the parent grid's tracks along a chosen direction. It helps content inside separate cards line up with the same outer rows or columns.",
          "A child using grid-template-columns: subgrid must itself be a grid item. If it spans two parent columns, its own children can align with those two inherited column tracks.",
          "An ordinary nested grid creates its own tracks instead. Choose subgrid when shared alignment matters, and check support for the browser versions that your page needs to serve."
        ]
      }
    ],
    "terms": [
      {
        "term": "grid item",
        "meaning": "A direct child of an element using Grid takes part in that grid's layout."
      },
      {
        "term": "track",
        "meaning": "A track is one row or column in a grid."
      },
      {
        "term": "grid area",
        "meaning": "A grid area is a region of grid cells that can hold an item."
      },
      {
        "term": "fr",
        "meaning": "The fr unit assigns a share of leftover space to a flexible track."
      },
      {
        "term": "minmax()",
        "meaning": "This function sets the minimum and maximum sizes of a grid track."
      },
      {
        "term": "subgrid",
        "meaning": "Subgrid allows a child grid to share its parent's tracks in one or both directions."
      }
    ],
    "examples": [
      {
        "title": "One named area",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"page\">\n  <header>Page heading</header>\n</div>",
        "code": ".page {\n  display: grid;\n  grid-template-areas: \"head\";\n}\nheader { grid-area: head; }",
        "walkthrough": [
          "Step 1: .page selects the surrounding box so its layout can be set.",
          "Step 2: display: grid makes its direct child a grid item.",
          "Step 3: grid-template-areas names the single cell head so it can be addressed.",
          "Step 4: header assigns the heading to the head area so it fills that region.",
          "Step 5: The browser shows Page heading in the grid's only named area."
        ],
        "output": "Page heading appears in the single head area."
      },
      {
        "title": "Cards that fit the shelf",
        "environment": "browser",
        "language": "css",
        "html": "<section class=\"cards\" aria-label=\"Lessons\">\n  <article>HTML lesson</article>\n  <article>CSS lesson</article>\n</section>",
        "code": ".cards {\n  display: grid;\n  width: 500px;\n  gap: 10px;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n}\narticle { background: #eee; }",
        "walkthrough": [
          "Step 1: .cards selects the lesson list to arrange its children.",
          "Step 2: display: grid makes each article a grid item.",
          "Step 3: width sets the available content width to 500px for a measurable example.",
          "Step 4: gap leaves 10px between occupied columns.",
          "Step 5: repeat fits minimum 160px columns and lets occupied columns share the remaining width.",
          "Step 6: article gives each card a light gray background so its width is visible.",
          "Step 7: The browser shows two 245px cards side by side with a 10px gap."
        ],
        "output": "The list is 500px wide; two light gray cards are each 245px wide, separated by 10px."
      }
    ],
    "keyPoints": [
      "Only direct children become items of a grid.",
      "Named areas must form rectangles.",
      "minmax() bounds track sizes.",
      "auto-fit collapses empty repeated tracks; auto-fill preserves them.",
      "Subgrid shares parent tracks.",
      "Visual placement should preserve a sensible reading order."
    ],
    "commonMistakes": [
      "Writing unequal numbers of cells in the quoted area rows makes the area map invalid.",
      "Expecting a 160px minimum column to shrink into a narrower container can cause overflow.",
      "Expecting every nested grid to share its parent's tracks misses the purpose of subgrid."
    ],
    "links": [
      {
        "title": "Grid",
        "url": "https://web.dev/learn/css/grid",
        "kind": "article",
        "language": "English",
        "why": "Introduces rows, columns, named areas, and flexible track patterns with diagrams."
      }
    ]
  },
  {
    "topicId": "hc-layout-patterns",
    "summary": "Common layout patterns solve repeated page problems, such as centering a message or arranging cards. Flexbox and Grid let you express these arrangements directly.",
    "explanation": [
      {
        "heading": "Choose a simple arrangement",
        "points": [
          "Think of plates arranged in one row or several rows on a table. A layout pattern is a reusable arrangement for a familiar page problem.",
          "Flexbox is a CSS layout method that arranges direct children along one main direction at a time. Use display: flex on the surrounding box to start a flexible row.",
          "Grid is a CSS layout method for arranging direct children in rows and columns together. Use display: grid when the relationship between both directions matters to the design.",
          "Keep HTML, the tags describing content, in a useful reading order. Moving boxes visually does not automatically change keyboard navigation or spoken reading order."
        ]
      },
      {
        "heading": "Center a single child",
        "points": [
          "In Flexbox, the main axis is the direction items follow. With the usual flex-direction: row and horizontal writing, justify-content: center places children in the horizontal middle of available space.",
          "The cross axis runs across the main direction. Add align-items: center for vertical centering in that row, and give the surrounding box enough height to leave visible spare space.",
          "For Grid, place-items: center aligns children in both directions inside their grid areas. With one child in one cell, it centers that child.",
          "Centering needs free space to distribute, just as a plate needs a larger table. A box only as tall as its content has no extra height for vertical movement."
        ]
      },
      {
        "heading": "Build navigation and cards",
        "points": [
          "A navbar is a row or group of navigation links. Put real links inside a nav element, then use Flexbox to arrange them with a gap between neighboring items.",
          "Set flex-wrap: wrap to let navigation items continue onto another line when needed. Check longer labels and larger text, because a row that fits today can become crowded later.",
          "A card is a small related group of content, such as a lesson title and description. Use a grid of cards when you want their columns to line up.",
          "The minmax() function gives a grid column a minimum and maximum size. Together with repeat(auto-fit, minmax(160px, 1fr)), it fits columns automatically and shares leftover width using fr units."
        ]
      },
      {
        "heading": "Arrange a whole page",
        "points": [
          "The holy grail layout is a common page arrangement with a header, side region, main content, and footer. Some versions include two side regions rather than just one sidebar.",
          "Use grid-template-areas to write a named map of those page regions. A row like \"head head\" spans the header across both columns; \"side main\" places the middle regions beside each other.",
          "Assign direct children with grid-area and the matching name. The example reserves 120px for the sidebar while header and footer span both columns."
        ]
      }
    ],
    "terms": [
      {
        "term": "Flexbox",
        "meaning": "Flexbox arranges direct children along one main direction at a time."
      },
      {
        "term": "Grid",
        "meaning": "Grid arranges direct children using rows and columns."
      },
      {
        "term": "main axis",
        "meaning": "The main axis is the direction followed by items in a flex container."
      },
      {
        "term": "cross axis",
        "meaning": "The cross axis runs perpendicular to a flex container's main axis."
      },
      {
        "term": "navbar",
        "meaning": "A navbar groups links used to move between parts of a site."
      },
      {
        "term": "holy grail layout",
        "meaning": "This page pattern combines a header, side regions, main content, and footer."
      }
    ],
    "examples": [
      {
        "title": "Center a message",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"frame\">\n  <span>Ready</span>\n</div>",
        "code": ".frame {\n  display: flex;\n  width: 240px;\n  height: 120px;\n  justify-content: center;\n  align-items: center;\n}",
        "walkthrough": [
          "Step 1: .frame selects the box that will hold the centered message.",
          "Step 2: display: flex starts a row arrangement for its child.",
          "Step 3: width supplies 240px of horizontal room.",
          "Step 4: height supplies 120px of vertical room.",
          "Step 5: justify-content centers the child along the row.",
          "Step 6: align-items centers the child across the row, vertically here.",
          "Step 7: The browser shows Ready centered in the 240px by 120px frame."
        ],
        "output": "Ready is centered horizontally and vertically inside a 240px wide, 120px tall box."
      },
      {
        "title": "Page regions with navigation and cards",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"shell\">\n  <header><nav aria-label=\"Main\"><a href=\"#lessons\">Lessons</a><a href=\"#help\">Help</a></nav></header>\n  <aside id=\"help\">Help topics</aside>\n  <main id=\"lessons\"><div class=\"cards\"><article>HTML</article><article>CSS</article></div></main>\n  <footer>End of lessons</footer>\n</div>",
        "code": ".shell {\n  display: grid;\n  width: 600px;\n  grid-template-columns: 120px 1fr;\n  grid-template-areas: \"head head\" \"side main\" \"foot foot\";\n  gap: 12px;\n}\nheader { grid-area: head; }\naside { grid-area: side; }\nmain { grid-area: main; }\nfooter { grid-area: foot; }\nnav { display: flex; flex-wrap: wrap; gap: 16px; }\n.cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }\narticle { display: grid; place-items: center; min-height: 80px; background: #eee; }",
        "walkthrough": [
          "Step 1: .shell selects the outer page wrapper to arrange its regions.",
          "Step 2: display: grid creates the page grid.",
          "Step 3: width fixes the demonstration at 600px.",
          "Step 4: the columns reserve 120px for the sidebar and share the rest with main content.",
          "Step 5: the area map gives the header and footer full rows around the middle pair.",
          "Step 6: gap separates neighboring rows and columns by 12px.",
          "Step 7: header assigns the header to the head region.",
          "Step 8: aside assigns help topics to the side region.",
          "Step 9: main assigns lessons to the main region.",
          "Step 10: footer assigns the final text to the foot region.",
          "Step 11: nav arranges links in a wrapping row with a 16px gap.",
          "Step 12: .cards creates two equal columns with 12px between cards.",
          "Step 13: article centers each label inside a light gray card at least 80px tall.",
          "Step 14: The browser shows a full-width header and footer, a 120px sidebar, and two 228px cards in the 468px main column."
        ],
        "output": "The shell is 600px wide; header and footer span 600px, the sidebar is 120px, and main is 468px. Its two centered cards are each 228px wide and 80px tall."
      }
    ],
    "keyPoints": [
      "Flexbox suits a row or column; Grid suits coordinated rows and columns.",
      "Flexbox centering follows the main and cross axes.",
      "Grid place-items: center aligns a child within its area.",
      "Centering requires available space.",
      "Navigation should wrap when necessary.",
      "Keep reading order meaningful when arranging page regions."
    ],
    "commonMistakes": [
      "Expecting vertical centering to move content inside a box with no spare height hides the effect.",
      "Forcing a navbar onto one line can make links overflow.",
      "Keeping a fixed desktop page width on a narrow screen creates horizontal scrolling."
    ],
    "links": [
      {
        "title": "Layout",
        "url": "https://web.dev/learn/css/layout",
        "kind": "article",
        "language": "English",
        "why": "Explains how to choose between layout methods before building larger patterns."
      }
    ]
  },
  {
    "topicId": "hc-mobile-first-media",
    "summary": "Mobile-first CSS starts with styles that work in a narrow space. Media queries add changes when the browser has more room or the user has a particular preference.",
    "syntax": [
      {
        "title": "Base rule and minimum-width query",
        "language": "css",
        "code": ".container { padding: 1rem; }\n@media (min-width: 48rem) {\n  .container { padding: 2rem; }\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "padding: 1rem",
            "meaning": "Provides base padding at all viewport sizes."
          },
          {
            "part": "@media (min-width: 48rem)",
            "meaning": "Applies enclosed rules when viewport width is at least 48 times the initial font size."
          },
          {
            "part": "padding: 2rem",
            "meaning": "Overrides the base padding when the media condition matches."
          }
        ]
      },
      {
        "title": "Orientation query",
        "language": "css",
        "code": "@media (orientation: landscape) {\n  .container { padding: 2rem; }\n}",
        "parts": [
          {
            "part": "@media (orientation: landscape)",
            "meaning": "Applies enclosed rules when viewport width is greater than viewport height."
          },
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "padding: 2rem",
            "meaning": "Sets padding to twice the root element font size."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Start with a small shelf",
        "points": [
          "Think of filling a small shelf before adding another beside it. Mobile-first design starts with a useful narrow layout, then adds roomier arrangements when space becomes available.",
          "The viewport is the browser area used to lay out the page. Its width can change when a window is resized, so a narrow viewport does not always mean a phone.",
          "Put <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> inside the HTML head, the part holding page settings. It tells mobile browsers to use the device width for the layout viewport.",
          "Without that setting, mobile browsers may use a wider layout viewport and shrink the page to fit. Leave zoom available rather than adding settings that stop people enlarging the page."
        ]
      },
      {
        "heading": "Write the base first",
        "points": [
          "Write ordinary CSS for the small layout before adding conditions. A single column, readable text, and images that stay within their containers make a useful starting point.",
          "A media query is a condition that controls when CSS applies. Write @media (min-width: 600px) to add rules when the viewport is at least 600 CSS pixels wide.",
          "A CSS pixel is the screen measurement used by styles, which may differ from one physical screen dot. The 600px condition checks layout space rather than a device's advertised screen resolution.",
          "Matching media queries add rules without erasing base styles. With otherwise tied rules, later declarations for the same property win."
        ]
      },
      {
        "heading": "Choose useful change points",
        "points": [
          "A breakpoint is the width where you change the layout. Choose it by slowly widening the page and watching where content looks cramped or could use another column.",
          "Widths such as 480px, 768px, and 1024px are common starting examples, not required device categories. Longer navigation labels may need different breakpoints.",
          "The shelf comparison becomes code when a card list changes from one column to two at 600px. Keep both layouts usable instead of assuming the larger one is always better.",
          "Test just below, exactly at, and just above each breakpoint. Also try widths between breakpoints, longer text, and browser zoom to catch unexpected wrapping or content extending outside its box."
        ]
      },
      {
        "heading": "Respond to more than width",
        "points": [
          "The orientation feature compares viewport width and height; landscape means wider than tall. The prefers-color-scheme feature reports a light or dark preference; neither feature reliably identifies a device type.",
          "Use those conditions only when they improve the page. For example, a dark preference can change background and text colors together without changing the basic layout or reading order.",
          "Write content in its intended reading order in HTML. A narrow single-column page should remain understandable before any wider layout rearranges the visible boxes around it."
        ]
      }
    ],
    "terms": [
      {
        "term": "mobile-first",
        "meaning": "Mobile-first styling starts with a narrow layout and adds changes for more room."
      },
      {
        "term": "viewport",
        "meaning": "The viewport is the browser area used to lay out the page."
      },
      {
        "term": "media query",
        "meaning": "A media query applies CSS only when a stated condition matches."
      },
      {
        "term": "breakpoint",
        "meaning": "A breakpoint is a width at which the design changes its layout."
      },
      {
        "term": "orientation",
        "meaning": "Orientation describes whether the viewport is wider than it is tall."
      },
      {
        "term": "prefers-color-scheme",
        "meaning": "This media feature reports a user's light or dark color preference."
      }
    ],
    "examples": [
      {
        "title": "Allow a mobile layout viewport",
        "environment": "browser",
        "language": "html",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Reading page</title>\n</head>\n<body>\n  <p>A page that can use the mobile viewport width.</p>\n</body>\n</html>",
        "walkthrough": [
          "Step 1: The doctype requests standard HTML rendering so old layout modes are avoided.",
          "Step 2: html starts the document and identifies English as its language.",
          "Step 3: head opens the page settings section, which is not visible page content.",
          "Step 4: charset selects UTF-8 so text characters are decoded consistently.",
          "Step 5: viewport requests device-width layout and an initial scale of one for mobile rendering.",
          "Step 6: title names the browser tab Reading page.",
          "Step 7: body starts the visible page content.",
          "Step 8: p adds the sentence as an ordinary paragraph.",
          "Step 9: The browser shows the paragraph; in a 390px mobile test, the layout viewport is 390 CSS pixels wide."
        ],
        "output": "The tab is titled Reading page and a paragraph is visible. In a mobile browser configured with a 390px device viewport, the layout viewport is 390 CSS pixels wide."
      },
      {
        "title": "Add a column when space allows",
        "environment": "browser",
        "language": "css",
        "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<section class=\"lessons\" aria-label=\"Lessons\">\n  <article>HTML</article>\n  <article>CSS</article>\n</section>",
        "code": ".lessons {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n@media (min-width: 600px) {\n  .lessons { grid-template-columns: repeat(2, 1fr); }\n}",
        "walkthrough": [
          "Step 1: .lessons selects the list that will change its layout.",
          "Step 2: display: grid lets its articles occupy grid cells.",
          "Step 3: one flexible column makes the base layout a vertical list.",
          "Step 4: gap separates neighboring cards by 12px.",
          "Step 5: the media query opens an additional rule group at viewport widths of 600px or more.",
          "Step 6: the matching rule replaces one column with two equal columns for a roomier layout.",
          "Step 7: The browser shows stacked lessons at 599px and side-by-side lessons at 600px and 800px."
        ],
        "output": "At a 599px viewport the articles form one column with a 12px vertical gap. At 600px and 800px they form two equal columns with a 12px horizontal gap."
      }
    ],
    "keyPoints": [
      "Include the viewport meta setting in the document head.",
      "Write usable narrow styles before wider overrides.",
      "min-width includes the named width.",
      "Breakpoints should follow content needs.",
      "Media queries add conditional rules without removing unrelated base styles.",
      "Orientation and color preference describe conditions rather than device types."
    ],
    "commonMistakes": [
      "Omitting the viewport setting can make mobile width conditions behave unexpectedly.",
      "Picking breakpoints only from device names ignores the content's actual needs.",
      "Disabling zoom makes text harder to read for people who need enlargement."
    ],
    "links": [
      {
        "title": "How to Take the Right Approach to Responsive Web Design",
        "url": "https://www.freecodecamp.org/news/taking-the-right-approach-to-responsive-web-design/",
        "kind": "article",
        "language": "English",
        "why": "Shows small-screen styles first, then adds a min-width query with a short example."
      }
    ]
  },
  {
    "topicId": "hc-fluid-sizing",
    "summary": "Fluid sizes adjust to the space available. Image sizing rules preserve useful proportions, while responsive image choices can reduce unnecessary downloads.",
    "syntax": [
      {
        "title": "Bounded and compared sizes",
        "language": "css",
        "code": ".element {\n  font-size: clamp(1rem, 2vw, 2rem);\n  width: min(100%, 60rem);\n  min-height: max(12rem, 30vh);\n}",
        "parts": [
          {
            "part": ".element",
            "meaning": "Selects elements assigned the element class."
          },
          {
            "part": "font-size: clamp(1rem, 2vw, 2rem)",
            "meaning": "Sets font size using minimum, preferred and maximum values, in that order."
          },
          {
            "part": "2vw",
            "meaning": "Equals two percent of the viewport width."
          },
          {
            "part": "width: min(100%, 60rem)",
            "meaning": "Chooses the smaller of the containing block width and sixty root font sizes."
          },
          {
            "part": "min-height: max(12rem, 30vh)",
            "meaning": "Chooses the larger value as minimum height."
          },
          {
            "part": "30vh",
            "meaning": "Equals thirty percent of the viewport height."
          }
        ]
      },
      {
        "title": "Responsive image box and fitting",
        "language": "css",
        "code": "img {\n  width: 100%;\n  height: auto;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}",
        "parts": [
          {
            "part": "img",
            "meaning": "Selects image elements."
          },
          {
            "part": "width: 100%",
            "meaning": "Makes the image box as wide as its containing block."
          },
          {
            "part": "height: auto",
            "meaning": "Lets the browser calculate height using the preferred aspect ratio."
          },
          {
            "part": "aspect-ratio: 16 / 9",
            "meaning": "Sets the box preferred width-to-height ratio to sixteen divided by nine."
          },
          {
            "part": "object-fit: cover",
            "meaning": "Scales image content to fill the box while preserving its own ratio and cropping overflow."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Choose sizes with limits",
        "points": [
          "A fluid size grows or shrinks instead of staying fixed, like water filling different cups. A percentage width uses a share of the available width in simple layouts.",
          "The min() function picks the smallest of its values, so width: min(100%, 600px) fits narrow spaces. The max() function picks the largest value and can enforce a floor.",
          "The clamp() function chooses a preferred value between lower and upper limits. In clamp(160px, 50vw, 320px), vw means one percent of the browser viewing area width."
        ]
      },
      {
        "heading": "Fit images into the space",
        "points": [
          "An aspect ratio compares width with height. Set aspect-ratio: 2 / 1 and leave height automatic to make the box twice as wide as it is tall.",
          "The object-fit property controls how an image fills its own box. With cover, the picture keeps its proportions and fills the box, but its edges may be cropped.",
          "The srcset attribute lists alternative image files for the browser to choose from. With width labels such as 400w, add sizes to describe the expected displayed image width."
        ]
      }
    ],
    "terms": [
      {
        "term": "clamp()",
        "meaning": "This function keeps a preferred value between lower and upper limits."
      },
      {
        "term": "aspect ratio",
        "meaning": "An aspect ratio compares the width of a box with its height."
      },
      {
        "term": "object-fit",
        "meaning": "This property controls how image content fits its box."
      },
      {
        "term": "srcset",
        "meaning": "This image attribute supplies alternative image files to the browser."
      }
    ],
    "examples": [
      {
        "title": "An image box with limits",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <img class=\"photo\" alt=\"A blue rectangle\" src=\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27100%27%3E%3Cpath fill=%27skyblue%27 d=%27M0 0H400V100H0Z%27/%3E%3C/svg%3E\">\n</div>",
        "code": ".photo {\n  display: block;\n  width: clamp(160px, 50vw, 320px);\n  max-width: 100%;\n  aspect-ratio: 2 / 1;\n  object-fit: cover;\n}",
        "walkthrough": [
          "Step 1: Start the image rule.",
          "Step 2: Display the image as a block on its own line.",
          "Step 3: Prefer half the viewing area width, with limits of 160px and 320px.",
          "Step 4: Also prevent the image from exceeding its parent width.",
          "Step 5: Make the image box twice as wide as it is tall.",
          "Step 6: Fill that box with the picture while preserving the picture proportions and cropping excess content.",
          "Step 7: Close the image rule.",
          "Step 8: With at least 320px of parent space, the blue image box is 200px by 100px at a 400px viewing width and 320px by 160px at an 800px viewing width. The original 4:1 image is cropped to fill the 2:1 box."
        ],
        "output": "With at least 320px of parent space, the blue image box is 200px by 100px at a 400px viewing width and 320px by 160px at an 800px viewing width. The original 4:1 image is cropped to fill the 2:1 box."
      }
    ],
    "keyPoints": [
      "min() chooses the smaller value; max() chooses the larger.",
      "clamp() adds lower and upper limits.",
      "object-fit changes image content fitting, not the box size.",
      "Use sizes with width-based srcset choices."
    ],
    "commonMistakes": [
      "Setting both width and height to fixed values prevents aspect-ratio from choosing the automatic size.",
      "Omitting max-width can let a minimum width overflow a narrow parent."
    ],
    "links": [
      {
        "title": "Sizing Units",
        "url": "https://web.dev/learn/css/sizing",
        "kind": "article",
        "language": "English",
        "why": "Introduces percentages and viewing-area units used in fluid sizes."
      }
    ]
  },
  {
    "topicId": "hc-container-queries",
    "summary": "Container queries change styles according to the space around a component. They let the same component adapt inside a narrow sidebar or a wide main area.",
    "syntax": [
      {
        "title": "Named inline-size container query",
        "language": "css",
        "code": ".container {\n  container-type: inline-size;\n  container-name: panel;\n}\n@container panel (min-width: 30rem) {\n  .child { padding: 2rem; }\n}",
        "parts": [
          {
            "part": ".container",
            "meaning": "Selects elements assigned the container class."
          },
          {
            "part": "container-type: inline-size",
            "meaning": "Establishes inline-axis size containment and enables inline-size queries on descendants."
          },
          {
            "part": "container-name: panel",
            "meaning": "Assigns a name used to select an eligible query container."
          },
          {
            "part": "@container panel (min-width: 30rem)",
            "meaning": "Applies descendant rules when the nearest eligible panel container width is at least thirty rem."
          },
          {
            "part": ".child",
            "meaning": "Selects child-class descendants evaluated against an eligible ancestor container."
          },
          {
            "part": "padding: 2rem",
            "meaning": "Sets padding when the container condition matches."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Measure the surrounding box",
        "points": [
          "Imagine a note card placed in either a narrow shelf or a wide drawer. A container query checks the surrounding box so its contents can use the available space.",
          "A container is an element chosen for these checks. Set container-type: inline-size on it to allow size checks along the text direction, normally the width in horizontal writing.",
          "This setting makes that size independent of its contents. Give the container space through its parent layout or an explicit width; do not rely on its children to widen it."
        ]
      },
      {
        "heading": "Apply styles to its contents",
        "points": [
          "Write @container followed by a condition such as (min-width: 300px). Put ordinary style rules inside the braces; these rules apply when the selected container meets that condition.",
          "The rules style descendants, meaning elements nested inside the container. A size query cannot use the box being styled as its own container; add an outer wrapper when necessary.",
          "A media query checks things such as the viewport, meaning the browser viewing area. A container size query instead checks a suitable ancestor, meaning an outer element containing the styled element."
        ]
      }
    ],
    "terms": [
      {
        "term": "container",
        "meaning": "A container is an element selected as the basis for a query."
      },
      {
        "term": "container-type",
        "meaning": "This property enables particular container size checks."
      },
      {
        "term": "descendant",
        "meaning": "A descendant is an element nested inside another element."
      },
      {
        "term": "media query",
        "meaning": "A media query applies styles based on viewing conditions such as viewport width."
      }
    ],
    "examples": [
      {
        "title": "A card that responds to its wrapper",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"wrapper\">\n  <p class=\"card\">Reading notes</p>\n</div>",
        "code": ".wrapper { container-type: inline-size; width: 320px; }\n.card { background: lightgray; padding: 8px; }\n@container (min-width: 300px) {\n  .card { background: lightgreen; padding: 16px; }\n}",
        "walkthrough": [
          "Step 1: Make the wrapper a width-query container with a width of 320px.",
          "Step 2: Give the card a light gray background and 8px of inner spacing.",
          "Step 3: Check whether the surrounding query container is at least 300px wide.",
          "Step 4: When it is, use a light green background and 16px of inner spacing.",
          "Step 5: Close the container query.",
          "Step 6: Reading notes appears on a light green background with 16px padding because its wrapper is 320px wide. If the wrapper width is changed to 280px, the card becomes light gray with 8px padding."
        ],
        "output": "Reading notes appears on a light green background with 16px padding because its wrapper is 320px wide. If the wrapper width is changed to 280px, the card becomes light gray with 8px padding."
      }
    ],
    "keyPoints": [
      "Declare container-type on the outer element.",
      "Put conditional rules inside @container.",
      "Size queries style elements inside the container.",
      "The container width can differ from the viewport width."
    ],
    "commonMistakes": [
      "Putting container-type only on the element you want to restyle does not let it query its own size.",
      "Expecting children to determine a container width ignores inline size containment."
    ],
    "links": [
      {
        "title": "Container queries",
        "url": "https://web.dev/learn/css/container-queries",
        "kind": "article",
        "language": "English",
        "why": "Builds queries from a container declaration and a simple condition."
      }
    ]
  },
  {
    "topicId": "hc-custom-properties",
    "summary": "Custom properties store reusable CSS values under names you choose. Changing a few shared values can update a whole theme or one small part of a page.",
    "syntax": [
      {
        "title": "Root variables, fallbacks and overrides",
        "language": "css",
        "code": ":root {\n  --text-color: #222;\n}\n.element {\n  color: var(--text-color);\n  background-color: var(--surface-color, #fff);\n}\n.theme-dark { --text-color: #eee; }",
        "parts": [
          {
            "part": ":root",
            "meaning": "Selects the document root element."
          },
          {
            "part": "--text-color: #222",
            "meaning": "Defines an inherited custom property with a dark color value."
          },
          {
            "part": ".element",
            "meaning": "Selects elements that consume the custom properties."
          },
          {
            "part": "color: var(--text-color)",
            "meaning": "Uses the computed custom property value as the text color."
          },
          {
            "part": "background-color: var(--surface-color, #fff)",
            "meaning": "Uses the surface property, or white if that property is missing or guaranteed-invalid."
          },
          {
            "part": ".theme-dark",
            "meaning": "Selects the element whose custom property override is inherited by descendants."
          },
          {
            "part": "--text-color: #eee",
            "meaning": "Overrides the inherited text color property with a light color."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Give repeated values names",
        "points": [
          "Imagine a paint tin labeled main background. A custom property is a named CSS value that other declarations can reuse instead of repeating the color everywhere.",
          "A declaration is one property and value pair, such as color: navy. Define a custom property with two starting dashes, for example --ink: navy, inside a CSS rule.",
          "Use :root, a selector that matches the outer html element, to define page-wide defaults. A selector is the part of a rule that chooses which elements receive its declarations.",
          "Read the value with var(--ink), such as color: var(--ink). The paint label now connects to code: many pieces of text can read one named color instead of repeating navy."
        ]
      },
      {
        "heading": "Understand where values reach",
        "points": [
          "Ordinary custom properties inherit, meaning their values pass from an element to its children unless replaced. A default defined on html therefore reaches many parts of the page.",
          "Scope is the part of the page where a value applies. Define --ink on a card to give that card and its descendants a local color while neighboring cards keep theirs.",
          "A descendant is an element inside another element, at any depth. Local values travel down to descendants through inheritance; they do not travel upward to change a parent.",
          "Names are case-sensitive: --ink and --Ink differ. Choose consistent names describing each value's purpose, especially when several themes share it."
        ]
      },
      {
        "heading": "Use fallbacks correctly",
        "points": [
          "A fallback is a backup value used when the requested custom property is missing or unusable as a variable. Write color: var(--ink, navy) to provide that backup.",
          "A fallback does not check whether every stored value fits the receiving property. If --ink is 20px, substituting it into color is invalid even when var() includes navy afterward.",
          "You can store colors, lengths, or other useful value parts, but var() goes in property values. It cannot directly supply a selector, a property name, or an ordinary media-query condition.",
          "Change shared values instead of duplicating rules. When something looks wrong, inspect which value the element inherited and whether a local definition replaced it."
        ]
      },
      {
        "heading": "Build light and dark themes",
        "points": [
          "A theme is a coordinated set of appearance values. Start with --surface for the background and --ink for text, then use those names in the rules that draw each box.",
          "A data attribute stores a custom label in HTML, such as data-theme=\"dark\". The selector [data-theme=\"dark\"] can replace both values for that element and its descendants.",
          "For an automatic alternative, a media query, a condition controlling when CSS applies, can use prefers-color-scheme: dark. It reports a user's dark preference without requiring a scripted toggle."
        ]
      }
    ],
    "terms": [
      {
        "term": "custom property",
        "meaning": "A custom property stores a reusable CSS value under a name starting with two dashes."
      },
      {
        "term": ":root",
        "meaning": "In an HTML document, :root selects the outer html element."
      },
      {
        "term": "var()",
        "meaning": "The var() function inserts a custom property's value into another property value."
      },
      {
        "term": "inheritance",
        "meaning": "Inheritance passes certain values from a parent element to its children."
      },
      {
        "term": "scope",
        "meaning": "Scope describes the part of a page where a value or rule applies."
      },
      {
        "term": "fallback",
        "meaning": "A fallback is a backup used when a custom property cannot supply a variable value."
      }
    ],
    "examples": [
      {
        "title": "Read one named color",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <p class=\"note\">Shared ink</p>\n</div>",
        "code": ":root { --ink: #003366; }\n.note {\n  color: var(--ink, black);\n}",
        "walkthrough": [
          "Step 1: :root stores a dark blue ink value on the outer html element so children inherit it.",
          "Step 2: .note selects the paragraph that will use the value.",
          "Step 3: color reads --ink, using black only if the variable cannot supply a value.",
          "Step 4: The browser shows Shared ink in dark blue, with computed color rgb(0, 51, 102)."
        ],
        "output": "Shared ink appears in #003366 dark blue, reported as rgb(0, 51, 102)."
      },
      {
        "title": "Two locally scoped themes",
        "environment": "browser",
        "language": "css",
        "html": "<section class=\"panel\">Light lesson</section>\n<section class=\"panel\" data-theme=\"dark\">\n  Dark lesson\n  <p class=\"hint\">Local accent</p>\n</section>",
        "code": ":root { --surface: #fff; --ink: #111; }\n.panel {\n  background: var(--surface, white);\n  color: var(--ink, black);\n  padding: 16px;\n}\n[data-theme=\"dark\"] { --surface: #111; --ink: #fff; }\n.hint { --ink: #ffdf00; color: var(--ink); }",
        "walkthrough": [
          "Step 1: :root defines white surfaces and near-black text as the light defaults.",
          "Step 2: .panel selects both lesson boxes so they share presentation rules.",
          "Step 3: background reads each panel's surface value.",
          "Step 4: color reads each panel's ink value and passes text color down to children.",
          "Step 5: padding adds 16px of inside space on every side of each panel.",
          "Step 6: the dark attribute replaces the two values only in that section and its descendants.",
          "Step 7: .hint locally changes its ink to yellow and uses it for the hint text.",
          "Step 8: The browser shows a light panel, a dark panel, and a yellow hint inside the dark panel."
        ],
        "output": "The first panel has #111 text on #fff; the second has #fff text on #111. Local accent is #ffdf00, and both panels have 16px padding."
      }
    ],
    "keyPoints": [
      "Custom property names start with -- and are case-sensitive.",
      "Use :root for shared defaults and var() to read them.",
      "Ordinary custom properties inherit down the element tree.",
      "Local definitions can override shared defaults.",
      "var() fallbacks do not validate a value against the receiving property.",
      "Theme rules should update related text and background values together."
    ],
    "commonMistakes": [
      "Writing ink without two starting dashes does not define a custom property.",
      "Expecting a child override to change a parent's value reverses inheritance.",
      "Expecting var(--ink, navy) to fix --ink: 20px in a color declaration misunderstands the fallback."
    ],
    "links": [
      {
        "title": "Custom properties",
        "url": "https://web.dev/learn/css/custom-properties",
        "kind": "article",
        "language": "English",
        "why": "Introduces reusable values, inheritance, and fallbacks with small CSS examples."
      }
    ]
  },
  {
    "topicId": "hc-css-architecture",
    "summary": "CSS architecture is a plan for naming, sharing, and organizing styles. In a React app, a clear plan helps reusable pieces avoid accidental style conflicts.",
    "explanation": [
      {
        "heading": "Organize before the cupboard fills",
        "points": [
          "Think of a shared cupboard with labeled drawers. CSS architecture organizes styles so people can find rules and understand which parts of the page they affect.",
          "A class is a reusable label on an HTML element. A class selector, such as .card, matches that label throughout the document unless further limits apply.",
          "Global styles can match across the whole page. They suit common defaults, but a broad rule such as button { color: red; } can unexpectedly change buttons in unrelated features.",
          "Scoped styles restrict where names or rules apply. Different tools achieve this differently, so a file sitting beside a page component does not automatically make its ordinary CSS local."
        ]
      },
      {
        "heading": "Name meaningful pieces",
        "points": [
          "BEM means Block, Element, Modifier, a naming convention for related classes. A block is a standalone piece, an element is a part of it, and a modifier describes a variation.",
          "One common BEM spelling uses .card for the block, .card__title for a part, and .card--featured for a variation. Keep the base card class alongside the modifier in markup.",
          "BEM names remain ordinary global classes; underscores and dashes have no special browser meaning. People must follow the naming plan consistently.",
          "The cupboard labels become card__title in code, showing which drawer owns the title style. Avoid encoding every surrounding container into names, because layouts change."
        ]
      },
      {
        "heading": "Compose small jobs or local names",
        "points": [
          "Utility-first CSS combines small classes, each doing one focused job. A padding utility and a background utility can serve several different elements.",
          "Tailwind is a utility-first CSS tool that generates styles for its utility classes. Its class names need the generated stylesheet; typing those names into an unprepared HTML page does not create styles.",
          "CSS Modules are a tooling approach that gives local class names distinct generated names. A supported build process, which prepares source files for the browser, connects those names to the markup.",
          "Modules reduce accidental class-name collisions, meaning two unrelated styles sharing the same name. They do not block inherited text styles or every global rule from reaching an element inside a component."
        ]
      },
      {
        "heading": "Apply the plan in React",
        "points": [
          "A React component is a reusable piece of interface. JSX, the HTML-like notation often used to describe it, uses className to assign CSS classes rather than HTML's class spelling.",
          "Apps can use ordinary CSS, utility stylesheets, or CSS Modules with compatible tooling. React does not make imported ordinary CSS local.",
          "The React style attribute takes an object of individual style values, with names such as backgroundColor. Use classes for reusable states and styles that depend on hover or screen width."
        ]
      }
    ],
    "terms": [
      {
        "term": "CSS architecture",
        "meaning": "CSS architecture is a plan for organizing, naming, and sharing style rules."
      },
      {
        "term": "global styles",
        "meaning": "Global styles can match elements throughout the document."
      },
      {
        "term": "scoped styles",
        "meaning": "Scoped styles limit where particular rules or names apply."
      },
      {
        "term": "BEM",
        "meaning": "BEM names standalone pieces, their parts, and their variations with related classes."
      },
      {
        "term": "utility-first CSS",
        "meaning": "Utility-first CSS combines small classes that each perform a focused styling job."
      },
      {
        "term": "CSS Modules",
        "meaning": "CSS Modules use tooling to give local class names distinct generated names."
      }
    ],
    "examples": [
      {
        "title": "A small BEM part",
        "environment": "browser",
        "language": "css",
        "html": "<article class=\"card\">\n  <h2 class=\"card__title\">Lesson</h2>\n</article>",
        "code": ".card__title {\n  color: #003366;\n}",
        "walkthrough": [
          "Step 1: .card__title selects the named title part, making its ownership clear to readers.",
          "Step 2: color gives that heading the chosen dark blue text color.",
          "Step 3: The browser shows Lesson as a heading in rgb(0, 51, 102); BEM adds no special browser behavior."
        ],
        "output": "Lesson is a dark blue heading with computed color rgb(0, 51, 102)."
      },
      {
        "title": "BEM cards with shared utilities",
        "environment": "browser",
        "language": "css",
        "html": "<section aria-label=\"Lessons\">\n  <article class=\"card pad-16\"><h2 class=\"card__title\">HTML</h2></article>\n  <article class=\"card card--featured pad-16\">\n    <h2 class=\"card__title\">CSS</h2>\n    <p class=\"text-bold\">Recommended next</p>\n  </article>\n</section>",
        "code": ".card { border: 1px solid #555; }\n.card__title { margin: 0; font-size: 20px; }\n.card--featured { background: #fff4cc; }\n.pad-16 { padding: 16px; }\n.text-bold { font-weight: 700; }",
        "walkthrough": [
          "Step 1: .card supplies a shared 1px solid border for both standalone cards.",
          "Step 2: .card__title removes default heading margins and sets a consistent 20px title size.",
          "Step 3: .card--featured changes only the featured card's background to pale yellow.",
          "Step 4: .pad-16 is a handwritten utility adding 16px padding wherever it is used.",
          "Step 5: .text-bold is another utility requesting weight 700 for the recommendation.",
          "Step 6: The browser shows two bordered, padded cards with 20px headings; the CSS card is pale yellow and its recommendation is bold."
        ],
        "output": "Both cards have 1px borders, 16px padding, and 20px headings. Only the CSS card has a #fff4cc background; Recommended next uses font-weight 700."
      }
    ],
    "keyPoints": [
      "Ordinary CSS classes are global unless a scope mechanism restricts them.",
      "BEM is a naming convention rather than browser-enforced isolation.",
      "Utility classes combine focused reusable jobs.",
      "Tailwind needs its generated CSS.",
      "CSS Modules need compatible tooling and do not block all global effects.",
      "React uses className to assign classes in JSX."
    ],
    "commonMistakes": [
      "Assuming an ordinary CSS import becomes local to one React component can cause shared-page conflicts.",
      "Using a modifier without its base class can omit the component's shared appearance.",
      "Copying utility framework class names without loading their styles produces no intended styling."
    ],
    "links": [
      {
        "title": "CSS Naming Conventions that Will Save You Hours of Debugging",
        "url": "https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/",
        "kind": "article",
        "language": "English",
        "why": "Uses concrete BEM class names to explain how naming makes related styles easier to follow."
      }
    ]
  },
  {
    "topicId": "hc-rendering-performance",
    "summary": "Rendering is the work a browser does to turn a page into visible pixels. Choosing suitable CSS can reduce repeated work and keep interactions smooth.",
    "explanation": [
      {
        "heading": "Understand the browser work",
        "points": [
          "The browser draws a page in stages, like arranging furniture before painting a room. Rendering means turning the page content and its styles into the picture you see.",
          "Layout, also called reflow, calculates box sizes and positions. Changing width can repeat this work and move nearby content, so a small edit may affect several boxes.",
          "Paint creates the coloured pixels for those boxes; repaint repeats that drawing after a visual change. A background colour change usually needs paint without changing box sizes or positions."
        ]
      },
      {
        "heading": "Reduce repeated work",
        "points": [
          "Compositing combines already drawn layers into the final picture. Transform, which moves or reshapes a box visually, and opacity, which controls transparency, can often animate through this cheaper stage.",
          "The will-change property hints that a setting may change soon. Use it sparingly after measuring a problem; extra preparation can consume memory, and the hint does not guarantee faster drawing.",
          "Critical CSS means the small set of styles needed for initially visible content. Supplying it early can help the first display; keep it small and ensure remaining styles load too."
        ]
      }
    ],
    "terms": [
      {
        "term": "reflow",
        "meaning": "Reflow is another name for calculating layout sizes and positions."
      },
      {
        "term": "repaint",
        "meaning": "Repaint redraws pixels after a visual change."
      },
      {
        "term": "compositing",
        "meaning": "Compositing combines drawn layers into the displayed picture."
      },
      {
        "term": "critical CSS",
        "meaning": "Critical CSS contains styles needed for the initially visible content."
      }
    ],
    "examples": [
      {
        "title": "Move a box without changing its layout width",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <div class=\"tile\">Read</div>\n</div>",
        "code": ".tile { width: 100px; background: lightblue; }\n.tile { transform: translateX(20px); opacity: 0.8; }",
        "walkthrough": [
          "Step 1: Give the tile a layout width of 100px and a light blue background.",
          "Step 2: Draw it 20px right of its layout position with opacity set to 0.8, while keeping its layout width unchanged.",
          "Step 3: The browser shows Read on a light blue tile with opacity 0.8, shifted 20px to the right. Its layout width remains 100px; the transform does not reserve extra space beside it."
        ],
        "output": "The browser shows Read on a light blue tile with opacity 0.8, shifted 20px to the right. Its layout width remains 100px; the transform does not reserve extra space beside it."
      }
    ],
    "keyPoints": [
      "Width changes can trigger layout.",
      "Colour changes can require repainting.",
      "Transform and opacity are often cheaper animation choices.",
      "Measure before adding will-change.",
      "Keep critical CSS small."
    ],
    "commonMistakes": [
      "Assuming transform always avoids painting ignores differences between pages and browsers.",
      "Adding will-change to every element can waste memory."
    ],
    "links": [
      {
        "title": "The Front-End Performance Optimization Handbook: Tips and Strategies for Devs",
        "url": "https://www.freecodecamp.org/news/the-front-end-performance-optimization-handbook/",
        "kind": "article",
        "language": "English",
        "why": "The sections on reflows, repaints, transform, and opacity include concrete examples."
      }
    ]
  },
  {
    "topicId": "hc-debugging-crossbrowser",
    "summary": "Debugging CSS means finding why the browser drew something differently from what you expected. Browser tools and small checks help separate competing rules, size problems, and unsupported features.",
    "explanation": [
      {
        "heading": "Inspect before changing",
        "points": [
          "Think of checking a cupboard hinge before replacing the door. Debugging finds a problem's cause; first describe the expected and actual appearance clearly.",
          "DevTools are the browser's built-in inspection tools. Open them with Inspect on an element, a piece of HTML, so the selected box becomes the starting point for your investigation.",
          "Elements shows the current HTML structure. Check the selected item, its class labels, and surrounding elements before assuming its CSS is wrong.",
          "The Styles panel shows matching rules and where they came from. A crossed-out declaration, a property and value pair, often lost to another rule; warnings can identify invalid values."
        ]
      },
      {
        "heading": "Find the winning value",
        "points": [
          "The cascade chooses between competing declarations. It checks where rules come from, importance, layers (ordered rule groups), selector strength, and finally order when earlier checks tie.",
          "Specificity is the comparison of selector strength, meaning how strongly a rule's matching pattern targets an element. In otherwise equal ordinary rules, a class selector beats a plain element selector.",
          "The Computed panel reports resolved property values for the selected element. Expand a property where supported to trace contributing rules, then compare the value with the declaration you expected to win.",
          "Toggle one declaration at a time in Styles to test the cause. These temporary edits usually disappear on reload, so copy the confirmed correction back into the actual stylesheet."
        ]
      },
      {
        "heading": "Measure the box",
        "points": [
          "The box model describes content, padding inside its edge, a border around it, and margin outside it. DevTools often shows these layers as a diagram for the selected box.",
          "With the default content-box sizing, width sets the content width. A 200px content width plus 20px padding on each side and two 2px borders occupies 244px before margins.",
          "With box-sizing: border-box, the declared width includes padding and borders. The same box declared as 200px wide then has 156px of content, which the second example lets you inspect.",
          "The hinge comparison becomes a smaller CSS experiment: remove one possible cause and measure again. Check parent space too, because it affects child layout."
        ]
      },
      {
        "heading": "Check browser differences",
        "points": [
          "A vendor prefix is a browser-specific start to a property name, such as -webkit-. Older implementations sometimes need one; do not add prefixes blindly or assume they make unsupported features work.",
          "Check support on caniuse, a browser compatibility reference, including version notes. Use tables to guide investigation, then test important behavior in actual target browsers.",
          "A CSS reset replaces browser defaults with a chosen baseline. Removing body margins and standardizing box sizing can help without fixing every browser difference."
        ]
      }
    ],
    "terms": [
      {
        "term": "DevTools",
        "meaning": "DevTools are browser tools for inspecting and experimenting with a running page."
      },
      {
        "term": "cascade",
        "meaning": "The cascade is the process that chooses between competing CSS declarations."
      },
      {
        "term": "specificity",
        "meaning": "Specificity compares how strongly selectors target an element after earlier cascade checks tie."
      },
      {
        "term": "box model",
        "meaning": "The box model describes a box's content, padding, border, and margin."
      },
      {
        "term": "vendor prefix",
        "meaning": "A vendor prefix marks a browser-specific form of a CSS property or value."
      },
      {
        "term": "CSS reset",
        "meaning": "A CSS reset replaces selected browser defaults with a chosen starting point."
      }
    ],
    "examples": [
      {
        "title": "Find the rule that wins",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <p class=\"note\">Inspect my color</p>\n</div>",
        "code": ".note { color: blue; }\np { color: red; }",
        "walkthrough": [
          "Step 1: .note gives the matching paragraph blue text through its class selector.",
          "Step 2: p also targets the paragraph, but its element selector has lower specificity under the same cascade conditions.",
          "Step 3: The browser shows blue text; Styles shows the red declaration losing and Computed reports rgb(0, 0, 255)."
        ],
        "output": "Inspect my color is blue, with computed color rgb(0, 0, 255), even though the red rule appears later."
      },
      {
        "title": "Compare two measured boxes",
        "environment": "browser",
        "language": "css",
        "html": "<div class=\"box\">Content sizing</div>\n<div class=\"box fitted\">\n  Border sizing\n</div>",
        "code": "body { margin: 0; }\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  box-sizing: content-box;\n}\n.fitted { box-sizing: border-box; }",
        "walkthrough": [
          "Step 1: body removes the browser's outside page margin as a small reset.",
          "Step 2: .box selects both boxes so their width, padding, and border can be compared.",
          "Step 3: width requests a 200px width interpreted according to box-sizing.",
          "Step 4: padding adds 20px of space on every inside edge.",
          "Step 5: border adds a 2px black line on every edge.",
          "Step 6: content-box makes the first box's declared width describe only its content.",
          "Step 7: .fitted changes the second box so its 200px includes padding and borders.",
          "Step 8: The browser shows a 244px first box and a 200px second box, which can be checked in the box model view."
        ],
        "output": "The first box has 200px content and a 244px outer border width. The second has 156px content and a 200px outer border width. The page margin is 0."
      }
    ],
    "keyPoints": [
      "Inspect the actual element and its matching rules first.",
      "Styles explains declarations; Computed reports resolved values.",
      "Specificity matters after earlier cascade checks tie.",
      "Padding and borders enlarge a content-box width.",
      "Compatibility tables need version notes and actual browser checks.",
      "A reset changes chosen defaults rather than guaranteeing identical rendering."
    ],
    "commonMistakes": [
      "Assuming the last written rule always wins ignores the earlier cascade checks.",
      "Repeatedly forcing stronger overrides can hide the original cause of a style conflict.",
      "Treating a viewport simulation as proof of another browser's rendering leaves compatibility problems unchecked."
    ],
    "links": [
      {
        "title": "How to Use Chrome DevTools – Simple Strategies for Smarter Web Development",
        "url": "https://www.freecodecamp.org/news/chrome-devtools",
        "kind": "article",
        "language": "English",
        "why": "Shows how to inspect elements and experiment with styles using browser panels."
      }
    ]
  },
  {
    "topicId": "hc-css-accessibility",
    "summary": "Accessible CSS helps people see, navigate, and understand a page using different tools and settings. Clear focus, readable colors, careful hiding, and reduced motion all support that goal.",
    "syntax": [
      {
        "title": "Visible focus outline",
        "language": "css",
        "code": ".control:focus-visible {\n  outline: 2px solid #005fcc;\n  outline-offset: 2px;\n}",
        "parts": [
          {
            "part": ".control",
            "meaning": "Selects elements assigned the control class."
          },
          {
            "part": ":focus-visible",
            "meaning": "Matches focus when the browser determines a visible focus indicator is appropriate."
          },
          {
            "part": "outline: 2px solid #005fcc",
            "meaning": "Draws a solid blue focus outline; choose a color with sufficient contrast against adjacent backgrounds."
          },
          {
            "part": "outline-offset: 2px",
            "meaning": "Separates the outline from the element border by two CSS pixels."
          }
        ]
      },
      {
        "title": "Visually hidden noninteractive text",
        "language": "css",
        "code": ".visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap; border: 0;\n}",
        "parts": [
          {
            "part": ".visually-hidden",
            "meaning": "Hides noninteractive text visually while keeping it available to assistive technology; reveal focusable content when focused."
          },
          {
            "part": "position: absolute",
            "meaning": "Removes the element from normal flow."
          },
          {
            "part": "width: 1px;\n  height: 1px;",
            "meaning": "Reduces the box to one CSS pixel in each dimension."
          },
          {
            "part": "padding: 0",
            "meaning": "Removes inner spacing."
          },
          {
            "part": "margin: -1px",
            "meaning": "Offsets the tiny box with negative outer spacing."
          },
          {
            "part": "overflow: hidden",
            "meaning": "Clips content extending outside the box."
          },
          {
            "part": "clip-path: inset(50%)",
            "meaning": "Clips the visible region inward from every edge until no area remains."
          },
          {
            "part": "white-space: nowrap; border: 0;",
            "meaning": "Prevents text wrapping and removes the border."
          }
        ]
      }
    ],
    "explanation": [
      {
        "heading": "Keep a visible place marker",
        "points": [
          "Think of a bookmark showing your reading position. Focus is the element receiving keyboard input; visible focus styles show where the next action will happen.",
          "Use real links and buttons so keyboard behavior comes from HTML. Press Tab to move between available controls, and check that every stop has a clear visible marker.",
          "The :focus-visible selector matches focus when the browser judges an indicator appropriate, commonly for keyboard use. Add an outline, a line around the element.",
          "Never remove an outline with outline: none unless you provide an equally clear replacement. Also check that neighboring boxes do not cover or cut off your chosen focus marker."
        ]
      },
      {
        "heading": "Make text easy to distinguish",
        "points": [
          "Contrast is the difference in brightness between text and its background. A contrast ratio measures that difference numerically; choosing two colors that look different does not guarantee enough contrast.",
          "For ordinary text, the common minimum accessibility target is 4.5:1. Large text can use 3:1; large means at least 24 CSS pixels normally, or roughly 18.67 pixels when bold.",
          "A CSS pixel measures styles rather than necessarily one screen dot. Check contrast using the actual text and background colors in every theme.",
          "Do not use color as the only clue to meaning. Keep links underlined or add another clear cue, and describe errors with words instead of changing a border to red alone."
        ]
      },
      {
        "heading": "Hide only the visual part",
        "points": [
          "A screen reader is software that presents page information through speech or other accessible output. Sometimes extra wording should remain available to it while taking almost no visible space.",
          "A visually hidden class uses CSS to move a tiny text box out of normal layout and clip its visible area. This keeps useful words available without showing them in the ordinary design.",
          "Do not use display: none or visibility: hidden for text screen readers still need; these normally remove that content from accessible output. Use those properties when hiding the content from everyone is intended.",
          "The bookmark comparison returns with hidden controls: reveal a focusable link when reached. Otherwise, keep the link visible and hide only extra wording inside it."
        ]
      },
      {
        "heading": "Respect motion preferences",
        "points": [
          "A media query condition controls when CSS applies. The prefers-reduced-motion: reduce condition reports a preference for less movement, often from operating-system settings.",
          "A transition animates a property changing between values over time. Remove optional transitions and decorative movement when that preference matches, while keeping the information and controls available to the user.",
          "The reduced-motion condition does not stop movement by itself; your matching rules must make the change. An easy approach is to enable optional effects only under prefers-reduced-motion: no-preference."
        ]
      }
    ],
    "terms": [
      {
        "term": "focus",
        "meaning": "Focus identifies the element that currently receives keyboard input."
      },
      {
        "term": ":focus-visible",
        "meaning": "This selector matches focus when the browser judges that a visible indicator should be shown."
      },
      {
        "term": "contrast ratio",
        "meaning": "A contrast ratio measures the brightness difference between foreground and background colors."
      },
      {
        "term": "screen reader",
        "meaning": "A screen reader presents page information through speech or other accessible output."
      },
      {
        "term": "visually hidden",
        "meaning": "Visually hidden content is concealed on screen while remaining available to accessible reading tools."
      },
      {
        "term": "prefers-reduced-motion",
        "meaning": "This media feature reports whether a user has requested less movement."
      }
    ],
    "examples": [
      {
        "title": "Mark keyboard focus",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <a href=\"#lesson\">Read lesson</a>\n  <p id=\"lesson\">Lesson text</p>\n</div>",
        "code": "a { color: #003366; }\na:focus-visible {\n  outline: 3px solid #003366;\n  outline-offset: 3px;\n}",
        "walkthrough": [
          "Step 1: a makes the underlined link dark blue while keeping its native link behavior.",
          "Step 2: a:focus-visible selects the link when a visible focus indicator is appropriate, such as after Tab navigation.",
          "Step 3: outline draws a 3px dark blue marker so keyboard users can locate the focused link.",
          "Step 4: outline-offset separates the marker from the link's edge by 3px for clarity.",
          "Step 5: The browser shows an underlined dark blue Read lesson link; pressing Tab gives it a 3px outline with a 3px offset."
        ],
        "output": "The link is #003366 and underlined by the browser default. After keyboard focus, it has a 3px solid #003366 outline offset by 3px."
      },
      {
        "title": "Extra link wording with optional movement",
        "environment": "browser",
        "language": "css",
        "html": "<div>\n  <a class=\"download\" href=\"data:text/plain,Lesson\" download=\"lesson.txt\">Download<span class=\"sr-only\"> lesson text file</span></a>\n</div>",
        "code": ".sr-only {\n  position: absolute;\n  width: 1px; height: 1px;\n  padding: 0; margin: -1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap; border: 0;\n}\n.download { display: inline-block; color: #003366; background: white; }\n.download:focus-visible { outline: 3px solid #003366; outline-offset: 3px; }\n@media (prefers-reduced-motion: no-preference) {\n  .download { transition: transform 150ms; }\n  .download:hover { transform: translateY(-2px); }\n}",
        "walkthrough": [
          "Step 1: .sr-only selects just the extra descriptive words to hide visually.",
          "Step 2: absolute positioning removes those words from normal layout so they take no inline space.",
          "Step 3: width and height make their box 1px by 1px as part of the hiding pattern.",
          "Step 4: zero padding and a negative 1px margin keep that box from creating visible spacing.",
          "Step 5: overflow hides content extending beyond the tiny box.",
          "Step 6: clip-path cuts away the remaining visible area without removing the text from accessible output.",
          "Step 7: nowrap prevents wrapping, and border: 0 removes any border from the hidden span.",
          "Step 8: .download creates a movable inline box with dark blue text on white for strong contrast.",
          "Step 9: the focus rule gives keyboard users a visible outline around the link.",
          "Step 10: the media condition enables optional movement only when no reduced-motion preference is reported.",
          "Step 11: transition makes transform changes take 150 milliseconds under that condition.",
          "Step 12: hover moves the link upward 2px when the optional movement is enabled.",
          "Step 13: The browser visibly shows Download, exposes Download lesson text file as the link name, and leaves the link still when reduced motion is requested."
        ],
        "output": "Only Download is visible; its accessible name is Download lesson text file. Text is #003366 on white, about 12.6:1 contrast. With no reduced-motion preference, hover moves it up 2px over 150ms; with reduce, no transform transition or hover movement is applied."
      }
    ],
    "keyPoints": [
      "Keep a visible marker for keyboard focus.",
      "Never remove outlines without a clear replacement.",
      "Target at least 4.5:1 contrast for ordinary text and 3:1 for qualifying large text.",
      "Do not communicate meaning through color alone.",
      "Visually hidden text must remain available to accessible reading tools.",
      "Reduced-motion queries need rules that actually remove or avoid optional movement."
    ],
    "commonMistakes": [
      "Using outline: none without a replacement makes keyboard position difficult to see.",
      "Using display: none for extra spoken link text removes that text from accessible output.",
      "Leaving an invisible link focusable without revealing it creates an unseen keyboard stop.",
      "Assuming a reduced-motion media query automatically stops animations leaves movement unchanged."
    ],
    "links": [
      {
        "title": "Focus",
        "url": "https://web.dev/learn/css/focus",
        "kind": "article",
        "language": "English",
        "why": "Explains keyboard focus and visible focus styling through small browser examples."
      }
    ]
  }
];
