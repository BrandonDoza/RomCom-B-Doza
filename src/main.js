//<><>querySelectors<><>
//~~~~cover querySelectors~~~~
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');

//~~~~button querySelectors~~~~
var randomCoverButton = document.querySelector('.random-cover-button');
var makeOwnCoverButton = document.querySelector('.make-new-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var makeMyBookButton = document.querySelector('.create-new-book-button');

//~~~~view querySelectors~~~~
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');

//~~~~form querySelectors~~~~
var userImageInput = document.querySelector('.user-cover');
var userTitleInput = document.querySelector('.user-title');
var userDesc1Input = document.querySelector('.user-desc1');
var userDesc2Input = document.querySelector('.user-desc2');

//~~~~saved covers querySelectors~~~~
var miniCoverSection = document.querySelector('.saved-covers-section');

//<><>variables<><>
var savedCovers = [];
var currentCover;

//<><>event listeners<><>
//~~~~button eventListeners~~~
randomCoverButton.addEventListener('click', updateCover);
makeOwnCoverButton.addEventListener('click', setMakeOwnCoverView);
homeButton.addEventListener('click', setHomeView);
makeMyBookButton.addEventListener('click', createUserCover);
saveCoverButton.addEventListener('click', saveCover);
viewSavedButton.addEventListener('click', setSavedCoversView);

//~~~~form eventListeners~~~~
userDesc1Input.addEventListener('click', clearDescriptor1);
userDesc2Input.addEventListener('click', clearDescriptor2);

miniCoverSection.addEventListener('dblclick', function(event) {
  var parentElement = event.target.closest('.mini-cover');
  savedCovers.splice(event.target, 1);
  parentElement.remove();
})

//<><>event handler functions<><>
function setMakeOwnCoverView() {
  homeView.classList.add('hidden');
  formView.classList.remove('hidden');
  savedView.classList.add('hidden');
  miniCoverSection.classList.add('hidden');
  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  formReset();
}

function setSavedCoversView() {
  homeView.classList.add('hidden');
  savedView.classList.remove('hidden');
  formView.classList.add('hidden')
  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  miniCoverSection.innerHTML = ''
  createMiniPoster(savedCovers)
}

function setHomeView() {
  homeView.classList.remove('hidden');
  savedView.classList.add('hidden');
  formView.classList.add('hidden');
  homeButton.classList.add('hidden');
  randomCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
}

function clearDescriptor1() {
  userDesc1Input.value = '';
}

function clearDescriptor2() {
  userDesc2Input.value = ''
}

function pageLoad() {
  updateCover()
}

//<><>functions<><>
function getRandomIndex(array) {
  var randomIndex =  Math.floor(Math.random() * array.length);
  var randItem = array[randomIndex];
    return randItem;
};

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
};

function randomCover() {
  return createCover(
    getRandomIndex(covers),
    getRandomIndex(titles),
    getRandomIndex(descriptors),
    getRandomIndex(descriptors)
    );
}     

function updateCover() {
  currentCover = randomCover();
  coverImage.src = currentCover.coverImg;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
  savedCovers.push(currentCover);
  }
}

 function createUserCover(event) {
  formFieldHandling();
  currentCover = createCover(
    userImageInput.value, 
    userTitleInput.value, 
    userDesc1Input.value, 
    userDesc2Input.value
  );
  saveCover();
  if (!covers.includes(userImageInput.value)) {
  covers.push(userImageInput.value);
  }
  if (!titles.includes(userTitleInput.value)) {
  titles.push(userTitleInput.value);
  }
  if (!descriptors.includes(userDesc1Input.value)) {
  descriptors.push(userDesc1Input.value);
  }
  if (!descriptors.includes(userDesc2Input.value)) {
  descriptors.push(userDesc2Input.value);
  }
  setHomeView();
  coverImage.src = currentCover.coverImg;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
  event.preventDefault();
 }

 function createMiniPoster(covers) {
  for (var i = 0; i < covers.length; i++) {
    var miniCoverElement = document.createElement('article');
    var miniCoverImage = document.createElement('img');
    var miniCoverTitle = document.createElement('h2');
    var miniCoverTagline = document.createElement('h3');

    miniCoverElement.classList.add('mini-cover');
    miniCoverImage.classList.add('cover-image');
    miniCoverTitle.classList.add('cover-title');
    miniCoverTagline.classList.add('tagline');

    miniCoverImage.src = covers[i].coverImg;
    miniCoverTitle.innerText = covers[i].title;
    miniCoverTagline.innerText = `A tale of ${covers[i].tagline1} and ${covers[i].tagline2}`;

    miniCoverSection.appendChild(miniCoverElement);
    miniCoverElement.appendChild(miniCoverImage);
    miniCoverElement.appendChild(miniCoverTitle);
    miniCoverElement.appendChild(miniCoverTagline); 
  }
    return miniCoverElement;
}

 function formReset() {
  userImageInput.value = ''; 
    userTitleInput.value = '';
    userDesc1Input.value = 'A Tale Of...';
    userDesc2Input.value = 'and...';
 }

 function formFieldHandling() {
  if (userImageInput.value === '') { 
    var imageInput = prompt('Please Enter An Image url');
    userImageInput.value = imageInput;
  } 
  if (userTitleInput.value === '') {
    var input = prompt('Please Enter a Title');
    userTitleInput.value = input;
  }
  if (!userImageInput.value.includes('https://')) {
    var urlInput = prompt('image url must contain https://')
    userImageInput.value = urlInput;
  }
  if (userDesc1Input.value === '' || userDesc1Input.value === 'A Tale Of...') {
    var desc1 = prompt('Please Enter A Descriptor');
    userDesc1Input.value = desc1;
  }
  if (userDesc2Input.value === '' || userDesc2Input.value === 'and...') {
    var desc2 = prompt('Please Enter A Descriptor');
    userDesc2Input.value = desc2;
  }
 }

pageLoad()
