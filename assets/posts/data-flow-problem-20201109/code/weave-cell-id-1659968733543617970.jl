# This file was generated, do not modify it. # hide
abstract_eval(x::Num, s::AbstractState) = Const(x.val)

abstract_eval(x::Sym, s::AbstractState) = get(s, x.name, ⊥)

function abstract_eval(x::Call, s::AbstractState)
    f = getfield(@__MODULE__, x.head.name)

    argvals = Int[]
    for arg in x.args
        arg = abstract_eval(arg, s)
        arg === ⊥ && return ⊥ # bail out if any of call arguments is non-constant
        push!(argvals, unwrap_val(arg))
    end

    return Const(f(argvals...))
end

# unwrap our lattice representation into actual Julia value
unwrap_val(x::Num)   = x.val
unwrap_val(x::Const) = x.val