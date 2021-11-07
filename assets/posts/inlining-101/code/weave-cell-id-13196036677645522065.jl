# This file was generated, do not modify it. # hide
@inline a::Point /ₚ b::Point = begin
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