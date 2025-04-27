class Element:
    def remove(self):
        pass

# https://developer.mozilla.org/en-US/docs/Web/API/Document/
class Document:
    def querySelector[T: Element](self, selector: str, /) -> T|None:
        pass

document: Document