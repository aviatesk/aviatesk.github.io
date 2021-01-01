quote
    begin
        $(Expr(:symboliclabel, Symbol("#69###instruction0#245")))
        var"#81#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#70###instruction1#246")))
        var"#78#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#71###instruction2#247")))
        var"#79#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#72###instruction3#248")))
        $(Expr(:symbolicgoto, Symbol("#73###instruction8#253")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#74###instruction4#249")))
        var"#80#r" = var"#78#y" + var"#79#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#75###instruction5#250")))
        var"#81#x" ≤ var"#79#z" && $(Expr(:symbolicgoto, Symbol("#76###instruction7#252")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#77###instruction6#251")))
        var"#80#r" = var"#79#z" + var"#78#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#76###instruction7#252")))
        var"#81#x" = var"#81#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#73###instruction8#253")))
        var"#81#x" < 10 && $(Expr(:symbolicgoto, Symbol("#74###instruction4#249")))
    end
end