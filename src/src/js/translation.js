const undef = {length:null, insert:null};
var limit = 0;

function translation(input) {
	if (input[0] == "(" && input[input.length - 1] == ")") input = input.slice(1,-1);

	console.log(input)

	var output = "";
	var lastIndex = 0;
	var match;
	var regex = new RegExp(translation_regex, "g")

	if (limit >= 10) return;
	limit++;

	while ((match = regex.exec(input)) !== null) {
		var found = match[0];
		var pos = match.index;

		console.log(match)

		// add text before match
		output += input.slice(lastIndex, pos);
		var rule = translation_layer[found];

		if (typeof rule == "function") var {length, insert} = rule(pos, input);
		else {
			var length = found.length;
			var insert = rule;
		}
		if (insert == null) return;

		output += insert;
		lastIndex = pos + length;
	}

	return output + input.slice(lastIndex);
}

function getBracketLength(whole_array, get_from_here) {
	var array = whole_array.slice(get_from_here);

	// if no bracket, just get content length
	if (array[0] != "(") return array.findIndex(el => !/^[a-z0-9]$/i.test(el)) + get_from_here - 1;

	// search closing bracket
	var open_bracket_count = 0;
	var pos = 0

	while (pos < array.length) {
		// console.log("Loop: ", array[pos], pos, open_bracket_count)
		if (array[pos] == "(") open_bracket_count++;
		else if (array[pos] == ")") open_bracket_count--;

		if (open_bracket_count <= 0) return pos + get_from_here;
		pos++;
	}

	// not enough closing brackets
	return -1;
}

function removeBrackets(str) {
	if (str[0] == "(" && str[str.length - 1] == ")") return str.slice(1,-1);
	else return str;
}

// ###################################################
/* Translation functions */
function sum(pos, str) {
	// sum  _(x=0)^(5+2)(2x) to Sum(2 x,x,0,5)
	var value_pos = str.indexOf("_", pos) + 1;
	var split_str = str.slice(value_pos).split("");

	var bottom_bracket_end = getBracketLength(split_str, 0);

	if (bottom_bracket_end == -1) return undef;

	var top_bracket_end = getBracketLength(split_str, bottom_bracket_end + 2);
	var sum_end = getBracketLength(split_str, top_bracket_end + 1);

	var bottom_bracket_content = removeBrackets(split_str.slice(0, bottom_bracket_end + 1).join(""));
	var top_bracket_content = removeBrackets(split_str.slice(bottom_bracket_end + 2, top_bracket_end + 1).join(""));
	var sum_content = removeBrackets(split_str.slice(top_bracket_end + 1, sum_end + 1).join(""));
	var length = sum_end + value_pos + 1 - pos;

	var bottom_bracket_array = bottom_bracket_content.split("=");
	if (bottom_bracket_array.length != 2 || bottom_bracket_array[1] == "") return undef;

	return {length: length, insert: `Sum(${sum_content}, ${bottom_bracket_array[0]}, ${bottom_bracket_array[1]}, ${top_bracket_content})`};

	console.log("Sum: ", sum_content, sum_end)
	console.log("bottom: ", bottom_bracket_content, bottom_bracket_end)
	console.log("top: ", top_bracket_content, top_bracket_end)
	console.log("complete: ", complete)
}

function nroot(pos, str) {
	// root(3)(9) to nroot(x, n)
	var split_str = str.slice(pos).split("");

	var n_bracket_end = getBracketLength(split_str, 4);
	var x_bracket_end = getBracketLength(split_str, n_bracket_end + 1);

	var n_content = translation(split_str.slice(5, n_bracket_end + 1).join(""));
	var x_content = translation(split_str.slice(n_bracket_end + 1, x_bracket_end + 1).join(""));
	var length = x_bracket_end + 5 - pos;

	return {length: length, insert: `nroot(${n_content}, ${x_content})`};
}

// var {search, replace} = sum(0, "sum  _(x=0)^2(2+5)(2x)") 