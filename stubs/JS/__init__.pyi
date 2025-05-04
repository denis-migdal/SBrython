# Missing:
#
# - some API (mainly in Window)
# - docstring + options + generics (when possible)
# - https://developer.mozilla.org/en-US/docs/Web/API (1006 classes)
#
# - Callable[] (requires fct type refactor...)
# - NotRequired[]
# - static methods
# - add constructors + special methods (__getattr__ etc)
# - @overload
# - iterators
#
# - special stubs parser
# - circular type hints
#   - split into separate files
#   - better import system.

from typing import Final
from typing import TypedDict
from typing import ClassVar

class Undefined:
    pass

undefined: Undefined
"""
The undefined global property represents the primitive value undefined. It is one of JavaScript's primitive types.

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
"""

class Event:
    """
    The Event interface represents an event which takes place on an EventTarget.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event
    """
    bubble: Final[bool]
    """
    The bubbles read-only property of the Event interface indicates whether the event bubbles up through the DOM tree or not.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles
    """
    cancelable: Final[bool]
    composed: Final[bool]
    currentTarget: Final[EventTarget]
    defaultPrevented: Final[bool]
    # TODO: enum ?
    eventPhase: Final[float]
    NONE: ClassVar[float] = 0.
    CAPTURING_PHASE: ClassVar[float] = 1.
    AT_TARGET: ClassVar[float] = 2.
    BUBBLING_PHASE: ClassVar[float] = 3.
    isTrusted: Final[bool]
    target: Final[EventTarget]
    timeStamp: Final[float]
    type: Final[str]

    def composedPath(self) -> EventTarget : ...
    def preventDefault(self) -> Undefined: ...
    def stopImmediatePropagation(self) -> Undefined: ...
    def stopPropagation(self) -> Undefined: ...


# https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
class EventTarget:
    # TODO: listener type...
    # TODO: option/capture optional arg...
    # TODO: listener: This must be null, an object with a handleEvent() method, or a JavaScript function.
    # def addEventListener(self, type: str, listener, /) -> Undefined: ...
    # def removeEventListener(self, type: str, listener, /) -> Undefined: ...

    def dispatchEvent(self, event: Event, /) -> bool: ...

class NodeList:
    length: Final[float]
    # entries
    # values
    # keys
    # forEach
    def item(self, index: float, /) -> Node: ...

class GetRootNodeOptions(TypedDict):
    """
    An object that sets options for getting the root node.
    """
    composed: bool
    """
    A boolean value that indicates whether the shadow root should be returned (false, the default), or a root node beyond shadow root (true).
    """

class Node(EventTarget):
    baseURI: Final[str]
    childNodes: Final[NodeList]
    firstChild: Final[Node|None]
    isConnected: Final[bool]
    lastChild: Final[Node|None]
    nextSibling: Final[Node|None]
    nodeName: Final[str]
    nodeType: Final[float]
    ELEMENT_NODE: ClassVar[float] = 0.
    ATTRIBUTE_NODE: ClassVar[float] = 1.
    TEXT_NODE: ClassVar[float] = 3.
    CDATA_SECTION_NODE: ClassVar[float] = 4.
    PROCESSING_INSTRUCTION_NODE: ClassVar[float] = 7.
    COMMENT_NODE: ClassVar[float] = 8.
    DOCUMENT_NODE: ClassVar[float] = 9.
    DOCUMENT_TYPE_NODE: ClassVar[float] = 10.
    DOCUMENT_FRAGMENT_NODE: ClassVar[float] = 11.
    nodeValue: str|None
    ownerDocument: Final[Document|None]
    parentElement: Final[Element|None]
    parentNode: Final[Node|None]
    previousSibling: Final[Node|None]
    textContent: Final[str|None]

    def appendChild(self, child: Node) -> Node: ...
    def cloneNode(self, deep: bool = False) -> Node: ...
    def compareDocumentPosition(self, otherNode: Node) -> float: ...
    DOCUMENT_POSITION_DISCONNECTED: ClassVar[float] = 1.
    DOCUMENT_POSITION_PRECEDING: ClassVar[float] = 2.
    DOCUMENT_POSITION_FOLLOWING: ClassVar[float] = 4.
    DOCUMENT_POSITION_CONTAINS: ClassVar[float] = 8.
    DOCUMENT_POSITION_CONTAINED_BY: ClassVar[float] = 16.
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: ClassVar[float] = 32.
    def contains(self, otherNode: Node|None) -> bool: ...
    def getRootNode(self, options: GetRootNodeOptions|None = None) -> Node: ...
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
    cssFloat: Final[str]
    cssText: Final[str]
    length: Final[float]
    parentRule: Final[CSSRule]
    
    def getPropertyPriority(self, property: str, /) -> str: ...
    def getPropertyValue(self, property: str, /) -> str: ...
    def item(self, index: float, /) -> str: ...
    def removeProperty(self, property: str, /) -> str: ...
    def setProperty(self, propertyName: str, value: str, priority: str = "") -> Undefined : ...

class NamedNodeMap:
    length: Final[float]
    def getNamedItem(self, name: str, /) -> Attr|None: ...
    def getNamedItemNS(self, namespace: str, localName: str, /) -> Attr|None: ...
    def item(self, index: float, /) -> Attr|None: ...
    def removeNamedItem(self, attrName: str, /) -> Attr: ...
    def removeNamedItemNS(self, namespace: str, localName: str, /) -> Attr: ...
    def setNamedItem(self, attr: Attr, /) -> Attr|None: ...
    def setNamedItemNS(self, attr: Attr, /) -> Attr|None: ...

class HTMLCollection:
    length: Final[float]
    def item(self, index: float, /) -> Element|None: ...
    def namedItem(self, key: str, /) -> Element|None: ...

class DOMTokenList:
    length: Final[float]
    value: Final[str]

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
    disabled: bool
    href: Final[str]
    # media: MediaList
    ownerNode: Final[Node]
    parentStyleSheet: Final[StyleSheet]
    title: Final[str]
    type: Final[str]

class CSSRule:
    cssText: Final[str]
    parentRule: Final[CSSRule|None]
    parentStyleSheet: Final[StyleSheet]

class CSSRuleList:
    length: Final[float]
    def item(self, index: float, /) -> CSSRule|None: ...

class CSSImportRule(CSSRule):
    href: Final[str]
    layerName: Final[str|None]
    # media : MediaList
    styleSheet: Final[CSSStyleSheet]
    supportsText: Final[str|None]

class CSSStyleSheet(StyleSheet):
    cssRules: Final[CSSRuleList]
    ownerRule: Final[CSSImportRule|None]

    def deleteRule(self, index: float, /) -> Undefined: ...
    def insertRule(self, rule: str, index: float = 0., /) -> float: ...
    async def replace(self, text: str, /) -> Undefined: ...
    def replaceSync(self, text: str, /) -> Undefined: ...


class StyleSheetList:
    length: Final[float]
    def item(self, index: float, /) -> CSSStyleSheet|None: ...


class DocumentFragment(Node):
    childElementCount: Final[float]
    children: Final[HTMLCollection]
    firstElementChild: Final[Element|None]
    lastElementChild: Final[Element|None]
    
    def append(self, param1: Node, /) -> Undefined: ...
    def getElementById(self, id: str, /) -> Element|None: ...
    def prepend(self, param1: Node, /) -> Undefined: ...
    def querySelector(self, selectors: str, /) -> Element|None: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...


class ShadowRoot(DocumentFragment):
    activeElement: Final[Element|None]
    # adoptedStyleSheets (array)
    clonable: Final[bool]
    delegatesFocus: Final[bool]
    # fullscreenElement (limited)
    host: Final[Element]
    innerHTML: Final[str|None]
    # TODO: enum ?
    mode: Final[str]
    pointerLockElement: Final[Element|None]
    serializable: Final[bool]
    # TODO: enum ?
    slotAssignment: Final[str]
    styleSheets: Final[StyleSheetList]

    # getAnimations
    #TODO: opts
    def getHTML(self, /) -> str: ...
    def setHTMLUnsafe(self, html: str, /) -> Undefined: ...

class DOMRect:
    height: float
    width: float
    x: float
    y: float
    # TODO: static
    # fromRect()

    top: Final[float]
    bottom: Final[float]
    left: Final[float]
    right: Final[float]

class Attr(Node):
    localName: Final[str]
    name: Final[str]
    namespaceURI: Final[str]
    ownerElement: Final[Element]
    prefix: Final[str|None]
    value: Final[str]


# https://developer.mozilla.org/en-US/docs/Web/API/Element
# no aria (too much)
class Element(Node):
    assignedSlot: Final[HTMLSlotElement|None]
    attributes: Final[NamedNodeMap]
    childElementCount: Final[float]
    children: Final[HTMLCollection]
    classList: Final[DOMTokenList]
    className: str
    clientHeight: Final[float]
    clientLeft: Final[float]
    clientTop: Final[float]
    clientWidth: Final[float]
    currentCSSZoom: Final[float]
    firstElementChild: Final[Element|None]
    id: Final[str]
    innerHTML: str
    lastElementChild: Final[Element|None]
    localName: Final[str]
    namespaceURI: Final[str|None]
    nextElementSibling: Final[Element|None]
    outerHTML: Final[str]
    part: Final[DOMTokenList]
    prefix: Final[str|None]
    previousElementSibling: Final[Element|None]
    role: str|None
    scrollHeight: float
    scrollLeft: float
    scrollTop: float
    scrollWidth: float
    shadowRoot: Final[ShadowRoot|None]
    slot: Final[str]
    tagName: Final[str]

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
    def hasAttributeNS(self, namespace: str, localName: str, /) -> bool: ...
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
    def querySelector(self, selectors: str, /) -> Element|None: ...
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


class HTMLElement(Element):

    accessKeyLabel: Final[str]
    autofocus: Final[bool]
    contentEditable: Final[str]
    dataset: Final[DOMStringMap]
    dir: Final[str]
    draggable: Final[bool]
    enterKeyHint: Final[str]
    hidden: Final[bool]
    inert: Final[bool]
    innerText: Final[str]
    inputMode: Final[str]
    isContentEditable: Final[bool]
    lang: Final[str]
    nonce: Final[float]
    offsetHeight: Final[float]
    offsetLeft: Final[float]
    offsetParent: Final[float]
    offsetTop: Final[float]
    offsetWidth: Final[float]
    outerText: Final[str]
    popover: Final[str]
    spellcheck: Final[bool]
    style: Final[CSSStyleDeclaration|None]
    tabIndex: Final[float]
    title: Final[str]
    translate: Final[bool]

    # attachInternals
    def blur(self) -> Undefined: ...
    def click(self) -> Undefined: ...
    def focus(self) -> Undefined: ...
    def hidePopover(self) -> Undefined: ...
    # TODO: options
    def showPopover(self) -> Undefined: ...
    # TODO:
    def togglePopover(self, force: bool=False, /) -> Undefined: ...

class HTMLSlotElement(HTMLElement):
    pass

class HTMLBodyElement(HTMLElement):
    pass

class HTMLHeadElement(HTMLElement):
    pass

class HTMLScriptElement:
    # async ? -> reserved keyword
    crossOrigin: Final[str]
    defer: Final[bool]
    fetchPriority: Final[str]
    integrity: Final[str]
    nomodule: Final[bool]
    referrerPolicy: Final[str]
    str: Final[str]
    text: Final[str]
    type: Final[str]
    # static support

class DOMStringList:
    length: Final[float]
    def contains(self, string: str, /) -> bool: ...
    def item(self, index: float, /) -> str|None: ...

class URLSearchParams:
    size: Final[float]

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
    hash: Final[str]
    host: Final[str]
    hostname: Final[str]
    href: Final[str]
    origin: Final[str]
    pathname: Final[str]
    port: Final[str]
    protocol: Final[str]
    search: Final[str]
    searchParams: Final[URLSearchParams]
    username: Final[str]

    # static
    # canParse + createObjectURL + parse + revokeObjectURL
    def toJSON(self) -> str: ...
    def toString(self) -> str: ...

class Location:
    ancestorOrigins: Final[DOMStringList]
    hash: Final[str]
    host: Final[str]
    hostname: Final[str]
    href: Final[str]
    origin: Final[str]
    pathname: Final[str]
    port: Final[str]
    protocol: Final[str]
    search: Final[str]

    def assign(self, url: str|URL, /) -> Undefined: ...
    def reload(self) -> Undefined: ...
    def replace(self, url: str|URL, /) -> Undefined: ...
    def toString(self) -> Undefined: ...

class Window(EventTarget):
    """
    The Window interface represents a window containing a DOM document; the document property points to the DOM document loaded in that window.

    See https://developer.mozilla.org/en-US/docs/Web/API/Window
    """

    # caches
    closed: Final[bool]
    # cookieStore
    crossOriginIsolated: Final[bool]
    # crypto
    # customElements
    document: Final[Document]
    frameElement: Final[HTMLElement|None]
    # frames
    # history
    # indexedDB
    innerHeight: Final[float]
    innerWidth: Final[float]
    isSecureContext: Final[bool]
    length: Final[float]
    # localStorage
    location: Final[Location]
    # locationBar
    # menubar
    name: Final[str]
    # navigator
    # opener
    origin: Final[str]
    originAgentCluster: Final[bool]
    outerHeight: Final[float]
    outerWidth: Final[float]
    parent: Final[Window]
    # performance
    # personalbar
    # screen
    screenLeft: Final[float]
    screenTop: Final[float]
    screenX: Final[float]
    screenY: Final[float]
    # scrollbars
    scrollX: Final[float]
    scrollY: Final[float]
    self: Final[Window]
    # sessionStorage
    # speechSynthesis
    # statusbar
    # toolbar
    top: Final[Window]
    # visualViewport
    window: Final[Window]

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
    def postMessage(self, message: object, targetOrigin: str = "", /) -> Undefined: ...
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
    def structuredClone[T](self, value: T, /) -> T: ...


window: Window

class DocumentType(Node):
    name: Final[str]
    publicId: Final[str]
    systemId: Final[str]

    def after(self, param1: Node, /) -> Undefined: ...
    def before(self, param1: Node, /) -> Undefined: ...
    def remove(self) -> Undefined: ...
    def replaceWith(self, node1: Node, /) -> Undefined: ...

# https://developer.mozilla.org/en-US/docs/Web/API/Document/
# also lot of methods...
class Document(Node):
    activeElement: Final[Element|None]
    adoptedStyleSheets: Final[CSSStyleSheet]
    body: Final[HTMLBodyElement]
    characterSet: Final[str]
    childElementCount: Final[float]
    children: Final[HTMLCollection]
    compatMode: Final[str]
    contentType: Final[str]
    cookie: Final[str]
    currentScript: Final[HTMLScriptElement|None]
    defaultView: Final[Window|None]
    designMode: Final[str]
    dir: Final[str]
    doctype: Final[DocumentType]
    documentElement: Final[Element]
    documentURI: Final[str]
    embeds: Final[HTMLCollection]
    firstElementChild: Final[HTMLElement|None]
    #fonts: FontFaceSet
    forms: Final[HTMLCollection]
    #fragmentDirective: FragmentDirective
    head: Final[HTMLHeadElement]
    hidden: Final[bool]
    images: Final[HTMLCollection]
    #implementation: DOMImplementation
    lastElementChild: Final[Element|None]
    lastModified: Final[str]
    links: Final[HTMLCollection]
    location: Final[Location]
    plugins: Final[HTMLCollection]
    readyState: Final[str]
    referrer: Final[str]
    scripts: Final[HTMLCollection]
    scrollingElement: Final[Element]
    styleSheets: Final[StyleSheetList]
    # timeline
    title: Final[str]
    URL: Final[str]
    visibilityState: Final[str]

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
    def getElementById(self, selectors: str, /) -> Element|None: ...
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
    def querySelector(self, selectors: str, /) -> Element|None: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    # TODO: options
    async def requestStorageAccess(self) -> Undefined: ...
    def writeln(self, line: str, /) -> Undefined: ...

document: Document