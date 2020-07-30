#!/bin/sh
mongorestore --host mongo --port 27017 --db LAM_Industries /mongo-seed/dump/LAM_Industries --gzip
