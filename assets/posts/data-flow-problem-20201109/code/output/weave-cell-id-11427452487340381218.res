quote
    begin
        $(Expr(:symboliclabel, Symbol("#40###instruction0#265")))
        var"#52#x" = 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#41###instruction1#266")))
        var"#49#y" = 2
    end
    begin
        $(Expr(:symboliclabel, Symbol("#42###instruction2#267")))
        var"#50#z" = 3
    end
    begin
        $(Expr(:symboliclabel, Symbol("#43###instruction3#268")))
        $(Expr(:symbolicgoto, Symbol("#44###instruction8#273")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#45###instruction4#269")))
        var"#51#r" = var"#49#y" + var"#50#z"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#46###instruction5#270")))
        var"#52#x" ≤ var"#50#z" && $(Expr(:symbolicgoto, Symbol("#47###instruction7#272")))
    end
    begin
        $(Expr(:symboliclabel, Symbol("#48###instruction6#271")))
        var"#51#r" = var"#50#z" + var"#49#y"
    end
    begin
        $(Expr(:symboliclabel, Symbol("#47###instruction7#272")))
        var"#52#x" = var"#52#x" + 1
    end
    begin
        $(Expr(:symboliclabel, Symbol("#44###instruction8#273")))
        var"#52#x" < 10 && $(Expr(:symbolicgoto, Symbol("#45###instruction4#269")))
    end
end