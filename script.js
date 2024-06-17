document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('topic-selection').classList.remove('hidden');
});

document.querySelectorAll('.topic-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('topic-selection').classList.add('hidden');
        document.getElementById('lesson').classList.remove('hidden');
    });
});

let isRecording = false;
let mediaRecorder;
let audioChunks = [];

document.getElementById('record-btn').addEventListener('click', () => {
    if (isRecording) return;
    isRecording = true;
    audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = document.createElement('audio');
            audio.src = audioUrl;
            document.body.appendChild(audio);
            audio.play();

            // Chuyển giọng nói thành văn bản (giả sử đã có API hoặc chức năng này)
            const reader = new FileReader();
            reader.onload = () => {
                const transcript = reader.result; // Kết quả chuyển đổi
                document.getElementById('result').textContent = `Your Answer: ${transcript}`;
            };
            reader.readAsText(audioBlob);
        };
        mediaRecorder.start();
        document.getElementById('record-btn').classList.add('hidden');
        document.getElementById('stop-btn').classList.remove('hidden');
        document.getElementById('check-answer-btn').classList.remove('hidden');
    });
});

document.getElementById('stop-btn').addEventListener('click', () => {
    if (!isRecording) return;
    isRecording = false;
    mediaRecorder.stop();
    document.getElementById('record-btn').classList.remove('hidden');
    document.getElementById('stop-btn').classList.add('hidden');
});

document.getElementById('check-answer-btn').addEventListener('click', () => {
    const expectedAnswer = 'Hello, how are you?';
    const userAnswer = document.getElementById('result').textContent.replace('Your Answer: ', '');

    if (userAnswer.toLowerCase() === expectedAnswer.toLowerCase()) {
        alert('Correct answer!');
    } else {
        alert('Incorrect answer. Try again!');
    }
});
