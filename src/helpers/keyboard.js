import { read } from "../utils/FS.js"

const categoriya = read("mahsulotlar.json")
let menyu = []

for (let i = 0; i < categoriya.length; i += 2) {
    menyu.push([categoriya[i].name, categoriya[i+1]?.name])
}

const menu = menyu.map(e => e.filter(w => w?.length));

menu.push(["Asosiy Menu🔚"])

export default {
    menu
}