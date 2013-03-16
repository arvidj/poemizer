jQuery(function ($) {
	var poems = {
		"Ozymandias - Percy Bysshe Shelley":
		"I met a traveller from an antique land\n" +
			"Who said: Two vast and trunkless legs of stone\n" +
			"Stand in the desart. Near them, on the sand,\n" +
			"Half sunk, a shattered visage lies, whose frown,\n" +
			"And wrinkled lip, and sneer of cold command,\n" +
			"\n" +
			"Tell that its sculptor well those passions read\n" +
			"Which yet survive, stamped on these lifeless things,\n" +
			"The hand that mocked them and the heart that fed:\n" +
			"And on the pedestal these words appear:\n" +
			"\n" +
			"\"My name is Ozymandias, king of kings:\n" +
			"Look on my works, ye Mighty, and despair!\"\n" +
			"Nothing beside remains. Round the decay\n" +
			"Of that colossal wreck, boundless and bare\n" +
			"The lone and level sands stretch far away.\n",
		"Demain, dès l'aube - Viktor Hugo": "",
		"RIMBAUD : Ma Bohème (Fantaisie oct. 1870)": ""
	};

	// * Step 1:

	// fill poems
	function toggleButton1() {
		console.log('change');
		$('#step-1 .btn').toggleClass('disabled', $("#poem").val() == '');
	}

	$.each(poems, function (name, text) {
		// console.log('text:', text);
		$('#poems').append('<li><a href="javascript:;">' + name + '</a></li>');
	});
	$('#poems a').click(function () {
		$('#poem').val(poems[$(this).text()]);
		$('#poem').change();
	})
	$('#poem')
		.elastic()
		.change(toggleButton1)
		.keyup(toggleButton1);
	toggleButton1();


});
