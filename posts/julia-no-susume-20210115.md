@def title = "Juilaのススメ"
@def published_date = "2021-01-15"
@def description = "Juliaを布教する"

\newcommand{\inputcode}[2]{\input{#1}{/posts/code/julia-no-susume-20210115/!#2}}

{{ blogtitle }}

---

\toc

# Why Julia ?

## Juliaとは

- MIT発の科学技術計算を得意とする比較的新しいプログラミング言語 [^1]
- Pythonのように簡潔に書けて、Rubyのように動的で、Lispのように自由自在で、Cのように早く動作する

\tip{勢い付いてます！}{
- 去年1年間だけでこれまで９年分のdownloads数を獲得
~~~
<table class="table table-hover">
  <tbody>
    <tr>
      <td> </td>
      <td><strong>Total Cumulative as of Jan 1, 2020</strong> </td>
      <td><strong>Total Cumulative as of Jan 1, 2021</strong> </td>
      <td><strong>Change</strong> </td>
    </tr>
    <tr>
      <td><strong>Number of Julia Downloads (JuliaLang + Docker + JuliaPro)</strong> </td>
      <td> <strong style="color: red">12,950,630</strong> </td>
      <td> <strong style="color: blue">24,205,141</strong> </td>
      <td> +87% </td>
    </tr>
    <tr>
      <td><strong>Number of Julia Packages</strong> </td>
      <td> 2,787 </td>
      <td> 4,809 </td>
      <td> +73% </td>
    </tr>
    <tr>
      <td><strong>GitHub stars (Julia language repo + registered packages)</strong> </td>
      <td> 99,830 </td>
      <td> 161,774 </td>
      <td> +62% </td>
    </tr>
    <tr>
      <td><strong>YouTube views (Julia language channel)</strong> </td>
      <td> 1,562,223 </td>
      <td> 3,320,915 </td>
      <td> +113% </td>
    </tr>
    <tr>
      <td><strong>Published citations of Julia: A Fast Dynamic Language for Technical Computing (2012) + Julia: A Fresh
          Approach to Numerical Computing (2017)</strong> </td>
      <td> 1,680 </td>
      <td> 2,531 </td>
      <td> +51% </td>
    </tr>
    <tr>
      <td><strong>Discourse posts</strong> </td>
      <td> 137,399 </td>
      <td> 211,888 </td>
      <td> +54% </td>
    </tr>
    <tr>
      <td><strong>TIOBE Index Rank</strong> </td>
      <td> #47 </td>
      <td> #23 </td>
      <td> +24 </td>
    </tr>
  </tbody>
</table>
~~~
@@caption [Newsletter January 2021 – Julia Computing](https://juliacomputing.com/blog/2021/01/newsletter-january/) @@
}

\\

\tip{採用事例}{

\relasset{![users](./assets/julia-no-susume-20210115/users.png)}
@@caption [JULIA USERS AND JULIA COMPUTING CUSTOMERS](https://juliacomputing.com/) @@

- e.g. [連邦航空局の航空管制システム](https://juliacomputing.com/case-studies/lincoln-labs/)
}

## Happy Julia

今日からJuliaを使いたくなるJuliaの良さをご紹介します。

### case 1. アルゴリズム開発

- シンプルにアルゴリズムを書くだけで、Pythonより速いのはもちろん、マジでCに匹敵するパフォーマンスが出ます !

\info{case 1. MCMCアルゴリズム開発 [引用元](https://t.co/JSvmM0iEiv?amp=1)}{
- MCMC法を使って円周率を計算する
- 各言語込み入った最適化はせず、極力シンプルなコードでベンチマークをとる

\table{
  \tr{ \th{Language} \th{Code} \th{Benchmark Result} }
  \tr{ \td{C}
\td{ \input{c}{/posts/code/julia-no-susume-20210115/mcmc.c} @@caption mcmc.c @@ }
\td{
```bash
λ gcc --version
Configured with: --prefix=/Library/Developer/CommandLineTools/usr --with-gxx-include-dir=/Library/Developer/CommandLineTools/SDKs/MacOSX10.14.sdk/usr/include/c++/4.2.1
Apple LLVM version 10.0.1 (clang-1001.0.46.4)
Target: x86_64-apple-darwin18.7.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin

λ gcc -O3 -march=native mcmc.c

λ time ./a.out 1000000000
3.141591
./a.out 1000000000  10.28s user 0.06s system 98% cpu 10.478 total
```
} }

\tr{ \td{Python}
\td{ \input{python}{/posts/code/julia-no-susume-20210115/mcmc.py} @@caption mcmc.py @@
}
\td{
```bash
λ python --version
Python 3.8.3

λ time python mcmc.py 1000000000
3.141636192
python mcmc.py 1000000000  339.06s user 2.30s system 98% cpu 5:48.18 total
```
} }

\tr{ \td{Julia}
\td{ \input{julia}{/posts/code/julia-no-susume-20210115/mcmc.jl} @@caption mcmc.jl @@ }
\td{
```bash
λ julia --version
julia version 1.6.0-beta1

λ time julia mcmc.jl 1000000000
3.14165976
julia mcmc.jl 1000000000  3.44s user 0.20s system 108% cpu 3.341 total
```
} }
}

}

### case2. データフレーム処理

- numpy/pandasで`for`ループを使わないようにするためだけのベクトル計算用のAPIを探して苦しんでいませんか ?
- pandasやnumpyのAPIを見つけて計算するよりも、Juliaでやりたい処理を単純に書くほうが断然早い ！

\info{case 2. 大きなデータフレームに対する走査 ([引用元](https://ki-chi.jp/?p=1080))}{
```plaintext
40万列100行で各列について最頻値を求めたい(3値の多数決をしたい)
この場合df.mode().iloc[0]よりも早く出来る方法ありますかね…
```

\table{
  \tr{ \th{Language} \th{Code} \th{Benchmark Result} }
  \tr{ \td{Pandas}
\td{ \input{c}{/posts/code/julia-no-susume-20210115/pdmode.py} @@caption pdmode.py @@ }
\td{
```bash
λ python --version
Python 3.8.3

λ ipython pdmode.py
CPU times: user 2min 22s, sys: 1.81 s, total: 2min 24s
Wall time: 2min 26s
```
} }

  \tr{ \td{Numpy 1}
\td{ \input{julia}{/posts/code/julia-no-susume-20210115/npmode1.py} @@caption npmode1.py @@ }
\td{
```bash
λ python --version
Python 3.8.3

λ ipython npmode1.py
CPU times: user 15.2 s, sys: 202 ms, total: 15.4 s
Wall time: 15.5 s
```
} }

\tr{ \td{Numpy 2}
\td{ \input{python}{/posts/code/julia-no-susume-20210115/npmode2.py} @@caption npmode2.py @@
}
\td{
```bash
λ python --version
Python 3.8.3

λ ipython npmode2.py
384 ms ± 13 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```
} }

\tr{ \td{Julia}
\td{ \input{julia}{/posts/code/julia-no-susume-20210115/jlmode.jl} @@caption jlmode.jl @@ }
\td{
```bash
λ julia --version
julia version 1.6.0-beta1

λ julia jlmode.jl
  86.003 ms (799505 allocations: 54.92 MiB)
```
} }
}

}

<!--
### case 3. デバッグ

- Juliaには非常に強力な(Lisp-likeの)マクロが備わっているので、面倒なコードを簡潔に書くことができます
- 例えばJuliaを使えばprint debugも楽チンです

\info{case 3. print debug \label{print-debug}}{
- `foo`内での変数`a`, `ret`の状態をprint debugしたい
- 変数の値を出力するだけではなくて、その変数名と行番号も把握したい

\table{
  \tr{ \th{Language} \th{Code} \th{Result} }

  \tr{ \td{Python} \td{ \input{diff}{/posts/code/julia-no-susume-20210115/print-debug.py.diff} @@caption print-debug.py @@ } \td{
```bash
python code/julia-no-susume-20210115/print-debug.py 2
L6: a = 1
L9: a = 2
L12: ret = 2
L6: a = 4
L9: a = 5
L9: a = 7
L9: a = 10
L9: a = 14
L12: ret = 16
```
  } }

  \tr{ \td{Julia} \td{ \input{diff}{/posts/code/julia-no-susume-20210115/print-debug.jl.diff} @@caption print-debug.jl @@
  \\
  \collapsible{`@showln`は何をしている ?}{
```julia
@showln a += i
```
は
```julia
print('L', 1, ": ")
begin
    Base.println("a += i = ", Base.repr(begin
                local var"#164#value" = (a += i)
            end))
    var"#164#value"
end
```
のようなJuliaコードに「展開」されます。
Juliaではこういう「Juliaプログラム自身を書き換えるJuliaプログラム」を簡単に作ることができるのです。
}
} \td{
```bash
λ julia print.jl 3
L12: a += i = 1
L14: a += j = 2
L16: ret += a = 2
L12: a += i = 4
L14: a += j = 5
L14: a += j = 7
L14: a += j = 10
L14: a += j = 14
L16: ret += a = 16
```
  } }
}

}
-->

### case 3. package manager

- Pythonの環境構築/パッケージ管理は本当に辛いですよね
  * 終わらない `pipenv sync` ...
  * 次々と出てくるalternativeたち: virtualenv, Anaconda, poetry ...
  * 定まらないパッケージのディレクトリ構成 ...
- Juliaなら、高品質のpackage managerがJulia自身に同梱されているので、Juliaをインストールするだけでok !
  * Juliaのバージョンを合わせるだけで、決定論的に環境を再現できます
  * パッケージのフォーマットも統一されています

\info{case 3. 環境再現→ユニットテストはたったこれだけ！}{
```bash
λ julia --project=@.
               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _  |  |
  | | |_| | | | (_| |  |  Version 1.7.0-DEV.269 (2021-01-13)
 _/ |\__'_|_|_|\__'_|  |  backprop2/872db0ea7e (fork: 3 commits, 0 days)
|__/                   |
julia> ]         # package manager modeに入る
pkg> instantiate # 環境を再現
pkg> test        # テスト実行
```

\collapsible{JuliaのREPLはすごい}{

- JuliaのREPLは**非常に**強力です(少なくとも僕の知ってる言語の中ではもっとも機能が充実しています)
- package managerの他にも、デフォルトで次のような機能がついてきます
  - documentation
  - shell execution
  - REPL history
  - auto completion
  - multiline expression evaluation

```julia-repl
λ julia
               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _  |  |
  | | |_| | | | (_| |  |  Version 1.7.0-DEV.269 (2021-01-13)
 _/ |\__'_|_|_|\__'_|  |  backprop2/872db0ea7e (fork: 3 commits, 0 days)
|__/                   |
julia> ?         # help modeに入る
help?> sin       # `sin`のドキュメンテーションを表示
search: sin sinh sind sinc sinpi sincos sincosd sincospi asin using isinf asinh asind isinteger isinteractive thisind sign signed Signed signbit

  sin(x)


  Compute sine of x, where x is in radians.

  ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  sin(A::AbstractMatrix)


  Compute the matrix sine of a square matrix A.

  If A is symmetric or Hermitian, its eigendecomposition (eigen) is used to compute the sine. Otherwise, the sine is determined by calling exp.

  Examples
  ≡≡≡≡≡≡≡≡≡≡

  julia> sin(fill(1.0, (2,2)))
  2×2 Matrix{Float64}:
   0.454649  0.454649
   0.454649  0.454649

juila> ;  # enter shell mode
shell> ls # do whatever you want !
404.md                                  _assets                                 config.md
LICENSE.md                              _css                                    highlight.js
Manifest.toml                           _layout                                 index.md
Project.toml                            _libs                                   posts
README.md                               aviatesk.github.io.code-workspace       pythonic.jl
__site                                  code                                    utils.jl
```

}}

# Julia quick dive

Juliaがどのような仕組みで動いているかを、以下のトピックに沿って説明します:
1. Pythonの簡潔さ × Cのパフォーマンス: code specialization, code selection
2. Rubyのダイナミズム: JIT (実行時コンパイル)
3. Lispの柔軟性: メタプログラミング

## Pythonの簡潔さ × Cのパフォーマンス: code specialization, code selection

- 一般に、プログラマとプログラミング言語の間には次のようなトレードオフが存在します:
  - プログラマ: 型とか意識せずに極力簡潔なコードでプログラミングしたい (e.g. Python, Ruby)
  - プログラミング言語(コンパイラ): プログラムを早く走らせるために型とかプログラムに関する色んな情報が欲しい (e.g. C)
- そのため、往往にして「プロトタイプを簡単な動的言語で書いて、のちにより効率的な言語で書き直す」といういわゆる"two-language problem"が生じます
- Juliaはこの問題を、"code specialization"と"code selection"というアプローチを取ることで解決しています

### code specialization

- Juliaは関数呼び出しを単位とした最適化を行っています
- 「抽象解釈[^2]」と呼ばれる技術を用いて、
  最適化する関数呼び出しをまず仮想的に実行し、そこで得られた情報を用いて呼び出すメソッドの解決や関数呼び出しのinlingなどの最適化を行います
- 例えばmcmc.jlの`pi_mcmc`は、`pi_mcmc(parse(Int, first(ARGS)))`という呼び出しにおいて最適化が行われ、
  `pi_mcmc(n::Int)`という引数の情報を用いて最適化され、結果的にナイーブに書いたCよりも効率的なnative codeへと変換されます
  * もし`pi_mcmc(parse(BigInt, first(ARGS)))`だったら、`pi_mcmc(n::BigInt)`という引数型に対して最適化されます

\table{
  \tr{　\td{mcmc.jl} \td{\input{julia}{/posts/code/julia-no-susume-20210115/mcmc.jl}} }
  \tr{  \td{型推論後のmcmc.jl} \td{
```julia
function pi_mcmc(n::Int)::Float64
    t::Int = 0::Int
    rng = default_rng()
    for i::Int in 1:n::Int
        x::Float64, y::Float64 = rand(rng)::Float64, rand(rng)::Float64
        if (x::Float64^2::Int + y::Float64^2::Int)::Float64 ≤ 1::Int
            t::Int += 1::Int
        end
    end
    return ((4t::Int)::Int/n::Int)::Float64
end

println(pi_mcmc(parse(Int, first(ARGS)))) # <= この呼び出しからコンパイル
```
    } }
}

### code selection

- １つの関数は、複数の実装(method)を持つことができます
- ある関数の呼び出しにおいては、その呼び出しの引数型に対して**最も特殊化された、最適なメソッドが選ばれて**実行されます("method dispatch")
- 例えば、mcmc.jlの`x^2`呼び出しは、`^(::Float64, ::Int)`という引数型に最適化されたメソッドにdispatchされます

```julia
@inline function ^(x::Float64, y::Integer)
    y == -1 && return inv(x)
    y == 0 && return one(x)
    y == 1 && return x
    y == 2 && return x*x
    y == 3 && return x*x*x
    ccall("llvm.pow.f64", llvmcall, Float64, (Float64, Float64), x, Float64(y))
end
```
@@caption xref: <https://github.com/JuliaLang/julia/blob/886f89ce2eca668e54ce5bcb7364a00127760db8/base/math.jl#L937-L944> @@

- もし`x^2.0`という呼び出しであった場合は、`^(::Float64, ::Float64)`という別の引数型に最適化されたメソッドへとdispatchされます
```julia
@inline function ^(x::Float64, y::Float64)
    z = ccall("llvm.pow.f64", llvmcall, Float64, (Float64, Float64), x, y)
    if isnan(z) & !isnan(x+y)
        throw_exp_domainerror(x)
    end
    z
end
```
@@caption xref: <https://github.com/JuliaLang/julia/blob/886f89ce2eca668e54ce5bcb7364a00127760db8/base/math.jl#L921-L927> @@

\note{まとめ: Pythonの簡潔さ × Cのパフォーマンス}{
- "code specialization": 各関数呼び出しを引数の値や型を用いて最適化すること [^3]
  - => これのおかげで型注釈を付けずともJuliaプログラムは多くの場合で勝手に最適化されます
- "code selection": 同じ名前の関数呼び出しを、それぞれの引数型ごとに最も「特化した」メソッドにdispatchすること
  - => Juliaプログラマが型を意識することなくただやりたいことを書くだけで、勝手に最適なコードが選ばれ、結果的に効率的に動作します

Juliaはこの2つの機能によって、Pythonのようなシンプルなプログラムからでも、Cに匹敵する速度を出せるのです

\collapsible{numpyとの違い}{
- 実はnumpyもJuliaと似たようなアプローチによって動作しています
- numpyは特定のベクトル演算に特化したC++のルーチンをたくさん事前に用意しておいて、実行時に演算の種類やベクトルの型やshapeに応じた最適なルーチンを呼び出しています
- ただ、Juliaと比較した場合、numpyのアプローチは次のような欠点を持っています:
  - 事前に用意されたルーチンを使用しなければ速度を得られない
    - e.g. numpy配列に対して`for`ループを回すと非常に遅いので`numpy.bincount`とかを知ってないといけない (vs. Juliaなら自分で関数を書くだけ)
  - 全ての計算を無理やりベクトル演算に落とし込むので、非自然な思考が必要だったり、無駄なメモリーアロケーションが発生しやすい
}
}

## Rubyのダイナミズム: JIT (実行時コンパイル)

- 最近の静的型付け言語では、CとかJavaのように型を書くまくる必要はありません
  - e.g. Scala: methodの引数型を指定すれば、あとはコンパイラがmethod bodyの型を推論してくれる
  - e.g. Haskell: [Hindley-Milner type system](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system)に基づく型推論により、引数型すら指定しなくても良い
- ただ、Juliaとこれらの言語との大きな違いとして、型が静的に決まるかどうか、という点があります
- 上で紹介したような、Juliaの型推論/最適化は全て**実行時に起こります**(i.e. "JIT", "Just in time" compile)
- そのため、事前に型がつきにくいプログラムもストレスなく書くことができます

\info{case 4-1. MCMCアルゴリズムの繰り返し回数をJSONのconfigファイルから取得する}{
- `ntimes`に試行回数を指定し、それぞれの結果を出力する
```json
{
  "ntimes": [10000, 1000000, 100000000]
}
```
@@caption mcmc-json.config.json @@

\table{
  \tr{ \th{Language} \th{Code} }
  \tr{ \td{Scala} \td{ \input{scala}{/posts/code/julia-no-susume-20210115/mcmc-json.scala} @@caption mcmc-json.scala @@ } }
  \tr{ \td{Julia} \td{ \input{julia}{/posts/code/julia-no-susume-20210115/mcmc-json.jl} @@caption mcmc-json.jl @@ } }
}
}
\\
\info{case 4-2. `ntimes`には浮動小数点数が含まれているかもしれないとしたら?}{
- `ntimes`に繰り返し回数を指定する
```json
{
  "ntimes": [10000, 1000000.0, 100000000.0]
}
```
@@caption mcmc-json.config.json @@

- Scala(静的型付け言語)の場合、`ntimes`が整数の配列ではない場合、プログラムは動かない
- Juliaの場合、プログラムは問題なく動くし(ここまではPythonとかRubyとかも一緒)、さらに、整数型が与えられようが、浮動小数点数型が与えられようが、`pi_mcmc`の呼び出しは引数が与えられた時点で最適化が走るのでどちらの場合でも高速に動作する !
}

## Lispの柔軟性: メタプログラミング \label{metaprogramming}

- Juliaは以下のようなコード生成プロセスを辿って実行されます
- なんとJuliaプログラマは、その各段階におけるコードの変換方法自体をプログラミングする(「メタプログラミングする」)ことができます [^4]
  - 言い換えると、「Julia自身を書き換えるJulia」を書くことができる

\table{
  \tr{ \th{ステップ} \th{例 (`@show sin(1)`)} }
  \tr{
  \td{1. プログラムをパースして、マクロにより操作可能な中間表現に変換する}
  \td{
@@caption Juliaプログラム @@
```julia
julia> @show sin(1)
```
  }}
  \tr{
  \td{2. マクロを展開して、コード解析に適した中間表現に変換する}
  \td{
@@caption 中間表現 (lowered form IR) @@
```julia
julia> @macroexpand @show sin(1)
quote
    Base.println("sin(1) = ", Base.repr(begin
                #= show.jl:905 =#
                local var"#161#value" = sin(1)
            end))
    var"#161#value"
end

julia> @code_lowered sin(1)
CodeInfo(
1 ─      xf = Base.Math.float(x)
│   %2 = x === xf
└──      goto #3 if not %2
2 ─ %4 = Core.tuple(x)
│   %5 = Base.Math.MethodError(Base.Math.sin, %4)
│        Base.Math.throw(%5)
└──      goto #3
3 ┄ %8 = Base.Math.sin(xf)
└──      return %8
)
```
  }}
  \tr{
  \td{3. 型推論/最適化を行う}
  \td{
@@caption 中間表現 (typed lowered form IR) @@
```julia
julia> @code_typed optimize = false sin(1)
CodeInfo(
1 ─      (xf = Base.Math.float(x))::Float64
│   %2 = (x === xf)::Core.Const(false)
└──      goto #3 if not %2
2 ─      Core.Const(:(Core.tuple(x)))::Union{}
│        Core.Const(:(Base.Math.MethodError(Base.Math.sin, %4)))::Union{}
│        Core.Const(:(Base.Math.throw(%5)))::Union{}
└──      Core.Const(:(goto %8))::Union{}
3 ┄ %8 = Base.Math.sin(xf)::Float64
└──      return %8
) => Float64
```
  }}
  \tr{
  \td{4. LLVM instructionsを生成する}
  \td{
@@caption LLVM instructions @@
```julia
julia> @code_llvm sin(1)
;  @ math.jl:413 within `sin'
define double @julia_sin_924(i64 signext %0) {
top:
;  @ math.jl:414 within `sin'
; ┌ @ float.jl:230 within `float'
; │┌ @ float.jl:215 within `AbstractFloat'
; ││┌ @ float.jl:118 within `Float64'
     %1 = sitofp i64 %0 to double
; └└└
;  @ math.jl:416 within `sin'
  %2 = call double @j_sin_926(double %1)
  ret double %2
}
```
  }}
  \tr{
  \td{5. LLVM[^5] がnative codeを生成する}
  \td{
@@caption native code @@
```julia
julia> @code_native sin(1)
        .section        __TEXT,__text,regular,pure_instructions
; ┌ @ math.jl:413 within `sin'
        pushq   %rax
; │ @ math.jl:414 within `sin'
; │┌ @ float.jl:230 within `float'
; ││┌ @ float.jl:215 within `AbstractFloat'
; │││┌ @ float.jl:118 within `Float64'
        vcvtsi2sd       %rdi, %xmm0, %xmm0
; │└└└
; │ @ math.jl:416 within `sin'
        movabsq $sin, %rax
        callq   *%rax
        popq    %rax
        retq
        nopw    %cs:(%rax,%rax)
; └
```
  }}
}

- 習得するまでにやや時間がかかる機能ですが、このメタプログラミングの機能によりJuliaの可能性は飛躍的に広がっています
- 例えばRのような線形モデルの記述方法は、Juliaの言語機能として**ではなく**、パッケージが定義するマクロとして提供されています
  \collapsible{R linear model syntax in Julia}{
\table{
  \tr{\td{Language} \td{GLM syntax} }
  \tr{\td{R} \td{
```r
> coef(summary(lm(sr ~ pop15 + pop75 + dpi + ddpi, LifeCycleSavings)))
```
```
                 Estimate   Std. Error    t value     Pr(>|t|)
(Intercept) 28.5660865407 7.3545161062  3.8841558 0.0003338249
pop15       -0.4611931471 0.1446422248 -3.1885098 0.0026030189
pop75       -1.6914976767 1.0835989307 -1.5609998 0.1255297940
dpi         -0.0003369019 0.0009311072 -0.3618293 0.7191731554
ddpi         0.4096949279 0.1961971276  2.0881801 0.0424711387
```
  }}
  \tr{\td{Julia} \td{
```julia
julia> fit(LinearModel, @formula(SR ~ Pop15 + Pop75 + DPI + DDPI), LifeCycleSavings)
```
```
StatsModels.DataFrameRegressionModel{LinearModel{LmResp{Array{Float64,1}},DensePredChol{Float64,LinearAlgebra.Cholesky{Float64,Array{Float64,2}}}},Array{Float64,2}}

Formula: SR ~ 1 + Pop15 + Pop75 + DPI + DDPI

Coefficients:
─────────────────────────────────────────────────────────────────────────────────
                    Coef.   Std. Error      t  Pr(>|t|)    Lower 95%    Upper 95%
─────────────────────────────────────────────────────────────────────────────────
(Intercept)  28.5661       7.35452       3.88    0.0003  13.7533      43.3788
Pop15        -0.461193     0.144642     -3.19    0.0026  -0.752518    -0.169869
Pop75        -1.6915       1.0836       -1.56    0.1255  -3.87398      0.490983
DPI          -0.000336902  0.000931107  -0.36    0.7192  -0.00221225   0.00153844
DDPI          0.409695     0.196197      2.09    0.0425   0.0145336    0.804856
─────────────────────────────────────────────────────────────────────────────────
```
  }}
}
@@caption [GLM.jl Julia and R comparisons](https://juliastats.org/GLM.jl/dev/examples/#Julia-and-R-comparisons-1) @@
}

# Julia in action

- Python主体の開発の中でJuliaを使うとしたら ?
  1. PythonからJuliaを呼び出す (numpyと同じような感じ)
  2. Juliaから既存資材(Python)を使う
- => 面白そうなので2.でやってみよう !
  - [PyCall.jl](https://github.com/JuliaPy/PyCall.jl)を使えば既存のPythonコードをJuliaから**そのまま**使える

## [demo]


# Julia is the future !

- これまで紹介したようにJuliaは既に十二分に優れた言語なのですが、先ほど紹介した[メタプログラミング](#metaprogramming)の機能がJuliaの将来性をさらに高めていると考えています
- ここまでで紹介してこなかった「型推論/最適化プロセスに対するメタプログラミング」の機能が今メチャクチャアツいです 🔥
- 具体的に次のような応用例が考えられ、今まさに開発が活発に行われています
  - 自動微分: ユーザが与える任意の活性化関数の微分を計算する (活性化関数内で使用されている関数達が型推論後に分かっているので、それらに連鎖律を繰り返し適用していけば導関数が得られる)
    - e.g. [Zygote.jl](https://github.com/FluxML/Zygote.jl)
  - GPU/量子計算: 任意のJuliaプログラムをGPU/量子計算に最適化されたコードに変換する
    - e.g. GPU: [KernelCompiler.jl](https://github.com/vchuravy/KernelCompiler.jl)
    - e.g. 量子計算: [YaoCompiler.jl](https://github.com/QuantumBFS/YaoCompiler.jl)
  - 静的解析: 型情報を用いて、型注釈を必要としない漸進的型付け[^6] を実現する ← 門脇が鋭意開発中 👨‍💻
    - [JET.jl](https://github.com/aviatesk/JET.jl)
    - ⇒ type hintingなどを導入せずともそのままプログラムの品質検査を行うことができる !
- これから来そうなJulia、試してみませんか ?


---

[^1]: 別に科学計算に特化している訳ではなく普通に汎用言語なので、科学計算以外にも色々使えます。例えばこのブログもJulia製のstatic site generator [Franlin.jl](https://github.com/tlienart/Franklin.jl)を使用しています
[^2]: 抽象解釈技術とJuliaの型推論の実装については、あるいは僕の書いた[日本語の記事](https://zenn.dev/aviatesk/articles/data-flow-problem-20201025)あるいは[このブログの英語の記事](/posts/data-flow-problem-20201109.md)で説明しています
[^3]: Juliaの最適化では「型推論」という言葉が使われるので勘違いしやすいのですが、場合によっては引数の型情報だけでなく、引数の_値_そのものを使ったりもします([定数伝播](https://ja.wikipedia.org/wiki/%E5%AE%9A%E6%95%B0%E7%95%B3%E3%81%BF%E8%BE%BC%E3%81%BF))
[^4]: ただし 4. llvm instructions と 5. native code に対するメタプログラミングの機構は提供されていません
[^5]: Juliaの他にもRustやSwiftなどの言語も採用しているコンパイラ基盤 <https://en.wikipedia.org/wiki/LLVM>
[^6]: 既存の動的言語に対して静的な型検査を導入する技術 e.g. [mypy](https://www.google.com/search?q=mypy&rlz=1C5CHFA_enJP915JP915&oq=mypy&aqs=chrome..69i57j0l7.4447j0j4&sourceid=chrome&ie=UTF-8)
