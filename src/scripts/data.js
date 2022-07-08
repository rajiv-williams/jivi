const albumList =
    [
    {"name":"NOSTALGIA","artist":"Rajiv",
        "tracks": 
        [
            {"name":"NO LIMIT",
            "artist":"Rajiv",
            "src": require('../music/album1/NO LIMIT.mp3'),
            },
            {"name":"NOSTALGIA",
            "artist":"Rajiv",
            "src": require('../music/album1/NOSTALGIA.mp3')
            }
        ],
        "cover": require('../music/album1/album1.jpg')
    },
    {"name":"Album 2","artist":"Rajiv",
        "tracks": 
        [
            {"name":"CARTI",
            "artist":"Rajiv, Playboi Carti",
            "src": require('../music/album2/Gameboy beat acapella.mp3')
            },
            {"name":"GHOST",
            "artist":"Rajiv",
            "src": require('../music/album2/GHOST.mp3')
            }
        ],
        "cover": require('../music/album2/cover.jpg')
    }
    ];

export default albumList;