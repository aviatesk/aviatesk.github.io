# This file was generated, do not modify it. # hide
struct Point
    x::Float64
    y::Float64
end
a::Point +ₚ b::Point = Point(a.x+b.x, a.y+b.y)
a::Point /ₚ b::Point = begin
    # error pass
    if false
        @label diverror
        error("/ₚ: division error detected !")
    end
    # do some error checks
    iszero(a.y) && @goto diverror
    iszero(b.y) && @goto diverror
    # do the main computation
    Point(a.x/a.y, b.x/b.y)
end

function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for i in 0:(n-1)
        a = (a +ₚ b) /ₚ b
    end
    return a.x, a.y
end