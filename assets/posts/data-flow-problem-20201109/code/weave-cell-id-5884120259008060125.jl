# This file was generated, do not modify it. # hide
prog0 = [Assign(Sym(:x), Num(1)),                              # I₀
         Assign(Sym(:y), Num(2)),                              # I₁
         Assign(Sym(:z), Num(3)),                              # I₂
         Goto(8),                                              # I₃
         Assign(Sym(:r), Call(Sym(:(+)), [Sym(:y), Sym(:z)])), # I₄
         GotoIf(7, Call(Sym(:(≤)), [Sym(:x), Sym(:z)])),       # I₅
         Assign(Sym(:r), Call(Sym(:(+)), [Sym(:z), Sym(:y)])), # I₆
         Assign(Sym(:x), Call(Sym(:(+)), [Sym(:x), Num(1)])),  # I₇
         GotoIf(4, Call(Sym(:(<)), [Sym(:x), Num(10)])),       # I₈
         ]::Program