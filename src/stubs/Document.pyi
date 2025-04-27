class Undefined:
    pass

undefined: Undefined

class Element:
    def remove(self) -> Undefined: ...

# https://developer.mozilla.org/en-US/docs/Web/API/Document/
class Document:
    def querySelector[T: Element](self, selector: str, /) -> T|None: ...

document: Document