# This file was generated, do not modify it. # hide
using MacroTools

macro prog(blk)
    Instr[Instr(x) for x in filter(!islnn, blk.args)]::Program
end

function Instr(x)
    if @capture(x, lhs_ = rhs_)               # => Assign
        Assign(Instr(lhs), Instr(rhs))
    elseif @capture(x, @goto label_)          # => Goto
        Goto(label)
    elseif @capture(x, cond_ && @goto label_) # => GotoIf
        GotoIf(label, Instr(cond))
    elseif @capture(x, f_(args__))            # => Call
        Call(Instr(f), Instr.(args))
    elseif isa(x, Symbol)                     # => Sym
        Sym(x)
    elseif isa(x, Int)                        # => Num
        Num(x)
    else
        error("invalid expression: $(x)")
    end
end

islnn(@nospecialize(_)) = false
islnn(::LineNumberNode) = true