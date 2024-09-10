#!/bin/bash

API_KEY="AIzaSyDup2uv98w9GZPykNdk1u4TcOJAfa5Eft0"
PLAYLIST_ID="PL81SQDom_tmc1Nn07I0Qu6JL3XJG0lQ-O"
URL="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=$PLAYLIST_ID&maxResults=25&key=$API_KEY"

curl -s "$URL" | jq '.items[].snippet.title'