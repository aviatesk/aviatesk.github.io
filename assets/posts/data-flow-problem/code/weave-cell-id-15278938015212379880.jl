# This file was generated, do not modify it. # hide
# generate valid Julia code from the "`Instr` syntax"
macro prog′(blk)
    prog′ = Expr(:block)
    bns = [gensym(Symbol(:instruction, i-1)) for i in 1:length(blk.args)] # pre-generate labels for all instructions

    for (i,x) in enumerate(filter(!islnn, blk.args))
        x = MacroTools.postwalk(x) do x
            return if @capture(x, @goto label_)
                Expr(:symbolicgoto, bns[label+1]) # fix `@goto i` into valid goto syntax
            else
                x
            end
        end

        push!(prog′.args, Expr(:block, Expr(:symboliclabel, bns[i]), x)) # label this statement
    end

    return prog′
end

@macroexpand @prog′ begin
    x = 1             # I₀
    y = 2             # I₁
    z = 3             # I₂
    @goto 8           # I₃
    r = y + z         # I₄
    x ≤ z && @goto 7  # I₅
    r = z + y         # I₆
    x = x + 1         # I₇
    x < 10 && @goto 4 # I₈
end