import { UsersData } from "../components/InfiniteList/data";

export function getUsersBySize(curr,size){
    console.log("in getUsersBySize the value of size",size)
    return new Promise(resolve =>{
        // let data = [];
        // for(let i=0; i<size; i++){
        //     data.push(UsersData[i]);
        // }
        setTimeout(() =>{
            resolve(UsersData.splice(curr,size))
        },2000);
    })
}


export function getItemsByName(nm){
    return new Promise ( resolve =>{
        const srchArr = [];
        for(let i=0; i<UsersData.length; i++){
                if(UsersData[i].firstName.includes(nm)){
                    srchArr.push(UsersData[i]);
                }
            }
        setTimeout(()=>{
            resolve(srchArr);
        },2000);
    })
}