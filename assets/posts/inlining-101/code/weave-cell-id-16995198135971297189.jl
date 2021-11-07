# This file was generated, do not modify it. # hide
struct Point
    x::Float64
    y::Float64
end
a::Point +ₚ b::Point = Point(a.x+b.x, a.y+b.y)

function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for _ in 1:n
        a = (a +ₚ b) +ₚ b
    end
    return a.x, a.y
end