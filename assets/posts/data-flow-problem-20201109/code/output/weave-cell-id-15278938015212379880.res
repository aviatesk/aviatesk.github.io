quote
    begin
        $(Expr(:symboliclabel, Symbol("#27###instruction0#245")))
        var"#39#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#28###instruction1#246")))
        var"#36#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#29###instruction2#247")))
        var"#37#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#30###instruction3#248")))
        $(Expr(:symbolicgoto, Symbol("#31###instruction8#253")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#32###instruction4#249")))
        var"#38#r" = var"#36#y" + var"#37#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#33###instruction5#250")))
        var"#39#x" ≤ var"#37#z" && $(Expr(:symbolicgoto, Symbol("#34###instruction7#252")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#35###instruction6#251")))
        var"#38#r" = var"#37#z" + var"#36#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#34###instruction7#252")))
        var"#39#x" = var"#39#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#31###instruction8#253")))
        var"#39#x" < 10 && $(Expr(:symbolicgoto, Symbol("#32###instruction4#249")))
    end
end