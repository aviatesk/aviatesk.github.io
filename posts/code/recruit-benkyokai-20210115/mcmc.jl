using Random: default_rng

function pi_mcmc(n)
    t = 0
    rng = default_rng()
    for i in 1:n
        x, y = rand(rng), rand(rng)
        if x^2 + y^2 ≤ 1
            t += 1
        end
    end
    return 4t/n
end

println(pi_mcmc(parse(Int, first(ARGS))))
