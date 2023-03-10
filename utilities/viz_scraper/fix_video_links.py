import json

path = "../../public/scraped-data.json"
with open(path, "r") as f:
    data = json.load(f)

for i, datapt in enumerate(data):
    datapt["video"] = datapt["video"].replace("musclewiki.com", "media.musclewiki.com")

with open(path, "w") as f:
    json.dump(data, f, indent=4)