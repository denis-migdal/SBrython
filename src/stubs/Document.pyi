# 1. AoT commands/tools + docs...
# 2. Generate TS + JS/mix + module type...
# 3. Example of Python/TS pipelines (?)
# @inlineKlass(Number)
#
# 4. Solve Circular type def.
#   Somehow lazy parse (types) on demand ???
#       -> only for classes/classesType (fct/methods no circularity ?)
#       -> import : fixer ID, class X : search ID if exists. (only top level import)
#           -> structure to store...
#       -> ...
#   - 1. import system + several files + circular imports... (detect and resolve) [now = better ?]
#       import JS.document (etc.) ??
#   - 2. ignore : from __future__ import annotations at top of the file.
#   - 3. pre-creer le symbole...
#       -> SBrython exported {"package": [...]} -> top level body add/search
# 5. Callable (+ refactor functions type)
# 6. TypedDict + NotRequired
# 7. Final (for TS)

# TODO special : other than window + not found -> search in window
# TODO: constructors too...
# Missing features
#   static attribute/methods...
#   + async/iterators...

# https://developer.mozilla.org/en-US/docs/Web/API
# 1006 classes...

class Undefined:
    pass

undefined: Undefined

class Event:
    # TODO: read-only : Final[bool] (they are all RO)
    bubble: bool
    cancelable: bool
    composed: bool
    #TODO: Require circular type decl.
    # currentTarget: EventTarget
    defaultPrevented: bool
    # TODO: enum ?
    eventPhase: float
    NONE = 0.
    CAPTURING_PHASE = 1.
    AT_TARGET = 2.
    BUBBLING_PHASE = 3.
    isTrusted: bool
    #TODO: Require circular type decl.
    # target: EventTarget
    timeStamp: float
    type: str

    #TODO: Require circular type decl.
    # def composedPath(self) -> EventTarget : ...
    def preventDefault() -> Undefined: ...
    def stopImmediatePropagation() -> Undefined: ...
    def stopPropagation() -> Undefined: ...


# https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
class EventTarget:
    # TODO: listener type...
    # TODO: option/capture optional arg...
    # TODO: listener: This must be null, an object with a handleEvent() method, or a JavaScript function.
    def addEventListener(type: str, listener) -> Undefined: ...
    def removeEventListener(type: str, listener) -> Undefined: ...

    def dispatchEvent(event: Event) -> bool: ...

# TODO
class NodeList:
    length: float
    # entries
    # values
    # keys
    # forEach
    #def item(self, index:float, /) -> None: ...

class Node(EventTarget):
    # TODO: RO
    baseURI: str
    childNodes: NodeList
    firstChild: Node|None
    isConnected: bool
    lastChild: Node|None
    nextSibling: Node|None
    nodeName: str
    # TODO: enum ?
    nodeType: float
    ELEMENT_NODE = 0.
    ATTRIBUTE_NODE = 1.
    TEXT_NODE = 3.
    CDATA_SECTION_NODE = 4.
    PROCESSING_INSTRUCTION_NODE = 7.
    COMMENT_NODE = 8.
    DOCUMENT_NODE = 9.
    DOCUMENT_TYPE_NODE = 10.
    DOCUMENT_FRAGMENT_NODE = 11.
    # RW:
    nodeValue: str|None
    # TODO: Circular types + RO
    # ownerDocument: Document|None
    # parentElement: Element|None
    parentNode: Node|None
    previousSibling: Node|None
    textContent: str|None

    def appendChild(self, child: Node) -> Node: ...
    def cloneNode(self, deep: bool = False) -> Node: ...
    def compareDocumentPosition(self, otherNode: Node) -> float: ...
    DOCUMENT_POSITION_DISCONNECTED = 1.
    DOCUMENT_POSITION_PRECEDING = 2.
    DOCUMENT_POSITION_FOLLOWING = 4.
    DOCUMENT_POSITION_CONTAINS = 8.
    DOCUMENT_POSITION_CONTAINED_BY = 16.
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32.
    def contains(self, otherNode: Node|None) -> bool: ...
    # TODO: options
    # https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
    def getRootNode(self) -> Node: ...
    def hasChildNodes(self) -> bool: ...
    def insertBefore(self, newNode: Node, referenceNode: Node|None) -> Node: ...
    def isDefaultNamespace(self, namespaceURI: str|None) -> bool: ...
    def isEqualNode(self, otherNode: Node|None) -> bool: ...
    def isSameNode(self, otherNode: Node|None) -> bool: ...
    def lookupNamespaceURI(self, prefix: str|None) -> str|None: ...
    def lookupPrefix(self, namespace: str|None) -> str|None: ...
    def normalize(self) -> Undefined: ...
    def removeChild(self, child: Node) -> Undefined: ...
    # TODO: can be generic
    def replaceChild(self, newChild: Node, oldChild: Node) -> Node: ...

# TODO

# Getter/setter/deleter
class DOMStringMap:
    pass

class CSSStyleDeclaration:
    cssFloat: str
    cssText: str
    length: float
    #parentRule: CSSRule
    
    def getPropertyPriority(self, property: str, /) -> str: ...
    def getPropertyValue(self, property: str, /) -> str: ...
    def item(self, index: float, /) -> str: ...
    def removeProperty(self, property: str, /) -> str: ...
    def setProperty(self, propertyName: str, value: str, priority: str = "") -> Undefined : ...

# TODO extends (Element) [out of order too...]
class HTMLElement:

    accessKeyLabel: str
    autofocus: bool
    contentEditable: str
    dataset: DOMStringMap
    dir: str
    draggable: bool
    enterKeyHint: str
    hidden: bool
    inert: bool
    innerText: str
    inputMode: str
    isContentEditable: bool
    lang: str
    nonce: float
    offsetHeight: float
    offsetLeft: float
    offsetParent: float
    offsetTop: float
    offsetWidth: float
    outerText: str
    popover: str
    spellcheck: bool
    style: CSSStyleDeclaration|None
    tabIndex: float
    title: str
    translate: bool

    # attachInternals
    def blur(self) -> Undefined: ...
    def click(self) -> Undefined: ...
    def focus(self) -> Undefined: ...
    def hidePopover(self) -> Undefined: ...
    # TODO: options
    def showPopover(self) -> Undefined: ...
    # TODO:
    def togglePopover(self, force=False, /) -> Undefined: ...




class HTMLSlotElement(HTMLElement):
    pass

class NamedNodeMap:
    # RO
    length: float
    # def getNamedItem(self, name: str, /) -> Attr|None: ...
    # def getNamedItemNS(self, namespace: str, localName: str, /) -> Attr|None: ...
    # def item(self, index: float, /) -> Attr|None: ...
    # def removeNamedItem(self, attrName: str, /) -> Attr: ...
    # def removeNamedItemNS(self, namespace: str, localName: str, /) -> Attr: ...
    # def setNamedItem(self, attr: Attr, /) -> Attr|None: ...
    # def setNamedItemNS(self, attr: Attr, /) -> Attr|None: ...

class HTMLCollection:
    length: float
    # def item(self, index: float, /) -> Element|None: ...
    # def namedItem(self, key: str, /) -> Element|None: ...

class DOMTokenList:
    length: float
    value: str

    def add(self, token1: str, /) -> Undefined: ...
    def contains(self, token: str, /) -> bool: ...
    # entries : iterator
    # forEach
    def item(self, index: float, /) -> str|None: ...
    # keys
    def remove(self, token1: str, /) -> Undefined: ...
    def replace(self, oldToken: str, newToken: str, /) -> bool: ...
    def supports(self, token: str, /) -> bool: ...
    def toggle(self, token: str, force: bool = False, /) -> bool: ...
    def toString(self, /) -> str: ...
    # values

class StyleSheet:
    # RW
    disabled: bool
    # RO
    href: str
    # media: MediaList
    ownerNode: Node
    parentStyleSheet: StyleSheet
    title: str
    type: str

class CSSRule:
    # RO
    cssText: str
    parentRule: CSSRule|None
    parentStyleSheet: StyleSheet

class CSSRuleList:
    # RO
    length: float
    def item(self, index: float, /) -> CSSRule|None: ...

class CSSImportRule(CSSRule):
    # RO
    href: str
    layerName: str|None
    # media : MediaList
    # styleSheet: CSSStyleSheet
    supportsText: str|None

class CSSStyleSheet(StyleSheet):
    # RO
    cssRules: CSSRuleList
    ownerRule: CSSImportRule|None

    def deleteRule(self, index: float, /) -> Undefined: ...
    def insertRule(self, rule: str, index: float = 0., /) -> float: ...
    #TODO:  Async : replace
    def replaceSync(self, text: str, /) -> Undefined: ...


class StyleSheetList:
    # RO
    length: float
    def item(self, index: float, /) -> CSSStyleSheet|None: ...


class DocumentFragment(Node):
    childElementCount: float
    children: HTMLCollection
    #firstElementChild: Element|None
    lastElementChild: Element|None
    
    def append(self, param1: Node, /) -> Undefined: ...
    #def getElementById(self, id: str, /) -> Element|None: ... + generic
    def prepend(self, param1: Node, /) -> Undefined: ...
    #def querySelector[T: Element](self, selectors: str, /) -> T|None:: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...


class ShadowRoot(DocumentFragment):
    # RO + circular...
    # activeElement: Element|None
    # adoptedStyleSheets (array)
    clonable: bool
    delegatesFocus: bool
    # fullscreenElement (limited)
    # host: Element
    innerHTML: str|None
    # TODO: enum ?
    mode: str
    # pointerLockElement: Element|None
    serializable: bool
    # TODO: enum ?
    slotAssignment: str
    styleSheets: StyleSheetList

    # getAnimations
    #TODO: opts
    def getHTML(self, /) -> str: ...
    def setHTMLUnsafe(self, html: str, /) -> Undefined: ...

class DOMRect:
    # RW
    height: float
    width: float
    x: float
    y: float
    # TODO: static
    # fromRect()

    # RO
    top: float
    bottom: float
    left: float
    right: float

class Attr(Node):
    # RO
    localName: str
    name: str
    namespaceURI: str
    # ownerElement: Element # circular ?
    prefix: str|None
    value: str


# https://developer.mozilla.org/en-US/docs/Web/API/Element
# no aria (too much)
class Element(Node):
    # RO
    assignedSlot: HTMLSlotElement|None
    attributes: NamedNodeMap
    childElementCount: float
    children: HTMLCollection
    classList: DOMTokenList
    # RW
    className: str
    # RO
    clientHeight: float
    clientLeft: float
    clientTop: float
    clientWidth: float
    currentCSSZoom: float
    firstElementChild: Element|None
    id: str
    # RW
    innerHTML: str
    lastElementChild: Element|None
    localName: str
    namespaceURI: str|None
    nextElementSibling: Element|None
    outerHTML: str
    part: DOMTokenList
    prefix: str|None
    previousElementSibling: Element|None
    # RW
    role: str|None
    # RW
    scrollHeight: float
    scrollLeft: float
    scrollTop: float
    scrollWidth: float
    # RO
    shadowRoot: ShadowRoot|None
    slot: str
    tagName: str

    #TODO: *args
    def after(self, node1: Node, /) -> Undefined: ...
    # def animate()
    def append(self, param1: None, /) -> Undefined: ...
    #TODO: attachShadow
    def before(self, node1: Node, /) -> Undefined: ...
    #TODO: checkVisibility
    def closest(self, selectors: str, /) -> Element|None: ...
    # TODO: computedStyleMap (limited)
    # TODO: getAnimations
    def getAttribute(self, attributeName: str, /) -> str|None: ...
    #TODO getAttributeNames (list)
    def getAttributeNode(self, attrName: str, /) -> Attr: ...
    def getAttributeNodeNS(self, namespace: str, attrName: str, /) -> Attr: ...
    def getAttributeNS(self, namespace: str, attributeName: str, /) -> str|None: ...
    def getBoundingClientRect(self, /) -> DOMRect: ...
    #TODO getClientRects
    def getElementsByClassName(self, names: str, /) -> HTMLCollection: ...
    def getElementsByTagName(self, tagName: str, /) -> HTMLCollection: ...
    def getElementsByTagNameNS(self, namespaceURI: str, localName: str, /) -> HTMLCollection: ...
    # TODO: options
    def getHTML(self, /) -> str: ...
    def hasAttribute(self, name: str, /) -> bool: ...
    def hasAttribute(self, namespace: str, localName: str, /) -> bool: ...
    def hasAttributes(self, /) -> bool: ...
    # TODO: pointerId ?
    def hasPointerCapture(self, pointerId: float, /) -> bool: ...
    # TODO: more restrictive position str
    def insertAdjacentElement(self, position: str, element: Element, /) -> Element|None: ...
    def insertAdjacentHTML(self, position: str, text: str, /) -> Undefined: ...
    def insertAdjacentText(self, where: str, data: str, /) -> Undefined: ...
    def matches(self, selectors: str, /) -> bool: ...
    # moveBefore
    #TODO:
    def prepend(self, param1: Node, /) -> Undefined: ...
    def querySelector[T: Element](self, selectors: str, /) -> T|None: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def releasePointerCapture(self, pointerId: float, /) -> Undefined: ...
    def remove(self) -> Undefined: ...
    def removeAttribute(self, attrName: str, /) -> Undefined: ...
    def removeAttributeNode(self, attributeNode: Attr, /) -> Node: ...
    def removeAttributeNS(self, namespace: str, attrName: str, /) -> Undefined: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    def replaceWith(self, param1: Node, /) -> Undefined: ...
    # requestFullScreen (limited)
    # requestPointerLock (limited)
    # TODO: 2 possibilites :
    def scroll(self, x: float, y: float, /) -> Undefined: ...
    # TODO: 2 possibilites :
    def scrollBy(self, x: float, y: float, /) -> Undefined: ...
    # TODO: options
    def scrollIntoView(self) -> Undefined: ...
    # TODO: 2 possibilites :
    def scrollTo(self, x: float, y: float, /) -> Undefined: ...
    def setAttribute(self, name: str, value: str|None, /) -> Undefined: ...
    def setAttributeNode(self, attribute: Attr, /) -> Attr|None: ...
    def setAttributeNodeNS(self, attributeNode: Attr, /) -> Attr|None: ...
    def setAttributeNS(self, namespace: str, name: str, value: str|None, /) -> Undefined: ...
    def setHTMLUnsafe(self, html: str, /) -> Undefined: ...
    def setPointerCapture(self, pointerId: float, /) -> Undefined: ...
    def toggleAttribute(self, name: str, toggle: bool = False, /) -> bool: ...

class HTMLBodyElement(HTMLElement):
    pass

class HTMLHeadElement(HTMLElement):
    pass

class HTMLScriptElement:
    # async ?
    crossOrigin: str
    defer: bool
    fetchPriority: str
    integrity: str
    nomodule: bool
    referrerPolicy: str
    str: str
    text: str
    type: str
    # static support

class DOMStringList:
    length: float
    def contains(self, string: str, /) -> bool: ...
    def item(self, index: float, /) -> str|None: ...

class URLSearchParams:
    size: float

    def append(self, name: str, value: str, /) -> Undefined: ...
    def delete(self, name: str, value: str|Undefined = undefined, /) -> Undefined: ...
    # entries/forEach/keys/values
    def get(self, name: str) -> str|None: ...
    # getAll (array)
    def has(self, name: str, value: str|Undefined = undefined, /) -> bool: ...
    def set(self, name: str, value: str, /) -> Undefined: ...
    def sort(self) -> Undefined: ...
    def toString(self) -> str: ...

class URL:
    hash: str
    host: str
    hostname: str
    href: str
    origin: str
    pathname: str
    port: str
    protocol: str
    search: str
    searchParams: URLSearchParams
    username: str

    # static
    # canParse + createObjectURL + parse + revokeObjectURL
    def toJSON(self) -> str: ...
    def toString(self) -> str: ...

class Location:
    ancestorOrigins: DOMStringList
    hash: str
    host: str
    hostname: str
    href: str
    origin: str
    pathname: str
    port: str
    protocol: str
    search: str

    def assign(self, url: str|URL, /) -> Undefined: ...
    def reload(self) -> Undefined: ...
    def replace(self, url: str|URL, /) -> Undefined: ...
    def toString(self) -> Undefined: ...

class Window(EventTarget):
    # caches
    closed: bool
    # cookieStore
    crossOriginIsolated: bool
    # crypto
    # customElements
    # document: Document
    frameElement: HTMLElement|None
    # frames
    # history
    # indexedDB
    innerHeight: float
    innerWidth: float
    isSecureContext: bool
    length: float
    # localStorage
    location: Location
    # locationBar
    # menubar
    name: str
    # navigator
    # opener
    origin: str
    originAgentCluster: bool
    outerHeight: float
    outerWidth: float
    parent: Window
    # performance
    # personalbar
    # screen
    screenLeft: float
    screenTop: float
    screenX: float
    screenY: float
    # scrollbars
    scrollX: float
    scrollY: float
    self: Window
    # sessionStorage
    # speechSynthesis
    # statusbar
    # toolbar
    top: Window
    # visualViewport
    window: Window

    def alert(self, message: str = "", /) -> Undefined: ...
    def atob(self, encodedData: str, /) -> str: ...
    def btoa(self, stringToEncode: str, /) -> str: ...
    def cancelAnimationFrame(self, requestID: float, /) -> Undefined: ...
    def clearInterval(self, intervalID: float, /) -> Undefined: ...
    def clearTimeout(self, timeoutID: float, /) -> Undefined: ...
    def close(self) -> Undefined: ...
    def confirm(self, message: str = "", /) -> bool: ...
    # createImageBitmap
    # fetch
    def focus(self) -> Undefined: ...
    def getComputedStyle(self, element: Element, pseudoElt: str|None = None, /) -> CSSStyleDeclaration: ...
    # getSelection
    # matchMedia
    def moveBy(self, deltaX: float, deltaY: float, /) -> Undefined: ...
    def moveTo(self, deltaX: float, deltaY: float, /) -> Undefined: ...
    def open(self, url: str = "", target: str = "", windowFeatures: str = "", /) -> Window|None: ...
    def postMessage(self, message, targetOrigin: str = "", /) -> Undefined: ...
    def print(self) -> Undefined: ...
    def prompt(self, message: str, defaultValue: str|None = None, /) -> str|None: ...
    # queueMicrotask
    # reportError
    # requestAnimationFrame

    def resizeBy(self, deltaX: float, deltaY: float, /) -> Undefined: ...
    def resizeTo(self, width: float, height: float, /) -> Undefined: ...
    def scroll(self, xCoord: float, yCoord: float, /) -> Undefined: ...
    def scrollBy(self, xCoord: float, yCoord: float, /) -> Undefined: ...
    def scrollTo(self, xCoord: float, yCoord: float, /) -> Undefined: ...
    # def setInterval(self, )
    # def setTimeout
    def stop(self) -> Undefined: ...
    # TODO: generic
    def structuredClone(self, value, /): ...


window: Window

class DocumentType(Node):
    name: str
    publicId: str
    systemId: str

    def after(self, param1: Node, /) -> Undefined: ...
    def before(self, param1: Node, /) -> Undefined: ...
    def remove(self) -> Undefined: ...
    def replaceWith(self, node1: Node, /) -> Undefined: ...

# https://developer.mozilla.org/en-US/docs/Web/API/Document/
# also lot of methods...
class Document(Node):
    activeElement: Element|None
    adoptedStyleSheets: CSSStyleSheet
    body: HTMLBodyElement
    characterSet: str
    childElementCount: float
    children: HTMLCollection
    compatMode: str
    contentType: str
    cookie: str
    currentScript: HTMLScriptElement|None
    defaultView: Window|None
    designMode: str
    dir: str
    doctype: DocumentType
    documentElement: Element
    documentURI: str
    embeds: HTMLCollection
    firstElementChild: HTMLElement|None
    #fonts: FontFaceSet
    forms: HTMLCollection
    #fragmentDirective: FragmentDirective
    head: HTMLHeadElement
    hidden: bool
    images: HTMLCollection
    #implementation: DOMImplementation
    lastElementChild: Element|None
    lastModified: str
    links: HTMLCollection
    location: Location
    plugins: HTMLCollection
    readyState: str
    referrer: str
    scripts: HTMLCollection
    scrollingElement: Element
    styleSheets: StyleSheetList
    # timeline
    title: str
    URL: str
    visibilityState: str

    # static parseHTMLUnsafe
    def adoptNode(self, externalNode: Node, /) -> Node: ...
    def append(self, param1: Node, /) -> Undefined: ...
    def close(self) -> Undefined: ...
    def createAttribute(self, name: str, /) -> Attr: ...
    def createAttributeNS(self, namespaceURI: str, qualifiedName: str, /) -> Attr: ...
    def createCDATASection(self, data:str, /) -> Node: ...
    def createComment(self, data: str, /) -> Node: ...
    def createDocumentFragment(self) -> DocumentFragment: ...
    # TODO: options
    def createElement(self, localName: str, /) -> Element: ...
    def createElementNS(self, namespaceURI: str, qualifiedName: str) -> Element: ...
    # createExpression
    # createNodeIterator
    # createProcessingInstruction
    # createRange
    def createTextNode(self, data: str, /) -> Node: ...
    # createTreeWalker
    def elementFromPoint(self, x: float, y: float) -> Element: ...
    # elementsFromPoint (array)
    # evaluate (XPath)
    # getAnimations
    def getElementById[T: Element](self, selectors: str, /) -> T|None: ...
    def getElementsByClassName(self, names:str, /) -> HTMLCollection: ...
    def getElementsByName(self, name:str, /) -> HTMLCollection: ...
    def getElementsByTagName(self, name:str, /) -> HTMLCollection: ...
    def getElementsByTagNameNS(self, namespace: str, name: str, /) -> HTMLCollection: ...
    # getSelection
    def hasFocus(self) -> bool: ...
    def hasStorageAccess(self) -> bool: ...
    def importNode[T: Node](self, externalNode: T, deep: bool = False) -> T: ...
    def open(self) -> Undefined: ...
    def prepend(self, param1: Node) -> Undefined: ...
    def querySelector[T: Element](self, selectors: str, /) -> T|None: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    # TODO: options + promise
    # def requestStorageAccess(self): 
    def writeln(self, line: str, /) -> Undefined: ...

# TODO (inherit EventTarget)
# https://developer.mozilla.org/en-US/docs/Web/API/Window
# 49 props + 34 methods

# TODO: other API...

document: Document