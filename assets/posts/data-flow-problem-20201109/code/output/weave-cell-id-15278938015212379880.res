quote
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction0#271")))
        var"#59#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction1#272")))
        var"#56#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction2#273")))
        var"#57#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction3#274")))
        $(Expr(:symbolicgoto, Symbol("#51###instruction8#279")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction4#275")))
        var"#58#r" = var"#56#y" + var"#57#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction5#276")))
        var"#59#x" ≤ var"#57#z" && $(Expr(:symbolicgoto, Symbol("#54###instruction7#278")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#55###instruction6#277")))
        var"#58#r" = var"#57#z" + var"#56#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#54###instruction7#278")))
        var"#59#x" = var"#59#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction8#279")))
        var"#59#x" < 10 && $(Expr(:symbolicgoto, Symbol("#52###instruction4#275")))
    end
end