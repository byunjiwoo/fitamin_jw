document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "종합비타민 제품을 먹으면 충분하게 비타민을 충족할 수 있어요.", answer: "X" },
        { question: "내가 먹는 영양제에 중복되는 성분이 있는지 알고 있어요.", answer: "O" },
        { question: "임산부라면 비타민A는 반드시 피해야해요.", answer: "X" },
        { question: "집에 있는 영양제의 이름과 성분을 전부 알아요.", answer: "O" },
        { question: "고용량 비오틴을 장기간 섭취시 문제가 될 수 있는 성분은 판토텐산이에요.", answer: "O" },
        { question: "한국인 영양소 섭취기준에 따르면 비타민C의 상한 섭취량은 없어요 .", answer: "X" },
        { question: "여드름에 먹는 처방약(이소트레티노인)과 비타민A는 궁합이 잘 맞아요. ", answer: "X" },
        { question: "마그네슘을 과하게 먹으면 변비가 생길 수 있어요.", answer: "X" },
        { question: "비타민B군이 들어간 영양제를 먹고 소변색이 노랗다면 병원에 가야해요.", answer: "X" },
        { question: "오메가3를 먹을 때 가장 좋은 시간은 아침 공복이에요.", answer: "X" }
    ];

    let currentQuestionIndex = -1;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const btnO = document.getElementById('btnO');
    const btnX = document.getElementById('btnX');
    const result = document.getElementById('result');
    const imageContainer = document.getElementById('image-container');

    function updateQuestion() {
        if (currentQuestionIndex === -1) {
            questionText.innerHTML = "나는 영양제를 잘 고르고 있을까? <br> 영양제 OX퀴즈를 통해 나의 영양제 레벨을 알아보세요. <br> <br> <br>퀴즈를 다 풀면 선물이 있어요.";
            btnO.textContent = "시작하기";
            btnX.style.display = 'none';
        } else if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            btnO.textContent = "O";
            btnX.textContent = "X";
            btnX.style.display = 'inline';
        } else {
            showResult();
        }
    }

    function showResult() {
        btnO.style.display = 'none';
        btnX.style.display = 'none';
        questionText.style.display = 'none';

        let message;
        if (score <= 4) {
            message = "영양제가 어려운 당신, 핏타민의 도움이 필요하겠어요!";
            imageUrl = "Asset/coupon 1.png";
        } else if (score <= 7) {
            message = "여기저기서 많이 들어봤지만 잘 모르겠는 영양제. 약사님의 도움을 받아보세요.";
            imageUrl = "Asset/coupon 2.png";
        } else {
            message = "영양제에 대해 많이 공부하셨네요! 영양제의 우선순위 정할 때 도움을 받아보세요.";
            imageUrl = "Asset/coupon 3.png";
        }
        result.innerHTML = `당신의 점수는 ${score}점입니다.<br>${message}<br><img src="${imageUrl}" alt="Result Image" style="auto;height:auto;">`;
        
        // 결과 표시 후 버튼 추가
        const restartButton = document.createElement('button');
        restartButton.textContent = "퀴즈 다시 시작하기";
        restartButton.className = "restart-btn";
        restartButton.onclick = () => {
            currentQuestionIndex = -1;
            score = 0;
            btnO.style.display = 'inline';
            btnX.style.display = 'none'; // 시작하기 버튼만 보이도록 설정
            questionText.style.display = 'block';
            result.innerHTML = '';
            updateQuestion();
        };
        result.appendChild(document.createElement('br'));
        result.appendChild(document.createElement('br'));
        result.appendChild(restartButton);
    }

    btnO.addEventListener('click', () => {
        if (currentQuestionIndex === -1) {
            currentQuestionIndex++;
            updateQuestion();
        } else if (currentQuestionIndex < questions.length) {
            if ("O" === questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            updateQuestion();
        }
    });

    btnX.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length) {
            if ("X" === questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            updateQuestion();
        }
    });

    updateQuestion();
});
