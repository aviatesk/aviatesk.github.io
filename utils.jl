using Franklin
import Franklin: # to help IDEs
    pagevar,
    locvar,
    globvar
using Dates
using Base.Meta: isexpr

# header
# ======

function hfun_header()
    is_simple_page() && return hfun_simpleheader()
    return hfun_blogheader()
end

is_simple_page(path = locvar(:fd_rpath)) = !is_blogpost(path)
is_blogpost(path = locvar(:fd_rpath)) = "posts" in splitpath(path) && path ≠ "posts/index.md"

hfun_simpleheader() = navigation_bar(hfun_siteinfo(), hfun_siteterminal())

function navigation_bar(divs...; class = nothing)
    return isnothing(class) ?
           string("<navigation-bar>", divs..., "</navigation-bar>") :
           string("<navigation-bar class=\"$(class)\">", divs..., "</navigation-bar>")
end

hfun_siteinfo() = """<div class="navigation-info" id="site-info"><a href="/">Shuhei Kadowaki's homepage</a></div>"""

function hfun_siteterminal()
    return """
    <navigation-hover>
        <img src="/assets/terminal.svg" id="terminal-icon" />
        <ul id="site-cd">
            <li><a style="text-decoration: none" href="/">cd ~</a></li>
            <li><a style="text-decoration: none" href="/posts">cd posts</a></li>
            <li><a style="text-decoration: none" href="https://github.com/aviatesk">cd <i class="fab fa-github"></i></a></li>
            <li><a style="text-decoration: none" href="https://twitter.com/kdwkshh">cd <i class="fab fa-twitter"></i></a></li>
            <li><a style="text-decoration: none" href="javascript:history.back()">cd ..</a></li>
        </ul>
    </navigation-hover>
    """
end

function hfun_blogheader()
    siteinfo = navigation_bar(hfun_siteinfo())
    navbar = navigation_bar(hfun_pageinfo(), hfun_siteterminal(); class = "navigation-sticky")
    return string(siteinfo, navbar)
end

function hfun_pageinfo()
    title = locvar(:title)

    minlevel = locvar(:mintoclevel)
    toc = Franklin.hfun_toc(string.([minlevel, minlevel]))

    i = 0
    r = r"<a(.+?)>(.+?)</a>"
    toc = replace(toc, r => function (s)
        m = match(r, s)
        return string("<a", m[1], "> $(i+=1). ", m[2], "</a>")
    end)

    return """
    <navigation-hover>
        <a class="navigation-info" id="page-info">\$ $(title)</a>
        $(toc)
    </navigation-hover>
    """
end

function hfun_blogscripts()
    is_blogpost() || return ""
    return """
    <script src="/libs/collapsible.js"></script>
    <script src="/libs/lodash.js"></script>
    <script src="/libs/onscroll.js"></script>
    """
end

# blogs
# =====

macro extract(ex)
    @assert isexpr(ex, :call)

    method = first(ex.args)
    varname = last(ex.args)
    return :(let
        var = $(esc(ex))
        @assert !isnothing(var) string("$($(method)) `$($(varname))` isn't defined: ",
                                       $(method), '(', join(repr.([$(map(esc, ex.args[2:end])...)]), ", "), ')', # call args
                                       )
        var
    end)
end

"""
    {{ blogposts [post_dir = "posts"] }}

Plug in the list of blog posts contained in the `/post_dir/` folder.
"""
function hfun_blogposts(post_dir = "posts")
    list = readdir(post_dir)
    filter!(endswith(".md"), list)
    filter!(≠("index.md"), list)

    function by(p)
        path  = splitext(p)[1]
        url = "/$(post_dir)/$(path)/"
        surl = strip(url, '/')
        return Date(@extract(pagevar(surl, :published_date)), dateformat"yyyy-mm-dd")
    end
    sort!(list; by, rev = true)

    io = IOBuffer()
    write(io, """<ul class="blogposts">""")
    for (i, post) in enumerate(list)
        path  = splitext(post)[1]
        url = "/$(post_dir)/$(path)/"
        surl = strip(url, '/')
        title = pagevar(surl, :title)
        date = Date(@extract(pagevar(surl, :published_date)), dateformat"yyyy-mm-dd")
        write(io, """
        <li>
            <span><i>$(date)</i></span> <a href="$(url)">$(title)</a>
        </li>
        """)
    end
    write(io, "</ul>")
    return String(take!(io))
end

"""
    {{ blogtitle }}

Plug in the page title as H1 header
"""
function hfun_blogtitle()
    title = @extract(locvar(:title))

    date = Date(@extract(locvar(:published_date)), dateformat"yyyy-mm-dd")
    date = Dates.format(date, dateformat"dd U yyyy")

    # TODO: tags
    # tags = @extract(locvar(:tags))

    return """
    <div class="blog-info">
        <blogtitle>$(title)</blogtitle>
        <div class="published-date">
            $(date)
        </div>
    </div>
    """
end

"""
    \\weave{
    ```julia
    # some Julia code ...
    ```
    }

A simple command to render/evaluate code in Weave.jl-like way.
"""
function lx_weave(com, _)
    content = Franklin.content(com.braces[1])
    lines = split(content, '\n')

    i = findfirst(startswith("```julia"), lines)
    @assert !isnothing(i) "couldn't find Weave.jl header"
    lines = lines[i:end]

    header = first(lines)
    id = string("weave-cell-id-", hash(join(lines))) # give same id for same code
    lines[1] = string(header, ':', id)

    push!(lines, "\\show{$(id)}")

    return join(lines, '\n')
end

"""
    \\relasset{...}

Within this block, the relative paths will be fixed for Franklin.jl file organization
"""
function lx_relasset(com, _)
    content = Franklin.content(com.braces[1])

    r = r"(\!\[.*\])\((.+)\)"
    replace(content, r => function (s)
        m = match(r, s)
        return string(m[1], '(', normpath("..", m[2]), ')')
    end)
end

function lx_table(com, _)
    content = Franklin.content(com.braces[1])
    html = Franklin.convert_md(content; isinternal = true)
    return "~~~ <table><tbody>$(html)</table></tbody> ~~~"
end

function lx_tr(com, _)
    content = Franklin.content(com.braces[1])
    html = Franklin.convert_md(content; isinternal = true)
    return "~~~ <tr>$(html)</tr> ~~~"
end

function lx_th(com, _)
    content = Franklin.content(com.braces[1])
    html = Franklin.convert_md(content; isinternal = true)
    return "~~~ <th>$(html)</th> ~~~"
end

function lx_td(com, _)
    content = Franklin.content(com.braces[1])
    html = Franklin.convert_md(content; isinternal = true)
    return "~~~ <td>$(html)</th> ~~~"
end

"""
    \\table{ \\tr{ \\th{...} } \\tr{ \\td{...} } }

utilities for creating a table with full featured markdown/html syntaxes within its cells
"""
:(lx_table), :(lx_tr), :(lx_th), :(lx_td)
