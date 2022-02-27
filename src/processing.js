import data from "./testingData";

const matchContent = (input) => {
    let words = input.split(" ");
    let wLength = words.length;

    // let speak = data[0].desc.split(" ");

    let score = [];

    for(let i = 0; i < data.length; i++){ // loop through the data
        console.log('data',i);
        let total=0;
        for(let x = 0; x < wLength; x++){ // loop through the word
            console.log('word',x);
            for(let y = 0; y < 3; y++){
                console.log('keywords',y);
                if(data[i].keywrds[y].includes(words[x])){
                    if(y===0)
                        total+=1;
                    if(y===1)
                        total+=2;
                    if(y===2)
                        total+=3;
                }
            }
        }
        score.push(total);
        if(total === 6)
            break;
    }
    let res  = score.indexOf(Math.max(...score))
    console.log('scorer', res, score);
    if(score[res] !== 0){
        return data[res];
    }else{
        return {
            desc: "mwihangane, simbashije kubumva",
        }
    }

}

export default matchContent;