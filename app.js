(() => {
    const searchInput = document.querySelector('.search__input');
    const searchSuggestionBox = document.querySelector('.search__suggestion');
    const searchInputContainer = document.querySelector('.search__inpcontainer');
    let albumsList = [];
    const errorMessage = 'Please type something to search';
    const errorParaElem = document.createElement('p');
    errorParaElem.innerText = errorMessage;

    const fetchAlbumData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
            method: 'GET'
        });

        albumsList = await response.json();
    }

    fetchAlbumData();

    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }

    searchInput.addEventListener('keyup', debounce((e) => {
        let value = e.target.value;
        if(value) {
            errorParaElem.remove();
            getSearchResults(value);
            searchSuggestionBox.style.display = "block";
        } else {
            searchSuggestionBox.style.display = "none";
            searchInputContainer.appendChild(errorParaElem);
        }
    }, 200));

    const getSearchResults = (value) => {
        const returnedList = albumsList.filter((list) => list.title.toLowerCase().includes(value.toLowerCase()));
        searchSuggestionBox.innerHTML = '';
        const docFrag = document.createDocumentFragment();
        returnedList.forEach((val) => {
            let list = document.createElement('li');
            list.textContent = val.title;
            docFrag.appendChild(list);
        });
        searchSuggestionBox.append(docFrag);
    }
})();