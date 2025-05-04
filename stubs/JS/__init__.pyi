# Missing:
#
# - static methods
# - special methods (__getattr__ etc)
# - @overload
# - iterators
#
# - special stubs parser
# - circular type hints
#   - split into separate files
#   - better import system.
#
# - some API (mainly in Window)
#   - animations
# - static
#   - AbortControler
#   - DOMRect
#   - HTMLScriptElement
#   - URL
# - iterators/array
#   - NodeList
#   - ShadowRoot
#   - getAttributeNames
#   - getClientRects
#   - shadowRoots
#   - webkitEntries
#   - FormData
#   - assignedElements
#   - assignedNodes
#   - URLSearchParams
#   + *args (node1/target1/etc)
# - Special methods
#   - DOMStringMap
#   - NamedNodeMap (like an array, cf other with length)
#   - HTMLCollection
#   - DOMTokenList
#   - DOMStringList
#   - HTMLFormControlsCollection
#   - FileList
#   - File (cstr) + Blob
# - @overload
#   - scroll
# - others
#   - arrayBuffer -> ?
#   - stream
#   - valueAsDate
#   - HTMLXElement (missing some I guess)
#   - states (require Set)
# - https://developer.mozilla.org/en-US/docs/Web/API (1006 classes)
#

from typing import Final
from typing import TypedDict
from typing import ClassVar
from typing import Callable
from typing import NotRequired

class Undefined:
    pass

undefined: Undefined
"""
The undefined global property represents the primitive value undefined. It is one of JavaScript's primitive types.

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
"""

class EventInit(TypedDict, total=False):
    """
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#options
    """
    bubbles: bool
    """
    A boolean value indicating whether the event bubbles. The default is false.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#bubbles
    """
    cancelable: bool
    """
    A boolean value indicating whether the event can be cancelled. The default is false.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#cancelable
    """
    composed: bool
    """
    A boolean value indicating whether the event will trigger listeners outside of a shadow root (see Event.composed for more details). The default is false.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#composed
    """

class Event:
    """
    The Event interface represents an event which takes place on an EventTarget.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event
    """
    def __new__(cls, type: str, options: EventInit|None = None, /) -> Event: ...
    """
    The Event() constructor creates a new Event object. An event created in this way is called a synthetic event, as opposed to an event fired by the browser, and can be dispatched by a script.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
    """
    
    bubble: Final[bool]
    """
    The bubbles read-only property of the Event interface indicates whether the event bubbles up through the DOM tree or not.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles
    """
    cancelable: Final[bool]
    """
    The cancelable read-only property of the Event interface indicates whether the event can be canceled, and therefore prevented as if the event never happened.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable
    """
    composed: Final[bool]
    """
    The read-only composed property of the Event interface returns a boolean value which indicates whether or not the event will propagate across the shadow DOM boundary into the standard DOM.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/composed
    """
    currentTarget: Final[EventTarget]
    """
    The currentTarget read-only property of the Event interface identifies the element to which the event handler has been attached.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
    """
    defaultPrevented: Final[bool]
    """
    The defaultPrevented read-only property of the Event interface returns a boolean value indicating whether or not the call to Event.preventDefault() canceled the event.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented
    """
    eventPhase: Final[float]
    """
    The eventPhase read-only property of the Event interface indicates which phase of the event flow is currently being evaluated.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    """
    # TODO: enum-like
    NONE: ClassVar[float] = 0.
    """
    The event is not being processed at this time.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    """
    CAPTURING_PHASE: ClassVar[float] = 1.
    """
    The event is being propagated through the target's ancestor objects.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    """
    AT_TARGET: ClassVar[float] = 2.
    """
    The event has arrived at the event's target.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    """
    BUBBLING_PHASE: ClassVar[float] = 3.
    """
    The event is propagating back up through the target's ancestors in reverse order, starting with the parent, and eventually reaching the containing Window.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    """
    isTrusted: Final[bool]
    """
    The isTrusted read-only property of the Event interface is a boolean value that is true when the event was generated by the user agent (including via user actions and programmatic methods such as HTMLElement.focus()), and false when the event was dispatched via EventTarget.dispatchEvent(). The only exception is the click event, which initializes the isTrusted property to false in user agents.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
    """
    target: Final[EventTarget]
    """
    The read-only target property of the Event interface is a reference to the object onto which the event was dispatched. It is different from Event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    """
    timeStamp: Final[float]
    """
    The timeStamp read-only property of the Event interface returns the time (in milliseconds) at which the event was created.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp
    """
    type: Final[str]
    """
    The type read-only property of the Event interface returns a string containing the event's type. It is set when the event is constructed and is the name commonly used to refer to the specific event, such as click, load, or error.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/type
    """

    def composedPath(self) -> EventTarget : ...
    """
    The composedPath() method of the Event interface returns the event's path which is an array of the objects on which listeners will be invoked. This does not include nodes in shadow trees if the shadow root was created with its ShadowRoot.mode close

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
    """
    def preventDefault(self) -> Undefined: ...
    """
    The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.

    See https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    """
    def stopImmediatePropagation(self) -> Undefined: ...
    """
    The stopImmediatePropagation() method of the Event interface prevents other listeners of the same event from being called.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
    """
    def stopPropagation(self) -> Undefined: ...
    """
    The stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases. It does not, however, prevent any default behaviors from occurring; for instance, clicks on links are still processed. If you want to stop those behaviors, see the preventDefault() method. It also does not prevent propagation to other event-handlers of the current element. If you want to stop those, see stopImmediatePropagation().
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
    """

class AbortSignal(EventTarget):
    """
    The AbortSignal interface represents a signal object that allows you to communicate with an asynchronous operation (such as a fetch request) and abort it if required via an AbortController object.

    See https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
    """
    aborted: Final[bool]
    """
    The aborted read-only property returns a value that indicates whether the asynchronous operations the signal is communicating with are aborted (true) or not (false).

    See https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/aborted
    """
    reason: Final[str|Undefined]
    """
    The reason read-only property returns a JavaScript value that indicates the abort reason.

    See https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/reason
    """
    #TODO: static methods
    def throwIfAborted(self) -> Undefined: ...
    """
    The throwIfAborted() method throws the signal's abort reason if the signal has been aborted; otherwise it does nothing.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted
    """

class AddEventListenerOptions(TypedDict, total=False):
    """
    An object that specifies characteristics about the event listener.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options
    """
    capture: bool
    """
    A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to false.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options
    """
    once: bool
    """
    A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options
    """
    passive: bool
    """
    A boolean value that, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener calls preventDefault(), nothing will happen and a console warning may be generated.

    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options
    """
    signal: AbortSignal
    """
    An AbortSignal. The listener will be removed when the abort() method of the AbortController which owns the AbortSignal is called. If not specified, no AbortSignal is associated with the listener.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options
    """

class EventListenerObject:
    def handleEvent(self, event: Event, /) -> Undefined: ...

class EventTarget:
    """
    The EventTarget interface is implemented by objects that can receive events and may have listeners for them. In other words, any target of events implements the three methods associated with this interface.

    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
    """
    def __new__(cls) -> EventTarget: ...
    """
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget
    """
    # TODO: listener callback: Callable
    def addEventListener(self, type: str, listener: Callable[[Event], Undefined]|EventListenerObject|None, options: AddEventListenerOptions|bool|None = None, /) -> Undefined: ...
    """
    The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    """
    def removeEventListener(self, type: str, listener: Callable[[Event], Undefined]|EventListenerObject|None, options: AddEventListenerOptions|bool|None = None, /) -> Undefined: ...
    """
    The removeEventListener() method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
    """

    def dispatchEvent(self, event: Event, /) -> bool: ...
    """
    The dispatchEvent() method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().
    
    See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
    """

class NodeList[T: Node = Node]:
    """
    NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll().
    
    See https://developer.mozilla.org/en-US/docs/Web/API/NodeList
    """
    length: Final[float]
    """
    The NodeList.length property returns the number of items in a NodeList.

    See https://developer.mozilla.org/en-US/docs/Web/API/NodeList/length
    """
    # entries
    # values
    # keys
    # forEach
    def item(self, index: float, /) -> T: ...
    """
    Returns a node from a NodeList by index. This method doesn't throw exceptions as long as you provide arguments. A value of null is returned if the index is out of range, and a TypeError is thrown if no argument is provided.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/NodeList/item
    """

class GetRootNodeOptions(TypedDict):
    """
    An object that sets options for getting the root node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#options
    """
    composed: bool
    """
    A boolean value that indicates whether the shadow root should be returned (false, the default), or a root node beyond shadow root (true).

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#options
    """

class Node(EventTarget):
    """
    The DOM Node interface is an abstract base class upon which many other DOM API objects are based, thus letting those object types to be used similarly and often interchangeably. As an abstract class, there is no such thing as a plain Node object. All objects that implement Node functionality are based on one of its subclasses. Most notable are Document, Element, and DocumentFragment.

    https://developer.mozilla.org/en-US/docs/Web/API/Node
    """

    baseURI: Final[str]
    """
    The read-only baseURI property of the Node interface returns the absolute base URL of the document containing the node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI
    """
    childNodes: Final[NodeList]
    """
    The read-only childNodes property of the Node interface returns a live NodeList of child nodes of the given element where the first child node is assigned index 0. Child nodes include elements, text and comments.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
    """
    firstChild: Final[Node|None]
    """
    The read-only firstChild property of the Node interface returns the node's first child in the tree, or null if the node has no children.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
    """
    isConnected: Final[bool]
    """
    The read-only isConnected property of the Node interface returns a boolean indicating whether the node is connected (directly or indirectly) to a Document object.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected
    """
    lastChild: Final[Node|None]
    """
    The read-only lastChild property of the Node interface returns the last child of the node, or null if there are no child nodes.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild
    """
    nextSibling: Final[Node|None]
    """
    The read-only nextSibling property of the Node interface returns the node immediately following the specified one in their parent's childNodes, or returns null if the specified node is the last child in the parent element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
    """
    nodeName: Final[str]
    """
    The read-only nodeName property of Node returns the name of the current node as a string.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
    """
    nodeType: Final[float]
    """
    The read-only nodeType property of a Node interface is an integer that identifies what the node is. It distinguishes different kind of nodes from each other, such as elements, text and comments.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    """
    ELEMENT_NODE: ClassVar[float] = 0.
    """
    An Element node like <p> or <div>.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.element_node
    """
    ATTRIBUTE_NODE: ClassVar[float] = 1.
    """
    An Attribute of an Element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.attribute_node
    """
    TEXT_NODE: ClassVar[float] = 3.
    """
    The actual Text inside an Element or Attr.

    https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.text_node
    """
    CDATA_SECTION_NODE: ClassVar[float] = 4.
    """
    A CDATASection, such as <!CDATA[[ … ]]>

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.cdata_section_node
    """
    PROCESSING_INSTRUCTION_NODE: ClassVar[float] = 7.
    """
    A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.processing_instruction_node
    """
    COMMENT_NODE: ClassVar[float] = 8.
    """
    A Comment node, such as <!-- … -->.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.comment_node
    """
    DOCUMENT_NODE: ClassVar[float] = 9.
    """
    A Document node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.document_node
    """
    DOCUMENT_TYPE_NODE: ClassVar[float] = 10.
    """
    A DocumentType node, such as <!doctype html>.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.document_type_node
    """
    DOCUMENT_FRAGMENT_NODE: ClassVar[float] = 11.
    """
    A DocumentFragment node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node.document_fragment_node
    """
    nodeValue: str|None
    """
    The nodeValue property of the Node interface returns or sets the value of the current node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
    """
    ownerDocument: Final[Document|None]
    """
    The read-only ownerDocument property of the Node interface returns the top-level document object of the node.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument
    """
    parentElement: Final[Element|None]
    """
    The read-only parentElement property of Node interface returns the DOM node's parent Element, or null if the node either has no parent, or its parent isn't a DOM Element. Node.parentNode on the other hand returns any kind of parent, regardless of its type.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
    """
    parentNode: Final[Node|None]
    """
    The read-only parentNode property of the Node interface returns the parent of the specified node in the DOM tree.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
    """
    previousSibling: Final[Node|None]
    """
    The read-only previousSibling property of the Node interface returns the node immediately preceding the specified one in its parent's childNodes list, or null if the specified node is the first in that list.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
    """
    textContent: Final[str|None]
    """
    The textContent property of the Node interface represents the text content of the node and its descendants.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    """

    def appendChild[T: Node](self, child: T) -> T: ...
    """
    The appendChild() method of the Node interface adds a node to the end of the list of children of a specified parent node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild    
    """

    def cloneNode(self, deep: bool = False) -> Node: ...
    """
    The cloneNode() method of the Node interface returns a duplicate of the node on which this method was called. Its parameter controls if the subtree contained in a node is also cloned or not.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
    """

    def compareDocumentPosition(self, otherNode: Node) -> float: ...
    """
    The compareDocumentPosition() method of the Node interface reports the position of its argument node relative to the node on which it is called.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
    """

    DOCUMENT_POSITION_DISCONNECTED: ClassVar[float] = 1.
    """
    Both nodes are in different documents or different trees in the same document.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_disconnected
    """

    DOCUMENT_POSITION_PRECEDING: ClassVar[float] = 2.
    """
    otherNode precedes the node in either a pre-order depth-first traversal of a tree containing both (e.g., as an ancestor or previous sibling or a descendant of a previous sibling or previous sibling of an ancestor) or (if they are disconnected) in an arbitrary but consistent ordering.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_preceding
    """
    DOCUMENT_POSITION_FOLLOWING: ClassVar[float] = 4.
    """
    otherNode follows the node in either a pre-order depth-first traversal of a tree containing both (e.g., as a descendant or following sibling or a descendant of a following sibling or following sibling of an ancestor) or (if they are disconnected) in an arbitrary but consistent ordering.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_preceding
    """
    DOCUMENT_POSITION_CONTAINS: ClassVar[float] = 8.
    """
    otherNode is an ancestor of the node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_preceding
    """
    DOCUMENT_POSITION_CONTAINED_BY: ClassVar[float] = 16.
    """
    otherNode is a descendant of the node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_preceding
    """
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: ClassVar[float] = 32.
    """
    The result relies upon arbitrary and/or implementation-specific behavior and is not guaranteed to be portable.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#node.document_position_preceding
    """
    def contains(self, otherNode: Node|None) -> bool: ...
    """
    The contains() method of the Node interface returns a boolean value indicating whether a node is a descendant of a given node, that is the node itself, one of its direct children (childNodes), one of the children's direct children, and so on.
    
    https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
    """
    def getRootNode(self, options: GetRootNodeOptions|None = None) -> Node: ...
    """
    The getRootNode() method of the Node interface returns the context object's root, which optionally includes the shadow root if it is available.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
    """
    def hasChildNodes(self) -> bool: ...
    """
    The hasChildNodes() method of the Node interface returns a boolean value indicating whether the given Node has child nodes or not.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes
    """
    def insertBefore[T: Node](self, newNode: T, referenceNode: Node|None) -> T: ...
    """
    The insertBefore() method of the Node interface inserts a node before a reference node as a child of a specified parent node.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    """
    def isDefaultNamespace(self, namespaceURI: str|None) -> bool: ...
    """
    The isDefaultNamespace() method of the Node interface accepts a namespace URI as an argument. It returns a boolean value that is true if the namespace is the default namespace on the given node and false if not.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/isDefaultNamespace
    """
    def isEqualNode(self, otherNode: Node|None) -> bool: ...
    """
    The isEqualNode() method of the Node interface tests whether two nodes are equal. Two nodes are equal when they have the same type, defining characteristics (for elements, this would be their ID, number of children, and so forth), its attributes match, and so on. The specific set of data points that must match varies depending on the types of the nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode
    """
    def isSameNode(self, otherNode: Node|None) -> bool: ...
    """
    The isSameNode() method of the Node interface is a legacy alias the for the === strict equality operator. That is, it tests whether two nodes are the same (in other words, whether they reference the same object).
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode
    """
    def lookupNamespaceURI(self, prefix: str|None) -> str|None: ...
    """
    The lookupNamespaceURI() method of the Node interface takes a prefix as parameter and returns the namespace URI associated with it on the given node if found (and null if not). This method's existence allows Node objects to be passed as a namespace resolver to XPathEvaluator.createExpression() and XPathEvaluator.evaluate().
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupNamespaceURI
    """
    def lookupPrefix(self, namespace: str|None) -> str|None: ...
    """
    The lookupPrefix() method of the Node interface returns a string containing the prefix for a given namespace URI, if present, and null if not. When multiple prefixes are possible, the first prefix is returned.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupPrefix
    """
    def normalize(self) -> Undefined: ...
    """
    The normalize() method of the Node interface puts the specified node and all of its sub-tree into a normalized form. In a normalized sub-tree, no text nodes in the sub-tree are empty and there are no adjacent text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
    """
    def removeChild(self, child: Node) -> Undefined: ...
    """
    The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    """
    def replaceChild[T: Node](self, newChild: Node, oldChild: T) -> T: ...
    """
    The replaceChild() method of the Node interface replaces a child node within the given (parent) node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
    """

# Getter/setter/deleter
class DOMStringMap:
    """
    The DOMStringMap interface is used for the HTMLElement.dataset attribute, to represent data for custom attributes added to elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap
    """
    pass

class CSSStyleDeclaration:
    """
    The CSSStyleDeclaration interface represents an object that is a CSS declaration block, and exposes style information and various style-related methods and properties.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
    """
    cssFloat: Final[str]
    """
    The cssFloat property of the CSSStyleDeclaration interface returns the result of invoking CSSStyleDeclaration.getPropertyValue() with float as an argument.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssFloat
    """
    cssText: Final[str]
    """
    The cssText property of the CSSStyleDeclaration interface returns or sets the text of the element's inline style declaration only.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText
    """
    length: Final[float]
    """
    The read-only property returns an integer that represents the number of style declarations in this CSS declaration block.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/length
    """
    parentRule: Final[CSSRule]
    """
    The CSSStyleDeclaration.parentRule read-only property returns a CSSRule that is the parent of this style block, e.g., a CSSStyleRule representing the style for a CSS selector.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/parentRule
    """
    
    def getPropertyPriority(self, property: str, /) -> str: ...
    """
    The CSSStyleDeclaration.getPropertyPriority() method interface returns a string that provides all explicitly set priorities on the CSS property.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyPriority
    """
    def getPropertyValue(self, property: str, /) -> str: ...
    """
    The CSSStyleDeclaration.getPropertyValue() method interface returns a string containing the value of a specified CSS property.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue
    """
    def item(self, index: float, /) -> str: ...
    """
    The CSSStyleDeclaration.item() method interface returns a CSS property name from a CSSStyleDeclaration by index.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/item
    """
    def removeProperty(self, property: str, /) -> str: ...
    """
    The CSSStyleDeclaration.removeProperty() method interface removes a property from a CSS style declaration object.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty
    """
    def setProperty(self, propertyName: str, value: str, priority: str = "") -> Undefined : ...
    """
    The CSSStyleDeclaration.setProperty() method interface sets a new value for a property on a CSS style declaration object.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty
    """

class NamedNodeMap:
    """
    The NamedNodeMap interface represents a collection of Attr objects. Objects inside a NamedNodeMap are not in any particular order, unlike NodeList, although they may be accessed by an index as in an array.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
    """
    length: Final[float]
    """
    The read-only length property of the NamedNodeMap interface is the number of objects stored in the map.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/length
    """
    def getNamedItem(self, name: str, /) -> Attr|None: ...
    """
    The getNamedItem() method of the NamedNodeMap interface returns the Attr corresponding to the given name, or null if there is no corresponding attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/getNamedItem
    """
    def getNamedItemNS(self, namespace: str, localName: str, /) -> Attr|None: ...
    """
    The getNamedItemNS() method of the NamedNodeMap interface returns the Attr corresponding to the given local name in the given namespace, or null if there is no corresponding attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/getNamedItemNS
    """
    def item(self, index: float, /) -> Attr|None: ...
    """
    The item() method of the NamedNodeMap interface returns the item in the map matching the index.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/item
    """
    def removeNamedItem(self, attrName: str, /) -> Attr: ...
    """
    The removeNamedItem() method of the NamedNodeMap interface removes the Attr corresponding to the given name from the map.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/removeNamedItem
    """
    def removeNamedItemNS(self, namespace: str, localName: str, /) -> Attr: ...
    """
    The removeNamedItemNS() method of the NamedNodeMap interface removes the Attr corresponding to the given namespace and local name from the map.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/removeNamedItemNS
    """
    def setNamedItem(self, attr: Attr, /) -> Attr|None: ...
    """
    The setNamedItem() method of the NamedNodeMap interface puts the Attr identified by its name in the map. If there is already an Attr with the same name in the map, it is replaced.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/setNamedItem
    """
    def setNamedItemNS(self, attr: Attr, /) -> Attr|None: ...
    """
    The setNamedItemNS() method of the NamedNodeMap interface puts the Attr identified by its name in the map. If there was already an Attr with the same name in the map, it is replaced.

    See https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/setNamedItemNS
    """

class HTMLCollection[T: Element = Element]:
    """
    The HTMLCollection interface represents a generic collection (array-like object similar to arguments) of elements (in document order) and offers methods and properties for selecting from the list.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
    """
    length: Final[float]
    """
    The HTMLCollection.length property returns the number of items in a HTMLCollection.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection/length
    """
    def item(self, index: float, /) -> T|None: ...
    """
    The HTMLCollection method item() returns the element located at the specified offset into the collection.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection/item
    """
    def namedItem(self, key: str, /) -> T|None: ...
    """
    The namedItem() method of the HTMLCollection interface returns the first Element in the collection whose id or name attribute match the specified name, or null if no element matches.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection/namedItem
    """

class DOMTokenList:
    """
    The DOMTokenList interface represents a set of space-separated tokens. Such a set is returned by Element.classList or HTMLLinkElement.relList, and many others.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
    """
    length: Final[float]
    """
    The read-only length property of the DOMTokenList interface is an integer representing the number of objects stored in the object.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/length
    """
    value: Final[str]
    """
    The value property of the DOMTokenList interface is a stringifier that returns the value of the list serialized as a string, or clears and sets the list to the given value.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/value
    """

    def add(self, token1: str, /) -> Undefined: ...
    """
    The add() method of the DOMTokenList interface adds the given tokens to the list, omitting any that are already present.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
    """
    def contains(self, token: str, /) -> bool: ...
    """
    The contains() method of the DOMTokenList interface returns a boolean value — true if the underlying list contains the given token, otherwise false.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
    """
    # entries : iterator
    # forEach
    def item(self, index: float, /) -> str|None: ...
    """
    The item() method of the DOMTokenList interface returns an item in the list, determined by its position in the list, its index.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/item
    """
    # keys
    def remove(self, token1: str, /) -> Undefined: ...
    """
    The remove() method of the DOMTokenList interface removes the specified tokens from the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
    """
    def replace(self, oldToken: str, newToken: str, /) -> bool: ...
    """
    The replace() method of the DOMTokenList interface replaces an existing token with a new token. If the first token doesn't exist, replace() returns false immediately, without adding the new token to the token list.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace
    """
    def supports(self, token: str, /) -> bool: ...
    """
    The supports() method of the DOMTokenList interface returns true if a given token is in the associated attribute's supported tokens. This method is intended to support feature detection.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/supports
    """
    def toggle(self, token: str, force: bool = False, /) -> bool: ...
    """
    The toggle() method of the DOMTokenList interface removes an existing token from the list and returns false. If the token doesn't exist it's added and the function returns true.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
    """
    def toString(self, /) -> str: ...
    """
    The toString() stringifier method of the DOMTokenList interface returns the values of the token list serialized as a string. The return value is a space-separated list of tokens equal to the DOMTokenList.value property.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toString
    """
    # values

class MediaList:
    """
    The MediaList interface represents the media queries of a stylesheet, e.g., those set using a <link> element's media attribute.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList
    """
    length: Final[float]
    """
    The read-only length property of the MediaList interface returns the number of media queries in the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList/length
    """
    mediaText: Final[str]
    """
    The mediaText property of the MediaList interface is a stringifier that returns a string representing the MediaList as text, and also allows you to set a new MediaList.

    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList/mediaText
    """
    def appendMedium(self, medium: str, /) -> Undefined: ...
    """
    The appendMedium() method of the MediaList interface adds a media query to the list. If the media query is already in the collection, this method does nothing.

    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList/appendMedium
    """
    def deleteMedium(self, medium: str, /) -> Undefined: ...
    """The deleteMedium() method of the MediaList interface removes from this MediaList the given media query.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList/deleteMedium
    """
    def item(self, index: float, /) -> str: ...
    """
    The item() method of the MediaList interface returns the media query at the specified index, or null if the specified index doesn't exist.

    See https://developer.mozilla.org/en-US/docs/Web/API/MediaList/item
    """
    def toString(self) -> str: ...
    """
    The toString() stringifier method of the MediaList interface returns a string representing the object's values. The value is a comma-separated list of media values in the same format as the MediaList.mediaText property.

    https://developer.mozilla.org/en-US/docs/Web/API/MediaList/toString
    """

class StyleSheet:
    """
    An object implementing the StyleSheet interface represents a single style sheet. CSS style sheets will further implement the more specialized CSSStyleSheet interface.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet
    """
    disabled: bool
    """
    The disabled property of the StyleSheet interface determines whether the style sheet is prevented from applying to the document.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/disabled
    """
    href: Final[str]
    """
    The href property of the StyleSheet interface returns the location of the style sheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/href
    """
    media: Final[MediaList]
    """
    The media property of the StyleSheet interface specifies the intended destination media for style information. It is a read-only, array-like MediaList object and can be removed with deleteMedium() and added with appendMedium().

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/media
    """
    ownerNode: Final[Node]
    """
    The ownerNode property of the StyleSheet interface returns the node that associates this style sheet with the document.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/ownerNode
    """
    parentStyleSheet: Final[StyleSheet]
    """
    The parentStyleSheet property of the StyleSheet interface returns the style sheet, if any, that is including the given style sheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/parentStyleSheet
    """
    title: Final[str]
    """
    The title property of the StyleSheet interface returns the advisory title of the current style sheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/title
    """
    type: Final[str]
    """
    The type property of the StyleSheet interface specifies the style sheet language for the given style sheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/type
    """

class CSSRule:
    """
    The CSSRule interface represents a single CSS rule. There are several types of rules which inherit properties from CSSRule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRule
    """
    cssText: Final[str]
    """
    The cssText property of the CSSRule interface returns the actual text of a CSSStyleSheet style-rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRule/cssText
    """
    parentRule: Final[CSSRule|None]
    """
    The parentRule property of the CSSRule interface returns the containing rule of the current rule if this exists, or otherwise returns null.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRule/parentRule
    """
    parentStyleSheet: Final[StyleSheet]
    """
    The parentStyleSheet property of the CSSRule interface returns the StyleSheet object in which the current rule is defined.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRule/parentStyleSheet
    """

class CSSRuleList:
    """
    A CSSRuleList represents an ordered collection of read-only CSSRule objects.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
    """
    length: Final[float]
    """
    The length property of the CSSRuleList interface returns the number of CSSRule objects in the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList/length
    """
    def item(self, index: float, /) -> CSSRule|None: ...
    """
    The item() method of the CSSRuleList interface returns the CSSRule object at the specified index or null if the specified index doesn't exist.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList/item
    """

class CSSImportRule(CSSRule):
    """
    The CSSImportRule interface represents an @import at-rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule
    """
    href: Final[str]
    """
    The read-only href property of the CSSImportRule interface returns the URL specified by the @import at-rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule/href
    """
    layerName: Final[str|None]
    """
    The read-only layerName property of the CSSImportRule interface returns the name of the cascade layer created by the @import at-rule.

    https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule/layerName
    """
    media : Final[MediaList]
    """
    The read-only media property of the CSSImportRule interface returns a MediaList object, containing the value of the media attribute of the associated stylesheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule/media
    """
    styleSheet: Final[CSSStyleSheet]
    """
    The read-only styleSheet property of the CSSImportRule interface returns the CSS Stylesheet specified by the @import at-rule. This will be in the form of a CSSStyleSheet object.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule/styleSheet
    """
    supportsText: Final[str|None]
    """
    The read-only supportsText property of the CSSImportRule interface returns the supports condition specified by the @import at-rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule/supportsText
    """

class CSSStyleSheetInit(TypedDict, total=False):
    baseURL: str
    """
    A string containing the baseURL used to resolve relative URLs in the stylesheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet#baseurl
    """
    media: MediaList
    """
    A MediaList containing a list of media rules, or a string containing a single rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet#baseurl
    """
    disabled: bool
    """
    A Boolean indicating whether the stylesheet is disabled. False by default.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet#baseurl
    """

class CSSStyleSheet(StyleSheet):
    """
    The CSSStyleSheet interface represents a single CSS stylesheet, and lets you inspect and modify the list of rules contained in the stylesheet. It inherits properties and methods from its parent, StyleSheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
    """
    def __new__(cls, options: CSSStyleSheetInit, /) -> CSSStyleSheet: ...
    """
    The CSSStyleSheet() constructor creates a new CSSStyleSheet object which represents a single Stylesheet.

    https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    """
    cssRules: Final[CSSRuleList]
    """
    The read-only CSSStyleSheet property cssRules returns a live CSSRuleList which provides a real-time, up-to-date list of every CSS rule which comprises the stylesheet. Each item in the list is a CSSRule defining a single rule.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/cssRules
    """
    ownerRule: Final[CSSImportRule|None]
    """
    The read-only CSSStyleSheet property ownerRule returns the CSSImportRule corresponding to the @import at-rule which imported the stylesheet into the document. If the stylesheet wasn't imported into the document using @import, the returned value is null.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/ownerRule
    """

    def deleteRule(self, index: float, /) -> Undefined: ...
    """
    The CSSStyleSheet method deleteRule() removes a rule from the stylesheet object.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/deleteRule
    """
    def insertRule(self, rule: str, index: float = 0., /) -> float: ...
    """
    The CSSStyleSheet.insertRule() method inserts a new CSS rule into the current style sheet.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
    """
    async def replace(self, text: str, /) -> Undefined: ...
    """
    The replace() method of the CSSStyleSheet interface asynchronously replaces the content of the stylesheet with the content passed into it. The method returns a promise that resolves with the CSSStyleSheet object.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replace
    """
    def replaceSync(self, text: str, /) -> Undefined: ...
    """
    The replaceSync() method of the CSSStyleSheet interface synchronously replaces the content of the stylesheet with the content passed into it.

    See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replaceSync
    """


class StyleSheetList:
    """
    The StyleSheetList interface represents a list of CSSStyleSheet objects. An instance of this object can be returned by Document.styleSheets.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList
    """
    length: Final[float]
    """
    The length read-only property of the StyleSheetList interface returns the number of CSSStyleSheet objects in the collection.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList/length
    """
    def item(self, index: float, /) -> CSSStyleSheet|None: ...
    """
    The item() method of the StyleSheetList interface returns a single CSSStyleSheet object.

    See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList/item
    """

class DocumentFragment(Node):
    """
    The DocumentFragment interface represents a minimal document object that has no parent.

    https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    """
    def __new__(cls) -> DocumentFragment: ...
    """
    The DocumentFragment() constructor returns a new, empty DocumentFragment object.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/DocumentFragment
    """
    childElementCount: Final[float]
    """
    The DocumentFragment.childElementCount read-only property returns the number of child elements of a DocumentFragment.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/childElementCount
    """
    children: Final[HTMLCollection]
    """
    The read-only children property returns a live HTMLCollection which contains all of the child elements of the document fragment upon which it was called.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/children
    """
    firstElementChild: Final[Element|None]
    """
    The DocumentFragment.firstElementChild read-only property returns the document fragment's first child Element, or null if there are no child elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/firstElementChild
    """
    lastElementChild: Final[Element|None]
    """
    The DocumentFragment.lastElementChild read-only property returns the document fragment's last child Element, or null if there are no child elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/lastElementChild
    """
    
    def append(self, param1: Node, /) -> Undefined: ...
    """
    The DocumentFragment.append() method inserts a set of Node objects or strings after the last child of the document fragment. Strings are inserted as equivalent Text nodes.

    https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/append
    """
    def getElementById(self, id: str, /) -> Element|None: ...
    """
    The getElementById() method of the DocumentFragment returns an Element object representing the element whose id property matches the specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/getElementById
    """
    def prepend(self, param1: Node, /) -> Undefined: ...
    """
    The DocumentFragment.prepend() method inserts a set of Node objects or strings before the first child of the document fragment. Strings are inserted as equivalent Text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/prepend
    """
    def querySelector(self, selectors: str, /) -> Element|None: ...
    """
    The DocumentFragment.querySelector() method returns the first element, or null if no matches are found, within the DocumentFragment (using depth-first pre-order traversal of the document's nodes) that matches the specified group of selectors.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelector
    """
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    """
    The DocumentFragment.querySelectorAll() method returns a NodeList of elements within the DocumentFragment (using depth-first pre-order traversal of the document's nodes) that matches the specified group of selectors.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelectorAll
    """
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    """
    The DocumentFragment.replaceChildren() method replaces the existing children of a DocumentFragment with a specified new set of children. These can be string or Node objects.

    See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/replaceChildren
    """

class ShadowRoot(DocumentFragment):
    """
    The ShadowRoot interface of the Shadow DOM API is the root node of a DOM subtree that is rendered separately from a document's main DOM tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
    """
    activeElement: Final[Element|None]
    """
    The activeElement read-only property of the ShadowRoot interface returns the element within the shadow tree that has focus.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/activeElement
    """
    # adoptedStyleSheets (array)
    clonable: Final[bool]
    """
    The clonable read-only property of the ShadowRoot interface returns true if the shadow root is clonable, and false otherwise.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/clonable
    """
    delegatesFocus: Final[bool]
    """
    The delegatesFocus read-only property of the ShadowRoot interface returns true if the shadow root delegates focus, and false otherwise.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
    """
    # fullscreenElement (limited)
    host: Final[Element]
    """
    The host read-only property of the ShadowRoot returns a reference to the DOM element the ShadowRoot is attached to.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host
    """
    innerHTML: str|None
    """
    The innerHTML property of the ShadowRoot interface sets or returns a reference to the DOM tree inside the ShadowRoot.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/innerHTML
    """
    # TODO: enum ?
    mode: Final[str]
    """
    The mode read-only property of the ShadowRoot specifies its mode — either open or closed. This defines whether or not the shadow root's internal features are accessible from JavaScript.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode
    """
    pointerLockElement: Final[Element|None]
    """
    The pointerLockElement read-only property of the ShadowRoot interface provides the element set as the target for mouse events while the pointer is locked. It is null if lock is pending, pointer is unlocked, or the target is in another tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/pointerLockElement
    """
    serializable: Final[bool]
    """
    The serializable read-only property of the ShadowRoot interface returns true if the shadow root is serializable.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable
    """
    # TODO: enum ?
    slotAssignment: Final[str]
    """
    The read-only slotAssignment property of the ShadowRoot interface returns the slot assignment mode for the shadow DOM tree. Nodes are either automatically assigned (named) or manually assigned (manual). The value of this property defined using the slotAssignment option when calling Element.attachShadow().

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/slotAssignment
    """
    styleSheets: Final[StyleSheetList]
    """
    The styleSheets read-only property of the ShadowRoot interface returns a StyleSheetList of CSSStyleSheet objects, for stylesheets explicitly linked into or embedded in a shadow tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/styleSheets
    """

    # getAnimations
    #TODO: opts
    def getHTML(self, /) -> str: ...
    """
    The getHTML() method of the ShadowRoot interface is used to serialize a shadow root's DOM to an HTML string.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/getHTML
    """
    def setHTMLUnsafe(self, html: str, /) -> Undefined: ...
    """
    The setHTMLUnsafe() method of the ShadowRoot interface is used to parse a string of HTML into a DocumentFragment, which then replaces the element's subtree in the DOM. The input HTML may include declarative shadow roots.

    See https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/setHTMLUnsafe
    """

class DOMRectReadOnly:
    """
    The DOMRectReadOnly interface specifies the standard properties (also used by DOMRect) to define a rectangle whose properties are immutable.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly
    """

    def __new__(cls) -> DOMRectReadOnly: ...
    """
    The DOMRectReadOnly() constructor creates a new DOMRectReadOnly object.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/DOMRectReadOnly
    """
    
    top: Final[float]
    """
    The top read-only property of the DOMRectReadOnly interface returns the top coordinate value of the DOMRect. (Has the same value as y, or y + height if height is negative.)

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/top
    """
    bottom: Final[float]
    """
    The bottom read-only property of the DOMRectReadOnly interface returns the bottom coordinate value of the DOMRect. (Has the same value as y + height, or y if height is negative.)

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/bottom
    """
    left: Final[float]
    """
    The left read-only property of the DOMRectReadOnly interface returns the left coordinate value of the DOMRect. (Has the same value as x, or x + width if width is negative.)

    https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/left
    """
    right: Final[float]
    """
    The right read-only property of the DOMRectReadOnly interface returns the right coordinate value of the DOMRect. (Has the same value as x + width, or x if width is negative.)

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/right
    """

class DOMRect(DOMRectReadOnly):
    """
    A DOMRect describes the size and position of a rectangle.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    """
    def __new__(cls, x: float, y: float, width: float, height: float, /) -> DOMRect: ...
    """
    The DOMRect() constructor creates a new DOMRect object.

    https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/DOMRect
    """
    height: float
    """
    The height property of the DOMRect interface represents the height of the rectangle. The value can be negative.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/height
    """
    width: float
    """
    The width property of the DOMRect interface represents the width of the rectangle. The value can be negative.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/width
    """
    x: float
    """
    The x property of the DOMRect interface represents the x-coordinate of the rectangle, which is the horizontal distance between the viewport's left edge and the rectangle's origin.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/x
    """
    y: float
    """
    The y property of the DOMRect interface represents the y-coordinate of the rectangle, which is the vertical distance between the viewport's top edge and the rectangle's origin.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/y
    """
    # TODO: static
    # fromRect()

class Attr(Node):
    """
    The Attr interface represents one of an element's attributes as an object. In most situations, you will directly retrieve the attribute value as a string (e.g., Element.getAttribute()), but some cases may require interacting with Attr instances (e.g., Element.getAttributeNode()).

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr
    """
    localName: Final[str]
    """
    The read-only localName property of the Attr interface returns the local part of the qualified name of an attribute, that is the name of the attribute, stripped from any namespace in front of it. For example, if the qualified name is xml:lang, the returned local name is lang, if the element supports that namespace.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/localName
    """
    name: Final[str]
    """
    The read-only name property of the Attr interface returns the qualified name of an attribute, that is the name of the attribute, with the namespace prefix, if any, in front of it. For example, if the local name is lang and the namespace prefix is xml, the returned qualified name is xml:lang.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/name
    """
    namespaceURI: Final[str]
    """
    The read-only namespaceURI property of the Attr interface returns the namespace URI of the attribute, or null if the element is not in a namespace.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/namespaceURI
    """
    ownerElement: Final[Element]
    """
    The read-only ownerElement property of the Attr interface returns the Element the attribute belongs to.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/ownerElement
    """
    prefix: Final[str|None]
    """
    The read-only prefix property of the Attr returns the namespace prefix of the attribute, or null if no prefix is specified.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/prefix
    """
    value: Final[str]
    """
    The value property of the Attr interface contains the value of the attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/Attr/value
    """

class ShadowRootInit(TypedDict):
    # TODO: enum
    mode: str
    """
    A string specifying the encapsulation mode for the shadow DOM tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#mode
    """
    clonable: NotRequired[bool]
    """
    A boolean that specifies whether the shadow root is clonable: when set to true, the shadow host cloned with Node.cloneNode() or Document.importNode() will include shadow root in the copy. Its default value is false.


    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#clonable
    """
    delegateFocus: NotRequired[bool]
    """
    A boolean that, when set to true, specifies behavior that mitigates custom element issues around focusability. When a non-focusable part of the shadow DOM is clicked, the first focusable part is given focus, and the shadow host is given any available :focus styling. Its default value is false.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#delegatesfocus
    """
    serializable: NotRequired[bool]
    """
    A boolean that, when set to true, indicates that the shadow root is serializable. If set, the shadow root may be serialized by calling the Element.getHTML() or ShadowRoot.getHTML() methods with the options.serializableShadowRoots parameter set true. Its default value is false.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#serializable
    """
    slotAssignment: NotRequired[str]
    """
    A string specifying the slot assignment mode for the shadow DOM tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#serializable
    """

class CheckVisibilityOptions(TypedDict, total=False):
    """
    An object indicating additional checks to run.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#options
    """
    contentVisibilityAuto: bool
    """
    true to check if the element content-visibility property has (or inherits) the value auto, and it is currently skipping its rendering. false by default.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#contentvisibilityauto
    """
    opacityProperty: bool
    """
    true to check if the element opacity property has (or inherits) a value of 0. false by default.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#contentvisibilityauto
    """
    visibilityProperty: bool
    """
    true to check if the element is invisible due to the value of its visibility property. false by default.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#opacityproperty
    """

class GetHTMLOptions(TypedDict):
    """
    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML#options
    """
    serializableShadowRoots: bool
    """
    A boolean value that specifies whether to include serializable shadow roots. The default value is false.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML#options
    """
    # shadowRoots : array

class ScrollIntoViewOptions(TypedDict, total=False):
    """
    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#scrollintoviewoptions
    """
    # TODO: enum
    behavior: str
    """
    Determines whether scrolling is instant or animates smoothly. This option is a string which must take one of the following values:

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#behavior
    """
    # enum
    block: str
    """
    Defines the vertical alignment of the element within the scrollable ancestor container.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#block
    """
    # enum
    inline: str
    """
    Defines the horizontal alignment of the element within the scrollable ancestor container. This option is a string and accepts one of the following values:

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#block
    """
    

# https://developer.mozilla.org/en-US/docs/Web/API/Element
# no aria (too much)
class Element(Node):
    """
    Element is the most general base class from which all element objects (i.e., objects that represent elements) in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Element
    """
    assignedSlot: Final[HTMLSlotElement|None]
    """
    The assignedSlot read-only property of the Element interface returns an HTMLSlotElement representing the <slot> element the node is inserted in.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/assignedSlot
    """
    attributes: Final[NamedNodeMap]
    """
    The Element.attributes property returns a live collection of all attribute nodes registered to the specified node. It is a NamedNodeMap, not an Array, so it has no Array methods and the Attr nodes' indexes may differ among browsers. To be more specific, attributes is a key/value pair of strings that represents any information regarding that attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
    """
    childElementCount: Final[float]
    """
    The Element.childElementCount read-only property returns the number of child elements of this element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount
    """
    children: Final[HTMLCollection]
    """
    The read-only children property returns a live HTMLCollection which contains all of the child elements of the element upon which it was called.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/children
    """
    classList: Final[DOMTokenList]
    """
    The Element.classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element. This can then be used to manipulate the class list.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    """
    className: str
    """
    The className property of the Element interface gets and sets the value of the class attribute of the specified element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/className
    """
    clientHeight: Final[float]
    """
    The clientHeight read-only property of the Element interface is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present).

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
    """
    clientLeft: Final[float]
    """
    The clientLeft read-only property of the Element interface returns the width of the left border of an element in pixels. It includes the width of the vertical scrollbar if the text direction of the element is right-to-left and if there is an overflow causing a left vertical scrollbar to be rendered. clientLeft does not include the left margin or the left padding.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft
    """
    clientTop: Final[float]
    """
    The clientTop read-only property of the Element interface returns the width of the top border of an element in pixels.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop
    """
    clientWidth: Final[float]
    """
    The clientWidth read-only property of the Element interface is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels. It includes padding but excludes borders, margins, and vertical scrollbars (if present).

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
    """
    currentCSSZoom: Final[float]
    """
    The currentCSSZoom read-only property of the Element interface provides the "effective" CSS zoom of an element, taking into account the zoom applied to the element and all its parent elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/currentCSSZoom
    """
    firstElementChild: Final[Element|None]
    """
    The Element.firstElementChild read-only property returns an element's first child Element, or null if there are no child elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild
    """
    id: Final[str]
    """
    The id property of the Element interface represents the element's identifier, reflecting the id global attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/id
    """
    innerHTML: str
    """
    The Element property innerHTML gets or sets the HTML or XML markup contained within the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
    """
    lastElementChild: Final[Element|None]
    """
    The Element.lastElementChild read-only property returns an element's last child Element, or null if there are no child elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild
    """
    localName: Final[str]
    """
    The Element.localName read-only property returns the local part of the qualified name of an element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/localName
    """
    namespaceURI: Final[str|None]
    """
    The Element.namespaceURI read-only property returns the namespace URI of the element, or null if the element is not in a namespace.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/namespaceURI
    """
    nextElementSibling: Final[Element|None]
    """
    The Element.nextElementSibling read-only property returns the element immediately following the specified one in its parent's children list, or null if the specified element is the last one in the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling
    """
    outerHTML: Final[str]
    """
    The outerHTML attribute of the Element DOM interface gets the serialized HTML fragment describing the element including its descendants. It can also be set to replace the element with nodes parsed from the given string.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML
    """
    part: Final[DOMTokenList]
    """
    The part property of the Element interface represents the part identifier(s) of the element (i.e., set using the part attribute), returned as a DOMTokenList. These can be used to style parts of a shadow DOM, via the ::part pseudo-element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/part
    """
    prefix: Final[str|None]
    """
    The Element.prefix read-only property returns the namespace prefix of the specified element, or null if no prefix is specified.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/prefix
    """
    previousElementSibling: Final[Element|None]
    """
    The Element.previousElementSibling read-only property returns the Element immediately prior to the specified one in its parent's children list, or null if the specified element is the first one in the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
    """
    role: str|None
    """
    The role property of the Element interface returns the explicitly set WAI-ARIA role for the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/role
    """
    scrollHeight: float
    """
    The scrollHeight read-only property of the Element interface is a measurement of the height of an element's content, including content not visible on the screen due to overflow.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    """
    scrollLeft: float
    """
    The scrollLeft property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its left edge. This value is subpixel precise in modern browsers, meaning that it isn't necessarily a whole number.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
    """
    scrollTop: float
    """
    The scrollTop property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its top edge. This value is subpixel precise in modern browsers, meaning that it isn't necessarily a whole number.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
    """
    scrollWidth: float
    """
    The scrollWidth read-only property of the Element interface is a measurement of the width of an element's content, including content not visible on the screen due to overflow.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth
    """
    shadowRoot: Final[ShadowRoot|None]
    """
    The Element.shadowRoot read-only property represents the shadow root hosted by the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot
    """
    slot: Final[str]
    """
    The slot property of the Element interface returns the name of the shadow DOM slot the element is inserted in.

    https://developer.mozilla.org/en-US/docs/Web/API/Element/slot
    """
    tagName: Final[str]
    """
    The tagName read-only property of the Element interface returns the tag name of the element on which it's called.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
    """

    #TODO: *args
    def after(self, node1: Node, /) -> Undefined: ...
    """
    The Element.after() method inserts a set of Node objects or strings in the children list of the Element's parent, just after the Element. Strings are inserted as equivalent Text nodes.

    see https://developer.mozilla.org/en-US/docs/Web/API/Element/after
    """
    # def animate()
    def append(self, param1: None, /) -> Undefined: ...
    """
    The Element.append() method inserts a set of Node objects or strings after the last child of the Element. Strings are inserted as equivalent Text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/append
    """
    def attachShadow(self, options: ShadowRootInit, /) -> ShadowRoot: ...
    """
    The Element.attachShadow() method attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot.
    
    https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    """
    def before(self, node1: Node, /) -> Undefined: ...
    """
    The Element.before() method inserts a set of Node objects or strings in the children list of this Element's parent, just before this Element. Strings are inserted as equivalent Text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/before
    """
    def checkVisibility(self, options: CheckVisibilityOptions|None = None) -> bool: ...
    """
    The checkVisibility() method of the Element interface checks whether the element is visible.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility
    """
    def closest(self, selectors: str, /) -> Element|None: ...
    """
    The closest() method of the Element interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    """
    # TODO: computedStyleMap (limited)
    # TODO: getAnimations
    def getAttribute(self, attributeName: str, /) -> str|None: ...
    """
    The getAttribute() method of the Element interface returns the value of a specified attribute on the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
    """
    #TODO getAttributeNames (list)
    def getAttributeNode(self, attrName: str, /) -> Attr: ...
    """
    Returns the specified attribute of the specified element, as an Attr node.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNode
    """
    def getAttributeNodeNS(self, namespace: str, attrName: str, /) -> Attr: ...
    """
    The getAttributeNodeNS() method of the Element interface returns the namespaced Attr node of an element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNodeNS
    """
    def getAttributeNS(self, namespace: str, attributeName: str, /) -> str|None: ...
    """
    The getAttributeNS() method of the Element interface returns the string value of the attribute with the specified namespace and name. If the named attribute does not exist, the value returned will either be null or "" (the empty string); see Notes for details.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS
    """
    def getBoundingClientRect(self, /) -> DOMRect: ...
    """
    The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    """
    #TODO getClientRects
    def getElementsByClassName(self, names: str, /) -> HTMLCollection: ...
    """
    The Element method getElementsByClassName() returns a live HTMLCollection which contains every descendant element which has the specified class name or names.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
    """
    def getElementsByTagName(self, tagName: str, /) -> HTMLCollection: ...
    """
    The Element.getElementsByTagName() method returns a live HTMLCollection of elements with the given tag name.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
    """
    def getElementsByTagNameNS(self, namespaceURI: str, localName: str, /) -> HTMLCollection: ...
    """
    The Element.getElementsByTagNameNS() method returns a live HTMLCollection of elements with the given tag name belonging to the given namespace. It is similar to Document.getElementsByTagNameNS, except that its search is restricted to descendants of the specified element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagNameNS
    """
    # TODO: options
    def getHTML(self, options: GetHTMLOptions|None = None, /) -> str: ...
    """
    The getHTML() method of the Element interface is used to serialize an element's DOM to an HTML string.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML
    """
    def hasAttribute(self, name: str, /) -> bool: ...
    """
    The Element.hasAttribute() method returns a Boolean value indicating whether the specified element has the specified attribute or not.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute
    """
    def hasAttributeNS(self, namespace: str, localName: str, /) -> bool: ...
    """
    The hasAttributeNS() method of the Element interface returns a boolean value indicating whether the current element has the specified attribute with the specified namespace.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttributeNS
    """
    def hasAttributes(self, /) -> bool: ...
    """
    The hasAttributes() method of the Element interface returns a boolean value indicating whether the current element has any attributes or not.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttributes
    """
    # TODO: pointerId ?
    def hasPointerCapture(self, pointerId: float, /) -> bool: ...
    """
    The hasPointerCapture() method of the Element interface checks whether the element on which it is invoked has pointer capture for the pointer identified by the given pointer ID.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture
    """
    # TODO: more restrictive position str (enum ?)
    def insertAdjacentElement(self, position: str, element: Element, /) -> Element|None: ...
    """
    The insertAdjacentElement() method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    """
    def insertAdjacentHTML(self, position: str, text: str, /) -> Undefined: ...
    """
    The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    """
    def insertAdjacentText(self, where: str, data: str, /) -> Undefined: ...
    """
    The insertAdjacentText() method of the Element interface, given a relative position and a string, inserts a new text node at the given position relative to the element it is called from.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText
    """
    def matches(self, selectors: str, /) -> bool: ...
    """
    The matches() method of the Element interface tests whether the element would be selected by the specified CSS selector.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    """
    # moveBefore (limited availability)
    # TODO:
    def prepend(self, param1: Node, /) -> Undefined: ...
    """
    The Element.prepend() method inserts a set of Node objects or strings before the first child of the Element. Strings are inserted as equivalent Text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
    """
    def querySelector(self, selectors: str, /) -> Element|None: ...
    """
    The querySelector() method of the Element interface returns the first element that is a descendant of the element on which it is invoked that matches the specified group of selectors.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
    """
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    """
    The Element method querySelectorAll() returns a static (not live) NodeList representing a list of elements matching the specified group of selectors which are descendants of the element on which the method was called.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
    """
    def releasePointerCapture(self, pointerId: float, /) -> Undefined: ...
    """
    The releasePointerCapture() method of the Element interface releases (stops) pointer capture that was previously set for a specific (PointerEvent) pointer.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture
    """
    def remove(self) -> Undefined: ...
    """
    The Element.remove() method removes the element from the DOM.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
    """
    def removeAttribute(self, attrName: str, /) -> Undefined: ...
    """
    The Element method removeAttribute() removes the attribute with the specified name from the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
    """
    def removeAttributeNode(self, attributeNode: Attr, /) -> Node: ...
    """
    The removeAttributeNode() method of the Element interface removes the specified Attr node from the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttributeNode
    """
    def removeAttributeNS(self, namespace: str, attrName: str, /) -> Undefined: ...
    """
    The removeAttributeNS() method of the Element interface removes the specified attribute with the specified namespace from an element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttributeNS
    """
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    """
    The Element.replaceChildren() method replaces the existing children of a Node with a specified new set of children. These can be string or Node objects.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren
    """
    def replaceWith(self, param1: Node, /) -> Undefined: ...
    """
    The Element.replaceWith() method replaces this Element in the children list of its parent with a set of Node objects or strings. Strings are inserted as equivalent Text nodes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith
    """
    # requestFullScreen (limited)
    # requestPointerLock (limited)
    # TODO: 2 possibilites :
    def scroll(self, x: float, y: float, /) -> Undefined: ...
    """
    The scroll() method of the Element interface scrolls the element to a particular set of coordinates inside a given element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll
    """
    # TODO: 2 possibilites :
    def scrollBy(self, x: float, y: float, /) -> Undefined: ...
    """
    The scrollBy() method of the Element interface scrolls an element by the given amount.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
    """
    # TODO: options
    def scrollIntoView(self, options: ScrollIntoViewOptions|bool|None=None) -> Undefined: ...
    """
    The Element interface's scrollIntoView() method scrolls the element's ancestor containers such that the element on which scrollIntoView() is called is visible to the user.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    """
    # TODO: 2 possibilites :
    def scrollTo(self, x: float, y: float, /) -> Undefined: ...
    """
    The scrollTo() method of the Element interface scrolls to a particular set of coordinates inside a given element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
    """
    def setAttribute(self, name: str, value: str|None, /) -> Undefined: ...
    """
    The setAttribute() method of the Element interface sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    """
    def setAttributeNode(self, attribute: Attr, /) -> Attr|None: ...
    """
    The setAttributeNode() method of the Element interface adds a new Attr node to the specified element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttributeNode
    """
    def setAttributeNodeNS(self, attributeNode: Attr, /) -> Attr|None: ...
    """
    The setAttributeNodeNS() method of the Element interface adds a new namespaced Attr node to an element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttributeNodeNS
    """
    def setAttributeNS(self, namespace: str, name: str, value: str|None, /) -> Undefined: ...
    """
    setAttributeNS adds a new attribute or changes the value of an attribute with the given namespace and name.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttributeNS
    """
    def setHTMLUnsafe(self, html: str, /) -> Undefined: ...
    """
    The setHTMLUnsafe() method of the Element interface is used to parse a string of HTML into a DocumentFragment, which then replaces the element's subtree in the DOM. The input HTML may include declarative shadow roots.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTMLUnsafe
    """
    def setPointerCapture(self, pointerId: float, /) -> Undefined: ...
    """
    The setPointerCapture() method of the Element interface is used to designate a specific element as the capture target of future pointer events. Subsequent events for the pointer will be targeted at the capture element until capture is released (via Element.releasePointerCapture() or the pointerup event is fired).
    
    See https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
    """
    def toggleAttribute(self, name: str, toggle: bool = False, /) -> bool: ...
    """
    The toggleAttribute() method of the Element interface toggles a Boolean attribute (removing it if it is present and adding it if it is not present) on the given element.

    See https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute
    """

class ValidityStateFlags(TypedDict, total=False):
    """
    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#flags
    """
    valueMissing: bool
    """
    A boolean value that is true if the element has a required attribute, but no value, or false otherwise. If true, the element matches the :invalid CSS pseudo-class.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#valuemissing 
    """
    typeMismatch: bool
    """
    A boolean value that is true if the value is not in the required syntax (when type is email or url), or false if the syntax is correct. If true, the element matches the :invalid CSS pseudo-class.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#valuemissing
    """
    patternMismatch: bool
    """
    A boolean value that is true if the value does not match the specified pattern, and false if it does match. If true, the element matches the :invalid CSS pseudo-class.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#patternmismatch
    """
    tooLong: bool
    """
    A boolean value that is true if the value exceeds the specified maxlength for HTMLInputElement or HTMLTextAreaElement objects, or false if its length is less than or equal to the maximum length. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#toolong
    """
    tooShort: bool
    """
    A boolean value that is true if the value fails to meet the specified minlength for HTMLInputElement or HTMLTextAreaElement objects, or false if its length is greater than or equal to the minimum length. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#tooshort
    """
    rangeUnderflow: bool
    """
    A boolean value that is true if the value is less than the minimum specified by the min attribute, or false if it is greater than or equal to the minimum. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#rangeunderflow
    """
    rangeOverflow: bool
    """
    A boolean value that is true if the value is greater than the maximum specified by the max attribute, or false if it is less than or equal to the maximum. If true, the element matches the :invalid and :out-of-range and CSS pseudo-classes.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#rangeoverflow
    """
    stepMismatch: bool
    """
    A boolean value that is true if the value does not fit the rules determined by the step attribute (that is, it's not evenly divisible by the step value), or false if it does fit the step rule. If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#stepmismatch
    """
    badInput: bool
    """
    A boolean value that is true if the user has provided input that the browser is unable to convert.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#stepmismatch
    """
    customError: bool
    """
    A boolean value indicating whether the element's custom validity message has been set to a non-empty string by calling the element's setCustomValidity() method.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#customerror
    """

class FormData:
    """
    The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch(), XMLHttpRequest.send() or navigator.sendBeacon() methods. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData
    """
    def __new__(cls, form: HTMLFormElement|None=None, submitter: HTMLButtonElement|HTMLInputElement|None=None) -> FormData: ...
    """
    The FormData() constructor creates a new FormData object.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    """
    def append(self, name: str, value: str|Blob|None = None, filename: str|None = None, /) -> Undefined: ...
    """
    The append() method of the FormData interface appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    """
    def delete(self, name: str, /) -> Undefined: ...
    """
    The delete() method of the FormData interface deletes a key and its value(s) from a FormData object.

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/delete
    """
    # entries.
    def get(self, name: str) -> str|None: ...
    """
    The get() method of the FormData interface returns the first value associated with a given key from within a FormData object. If you expect multiple values and want all of them, use the getAll() method instead.

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/get
    """
    # getAll
    def has(self, name: str) -> bool: ...
    """
    The has() method of the FormData interface returns whether a FormData object contains a certain key.

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/has
    """
    # keys
    def set(self, name: str, value: str|Blob, filename: str|None=None) -> Undefined: ...
    """
    The set() method of the FormData interface sets a new value for an existing key inside a FormData object, or adds the key/value if it does not already exist.

    See https://developer.mozilla.org/en-US/docs/Web/API/FormData/set
    """
    # values


# no aria : too much
class ElementInternals:
    """
    The ElementInternals interface of the Document Object Model gives web developers a way to allow custom elements to fully participate in HTML forms. It provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
    """
    form: Final[HTMLFormElement]
    """
    The form read-only property of the ElementInternals interface returns the HTMLFormElement associated with this element.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/form
    """
    labels: Final[NodeList[HTMLLabelElement]]
    """
    The labels read-only property of the ElementInternals interface returns the labels associated with the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/labels
    """

    role: str
    """
    The role read-only property of the ElementInternals interface returns the WAI-ARIA role for the element. For example, a checkbox might have role="checkbox". It reflects the role attribute; it does not return the element's implicit ARIA role, if any, unless explicitly set.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/role
    """

    shadowRoot: Final[ShadowRoot|None]
    """
    The shadowRoot read-only property of the ElementInternals interface returns the ShadowRoot for this element.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/shadowRoot
    """
    # states
    validationMessage: Final[str]
    """
    The validationMessage read-only property of the ElementInternals interface returns the validation message for the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/validationMessage
    """
    validity: Final[ValidityState]
    """
    The validity read-only property of the ElementInternals interface returns a ValidityState object which represents the different validity states the element can be in, with respect to constraint validation.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/validity
    """
    willValidate: Final[bool]
    """
    The willValidate read-only property of the ElementInternals interface returns true if the element is a submittable element that is a candidate for constraint validation.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/willValidate
    """
    
    def checkValidity(self) -> bool: ...
    """
    The checkValidity() method of the ElementInternals interface checks if the element meets any constraint validation rules applied to it.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity
    """
    def reportValidity(self) -> bool: ...
    """
    The reportValidity() method of the ElementInternals interface checks if the element meets any constraint validation rules applied to it.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity
    """
    def setFormValue(self, value: str|File|FormData, state:  str|File|FormData|None = None, /) -> Undefined : ...
    """
    The setFormValue() method of the ElementInternals interface sets the element's submission value and state, communicating these to the user agent.

    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
    """
    def setValidity(self, flags: ValidityStateFlags, message: str|None = None, anchor: HTMLElement|None = None, /) -> Undefined: ...
    """
    The setValidity() method of the ElementInternals interface sets the validity of the element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity
    """
    

class HTMLElement(Element):
    """
    The HTMLElement interface represents any HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
    """

    accessKeyLabel: Final[str]
    """
    The HTMLElement.accessKey property sets the keystroke which a user can press to jump to a given element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/accessKey
    """
    autofocus: Final[bool]
    """
    The autofocus property of the HTMLElement interface represents a boolean value reflecting the autofocus HTML global attribute, which indicates whether the control should be focused when the page loads, or when dialog or popover become shown if specified in an element inside <dialog> elements or elements whose popover attribute is set.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/autofocus
    """
    contentEditable: Final[str]
    """
    The contentEditable property of the HTMLElement interface specifies whether or not the element is editable.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable
    """
    dataset: Final[DOMStringMap]
    """
    The dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements. It exposes a map of strings (DOMStringMap) with an entry for each data-* attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    """
    dir: Final[str]
    """
    The HTMLElement.dir property indicates the text writing directionality of the content of the current element. It reflects the element's dir attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir
    """
    draggable: Final[bool]
    """
    The draggable property of the HTMLElement interface gets and sets a Boolean primitive indicating if the element is draggable.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/draggable
    """
    enterKeyHint: Final[str]
    """
    The enterKeyHint property is an enumerated property defining what action label (or icon) to present for the enter key on virtual keyboards. It reflects the enterkeyhint HTML global attribute and is an enumerated property, only accepting the following values as a string:

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint
    """
    hidden: Final[bool]
    """
    The HTMLElement property hidden reflects the value of the element's hidden attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
    """
    inert: Final[bool]
    """
    The HTMLElement property inert reflects the value of the element's inert attribute. It is a boolean value that, when present, makes the browser "ignore" user input events for the element, including focus events and events from assistive technologies. The browser may also ignore page search and text selection in the element. This can be useful when building UIs such as modals where you would want to "trap" the focus inside the modal when it's visible.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
    """
    innerText: str
    """
    The innerText property of the HTMLElement interface represents the rendered text content of a node and its descendants.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
    """
    inputMode: Final[str]
    """
    The HTMLElement property inputMode reflects the value of the element's inputmode attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inputMode
    """
    isContentEditable: Final[bool]
    """
    The HTMLElement.isContentEditable read-only property returns a boolean value that is true if the contents of the element are editable; otherwise it returns false.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/isContentEditable
    """
    lang: Final[str]
    """
    The lang property of the HTMLElement interface indicates the base language of an element's attribute values and text content, in the form of a RFC 5646: BCP 47 language identifier tag. It reflects the element's lang attribute; the xml:lang attribute does not affect this property.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang
    """
    nonce: Final[float]
    """
    The nonce property of the HTMLElement interface returns the cryptographic number used once that is used by Content Security Policy to determine whether a given fetch will be allowed to proceed.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/nonce
    """
    offsetHeight: Final[float]
    """
    The offsetHeight read-only property of the HTMLElement interface returns the height of an element, including vertical padding and borders, as an integer.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    """
    offsetLeft: Final[float]
    """
    The offsetLeft read-only property of the HTMLElement interface returns the number of pixels that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
    """
    offsetParent: Final[float]
    """
    The HTMLElement.offsetParent read-only property returns a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
    """
    offsetTop: Final[float]
    """
    The offsetTop read-only property of the HTMLElement interface returns the distance from the outer border of the current element (including its margin) to the top padding edge of the offsetParent, the closest positioned ancestor element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
    """
    offsetWidth: Final[float]
    """
    The offsetWidth read-only property of the HTMLElement interface returns the layout width of an element as an integer.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
    """
    outerText: Final[str]
    """
    The outerText property of the HTMLElement interface returns the same value as HTMLElement.innerText. When used as a setter it replaces the whole current node with the given text (this differs from innerText, which replaces the content inside the current node).

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/outerText
    """
    popover: Final[str]
    """
    The popover property of the HTMLElement interface gets and sets an element's popover state via JavaScript ("auto", "hint", or "manual"), and can be used for feature detection.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover
    """
    spellcheck: Final[bool]
    """
    The spellcheck property of the HTMLElement interface represents a boolean value that controls the spell-checking hint. It is available on all HTML elements, though it doesn't affect all of them.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/spellcheck
    """
    style: Final[CSSStyleDeclaration|None]
    """
    The read-only style property of the HTMLElement returns the inline style of an element in the form of a live CSSStyleDeclaration object that contains a list of all styles properties for that element with values assigned only for the attributes that are defined in the element's inline style attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
    """
    tabIndex: Final[float]
    """
    The tabIndex property of the HTMLElement interface represents the tab order of the current element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex
    """
    title: Final[str]
    """
    The HTMLElement.title property represents the title of the element: the text usually displayed in a 'tooltip' popup when the mouse is over the node.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/title
    """
    translate: Final[bool]
    """
    The translate property of the HTMLElement interface indicates whether an element's attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.

    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/translate
    """
    def attachInternals(self) -> ElementInternals: ...
    """
    The HTMLElement.attachInternals() method returns an ElementInternals object. This method allows a custom element to participate in HTML forms. The ElementInternals interface provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
    """
    def blur(self) -> Undefined: ...
    """
    The HTMLElement.blur() method removes keyboard focus from the current element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur
    """
    def click(self) -> Undefined: ...
    """
    The HTMLElement.click() method simulates a mouse click on an element. When called on an element, the element's click event is fired (unless its disabled attribute is set).

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
    """
    def focus(self) -> Undefined: ...
    """
    The HTMLElement.focus() method sets focus on the specified element, if it can be focused. The focused element is the element that will receive keyboard and similar events by default.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    """
    def hidePopover(self) -> Undefined: ...
    """
    The hidePopover() method of the HTMLElement interface hides a popover element (i.e., one that has a valid popover attribute) by removing it from the top layer and styling it with display: none.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidePopover
    """
    # options not supported by browsers
    def showPopover(self) -> Undefined: ...
    """
    The showPopover() method of the HTMLElement interface shows a popover element (i.e., one that has a valid popover attribute) by adding it to the top layer.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/showPopover
    """
    def togglePopover(self, force: bool=False, /) -> Undefined: ...
    """
    The togglePopover() method of the HTMLElement interface toggles a popover element (i.e., one that has a valid popover attribute) between the hidden and showing states.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/togglePopover
    """

class RadioNodeList(NodeList):
    """
    The RadioNodeList interface represents a collection of elements in a <form> returned by a call to HTMLFormControlsCollection.namedItem().

    See https://developer.mozilla.org/en-US/docs/Web/API/RadioNodeList
    """
    value: str
    """
    If the underlying element collection contains radio buttons, the RadioNodeList.value property represents the checked radio button. On retrieving the value property, the value of the currently checked radio button is returned as a string. If the collection does not contain any radio buttons or none of the radio buttons in the collection is in checked state, the empty string is returned. On setting the value property, the first radio button input element whose value property is equal to the new value will be set to checked.

    See https://developer.mozilla.org/en-US/docs/Web/API/RadioNodeList/value
    """

class HTMLFormControlsCollection(HTMLCollection):
    """
    The HTMLFormControlsCollection interface represents a collection of HTML form control elements, returned by the HTMLFormElement interface's elements property.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection
    """
    def namedItem(self, name: str) -> Element|RadioNodeList|None: ... # type: ignore
    """
    The HTMLFormControlsCollection.namedItem() method returns the RadioNodeList or the Element in the collection whose name or id match the specified name, or null if no node matches.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection/namedItem
    """

class HTMLFormElement(HTMLElement):
    """
    The HTMLFormElement interface represents a <form> element in the DOM. It allows access to—and, in some cases, modification of—aspects of the form, as well as access to its component elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
    """
    acceptCharset: str
    """
    The HTMLFormElement.acceptCharset property represents the character encoding for the given <form> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/acceptCharset
    """
    action: str
    """
    The HTMLFormElement.action property represents the action of the <form> element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/action
    """
    # enum
    autocomplete: str
    """
    The autocomplete property of the HTMLFormElement interface indicates whether the value of the form's controls can be automatically completed by the browser. It reflects the <form> element's autocomplete attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/autocomplete
    """
    elements: HTMLFormControlsCollection
    """
    The HTMLFormElement property elements returns an HTMLFormControlsCollection listing all the form controls contained in the <form> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
    """
    # enum
    encoding: str
    """
    The HTMLFormElement.encoding property is an alternative name for the enctype element on the DOM HTMLFormElement object.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/encoding
    """
    enctype: str
    """
    The HTMLFormElement.enctype property is the MIME type of content that is used to submit the form to the server.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
    """
    length: Final[float]
    """
    The HTMLFormElement.length read-only property returns the number of controls in the <form> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/length
    """
    method: str
    """
    The HTMLFormElement.method property represents the HTTP method used to submit the <form>.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/method
    """
    name: str
    """
    The HTMLFormElement.name property represents the name of the current <form> element as a string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/name
    """
    noValidate: bool
    """
    The noValidate property of the HTMLFormElement interface is a boolean value indicating if the <form> will bypass constraint validation when submitted. It reflects the <form> element's novalidate attribute; if the attribute present, the value is true.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/noValidate
    """
    rel: str
    """
    The rel property of the HTMLFormElement interface reflects the rel attribute. It is a string containing what kinds of links the HTML <form> element creates, as a space-separated list of enumerated values.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/rel
    """
    relList: DOMTokenList
    """
    The relList read-only property of the HTMLFormElement interface reflects the rel attribute. It is a live DOMTokenList containing the set of link types indicating the relationship between the resource represented by the <form> element and the current document.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/relList
    """
    target: str
    """
    The target property of the HTMLFormElement interface represents the target of the form's action (i.e., the frame in which to render its output).

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/target
    """

    def checkValidity(self) -> bool: ...
    """
    The checkValidity() method of the HTMLFormElement interface returns a boolean value which indicates if all associated controls meet any constraint validation rules applied to them. The method also fires an invalid event on each invalid element, but not on the form element itself. Because there's no default browser behavior for checkValidity(), canceling this invalid event has no effect.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/checkValidity
    """
    def reportValidity(self) -> bool: ...
    """
    The reportValidity() method of the HTMLFormElement interface performs the same validity checking steps as the checkValidity() method. In addition, for each invalid event that was fired and not canceled, the browser displays the problem to the user.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
    """
    def requestSubmit(self, submitter: HTMLInputElement|HTMLButtonElement|None = None, /) -> Undefined: ...
    """
    The HTMLFormElement method requestSubmit() requests that the form be submitted using a specific submit button.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
    """
    def reset(self) -> Undefined: ...
    """
    The HTMLFormElement.reset() method restores a form element's default values. This method does the same thing as clicking the form's <input type="reset"> control.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
    """
    def submit(self) -> Undefined: ...
    """
    The HTMLFormElement.submit() method submits a given <form>.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit
    """


class ValidityState:
    """
    The ValidityState interface represents the validity states that an element can be in, with respect to constraint validation. Together, they help explain why an element's value fails to validate, if it's not valid.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
    """
    badInput: Final[bool]
    """
    The read-only badInput property of the ValidityState interface indicates if the user has provided input that the browser is unable to convert. For example, if you have a number input element whose content is a string.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput
    """
    customError: Final[bool]
    """
    The read-only customError property of the ValidityState interface returns true if an element doesn't meet the validation required in the custom validity set by the element's setCustomValidity() method.

    https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/customError
    """
    patternMismatch: Final[bool]
    """
    The read-only patternMismatch property of the ValidityState interface indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's pattern attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch
    """
    rangeOverflow: Final[bool]
    """
    The read-only rangeOverflow property of the ValidityState interface indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's max attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow
    """
    rangeUnderflow: Final[bool]
    """
    The read-only rangeUnderflow property of the ValidityState interface indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's min attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow
    """
    stepMismatch: Final[bool]
    """
    The read-only stepMismatch property of the ValidityState interface indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's step attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch
    """
    tooLong: Final[bool]
    """
    The read-only tooLong property of the ValidityState interface indicates if the value of an <input> or <textarea>, after having been edited by the user, exceeds the maximum code-unit length established by the element's maxlength attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong
    """
    tooShort: Final[bool]
    """
    The read-only tooShort property of the ValidityState interface indicates if the value of an <input>, <button>, <select>, <output>, <fieldset> or <textarea>, after having been edited by the user, is less than the minimum code-unit length established by the element's minlength attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort
    """
    typeMismatch: Final[bool]
    """
    The read-only typeMismatch property of the ValidityState interface indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's type attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch
    """
    valid: Final[bool]
    """
    The read-only valid property of the ValidityState interface indicates if the value of an <input> element meets all its validation constraints, and is therefore considered to be valid.

    See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valid
    """
    valueMissing: Final[bool]
    """
    The read-only valueMissing property of the ValidityState interface indicates if a required control, such as an <input>, <select>, or <textarea>, has an empty value.
    """

class Blob:
    """
    The Blob interface represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob
    """
    size: Final[float]
    """
    The size read-only property of the Blob interface returns the size of the Blob or File in bytes.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob/size
    """
    type: Final[str]
    """
    The type read-only property of the Blob interface returns the MIME type of the file.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob/type
    """
    # async def arrayBuffer(self) -> : ...
    """
    The arrayBuffer() method of the Blob interface returns a Promise that resolves with the contents of the blob as binary data contained in an ArrayBuffer.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer
    """
    def slice(self, start: float, end: float|None = None, contentType: str|None = None) -> Blob: ...
    """
    The slice() method of the Blob interface creates and returns a new Blob object which contains data from a subset of the blob on which it's called.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice
    """
    async def text(self) -> str: ...
    """
    The text() method of the Blob interface returns a Promise that resolves with a string containing the contents of the blob, interpreted as UTF-8.

    See https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
    """

class File(Blob):
    """
    The File interface provides information about files and allows JavaScript in a web page to access their content.

    See https://developer.mozilla.org/en-US/docs/Web/API/File
    """
    # def __new__(cls) -> File: ...
    """
    The File() constructor creates a new File object instance.

    See https://developer.mozilla.org/en-US/docs/Web/API/File/File
    """
    lastModified: Final[float]
    """
    The lastModified read-only property of the File interface provides the last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.

    See https://developer.mozilla.org/en-US/docs/Web/API/File/lastModified
    """
    name: str
    """
    The name read-only property of the File interface returns the name of the file represented by a File object. For security reasons, the path is excluded from this property.

    See https://developer.mozilla.org/en-US/docs/Web/API/File/name
    """
    webkitRelativePath: Final[str]
    """
    The webkitRelativePath read-only property of the File interface contains a string which specifies the file's path relative to the directory selected by the user in an <input> element with its webkitdirectory attribute set.

    See https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath
    """

class FileList:
    """
    The FileList interface represents an object of this type returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage.

    See https://developer.mozilla.org/en-US/docs/Web/API/FileList
    """
    length: Final[float]
    """
    The length read-only property of the FileList interface returns the number of files in the FileList.

    See https://developer.mozilla.org/en-US/docs/Web/API/FileList/length
    """
    def item(self, index: float) -> File: ...
    """
    The item() method of the FileList interface returns a File object representing the file at the specified index in the file list.

    See https://developer.mozilla.org/en-US/docs/Web/API/FileList/item
    """

class HTMLInputElement(HTMLElement):
    """
    The accept property of the HTMLInputElement interface reflects the <input> element's accept attribute, generally a comma-separated list of unique file type specifiers providing a hint for the expected file type for an <input> of type file. If the attribute is not explicitly set, the accept property is an empty string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/accept
    """
    accept: str
    """
    The accept property of the HTMLInputElement interface reflects the <input> element's accept attribute, generally a comma-separated list of unique file type specifiers providing a hint for the expected file type for an <input> of type file. If the attribute is not explicitly set, the accept property is an empty string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/accept
    """
    alt: str
    """
    The alt property of the HTMLInputElement interface defines the textual label for the button for users and user agents who cannot use the image. It reflects the <input> element's alt attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/alt
    """
    # enum
    autocomplete: str
    """
    The autocomplete property of the HTMLInputElement interface indicates whether the value of the control can be automatically completed by the browser. It reflects the <input> element's autocomplete attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/autocomplete
    """
    checked: bool
    """
    The checked property of the HTMLInputElement interface specifies the current checkedness of the element; that is, whether the form control is checked or not.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checked
    """
    defaultChecked: bool
    """
    The defaultChecked property of the HTMLInputElement interface specifies the default checkedness state of the element. This property reflects the <input> element's checked attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/defaultChecked
    """
    defaultValue: str
    """
    The defaultValue property of the HTMLInputElement interface indicates the original (or default) value of the <input> element. It reflects the element's value attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/defaultValue
    """
    dirName: str
    """
    The dirName property of the HTMLInputElement interface is the directionality of the element and enables the submission of that value. It reflects the value of the <input> element's dirName attribute. This property can be retrieved or set.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/dirName
    """
    disabled: bool
    """
    The HTMLInputElement.disabled property is a boolean value that reflects the disabled HTML attribute, which indicates whether the control is disabled. If it is disabled, it does not accept clicks. A disabled element is unusable and un-clickable.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/disabled
    """
    files: FileList|None
    """
    The HTMLInputElement.files property allows you to access the FileList selected with the <input type="file"> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files
    """
    form: Final[HTMLFormElement|None]
    """
    The form read-only property of the HTMLInputElement interface returns an HTMLFormElement object that owns this <input>, or null if this input is not owned by any form.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/form
    """
    formAction: str
    """
    The formAction property of the HTMLInputElement interface is the URL of the program that is executed on the server when the form that owns this control is submitted. It reflects the value of the <input>'s formaction attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/formAction
    """
    formEnctype: str
    """
    The formEnctype property of the HTMLInputElement interface is the MIME type of the content sent to the server when the <input> with the formEnctype is the method of form submission. It reflects the value of the <input>'s formenctype attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/formEnctype
    """
    # enum
    formMethod: str
    """
    The formMethod property of the HTMLInputElement interface is the HTTP method used to submit the <form> if the <input> element is the control that submits the form. It reflects the value of the <input>'s formmethod attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/formMethod
    """
    formNoValidate: bool
    """
    The formNoValidate property of the HTMLInputElement interface is a boolean value indicating if the <form> will bypass constraint validation when submitted via the <input>. It reflects the <input> element's formnovalidate attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/formNoValidate
    """
    formTarget: str
    """
    The formTarget property of the HTMLInputElement interface is the tab, window, or iframe where the response of the submitted <form> is to be displayed. It reflects the value of the <input> element's formtarget attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/formTarget
    """
    height: float
    """
    The height property of the HTMLInputElement interface specifies the height of a control. It reflects the <input> element's height attribute.

    https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/height
    """
    intermediate: bool
    """
    The indeterminate property of the HTMLInputElement interface returns a boolean value that indicates whether the checkbox is in the indeterminate state. For example, a "select all/deselect all" checkbox may be in the indeterminate state when some but not all of its sub-controls are checked. The indeterminate state can only be set via JavaScript and is only relevant to checkbox controls.

    https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate
    """
    labels: Final[NodeList]
    """
    The HTMLInputElement.labels read-only property returns a NodeList of the <label> elements associated with the <input> element, if the element is not hidden. If the element has the type hidden, the property returns null.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels
    """
    list: Final[HTMLDataListElement]
    """
    The list read-only property of the HTMLInputElement interface returns the HTMLDataListElement pointed to by the list attribute of the element, or null if the list attribute is not defined or the list attribute's value is not associated with any <datalist> in the same tree.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/list
    """
    max: str
    """
    The max property of the HTMLInputElement interface reflects the <input> element's max attribute, which generally defines the maximum valid value for a numeric or date-time input. If the attribute is not explicitly set, the max property is an empty string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/max
    """
    maxLenght: float
    """
    The maxLength property of the HTMLInputElement interface indicates the maximum number of characters (in UTF-16 code units) allowed to be entered for the value of the <input> element, and the maximum number of characters allowed for the value to be valid. It reflects the element's maxlength attribute. -1 means there is no limit on the length of the value.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/maxLength
    """
    min: str
    """
    The min property of the HTMLInputElement interface reflects the <input> element's min attribute, which generally defines the minimum valid value for a numeric or date-time input. If the attribute is not explicitly set, the min property is an empty string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/min
    """
    minLength: float
    """
    The minLength property of the HTMLInputElement interface indicates the minimum number of characters (in UTF-16 code units) required for the value of the <input> element to be valid. It reflects the element's minlength attribute. -1 means there is no minimum length requirement.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/minLength
    """
    multiple: bool
    """
    The HTMLInputElement.multiple property indicates if an input can have more than one value. Firefox currently only supports multiple for <input type="file">.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/multiple
    """
    name: str
    """
    The name property of the HTMLInputElement interface indicates the name of the <input> element. It reflects the element's name attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/name
    """

    pattern: str
    """
    The pattern property of the HTMLInputElement interface represents a regular expression a non-null <input> value should match. It reflects the <input> element's pattern attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/pattern
    """
    placeholder: str
    """
    The placeholder property of the HTMLInputElement interface represents a hint to the user of what can be entered in the control. It reflects the <input> element's placeholder attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/placeholder
    """
    # enum
    popoverTargetAction: str
    """
    The popoverTargetAction property of the HTMLInputElement interface gets and sets the action to be performed ("hide", "show", or "toggle") on a popover element being controlled by an <input> element of type="button".

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/popoverTargetAction
    """
    popoverTargetElement: Element
    """
    The popoverTargetElement property of the HTMLInputElement interface gets and sets the popover element to control via an <input> element of type="button".

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/popoverTargetElement
    """
    readOnly: bool
    """
    The readOnly property of the HTMLInputElement interface indicates that the user cannot modify the value of the <input>. It reflects the <input> element's readonly boolean attribute; returning true if the attribute is present and false when omitted.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/readOnly
    """
    required: bool
    """
    The required property of the HTMLInputElement interface specifies that the user must fill in a value before submitting a form. It reflects the <input> element's required attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/required
    """
    selectionDirection: str
    """
    The selectionDirection property of the HTMLInputElement interface is a string that indicates the direction in which the user is selecting the text.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionDirection
    """
    selectionEnd: float
    """
    The selectionEnd property of the HTMLInputElement interface is a number that represents the end index of the selected text. When there is no selection, this returns the offset of the character immediately following the current text input cursor position.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionEnd
    """
    selectionStart: float
    """
    The selectionStart property of the HTMLInputElement interface is a number that represents the beginning index of the selected text. When nothing is selected, then returns the position of the text input cursor (caret) inside of the <input> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionStart
    """
    size:float
    """
    The size property of the HTMLInputElement interface defines the number of visible characters displayed. It reflects the <input> element's size attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/size
    """
    src: str
    """
    The src property of the HTMLInputElement interface specifies the source of an image to display as the graphical submit button. It reflects the <input> element's src attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/src
    """
    step: float
    """
    The step property of the HTMLInputElement interface indicates the step by which numeric or date-time <input> elements can change. It reflects the element's step attribute. Valid values include the string "any" or a string containing a positive floating point number. If the attribute is not explicitly set, the step property is an empty string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/step
    """
    type: str
    """
    The type property of the HTMLInputElement interface indicates the kind of data allowed in the <input> element, for example a number, a date, or an email. Browsers will select the appropriate widget and behavior to help users to enter a valid value.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/type
    """
    validateMessage: str
    """
    The validationMessage read-only property of the HTMLInputElement interface returns a string representing a localized message that describes the validation constraints that the <input> control does not satisfy (if any).

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/validationMessage
    """
    validity: Final[ValidityState]
    """
    The validity read-only property of the HTMLInputElement interface returns a ValidityState object that represents the validity states this element is in.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/validity
    """
    value: str
    """
    The value property of the HTMLInputElement interface represents the current value of the <input> element as a string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value
    """

    # valueAsDate: Date|None
    """
    The valueAsDate property of the HTMLInputElement interface represents the current value of the <input> element as a Date, or null if conversion is not possible.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate
    """
    valueAsNumber: float
    """
    The valueAsNumber property of the HTMLInputElement interface represents the current value of the <input> element as a number or NaN if converting to a numeric value is not possible.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber
    """
    webkitdirectory: bool
    """
    The HTMLInputElement.webkitdirectory is a property that reflects the webkitdirectory HTML attribute and indicates that the <input> element should let the user select directories instead of files. When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items. The selected file system entries can be obtained using the webkitEntries property.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
    """
    # webkitEntries: 
    width: float
    """
    The width property of the HTMLInputElement interface specifies the width of a control. It reflects the <input> element's width attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/width
    """
    willValidate: Final[bool]
    """
    The willValidate read-only property of the HTMLInputElement interface indicates whether the <input> element is a candidate for constraint validation. It is false if any conditions bar it from constraint validation, including:

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/willValidate
    """

    def checkValidity(self) -> bool: ...
    """
    The checkValidity() method of the HTMLInputElement interface returns a boolean value which indicates if the element meets any constraint validation rules applied to it. If false, the method also fires an invalid event on the element. Because there's no default browser behavior for checkValidity(), canceling this invalid event has no effect.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
    """
    def reportValidity(self) -> bool: ...
    """
    The reportValidity() method of the HTMLInputElement interface performs the same validity checking steps as the checkValidity() method. In addition, if the invalid event is not canceled, the browser displays the problem to the user.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
    """
    def select(self) -> Undefined: ...
    """
    The HTMLInputElement.select() method selects all the text in a <textarea> element or in an <input> element that includes a text field.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    """
    def setCustomValidity(self, string: str) -> Undefined: ...
    """
    The HTMLInputElement.setCustomValidity() method sets a custom validity message for the element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
    """
    # enum selectMode
    def setRangeText(self, replacement: str, start: float|None = None, end: float|None=None, selectMode: str|None=None, /) -> Undefined: ...
    """
    The HTMLInputElement.setRangeText() method replaces a range of text in an <input> or <textarea> element with a new string.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
    """
    # enum
    def setSelectionRange(self, selectionStart: float, selectionEnd: float, selectionDirection: str|None = None, /) -> Undefined: ...
    """
    The HTMLInputElement.setSelectionRange() method sets the start and end positions of the current text selection in an <input> or <textarea> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    """
    def showPicker(self) -> Undefined: ...
    """
    The HTMLInputElement.showPicker() method displays the browser picker for an input element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
    """
    

class HTMLButtonElement(HTMLElement):
    """
    L'interface HTMLButtonElement fournit des propriétés et méthodes (en plus de celles fournies par l'interface HTMLElement dont elle hérite) qui permettent de manipuler les éléments <button>.

    See https://developer.mozilla.org/fr/docs/Web/API/HTMLButtonElement
    """
    disabled: bool
    """
    The HTMLButtonElement.disabled property indicates whether the control is disabled, meaning that it does not accept any clicks.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/disabled
    """
    form: Final[HTMLFormElement|None]
    """
    The form read-only property of the HTMLButtonElement interface returns an HTMLFormElement object that owns this <button>, or null if this button is not owned by any form.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/form
    """
    formAction: str
    """
    The formAction property of the HTMLButtonElement interface is the URL of the program that is executed on the server when the form that owns this control is submitted. It reflects the value of the <button>'s formaction attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/formAction
    """
    formEnctype: str
    """
    The formEnctype property of the HTMLButtonElement interface is the MIME type of the content sent to the server when the form is submitted. It reflects the value of the <button>'s formenctype attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/formEnctype
    """
    # enum
    formMethod: str
    """
    The formMethod property of the HTMLButtonElement interface is the HTTP method used to submit the <form> if the <button> element is the control that submits the form. It reflects the value of the <button>'s formmethod attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/formMethod
    """
    formNoValidate: bool
    """
    The formNoValidate property of the HTMLButtonElement interface is a boolean value indicating if the <form> will bypass constraint validation when submitted via the <button>. It reflects the <button> element's formnovalidate attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/formNoValidate
    """
    formTarget: str
    """
    The formTarget property of the HTMLButtonElement interface is the tab, window, or iframe where the response of the submitted <form> is to be displayed. It reflects the value of the <button> element's formtarget attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/formTarget
    """
    labels: Final[NodeList]
    """
    The HTMLButtonElement.labels read-only property returns a NodeList of the <label> elements associated with the <button> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/labels
    """
    name: str
    """
    The name property of the HTMLButtonElement interface indicates the name of the <button> element or the empty string if the element has no name. It reflects the element's name attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/name
    """
    # enum
    popoverTargetAction: str
    """
    The popoverTargetAction property of the HTMLButtonElement interface gets and sets the action to be performed ("hide", "show", or "toggle") on a popover element being controlled by a button.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/popoverTargetAction
    """
    popoverTargetElement: Element
    """
    The popoverTargetElement property of the HTMLButtonElement interface gets and sets the popover element to control via a button.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/popoverTargetElement
    """
    type: str
    """
    The type property of the HTMLButtonElement interface is a string that indicates the behavior type of the <button> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/type
    """
    validateMessage: str
    """
    The validationMessage read-only property of the HTMLButtonElement interface returns a string representing a localized message that describes the validation constraints that the <button> control does not satisfy (if any). This is the empty string if the control is not a candidate for constraint validation (the <button>'s type is button or reset), or it satisfies its constraints.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/validationMessage
    """
    validity: Final[ValidityState]
    """
    The validity read-only property of the HTMLButtonElement interface returns a ValidityState object that represents the validity states this element is in.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/validity
    """
    value: str
    """
    The value property of the HTMLButtonElement interface represents the value of the <button> element as a string, or the empty string if no value is set. It reflects the element's value attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/value
    """
    willValidate: Final[bool]
    """
    The willValidate read-only property of the HTMLButtonElement interface indicates whether the <button> element is a candidate for constraint validation. It is false if any conditions bar it from constraint validation, including:

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/willValidate
    """

    def checkValidity(self) -> bool: ...
    """
    The checkValidity() method of the HTMLButtonElement interface returns a boolean value which indicates if the element meets any constraint validation rules applied to it. If false, the method also fires an invalid event on the element. Because there's no default browser behavior for checkValidity(), canceling this invalid event has no effect. It always returns true if the <button> element's type is "button" or "reset", because such buttons are never candidates for constraint validation.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/checkValidity
    """
    def reportValidity(self) -> bool: ...
    """
    The reportValidity() method of the HTMLButtonElement interface performs the same validity checking steps as the checkValidity() method. In addition, if the invalid event is not canceled, the browser displays the problem to the user.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/reportValidity
    """
    def setCustomValidity(self, string: str) -> Undefined: ...
    """
    The setCustomValidity() method of the HTMLButtonElement interface sets the custom validity message for the <button> element. Use the empty string to indicate that the element does not have a custom validity error.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/setCustomValidity
    """

class HTMLOptionElement(HTMLElement):
    """
    The HTMLOptionElement interface represents <option> elements and inherits all properties and methods of the HTMLElement interface.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
    """
    def __new__(cls, text: str|None=None, value: str|None=None, defaultSelected: bool|None=None, selected: bool|None=None, /) -> HTMLOptionElement: ...
    """
    The Option() constructor creates a new HTMLOptionElement.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option
    """
    defaultSelected: bool
    """
    The defaultSelected property of the HTMLOptionElement interface specifies the default selected state of the element. This property reflects the <option> element's selected attribute. The presence of the selected attribute sets the defaultSelected property to true.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/defaultSelected
    """
    disable: bool
    """
    The disabled property of the HTMLOptionElement is a boolean value that indicates whether the <option> element is unavailable to be selected. The property reflects the value of the disabled HTML attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/disabled
    """
    form: Final[HTMLFormElement|None]
    """
    The form read-only property of the HTMLOptionElement interface returns an HTMLFormElement object that owns the HTMLSelectElement associated with this <option>, or null if this option is not associated with a <select> owned by a form.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/form
    """
    index: Final[float]
    """
    The read-only index property of the HTMLOptionElement interface specifies the 0-based index of the element; that is, the position of the <option> within the list of options it belongs to, in tree-order, as an integer. If the <option> is not part of an option-list, the value is 0.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/index
    """
    label: str
    """
    The label property of the HTMLOptionElement represents the text displayed for an option in a <select> element or as part of a list of suggestions in a <datalist> element. It reflects the <option> element's label attribute.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/label
    """
    selected: bool
    """
    The selected property of the HTMLOptionElement interface specifies the current selectedness of the element; that is, whether the <option> is selected or not.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/selected
    """
    text: str
    """
    The text property of the HTMLOptionElement represents the text inside the <option> element. This property represents the same information as Node.textContent.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/text
    """
    value: str
    """
    The value property of the HTMLOptionElement interface represents the value of the <option> element as a string, or the empty string if no value is set. It reflects the element's value attribute, if present. Otherwise, it returns or sets the contents of the element, similar to the textContent property.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/value
    """

class HTMLDataListElement(HTMLElement):
    """
    The HTMLDataListElement interface provides special properties (beyond the HTMLElement object interface it also has available to it by inheritance) to manipulate <datalist> elements and their content.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataListElement
    """
    options: HTMLCollection[HTMLOptionElement]
    """
    The options read-only property of the HTMLDataListElement interface returns an HTMLCollection of HTMLOptionElement elements contained in a <datalist>. The descendant <option> elements provide predefined options for the <input> control associated with the <datalist>.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataListElement/options
    """

class HTMLLabelElement(HTMLElement):
    """
    The HTMLLabelElement interface gives access to properties specific to <label> elements. It inherits methods and properties from the base HTMLElement interface.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement
    """
    control: Final[HTMLElement|None]
    """
    The read-only HTMLLabelElement.control property returns a reference to the control (in the form of an object of type HTMLElement or one of its derivatives) with which the <label> element is associated, or null if the label isn't associated with a control.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control
    """
    form: Final[HTMLFormElement|None]
    """
    The form read-only property of the HTMLLabelElement interface returns an HTMLFormElement object that owns the control associated with this <label>, or null if this label is not associated with a control owned by a form.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/form
    """
    htmlFor: str
    """
    The HTMLLabelElement.htmlFor property reflects the value of the for content property. That means that this script-accessible property is used to set and read the value of the content property for, which is the ID of the label's associated control element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor
    """

class HTMLSlotElement(HTMLElement):
    """
    The HTMLSlotElement interface of the Shadow DOM API enables access to the name and assigned nodes of an HTML <slot> element.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement
    """
    name: str
    """
    The name property of the HTMLSlotElement interface returns or sets the slot name. A slot is a placeholder inside a web component that users can fill with their own markup.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/name
    """
    def assign(self, node1: Node, /) -> Undefined: ...
    """
    The assign() method of the HTMLSlotElement interface sets the slot's manually assigned nodes to an ordered set of slottables. The manually assigned nodes set is initially empty until nodes are assigned using assign().

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assign
    """
    # assignedElements   
    # assignedNodes 

class HTMLBodyElement(HTMLElement):
    """
    The HTMLBodyElement interface provides special properties (beyond those inherited from the regular HTMLElement interface) for manipulating <body> elements.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement
    """
    pass

class HTMLHeadElement(HTMLElement):
    """
    The HTMLHeadElement interface contains the descriptive information, or metadata, for a document. This object inherits all of the properties and methods described in the HTMLElement interface.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement
    """
    pass

class HTMLScriptElement:
    """
    HTML <script> elements expose the HTMLScriptElement interface, which provides special properties and methods for manipulating the behavior and execution of <script> elements (beyond the inherited HTMLElement interface).

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
    """
    # async ? -> reserved keyword
    crossOrigin: Final[str]
    """
    The crossOrigin property of the HTMLScriptElement interface reflects the Cross-Origin Resource Sharing settings for the script element. For classic scripts from other origins, this controls if full error information will be exposed. For module scripts, it controls the script itself and any script it imports. See CORS settings attributes for details.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/crossOrigin
    """
    defer: Final[bool]
    """
    The defer property of the HTMLScriptElement interface is a boolean value that controls how the script should be executed. For classic scripts, if the defer property is set to true, the external script will be executed after the document has been parsed, but before firing DOMContentLoaded event. For module scripts, the defer property has no effect.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/defer
    """
    fetchPriority: Final[str]
    """
    The fetchPriority property of the HTMLScriptElement interface represents a hint to the browser indicating how it should prioritize fetching an external script relative to other external scripts. It reflects the fetchpriority attribute of the <script> element.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/fetchPriority
    """
    integrity: Final[str]
    """
    The integrity property of the HTMLScriptElement interface is a string that contains inline metadata that a browser can use to verify that a fetched resource has been delivered without unexpected manipulation.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/integrity
    """
    noModule: Final[bool]
    """
    The noModule property of the HTMLScriptElement interface is a boolean value that indicates whether the script should be executed in browsers that support ES modules. Practically, this can be used to serve fallback scripts to older browsers that do not support JavaScript modules.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/noModule
    """
    referrerPolicy: Final[str]
    """
    The referrerPolicy property of the HTMLScriptElement interface reflects the HTML referrerpolicy of the <script> element, which defines how the referrer is set when fetching the script and any scripts it imports.
    
    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/referrerPolicy
    """
    src: Final[str]
    """
    The src property of the HTMLScriptElement interface is a string representing the URL of an external script; this can be used as an alternative to embedding a script directly within a document.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/src
    """
    text: Final[str]
    """
    The text property of the HTMLScriptElement interface is a string that reflects the text content inside the <script> element. It acts the same way as the Node.textContent property.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/text
    """
    type: Final[str]
    """
    The type property of the HTMLScriptElement interface is a string that reflects the type of the script.

    See https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/type
    """
    # static support

class DOMStringList:
    """
    The DOMStringList interface is a legacy type returned by some APIs and represents a non-modifiable list of strings (DOMString).

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList
    """
    length: Final[float]
    """
    The read-only length property indicates the number of strings in the DOMStringList.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList/length
    """
    def contains(self, string: str, /) -> bool: ...
    """
    The contains() method returns a boolean indicating whether the given string is in the list.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList/contains
    """
    def item(self, index: float, /) -> str|None: ...
    """
    The item() method returns a string from a DOMStringList by index.

    See https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList/item
    """

class URLSearchParams:
    """
    The URLSearchParams interface defines utility methods to work with the query string of a URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    """
    # TODO: record/iterator
    def __new__(cls, options: str|FormData|None = None, /) -> URLSearchParams: ...
    """
    The URLSearchParams() constructor creates and returns a new URLSearchParams object.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
    """
    size: Final[float]
    """
    The size read-only property of the URLSearchParams interface indicates the total number of search parameter entries.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/size
    """
    def append(self, name: str, value: str, /) -> Undefined: ...
    """
    The append() method of the URLSearchParams interface appends a specified key/value pair as a new search parameter.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
    """
    def delete(self, name: str, value: str|Undefined = undefined, /) -> Undefined: ...
    """
    The delete() method of the URLSearchParams interface deletes specified parameters and their associated value(s) from the list of all search parameters.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/delete
    """
    # entries/forEach/keys/values
    def get(self, name: str) -> str|None: ...
    """
    The get() method of the URLSearchParams interface returns the first value associated to the given search parameter.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
    """
    # getAll (array)
    def has(self, name: str, value: str|Undefined = undefined, /) -> bool: ...
    """
    The has() method of the URLSearchParams interface returns a boolean value that indicates whether the specified parameter is in the search parameters.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/has
    """
    def set(self, name: str, value: str, /) -> Undefined: ...
    """
    The set() method of the URLSearchParams interface sets the value associated with a given search parameter to the given value. If there were several matching values, this method deletes the others. If the search parameter doesn't exist, this method creates it.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set
    """
    def sort(self) -> Undefined: ...
    """
    The URLSearchParams.sort() method sorts all key/value pairs contained in this object in place and returns undefined. The sort order is according to unicode code points of the keys. This method uses a stable sorting algorithm (i.e., the relative order between key/value pairs with equal keys will be preserved).

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/sort
    """
    def toString(self) -> str: ...
    """
    The toString() method of the URLSearchParams interface returns a query string suitable for use in a URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/toString
    """
    # values

class URL:
    """
    The URL interface is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL
    """
    def __new__(cls, url: str, base: str|None = None) -> URL: ...
    """
    The URL() constructor returns a newly created URL object representing the URL defined by the parameters.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
    """
    hash: Final[str]
    """
    The hash property of the URL interface is a string containing a "#" followed by the fragment identifier of the URL. If the URL does not have a fragment identifier, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/hash
    """
    host: Final[str]
    """
    The host property of the URL interface is a string containing the host, which is the hostname, and then, if the port of the URL is nonempty, a ":", followed by the port of the URL. If the URL does not have a hostname, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/host
    """
    hostname: Final[str]
    """
    The hostname property of the URL interface is a string containing either the domain name or IP address of the URL. If the URL does not have a hostname, this property contains an empty string, "". IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname
    """
    href: Final[str]
    """
    The href property of the URL interface is a string containing the whole URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/href
    """
    origin: Final[str]
    """
    The origin read-only property of the URL interface returns a string containing the Unicode serialization of the origin of the represented URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/origin
    """
    password: str
    """
    The password property of the URL interface is a string containing the password component of the URL. If the URL does not have a password, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/password
    """
    pathname: Final[str]
    """
    The pathname property of the URL interface represents a location in a hierarchical structure. It is a string constructed from a list of path segments, each of which is prefixed by a / character.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
    """
    port: Final[str]
    """
    The port property of the URL interface is a string containing the port number of the URL. If the port is the default for the protocol (80 for ws: and http:, 443 for wss: and https:, and 21 for ftp:), this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/port
    """
    protocol: Final[str]
    """
    The protocol property of the URL interface is a string containing the protocol or scheme of the URL, including the final ":".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol
    """
    search: Final[str]
    """
    The search property of the URL interface is a search string, also called a query string, that is a string containing a "?" followed by the parameters of the URL. If the URL does not have a search query, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/search
    """
    searchParams: Final[URLSearchParams]
    """
    The searchParams read-only property of the URL interface returns a URLSearchParams object allowing access to the GET decoded query arguments contained in the URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
    """
    username: Final[str]
    """
    The username property of the URL interface is a string containing the username component of the URL. If the URL does not have a username, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/username
    """

    # static
    # canParse + createObjectURL + parse + revokeObjectURL
    def toJSON(self) -> str: ...
    """
    The toJSON() method of the URL interface returns a string containing a serialized version of the URL, although in practice it seems to have the same effect as URL.toString().

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/toJSON
    """
    def toString(self) -> str: ...
    """
    The toString() method of the URL interface returns a string containing the whole URL. It is effectively a read-only version of URL.href.

    See https://developer.mozilla.org/en-US/docs/Web/API/URL/toString
    """

class Location:
    """
    The Location interface represents the location (URL) of the object it is linked to. Changes done on it are reflected on the object it relates to. Both the Document and Window interface have such a linked Location, accessible via Document.location and Window.location respectively.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location
    """
    ancestorOrigins: Final[DOMStringList]
    """
    The ancestorOrigins read-only property of the Location interface is a static DOMStringList containing, in reverse order, the origins of all ancestor browsing contexts of the document associated with the given Location object.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/ancestorOrigins
    """
    hash: Final[str]
    """
    The hash property of the Location interface is a string containing a "#" followed by the fragment identifier of the location URL. If the URL does not have a fragment identifier, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
    """
    host: Final[str]
    """
    The host property of the Location interface is a string containing the host, which is the hostname, and then, if the port of the URL is nonempty, a ":", followed by the port of the URL. If the URL does not have a hostname, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/host
    """
    hostname: Final[str]
    """
    The hostname property of the Location interface is a string containing either the domain name or IP address of the location URL. If the URL does not have a hostname, this property contains an empty string, "". IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname
    """
    href: Final[str]
    """
    The href property of the Location interface is a stringifier that returns a string containing the whole URL, and allows the href to be updated.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/href
    """
    origin: Final[str]
    """
    The origin read-only property of the Location interface returns a string containing the Unicode serialization of the origin of the location's URL.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
    """
    pathname: Final[str]
    """
    The pathname property of the Location interface is a string containing the path of the URL for the location. If there is no path, pathname will be empty: otherwise, pathname contains an initial '/' followed by the path of the URL, not including the query string or fragment.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname
    """
    port: Final[str]
    """
    The port property of the Location interface is a string containing the port number of the location's URL. If the port is the default for the protocol (80 for ws: and http:, 443 for wss: and https:, and 21 for ftp:), this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/port
    """
    protocol: Final[str]
    """
    The protocol property of the Location interface is a string containing the protocol or scheme of the location's URL, including the final ":".

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol
    """
    search: Final[str]
    """
    The search property of the Location interface is a search string, also called a query string, that is a string containing a "?" followed by the parameters of the location's URL. If the URL does not have a search query, this property contains an empty string, "".

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/search
    """

    def assign(self, url: str|URL, /) -> Undefined: ...
    """
    The assign() method of the Location interface causes the window to load and display the document at the URL specified. After the navigation occurs, the user can navigate back to the page that called Location.assign() by pressing the "back" button.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/assign
    """
    def reload(self) -> Undefined: ...
    """
    The reload() method of the Location interface reloads the current URL, like the Refresh button.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
    """
    def replace(self, url: str|URL, /) -> Undefined: ...
    """
    The replace() method of the Location interface replaces the current resource with the one at the provided URL. The difference from the assign() method is that after using replace() the current page will not be saved in session History, meaning the user won't be able to use the back button to navigate to it. Not to be confused with the String method String.prototype.replace().

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
    """
    def toString(self) -> Undefined: ...
    """
    The toString() stringifier method of the Location interface returns a string containing the whole URL. It is a read-only version of Location.href.

    See https://developer.mozilla.org/en-US/docs/Web/API/Location/toString
    """

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
    def createElementNS(self, namespaceURI: str, qualifiedName: str, /) -> Element: ...
    # createExpression
    # createNodeIterator
    # createProcessingInstruction
    # createRange
    def createTextNode(self, data: str, /) -> Node: ...
    # createTreeWalker
    def elementFromPoint(self, x: float, y: float, /) -> Element: ...
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
    def importNode[T: Node](self, externalNode: T, deep: bool = False, /) -> T: ...
    def open(self) -> Undefined: ...
    def prepend(self, param1: Node, /) -> Undefined: ...
    def querySelector(self, selectors: str, /) -> Element|None: ...
    def querySelectorAll(self, selectors: str, /) -> NodeList: ...
    def replaceChildren(self, param1: Node, /) -> Undefined: ...
    # TODO: options
    async def requestStorageAccess(self) -> Undefined: ...
    def writeln(self, line: str, /) -> Undefined: ...

document: Document