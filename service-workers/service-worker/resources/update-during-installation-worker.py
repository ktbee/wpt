import time

def main(request, response):
    headers = [('Content-Type', 'application/javascript'),
               ('Cache-Control', 'max-age=0')]
    body = '''
// %s
importScripts('update-during-installation-worker.js');
    '''.strip() % time.clock()
    return headers, body
