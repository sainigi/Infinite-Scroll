import { useEffect, useState } from "react"
import { getItemsByName, getUsersBySize } from "../../services/InfiniteService";
import InfiniteList from "../Skeletons/InfiniteList";


function Card() {
  let curr = 12;
  const [size,setSize] = useState(0);
  const [items,setItems] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [itemsLength, setItemsLength] = useState(0);
  const [srchText,setSrchText] = useState('');
  const [prevItems,setPrevItems] = useState([]);
  let iterations = [1,2,3,4,5,6,7,8,9,0,1,2];
  

  useEffect(()=>{
    setIsLoading(true)
    getUsersBySize(size,curr)
    .then((response) => {
      console.log("inUseEffect",response);
      setItems((prevI)=>[...prevI,...response]);
      setIsLoading(false);
    });
    
  },[setSize,size,curr])


  useEffect(() =>{
    console.log();
    if(itemsLength === 0){
    document.getElementById("123").indeterminate = false;
    }
    if(itemsLength === items.length){
      document.getElementById("123").indeterminate = false;
      document.getElementById("123").checked = true;
    }

    

    
  },[itemsLength,items,setItems,size,setSize])
 
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getNextData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const getNextData=()=>{
    // let limit = size;
    console.log("before",size)
    // curr = curr+12;
    setSize(size+12);
    console.log("after",size)

    // if(limit < 96){
    //   limit += 12;
    //   setSize(limit);
    // }  
  }

  const handleCheckedChange = (e) => {
    console.log(items);
   const { id, checked } = e.target;
   if (id === "123") {
     let tempItem = items?.map((item) => {
       return { ...item, isChecked: checked };

     })
     setItems(tempItem);
   } else {
    let arr = []
    for (let i=0; i<items.length; i++){
      if(items[i].id === id){
        items[i].isChecked = checked;
        arr.push(items[i]);
      }else{
        arr.push(items[i]);
      }
    }

    //  let temItem = items?.map((item) =>
    //    item.id === id ? { ...item, isChecked: checked } : item
    //  )
     setItems(arr);

     getSelectAllValue();

    //  console.log(items.filter((item) => item?.isChecked !== true))

    //  let notFound = tempItem.filter((item) =>
    //  item.hasOwnProperty("isChecked"))
    //  ).length;

     let foundTrue = items.filter((item) => item?.isChecked === true).length;
     let foundFalse = items.filter((item) => item?.isChecked === false).length;

     if (foundTrue > 0 && foundFalse > 0) {
       document.getElementById("123").indeterminate = true;
     }
    
    //  if(temItem.filter((item)=> item === true).length === items.length-1){
    //   let tar = document.getElementById("123");
    //   tar.value = true;
    //  }
     
   }
  //  setItemsLength(items.filter((item)=> item?.isChecked === true).length)
   
   // console.log(tempUser);
 };

 const getSelectAllValue =()=>{
    let tar = document.getElementById("123");

    console.log("in getSelectAllValue====",items.filter((item)=> item?.isChecked !==true).length)
    setItemsLength(items.filter((item)=> item?.isChecked ===true).length)
    console.log(itemsLength);

    if(items.filter((item)=> item?.isChecked !==true).length === 0){
      tar.value = false;
    }

 }

 const getSrchByNm = (e)=>{
  e.preventDefault();
  
  setIsLoading(true);
  
  
  if(srchText !== undefined && srchText !== null && srchText !== "" ){
    setPrevItems(items);
    // setItems([]);
    let filterArr = []
    for(let i=0; i<items.length; i++){
      if(items[i].firstName.includes(srchText)){
          filterArr.push(items[i]);
      }
    }
    setItems(filterArr);
  }else{
    if(items){
      let arr = []
      for (let i=0; i<items.length; i++){
        for (let j=0; j<prevItems.length; j++){
          if(items[i].id === prevItems[j].id){ 
            prevItems[j].isChecked = true
            console.log(items);
            arr = prevItems;
            console.log(arr)
          }
          // else{
          //   arr.push(prevItems[j])
          // }
        }
      }
      setItems(arr);
    }
  }
  
  // getItemsByName(srchText)
  // .then((response)=>{
  //   setItems(response);
  //   setIsLoading(false);
  // })
  setIsLoading(false);
}

  return (
    <>
    <div className=" text-black mt-16 mb-10">
      <h1 className="text-3xl font-semibold pt-10 flex justify-center">
      Task in React
      </h1>
      <div className=" ">
        <div className="space-x-6 px-12 grid grid-cols-2 justify-between ">
          <form>
            <div className="flex space-x-6 ">
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="first_name"
                  onChange={(e)=>setSrchText(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5"
                  placeholder="Enter the user name"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-auto px-5 py-2.5 h-auto text-center "
                  onClick={getSrchByNm}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-end items-center space-x-2">
            <input
              type="checkbox"
              id="123"
              checked={items.filter((item)=> item?.isChecked !== true).length <1}
              onChange={handleCheckedChange}
            />
            <label>Select All</label>
            <label className="font-bold">Total Selected Items: {items.filter((item)=> item?.isChecked === true).length}</label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 justify-center">
          {items?.map((item, i) => (
            <div
              key={i}
              className="flex flex-row  justify-center p-4 text-white items-center"
            >
              <div className="flex bg-black text-white p-4 rounded-lg">
                <div className="p-2 flex items-center">
                  <img
                    className="w-28 flex align-middle justify-center rounded-xl"
                    src={item.picture}
                    alt="user profile"
                  />
                </div>
                <div className="flex flex-col text-white items-center justify-center">
                  <h1>UserId:{item.id}</h1>
                  <h1>
                    Name:{" "}
                    {item.title + " " + item.firstName + " " + item.lastName}
                  </h1>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.isChecked}
                    onChange={handleCheckedChange}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-3 gap-1">
          {iterations.map((item, i) => (
            <InfiniteList key={i} />
          ))}
        </div>
      )}
      {/* {isLoading && items.length > 0 && <Spinner />} */}
    </div>
    </>
  )
}

export default Card