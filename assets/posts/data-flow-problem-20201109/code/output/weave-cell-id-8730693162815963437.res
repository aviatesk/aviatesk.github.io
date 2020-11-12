CodeInfo(
1 ─       Core.NewvarNode(:(r))::Any
│         (x = 1)::Core.Compiler.Const(1, false)
│         (y = 2)::Core.Compiler.Const(2, false)
│         (z = 3)::Core.Compiler.Const(3, false)
└──       goto #6
2 ─       (r = y::Core.Compiler.Const(2, false) + z::Core.Compiler.Const(3, false))::Core.Compiler.Const(5, false)
│   %7  = (x ≤ z::Core.Compiler.Const(3, false))::Bool
└──       goto #4 if not %7
3 ─       goto #5
4 ─       (r = z::Core.Compiler.Const(3, false) + y::Core.Compiler.Const(2, false))::Core.Compiler.Const(5, false)
5 ┄       (x = x + 1)::Int64
6 ┄ %12 = (x < 10)::Bool
└──       goto #8 if not %12
7 ─       goto #2
8 ─ %15 = Core.tuple(x, y::Core.Compiler.Const(2, false), z::Core.Compiler.Const(3, false), r::Core.Compiler.Const(5, false))::Core.Compiler.PartialStruct(NTuple{4,Int64}, Any[Int64, Core.Compiler.Const(2, false), Core.Compiler.Const(3, false), Core.Compiler.Const(5, false)])
└──       return %15
) => NTuple{4,Int64}