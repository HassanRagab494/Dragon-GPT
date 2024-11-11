const typing_form =document.querySelector('.typing_form');
const  chat_list = document.querySelector('.chat_list');
const API_KEY = 'AIzaSyBePlJhUPaVmHOYZqyBlOWEbqEtbFQQrj4';
const  API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;


const genrateAPIResponse = async (div)=>{
  const textElement = div. querySelector('.text');

  try{
    const response = await fetch(API_URL ,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        contents:[{
          role:'user',
          parts:[{text:userMessge}]
        }]
      })
    })
    const data =await response.json()
    const apiResponse = data?.candidates[0].content.parts[0].text
    console.log(apiResponse);
    textElement.innerHTML = apiResponse
    
  }catch(error){
    console.error(error)
  }

}
const copy =(copy_btn) => {
  const messageText =copy_btn.parentElement.querySelector('.text').innerText;
  navigator.clipboard.writeText(messageText);
}



const  showloading =() => {
  const html = `
          <div class="message_content">
          <img src="صورة واتساب بتاريخ 2024-11-11 في 13.04.59_fa737807.jpg" alt="">
        <p class="text">  </p>
    
        </div>
        <i onClick='copy(this)' class="fa-solid fa-copy"></i>
  `
  const div =  document.createElement('div');
  div.classList.add('message','incoming','loading');
  div.innerHTML = html;


  chat_list.appendChild(div);
  genrateAPIResponse(div)
}





const handleOutGoingchat =()=>{

  userMessge = document.querySelector(".typing_input").value;
  console.log(userMessge);
  if(!userMessge) return
  const html = `
            <div class="message_content">
              <img src="صورة واتساب بتاريخ 2024-11-11 في 13.04.59_fa737807.jpg" alt="">
              <p class="text"></p>
            </div>
    `
    const div =  document.createElement('div');
    div.classList.add('message','outgoing');
    div.innerHTML = html;

    div.querySelector('.text').innerHTML = userMessge;
    chat_list.appendChild(div);
    typing_form.reset();


    setTimeout(showloading, 500);
  

}
typing_form.addEventListener("submit" ,(e)=>{
  e.preventDefault();
  handleOutGoingchat()

})
