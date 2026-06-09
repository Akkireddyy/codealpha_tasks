const languages = {

    en: "English",
    te: "Telugu",
    hi: "Hindi",
    ta: "Tamil",
    kn: "Kannada",
    ml: "Malayalam",
    mr: "Marathi",
    bn: "Bengali",
    gu: "Gujarati",
    pa: "Punjabi",
    ur: "Urdu",
    fr: "French",
    es: "Spanish",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    ru: "Russian",
    zh: "Chinese",
    ar: "Arabic"

};

const translateBtn =
    document.getElementById("translateBtn");

const copyBtn =
    document.getElementById("copyBtn");

const speakBtn =
    document.getElementById("speakBtn");

const clearBtn =
    document.getElementById("clearBtn");

const inputText =
    document.getElementById("inputText");

const outputText =
    document.getElementById("outputText");

const sourceLang =
    document.getElementById("sourceLang");

const targetLang =
    document.getElementById("targetLang");
    for(let langCode in languages){

    const option1 =
        document.createElement("option");

    option1.value = langCode;

    option1.textContent =
        languages[langCode];

    sourceLang.appendChild(option1);



    const option2 =
        document.createElement("option");

    option2.value = langCode;

    option2.textContent =
        languages[langCode];

    targetLang.appendChild(option2);

}

const swapBtn =
    document.getElementById("swapBtn");

sourceLang.value = "en";

targetLang.value = "te";

/* Translate Button */

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    const source = sourceLang.value;

    const target = targetLang.value;

    if(text === ""){

        alert("Please enter some text");

        return;
    }

    translateBtn.innerText = "Translating...";

    translateBtn.disabled = true;

    outputText.value = "";

    try{

        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
        );

        const data = await response.json();

        outputText.value = data[0][0][0];

    }

    catch(error){

        console.error(error);

        alert("Translation failed");

    }

    finally{

        translateBtn.innerText = "Translate";

        translateBtn.disabled = false;

    }

});



/* Copy Button */

copyBtn.addEventListener("click", () => {

    if(outputText.value === ""){

        alert("No translated text to copy");

        return;
    }

    navigator.clipboard.writeText(
        outputText.value
    );

    alert("Copied to clipboard!");

});



/* Swap Languages */

swapBtn.addEventListener("click", () => {

    const tempLanguage =
        sourceLang.value;

    sourceLang.value =
        targetLang.value;

    targetLang.value =
        tempLanguage;

    const tempText =
        inputText.value;

    inputText.value =
        outputText.value;

    outputText.value =
        tempText;

});



/* Text To Speech */

speakBtn.addEventListener("click", () => {

    if(outputText.value === ""){

        alert("Nothing to speak");

        return;
    }

    const speech =
        new SpeechSynthesisUtterance(
            outputText.value
        );

    speech.lang =
        targetLang.value;

    window.speechSynthesis.speak(
        speech
    );

});



/* Clear Button */

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.value = "";

});
speechSynthesis.onvoiceschanged = () => {

    const voices = speechSynthesis.getVoices();

    console.log(voices);

};

// console.log(speechSynthesis.getVoices());