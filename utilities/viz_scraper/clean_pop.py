import collections, json, os
from datetime import datetime
from math import ceil
import pandas as pd

'''
Adds popularity as a key to a json file specified in JSON_FILEPATH (default: most recently scraped JSON file).
Needs a formatted csv file with columns [name, search_volume] specified in CSV_FILEPATH.

Consists of two distinct parts:
SAVE_NAMES -- saves the name of each exercise to a file
SAVE_POPULARITY -- accepts a csv with row (name, search volume) and adds a normalized popularity to the json file
'''

# global variables
SAVE_NAMES = False
SAVE_POPULARITY = True
JSON_FILEPATH = 'data/json/' + sorted(os.listdir('data/json'))[-1]
CSV_FILEPATH = 'data/search/search_volume.csv'

# read the json object from the file
with open(JSON_FILEPATH, 'r') as f:
    json_obj = json.load(f)

# save the name field from each exercise in a list
names = [ex['name'] for ex in json_obj]

dupes = [item for item, count in collections.Counter(names).items() if count > 1]

# remove json objects with duplicate names
for item in json_obj:
    if item['name'] in dupes:
        json_obj.remove(item)
        names.remove(item['name'])
    dupes = [item for item, count in collections.Counter(names).items() if count > 1]

# recalibrate ids
for i, ex in enumerate(json_obj):
    ex['id'] = i

if SAVE_NAMES:
    # write each name on a new line in a file
    with open(f'names/names-{JSON_FILEPATH}.txt', 'w') as f:
        for name in names:
            f.write(f'{name}\n')

csv = pd.read_csv(CSV_FILEPATH, delimiter=";", index_col=False)

volume_list = list(csv.itertuples(index=None, name=None))
volume_list += [(name, 0) for name in names if name.upper() not in [tup[0].upper() for tup in volume_list]]

assert len(volume_list) == len(json_obj)

# normalize search volume
max_volume = max([tup[1] for tup in volume_list])

# a function that finds the index of a case-insensitive name in the volume list
def find_index(name):
    for i, tup in enumerate(volume_list):
        if tup[0].upper() == name.upper():
            return i
    print(f"Error: {name} not found in volume list.")
    return None

for i, ex in enumerate(json_obj):
    ex['popularity'] = ceil((volume_list[find_index(ex['name'])][1] / max_volume) * 100)
    assert ex['popularity'] >= 0 and ex['popularity'] <= 100

if SAVE_POPULARITY:
    # save json_obj to a .json file
    with open(f'json-pop-{int(datetime.timestamp(datetime.now()))}.json', 'w') as f:
        f.write(json.dumps(json_obj, indent=4))