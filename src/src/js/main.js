// https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/
// "showLogging": true,


document.querySelector("body").addEventListener("contextmenu", (e) => { e.preventDefault() });


var translation_layer = [
	{input:"pi", value:"\\pi", search:null, replace:null, after:null},
	{input:"ii", value:"\\imaginaryI", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"ee", value:"\\exponentialE", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"dd", value:"\\differentialD", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"oo", value:"\\infty", search:"oo", replace:"\u221E", after:"nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space"},
	{input:"inf", value:"\\infty", search:"oo", replace:"\u221E", after:null},
	{input:"\u221E", value:"\\infty", search:"oo", replace:"\u221E", after:null},
	{input:"\u2211", value:"\\", search:null, replace:"sum", after:sum},
	{input:"sum", value:"\\sum_{#?}^{#?}(#?)", search:"sum", replace:sum, after:null},
	{input:"int", value:"\\int_{#?}^{#?}", search:null, replace:null, after:null},
	{input:"prod", value:"\\prod_{#?}^{#?}", search:null, replace:null, after:null},
	{input:"sqrt", value:"\\sqrt{#?}", search:null, replace:null, after:null},
	{input:"cbrt", value:"\\sqrt[3]{#?}", search:null, replace:null, after:null},
	{input:"root", value:"\\sqrt[#?]{#?}", search:null, replace:null, after:null},
	{input:"sin", value:"\\sin(#?)", search:null, replace:null, after:null},
	{input:"cos", value:"\\cos(#?)", search:null, replace:null, after:null},
	{input:"tan", value:"\\tan(#?)", search:null, replace:null, after:null},
	{input:"cot", value:"\\cot(#?)", search:null, replace:null, after:null},
	{input:"csc", value:"\\csc(#?)", search:null, replace:null, after:null},
	{input:"sec", value:"\\sec(#?)", search:null, replace:null, after:null},
	{input:"arcsin", value:"\\arcsin(#?)", search:null, replace:null, after:null},
	{input:"arccos", value:"\\arccos(#?)", search:null, replace:null, after:null},
	{input:"arctan", value:"\\arctan(#?)", search:null, replace:null, after:null},
	{input:"arccot", value:"\\operatorname{arccot}(#?)", search:null, replace:null, after:null},
	{input:"arccsc", value:"\\operatorname{arccsc}(#?)", search:null, replace:null, after:null},
	{input:"arcsec", value:"\\operatorname{arcsec}(#?)", search:null, replace:null, after:null},
	{input:"sinh", value:"\\sinh(#?)", search:null, replace:null, after:null},
	{input:"cosh", value:"\\cosh(#?)", search:null, replace:null, after:null},
	{input:"tanh", value:"\\tanh(#?)", search:null, replace:null, after:null},
	{input:"coth", value:"\\coth(#?)", search:null, replace:null, after:null},
	{input:"csch", value:"\\operatorname{csch}(#?)", search:null, replace:null, after:null},
	{input:"sech", value:"\\operatorname{sech}(#?)", search:null, replace:null, after:null},
	{input:"arsinh", value:"\\operatorname{arsinh}(#?)", search:null, replace:null, after:null},
	{input:"arcosh", value:"\\operatorname{arcosh}(#?)", search:null, replace:null, after:null},
	{input:"artanh", value:"\\operatorname{artanh}(#?)", search:null, replace:null, after:null},
	{input:"arcoth", value:"\\operatorname{arcoth}(#?)", search:null, replace:null, after:null},
	{input:"arcsch", value:"\\operatorname{arcsch}(#?)", search:null, replace:null, after:null},
	{input:"arsech", value:"\\operatorname{arsech}(#?)", search:null, replace:null, after:null},
	{input:"lg", value:"\\lg(#?)", search:null, replace:null, after:null},
	{input:"log", value:"\\log_{#?}(#?)", search:null, replace:null, after:null},
	{input:"ln", value:"\\ln(#?)", search:null, replace:null, after:null},
	{input:"lim", value:"\\lim_{#?\\to#?}(#?)", search:null, replace:null, after:null},
	{input:"\u2260", value:"\\ne", search:null, replace:null, after:null},
	{input:"!=", value:"\\ne", search:null, replace:null, after:null},
	{input:"*", value:"\\cdot", search:null, replace:null, after:null},
]




/*

Katex:
{\cvec{5\\3\\2}+\cvec{8\\3\\2}} -> siehe chatgpt für makro

{\int_0^t{5}}

{\lim_{x\to\infty}\bigg(\frac{5}{2}\bigg)}


https://cortexjs.io/mathfield/

*/

