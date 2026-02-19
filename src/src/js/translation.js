const undef = {length:null, insert:null};

function translation(input) {
	if (input[0] == "(" && input[input.length - 1] == ")") input = input.slice(1,-1);

	var output = "";
	var lastIndex = 0;
	var match;
	var regex = new RegExp(translation_regex, "g");

	while ((match = regex.exec(input)) !== null) {
		var found = match[0];
		var pos = match.index;

		if (pos < lastIndex) continue;

		console.log(match)

		// add text before match
		output += input.slice(lastIndex, pos);
		var rule = translation_layer[found];

		if (typeof rule == "function") var {length, insert} = rule(pos, input);
		else {
			var length = found.length;
			var insert = rule;
		}
		if (insert == null) return "";

		output += insert;
		lastIndex = pos + length;
	}

	return output + input.slice(lastIndex);
}

function getBracketLength(whole_array, get_from_here) {
	var array = whole_array.slice(get_from_here);

	// if no bracket, just get content length
	if (array[0] != "(") {
		var index = array.findIndex(el => !/^[a-z0-9]$/i.test(el));
		if (index == -1) return -1;
		return index  + get_from_here - 1;
	}

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
	if (top_bracket_end == -1) return undef;

	var sum_end = getBracketLength(split_str, top_bracket_end + 1);
	if (sum_end == -1) return undef;

	var bottom_bracket_content = translation(split_str.slice(0, bottom_bracket_end + 1).join(""));
	var top_bracket_content = translation(split_str.slice(bottom_bracket_end + 2, top_bracket_end + 1).join(""));
	var sum_content = translation(split_str.slice(top_bracket_end + 1, sum_end + 1).join(""));
	var length = sum_end + value_pos + 1 - pos;

	var bottom_bracket_array = bottom_bracket_content.split("=");
	if (bottom_bracket_array.length != 2 || bottom_bracket_array[1] == "") return undef;

	return {length: length, insert: `Sum(${sum_content}, ${bottom_bracket_array[0]}, ${bottom_bracket_array[1]}, ${top_bracket_content})`};
}

function nroot(pos, str) {
	// root(n)(x) to nroot(x, n)
	var split_str = str.slice(pos).split("");

	var n_bracket_end = getBracketLength(split_str, 4);
	if (n_bracket_end == -1) return undef;
	var x_bracket_end = getBracketLength(split_str, n_bracket_end + 1);
	if (x_bracket_end == -1) return undef;

	var n_content = translation(split_str.slice(5, n_bracket_end).join(""));
	var x_content = translation(split_str.slice(n_bracket_end + 1, x_bracket_end + 1).join(""));
	var length = x_bracket_end + 1 - pos;

	return {length: length, insert: `nroot(${x_content}, ${n_content})`};
}

function int(pos, str) {
	// int  _a^b(c d x) or int  (x d x) to Integral(c, x, a, b)
	var value_pos = str.indexOf("_", pos);
	var split_content = "d ";

	// handle int without bounds
	if (value_pos == -1 || value_pos > 10) {
		var split_str = str.slice(pos).split("");
		var int_end = getBracketLength(split_str, 5);
		if (int_end == -1) return undef;

		var int_content = translation(split_str.slice(6, int_end).join(""));
		return boundless_int(int_end + 2 - pos, int_content.split(split_content));
	}

	// handle int with bound
	var split_str = str.slice(value_pos + 1).split("");

	var lower_bound = getBracketLength(split_str, 0);
	if (lower_bound == -1) return undef;

	var upper_bound = getBracketLength(split_str, lower_bound + 2);
	if (upper_bound == -1) return undef;

	var int_end = getBracketLength(split_str, upper_bound + 1);
	if (int_end == -1) return undef;

	var lower_bound_content = translation(split_str.slice(0, lower_bound + 1).join(""));
	var upper_bound_content = translation(split_str.slice(lower_bound + 2, upper_bound + 1).join(""));
	var int_content = translation(split_str.slice(upper_bound + 1, int_end + 1).join(""));
	var length = int_end + value_pos + 2 - pos;

	var int_content_array = int_content.split(split_content);
	if (int_content_array.length != 2 || int_content_array[1] == "") return undef;
	else if (lower_bound_content == "()" && upper_bound_content == "()") return boundless_int(length, int_content_array);

	return {length: length, insert: `Integral(${int_content_array[0]}, ${int_content_array[1]}, ${lower_bound_content}, ${upper_bound_content})`};
}

function boundless_int(length, int_content_array) {
	return {length: length, insert: `Integral(${int_content_array[0]}, ${int_content_array[1]})`};
}

function prod(pos, str) {
	// prod  _(k=1)^n(x) to Product(x,k,1,n)
	var value_pos = str.indexOf("_", pos) + 1;
	var split_str = str.slice(value_pos).split("");

	var bottom_bracket_end = getBracketLength(split_str, 0);
	if (bottom_bracket_end == -1) return undef;

	var top_bracket_end = getBracketLength(split_str, bottom_bracket_end + 2);
	if (top_bracket_end == -1) return undef;

	var prod_end = getBracketLength(split_str, top_bracket_end + 1);
	if (prod_end == -1) return undef;

	var bottom_bracket_content = translation(split_str.slice(0, bottom_bracket_end + 1).join(""));
	var top_bracket_content = translation(split_str.slice(bottom_bracket_end + 2, top_bracket_end + 1).join(""));
	var prod_content = translation(split_str.slice(top_bracket_end + 1, prod_end + 1).join(""));
	var length = prod_end + value_pos + 1 - pos;

	var bottom_bracket_array = bottom_bracket_content.split("=");
	if (bottom_bracket_array.length != 2 || bottom_bracket_array[1] == "") return undef;

	return {length: length, insert: `Product(${prod_content}, ${bottom_bracket_array[0]}, ${bottom_bracket_array[1]}, ${top_bracket_content})`};
}