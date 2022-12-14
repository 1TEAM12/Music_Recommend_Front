const record = document.getElementById("record")
const stop = document.getElementById("stop")
const soundClips = document.getElementById("sound-clips")
const chkHearMic = document.getElementById("chk-hear-mic")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의

const analyser = audioCtx.createAnalyser()

function makeSound(stream) {
    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)
    analyser.connect(audioCtx.destination)

}

if (navigator.mediaDevices) {
    console.log('getUserMedia supported.')

    const constraints = {
        audio: true
    }
    let chunks = []

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {

            const mediaRecorder = new MediaRecorder(stream)
            
            chkHearMic.onchange = e => {
                if(e.target.checked == true) {
                    audioCtx.resume()
                    makeSound(stream)
                } else {
                    audioCtx.suspend()
                }
            }
            
            record.onclick = () => {
                mediaRecorder.start()
                console.log(mediaRecorder.state)
                console.log("recorder started")
                record.style.background = "red"
                record.style.color = "black"
            }

            stop.onclick = () => {
                mediaRecorder.stop()
                console.log(mediaRecorder.state)
                console.log("recorder stopped")
                record.style.background = ""
                record.style.color = ""
            }

            mediaRecorder.onstop = e => {
                
                const clipContainer = document.createElement('article')
                const clipLabel = document.createElement('p')
                const audio = document.createElement('audio')
                

                clipContainer.classList.add('clip')
                audio.setAttribute('controls', '')


                while (clipContainer.firstChild) {
                    clipContainer.removeChild(clipContainer.firstChild)
                }
                while (soundClips.firstChild) {
                    soundClips.removeChild(soundClips.firstChild)
                }

                clipContainer.appendChild(audio)
                clipContainer.appendChild(clipLabel)
                soundClips.appendChild(clipContainer)

                audio.controls = true
                const blob = new Blob(chunks, {
                    'type': 'audio/mp3 codecs=opus'
                })
                chunks = []
                const audioURL = URL.createObjectURL(blob)
                audio.src = audioURL

                const fileName = '녹음파일.mp3'
                const link = document.createElement('a')
                link.href = audioURL
                link.download = fileName
                link.click()
                link.remove()

                console.log("recorder stopped")


                

                setDisabled(false);
                setSound(sound);


                deleteButton.onclick = e => {
                    evtTgt = e.target
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                }
            }

            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data)
            }
        })
        .catch(err => {
            console.log('The following error occurred: ' + err)
        })
}


