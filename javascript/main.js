let mode_button = document.querySelector(".mode");
let text = document.querySelector("textarea");
let limit = document.querySelector(".number input");
let trim = document.querySelector(".trim")

let ready = false;
let no_letters = document.querySelector(".letters")

let no_words = document.querySelector(".words")
let no_spaces = document.querySelector(".spaces")
let stats = [no_letters, no_spaces, no_words]
let start = document.querySelector(".start");
let modes = [
    ["#e2e2e2", "#181e34", "#ffffff", "#fe699f"],
    ["#1f2540", "#ffffff", "#313857", "#fe699f"]
]
let array_of_bars = [];
let density = document.querySelector(".letter_dens")
mode_button.onclick = ()=>{

    if (mode_button.classList.contains("light")){
        change_col(modes[1]);
        mode_button.classList.remove("light");

    }else{
        change_col(modes[0]);
        mode_button.classList.add("light")
    }
}
trim.onclick = ()=>{
    if(limit.value > 0){
        text.value = text.value.trim().slice(0,limit.value);
    }
    make_sure()
    limit.value = "";
}




document.querySelector(".clear").onclick = ()=>{
    text.value = "";
    limit.value = "";
    density.innerHTML = `<i class="fa-solid fa-face-dizzy saddy"></i>`;
    stats.forEach((num)=>{
        num.innerHTML = "00"
    })
}
text.oninput = ()=>{
    make_sure();
}
limit.oninput = ()=>{
    make_sure()
}



start.onclick = ()=>{
    array_of_bars =[];
    if(text.value.length > 0 && ready == true){
        text.value = msg = text.value.trim();

        letters = msg.split("");


        letts = letters.filter((l)=>{
            return l != " "
        })
        spaces = letters.filter((l)=>{
            return l == " "
        })
        words = msg.split(" ").filter((word)=>{
            return /\p{L}/u.test(word) == true;
        })

        
        no_letters.innerHTML = put(letts.length);
        no_words.innerHTML = put(words.length);
        no_spaces.innerHTML = put(spaces.length);

        letters_used = new Set(letts.map((letter)=>{return letter.toLowerCase()}))

        let total_number = 0;
        letters_used.forEach((letter)=>{
            let total = 0;
            letts.map((letter)=>{return letter.toLowerCase()}).forEach((le)=>{
                if(le == letter){
                    total = total + 1;
                }
            })
            total_number += total
            add_to_array(letter, total)
        })
        add_to_page(array_of_bars, total_number);
    }else{
        document.querySelector(".clear").click()
    }
}
function add_to_array(letter, number){

    array_of_bars.push({
        id:letter,
        total:number
    });
    

}

function add_to_page(arr, tot){
    density.innerHTML = ""
    arr.sort((a,b)=>b.total - a.total).forEach((obj)=>{
        let stat = Math.ceil(100*(obj.total/tot))
        let bar = `<div class="letter">
                    <p class="let">${obj.id.toUpperCase()}</p>
                    <div class="bar"><span style="width:${stat}%"></span></div>
                    <div class="perc">${obj.total} ${stat}%</div>
                </div>`
        density.innerHTML += bar
        })

}

function put(length){
    return length < 10? `0${length}`:length;
}

function make_sure(){
    if(limit.value > 0 && text.value.trim().length > limit.value){
        document.querySelector(".face").classList.add("active")
        ready = false;
    }else{
        document.querySelector(".face").classList.remove("active")
        ready = true;
    }
}
function change_col(arr){
        document.documentElement.style.setProperty('--bg', arr[0]);
        document.documentElement.style.setProperty('--text', arr[1]);
        document.documentElement.style.setProperty('--dbg', arr[2]);
        document.documentElement.style.setProperty('--col1', arr[3]);
}