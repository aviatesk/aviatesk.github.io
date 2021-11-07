# This file was generated, do not modify it. # hide
function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for i in 0:(n-1)
        a = @inline (a +ₚ b) /ₚ b
    end
    return a.x, a.y
end