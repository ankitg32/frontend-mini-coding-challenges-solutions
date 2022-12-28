window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");

	const container = document.getElementById("item-container");
  
  function addLoader(rootContainer){
  	const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerText = "...loading";
  	rootContainer.appendChild(loader);
    return;
  }
  
  function removeLoader(rootContainer){
  	const loader = document.querySelector(".loader");
    console.log("FOO ", loader);
  	rootContainer.removeChild(loader);
  }

	function addNewItems(n = 15){
  	for(i=0; i<n; i++){
    	const item = document.createElement("div");
      item.classList.add("item");
      item.textContent = "New Item"
      container.appendChild(item);
    }
  }
	
	async function fetchApi(){
	addLoader(container);
  
  // a dummy fetch call resoloving in 500ms
  await new Promise(res => {
  console.log("fetching");
  setTimeout(() => res("yes"), 500)
  });
  addNewItems();
  console.log("fetch complete");
	removeLoader(container);
  }
	
  const observer = new IntersectionObserver(
    async (entries) => {
    	const lastItem = entries[0];
      console.log(lastItem.isIntersecting);
      if(lastItem && lastItem.isIntersecting){
      	console.log("last item intersecting");
        observer.unobserve(lastItem.target);
        await fetchApi();
        const newLastVisibleItem = document.querySelector(".item:last-child");
        observer.observe(newLastVisibleItem);
      }
    },
    {
    	threshold: 1
    }
  );
  
  const lastVisibleItem = document.querySelector(".item:last-child");
  console.log(lastVisibleItem.textContent);
  observer.observe(lastVisibleItem);
});