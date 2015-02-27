#!/usr/bin/env python
#coding=utf-8

import requests
import json

res = requests.post('http://localhost/h/data.php', data = json.dumps({"cmd": "send_mail", "to": "luc.mdk@gmail.com", "name": "madk"}))
print res
