# classes
#class A:

    # cstr => __new__ then __init__.
    # __new__ => createObject(proto) + __new__ ?

    # attr = "2" # __new__ (auto create...)

    # def __init__(self):
    #     write("init")
    # def foo(self, a):
    #    write("foo")
    #    write(self.attr)

# dict
dict = {"e": 4, "f": 5}
dict["e"] = 6 
write(dict)

# list/tuple
list  = [1,2]
tuple = (1,2)
write(list)
write(tuple)

list[0] = 3
write(  list[0] )
write( tuple[0] )

# []
# [] = 
# .append() => rewrite => push()

# f-string
write( f"{2}y" )
write( f"yy" )

# import
import browser
from browser import window as w

# try/except
try:
    raise Exception()
except Exception as e:
    write("caught")

def fee():
    raise Exception()

try:
    fee()
except Exception as e:
    write("caught2")

# fct dummy
def fii():
    return

# for range
for i in range(2):
    write(i)

for i in range(1, 2):
    write(i)

for i in range(0, 4, 2):
    write(i)

##fct
def foo(a:int,b:int) -> int:
    write(a+b)
foo(1,2)

def faa(a:int) -> int:
    return a

write(faa(4))

#TODO: with 2 args...

# while
h = True
while h:
    write("LOOP")
    h = False

# if / elif / else
if False:
    pass
else:
    write("ELSE")
    write("ELSE")

if False:
    pass
else:
    write("ELSE")


if False:
    pass
elif False:
    write("False")
    write("False")
elif True:
    write("True")
else:
    write("END")

#if pass
if True:
    pass

# str
write("")
write("ok")

# float
write(1.0)
write(1.2)

# Comments
if True:
    write(0)
0==0
write(
    0
)
#None (implicit)
g: None = write(0)
write(   0  == g)
write(False == g)
write(   1  == g)
write(True  == g)

#None (explicit)

f = None
write(None)
write(None  == None)
write(   0  == None)
write(False == None)
write(   1  == None)
write(True  == None)

# decl
a = 2
write(a)
b = False
write(b)
d       = write(3)
e: None = write(3)

# operator.== (literals)
write(True == True)
write(False == False)
write(False == True)
write(False == 0)
write(True == 0)
write(False == 1)
write(True == 1)
write(False == 2)
write(True == 2)
write(0 == 0)
write(0 == 1)

# if boolean:
if False:
    write(0)
if True:
    write(True)
    write(False)
c = True
if c:
    write(3)