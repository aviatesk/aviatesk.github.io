macro showln(ex)
    ln = __source__.line
    quote
        print('L', $ln, ": ")
        @show $ex
    end |> esc
end

function foo(n)
    a, ret = 0, 0
    for i in 1:n
        @showln a += i
        for j in 1:a
            @showln a += j
        end
        @showln ret += a
    end

    return ret
end

foo(parse(Int, first(ARGS)))
