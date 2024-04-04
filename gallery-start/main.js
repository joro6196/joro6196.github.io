const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

/* Declaring the alternative text for each image file */
const filenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg' , 'pic4.jpg', 'pic5.jpg']
const alts = {
    'pic1jpg' : 'boy and a girl sitting at a table with his arm around her',
    'pic2jpg' : 'two boys smiling at camera one with his arm around the other',
    'pic3jpg' : 'two girls and one boy with his arm around both of them',
    'pic4jpg' : 'a boy and a girl smiling at the camera while on a party bus',
    'pic5jpg' : 'boy smiling and holding up an oragami flower',
}

/* Looping through images */

for (const i of filenames) {
    // constuct src ath and alt text
    const nalt = alts[i];
    const nsrc = `images/${i}`;

    // update image for the thumbnail
    const newImage = document.createElement('img');
    newImage.setAttribute('src', nsrc);
    newImage.setAttribute('alt', nalt);
    thumbBar.appendChild(newImage);

    // change displayed image when thumbnail is clicked
    newImage.addEventListener('click', () =>{
        displayedImage.setAttribute('src', nsrc);
        displayedImage.setAttribute('alt', nalt);
    })
}

/* Wiring up the Darken/Lighten button */ 
btn.addEventListener('click', ()=>{
    const btnClass = btn.getAttribute('class');

    if(btnClass === 'dark'){
        btn.setAttribute('class', 'light')
        btn.textContent = 'LIGHTEN';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)'
    }
    else {
        btn.setAttribute('class', 'dark')
        btn.textContent = 'DARKEN';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)'
    }
})