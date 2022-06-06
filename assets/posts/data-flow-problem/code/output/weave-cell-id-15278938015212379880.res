quote
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction0#312")))
        var"#57#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction1#313")))
        var"#54#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction2#314")))
        var"#55#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction3#315")))
        $(Expr(:symbolicgoto, Symbol("#49###instruction8#320")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#50###instruction4#316")))
        var"#56#r" = var"#54#y" + var"#55#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#51###instruction5#317")))
        var"#57#x" ≤ var"#55#z" && $(Expr(:symbolicgoto, Symbol("#52###instruction7#319")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#53###instruction6#318")))
        var"#56#r" = var"#55#z" + var"#54#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#52###instruction7#319")))
        var"#57#x" = var"#57#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#49###instruction8#320")))
        var"#57#x" < 10 && $(Expr(:symbolicgoto, Symbol("#50###instruction4#316")))
    end
end