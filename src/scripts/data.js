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
    {"name":"RAW","artist":"Rajiv",
        "tracks": 
        [
            {"name":"SHIFT",
            "artist":"Rajiv",
            "src": require('../music/album2/shift.mp3')
            },
            {"name":"GREEN",
            "artist":"Rajiv",
            "src": require('../music/album2/green.mp3')
            },
            {"name":"BUSHES",
            "artist":"Rajiv",
            "src": require('../music/album2/bushes.mp3')
            },
            {"name":"GHOST",
            "artist":"Rajiv",
            "src": require('../music/album2/ghost.mp3')
            },
        ],
        "cover": require('../music/album2/cover.jpg')
    },
    {"name":"Lofi","artist":"Rajiv",
        "tracks": 
        [
            {"name":"water works",
            "artist":"Rajiv",
            "src": require('../music/album3/water works.mp3')
            },
            {"name":"tea",
            "artist":"Rajiv",
            "src": require('../music/album3/tea.mp3')
            },
            {"name":"pizza",
            "artist":"Rajiv",
            "src": require('../music/album3/pizza.mp3')
            },
        ],
        "cover": require('../assets/empty.png')
    }
    ];

export default albumList;