CodeInfo(
1 ── %1  = Base.sub_int(n, 1)::Int64
│    %2  = Base.sle_int(0, %1)::Bool
└───       goto #3 if not %2
2 ──       goto #4
3 ──       goto #4
4 ┄─ %6  = φ (#2 => %1, #3 => -1)::Int64
└───       goto #5
5 ──       goto #6
6 ── %9  = Base.slt_int(%6, 0)::Bool
└───       goto #8 if not %9
7 ──       goto #9
8 ──       goto #9
9 ┄─ %13 = φ (#7 => true, #8 => false)::Bool
│    %14 = φ (#8 => 0)::Int64
│    %15 = Base.not_int(%13)::Bool
└───       goto #15 if not %15
10 ┄ %17 = φ (#9 => %14, #14 => %30)::Int64
│    %18 = φ (#9 => $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(1.5, 2.5))), #14 => %24)::Main.FD_SANDBOX_11903655265704122728.Point
│    %19 = Base.getfield(%18, :x)::Float64
│    %20 = Base.add_float(%19, 2.25)::Float64
│    %21 = Base.getfield(%18, :y)::Float64
│    %22 = Base.add_float(%21, 4.75)::Float64
│    %23 = %new(Main.FD_SANDBOX_11903655265704122728.Point, %20, %22)::Main.FD_SANDBOX_11903655265704122728.Point
│    %24 = invoke Main.FD_SANDBOX_11903655265704122728.:/ₚ(%23::Main.FD_SANDBOX_11903655265704122728.Point, $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(2.25, 4.75)))::Main.FD_SANDBOX_11903655265704122728.Point)::Main.FD_SANDBOX_11903655265704122728.Point
│    %25 = (%17 === %6)::Bool
└───       goto #12 if not %25
11 ─       goto #13
12 ─ %28 = Base.add_int(%17, 1)::Int64
└───       goto #13
13 ┄ %30 = φ (#12 => %28)::Int64
│    %31 = φ (#11 => true, #12 => false)::Bool
│    %32 = Base.not_int(%31)::Bool
└───       goto #15 if not %32
14 ─       goto #10
15 ┄ %35 = φ (#13 => %24, #9 => $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(1.5, 2.5))))::Main.FD_SANDBOX_11903655265704122728.Point
│    %36 = Base.getfield(%35, :x)::Float64
│    %37 = Base.getfield(%35, :y)::Float64
│    %38 = Core.tuple(%36, %37)::Tuple{Float64, Float64}
└───       return %38
) => Tuple{Float64, Float64}