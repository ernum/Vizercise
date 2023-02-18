## ExRx.net Scraper
### by [carter](github.com/carterwsmith) for ivis

The scraper accesses musclewiki.com pages using the Python `requests` module.

### Outputs
Outputs are written at runtime.

`data/links/links-{timestamp}.txt` : A file containing links to all unique exercises available in the MuscleWiki directory.

`data/json/json-{timestamp}.json` : A `json` file containing information about each exercise.

Expected `json` format:
```
[..., 
	{
		"id": 0,
		"name": "",
		"equipment": "{Barbell/Dumbbell/Machine/Kettlebell/Stretch/Cable/Band/Plate/TRX/Bodyweight}"
		"primaryMuscles": [],
		"difficulty": "",
		"grips": [],
		"mechanic": "",
		"force": "",
		"video": "",
		"howTo": "",
		"secondaryMuscles": [],
		"tertiaryMuscles": [],
		"popularity": {0-100},
	},
...]
```


### Use
Install the requirements into a virtual environment using `pip install -r requirements.txt` (or `pip3`, depending on your machine.)

Run `python scraper.py` from the `viz_scraper` directory.
