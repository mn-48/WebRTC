import pytest

@pytest.yield_fixture()
def setup():
    
    abc()
    yield
    xyz()
    
    
def abc():
    print("call me before")
    
def xyz():
    print("after call me")
    
    
def testMethod1(setup):
    print("function 1")
    
def testMethod2(setup):
    print("func 2")
    
# def testMethod2(setup):
#     print("function 2")