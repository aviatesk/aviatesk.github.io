CodeInfo(
1 ─       Core.NewvarNode(:(r))::Any
│         (x = 1)::Core.Const(1)
│         (y = 2)::Core.Const(2)
│         (z = 3)::Core.Const(3)
└──       goto #6
2 ─       (r = y::Core.Const(2) + z::Core.Const(3))::Core.Const(5)
│   %7  = (x ≤ z::Core.Const(3))::Bool
└──       goto #4 if not %7
3 ─       goto #5
4 ─       (r = z::Core.Const(3) + y::Core.Const(2))::Core.Const(5)
5 ┄       (x = x + 1)::Int64
6 ┄ %12 = (x < 10)::Bool
└──       goto #8 if not %12
7 ─       goto #2
8 ─ %15 = Core.tuple(x, y::Core.Const(2), z::Core.Const(3), r::Core.Const(5))::Core.PartialStruct(NTuple{4, Int64}, Any[Int64, Core.Const(2), Core.Const(3), Core.Const(5)])
└──       return %15
) => NTuple{4, Int64}