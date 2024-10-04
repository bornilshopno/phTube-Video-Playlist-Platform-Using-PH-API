//create load categories
const loadCatagories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));
};


//function for time calculation from seconds
function getTimeString(time) {
  const day = parseInt(time / 86400);
  let remainingSeconds = time % 86400;
  const hour = parseInt(remainingSeconds / 3600);
  remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);

  return `${day} day ${hour} hour ${minute} min ago`
}



//create video loading
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};


//create display categories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories');
  //FOR OF CHALANO JAY NA KENO
  categories.forEach((item) => {
    console.log(item);

    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id= "btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class=" bg-gray-300 p-3 rounded-lg category-btns">

    ${item.category}</button>
    `

    //add button to category container
    categoryContainer.appendChild(buttonContainer);
  })
};



const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `<div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">

    <img src="../design/Icon.png" alt="" srcset="">
    <h2>Opppps!! there is no content yet in this category!</h2>

</div>`;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video)
    const card = document.createElement('div');
    card.classList = "card card-compact"
    card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />

      ${video.others.posted_date?.length === 0 ? "" : `<span class= "absolute right-2 bottom-2 bg-black text-white rounded-xl p-2 text-xs">${getTimeString(video.others.posted_date)
        }</span>`}
      


  </figure>
  <div class="px-0 py-5 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>

    <div class="">
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex">
            <p class="text-gray-400">${video.authors[0].profile_name}
            </p>
            ${video.authors[0].verified === true ? '<img class="w-5 " src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />' : ""}
        </div>
        <p class="text-gray-400">${video.others.views} views</p>
        <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button>

    </div>

    
</div>  `

    videoContainer.appendChild(card);
  }

  )
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
    console.log(activeBtn);
    activeBtn.classList.add("active");
      displayVideos(data.category)
    })
};

const removeActiveClass=()=>{
  const buttons=document.getElementsByClassName('category-btns');
  console.log(buttons);
  for(let btn of buttons){
    btn.classList.remove("active");

  }
}

const loadDetails=async(vedioId)=> {
  console.log(vedioId);
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${vedioId}`;
  const res=await fetch(url);
  const data=await res.json();
  displayDetails(data.video);
}
const displayDetails=(video)=>{
console.log(video);
const detailsContainer=document.getElementById('modal-content');
detailsContainer.innerHTML=`
<img src=${video.thumbnail}/>
<p> ${video.description}</p>
`


// way-1
// document.getElementById('showModalData').click();
//way-2
document.getElementById('customModal').showModal();
}

document.getElementById("search-input").addEventListener("keyup",(e)=>{loadVideos(e.target.value);})

loadCatagories()
loadVideos()