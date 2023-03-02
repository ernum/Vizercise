from datetime import datetime
import json, os, re
from time import sleep

from bs4 import BeautifulSoup
import pandas as pd
import requests
from tqdm import tqdm

# Global variables
SCRAPE_LINKS = False; SCRAPE_JSON = True; SAVE_LINKS = False; SAVE_JSON = True
BASE_URL = "https://musclewiki.com"

GROUP_NAMES = []

# Scrape links if a file does not already exist
link_dir = "data/links"
if os.path.isdir(link_dir):
    if not os.listdir(link_dir):
        SCRAPE_LINKS = True
else:
    SCRAPE_LINKS = True

# Scrape links from musclewiki directory
if SCRAPE_LINKS:
    all_links = []

    url = "https://musclewiki.com/directory"
    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    content_div = soup.find("div", {"class": "body"})

    GROUP_NAMES = [a.text for a in content_div.find_all("h2")]
    group_tables = content_div.find("div", {"id": "mw-content-text"}).find_all("table")

    for i, table in tqdm(enumerate(group_tables)):
        try:
            rows = table.find_all("tr")[1:]
            for row in rows:
                try:
                    link_cell = row.find("td", {"class": "clickablecell"}).find("a")["href"]
                    all_links.append(BASE_URL + link_cell)
                except:
                    print(f"Error parsing link for row {row}.")
        except:
            print(f"Error parsing table {GROUP_NAMES[i]}.")

    if SAVE_LINKS:
        # Saves all exercise links into a file in the `data/links` directory
        link_filepath = f'data/links/links-{int(datetime.timestamp(datetime.now()))}.txt'
        os.makedirs(os.path.dirname(link_filepath), exist_ok=True)
        with open(link_filepath, 'w') as f:
            for line in all_links:
                f.write(f"{line}\n")
else:
    url = "https://musclewiki.com/directory"
    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    content_div = soup.find("div", {"class": "body"})

    GROUP_NAMES = [a.text for a in content_div.find_all("h2")]

# Scrape json for each exercise from links
if SCRAPE_JSON:
    print("Starting JSON scrape...")
    output = []

    links = []
    path = 'data/links/' + sorted(os.listdir('data/links'))[-1]

    with open(path, 'r') as f:
        links += f.read().splitlines()

    #links = ["https://musclewiki.com/plate/male/biceps/plate-squat-hold-curl"]

    for link in tqdm(links):
        try:
            ex_soup = BeautifulSoup(requests.get(link).content, "html.parser")
            ex_table = ex_soup.find("table").find_all("tr")
            muscle_table = ex_soup.find_all("table")[-1].find_all("tr")
            ex_dict = dict()

            try:
                # id
                ex_dict["id"] = len(output) + 1

                # name
                raw_name = ex_soup.find("h3").text.strip()
                if '\n' not in raw_name:
                    ex_dict["name"] = raw_name.strip()
                elif raw_name == "":
                    raise Exception("No name found.")
                else:
                    ex_dict["name"] = raw_name.split('\n')[0].strip()

                # equipment
                if "Barbell" in ex_dict["name"]:
                    ex_dict["equipment"] = "Barbell"
                elif "Dumbbell" in ex_dict["name"]:
                    ex_dict["equipment"] = "Dumbbell"
                elif "Machine" in ex_dict["name"]:
                    ex_dict["equipment"] = "Machine"
                elif "Kettlebell" in ex_dict["name"]:
                    ex_dict["equipment"] = "Kettlebell"
                elif "Stretch" in ex_dict["name"]:
                    ex_dict["equipment"] = "Stretch"
                elif "Cable" in ex_dict["name"]:
                    ex_dict["equipment"] = "Cable"
                elif "Band" in ex_dict["name"]:
                    ex_dict["equipment"] = "Band"
                elif "Plate" in ex_dict["name"]:
                    ex_dict["equipment"] = "Plate"
                elif "TRX" in ex_dict["name"]:
                    ex_dict["equipment"] = "TRX"
                else:
                    ex_dict["equipment"] = "Bodyweight"

                # primaryMuscles (List)
                primary_muscle = [group for group in GROUP_NAMES if group in muscle_table[1].find_all("td")[-1].text]
                if primary_muscle:
                    ex_dict["primaryMuscles"] = primary_muscle
                else:
                    raise Exception("No primary muscle found.")
            except Exception as e:
                print(f"Error retrieving required information for exercise at {link}.")
                print('*** ' + str(e))

            if len(ex_table) == 1:
                ex_dict["difficulty"] = None
                ex_dict["grips"] = None
                ex_dict["mechanic"] = None
                ex_dict["force"] = None
            else:
                labels = [a.find_all("td")[0].text.strip() for a in ex_table[1:]]
                if "Difficulty" in labels:
                    # difficulty
                    difficulty = ex_table[labels.index("Difficulty") + 1].find_all("td")[-1].text.strip()
                    if difficulty: ex_dict["difficulty"] = difficulty
                    else: ex_dict["difficulty"] = None
                else: ex_dict["difficulty"] = None
                if "Grips" in labels:
                    # grips (List)
                    grips = ex_table[labels.index("Grips") + 1].find_all("td")[-1].text.split()
                    if grips: ex_dict["grips"] = grips
                    else: ex_dict["grips"] = None
                else: ex_dict["grips"] = None
                if "Mechanic" in labels:
                    # mechanic
                    mechanic = ex_table[labels.index("Mechanic") + 1].find_all("td")[-1].text
                    if mechanic: ex_dict["mechanic"] = mechanic
                    else: ex_dict["mechanic"] = None
                else: ex_dict["mechanic"] = None
                if "Force" in labels:
                    # force
                    force = ex_table[labels.index("Force") + 1].find_all("td")[-1].text
                    if force: ex_dict["force"] = force
                    else: ex_dict["force"] = None
                else: ex_dict["force"] = None

            # video
            video = ex_soup.find_all("video")[0]["src"]
            if video: ex_dict["video"] = BASE_URL + video
            else: ex_dict["video"] = None

            # howTo
            steps = [a.text for a in ex_soup.find("ol", {"class": "steps-list"}).find_all("li")]
            if steps: ex_dict["howTo"] = " ".join(steps)
            else: ex_dict["howTo"] = None

            # secondaryMuscles (List)
            secondary_muscles = [group for group in GROUP_NAMES if group in muscle_table[2].find_all("td")[-1].text]
            if secondary_muscles: ex_dict["secondaryMuscles"] = secondary_muscles
            else: ex_dict["secondaryMuscles"] = None

            # tertiaryMuscles (List)
            tertiary_muscles = [group for group in GROUP_NAMES if group in muscle_table[3].find_all("td")[-1].text]
            if tertiary_muscles: ex_dict["tertiaryMuscles"] = tertiary_muscles
            else: ex_dict["tertiaryMuscles"] = None

            output.append(ex_dict)
            sleep(0.5)
        except Exception as e:
            print(f"\nError parsing exercise at {link}.")
            print('*** ' + str(e))

    if SAVE_JSON:
        # Saves all exercises into a file in the `data/json` directory
        json_filepath = f'data/json/json-{int(datetime.timestamp(datetime.now()))}.json'
        os.makedirs(os.path.dirname(json_filepath), exist_ok=True)
        with open(json_filepath, 'w') as f:
            f.write(json.dumps(output))

