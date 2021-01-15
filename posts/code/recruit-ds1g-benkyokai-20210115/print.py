import sys

def foo(n):
    a, ret = 0, 0
    for i in range(1,n+1):
        a += i
        for j in range(1,a+1):
            a += j

        ret += a

    return ret


foo(int(sys.argv[1]))
