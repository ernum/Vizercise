import json
path = 'json-pop-1676574356.json'
labels = ["equipment", "difficulty", "grips", "mechanic", "force", "howTo"]

with open(path) as f:
    data = json.load(f)

possible_grips = ["Underhand", "Overhand", "Neutral"]
possible_mechanics = ["Compound", "Isolation"]
possible_forces = ["Push", "Pull", "Hold"]

try:
    for item in data:
        for label in labels:
            if not item[label]:
                if label == "grips":
                    item[label] = possible_grips[int(input("*** Enter the grip INDEX for exercise {}: ".format(item["name"])))]
                elif label == "mechanic":
                    item[label] = "Isolation" if len(item['primaryMuscles'] or '') + len(item['secondaryMuscles'] or '') + len(item['tertiaryMuscles'] or '') == 1 else "Compound"
                elif label == "force":
                    if 'CURL' in item['name'].upper():
                        item[label] = possible_forces[1]
                    elif 'STRETCH' in item['name'].upper():
                        item[label] = possible_forces[2]
                    else:
                        item[label] = possible_forces[int(input("*** Enter the force INDEX for exercise {}: ".format(item["name"])))]
                else:
                    item[label] = input("*** Enter the {} for exercise {}: ".format(label, item["name"]))
except Exception as e:
    print(e)
    exit(1)

with open(path, 'w') as f:
    json.dump(data, f)