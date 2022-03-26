quote
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction0#292")))
        var"#57#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction1#293")))
        var"#54#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction2#294")))
        var"#55#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction3#295")))
        $(Expr(:symbolicgoto, Symbol("#49###instruction8#300")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction4#296")))
        var"#56#r" = var"#54#y" + var"#55#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction5#297")))
        var"#57#x" ≤ var"#55#z" && $(Expr(:symbolicgoto, Symbol("#52###instruction7#299")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction6#298")))
        var"#56#r" = var"#55#z" + var"#54#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction7#299")))
        var"#57#x" = var"#57#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction8#300")))
        var"#57#x" < 10 && $(Expr(:symbolicgoto, Symbol("#50###instruction4#296")))
    end
end