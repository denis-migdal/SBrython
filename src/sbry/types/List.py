from JS import eval

# not good for inline fct/klasses...

# do I *NEED* this ? (mix decl & impl...)
# call & opt dependant code...
# + if op in python : may have circular issues...

@inline("Array")
class List:
    def append(self, elem, /):
        return eval(f"{self}.push(${elem})")

@inline
def print(arg):
    eval(f"console.log(${arg})")