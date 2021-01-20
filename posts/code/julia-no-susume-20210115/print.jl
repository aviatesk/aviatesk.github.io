function foo(n)
    a, ret = 0, 0
    for i in 1:n
        a += i
        for j in 1:a
            a += j
        end
        ret += a
    end

    return ret
end

foo(parse(Int, first(ARGS)))
