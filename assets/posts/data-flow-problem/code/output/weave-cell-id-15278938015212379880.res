quote
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction0#223")))
        var"#57#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction1#224")))
        var"#54#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction2#225")))
        var"#55#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction3#226")))
        $(Expr(:symbolicgoto, Symbol("#49###instruction8#231")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction4#227")))
        var"#56#r" = var"#54#y" + var"#55#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction5#228")))
        var"#57#x" ≤ var"#55#z" && $(Expr(:symbolicgoto, Symbol("#52###instruction7#230")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction6#229")))
        var"#56#r" = var"#55#z" + var"#54#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction7#230")))
        var"#57#x" = var"#57#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction8#231")))
        var"#57#x" < 10 && $(Expr(:symbolicgoto, Symbol("#50###instruction4#227")))
    end
end