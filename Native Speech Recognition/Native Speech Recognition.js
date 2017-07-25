window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; //accounts for difference in syntax (firefox v chrome)

const recognition = new SpeechRecognition(); //create instance of object that lives on the browser

recognition.interimResults = true; //updates while you speak. otherwise, would update only when you are done speaking.

let p = document.createElement("p");

let words = document.querySelector(".words");

words.appendChild(p);

let text;

recognition.addEventListener("result", event => {
  //console.log(event);
  const transcript = [...event.results]
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

  //p.textContent = transcript;
  p.textContent = `${transcript}.  `;

  if (event.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
    
    //command list //put within this conditional to keep the trigger from acting on intermediary results
    if (transcript.includes("open Gmail")) {
        window.open("https://www.gmail.com", "_blank"); 
        //console.log(x);
      } else if (transcript.includes("open Facebook")) {
        let c = window.open("https://www.facebook.com", "_blank")
        console.log(c);
      } else if (transcript.includes("open GitHub")) {
        window.open("https://www.github.com", "_blank");
      } else if (transcript.includes("open Trello")) {
        window.open("https://www.trello.com", "_blank");
      } else if (transcript.includes("open YouTube")) {
        window.open("https://www.youtube.com", "_blank");
    }
  }

  text = words.textContent;
  //console.log(text);
});

//added a save button
const saveButton = document.querySelector("a");
saveButton.addEventListener("click", () => {
  saveButton.download = "text_file.txt";
  saveButton.href = `data:text/plain, ${text}`;
});

//after you stop speaking the function stops so you have to add another eventlistener for when it ends, to run the function again.

recognition.addEventListener("end", recognition.start);

recognition.start();
