const $weatherInput = document.getElementById("weatherZIP");
const $weatherResponse = document.getElementById("postleitzahlResponse");
const $checkLocationIcon = document.getElementById("checkLocationIcon");

const $simpleText = document.getElementById("simpleText")



let settings
const hosturl = "http://" + location.host;


(async () => {
	await getSettings()
	fetchOpenWeatherAPI($weatherInput.value)
})();

const updateDebounce = debounce((val) => {
	fetchOpenWeatherAPI(val);
});

$weatherInput.addEventListener("input", () => {
	if (!$weatherInput.value) return;
	updateDebounce($weatherInput.value);
});

function debounce(cd, delay = 300) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cd(args);
		}, delay);
	};
}

function fetchOpenWeatherAPI(searchTerm) {
	fetch(
		"https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-postleitzahl&q=" +
		searchTerm +
		"&rows=5&facet=plz_name&facet=lan_name&facet=lan_code"
	)
		.then((response) => response.json())
		.then((data) => {
			const lastResult = $weatherResponse.querySelectorAll(".result");
			lastResult.forEach((item) => {
				item.remove();
			});
			createResultElements(data.records);
		});
}

function createResultElements(records) {
	if (records.length == 1) {
		$checkLocationIcon.style.display = "block";
	} else if (records.length > 1) {
		$checkLocationIcon.style.display = "none";
		records.forEach((item) => {
			if (debug) console.table(item.fields);
			let result = document.createElement("div");
			result.classList.add("result");
			result.innerText =
				item.fields.plz_name + ", " + item.fields.plz_code;

			result.addEventListener("click", () => {
				getResultInInput(result.innerText);
			});
			$weatherResponse.appendChild(result);
		});
	}
}

function getResultInInput(resultValue) {
	$weatherInput.value = resultValue;
	fetchOpenWeatherAPI($weatherInput.value);
}

document.querySelectorAll(".switch input").forEach(input => {
	input.addEventListener("change", () => {
		settings.active[input.dataset.name] = input.checked
		updateSettings()
	})
})

$simpleText.addEventListener("change", () => {
	settings.text = $simpleText.value
	updateSettings()
})


// const updateSettings = debounce((val) => {
// 	fetchOpenWeatherAPI(val);
// });


async function getSettings() {
	await fetch(hosturl + "/service/store")
		.then((response) => response.json())
		.then((data) => {
			settings = data
		});
}

async function updateSettings() {
	try {
		await fetch(hosturl + "/service/store", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify(settings)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			});
	} catch (e) {
		console.log(e)
	}

}