// This is the JavaScript file that stores and manages global preferences (ones that can be changed in the url using something like '?bg-music=false&lava-animations=false')

let GlobalPreferences = {
	equalizer: { searchParamName: "equalizer", type: "boolean", default: true, value: null },
	BGMusic: { searchParamName: "bg-music", type: "boolean", default: true, value: null },
	lavaAnimations: { searchParamName: "lava-animations", type: "boolean", default: true, value: null },
	particleAnimations: { searchParamName: "particle-animations", type: "boolean", default: true, value: null },
};

let globalPreferencesEntries = Object.entries(GlobalPreferences);

// populate global preferences
if (document.location.search && document.location.search !== "?") {
	const searchParams = document.location.search.split("?")[1].split("&").map(statement => statement.split("="));

	// check to see if the search param has a global preference associated with it, if it does set that global preference's value to the search param's
	searchParams.forEach(([searchParamKey, searchParamValue]) => {
		if (searchParamValue == null || searchParamKey == null) return;

		const globalPreferenceEntryIndex = globalPreferencesEntries.findIndex(([_, value]) => value.searchParamName === searchParamKey);
		if (globalPreferenceEntryIndex < 0) return;

		globalPreferencesEntries[globalPreferenceEntryIndex][1].value = searchParamValue === "true" ? true : searchParamValue === "false" ? false : globalPreferencesEntries[globalPreferenceEntryIndex][1].default;
	});

	GlobalPreferences = Object.fromEntries(globalPreferencesEntries);
}

Object.freeze(GlobalPreferences);

export default GlobalPreferences;
