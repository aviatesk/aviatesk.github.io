quote
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction0#257")))
        var"#59#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction1#258")))
        var"#56#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction2#259")))
        var"#57#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction3#260")))
        $(Expr(:symbolicgoto, Symbol("#51###instruction8#265")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction4#261")))
        var"#58#r" = var"#56#y" + var"#57#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction5#262")))
        var"#59#x" ≤ var"#57#z" && $(Expr(:symbolicgoto, Symbol("#54###instruction7#264")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#55###instruction6#263")))
        var"#58#r" = var"#57#z" + var"#56#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#54###instruction7#264")))
        var"#59#x" = var"#59#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction8#265")))
        var"#59#x" < 10 && $(Expr(:symbolicgoto, Symbol("#52###instruction4#261")))
    end
end