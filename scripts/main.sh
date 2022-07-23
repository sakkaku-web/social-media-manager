#!/bin/sh

IMAGES=(/home/sakkaku/Downloads/ina.png)

python reddit.py submit --refresh --title "Ina on the beach" --images ${IMAGES[@]} -sr 'AnimeSketch'

#python twitter.py --text "#inART #いなート" -i ${IMAGES[@]}
#python pixiv.py --refresh --title "🐙🍦" --tags "アイス inART いなート" -i ${IMAGES[@]} 

# 'kumi_yada:test'
# 'artcommissions:Artist'
# 'HungryArtists'

# 'AnimeART:Original'
# 'Hololive:Fan Content (OP)' # need more karma

