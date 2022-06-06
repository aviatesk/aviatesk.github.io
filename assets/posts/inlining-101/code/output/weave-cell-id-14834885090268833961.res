CodeInfo(
1 ── %1  = Base.sle_int(1, n)::Bool
└───       goto #3 if not %1
2 ──       goto #4
3 ──       goto #4
4 ┄─ %5  = φ (#2 => n, #3 => 0)::Int64
└───       goto #5
5 ──       goto #6
6 ── %8  = Base.slt_int(%5, 1)::Bool
└───       goto #8 if not %8
7 ──       goto #9
8 ──       goto #9
9 ┄─ %12 = φ (#7 => true, #8 => false)::Bool
│    %13 = φ (#8 => 1)::Int64
│    %14 = Base.not_int(%12)::Bool
└───       goto #15 if not %14
10 ┄ %16 = φ (#9 => %13, #14 => %28)::Int64
│    %17 = φ (#9 => 1.5, #14 => %21)::Float64
│    %18 = φ (#9 => 2.5, #14 => %22)::Float64
│    %19 = Base.add_float(%17, 2.25)::Float64
│    %20 = Base.add_float(%18, 4.75)::Float64
│    %21 = Base.add_float(%19, 2.25)::Float64
│    %22 = Base.add_float(%20, 4.75)::Float64
│    %23 = (%16 === %5)::Bool
└───       goto #12 if not %23
11 ─       goto #13
12 ─ %26 = Base.add_int(%16, 1)::Int64
└───       goto #13
13 ┄ %28 = φ (#12 => %26)::Int64
│    %29 = φ (#11 => true, #12 => false)::Bool
│    %30 = Base.not_int(%29)::Bool
└───       goto #15 if not %30
14 ─       goto #10
15 ┄ %33 = φ (#13 => %21, #9 => 1.5)::Float64
│    %34 = φ (#13 => %22, #9 => 2.5)::Float64
│    %35 = Core.tuple(%33, %34)::Tuple{Float64, Float64}
└───       return %35
) => Tuple{Float64, Float64}