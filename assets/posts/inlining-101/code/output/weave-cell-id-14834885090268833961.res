CodeInfo(
1 ── %1  = Base.sle_int(1, n)::Bool
└───       goto #3 if not %1
2 ──       goto #4
3 ──       goto #4
4 ┄─ %5  = φ (#2 => _2, #3 => 0)::Int64
└───       goto #5
5 ──       goto #6
6 ── %8  = Base.slt_int(%5, 1)::Bool
└───       goto #8 if not %8
7 ──       Base.nothing::Nothing
└───       goto #9
8 ──       goto #9
9 ┄─ %13 = φ (#7 => true, #8 => false)::Bool
│    %14 = φ (#8 => 1)::Int64
│    %15 = Base.not_int(%13)::Bool
└───       goto #15 if not %15
10 ┄ %17 = φ (#9 => %14, #14 => %30)::Int64
│    %18 = φ (#9 => 1.5, #14 => %22)::Float64
│    %19 = φ (#9 => 2.5, #14 => %23)::Float64
│    %20 = Base.add_float(%18, 2.25)::Float64
│    %21 = Base.add_float(%19, 4.75)::Float64
│    %22 = Base.add_float(%20, 2.25)::Float64
│    %23 = Base.add_float(%21, 4.75)::Float64
│    %24 = (%17 === %5)::Bool
└───       goto #12 if not %24
11 ─       Base.nothing::Nothing
└───       goto #13
12 ─ %28 = Base.add_int(%17, 1)::Int64
└───       goto #13
13 ┄ %30 = φ (#12 => %28)::Int64
│    %31 = φ (#11 => true, #12 => false)::Bool
│    %32 = Base.not_int(%31)::Bool
└───       goto #15 if not %32
14 ─       goto #10
15 ┄ %35 = φ (#13 => %22, #9 => 1.5)::Float64
│    %36 = φ (#13 => %23, #9 => 2.5)::Float64
│    %37 = Core.tuple(%35, %36)::Tuple{Float64, Float64}
└───       return %37
) => Tuple{Float64, Float64}