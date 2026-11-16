document.addEventListener("DOMContentLoaded", () => {
    const sourceImg = document.querySelector(".thefirstground img");
    if (!sourceImg) return;

    // 브라우저 기본 드래그 동작 원천 차단 (드래그 자국 방지)
    sourceImg.draggable = false;
    sourceImg.addEventListener("dragstart", (e) => e.preventDefault());

    let activeClone = null;

    // 1. 원본 이미지를 마우스로 누르는 순간
    sourceImg.addEventListener("mousedown", (e) => {
        e.preventDefault();

        // 랜덤 크기 설정 (최소 80px ~ 최대 240px 사이)[cite: 11]
        const minSize = 100;
        const maxSize = 1000;
        const randomWidth = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

        // 랜덤 좌우 반전 설정 (50% 확률로 좌우 뒤집기)
        const scaleXVal = Math.random() < 0.5 ? 1 : -1;

        const clone = document.createElement("img");
        clone.src = sourceImg.src;
        clone.classList.add("cloned-ground");
        clone.draggable = false; // 잔상 방지[cite: 11]
        clone.style.width = randomWidth + "px";

        // 중앙 정렬(-50%, -50%)과 랜덤 좌우 반전(scaleX) 동시 적용
        clone.style.transform = `translate(-50%, -50%) scaleX(${scaleXVal})`;

        // 마우스 커서 위치에 즉시 배치[cite: 11]
        clone.style.left = e.pageX + "px";
        clone.style.top = e.pageY + "px";

        document.body.appendChild(clone);
        activeClone = clone;

        // 이미 놓인 복제본을 다시 잡아서 옮길 수 있도록 설정 (크기와 반전 상태 유지)[cite: 11]
        clone.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            activeClone = clone;
        });
    });

    // 2. 마우스 이동 시 커서를 따라다님[cite: 11]
    document.addEventListener("mousemove", (e) => {
        if (!activeClone) return;
        activeClone.style.left = e.pageX + "px";
        activeClone.style.top = e.pageY + "px";
    });

    // 3. 마우스 클릭을 떼면 고정[cite: 11]
    document.addEventListener("mouseup", () => {
        activeClone = null;
    });
});