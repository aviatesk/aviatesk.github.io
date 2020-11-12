# This file was generated, do not modify it. # hide
# NOTE: in this problem, we make sure that states will always move to _lower_ position in lattice, so
# - initialize states with `⊤`
# - we use `⊓` (meet) operator to update states,
# - and the condition we use to check whether or not the statement makes a change is `new ≠ prev`
function max_fixed_point(prog::Program, a₀::AbstractState, eval)
    n = length(prog)
    init = AbstractState( v => ⊤ for v in keys(a₀) )
    s = [ a₀; [ init for i = 2:n ] ]
    W = BitSet(0:n-1)

    while !isempty(W)
        pc = first(W)
        while pc ≠ n
            delete!(W, pc)
            I = prog[pc+1]
            new = s[pc+1]
            if isa(I, Assign)
                # for an assignment, outgoing value is different from incoming
                new = copy(new)
                new[I.lhs.name] = eval(I.rhs, new)
            end

            if isa(I, Goto)
                pc´ = I.label
            else
                pc´ = pc+1
                if isa(I, GotoIf)
                    l = I.label
                    if new ≠ s[l+1]
                        push!(W, l)
                        s[l+1] = new ⊓ s[l+1]
                    end
                end
            end
            if pc´≤n-1 && new ≠ s[pc´+1]
                s[pc´+1] = new ⊓ s[pc´+1]
                pc = pc´
            else
                pc = n
            end
        end
    end

    return s
end

max_fixed_point(prog0, a₀, abstract_eval) # The solution contains the `:r => Const(5)`, which is not found in the program