quote
    begin
        $(Expr(:symboliclabel, Symbol("#40###instruction0#253")))
        var"#52#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#41###instruction1#254")))
        var"#49#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#42###instruction2#255")))
        var"#50#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#43###instruction3#256")))
        $(Expr(:symbolicgoto, Symbol("#44###instruction8#261")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction4#257")))
        var"#51#r" = var"#49#y" + var"#50#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction5#258")))
        var"#52#x" ≤ var"#50#z" && $(Expr(:symbolicgoto, Symbol("#47###instruction7#260")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction6#259")))
        var"#51#r" = var"#50#z" + var"#49#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction7#260")))
        var"#52#x" = var"#52#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#44###instruction8#261")))
        var"#52#x" < 10 && $(Expr(:symbolicgoto, Symbol("#45###instruction4#257")))
    end
end