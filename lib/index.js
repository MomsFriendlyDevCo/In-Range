export default function inRange(subject, range, options) {
	let settings = {
		split: true,
		throwUnparsable: true,
		...options,
	};

	if (settings.split)
		return range
			.split(/\s*,\s*/)
			.some(r => inRange(subject, r, {...settings, split: false}));


	let match;

	// Direct equal value
	if (isFinite(range)) return subject == range;

	// Prefixed conditions
	if (match = /^\s*(?<prefix><=|=>|>=|<|>|==?)\s*(?<number>\d+)\s*$/.exec(range)?.groups) {
		if (match.prefix == '=') {
			return match.number == subject;
		} else if (['<=', '=<'].includes(match.prefix)) {
			return subject <= match.number;
		} else if (['>=', '=>'].includes(match.prefix)) {
			return subject >= match.number;
		} else if (match.prefix == '>') {
			return subject > match.number;
		} else if (match.prefix == '<') {
			return subject < match.number;
		}
	}

	// Suffixed conditions (+ only)
	if (match = /^\s*(?<number>\d+)(?<suffix>\+)\s*$/.exec(range)?.groups) {
		return subject >= match.number;
	}

	// Range conditions
	if (match = /^\s*(?<start>\d+)\s*-\s*(?<end>\d+)\s*$/.exec(range)?.groups) {
		return subject >= match.start && subject <= match.end;
	}

	if (settings.throwUnparsable) throw new Error(`Unable to parse range expression "${range}"`);

	// Something weird or can't decode - return false
	return false;
}
