"""Javascript objects used in this script are in jsobj_tests.js."""

# issue 744: Javascript objects should allow integer attribute names.
from browser import window
import javascript
from tester import assert_raises


a = window.Uint8ClampedArray.new(10)

for i in range(10):
    a[i] = i
    assert a[i] == i

assert window.test_jsobj.null_value is javascript.NULL
assert window.test_jsobj.undef_value is javascript.UNDEFINED

# Test dict initialization from native js objects
# JS objects are in script jsobj_tests.js
pyobj = window.test_jsobj.to_dict()
print(pyobj)
assert pyobj["null_value"] is javascript.NULL
assert pyobj["undef_value"] is javascript.UNDEFINED
assert pyobj["test_num"] == 10
assert len(list(pyobj.items())) == 3
assert len(list(pyobj.values())) == 3
assert len(list(pyobj.keys())) == 3

# iteration on arbitrary JS objects produces object keys
for key in window.test_jsobj:
    print(key)

# Test setting jsobject dict value to None
window.test_jsobj['python_none'] = None
assert window.test_jsobj['python_none'] is None

# Test setting jsobject dict value to javascript.NULL
window.test_jsobj['js_null'] = javascript.NULL
assert window.test_null('js_null')

# Test setdefault
assert pyobj.setdefault('default') is None

# issue 1003
jsobj = window.JSON.parse('{"foo": "bar"}')

for k, v in dict(jsobj).items():
    print(k, v) # Prints foo bar as would be expected

test = {}
test.update(dict(jsobj))
assert test == {"foo": "bar"}

test = {}
test.update(jsobj.to_dict())
assert test == {"foo": "bar"}

test = {}
for k, v in dict(jsobj).items():
    test[k] = v
assert test == {"foo": "bar"}

# issue 1017
t = window.a_table
assert len(t.headers) == 1

t["headers"].append({})
assert len(t["headers"]) == 2
t["headers"].pop()
assert len(t.headers) == 1
t["headers"][0]["value"] = 9
assert t.headers[0].value == 9

# issue 1023
def f(x):
    x()

try:
    f(window.initClass())
    raise Exception("should have raised TypeError")
except TypeError:
    pass

x = window.initJSWithEq()
assert 'x' == x
assert x == 'x'

# test parsing json with a null value
import javascript
obj = javascript.JSON.parse('{"foo": null}')
assert obj == {"foo": None}

# issue 1352
x = window.eval()
assert x == javascript.UNDEFINED
assert type(x) == javascript.UndefinedType

# issue #1376
setattr(window, 'foo', [])

window.foo.append('one')
window.foo.append('two')
assert window.foo == ['one', 'two']

setattr(window, 'bar', [])
bar = window.bar
bar.append('one')
bar = window.bar
bar.append('two')
assert bar == ['one', 'two']

# issue 1388
t = []
t.extend(window.root.children)
assert t[0].x == 2

# issue 1418
class Rectangle(window.Rectangle):
  pass

r = Rectangle(3, 4)
assert r.height == 3
assert r.width == 4
assert r.surface() == 12

class Square(window.Square):
  pass

s = Square(5)
assert s.x == 5
assert s.surface() == 25

# issue 1484
assert abs(window.get_float()) == window.get_float()

# issue 1490
class JSON_DUMMY_IMPL:
    dumps = window.JSON.stringify
    loads = window.JSON.parse

dummy_json = JSON_DUMMY_IMPL

s = '{"x":1,"y":"ab"}'

obj = dummy_json.loads(s)
assert obj["x"] == 1
assert dummy_json.dumps(obj) == s

# issue 1417
b1 = window.BigInt('23456')
b2 = window.BigInt('78901')
assert b1 + b2 == window.BigInt(str(23456 + 78901))
assert b1 - b2 == window.BigInt(str(23456 - 78901))
assert b1 * b2 == window.BigInt(str(23456 * 78901))
assert b1 % b2 == window.BigInt(str(23456 % 78901))

b3 = window.BigInt('2')
assert b1 ** b3 == window.BigInt(str(23456 ** 2))

for num in [1, 4.7]:
    try:
        b1 + num # in Javascript, can't add BigInt and number
        raise Exception('should have raised TypeError')
    except TypeError:
        pass


# inheriting a Javascript class
class Square2(window.Rectangle):

    def __init__(self, length):
        super().__init__(length, length)
        self.name = 'Square2'

    def f(self):
        return self.surface()

assert Square2(10).name == "Square2"
assert Square2(25).surface() == 625
assert Square2(20).f() == 400

sq = Square2(6)
assert list(sq.getSides()) == [6, 6, 6, 6]
assert sq.area == 36
sq.area = 25
assert sq.width == 5

assert sq.nb_sides() == 'sides'

# issue 1696
window.jsFunction1696('asdf'.isupper)

# issue 1918
assert isinstance(window.test_jsobj, javascript.JSObject)

# import Javascript modules
javascript.import_js('js_test.js')
assert js_test.x == 1

# issue 1996
js = __BRYTHON__.python_to_js("x = 1 + 2")
ns = window.eval(js)
assert ns.x == 3

# method .sort of JS lists return the sorted list
assert window.js_list.sort() == ['a', 'b', 'c']

# issue 2059
jslist = window.make_js_list() # [0.5, 0.5]
jslist[0] = 1.7
assert jslist == [1.7, 0.5]
window.test(jslist, 0, 1.7)

jslist.append(3.5)
assert jslist == [1.7, 0.5, 3.5]
assert jslist[2] == 3.5
window.test(jslist, 2, 3.5)

jslist.sort()
assert jslist == [0.5, 1.7, 3.5]

assert jslist + ['a'] == [0.5, 1.7, 3.5, 'a']
assert jslist * 2 == [0.5, 1.7, 3.5, 0.5, 1.7, 3.5]

del jslist[2]
assert jslist == [0.5, 1.7]

assert not jslist > [1, 2]
assert jslist < [1, 2]

jslist += ['a']
assert jslist == [0.5, 1.7, 'a']

assert 0.5 in jslist
assert 'a' in jslist

assert [item for item in jslist] == jslist

jslist.reverse()
assert jslist == ['a', 1.7, 0.5]

jslist[0] += 'b'
assert jslist == ['ab', 1.7, 0.5]
window.test(jslist, 0, 'ab')

# issue 2105
window.set_array_proto() # sets Array.prototype.test
assert jslist.test() == 'Array test'

window.del_array_proto() # deletes Array.prototype.test
assert_raises(AttributeError, getattr, jslist, 'test')

# issue 2165
def send(*args, **kwargs):
    # checks that kwargs is a dictionary
    window.call(args, kwargs)

send(1, 2, a="b", c="d")

# issue 2172
window.demo_array.test2172()
window.demo_array.demo_array2.test2172()

# issue in Google group
# https://groups.google.com/g/brython/c/y3eAGcl1hfY
try:
    window.js_error()
except Exception as exc:
    assert exc.args[0] == 'Error: catching JS error'

# issue 2248
assert type(javascript.NULL) is javascript.NullType
assert type(javascript.UNDEFINED) is javascript.UndefinedType

value = getattr(window, 'opener', None)
assert value is javascript.NULL
assert type(value) is javascript.NullType
assert isinstance(javascript.NULL, javascript.NullType)

assert bool(javascript.NULL) is False
assert bool(javascript.UNDEFINED) is False

assert window.func_returns_null() is javascript.NULL
assert window.func_returns_undefined() is javascript.UNDEFINED
assert window.func_returns_nothing() is javascript.UNDEFINED

assert window.obj_with_getters._null is javascript.NULL
assert window.obj_with_getters._undefined is javascript.UNDEFINED

def py_returns_undefined():
    return javascript.UNDEFINED

window.py_returns_undefined = py_returns_undefined

assert py_returns_undefined() is javascript.UNDEFINED

window.test_py_returns_undefined()

# issue 2249
assert window.Date == window.Date
assert window.x2249 == window.x2249
assert window.x2249 != window.x2249.me
assert window.x2249.me == window.x2249.me

# issue 2251
async def py_callback(a):
    print(a, 'toto')

window.async_func_with_python_callback(py_callback, "a")

# NULL and UNDEFINED
assert javascript.NULL == javascript.NULL
assert javascript.NULL is javascript.NULL
assert bool(javascript.NULL) is False
assert javascript.UNDEFINED is javascript.UNDEFINED
assert javascript.UNDEFINED == javascript.UNDEFINED
assert bool(javascript.UNDEFINED) is False

# issue 2261
a = window.array_with_subitem
assert a is window.array_with_subitem
a0 = window.array_with_subitem[0]
assert a0 is window.array_with_subitem[0]

window.set_subitem_value()

assert (a[0][0], a0[0], a[1]) == (True, True, True)
assert window.array_with_subitem[0] is a0


# issue 2262
window.xv = 5.6
window.init_array()
a = window.array
assert str(a) == '[[...], 1, 5.6]'

# using Javascript non-integers numbers
window.py_module_name = __name__

def py_func(x):
    if x is javascript.NULL:
        return 'x is null'

window.py_func = py_func

window.test_py_func_from_javascript()

def pyfunc_receives_js_number(num):
    assert str(num) == "3.14"
    assert type(num) is javascript.JSObject

# force insertion in sys.modules[__name__] to make the Python function
# available in JS script by
# __BRYTHON__.imported[__name__].pyfunc_receives_js_number
import sys
sys.modules[__name__].pyfunc_receives_js_number = pyfunc_receives_js_number
window.test_pyfunc_receives_js_number()

# consistency between function call and direct reference
t1 = window.get_array_from_func_call()
t2 = window.array_by_reference

for x1, x2 in zip(t1, t2):
  assert x1 == x2
  assert type(x1) is type(x2)

# issue 2321
from browser import aio
from tester import async_tester

y = window.js_returns_float()
print(y, type(y))

async def call_js_async():
    x = await window.js_async_returns_float()
    async_tester.assertEqual(x, 3.5)
    async_tester.assertIs(type(x), float, 'type should be float')

    try:
        await window.js_async_raises_error()
        input('should have raised error')
    except JavascriptError as exc:
        async_tester.assertEqual(str(exc),
            'ReferenceError: blabla is not defined')

aio.run(call_js_async())

# issue 2347
pydict = window.nestedJSObj.to_dict()
assert pydict == {'e': {'a': 1, 'b': 2}, 'f': {'c': 3, 'd': 4}}

# issue 2371
import browser
a = '{"num":1, "val":2.3}'
o = browser.window.JSON.parse(a)
assert o.num == 1
assert o.val == 2.3
t = o.to_dict()   # prints {'num': 1, 'val':  {}}
assert t["num"] == 1
assert t["val"] == 2.3

# issue 2394
class X( window.Map ):
    def __init__(self):
        t.append('__init__')
    def foo(self):
        t.append('foo')

t = []

y = X.__new__(X)
y.__init__()
assert t == ['__init__']
y.foo()
assert t == ['__init__', 'foo']

# issue 2250
x = {}
m = window.Map.new()
m.set(x, 42)
assert m.get(x) == 42

# issue 2420
jsObj2420 = window.jsObj2420
jsObj2420.item = {'sub': [], 'a': 8}
jsObj2420.item['sub'] = [3, 4]
window.testValue2420()
window.testDeletedAttr2420(False)
del jsObj2420.item['a']
window.testDeletedAttr2420(True)

# issue 2445
def is_bomb(point):
    bombs = [(1, 2), (3, 4)]
    assert point in bombs

window.setTimeout(is_bomb, 100, (1, 2))

# issue 2474
window['my_dict2474'] = {}
window['my_dict2474']['my_array_d'] = [7, 8]

def func_py2474():
    d = window['my_dict2474']['my_array_d']
    d.append(77)

func_py2474()
window.func_js2474()
func_py2474()
window.func_js2474()
window.test_2474()

window['dict_2474'] = {}

window['dict_2474']['arr3'] = [{ "C": "String C" }]
window['dict_2474']['arr4'] = []
window['dict_2474']['arr4'].append({ "D": "String D" })

window.func_js2474_2()

window['dictA'] = {}
window['dictA']['arrA'] = [1.25]
assert type(window['dictA']['arrA'][0]) is float
window['dictA']['arrA'].append('A')

window['dictB'] = { "arrB": [2.35] }
window['dictB']['arrB'].append('B')

assert window['dictA']['arrA'] == [1.25, "A"]
assert window['dictB']['arrB'] == [2.35, "B"]
window.func_js2474_3()

print("all tests ok...")