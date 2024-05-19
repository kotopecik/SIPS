import re

regex_satellite_datetime_fire_value = r"_([a-zA-Z\d]+)_d(\d{8})_t(\d{4})"
pattern_satellite_datetime_fire_value = re.compile(regex_satellite_datetime_fire_value)

regex_composite = r"viirs_([a-z\d]+)_"
pattern_composite = re.compile(regex_composite)

regex_path_output = r"(\/mnt\/ifs-gis\/production\/SNPP\/NPP_SOFT\/OUTDATA\/[\w-]+)\/?"
pattern_path_output = re.compile(regex_path_output)
regex_path_output = r"(\/home\/app-vrsdop\/OUTDATA\/[\w-]+)\/?"
pattern_path_output = re.compile(regex_path_output)
