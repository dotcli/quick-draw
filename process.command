cat full-simplified-eye.ndjson | ndjson-filter 'd.recognized == true' | ndjson-sort -r d3 'd3.descending(a.drawing.length, b.drawing.length)' | head -n 1000 | ndjson-reduce > complex-1000.json

cat full-simplified-eye.ndjson | ndjson-filter 'd.recognized == true' | ndjson-sort -r d3 'd3.descending(a.drawing.length, b.drawing.length)' | tail -n 1000 | ndjson-reduce > simple-1000.json

cat full-simplified-eye.ndjson | ndjson-filter 'd.recognized == true' | ndjson-sort -r d3 'd3.descending(a.drawing.length, b.drawing.length)' | head -n 77000 | tail -n 1000 | ndjson-reduce > middle-1000.json

cat full-simplified-eye.ndjson | ndjson-filter 'd.recognized == true' | ndjson-sort -r d3 'd3.descending(a.drawing.length, b.drawing.length)' | head -n 40000 | tail -n 1000 | ndjson-reduce > middle-1000.json
