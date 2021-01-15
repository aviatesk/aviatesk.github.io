import sys

def foo(n):
    a, ret = 0, 0
    for i in range(1,n+1):
        a += i
        print(f"L6: a = {a}")
        for j in range(1,a+1):
            a += j
            print(f"L9: a = {a}")

        ret += a
        print(f"L12: ret = {ret}")

    return ret


foo(int(sys.argv[1]))
