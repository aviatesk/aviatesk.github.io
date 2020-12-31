quote
    begin
        $(Expr(:symboliclabel, Symbol("#65###instruction0#245")))
        var"#77#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#66###instruction1#246")))
        var"#74#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#67###instruction2#247")))
        var"#75#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#68###instruction3#248")))
        $(Expr(:symbolicgoto, Symbol("#69###instruction8#253")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#70###instruction4#249")))
        var"#76#r" = var"#74#y" + var"#75#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#71###instruction5#250")))
        var"#77#x" ≤ var"#75#z" && $(Expr(:symbolicgoto, Symbol("#72###instruction7#252")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#73###instruction6#251")))
        var"#76#r" = var"#75#z" + var"#74#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#72###instruction7#252")))
        var"#77#x" = var"#77#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#69###instruction8#253")))
        var"#77#x" < 10 && $(Expr(:symbolicgoto, Symbol("#70###instruction4#249")))
    end
end