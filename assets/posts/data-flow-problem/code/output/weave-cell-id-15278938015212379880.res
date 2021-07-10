quote
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction0#280")))
        var"#57#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction1#281")))
        var"#54#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction2#282")))
        var"#55#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction3#283")))
        $(Expr(:symbolicgoto, Symbol("#49###instruction8#288")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction4#284")))
        var"#56#r" = var"#54#y" + var"#55#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction5#285")))
        var"#57#x" ≤ var"#55#z" && $(Expr(:symbolicgoto, Symbol("#52###instruction7#287")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction6#286")))
        var"#56#r" = var"#55#z" + var"#54#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction7#287")))
        var"#57#x" = var"#57#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction8#288")))
        var"#57#x" < 10 && $(Expr(:symbolicgoto, Symbol("#50###instruction4#284")))
    end
end