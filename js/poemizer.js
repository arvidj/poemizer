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

		"Ma Bohème - Rimbaud":
		"Je m'en allais, les poings dans mes poches crevées ;\n" +
			"Mon paletot aussi devenait idéal :\n" +
			"J'allais sous le ciel, Muse ! et j'étais ton féal ;\n" +
			"Oh ! là là ! que d'amours splendides j'ai rêvées!\n" +
			"\n" +
			"Mon unique culotte avait un large trou.\n" +
			"- Petit-Poucet rêveur, j'égrenais dans ma course\n" +
			"Des rimes. Mon auberge était à la Grande-Ourse.\n" +
			"- Mes étoiles au ciel avaient un doux frou-frou\n" +
			"\n" +
			"Et je les écoutais, assis au bord des routes,\n" +
			"Ces bons soirs de septembre où je sentais des gouttes\n" +
			"De rosée à mon front, comme un vin de vigueur ;\n" +
			"\n" +
			"Où, rimant au milieu des ombres fantastiques,\n" +
			"Comme des lyres, je tirais les élastiques\n" +
			"De mes souliers blessés, un pied près de mon cœur !\n",

		"Demain, dès l'aube - Viktor Hugo":
		"Demain, dès l'aube, à l'heure où blanchit la campagne,\n" +
			"Je partirai. Vois-tu, je sais que tu m'attends.\n" +
			"J'irai par la forêt, j'irai par la montagne.\n" +
			"Je ne puis demeurer loin de toi plus longtemps.\n" +
			"\n" +
			"Je marcherai les yeux fixés sur mes pensées,\n" +
			"Sans rien voir au dehors, sans entendre aucun bruit,\n" +
			"Seul, inconnu, le dos courbé, les mains croisées,\n" +
			"Triste, et le jour pour moi sera comme la nuit.\n" +
			"\n" +
			"Je ne regarderai ni l'or du soir qui tombe,\n" +
			"Ni les voiles au loin descendant vers Harfleur,\n" +
			"Et quand j'arriverai, je mettrai sur ta tombe\n" +
			"Un bouquet de houx vert et de bruyère en fleur.\n"
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
