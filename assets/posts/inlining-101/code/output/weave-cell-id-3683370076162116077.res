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
7 ──       Base.nothing::Nothing
└───       goto #9
8 ──       goto #9
9 ┄─ %14 = φ (#7 => true, #8 => false)::Bool
│    %15 = φ (#8 => 0)::Int64
│    %16 = Base.not_int(%14)::Bool
└───       goto #15 if not %16
10 ┄ %18 = φ (#9 => %15, #14 => %32)::Int64
│    %19 = φ (#9 => $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(1.5, 2.5))), #14 => %25)::Main.FD_SANDBOX_11903655265704122728.Point
│    %20 = Base.getfield(%19, :x)::Float64
│    %21 = Base.add_float(%20, 2.25)::Float64
│    %22 = Base.getfield(%19, :y)::Float64
│    %23 = Base.add_float(%22, 4.75)::Float64
│    %24 = %new(Main.FD_SANDBOX_11903655265704122728.Point, %21, %23)::Main.FD_SANDBOX_11903655265704122728.Point
│    %25 = invoke Main.FD_SANDBOX_11903655265704122728.:/ₚ(%24::Main.FD_SANDBOX_11903655265704122728.Point, $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(2.25, 4.75)))::Main.FD_SANDBOX_11903655265704122728.Point)::Main.FD_SANDBOX_11903655265704122728.Point
│    %26 = (%18 === %6)::Bool
└───       goto #12 if not %26
11 ─       Base.nothing::Nothing
└───       goto #13
12 ─ %30 = Base.add_int(%18, 1)::Int64
└───       goto #13
13 ┄ %32 = φ (#12 => %30)::Int64
│    %33 = φ (#11 => true, #12 => false)::Bool
│    %34 = Base.not_int(%33)::Bool
└───       goto #15 if not %34
14 ─       goto #10
15 ┄ %37 = φ (#13 => %25, #9 => $(QuoteNode(Main.FD_SANDBOX_11903655265704122728.Point(1.5, 2.5))))::Main.FD_SANDBOX_11903655265704122728.Point
│    %38 = Base.getfield(%37, :x)::Float64
│    %39 = Base.getfield(%37, :y)::Float64
│    %40 = Core.tuple(%38, %39)::Tuple{Float64, Float64}
└───       return %40
) => Tuple{Float64, Float64}