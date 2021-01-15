# %% setup
using DataFrames
using StatsBase

nrow = 100
ncol = 400_000
df = DataFrame(sample([-1,0,1], (nrow, ncol)))

# %% code
function simplemode(x)
    minval, maxval = extrema(x)
    counts = zeros(Int, maxval-minval+1)
    for a in x
        counts[a-minval+1] += 1
    end
    return argmax(counts) + minval - 1
end

using BenchmarkTools
@btime simplemode.(eachcol(df));
