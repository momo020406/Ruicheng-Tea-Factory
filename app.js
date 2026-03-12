const DATA_URL = "data.json?t=" + Date.now()

async function loadTeaData() {

    const res = await fetch(DATA_URL,{cache:"no-store"})
    const raw = await res.json()

    const rt = raw.realtime || {}

    function station(n,depth){

        const base = `Station${n}_${depth}_`

        return {
            name:`第${n}站`,
            temp: Number(rt[base+"SoilTemp"]) || 0,
            moisture: Number(rt[base+"SoilMoisture"]) || 0,
            n: Number(rt[base+"Nitrogen"]) || 0,
            p: Number(rt[base+"Phosphorus"]) || 0,
            k: Number(rt[base+"Potassium"]) || 0
        }
    }

    return {

        time: raw.time,

        teaTemp: rt["TeaGarden_Air_Temp"],
        teaHumi: rt["TeaGarden_Air_Humidity"],

        surface:[
            station(1,"Surface"),
            station(2,"Surface"),
            station(3,"Surface"),
            station(4,"Surface")
        ],

        d15:[
            station(1,"15cm"),
            station(2,"15cm"),
            station(3,"15cm"),
            station(4,"15cm")
        ],

        d25:[
            station(1,"25cm"),
            station(2,"25cm"),
            station(3,"25cm"),
            station(4,"25cm")
        ]

    }

}