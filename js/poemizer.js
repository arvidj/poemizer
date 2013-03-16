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
	var step = 0, poem = '', poem_lines, chunk_size, chunk;

	function transition() {
		if (step == 0) {
			$("#continue .lbl").text('Gimme culture')

			next_step();
		} else if (step == 1) {
			$("#introduction").hide();

			poem = $('#step-1 .poem').val();
			poem_lines = poem.split(/\n/).filter(function (v) {return !v.match(/^\s*$/);});
			$('#step-2 .poem').text(poem);
			$("#continue .lbl").text('Done?')

			next_step();
		} else if (step == 2) {
			$("#continue .lbl").text('Ready?');
			chunk_size = 1;
			chunk = 0;
			next_step();
		} else if (step == 3) {
			$('#step-3 .poem').text(
				poem_lines.slice(chunk * chunk_size, (chunk + 1) * chunk_size).join("\n")
			);

			if (chunk*chunk_size < poem_lines.length) {
				chunk++;
				$("#continue .lbl").text('Done?');
			} else if (chunk_size * 2 > poem_lines.length) {
				$('#step-4 .poem').text(poem);
				$("#continue .lbl").text('Start over');
				next_step();
			} else {
				chunk_size++;
				$("#step-3 .explanation").text(
					"Now do the samething, but for " + chunk_size + " lines at " +
						"once. Read the lines, then repeat them without looking " +
						"at the screen"
				);
				chunk = 0;
				$("#continue .lbl").text('Done?');
			}
		} else if (step == 4) {
			step = 0;
			$("#introduction").show();
			transition();
		}
	}

	function next_step() {
		$('.step').hide();
		$('#step-' + (++step)).show();
	}

	$("#continue").click(function () {
		if (!$(this).is('.disabled')) transition();
	});
	$(window).keyup(function (e) {
		if (e.keyCode == 32 && !$(e.target).is('textarea.poem')) {
			$("#continue").click();
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	})
	transition();

	// * Step 1:

	// fill poems
	function step1ToggleContinue() {
		$('#continue').toggleClass('disabled', $('#step-1 .poem').val() == '');
	}

	$.each(poems, function (name, text) {
		$('#poems').append('<li><a href="javascript:;">' + name + '</a></li>');
	});
	$('#poems a').click(function () {
		$('#step-1 .poem').val(poems[$(this).text()]);
		$('#step-1 .poem').change();
	})
	$('#step-1 .poem')
		.elastic()
		.change(step1ToggleContinue)
		.keyup(step1ToggleContinue);
	step1ToggleContinue();

	// * Step 2:

});
