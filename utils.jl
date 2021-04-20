using Franklin
import Franklin: # to help IDEs
    pagevar,
    locvar,
    globvar
using Dates
using Base.Meta: isexpr

# common
# ======

const SITE_TITLE = globvar(:website_title)
const SITE_DESC  = globvar(:website_descr)
const SITE_URL   = globvar(:website_url)
const TWITTER_ID = "@kdwkshh"

macro get(ex)
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
macro get(ex, default)
    @assert isexpr(ex, :call)
    method = first(ex.args)
    varname = last(ex.args)
    return :(let
        var = $(esc(ex))
        isnothing(var) ? $(esc(default)) : var
    end)
end

const DATE_FORMAT = dateformat"yyyy-mm-dd"
get_pubdate(url) = Date(@get(pagevar(url, :pubdate), today_s()), DATE_FORMAT)
get_pubdate()    = Date(@get(locvar(:pubdate), today_s()), DATE_FORMAT)
today_s() = Dates.format(today(), DATE_FORMAT)

is_simple_page(path = locvar(:fd_rpath)) = !is_blogpost(path)
is_blogpost(path = locvar(:fd_rpath)) = "posts" in splitpath(path) && path ≠ "posts/index.md"

# header
# ======

function hfun_header()
    is_simple_page() && return hfun_simpleheader()
    return hfun_blogheader()
end

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

function hfun_ogp()
    url            = joinpath(SITE_URL, strip(get_url(locvar(:fd_rpath)), '/'))
    title          = @get(locvar(:title), SITE_TITLE)
    desc           = @get(locvar(:description), SITE_DESC)
    img            = @get(locvar(:image), joinpath(SITE_URL, "assets/what_about_the_dead_fish.jpeg"))
    type           = is_simple_page() ? "website" : "article"
    published_time = get_pubdate()

    return """
    <meta property="og:url" content="$(url)" />
    <meta property="og:title" content="$(title)" />
    <meta property="og:image" content="$(img)" />
    <meta property="og:type" content="$(type)" />
    <meta property="og:description" content="$(desc)" />
    <meta property="og:published_time" content="$(published_time)" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="$(TWITTER_ID)" />
    <meta name="twitter:creator" content="$(TWITTER_ID)" />
    """
end

# blogs
# =====

"""
    {{ pageindex }}

Plug in the list of pages under the current folder.
"""
function hfun_pageindex()
    page_dir = dirname(locvar(:fd_rpath))
    list = joinpath.(readdir(page_dir; join = true), "index.md")
    filter!(ispath, list)
    sort!(list; by = get_pubdate, rev = true)

    io = IOBuffer()
    write(io, """<ul class="pageindex">""")
    for (i, url) in enumerate(list)
        title = pagevar(url, :title)
        date = get_pubdate(url)
        href = basename(dirname(url))
        write(io, """
        <li>
            <span><i>$date</i></span> <a href="$href">$title</a>
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
    title = @get(locvar(:title))

    date = get_pubdate()
    date = Dates.format(date, dateformat"dd U yyyy")

    # TODO: tags
    # tags = @get(locvar(:tags))

    return """
    <div class="blog-info">
        <blogtitle> $(title) <a type="application/rss+xml" href="https://aviatesk.github.io/feed.xml" style="float: right"> <i class="fas fa-rss"></i> </a> </blogtitle>
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
    lines = split(lxcontent(com), '\n')

    i = findfirst(startswith("```julia"), lines)
    @assert !isnothing(i) "couldn't find Weave.jl header"
    lines = lines[i:end]

    header = first(lines)
    id = string("weave-cell-id-", hash(join(lines))) # give same id for same code
    lines[1] = string(header, ':', id)

    push!(lines, "\\show{$(id)}")

    return join(lines, '\n')
end

lx_table(com, _) = "~~~ <table><tbody>$(lxhtml(com))</table></tbody> ~~~"
lx_tr(com, _)    = "~~~ <tr>$(lxhtml(com))</tr> ~~~"
lx_th(com, _)    = "~~~ <th>$(lxhtml(com))</th> ~~~"
lx_td(com, _)    = "~~~ <td>$(lxhtml(com))</th> ~~~"

"""
    \\table{ \\tr{ \\th{...} } \\tr{ \\td{...} } }

utilities for creating a table with full featured markdown/html syntaxes within its cells
"""
:(lx_table), :(lx_tr), :(lx_th), :(lx_td)

lxcontent(com) = Franklin.content(first(com.braces))
lxhtml(com)    = Franklin.convert_md(lxcontent(com); isinternal = true)
