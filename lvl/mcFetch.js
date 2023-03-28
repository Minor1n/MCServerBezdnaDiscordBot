module.exports = {
    uuid: async function mcUUID(nickname){
        try{
            let api = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nickname}`);
            if (api.ok){
                let apiToJson = await api.json();
                return String(apiToJson.id)
            }
        }catch (e) {console.log(e)}
    },
    bust: async function mcBustFetch(nickname){
        try{
            let api = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nickname}`);
            if (api.ok){
                let apiToJson = await api.json();
                return `https://visage.surgeplay.com/bust/${apiToJson.id}.png`
            }
        }catch (e) {console.log(e)}
    },
    face: async function msFaceFetch(nickname){
        try{
            let api = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nickname}`);
            if (api.ok){
                let apiToJson = await api.json();
                return `https://visage.surgeplay.com/face/${apiToJson.id}.png`
            }
        }catch (e) {console.log(e)}
    },
    head: async function msHeadFetch(nickname){
        try{
            let api = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nickname}`);
            if (api.ok){
                let apiToJson = await api.json();
                return `https://visage.surgeplay.com/head/${apiToJson.id}.png`
            }
        }catch (e) {console.log(e)}
    }
}