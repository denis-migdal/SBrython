# Missing features
# TypedDict
# not required function argument ? (+ union)
# Callable[] ? (ignore T for now ?) ~> also refactor fct type...
# Final[X] (const)
# Circular type def.
#   - 1. import system + several files + circular imports... (detect and resolve) [now = better ?]
#       import JS.document (etc.) ??
#   - 2. ignore : from __future__ import annotations at top of the file.
#   - 3. pre-creer le symbole...
#       -> SBrython exported {"package": [...]} -> top level body add/search
# static attribute...

# https://developer.mozilla.org/en-US/docs/Web/API
# 1006 classes...

class Undefined:
    pass

undefined: Undefined

# TODO: https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase#event.capturing_phase
class Event:
    # TODO: read-only : Final[bool] (they are all RO)
    bubble: bool
    cancelable: bool
    composed: bool
    #TODO: Require circular type decl.
    # currentTarget: EventTarget
    defaultPrevented: bool
    # TODO: enum ?
    eventPhase: int
    NONE = 0
    CAPTURING_PHASE = 1
    AT_TARGET = 2
    BUBBLING_PHASE = 3
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
    pass

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
    nodeType: int
    ELEMENT_NODE = 0
    ATTRIBUTE_NODE = 1
    TEXT_NODE = 3
    CDATA_SECTION_NODE = 4
    PROCESSING_INSTRUCTION_NODE = 7
    COMMENT_NODE = 8
    DOCUMENT_NODE = 9
    DOCUMENT_TYPE_NODE = 10
    DOCUMENT_FRAGMENT_NODE = 11
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
    def compareDocumentPosition(self, otherNode: Node) -> int: ...
    DOCUMENT_POSITION_DISCONNECTED = 1
    DOCUMENT_POSITION_PRECEDING = 2
    DOCUMENT_POSITION_FOLLOWING = 4
    DOCUMENT_POSITION_CONTAINS = 8
    DOCUMENT_POSITION_CONTAINED_BY = 16
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32
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
class HTMLSlotElement:
    pass

class NamedNodeMap:
    pass

class HTMLCollection:
    pass

class DOMTokenList:
    pass

class ShadowRoot:
    pass

class StylePropertyMapReadOnly:
    pass

class DOMRect:
    pass

class Attr(Node):
    pass

# https://developer.mozilla.org/en-US/docs/Web/API/Element
# no aria (too much)
class Element(Node):
    # RO
    assignedSlot: HTMLSlotElement|None
    attributes: NamedNodeMap
    childElementCount: int
    children: HTMLCollection
    classList: DOMTokenList
    # RW
    className: str
    # RO
    clientHeight: int
    clientLeft: int
    clientTop: int
    clientWidth: int
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
    scrollHeight: int
    scrollLeft: int
    scrollTop: int
    scrollWidth: int
    # RO
    shadowRoot: ShadowRoot|None
    slot: str
    tagName: str

    #TODO: *args
    def after(self, node1: Node) -> Undefined: ...
    # def animate()
    def append(self, param1: None) -> Undefined: ...
    #TODO: attachShadow
    def before(self, node1: Node) -> Undefined: ...
    #TODO: checkVisibility
    def closest(self, selectors: str) -> Element|None: ...
    # TODO: computedStyleMap (limited)
    # TODO: getAnimations
    def getAttribute(self, attributeName: str) -> str|None: ...
    #TODO getAttributeNames (list)
    def getAttributeNode(self, attrName: str) -> Attr: ...
    def getAttributeNodeNS(self, namespace: str, attrName: str) -> Attr: ...
    def getAttributeNS(self, namespace: str, attributeName: str) -> str|None: ...
    def getBoundingClientRect(self) -> DOMRect: ...
    #TODO getClientRects
    #TODO getElementsByClassName
    # getElementsByTagName
    # getElementsByTagNameNS
    # TODO: options
    def getHTML(self) -> str: ...
    def hasAttribute(self, name: str) -> bool: ...
    def hasAttribute(self, namespace: str, localName: str) -> bool: ...
    def hasAttributes(self) -> bool: ...
    # TODO: pointerId ?
    def hasPointerCapture(self, pointerId: int) -> bool: ...
    # TODO: more restrictive position str
    def insertAdjacentElement(self, position: str, element: Element) -> Element|None: ...
    def insertAdjacentHTML(self, position: str, text: str) -> Undefined: ...
    def insertAdjacentText(self, where: str, data: str) -> Undefined: ...
    def matches(self, selectors: str) -> bool: ...
    # moveBefore
    #TODO:
    def prepend(self, param1: Node) -> Undefined: ...
    def querySelector(self, selectors: str) -> Element|None: ...
    # TODO: querySelectorAll
    def releasePointerCapture(self, pointerId: int) -> Undefined: ...
    def remove(self) -> Undefined: ...
    def removeAttribute(self, attrName: str) -> Undefined: ...
    def removeAttributeNode(self, attributeNode: Attr) -> Node: ...
    def removeAttributeNS(self, namespace: str, attrName: str) -> Undefined: ...
    def replaceChildren(self, param1: Node) -> Undefined: ...
    def replaceWith(self, param1: Node) -> Undefined: ...
    # requestFullScreen (limited)
    # requestPointerLock (limited)
    # TODO: 2 possibilites :
    def scroll(self, x: int, y: int) -> Undefined: ...
    # TODO: 2 possibilites :
    def scrollBy(self, x: int, y: int) -> Undefined: ...
    # TODO: options
    def scrollIntoView() -> Undefined: ...
    # TODO: 2 possibilites :
    def scrollTo(self, x: int, y: int) -> Undefined: ...
    def setAttribute(self, name: str, value: str|None) -> Undefined: ...
    def setAttributeNode(self, attribute: Attr) -> Attr|None: ...
    def setAttributeNodeNS(self, attributeNode: Attr) -> Attr|None: ...
    def setAttributeNS(self, namespace: str, name: str, value: str|None) -> Undefined: ...
    def setHTMLUnsafe(self, html: str) -> Undefined: ...
    def setPointerCapture(self, pointerId: int) -> Undefined: ...
    def toggleAttribute(self, name: str, toggle: bool = False) -> bool: ...


# https://developer.mozilla.org/en-US/docs/Web/API/Document/
# also lot of methods...
class Document(Node):
    def querySelector[T: Element](self, selectors: str, /) -> T|None: ...

document: Document